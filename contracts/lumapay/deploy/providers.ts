import { indexerPublicDataProvider } from '@midnight-ntwrk/midnight-js-indexer-public-data-provider';
import { httpClientProofProvider } from '@midnight-ntwrk/midnight-js-http-client-proof-provider';
import { levelPrivateStateProvider } from '@midnight-ntwrk/midnight-js-level-private-state-provider';
import { NodeZkConfigProvider } from '@midnight-ntwrk/midnight-js-node-zk-config-provider';
import type { MidnightProviders } from '@midnight-ntwrk/midnight-js-types';
import type { ImpureCircuits } from '../src/managed/lumapay/contract/index.js';
import type { NetworkConfig } from './config.js';
import type { LumaPayWalletProvider } from './wallet.js';

export type LumaPayCircuitId = keyof ImpureCircuits<unknown> & string;
export type LumaPayProviders = MidnightProviders<LumaPayCircuitId>;

export function buildProviders<CircuitId extends string = LumaPayCircuitId>(
    wallet: LumaPayWalletProvider,
    compiledAssetPath: string,
    privateStatePassword: string,
    config: NetworkConfig
): MidnightProviders<CircuitId> {
    const zkConfigProvider = new NodeZkConfigProvider<CircuitId>(compiledAssetPath);

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
