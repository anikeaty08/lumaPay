import { DustSecretKey, LedgerParameters, unshieldedToken, ZswapSecretKeys } from '@midnight-ntwrk/midnight-js-protocol/ledger';
import { ttlOneHour } from '@midnight-ntwrk/midnight-js-utils';
import { UnshieldedAddress } from '@midnight-ntwrk/wallet-sdk';
import { FluentWalletBuilder } from '@midnight-ntwrk/testkit-js';
import { firstValueFrom } from 'rxjs';
import { filter, timeout } from 'rxjs/operators';
export class LumaPayWalletProvider {
    logger;
    zswapSecretKeys;
    dustSecretKey;
    wallet;
    unshieldedKeystore;
    constructor(logger, wallet, zswapSecretKeys, dustSecretKey, unshieldedKeystore) {
        this.logger = logger;
        this.zswapSecretKeys = zswapSecretKeys;
        this.dustSecretKey = dustSecretKey;
        this.wallet = wallet;
        this.unshieldedKeystore = unshieldedKeystore;
    }
    getCoinPublicKey() {
        return this.zswapSecretKeys.coinPublicKey;
    }
    getEncryptionPublicKey() {
        return this.zswapSecretKeys.encryptionPublicKey;
    }
    async balanceTx(transaction, ttl = ttlOneHour()) {
        const recipe = await this.wallet.balanceUnboundTransaction(transaction, {
            shieldedSecretKeys: this.zswapSecretKeys,
            dustSecretKey: this.dustSecretKey
        }, { ttl });
        return this.wallet.finalizeRecipe(recipe);
    }
    submitTx(transaction) {
        return this.wallet.submitTransaction(transaction);
    }
    async start() {
        this.logger.info('Starting the Midnight wallet.');
        await this.wallet.start(this.zswapSecretKeys, this.dustSecretKey);
    }
    stop() {
        return this.wallet.stop();
    }
    getAddress(networkId, state) {
        return UnshieldedAddress.codec
            .encode(networkId, state.unshielded.address)
            .asString();
    }
    static async build(logger, environment, secret) {
        const dustOptions = {
            ledgerParams: LedgerParameters.initialParameters(),
            additionalFeeOverhead: 1000n,
            feeBlocksMargin: 5
        };
        const base = FluentWalletBuilder.forEnvironment(environment).withDustOptions(dustOptions);
        const builder = secret.kind === 'mnemonic'
            ? base.withMnemonic(secret.value)
            : base.withSeed(secret.value);
        const buildResult = await builder.buildWithoutStarting();
        const { wallet, seeds, keystore } = buildResult;
        return new LumaPayWalletProvider(logger, wallet, ZswapSecretKeys.fromSeed(seeds.shielded), DustSecretKey.fromSeed(seeds.dust), keystore);
    }
}
function isStrictlyComplete(progress) {
    if (!progress || typeof progress !== 'object')
        return false;
    const method = progress.isStrictlyComplete;
    return typeof method === 'function' && method.call(progress);
}
export async function syncWallet(logger, wallet, timeoutMs = 20 * 60_000) {
    logger.info('Syncing wallet with the Preprod indexer.');
    return firstValueFrom(wallet.state().pipe(filter((state) => isStrictlyComplete(state.shielded.state.progress) &&
        isStrictlyComplete(state.unshielded.progress)), timeout({ each: timeoutMs })));
}
export function readBalances(state) {
    return {
        night: state.unshielded.balances[unshieldedToken().raw] ?? 0n,
        dust: state.dust.balance(new Date())
    };
}
export async function ensureDust(logger, provider, syncedState, timeoutMs = 30 * 60_000) {
    const nativeToken = unshieldedToken().raw;
    const unregistered = syncedState.unshielded.availableCoins.filter((coin) => coin.utxo.type === nativeToken &&
        coin.meta.registeredForDustGeneration === false);
    if (unregistered.length > 0) {
        logger.info(`Registering ${unregistered.length} NIGHT UTXO(s) for DUST generation.`);
        const recipe = await provider.wallet.registerNightUtxosForDustGeneration(unregistered, provider.unshieldedKeystore.getPublicKey(), (payload) => provider.unshieldedKeystore.signData(payload));
        const finalized = await provider.wallet.finalizeRecipe(recipe);
        const transactionId = await provider.wallet.submitTransaction(finalized);
        logger.info({ transactionId }, 'DUST registration submitted.');
    }
    const deadline = Date.now() + timeoutMs;
    while (Date.now() < deadline) {
        const state = await firstValueFrom(provider.wallet.state());
        const dust = state.dust.balance(new Date());
        if (dust > 0n)
            return dust;
        await new Promise((resolve) => setTimeout(resolve, 15_000));
    }
    throw new Error('Timed out waiting for spendable DUST.');
}
//# sourceMappingURL=wallet.js.map