import assert from 'node:assert/strict';
import { describe, test } from 'node:test';
import {
    createCircuitContext,
    createConstructorContext,
    sampleContractAddress
} from '@midnight-ntwrk/compact-runtime';
import {
    CardVaultStatus,
    Contract,
    ledger,
    pureCircuits
} from '../src/managed/lumapay-card-vault/contract/index.js';

const bytes = (seed) => new Uint8Array(32).fill(seed % 256);

class CardVaultHarness {
    constructor({ time = 1_000 } = {}) {
        this.time = time;
        this.contract = new Contract({});
        this.contractAddress = sampleContractAddress();
        this.defaultCaller = bytes(2);
        const initial = this.contract.initialState(
            createConstructorContext(undefined, { bytes: this.defaultCaller })
        );
        this.state = initial.currentContractState;
    }

    call(circuit, args, { caller = this.defaultCaller, time = this.time } = {}) {
        const context = createCircuitContext(
            this.contractAddress,
            { bytes: caller },
            this.state,
            undefined,
            undefined,
            undefined,
            time
        );
        const result = this.contract.impureCircuits[circuit](context, ...args);
        this.state = result.context.currentQueryContext.state;
        return result;
    }

    readLedger() {
        return ledger('data' in this.state ? this.state.data : this.state);
    }
}

function createVault(harness, base = 10, overrides = {}) {
    const vault = {
        cardId: bytes(base),
        ownerPrivateIdentity: bytes(base + 1),
        cardNumberHash: bytes(base + 2),
        metadataDigest: bytes(base + 3),
        dailyLimit: 5_000_000n,
        vaultNonce: bytes(base + 4),
        vaultRandomness: bytes(base + 5),
        ownerSecret: bytes(base + 6),
        ...overrides
    };
    vault.commitment = pureCircuits.deriveCardVaultCommitment(
        vault.cardId,
        vault.ownerPrivateIdentity,
        vault.cardNumberHash,
        vault.metadataDigest,
        vault.dailyLimit,
        vault.vaultNonce,
        vault.vaultRandomness
    );
    vault.ownerAuthorization = pureCircuits.deriveCardOwnerAuthorization(vault.ownerSecret);
    harness.call('createCardVault', [
        vault.cardId,
        vault.commitment,
        vault.ownerAuthorization,
        vault.cardNumberHash,
        vault.metadataDigest,
        vault.dailyLimit
    ]);
    return vault;
}

describe('LumaPay card vault', () => {
    test('creates, updates metadata and limit, records spend, and closes', () => {
        const harness = new CardVaultHarness();
        const vault = createVault(harness);
        let state = harness.readLedger().cardVaults.lookup(vault.cardId);
        assert.equal(state.status, CardVaultStatus.ACTIVE);
        assert.equal(state.dailyLimit, 5_000_000n);

        const nextMetadata = bytes(80);
        harness.call('updateCardMetadata', [vault.cardId, vault.ownerSecret, nextMetadata]);
        state = harness.readLedger().cardVaults.lookup(vault.cardId);
        assert.deepEqual(state.metadataDigest, nextMetadata);

        harness.call('setCardDailyLimit', [vault.cardId, vault.ownerSecret, 3_000_000n]);
        state = harness.readLedger().cardVaults.lookup(vault.cardId);
        assert.equal(state.dailyLimit, 3_000_000n);

        const spendSecret = bytes(90);
        const paymentId = bytes(91);
        harness.call('recordCardSpend', [
            vault.cardId,
            vault.ownerPrivateIdentity,
            vault.cardNumberHash,
            vault.metadataDigest,
            vault.dailyLimit,
            vault.vaultNonce,
            vault.vaultRandomness,
            paymentId,
            spendSecret,
            bytes(92),
            2_000_000n,
            20_000n
        ]);
        state = harness.readLedger().cardVaults.lookup(vault.cardId);
        assert.equal(state.spentAmount, 2_000_000n);
        assert.equal(state.spentEpochDay, 20_000n);

        const spendId = pureCircuits.deriveCardSpendNullifier(vault.cardId, paymentId, spendSecret);
        const spend = harness.readLedger().cardSpends.lookup(spendId);
        assert.equal(spend.amount, 2_000_000n);

        harness.call('closeCardVault', [vault.cardId, vault.ownerSecret]);
        state = harness.readLedger().cardVaults.lookup(vault.cardId);
        assert.equal(state.status, CardVaultStatus.CLOSED);
    });

    test('rejects unauthorized updates, replayed spends, limit breaches, and closed vault spends', () => {
        const harness = new CardVaultHarness();
        const vault = createVault(harness);

        assert.throws(
            () => harness.call('setCardDailyLimit', [vault.cardId, bytes(250), 1_000_000n]),
            /unauthorized card limit update/
        );
        assert.throws(
            () => harness.call('recordCardSpend', [
                vault.cardId,
                vault.ownerPrivateIdentity,
                bytes(251),
                vault.metadataDigest,
                vault.dailyLimit,
                vault.vaultNonce,
                vault.vaultRandomness,
                bytes(100),
                bytes(101),
                bytes(102),
                1_000_000n,
                20_000n
            ]),
            /wrong card number hash/
        );
        assert.throws(
            () => harness.call('recordCardSpend', [
                vault.cardId,
                vault.ownerPrivateIdentity,
                vault.cardNumberHash,
                vault.metadataDigest,
                vault.dailyLimit,
                vault.vaultNonce,
                vault.vaultRandomness,
                bytes(100),
                bytes(101),
                bytes(102),
                6_000_000n,
                20_000n
            ]),
            /card spend limit exceeded/
        );

        const spendArgs = [
            vault.cardId,
            vault.ownerPrivateIdentity,
            vault.cardNumberHash,
            vault.metadataDigest,
            vault.dailyLimit,
            vault.vaultNonce,
            vault.vaultRandomness,
            bytes(110),
            bytes(111),
            bytes(112),
            1_000_000n,
            20_001n
        ];
        harness.call('recordCardSpend', spendArgs);
        assert.throws(
            () => harness.call('recordCardSpend', spendArgs),
            /card spend replay/
        );

        harness.call('closeCardVault', [vault.cardId, vault.ownerSecret]);
        assert.throws(
            () => harness.call('recordCardSpend', [
                vault.cardId,
                vault.ownerPrivateIdentity,
                vault.cardNumberHash,
                vault.metadataDigest,
                vault.dailyLimit,
                vault.vaultNonce,
                vault.vaultRandomness,
                bytes(120),
                bytes(121),
                bytes(122),
                1_000_000n,
                20_002n
            ]),
            /card vault is not active/
        );
    });
});
