import test from 'node:test';
import assert from 'node:assert/strict';
import {
    addressFromKey,
    sampleSigningKey,
    signData,
    signatureVerifyingKey
} from '@midnight-ntwrk/ledger-v8';
import { MidnightBech32m, UnshieldedAddress } from '@midnight-ntwrk/wallet-sdk-address-format';
import { WalletAuthService, walletSigningPayload } from '../src/services/wallet-auth-service.js';

function fixture() {
    const challenges = new Map();
    const sessions = new Map();
    const repository = {
        async createAuthChallenge(value) {
            challenges.set(value.id, {
                id: value.id,
                midnight_address: value.address,
                midnight_address_hex: value.addressHex,
                nonce_hash: value.nonceHash,
                message: value.message,
                origin: value.origin,
                expires_at: value.expiresAt,
                used_at: null
            });
        },
        async getAuthChallenge(id) { return challenges.get(id) ?? null; },
        async consumeAuthChallenge(id) {
            const challenge = challenges.get(id);
            if (!challenge || challenge.used_at) return false;
            challenge.used_at = new Date().toISOString();
            return true;
        },
        async findMerchantByMidnightAddress() { return null; },
        async createAuthSession(value) {
            sessions.set(value.tokenHash, {
                id: value.id,
                token_hash: value.tokenHash,
                midnight_address: value.address,
                merchant_id: value.merchantId,
                expires_at: value.expiresAt,
                merchant: null
            });
        },
        async findAuthSession(hash) { return sessions.get(hash) ?? null; }
    };
    const environment = {
        network: { networkId: 'preprod' },
        corsOrigins: ['http://localhost:5173'],
        auth: { challengeTtlMs: 300_000, sessionTtlMs: 43_200_000 }
    };
    return { service: new WalletAuthService(repository, environment), challenges };
}

function wallet() {
    const signingKey = sampleSigningKey();
    const verifyingKey = signatureVerifyingKey(signingKey);
    const addressHex = addressFromKey(verifyingKey);
    const address = MidnightBech32m.encode(
        'preprod',
        new UnshieldedAddress(Buffer.from(addressHex, 'hex'))
    ).asString();
    return { signingKey, verifyingKey, address };
}

test('wallet challenge verifies the connector signature and creates an opaque session', async () => {
    const { service } = fixture();
    const signer = wallet();
    const challenge = await service.createChallenge({
        address: signer.address,
        origin: 'http://localhost:5173'
    });
    const signature = signData(signer.signingKey, walletSigningPayload(challenge.message));
    const session = await service.createSession({
        challengeId: challenge.challenge_id,
        data: challenge.message,
        signature,
        verifyingKey: signer.verifyingKey
    });
    assert.match(session.token, /^luma_session_/);
    assert.equal(session.address, signer.address);
    assert.equal((await service.resolveSession(session.token)).midnight_address, signer.address);
});

test('wallet challenges are origin-bound and single-use', async () => {
    const { service } = fixture();
    const signer = wallet();
    await assert.rejects(
        service.createChallenge({ address: signer.address, origin: 'https://attacker.invalid' }),
        (error) => error.code === 'AUTH_ORIGIN_INVALID'
    );
    const challenge = await service.createChallenge({ address: signer.address, origin: 'http://localhost:5173' });
    const signature = signData(signer.signingKey, walletSigningPayload(challenge.message));
    const input = { challengeId: challenge.challenge_id, data: challenge.message, signature, verifyingKey: signer.verifyingKey };
    await service.createSession(input);
    await assert.rejects(service.createSession(input), (error) => error.code === 'AUTH_CHALLENGE_INVALID');
});

test('wallet challenge rejects a signature from a different wallet', async () => {
    const { service } = fixture();
    const requested = wallet();
    const attacker = wallet();
    const challenge = await service.createChallenge({ address: requested.address, origin: 'http://localhost:5173' });
    await assert.rejects(service.createSession({
        challengeId: challenge.challenge_id,
        data: challenge.message,
        signature: signData(attacker.signingKey, walletSigningPayload(challenge.message)),
        verifyingKey: attacker.verifyingKey
    }), (error) => error.code === 'AUTH_SIGNATURE_INVALID');
});
