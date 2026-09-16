import type { MidnightProviders } from '@midnight-ntwrk/midnight-js-types';
import type { ImpureCircuits } from '../src/managed/lumapay/contract/index.js';
import type { NetworkConfig } from './config.js';
import type { LumaPayWalletProvider } from './wallet.js';
export type LumaPayCircuitId = keyof ImpureCircuits<unknown> & string;
export type LumaPayProviders = MidnightProviders<Record<string, never>>;
export declare function buildProviders(wallet: LumaPayWalletProvider, compiledAssetPath: string, privateStatePassword: string, config: NetworkConfig): LumaPayProviders;
//# sourceMappingURL=providers.d.ts.map