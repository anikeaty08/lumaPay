import type * as __compactRuntime from '@midnight-ntwrk/compact-runtime';

export type BackupAnchorPublicState = { formatVersion: bigint;
                                        authorization: Uint8Array;
                                        encryptedBlobDigest: Uint8Array
                                      };

export type Witnesses<PS> = {
}

export type ImpureCircuits<PS> = {
  registerBackupAnchor(context: __compactRuntime.CircuitContext<PS>,
                       ownerId_0: Uint8Array,
                       backupAuthorizationCommitment_0: Uint8Array,
                       encryptedBlobDigest_0: Uint8Array): __compactRuntime.CircuitResults<PS, []>;
  updateBackupAnchor(context: __compactRuntime.CircuitContext<PS>,
                     ownerId_0: Uint8Array,
                     backupSecret_0: Uint8Array,
                     encryptedBlobDigest_0: Uint8Array): __compactRuntime.CircuitResults<PS, []>;
  rotateBackupAuthorization(context: __compactRuntime.CircuitContext<PS>,
                            ownerId_0: Uint8Array,
                            currentBackupSecret_0: Uint8Array,
                            newBackupAuthorizationCommitment_0: Uint8Array): __compactRuntime.CircuitResults<PS, []>;
  deleteBackupAnchor(context: __compactRuntime.CircuitContext<PS>,
                     ownerId_0: Uint8Array,
                     backupSecret_0: Uint8Array): __compactRuntime.CircuitResults<PS, []>;
}

export type ProvableCircuits<PS> = {
  registerBackupAnchor(context: __compactRuntime.CircuitContext<PS>,
                       ownerId_0: Uint8Array,
                       backupAuthorizationCommitment_0: Uint8Array,
                       encryptedBlobDigest_0: Uint8Array): __compactRuntime.CircuitResults<PS, []>;
  updateBackupAnchor(context: __compactRuntime.CircuitContext<PS>,
                     ownerId_0: Uint8Array,
                     backupSecret_0: Uint8Array,
                     encryptedBlobDigest_0: Uint8Array): __compactRuntime.CircuitResults<PS, []>;
  rotateBackupAuthorization(context: __compactRuntime.CircuitContext<PS>,
                            ownerId_0: Uint8Array,
                            currentBackupSecret_0: Uint8Array,
                            newBackupAuthorizationCommitment_0: Uint8Array): __compactRuntime.CircuitResults<PS, []>;
  deleteBackupAnchor(context: __compactRuntime.CircuitContext<PS>,
                     ownerId_0: Uint8Array,
                     backupSecret_0: Uint8Array): __compactRuntime.CircuitResults<PS, []>;
}

export type PureCircuits = {
  deriveBackupAuthorization(ownerId_0: Uint8Array, backupSecret_0: Uint8Array): Uint8Array;
}

export type Circuits<PS> = {
  deriveBackupAuthorization(context: __compactRuntime.CircuitContext<PS>,
                            ownerId_0: Uint8Array,
                            backupSecret_0: Uint8Array): __compactRuntime.CircuitResults<PS, Uint8Array>;
  registerBackupAnchor(context: __compactRuntime.CircuitContext<PS>,
                       ownerId_0: Uint8Array,
                       backupAuthorizationCommitment_0: Uint8Array,
                       encryptedBlobDigest_0: Uint8Array): __compactRuntime.CircuitResults<PS, []>;
  updateBackupAnchor(context: __compactRuntime.CircuitContext<PS>,
                     ownerId_0: Uint8Array,
                     backupSecret_0: Uint8Array,
                     encryptedBlobDigest_0: Uint8Array): __compactRuntime.CircuitResults<PS, []>;
  rotateBackupAuthorization(context: __compactRuntime.CircuitContext<PS>,
                            ownerId_0: Uint8Array,
                            currentBackupSecret_0: Uint8Array,
                            newBackupAuthorizationCommitment_0: Uint8Array): __compactRuntime.CircuitResults<PS, []>;
  deleteBackupAnchor(context: __compactRuntime.CircuitContext<PS>,
                     ownerId_0: Uint8Array,
                     backupSecret_0: Uint8Array): __compactRuntime.CircuitResults<PS, []>;
}

export type Ledger = {
  backupOwnerIds: {
    isEmpty(): boolean;
    size(): bigint;
    member(elem_0: Uint8Array): boolean;
    [Symbol.iterator](): Iterator<Uint8Array>
  };
  backupAnchors: {
    isEmpty(): boolean;
    size(): bigint;
    member(key_0: Uint8Array): boolean;
    lookup(key_0: Uint8Array): BackupAnchorPublicState;
    [Symbol.iterator](): Iterator<[Uint8Array, BackupAnchorPublicState]>
  };
}

export type ContractReferenceLocations = any;

export declare const contractReferenceLocations : ContractReferenceLocations;

export declare class Contract<PS = any, W extends Witnesses<PS> = Witnesses<PS>> {
  witnesses: W;
  circuits: Circuits<PS>;
  impureCircuits: ImpureCircuits<PS>;
  provableCircuits: ProvableCircuits<PS>;
  constructor(witnesses: W);
  initialState(context: __compactRuntime.ConstructorContext<PS>): __compactRuntime.ConstructorResult<PS>;
}

export declare function ledger(state: __compactRuntime.StateValue | __compactRuntime.ChargedState): Ledger;
export declare const pureCircuits: PureCircuits;
