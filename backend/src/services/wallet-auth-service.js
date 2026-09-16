import {
    addressFromKey,
    verifySignature
} from '@midnight-ntwrk/ledger-v8';
import {
    MidnightBech32m,
    UnshieldedAddress
} from '@midnight-ntwrk/wallet-sdk-address-format';
import { AppError } from '../errors/app-error.js';
import { randomToken, sha256 } from '../security/crypto.js';

const HEX_32 = /^[0-9a-f]{64}$/i;
const HEX_64 = /^[0-9a-f]{128}$/i;

function normalizeUnshieldedAddress(address, networkId) {
    try {
        const parsed = MidnightBech32m.parse(String(address ?? '').trim());
        const decoded = parsed.decode(UnshieldedAddress, networkId);
        return { bech32: parsed.asString(), hex: String(decoded.hexString).toLowerCase() };
    } catch {
        throw new AppError(
            'MIDNIGHT_ADDRESS_INVALID',
            `A valid ${networkId} unshielded Midnight address is required.`,
            400
        );
    }
}

function signingPayload(message) {
    const size = Buffer.byteLength(message, 'utf8');
    return new TextEncoder().encode(`midnight_signed_message:${size}:${message}`);
}

function signatureMatches(verifyingKey, message, signature) {
    const normalizedKey = verifyingKey.toLowerCase();
    const normalizedSignature = signature.toLowerCase();
    return verifySignature(normalizedKey, signingPayload(message), normalizedSignature)
        || verifySignature(normalizedKey, new TextEncoder().encode(message), normalizedSignature);
}

function authMessage({ origin, networkId, address, nonce, issuedAt, expiresAt }) {
    return [
        'LumaPay authentication',
        `Origin: ${origin}`,
        `Network: ${networkId}`,
        `Address: ${address}`,
        `Nonce: ${nonce}`,
        `Issued At: ${issuedAt}`,
        `Expiration Time: ${expiresAt}`,
        'Purpose: Sign in to LumaPay. This request does not submit a transaction.'
    ].join('\n');
}

export class WalletAuthService {
    constructor(repository, environment) {
        this.repository = repository;
        this.environment = environment;
    }

    async createChallenge({ address, origin }) {
        const normalized = normalizeUnshieldedAddress(address, this.environment.network.networkId);
        if (!this.environment.corsOrigins.includes(origin)) {
            throw new AppError('AUTH_ORIGIN_INVALID', 'Authentication origin is not allowed.', 403);
        }
        const id = randomToken('luma_ch_');
        const nonce = randomToken();
        const issuedAt = new Date();
        const expiresAt = new Date(issuedAt.getTime() + this.environment.auth.challengeTtlMs);
        const message = authMessage({
            origin,
            networkId: this.environment.network.networkId,
            address: normalized.bech32,
            nonce,
            issuedAt: issuedAt.toISOString(),
            expiresAt: expiresAt.toISOString()
        });
        await this.repository.createAuthChallenge({
            id,
            address: normalized.bech32,
            addressHex: normalized.hex,
            nonceHash: sha256(nonce),
            message,
            origin,
            expiresAt: expiresAt.toISOString()
        });
        return { challenge_id: id, message, expires_at: expiresAt.toISOString() };
    }

    async createSession({ challengeId, data, signature, verifyingKey }) {
        if (!HEX_32.test(verifyingKey ?? '') || !HEX_64.test(signature ?? '')) {
            throw new AppError('AUTH_SIGNATURE_INVALID', 'Wallet signature encoding is invalid.', 401);
        }
        const challenge = await this.repository.getAuthChallenge(challengeId);
        if (!challenge || challenge.used_at || Date.parse(challenge.expires_at) <= Date.now()) {
            throw new AppError('AUTH_CHALLENGE_INVALID', 'Challenge is missing, expired, or already used.', 401);
        }
        if (data !== challenge.message) {
            throw new AppError('AUTH_SIGNATURE_INVALID', 'Wallet signed unexpected challenge data.', 401);
        }
        const derivedAddress = String(addressFromKey(verifyingKey.toLowerCase())).toLowerCase();
        if (derivedAddress !== challenge.midnight_address_hex) {
            throw new AppError('AUTH_SIGNATURE_INVALID', 'Signature key does not match the requested wallet.', 401);
        }
        if (!signatureMatches(verifyingKey, data, signature)) {
            throw new AppError('AUTH_SIGNATURE_INVALID', 'Wallet signature verification failed.', 401);
        }
        const consumed = await this.repository.consumeAuthChallenge(challenge.id);
        if (!consumed) {
            throw new AppError('AUTH_CHALLENGE_INVALID', 'Challenge was already used.', 401);
        }
        const token = randomToken('luma_session_');
        const expiresAt = new Date(Date.now() + this.environment.auth.sessionTtlMs);
        const merchant = await this.repository.findMerchantByMidnightAddress(challenge.midnight_address);
        await this.repository.createAuthSession({
            id: randomToken('luma_sess_'),
            tokenHash: sha256(token),
            address: challenge.midnight_address,
            merchantId: merchant?.id ?? null,
            expiresAt: expiresAt.toISOString()
        });
        return { token, expiresAt, merchant, address: challenge.midnight_address };
    }

    async resolveSession(token) {
        if (!token) return null;
        return this.repository.findAuthSession(sha256(token));
    }
}

export const walletSigningPayload = signingPayload;
