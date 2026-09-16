import type * as __compactRuntime from '@midnight-ntwrk/compact-runtime';

export enum GiftCardStatus { OPEN = 0, REDEEMED = 1, RECLAIMED = 2 }

export type GiftCardPublicState = { commitmentVersion: bigint;
                                    commitment: Uint8Array;
                                    issuerAuthorization: Uint8Array;
                                    expiry: bigint;
                                    escrowCoinCommitment: Uint8Array;
                                    redemptionNullifier: Uint8Array;
                                    status: GiftCardStatus
                                  };

export type Witnesses<PS> = {
}

export type ImpureCircuits<PS> = {
  createGiftCard(context: __compactRuntime.CircuitContext<PS>,
                 giftCardId_0: Uint8Array,
                 amount_0: bigint,
                 tokenId_0: Uint8Array,
                 giftSecret_0: Uint8Array,
                 giftRandomness_0: Uint8Array,
                 issuerAuthorizationCommitment_0: Uint8Array,
                 expiry_0: bigint,
                 coin_0: { nonce: Uint8Array, color: Uint8Array, value: bigint }): __compactRuntime.CircuitResults<PS, []>;
  redeemGiftCard(context: __compactRuntime.CircuitContext<PS>,
                 giftCardId_0: Uint8Array,
                 amount_0: bigint,
                 tokenId_0: Uint8Array,
                 giftSecret_0: Uint8Array,
                 giftRandomness_0: Uint8Array,
                 escrowCoin_0: { nonce: Uint8Array,
                                 color: Uint8Array,
                                 value: bigint,
                                 mt_index: bigint
                               }): __compactRuntime.CircuitResults<PS, { change: { is_some: boolean,
                                                                                   value: { nonce: Uint8Array,
                                                                                            color: Uint8Array,
                                                                                            value: bigint
                                                                                          }
                                                                                 },
                                                                         sent: { nonce: Uint8Array,
                                                                                 color: Uint8Array,
                                                                                 value: bigint
                                                                               }
                                                                       }>;
  reclaimExpiredGiftCard(context: __compactRuntime.CircuitContext<PS>,
                         giftCardId_0: Uint8Array,
                         issuerSecret_0: Uint8Array,
                         escrowCoin_0: { nonce: Uint8Array,
                                         color: Uint8Array,
                                         value: bigint,
                                         mt_index: bigint
                                       }): __compactRuntime.CircuitResults<PS, { change: { is_some: boolean,
                                                                                           value: { nonce: Uint8Array,
                                                                                                    color: Uint8Array,
                                                                                                    value: bigint
                                                                                                  }
                                                                                         },
                                                                                 sent: { nonce: Uint8Array,
                                                                                         color: Uint8Array,
                                                                                         value: bigint
                                                                                       }
                                                                               }>;
}

export type ProvableCircuits<PS> = {
  createGiftCard(context: __compactRuntime.CircuitContext<PS>,
                 giftCardId_0: Uint8Array,
                 amount_0: bigint,
                 tokenId_0: Uint8Array,
                 giftSecret_0: Uint8Array,
                 giftRandomness_0: Uint8Array,
                 issuerAuthorizationCommitment_0: Uint8Array,
                 expiry_0: bigint,
                 coin_0: { nonce: Uint8Array, color: Uint8Array, value: bigint }): __compactRuntime.CircuitResults<PS, []>;
  redeemGiftCard(context: __compactRuntime.CircuitContext<PS>,
                 giftCardId_0: Uint8Array,
                 amount_0: bigint,
                 tokenId_0: Uint8Array,
                 giftSecret_0: Uint8Array,
                 giftRandomness_0: Uint8Array,
                 escrowCoin_0: { nonce: Uint8Array,
                                 color: Uint8Array,
                                 value: bigint,
                                 mt_index: bigint
                               }): __compactRuntime.CircuitResults<PS, { change: { is_some: boolean,
                                                                                   value: { nonce: Uint8Array,
                                                                                            color: Uint8Array,
                                                                                            value: bigint
                                                                                          }
                                                                                 },
                                                                         sent: { nonce: Uint8Array,
                                                                                 color: Uint8Array,
                                                                                 value: bigint
                                                                               }
                                                                       }>;
  reclaimExpiredGiftCard(context: __compactRuntime.CircuitContext<PS>,
                         giftCardId_0: Uint8Array,
                         issuerSecret_0: Uint8Array,
                         escrowCoin_0: { nonce: Uint8Array,
                                         color: Uint8Array,
                                         value: bigint,
                                         mt_index: bigint
                                       }): __compactRuntime.CircuitResults<PS, { change: { is_some: boolean,
                                                                                           value: { nonce: Uint8Array,
                                                                                                    color: Uint8Array,
                                                                                                    value: bigint
                                                                                                  }
                                                                                         },
                                                                                 sent: { nonce: Uint8Array,
                                                                                         color: Uint8Array,
                                                                                         value: bigint
                                                                                       }
                                                                               }>;
}

export type PureCircuits = {
  deriveEscrowCoinCommitment(nonce_0: Uint8Array,
                             color_0: Uint8Array,
                             value_0: bigint): Uint8Array;
  deriveGiftCardCommitment(giftCardId_0: Uint8Array,
                           amount_0: bigint,
                           tokenId_0: Uint8Array,
                           giftSecret_0: Uint8Array,
                           randomness_0: Uint8Array,
                           expiry_0: bigint): Uint8Array;
  deriveGiftCardIssuerAuthorization(giftCardId_0: Uint8Array,
                                    issuerSecret_0: Uint8Array): Uint8Array;
  deriveGiftCardRedemptionNullifier(giftCardId_0: Uint8Array,
                                    giftSecret_0: Uint8Array): Uint8Array;
  deriveGiftCardReclaimNullifier(giftCardId_0: Uint8Array,
                                 issuerSecret_0: Uint8Array): Uint8Array;
}

export type Circuits<PS> = {
  deriveEscrowCoinCommitment(context: __compactRuntime.CircuitContext<PS>,
                             nonce_0: Uint8Array,
                             color_0: Uint8Array,
                             value_0: bigint): __compactRuntime.CircuitResults<PS, Uint8Array>;
  deriveGiftCardCommitment(context: __compactRuntime.CircuitContext<PS>,
                           giftCardId_0: Uint8Array,
                           amount_0: bigint,
                           tokenId_0: Uint8Array,
                           giftSecret_0: Uint8Array,
                           randomness_0: Uint8Array,
                           expiry_0: bigint): __compactRuntime.CircuitResults<PS, Uint8Array>;
  deriveGiftCardIssuerAuthorization(context: __compactRuntime.CircuitContext<PS>,
                                    giftCardId_0: Uint8Array,
                                    issuerSecret_0: Uint8Array): __compactRuntime.CircuitResults<PS, Uint8Array>;
  deriveGiftCardRedemptionNullifier(context: __compactRuntime.CircuitContext<PS>,
                                    giftCardId_0: Uint8Array,
                                    giftSecret_0: Uint8Array): __compactRuntime.CircuitResults<PS, Uint8Array>;
  deriveGiftCardReclaimNullifier(context: __compactRuntime.CircuitContext<PS>,
                                 giftCardId_0: Uint8Array,
                                 issuerSecret_0: Uint8Array): __compactRuntime.CircuitResults<PS, Uint8Array>;
  createGiftCard(context: __compactRuntime.CircuitContext<PS>,
                 giftCardId_0: Uint8Array,
                 amount_0: bigint,
                 tokenId_0: Uint8Array,
                 giftSecret_0: Uint8Array,
                 giftRandomness_0: Uint8Array,
                 issuerAuthorizationCommitment_0: Uint8Array,
                 expiry_0: bigint,
                 coin_0: { nonce: Uint8Array, color: Uint8Array, value: bigint }): __compactRuntime.CircuitResults<PS, []>;
  redeemGiftCard(context: __compactRuntime.CircuitContext<PS>,
                 giftCardId_0: Uint8Array,
                 amount_0: bigint,
                 tokenId_0: Uint8Array,
                 giftSecret_0: Uint8Array,
                 giftRandomness_0: Uint8Array,
                 escrowCoin_0: { nonce: Uint8Array,
                                 color: Uint8Array,
                                 value: bigint,
                                 mt_index: bigint
                               }): __compactRuntime.CircuitResults<PS, { change: { is_some: boolean,
                                                                                   value: { nonce: Uint8Array,
                                                                                            color: Uint8Array,
                                                                                            value: bigint
                                                                                          }
                                                                                 },
                                                                         sent: { nonce: Uint8Array,
                                                                                 color: Uint8Array,
                                                                                 value: bigint
                                                                               }
                                                                       }>;
  reclaimExpiredGiftCard(context: __compactRuntime.CircuitContext<PS>,
                         giftCardId_0: Uint8Array,
                         issuerSecret_0: Uint8Array,
                         escrowCoin_0: { nonce: Uint8Array,
                                         color: Uint8Array,
                                         value: bigint,
                                         mt_index: bigint
                                       }): __compactRuntime.CircuitResults<PS, { change: { is_some: boolean,
                                                                                           value: { nonce: Uint8Array,
                                                                                                    color: Uint8Array,
                                                                                                    value: bigint
                                                                                                  }
                                                                                         },
                                                                                 sent: { nonce: Uint8Array,
                                                                                         color: Uint8Array,
                                                                                         value: bigint
                                                                                       }
                                                                               }>;
}

export type Ledger = {
  giftCardIds: {
    isEmpty(): boolean;
    size(): bigint;
    member(elem_0: Uint8Array): boolean;
    [Symbol.iterator](): Iterator<Uint8Array>
  };
  giftCards: {
    isEmpty(): boolean;
    size(): bigint;
    member(key_0: Uint8Array): boolean;
    lookup(key_0: Uint8Array): GiftCardPublicState;
    [Symbol.iterator](): Iterator<[Uint8Array, GiftCardPublicState]>
  };
  giftCardNullifiers: {
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
