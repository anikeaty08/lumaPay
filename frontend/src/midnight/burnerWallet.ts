// A genuine, independent Midnight identity for the "burner wallet" feature —
// not the connected main wallet's own address relabeled (which is what
// BurnerWalletProvider.tsx did before this module existed). Built on
// @midnight-ntwrk/wallet-sdk-hd + wallet-sdk-shielded, the headless wallet
// primitives this repo's own contracts/lumapay tooling already depends on
// transitively but never wired into the browser.
//
// Scope, and why: mnemonic generation, HD/BIP39 seed derivation, address
// derivation, balance sync, transfer building/proving, and broadcast
// (submitBurnerTransfer, via wallet-sdk-node-client's PolkadotNodeClient)
// are all implemented against verified type signatures from the installed
// packages. What's NOT verified end-to-end is an actual submit-and-confirm
// against a funded account — the connection layer and prove/bind/serialize
// chain were each verified live (see submitBurnerTransfer below), but no
// transaction has actually landed in a block from this code, since doing
// so would broadcast real value and this environment has no funded burner
// account to test with.
import { HDWallet, Roles, generateMnemonicWords, joinMnemonicWords, mnemonicToWords, validateMnemonic } from '@midnight-ntwrk/wallet-sdk-hd';
import { ShieldedWallet, type ShieldedWalletAPI } from '@midnight-ntwrk/wallet-sdk-shielded';
import { NoOpTransactionHistoryStorage } from '@midnight-ntwrk/wallet-sdk-abstractions';
import { MidnightBech32m, ShieldedAddress } from '@midnight-ntwrk/wallet-sdk-address-format';
import * as ledger from '@midnight-ntwrk/ledger-v8';

// nativeToken() returns the {tag, raw} wrapper ledger-v8 uses to distinguish
// shielded/unshielded token identifiers; RawTokenType (what TokenTransfer.type
// and the balances map are keyed by) is just the underlying string.
const NIGHT_TOKEN_TYPE: ledger.RawTokenType = ledger.nativeToken().raw;

const NETWORK_ID = 'preprod';

const BURNER_INDEXER_HTTP_URL = import.meta.env.VITE_MIDNIGHT_INDEXER_URL || 'https://indexer.preprod.midnight.network/api/v4/graphql';
const BURNER_INDEXER_WS_URL = import.meta.env.VITE_MIDNIGHT_INDEXER_WS_URL || 'wss://indexer.preprod.midnight.network/api/v4/graphql/ws';

export type BurnerMnemonic = string[];

/** A fresh 24-word recovery phrase for a new burner identity. Real entropy, not derived from the connected wallet. */
export function generateBurnerMnemonic(): BurnerMnemonic {
    return generateMnemonicWords();
}

export function isValidBurnerMnemonic(mnemonic: string): boolean {
    return validateMnemonic(mnemonic.trim());
}

export function burnerWordsToMnemonic(words: BurnerMnemonic): string {
    return joinMnemonicWords(words);
}

// BIP39: PBKDF2-HMAC-SHA512 over the normalized mnemonic, salted with
// "mnemonic" + passphrase, 2048 rounds, 64-byte output — the same
// derivation generateMnemonicWords/validateMnemonic already implement
// against (they just don't expose the seed step itself in this package's
// public API, so it's reproduced here directly rather than guessed at).
async function mnemonicToSeed(words: string[], passphrase = ''): Promise<Uint8Array> {
    const password = words.join(' ').normalize('NFKD');
    const salt = `mnemonic${passphrase}`.normalize('NFKD');
    const encoder = new TextEncoder();
    const keyMaterial = await crypto.subtle.importKey('raw', encoder.encode(password), 'PBKDF2', false, ['deriveBits']);
    const bits = await crypto.subtle.deriveBits(
        { name: 'PBKDF2', salt: encoder.encode(salt), iterations: 2048, hash: 'SHA-512' },
        keyMaterial,
        512
    );
    return new Uint8Array(bits);
}

/** BIP32-HD-derive the Zswap (shielded) signing seed for account 0 at index 0. */
function deriveShieldedSeed(bip39Seed: Uint8Array): Uint8Array {
    const result = HDWallet.fromSeed(bip39Seed);
    if (result.type !== 'seedOk') {
        throw new Error('Could not derive a burner wallet from this seed.');
    }
    try {
        const roleKey = result.hdWallet.selectAccount(0).selectRole(Roles.Zswap);
        const derived = roleKey.deriveKeyAt(0);
        if (derived.type !== 'keyDerived') {
            throw new Error('Burner key derivation index is out of bounds.');
        }
        return derived.key;
    } finally {
        result.hdWallet.clear();
    }
}

export type BurnerIdentity = {
    wallet: ShieldedWalletAPI;
    secretKeys: ledger.ZswapSecretKeys;
};

/** Instantiate and start syncing a real, independent shielded wallet for the given mnemonic. Deterministic: the same phrase always reproduces the same identity. */
export async function startBurnerWallet(mnemonic: string): Promise<BurnerIdentity> {
    const words = mnemonicToWords(mnemonic.trim());
    const bip39Seed = await mnemonicToSeed(words);
    const shieldedSeed = deriveShieldedSeed(bip39Seed);
    const secretKeys = ledger.ZswapSecretKeys.fromSeed(shieldedSeed);

    const wallet = ShieldedWallet({
        networkId: NETWORK_ID,
        indexerClientConnection: {
            indexerHttpUrl: BURNER_INDEXER_HTTP_URL,
            indexerWsUrl: BURNER_INDEXER_WS_URL,
        },
        // Not used here — this identity never displays a browsable history,
        // only a live balance — but DefaultTransactionHistoryConfiguration
        // requires it.
        txHistoryStorage: new NoOpTransactionHistoryStorage(),
    }).startWithSecretKeys(secretKeys) as unknown as ShieldedWalletAPI;

    await wallet.start(secretKeys);
    return { wallet, secretKeys };
}

export async function getBurnerAddress(identity: BurnerIdentity): Promise<string> {
    const address = await identity.wallet.getAddress();
    return MidnightBech32m.encode(NETWORK_ID, address).asString();
}

/** Parse a bech32 mn_shield-addr_... string back into the typed address transferTransaction expects. */
export function parseShieldedAddress(bech32Address: string): ShieldedAddress {
    return MidnightBech32m.parse(bech32Address.trim()).decode(ShieldedAddress, NETWORK_ID);
}

export type BurnerBalances = { NIGHT: number };
export type BurnerBalanceResult = { balances: BurnerBalances; fullySynced: boolean; progress: { appliedIndex: number; targetIndex: number } };

// Verified live against Preprod: a fresh wallet's sync walks the chain's
// full event history sequentially (appliedIndex -> highestRelevantWalletIndex)
// — Preprod currently has 1.5M+ events at roughly ~350/sec, i.e. over an
// hour for a full sync. Blocking on waitForSyncedState() would hang the UI
// that long, so this reads the wallet's live (possibly partial) state
// instead of waiting for full sync, and reports whether it's caught up so
// the caller can show "still syncing" rather than presenting a partial
// balance as final.
export async function getBurnerBalances(identity: BurnerIdentity): Promise<BurnerBalanceResult> {
    const state = await new Promise<Awaited<ReturnType<typeof identity.wallet.waitForSyncedState>>>((resolve, reject) => {
        const subscription = identity.wallet.state.subscribe({
            next: (next) => { resolve(next); subscription.unsubscribe(); },
            error: (error) => { reject(error); subscription.unsubscribe(); },
        });
    });
    const nightRaw = state.balances[NIGHT_TOKEN_TYPE] ?? 0n;
    const progress = state.progress;
    return {
        balances: { NIGHT: Number(nightRaw) / 1_000_000 },
        fullySynced: progress.appliedIndex >= progress.highestRelevantWalletIndex,
        progress: { appliedIndex: Number(progress.appliedIndex), targetIndex: Number(progress.highestRelevantWalletIndex) },
    };
}

/**
 * Building an unproven transfer is real (verified against wallet-sdk-shielded's
 * TokenTransfer/transferTransaction signature) — proving it is real too
 * (ProofProvider.proveTx, the same interface httpClientProofProvider already
 * implements elsewhere in this app). Broadcast is handled by
 * submitBurnerTransfer below (wallet-sdk-node-client's PolkadotNodeClient).
 */
export async function buildProvenBurnerTransfer(
    identity: BurnerIdentity,
    destinationAddress: string,
    amountMicros: bigint
): Promise<ledger.Transaction<ledger.SignatureEnabled, ledger.Proof, ledger.PreBinding>> {
    const { httpClientProofProvider } = await import('@midnight-ntwrk/midnight-js-http-client-proof-provider');
    const { FetchZkConfigProvider } = await import('@midnight-ntwrk/midnight-js-fetch-zk-config-provider');
    const proofServerUrl = import.meta.env.VITE_BURNER_PROOF_SERVER_URL || 'http://127.0.0.1:6300';
    const zkConfigProvider = new FetchZkConfigProvider(`${window.location.origin}/zk`, fetch.bind(window));
    const proofProvider = httpClientProofProvider(proofServerUrl, zkConfigProvider);

    const receiverAddress = parseShieldedAddress(destinationAddress);
    const unproven = await identity.wallet.transferTransaction(identity.secretKeys, [
        { type: NIGHT_TOKEN_TYPE, receiverAddress, amount: amountMicros },
    ]);
    if (!unproven) {
        throw new Error('Could not build a transfer transaction — check the burner wallet has a spendable balance.');
    }
    return proofProvider.proveTx(unproven);
}

// wallet-sdk-node-client's package root re-exports a plain Promise-based
// PolkadotNodeClient (init/sendMidnightTransactionAndWait/close) — the
// Effect-based class lives one level down at dist/effect/PolkadotNodeClient
// and is what the internal Promise wrapper is built on, not something a
// caller needs to touch directly. The prove -> bind -> serialize chain is
// verified against ledger-v8's own types (FinalizedTransaction =
// Transaction<SignatureEnabled, Proof, Binding>). PolkadotNodeClient.init()
// against wss://rpc.preprod.midnight.network was run live in this
// environment — real WebSocket connection established and closed cleanly,
// confirming the same connection layer sendMidnightTransactionAndWait uses
// internally. What's not verified is an actual submit-and-confirm: that
// needs a funded burner wallet and would broadcast a real transaction,
// neither available here. bind() is irreversible, and a failure here
// throws rather than silently dropping the transaction, so a real error
// surfaces if something's off.
export async function submitBurnerTransfer(
    provenTransaction: ledger.Transaction<ledger.SignatureEnabled, ledger.Proof, ledger.PreBinding>
): Promise<string> {
    const { PolkadotNodeClient, makeConfig } = await import('@midnight-ntwrk/wallet-sdk-node-client');
    const { SerializedTransaction } = await import('@midnight-ntwrk/wallet-sdk-abstractions');

    const finalized = provenTransaction.bind();
    const serialized = SerializedTransaction.of(finalized.serialize());
    const nodeUrl = import.meta.env.VITE_MIDNIGHT_NODE_URL || 'wss://rpc.preprod.midnight.network';

    const client = await PolkadotNodeClient.init(makeConfig({ nodeURL: new URL(nodeUrl) }));
    try {
        // InBlock rather than Finalized: enough to hand back a real, minable
        // txHash without hanging on Preprod's full finalization depth.
        const event = await client.sendMidnightTransactionAndWait(serialized, 'InBlock');
        return event.txHash;
    } finally {
        await client.close();
    }
}
