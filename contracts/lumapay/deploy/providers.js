import { indexerPublicDataProvider } from '@midnight-ntwrk/midnight-js-indexer-public-data-provider';
import { httpClientProofProvider } from '@midnight-ntwrk/midnight-js-http-client-proof-provider';
import { levelPrivateStateProvider } from '@midnight-ntwrk/midnight-js-level-private-state-provider';
import { NodeZkConfigProvider } from '@midnight-ntwrk/midnight-js-node-zk-config-provider';
export function buildProviders(wallet, compiledAssetPath, privateStatePassword, config) {
    const zkConfigProvider = new NodeZkConfigProvider(compiledAssetPath);
    return {
        privateStateProvider: levelPrivateStateProvider({
            privateStateStoreName: 'lumapay-preprod-private-state',
            privateStoragePasswordProvider: () => privateStatePassword,
            accountId: wallet.getCoinPublicKey()
        }),
        publicDataProvider: indexerPublicDataProvider(config.indexer, config.indexerWS),
        zkConfigProvider,
        proofProvider: httpClientProofProvider(config.proofServer, zkConfigProvider),
        walletProvider: wallet,
        midnightProvider: wallet
    };
}
//# sourceMappingURL=providers.js.map