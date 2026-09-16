import * as __compactRuntime from '@midnight-ntwrk/compact-runtime';
__compactRuntime.checkRuntimeVersion('0.16.0');

export var GiftCardStatus;
(function (GiftCardStatus) {
  GiftCardStatus[GiftCardStatus['OPEN'] = 0] = 'OPEN';
  GiftCardStatus[GiftCardStatus['REDEEMED'] = 1] = 'REDEEMED';
  GiftCardStatus[GiftCardStatus['RECLAIMED'] = 2] = 'RECLAIMED';
})(GiftCardStatus || (GiftCardStatus = {}));

const _descriptor_0 = new __compactRuntime.CompactTypeBytes(32);

const _descriptor_1 = __compactRuntime.CompactTypeBoolean;

const _descriptor_2 = new __compactRuntime.CompactTypeUnsignedInteger(65535n, 2);

const _descriptor_3 = new __compactRuntime.CompactTypeUnsignedInteger(18446744073709551615n, 8);

const _descriptor_4 = new __compactRuntime.CompactTypeEnum(2, 1);

class _GiftCardPublicState_0 {
  alignment() {
    return _descriptor_2.alignment().concat(_descriptor_0.alignment().concat(_descriptor_0.alignment().concat(_descriptor_3.alignment().concat(_descriptor_0.alignment().concat(_descriptor_0.alignment().concat(_descriptor_4.alignment()))))));
  }
  fromValue(value_0) {
    return {
      commitmentVersion: _descriptor_2.fromValue(value_0),
      commitment: _descriptor_0.fromValue(value_0),
      issuerAuthorization: _descriptor_0.fromValue(value_0),
      expiry: _descriptor_3.fromValue(value_0),
      escrowCoinCommitment: _descriptor_0.fromValue(value_0),
      redemptionNullifier: _descriptor_0.fromValue(value_0),
      status: _descriptor_4.fromValue(value_0)
    }
  }
  toValue(value_0) {
    return _descriptor_2.toValue(value_0.commitmentVersion).concat(_descriptor_0.toValue(value_0.commitment).concat(_descriptor_0.toValue(value_0.issuerAuthorization).concat(_descriptor_3.toValue(value_0.expiry).concat(_descriptor_0.toValue(value_0.escrowCoinCommitment).concat(_descriptor_0.toValue(value_0.redemptionNullifier).concat(_descriptor_4.toValue(value_0.status)))))));
  }
}

const _descriptor_5 = new _GiftCardPublicState_0();

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

const _descriptor_18 = new _tuple_1();

class _tuple_2 {
  alignment() {
    return _descriptor_0.alignment().concat(_descriptor_2.alignment().concat(_descriptor_0.alignment().concat(_descriptor_6.alignment().concat(_descriptor_0.alignment().concat(_descriptor_0.alignment().concat(_descriptor_0.alignment().concat(_descriptor_3.alignment())))))));
  }
  fromValue(value_0) {
    return [
      _descriptor_0.fromValue(value_0),
      _descriptor_2.fromValue(value_0),
      _descriptor_0.fromValue(value_0),
      _descriptor_6.fromValue(value_0),
      _descriptor_0.fromValue(value_0),
      _descriptor_0.fromValue(value_0),
      _descriptor_0.fromValue(value_0),
      _descriptor_3.fromValue(value_0)
    ]
  }
  toValue(value_0) {
    return _descriptor_0.toValue(value_0[0]).concat(_descriptor_2.toValue(value_0[1]).concat(_descriptor_0.toValue(value_0[2]).concat(_descriptor_6.toValue(value_0[3]).concat(_descriptor_0.toValue(value_0[4]).concat(_descriptor_0.toValue(value_0[5]).concat(_descriptor_0.toValue(value_0[6]).concat(_descriptor_3.toValue(value_0[7]))))))));
  }
}

const _descriptor_19 = new _tuple_2();

const _descriptor_20 = new __compactRuntime.CompactTypeVector(2, _descriptor_14);

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

const _descriptor_21 = new _Either_1();

const _descriptor_22 = new __compactRuntime.CompactTypeUnsignedInteger(255n, 1);

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
      deriveEscrowCoinCommitment(context, ...args_1) {
        return { result: pureCircuits.deriveEscrowCoinCommitment(...args_1), context };
      },
      deriveGiftCardCommitment(context, ...args_1) {
        return { result: pureCircuits.deriveGiftCardCommitment(...args_1), context };
      },
      deriveGiftCardIssuerAuthorization(context, ...args_1) {
        return { result: pureCircuits.deriveGiftCardIssuerAuthorization(...args_1), context };
      },
      deriveGiftCardRedemptionNullifier(context, ...args_1) {
        return { result: pureCircuits.deriveGiftCardRedemptionNullifier(...args_1), context };
      },
      deriveGiftCardReclaimNullifier(context, ...args_1) {
        return { result: pureCircuits.deriveGiftCardReclaimNullifier(...args_1), context };
      },
      createGiftCard: (...args_1) => {
        if (args_1.length !== 9) {
          throw new __compactRuntime.CompactError(`createGiftCard: expected 9 arguments (as invoked from Typescript), received ${args_1.length}`);
        }
        const contextOrig_0 = args_1[0];
        const giftCardId_0 = args_1[1];
        const amount_0 = args_1[2];
        const tokenId_0 = args_1[3];
        const giftSecret_0 = args_1[4];
        const giftRandomness_0 = args_1[5];
        const issuerAuthorizationCommitment_0 = args_1[6];
        const expiry_0 = args_1[7];
        const coin_0 = args_1[8];
        if (!(typeof(contextOrig_0) === 'object' && contextOrig_0.currentQueryContext != undefined)) {
          __compactRuntime.typeError('createGiftCard',
                                     'argument 1 (as invoked from Typescript)',
                                     'lumapay-gift-cards.compact line 96 char 1',
                                     'CircuitContext',
                                     contextOrig_0)
        }
        if (!(giftCardId_0.buffer instanceof ArrayBuffer && giftCardId_0.BYTES_PER_ELEMENT === 1 && giftCardId_0.length === 32)) {
          __compactRuntime.typeError('createGiftCard',
                                     'argument 1 (argument 2 as invoked from Typescript)',
                                     'lumapay-gift-cards.compact line 96 char 1',
                                     'Bytes<32>',
                                     giftCardId_0)
        }
        if (!(typeof(amount_0) === 'bigint' && amount_0 >= 0n && amount_0 <= 340282366920938463463374607431768211455n)) {
          __compactRuntime.typeError('createGiftCard',
                                     'argument 2 (argument 3 as invoked from Typescript)',
                                     'lumapay-gift-cards.compact line 96 char 1',
                                     'Uint<0..340282366920938463463374607431768211456>',
                                     amount_0)
        }
        if (!(tokenId_0.buffer instanceof ArrayBuffer && tokenId_0.BYTES_PER_ELEMENT === 1 && tokenId_0.length === 32)) {
          __compactRuntime.typeError('createGiftCard',
                                     'argument 3 (argument 4 as invoked from Typescript)',
                                     'lumapay-gift-cards.compact line 96 char 1',
                                     'Bytes<32>',
                                     tokenId_0)
        }
        if (!(giftSecret_0.buffer instanceof ArrayBuffer && giftSecret_0.BYTES_PER_ELEMENT === 1 && giftSecret_0.length === 32)) {
          __compactRuntime.typeError('createGiftCard',
                                     'argument 4 (argument 5 as invoked from Typescript)',
                                     'lumapay-gift-cards.compact line 96 char 1',
                                     'Bytes<32>',
                                     giftSecret_0)
        }
        if (!(giftRandomness_0.buffer instanceof ArrayBuffer && giftRandomness_0.BYTES_PER_ELEMENT === 1 && giftRandomness_0.length === 32)) {
          __compactRuntime.typeError('createGiftCard',
                                     'argument 5 (argument 6 as invoked from Typescript)',
                                     'lumapay-gift-cards.compact line 96 char 1',
                                     'Bytes<32>',
                                     giftRandomness_0)
        }
        if (!(issuerAuthorizationCommitment_0.buffer instanceof ArrayBuffer && issuerAuthorizationCommitment_0.BYTES_PER_ELEMENT === 1 && issuerAuthorizationCommitment_0.length === 32)) {
          __compactRuntime.typeError('createGiftCard',
                                     'argument 6 (argument 7 as invoked from Typescript)',
                                     'lumapay-gift-cards.compact line 96 char 1',
                                     'Bytes<32>',
                                     issuerAuthorizationCommitment_0)
        }
        if (!(typeof(expiry_0) === 'bigint' && expiry_0 >= 0n && expiry_0 <= 18446744073709551615n)) {
          __compactRuntime.typeError('createGiftCard',
                                     'argument 7 (argument 8 as invoked from Typescript)',
                                     'lumapay-gift-cards.compact line 96 char 1',
                                     'Uint<0..18446744073709551616>',
                                     expiry_0)
        }
        if (!(typeof(coin_0) === 'object' && coin_0.nonce.buffer instanceof ArrayBuffer && coin_0.nonce.BYTES_PER_ELEMENT === 1 && coin_0.nonce.length === 32 && coin_0.color.buffer instanceof ArrayBuffer && coin_0.color.BYTES_PER_ELEMENT === 1 && coin_0.color.length === 32 && typeof(coin_0.value) === 'bigint' && coin_0.value >= 0n && coin_0.value <= 340282366920938463463374607431768211455n)) {
          __compactRuntime.typeError('createGiftCard',
                                     'argument 8 (argument 9 as invoked from Typescript)',
                                     'lumapay-gift-cards.compact line 96 char 1',
                                     'struct ShieldedCoinInfo<nonce: Bytes<32>, color: Bytes<32>, value: Uint<0..340282366920938463463374607431768211456>>',
                                     coin_0)
        }
        const context = { ...contextOrig_0, gasCost: __compactRuntime.emptyRunningCost() };
        const partialProofData = {
          input: {
            value: _descriptor_0.toValue(giftCardId_0).concat(_descriptor_6.toValue(amount_0).concat(_descriptor_0.toValue(tokenId_0).concat(_descriptor_0.toValue(giftSecret_0).concat(_descriptor_0.toValue(giftRandomness_0).concat(_descriptor_0.toValue(issuerAuthorizationCommitment_0).concat(_descriptor_3.toValue(expiry_0).concat(_descriptor_8.toValue(coin_0)))))))),
            alignment: _descriptor_0.alignment().concat(_descriptor_6.alignment().concat(_descriptor_0.alignment().concat(_descriptor_0.alignment().concat(_descriptor_0.alignment().concat(_descriptor_0.alignment().concat(_descriptor_3.alignment().concat(_descriptor_8.alignment())))))))
          },
          output: undefined,
          publicTranscript: [],
          privateTranscriptOutputs: []
        };
        const result_0 = this._createGiftCard_0(context,
                                                partialProofData,
                                                giftCardId_0,
                                                amount_0,
                                                tokenId_0,
                                                giftSecret_0,
                                                giftRandomness_0,
                                                issuerAuthorizationCommitment_0,
                                                expiry_0,
                                                coin_0);
        partialProofData.output = { value: [], alignment: [] };
        return { result: result_0, context: context, proofData: partialProofData, gasCost: context.gasCost };
      },
      redeemGiftCard: (...args_1) => {
        if (args_1.length !== 7) {
          throw new __compactRuntime.CompactError(`redeemGiftCard: expected 7 arguments (as invoked from Typescript), received ${args_1.length}`);
        }
        const contextOrig_0 = args_1[0];
        const giftCardId_0 = args_1[1];
        const amount_0 = args_1[2];
        const tokenId_0 = args_1[3];
        const giftSecret_0 = args_1[4];
        const giftRandomness_0 = args_1[5];
        const escrowCoin_0 = args_1[6];
        if (!(typeof(contextOrig_0) === 'object' && contextOrig_0.currentQueryContext != undefined)) {
          __compactRuntime.typeError('redeemGiftCard',
                                     'argument 1 (as invoked from Typescript)',
                                     'lumapay-gift-cards.compact line 140 char 1',
                                     'CircuitContext',
                                     contextOrig_0)
        }
        if (!(giftCardId_0.buffer instanceof ArrayBuffer && giftCardId_0.BYTES_PER_ELEMENT === 1 && giftCardId_0.length === 32)) {
          __compactRuntime.typeError('redeemGiftCard',
                                     'argument 1 (argument 2 as invoked from Typescript)',
                                     'lumapay-gift-cards.compact line 140 char 1',
                                     'Bytes<32>',
                                     giftCardId_0)
        }
        if (!(typeof(amount_0) === 'bigint' && amount_0 >= 0n && amount_0 <= 340282366920938463463374607431768211455n)) {
          __compactRuntime.typeError('redeemGiftCard',
                                     'argument 2 (argument 3 as invoked from Typescript)',
                                     'lumapay-gift-cards.compact line 140 char 1',
                                     'Uint<0..340282366920938463463374607431768211456>',
                                     amount_0)
        }
        if (!(tokenId_0.buffer instanceof ArrayBuffer && tokenId_0.BYTES_PER_ELEMENT === 1 && tokenId_0.length === 32)) {
          __compactRuntime.typeError('redeemGiftCard',
                                     'argument 3 (argument 4 as invoked from Typescript)',
                                     'lumapay-gift-cards.compact line 140 char 1',
                                     'Bytes<32>',
                                     tokenId_0)
        }
        if (!(giftSecret_0.buffer instanceof ArrayBuffer && giftSecret_0.BYTES_PER_ELEMENT === 1 && giftSecret_0.length === 32)) {
          __compactRuntime.typeError('redeemGiftCard',
                                     'argument 4 (argument 5 as invoked from Typescript)',
                                     'lumapay-gift-cards.compact line 140 char 1',
                                     'Bytes<32>',
                                     giftSecret_0)
        }
        if (!(giftRandomness_0.buffer instanceof ArrayBuffer && giftRandomness_0.BYTES_PER_ELEMENT === 1 && giftRandomness_0.length === 32)) {
          __compactRuntime.typeError('redeemGiftCard',
                                     'argument 5 (argument 6 as invoked from Typescript)',
                                     'lumapay-gift-cards.compact line 140 char 1',
                                     'Bytes<32>',
                                     giftRandomness_0)
        }
        if (!(typeof(escrowCoin_0) === 'object' && escrowCoin_0.nonce.buffer instanceof ArrayBuffer && escrowCoin_0.nonce.BYTES_PER_ELEMENT === 1 && escrowCoin_0.nonce.length === 32 && escrowCoin_0.color.buffer instanceof ArrayBuffer && escrowCoin_0.color.BYTES_PER_ELEMENT === 1 && escrowCoin_0.color.length === 32 && typeof(escrowCoin_0.value) === 'bigint' && escrowCoin_0.value >= 0n && escrowCoin_0.value <= 340282366920938463463374607431768211455n && typeof(escrowCoin_0.mt_index) === 'bigint' && escrowCoin_0.mt_index >= 0n && escrowCoin_0.mt_index <= 18446744073709551615n)) {
          __compactRuntime.typeError('redeemGiftCard',
                                     'argument 6 (argument 7 as invoked from Typescript)',
                                     'lumapay-gift-cards.compact line 140 char 1',
                                     'struct QualifiedShieldedCoinInfo<nonce: Bytes<32>, color: Bytes<32>, value: Uint<0..340282366920938463463374607431768211456>, mt_index: Uint<0..18446744073709551616>>',
                                     escrowCoin_0)
        }
        const context = { ...contextOrig_0, gasCost: __compactRuntime.emptyRunningCost() };
        const partialProofData = {
          input: {
            value: _descriptor_0.toValue(giftCardId_0).concat(_descriptor_6.toValue(amount_0).concat(_descriptor_0.toValue(tokenId_0).concat(_descriptor_0.toValue(giftSecret_0).concat(_descriptor_0.toValue(giftRandomness_0).concat(_descriptor_7.toValue(escrowCoin_0)))))),
            alignment: _descriptor_0.alignment().concat(_descriptor_6.alignment().concat(_descriptor_0.alignment().concat(_descriptor_0.alignment().concat(_descriptor_0.alignment().concat(_descriptor_7.alignment())))))
          },
          output: undefined,
          publicTranscript: [],
          privateTranscriptOutputs: []
        };
        const result_0 = this._redeemGiftCard_0(context,
                                                partialProofData,
                                                giftCardId_0,
                                                amount_0,
                                                tokenId_0,
                                                giftSecret_0,
                                                giftRandomness_0,
                                                escrowCoin_0);
        partialProofData.output = { value: _descriptor_10.toValue(result_0), alignment: _descriptor_10.alignment() };
        return { result: result_0, context: context, proofData: partialProofData, gasCost: context.gasCost };
      },
      reclaimExpiredGiftCard: (...args_1) => {
        if (args_1.length !== 4) {
          throw new __compactRuntime.CompactError(`reclaimExpiredGiftCard: expected 4 arguments (as invoked from Typescript), received ${args_1.length}`);
        }
        const contextOrig_0 = args_1[0];
        const giftCardId_0 = args_1[1];
        const issuerSecret_0 = args_1[2];
        const escrowCoin_0 = args_1[3];
        if (!(typeof(contextOrig_0) === 'object' && contextOrig_0.currentQueryContext != undefined)) {
          __compactRuntime.typeError('reclaimExpiredGiftCard',
                                     'argument 1 (as invoked from Typescript)',
                                     'lumapay-gift-cards.compact line 192 char 1',
                                     'CircuitContext',
                                     contextOrig_0)
        }
        if (!(giftCardId_0.buffer instanceof ArrayBuffer && giftCardId_0.BYTES_PER_ELEMENT === 1 && giftCardId_0.length === 32)) {
          __compactRuntime.typeError('reclaimExpiredGiftCard',
                                     'argument 1 (argument 2 as invoked from Typescript)',
                                     'lumapay-gift-cards.compact line 192 char 1',
                                     'Bytes<32>',
                                     giftCardId_0)
        }
        if (!(issuerSecret_0.buffer instanceof ArrayBuffer && issuerSecret_0.BYTES_PER_ELEMENT === 1 && issuerSecret_0.length === 32)) {
          __compactRuntime.typeError('reclaimExpiredGiftCard',
                                     'argument 2 (argument 3 as invoked from Typescript)',
                                     'lumapay-gift-cards.compact line 192 char 1',
                                     'Bytes<32>',
                                     issuerSecret_0)
        }
        if (!(typeof(escrowCoin_0) === 'object' && escrowCoin_0.nonce.buffer instanceof ArrayBuffer && escrowCoin_0.nonce.BYTES_PER_ELEMENT === 1 && escrowCoin_0.nonce.length === 32 && escrowCoin_0.color.buffer instanceof ArrayBuffer && escrowCoin_0.color.BYTES_PER_ELEMENT === 1 && escrowCoin_0.color.length === 32 && typeof(escrowCoin_0.value) === 'bigint' && escrowCoin_0.value >= 0n && escrowCoin_0.value <= 340282366920938463463374607431768211455n && typeof(escrowCoin_0.mt_index) === 'bigint' && escrowCoin_0.mt_index >= 0n && escrowCoin_0.mt_index <= 18446744073709551615n)) {
          __compactRuntime.typeError('reclaimExpiredGiftCard',
                                     'argument 3 (argument 4 as invoked from Typescript)',
                                     'lumapay-gift-cards.compact line 192 char 1',
                                     'struct QualifiedShieldedCoinInfo<nonce: Bytes<32>, color: Bytes<32>, value: Uint<0..340282366920938463463374607431768211456>, mt_index: Uint<0..18446744073709551616>>',
                                     escrowCoin_0)
        }
        const context = { ...contextOrig_0, gasCost: __compactRuntime.emptyRunningCost() };
        const partialProofData = {
          input: {
            value: _descriptor_0.toValue(giftCardId_0).concat(_descriptor_0.toValue(issuerSecret_0).concat(_descriptor_7.toValue(escrowCoin_0))),
            alignment: _descriptor_0.alignment().concat(_descriptor_0.alignment().concat(_descriptor_7.alignment()))
          },
          output: undefined,
          publicTranscript: [],
          privateTranscriptOutputs: []
        };
        const result_0 = this._reclaimExpiredGiftCard_0(context,
                                                        partialProofData,
                                                        giftCardId_0,
                                                        issuerSecret_0,
                                                        escrowCoin_0);
        partialProofData.output = { value: _descriptor_10.toValue(result_0), alignment: _descriptor_10.alignment() };
        return { result: result_0, context: context, proofData: partialProofData, gasCost: context.gasCost };
      }
    };
    this.impureCircuits = {
      createGiftCard: this.circuits.createGiftCard,
      redeemGiftCard: this.circuits.redeemGiftCard,
      reclaimExpiredGiftCard: this.circuits.reclaimExpiredGiftCard
    };
    this.provableCircuits = {
      createGiftCard: this.circuits.createGiftCard,
      redeemGiftCard: this.circuits.redeemGiftCard,
      reclaimExpiredGiftCard: this.circuits.reclaimExpiredGiftCard
    };
  }
  initialState(...args_0) {
    if (args_0.length !== 1) {
      throw new __compactRuntime.CompactError(`Contract state constructor: expected 1 argument (as invoked from Typescript), received ${args_0.length}`);
    }
    const constructorContext_0 = args_0[0];
    if (typeof(constructorContext_0) !== 'object') {
      throw new __compactRuntime.CompactError(`Contract state constructor: expected 'constructorContext' in argument 1 (as invoked from Typescript) to be an object`);
    }
    if (!('initialZswapLocalState' in constructorContext_0)) {
      throw new __compactRuntime.CompactError(`Contract state constructor: expected 'initialZswapLocalState' in argument 1 (as invoked from Typescript)`);
    }
    if (typeof(constructorContext_0.initialZswapLocalState) !== 'object') {
      throw new __compactRuntime.CompactError(`Contract state constructor: expected 'initialZswapLocalState' in argument 1 (as invoked from Typescript) to be an object`);
    }
    const state_0 = new __compactRuntime.ContractState();
    let stateValue_0 = __compactRuntime.StateValue.newArray();
    stateValue_0 = stateValue_0.arrayPush(__compactRuntime.StateValue.newNull());
    stateValue_0 = stateValue_0.arrayPush(__compactRuntime.StateValue.newNull());
    stateValue_0 = stateValue_0.arrayPush(__compactRuntime.StateValue.newNull());
    state_0.data = new __compactRuntime.ChargedState(stateValue_0);
    state_0.setOperation('createGiftCard', new __compactRuntime.ContractOperation());
    state_0.setOperation('redeemGiftCard', new __compactRuntime.ContractOperation());
    state_0.setOperation('reclaimExpiredGiftCard', new __compactRuntime.ContractOperation());
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
                                                 value: __compactRuntime.StateValue.newCell({ value: _descriptor_22.toValue(0n),
                                                                                              alignment: _descriptor_22.alignment() }).encode() } },
                                       { push: { storage: true,
                                                 value: __compactRuntime.StateValue.newMap(
                                                          new __compactRuntime.StateMap()
                                                        ).encode() } },
                                       { ins: { cached: false, n: 1 } }]);
    __compactRuntime.queryLedgerState(context,
                                      partialProofData,
                                      [
                                       { push: { storage: false,
                                                 value: __compactRuntime.StateValue.newCell({ value: _descriptor_22.toValue(1n),
                                                                                              alignment: _descriptor_22.alignment() }).encode() } },
                                       { push: { storage: true,
                                                 value: __compactRuntime.StateValue.newMap(
                                                          new __compactRuntime.StateMap()
                                                        ).encode() } },
                                       { ins: { cached: false, n: 1 } }]);
    __compactRuntime.queryLedgerState(context,
                                      partialProofData,
                                      [
                                       { push: { storage: false,
                                                 value: __compactRuntime.StateValue.newCell({ value: _descriptor_22.toValue(2n),
                                                                                              alignment: _descriptor_22.alignment() }).encode() } },
                                       { push: { storage: true,
                                                 value: __compactRuntime.StateValue.newMap(
                                                          new __compactRuntime.StateMap()
                                                        ).encode() } },
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
                                                                                                                    value: { value: _descriptor_22.toValue(0n),
                                                                                                                             alignment: _descriptor_22.alignment() } }] } },
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
                                                         value: { value: _descriptor_22.toValue(1n),
                                                                  alignment: _descriptor_22.alignment() } }] } },
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
                                                                                                     value: { value: _descriptor_22.toValue(0n),
                                                                                                              alignment: _descriptor_22.alignment() } }] } },
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
                                                         value: { value: _descriptor_22.toValue(0n),
                                                                  alignment: _descriptor_22.alignment() } }] } },
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
                                                         value: { value: _descriptor_22.toValue(2n),
                                                                  alignment: _descriptor_22.alignment() } }] } },
                                       { push: { storage: false,
                                                 value: __compactRuntime.StateValue.newCell({ value: _descriptor_0.toValue(tmp_1),
                                                                                              alignment: _descriptor_0.alignment() }).encode() } },
                                       { push: { storage: false,
                                                 value: __compactRuntime.StateValue.newNull().encode() } },
                                       { ins: { cached: true, n: 2 } },
                                       { swap: { n: 0 } }]);
    if (!recipient_0.is_left
        &&
        this._equal_0(recipient_0.right.bytes, selfAddr_0.bytes))
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
                                                           value: { value: _descriptor_22.toValue(1n),
                                                                    alignment: _descriptor_22.alignment() } }] } },
                                         { push: { storage: false,
                                                   value: __compactRuntime.StateValue.newCell({ value: _descriptor_0.toValue(tmp_2),
                                                                                                alignment: _descriptor_0.alignment() }).encode() } },
                                         { push: { storage: false,
                                                   value: __compactRuntime.StateValue.newNull().encode() } },
                                         { ins: { cached: true, n: 2 } },
                                         { swap: { n: 0 } }]);
    }
    if (this._equal_1(change_0, 0n)) {
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
                                                           value: { value: _descriptor_22.toValue(2n),
                                                                    alignment: _descriptor_22.alignment() } }] } },
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
                                                           value: { value: _descriptor_22.toValue(1n),
                                                                    alignment: _descriptor_22.alignment() } }] } },
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
    return this._persistentHash_3({ domain_sep:
                                      new Uint8Array([109, 105, 100, 110, 105, 103, 104, 116, 58, 122, 115, 119, 97, 112, 45, 99, 99, 91, 118, 49, 93]),
                                    info: coin_0,
                                    dataType: recipient_0.is_left,
                                    data:
                                      recipient_0.is_left ?
                                      recipient_0.left.bytes :
                                      recipient_0.right.bytes });
  }
  _coinNullifier_0(coin_0, addr_0) {
    return this._persistentHash_3({ domain_sep:
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
                                                                                        value: { value: _descriptor_22.toValue(2n),
                                                                                                 alignment: _descriptor_22.alignment() } }] } },
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
    const result_0 = __compactRuntime.transientHash(_descriptor_20, value_0);
    return result_0;
  }
  _persistentHash_0(value_0) {
    const result_0 = __compactRuntime.persistentHash(_descriptor_18, value_0);
    return result_0;
  }
  _persistentHash_1(value_0) {
    const result_0 = __compactRuntime.persistentHash(_descriptor_19, value_0);
    return result_0;
  }
  _persistentHash_2(value_0) {
    const result_0 = __compactRuntime.persistentHash(_descriptor_15, value_0);
    return result_0;
  }
  _persistentHash_3(value_0) {
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
  _deriveEscrowCoinCommitment_0(nonce_0, color_0, value_0) {
    return this._persistentHash_0([new Uint8Array([108, 117, 109, 97, 112, 97, 121, 58, 101, 115, 99, 114, 111, 119, 45, 99, 111, 105, 110, 58, 118, 49, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0]),
                                   nonce_0,
                                   color_0,
                                   value_0]);
  }
  _deriveGiftCardCommitment_0(giftCardId_0,
                              amount_0,
                              tokenId_0,
                              giftSecret_0,
                              randomness_0,
                              expiry_0)
  {
    return this._persistentHash_1([new Uint8Array([108, 117, 109, 97, 112, 97, 121, 58, 103, 105, 102, 116, 45, 99, 97, 114, 100, 45, 99, 111, 109, 109, 105, 116, 109, 101, 110, 116, 58, 118, 49, 0]),
                                   1n,
                                   giftCardId_0,
                                   amount_0,
                                   tokenId_0,
                                   giftSecret_0,
                                   randomness_0,
                                   expiry_0]);
  }
  _deriveGiftCardIssuerAuthorization_0(giftCardId_0, issuerSecret_0) {
    return this._persistentHash_2([new Uint8Array([108, 117, 109, 97, 112, 97, 121, 58, 103, 105, 102, 116, 45, 99, 97, 114, 100, 45, 105, 115, 115, 117, 101, 114, 58, 118, 49, 0, 0, 0, 0, 0]),
                                   giftCardId_0,
                                   issuerSecret_0]);
  }
  _deriveGiftCardRedemptionNullifier_0(giftCardId_0, giftSecret_0) {
    return this._persistentHash_2([new Uint8Array([108, 117, 109, 97, 112, 97, 121, 58, 103, 105, 102, 116, 45, 99, 97, 114, 100, 45, 114, 101, 100, 101, 101, 109, 58, 118, 49, 0, 0, 0, 0, 0]),
                                   giftCardId_0,
                                   giftSecret_0]);
  }
  _deriveGiftCardReclaimNullifier_0(giftCardId_0, issuerSecret_0) {
    return this._persistentHash_2([new Uint8Array([108, 117, 109, 97, 112, 97, 121, 58, 103, 105, 102, 116, 45, 99, 97, 114, 100, 45, 114, 101, 99, 108, 97, 105, 109, 58, 118, 49, 0, 0, 0, 0]),
                                   giftCardId_0,
                                   issuerSecret_0]);
  }
  _createGiftCard_0(context,
                    partialProofData,
                    giftCardId_0,
                    amount_0,
                    tokenId_0,
                    giftSecret_0,
                    giftRandomness_0,
                    issuerAuthorizationCommitment_0,
                    expiry_0,
                    coin_0)
  {
    __compactRuntime.assert(!this._equal_2(giftCardId_0, new Uint8Array(32)),
                            'gift card id is required');
    __compactRuntime.assert(!_descriptor_1.fromValue(__compactRuntime.queryLedgerState(context,
                                                                                       partialProofData,
                                                                                       [
                                                                                        { dup: { n: 0 } },
                                                                                        { idx: { cached: false,
                                                                                                 pushPath: false,
                                                                                                 path: [
                                                                                                        { tag: 'value',
                                                                                                          value: { value: _descriptor_22.toValue(0n),
                                                                                                                   alignment: _descriptor_22.alignment() } }] } },
                                                                                        { push: { storage: false,
                                                                                                  value: __compactRuntime.StateValue.newCell({ value: _descriptor_0.toValue(giftCardId_0),
                                                                                                                                               alignment: _descriptor_0.alignment() }).encode() } },
                                                                                        'member',
                                                                                        { popeq: { cached: true,
                                                                                                   result: undefined } }]).value),
                            'gift card already exists');
    __compactRuntime.assert(amount_0 > 0n, 'gift card amount must be positive');
    __compactRuntime.assert(this._blockTimeLt_0(context,
                                                partialProofData,
                                                expiry_0),
                            'expiry must be in the future');
    __compactRuntime.assert(!this._equal_3(issuerAuthorizationCommitment_0,
                                           new Uint8Array(32)),
                            'gift card issuer authorization is required');
    __compactRuntime.assert(this._equal_4(coin_0.value, amount_0),
                            'wrong gift card amount');
    __compactRuntime.assert(this._equal_5(coin_0.color, tokenId_0),
                            'wrong gift card token');
    const commitment_0 = this._deriveGiftCardCommitment_0(giftCardId_0,
                                                          amount_0,
                                                          tokenId_0,
                                                          giftSecret_0,
                                                          giftRandomness_0,
                                                          expiry_0);
    this._receiveShielded_0(context, partialProofData, coin_0);
    __compactRuntime.queryLedgerState(context,
                                      partialProofData,
                                      [
                                       { idx: { cached: false,
                                                pushPath: true,
                                                path: [
                                                       { tag: 'value',
                                                         value: { value: _descriptor_22.toValue(0n),
                                                                  alignment: _descriptor_22.alignment() } }] } },
                                       { push: { storage: false,
                                                 value: __compactRuntime.StateValue.newCell({ value: _descriptor_0.toValue(giftCardId_0),
                                                                                              alignment: _descriptor_0.alignment() }).encode() } },
                                       { push: { storage: true,
                                                 value: __compactRuntime.StateValue.newNull().encode() } },
                                       { ins: { cached: false, n: 1 } },
                                       { ins: { cached: true, n: 1 } }]);
    const tmp_0 = { commitmentVersion: 1n,
                    commitment: commitment_0,
                    issuerAuthorization: issuerAuthorizationCommitment_0,
                    expiry: expiry_0,
                    escrowCoinCommitment:
                      this._deriveEscrowCoinCommitment_0(coin_0.nonce,
                                                         coin_0.color,
                                                         coin_0.value),
                    redemptionNullifier: new Uint8Array(32),
                    status: 0 };
    __compactRuntime.queryLedgerState(context,
                                      partialProofData,
                                      [
                                       { idx: { cached: false,
                                                pushPath: true,
                                                path: [
                                                       { tag: 'value',
                                                         value: { value: _descriptor_22.toValue(1n),
                                                                  alignment: _descriptor_22.alignment() } }] } },
                                       { push: { storage: false,
                                                 value: __compactRuntime.StateValue.newCell({ value: _descriptor_0.toValue(giftCardId_0),
                                                                                              alignment: _descriptor_0.alignment() }).encode() } },
                                       { push: { storage: true,
                                                 value: __compactRuntime.StateValue.newCell({ value: _descriptor_5.toValue(tmp_0),
                                                                                              alignment: _descriptor_5.alignment() }).encode() } },
                                       { ins: { cached: false, n: 1 } },
                                       { ins: { cached: true, n: 1 } }]);
    return [];
  }
  _redeemGiftCard_0(context,
                    partialProofData,
                    giftCardId_0,
                    amount_0,
                    tokenId_0,
                    giftSecret_0,
                    giftRandomness_0,
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
                                                                                                         value: { value: _descriptor_22.toValue(0n),
                                                                                                                  alignment: _descriptor_22.alignment() } }] } },
                                                                                       { push: { storage: false,
                                                                                                 value: __compactRuntime.StateValue.newCell({ value: _descriptor_0.toValue(giftCardId_0),
                                                                                                                                              alignment: _descriptor_0.alignment() }).encode() } },
                                                                                       'member',
                                                                                       { popeq: { cached: true,
                                                                                                  result: undefined } }]).value),
                            'gift card does not exist');
    const giftCard_0 = _descriptor_5.fromValue(__compactRuntime.queryLedgerState(context,
                                                                                 partialProofData,
                                                                                 [
                                                                                  { dup: { n: 0 } },
                                                                                  { idx: { cached: false,
                                                                                           pushPath: false,
                                                                                           path: [
                                                                                                  { tag: 'value',
                                                                                                    value: { value: _descriptor_22.toValue(1n),
                                                                                                             alignment: _descriptor_22.alignment() } }] } },
                                                                                  { idx: { cached: false,
                                                                                           pushPath: false,
                                                                                           path: [
                                                                                                  { tag: 'value',
                                                                                                    value: { value: _descriptor_0.toValue(giftCardId_0),
                                                                                                             alignment: _descriptor_0.alignment() } }] } },
                                                                                  { popeq: { cached: false,
                                                                                             result: undefined } }]).value);
    __compactRuntime.assert(giftCard_0.status === 0, 'gift card is not open');
    __compactRuntime.assert(this._blockTimeLt_0(context,
                                                partialProofData,
                                                giftCard_0.expiry),
                            'gift card has expired');
    __compactRuntime.assert(this._equal_6(this._deriveGiftCardCommitment_0(giftCardId_0,
                                                                           amount_0,
                                                                           tokenId_0,
                                                                           giftSecret_0,
                                                                           giftRandomness_0,
                                                                           giftCard_0.expiry),
                                          giftCard_0.commitment),
                            'invalid gift card opening');
    __compactRuntime.assert(amount_0 > 0n, 'gift card amount must be positive');
    __compactRuntime.assert(this._equal_7(escrowCoin_0.value, amount_0),
                            'wrong gift card escrow amount');
    __compactRuntime.assert(this._equal_8(escrowCoin_0.color, tokenId_0),
                            'wrong gift card escrow token');
    __compactRuntime.assert(this._equal_9(this._deriveEscrowCoinCommitment_0(escrowCoin_0.nonce,
                                                                             escrowCoin_0.color,
                                                                             escrowCoin_0.value),
                                          giftCard_0.escrowCoinCommitment),
                            'wrong gift card escrow coin');
    const nullifier_0 = this._deriveGiftCardRedemptionNullifier_0(giftCardId_0,
                                                                  giftSecret_0);
    __compactRuntime.assert(!_descriptor_1.fromValue(__compactRuntime.queryLedgerState(context,
                                                                                       partialProofData,
                                                                                       [
                                                                                        { dup: { n: 0 } },
                                                                                        { idx: { cached: false,
                                                                                                 pushPath: false,
                                                                                                 path: [
                                                                                                        { tag: 'value',
                                                                                                          value: { value: _descriptor_22.toValue(2n),
                                                                                                                   alignment: _descriptor_22.alignment() } }] } },
                                                                                        { push: { storage: false,
                                                                                                  value: __compactRuntime.StateValue.newCell({ value: _descriptor_0.toValue(nullifier_0),
                                                                                                                                               alignment: _descriptor_0.alignment() }).encode() } },
                                                                                        'member',
                                                                                        { popeq: { cached: true,
                                                                                                   result: undefined } }]).value),
                            'gift card replay');
    __compactRuntime.queryLedgerState(context,
                                      partialProofData,
                                      [
                                       { idx: { cached: false,
                                                pushPath: true,
                                                path: [
                                                       { tag: 'value',
                                                         value: { value: _descriptor_22.toValue(2n),
                                                                  alignment: _descriptor_22.alignment() } }] } },
                                       { push: { storage: false,
                                                 value: __compactRuntime.StateValue.newCell({ value: _descriptor_0.toValue(nullifier_0),
                                                                                              alignment: _descriptor_0.alignment() }).encode() } },
                                       { push: { storage: true,
                                                 value: __compactRuntime.StateValue.newNull().encode() } },
                                       { ins: { cached: false, n: 1 } },
                                       { ins: { cached: true, n: 1 } }]);
    const tmp_0 = { commitmentVersion: giftCard_0.commitmentVersion,
                    commitment: giftCard_0.commitment,
                    issuerAuthorization: giftCard_0.issuerAuthorization,
                    expiry: giftCard_0.expiry,
                    escrowCoinCommitment: giftCard_0.escrowCoinCommitment,
                    redemptionNullifier: nullifier_0,
                    status: 1 };
    __compactRuntime.queryLedgerState(context,
                                      partialProofData,
                                      [
                                       { idx: { cached: false,
                                                pushPath: true,
                                                path: [
                                                       { tag: 'value',
                                                         value: { value: _descriptor_22.toValue(1n),
                                                                  alignment: _descriptor_22.alignment() } }] } },
                                       { push: { storage: false,
                                                 value: __compactRuntime.StateValue.newCell({ value: _descriptor_0.toValue(giftCardId_0),
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
  _reclaimExpiredGiftCard_0(context,
                            partialProofData,
                            giftCardId_0,
                            issuerSecret_0,
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
                                                                                                         value: { value: _descriptor_22.toValue(0n),
                                                                                                                  alignment: _descriptor_22.alignment() } }] } },
                                                                                       { push: { storage: false,
                                                                                                 value: __compactRuntime.StateValue.newCell({ value: _descriptor_0.toValue(giftCardId_0),
                                                                                                                                              alignment: _descriptor_0.alignment() }).encode() } },
                                                                                       'member',
                                                                                       { popeq: { cached: true,
                                                                                                  result: undefined } }]).value),
                            'gift card does not exist');
    const giftCard_0 = _descriptor_5.fromValue(__compactRuntime.queryLedgerState(context,
                                                                                 partialProofData,
                                                                                 [
                                                                                  { dup: { n: 0 } },
                                                                                  { idx: { cached: false,
                                                                                           pushPath: false,
                                                                                           path: [
                                                                                                  { tag: 'value',
                                                                                                    value: { value: _descriptor_22.toValue(1n),
                                                                                                             alignment: _descriptor_22.alignment() } }] } },
                                                                                  { idx: { cached: false,
                                                                                           pushPath: false,
                                                                                           path: [
                                                                                                  { tag: 'value',
                                                                                                    value: { value: _descriptor_0.toValue(giftCardId_0),
                                                                                                             alignment: _descriptor_0.alignment() } }] } },
                                                                                  { popeq: { cached: false,
                                                                                             result: undefined } }]).value);
    __compactRuntime.assert(giftCard_0.status === 0, 'gift card is not open');
    __compactRuntime.assert(this._blockTimeGte_0(context,
                                                 partialProofData,
                                                 giftCard_0.expiry),
                            'gift card has not expired');
    __compactRuntime.assert(this._equal_10(this._deriveGiftCardIssuerAuthorization_0(giftCardId_0,
                                                                                     issuerSecret_0),
                                           giftCard_0.issuerAuthorization),
                            'unauthorized gift card reclaim');
    __compactRuntime.assert(this._equal_11(this._deriveEscrowCoinCommitment_0(escrowCoin_0.nonce,
                                                                              escrowCoin_0.color,
                                                                              escrowCoin_0.value),
                                           giftCard_0.escrowCoinCommitment),
                            'wrong gift card escrow coin');
    const nullifier_0 = this._deriveGiftCardReclaimNullifier_0(giftCardId_0,
                                                               issuerSecret_0);
    __compactRuntime.assert(!_descriptor_1.fromValue(__compactRuntime.queryLedgerState(context,
                                                                                       partialProofData,
                                                                                       [
                                                                                        { dup: { n: 0 } },
                                                                                        { idx: { cached: false,
                                                                                                 pushPath: false,
                                                                                                 path: [
                                                                                                        { tag: 'value',
                                                                                                          value: { value: _descriptor_22.toValue(2n),
                                                                                                                   alignment: _descriptor_22.alignment() } }] } },
                                                                                        { push: { storage: false,
                                                                                                  value: __compactRuntime.StateValue.newCell({ value: _descriptor_0.toValue(nullifier_0),
                                                                                                                                               alignment: _descriptor_0.alignment() }).encode() } },
                                                                                        'member',
                                                                                        { popeq: { cached: true,
                                                                                                   result: undefined } }]).value),
                            'gift card reclaim replay');
    __compactRuntime.queryLedgerState(context,
                                      partialProofData,
                                      [
                                       { idx: { cached: false,
                                                pushPath: true,
                                                path: [
                                                       { tag: 'value',
                                                         value: { value: _descriptor_22.toValue(2n),
                                                                  alignment: _descriptor_22.alignment() } }] } },
                                       { push: { storage: false,
                                                 value: __compactRuntime.StateValue.newCell({ value: _descriptor_0.toValue(nullifier_0),
                                                                                              alignment: _descriptor_0.alignment() }).encode() } },
                                       { push: { storage: true,
                                                 value: __compactRuntime.StateValue.newNull().encode() } },
                                       { ins: { cached: false, n: 1 } },
                                       { ins: { cached: true, n: 1 } }]);
    const tmp_0 = { commitmentVersion: giftCard_0.commitmentVersion,
                    commitment: giftCard_0.commitment,
                    issuerAuthorization: giftCard_0.issuerAuthorization,
                    expiry: giftCard_0.expiry,
                    escrowCoinCommitment: giftCard_0.escrowCoinCommitment,
                    redemptionNullifier: nullifier_0,
                    status: 2 };
    __compactRuntime.queryLedgerState(context,
                                      partialProofData,
                                      [
                                       { idx: { cached: false,
                                                pushPath: true,
                                                path: [
                                                       { tag: 'value',
                                                         value: { value: _descriptor_22.toValue(1n),
                                                                  alignment: _descriptor_22.alignment() } }] } },
                                       { push: { storage: false,
                                                 value: __compactRuntime.StateValue.newCell({ value: _descriptor_0.toValue(giftCardId_0),
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
  _equal_0(x0, y0) {
    if (!x0.every((x, i) => y0[i] === x)) { return false; }
    return true;
  }
  _equal_1(x0, y0) {
    if (x0 !== y0) { return false; }
    return true;
  }
  _equal_2(x0, y0) {
    if (!x0.every((x, i) => y0[i] === x)) { return false; }
    return true;
  }
  _equal_3(x0, y0) {
    if (!x0.every((x, i) => y0[i] === x)) { return false; }
    return true;
  }
  _equal_4(x0, y0) {
    if (x0 !== y0) { return false; }
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
    giftCardIds: {
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
                                                                                            value: { value: _descriptor_22.toValue(0n),
                                                                                                     alignment: _descriptor_22.alignment() } }] } },
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
                                                                                            value: { value: _descriptor_22.toValue(0n),
                                                                                                     alignment: _descriptor_22.alignment() } }] } },
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
                                     'lumapay-gift-cards.compact line 23 char 1',
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
                                                                                            value: { value: _descriptor_22.toValue(0n),
                                                                                                     alignment: _descriptor_22.alignment() } }] } },
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
    giftCards: {
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
                                                                                            value: { value: _descriptor_22.toValue(1n),
                                                                                                     alignment: _descriptor_22.alignment() } }] } },
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
                                                                                            value: { value: _descriptor_22.toValue(1n),
                                                                                                     alignment: _descriptor_22.alignment() } }] } },
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
                                     'lumapay-gift-cards.compact line 24 char 1',
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
                                                                                            value: { value: _descriptor_22.toValue(1n),
                                                                                                     alignment: _descriptor_22.alignment() } }] } },
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
                                     'lumapay-gift-cards.compact line 24 char 1',
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
                                                                                            value: { value: _descriptor_22.toValue(1n),
                                                                                                     alignment: _descriptor_22.alignment() } }] } },
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
    giftCardNullifiers: {
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
                                                                                            value: { value: _descriptor_22.toValue(2n),
                                                                                                     alignment: _descriptor_22.alignment() } }] } },
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
                                                                                            value: { value: _descriptor_22.toValue(2n),
                                                                                                     alignment: _descriptor_22.alignment() } }] } },
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
                                     'lumapay-gift-cards.compact line 25 char 1',
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
                                                                                            value: { value: _descriptor_22.toValue(2n),
                                                                                                     alignment: _descriptor_22.alignment() } }] } },
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
    }
  };
}
const _emptyContext = {
  currentQueryContext: new __compactRuntime.QueryContext(new __compactRuntime.ContractState().data, __compactRuntime.dummyContractAddress())
};
const _dummyContract = new Contract({ });
export const pureCircuits = {
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
                                 'lumapay-gift-cards.compact line 27 char 1',
                                 'Bytes<32>',
                                 nonce_0)
    }
    if (!(color_0.buffer instanceof ArrayBuffer && color_0.BYTES_PER_ELEMENT === 1 && color_0.length === 32)) {
      __compactRuntime.typeError('deriveEscrowCoinCommitment',
                                 'argument 2',
                                 'lumapay-gift-cards.compact line 27 char 1',
                                 'Bytes<32>',
                                 color_0)
    }
    if (!(typeof(value_0) === 'bigint' && value_0 >= 0n && value_0 <= 340282366920938463463374607431768211455n)) {
      __compactRuntime.typeError('deriveEscrowCoinCommitment',
                                 'argument 3',
                                 'lumapay-gift-cards.compact line 27 char 1',
                                 'Uint<0..340282366920938463463374607431768211456>',
                                 value_0)
    }
    return _dummyContract._deriveEscrowCoinCommitment_0(nonce_0,
                                                        color_0,
                                                        value_0);
  },
  deriveGiftCardCommitment: (...args_0) => {
    if (args_0.length !== 6) {
      throw new __compactRuntime.CompactError(`deriveGiftCardCommitment: expected 6 arguments (as invoked from Typescript), received ${args_0.length}`);
    }
    const giftCardId_0 = args_0[0];
    const amount_0 = args_0[1];
    const tokenId_0 = args_0[2];
    const giftSecret_0 = args_0[3];
    const randomness_0 = args_0[4];
    const expiry_0 = args_0[5];
    if (!(giftCardId_0.buffer instanceof ArrayBuffer && giftCardId_0.BYTES_PER_ELEMENT === 1 && giftCardId_0.length === 32)) {
      __compactRuntime.typeError('deriveGiftCardCommitment',
                                 'argument 1',
                                 'lumapay-gift-cards.compact line 40 char 1',
                                 'Bytes<32>',
                                 giftCardId_0)
    }
    if (!(typeof(amount_0) === 'bigint' && amount_0 >= 0n && amount_0 <= 340282366920938463463374607431768211455n)) {
      __compactRuntime.typeError('deriveGiftCardCommitment',
                                 'argument 2',
                                 'lumapay-gift-cards.compact line 40 char 1',
                                 'Uint<0..340282366920938463463374607431768211456>',
                                 amount_0)
    }
    if (!(tokenId_0.buffer instanceof ArrayBuffer && tokenId_0.BYTES_PER_ELEMENT === 1 && tokenId_0.length === 32)) {
      __compactRuntime.typeError('deriveGiftCardCommitment',
                                 'argument 3',
                                 'lumapay-gift-cards.compact line 40 char 1',
                                 'Bytes<32>',
                                 tokenId_0)
    }
    if (!(giftSecret_0.buffer instanceof ArrayBuffer && giftSecret_0.BYTES_PER_ELEMENT === 1 && giftSecret_0.length === 32)) {
      __compactRuntime.typeError('deriveGiftCardCommitment',
                                 'argument 4',
                                 'lumapay-gift-cards.compact line 40 char 1',
                                 'Bytes<32>',
                                 giftSecret_0)
    }
    if (!(randomness_0.buffer instanceof ArrayBuffer && randomness_0.BYTES_PER_ELEMENT === 1 && randomness_0.length === 32)) {
      __compactRuntime.typeError('deriveGiftCardCommitment',
                                 'argument 5',
                                 'lumapay-gift-cards.compact line 40 char 1',
                                 'Bytes<32>',
                                 randomness_0)
    }
    if (!(typeof(expiry_0) === 'bigint' && expiry_0 >= 0n && expiry_0 <= 18446744073709551615n)) {
      __compactRuntime.typeError('deriveGiftCardCommitment',
                                 'argument 6',
                                 'lumapay-gift-cards.compact line 40 char 1',
                                 'Uint<0..18446744073709551616>',
                                 expiry_0)
    }
    return _dummyContract._deriveGiftCardCommitment_0(giftCardId_0,
                                                      amount_0,
                                                      tokenId_0,
                                                      giftSecret_0,
                                                      randomness_0,
                                                      expiry_0);
  },
  deriveGiftCardIssuerAuthorization: (...args_0) => {
    if (args_0.length !== 2) {
      throw new __compactRuntime.CompactError(`deriveGiftCardIssuerAuthorization: expected 2 arguments (as invoked from Typescript), received ${args_0.length}`);
    }
    const giftCardId_0 = args_0[0];
    const issuerSecret_0 = args_0[1];
    if (!(giftCardId_0.buffer instanceof ArrayBuffer && giftCardId_0.BYTES_PER_ELEMENT === 1 && giftCardId_0.length === 32)) {
      __compactRuntime.typeError('deriveGiftCardIssuerAuthorization',
                                 'argument 1',
                                 'lumapay-gift-cards.compact line 63 char 1',
                                 'Bytes<32>',
                                 giftCardId_0)
    }
    if (!(issuerSecret_0.buffer instanceof ArrayBuffer && issuerSecret_0.BYTES_PER_ELEMENT === 1 && issuerSecret_0.length === 32)) {
      __compactRuntime.typeError('deriveGiftCardIssuerAuthorization',
                                 'argument 2',
                                 'lumapay-gift-cards.compact line 63 char 1',
                                 'Bytes<32>',
                                 issuerSecret_0)
    }
    return _dummyContract._deriveGiftCardIssuerAuthorization_0(giftCardId_0,
                                                               issuerSecret_0);
  },
  deriveGiftCardRedemptionNullifier: (...args_0) => {
    if (args_0.length !== 2) {
      throw new __compactRuntime.CompactError(`deriveGiftCardRedemptionNullifier: expected 2 arguments (as invoked from Typescript), received ${args_0.length}`);
    }
    const giftCardId_0 = args_0[0];
    const giftSecret_0 = args_0[1];
    if (!(giftCardId_0.buffer instanceof ArrayBuffer && giftCardId_0.BYTES_PER_ELEMENT === 1 && giftCardId_0.length === 32)) {
      __compactRuntime.typeError('deriveGiftCardRedemptionNullifier',
                                 'argument 1',
                                 'lumapay-gift-cards.compact line 74 char 1',
                                 'Bytes<32>',
                                 giftCardId_0)
    }
    if (!(giftSecret_0.buffer instanceof ArrayBuffer && giftSecret_0.BYTES_PER_ELEMENT === 1 && giftSecret_0.length === 32)) {
      __compactRuntime.typeError('deriveGiftCardRedemptionNullifier',
                                 'argument 2',
                                 'lumapay-gift-cards.compact line 74 char 1',
                                 'Bytes<32>',
                                 giftSecret_0)
    }
    return _dummyContract._deriveGiftCardRedemptionNullifier_0(giftCardId_0,
                                                               giftSecret_0);
  },
  deriveGiftCardReclaimNullifier: (...args_0) => {
    if (args_0.length !== 2) {
      throw new __compactRuntime.CompactError(`deriveGiftCardReclaimNullifier: expected 2 arguments (as invoked from Typescript), received ${args_0.length}`);
    }
    const giftCardId_0 = args_0[0];
    const issuerSecret_0 = args_0[1];
    if (!(giftCardId_0.buffer instanceof ArrayBuffer && giftCardId_0.BYTES_PER_ELEMENT === 1 && giftCardId_0.length === 32)) {
      __compactRuntime.typeError('deriveGiftCardReclaimNullifier',
                                 'argument 1',
                                 'lumapay-gift-cards.compact line 85 char 1',
                                 'Bytes<32>',
                                 giftCardId_0)
    }
    if (!(issuerSecret_0.buffer instanceof ArrayBuffer && issuerSecret_0.BYTES_PER_ELEMENT === 1 && issuerSecret_0.length === 32)) {
      __compactRuntime.typeError('deriveGiftCardReclaimNullifier',
                                 'argument 2',
                                 'lumapay-gift-cards.compact line 85 char 1',
                                 'Bytes<32>',
                                 issuerSecret_0)
    }
    return _dummyContract._deriveGiftCardReclaimNullifier_0(giftCardId_0,
                                                            issuerSecret_0);
  }
};
export const contractReferenceLocations =
  { tag: 'publicLedgerArray', indices: { } };
//# sourceMappingURL=index.js.map
