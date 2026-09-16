import {
    type CoinPublicKey,
    DustSecretKey,
    type EncPublicKey,
    type FinalizedTransaction,
    LedgerParameters,
    unshieldedToken,
    ZswapSecretKeys
} from '@midnight-ntwrk/midnight-js-protocol/ledger';
import type {
    MidnightProvider,
    UnboundTransaction,
    WalletProvider
} from '@midnight-ntwrk/midnight-js-types';
import { ttlOneHour } from '@midnight-ntwrk/midnight-js-utils';
import type {
    DefaultConfiguration,
    FacadeState,
    UnshieldedKeystore,
    WalletFacade
} from '@midnight-ntwrk/wallet-sdk';
import {
    DustAddress,
    DustWallet,
    InMemoryTransactionHistoryStorage,
    mergeWalletEntries,
    UnshieldedAddress,
    WalletEntrySchema
} from '@midnight-ntwrk/wallet-sdk';
import {
    type DustWalletOptions,
    type EnvironmentConfiguration,
    FluentWalletBuilder,
    logger as testkitLogger,
    WalletFactory
} from '@midnight-ntwrk/testkit-js';
import type { Logger } from 'pino';
import { mkdir, rename, writeFile } from 'node:fs/promises';
import path from 'node:path';
import { firstValueFrom } from 'rxjs';
import { filter, timeout } from 'rxjs/operators';

// The testkit logs full indexer URLs at info level, including private-indexer
// session query parameters. LumaPay emits its own sanitized lifecycle logs.
testkitLogger.level = 'warn';

export type WalletSecret =
    | { kind: 'seed'; value: string }
    | { kind: 'mnemonic'; value: string };

export type PrivateIndexerSession = {
    token: string;
    address: string;
    expiresAt: number;
};

type PrivateIndexerChallenge = {
    domain: string;
    nonce: string;
    expiresAt: number;
};

export function isOneAmPrivateIndexer(url: string): boolean {
    const parsed = new URL(url);
    return parsed.protocol === 'https:' && /^api(?:-(?:preprod|preview))?\.1am\.xyz$/i.test(parsed.hostname);
}

export function addPrivateIndexerSession(url: string, token: string): string {
    const parsed = new URL(url);
    parsed.searchParams.set('session_token', token);
    return parsed.toString();
}

export async function createOneAmIndexerSession(
    indexerUrl: string,
    keystore: UnshieldedKeystore
): Promise<PrivateIndexerSession> {
    if (!isOneAmPrivateIndexer(indexerUrl)) {
        throw new Error('Refusing to sign an indexer challenge for an unrecognized host.');
    }
    const baseUrl = new URL(indexerUrl).origin;
    const challengeResponse = await fetch(`${baseUrl}/auth/challenge`, {
        signal: AbortSignal.timeout(10_000)
    });
    if (!challengeResponse.ok) {
        throw new Error(`1AM challenge request failed with HTTP ${challengeResponse.status}.`);
    }
    const challenge = await challengeResponse.json() as PrivateIndexerChallenge;
    const now = Math.floor(Date.now() / 1_000);
    if (
        challenge.domain !== '1am.xyz' ||
        !challenge.nonce ||
        !Number.isFinite(challenge.expiresAt) ||
        challenge.expiresAt <= now
    ) {
        throw new Error('1AM returned an invalid or expired authentication challenge.');
    }

    // This format is the 1AM extension's gateway-auth v1 protocol. It is an
    // authentication statement only; it cannot authorize a chain transaction.
    const message = `1AM-AUTH-v1\n${challenge.domain}\n${challenge.nonce}\n${now}`;
    const signature = keystore.signData(new TextEncoder().encode(message));
    const publicKey = keystore.getPublicKey();
    const address = keystore.getBech32Address().asString();
    const verifyResponse = await fetch(`${baseUrl}/auth/verify`, {
        method: 'POST',
        headers: { 'content-type': 'application/json' },
        body: JSON.stringify({
            pubkey: publicKey,
            nonce: challenge.nonce,
            timestamp: now,
            signature,
            address
        }),
        signal: AbortSignal.timeout(10_000)
    });
    if (!verifyResponse.ok) {
        const detail = await verifyResponse.text().catch(() => '');
        throw new Error(`1AM authentication failed with HTTP ${verifyResponse.status}: ${detail}`);
    }
    const session = await verifyResponse.json() as {
        token?: string;
        address?: string;
        expires_in?: number;
    };
    if (!session.token || (session.address && session.address !== address)) {
        throw new Error('1AM returned an invalid authentication session.');
    }
    return {
        token: session.token,
        address,
        expiresAt: now + (session.expires_in ?? 31_536_000)
    };
}

export class LumaPayWalletProvider implements MidnightProvider, WalletProvider {
    readonly wallet: WalletFacade;
    readonly unshieldedKeystore: UnshieldedKeystore;

    private constructor(
        private readonly logger: Logger,
        wallet: WalletFacade,
        private readonly zswapSecretKeys: ZswapSecretKeys,
        private readonly dustSecretKey: DustSecretKey,
        unshieldedKeystore: UnshieldedKeystore
    ) {
        this.wallet = wallet;
        this.unshieldedKeystore = unshieldedKeystore;
    }

    getCoinPublicKey(): CoinPublicKey {
        return this.zswapSecretKeys.coinPublicKey;
    }

    getEncryptionPublicKey(): EncPublicKey {
        return this.zswapSecretKeys.encryptionPublicKey;
    }

    async balanceTx(
        transaction: UnboundTransaction,
        ttl: Date = ttlOneHour()
    ): Promise<FinalizedTransaction> {
        const recipe = await this.wallet.balanceUnboundTransaction(
            transaction,
            {
                shieldedSecretKeys: this.zswapSecretKeys,
                dustSecretKey: this.dustSecretKey
            },
            { ttl }
        );
        return this.wallet.finalizeRecipe(recipe);
    }

    submitTx(transaction: FinalizedTransaction): Promise<string> {
        return this.wallet.submitTransaction(transaction);
    }

    async start(): Promise<void> {
        this.logger.info('Starting the Midnight wallet.');
        await this.wallet.start(this.zswapSecretKeys, this.dustSecretKey);
    }

    stop(): Promise<void> {
        return this.wallet.stop();
    }

    getAddress(networkId: string, state: FacadeState): string {
        return UnshieldedAddress.codec
            .encode(networkId, state.unshielded.address)
            .asString();
    }

    getDustAddress(networkId: string): string {
        return String(DustAddress.encodePublicKey(networkId, this.dustSecretKey.publicKey));
    }

    static async build(
        logger: Logger,
        environment: EnvironmentConfiguration,
        secret: WalletSecret,
        serializedDustState?: string
    ): Promise<LumaPayWalletProvider> {
        const dustOptions: DustWalletOptions = {
            ledgerParams: LedgerParameters.initialParameters(),
            additionalFeeOverhead: 1_000n,
            feeBlocksMargin: 5
        };
        const base = FluentWalletBuilder.forEnvironment(environment).withDustOptions(dustOptions);
        const builder = secret.kind === 'mnemonic'
            ? base.withMnemonic(secret.value)
            : base.withSeed(secret.value);
        const buildResult = await builder.buildWithoutStarting();
        const { wallet: freshWallet, seeds, keystore } = buildResult as {
            wallet: WalletFacade;
            seeds: { shielded: Uint8Array; dust: Uint8Array };
            keystore: UnshieldedKeystore;
        };

        let wallet = freshWallet;
        if (serializedDustState) {
            const configuration: DefaultConfiguration = {
                indexerClientConnection: {
                    indexerHttpUrl: environment.indexer,
                    indexerWsUrl: environment.indexerWS
                },
                provingServerUrl: new URL(environment.proofServer),
                networkId: environment.walletNetworkId,
                relayURL: new URL(environment.nodeWS),
                txHistoryStorage: new InMemoryTransactionHistoryStorage(
                    WalletEntrySchema,
                    mergeWalletEntries
                ),
                costParameters: { feeBlocksMargin: 5 }
            };
            const restoredDustWallet = DustWallet({
                ...configuration,
                costParameters: dustOptions
            }).restore(serializedDustState);
            wallet = await WalletFactory.createWalletFacade(
                configuration,
                WalletFactory.createShieldedWallet(configuration, seeds.shielded),
                WalletFactory.createUnshieldedWallet(configuration, keystore),
                restoredDustWallet
            );
            logger.info('Restored the cached DUST wallet snapshot.');
        }

        return new LumaPayWalletProvider(
            logger,
            wallet,
            ZswapSecretKeys.fromSeed(seeds.shielded),
            DustSecretKey.fromSeed(seeds.dust),
            keystore
        );
    }
}

export function isStrictlyComplete(progress: unknown): boolean {
    if (!progress || typeof progress !== 'object') return false;
    const method = (progress as { isStrictlyComplete?: () => boolean }).isStrictlyComplete;
    return typeof method === 'function' && method.call(progress);
}

function describeSyncProgress(progress: unknown): Record<string, string | boolean> {
    if (!progress || typeof progress !== 'object') {
        return { available: false };
    }
    const value = progress as {
        appliedIndex?: bigint;
        highestRelevantWalletIndex?: bigint;
        highestIndex?: bigint;
        highestRelevantIndex?: bigint;
        isConnected?: boolean;
    };
    return {
        available: true,
        connected: value.isConnected === true,
        appliedIndex: value.appliedIndex?.toString() ?? 'unknown',
        highestRelevantWalletIndex: value.highestRelevantWalletIndex?.toString() ?? 'unknown',
        highestIndex: value.highestIndex?.toString() ?? 'unknown',
        highestRelevantIndex: value.highestRelevantIndex?.toString() ?? 'unknown'
    };
}

async function writeTextAtomic(destination: string, value: string): Promise<void> {
    await mkdir(path.dirname(destination), { recursive: true });
    const temporary = `${destination}.${process.pid}.tmp`;
    await writeFile(temporary, value, { flag: 'w' });
    await rename(temporary, destination);
}

async function saveDustSnapshotIfRequested(logger: Logger, state: FacadeState): Promise<void> {
    const outputFile = process.env.LUMAPAY_DUST_STATE_OUTPUT_FILE?.trim();
    if (!outputFile) return;
    try {
        const serialized = state.dust.serialize();
        await writeTextAtomic(path.resolve(outputFile), serialized);
    } catch (cause) {
        logger.warn(
            { err: cause instanceof Error ? cause.message : String(cause) },
            'Could not write DUST wallet snapshot.'
        );
    }
}

export async function waitForDustSnapshot(
    logger: Logger,
    wallet: WalletFacade,
    timeoutMs = Number(process.env.MIDNIGHT_DUST_SYNC_TIMEOUT_MS || 20 * 60_000)
): Promise<FacadeState> {
    const deadline = Date.now() + timeoutMs;
    while (Date.now() < deadline) {
        const state = await firstValueFrom(wallet.state());
        const balance = state.dust.balance(new Date());
        const spendableCoins = state.dust.availableCoins.length;
        const pendingCoins = state.dust.pendingCoins.length;
        const synced = isStrictlyComplete(state.dust.progress);
        logger.info(
            {
                balance: balance.toString(),
                spendableCoins,
                pendingCoins,
                synced,
                progress: describeSyncProgress(state.dust.state.progress)
            },
            'DUST wallet state.'
        );
        await saveDustSnapshotIfRequested(logger, state);
        if (synced || spendableCoins > 0) return state;
        await new Promise((resolve) => setTimeout(resolve, 10_000));
    }
    throw new Error(`DUST wallet sync timed out after ${timeoutMs}ms.`);
}

export function formatDust(balance: bigint): string {
    const scale = 1_000_000_000_000_000n;
    return `${balance / scale}.${(balance % scale).toString().padStart(15, '0')}`;
}

export async function syncWallet(
    logger: Logger,
    wallet: WalletFacade,
    timeoutMs = 20 * 60_000
): Promise<FacadeState> {
    logger.info('Syncing wallet with the Preprod indexer.');
    return firstValueFrom(
        wallet.state().pipe(
            filter((state) =>
                isStrictlyComplete(state.shielded.state.progress) &&
                isStrictlyComplete(state.unshielded.progress)
            ),
            timeout({ each: timeoutMs })
        )
    );
}

export function readBalances(state: FacadeState): { night: bigint; dust: bigint } {
    return {
        night: state.unshielded.balances[unshieldedToken().raw] ?? 0n,
        dust: state.dust.balance(new Date())
    };
}

export function readDustAccount(
    networkId: string,
    state: FacadeState
): { address: string; spendableCoins: number; pendingCoins: number } {
    return {
        address: String(DustAddress.encodePublicKey(networkId, state.dust.publicKey)),
        spendableCoins: state.dust.availableCoins.length,
        pendingCoins: state.dust.pendingCoins.length
    };
}

export async function ensureDust(
    logger: Logger,
    provider: LumaPayWalletProvider,
    syncedState: FacadeState,
    timeoutMs = 30 * 60_000
): Promise<bigint> {
    const nativeToken = unshieldedToken().raw;
    if (syncedState.dust.availableCoins.length > 0) {
        return syncedState.dust.balance(new Date());
    }
    const unregistered = syncedState.unshielded.availableCoins.filter(
        (coin) =>
            coin.utxo.type === nativeToken &&
            coin.meta.registeredForDustGeneration === false
    );

    if (unregistered.length > 0) {
        logger.info(`Registering ${unregistered.length} NIGHT UTXO(s) for DUST generation.`);
        const recipe = await provider.wallet.registerNightUtxosForDustGeneration(
            unregistered,
            provider.unshieldedKeystore.getPublicKey(),
            (payload) => provider.unshieldedKeystore.signData(payload)
        );
        const finalized = await provider.wallet.finalizeRecipe(recipe);
        const transactionId = await provider.wallet.submitTransaction(finalized);
        logger.info({ transactionId }, 'DUST registration submitted.');
    } else {
        logger.info('NIGHT is already registered; waiting for its DUST coin to become spendable.');
    }

    const deadline = Date.now() + timeoutMs;
    while (Date.now() < deadline) {
        const state = await firstValueFrom(provider.wallet.state());
        const dust = state.dust.balance(new Date());
        const spendableCoins = state.dust.availableCoins.length;
        const pendingCoins = state.dust.pendingCoins.length;
        logger.info(
            { dust: dust.toString(), spendableCoins, pendingCoins },
            'Waiting for a spendable DUST coin.'
        );
        if (spendableCoins > 0) return dust;
        await new Promise((resolve) => setTimeout(resolve, 15_000));
    }
    throw new Error('Timed out waiting for a spendable DUST coin.');
}
