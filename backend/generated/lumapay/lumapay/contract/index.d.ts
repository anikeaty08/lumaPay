import type * as __compactRuntime from '@midnight-ntwrk/compact-runtime';

export enum InvoiceStatus { OPEN = 0, SETTLED = 1, CANCELLED = 2, EXPIRED = 3 }

export enum CampaignStatus { OPEN = 0, CANCELLED = 1, EXPIRED = 2 }

export enum GiftCardStatus { OPEN = 0, REDEEMED = 1, RECLAIMED = 2 }

export type InvoicePublicState = { commitmentVersion: bigint;
                                   commitment: Uint8Array;
                                   merchantAuthorization: Uint8Array;
                                   expiry: bigint;
                                   status: InvoiceStatus;
                                   settlementNullifier: Uint8Array;
                                   escrowCoinCommitment: Uint8Array;
                                   receiptCommitment: Uint8Array;
                                   claimed: boolean
                                 };

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

export type GiftCardPublicState = { commitmentVersion: bigint;
                                    commitment: Uint8Array;
                                    issuerAuthorization: Uint8Array;
                                    expiry: bigint;
                                    escrowCoinCommitment: Uint8Array;
                                    redemptionNullifier: Uint8Array;
                                    status: GiftCardStatus
                                  };

export type QuotePublicState = { commitmentVersion: bigint;
                                 commitment: Uint8Array;
                                 providerId: Uint8Array;
                                 expiry: bigint;
                                 consumed: boolean
                               };

export type BackupAnchorPublicState = { formatVersion: bigint;
                                        authorization: Uint8Array;
                                        encryptedBlobDigest: Uint8Array
                                      };

export type Witnesses<PS> = {
}

export type ImpureCircuits<PS> = {
  createInvoice(context: __compactRuntime.CircuitContext<PS>,
                invoiceId_0: Uint8Array,
                invoiceCommitment_0: Uint8Array,
                merchantAuthorizationCommitment_0: Uint8Array,
                expiry_0: bigint): __compactRuntime.CircuitResults<PS, []>;
  payInvoice(context: __compactRuntime.CircuitContext<PS>,
             invoiceId_0: Uint8Array,
             merchantPrivateIdentity_0: Uint8Array,
             amount_0: bigint,
             tokenId_0: Uint8Array,
             invoiceNonce_0: Uint8Array,
             invoiceRandomness_0: Uint8Array,
             paymentSecret_0: Uint8Array,
             receiptSecret_0: Uint8Array,
             coin_0: { nonce: Uint8Array, color: Uint8Array, value: bigint }): __compactRuntime.CircuitResults<PS, []>;
  claimInvoice(context: __compactRuntime.CircuitContext<PS>,
               invoiceId_0: Uint8Array,
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
  cancelInvoice(context: __compactRuntime.CircuitContext<PS>,
                invoiceId_0: Uint8Array,
                merchantClaimSecret_0: Uint8Array): __compactRuntime.CircuitResults<PS, []>;
  expireInvoice(context: __compactRuntime.CircuitContext<PS>,
                invoiceId_0: Uint8Array): __compactRuntime.CircuitResults<PS, []>;
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
  rotateRegistryAdmin(context: __compactRuntime.CircuitContext<PS>,
                      currentAdminSecret_0: Uint8Array,
                      newAdminAuthorizationCommitment_0: Uint8Array): __compactRuntime.CircuitResults<PS, []>;
  registerQuoteProvider(context: __compactRuntime.CircuitContext<PS>,
                        providerId_0: Uint8Array,
                        providerAuthorizationCommitment_0: Uint8Array,
                        registryAdminSecret_0: Uint8Array): __compactRuntime.CircuitResults<PS, []>;
  rotateQuoteProvider(context: __compactRuntime.CircuitContext<PS>,
                      providerId_0: Uint8Array,
                      newProviderAuthorizationCommitment_0: Uint8Array,
                      registryAdminSecret_0: Uint8Array): __compactRuntime.CircuitResults<PS, []>;
  removeQuoteProvider(context: __compactRuntime.CircuitContext<PS>,
                      providerId_0: Uint8Array,
                      registryAdminSecret_0: Uint8Array): __compactRuntime.CircuitResults<PS, []>;
  registerQuote(context: __compactRuntime.CircuitContext<PS>,
                quoteId_0: Uint8Array,
                providerId_0: Uint8Array,
                quoteCommitment_0: Uint8Array,
                expiry_0: bigint,
                providerSecret_0: Uint8Array): __compactRuntime.CircuitResults<PS, []>;
  payInvoiceWithQuote(context: __compactRuntime.CircuitContext<PS>,
                      invoiceId_0: Uint8Array,
                      merchantPrivateIdentity_0: Uint8Array,
                      requestedAmount_0: bigint,
                      requestedToken_0: Uint8Array,
                      invoiceNonce_0: Uint8Array,
                      invoiceRandomness_0: Uint8Array,
                      quoteId_0: Uint8Array,
                      providerId_0: Uint8Array,
                      paymentToken_0: Uint8Array,
                      acceptedPaymentAmount_0: bigint,
                      quoteRandomness_0: Uint8Array,
                      paymentSecret_0: Uint8Array,
                      receiptSecret_0: Uint8Array,
                      coin_0: { nonce: Uint8Array,
                                color: Uint8Array,
                                value: bigint
                              }): __compactRuntime.CircuitResults<PS, []>;
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
  proveInvoiceSettlement(context: __compactRuntime.CircuitContext<PS>,
                         invoiceId_0: Uint8Array,
                         paidAmount_0: bigint,
                         paidToken_0: Uint8Array,
                         receiptSecret_0: Uint8Array): __compactRuntime.CircuitResults<PS, []>;
  proveContributionSettlement(context: __compactRuntime.CircuitContext<PS>,
                              contributionId_0: Uint8Array,
                              paidAmount_0: bigint,
                              paidToken_0: Uint8Array,
                              receiptSecret_0: Uint8Array): __compactRuntime.CircuitResults<PS, []>;
}

export type ProvableCircuits<PS> = {
  createInvoice(context: __compactRuntime.CircuitContext<PS>,
                invoiceId_0: Uint8Array,
                invoiceCommitment_0: Uint8Array,
                merchantAuthorizationCommitment_0: Uint8Array,
                expiry_0: bigint): __compactRuntime.CircuitResults<PS, []>;
  payInvoice(context: __compactRuntime.CircuitContext<PS>,
             invoiceId_0: Uint8Array,
             merchantPrivateIdentity_0: Uint8Array,
             amount_0: bigint,
             tokenId_0: Uint8Array,
             invoiceNonce_0: Uint8Array,
             invoiceRandomness_0: Uint8Array,
             paymentSecret_0: Uint8Array,
             receiptSecret_0: Uint8Array,
             coin_0: { nonce: Uint8Array, color: Uint8Array, value: bigint }): __compactRuntime.CircuitResults<PS, []>;
  claimInvoice(context: __compactRuntime.CircuitContext<PS>,
               invoiceId_0: Uint8Array,
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
  cancelInvoice(context: __compactRuntime.CircuitContext<PS>,
                invoiceId_0: Uint8Array,
                merchantClaimSecret_0: Uint8Array): __compactRuntime.CircuitResults<PS, []>;
  expireInvoice(context: __compactRuntime.CircuitContext<PS>,
                invoiceId_0: Uint8Array): __compactRuntime.CircuitResults<PS, []>;
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
  rotateRegistryAdmin(context: __compactRuntime.CircuitContext<PS>,
                      currentAdminSecret_0: Uint8Array,
                      newAdminAuthorizationCommitment_0: Uint8Array): __compactRuntime.CircuitResults<PS, []>;
  registerQuoteProvider(context: __compactRuntime.CircuitContext<PS>,
                        providerId_0: Uint8Array,
                        providerAuthorizationCommitment_0: Uint8Array,
                        registryAdminSecret_0: Uint8Array): __compactRuntime.CircuitResults<PS, []>;
  rotateQuoteProvider(context: __compactRuntime.CircuitContext<PS>,
                      providerId_0: Uint8Array,
                      newProviderAuthorizationCommitment_0: Uint8Array,
                      registryAdminSecret_0: Uint8Array): __compactRuntime.CircuitResults<PS, []>;
  removeQuoteProvider(context: __compactRuntime.CircuitContext<PS>,
                      providerId_0: Uint8Array,
                      registryAdminSecret_0: Uint8Array): __compactRuntime.CircuitResults<PS, []>;
  registerQuote(context: __compactRuntime.CircuitContext<PS>,
                quoteId_0: Uint8Array,
                providerId_0: Uint8Array,
                quoteCommitment_0: Uint8Array,
                expiry_0: bigint,
                providerSecret_0: Uint8Array): __compactRuntime.CircuitResults<PS, []>;
  payInvoiceWithQuote(context: __compactRuntime.CircuitContext<PS>,
                      invoiceId_0: Uint8Array,
                      merchantPrivateIdentity_0: Uint8Array,
                      requestedAmount_0: bigint,
                      requestedToken_0: Uint8Array,
                      invoiceNonce_0: Uint8Array,
                      invoiceRandomness_0: Uint8Array,
                      quoteId_0: Uint8Array,
                      providerId_0: Uint8Array,
                      paymentToken_0: Uint8Array,
                      acceptedPaymentAmount_0: bigint,
                      quoteRandomness_0: Uint8Array,
                      paymentSecret_0: Uint8Array,
                      receiptSecret_0: Uint8Array,
                      coin_0: { nonce: Uint8Array,
                                color: Uint8Array,
                                value: bigint
                              }): __compactRuntime.CircuitResults<PS, []>;
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
  proveInvoiceSettlement(context: __compactRuntime.CircuitContext<PS>,
                         invoiceId_0: Uint8Array,
                         paidAmount_0: bigint,
                         paidToken_0: Uint8Array,
                         receiptSecret_0: Uint8Array): __compactRuntime.CircuitResults<PS, []>;
  proveContributionSettlement(context: __compactRuntime.CircuitContext<PS>,
                              contributionId_0: Uint8Array,
                              paidAmount_0: bigint,
                              paidToken_0: Uint8Array,
                              receiptSecret_0: Uint8Array): __compactRuntime.CircuitResults<PS, []>;
}

export type PureCircuits = {
  deriveMerchantAuthorization(merchantClaimSecret_0: Uint8Array): Uint8Array;
  deriveRegistryAdminAuthorization(adminSecret_0: Uint8Array): Uint8Array;
  deriveQuoteProviderAuthorization(providerId_0: Uint8Array,
                                   providerSecret_0: Uint8Array): Uint8Array;
  deriveBackupAuthorization(ownerId_0: Uint8Array, backupSecret_0: Uint8Array): Uint8Array;
  deriveInvoiceCommitment(invoiceId_0: Uint8Array,
                          merchantPrivateIdentity_0: Uint8Array,
                          amount_0: bigint,
                          tokenId_0: Uint8Array,
                          invoiceNonce_0: Uint8Array,
                          randomness_0: Uint8Array,
                          expiry_0: bigint): Uint8Array;
  derivePaymentNullifier(invoiceId_0: Uint8Array, paymentSecret_0: Uint8Array): Uint8Array;
  deriveClaimNullifier(invoiceId_0: Uint8Array,
                       merchantClaimSecret_0: Uint8Array): Uint8Array;
  deriveEscrowCoinCommitment(nonce_0: Uint8Array,
                             color_0: Uint8Array,
                             value_0: bigint): Uint8Array;
  deriveReceiptCommitment(invoiceId_0: Uint8Array,
                          settlementNullifier_0: Uint8Array,
                          amount_0: bigint,
                          tokenId_0: Uint8Array,
                          receiptSecret_0: Uint8Array): Uint8Array;
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
  deriveQuoteCommitment(quoteId_0: Uint8Array,
                        providerId_0: Uint8Array,
                        invoiceId_0: Uint8Array,
                        requestedToken_0: Uint8Array,
                        requestedAmount_0: bigint,
                        paymentToken_0: Uint8Array,
                        acceptedPaymentAmount_0: bigint,
                        expiry_0: bigint,
                        randomness_0: Uint8Array): Uint8Array;
  verifyReceipt(invoiceId_0: Uint8Array,
                settlementNullifier_0: Uint8Array,
                amount_0: bigint,
                tokenId_0: Uint8Array,
                receiptSecret_0: Uint8Array,
                expectedReceiptCommitment_0: Uint8Array): boolean;
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
  deriveRegistryAdminAuthorization(context: __compactRuntime.CircuitContext<PS>,
                                   adminSecret_0: Uint8Array): __compactRuntime.CircuitResults<PS, Uint8Array>;
  deriveQuoteProviderAuthorization(context: __compactRuntime.CircuitContext<PS>,
                                   providerId_0: Uint8Array,
                                   providerSecret_0: Uint8Array): __compactRuntime.CircuitResults<PS, Uint8Array>;
  deriveBackupAuthorization(context: __compactRuntime.CircuitContext<PS>,
                            ownerId_0: Uint8Array,
                            backupSecret_0: Uint8Array): __compactRuntime.CircuitResults<PS, Uint8Array>;
  deriveInvoiceCommitment(context: __compactRuntime.CircuitContext<PS>,
                          invoiceId_0: Uint8Array,
                          merchantPrivateIdentity_0: Uint8Array,
                          amount_0: bigint,
                          tokenId_0: Uint8Array,
                          invoiceNonce_0: Uint8Array,
                          randomness_0: Uint8Array,
                          expiry_0: bigint): __compactRuntime.CircuitResults<PS, Uint8Array>;
  derivePaymentNullifier(context: __compactRuntime.CircuitContext<PS>,
                         invoiceId_0: Uint8Array,
                         paymentSecret_0: Uint8Array): __compactRuntime.CircuitResults<PS, Uint8Array>;
  deriveClaimNullifier(context: __compactRuntime.CircuitContext<PS>,
                       invoiceId_0: Uint8Array,
                       merchantClaimSecret_0: Uint8Array): __compactRuntime.CircuitResults<PS, Uint8Array>;
  deriveEscrowCoinCommitment(context: __compactRuntime.CircuitContext<PS>,
                             nonce_0: Uint8Array,
                             color_0: Uint8Array,
                             value_0: bigint): __compactRuntime.CircuitResults<PS, Uint8Array>;
  deriveReceiptCommitment(context: __compactRuntime.CircuitContext<PS>,
                          invoiceId_0: Uint8Array,
                          settlementNullifier_0: Uint8Array,
                          amount_0: bigint,
                          tokenId_0: Uint8Array,
                          receiptSecret_0: Uint8Array): __compactRuntime.CircuitResults<PS, Uint8Array>;
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
  deriveQuoteCommitment(context: __compactRuntime.CircuitContext<PS>,
                        quoteId_0: Uint8Array,
                        providerId_0: Uint8Array,
                        invoiceId_0: Uint8Array,
                        requestedToken_0: Uint8Array,
                        requestedAmount_0: bigint,
                        paymentToken_0: Uint8Array,
                        acceptedPaymentAmount_0: bigint,
                        expiry_0: bigint,
                        randomness_0: Uint8Array): __compactRuntime.CircuitResults<PS, Uint8Array>;
  createInvoice(context: __compactRuntime.CircuitContext<PS>,
                invoiceId_0: Uint8Array,
                invoiceCommitment_0: Uint8Array,
                merchantAuthorizationCommitment_0: Uint8Array,
                expiry_0: bigint): __compactRuntime.CircuitResults<PS, []>;
  payInvoice(context: __compactRuntime.CircuitContext<PS>,
             invoiceId_0: Uint8Array,
             merchantPrivateIdentity_0: Uint8Array,
             amount_0: bigint,
             tokenId_0: Uint8Array,
             invoiceNonce_0: Uint8Array,
             invoiceRandomness_0: Uint8Array,
             paymentSecret_0: Uint8Array,
             receiptSecret_0: Uint8Array,
             coin_0: { nonce: Uint8Array, color: Uint8Array, value: bigint }): __compactRuntime.CircuitResults<PS, []>;
  claimInvoice(context: __compactRuntime.CircuitContext<PS>,
               invoiceId_0: Uint8Array,
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
  cancelInvoice(context: __compactRuntime.CircuitContext<PS>,
                invoiceId_0: Uint8Array,
                merchantClaimSecret_0: Uint8Array): __compactRuntime.CircuitResults<PS, []>;
  expireInvoice(context: __compactRuntime.CircuitContext<PS>,
                invoiceId_0: Uint8Array): __compactRuntime.CircuitResults<PS, []>;
  verifyReceipt(context: __compactRuntime.CircuitContext<PS>,
                invoiceId_0: Uint8Array,
                settlementNullifier_0: Uint8Array,
                amount_0: bigint,
                tokenId_0: Uint8Array,
                receiptSecret_0: Uint8Array,
                expectedReceiptCommitment_0: Uint8Array): __compactRuntime.CircuitResults<PS, boolean>;
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
  rotateRegistryAdmin(context: __compactRuntime.CircuitContext<PS>,
                      currentAdminSecret_0: Uint8Array,
                      newAdminAuthorizationCommitment_0: Uint8Array): __compactRuntime.CircuitResults<PS, []>;
  registerQuoteProvider(context: __compactRuntime.CircuitContext<PS>,
                        providerId_0: Uint8Array,
                        providerAuthorizationCommitment_0: Uint8Array,
                        registryAdminSecret_0: Uint8Array): __compactRuntime.CircuitResults<PS, []>;
  rotateQuoteProvider(context: __compactRuntime.CircuitContext<PS>,
                      providerId_0: Uint8Array,
                      newProviderAuthorizationCommitment_0: Uint8Array,
                      registryAdminSecret_0: Uint8Array): __compactRuntime.CircuitResults<PS, []>;
  removeQuoteProvider(context: __compactRuntime.CircuitContext<PS>,
                      providerId_0: Uint8Array,
                      registryAdminSecret_0: Uint8Array): __compactRuntime.CircuitResults<PS, []>;
  registerQuote(context: __compactRuntime.CircuitContext<PS>,
                quoteId_0: Uint8Array,
                providerId_0: Uint8Array,
                quoteCommitment_0: Uint8Array,
                expiry_0: bigint,
                providerSecret_0: Uint8Array): __compactRuntime.CircuitResults<PS, []>;
  payInvoiceWithQuote(context: __compactRuntime.CircuitContext<PS>,
                      invoiceId_0: Uint8Array,
                      merchantPrivateIdentity_0: Uint8Array,
                      requestedAmount_0: bigint,
                      requestedToken_0: Uint8Array,
                      invoiceNonce_0: Uint8Array,
                      invoiceRandomness_0: Uint8Array,
                      quoteId_0: Uint8Array,
                      providerId_0: Uint8Array,
                      paymentToken_0: Uint8Array,
                      acceptedPaymentAmount_0: bigint,
                      quoteRandomness_0: Uint8Array,
                      paymentSecret_0: Uint8Array,
                      receiptSecret_0: Uint8Array,
                      coin_0: { nonce: Uint8Array,
                                color: Uint8Array,
                                value: bigint
                              }): __compactRuntime.CircuitResults<PS, []>;
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
  proveInvoiceSettlement(context: __compactRuntime.CircuitContext<PS>,
                         invoiceId_0: Uint8Array,
                         paidAmount_0: bigint,
                         paidToken_0: Uint8Array,
                         receiptSecret_0: Uint8Array): __compactRuntime.CircuitResults<PS, []>;
  proveContributionSettlement(context: __compactRuntime.CircuitContext<PS>,
                              contributionId_0: Uint8Array,
                              paidAmount_0: bigint,
                              paidToken_0: Uint8Array,
                              receiptSecret_0: Uint8Array): __compactRuntime.CircuitResults<PS, []>;
}

export type Ledger = {
  invoiceIds: {
    isEmpty(): boolean;
    size(): bigint;
    member(elem_0: Uint8Array): boolean;
    [Symbol.iterator](): Iterator<Uint8Array>
  };
  invoices: {
    isEmpty(): boolean;
    size(): bigint;
    member(key_0: Uint8Array): boolean;
    lookup(key_0: Uint8Array): InvoicePublicState;
    [Symbol.iterator](): Iterator<[Uint8Array, InvoicePublicState]>
  };
  paymentNullifiers: {
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
  quoteIds: {
    isEmpty(): boolean;
    size(): bigint;
    member(elem_0: Uint8Array): boolean;
    [Symbol.iterator](): Iterator<Uint8Array>
  };
  quotes: {
    isEmpty(): boolean;
    size(): bigint;
    member(key_0: Uint8Array): boolean;
    lookup(key_0: Uint8Array): QuotePublicState;
    [Symbol.iterator](): Iterator<[Uint8Array, QuotePublicState]>
  };
  quoteProviderIds: {
    isEmpty(): boolean;
    size(): bigint;
    member(elem_0: Uint8Array): boolean;
    [Symbol.iterator](): Iterator<Uint8Array>
  };
  quoteProviderAuthorizations: {
    isEmpty(): boolean;
    size(): bigint;
    member(key_0: Uint8Array): boolean;
    lookup(key_0: Uint8Array): Uint8Array;
    [Symbol.iterator](): Iterator<[Uint8Array, Uint8Array]>
  };
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
  readonly registryAdminAuthorization: Uint8Array;
}

export type ContractReferenceLocations = any;

export declare const contractReferenceLocations : ContractReferenceLocations;

export declare class Contract<PS = any, W extends Witnesses<PS> = Witnesses<PS>> {
  witnesses: W;
  circuits: Circuits<PS>;
  impureCircuits: ImpureCircuits<PS>;
  provableCircuits: ProvableCircuits<PS>;
  constructor(witnesses: W);
  initialState(context: __compactRuntime.ConstructorContext<PS>,
               registryAdminAuthorizationCommitment_0: Uint8Array): __compactRuntime.ConstructorResult<PS>;
}

export declare function ledger(state: __compactRuntime.StateValue | __compactRuntime.ChargedState): Ledger;
export declare const pureCircuits: PureCircuits;
