import type * as __compactRuntime from '@midnight-ntwrk/compact-runtime';

export enum CardVaultStatus { ACTIVE = 0, CLOSED = 1 }

export type CardVaultPublicState = { commitmentVersion: bigint;
                                     commitment: Uint8Array;
                                     ownerAuthorization: Uint8Array;
                                     cardNumberHash: Uint8Array;
                                     metadataDigest: Uint8Array;
                                     dailyLimit: bigint;
                                     spentEpochDay: bigint;
                                     spentAmount: bigint;
                                     status: CardVaultStatus
                                   };

export type CardSpendPublicState = { cardId: Uint8Array;
                                     paymentId: Uint8Array;
                                     tokenId: Uint8Array;
                                     amount: bigint;
                                     epochDay: bigint
                                   };

export type Witnesses<PS> = {
}

export type ImpureCircuits<PS> = {
  createCardVault(context: __compactRuntime.CircuitContext<PS>,
                  cardId_0: Uint8Array,
                  commitment_0: Uint8Array,
                  ownerAuthorization_0: Uint8Array,
                  cardNumberHash_0: Uint8Array,
                  metadataDigest_0: Uint8Array,
                  dailyLimit_0: bigint): __compactRuntime.CircuitResults<PS, []>;
  updateCardMetadata(context: __compactRuntime.CircuitContext<PS>,
                     cardId_0: Uint8Array,
                     ownerSecret_0: Uint8Array,
                     metadataDigest_0: Uint8Array): __compactRuntime.CircuitResults<PS, []>;
  setCardDailyLimit(context: __compactRuntime.CircuitContext<PS>,
                    cardId_0: Uint8Array,
                    ownerSecret_0: Uint8Array,
                    dailyLimit_0: bigint): __compactRuntime.CircuitResults<PS, []>;
  recordCardSpend(context: __compactRuntime.CircuitContext<PS>,
                  cardId_0: Uint8Array,
                  ownerPrivateIdentity_0: Uint8Array,
                  cardNumberHash_0: Uint8Array,
                  metadataDigest_0: Uint8Array,
                  dailyLimitAtCreation_0: bigint,
                  vaultNonce_0: Uint8Array,
                  vaultRandomness_0: Uint8Array,
                  paymentId_0: Uint8Array,
                  spendSecret_0: Uint8Array,
                  tokenId_0: Uint8Array,
                  amount_0: bigint,
                  epochDay_0: bigint): __compactRuntime.CircuitResults<PS, []>;
  closeCardVault(context: __compactRuntime.CircuitContext<PS>,
                 cardId_0: Uint8Array,
                 ownerSecret_0: Uint8Array): __compactRuntime.CircuitResults<PS, []>;
}

export type ProvableCircuits<PS> = {
  createCardVault(context: __compactRuntime.CircuitContext<PS>,
                  cardId_0: Uint8Array,
                  commitment_0: Uint8Array,
                  ownerAuthorization_0: Uint8Array,
                  cardNumberHash_0: Uint8Array,
                  metadataDigest_0: Uint8Array,
                  dailyLimit_0: bigint): __compactRuntime.CircuitResults<PS, []>;
  updateCardMetadata(context: __compactRuntime.CircuitContext<PS>,
                     cardId_0: Uint8Array,
                     ownerSecret_0: Uint8Array,
                     metadataDigest_0: Uint8Array): __compactRuntime.CircuitResults<PS, []>;
  setCardDailyLimit(context: __compactRuntime.CircuitContext<PS>,
                    cardId_0: Uint8Array,
                    ownerSecret_0: Uint8Array,
                    dailyLimit_0: bigint): __compactRuntime.CircuitResults<PS, []>;
  recordCardSpend(context: __compactRuntime.CircuitContext<PS>,
                  cardId_0: Uint8Array,
                  ownerPrivateIdentity_0: Uint8Array,
                  cardNumberHash_0: Uint8Array,
                  metadataDigest_0: Uint8Array,
                  dailyLimitAtCreation_0: bigint,
                  vaultNonce_0: Uint8Array,
                  vaultRandomness_0: Uint8Array,
                  paymentId_0: Uint8Array,
                  spendSecret_0: Uint8Array,
                  tokenId_0: Uint8Array,
                  amount_0: bigint,
                  epochDay_0: bigint): __compactRuntime.CircuitResults<PS, []>;
  closeCardVault(context: __compactRuntime.CircuitContext<PS>,
                 cardId_0: Uint8Array,
                 ownerSecret_0: Uint8Array): __compactRuntime.CircuitResults<PS, []>;
}

export type PureCircuits = {
  deriveCardOwnerAuthorization(ownerSecret_0: Uint8Array): Uint8Array;
  deriveCardVaultCommitment(cardId_0: Uint8Array,
                            ownerPrivateIdentity_0: Uint8Array,
                            cardNumberHash_0: Uint8Array,
                            metadataDigest_0: Uint8Array,
                            dailyLimit_0: bigint,
                            vaultNonce_0: Uint8Array,
                            vaultRandomness_0: Uint8Array): Uint8Array;
  deriveCardSpendNullifier(cardId_0: Uint8Array,
                           paymentId_0: Uint8Array,
                           spendSecret_0: Uint8Array): Uint8Array;
}

export type Circuits<PS> = {
  deriveCardOwnerAuthorization(context: __compactRuntime.CircuitContext<PS>,
                               ownerSecret_0: Uint8Array): __compactRuntime.CircuitResults<PS, Uint8Array>;
  deriveCardVaultCommitment(context: __compactRuntime.CircuitContext<PS>,
                            cardId_0: Uint8Array,
                            ownerPrivateIdentity_0: Uint8Array,
                            cardNumberHash_0: Uint8Array,
                            metadataDigest_0: Uint8Array,
                            dailyLimit_0: bigint,
                            vaultNonce_0: Uint8Array,
                            vaultRandomness_0: Uint8Array): __compactRuntime.CircuitResults<PS, Uint8Array>;
  deriveCardSpendNullifier(context: __compactRuntime.CircuitContext<PS>,
                           cardId_0: Uint8Array,
                           paymentId_0: Uint8Array,
                           spendSecret_0: Uint8Array): __compactRuntime.CircuitResults<PS, Uint8Array>;
  createCardVault(context: __compactRuntime.CircuitContext<PS>,
                  cardId_0: Uint8Array,
                  commitment_0: Uint8Array,
                  ownerAuthorization_0: Uint8Array,
                  cardNumberHash_0: Uint8Array,
                  metadataDigest_0: Uint8Array,
                  dailyLimit_0: bigint): __compactRuntime.CircuitResults<PS, []>;
  updateCardMetadata(context: __compactRuntime.CircuitContext<PS>,
                     cardId_0: Uint8Array,
                     ownerSecret_0: Uint8Array,
                     metadataDigest_0: Uint8Array): __compactRuntime.CircuitResults<PS, []>;
  setCardDailyLimit(context: __compactRuntime.CircuitContext<PS>,
                    cardId_0: Uint8Array,
                    ownerSecret_0: Uint8Array,
                    dailyLimit_0: bigint): __compactRuntime.CircuitResults<PS, []>;
  recordCardSpend(context: __compactRuntime.CircuitContext<PS>,
                  cardId_0: Uint8Array,
                  ownerPrivateIdentity_0: Uint8Array,
                  cardNumberHash_0: Uint8Array,
                  metadataDigest_0: Uint8Array,
                  dailyLimitAtCreation_0: bigint,
                  vaultNonce_0: Uint8Array,
                  vaultRandomness_0: Uint8Array,
                  paymentId_0: Uint8Array,
                  spendSecret_0: Uint8Array,
                  tokenId_0: Uint8Array,
                  amount_0: bigint,
                  epochDay_0: bigint): __compactRuntime.CircuitResults<PS, []>;
  closeCardVault(context: __compactRuntime.CircuitContext<PS>,
                 cardId_0: Uint8Array,
                 ownerSecret_0: Uint8Array): __compactRuntime.CircuitResults<PS, []>;
}

export type Ledger = {
  cardVaultIds: {
    isEmpty(): boolean;
    size(): bigint;
    member(elem_0: Uint8Array): boolean;
    [Symbol.iterator](): Iterator<Uint8Array>
  };
  cardVaults: {
    isEmpty(): boolean;
    size(): bigint;
    member(key_0: Uint8Array): boolean;
    lookup(key_0: Uint8Array): CardVaultPublicState;
    [Symbol.iterator](): Iterator<[Uint8Array, CardVaultPublicState]>
  };
  cardSpendIds: {
    isEmpty(): boolean;
    size(): bigint;
    member(elem_0: Uint8Array): boolean;
    [Symbol.iterator](): Iterator<Uint8Array>
  };
  cardSpends: {
    isEmpty(): boolean;
    size(): bigint;
    member(key_0: Uint8Array): boolean;
    lookup(key_0: Uint8Array): CardSpendPublicState;
    [Symbol.iterator](): Iterator<[Uint8Array, CardSpendPublicState]>
  };
  cardSpendNullifiers: {
    isEmpty(): boolean;
    size(): bigint;
    member(elem_0: Uint8Array): boolean;
    [Symbol.iterator](): Iterator<Uint8Array>
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
