import type * as __compactRuntime from '@midnight-ntwrk/compact-runtime';

export enum CampaignStatus { OPEN = 0, CANCELLED = 1, EXPIRED = 2 }

export type CampaignPublicState = { commitmentVersion: bigint;
                                    commitment: Uint8Array;
                                    merchantAuthorization: Uint8Array;
                                    expiry: bigint;
                                    status: CampaignStatus;
                                    contributionCount: bigint
                                  };

export type ContributionPublicState = { campaignId: Uint8Array;
                                        nullifier: Uint8Array;
                                        escrowCoinCommitment: Uint8Array;
                                        receiptCommitment: Uint8Array;
                                        claimed: boolean
                                      };

export type Witnesses<PS> = {
}

export type ImpureCircuits<PS> = {
  createCampaign(context: __compactRuntime.CircuitContext<PS>,
                 campaignId_0: Uint8Array,
                 campaignCommitment_0: Uint8Array,
                 merchantAuthorizationCommitment_0: Uint8Array,
                 expiry_0: bigint): __compactRuntime.CircuitResults<PS, []>;
  contribute(context: __compactRuntime.CircuitContext<PS>,
             campaignId_0: Uint8Array,
             merchantPrivateIdentity_0: Uint8Array,
             minimumContribution_0: bigint,
             maximumContribution_0: bigint,
             acceptedTokenCount_0: bigint,
             acceptedTokenA_0: Uint8Array,
             acceptedTokenB_0: Uint8Array,
             acceptedTokenC_0: Uint8Array,
             acceptedTokenD_0: Uint8Array,
             campaignNonce_0: Uint8Array,
             campaignRandomness_0: Uint8Array,
             contributionSecret_0: Uint8Array,
             receiptSecret_0: Uint8Array,
             coin_0: { nonce: Uint8Array, color: Uint8Array, value: bigint }): __compactRuntime.CircuitResults<PS, []>;
  claimContribution(context: __compactRuntime.CircuitContext<PS>,
                    contributionId_0: Uint8Array,
                    merchantClaimSecret_0: Uint8Array,
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
  cancelCampaign(context: __compactRuntime.CircuitContext<PS>,
                 campaignId_0: Uint8Array,
                 merchantClaimSecret_0: Uint8Array): __compactRuntime.CircuitResults<PS, []>;
  expireCampaign(context: __compactRuntime.CircuitContext<PS>,
                 campaignId_0: Uint8Array): __compactRuntime.CircuitResults<PS, []>;
  proveContributionSettlement(context: __compactRuntime.CircuitContext<PS>,
                              contributionId_0: Uint8Array,
                              paidAmount_0: bigint,
                              paidToken_0: Uint8Array,
                              receiptSecret_0: Uint8Array): __compactRuntime.CircuitResults<PS, []>;
}

export type ProvableCircuits<PS> = {
  createCampaign(context: __compactRuntime.CircuitContext<PS>,
                 campaignId_0: Uint8Array,
                 campaignCommitment_0: Uint8Array,
                 merchantAuthorizationCommitment_0: Uint8Array,
                 expiry_0: bigint): __compactRuntime.CircuitResults<PS, []>;
  contribute(context: __compactRuntime.CircuitContext<PS>,
             campaignId_0: Uint8Array,
             merchantPrivateIdentity_0: Uint8Array,
             minimumContribution_0: bigint,
             maximumContribution_0: bigint,
             acceptedTokenCount_0: bigint,
             acceptedTokenA_0: Uint8Array,
             acceptedTokenB_0: Uint8Array,
             acceptedTokenC_0: Uint8Array,
             acceptedTokenD_0: Uint8Array,
             campaignNonce_0: Uint8Array,
             campaignRandomness_0: Uint8Array,
             contributionSecret_0: Uint8Array,
             receiptSecret_0: Uint8Array,
             coin_0: { nonce: Uint8Array, color: Uint8Array, value: bigint }): __compactRuntime.CircuitResults<PS, []>;
  claimContribution(context: __compactRuntime.CircuitContext<PS>,
                    contributionId_0: Uint8Array,
                    merchantClaimSecret_0: Uint8Array,
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
  cancelCampaign(context: __compactRuntime.CircuitContext<PS>,
                 campaignId_0: Uint8Array,
                 merchantClaimSecret_0: Uint8Array): __compactRuntime.CircuitResults<PS, []>;
  expireCampaign(context: __compactRuntime.CircuitContext<PS>,
                 campaignId_0: Uint8Array): __compactRuntime.CircuitResults<PS, []>;
  proveContributionSettlement(context: __compactRuntime.CircuitContext<PS>,
                              contributionId_0: Uint8Array,
                              paidAmount_0: bigint,
                              paidToken_0: Uint8Array,
                              receiptSecret_0: Uint8Array): __compactRuntime.CircuitResults<PS, []>;
}

export type PureCircuits = {
  deriveMerchantAuthorization(merchantClaimSecret_0: Uint8Array): Uint8Array;
  deriveEscrowCoinCommitment(nonce_0: Uint8Array,
                             color_0: Uint8Array,
                             value_0: bigint): Uint8Array;
  deriveCampaignCommitment(campaignId_0: Uint8Array,
                           merchantPrivateIdentity_0: Uint8Array,
                           minimumContribution_0: bigint,
                           maximumContribution_0: bigint,
                           acceptedTokenCount_0: bigint,
                           acceptedTokenA_0: Uint8Array,
                           acceptedTokenB_0: Uint8Array,
                           acceptedTokenC_0: Uint8Array,
                           acceptedTokenD_0: Uint8Array,
                           campaignNonce_0: Uint8Array,
                           randomness_0: Uint8Array,
                           expiry_0: bigint): Uint8Array;
  deriveContributionNullifier(campaignId_0: Uint8Array,
                              contributionSecret_0: Uint8Array): Uint8Array;
  deriveContributionId(campaignId_0: Uint8Array,
                       contributionNullifier_0: Uint8Array): Uint8Array;
  deriveContributionReceiptCommitment(contributionId_0: Uint8Array,
                                      contributionNullifier_0: Uint8Array,
                                      amount_0: bigint,
                                      tokenId_0: Uint8Array,
                                      receiptSecret_0: Uint8Array): Uint8Array;
  deriveContributionClaimNullifier(contributionId_0: Uint8Array,
                                   merchantClaimSecret_0: Uint8Array): Uint8Array;
  verifyContributionReceipt(contributionId_0: Uint8Array,
                            contributionNullifier_0: Uint8Array,
                            amount_0: bigint,
                            tokenId_0: Uint8Array,
                            receiptSecret_0: Uint8Array,
                            expectedReceiptCommitment_0: Uint8Array): boolean;
}

export type Circuits<PS> = {
  deriveMerchantAuthorization(context: __compactRuntime.CircuitContext<PS>,
                              merchantClaimSecret_0: Uint8Array): __compactRuntime.CircuitResults<PS, Uint8Array>;
  deriveEscrowCoinCommitment(context: __compactRuntime.CircuitContext<PS>,
                             nonce_0: Uint8Array,
                             color_0: Uint8Array,
                             value_0: bigint): __compactRuntime.CircuitResults<PS, Uint8Array>;
  deriveCampaignCommitment(context: __compactRuntime.CircuitContext<PS>,
                           campaignId_0: Uint8Array,
                           merchantPrivateIdentity_0: Uint8Array,
                           minimumContribution_0: bigint,
                           maximumContribution_0: bigint,
                           acceptedTokenCount_0: bigint,
                           acceptedTokenA_0: Uint8Array,
                           acceptedTokenB_0: Uint8Array,
                           acceptedTokenC_0: Uint8Array,
                           acceptedTokenD_0: Uint8Array,
                           campaignNonce_0: Uint8Array,
                           randomness_0: Uint8Array,
                           expiry_0: bigint): __compactRuntime.CircuitResults<PS, Uint8Array>;
  deriveContributionNullifier(context: __compactRuntime.CircuitContext<PS>,
                              campaignId_0: Uint8Array,
                              contributionSecret_0: Uint8Array): __compactRuntime.CircuitResults<PS, Uint8Array>;
  deriveContributionId(context: __compactRuntime.CircuitContext<PS>,
                       campaignId_0: Uint8Array,
                       contributionNullifier_0: Uint8Array): __compactRuntime.CircuitResults<PS, Uint8Array>;
  deriveContributionReceiptCommitment(context: __compactRuntime.CircuitContext<PS>,
                                      contributionId_0: Uint8Array,
                                      contributionNullifier_0: Uint8Array,
                                      amount_0: bigint,
                                      tokenId_0: Uint8Array,
                                      receiptSecret_0: Uint8Array): __compactRuntime.CircuitResults<PS, Uint8Array>;
  deriveContributionClaimNullifier(context: __compactRuntime.CircuitContext<PS>,
                                   contributionId_0: Uint8Array,
                                   merchantClaimSecret_0: Uint8Array): __compactRuntime.CircuitResults<PS, Uint8Array>;
  createCampaign(context: __compactRuntime.CircuitContext<PS>,
                 campaignId_0: Uint8Array,
                 campaignCommitment_0: Uint8Array,
                 merchantAuthorizationCommitment_0: Uint8Array,
                 expiry_0: bigint): __compactRuntime.CircuitResults<PS, []>;
  contribute(context: __compactRuntime.CircuitContext<PS>,
             campaignId_0: Uint8Array,
             merchantPrivateIdentity_0: Uint8Array,
             minimumContribution_0: bigint,
             maximumContribution_0: bigint,
             acceptedTokenCount_0: bigint,
             acceptedTokenA_0: Uint8Array,
             acceptedTokenB_0: Uint8Array,
             acceptedTokenC_0: Uint8Array,
             acceptedTokenD_0: Uint8Array,
             campaignNonce_0: Uint8Array,
             campaignRandomness_0: Uint8Array,
             contributionSecret_0: Uint8Array,
             receiptSecret_0: Uint8Array,
             coin_0: { nonce: Uint8Array, color: Uint8Array, value: bigint }): __compactRuntime.CircuitResults<PS, []>;
  claimContribution(context: __compactRuntime.CircuitContext<PS>,
                    contributionId_0: Uint8Array,
                    merchantClaimSecret_0: Uint8Array,
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
  cancelCampaign(context: __compactRuntime.CircuitContext<PS>,
                 campaignId_0: Uint8Array,
                 merchantClaimSecret_0: Uint8Array): __compactRuntime.CircuitResults<PS, []>;
  expireCampaign(context: __compactRuntime.CircuitContext<PS>,
                 campaignId_0: Uint8Array): __compactRuntime.CircuitResults<PS, []>;
  verifyContributionReceipt(context: __compactRuntime.CircuitContext<PS>,
                            contributionId_0: Uint8Array,
                            contributionNullifier_0: Uint8Array,
                            amount_0: bigint,
                            tokenId_0: Uint8Array,
                            receiptSecret_0: Uint8Array,
                            expectedReceiptCommitment_0: Uint8Array): __compactRuntime.CircuitResults<PS, boolean>;
  proveContributionSettlement(context: __compactRuntime.CircuitContext<PS>,
                              contributionId_0: Uint8Array,
                              paidAmount_0: bigint,
                              paidToken_0: Uint8Array,
                              receiptSecret_0: Uint8Array): __compactRuntime.CircuitResults<PS, []>;
}

export type Ledger = {
  campaignIds: {
    isEmpty(): boolean;
    size(): bigint;
    member(elem_0: Uint8Array): boolean;
    [Symbol.iterator](): Iterator<Uint8Array>
  };
  campaigns: {
    isEmpty(): boolean;
    size(): bigint;
    member(key_0: Uint8Array): boolean;
    lookup(key_0: Uint8Array): CampaignPublicState;
    [Symbol.iterator](): Iterator<[Uint8Array, CampaignPublicState]>
  };
  contributionIds: {
    isEmpty(): boolean;
    size(): bigint;
    member(elem_0: Uint8Array): boolean;
    [Symbol.iterator](): Iterator<Uint8Array>
  };
  contributions: {
    isEmpty(): boolean;
    size(): bigint;
    member(key_0: Uint8Array): boolean;
    lookup(key_0: Uint8Array): ContributionPublicState;
    [Symbol.iterator](): Iterator<[Uint8Array, ContributionPublicState]>
  };
  contributionNullifiers: {
    isEmpty(): boolean;
    size(): bigint;
    member(elem_0: Uint8Array): boolean;
    [Symbol.iterator](): Iterator<Uint8Array>
  };
  claimNullifiers: {
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
