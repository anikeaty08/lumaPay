import type * as __compactRuntime from '@midnight-ntwrk/compact-runtime';

export enum InvoiceStatus { OPEN = 0, SETTLED = 1, CANCELLED = 2, EXPIRED = 3 }

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
  proveInvoiceSettlement(context: __compactRuntime.CircuitContext<PS>,
                         invoiceId_0: Uint8Array,
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
  proveInvoiceSettlement(context: __compactRuntime.CircuitContext<PS>,
                         invoiceId_0: Uint8Array,
                         paidAmount_0: bigint,
                         paidToken_0: Uint8Array,
                         receiptSecret_0: Uint8Array): __compactRuntime.CircuitResults<PS, []>;
}

export type PureCircuits = {
  deriveMerchantAuthorization(merchantClaimSecret_0: Uint8Array): Uint8Array;
  deriveRegistryAdminAuthorization(adminSecret_0: Uint8Array): Uint8Array;
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
  verifyReceipt(invoiceId_0: Uint8Array,
                settlementNullifier_0: Uint8Array,
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
  proveInvoiceSettlement(context: __compactRuntime.CircuitContext<PS>,
                         invoiceId_0: Uint8Array,
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
