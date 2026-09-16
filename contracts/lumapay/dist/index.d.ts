import { CompiledContract } from '@midnight-ntwrk/midnight-js-protocol/compact-js';
import { Contract } from './managed/lumapay/contract/index.js';
export * from './managed/lumapay/contract/index.js';
export declare const LUMAPAY_CONTRACT_NAME = "LumaPay";
export declare const LUMAPAY_COMMITMENT_VERSION = 1n;
export declare const LUMAPAY_PRIVATE_STATE_ID = "lumapayPrivateState";
export declare const DEFAULT_COMPILED_ASSET_PATH = "./managed/lumapay";
/**
 * Creates the deployable Midnight.js contract descriptor.
 *
 * Browser applications normally serve `dist/managed/lumapay` and use the
 * default relative path. Node applications can pass an absolute artifact path.
 */
export declare function createCompiledLumaPayContract(compiledAssetPath?: string): CompiledContract.CompiledContract<Contract<any, any>, any, never>;
export declare const CompiledLumaPayContract: CompiledContract.CompiledContract<Contract<any, any>, any, never>;
//# sourceMappingURL=index.d.ts.map