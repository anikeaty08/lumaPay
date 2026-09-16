import * as __compactRuntime from '@midnight-ntwrk/compact-runtime';
__compactRuntime.checkRuntimeVersion('0.16.0');

export var InvoiceStatus;
(function (InvoiceStatus) {
  InvoiceStatus[InvoiceStatus['OPEN'] = 0] = 'OPEN';
  InvoiceStatus[InvoiceStatus['SETTLED'] = 1] = 'SETTLED';
  InvoiceStatus[InvoiceStatus['CANCELLED'] = 2] = 'CANCELLED';
  InvoiceStatus[InvoiceStatus['EXPIRED'] = 3] = 'EXPIRED';
})(InvoiceStatus || (InvoiceStatus = {}));

const _descriptor_0 = new __compactRuntime.CompactTypeBytes(32);

const _descriptor_1 = __compactRuntime.CompactTypeBoolean;

const _descriptor_2 = new __compactRuntime.CompactTypeUnsignedInteger(65535n, 2);

const _descriptor_3 = new __compactRuntime.CompactTypeUnsignedInteger(18446744073709551615n, 8);

const _descriptor_4 = new __compactRuntime.CompactTypeEnum(3, 1);

class _InvoicePublicState_0 {
  alignment() {
    return _descriptor_2.alignment().concat(_descriptor_0.alignment().concat(_descriptor_0.alignment().concat(_descriptor_3.alignment().concat(_descriptor_4.alignment().concat(_descriptor_0.alignment().concat(_descriptor_0.alignment().concat(_descriptor_0.alignment().concat(_descriptor_1.alignment()))))))));
  }
  fromValue(value_0) {
    return {
      commitmentVersion: _descriptor_2.fromValue(value_0),
      commitment: _descriptor_0.fromValue(value_0),
      merchantAuthorization: _descriptor_0.fromValue(value_0),
      expiry: _descriptor_3.fromValue(value_0),
      status: _descriptor_4.fromValue(value_0),
      settlementNullifier: _descriptor_0.fromValue(value_0),
      escrowCoinCommitment: _descriptor_0.fromValue(value_0),
      receiptCommitment: _descriptor_0.fromValue(value_0),
      claimed: _descriptor_1.fromValue(value_0)
    }
  }
  toValue(value_0) {
    return _descriptor_2.toValue(value_0.commitmentVersion).concat(_descriptor_0.toValue(value_0.commitment).concat(_descriptor_0.toValue(value_0.merchantAuthorization).concat(_descriptor_3.toValue(value_0.expiry).concat(_descriptor_4.toValue(value_0.status).concat(_descriptor_0.toValue(value_0.settlementNullifier).concat(_descriptor_0.toValue(value_0.escrowCoinCommitment).concat(_descriptor_0.toValue(value_0.receiptCommitment).concat(_descriptor_1.toValue(value_0.claimed)))))))));
  }
}

const _descriptor_5 = new _InvoicePublicState_0();

const _descriptor_6 = new __compactRuntime.CompactTypeUnsignedInteger(340282366920938463463374607431768211455n, 16);

class _QualifiedShieldedCoinInfo_0 {
  alignment() {
    return _descriptor_0.alignment().concat(_descriptor_0.alignment().concat(_descriptor_6.alignment().concat(_descriptor_3.alignment())));
  }
  fromValue(value_0) {
    return {
      nonce: _descriptor_0.fromValue(value_0),
      color: _descriptor_0.fromValue(value_0),
      value: _descriptor_6.fromValue(value_0),
      mt_index: _descriptor_3.fromValue(value_0)
    }
  }
  toValue(value_0) {
    return _descriptor_0.toValue(value_0.nonce).concat(_descriptor_0.toValue(value_0.color).concat(_descriptor_6.toValue(value_0.value).concat(_descriptor_3.toValue(value_0.mt_index))));
  }
}

const _descriptor_7 = new _QualifiedShieldedCoinInfo_0();

class _ShieldedCoinInfo_0 {
  alignment() {
    return _descriptor_0.alignment().concat(_descriptor_0.alignment().concat(_descriptor_6.alignment()));
  }
  fromValue(value_0) {
    return {
      nonce: _descriptor_0.fromValue(value_0),
      color: _descriptor_0.fromValue(value_0),
      value: _descriptor_6.fromValue(value_0)
    }
  }
  toValue(value_0) {
    return _descriptor_0.toValue(value_0.nonce).concat(_descriptor_0.toValue(value_0.color).concat(_descriptor_6.toValue(value_0.value)));
  }
}

const _descriptor_8 = new _ShieldedCoinInfo_0();

class _Maybe_0 {
  alignment() {
    return _descriptor_1.alignment().concat(_descriptor_8.alignment());
  }
  fromValue(value_0) {
    return {
      is_some: _descriptor_1.fromValue(value_0),
      value: _descriptor_8.fromValue(value_0)
    }
  }
  toValue(value_0) {
    return _descriptor_1.toValue(value_0.is_some).concat(_descriptor_8.toValue(value_0.value));
  }
}

const _descriptor_9 = new _Maybe_0();

class _ShieldedSendResult_0 {
  alignment() {
    return _descriptor_9.alignment().concat(_descriptor_8.alignment());
  }
  fromValue(value_0) {
    return {
      change: _descriptor_9.fromValue(value_0),
      sent: _descriptor_8.fromValue(value_0)
    }
  }
  toValue(value_0) {
    return _descriptor_9.toValue(value_0.change).concat(_descriptor_8.toValue(value_0.sent));
  }
}

const _descriptor_10 = new _ShieldedSendResult_0();

class _ZswapCoinPublicKey_0 {
  alignment() {
    return _descriptor_0.alignment();
  }
  fromValue(value_0) {
    return {
      bytes: _descriptor_0.fromValue(value_0)
    }
  }
  toValue(value_0) {
    return _descriptor_0.toValue(value_0.bytes);
  }
}

const _descriptor_11 = new _ZswapCoinPublicKey_0();

class _ContractAddress_0 {
  alignment() {
    return _descriptor_0.alignment();
  }
  fromValue(value_0) {
    return {
      bytes: _descriptor_0.fromValue(value_0)
    }
  }
  toValue(value_0) {
    return _descriptor_0.toValue(value_0.bytes);
  }
}

const _descriptor_12 = new _ContractAddress_0();

class _Either_0 {
  alignment() {
    return _descriptor_1.alignment().concat(_descriptor_11.alignment().concat(_descriptor_12.alignment()));
  }
  fromValue(value_0) {
    return {
      is_left: _descriptor_1.fromValue(value_0),
      left: _descriptor_11.fromValue(value_0),
      right: _descriptor_12.fromValue(value_0)
    }
  }
  toValue(value_0) {
    return _descriptor_1.toValue(value_0.is_left).concat(_descriptor_11.toValue(value_0.left).concat(_descriptor_12.toValue(value_0.right)));
  }
}

const _descriptor_13 = new _Either_0();

const _descriptor_14 = __compactRuntime.CompactTypeField;

class _tuple_0 {
  alignment() {
    return _descriptor_0.alignment().concat(_descriptor_0.alignment().concat(_descriptor_0.alignment().concat(_descriptor_6.alignment().concat(_descriptor_0.alignment().concat(_descriptor_0.alignment())))));
  }
  fromValue(value_0) {
    return [
      _descriptor_0.fromValue(value_0),
      _descriptor_0.fromValue(value_0),
      _descriptor_0.fromValue(value_0),
      _descriptor_6.fromValue(value_0),
      _descriptor_0.fromValue(value_0),
      _descriptor_0.fromValue(value_0)
    ]
  }
  toValue(value_0) {
    return _descriptor_0.toValue(value_0[0]).concat(_descriptor_0.toValue(value_0[1]).concat(_descriptor_0.toValue(value_0[2]).concat(_descriptor_6.toValue(value_0[3]).concat(_descriptor_0.toValue(value_0[4]).concat(_descriptor_0.toValue(value_0[5]))))));
  }
}

const _descriptor_15 = new _tuple_0();

const _descriptor_16 = new __compactRuntime.CompactTypeBytes(21);

class _CoinPreimage_0 {
  alignment() {
    return _descriptor_16.alignment().concat(_descriptor_8.alignment().concat(_descriptor_1.alignment().concat(_descriptor_0.alignment())));
  }
  fromValue(value_0) {
    return {
      domain_sep: _descriptor_16.fromValue(value_0),
      info: _descriptor_8.fromValue(value_0),
      dataType: _descriptor_1.fromValue(value_0),
      data: _descriptor_0.fromValue(value_0)
    }
  }
  toValue(value_0) {
    return _descriptor_16.toValue(value_0.domain_sep).concat(_descriptor_8.toValue(value_0.info).concat(_descriptor_1.toValue(value_0.dataType).concat(_descriptor_0.toValue(value_0.data))));
  }
}

const _descriptor_17 = new _CoinPreimage_0();

class _tuple_1 {
  alignment() {
    return _descriptor_0.alignment().concat(_descriptor_0.alignment().concat(_descriptor_0.alignment()));
  }
  fromValue(value_0) {
    return [
      _descriptor_0.fromValue(value_0),
      _descriptor_0.fromValue(value_0),
      _descriptor_0.fromValue(value_0)
    ]
  }
  toValue(value_0) {
    return _descriptor_0.toValue(value_0[0]).concat(_descriptor_0.toValue(value_0[1]).concat(_descriptor_0.toValue(value_0[2])));
  }
}

const _descriptor_18 = new _tuple_1();

class _tuple_2 {
  alignment() {
    return _descriptor_0.alignment().concat(_descriptor_0.alignment().concat(_descriptor_0.alignment().concat(_descriptor_6.alignment())));
  }
  fromValue(value_0) {
    return [
      _descriptor_0.fromValue(value_0),
      _descriptor_0.fromValue(value_0),
      _descriptor_0.fromValue(value_0),
      _descriptor_6.fromValue(value_0)
    ]
  }
  toValue(value_0) {
    return _descriptor_0.toValue(value_0[0]).concat(_descriptor_0.toValue(value_0[1]).concat(_descriptor_0.toValue(value_0[2]).concat(_descriptor_6.toValue(value_0[3]))));
  }
}

const _descriptor_19 = new _tuple_2();

class _tuple_3 {
  alignment() {
    return _descriptor_0.alignment().concat(_descriptor_0.alignment());
  }
  fromValue(value_0) {
    return [
      _descriptor_0.fromValue(value_0),
      _descriptor_0.fromValue(value_0)
    ]
  }
  toValue(value_0) {
    return _descriptor_0.toValue(value_0[0]).concat(_descriptor_0.toValue(value_0[1]));
  }
}

const _descriptor_20 = new _tuple_3();

class _tuple_4 {
  alignment() {
    return _descriptor_0.alignment().concat(_descriptor_2.alignment().concat(_descriptor_0.alignment().concat(_descriptor_0.alignment().concat(_descriptor_6.alignment().concat(_descriptor_0.alignment().concat(_descriptor_0.alignment().concat(_descriptor_0.alignment().concat(_descriptor_3.alignment()))))))));
  }
  fromValue(value_0) {
    return [
      _descriptor_0.fromValue(value_0),
      _descriptor_2.fromValue(value_0),
      _descriptor_0.fromValue(value_0),
      _descriptor_0.fromValue(value_0),
      _descriptor_6.fromValue(value_0),
      _descriptor_0.fromValue(value_0),
      _descriptor_0.fromValue(value_0),
      _descriptor_0.fromValue(value_0),
      _descriptor_3.fromValue(value_0)
    ]
  }
  toValue(value_0) {
    return _descriptor_0.toValue(value_0[0]).concat(_descriptor_2.toValue(value_0[1]).concat(_descriptor_0.toValue(value_0[2]).concat(_descriptor_0.toValue(value_0[3]).concat(_descriptor_6.toValue(value_0[4]).concat(_descriptor_0.toValue(value_0[5]).concat(_descriptor_0.toValue(value_0[6]).concat(_descriptor_0.toValue(value_0[7]).concat(_descriptor_3.toValue(value_0[8])))))))));
  }
}

const _descriptor_21 = new _tuple_4();

const _descriptor_22 = new __compactRuntime.CompactTypeVector(2, _descriptor_14);

class _Either_1 {
  alignment() {
    return _descriptor_1.alignment().concat(_descriptor_0.alignment().concat(_descriptor_0.alignment()));
  }
  fromValue(value_0) {
    return {
      is_left: _descriptor_1.fromValue(value_0),
      left: _descriptor_0.fromValue(value_0),
      right: _descriptor_0.fromValue(value_0)
    }
  }
  toValue(value_0) {
    return _descriptor_1.toValue(value_0.is_left).concat(_descriptor_0.toValue(value_0.left).concat(_descriptor_0.toValue(value_0.right)));
  }
}

const _descriptor_23 = new _Either_1();

const _descriptor_24 = new __compactRuntime.CompactTypeUnsignedInteger(255n, 1);

export class Contract {
  witnesses;
  constructor(...args_0) {
    if (args_0.length !== 1) {
      throw new __compactRuntime.CompactError(`Contract constructor: expected 1 argument, received ${args_0.length}`);
    }
    const witnesses_0 = args_0[0];
    if (typeof(witnesses_0) !== 'object') {
      throw new __compactRuntime.CompactError('first (witnesses) argument to Contract constructor is not an object');
    }
    this.witnesses = witnesses_0;
    this.circuits = {
      deriveMerchantAuthorization(context, ...args_1) {
        return { result: pureCircuits.deriveMerchantAuthorization(...args_1), context };
      },
      deriveRegistryAdminAuthorization(context, ...args_1) {
        return { result: pureCircuits.deriveRegistryAdminAuthorization(...args_1), context };
      },
      deriveInvoiceCommitment(context, ...args_1) {
        return { result: pureCircuits.deriveInvoiceCommitment(...args_1), context };
      },
      derivePaymentNullifier(context, ...args_1) {
        return { result: pureCircuits.derivePaymentNullifier(...args_1), context };
      },
      deriveClaimNullifier(context, ...args_1) {
        return { result: pureCircuits.deriveClaimNullifier(...args_1), context };
      },
      deriveEscrowCoinCommitment(context, ...args_1) {
        return { result: pureCircuits.deriveEscrowCoinCommitment(...args_1), context };
      },
      deriveReceiptCommitment(context, ...args_1) {
        return { result: pureCircuits.deriveReceiptCommitment(...args_1), context };
      },
      createInvoice: (...args_1) => {
        if (args_1.length !== 5) {
          throw new __compactRuntime.CompactError(`createInvoice: expected 5 arguments (as invoked from Typescript), received ${args_1.length}`);
        }
        const contextOrig_0 = args_1[0];
        const invoiceId_0 = args_1[1];
        const invoiceCommitment_0 = args_1[2];
        const merchantAuthorizationCommitment_0 = args_1[3];
        const expiry_0 = args_1[4];
        if (!(typeof(contextOrig_0) === 'object' && contextOrig_0.currentQueryContext != undefined)) {
          __compactRuntime.typeError('createInvoice',
                                     'argument 1 (as invoked from Typescript)',
                                     'lumapay-core.compact line 134 char 1',
                                     'CircuitContext',
                                     contextOrig_0)
        }
        if (!(invoiceId_0.buffer instanceof ArrayBuffer && invoiceId_0.BYTES_PER_ELEMENT === 1 && invoiceId_0.length === 32)) {
          __compactRuntime.typeError('createInvoice',
                                     'argument 1 (argument 2 as invoked from Typescript)',
                                     'lumapay-core.compact line 134 char 1',
                                     'Bytes<32>',
                                     invoiceId_0)
        }
        if (!(invoiceCommitment_0.buffer instanceof ArrayBuffer && invoiceCommitment_0.BYTES_PER_ELEMENT === 1 && invoiceCommitment_0.length === 32)) {
          __compactRuntime.typeError('createInvoice',
                                     'argument 2 (argument 3 as invoked from Typescript)',
                                     'lumapay-core.compact line 134 char 1',
                                     'Bytes<32>',
                                     invoiceCommitment_0)
        }
        if (!(merchantAuthorizationCommitment_0.buffer instanceof ArrayBuffer && merchantAuthorizationCommitment_0.BYTES_PER_ELEMENT === 1 && merchantAuthorizationCommitment_0.length === 32)) {
          __compactRuntime.typeError('createInvoice',
                                     'argument 3 (argument 4 as invoked from Typescript)',
                                     'lumapay-core.compact line 134 char 1',
                                     'Bytes<32>',
                                     merchantAuthorizationCommitment_0)
        }
        if (!(typeof(expiry_0) === 'bigint' && expiry_0 >= 0n && expiry_0 <= 18446744073709551615n)) {
          __compactRuntime.typeError('createInvoice',
                                     'argument 4 (argument 5 as invoked from Typescript)',
                                     'lumapay-core.compact line 134 char 1',
                                     'Uint<0..18446744073709551616>',
                                     expiry_0)
        }
        const context = { ...contextOrig_0, gasCost: __compactRuntime.emptyRunningCost() };
        const partialProofData = {
          input: {
            value: _descriptor_0.toValue(invoiceId_0).concat(_descriptor_0.toValue(invoiceCommitment_0).concat(_descriptor_0.toValue(merchantAuthorizationCommitment_0).concat(_descriptor_3.toValue(expiry_0)))),
            alignment: _descriptor_0.alignment().concat(_descriptor_0.alignment().concat(_descriptor_0.alignment().concat(_descriptor_3.alignment())))
          },
          output: undefined,
          publicTranscript: [],
          privateTranscriptOutputs: []
        };
        const result_0 = this._createInvoice_0(context,
                                               partialProofData,
                                               invoiceId_0,
                                               invoiceCommitment_0,
                                               merchantAuthorizationCommitment_0,
                                               expiry_0);
        partialProofData.output = { value: [], alignment: [] };
        return { result: result_0, context: context, proofData: partialProofData, gasCost: context.gasCost };
      },
      payInvoice: (...args_1) => {
        if (args_1.length !== 10) {
          throw new __compactRuntime.CompactError(`payInvoice: expected 10 arguments (as invoked from Typescript), received ${args_1.length}`);
        }
        const contextOrig_0 = args_1[0];
        const invoiceId_0 = args_1[1];
        const merchantPrivateIdentity_0 = args_1[2];
        const amount_0 = args_1[3];
        const tokenId_0 = args_1[4];
        const invoiceNonce_0 = args_1[5];
        const invoiceRandomness_0 = args_1[6];
        const paymentSecret_0 = args_1[7];
        const receiptSecret_0 = args_1[8];
        const coin_0 = args_1[9];
        if (!(typeof(contextOrig_0) === 'object' && contextOrig_0.currentQueryContext != undefined)) {
          __compactRuntime.typeError('payInvoice',
                                     'argument 1 (as invoked from Typescript)',
                                     'lumapay-core.compact line 163 char 1',
                                     'CircuitContext',
                                     contextOrig_0)
        }
        if (!(invoiceId_0.buffer instanceof ArrayBuffer && invoiceId_0.BYTES_PER_ELEMENT === 1 && invoiceId_0.length === 32)) {
          __compactRuntime.typeError('payInvoice',
                                     'argument 1 (argument 2 as invoked from Typescript)',
                                     'lumapay-core.compact line 163 char 1',
                                     'Bytes<32>',
                                     invoiceId_0)
        }
        if (!(merchantPrivateIdentity_0.buffer instanceof ArrayBuffer && merchantPrivateIdentity_0.BYTES_PER_ELEMENT === 1 && merchantPrivateIdentity_0.length === 32)) {
          __compactRuntime.typeError('payInvoice',
                                     'argument 2 (argument 3 as invoked from Typescript)',
                                     'lumapay-core.compact line 163 char 1',
                                     'Bytes<32>',
                                     merchantPrivateIdentity_0)
        }
        if (!(typeof(amount_0) === 'bigint' && amount_0 >= 0n && amount_0 <= 340282366920938463463374607431768211455n)) {
          __compactRuntime.typeError('payInvoice',
                                     'argument 3 (argument 4 as invoked from Typescript)',
                                     'lumapay-core.compact line 163 char 1',
                                     'Uint<0..340282366920938463463374607431768211456>',
                                     amount_0)
        }
        if (!(tokenId_0.buffer instanceof ArrayBuffer && tokenId_0.BYTES_PER_ELEMENT === 1 && tokenId_0.length === 32)) {
          __compactRuntime.typeError('payInvoice',
                                     'argument 4 (argument 5 as invoked from Typescript)',
                                     'lumapay-core.compact line 163 char 1',
                                     'Bytes<32>',
                                     tokenId_0)
        }
        if (!(invoiceNonce_0.buffer instanceof ArrayBuffer && invoiceNonce_0.BYTES_PER_ELEMENT === 1 && invoiceNonce_0.length === 32)) {
          __compactRuntime.typeError('payInvoice',
                                     'argument 5 (argument 6 as invoked from Typescript)',
                                     'lumapay-core.compact line 163 char 1',
                                     'Bytes<32>',
                                     invoiceNonce_0)
        }
        if (!(invoiceRandomness_0.buffer instanceof ArrayBuffer && invoiceRandomness_0.BYTES_PER_ELEMENT === 1 && invoiceRandomness_0.length === 32)) {
          __compactRuntime.typeError('payInvoice',
                                     'argument 6 (argument 7 as invoked from Typescript)',
                                     'lumapay-core.compact line 163 char 1',
                                     'Bytes<32>',
                                     invoiceRandomness_0)
        }
        if (!(paymentSecret_0.buffer instanceof ArrayBuffer && paymentSecret_0.BYTES_PER_ELEMENT === 1 && paymentSecret_0.length === 32)) {
          __compactRuntime.typeError('payInvoice',
                                     'argument 7 (argument 8 as invoked from Typescript)',
                                     'lumapay-core.compact line 163 char 1',
                                     'Bytes<32>',
                                     paymentSecret_0)
        }
        if (!(receiptSecret_0.buffer instanceof ArrayBuffer && receiptSecret_0.BYTES_PER_ELEMENT === 1 && receiptSecret_0.length === 32)) {
          __compactRuntime.typeError('payInvoice',
                                     'argument 8 (argument 9 as invoked from Typescript)',
                                     'lumapay-core.compact line 163 char 1',
                                     'Bytes<32>',
                                     receiptSecret_0)
        }
        if (!(typeof(coin_0) === 'object' && coin_0.nonce.buffer instanceof ArrayBuffer && coin_0.nonce.BYTES_PER_ELEMENT === 1 && coin_0.nonce.length === 32 && coin_0.color.buffer instanceof ArrayBuffer && coin_0.color.BYTES_PER_ELEMENT === 1 && coin_0.color.length === 32 && typeof(coin_0.value) === 'bigint' && coin_0.value >= 0n && coin_0.value <= 340282366920938463463374607431768211455n)) {
          __compactRuntime.typeError('payInvoice',
                                     'argument 9 (argument 10 as invoked from Typescript)',
                                     'lumapay-core.compact line 163 char 1',
                                     'struct ShieldedCoinInfo<nonce: Bytes<32>, color: Bytes<32>, value: Uint<0..340282366920938463463374607431768211456>>',
                                     coin_0)
        }
        const context = { ...contextOrig_0, gasCost: __compactRuntime.emptyRunningCost() };
        const partialProofData = {
          input: {
            value: _descriptor_0.toValue(invoiceId_0).concat(_descriptor_0.toValue(merchantPrivateIdentity_0).concat(_descriptor_6.toValue(amount_0).concat(_descriptor_0.toValue(tokenId_0).concat(_descriptor_0.toValue(invoiceNonce_0).concat(_descriptor_0.toValue(invoiceRandomness_0).concat(_descriptor_0.toValue(paymentSecret_0).concat(_descriptor_0.toValue(receiptSecret_0).concat(_descriptor_8.toValue(coin_0))))))))),
            alignment: _descriptor_0.alignment().concat(_descriptor_0.alignment().concat(_descriptor_6.alignment().concat(_descriptor_0.alignment().concat(_descriptor_0.alignment().concat(_descriptor_0.alignment().concat(_descriptor_0.alignment().concat(_descriptor_0.alignment().concat(_descriptor_8.alignment()))))))))
          },
          output: undefined,
          publicTranscript: [],
          privateTranscriptOutputs: []
        };
        const result_0 = this._payInvoice_0(context,
                                            partialProofData,
                                            invoiceId_0,
                                            merchantPrivateIdentity_0,
                                            amount_0,
                                            tokenId_0,
                                            invoiceNonce_0,
                                            invoiceRandomness_0,
                                            paymentSecret_0,
                                            receiptSecret_0,
                                            coin_0);
        partialProofData.output = { value: [], alignment: [] };
        return { result: result_0, context: context, proofData: partialProofData, gasCost: context.gasCost };
      },
      claimInvoice: (...args_1) => {
        if (args_1.length !== 4) {
          throw new __compactRuntime.CompactError(`claimInvoice: expected 4 arguments (as invoked from Typescript), received ${args_1.length}`);
        }
        const contextOrig_0 = args_1[0];
        const invoiceId_0 = args_1[1];
        const merchantClaimSecret_0 = args_1[2];
        const escrowCoin_0 = args_1[3];
        if (!(typeof(contextOrig_0) === 'object' && contextOrig_0.currentQueryContext != undefined)) {
          __compactRuntime.typeError('claimInvoice',
                                     'argument 1 (as invoked from Typescript)',
                                     'lumapay-core.compact line 213 char 1',
                                     'CircuitContext',
                                     contextOrig_0)
        }
        if (!(invoiceId_0.buffer instanceof ArrayBuffer && invoiceId_0.BYTES_PER_ELEMENT === 1 && invoiceId_0.length === 32)) {
          __compactRuntime.typeError('claimInvoice',
                                     'argument 1 (argument 2 as invoked from Typescript)',
                                     'lumapay-core.compact line 213 char 1',
                                     'Bytes<32>',
                                     invoiceId_0)
        }
        if (!(merchantClaimSecret_0.buffer instanceof ArrayBuffer && merchantClaimSecret_0.BYTES_PER_ELEMENT === 1 && merchantClaimSecret_0.length === 32)) {
          __compactRuntime.typeError('claimInvoice',
                                     'argument 2 (argument 3 as invoked from Typescript)',
                                     'lumapay-core.compact line 213 char 1',
                                     'Bytes<32>',
                                     merchantClaimSecret_0)
        }
        if (!(typeof(escrowCoin_0) === 'object' && escrowCoin_0.nonce.buffer instanceof ArrayBuffer && escrowCoin_0.nonce.BYTES_PER_ELEMENT === 1 && escrowCoin_0.nonce.length === 32 && escrowCoin_0.color.buffer instanceof ArrayBuffer && escrowCoin_0.color.BYTES_PER_ELEMENT === 1 && escrowCoin_0.color.length === 32 && typeof(escrowCoin_0.value) === 'bigint' && escrowCoin_0.value >= 0n && escrowCoin_0.value <= 340282366920938463463374607431768211455n && typeof(escrowCoin_0.mt_index) === 'bigint' && escrowCoin_0.mt_index >= 0n && escrowCoin_0.mt_index <= 18446744073709551615n)) {
          __compactRuntime.typeError('claimInvoice',
                                     'argument 3 (argument 4 as invoked from Typescript)',
                                     'lumapay-core.compact line 213 char 1',
                                     'struct QualifiedShieldedCoinInfo<nonce: Bytes<32>, color: Bytes<32>, value: Uint<0..340282366920938463463374607431768211456>, mt_index: Uint<0..18446744073709551616>>',
                                     escrowCoin_0)
        }
        const context = { ...contextOrig_0, gasCost: __compactRuntime.emptyRunningCost() };
        const partialProofData = {
          input: {
            value: _descriptor_0.toValue(invoiceId_0).concat(_descriptor_0.toValue(merchantClaimSecret_0).concat(_descriptor_7.toValue(escrowCoin_0))),
            alignment: _descriptor_0.alignment().concat(_descriptor_0.alignment().concat(_descriptor_7.alignment()))
          },
          output: undefined,
          publicTranscript: [],
          privateTranscriptOutputs: []
        };
        const result_0 = this._claimInvoice_0(context,
                                              partialProofData,
                                              invoiceId_0,
                                              merchantClaimSecret_0,
                                              escrowCoin_0);
        partialProofData.output = { value: _descriptor_10.toValue(result_0), alignment: _descriptor_10.alignment() };
        return { result: result_0, context: context, proofData: partialProofData, gasCost: context.gasCost };
      },
      cancelInvoice: (...args_1) => {
        if (args_1.length !== 3) {
          throw new __compactRuntime.CompactError(`cancelInvoice: expected 3 arguments (as invoked from Typescript), received ${args_1.length}`);
        }
        const contextOrig_0 = args_1[0];
        const invoiceId_0 = args_1[1];
        const merchantClaimSecret_0 = args_1[2];
        if (!(typeof(contextOrig_0) === 'object' && contextOrig_0.currentQueryContext != undefined)) {
          __compactRuntime.typeError('cancelInvoice',
                                     'argument 1 (as invoked from Typescript)',
                                     'lumapay-core.compact line 254 char 1',
                                     'CircuitContext',
                                     contextOrig_0)
        }
        if (!(invoiceId_0.buffer instanceof ArrayBuffer && invoiceId_0.BYTES_PER_ELEMENT === 1 && invoiceId_0.length === 32)) {
          __compactRuntime.typeError('cancelInvoice',
                                     'argument 1 (argument 2 as invoked from Typescript)',
                                     'lumapay-core.compact line 254 char 1',
                                     'Bytes<32>',
                                     invoiceId_0)
        }
        if (!(merchantClaimSecret_0.buffer instanceof ArrayBuffer && merchantClaimSecret_0.BYTES_PER_ELEMENT === 1 && merchantClaimSecret_0.length === 32)) {
          __compactRuntime.typeError('cancelInvoice',
                                     'argument 2 (argument 3 as invoked from Typescript)',
                                     'lumapay-core.compact line 254 char 1',
                                     'Bytes<32>',
                                     merchantClaimSecret_0)
        }
        const context = { ...contextOrig_0, gasCost: __compactRuntime.emptyRunningCost() };
        const partialProofData = {
          input: {
            value: _descriptor_0.toValue(invoiceId_0).concat(_descriptor_0.toValue(merchantClaimSecret_0)),
            alignment: _descriptor_0.alignment().concat(_descriptor_0.alignment())
          },
          output: undefined,
          publicTranscript: [],
          privateTranscriptOutputs: []
        };
        const result_0 = this._cancelInvoice_0(context,
                                               partialProofData,
                                               invoiceId_0,
                                               merchantClaimSecret_0);
        partialProofData.output = { value: [], alignment: [] };
        return { result: result_0, context: context, proofData: partialProofData, gasCost: context.gasCost };
      },
      expireInvoice: (...args_1) => {
        if (args_1.length !== 2) {
          throw new __compactRuntime.CompactError(`expireInvoice: expected 2 arguments (as invoked from Typescript), received ${args_1.length}`);
        }
        const contextOrig_0 = args_1[0];
        const invoiceId_0 = args_1[1];
        if (!(typeof(contextOrig_0) === 'object' && contextOrig_0.currentQueryContext != undefined)) {
          __compactRuntime.typeError('expireInvoice',
                                     'argument 1 (as invoked from Typescript)',
                                     'lumapay-core.compact line 275 char 1',
                                     'CircuitContext',
                                     contextOrig_0)
        }
        if (!(invoiceId_0.buffer instanceof ArrayBuffer && invoiceId_0.BYTES_PER_ELEMENT === 1 && invoiceId_0.length === 32)) {
          __compactRuntime.typeError('expireInvoice',
                                     'argument 1 (argument 2 as invoked from Typescript)',
                                     'lumapay-core.compact line 275 char 1',
                                     'Bytes<32>',
                                     invoiceId_0)
        }
        const context = { ...contextOrig_0, gasCost: __compactRuntime.emptyRunningCost() };
        const partialProofData = {
          input: {
            value: _descriptor_0.toValue(invoiceId_0),
            alignment: _descriptor_0.alignment()
          },
          output: undefined,
          publicTranscript: [],
          privateTranscriptOutputs: []
        };
        const result_0 = this._expireInvoice_0(context,
                                               partialProofData,
                                               invoiceId_0);
        partialProofData.output = { value: [], alignment: [] };
        return { result: result_0, context: context, proofData: partialProofData, gasCost: context.gasCost };
      },
      verifyReceipt(context, ...args_1) {
        return { result: pureCircuits.verifyReceipt(...args_1), context };
      },
      proveInvoiceSettlement: (...args_1) => {
        if (args_1.length !== 5) {
          throw new __compactRuntime.CompactError(`proveInvoiceSettlement: expected 5 arguments (as invoked from Typescript), received ${args_1.length}`);
        }
        const contextOrig_0 = args_1[0];
        const invoiceId_0 = args_1[1];
        const paidAmount_0 = args_1[2];
        const paidToken_0 = args_1[3];
        const receiptSecret_0 = args_1[4];
        if (!(typeof(contextOrig_0) === 'object' && contextOrig_0.currentQueryContext != undefined)) {
          __compactRuntime.typeError('proveInvoiceSettlement',
                                     'argument 1 (as invoked from Typescript)',
                                     'lumapay-core.compact line 310 char 1',
                                     'CircuitContext',
                                     contextOrig_0)
        }
        if (!(invoiceId_0.buffer instanceof ArrayBuffer && invoiceId_0.BYTES_PER_ELEMENT === 1 && invoiceId_0.length === 32)) {
          __compactRuntime.typeError('proveInvoiceSettlement',
                                     'argument 1 (argument 2 as invoked from Typescript)',
                                     'lumapay-core.compact line 310 char 1',
                                     'Bytes<32>',
                                     invoiceId_0)
        }
        if (!(typeof(paidAmount_0) === 'bigint' && paidAmount_0 >= 0n && paidAmount_0 <= 340282366920938463463374607431768211455n)) {
          __compactRuntime.typeError('proveInvoiceSettlement',
                                     'argument 2 (argument 3 as invoked from Typescript)',
                                     'lumapay-core.compact line 310 char 1',
                                     'Uint<0..340282366920938463463374607431768211456>',
                                     paidAmount_0)
        }
        if (!(paidToken_0.buffer instanceof ArrayBuffer && paidToken_0.BYTES_PER_ELEMENT === 1 && paidToken_0.length === 32)) {
          __compactRuntime.typeError('proveInvoiceSettlement',
                                     'argument 3 (argument 4 as invoked from Typescript)',
                                     'lumapay-core.compact line 310 char 1',
                                     'Bytes<32>',
                                     paidToken_0)
        }
        if (!(receiptSecret_0.buffer instanceof ArrayBuffer && receiptSecret_0.BYTES_PER_ELEMENT === 1 && receiptSecret_0.length === 32)) {
          __compactRuntime.typeError('proveInvoiceSettlement',
                                     'argument 4 (argument 5 as invoked from Typescript)',
                                     'lumapay-core.compact line 310 char 1',
                                     'Bytes<32>',
                                     receiptSecret_0)
        }
        const context = { ...contextOrig_0, gasCost: __compactRuntime.emptyRunningCost() };
        const partialProofData = {
          input: {
            value: _descriptor_0.toValue(invoiceId_0).concat(_descriptor_6.toValue(paidAmount_0).concat(_descriptor_0.toValue(paidToken_0).concat(_descriptor_0.toValue(receiptSecret_0)))),
            alignment: _descriptor_0.alignment().concat(_descriptor_6.alignment().concat(_descriptor_0.alignment().concat(_descriptor_0.alignment())))
          },
          output: undefined,
          publicTranscript: [],
          privateTranscriptOutputs: []
        };
        const result_0 = this._proveInvoiceSettlement_0(context,
                                                        partialProofData,
                                                        invoiceId_0,
                                                        paidAmount_0,
                                                        paidToken_0,
                                                        receiptSecret_0);
        partialProofData.output = { value: [], alignment: [] };
        return { result: result_0, context: context, proofData: partialProofData, gasCost: context.gasCost };
      }
    };
    this.impureCircuits = {
      createInvoice: this.circuits.createInvoice,
      payInvoice: this.circuits.payInvoice,
      claimInvoice: this.circuits.claimInvoice,
      cancelInvoice: this.circuits.cancelInvoice,
      expireInvoice: this.circuits.expireInvoice,
      proveInvoiceSettlement: this.circuits.proveInvoiceSettlement
    };
    this.provableCircuits = {
      createInvoice: this.circuits.createInvoice,
      payInvoice: this.circuits.payInvoice,
      claimInvoice: this.circuits.claimInvoice,
      cancelInvoice: this.circuits.cancelInvoice,
      expireInvoice: this.circuits.expireInvoice,
      proveInvoiceSettlement: this.circuits.proveInvoiceSettlement
    };
  }
  initialState(...args_0) {
    if (args_0.length !== 2) {
      throw new __compactRuntime.CompactError(`Contract state constructor: expected 2 arguments (as invoked from Typescript), received ${args_0.length}`);
    }
    const constructorContext_0 = args_0[0];
    const registryAdminAuthorizationCommitment_0 = args_0[1];
    if (typeof(constructorContext_0) !== 'object') {
      throw new __compactRuntime.CompactError(`Contract state constructor: expected 'constructorContext' in argument 1 (as invoked from Typescript) to be an object`);
    }
    if (!('initialZswapLocalState' in constructorContext_0)) {
      throw new __compactRuntime.CompactError(`Contract state constructor: expected 'initialZswapLocalState' in argument 1 (as invoked from Typescript)`);
    }
    if (typeof(constructorContext_0.initialZswapLocalState) !== 'object') {
      throw new __compactRuntime.CompactError(`Contract state constructor: expected 'initialZswapLocalState' in argument 1 (as invoked from Typescript) to be an object`);
    }
    if (!(registryAdminAuthorizationCommitment_0.buffer instanceof ArrayBuffer && registryAdminAuthorizationCommitment_0.BYTES_PER_ELEMENT === 1 && registryAdminAuthorizationCommitment_0.length === 32)) {
      __compactRuntime.typeError('Contract state constructor',
                                 'argument 1 (argument 2 as invoked from Typescript)',
                                 'lumapay-core.compact line 33 char 1',
                                 'Bytes<32>',
                                 registryAdminAuthorizationCommitment_0)
    }
    const state_0 = new __compactRuntime.ContractState();
    let stateValue_0 = __compactRuntime.StateValue.newArray();
    stateValue_0 = stateValue_0.arrayPush(__compactRuntime.StateValue.newNull());
    stateValue_0 = stateValue_0.arrayPush(__compactRuntime.StateValue.newNull());
    stateValue_0 = stateValue_0.arrayPush(__compactRuntime.StateValue.newNull());
    stateValue_0 = stateValue_0.arrayPush(__compactRuntime.StateValue.newNull());
    stateValue_0 = stateValue_0.arrayPush(__compactRuntime.StateValue.newNull());
    state_0.data = new __compactRuntime.ChargedState(stateValue_0);
    state_0.setOperation('createInvoice', new __compactRuntime.ContractOperation());
    state_0.setOperation('payInvoice', new __compactRuntime.ContractOperation());
    state_0.setOperation('claimInvoice', new __compactRuntime.ContractOperation());
    state_0.setOperation('cancelInvoice', new __compactRuntime.ContractOperation());
    state_0.setOperation('expireInvoice', new __compactRuntime.ContractOperation());
    state_0.setOperation('proveInvoiceSettlement', new __compactRuntime.ContractOperation());
    const context = __compactRuntime.createCircuitContext(__compactRuntime.dummyContractAddress(), constructorContext_0.initialZswapLocalState.coinPublicKey, state_0.data, constructorContext_0.initialPrivateState);
    const partialProofData = {
      input: { value: [], alignment: [] },
      output: undefined,
      publicTranscript: [],
      privateTranscriptOutputs: []
    };
    __compactRuntime.queryLedgerState(context,
                                      partialProofData,
                                      [
                                       { push: { storage: false,
                                                 value: __compactRuntime.StateValue.newCell({ value: _descriptor_24.toValue(0n),
                                                                                              alignment: _descriptor_24.alignment() }).encode() } },
                                       { push: { storage: true,
                                                 value: __compactRuntime.StateValue.newMap(
                                                          new __compactRuntime.StateMap()
                                                        ).encode() } },
                                       { ins: { cached: false, n: 1 } }]);
    __compactRuntime.queryLedgerState(context,
                                      partialProofData,
                                      [
                                       { push: { storage: false,
                                                 value: __compactRuntime.StateValue.newCell({ value: _descriptor_24.toValue(1n),
                                                                                              alignment: _descriptor_24.alignment() }).encode() } },
                                       { push: { storage: true,
                                                 value: __compactRuntime.StateValue.newMap(
                                                          new __compactRuntime.StateMap()
                                                        ).encode() } },
                                       { ins: { cached: false, n: 1 } }]);
    __compactRuntime.queryLedgerState(context,
                                      partialProofData,
                                      [
                                       { push: { storage: false,
                                                 value: __compactRuntime.StateValue.newCell({ value: _descriptor_24.toValue(2n),
                                                                                              alignment: _descriptor_24.alignment() }).encode() } },
                                       { push: { storage: true,
                                                 value: __compactRuntime.StateValue.newMap(
                                                          new __compactRuntime.StateMap()
                                                        ).encode() } },
                                       { ins: { cached: false, n: 1 } }]);
    __compactRuntime.queryLedgerState(context,
                                      partialProofData,
                                      [
                                       { push: { storage: false,
                                                 value: __compactRuntime.StateValue.newCell({ value: _descriptor_24.toValue(3n),
                                                                                              alignment: _descriptor_24.alignment() }).encode() } },
                                       { push: { storage: true,
                                                 value: __compactRuntime.StateValue.newMap(
                                                          new __compactRuntime.StateMap()
                                                        ).encode() } },
                                       { ins: { cached: false, n: 1 } }]);
    __compactRuntime.queryLedgerState(context,
                                      partialProofData,
                                      [
                                       { push: { storage: false,
                                                 value: __compactRuntime.StateValue.newCell({ value: _descriptor_24.toValue(4n),
                                                                                              alignment: _descriptor_24.alignment() }).encode() } },
                                       { push: { storage: true,
                                                 value: __compactRuntime.StateValue.newCell({ value: _descriptor_0.toValue(new Uint8Array(32)),
                                                                                              alignment: _descriptor_0.alignment() }).encode() } },
                                       { ins: { cached: false, n: 1 } }]);
    __compactRuntime.assert(!this._equal_0(registryAdminAuthorizationCommitment_0,
                                           new Uint8Array(32)),
                            'registry admin authorization is required');
    __compactRuntime.queryLedgerState(context,
                                      partialProofData,
                                      [
                                       { push: { storage: false,
                                                 value: __compactRuntime.StateValue.newCell({ value: _descriptor_24.toValue(4n),
                                                                                              alignment: _descriptor_24.alignment() }).encode() } },
                                       { push: { storage: true,
                                                 value: __compactRuntime.StateValue.newCell({ value: _descriptor_0.toValue(registryAdminAuthorizationCommitment_0),
                                                                                              alignment: _descriptor_0.alignment() }).encode() } },
                                       { ins: { cached: false, n: 1 } }]);
    state_0.data = new __compactRuntime.ChargedState(context.currentQueryContext.state.state);
    return {
      currentContractState: state_0,
      currentPrivateState: context.currentPrivateState,
      currentZswapLocalState: context.currentZswapLocalState
    }
  }
  _some_0(value_0) { return { is_some: true, value: value_0 }; }
  _none_0() {
    return { is_some: false,
             value:
               { nonce: new Uint8Array(32), color: new Uint8Array(32), value: 0n } };
  }
  _left_0(value_0) {
    return { is_left: true, left: value_0, right: { bytes: new Uint8Array(32) } };
  }
  _right_0(value_0) {
    return { is_left: false, left: { bytes: new Uint8Array(32) }, right: value_0 };
  }
  _receiveShielded_0(context, partialProofData, coin_0) {
    const recipient_0 = this._right_0(_descriptor_12.fromValue(__compactRuntime.queryLedgerState(context,
                                                                                                 partialProofData,
                                                                                                 [
                                                                                                  { dup: { n: 2 } },
                                                                                                  { idx: { cached: true,
                                                                                                           pushPath: false,
                                                                                                           path: [
                                                                                                                  { tag: 'value',
                                                                                                                    value: { value: _descriptor_24.toValue(0n),
                                                                                                                             alignment: _descriptor_24.alignment() } }] } },
                                                                                                  { popeq: { cached: true,
                                                                                                             result: undefined } }]).value));
    this._createZswapOutput_0(context, partialProofData, coin_0, recipient_0);
    const tmp_0 = this._coinCommitment_0(coin_0, recipient_0);
    __compactRuntime.queryLedgerState(context,
                                      partialProofData,
                                      [
                                       { swap: { n: 0 } },
                                       { idx: { cached: true,
                                                pushPath: true,
                                                path: [
                                                       { tag: 'value',
                                                         value: { value: _descriptor_24.toValue(1n),
                                                                  alignment: _descriptor_24.alignment() } }] } },
                                       { push: { storage: false,
                                                 value: __compactRuntime.StateValue.newCell({ value: _descriptor_0.toValue(tmp_0),
                                                                                              alignment: _descriptor_0.alignment() }).encode() } },
                                       { push: { storage: false,
                                                 value: __compactRuntime.StateValue.newNull().encode() } },
                                       { ins: { cached: true, n: 2 } },
                                       { swap: { n: 0 } }]);
    return [];
  }
  _sendShielded_0(context, partialProofData, input_0, recipient_0, value_0) {
    const selfAddr_0 = _descriptor_12.fromValue(__compactRuntime.queryLedgerState(context,
                                                                                  partialProofData,
                                                                                  [
                                                                                   { dup: { n: 2 } },
                                                                                   { idx: { cached: true,
                                                                                            pushPath: false,
                                                                                            path: [
                                                                                                   { tag: 'value',
                                                                                                     value: { value: _descriptor_24.toValue(0n),
                                                                                                              alignment: _descriptor_24.alignment() } }] } },
                                                                                   { popeq: { cached: true,
                                                                                              result: undefined } }]).value);
    this._createZswapInput_0(context, partialProofData, input_0);
    const tmp_0 = this._coinNullifier_0(this._downcastQualifiedCoin_0(input_0),
                                        selfAddr_0);
    __compactRuntime.queryLedgerState(context,
                                      partialProofData,
                                      [
                                       { swap: { n: 0 } },
                                       { idx: { cached: true,
                                                pushPath: true,
                                                path: [
                                                       { tag: 'value',
                                                         value: { value: _descriptor_24.toValue(0n),
                                                                  alignment: _descriptor_24.alignment() } }] } },
                                       { push: { storage: false,
                                                 value: __compactRuntime.StateValue.newCell({ value: _descriptor_0.toValue(tmp_0),
                                                                                              alignment: _descriptor_0.alignment() }).encode() } },
                                       { push: { storage: false,
                                                 value: __compactRuntime.StateValue.newNull().encode() } },
                                       { ins: { cached: true, n: 2 } },
                                       { swap: { n: 0 } }]);
    let t_0;
    const change_0 = (t_0 = input_0.value,
                      (__compactRuntime.assert(t_0 >= value_0,
                                               'result of subtraction would be negative'),
                       t_0 - value_0));
    const output_0 = { nonce:
                         this._upgradeFromTransient_0(this._transientHash_0([__compactRuntime.convertBytesToField(28,
                                                                                                                  new Uint8Array([109, 105, 100, 110, 105, 103, 104, 116, 58, 107, 101, 114, 110, 101, 108, 58, 110, 111, 110, 99, 101, 95, 101, 118, 111, 108, 118, 101]),
                                                                                                                  '<standard library>'),
                                                                             this._degradeToTransient_0(input_0.nonce)])),
                       color: input_0.color,
                       value: value_0 };
    this._createZswapOutput_0(context, partialProofData, output_0, recipient_0);
    const tmp_1 = this._coinCommitment_0(output_0, recipient_0);
    __compactRuntime.queryLedgerState(context,
                                      partialProofData,
                                      [
                                       { swap: { n: 0 } },
                                       { idx: { cached: true,
                                                pushPath: true,
                                                path: [
                                                       { tag: 'value',
                                                         value: { value: _descriptor_24.toValue(2n),
                                                                  alignment: _descriptor_24.alignment() } }] } },
                                       { push: { storage: false,
                                                 value: __compactRuntime.StateValue.newCell({ value: _descriptor_0.toValue(tmp_1),
                                                                                              alignment: _descriptor_0.alignment() }).encode() } },
                                       { push: { storage: false,
                                                 value: __compactRuntime.StateValue.newNull().encode() } },
                                       { ins: { cached: true, n: 2 } },
                                       { swap: { n: 0 } }]);
    if (!recipient_0.is_left
        &&
        this._equal_1(recipient_0.right.bytes, selfAddr_0.bytes))
    {
      const tmp_2 = this._coinCommitment_0(output_0, recipient_0);
      __compactRuntime.queryLedgerState(context,
                                        partialProofData,
                                        [
                                         { swap: { n: 0 } },
                                         { idx: { cached: true,
                                                  pushPath: true,
                                                  path: [
                                                         { tag: 'value',
                                                           value: { value: _descriptor_24.toValue(1n),
                                                                    alignment: _descriptor_24.alignment() } }] } },
                                         { push: { storage: false,
                                                   value: __compactRuntime.StateValue.newCell({ value: _descriptor_0.toValue(tmp_2),
                                                                                                alignment: _descriptor_0.alignment() }).encode() } },
                                         { push: { storage: false,
                                                   value: __compactRuntime.StateValue.newNull().encode() } },
                                         { ins: { cached: true, n: 2 } },
                                         { swap: { n: 0 } }]);
    }
    if (this._equal_2(change_0, 0n)) {
      return { change: this._none_0(), sent: output_0 };
    } else {
      const changeCoin_0 = { nonce:
                               this._upgradeFromTransient_0(this._transientHash_0([__compactRuntime.convertBytesToField(30,
                                                                                                                        new Uint8Array([109, 105, 100, 110, 105, 103, 104, 116, 58, 107, 101, 114, 110, 101, 108, 58, 110, 111, 110, 99, 101, 95, 101, 118, 111, 108, 118, 101, 47, 50]),
                                                                                                                        '<standard library>'),
                                                                                   this._degradeToTransient_0(input_0.nonce)])),
                             color: input_0.color,
                             value: change_0 };
      this._createZswapOutput_0(context,
                                partialProofData,
                                changeCoin_0,
                                this._right_0(selfAddr_0));
      const cm_0 = this._coinCommitment_0(changeCoin_0,
                                          this._right_0(selfAddr_0));
      __compactRuntime.queryLedgerState(context,
                                        partialProofData,
                                        [
                                         { swap: { n: 0 } },
                                         { idx: { cached: true,
                                                  pushPath: true,
                                                  path: [
                                                         { tag: 'value',
                                                           value: { value: _descriptor_24.toValue(2n),
                                                                    alignment: _descriptor_24.alignment() } }] } },
                                         { push: { storage: false,
                                                   value: __compactRuntime.StateValue.newCell({ value: _descriptor_0.toValue(cm_0),
                                                                                                alignment: _descriptor_0.alignment() }).encode() } },
                                         { push: { storage: false,
                                                   value: __compactRuntime.StateValue.newNull().encode() } },
                                         { ins: { cached: true, n: 2 } },
                                         { swap: { n: 0 } }]);
      __compactRuntime.queryLedgerState(context,
                                        partialProofData,
                                        [
                                         { swap: { n: 0 } },
                                         { idx: { cached: true,
                                                  pushPath: true,
                                                  path: [
                                                         { tag: 'value',
                                                           value: { value: _descriptor_24.toValue(1n),
                                                                    alignment: _descriptor_24.alignment() } }] } },
                                         { push: { storage: false,
                                                   value: __compactRuntime.StateValue.newCell({ value: _descriptor_0.toValue(cm_0),
                                                                                                alignment: _descriptor_0.alignment() }).encode() } },
                                         { push: { storage: false,
                                                   value: __compactRuntime.StateValue.newNull().encode() } },
                                         { ins: { cached: true, n: 2 } },
                                         { swap: { n: 0 } }]);
      return { change: this._some_0(changeCoin_0), sent: output_0 };
    }
  }
  _downcastQualifiedCoin_0(coin_0) {
    return { nonce: coin_0.nonce, color: coin_0.color, value: coin_0.value };
  }
  _coinCommitment_0(coin_0, recipient_0) {
    return this._persistentHash_5({ domain_sep:
                                      new Uint8Array([109, 105, 100, 110, 105, 103, 104, 116, 58, 122, 115, 119, 97, 112, 45, 99, 99, 91, 118, 49, 93]),
                                    info: coin_0,
                                    dataType: recipient_0.is_left,
                                    data:
                                      recipient_0.is_left ?
                                      recipient_0.left.bytes :
                                      recipient_0.right.bytes });
  }
  _coinNullifier_0(coin_0, addr_0) {
    return this._persistentHash_5({ domain_sep:
                                      new Uint8Array([109, 105, 100, 110, 105, 103, 104, 116, 58, 122, 115, 119, 97, 112, 45, 99, 110, 91, 118, 49, 93]),
                                    info: coin_0,
                                    dataType: false,
                                    data: addr_0.bytes });
  }
  _blockTimeLt_0(context, partialProofData, time_0) {
    return _descriptor_1.fromValue(__compactRuntime.queryLedgerState(context,
                                                                     partialProofData,
                                                                     [
                                                                      { dup: { n: 2 } },
                                                                      { idx: { cached: true,
                                                                               pushPath: false,
                                                                               path: [
                                                                                      { tag: 'value',
                                                                                        value: { value: _descriptor_24.toValue(2n),
                                                                                                 alignment: _descriptor_24.alignment() } }] } },
                                                                      { push: { storage: false,
                                                                                value: __compactRuntime.StateValue.newCell({ value: _descriptor_3.toValue(time_0),
                                                                                                                             alignment: _descriptor_3.alignment() }).encode() } },
                                                                      'lt',
                                                                      { popeq: { cached: true,
                                                                                 result: undefined } }]).value);
  }
  _blockTimeGte_0(context, partialProofData, time_0) {
    return !this._blockTimeLt_0(context, partialProofData, time_0);
  }
  _transientHash_0(value_0) {
    const result_0 = __compactRuntime.transientHash(_descriptor_22, value_0);
    return result_0;
  }
  _persistentHash_0(value_0) {
    const result_0 = __compactRuntime.persistentHash(_descriptor_20, value_0);
    return result_0;
  }
  _persistentHash_1(value_0) {
    const result_0 = __compactRuntime.persistentHash(_descriptor_21, value_0);
    return result_0;
  }
  _persistentHash_2(value_0) {
    const result_0 = __compactRuntime.persistentHash(_descriptor_18, value_0);
    return result_0;
  }
  _persistentHash_3(value_0) {
    const result_0 = __compactRuntime.persistentHash(_descriptor_19, value_0);
    return result_0;
  }
  _persistentHash_4(value_0) {
    const result_0 = __compactRuntime.persistentHash(_descriptor_15, value_0);
    return result_0;
  }
  _persistentHash_5(value_0) {
    const result_0 = __compactRuntime.persistentHash(_descriptor_17, value_0);
    return result_0;
  }
  _degradeToTransient_0(x_0) {
    const result_0 = __compactRuntime.degradeToTransient(x_0);
    return result_0;
  }
  _upgradeFromTransient_0(x_0) {
    const result_0 = __compactRuntime.upgradeFromTransient(x_0);
    return result_0;
  }
  _ownPublicKey_0(context, partialProofData) {
    const result_0 = __compactRuntime.ownPublicKey(context);
    partialProofData.privateTranscriptOutputs.push({
      value: _descriptor_11.toValue(result_0),
      alignment: _descriptor_11.alignment()
    });
    return result_0;
  }
  _createZswapInput_0(context, partialProofData, coin_0) {
    const result_0 = __compactRuntime.createZswapInput(context, coin_0);
    partialProofData.privateTranscriptOutputs.push({
      value: [],
      alignment: []
    });
    return result_0;
  }
  _createZswapOutput_0(context, partialProofData, coin_0, recipient_0) {
    const result_0 = __compactRuntime.createZswapOutput(context,
                                                        coin_0,
                                                        recipient_0);
    partialProofData.privateTranscriptOutputs.push({
      value: [],
      alignment: []
    });
    return result_0;
  }
  _deriveMerchantAuthorization_0(merchantClaimSecret_0) {
    return this._persistentHash_0([new Uint8Array([108, 117, 109, 97, 112, 97, 121, 58, 109, 101, 114, 99, 104, 97, 110, 116, 45, 97, 117, 116, 104, 58, 118, 49, 0, 0, 0, 0, 0, 0, 0, 0]),
                                   merchantClaimSecret_0]);
  }
  _deriveRegistryAdminAuthorization_0(adminSecret_0) {
    return this._persistentHash_0([new Uint8Array([108, 117, 109, 97, 112, 97, 121, 58, 114, 101, 103, 105, 115, 116, 114, 121, 45, 97, 100, 109, 105, 110, 58, 118, 49, 0, 0, 0, 0, 0, 0, 0]),
                                   adminSecret_0]);
  }
  _deriveInvoiceCommitment_0(invoiceId_0,
                             merchantPrivateIdentity_0,
                             amount_0,
                             tokenId_0,
                             invoiceNonce_0,
                             randomness_0,
                             expiry_0)
  {
    return this._persistentHash_1([new Uint8Array([108, 117, 109, 97, 112, 97, 121, 58, 105, 110, 118, 111, 105, 99, 101, 45, 99, 111, 109, 109, 105, 116, 109, 101, 110, 116, 58, 118, 49, 0, 0, 0]),
                                   1n,
                                   invoiceId_0,
                                   merchantPrivateIdentity_0,
                                   amount_0,
                                   tokenId_0,
                                   invoiceNonce_0,
                                   randomness_0,
                                   expiry_0]);
  }
  _derivePaymentNullifier_0(invoiceId_0, paymentSecret_0) {
    return this._persistentHash_2([new Uint8Array([108, 117, 109, 97, 112, 97, 121, 58, 112, 97, 121, 109, 101, 110, 116, 45, 110, 117, 108, 108, 105, 102, 105, 101, 114, 58, 118, 49, 0, 0, 0, 0]),
                                   invoiceId_0,
                                   paymentSecret_0]);
  }
  _deriveClaimNullifier_0(invoiceId_0, merchantClaimSecret_0) {
    return this._persistentHash_2([new Uint8Array([108, 117, 109, 97, 112, 97, 121, 58, 99, 108, 97, 105, 109, 45, 110, 117, 108, 108, 105, 102, 105, 101, 114, 58, 118, 49, 0, 0, 0, 0, 0, 0]),
                                   invoiceId_0,
                                   merchantClaimSecret_0]);
  }
  _deriveEscrowCoinCommitment_0(nonce_0, color_0, value_0) {
    return this._persistentHash_3([new Uint8Array([108, 117, 109, 97, 112, 97, 121, 58, 101, 115, 99, 114, 111, 119, 45, 99, 111, 105, 110, 58, 118, 49, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0]),
                                   nonce_0,
                                   color_0,
                                   value_0]);
  }
  _deriveReceiptCommitment_0(invoiceId_0,
                             settlementNullifier_0,
                             amount_0,
                             tokenId_0,
                             receiptSecret_0)
  {
    return this._persistentHash_4([new Uint8Array([108, 117, 109, 97, 112, 97, 121, 58, 114, 101, 99, 101, 105, 112, 116, 58, 118, 49, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0]),
                                   invoiceId_0,
                                   settlementNullifier_0,
                                   amount_0,
                                   tokenId_0,
                                   receiptSecret_0]);
  }
  _createInvoice_0(context,
                   partialProofData,
                   invoiceId_0,
                   invoiceCommitment_0,
                   merchantAuthorizationCommitment_0,
                   expiry_0)
  {
    __compactRuntime.assert(!this._equal_3(invoiceId_0, new Uint8Array(32)),
                            'invoice id is required');
    __compactRuntime.assert(!this._equal_4(invoiceCommitment_0,
                                           new Uint8Array(32)),
                            'invoice commitment is required');
    __compactRuntime.assert(!this._equal_5(merchantAuthorizationCommitment_0,
                                           new Uint8Array(32)),
                            'merchant authorization is required');
    __compactRuntime.assert(!_descriptor_1.fromValue(__compactRuntime.queryLedgerState(context,
                                                                                       partialProofData,
                                                                                       [
                                                                                        { dup: { n: 0 } },
                                                                                        { idx: { cached: false,
                                                                                                 pushPath: false,
                                                                                                 path: [
                                                                                                        { tag: 'value',
                                                                                                          value: { value: _descriptor_24.toValue(0n),
                                                                                                                   alignment: _descriptor_24.alignment() } }] } },
                                                                                        { push: { storage: false,
                                                                                                  value: __compactRuntime.StateValue.newCell({ value: _descriptor_0.toValue(invoiceId_0),
                                                                                                                                               alignment: _descriptor_0.alignment() }).encode() } },
                                                                                        'member',
                                                                                        { popeq: { cached: true,
                                                                                                   result: undefined } }]).value),
                            'invoice already exists');
    __compactRuntime.assert(this._blockTimeLt_0(context,
                                                partialProofData,
                                                expiry_0),
                            'expiry must be in the future');
    __compactRuntime.queryLedgerState(context,
                                      partialProofData,
                                      [
                                       { idx: { cached: false,
                                                pushPath: true,
                                                path: [
                                                       { tag: 'value',
                                                         value: { value: _descriptor_24.toValue(0n),
                                                                  alignment: _descriptor_24.alignment() } }] } },
                                       { push: { storage: false,
                                                 value: __compactRuntime.StateValue.newCell({ value: _descriptor_0.toValue(invoiceId_0),
                                                                                              alignment: _descriptor_0.alignment() }).encode() } },
                                       { push: { storage: true,
                                                 value: __compactRuntime.StateValue.newNull().encode() } },
                                       { ins: { cached: false, n: 1 } },
                                       { ins: { cached: true, n: 1 } }]);
    const tmp_0 = { commitmentVersion: 1n,
                    commitment: invoiceCommitment_0,
                    merchantAuthorization: merchantAuthorizationCommitment_0,
                    expiry: expiry_0,
                    status: 0,
                    settlementNullifier: new Uint8Array(32),
                    escrowCoinCommitment: new Uint8Array(32),
                    receiptCommitment: new Uint8Array(32),
                    claimed: false };
    __compactRuntime.queryLedgerState(context,
                                      partialProofData,
                                      [
                                       { idx: { cached: false,
                                                pushPath: true,
                                                path: [
                                                       { tag: 'value',
                                                         value: { value: _descriptor_24.toValue(1n),
                                                                  alignment: _descriptor_24.alignment() } }] } },
                                       { push: { storage: false,
                                                 value: __compactRuntime.StateValue.newCell({ value: _descriptor_0.toValue(invoiceId_0),
                                                                                              alignment: _descriptor_0.alignment() }).encode() } },
                                       { push: { storage: true,
                                                 value: __compactRuntime.StateValue.newCell({ value: _descriptor_5.toValue(tmp_0),
                                                                                              alignment: _descriptor_5.alignment() }).encode() } },
                                       { ins: { cached: false, n: 1 } },
                                       { ins: { cached: true, n: 1 } }]);
    return [];
  }
  _payInvoice_0(context,
                partialProofData,
                invoiceId_0,
                merchantPrivateIdentity_0,
                amount_0,
                tokenId_0,
                invoiceNonce_0,
                invoiceRandomness_0,
                paymentSecret_0,
                receiptSecret_0,
                coin_0)
  {
    __compactRuntime.assert(_descriptor_1.fromValue(__compactRuntime.queryLedgerState(context,
                                                                                      partialProofData,
                                                                                      [
                                                                                       { dup: { n: 0 } },
                                                                                       { idx: { cached: false,
                                                                                                pushPath: false,
                                                                                                path: [
                                                                                                       { tag: 'value',
                                                                                                         value: { value: _descriptor_24.toValue(0n),
                                                                                                                  alignment: _descriptor_24.alignment() } }] } },
                                                                                       { push: { storage: false,
                                                                                                 value: __compactRuntime.StateValue.newCell({ value: _descriptor_0.toValue(invoiceId_0),
                                                                                                                                              alignment: _descriptor_0.alignment() }).encode() } },
                                                                                       'member',
                                                                                       { popeq: { cached: true,
                                                                                                  result: undefined } }]).value),
                            'invoice does not exist');
    const invoice_0 = _descriptor_5.fromValue(__compactRuntime.queryLedgerState(context,
                                                                                partialProofData,
                                                                                [
                                                                                 { dup: { n: 0 } },
                                                                                 { idx: { cached: false,
                                                                                          pushPath: false,
                                                                                          path: [
                                                                                                 { tag: 'value',
                                                                                                   value: { value: _descriptor_24.toValue(1n),
                                                                                                            alignment: _descriptor_24.alignment() } }] } },
                                                                                 { idx: { cached: false,
                                                                                          pushPath: false,
                                                                                          path: [
                                                                                                 { tag: 'value',
                                                                                                   value: { value: _descriptor_0.toValue(invoiceId_0),
                                                                                                            alignment: _descriptor_0.alignment() } }] } },
                                                                                 { popeq: { cached: false,
                                                                                            result: undefined } }]).value);
    __compactRuntime.assert(invoice_0.status === 0, 'invoice is not open');
    __compactRuntime.assert(this._blockTimeLt_0(context,
                                                partialProofData,
                                                invoice_0.expiry),
                            'invoice has expired');
    const expectedCommitment_0 = this._deriveInvoiceCommitment_0(invoiceId_0,
                                                                 merchantPrivateIdentity_0,
                                                                 amount_0,
                                                                 tokenId_0,
                                                                 invoiceNonce_0,
                                                                 invoiceRandomness_0,
                                                                 invoice_0.expiry);
    __compactRuntime.assert(this._equal_6(expectedCommitment_0,
                                          invoice_0.commitment),
                            'invalid invoice opening');
    __compactRuntime.assert(amount_0 > 0n, 'payment amount must be positive');
    __compactRuntime.assert(this._equal_7(coin_0.value, amount_0),
                            'wrong payment amount');
    __compactRuntime.assert(this._equal_8(coin_0.color, tokenId_0),
                            'wrong payment token');
    const nullifier_0 = this._derivePaymentNullifier_0(invoiceId_0,
                                                       paymentSecret_0);
    __compactRuntime.assert(!_descriptor_1.fromValue(__compactRuntime.queryLedgerState(context,
                                                                                       partialProofData,
                                                                                       [
                                                                                        { dup: { n: 0 } },
                                                                                        { idx: { cached: false,
                                                                                                 pushPath: false,
                                                                                                 path: [
                                                                                                        { tag: 'value',
                                                                                                          value: { value: _descriptor_24.toValue(2n),
                                                                                                                   alignment: _descriptor_24.alignment() } }] } },
                                                                                        { push: { storage: false,
                                                                                                  value: __compactRuntime.StateValue.newCell({ value: _descriptor_0.toValue(nullifier_0),
                                                                                                                                               alignment: _descriptor_0.alignment() }).encode() } },
                                                                                        'member',
                                                                                        { popeq: { cached: true,
                                                                                                   result: undefined } }]).value),
                            'payment replay');
    this._receiveShielded_0(context, partialProofData, coin_0);
    __compactRuntime.queryLedgerState(context,
                                      partialProofData,
                                      [
                                       { idx: { cached: false,
                                                pushPath: true,
                                                path: [
                                                       { tag: 'value',
                                                         value: { value: _descriptor_24.toValue(2n),
                                                                  alignment: _descriptor_24.alignment() } }] } },
                                       { push: { storage: false,
                                                 value: __compactRuntime.StateValue.newCell({ value: _descriptor_0.toValue(nullifier_0),
                                                                                              alignment: _descriptor_0.alignment() }).encode() } },
                                       { push: { storage: true,
                                                 value: __compactRuntime.StateValue.newNull().encode() } },
                                       { ins: { cached: false, n: 1 } },
                                       { ins: { cached: true, n: 1 } }]);
    const escrowCommitment_0 = this._deriveEscrowCoinCommitment_0(coin_0.nonce,
                                                                  coin_0.color,
                                                                  coin_0.value);
    const receipt_0 = this._deriveReceiptCommitment_0(invoiceId_0,
                                                      nullifier_0,
                                                      amount_0,
                                                      tokenId_0,
                                                      receiptSecret_0);
    const tmp_0 = { commitmentVersion: invoice_0.commitmentVersion,
                    commitment: invoice_0.commitment,
                    merchantAuthorization: invoice_0.merchantAuthorization,
                    expiry: invoice_0.expiry,
                    status: 1,
                    settlementNullifier: nullifier_0,
                    escrowCoinCommitment: escrowCommitment_0,
                    receiptCommitment: receipt_0,
                    claimed: false };
    __compactRuntime.queryLedgerState(context,
                                      partialProofData,
                                      [
                                       { idx: { cached: false,
                                                pushPath: true,
                                                path: [
                                                       { tag: 'value',
                                                         value: { value: _descriptor_24.toValue(1n),
                                                                  alignment: _descriptor_24.alignment() } }] } },
                                       { push: { storage: false,
                                                 value: __compactRuntime.StateValue.newCell({ value: _descriptor_0.toValue(invoiceId_0),
                                                                                              alignment: _descriptor_0.alignment() }).encode() } },
                                       { push: { storage: true,
                                                 value: __compactRuntime.StateValue.newCell({ value: _descriptor_5.toValue(tmp_0),
                                                                                              alignment: _descriptor_5.alignment() }).encode() } },
                                       { ins: { cached: false, n: 1 } },
                                       { ins: { cached: true, n: 1 } }]);
    return [];
  }
  _claimInvoice_0(context,
                  partialProofData,
                  invoiceId_0,
                  merchantClaimSecret_0,
                  escrowCoin_0)
  {
    __compactRuntime.assert(_descriptor_1.fromValue(__compactRuntime.queryLedgerState(context,
                                                                                      partialProofData,
                                                                                      [
                                                                                       { dup: { n: 0 } },
                                                                                       { idx: { cached: false,
                                                                                                pushPath: false,
                                                                                                path: [
                                                                                                       { tag: 'value',
                                                                                                         value: { value: _descriptor_24.toValue(0n),
                                                                                                                  alignment: _descriptor_24.alignment() } }] } },
                                                                                       { push: { storage: false,
                                                                                                 value: __compactRuntime.StateValue.newCell({ value: _descriptor_0.toValue(invoiceId_0),
                                                                                                                                              alignment: _descriptor_0.alignment() }).encode() } },
                                                                                       'member',
                                                                                       { popeq: { cached: true,
                                                                                                  result: undefined } }]).value),
                            'invoice does not exist');
    const invoice_0 = _descriptor_5.fromValue(__compactRuntime.queryLedgerState(context,
                                                                                partialProofData,
                                                                                [
                                                                                 { dup: { n: 0 } },
                                                                                 { idx: { cached: false,
                                                                                          pushPath: false,
                                                                                          path: [
                                                                                                 { tag: 'value',
                                                                                                   value: { value: _descriptor_24.toValue(1n),
                                                                                                            alignment: _descriptor_24.alignment() } }] } },
                                                                                 { idx: { cached: false,
                                                                                          pushPath: false,
                                                                                          path: [
                                                                                                 { tag: 'value',
                                                                                                   value: { value: _descriptor_0.toValue(invoiceId_0),
                                                                                                            alignment: _descriptor_0.alignment() } }] } },
                                                                                 { popeq: { cached: false,
                                                                                            result: undefined } }]).value);
    __compactRuntime.assert(invoice_0.status === 1, 'invoice is not settled');
    __compactRuntime.assert(!invoice_0.claimed, 'invoice already claimed');
    __compactRuntime.assert(this._equal_9(this._deriveMerchantAuthorization_0(merchantClaimSecret_0),
                                          invoice_0.merchantAuthorization),
                            'unauthorized claim');
    __compactRuntime.assert(this._equal_10(this._deriveEscrowCoinCommitment_0(escrowCoin_0.nonce,
                                                                              escrowCoin_0.color,
                                                                              escrowCoin_0.value),
                                           invoice_0.escrowCoinCommitment),
                            'wrong escrow coin');
    const nullifier_0 = this._deriveClaimNullifier_0(invoiceId_0,
                                                     merchantClaimSecret_0);
    __compactRuntime.assert(!_descriptor_1.fromValue(__compactRuntime.queryLedgerState(context,
                                                                                       partialProofData,
                                                                                       [
                                                                                        { dup: { n: 0 } },
                                                                                        { idx: { cached: false,
                                                                                                 pushPath: false,
                                                                                                 path: [
                                                                                                        { tag: 'value',
                                                                                                          value: { value: _descriptor_24.toValue(3n),
                                                                                                                   alignment: _descriptor_24.alignment() } }] } },
                                                                                        { push: { storage: false,
                                                                                                  value: __compactRuntime.StateValue.newCell({ value: _descriptor_0.toValue(nullifier_0),
                                                                                                                                               alignment: _descriptor_0.alignment() }).encode() } },
                                                                                        'member',
                                                                                        { popeq: { cached: true,
                                                                                                   result: undefined } }]).value),
                            'claim replay');
    __compactRuntime.queryLedgerState(context,
                                      partialProofData,
                                      [
                                       { idx: { cached: false,
                                                pushPath: true,
                                                path: [
                                                       { tag: 'value',
                                                         value: { value: _descriptor_24.toValue(3n),
                                                                  alignment: _descriptor_24.alignment() } }] } },
                                       { push: { storage: false,
                                                 value: __compactRuntime.StateValue.newCell({ value: _descriptor_0.toValue(nullifier_0),
                                                                                              alignment: _descriptor_0.alignment() }).encode() } },
                                       { push: { storage: true,
                                                 value: __compactRuntime.StateValue.newNull().encode() } },
                                       { ins: { cached: false, n: 1 } },
                                       { ins: { cached: true, n: 1 } }]);
    const tmp_0 = { commitmentVersion: invoice_0.commitmentVersion,
                    commitment: invoice_0.commitment,
                    merchantAuthorization: invoice_0.merchantAuthorization,
                    expiry: invoice_0.expiry,
                    status: invoice_0.status,
                    settlementNullifier: invoice_0.settlementNullifier,
                    escrowCoinCommitment: invoice_0.escrowCoinCommitment,
                    receiptCommitment: invoice_0.receiptCommitment,
                    claimed: true };
    __compactRuntime.queryLedgerState(context,
                                      partialProofData,
                                      [
                                       { idx: { cached: false,
                                                pushPath: true,
                                                path: [
                                                       { tag: 'value',
                                                         value: { value: _descriptor_24.toValue(1n),
                                                                  alignment: _descriptor_24.alignment() } }] } },
                                       { push: { storage: false,
                                                 value: __compactRuntime.StateValue.newCell({ value: _descriptor_0.toValue(invoiceId_0),
                                                                                              alignment: _descriptor_0.alignment() }).encode() } },
                                       { push: { storage: true,
                                                 value: __compactRuntime.StateValue.newCell({ value: _descriptor_5.toValue(tmp_0),
                                                                                              alignment: _descriptor_5.alignment() }).encode() } },
                                       { ins: { cached: false, n: 1 } },
                                       { ins: { cached: true, n: 1 } }]);
    return this._sendShielded_0(context,
                                partialProofData,
                                escrowCoin_0,
                                this._left_0(this._ownPublicKey_0(context,
                                                                  partialProofData)),
                                escrowCoin_0.value);
  }
  _cancelInvoice_0(context, partialProofData, invoiceId_0, merchantClaimSecret_0)
  {
    __compactRuntime.assert(_descriptor_1.fromValue(__compactRuntime.queryLedgerState(context,
                                                                                      partialProofData,
                                                                                      [
                                                                                       { dup: { n: 0 } },
                                                                                       { idx: { cached: false,
                                                                                                pushPath: false,
                                                                                                path: [
                                                                                                       { tag: 'value',
                                                                                                         value: { value: _descriptor_24.toValue(0n),
                                                                                                                  alignment: _descriptor_24.alignment() } }] } },
                                                                                       { push: { storage: false,
                                                                                                 value: __compactRuntime.StateValue.newCell({ value: _descriptor_0.toValue(invoiceId_0),
                                                                                                                                              alignment: _descriptor_0.alignment() }).encode() } },
                                                                                       'member',
                                                                                       { popeq: { cached: true,
                                                                                                  result: undefined } }]).value),
                            'invoice does not exist');
    const invoice_0 = _descriptor_5.fromValue(__compactRuntime.queryLedgerState(context,
                                                                                partialProofData,
                                                                                [
                                                                                 { dup: { n: 0 } },
                                                                                 { idx: { cached: false,
                                                                                          pushPath: false,
                                                                                          path: [
                                                                                                 { tag: 'value',
                                                                                                   value: { value: _descriptor_24.toValue(1n),
                                                                                                            alignment: _descriptor_24.alignment() } }] } },
                                                                                 { idx: { cached: false,
                                                                                          pushPath: false,
                                                                                          path: [
                                                                                                 { tag: 'value',
                                                                                                   value: { value: _descriptor_0.toValue(invoiceId_0),
                                                                                                            alignment: _descriptor_0.alignment() } }] } },
                                                                                 { popeq: { cached: false,
                                                                                            result: undefined } }]).value);
    __compactRuntime.assert(invoice_0.status === 0, 'invoice is not open');
    __compactRuntime.assert(this._equal_11(this._deriveMerchantAuthorization_0(merchantClaimSecret_0),
                                           invoice_0.merchantAuthorization),
                            'unauthorized cancellation');
    const tmp_0 = { commitmentVersion: invoice_0.commitmentVersion,
                    commitment: invoice_0.commitment,
                    merchantAuthorization: invoice_0.merchantAuthorization,
                    expiry: invoice_0.expiry,
                    status: 2,
                    settlementNullifier: invoice_0.settlementNullifier,
                    escrowCoinCommitment: invoice_0.escrowCoinCommitment,
                    receiptCommitment: invoice_0.receiptCommitment,
                    claimed: invoice_0.claimed };
    __compactRuntime.queryLedgerState(context,
                                      partialProofData,
                                      [
                                       { idx: { cached: false,
                                                pushPath: true,
                                                path: [
                                                       { tag: 'value',
                                                         value: { value: _descriptor_24.toValue(1n),
                                                                  alignment: _descriptor_24.alignment() } }] } },
                                       { push: { storage: false,
                                                 value: __compactRuntime.StateValue.newCell({ value: _descriptor_0.toValue(invoiceId_0),
                                                                                              alignment: _descriptor_0.alignment() }).encode() } },
                                       { push: { storage: true,
                                                 value: __compactRuntime.StateValue.newCell({ value: _descriptor_5.toValue(tmp_0),
                                                                                              alignment: _descriptor_5.alignment() }).encode() } },
                                       { ins: { cached: false, n: 1 } },
                                       { ins: { cached: true, n: 1 } }]);
    return [];
  }
  _expireInvoice_0(context, partialProofData, invoiceId_0) {
    __compactRuntime.assert(_descriptor_1.fromValue(__compactRuntime.queryLedgerState(context,
                                                                                      partialProofData,
                                                                                      [
                                                                                       { dup: { n: 0 } },
                                                                                       { idx: { cached: false,
                                                                                                pushPath: false,
                                                                                                path: [
                                                                                                       { tag: 'value',
                                                                                                         value: { value: _descriptor_24.toValue(0n),
                                                                                                                  alignment: _descriptor_24.alignment() } }] } },
                                                                                       { push: { storage: false,
                                                                                                 value: __compactRuntime.StateValue.newCell({ value: _descriptor_0.toValue(invoiceId_0),
                                                                                                                                              alignment: _descriptor_0.alignment() }).encode() } },
                                                                                       'member',
                                                                                       { popeq: { cached: true,
                                                                                                  result: undefined } }]).value),
                            'invoice does not exist');
    const invoice_0 = _descriptor_5.fromValue(__compactRuntime.queryLedgerState(context,
                                                                                partialProofData,
                                                                                [
                                                                                 { dup: { n: 0 } },
                                                                                 { idx: { cached: false,
                                                                                          pushPath: false,
                                                                                          path: [
                                                                                                 { tag: 'value',
                                                                                                   value: { value: _descriptor_24.toValue(1n),
                                                                                                            alignment: _descriptor_24.alignment() } }] } },
                                                                                 { idx: { cached: false,
                                                                                          pushPath: false,
                                                                                          path: [
                                                                                                 { tag: 'value',
                                                                                                   value: { value: _descriptor_0.toValue(invoiceId_0),
                                                                                                            alignment: _descriptor_0.alignment() } }] } },
                                                                                 { popeq: { cached: false,
                                                                                            result: undefined } }]).value);
    __compactRuntime.assert(invoice_0.status === 0, 'invoice is not open');
    __compactRuntime.assert(this._blockTimeGte_0(context,
                                                 partialProofData,
                                                 invoice_0.expiry),
                            'invoice has not expired');
    const tmp_0 = { commitmentVersion: invoice_0.commitmentVersion,
                    commitment: invoice_0.commitment,
                    merchantAuthorization: invoice_0.merchantAuthorization,
                    expiry: invoice_0.expiry,
                    status: 3,
                    settlementNullifier: invoice_0.settlementNullifier,
                    escrowCoinCommitment: invoice_0.escrowCoinCommitment,
                    receiptCommitment: invoice_0.receiptCommitment,
                    claimed: invoice_0.claimed };
    __compactRuntime.queryLedgerState(context,
                                      partialProofData,
                                      [
                                       { idx: { cached: false,
                                                pushPath: true,
                                                path: [
                                                       { tag: 'value',
                                                         value: { value: _descriptor_24.toValue(1n),
                                                                  alignment: _descriptor_24.alignment() } }] } },
                                       { push: { storage: false,
                                                 value: __compactRuntime.StateValue.newCell({ value: _descriptor_0.toValue(invoiceId_0),
                                                                                              alignment: _descriptor_0.alignment() }).encode() } },
                                       { push: { storage: true,
                                                 value: __compactRuntime.StateValue.newCell({ value: _descriptor_5.toValue(tmp_0),
                                                                                              alignment: _descriptor_5.alignment() }).encode() } },
                                       { ins: { cached: false, n: 1 } },
                                       { ins: { cached: true, n: 1 } }]);
    return [];
  }
  _verifyReceipt_0(invoiceId_0,
                   settlementNullifier_0,
                   amount_0,
                   tokenId_0,
                   receiptSecret_0,
                   expectedReceiptCommitment_0)
  {
    return this._equal_12(this._deriveReceiptCommitment_0(invoiceId_0,
                                                          settlementNullifier_0,
                                                          amount_0,
                                                          tokenId_0,
                                                          receiptSecret_0),
                          expectedReceiptCommitment_0);
  }
  _proveInvoiceSettlement_0(context,
                            partialProofData,
                            invoiceId_0,
                            paidAmount_0,
                            paidToken_0,
                            receiptSecret_0)
  {
    __compactRuntime.assert(_descriptor_1.fromValue(__compactRuntime.queryLedgerState(context,
                                                                                      partialProofData,
                                                                                      [
                                                                                       { dup: { n: 0 } },
                                                                                       { idx: { cached: false,
                                                                                                pushPath: false,
                                                                                                path: [
                                                                                                       { tag: 'value',
                                                                                                         value: { value: _descriptor_24.toValue(0n),
                                                                                                                  alignment: _descriptor_24.alignment() } }] } },
                                                                                       { push: { storage: false,
                                                                                                 value: __compactRuntime.StateValue.newCell({ value: _descriptor_0.toValue(invoiceId_0),
                                                                                                                                              alignment: _descriptor_0.alignment() }).encode() } },
                                                                                       'member',
                                                                                       { popeq: { cached: true,
                                                                                                  result: undefined } }]).value),
                            'invoice does not exist');
    const invoice_0 = _descriptor_5.fromValue(__compactRuntime.queryLedgerState(context,
                                                                                partialProofData,
                                                                                [
                                                                                 { dup: { n: 0 } },
                                                                                 { idx: { cached: false,
                                                                                          pushPath: false,
                                                                                          path: [
                                                                                                 { tag: 'value',
                                                                                                   value: { value: _descriptor_24.toValue(1n),
                                                                                                            alignment: _descriptor_24.alignment() } }] } },
                                                                                 { idx: { cached: false,
                                                                                          pushPath: false,
                                                                                          path: [
                                                                                                 { tag: 'value',
                                                                                                   value: { value: _descriptor_0.toValue(invoiceId_0),
                                                                                                            alignment: _descriptor_0.alignment() } }] } },
                                                                                 { popeq: { cached: false,
                                                                                            result: undefined } }]).value);
    __compactRuntime.assert(invoice_0.status === 1, 'invoice is not settled');
    __compactRuntime.assert(this._equal_13(this._deriveReceiptCommitment_0(invoiceId_0,
                                                                           invoice_0.settlementNullifier,
                                                                           paidAmount_0,
                                                                           paidToken_0,
                                                                           receiptSecret_0),
                                           invoice_0.receiptCommitment),
                            'invalid settlement disclosure');
    return [];
  }
  _equal_0(x0, y0) {
    if (!x0.every((x, i) => y0[i] === x)) { return false; }
    return true;
  }
  _equal_1(x0, y0) {
    if (!x0.every((x, i) => y0[i] === x)) { return false; }
    return true;
  }
  _equal_2(x0, y0) {
    if (x0 !== y0) { return false; }
    return true;
  }
  _equal_3(x0, y0) {
    if (!x0.every((x, i) => y0[i] === x)) { return false; }
    return true;
  }
  _equal_4(x0, y0) {
    if (!x0.every((x, i) => y0[i] === x)) { return false; }
    return true;
  }
  _equal_5(x0, y0) {
    if (!x0.every((x, i) => y0[i] === x)) { return false; }
    return true;
  }
  _equal_6(x0, y0) {
    if (!x0.every((x, i) => y0[i] === x)) { return false; }
    return true;
  }
  _equal_7(x0, y0) {
    if (x0 !== y0) { return false; }
    return true;
  }
  _equal_8(x0, y0) {
    if (!x0.every((x, i) => y0[i] === x)) { return false; }
    return true;
  }
  _equal_9(x0, y0) {
    if (!x0.every((x, i) => y0[i] === x)) { return false; }
    return true;
  }
  _equal_10(x0, y0) {
    if (!x0.every((x, i) => y0[i] === x)) { return false; }
    return true;
  }
  _equal_11(x0, y0) {
    if (!x0.every((x, i) => y0[i] === x)) { return false; }
    return true;
  }
  _equal_12(x0, y0) {
    if (!x0.every((x, i) => y0[i] === x)) { return false; }
    return true;
  }
  _equal_13(x0, y0) {
    if (!x0.every((x, i) => y0[i] === x)) { return false; }
    return true;
  }
}
export function ledger(stateOrChargedState) {
  const state = stateOrChargedState instanceof __compactRuntime.StateValue ? stateOrChargedState : stateOrChargedState.state;
  const chargedState = stateOrChargedState instanceof __compactRuntime.StateValue ? new __compactRuntime.ChargedState(stateOrChargedState) : stateOrChargedState;
  const context = {
    currentQueryContext: new __compactRuntime.QueryContext(chargedState, __compactRuntime.dummyContractAddress()),
    costModel: __compactRuntime.CostModel.initialCostModel()
  };
  const partialProofData = {
    input: { value: [], alignment: [] },
    output: undefined,
    publicTranscript: [],
    privateTranscriptOutputs: []
  };
  return {
    invoiceIds: {
      isEmpty(...args_0) {
        if (args_0.length !== 0) {
          throw new __compactRuntime.CompactError(`isEmpty: expected 0 arguments, received ${args_0.length}`);
        }
        return _descriptor_1.fromValue(__compactRuntime.queryLedgerState(context,
                                                                         partialProofData,
                                                                         [
                                                                          { dup: { n: 0 } },
                                                                          { idx: { cached: false,
                                                                                   pushPath: false,
                                                                                   path: [
                                                                                          { tag: 'value',
                                                                                            value: { value: _descriptor_24.toValue(0n),
                                                                                                     alignment: _descriptor_24.alignment() } }] } },
                                                                          'size',
                                                                          { push: { storage: false,
                                                                                    value: __compactRuntime.StateValue.newCell({ value: _descriptor_3.toValue(0n),
                                                                                                                                 alignment: _descriptor_3.alignment() }).encode() } },
                                                                          'eq',
                                                                          { popeq: { cached: true,
                                                                                     result: undefined } }]).value);
      },
      size(...args_0) {
        if (args_0.length !== 0) {
          throw new __compactRuntime.CompactError(`size: expected 0 arguments, received ${args_0.length}`);
        }
        return _descriptor_3.fromValue(__compactRuntime.queryLedgerState(context,
                                                                         partialProofData,
                                                                         [
                                                                          { dup: { n: 0 } },
                                                                          { idx: { cached: false,
                                                                                   pushPath: false,
                                                                                   path: [
                                                                                          { tag: 'value',
                                                                                            value: { value: _descriptor_24.toValue(0n),
                                                                                                     alignment: _descriptor_24.alignment() } }] } },
                                                                          'size',
                                                                          { popeq: { cached: true,
                                                                                     result: undefined } }]).value);
      },
      member(...args_0) {
        if (args_0.length !== 1) {
          throw new __compactRuntime.CompactError(`member: expected 1 argument, received ${args_0.length}`);
        }
        const elem_0 = args_0[0];
        if (!(elem_0.buffer instanceof ArrayBuffer && elem_0.BYTES_PER_ELEMENT === 1 && elem_0.length === 32)) {
          __compactRuntime.typeError('member',
                                     'argument 1',
                                     'lumapay-core.compact line 27 char 1',
                                     'Bytes<32>',
                                     elem_0)
        }
        return _descriptor_1.fromValue(__compactRuntime.queryLedgerState(context,
                                                                         partialProofData,
                                                                         [
                                                                          { dup: { n: 0 } },
                                                                          { idx: { cached: false,
                                                                                   pushPath: false,
                                                                                   path: [
                                                                                          { tag: 'value',
                                                                                            value: { value: _descriptor_24.toValue(0n),
                                                                                                     alignment: _descriptor_24.alignment() } }] } },
                                                                          { push: { storage: false,
                                                                                    value: __compactRuntime.StateValue.newCell({ value: _descriptor_0.toValue(elem_0),
                                                                                                                                 alignment: _descriptor_0.alignment() }).encode() } },
                                                                          'member',
                                                                          { popeq: { cached: true,
                                                                                     result: undefined } }]).value);
      },
      [Symbol.iterator](...args_0) {
        if (args_0.length !== 0) {
          throw new __compactRuntime.CompactError(`iter: expected 0 arguments, received ${args_0.length}`);
        }
        const self_0 = state.asArray()[0];
        return self_0.asMap().keys().map((elem) => _descriptor_0.fromValue(elem.value))[Symbol.iterator]();
      }
    },
    invoices: {
      isEmpty(...args_0) {
        if (args_0.length !== 0) {
          throw new __compactRuntime.CompactError(`isEmpty: expected 0 arguments, received ${args_0.length}`);
        }
        return _descriptor_1.fromValue(__compactRuntime.queryLedgerState(context,
                                                                         partialProofData,
                                                                         [
                                                                          { dup: { n: 0 } },
                                                                          { idx: { cached: false,
                                                                                   pushPath: false,
                                                                                   path: [
                                                                                          { tag: 'value',
                                                                                            value: { value: _descriptor_24.toValue(1n),
                                                                                                     alignment: _descriptor_24.alignment() } }] } },
                                                                          'size',
                                                                          { push: { storage: false,
                                                                                    value: __compactRuntime.StateValue.newCell({ value: _descriptor_3.toValue(0n),
                                                                                                                                 alignment: _descriptor_3.alignment() }).encode() } },
                                                                          'eq',
                                                                          { popeq: { cached: true,
                                                                                     result: undefined } }]).value);
      },
      size(...args_0) {
        if (args_0.length !== 0) {
          throw new __compactRuntime.CompactError(`size: expected 0 arguments, received ${args_0.length}`);
        }
        return _descriptor_3.fromValue(__compactRuntime.queryLedgerState(context,
                                                                         partialProofData,
                                                                         [
                                                                          { dup: { n: 0 } },
                                                                          { idx: { cached: false,
                                                                                   pushPath: false,
                                                                                   path: [
                                                                                          { tag: 'value',
                                                                                            value: { value: _descriptor_24.toValue(1n),
                                                                                                     alignment: _descriptor_24.alignment() } }] } },
                                                                          'size',
                                                                          { popeq: { cached: true,
                                                                                     result: undefined } }]).value);
      },
      member(...args_0) {
        if (args_0.length !== 1) {
          throw new __compactRuntime.CompactError(`member: expected 1 argument, received ${args_0.length}`);
        }
        const key_0 = args_0[0];
        if (!(key_0.buffer instanceof ArrayBuffer && key_0.BYTES_PER_ELEMENT === 1 && key_0.length === 32)) {
          __compactRuntime.typeError('member',
                                     'argument 1',
                                     'lumapay-core.compact line 28 char 1',
                                     'Bytes<32>',
                                     key_0)
        }
        return _descriptor_1.fromValue(__compactRuntime.queryLedgerState(context,
                                                                         partialProofData,
                                                                         [
                                                                          { dup: { n: 0 } },
                                                                          { idx: { cached: false,
                                                                                   pushPath: false,
                                                                                   path: [
                                                                                          { tag: 'value',
                                                                                            value: { value: _descriptor_24.toValue(1n),
                                                                                                     alignment: _descriptor_24.alignment() } }] } },
                                                                          { push: { storage: false,
                                                                                    value: __compactRuntime.StateValue.newCell({ value: _descriptor_0.toValue(key_0),
                                                                                                                                 alignment: _descriptor_0.alignment() }).encode() } },
                                                                          'member',
                                                                          { popeq: { cached: true,
                                                                                     result: undefined } }]).value);
      },
      lookup(...args_0) {
        if (args_0.length !== 1) {
          throw new __compactRuntime.CompactError(`lookup: expected 1 argument, received ${args_0.length}`);
        }
        const key_0 = args_0[0];
        if (!(key_0.buffer instanceof ArrayBuffer && key_0.BYTES_PER_ELEMENT === 1 && key_0.length === 32)) {
          __compactRuntime.typeError('lookup',
                                     'argument 1',
                                     'lumapay-core.compact line 28 char 1',
                                     'Bytes<32>',
                                     key_0)
        }
        return _descriptor_5.fromValue(__compactRuntime.queryLedgerState(context,
                                                                         partialProofData,
                                                                         [
                                                                          { dup: { n: 0 } },
                                                                          { idx: { cached: false,
                                                                                   pushPath: false,
                                                                                   path: [
                                                                                          { tag: 'value',
                                                                                            value: { value: _descriptor_24.toValue(1n),
                                                                                                     alignment: _descriptor_24.alignment() } }] } },
                                                                          { idx: { cached: false,
                                                                                   pushPath: false,
                                                                                   path: [
                                                                                          { tag: 'value',
                                                                                            value: { value: _descriptor_0.toValue(key_0),
                                                                                                     alignment: _descriptor_0.alignment() } }] } },
                                                                          { popeq: { cached: false,
                                                                                     result: undefined } }]).value);
      },
      [Symbol.iterator](...args_0) {
        if (args_0.length !== 0) {
          throw new __compactRuntime.CompactError(`iter: expected 0 arguments, received ${args_0.length}`);
        }
        const self_0 = state.asArray()[1];
        return self_0.asMap().keys().map(  (key) => {    const value = self_0.asMap().get(key).asCell();    return [      _descriptor_0.fromValue(key.value),      _descriptor_5.fromValue(value.value)    ];  })[Symbol.iterator]();
      }
    },
    paymentNullifiers: {
      isEmpty(...args_0) {
        if (args_0.length !== 0) {
          throw new __compactRuntime.CompactError(`isEmpty: expected 0 arguments, received ${args_0.length}`);
        }
        return _descriptor_1.fromValue(__compactRuntime.queryLedgerState(context,
                                                                         partialProofData,
                                                                         [
                                                                          { dup: { n: 0 } },
                                                                          { idx: { cached: false,
                                                                                   pushPath: false,
                                                                                   path: [
                                                                                          { tag: 'value',
                                                                                            value: { value: _descriptor_24.toValue(2n),
                                                                                                     alignment: _descriptor_24.alignment() } }] } },
                                                                          'size',
                                                                          { push: { storage: false,
                                                                                    value: __compactRuntime.StateValue.newCell({ value: _descriptor_3.toValue(0n),
                                                                                                                                 alignment: _descriptor_3.alignment() }).encode() } },
                                                                          'eq',
                                                                          { popeq: { cached: true,
                                                                                     result: undefined } }]).value);
      },
      size(...args_0) {
        if (args_0.length !== 0) {
          throw new __compactRuntime.CompactError(`size: expected 0 arguments, received ${args_0.length}`);
        }
        return _descriptor_3.fromValue(__compactRuntime.queryLedgerState(context,
                                                                         partialProofData,
                                                                         [
                                                                          { dup: { n: 0 } },
                                                                          { idx: { cached: false,
                                                                                   pushPath: false,
                                                                                   path: [
                                                                                          { tag: 'value',
                                                                                            value: { value: _descriptor_24.toValue(2n),
                                                                                                     alignment: _descriptor_24.alignment() } }] } },
                                                                          'size',
                                                                          { popeq: { cached: true,
                                                                                     result: undefined } }]).value);
      },
      member(...args_0) {
        if (args_0.length !== 1) {
          throw new __compactRuntime.CompactError(`member: expected 1 argument, received ${args_0.length}`);
        }
        const elem_0 = args_0[0];
        if (!(elem_0.buffer instanceof ArrayBuffer && elem_0.BYTES_PER_ELEMENT === 1 && elem_0.length === 32)) {
          __compactRuntime.typeError('member',
                                     'argument 1',
                                     'lumapay-core.compact line 29 char 1',
                                     'Bytes<32>',
                                     elem_0)
        }
        return _descriptor_1.fromValue(__compactRuntime.queryLedgerState(context,
                                                                         partialProofData,
                                                                         [
                                                                          { dup: { n: 0 } },
                                                                          { idx: { cached: false,
                                                                                   pushPath: false,
                                                                                   path: [
                                                                                          { tag: 'value',
                                                                                            value: { value: _descriptor_24.toValue(2n),
                                                                                                     alignment: _descriptor_24.alignment() } }] } },
                                                                          { push: { storage: false,
                                                                                    value: __compactRuntime.StateValue.newCell({ value: _descriptor_0.toValue(elem_0),
                                                                                                                                 alignment: _descriptor_0.alignment() }).encode() } },
                                                                          'member',
                                                                          { popeq: { cached: true,
                                                                                     result: undefined } }]).value);
      },
      [Symbol.iterator](...args_0) {
        if (args_0.length !== 0) {
          throw new __compactRuntime.CompactError(`iter: expected 0 arguments, received ${args_0.length}`);
        }
        const self_0 = state.asArray()[2];
        return self_0.asMap().keys().map((elem) => _descriptor_0.fromValue(elem.value))[Symbol.iterator]();
      }
    },
    claimNullifiers: {
      isEmpty(...args_0) {
        if (args_0.length !== 0) {
          throw new __compactRuntime.CompactError(`isEmpty: expected 0 arguments, received ${args_0.length}`);
        }
        return _descriptor_1.fromValue(__compactRuntime.queryLedgerState(context,
                                                                         partialProofData,
                                                                         [
                                                                          { dup: { n: 0 } },
                                                                          { idx: { cached: false,
                                                                                   pushPath: false,
                                                                                   path: [
                                                                                          { tag: 'value',
                                                                                            value: { value: _descriptor_24.toValue(3n),
                                                                                                     alignment: _descriptor_24.alignment() } }] } },
                                                                          'size',
                                                                          { push: { storage: false,
                                                                                    value: __compactRuntime.StateValue.newCell({ value: _descriptor_3.toValue(0n),
                                                                                                                                 alignment: _descriptor_3.alignment() }).encode() } },
                                                                          'eq',
                                                                          { popeq: { cached: true,
                                                                                     result: undefined } }]).value);
      },
      size(...args_0) {
        if (args_0.length !== 0) {
          throw new __compactRuntime.CompactError(`size: expected 0 arguments, received ${args_0.length}`);
        }
        return _descriptor_3.fromValue(__compactRuntime.queryLedgerState(context,
                                                                         partialProofData,
                                                                         [
                                                                          { dup: { n: 0 } },
                                                                          { idx: { cached: false,
                                                                                   pushPath: false,
                                                                                   path: [
                                                                                          { tag: 'value',
                                                                                            value: { value: _descriptor_24.toValue(3n),
                                                                                                     alignment: _descriptor_24.alignment() } }] } },
                                                                          'size',
                                                                          { popeq: { cached: true,
                                                                                     result: undefined } }]).value);
      },
      member(...args_0) {
        if (args_0.length !== 1) {
          throw new __compactRuntime.CompactError(`member: expected 1 argument, received ${args_0.length}`);
        }
        const elem_0 = args_0[0];
        if (!(elem_0.buffer instanceof ArrayBuffer && elem_0.BYTES_PER_ELEMENT === 1 && elem_0.length === 32)) {
          __compactRuntime.typeError('member',
                                     'argument 1',
                                     'lumapay-core.compact line 30 char 1',
                                     'Bytes<32>',
                                     elem_0)
        }
        return _descriptor_1.fromValue(__compactRuntime.queryLedgerState(context,
                                                                         partialProofData,
                                                                         [
                                                                          { dup: { n: 0 } },
                                                                          { idx: { cached: false,
                                                                                   pushPath: false,
                                                                                   path: [
                                                                                          { tag: 'value',
                                                                                            value: { value: _descriptor_24.toValue(3n),
                                                                                                     alignment: _descriptor_24.alignment() } }] } },
                                                                          { push: { storage: false,
                                                                                    value: __compactRuntime.StateValue.newCell({ value: _descriptor_0.toValue(elem_0),
                                                                                                                                 alignment: _descriptor_0.alignment() }).encode() } },
                                                                          'member',
                                                                          { popeq: { cached: true,
                                                                                     result: undefined } }]).value);
      },
      [Symbol.iterator](...args_0) {
        if (args_0.length !== 0) {
          throw new __compactRuntime.CompactError(`iter: expected 0 arguments, received ${args_0.length}`);
        }
        const self_0 = state.asArray()[3];
        return self_0.asMap().keys().map((elem) => _descriptor_0.fromValue(elem.value))[Symbol.iterator]();
      }
    },
    get registryAdminAuthorization() {
      return _descriptor_0.fromValue(__compactRuntime.queryLedgerState(context,
                                                                       partialProofData,
                                                                       [
                                                                        { dup: { n: 0 } },
                                                                        { idx: { cached: false,
                                                                                 pushPath: false,
                                                                                 path: [
                                                                                        { tag: 'value',
                                                                                          value: { value: _descriptor_24.toValue(4n),
                                                                                                   alignment: _descriptor_24.alignment() } }] } },
                                                                        { popeq: { cached: false,
                                                                                   result: undefined } }]).value);
    }
  };
}
const _emptyContext = {
  currentQueryContext: new __compactRuntime.QueryContext(new __compactRuntime.ContractState().data, __compactRuntime.dummyContractAddress())
};
const _dummyContract = new Contract({ });
export const pureCircuits = {
  deriveMerchantAuthorization: (...args_0) => {
    if (args_0.length !== 1) {
      throw new __compactRuntime.CompactError(`deriveMerchantAuthorization: expected 1 argument (as invoked from Typescript), received ${args_0.length}`);
    }
    const merchantClaimSecret_0 = args_0[0];
    if (!(merchantClaimSecret_0.buffer instanceof ArrayBuffer && merchantClaimSecret_0.BYTES_PER_ELEMENT === 1 && merchantClaimSecret_0.length === 32)) {
      __compactRuntime.typeError('deriveMerchantAuthorization',
                                 'argument 1',
                                 'lumapay-core.compact line 41 char 1',
                                 'Bytes<32>',
                                 merchantClaimSecret_0)
    }
    return _dummyContract._deriveMerchantAuthorization_0(merchantClaimSecret_0);
  },
  deriveRegistryAdminAuthorization: (...args_0) => {
    if (args_0.length !== 1) {
      throw new __compactRuntime.CompactError(`deriveRegistryAdminAuthorization: expected 1 argument (as invoked from Typescript), received ${args_0.length}`);
    }
    const adminSecret_0 = args_0[0];
    if (!(adminSecret_0.buffer instanceof ArrayBuffer && adminSecret_0.BYTES_PER_ELEMENT === 1 && adminSecret_0.length === 32)) {
      __compactRuntime.typeError('deriveRegistryAdminAuthorization',
                                 'argument 1',
                                 'lumapay-core.compact line 48 char 1',
                                 'Bytes<32>',
                                 adminSecret_0)
    }
    return _dummyContract._deriveRegistryAdminAuthorization_0(adminSecret_0);
  },
  deriveInvoiceCommitment: (...args_0) => {
    if (args_0.length !== 7) {
      throw new __compactRuntime.CompactError(`deriveInvoiceCommitment: expected 7 arguments (as invoked from Typescript), received ${args_0.length}`);
    }
    const invoiceId_0 = args_0[0];
    const merchantPrivateIdentity_0 = args_0[1];
    const amount_0 = args_0[2];
    const tokenId_0 = args_0[3];
    const invoiceNonce_0 = args_0[4];
    const randomness_0 = args_0[5];
    const expiry_0 = args_0[6];
    if (!(invoiceId_0.buffer instanceof ArrayBuffer && invoiceId_0.BYTES_PER_ELEMENT === 1 && invoiceId_0.length === 32)) {
      __compactRuntime.typeError('deriveInvoiceCommitment',
                                 'argument 1',
                                 'lumapay-core.compact line 55 char 1',
                                 'Bytes<32>',
                                 invoiceId_0)
    }
    if (!(merchantPrivateIdentity_0.buffer instanceof ArrayBuffer && merchantPrivateIdentity_0.BYTES_PER_ELEMENT === 1 && merchantPrivateIdentity_0.length === 32)) {
      __compactRuntime.typeError('deriveInvoiceCommitment',
                                 'argument 2',
                                 'lumapay-core.compact line 55 char 1',
                                 'Bytes<32>',
                                 merchantPrivateIdentity_0)
    }
    if (!(typeof(amount_0) === 'bigint' && amount_0 >= 0n && amount_0 <= 340282366920938463463374607431768211455n)) {
      __compactRuntime.typeError('deriveInvoiceCommitment',
                                 'argument 3',
                                 'lumapay-core.compact line 55 char 1',
                                 'Uint<0..340282366920938463463374607431768211456>',
                                 amount_0)
    }
    if (!(tokenId_0.buffer instanceof ArrayBuffer && tokenId_0.BYTES_PER_ELEMENT === 1 && tokenId_0.length === 32)) {
      __compactRuntime.typeError('deriveInvoiceCommitment',
                                 'argument 4',
                                 'lumapay-core.compact line 55 char 1',
                                 'Bytes<32>',
                                 tokenId_0)
    }
    if (!(invoiceNonce_0.buffer instanceof ArrayBuffer && invoiceNonce_0.BYTES_PER_ELEMENT === 1 && invoiceNonce_0.length === 32)) {
      __compactRuntime.typeError('deriveInvoiceCommitment',
                                 'argument 5',
                                 'lumapay-core.compact line 55 char 1',
                                 'Bytes<32>',
                                 invoiceNonce_0)
    }
    if (!(randomness_0.buffer instanceof ArrayBuffer && randomness_0.BYTES_PER_ELEMENT === 1 && randomness_0.length === 32)) {
      __compactRuntime.typeError('deriveInvoiceCommitment',
                                 'argument 6',
                                 'lumapay-core.compact line 55 char 1',
                                 'Bytes<32>',
                                 randomness_0)
    }
    if (!(typeof(expiry_0) === 'bigint' && expiry_0 >= 0n && expiry_0 <= 18446744073709551615n)) {
      __compactRuntime.typeError('deriveInvoiceCommitment',
                                 'argument 7',
                                 'lumapay-core.compact line 55 char 1',
                                 'Uint<0..18446744073709551616>',
                                 expiry_0)
    }
    return _dummyContract._deriveInvoiceCommitment_0(invoiceId_0,
                                                     merchantPrivateIdentity_0,
                                                     amount_0,
                                                     tokenId_0,
                                                     invoiceNonce_0,
                                                     randomness_0,
                                                     expiry_0);
  },
  derivePaymentNullifier: (...args_0) => {
    if (args_0.length !== 2) {
      throw new __compactRuntime.CompactError(`derivePaymentNullifier: expected 2 arguments (as invoked from Typescript), received ${args_0.length}`);
    }
    const invoiceId_0 = args_0[0];
    const paymentSecret_0 = args_0[1];
    if (!(invoiceId_0.buffer instanceof ArrayBuffer && invoiceId_0.BYTES_PER_ELEMENT === 1 && invoiceId_0.length === 32)) {
      __compactRuntime.typeError('derivePaymentNullifier',
                                 'argument 1',
                                 'lumapay-core.compact line 80 char 1',
                                 'Bytes<32>',
                                 invoiceId_0)
    }
    if (!(paymentSecret_0.buffer instanceof ArrayBuffer && paymentSecret_0.BYTES_PER_ELEMENT === 1 && paymentSecret_0.length === 32)) {
      __compactRuntime.typeError('derivePaymentNullifier',
                                 'argument 2',
                                 'lumapay-core.compact line 80 char 1',
                                 'Bytes<32>',
                                 paymentSecret_0)
    }
    return _dummyContract._derivePaymentNullifier_0(invoiceId_0, paymentSecret_0);
  },
  deriveClaimNullifier: (...args_0) => {
    if (args_0.length !== 2) {
      throw new __compactRuntime.CompactError(`deriveClaimNullifier: expected 2 arguments (as invoked from Typescript), received ${args_0.length}`);
    }
    const invoiceId_0 = args_0[0];
    const merchantClaimSecret_0 = args_0[1];
    if (!(invoiceId_0.buffer instanceof ArrayBuffer && invoiceId_0.BYTES_PER_ELEMENT === 1 && invoiceId_0.length === 32)) {
      __compactRuntime.typeError('deriveClaimNullifier',
                                 'argument 1',
                                 'lumapay-core.compact line 91 char 1',
                                 'Bytes<32>',
                                 invoiceId_0)
    }
    if (!(merchantClaimSecret_0.buffer instanceof ArrayBuffer && merchantClaimSecret_0.BYTES_PER_ELEMENT === 1 && merchantClaimSecret_0.length === 32)) {
      __compactRuntime.typeError('deriveClaimNullifier',
                                 'argument 2',
                                 'lumapay-core.compact line 91 char 1',
                                 'Bytes<32>',
                                 merchantClaimSecret_0)
    }
    return _dummyContract._deriveClaimNullifier_0(invoiceId_0,
                                                  merchantClaimSecret_0);
  },
  deriveEscrowCoinCommitment: (...args_0) => {
    if (args_0.length !== 3) {
      throw new __compactRuntime.CompactError(`deriveEscrowCoinCommitment: expected 3 arguments (as invoked from Typescript), received ${args_0.length}`);
    }
    const nonce_0 = args_0[0];
    const color_0 = args_0[1];
    const value_0 = args_0[2];
    if (!(nonce_0.buffer instanceof ArrayBuffer && nonce_0.BYTES_PER_ELEMENT === 1 && nonce_0.length === 32)) {
      __compactRuntime.typeError('deriveEscrowCoinCommitment',
                                 'argument 1',
                                 'lumapay-core.compact line 102 char 1',
                                 'Bytes<32>',
                                 nonce_0)
    }
    if (!(color_0.buffer instanceof ArrayBuffer && color_0.BYTES_PER_ELEMENT === 1 && color_0.length === 32)) {
      __compactRuntime.typeError('deriveEscrowCoinCommitment',
                                 'argument 2',
                                 'lumapay-core.compact line 102 char 1',
                                 'Bytes<32>',
                                 color_0)
    }
    if (!(typeof(value_0) === 'bigint' && value_0 >= 0n && value_0 <= 340282366920938463463374607431768211455n)) {
      __compactRuntime.typeError('deriveEscrowCoinCommitment',
                                 'argument 3',
                                 'lumapay-core.compact line 102 char 1',
                                 'Uint<0..340282366920938463463374607431768211456>',
                                 value_0)
    }
    return _dummyContract._deriveEscrowCoinCommitment_0(nonce_0,
                                                        color_0,
                                                        value_0);
  },
  deriveReceiptCommitment: (...args_0) => {
    if (args_0.length !== 5) {
      throw new __compactRuntime.CompactError(`deriveReceiptCommitment: expected 5 arguments (as invoked from Typescript), received ${args_0.length}`);
    }
    const invoiceId_0 = args_0[0];
    const settlementNullifier_0 = args_0[1];
    const amount_0 = args_0[2];
    const tokenId_0 = args_0[3];
    const receiptSecret_0 = args_0[4];
    if (!(invoiceId_0.buffer instanceof ArrayBuffer && invoiceId_0.BYTES_PER_ELEMENT === 1 && invoiceId_0.length === 32)) {
      __compactRuntime.typeError('deriveReceiptCommitment',
                                 'argument 1',
                                 'lumapay-core.compact line 115 char 1',
                                 'Bytes<32>',
                                 invoiceId_0)
    }
    if (!(settlementNullifier_0.buffer instanceof ArrayBuffer && settlementNullifier_0.BYTES_PER_ELEMENT === 1 && settlementNullifier_0.length === 32)) {
      __compactRuntime.typeError('deriveReceiptCommitment',
                                 'argument 2',
                                 'lumapay-core.compact line 115 char 1',
                                 'Bytes<32>',
                                 settlementNullifier_0)
    }
    if (!(typeof(amount_0) === 'bigint' && amount_0 >= 0n && amount_0 <= 340282366920938463463374607431768211455n)) {
      __compactRuntime.typeError('deriveReceiptCommitment',
                                 'argument 3',
                                 'lumapay-core.compact line 115 char 1',
                                 'Uint<0..340282366920938463463374607431768211456>',
                                 amount_0)
    }
    if (!(tokenId_0.buffer instanceof ArrayBuffer && tokenId_0.BYTES_PER_ELEMENT === 1 && tokenId_0.length === 32)) {
      __compactRuntime.typeError('deriveReceiptCommitment',
                                 'argument 4',
                                 'lumapay-core.compact line 115 char 1',
                                 'Bytes<32>',
                                 tokenId_0)
    }
    if (!(receiptSecret_0.buffer instanceof ArrayBuffer && receiptSecret_0.BYTES_PER_ELEMENT === 1 && receiptSecret_0.length === 32)) {
      __compactRuntime.typeError('deriveReceiptCommitment',
                                 'argument 5',
                                 'lumapay-core.compact line 115 char 1',
                                 'Bytes<32>',
                                 receiptSecret_0)
    }
    return _dummyContract._deriveReceiptCommitment_0(invoiceId_0,
                                                     settlementNullifier_0,
                                                     amount_0,
                                                     tokenId_0,
                                                     receiptSecret_0);
  },
  verifyReceipt: (...args_0) => {
    if (args_0.length !== 6) {
      throw new __compactRuntime.CompactError(`verifyReceipt: expected 6 arguments (as invoked from Typescript), received ${args_0.length}`);
    }
    const invoiceId_0 = args_0[0];
    const settlementNullifier_0 = args_0[1];
    const amount_0 = args_0[2];
    const tokenId_0 = args_0[3];
    const receiptSecret_0 = args_0[4];
    const expectedReceiptCommitment_0 = args_0[5];
    if (!(invoiceId_0.buffer instanceof ArrayBuffer && invoiceId_0.BYTES_PER_ELEMENT === 1 && invoiceId_0.length === 32)) {
      __compactRuntime.typeError('verifyReceipt',
                                 'argument 1',
                                 'lumapay-core.compact line 293 char 1',
                                 'Bytes<32>',
                                 invoiceId_0)
    }
    if (!(settlementNullifier_0.buffer instanceof ArrayBuffer && settlementNullifier_0.BYTES_PER_ELEMENT === 1 && settlementNullifier_0.length === 32)) {
      __compactRuntime.typeError('verifyReceipt',
                                 'argument 2',
                                 'lumapay-core.compact line 293 char 1',
                                 'Bytes<32>',
                                 settlementNullifier_0)
    }
    if (!(typeof(amount_0) === 'bigint' && amount_0 >= 0n && amount_0 <= 340282366920938463463374607431768211455n)) {
      __compactRuntime.typeError('verifyReceipt',
                                 'argument 3',
                                 'lumapay-core.compact line 293 char 1',
                                 'Uint<0..340282366920938463463374607431768211456>',
                                 amount_0)
    }
    if (!(tokenId_0.buffer instanceof ArrayBuffer && tokenId_0.BYTES_PER_ELEMENT === 1 && tokenId_0.length === 32)) {
      __compactRuntime.typeError('verifyReceipt',
                                 'argument 4',
                                 'lumapay-core.compact line 293 char 1',
                                 'Bytes<32>',
                                 tokenId_0)
    }
    if (!(receiptSecret_0.buffer instanceof ArrayBuffer && receiptSecret_0.BYTES_PER_ELEMENT === 1 && receiptSecret_0.length === 32)) {
      __compactRuntime.typeError('verifyReceipt',
                                 'argument 5',
                                 'lumapay-core.compact line 293 char 1',
                                 'Bytes<32>',
                                 receiptSecret_0)
    }
    if (!(expectedReceiptCommitment_0.buffer instanceof ArrayBuffer && expectedReceiptCommitment_0.BYTES_PER_ELEMENT === 1 && expectedReceiptCommitment_0.length === 32)) {
      __compactRuntime.typeError('verifyReceipt',
                                 'argument 6',
                                 'lumapay-core.compact line 293 char 1',
                                 'Bytes<32>',
                                 expectedReceiptCommitment_0)
    }
    return _dummyContract._verifyReceipt_0(invoiceId_0,
                                           settlementNullifier_0,
                                           amount_0,
                                           tokenId_0,
                                           receiptSecret_0,
                                           expectedReceiptCommitment_0);
  }
};
export const contractReferenceLocations =
  { tag: 'publicLedgerArray', indices: { } };
//# sourceMappingURL=index.js.map
