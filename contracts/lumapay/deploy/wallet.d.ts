import { type CoinPublicKey, type EncPublicKey, type FinalizedTransaction } from '@midnight-ntwrk/midnight-js-protocol/ledger';
import type { MidnightProvider, UnboundTransaction, WalletProvider } from '@midnight-ntwrk/midnight-js-types';
import type { FacadeState, UnshieldedKeystore, WalletFacade } from '@midnight-ntwrk/wallet-sdk';
import { type EnvironmentConfiguration } from '@midnight-ntwrk/testkit-js';
import type { Logger } from 'pino';
export type WalletSecret = {
    kind: 'seed';
    value: string;
} | {
    kind: 'mnemonic';
    value: string;
};
export declare class LumaPayWalletProvider implements MidnightProvider, WalletProvider {
    private readonly logger;
    private readonly zswapSecretKeys;
    private readonly dustSecretKey;
    readonly wallet: WalletFacade;
    readonly unshieldedKeystore: UnshieldedKeystore;
    private constructor();
    getCoinPublicKey(): CoinPublicKey;
    getEncryptionPublicKey(): EncPublicKey;
    balanceTx(transaction: UnboundTransaction, ttl?: Date): Promise<FinalizedTransaction>;
    submitTx(transaction: FinalizedTransaction): Promise<string>;
    start(): Promise<void>;
    stop(): Promise<void>;
    getAddress(networkId: string, state: FacadeState): string;
    static build(logger: Logger, environment: EnvironmentConfiguration, secret: WalletSecret): Promise<LumaPayWalletProvider>;
}
export declare function syncWallet(logger: Logger, wallet: WalletFacade, timeoutMs?: number): Promise<FacadeState>;
export declare function readBalances(state: FacadeState): {
    night: bigint;
    dust: bigint;
};
export declare function ensureDust(logger: Logger, provider: LumaPayWalletProvider, syncedState: FacadeState, timeoutMs?: number): Promise<bigint>;
//# sourceMappingURL=wallet.d.ts.map