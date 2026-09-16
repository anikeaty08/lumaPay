import { CompiledContract } from '@midnight-ntwrk/midnight-js-protocol/compact-js';
import { Contract } from './managed/lumapay/contract/index.js';

export * from './managed/lumapay/contract/index.js';

export const LUMAPAY_CONTRACT_NAME = 'LumaPay';
export const LUMAPAY_COMMITMENT_VERSION = 1n;
export const LUMAPAY_PRIVATE_STATE_ID = 'lumapayPrivateState';
export const DEFAULT_COMPILED_ASSET_PATH = './managed/lumapay';

/**
 * Creates the deployable Midnight.js contract descriptor.
 *
 * Browser applications normally serve `dist/managed/lumapay` and use the
 * default relative path. Node applications can pass an absolute artifact path.
 */
export function createCompiledLumaPayContract(
    compiledAssetPath: string = DEFAULT_COMPILED_ASSET_PATH
) {
    return CompiledContract.make(LUMAPAY_CONTRACT_NAME, Contract).pipe(
        CompiledContract.withVacantWitnesses,
        CompiledContract.withCompiledFileAssets(compiledAssetPath)
    );
}

export const CompiledLumaPayContract = createCompiledLumaPayContract();
