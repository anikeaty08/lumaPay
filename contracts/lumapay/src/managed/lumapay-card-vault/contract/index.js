import * as __compactRuntime from '@midnight-ntwrk/compact-runtime';
__compactRuntime.checkRuntimeVersion('0.16.0');

export var CardVaultStatus;
(function (CardVaultStatus) {
  CardVaultStatus[CardVaultStatus['ACTIVE'] = 0] = 'ACTIVE';
  CardVaultStatus[CardVaultStatus['CLOSED'] = 1] = 'CLOSED';
})(CardVaultStatus || (CardVaultStatus = {}));

const _descriptor_0 = new __compactRuntime.CompactTypeBytes(32);

const _descriptor_1 = __compactRuntime.CompactTypeBoolean;

const _descriptor_2 = new __compactRuntime.CompactTypeUnsignedInteger(340282366920938463463374607431768211455n, 16);

const _descriptor_3 = new __compactRuntime.CompactTypeUnsignedInteger(18446744073709551615n, 8);

class _CardSpendPublicState_0 {
  alignment() {
    return _descriptor_0.alignment().concat(_descriptor_0.alignment().concat(_descriptor_0.alignment().concat(_descriptor_2.alignment().concat(_descriptor_3.alignment()))));
  }
  fromValue(value_0) {
    return {
      cardId: _descriptor_0.fromValue(value_0),
      paymentId: _descriptor_0.fromValue(value_0),
      tokenId: _descriptor_0.fromValue(value_0),
      amount: _descriptor_2.fromValue(value_0),
      epochDay: _descriptor_3.fromValue(value_0)
    }
  }
  toValue(value_0) {
    return _descriptor_0.toValue(value_0.cardId).concat(_descriptor_0.toValue(value_0.paymentId).concat(_descriptor_0.toValue(value_0.tokenId).concat(_descriptor_2.toValue(value_0.amount).concat(_descriptor_3.toValue(value_0.epochDay)))));
  }
}

const _descriptor_4 = new _CardSpendPublicState_0();

const _descriptor_5 = new __compactRuntime.CompactTypeUnsignedInteger(65535n, 2);

const _descriptor_6 = new __compactRuntime.CompactTypeEnum(1, 1);

class _CardVaultPublicState_0 {
  alignment() {
    return _descriptor_5.alignment().concat(_descriptor_0.alignment().concat(_descriptor_0.alignment().concat(_descriptor_0.alignment().concat(_descriptor_0.alignment().concat(_descriptor_2.alignment().concat(_descriptor_3.alignment().concat(_descriptor_2.alignment().concat(_descriptor_6.alignment()))))))));
  }
  fromValue(value_0) {
    return {
      commitmentVersion: _descriptor_5.fromValue(value_0),
      commitment: _descriptor_0.fromValue(value_0),
      ownerAuthorization: _descriptor_0.fromValue(value_0),
      cardNumberHash: _descriptor_0.fromValue(value_0),
      metadataDigest: _descriptor_0.fromValue(value_0),
      dailyLimit: _descriptor_2.fromValue(value_0),
      spentEpochDay: _descriptor_3.fromValue(value_0),
      spentAmount: _descriptor_2.fromValue(value_0),
      status: _descriptor_6.fromValue(value_0)
    }
  }
  toValue(value_0) {
    return _descriptor_5.toValue(value_0.commitmentVersion).concat(_descriptor_0.toValue(value_0.commitment).concat(_descriptor_0.toValue(value_0.ownerAuthorization).concat(_descriptor_0.toValue(value_0.cardNumberHash).concat(_descriptor_0.toValue(value_0.metadataDigest).concat(_descriptor_2.toValue(value_0.dailyLimit).concat(_descriptor_3.toValue(value_0.spentEpochDay).concat(_descriptor_2.toValue(value_0.spentAmount).concat(_descriptor_6.toValue(value_0.status)))))))));
  }
}

const _descriptor_7 = new _CardVaultPublicState_0();

class _tuple_0 {
  alignment() {
    return _descriptor_0.alignment().concat(_descriptor_5.alignment().concat(_descriptor_0.alignment().concat(_descriptor_0.alignment().concat(_descriptor_0.alignment().concat(_descriptor_0.alignment().concat(_descriptor_2.alignment().concat(_descriptor_0.alignment().concat(_descriptor_0.alignment()))))))));
  }
  fromValue(value_0) {
    return [
      _descriptor_0.fromValue(value_0),
      _descriptor_5.fromValue(value_0),
      _descriptor_0.fromValue(value_0),
      _descriptor_0.fromValue(value_0),
      _descriptor_0.fromValue(value_0),
      _descriptor_0.fromValue(value_0),
      _descriptor_2.fromValue(value_0),
      _descriptor_0.fromValue(value_0),
      _descriptor_0.fromValue(value_0)
    ]
  }
  toValue(value_0) {
    return _descriptor_0.toValue(value_0[0]).concat(_descriptor_5.toValue(value_0[1]).concat(_descriptor_0.toValue(value_0[2]).concat(_descriptor_0.toValue(value_0[3]).concat(_descriptor_0.toValue(value_0[4]).concat(_descriptor_0.toValue(value_0[5]).concat(_descriptor_2.toValue(value_0[6]).concat(_descriptor_0.toValue(value_0[7]).concat(_descriptor_0.toValue(value_0[8])))))))));
  }
}

const _descriptor_8 = new _tuple_0();

class _tuple_1 {
  alignment() {
    return _descriptor_0.alignment().concat(_descriptor_0.alignment().concat(_descriptor_0.alignment().concat(_descriptor_0.alignment())));
  }
  fromValue(value_0) {
    return [
      _descriptor_0.fromValue(value_0),
      _descriptor_0.fromValue(value_0),
      _descriptor_0.fromValue(value_0),
      _descriptor_0.fromValue(value_0)
    ]
  }
  toValue(value_0) {
    return _descriptor_0.toValue(value_0[0]).concat(_descriptor_0.toValue(value_0[1]).concat(_descriptor_0.toValue(value_0[2]).concat(_descriptor_0.toValue(value_0[3]))));
  }
}

const _descriptor_9 = new _tuple_1();

class _tuple_2 {
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

const _descriptor_10 = new _tuple_2();

class _Either_0 {
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

const _descriptor_11 = new _Either_0();

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

const _descriptor_13 = new __compactRuntime.CompactTypeUnsignedInteger(255n, 1);

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
      deriveCardOwnerAuthorization(context, ...args_1) {
        return { result: pureCircuits.deriveCardOwnerAuthorization(...args_1), context };
      },
      deriveCardVaultCommitment(context, ...args_1) {
        return { result: pureCircuits.deriveCardVaultCommitment(...args_1), context };
      },
      deriveCardSpendNullifier(context, ...args_1) {
        return { result: pureCircuits.deriveCardSpendNullifier(...args_1), context };
      },
      createCardVault: (...args_1) => {
        if (args_1.length !== 7) {
          throw new __compactRuntime.CompactError(`createCardVault: expected 7 arguments (as invoked from Typescript), received ${args_1.length}`);
        }
        const contextOrig_0 = args_1[0];
        const cardId_0 = args_1[1];
        const commitment_0 = args_1[2];
        const ownerAuthorization_0 = args_1[3];
        const cardNumberHash_0 = args_1[4];
        const metadataDigest_0 = args_1[5];
        const dailyLimit_0 = args_1[6];
        if (!(typeof(contextOrig_0) === 'object' && contextOrig_0.currentQueryContext != undefined)) {
          __compactRuntime.typeError('createCardVault',
                                     'argument 1 (as invoked from Typescript)',
                                     'lumapay-card-vault.compact line 78 char 1',
                                     'CircuitContext',
                                     contextOrig_0)
        }
        if (!(cardId_0.buffer instanceof ArrayBuffer && cardId_0.BYTES_PER_ELEMENT === 1 && cardId_0.length === 32)) {
          __compactRuntime.typeError('createCardVault',
                                     'argument 1 (argument 2 as invoked from Typescript)',
                                     'lumapay-card-vault.compact line 78 char 1',
                                     'Bytes<32>',
                                     cardId_0)
        }
        if (!(commitment_0.buffer instanceof ArrayBuffer && commitment_0.BYTES_PER_ELEMENT === 1 && commitment_0.length === 32)) {
          __compactRuntime.typeError('createCardVault',
                                     'argument 2 (argument 3 as invoked from Typescript)',
                                     'lumapay-card-vault.compact line 78 char 1',
                                     'Bytes<32>',
                                     commitment_0)
        }
        if (!(ownerAuthorization_0.buffer instanceof ArrayBuffer && ownerAuthorization_0.BYTES_PER_ELEMENT === 1 && ownerAuthorization_0.length === 32)) {
          __compactRuntime.typeError('createCardVault',
                                     'argument 3 (argument 4 as invoked from Typescript)',
                                     'lumapay-card-vault.compact line 78 char 1',
                                     'Bytes<32>',
                                     ownerAuthorization_0)
        }
        if (!(cardNumberHash_0.buffer instanceof ArrayBuffer && cardNumberHash_0.BYTES_PER_ELEMENT === 1 && cardNumberHash_0.length === 32)) {
          __compactRuntime.typeError('createCardVault',
                                     'argument 4 (argument 5 as invoked from Typescript)',
                                     'lumapay-card-vault.compact line 78 char 1',
                                     'Bytes<32>',
                                     cardNumberHash_0)
        }
        if (!(metadataDigest_0.buffer instanceof ArrayBuffer && metadataDigest_0.BYTES_PER_ELEMENT === 1 && metadataDigest_0.length === 32)) {
          __compactRuntime.typeError('createCardVault',
                                     'argument 5 (argument 6 as invoked from Typescript)',
                                     'lumapay-card-vault.compact line 78 char 1',
                                     'Bytes<32>',
                                     metadataDigest_0)
        }
        if (!(typeof(dailyLimit_0) === 'bigint' && dailyLimit_0 >= 0n && dailyLimit_0 <= 340282366920938463463374607431768211455n)) {
          __compactRuntime.typeError('createCardVault',
                                     'argument 6 (argument 7 as invoked from Typescript)',
                                     'lumapay-card-vault.compact line 78 char 1',
                                     'Uint<0..340282366920938463463374607431768211456>',
                                     dailyLimit_0)
        }
        const context = { ...contextOrig_0, gasCost: __compactRuntime.emptyRunningCost() };
        const partialProofData = {
          input: {
            value: _descriptor_0.toValue(cardId_0).concat(_descriptor_0.toValue(commitment_0).concat(_descriptor_0.toValue(ownerAuthorization_0).concat(_descriptor_0.toValue(cardNumberHash_0).concat(_descriptor_0.toValue(metadataDigest_0).concat(_descriptor_2.toValue(dailyLimit_0)))))),
            alignment: _descriptor_0.alignment().concat(_descriptor_0.alignment().concat(_descriptor_0.alignment().concat(_descriptor_0.alignment().concat(_descriptor_0.alignment().concat(_descriptor_2.alignment())))))
          },
          output: undefined,
          publicTranscript: [],
          privateTranscriptOutputs: []
        };
        const result_0 = this._createCardVault_0(context,
                                                 partialProofData,
                                                 cardId_0,
                                                 commitment_0,
                                                 ownerAuthorization_0,
                                                 cardNumberHash_0,
                                                 metadataDigest_0,
                                                 dailyLimit_0);
        partialProofData.output = { value: [], alignment: [] };
        return { result: result_0, context: context, proofData: partialProofData, gasCost: context.gasCost };
      },
      updateCardMetadata: (...args_1) => {
        if (args_1.length !== 4) {
          throw new __compactRuntime.CompactError(`updateCardMetadata: expected 4 arguments (as invoked from Typescript), received ${args_1.length}`);
        }
        const contextOrig_0 = args_1[0];
        const cardId_0 = args_1[1];
        const ownerSecret_0 = args_1[2];
        const metadataDigest_0 = args_1[3];
        if (!(typeof(contextOrig_0) === 'object' && contextOrig_0.currentQueryContext != undefined)) {
          __compactRuntime.typeError('updateCardMetadata',
                                     'argument 1 (as invoked from Typescript)',
                                     'lumapay-card-vault.compact line 106 char 1',
                                     'CircuitContext',
                                     contextOrig_0)
        }
        if (!(cardId_0.buffer instanceof ArrayBuffer && cardId_0.BYTES_PER_ELEMENT === 1 && cardId_0.length === 32)) {
          __compactRuntime.typeError('updateCardMetadata',
                                     'argument 1 (argument 2 as invoked from Typescript)',
                                     'lumapay-card-vault.compact line 106 char 1',
                                     'Bytes<32>',
                                     cardId_0)
        }
        if (!(ownerSecret_0.buffer instanceof ArrayBuffer && ownerSecret_0.BYTES_PER_ELEMENT === 1 && ownerSecret_0.length === 32)) {
          __compactRuntime.typeError('updateCardMetadata',
                                     'argument 2 (argument 3 as invoked from Typescript)',
                                     'lumapay-card-vault.compact line 106 char 1',
                                     'Bytes<32>',
                                     ownerSecret_0)
        }
        if (!(metadataDigest_0.buffer instanceof ArrayBuffer && metadataDigest_0.BYTES_PER_ELEMENT === 1 && metadataDigest_0.length === 32)) {
          __compactRuntime.typeError('updateCardMetadata',
                                     'argument 3 (argument 4 as invoked from Typescript)',
                                     'lumapay-card-vault.compact line 106 char 1',
                                     'Bytes<32>',
                                     metadataDigest_0)
        }
        const context = { ...contextOrig_0, gasCost: __compactRuntime.emptyRunningCost() };
        const partialProofData = {
          input: {
            value: _descriptor_0.toValue(cardId_0).concat(_descriptor_0.toValue(ownerSecret_0).concat(_descriptor_0.toValue(metadataDigest_0))),
            alignment: _descriptor_0.alignment().concat(_descriptor_0.alignment().concat(_descriptor_0.alignment()))
          },
          output: undefined,
          publicTranscript: [],
          privateTranscriptOutputs: []
        };
        const result_0 = this._updateCardMetadata_0(context,
                                                    partialProofData,
                                                    cardId_0,
                                                    ownerSecret_0,
                                                    metadataDigest_0);
        partialProofData.output = { value: [], alignment: [] };
        return { result: result_0, context: context, proofData: partialProofData, gasCost: context.gasCost };
      },
      setCardDailyLimit: (...args_1) => {
        if (args_1.length !== 4) {
          throw new __compactRuntime.CompactError(`setCardDailyLimit: expected 4 arguments (as invoked from Typescript), received ${args_1.length}`);
        }
        const contextOrig_0 = args_1[0];
        const cardId_0 = args_1[1];
        const ownerSecret_0 = args_1[2];
        const dailyLimit_0 = args_1[3];
        if (!(typeof(contextOrig_0) === 'object' && contextOrig_0.currentQueryContext != undefined)) {
          __compactRuntime.typeError('setCardDailyLimit',
                                     'argument 1 (as invoked from Typescript)',
                                     'lumapay-card-vault.compact line 132 char 1',
                                     'CircuitContext',
                                     contextOrig_0)
        }
        if (!(cardId_0.buffer instanceof ArrayBuffer && cardId_0.BYTES_PER_ELEMENT === 1 && cardId_0.length === 32)) {
          __compactRuntime.typeError('setCardDailyLimit',
                                     'argument 1 (argument 2 as invoked from Typescript)',
                                     'lumapay-card-vault.compact line 132 char 1',
                                     'Bytes<32>',
                                     cardId_0)
        }
        if (!(ownerSecret_0.buffer instanceof ArrayBuffer && ownerSecret_0.BYTES_PER_ELEMENT === 1 && ownerSecret_0.length === 32)) {
          __compactRuntime.typeError('setCardDailyLimit',
                                     'argument 2 (argument 3 as invoked from Typescript)',
                                     'lumapay-card-vault.compact line 132 char 1',
                                     'Bytes<32>',
                                     ownerSecret_0)
        }
        if (!(typeof(dailyLimit_0) === 'bigint' && dailyLimit_0 >= 0n && dailyLimit_0 <= 340282366920938463463374607431768211455n)) {
          __compactRuntime.typeError('setCardDailyLimit',
                                     'argument 3 (argument 4 as invoked from Typescript)',
                                     'lumapay-card-vault.compact line 132 char 1',
                                     'Uint<0..340282366920938463463374607431768211456>',
                                     dailyLimit_0)
        }
        const context = { ...contextOrig_0, gasCost: __compactRuntime.emptyRunningCost() };
        const partialProofData = {
          input: {
            value: _descriptor_0.toValue(cardId_0).concat(_descriptor_0.toValue(ownerSecret_0).concat(_descriptor_2.toValue(dailyLimit_0))),
            alignment: _descriptor_0.alignment().concat(_descriptor_0.alignment().concat(_descriptor_2.alignment()))
          },
          output: undefined,
          publicTranscript: [],
          privateTranscriptOutputs: []
        };
        const result_0 = this._setCardDailyLimit_0(context,
                                                   partialProofData,
                                                   cardId_0,
                                                   ownerSecret_0,
                                                   dailyLimit_0);
        partialProofData.output = { value: [], alignment: [] };
        return { result: result_0, context: context, proofData: partialProofData, gasCost: context.gasCost };
      },
      recordCardSpend: (...args_1) => {
        if (args_1.length !== 13) {
          throw new __compactRuntime.CompactError(`recordCardSpend: expected 13 arguments (as invoked from Typescript), received ${args_1.length}`);
        }
        const contextOrig_0 = args_1[0];
        const cardId_0 = args_1[1];
        const ownerPrivateIdentity_0 = args_1[2];
        const cardNumberHash_0 = args_1[3];
        const metadataDigest_0 = args_1[4];
        const dailyLimitAtCreation_0 = args_1[5];
        const vaultNonce_0 = args_1[6];
        const vaultRandomness_0 = args_1[7];
        const paymentId_0 = args_1[8];
        const spendSecret_0 = args_1[9];
        const tokenId_0 = args_1[10];
        const amount_0 = args_1[11];
        const epochDay_0 = args_1[12];
        if (!(typeof(contextOrig_0) === 'object' && contextOrig_0.currentQueryContext != undefined)) {
          __compactRuntime.typeError('recordCardSpend',
                                     'argument 1 (as invoked from Typescript)',
                                     'lumapay-card-vault.compact line 158 char 1',
                                     'CircuitContext',
                                     contextOrig_0)
        }
        if (!(cardId_0.buffer instanceof ArrayBuffer && cardId_0.BYTES_PER_ELEMENT === 1 && cardId_0.length === 32)) {
          __compactRuntime.typeError('recordCardSpend',
                                     'argument 1 (argument 2 as invoked from Typescript)',
                                     'lumapay-card-vault.compact line 158 char 1',
                                     'Bytes<32>',
                                     cardId_0)
        }
        if (!(ownerPrivateIdentity_0.buffer instanceof ArrayBuffer && ownerPrivateIdentity_0.BYTES_PER_ELEMENT === 1 && ownerPrivateIdentity_0.length === 32)) {
          __compactRuntime.typeError('recordCardSpend',
                                     'argument 2 (argument 3 as invoked from Typescript)',
                                     'lumapay-card-vault.compact line 158 char 1',
                                     'Bytes<32>',
                                     ownerPrivateIdentity_0)
        }
        if (!(cardNumberHash_0.buffer instanceof ArrayBuffer && cardNumberHash_0.BYTES_PER_ELEMENT === 1 && cardNumberHash_0.length === 32)) {
          __compactRuntime.typeError('recordCardSpend',
                                     'argument 3 (argument 4 as invoked from Typescript)',
                                     'lumapay-card-vault.compact line 158 char 1',
                                     'Bytes<32>',
                                     cardNumberHash_0)
        }
        if (!(metadataDigest_0.buffer instanceof ArrayBuffer && metadataDigest_0.BYTES_PER_ELEMENT === 1 && metadataDigest_0.length === 32)) {
          __compactRuntime.typeError('recordCardSpend',
                                     'argument 4 (argument 5 as invoked from Typescript)',
                                     'lumapay-card-vault.compact line 158 char 1',
                                     'Bytes<32>',
                                     metadataDigest_0)
        }
        if (!(typeof(dailyLimitAtCreation_0) === 'bigint' && dailyLimitAtCreation_0 >= 0n && dailyLimitAtCreation_0 <= 340282366920938463463374607431768211455n)) {
          __compactRuntime.typeError('recordCardSpend',
                                     'argument 5 (argument 6 as invoked from Typescript)',
                                     'lumapay-card-vault.compact line 158 char 1',
                                     'Uint<0..340282366920938463463374607431768211456>',
                                     dailyLimitAtCreation_0)
        }
        if (!(vaultNonce_0.buffer instanceof ArrayBuffer && vaultNonce_0.BYTES_PER_ELEMENT === 1 && vaultNonce_0.length === 32)) {
          __compactRuntime.typeError('recordCardSpend',
                                     'argument 6 (argument 7 as invoked from Typescript)',
                                     'lumapay-card-vault.compact line 158 char 1',
                                     'Bytes<32>',
                                     vaultNonce_0)
        }
        if (!(vaultRandomness_0.buffer instanceof ArrayBuffer && vaultRandomness_0.BYTES_PER_ELEMENT === 1 && vaultRandomness_0.length === 32)) {
          __compactRuntime.typeError('recordCardSpend',
                                     'argument 7 (argument 8 as invoked from Typescript)',
                                     'lumapay-card-vault.compact line 158 char 1',
                                     'Bytes<32>',
                                     vaultRandomness_0)
        }
        if (!(paymentId_0.buffer instanceof ArrayBuffer && paymentId_0.BYTES_PER_ELEMENT === 1 && paymentId_0.length === 32)) {
          __compactRuntime.typeError('recordCardSpend',
                                     'argument 8 (argument 9 as invoked from Typescript)',
                                     'lumapay-card-vault.compact line 158 char 1',
                                     'Bytes<32>',
                                     paymentId_0)
        }
        if (!(spendSecret_0.buffer instanceof ArrayBuffer && spendSecret_0.BYTES_PER_ELEMENT === 1 && spendSecret_0.length === 32)) {
          __compactRuntime.typeError('recordCardSpend',
                                     'argument 9 (argument 10 as invoked from Typescript)',
                                     'lumapay-card-vault.compact line 158 char 1',
                                     'Bytes<32>',
                                     spendSecret_0)
        }
        if (!(tokenId_0.buffer instanceof ArrayBuffer && tokenId_0.BYTES_PER_ELEMENT === 1 && tokenId_0.length === 32)) {
          __compactRuntime.typeError('recordCardSpend',
                                     'argument 10 (argument 11 as invoked from Typescript)',
                                     'lumapay-card-vault.compact line 158 char 1',
                                     'Bytes<32>',
                                     tokenId_0)
        }
        if (!(typeof(amount_0) === 'bigint' && amount_0 >= 0n && amount_0 <= 340282366920938463463374607431768211455n)) {
          __compactRuntime.typeError('recordCardSpend',
                                     'argument 11 (argument 12 as invoked from Typescript)',
                                     'lumapay-card-vault.compact line 158 char 1',
                                     'Uint<0..340282366920938463463374607431768211456>',
                                     amount_0)
        }
        if (!(typeof(epochDay_0) === 'bigint' && epochDay_0 >= 0n && epochDay_0 <= 18446744073709551615n)) {
          __compactRuntime.typeError('recordCardSpend',
                                     'argument 12 (argument 13 as invoked from Typescript)',
                                     'lumapay-card-vault.compact line 158 char 1',
                                     'Uint<0..18446744073709551616>',
                                     epochDay_0)
        }
        const context = { ...contextOrig_0, gasCost: __compactRuntime.emptyRunningCost() };
        const partialProofData = {
          input: {
            value: _descriptor_0.toValue(cardId_0).concat(_descriptor_0.toValue(ownerPrivateIdentity_0).concat(_descriptor_0.toValue(cardNumberHash_0).concat(_descriptor_0.toValue(metadataDigest_0).concat(_descriptor_2.toValue(dailyLimitAtCreation_0).concat(_descriptor_0.toValue(vaultNonce_0).concat(_descriptor_0.toValue(vaultRandomness_0).concat(_descriptor_0.toValue(paymentId_0).concat(_descriptor_0.toValue(spendSecret_0).concat(_descriptor_0.toValue(tokenId_0).concat(_descriptor_2.toValue(amount_0).concat(_descriptor_3.toValue(epochDay_0)))))))))))),
            alignment: _descriptor_0.alignment().concat(_descriptor_0.alignment().concat(_descriptor_0.alignment().concat(_descriptor_0.alignment().concat(_descriptor_2.alignment().concat(_descriptor_0.alignment().concat(_descriptor_0.alignment().concat(_descriptor_0.alignment().concat(_descriptor_0.alignment().concat(_descriptor_0.alignment().concat(_descriptor_2.alignment().concat(_descriptor_3.alignment())))))))))))
          },
          output: undefined,
          publicTranscript: [],
          privateTranscriptOutputs: []
        };
        const result_0 = this._recordCardSpend_0(context,
                                                 partialProofData,
                                                 cardId_0,
                                                 ownerPrivateIdentity_0,
                                                 cardNumberHash_0,
                                                 metadataDigest_0,
                                                 dailyLimitAtCreation_0,
                                                 vaultNonce_0,
                                                 vaultRandomness_0,
                                                 paymentId_0,
                                                 spendSecret_0,
                                                 tokenId_0,
                                                 amount_0,
                                                 epochDay_0);
        partialProofData.output = { value: [], alignment: [] };
        return { result: result_0, context: context, proofData: partialProofData, gasCost: context.gasCost };
      },
      closeCardVault: (...args_1) => {
        if (args_1.length !== 3) {
          throw new __compactRuntime.CompactError(`closeCardVault: expected 3 arguments (as invoked from Typescript), received ${args_1.length}`);
        }
        const contextOrig_0 = args_1[0];
        const cardId_0 = args_1[1];
        const ownerSecret_0 = args_1[2];
        if (!(typeof(contextOrig_0) === 'object' && contextOrig_0.currentQueryContext != undefined)) {
          __compactRuntime.typeError('closeCardVault',
                                     'argument 1 (as invoked from Typescript)',
                                     'lumapay-card-vault.compact line 217 char 1',
                                     'CircuitContext',
                                     contextOrig_0)
        }
        if (!(cardId_0.buffer instanceof ArrayBuffer && cardId_0.BYTES_PER_ELEMENT === 1 && cardId_0.length === 32)) {
          __compactRuntime.typeError('closeCardVault',
                                     'argument 1 (argument 2 as invoked from Typescript)',
                                     'lumapay-card-vault.compact line 217 char 1',
                                     'Bytes<32>',
                                     cardId_0)
        }
        if (!(ownerSecret_0.buffer instanceof ArrayBuffer && ownerSecret_0.BYTES_PER_ELEMENT === 1 && ownerSecret_0.length === 32)) {
          __compactRuntime.typeError('closeCardVault',
                                     'argument 2 (argument 3 as invoked from Typescript)',
                                     'lumapay-card-vault.compact line 217 char 1',
                                     'Bytes<32>',
                                     ownerSecret_0)
        }
        const context = { ...contextOrig_0, gasCost: __compactRuntime.emptyRunningCost() };
        const partialProofData = {
          input: {
            value: _descriptor_0.toValue(cardId_0).concat(_descriptor_0.toValue(ownerSecret_0)),
            alignment: _descriptor_0.alignment().concat(_descriptor_0.alignment())
          },
          output: undefined,
          publicTranscript: [],
          privateTranscriptOutputs: []
        };
        const result_0 = this._closeCardVault_0(context,
                                                partialProofData,
                                                cardId_0,
                                                ownerSecret_0);
        partialProofData.output = { value: [], alignment: [] };
        return { result: result_0, context: context, proofData: partialProofData, gasCost: context.gasCost };
      }
    };
    this.impureCircuits = {
      createCardVault: this.circuits.createCardVault,
      updateCardMetadata: this.circuits.updateCardMetadata,
      setCardDailyLimit: this.circuits.setCardDailyLimit,
      recordCardSpend: this.circuits.recordCardSpend,
      closeCardVault: this.circuits.closeCardVault
    };
    this.provableCircuits = {
      createCardVault: this.circuits.createCardVault,
      updateCardMetadata: this.circuits.updateCardMetadata,
      setCardDailyLimit: this.circuits.setCardDailyLimit,
      recordCardSpend: this.circuits.recordCardSpend,
      closeCardVault: this.circuits.closeCardVault
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
    stateValue_0 = stateValue_0.arrayPush(__compactRuntime.StateValue.newNull());
    stateValue_0 = stateValue_0.arrayPush(__compactRuntime.StateValue.newNull());
    state_0.data = new __compactRuntime.ChargedState(stateValue_0);
    state_0.setOperation('createCardVault', new __compactRuntime.ContractOperation());
    state_0.setOperation('updateCardMetadata', new __compactRuntime.ContractOperation());
    state_0.setOperation('setCardDailyLimit', new __compactRuntime.ContractOperation());
    state_0.setOperation('recordCardSpend', new __compactRuntime.ContractOperation());
    state_0.setOperation('closeCardVault', new __compactRuntime.ContractOperation());
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
                                                 value: __compactRuntime.StateValue.newCell({ value: _descriptor_13.toValue(0n),
                                                                                              alignment: _descriptor_13.alignment() }).encode() } },
                                       { push: { storage: true,
                                                 value: __compactRuntime.StateValue.newMap(
                                                          new __compactRuntime.StateMap()
                                                        ).encode() } },
                                       { ins: { cached: false, n: 1 } }]);
    __compactRuntime.queryLedgerState(context,
                                      partialProofData,
                                      [
                                       { push: { storage: false,
                                                 value: __compactRuntime.StateValue.newCell({ value: _descriptor_13.toValue(1n),
                                                                                              alignment: _descriptor_13.alignment() }).encode() } },
                                       { push: { storage: true,
                                                 value: __compactRuntime.StateValue.newMap(
                                                          new __compactRuntime.StateMap()
                                                        ).encode() } },
                                       { ins: { cached: false, n: 1 } }]);
    __compactRuntime.queryLedgerState(context,
                                      partialProofData,
                                      [
                                       { push: { storage: false,
                                                 value: __compactRuntime.StateValue.newCell({ value: _descriptor_13.toValue(2n),
                                                                                              alignment: _descriptor_13.alignment() }).encode() } },
                                       { push: { storage: true,
                                                 value: __compactRuntime.StateValue.newMap(
                                                          new __compactRuntime.StateMap()
                                                        ).encode() } },
                                       { ins: { cached: false, n: 1 } }]);
    __compactRuntime.queryLedgerState(context,
                                      partialProofData,
                                      [
                                       { push: { storage: false,
                                                 value: __compactRuntime.StateValue.newCell({ value: _descriptor_13.toValue(3n),
                                                                                              alignment: _descriptor_13.alignment() }).encode() } },
                                       { push: { storage: true,
                                                 value: __compactRuntime.StateValue.newMap(
                                                          new __compactRuntime.StateMap()
                                                        ).encode() } },
                                       { ins: { cached: false, n: 1 } }]);
    __compactRuntime.queryLedgerState(context,
                                      partialProofData,
                                      [
                                       { push: { storage: false,
                                                 value: __compactRuntime.StateValue.newCell({ value: _descriptor_13.toValue(4n),
                                                                                              alignment: _descriptor_13.alignment() }).encode() } },
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
  _persistentHash_0(value_0) {
    const result_0 = __compactRuntime.persistentHash(_descriptor_10, value_0);
    return result_0;
  }
  _persistentHash_1(value_0) {
    const result_0 = __compactRuntime.persistentHash(_descriptor_8, value_0);
    return result_0;
  }
  _persistentHash_2(value_0) {
    const result_0 = __compactRuntime.persistentHash(_descriptor_9, value_0);
    return result_0;
  }
  _deriveCardOwnerAuthorization_0(ownerSecret_0) {
    return this._persistentHash_0([new Uint8Array([108, 117, 109, 97, 112, 97, 121, 58, 99, 97, 114, 100, 45, 111, 119, 110, 101, 114, 58, 118, 49, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0]),
                                   ownerSecret_0]);
  }
  _deriveCardVaultCommitment_0(cardId_0,
                               ownerPrivateIdentity_0,
                               cardNumberHash_0,
                               metadataDigest_0,
                               dailyLimit_0,
                               vaultNonce_0,
                               vaultRandomness_0)
  {
    return this._persistentHash_1([new Uint8Array([108, 117, 109, 97, 112, 97, 121, 58, 99, 97, 114, 100, 45, 118, 97, 117, 108, 116, 45, 99, 111, 109, 109, 105, 116, 109, 101, 110, 116, 58, 118, 49]),
                                   1n,
                                   cardId_0,
                                   ownerPrivateIdentity_0,
                                   cardNumberHash_0,
                                   metadataDigest_0,
                                   dailyLimit_0,
                                   vaultNonce_0,
                                   vaultRandomness_0]);
  }
  _deriveCardSpendNullifier_0(cardId_0, paymentId_0, spendSecret_0) {
    return this._persistentHash_2([new Uint8Array([108, 117, 109, 97, 112, 97, 121, 58, 99, 97, 114, 100, 45, 115, 112, 101, 110, 100, 58, 118, 49, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0]),
                                   cardId_0,
                                   paymentId_0,
                                   spendSecret_0]);
  }
  _createCardVault_0(context,
                     partialProofData,
                     cardId_0,
                     commitment_0,
                     ownerAuthorization_0,
                     cardNumberHash_0,
                     metadataDigest_0,
                     dailyLimit_0)
  {
    __compactRuntime.assert(!this._equal_0(cardId_0, new Uint8Array(32)),
                            'card id is required');
    __compactRuntime.assert(!this._equal_1(commitment_0, new Uint8Array(32)),
                            'card commitment is required');
    __compactRuntime.assert(!this._equal_2(ownerAuthorization_0,
                                           new Uint8Array(32)),
                            'card owner authorization is required');
    __compactRuntime.assert(!this._equal_3(cardNumberHash_0, new Uint8Array(32)),
                            'card number hash is required');
    __compactRuntime.assert(!_descriptor_1.fromValue(__compactRuntime.queryLedgerState(context,
                                                                                       partialProofData,
                                                                                       [
                                                                                        { dup: { n: 0 } },
                                                                                        { idx: { cached: false,
                                                                                                 pushPath: false,
                                                                                                 path: [
                                                                                                        { tag: 'value',
                                                                                                          value: { value: _descriptor_13.toValue(0n),
                                                                                                                   alignment: _descriptor_13.alignment() } }] } },
                                                                                        { push: { storage: false,
                                                                                                  value: __compactRuntime.StateValue.newCell({ value: _descriptor_0.toValue(cardId_0),
                                                                                                                                               alignment: _descriptor_0.alignment() }).encode() } },
                                                                                        'member',
                                                                                        { popeq: { cached: true,
                                                                                                   result: undefined } }]).value),
                            'card vault already exists');
    __compactRuntime.queryLedgerState(context,
                                      partialProofData,
                                      [
                                       { idx: { cached: false,
                                                pushPath: true,
                                                path: [
                                                       { tag: 'value',
                                                         value: { value: _descriptor_13.toValue(0n),
                                                                  alignment: _descriptor_13.alignment() } }] } },
                                       { push: { storage: false,
                                                 value: __compactRuntime.StateValue.newCell({ value: _descriptor_0.toValue(cardId_0),
                                                                                              alignment: _descriptor_0.alignment() }).encode() } },
                                       { push: { storage: true,
                                                 value: __compactRuntime.StateValue.newNull().encode() } },
                                       { ins: { cached: false, n: 1 } },
                                       { ins: { cached: true, n: 1 } }]);
    const tmp_0 = { commitmentVersion: 1n,
                    commitment: commitment_0,
                    ownerAuthorization: ownerAuthorization_0,
                    cardNumberHash: cardNumberHash_0,
                    metadataDigest: metadataDigest_0,
                    dailyLimit: dailyLimit_0,
                    spentEpochDay: 0n,
                    spentAmount: 0n,
                    status: 0 };
    __compactRuntime.queryLedgerState(context,
                                      partialProofData,
                                      [
                                       { idx: { cached: false,
                                                pushPath: true,
                                                path: [
                                                       { tag: 'value',
                                                         value: { value: _descriptor_13.toValue(1n),
                                                                  alignment: _descriptor_13.alignment() } }] } },
                                       { push: { storage: false,
                                                 value: __compactRuntime.StateValue.newCell({ value: _descriptor_0.toValue(cardId_0),
                                                                                              alignment: _descriptor_0.alignment() }).encode() } },
                                       { push: { storage: true,
                                                 value: __compactRuntime.StateValue.newCell({ value: _descriptor_7.toValue(tmp_0),
                                                                                              alignment: _descriptor_7.alignment() }).encode() } },
                                       { ins: { cached: false, n: 1 } },
                                       { ins: { cached: true, n: 1 } }]);
    return [];
  }
  _updateCardMetadata_0(context,
                        partialProofData,
                        cardId_0,
                        ownerSecret_0,
                        metadataDigest_0)
  {
    __compactRuntime.assert(_descriptor_1.fromValue(__compactRuntime.queryLedgerState(context,
                                                                                      partialProofData,
                                                                                      [
                                                                                       { dup: { n: 0 } },
                                                                                       { idx: { cached: false,
                                                                                                pushPath: false,
                                                                                                path: [
                                                                                                       { tag: 'value',
                                                                                                         value: { value: _descriptor_13.toValue(0n),
                                                                                                                  alignment: _descriptor_13.alignment() } }] } },
                                                                                       { push: { storage: false,
                                                                                                 value: __compactRuntime.StateValue.newCell({ value: _descriptor_0.toValue(cardId_0),
                                                                                                                                              alignment: _descriptor_0.alignment() }).encode() } },
                                                                                       'member',
                                                                                       { popeq: { cached: true,
                                                                                                  result: undefined } }]).value),
                            'card vault does not exist');
    const vault_0 = _descriptor_7.fromValue(__compactRuntime.queryLedgerState(context,
                                                                              partialProofData,
                                                                              [
                                                                               { dup: { n: 0 } },
                                                                               { idx: { cached: false,
                                                                                        pushPath: false,
                                                                                        path: [
                                                                                               { tag: 'value',
                                                                                                 value: { value: _descriptor_13.toValue(1n),
                                                                                                          alignment: _descriptor_13.alignment() } }] } },
                                                                               { idx: { cached: false,
                                                                                        pushPath: false,
                                                                                        path: [
                                                                                               { tag: 'value',
                                                                                                 value: { value: _descriptor_0.toValue(cardId_0),
                                                                                                          alignment: _descriptor_0.alignment() } }] } },
                                                                               { popeq: { cached: false,
                                                                                          result: undefined } }]).value);
    __compactRuntime.assert(vault_0.status === 0, 'card vault is not active');
    __compactRuntime.assert(this._equal_4(this._deriveCardOwnerAuthorization_0(ownerSecret_0),
                                          vault_0.ownerAuthorization),
                            'unauthorized card metadata update');
    const tmp_0 = { commitmentVersion: vault_0.commitmentVersion,
                    commitment: vault_0.commitment,
                    ownerAuthorization: vault_0.ownerAuthorization,
                    cardNumberHash: vault_0.cardNumberHash,
                    metadataDigest: metadataDigest_0,
                    dailyLimit: vault_0.dailyLimit,
                    spentEpochDay: vault_0.spentEpochDay,
                    spentAmount: vault_0.spentAmount,
                    status: vault_0.status };
    __compactRuntime.queryLedgerState(context,
                                      partialProofData,
                                      [
                                       { idx: { cached: false,
                                                pushPath: true,
                                                path: [
                                                       { tag: 'value',
                                                         value: { value: _descriptor_13.toValue(1n),
                                                                  alignment: _descriptor_13.alignment() } }] } },
                                       { push: { storage: false,
                                                 value: __compactRuntime.StateValue.newCell({ value: _descriptor_0.toValue(cardId_0),
                                                                                              alignment: _descriptor_0.alignment() }).encode() } },
                                       { push: { storage: true,
                                                 value: __compactRuntime.StateValue.newCell({ value: _descriptor_7.toValue(tmp_0),
                                                                                              alignment: _descriptor_7.alignment() }).encode() } },
                                       { ins: { cached: false, n: 1 } },
                                       { ins: { cached: true, n: 1 } }]);
    return [];
  }
  _setCardDailyLimit_0(context,
                       partialProofData,
                       cardId_0,
                       ownerSecret_0,
                       dailyLimit_0)
  {
    __compactRuntime.assert(_descriptor_1.fromValue(__compactRuntime.queryLedgerState(context,
                                                                                      partialProofData,
                                                                                      [
                                                                                       { dup: { n: 0 } },
                                                                                       { idx: { cached: false,
                                                                                                pushPath: false,
                                                                                                path: [
                                                                                                       { tag: 'value',
                                                                                                         value: { value: _descriptor_13.toValue(0n),
                                                                                                                  alignment: _descriptor_13.alignment() } }] } },
                                                                                       { push: { storage: false,
                                                                                                 value: __compactRuntime.StateValue.newCell({ value: _descriptor_0.toValue(cardId_0),
                                                                                                                                              alignment: _descriptor_0.alignment() }).encode() } },
                                                                                       'member',
                                                                                       { popeq: { cached: true,
                                                                                                  result: undefined } }]).value),
                            'card vault does not exist');
    const vault_0 = _descriptor_7.fromValue(__compactRuntime.queryLedgerState(context,
                                                                              partialProofData,
                                                                              [
                                                                               { dup: { n: 0 } },
                                                                               { idx: { cached: false,
                                                                                        pushPath: false,
                                                                                        path: [
                                                                                               { tag: 'value',
                                                                                                 value: { value: _descriptor_13.toValue(1n),
                                                                                                          alignment: _descriptor_13.alignment() } }] } },
                                                                               { idx: { cached: false,
                                                                                        pushPath: false,
                                                                                        path: [
                                                                                               { tag: 'value',
                                                                                                 value: { value: _descriptor_0.toValue(cardId_0),
                                                                                                          alignment: _descriptor_0.alignment() } }] } },
                                                                               { popeq: { cached: false,
                                                                                          result: undefined } }]).value);
    __compactRuntime.assert(vault_0.status === 0, 'card vault is not active');
    __compactRuntime.assert(this._equal_5(this._deriveCardOwnerAuthorization_0(ownerSecret_0),
                                          vault_0.ownerAuthorization),
                            'unauthorized card limit update');
    const tmp_0 = { commitmentVersion: vault_0.commitmentVersion,
                    commitment: vault_0.commitment,
                    ownerAuthorization: vault_0.ownerAuthorization,
                    cardNumberHash: vault_0.cardNumberHash,
                    metadataDigest: vault_0.metadataDigest,
                    dailyLimit: dailyLimit_0,
                    spentEpochDay: vault_0.spentEpochDay,
                    spentAmount: vault_0.spentAmount,
                    status: vault_0.status };
    __compactRuntime.queryLedgerState(context,
                                      partialProofData,
                                      [
                                       { idx: { cached: false,
                                                pushPath: true,
                                                path: [
                                                       { tag: 'value',
                                                         value: { value: _descriptor_13.toValue(1n),
                                                                  alignment: _descriptor_13.alignment() } }] } },
                                       { push: { storage: false,
                                                 value: __compactRuntime.StateValue.newCell({ value: _descriptor_0.toValue(cardId_0),
                                                                                              alignment: _descriptor_0.alignment() }).encode() } },
                                       { push: { storage: true,
                                                 value: __compactRuntime.StateValue.newCell({ value: _descriptor_7.toValue(tmp_0),
                                                                                              alignment: _descriptor_7.alignment() }).encode() } },
                                       { ins: { cached: false, n: 1 } },
                                       { ins: { cached: true, n: 1 } }]);
    return [];
  }
  _recordCardSpend_0(context,
                     partialProofData,
                     cardId_0,
                     ownerPrivateIdentity_0,
                     cardNumberHash_0,
                     metadataDigest_0,
                     dailyLimitAtCreation_0,
                     vaultNonce_0,
                     vaultRandomness_0,
                     paymentId_0,
                     spendSecret_0,
                     tokenId_0,
                     amount_0,
                     epochDay_0)
  {
    __compactRuntime.assert(_descriptor_1.fromValue(__compactRuntime.queryLedgerState(context,
                                                                                      partialProofData,
                                                                                      [
                                                                                       { dup: { n: 0 } },
                                                                                       { idx: { cached: false,
                                                                                                pushPath: false,
                                                                                                path: [
                                                                                                       { tag: 'value',
                                                                                                         value: { value: _descriptor_13.toValue(0n),
                                                                                                                  alignment: _descriptor_13.alignment() } }] } },
                                                                                       { push: { storage: false,
                                                                                                 value: __compactRuntime.StateValue.newCell({ value: _descriptor_0.toValue(cardId_0),
                                                                                                                                              alignment: _descriptor_0.alignment() }).encode() } },
                                                                                       'member',
                                                                                       { popeq: { cached: true,
                                                                                                  result: undefined } }]).value),
                            'card vault does not exist');
    const vault_0 = _descriptor_7.fromValue(__compactRuntime.queryLedgerState(context,
                                                                              partialProofData,
                                                                              [
                                                                               { dup: { n: 0 } },
                                                                               { idx: { cached: false,
                                                                                        pushPath: false,
                                                                                        path: [
                                                                                               { tag: 'value',
                                                                                                 value: { value: _descriptor_13.toValue(1n),
                                                                                                          alignment: _descriptor_13.alignment() } }] } },
                                                                               { idx: { cached: false,
                                                                                        pushPath: false,
                                                                                        path: [
                                                                                               { tag: 'value',
                                                                                                 value: { value: _descriptor_0.toValue(cardId_0),
                                                                                                          alignment: _descriptor_0.alignment() } }] } },
                                                                               { popeq: { cached: false,
                                                                                          result: undefined } }]).value);
    __compactRuntime.assert(vault_0.status === 0, 'card vault is not active');
    __compactRuntime.assert(amount_0 > 0n, 'card spend amount must be positive');
    __compactRuntime.assert(this._equal_6(cardNumberHash_0,
                                          vault_0.cardNumberHash),
                            'wrong card number hash');
    __compactRuntime.assert(this._equal_7(this._deriveCardVaultCommitment_0(cardId_0,
                                                                            ownerPrivateIdentity_0,
                                                                            cardNumberHash_0,
                                                                            metadataDigest_0,
                                                                            dailyLimitAtCreation_0,
                                                                            vaultNonce_0,
                                                                            vaultRandomness_0),
                                          vault_0.commitment),
                            'invalid card vault opening');
    const spendNullifier_0 = this._deriveCardSpendNullifier_0(cardId_0,
                                                              paymentId_0,
                                                              spendSecret_0);
    __compactRuntime.assert(!_descriptor_1.fromValue(__compactRuntime.queryLedgerState(context,
                                                                                       partialProofData,
                                                                                       [
                                                                                        { dup: { n: 0 } },
                                                                                        { idx: { cached: false,
                                                                                                 pushPath: false,
                                                                                                 path: [
                                                                                                        { tag: 'value',
                                                                                                          value: { value: _descriptor_13.toValue(4n),
                                                                                                                   alignment: _descriptor_13.alignment() } }] } },
                                                                                        { push: { storage: false,
                                                                                                  value: __compactRuntime.StateValue.newCell({ value: _descriptor_0.toValue(spendNullifier_0),
                                                                                                                                               alignment: _descriptor_0.alignment() }).encode() } },
                                                                                        'member',
                                                                                        { popeq: { cached: true,
                                                                                                   result: undefined } }]).value),
                            'card spend replay');
    __compactRuntime.assert(epochDay_0 >= vault_0.spentEpochDay,
                            'card spend epoch moved backwards');
    __compactRuntime.assert(amount_0 <= vault_0.dailyLimit,
                            'card spend limit exceeded');
    __compactRuntime.queryLedgerState(context,
                                      partialProofData,
                                      [
                                       { idx: { cached: false,
                                                pushPath: true,
                                                path: [
                                                       { tag: 'value',
                                                         value: { value: _descriptor_13.toValue(4n),
                                                                  alignment: _descriptor_13.alignment() } }] } },
                                       { push: { storage: false,
                                                 value: __compactRuntime.StateValue.newCell({ value: _descriptor_0.toValue(spendNullifier_0),
                                                                                              alignment: _descriptor_0.alignment() }).encode() } },
                                       { push: { storage: true,
                                                 value: __compactRuntime.StateValue.newNull().encode() } },
                                       { ins: { cached: false, n: 1 } },
                                       { ins: { cached: true, n: 1 } }]);
    __compactRuntime.queryLedgerState(context,
                                      partialProofData,
                                      [
                                       { idx: { cached: false,
                                                pushPath: true,
                                                path: [
                                                       { tag: 'value',
                                                         value: { value: _descriptor_13.toValue(2n),
                                                                  alignment: _descriptor_13.alignment() } }] } },
                                       { push: { storage: false,
                                                 value: __compactRuntime.StateValue.newCell({ value: _descriptor_0.toValue(spendNullifier_0),
                                                                                              alignment: _descriptor_0.alignment() }).encode() } },
                                       { push: { storage: true,
                                                 value: __compactRuntime.StateValue.newNull().encode() } },
                                       { ins: { cached: false, n: 1 } },
                                       { ins: { cached: true, n: 1 } }]);
    const tmp_0 = { cardId: cardId_0,
                    paymentId: paymentId_0,
                    tokenId: tokenId_0,
                    amount: amount_0,
                    epochDay: epochDay_0 };
    __compactRuntime.queryLedgerState(context,
                                      partialProofData,
                                      [
                                       { idx: { cached: false,
                                                pushPath: true,
                                                path: [
                                                       { tag: 'value',
                                                         value: { value: _descriptor_13.toValue(3n),
                                                                  alignment: _descriptor_13.alignment() } }] } },
                                       { push: { storage: false,
                                                 value: __compactRuntime.StateValue.newCell({ value: _descriptor_0.toValue(spendNullifier_0),
                                                                                              alignment: _descriptor_0.alignment() }).encode() } },
                                       { push: { storage: true,
                                                 value: __compactRuntime.StateValue.newCell({ value: _descriptor_4.toValue(tmp_0),
                                                                                              alignment: _descriptor_4.alignment() }).encode() } },
                                       { ins: { cached: false, n: 1 } },
                                       { ins: { cached: true, n: 1 } }]);
    const tmp_1 = { commitmentVersion: vault_0.commitmentVersion,
                    commitment: vault_0.commitment,
                    ownerAuthorization: vault_0.ownerAuthorization,
                    cardNumberHash: vault_0.cardNumberHash,
                    metadataDigest: vault_0.metadataDigest,
                    dailyLimit: vault_0.dailyLimit,
                    spentEpochDay: epochDay_0,
                    spentAmount: amount_0,
                    status: vault_0.status };
    __compactRuntime.queryLedgerState(context,
                                      partialProofData,
                                      [
                                       { idx: { cached: false,
                                                pushPath: true,
                                                path: [
                                                       { tag: 'value',
                                                         value: { value: _descriptor_13.toValue(1n),
                                                                  alignment: _descriptor_13.alignment() } }] } },
                                       { push: { storage: false,
                                                 value: __compactRuntime.StateValue.newCell({ value: _descriptor_0.toValue(cardId_0),
                                                                                              alignment: _descriptor_0.alignment() }).encode() } },
                                       { push: { storage: true,
                                                 value: __compactRuntime.StateValue.newCell({ value: _descriptor_7.toValue(tmp_1),
                                                                                              alignment: _descriptor_7.alignment() }).encode() } },
                                       { ins: { cached: false, n: 1 } },
                                       { ins: { cached: true, n: 1 } }]);
    return [];
  }
  _closeCardVault_0(context, partialProofData, cardId_0, ownerSecret_0) {
    __compactRuntime.assert(_descriptor_1.fromValue(__compactRuntime.queryLedgerState(context,
                                                                                      partialProofData,
                                                                                      [
                                                                                       { dup: { n: 0 } },
                                                                                       { idx: { cached: false,
                                                                                                pushPath: false,
                                                                                                path: [
                                                                                                       { tag: 'value',
                                                                                                         value: { value: _descriptor_13.toValue(0n),
                                                                                                                  alignment: _descriptor_13.alignment() } }] } },
                                                                                       { push: { storage: false,
                                                                                                 value: __compactRuntime.StateValue.newCell({ value: _descriptor_0.toValue(cardId_0),
                                                                                                                                              alignment: _descriptor_0.alignment() }).encode() } },
                                                                                       'member',
                                                                                       { popeq: { cached: true,
                                                                                                  result: undefined } }]).value),
                            'card vault does not exist');
    const vault_0 = _descriptor_7.fromValue(__compactRuntime.queryLedgerState(context,
                                                                              partialProofData,
                                                                              [
                                                                               { dup: { n: 0 } },
                                                                               { idx: { cached: false,
                                                                                        pushPath: false,
                                                                                        path: [
                                                                                               { tag: 'value',
                                                                                                 value: { value: _descriptor_13.toValue(1n),
                                                                                                          alignment: _descriptor_13.alignment() } }] } },
                                                                               { idx: { cached: false,
                                                                                        pushPath: false,
                                                                                        path: [
                                                                                               { tag: 'value',
                                                                                                 value: { value: _descriptor_0.toValue(cardId_0),
                                                                                                          alignment: _descriptor_0.alignment() } }] } },
                                                                               { popeq: { cached: false,
                                                                                          result: undefined } }]).value);
    __compactRuntime.assert(vault_0.status === 0, 'card vault is not active');
    __compactRuntime.assert(this._equal_8(this._deriveCardOwnerAuthorization_0(ownerSecret_0),
                                          vault_0.ownerAuthorization),
                            'unauthorized card close');
    const tmp_0 = { commitmentVersion: vault_0.commitmentVersion,
                    commitment: vault_0.commitment,
                    ownerAuthorization: vault_0.ownerAuthorization,
                    cardNumberHash: vault_0.cardNumberHash,
                    metadataDigest: vault_0.metadataDigest,
                    dailyLimit: vault_0.dailyLimit,
                    spentEpochDay: vault_0.spentEpochDay,
                    spentAmount: vault_0.spentAmount,
                    status: 1 };
    __compactRuntime.queryLedgerState(context,
                                      partialProofData,
                                      [
                                       { idx: { cached: false,
                                                pushPath: true,
                                                path: [
                                                       { tag: 'value',
                                                         value: { value: _descriptor_13.toValue(1n),
                                                                  alignment: _descriptor_13.alignment() } }] } },
                                       { push: { storage: false,
                                                 value: __compactRuntime.StateValue.newCell({ value: _descriptor_0.toValue(cardId_0),
                                                                                              alignment: _descriptor_0.alignment() }).encode() } },
                                       { push: { storage: true,
                                                 value: __compactRuntime.StateValue.newCell({ value: _descriptor_7.toValue(tmp_0),
                                                                                              alignment: _descriptor_7.alignment() }).encode() } },
                                       { ins: { cached: false, n: 1 } },
                                       { ins: { cached: true, n: 1 } }]);
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
    if (!x0.every((x, i) => y0[i] === x)) { return false; }
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
    if (!x0.every((x, i) => y0[i] === x)) { return false; }
    return true;
  }
  _equal_8(x0, y0) {
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
    cardVaultIds: {
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
                                                                                            value: { value: _descriptor_13.toValue(0n),
                                                                                                     alignment: _descriptor_13.alignment() } }] } },
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
                                                                                            value: { value: _descriptor_13.toValue(0n),
                                                                                                     alignment: _descriptor_13.alignment() } }] } },
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
                                     'lumapay-card-vault.compact line 27 char 1',
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
                                                                                            value: { value: _descriptor_13.toValue(0n),
                                                                                                     alignment: _descriptor_13.alignment() } }] } },
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
    cardVaults: {
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
                                                                                            value: { value: _descriptor_13.toValue(1n),
                                                                                                     alignment: _descriptor_13.alignment() } }] } },
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
                                                                                            value: { value: _descriptor_13.toValue(1n),
                                                                                                     alignment: _descriptor_13.alignment() } }] } },
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
                                     'lumapay-card-vault.compact line 28 char 1',
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
                                                                                            value: { value: _descriptor_13.toValue(1n),
                                                                                                     alignment: _descriptor_13.alignment() } }] } },
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
                                     'lumapay-card-vault.compact line 28 char 1',
                                     'Bytes<32>',
                                     key_0)
        }
        return _descriptor_7.fromValue(__compactRuntime.queryLedgerState(context,
                                                                         partialProofData,
                                                                         [
                                                                          { dup: { n: 0 } },
                                                                          { idx: { cached: false,
                                                                                   pushPath: false,
                                                                                   path: [
                                                                                          { tag: 'value',
                                                                                            value: { value: _descriptor_13.toValue(1n),
                                                                                                     alignment: _descriptor_13.alignment() } }] } },
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
        return self_0.asMap().keys().map(  (key) => {    const value = self_0.asMap().get(key).asCell();    return [      _descriptor_0.fromValue(key.value),      _descriptor_7.fromValue(value.value)    ];  })[Symbol.iterator]();
      }
    },
    cardSpendIds: {
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
                                                                                            value: { value: _descriptor_13.toValue(2n),
                                                                                                     alignment: _descriptor_13.alignment() } }] } },
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
                                                                                            value: { value: _descriptor_13.toValue(2n),
                                                                                                     alignment: _descriptor_13.alignment() } }] } },
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
                                     'lumapay-card-vault.compact line 29 char 1',
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
                                                                                            value: { value: _descriptor_13.toValue(2n),
                                                                                                     alignment: _descriptor_13.alignment() } }] } },
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
    cardSpends: {
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
                                                                                            value: { value: _descriptor_13.toValue(3n),
                                                                                                     alignment: _descriptor_13.alignment() } }] } },
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
                                                                                            value: { value: _descriptor_13.toValue(3n),
                                                                                                     alignment: _descriptor_13.alignment() } }] } },
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
                                     'lumapay-card-vault.compact line 30 char 1',
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
                                                                                            value: { value: _descriptor_13.toValue(3n),
                                                                                                     alignment: _descriptor_13.alignment() } }] } },
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
                                     'lumapay-card-vault.compact line 30 char 1',
                                     'Bytes<32>',
                                     key_0)
        }
        return _descriptor_4.fromValue(__compactRuntime.queryLedgerState(context,
                                                                         partialProofData,
                                                                         [
                                                                          { dup: { n: 0 } },
                                                                          { idx: { cached: false,
                                                                                   pushPath: false,
                                                                                   path: [
                                                                                          { tag: 'value',
                                                                                            value: { value: _descriptor_13.toValue(3n),
                                                                                                     alignment: _descriptor_13.alignment() } }] } },
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
        const self_0 = state.asArray()[3];
        return self_0.asMap().keys().map(  (key) => {    const value = self_0.asMap().get(key).asCell();    return [      _descriptor_0.fromValue(key.value),      _descriptor_4.fromValue(value.value)    ];  })[Symbol.iterator]();
      }
    },
    cardSpendNullifiers: {
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
                                                                                            value: { value: _descriptor_13.toValue(4n),
                                                                                                     alignment: _descriptor_13.alignment() } }] } },
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
                                                                                            value: { value: _descriptor_13.toValue(4n),
                                                                                                     alignment: _descriptor_13.alignment() } }] } },
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
                                     'lumapay-card-vault.compact line 31 char 1',
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
                                                                                            value: { value: _descriptor_13.toValue(4n),
                                                                                                     alignment: _descriptor_13.alignment() } }] } },
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
        const self_0 = state.asArray()[4];
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
  deriveCardOwnerAuthorization: (...args_0) => {
    if (args_0.length !== 1) {
      throw new __compactRuntime.CompactError(`deriveCardOwnerAuthorization: expected 1 argument (as invoked from Typescript), received ${args_0.length}`);
    }
    const ownerSecret_0 = args_0[0];
    if (!(ownerSecret_0.buffer instanceof ArrayBuffer && ownerSecret_0.BYTES_PER_ELEMENT === 1 && ownerSecret_0.length === 32)) {
      __compactRuntime.typeError('deriveCardOwnerAuthorization',
                                 'argument 1',
                                 'lumapay-card-vault.compact line 33 char 1',
                                 'Bytes<32>',
                                 ownerSecret_0)
    }
    return _dummyContract._deriveCardOwnerAuthorization_0(ownerSecret_0);
  },
  deriveCardVaultCommitment: (...args_0) => {
    if (args_0.length !== 7) {
      throw new __compactRuntime.CompactError(`deriveCardVaultCommitment: expected 7 arguments (as invoked from Typescript), received ${args_0.length}`);
    }
    const cardId_0 = args_0[0];
    const ownerPrivateIdentity_0 = args_0[1];
    const cardNumberHash_0 = args_0[2];
    const metadataDigest_0 = args_0[3];
    const dailyLimit_0 = args_0[4];
    const vaultNonce_0 = args_0[5];
    const vaultRandomness_0 = args_0[6];
    if (!(cardId_0.buffer instanceof ArrayBuffer && cardId_0.BYTES_PER_ELEMENT === 1 && cardId_0.length === 32)) {
      __compactRuntime.typeError('deriveCardVaultCommitment',
                                 'argument 1',
                                 'lumapay-card-vault.compact line 40 char 1',
                                 'Bytes<32>',
                                 cardId_0)
    }
    if (!(ownerPrivateIdentity_0.buffer instanceof ArrayBuffer && ownerPrivateIdentity_0.BYTES_PER_ELEMENT === 1 && ownerPrivateIdentity_0.length === 32)) {
      __compactRuntime.typeError('deriveCardVaultCommitment',
                                 'argument 2',
                                 'lumapay-card-vault.compact line 40 char 1',
                                 'Bytes<32>',
                                 ownerPrivateIdentity_0)
    }
    if (!(cardNumberHash_0.buffer instanceof ArrayBuffer && cardNumberHash_0.BYTES_PER_ELEMENT === 1 && cardNumberHash_0.length === 32)) {
      __compactRuntime.typeError('deriveCardVaultCommitment',
                                 'argument 3',
                                 'lumapay-card-vault.compact line 40 char 1',
                                 'Bytes<32>',
                                 cardNumberHash_0)
    }
    if (!(metadataDigest_0.buffer instanceof ArrayBuffer && metadataDigest_0.BYTES_PER_ELEMENT === 1 && metadataDigest_0.length === 32)) {
      __compactRuntime.typeError('deriveCardVaultCommitment',
                                 'argument 4',
                                 'lumapay-card-vault.compact line 40 char 1',
                                 'Bytes<32>',
                                 metadataDigest_0)
    }
    if (!(typeof(dailyLimit_0) === 'bigint' && dailyLimit_0 >= 0n && dailyLimit_0 <= 340282366920938463463374607431768211455n)) {
      __compactRuntime.typeError('deriveCardVaultCommitment',
                                 'argument 5',
                                 'lumapay-card-vault.compact line 40 char 1',
                                 'Uint<0..340282366920938463463374607431768211456>',
                                 dailyLimit_0)
    }
    if (!(vaultNonce_0.buffer instanceof ArrayBuffer && vaultNonce_0.BYTES_PER_ELEMENT === 1 && vaultNonce_0.length === 32)) {
      __compactRuntime.typeError('deriveCardVaultCommitment',
                                 'argument 6',
                                 'lumapay-card-vault.compact line 40 char 1',
                                 'Bytes<32>',
                                 vaultNonce_0)
    }
    if (!(vaultRandomness_0.buffer instanceof ArrayBuffer && vaultRandomness_0.BYTES_PER_ELEMENT === 1 && vaultRandomness_0.length === 32)) {
      __compactRuntime.typeError('deriveCardVaultCommitment',
                                 'argument 7',
                                 'lumapay-card-vault.compact line 40 char 1',
                                 'Bytes<32>',
                                 vaultRandomness_0)
    }
    return _dummyContract._deriveCardVaultCommitment_0(cardId_0,
                                                       ownerPrivateIdentity_0,
                                                       cardNumberHash_0,
                                                       metadataDigest_0,
                                                       dailyLimit_0,
                                                       vaultNonce_0,
                                                       vaultRandomness_0);
  },
  deriveCardSpendNullifier: (...args_0) => {
    if (args_0.length !== 3) {
      throw new __compactRuntime.CompactError(`deriveCardSpendNullifier: expected 3 arguments (as invoked from Typescript), received ${args_0.length}`);
    }
    const cardId_0 = args_0[0];
    const paymentId_0 = args_0[1];
    const spendSecret_0 = args_0[2];
    if (!(cardId_0.buffer instanceof ArrayBuffer && cardId_0.BYTES_PER_ELEMENT === 1 && cardId_0.length === 32)) {
      __compactRuntime.typeError('deriveCardSpendNullifier',
                                 'argument 1',
                                 'lumapay-card-vault.compact line 65 char 1',
                                 'Bytes<32>',
                                 cardId_0)
    }
    if (!(paymentId_0.buffer instanceof ArrayBuffer && paymentId_0.BYTES_PER_ELEMENT === 1 && paymentId_0.length === 32)) {
      __compactRuntime.typeError('deriveCardSpendNullifier',
                                 'argument 2',
                                 'lumapay-card-vault.compact line 65 char 1',
                                 'Bytes<32>',
                                 paymentId_0)
    }
    if (!(spendSecret_0.buffer instanceof ArrayBuffer && spendSecret_0.BYTES_PER_ELEMENT === 1 && spendSecret_0.length === 32)) {
      __compactRuntime.typeError('deriveCardSpendNullifier',
                                 'argument 3',
                                 'lumapay-card-vault.compact line 65 char 1',
                                 'Bytes<32>',
                                 spendSecret_0)
    }
    return _dummyContract._deriveCardSpendNullifier_0(cardId_0,
                                                      paymentId_0,
                                                      spendSecret_0);
  }
};
export const contractReferenceLocations =
  { tag: 'publicLedgerArray', indices: { } };
//# sourceMappingURL=index.js.map
