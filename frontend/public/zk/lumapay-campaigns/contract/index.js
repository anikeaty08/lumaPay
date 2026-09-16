import * as __compactRuntime from '@midnight-ntwrk/compact-runtime';
__compactRuntime.checkRuntimeVersion('0.16.0');

export var CampaignStatus;
(function (CampaignStatus) {
  CampaignStatus[CampaignStatus['OPEN'] = 0] = 'OPEN';
  CampaignStatus[CampaignStatus['CANCELLED'] = 1] = 'CANCELLED';
  CampaignStatus[CampaignStatus['EXPIRED'] = 2] = 'EXPIRED';
})(CampaignStatus || (CampaignStatus = {}));

const _descriptor_0 = new __compactRuntime.CompactTypeBytes(32);

const _descriptor_1 = new __compactRuntime.CompactTypeUnsignedInteger(340282366920938463463374607431768211455n, 16);

const _descriptor_2 = __compactRuntime.CompactTypeBoolean;

class _ContributionPublicState_0 {
  alignment() {
    return _descriptor_0.alignment().concat(_descriptor_0.alignment().concat(_descriptor_0.alignment().concat(_descriptor_0.alignment().concat(_descriptor_2.alignment()))));
  }
  fromValue(value_0) {
    return {
      campaignId: _descriptor_0.fromValue(value_0),
      nullifier: _descriptor_0.fromValue(value_0),
      escrowCoinCommitment: _descriptor_0.fromValue(value_0),
      receiptCommitment: _descriptor_0.fromValue(value_0),
      claimed: _descriptor_2.fromValue(value_0)
    }
  }
  toValue(value_0) {
    return _descriptor_0.toValue(value_0.campaignId).concat(_descriptor_0.toValue(value_0.nullifier).concat(_descriptor_0.toValue(value_0.escrowCoinCommitment).concat(_descriptor_0.toValue(value_0.receiptCommitment).concat(_descriptor_2.toValue(value_0.claimed)))));
  }
}

const _descriptor_3 = new _ContributionPublicState_0();

const _descriptor_4 = new __compactRuntime.CompactTypeUnsignedInteger(65535n, 2);

const _descriptor_5 = new __compactRuntime.CompactTypeUnsignedInteger(18446744073709551615n, 8);

const _descriptor_6 = new __compactRuntime.CompactTypeEnum(2, 1);

class _CampaignPublicState_0 {
  alignment() {
    return _descriptor_4.alignment().concat(_descriptor_0.alignment().concat(_descriptor_0.alignment().concat(_descriptor_5.alignment().concat(_descriptor_6.alignment().concat(_descriptor_5.alignment())))));
  }
  fromValue(value_0) {
    return {
      commitmentVersion: _descriptor_4.fromValue(value_0),
      commitment: _descriptor_0.fromValue(value_0),
      merchantAuthorization: _descriptor_0.fromValue(value_0),
      expiry: _descriptor_5.fromValue(value_0),
      status: _descriptor_6.fromValue(value_0),
      contributionCount: _descriptor_5.fromValue(value_0)
    }
  }
  toValue(value_0) {
    return _descriptor_4.toValue(value_0.commitmentVersion).concat(_descriptor_0.toValue(value_0.commitment).concat(_descriptor_0.toValue(value_0.merchantAuthorization).concat(_descriptor_5.toValue(value_0.expiry).concat(_descriptor_6.toValue(value_0.status).concat(_descriptor_5.toValue(value_0.contributionCount))))));
  }
}

const _descriptor_7 = new _CampaignPublicState_0();

const _descriptor_8 = new __compactRuntime.CompactTypeUnsignedInteger(255n, 1);

class _ShieldedCoinInfo_0 {
  alignment() {
    return _descriptor_0.alignment().concat(_descriptor_0.alignment().concat(_descriptor_1.alignment()));
  }
  fromValue(value_0) {
    return {
      nonce: _descriptor_0.fromValue(value_0),
      color: _descriptor_0.fromValue(value_0),
      value: _descriptor_1.fromValue(value_0)
    }
  }
  toValue(value_0) {
    return _descriptor_0.toValue(value_0.nonce).concat(_descriptor_0.toValue(value_0.color).concat(_descriptor_1.toValue(value_0.value)));
  }
}

const _descriptor_9 = new _ShieldedCoinInfo_0();

class _QualifiedShieldedCoinInfo_0 {
  alignment() {
    return _descriptor_0.alignment().concat(_descriptor_0.alignment().concat(_descriptor_1.alignment().concat(_descriptor_5.alignment())));
  }
  fromValue(value_0) {
    return {
      nonce: _descriptor_0.fromValue(value_0),
      color: _descriptor_0.fromValue(value_0),
      value: _descriptor_1.fromValue(value_0),
      mt_index: _descriptor_5.fromValue(value_0)
    }
  }
  toValue(value_0) {
    return _descriptor_0.toValue(value_0.nonce).concat(_descriptor_0.toValue(value_0.color).concat(_descriptor_1.toValue(value_0.value).concat(_descriptor_5.toValue(value_0.mt_index))));
  }
}

const _descriptor_10 = new _QualifiedShieldedCoinInfo_0();

class _Maybe_0 {
  alignment() {
    return _descriptor_2.alignment().concat(_descriptor_9.alignment());
  }
  fromValue(value_0) {
    return {
      is_some: _descriptor_2.fromValue(value_0),
      value: _descriptor_9.fromValue(value_0)
    }
  }
  toValue(value_0) {
    return _descriptor_2.toValue(value_0.is_some).concat(_descriptor_9.toValue(value_0.value));
  }
}

const _descriptor_11 = new _Maybe_0();

class _ShieldedSendResult_0 {
  alignment() {
    return _descriptor_11.alignment().concat(_descriptor_9.alignment());
  }
  fromValue(value_0) {
    return {
      change: _descriptor_11.fromValue(value_0),
      sent: _descriptor_9.fromValue(value_0)
    }
  }
  toValue(value_0) {
    return _descriptor_11.toValue(value_0.change).concat(_descriptor_9.toValue(value_0.sent));
  }
}

const _descriptor_12 = new _ShieldedSendResult_0();

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

const _descriptor_13 = new _ZswapCoinPublicKey_0();

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

const _descriptor_14 = new _ContractAddress_0();

class _Either_0 {
  alignment() {
    return _descriptor_2.alignment().concat(_descriptor_13.alignment().concat(_descriptor_14.alignment()));
  }
  fromValue(value_0) {
    return {
      is_left: _descriptor_2.fromValue(value_0),
      left: _descriptor_13.fromValue(value_0),
      right: _descriptor_14.fromValue(value_0)
    }
  }
  toValue(value_0) {
    return _descriptor_2.toValue(value_0.is_left).concat(_descriptor_13.toValue(value_0.left).concat(_descriptor_14.toValue(value_0.right)));
  }
}

const _descriptor_15 = new _Either_0();

const _descriptor_16 = __compactRuntime.CompactTypeField;

const _descriptor_17 = new __compactRuntime.CompactTypeBytes(21);

class _CoinPreimage_0 {
  alignment() {
    return _descriptor_17.alignment().concat(_descriptor_9.alignment().concat(_descriptor_2.alignment().concat(_descriptor_0.alignment())));
  }
  fromValue(value_0) {
    return {
      domain_sep: _descriptor_17.fromValue(value_0),
      info: _descriptor_9.fromValue(value_0),
      dataType: _descriptor_2.fromValue(value_0),
      data: _descriptor_0.fromValue(value_0)
    }
  }
  toValue(value_0) {
    return _descriptor_17.toValue(value_0.domain_sep).concat(_descriptor_9.toValue(value_0.info).concat(_descriptor_2.toValue(value_0.dataType).concat(_descriptor_0.toValue(value_0.data))));
  }
}

const _descriptor_18 = new _CoinPreimage_0();

class _tuple_0 {
  alignment() {
    return _descriptor_0.alignment().concat(_descriptor_0.alignment().concat(_descriptor_0.alignment().concat(_descriptor_1.alignment().concat(_descriptor_0.alignment().concat(_descriptor_0.alignment())))));
  }
  fromValue(value_0) {
    return [
      _descriptor_0.fromValue(value_0),
      _descriptor_0.fromValue(value_0),
      _descriptor_0.fromValue(value_0),
      _descriptor_1.fromValue(value_0),
      _descriptor_0.fromValue(value_0),
      _descriptor_0.fromValue(value_0)
    ]
  }
  toValue(value_0) {
    return _descriptor_0.toValue(value_0[0]).concat(_descriptor_0.toValue(value_0[1]).concat(_descriptor_0.toValue(value_0[2]).concat(_descriptor_1.toValue(value_0[3]).concat(_descriptor_0.toValue(value_0[4]).concat(_descriptor_0.toValue(value_0[5]))))));
  }
}

const _descriptor_19 = new _tuple_0();

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

const _descriptor_20 = new _tuple_1();

class _tuple_2 {
  alignment() {
    return _descriptor_0.alignment().concat(_descriptor_0.alignment().concat(_descriptor_0.alignment().concat(_descriptor_1.alignment())));
  }
  fromValue(value_0) {
    return [
      _descriptor_0.fromValue(value_0),
      _descriptor_0.fromValue(value_0),
      _descriptor_0.fromValue(value_0),
      _descriptor_1.fromValue(value_0)
    ]
  }
  toValue(value_0) {
    return _descriptor_0.toValue(value_0[0]).concat(_descriptor_0.toValue(value_0[1]).concat(_descriptor_0.toValue(value_0[2]).concat(_descriptor_1.toValue(value_0[3]))));
  }
}

const _descriptor_21 = new _tuple_2();

class _tuple_3 {
  alignment() {
    return _descriptor_0.alignment().concat(_descriptor_4.alignment().concat(_descriptor_0.alignment().concat(_descriptor_0.alignment().concat(_descriptor_1.alignment().concat(_descriptor_1.alignment().concat(_descriptor_8.alignment().concat(_descriptor_0.alignment().concat(_descriptor_0.alignment().concat(_descriptor_0.alignment().concat(_descriptor_0.alignment().concat(_descriptor_0.alignment().concat(_descriptor_0.alignment().concat(_descriptor_5.alignment())))))))))))));
  }
  fromValue(value_0) {
    return [
      _descriptor_0.fromValue(value_0),
      _descriptor_4.fromValue(value_0),
      _descriptor_0.fromValue(value_0),
      _descriptor_0.fromValue(value_0),
      _descriptor_1.fromValue(value_0),
      _descriptor_1.fromValue(value_0),
      _descriptor_8.fromValue(value_0),
      _descriptor_0.fromValue(value_0),
      _descriptor_0.fromValue(value_0),
      _descriptor_0.fromValue(value_0),
      _descriptor_0.fromValue(value_0),
      _descriptor_0.fromValue(value_0),
      _descriptor_0.fromValue(value_0),
      _descriptor_5.fromValue(value_0)
    ]
  }
  toValue(value_0) {
    return _descriptor_0.toValue(value_0[0]).concat(_descriptor_4.toValue(value_0[1]).concat(_descriptor_0.toValue(value_0[2]).concat(_descriptor_0.toValue(value_0[3]).concat(_descriptor_1.toValue(value_0[4]).concat(_descriptor_1.toValue(value_0[5]).concat(_descriptor_8.toValue(value_0[6]).concat(_descriptor_0.toValue(value_0[7]).concat(_descriptor_0.toValue(value_0[8]).concat(_descriptor_0.toValue(value_0[9]).concat(_descriptor_0.toValue(value_0[10]).concat(_descriptor_0.toValue(value_0[11]).concat(_descriptor_0.toValue(value_0[12]).concat(_descriptor_5.toValue(value_0[13]))))))))))))));
  }
}

const _descriptor_22 = new _tuple_3();

const _descriptor_23 = new __compactRuntime.CompactTypeVector(2, _descriptor_16);

class _tuple_4 {
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

const _descriptor_24 = new _tuple_4();

class _Either_1 {
  alignment() {
    return _descriptor_2.alignment().concat(_descriptor_0.alignment().concat(_descriptor_0.alignment()));
  }
  fromValue(value_0) {
    return {
      is_left: _descriptor_2.fromValue(value_0),
      left: _descriptor_0.fromValue(value_0),
      right: _descriptor_0.fromValue(value_0)
    }
  }
  toValue(value_0) {
    return _descriptor_2.toValue(value_0.is_left).concat(_descriptor_0.toValue(value_0.left).concat(_descriptor_0.toValue(value_0.right)));
  }
}

const _descriptor_25 = new _Either_1();

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
      deriveEscrowCoinCommitment(context, ...args_1) {
        return { result: pureCircuits.deriveEscrowCoinCommitment(...args_1), context };
      },
      deriveCampaignCommitment(context, ...args_1) {
        return { result: pureCircuits.deriveCampaignCommitment(...args_1), context };
      },
      deriveContributionNullifier(context, ...args_1) {
        return { result: pureCircuits.deriveContributionNullifier(...args_1), context };
      },
      deriveContributionId(context, ...args_1) {
        return { result: pureCircuits.deriveContributionId(...args_1), context };
      },
      deriveContributionReceiptCommitment(context, ...args_1) {
        return { result: pureCircuits.deriveContributionReceiptCommitment(...args_1), context };
      },
      deriveContributionClaimNullifier(context, ...args_1) {
        return { result: pureCircuits.deriveContributionClaimNullifier(...args_1), context };
      },
      createCampaign: (...args_1) => {
        if (args_1.length !== 5) {
          throw new __compactRuntime.CompactError(`createCampaign: expected 5 arguments (as invoked from Typescript), received ${args_1.length}`);
        }
        const contextOrig_0 = args_1[0];
        const campaignId_0 = args_1[1];
        const campaignCommitment_0 = args_1[2];
        const merchantAuthorizationCommitment_0 = args_1[3];
        const expiry_0 = args_1[4];
        if (!(typeof(contextOrig_0) === 'object' && contextOrig_0.currentQueryContext != undefined)) {
          __compactRuntime.typeError('createCampaign',
                                     'argument 1 (as invoked from Typescript)',
                                     'lumapay-campaigns.compact line 145 char 1',
                                     'CircuitContext',
                                     contextOrig_0)
        }
        if (!(campaignId_0.buffer instanceof ArrayBuffer && campaignId_0.BYTES_PER_ELEMENT === 1 && campaignId_0.length === 32)) {
          __compactRuntime.typeError('createCampaign',
                                     'argument 1 (argument 2 as invoked from Typescript)',
                                     'lumapay-campaigns.compact line 145 char 1',
                                     'Bytes<32>',
                                     campaignId_0)
        }
        if (!(campaignCommitment_0.buffer instanceof ArrayBuffer && campaignCommitment_0.BYTES_PER_ELEMENT === 1 && campaignCommitment_0.length === 32)) {
          __compactRuntime.typeError('createCampaign',
                                     'argument 2 (argument 3 as invoked from Typescript)',
                                     'lumapay-campaigns.compact line 145 char 1',
                                     'Bytes<32>',
                                     campaignCommitment_0)
        }
        if (!(merchantAuthorizationCommitment_0.buffer instanceof ArrayBuffer && merchantAuthorizationCommitment_0.BYTES_PER_ELEMENT === 1 && merchantAuthorizationCommitment_0.length === 32)) {
          __compactRuntime.typeError('createCampaign',
                                     'argument 3 (argument 4 as invoked from Typescript)',
                                     'lumapay-campaigns.compact line 145 char 1',
                                     'Bytes<32>',
                                     merchantAuthorizationCommitment_0)
        }
        if (!(typeof(expiry_0) === 'bigint' && expiry_0 >= 0n && expiry_0 <= 18446744073709551615n)) {
          __compactRuntime.typeError('createCampaign',
                                     'argument 4 (argument 5 as invoked from Typescript)',
                                     'lumapay-campaigns.compact line 145 char 1',
                                     'Uint<0..18446744073709551616>',
                                     expiry_0)
        }
        const context = { ...contextOrig_0, gasCost: __compactRuntime.emptyRunningCost() };
        const partialProofData = {
          input: {
            value: _descriptor_0.toValue(campaignId_0).concat(_descriptor_0.toValue(campaignCommitment_0).concat(_descriptor_0.toValue(merchantAuthorizationCommitment_0).concat(_descriptor_5.toValue(expiry_0)))),
            alignment: _descriptor_0.alignment().concat(_descriptor_0.alignment().concat(_descriptor_0.alignment().concat(_descriptor_5.alignment())))
          },
          output: undefined,
          publicTranscript: [],
          privateTranscriptOutputs: []
        };
        const result_0 = this._createCampaign_0(context,
                                                partialProofData,
                                                campaignId_0,
                                                campaignCommitment_0,
                                                merchantAuthorizationCommitment_0,
                                                expiry_0);
        partialProofData.output = { value: [], alignment: [] };
        return { result: result_0, context: context, proofData: partialProofData, gasCost: context.gasCost };
      },
      contribute: (...args_1) => {
        if (args_1.length !== 15) {
          throw new __compactRuntime.CompactError(`contribute: expected 15 arguments (as invoked from Typescript), received ${args_1.length}`);
        }
        const contextOrig_0 = args_1[0];
        const campaignId_0 = args_1[1];
        const merchantPrivateIdentity_0 = args_1[2];
        const minimumContribution_0 = args_1[3];
        const maximumContribution_0 = args_1[4];
        const acceptedTokenCount_0 = args_1[5];
        const acceptedTokenA_0 = args_1[6];
        const acceptedTokenB_0 = args_1[7];
        const acceptedTokenC_0 = args_1[8];
        const acceptedTokenD_0 = args_1[9];
        const campaignNonce_0 = args_1[10];
        const campaignRandomness_0 = args_1[11];
        const contributionSecret_0 = args_1[12];
        const receiptSecret_0 = args_1[13];
        const coin_0 = args_1[14];
        if (!(typeof(contextOrig_0) === 'object' && contextOrig_0.currentQueryContext != undefined)) {
          __compactRuntime.typeError('contribute',
                                     'argument 1 (as invoked from Typescript)',
                                     'lumapay-campaigns.compact line 171 char 1',
                                     'CircuitContext',
                                     contextOrig_0)
        }
        if (!(campaignId_0.buffer instanceof ArrayBuffer && campaignId_0.BYTES_PER_ELEMENT === 1 && campaignId_0.length === 32)) {
          __compactRuntime.typeError('contribute',
                                     'argument 1 (argument 2 as invoked from Typescript)',
                                     'lumapay-campaigns.compact line 171 char 1',
                                     'Bytes<32>',
                                     campaignId_0)
        }
        if (!(merchantPrivateIdentity_0.buffer instanceof ArrayBuffer && merchantPrivateIdentity_0.BYTES_PER_ELEMENT === 1 && merchantPrivateIdentity_0.length === 32)) {
          __compactRuntime.typeError('contribute',
                                     'argument 2 (argument 3 as invoked from Typescript)',
                                     'lumapay-campaigns.compact line 171 char 1',
                                     'Bytes<32>',
                                     merchantPrivateIdentity_0)
        }
        if (!(typeof(minimumContribution_0) === 'bigint' && minimumContribution_0 >= 0n && minimumContribution_0 <= 340282366920938463463374607431768211455n)) {
          __compactRuntime.typeError('contribute',
                                     'argument 3 (argument 4 as invoked from Typescript)',
                                     'lumapay-campaigns.compact line 171 char 1',
                                     'Uint<0..340282366920938463463374607431768211456>',
                                     minimumContribution_0)
        }
        if (!(typeof(maximumContribution_0) === 'bigint' && maximumContribution_0 >= 0n && maximumContribution_0 <= 340282366920938463463374607431768211455n)) {
          __compactRuntime.typeError('contribute',
                                     'argument 4 (argument 5 as invoked from Typescript)',
                                     'lumapay-campaigns.compact line 171 char 1',
                                     'Uint<0..340282366920938463463374607431768211456>',
                                     maximumContribution_0)
        }
        if (!(typeof(acceptedTokenCount_0) === 'bigint' && acceptedTokenCount_0 >= 0n && acceptedTokenCount_0 <= 255n)) {
          __compactRuntime.typeError('contribute',
                                     'argument 5 (argument 6 as invoked from Typescript)',
                                     'lumapay-campaigns.compact line 171 char 1',
                                     'Uint<0..256>',
                                     acceptedTokenCount_0)
        }
        if (!(acceptedTokenA_0.buffer instanceof ArrayBuffer && acceptedTokenA_0.BYTES_PER_ELEMENT === 1 && acceptedTokenA_0.length === 32)) {
          __compactRuntime.typeError('contribute',
                                     'argument 6 (argument 7 as invoked from Typescript)',
                                     'lumapay-campaigns.compact line 171 char 1',
                                     'Bytes<32>',
                                     acceptedTokenA_0)
        }
        if (!(acceptedTokenB_0.buffer instanceof ArrayBuffer && acceptedTokenB_0.BYTES_PER_ELEMENT === 1 && acceptedTokenB_0.length === 32)) {
          __compactRuntime.typeError('contribute',
                                     'argument 7 (argument 8 as invoked from Typescript)',
                                     'lumapay-campaigns.compact line 171 char 1',
                                     'Bytes<32>',
                                     acceptedTokenB_0)
        }
        if (!(acceptedTokenC_0.buffer instanceof ArrayBuffer && acceptedTokenC_0.BYTES_PER_ELEMENT === 1 && acceptedTokenC_0.length === 32)) {
          __compactRuntime.typeError('contribute',
                                     'argument 8 (argument 9 as invoked from Typescript)',
                                     'lumapay-campaigns.compact line 171 char 1',
                                     'Bytes<32>',
                                     acceptedTokenC_0)
        }
        if (!(acceptedTokenD_0.buffer instanceof ArrayBuffer && acceptedTokenD_0.BYTES_PER_ELEMENT === 1 && acceptedTokenD_0.length === 32)) {
          __compactRuntime.typeError('contribute',
                                     'argument 9 (argument 10 as invoked from Typescript)',
                                     'lumapay-campaigns.compact line 171 char 1',
                                     'Bytes<32>',
                                     acceptedTokenD_0)
        }
        if (!(campaignNonce_0.buffer instanceof ArrayBuffer && campaignNonce_0.BYTES_PER_ELEMENT === 1 && campaignNonce_0.length === 32)) {
          __compactRuntime.typeError('contribute',
                                     'argument 10 (argument 11 as invoked from Typescript)',
                                     'lumapay-campaigns.compact line 171 char 1',
                                     'Bytes<32>',
                                     campaignNonce_0)
        }
        if (!(campaignRandomness_0.buffer instanceof ArrayBuffer && campaignRandomness_0.BYTES_PER_ELEMENT === 1 && campaignRandomness_0.length === 32)) {
          __compactRuntime.typeError('contribute',
                                     'argument 11 (argument 12 as invoked from Typescript)',
                                     'lumapay-campaigns.compact line 171 char 1',
                                     'Bytes<32>',
                                     campaignRandomness_0)
        }
        if (!(contributionSecret_0.buffer instanceof ArrayBuffer && contributionSecret_0.BYTES_PER_ELEMENT === 1 && contributionSecret_0.length === 32)) {
          __compactRuntime.typeError('contribute',
                                     'argument 12 (argument 13 as invoked from Typescript)',
                                     'lumapay-campaigns.compact line 171 char 1',
                                     'Bytes<32>',
                                     contributionSecret_0)
        }
        if (!(receiptSecret_0.buffer instanceof ArrayBuffer && receiptSecret_0.BYTES_PER_ELEMENT === 1 && receiptSecret_0.length === 32)) {
          __compactRuntime.typeError('contribute',
                                     'argument 13 (argument 14 as invoked from Typescript)',
                                     'lumapay-campaigns.compact line 171 char 1',
                                     'Bytes<32>',
                                     receiptSecret_0)
        }
        if (!(typeof(coin_0) === 'object' && coin_0.nonce.buffer instanceof ArrayBuffer && coin_0.nonce.BYTES_PER_ELEMENT === 1 && coin_0.nonce.length === 32 && coin_0.color.buffer instanceof ArrayBuffer && coin_0.color.BYTES_PER_ELEMENT === 1 && coin_0.color.length === 32 && typeof(coin_0.value) === 'bigint' && coin_0.value >= 0n && coin_0.value <= 340282366920938463463374607431768211455n)) {
          __compactRuntime.typeError('contribute',
                                     'argument 14 (argument 15 as invoked from Typescript)',
                                     'lumapay-campaigns.compact line 171 char 1',
                                     'struct ShieldedCoinInfo<nonce: Bytes<32>, color: Bytes<32>, value: Uint<0..340282366920938463463374607431768211456>>',
                                     coin_0)
        }
        const context = { ...contextOrig_0, gasCost: __compactRuntime.emptyRunningCost() };
        const partialProofData = {
          input: {
            value: _descriptor_0.toValue(campaignId_0).concat(_descriptor_0.toValue(merchantPrivateIdentity_0).concat(_descriptor_1.toValue(minimumContribution_0).concat(_descriptor_1.toValue(maximumContribution_0).concat(_descriptor_8.toValue(acceptedTokenCount_0).concat(_descriptor_0.toValue(acceptedTokenA_0).concat(_descriptor_0.toValue(acceptedTokenB_0).concat(_descriptor_0.toValue(acceptedTokenC_0).concat(_descriptor_0.toValue(acceptedTokenD_0).concat(_descriptor_0.toValue(campaignNonce_0).concat(_descriptor_0.toValue(campaignRandomness_0).concat(_descriptor_0.toValue(contributionSecret_0).concat(_descriptor_0.toValue(receiptSecret_0).concat(_descriptor_9.toValue(coin_0)))))))))))))),
            alignment: _descriptor_0.alignment().concat(_descriptor_0.alignment().concat(_descriptor_1.alignment().concat(_descriptor_1.alignment().concat(_descriptor_8.alignment().concat(_descriptor_0.alignment().concat(_descriptor_0.alignment().concat(_descriptor_0.alignment().concat(_descriptor_0.alignment().concat(_descriptor_0.alignment().concat(_descriptor_0.alignment().concat(_descriptor_0.alignment().concat(_descriptor_0.alignment().concat(_descriptor_9.alignment())))))))))))))
          },
          output: undefined,
          publicTranscript: [],
          privateTranscriptOutputs: []
        };
        const result_0 = this._contribute_0(context,
                                            partialProofData,
                                            campaignId_0,
                                            merchantPrivateIdentity_0,
                                            minimumContribution_0,
                                            maximumContribution_0,
                                            acceptedTokenCount_0,
                                            acceptedTokenA_0,
                                            acceptedTokenB_0,
                                            acceptedTokenC_0,
                                            acceptedTokenD_0,
                                            campaignNonce_0,
                                            campaignRandomness_0,
                                            contributionSecret_0,
                                            receiptSecret_0,
                                            coin_0);
        partialProofData.output = { value: [], alignment: [] };
        return { result: result_0, context: context, proofData: partialProofData, gasCost: context.gasCost };
      },
      claimContribution: (...args_1) => {
        if (args_1.length !== 4) {
          throw new __compactRuntime.CompactError(`claimContribution: expected 4 arguments (as invoked from Typescript), received ${args_1.length}`);
        }
        const contextOrig_0 = args_1[0];
        const contributionId_0 = args_1[1];
        const merchantClaimSecret_0 = args_1[2];
        const escrowCoin_0 = args_1[3];
        if (!(typeof(contextOrig_0) === 'object' && contextOrig_0.currentQueryContext != undefined)) {
          __compactRuntime.typeError('claimContribution',
                                     'argument 1 (as invoked from Typescript)',
                                     'lumapay-campaigns.compact line 260 char 1',
                                     'CircuitContext',
                                     contextOrig_0)
        }
        if (!(contributionId_0.buffer instanceof ArrayBuffer && contributionId_0.BYTES_PER_ELEMENT === 1 && contributionId_0.length === 32)) {
          __compactRuntime.typeError('claimContribution',
                                     'argument 1 (argument 2 as invoked from Typescript)',
                                     'lumapay-campaigns.compact line 260 char 1',
                                     'Bytes<32>',
                                     contributionId_0)
        }
        if (!(merchantClaimSecret_0.buffer instanceof ArrayBuffer && merchantClaimSecret_0.BYTES_PER_ELEMENT === 1 && merchantClaimSecret_0.length === 32)) {
          __compactRuntime.typeError('claimContribution',
                                     'argument 2 (argument 3 as invoked from Typescript)',
                                     'lumapay-campaigns.compact line 260 char 1',
                                     'Bytes<32>',
                                     merchantClaimSecret_0)
        }
        if (!(typeof(escrowCoin_0) === 'object' && escrowCoin_0.nonce.buffer instanceof ArrayBuffer && escrowCoin_0.nonce.BYTES_PER_ELEMENT === 1 && escrowCoin_0.nonce.length === 32 && escrowCoin_0.color.buffer instanceof ArrayBuffer && escrowCoin_0.color.BYTES_PER_ELEMENT === 1 && escrowCoin_0.color.length === 32 && typeof(escrowCoin_0.value) === 'bigint' && escrowCoin_0.value >= 0n && escrowCoin_0.value <= 340282366920938463463374607431768211455n && typeof(escrowCoin_0.mt_index) === 'bigint' && escrowCoin_0.mt_index >= 0n && escrowCoin_0.mt_index <= 18446744073709551615n)) {
          __compactRuntime.typeError('claimContribution',
                                     'argument 3 (argument 4 as invoked from Typescript)',
                                     'lumapay-campaigns.compact line 260 char 1',
                                     'struct QualifiedShieldedCoinInfo<nonce: Bytes<32>, color: Bytes<32>, value: Uint<0..340282366920938463463374607431768211456>, mt_index: Uint<0..18446744073709551616>>',
                                     escrowCoin_0)
        }
        const context = { ...contextOrig_0, gasCost: __compactRuntime.emptyRunningCost() };
        const partialProofData = {
          input: {
            value: _descriptor_0.toValue(contributionId_0).concat(_descriptor_0.toValue(merchantClaimSecret_0).concat(_descriptor_10.toValue(escrowCoin_0))),
            alignment: _descriptor_0.alignment().concat(_descriptor_0.alignment().concat(_descriptor_10.alignment()))
          },
          output: undefined,
          publicTranscript: [],
          privateTranscriptOutputs: []
        };
        const result_0 = this._claimContribution_0(context,
                                                   partialProofData,
                                                   contributionId_0,
                                                   merchantClaimSecret_0,
                                                   escrowCoin_0);
        partialProofData.output = { value: _descriptor_12.toValue(result_0), alignment: _descriptor_12.alignment() };
        return { result: result_0, context: context, proofData: partialProofData, gasCost: context.gasCost };
      },
      cancelCampaign: (...args_1) => {
        if (args_1.length !== 3) {
          throw new __compactRuntime.CompactError(`cancelCampaign: expected 3 arguments (as invoked from Typescript), received ${args_1.length}`);
        }
        const contextOrig_0 = args_1[0];
        const campaignId_0 = args_1[1];
        const merchantClaimSecret_0 = args_1[2];
        if (!(typeof(contextOrig_0) === 'object' && contextOrig_0.currentQueryContext != undefined)) {
          __compactRuntime.typeError('cancelCampaign',
                                     'argument 1 (as invoked from Typescript)',
                                     'lumapay-campaigns.compact line 297 char 1',
                                     'CircuitContext',
                                     contextOrig_0)
        }
        if (!(campaignId_0.buffer instanceof ArrayBuffer && campaignId_0.BYTES_PER_ELEMENT === 1 && campaignId_0.length === 32)) {
          __compactRuntime.typeError('cancelCampaign',
                                     'argument 1 (argument 2 as invoked from Typescript)',
                                     'lumapay-campaigns.compact line 297 char 1',
                                     'Bytes<32>',
                                     campaignId_0)
        }
        if (!(merchantClaimSecret_0.buffer instanceof ArrayBuffer && merchantClaimSecret_0.BYTES_PER_ELEMENT === 1 && merchantClaimSecret_0.length === 32)) {
          __compactRuntime.typeError('cancelCampaign',
                                     'argument 2 (argument 3 as invoked from Typescript)',
                                     'lumapay-campaigns.compact line 297 char 1',
                                     'Bytes<32>',
                                     merchantClaimSecret_0)
        }
        const context = { ...contextOrig_0, gasCost: __compactRuntime.emptyRunningCost() };
        const partialProofData = {
          input: {
            value: _descriptor_0.toValue(campaignId_0).concat(_descriptor_0.toValue(merchantClaimSecret_0)),
            alignment: _descriptor_0.alignment().concat(_descriptor_0.alignment())
          },
          output: undefined,
          publicTranscript: [],
          privateTranscriptOutputs: []
        };
        const result_0 = this._cancelCampaign_0(context,
                                                partialProofData,
                                                campaignId_0,
                                                merchantClaimSecret_0);
        partialProofData.output = { value: [], alignment: [] };
        return { result: result_0, context: context, proofData: partialProofData, gasCost: context.gasCost };
      },
      expireCampaign: (...args_1) => {
        if (args_1.length !== 2) {
          throw new __compactRuntime.CompactError(`expireCampaign: expected 2 arguments (as invoked from Typescript), received ${args_1.length}`);
        }
        const contextOrig_0 = args_1[0];
        const campaignId_0 = args_1[1];
        if (!(typeof(contextOrig_0) === 'object' && contextOrig_0.currentQueryContext != undefined)) {
          __compactRuntime.typeError('expireCampaign',
                                     'argument 1 (as invoked from Typescript)',
                                     'lumapay-campaigns.compact line 315 char 1',
                                     'CircuitContext',
                                     contextOrig_0)
        }
        if (!(campaignId_0.buffer instanceof ArrayBuffer && campaignId_0.BYTES_PER_ELEMENT === 1 && campaignId_0.length === 32)) {
          __compactRuntime.typeError('expireCampaign',
                                     'argument 1 (argument 2 as invoked from Typescript)',
                                     'lumapay-campaigns.compact line 315 char 1',
                                     'Bytes<32>',
                                     campaignId_0)
        }
        const context = { ...contextOrig_0, gasCost: __compactRuntime.emptyRunningCost() };
        const partialProofData = {
          input: {
            value: _descriptor_0.toValue(campaignId_0),
            alignment: _descriptor_0.alignment()
          },
          output: undefined,
          publicTranscript: [],
          privateTranscriptOutputs: []
        };
        const result_0 = this._expireCampaign_0(context,
                                                partialProofData,
                                                campaignId_0);
        partialProofData.output = { value: [], alignment: [] };
        return { result: result_0, context: context, proofData: partialProofData, gasCost: context.gasCost };
      },
      verifyContributionReceipt(context, ...args_1) {
        return { result: pureCircuits.verifyContributionReceipt(...args_1), context };
      },
      proveContributionSettlement: (...args_1) => {
        if (args_1.length !== 5) {
          throw new __compactRuntime.CompactError(`proveContributionSettlement: expected 5 arguments (as invoked from Typescript), received ${args_1.length}`);
        }
        const contextOrig_0 = args_1[0];
        const contributionId_0 = args_1[1];
        const paidAmount_0 = args_1[2];
        const paidToken_0 = args_1[3];
        const receiptSecret_0 = args_1[4];
        if (!(typeof(contextOrig_0) === 'object' && contextOrig_0.currentQueryContext != undefined)) {
          __compactRuntime.typeError('proveContributionSettlement',
                                     'argument 1 (as invoked from Typescript)',
                                     'lumapay-campaigns.compact line 347 char 1',
                                     'CircuitContext',
                                     contextOrig_0)
        }
        if (!(contributionId_0.buffer instanceof ArrayBuffer && contributionId_0.BYTES_PER_ELEMENT === 1 && contributionId_0.length === 32)) {
          __compactRuntime.typeError('proveContributionSettlement',
                                     'argument 1 (argument 2 as invoked from Typescript)',
                                     'lumapay-campaigns.compact line 347 char 1',
                                     'Bytes<32>',
                                     contributionId_0)
        }
        if (!(typeof(paidAmount_0) === 'bigint' && paidAmount_0 >= 0n && paidAmount_0 <= 340282366920938463463374607431768211455n)) {
          __compactRuntime.typeError('proveContributionSettlement',
                                     'argument 2 (argument 3 as invoked from Typescript)',
                                     'lumapay-campaigns.compact line 347 char 1',
                                     'Uint<0..340282366920938463463374607431768211456>',
                                     paidAmount_0)
        }
        if (!(paidToken_0.buffer instanceof ArrayBuffer && paidToken_0.BYTES_PER_ELEMENT === 1 && paidToken_0.length === 32)) {
          __compactRuntime.typeError('proveContributionSettlement',
                                     'argument 3 (argument 4 as invoked from Typescript)',
                                     'lumapay-campaigns.compact line 347 char 1',
                                     'Bytes<32>',
                                     paidToken_0)
        }
        if (!(receiptSecret_0.buffer instanceof ArrayBuffer && receiptSecret_0.BYTES_PER_ELEMENT === 1 && receiptSecret_0.length === 32)) {
          __compactRuntime.typeError('proveContributionSettlement',
                                     'argument 4 (argument 5 as invoked from Typescript)',
                                     'lumapay-campaigns.compact line 347 char 1',
                                     'Bytes<32>',
                                     receiptSecret_0)
        }
        const context = { ...contextOrig_0, gasCost: __compactRuntime.emptyRunningCost() };
        const partialProofData = {
          input: {
            value: _descriptor_0.toValue(contributionId_0).concat(_descriptor_1.toValue(paidAmount_0).concat(_descriptor_0.toValue(paidToken_0).concat(_descriptor_0.toValue(receiptSecret_0)))),
            alignment: _descriptor_0.alignment().concat(_descriptor_1.alignment().concat(_descriptor_0.alignment().concat(_descriptor_0.alignment())))
          },
          output: undefined,
          publicTranscript: [],
          privateTranscriptOutputs: []
        };
        const result_0 = this._proveContributionSettlement_0(context,
                                                             partialProofData,
                                                             contributionId_0,
                                                             paidAmount_0,
                                                             paidToken_0,
                                                             receiptSecret_0);
        partialProofData.output = { value: [], alignment: [] };
        return { result: result_0, context: context, proofData: partialProofData, gasCost: context.gasCost };
      }
    };
    this.impureCircuits = {
      createCampaign: this.circuits.createCampaign,
      contribute: this.circuits.contribute,
      claimContribution: this.circuits.claimContribution,
      cancelCampaign: this.circuits.cancelCampaign,
      expireCampaign: this.circuits.expireCampaign,
      proveContributionSettlement: this.circuits.proveContributionSettlement
    };
    this.provableCircuits = {
      createCampaign: this.circuits.createCampaign,
      contribute: this.circuits.contribute,
      claimContribution: this.circuits.claimContribution,
      cancelCampaign: this.circuits.cancelCampaign,
      expireCampaign: this.circuits.expireCampaign,
      proveContributionSettlement: this.circuits.proveContributionSettlement
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
    stateValue_0 = stateValue_0.arrayPush(__compactRuntime.StateValue.newNull());
    state_0.data = new __compactRuntime.ChargedState(stateValue_0);
    state_0.setOperation('createCampaign', new __compactRuntime.ContractOperation());
    state_0.setOperation('contribute', new __compactRuntime.ContractOperation());
    state_0.setOperation('claimContribution', new __compactRuntime.ContractOperation());
    state_0.setOperation('cancelCampaign', new __compactRuntime.ContractOperation());
    state_0.setOperation('expireCampaign', new __compactRuntime.ContractOperation());
    state_0.setOperation('proveContributionSettlement', new __compactRuntime.ContractOperation());
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
                                                 value: __compactRuntime.StateValue.newCell({ value: _descriptor_8.toValue(0n),
                                                                                              alignment: _descriptor_8.alignment() }).encode() } },
                                       { push: { storage: true,
                                                 value: __compactRuntime.StateValue.newMap(
                                                          new __compactRuntime.StateMap()
                                                        ).encode() } },
                                       { ins: { cached: false, n: 1 } }]);
    __compactRuntime.queryLedgerState(context,
                                      partialProofData,
                                      [
                                       { push: { storage: false,
                                                 value: __compactRuntime.StateValue.newCell({ value: _descriptor_8.toValue(1n),
                                                                                              alignment: _descriptor_8.alignment() }).encode() } },
                                       { push: { storage: true,
                                                 value: __compactRuntime.StateValue.newMap(
                                                          new __compactRuntime.StateMap()
                                                        ).encode() } },
                                       { ins: { cached: false, n: 1 } }]);
    __compactRuntime.queryLedgerState(context,
                                      partialProofData,
                                      [
                                       { push: { storage: false,
                                                 value: __compactRuntime.StateValue.newCell({ value: _descriptor_8.toValue(2n),
                                                                                              alignment: _descriptor_8.alignment() }).encode() } },
                                       { push: { storage: true,
                                                 value: __compactRuntime.StateValue.newMap(
                                                          new __compactRuntime.StateMap()
                                                        ).encode() } },
                                       { ins: { cached: false, n: 1 } }]);
    __compactRuntime.queryLedgerState(context,
                                      partialProofData,
                                      [
                                       { push: { storage: false,
                                                 value: __compactRuntime.StateValue.newCell({ value: _descriptor_8.toValue(3n),
                                                                                              alignment: _descriptor_8.alignment() }).encode() } },
                                       { push: { storage: true,
                                                 value: __compactRuntime.StateValue.newMap(
                                                          new __compactRuntime.StateMap()
                                                        ).encode() } },
                                       { ins: { cached: false, n: 1 } }]);
    __compactRuntime.queryLedgerState(context,
                                      partialProofData,
                                      [
                                       { push: { storage: false,
                                                 value: __compactRuntime.StateValue.newCell({ value: _descriptor_8.toValue(4n),
                                                                                              alignment: _descriptor_8.alignment() }).encode() } },
                                       { push: { storage: true,
                                                 value: __compactRuntime.StateValue.newMap(
                                                          new __compactRuntime.StateMap()
                                                        ).encode() } },
                                       { ins: { cached: false, n: 1 } }]);
    __compactRuntime.queryLedgerState(context,
                                      partialProofData,
                                      [
                                       { push: { storage: false,
                                                 value: __compactRuntime.StateValue.newCell({ value: _descriptor_8.toValue(5n),
                                                                                              alignment: _descriptor_8.alignment() }).encode() } },
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
    const recipient_0 = this._right_0(_descriptor_14.fromValue(__compactRuntime.queryLedgerState(context,
                                                                                                 partialProofData,
                                                                                                 [
                                                                                                  { dup: { n: 2 } },
                                                                                                  { idx: { cached: true,
                                                                                                           pushPath: false,
                                                                                                           path: [
                                                                                                                  { tag: 'value',
                                                                                                                    value: { value: _descriptor_8.toValue(0n),
                                                                                                                             alignment: _descriptor_8.alignment() } }] } },
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
                                                         value: { value: _descriptor_8.toValue(1n),
                                                                  alignment: _descriptor_8.alignment() } }] } },
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
    const selfAddr_0 = _descriptor_14.fromValue(__compactRuntime.queryLedgerState(context,
                                                                                  partialProofData,
                                                                                  [
                                                                                   { dup: { n: 2 } },
                                                                                   { idx: { cached: true,
                                                                                            pushPath: false,
                                                                                            path: [
                                                                                                   { tag: 'value',
                                                                                                     value: { value: _descriptor_8.toValue(0n),
                                                                                                              alignment: _descriptor_8.alignment() } }] } },
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
                                                         value: { value: _descriptor_8.toValue(0n),
                                                                  alignment: _descriptor_8.alignment() } }] } },
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
                                                         value: { value: _descriptor_8.toValue(2n),
                                                                  alignment: _descriptor_8.alignment() } }] } },
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
                                                           value: { value: _descriptor_8.toValue(1n),
                                                                    alignment: _descriptor_8.alignment() } }] } },
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
                                                           value: { value: _descriptor_8.toValue(2n),
                                                                    alignment: _descriptor_8.alignment() } }] } },
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
                                                           value: { value: _descriptor_8.toValue(1n),
                                                                    alignment: _descriptor_8.alignment() } }] } },
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
    return _descriptor_2.fromValue(__compactRuntime.queryLedgerState(context,
                                                                     partialProofData,
                                                                     [
                                                                      { dup: { n: 2 } },
                                                                      { idx: { cached: true,
                                                                               pushPath: false,
                                                                               path: [
                                                                                      { tag: 'value',
                                                                                        value: { value: _descriptor_8.toValue(2n),
                                                                                                 alignment: _descriptor_8.alignment() } }] } },
                                                                      { push: { storage: false,
                                                                                value: __compactRuntime.StateValue.newCell({ value: _descriptor_5.toValue(time_0),
                                                                                                                             alignment: _descriptor_5.alignment() }).encode() } },
                                                                      'lt',
                                                                      { popeq: { cached: true,
                                                                                 result: undefined } }]).value);
  }
  _blockTimeGte_0(context, partialProofData, time_0) {
    return !this._blockTimeLt_0(context, partialProofData, time_0);
  }
  _transientHash_0(value_0) {
    const result_0 = __compactRuntime.transientHash(_descriptor_23, value_0);
    return result_0;
  }
  _persistentHash_0(value_0) {
    const result_0 = __compactRuntime.persistentHash(_descriptor_24, value_0);
    return result_0;
  }
  _persistentHash_1(value_0) {
    const result_0 = __compactRuntime.persistentHash(_descriptor_21, value_0);
    return result_0;
  }
  _persistentHash_2(value_0) {
    const result_0 = __compactRuntime.persistentHash(_descriptor_22, value_0);
    return result_0;
  }
  _persistentHash_3(value_0) {
    const result_0 = __compactRuntime.persistentHash(_descriptor_19, value_0);
    return result_0;
  }
  _persistentHash_4(value_0) {
    const result_0 = __compactRuntime.persistentHash(_descriptor_20, value_0);
    return result_0;
  }
  _persistentHash_5(value_0) {
    const result_0 = __compactRuntime.persistentHash(_descriptor_18, value_0);
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
      value: _descriptor_13.toValue(result_0),
      alignment: _descriptor_13.alignment()
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
  _deriveEscrowCoinCommitment_0(nonce_0, color_0, value_0) {
    return this._persistentHash_1([new Uint8Array([108, 117, 109, 97, 112, 97, 121, 58, 101, 115, 99, 114, 111, 119, 45, 99, 111, 105, 110, 58, 118, 49, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0]),
                                   nonce_0,
                                   color_0,
                                   value_0]);
  }
  _deriveCampaignCommitment_0(campaignId_0,
                              merchantPrivateIdentity_0,
                              minimumContribution_0,
                              maximumContribution_0,
                              acceptedTokenCount_0,
                              acceptedTokenA_0,
                              acceptedTokenB_0,
                              acceptedTokenC_0,
                              acceptedTokenD_0,
                              campaignNonce_0,
                              randomness_0,
                              expiry_0)
  {
    return this._persistentHash_2([new Uint8Array([108, 117, 109, 97, 112, 97, 121, 58, 99, 97, 109, 112, 97, 105, 103, 110, 45, 99, 111, 109, 109, 105, 116, 109, 101, 110, 116, 58, 118, 49, 0, 0]),
                                   1n,
                                   campaignId_0,
                                   merchantPrivateIdentity_0,
                                   minimumContribution_0,
                                   maximumContribution_0,
                                   acceptedTokenCount_0,
                                   acceptedTokenA_0,
                                   acceptedTokenB_0,
                                   acceptedTokenC_0,
                                   acceptedTokenD_0,
                                   campaignNonce_0,
                                   randomness_0,
                                   expiry_0]);
  }
  _deriveContributionNullifier_0(campaignId_0, contributionSecret_0) {
    return this._persistentHash_4([new Uint8Array([108, 117, 109, 97, 112, 97, 121, 58, 99, 111, 110, 116, 114, 105, 98, 117, 116, 105, 111, 110, 45, 110, 102, 58, 118, 49, 0, 0, 0, 0, 0, 0]),
                                   campaignId_0,
                                   contributionSecret_0]);
  }
  _deriveContributionId_0(campaignId_0, contributionNullifier_0) {
    return this._persistentHash_4([new Uint8Array([108, 117, 109, 97, 112, 97, 121, 58, 99, 111, 110, 116, 114, 105, 98, 117, 116, 105, 111, 110, 45, 105, 100, 58, 118, 49, 0, 0, 0, 0, 0, 0]),
                                   campaignId_0,
                                   contributionNullifier_0]);
  }
  _deriveContributionReceiptCommitment_0(contributionId_0,
                                         contributionNullifier_0,
                                         amount_0,
                                         tokenId_0,
                                         receiptSecret_0)
  {
    return this._persistentHash_3([new Uint8Array([108, 117, 109, 97, 112, 97, 121, 58, 99, 111, 110, 116, 114, 105, 98, 117, 116, 105, 111, 110, 45, 114, 101, 99, 101, 105, 112, 116, 58, 118, 49, 0]),
                                   contributionId_0,
                                   contributionNullifier_0,
                                   amount_0,
                                   tokenId_0,
                                   receiptSecret_0]);
  }
  _deriveContributionClaimNullifier_0(contributionId_0, merchantClaimSecret_0) {
    return this._persistentHash_4([new Uint8Array([108, 117, 109, 97, 112, 97, 121, 58, 99, 111, 110, 116, 114, 105, 98, 117, 116, 105, 111, 110, 45, 99, 108, 97, 105, 109, 58, 118, 49, 0, 0, 0]),
                                   contributionId_0,
                                   merchantClaimSecret_0]);
  }
  _createCampaign_0(context,
                    partialProofData,
                    campaignId_0,
                    campaignCommitment_0,
                    merchantAuthorizationCommitment_0,
                    expiry_0)
  {
    __compactRuntime.assert(!this._equal_2(campaignId_0, new Uint8Array(32)),
                            'campaign id is required');
    __compactRuntime.assert(!this._equal_3(campaignCommitment_0,
                                           new Uint8Array(32)),
                            'campaign commitment is required');
    __compactRuntime.assert(!this._equal_4(merchantAuthorizationCommitment_0,
                                           new Uint8Array(32)),
                            'merchant authorization is required');
    __compactRuntime.assert(!_descriptor_2.fromValue(__compactRuntime.queryLedgerState(context,
                                                                                       partialProofData,
                                                                                       [
                                                                                        { dup: { n: 0 } },
                                                                                        { idx: { cached: false,
                                                                                                 pushPath: false,
                                                                                                 path: [
                                                                                                        { tag: 'value',
                                                                                                          value: { value: _descriptor_8.toValue(0n),
                                                                                                                   alignment: _descriptor_8.alignment() } }] } },
                                                                                        { push: { storage: false,
                                                                                                  value: __compactRuntime.StateValue.newCell({ value: _descriptor_0.toValue(campaignId_0),
                                                                                                                                               alignment: _descriptor_0.alignment() }).encode() } },
                                                                                        'member',
                                                                                        { popeq: { cached: true,
                                                                                                   result: undefined } }]).value),
                            'campaign already exists');
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
                                                         value: { value: _descriptor_8.toValue(0n),
                                                                  alignment: _descriptor_8.alignment() } }] } },
                                       { push: { storage: false,
                                                 value: __compactRuntime.StateValue.newCell({ value: _descriptor_0.toValue(campaignId_0),
                                                                                              alignment: _descriptor_0.alignment() }).encode() } },
                                       { push: { storage: true,
                                                 value: __compactRuntime.StateValue.newNull().encode() } },
                                       { ins: { cached: false, n: 1 } },
                                       { ins: { cached: true, n: 1 } }]);
    const tmp_0 = { commitmentVersion: 1n,
                    commitment: campaignCommitment_0,
                    merchantAuthorization: merchantAuthorizationCommitment_0,
                    expiry: expiry_0,
                    status: 0,
                    contributionCount: 0n };
    __compactRuntime.queryLedgerState(context,
                                      partialProofData,
                                      [
                                       { idx: { cached: false,
                                                pushPath: true,
                                                path: [
                                                       { tag: 'value',
                                                         value: { value: _descriptor_8.toValue(1n),
                                                                  alignment: _descriptor_8.alignment() } }] } },
                                       { push: { storage: false,
                                                 value: __compactRuntime.StateValue.newCell({ value: _descriptor_0.toValue(campaignId_0),
                                                                                              alignment: _descriptor_0.alignment() }).encode() } },
                                       { push: { storage: true,
                                                 value: __compactRuntime.StateValue.newCell({ value: _descriptor_7.toValue(tmp_0),
                                                                                              alignment: _descriptor_7.alignment() }).encode() } },
                                       { ins: { cached: false, n: 1 } },
                                       { ins: { cached: true, n: 1 } }]);
    return [];
  }
  _contribute_0(context,
                partialProofData,
                campaignId_0,
                merchantPrivateIdentity_0,
                minimumContribution_0,
                maximumContribution_0,
                acceptedTokenCount_0,
                acceptedTokenA_0,
                acceptedTokenB_0,
                acceptedTokenC_0,
                acceptedTokenD_0,
                campaignNonce_0,
                campaignRandomness_0,
                contributionSecret_0,
                receiptSecret_0,
                coin_0)
  {
    __compactRuntime.assert(_descriptor_2.fromValue(__compactRuntime.queryLedgerState(context,
                                                                                      partialProofData,
                                                                                      [
                                                                                       { dup: { n: 0 } },
                                                                                       { idx: { cached: false,
                                                                                                pushPath: false,
                                                                                                path: [
                                                                                                       { tag: 'value',
                                                                                                         value: { value: _descriptor_8.toValue(0n),
                                                                                                                  alignment: _descriptor_8.alignment() } }] } },
                                                                                       { push: { storage: false,
                                                                                                 value: __compactRuntime.StateValue.newCell({ value: _descriptor_0.toValue(campaignId_0),
                                                                                                                                              alignment: _descriptor_0.alignment() }).encode() } },
                                                                                       'member',
                                                                                       { popeq: { cached: true,
                                                                                                  result: undefined } }]).value),
                            'campaign does not exist');
    const campaign_0 = _descriptor_7.fromValue(__compactRuntime.queryLedgerState(context,
                                                                                 partialProofData,
                                                                                 [
                                                                                  { dup: { n: 0 } },
                                                                                  { idx: { cached: false,
                                                                                           pushPath: false,
                                                                                           path: [
                                                                                                  { tag: 'value',
                                                                                                    value: { value: _descriptor_8.toValue(1n),
                                                                                                             alignment: _descriptor_8.alignment() } }] } },
                                                                                  { idx: { cached: false,
                                                                                           pushPath: false,
                                                                                           path: [
                                                                                                  { tag: 'value',
                                                                                                    value: { value: _descriptor_0.toValue(campaignId_0),
                                                                                                             alignment: _descriptor_0.alignment() } }] } },
                                                                                  { popeq: { cached: false,
                                                                                             result: undefined } }]).value);
    __compactRuntime.assert(campaign_0.status === 0, 'campaign is not open');
    __compactRuntime.assert(this._blockTimeLt_0(context,
                                                partialProofData,
                                                campaign_0.expiry),
                            'campaign has expired');
    __compactRuntime.assert(minimumContribution_0 > 0n,
                            'minimum contribution must be positive');
    __compactRuntime.assert(maximumContribution_0 >= minimumContribution_0,
                            'invalid contribution range');
    __compactRuntime.assert(acceptedTokenCount_0 >= 1n
                            &&
                            acceptedTokenCount_0 <= 4n,
                            'invalid token policy');
    const expectedCommitment_0 = this._deriveCampaignCommitment_0(campaignId_0,
                                                                  merchantPrivateIdentity_0,
                                                                  minimumContribution_0,
                                                                  maximumContribution_0,
                                                                  acceptedTokenCount_0,
                                                                  acceptedTokenA_0,
                                                                  acceptedTokenB_0,
                                                                  acceptedTokenC_0,
                                                                  acceptedTokenD_0,
                                                                  campaignNonce_0,
                                                                  campaignRandomness_0,
                                                                  campaign_0.expiry);
    __compactRuntime.assert(this._equal_5(expectedCommitment_0,
                                          campaign_0.commitment),
                            'invalid campaign opening');
    let t_0, t_1;
    __compactRuntime.assert((t_1 = coin_0.value, t_1 >= minimumContribution_0)
                            &&
                            (t_0 = coin_0.value, t_0 <= maximumContribution_0),
                            'contribution amount outside campaign range');
    const tokenAllowed_0 = this._equal_6(coin_0.color, acceptedTokenA_0)
                           ||
                           acceptedTokenCount_0 >= 2n
                           &&
                           this._equal_7(coin_0.color, acceptedTokenB_0)
                           ||
                           acceptedTokenCount_0 >= 3n
                           &&
                           this._equal_8(coin_0.color, acceptedTokenC_0)
                           ||
                           acceptedTokenCount_0 >= 4n
                           &&
                           this._equal_9(coin_0.color, acceptedTokenD_0);
    __compactRuntime.assert(tokenAllowed_0, 'token not accepted by campaign');
    const nullifier_0 = this._deriveContributionNullifier_0(campaignId_0,
                                                            contributionSecret_0);
    const contributionId_0 = this._deriveContributionId_0(campaignId_0,
                                                          nullifier_0);
    __compactRuntime.assert(!_descriptor_2.fromValue(__compactRuntime.queryLedgerState(context,
                                                                                       partialProofData,
                                                                                       [
                                                                                        { dup: { n: 0 } },
                                                                                        { idx: { cached: false,
                                                                                                 pushPath: false,
                                                                                                 path: [
                                                                                                        { tag: 'value',
                                                                                                          value: { value: _descriptor_8.toValue(4n),
                                                                                                                   alignment: _descriptor_8.alignment() } }] } },
                                                                                        { push: { storage: false,
                                                                                                  value: __compactRuntime.StateValue.newCell({ value: _descriptor_0.toValue(nullifier_0),
                                                                                                                                               alignment: _descriptor_0.alignment() }).encode() } },
                                                                                        'member',
                                                                                        { popeq: { cached: true,
                                                                                                   result: undefined } }]).value),
                            'contribution replay');
    __compactRuntime.assert(!_descriptor_2.fromValue(__compactRuntime.queryLedgerState(context,
                                                                                       partialProofData,
                                                                                       [
                                                                                        { dup: { n: 0 } },
                                                                                        { idx: { cached: false,
                                                                                                 pushPath: false,
                                                                                                 path: [
                                                                                                        { tag: 'value',
                                                                                                          value: { value: _descriptor_8.toValue(2n),
                                                                                                                   alignment: _descriptor_8.alignment() } }] } },
                                                                                        { push: { storage: false,
                                                                                                  value: __compactRuntime.StateValue.newCell({ value: _descriptor_0.toValue(contributionId_0),
                                                                                                                                               alignment: _descriptor_0.alignment() }).encode() } },
                                                                                        'member',
                                                                                        { popeq: { cached: true,
                                                                                                   result: undefined } }]).value),
                            'contribution already exists');
    let t_2;
    __compactRuntime.assert((t_2 = campaign_0.contributionCount,
                             t_2 < 18446744073709551615n),
                            'campaign contribution counter overflow');
    this._receiveShielded_0(context, partialProofData, coin_0);
    __compactRuntime.queryLedgerState(context,
                                      partialProofData,
                                      [
                                       { idx: { cached: false,
                                                pushPath: true,
                                                path: [
                                                       { tag: 'value',
                                                         value: { value: _descriptor_8.toValue(4n),
                                                                  alignment: _descriptor_8.alignment() } }] } },
                                       { push: { storage: false,
                                                 value: __compactRuntime.StateValue.newCell({ value: _descriptor_0.toValue(nullifier_0),
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
                                                         value: { value: _descriptor_8.toValue(2n),
                                                                  alignment: _descriptor_8.alignment() } }] } },
                                       { push: { storage: false,
                                                 value: __compactRuntime.StateValue.newCell({ value: _descriptor_0.toValue(contributionId_0),
                                                                                              alignment: _descriptor_0.alignment() }).encode() } },
                                       { push: { storage: true,
                                                 value: __compactRuntime.StateValue.newNull().encode() } },
                                       { ins: { cached: false, n: 1 } },
                                       { ins: { cached: true, n: 1 } }]);
    const tmp_0 = { campaignId: campaignId_0,
                    nullifier: nullifier_0,
                    escrowCoinCommitment:
                      this._deriveEscrowCoinCommitment_0(coin_0.nonce,
                                                         coin_0.color,
                                                         coin_0.value),
                    receiptCommitment:
                      this._deriveContributionReceiptCommitment_0(contributionId_0,
                                                                  nullifier_0,
                                                                  coin_0.value,
                                                                  coin_0.color,
                                                                  receiptSecret_0),
                    claimed: false };
    __compactRuntime.queryLedgerState(context,
                                      partialProofData,
                                      [
                                       { idx: { cached: false,
                                                pushPath: true,
                                                path: [
                                                       { tag: 'value',
                                                         value: { value: _descriptor_8.toValue(3n),
                                                                  alignment: _descriptor_8.alignment() } }] } },
                                       { push: { storage: false,
                                                 value: __compactRuntime.StateValue.newCell({ value: _descriptor_0.toValue(contributionId_0),
                                                                                              alignment: _descriptor_0.alignment() }).encode() } },
                                       { push: { storage: true,
                                                 value: __compactRuntime.StateValue.newCell({ value: _descriptor_3.toValue(tmp_0),
                                                                                              alignment: _descriptor_3.alignment() }).encode() } },
                                       { ins: { cached: false, n: 1 } },
                                       { ins: { cached: true, n: 1 } }]);
    const tmp_1 = { commitmentVersion: campaign_0.commitmentVersion,
                    commitment: campaign_0.commitment,
                    merchantAuthorization: campaign_0.merchantAuthorization,
                    expiry: campaign_0.expiry,
                    status: campaign_0.status,
                    contributionCount:
                      ((t1) => {
                        if (t1 > 18446744073709551615n) {
                          throw new __compactRuntime.CompactError('lumapay-campaigns.compact line 256 char 28: cast from Field or Uint value to smaller Uint value failed: ' + t1 + ' is greater than 18446744073709551615');
                        }
                        return t1;
                      })(campaign_0.contributionCount + 1n) };
    __compactRuntime.queryLedgerState(context,
                                      partialProofData,
                                      [
                                       { idx: { cached: false,
                                                pushPath: true,
                                                path: [
                                                       { tag: 'value',
                                                         value: { value: _descriptor_8.toValue(1n),
                                                                  alignment: _descriptor_8.alignment() } }] } },
                                       { push: { storage: false,
                                                 value: __compactRuntime.StateValue.newCell({ value: _descriptor_0.toValue(campaignId_0),
                                                                                              alignment: _descriptor_0.alignment() }).encode() } },
                                       { push: { storage: true,
                                                 value: __compactRuntime.StateValue.newCell({ value: _descriptor_7.toValue(tmp_1),
                                                                                              alignment: _descriptor_7.alignment() }).encode() } },
                                       { ins: { cached: false, n: 1 } },
                                       { ins: { cached: true, n: 1 } }]);
    return [];
  }
  _claimContribution_0(context,
                       partialProofData,
                       contributionId_0,
                       merchantClaimSecret_0,
                       escrowCoin_0)
  {
    __compactRuntime.assert(_descriptor_2.fromValue(__compactRuntime.queryLedgerState(context,
                                                                                      partialProofData,
                                                                                      [
                                                                                       { dup: { n: 0 } },
                                                                                       { idx: { cached: false,
                                                                                                pushPath: false,
                                                                                                path: [
                                                                                                       { tag: 'value',
                                                                                                         value: { value: _descriptor_8.toValue(2n),
                                                                                                                  alignment: _descriptor_8.alignment() } }] } },
                                                                                       { push: { storage: false,
                                                                                                 value: __compactRuntime.StateValue.newCell({ value: _descriptor_0.toValue(contributionId_0),
                                                                                                                                              alignment: _descriptor_0.alignment() }).encode() } },
                                                                                       'member',
                                                                                       { popeq: { cached: true,
                                                                                                  result: undefined } }]).value),
                            'contribution does not exist');
    const contribution_0 = _descriptor_3.fromValue(__compactRuntime.queryLedgerState(context,
                                                                                     partialProofData,
                                                                                     [
                                                                                      { dup: { n: 0 } },
                                                                                      { idx: { cached: false,
                                                                                               pushPath: false,
                                                                                               path: [
                                                                                                      { tag: 'value',
                                                                                                        value: { value: _descriptor_8.toValue(3n),
                                                                                                                 alignment: _descriptor_8.alignment() } }] } },
                                                                                      { idx: { cached: false,
                                                                                               pushPath: false,
                                                                                               path: [
                                                                                                      { tag: 'value',
                                                                                                        value: { value: _descriptor_0.toValue(contributionId_0),
                                                                                                                 alignment: _descriptor_0.alignment() } }] } },
                                                                                      { popeq: { cached: false,
                                                                                                 result: undefined } }]).value);
    __compactRuntime.assert(!contribution_0.claimed,
                            'contribution already claimed');
    let tmp_0;
    const campaign_0 = (tmp_0 = contribution_0.campaignId,
                        _descriptor_7.fromValue(__compactRuntime.queryLedgerState(context,
                                                                                  partialProofData,
                                                                                  [
                                                                                   { dup: { n: 0 } },
                                                                                   { idx: { cached: false,
                                                                                            pushPath: false,
                                                                                            path: [
                                                                                                   { tag: 'value',
                                                                                                     value: { value: _descriptor_8.toValue(1n),
                                                                                                              alignment: _descriptor_8.alignment() } }] } },
                                                                                   { idx: { cached: false,
                                                                                            pushPath: false,
                                                                                            path: [
                                                                                                   { tag: 'value',
                                                                                                     value: { value: _descriptor_0.toValue(tmp_0),
                                                                                                              alignment: _descriptor_0.alignment() } }] } },
                                                                                   { popeq: { cached: false,
                                                                                              result: undefined } }]).value));
    __compactRuntime.assert(this._equal_10(this._deriveMerchantAuthorization_0(merchantClaimSecret_0),
                                           campaign_0.merchantAuthorization),
                            'unauthorized contribution claim');
    __compactRuntime.assert(this._equal_11(this._deriveEscrowCoinCommitment_0(escrowCoin_0.nonce,
                                                                              escrowCoin_0.color,
                                                                              escrowCoin_0.value),
                                           contribution_0.escrowCoinCommitment),
                            'wrong contribution escrow coin');
    const nullifier_0 = this._deriveContributionClaimNullifier_0(contributionId_0,
                                                                 merchantClaimSecret_0);
    __compactRuntime.assert(!_descriptor_2.fromValue(__compactRuntime.queryLedgerState(context,
                                                                                       partialProofData,
                                                                                       [
                                                                                        { dup: { n: 0 } },
                                                                                        { idx: { cached: false,
                                                                                                 pushPath: false,
                                                                                                 path: [
                                                                                                        { tag: 'value',
                                                                                                          value: { value: _descriptor_8.toValue(5n),
                                                                                                                   alignment: _descriptor_8.alignment() } }] } },
                                                                                        { push: { storage: false,
                                                                                                  value: __compactRuntime.StateValue.newCell({ value: _descriptor_0.toValue(nullifier_0),
                                                                                                                                               alignment: _descriptor_0.alignment() }).encode() } },
                                                                                        'member',
                                                                                        { popeq: { cached: true,
                                                                                                   result: undefined } }]).value),
                            'contribution claim replay');
    __compactRuntime.queryLedgerState(context,
                                      partialProofData,
                                      [
                                       { idx: { cached: false,
                                                pushPath: true,
                                                path: [
                                                       { tag: 'value',
                                                         value: { value: _descriptor_8.toValue(5n),
                                                                  alignment: _descriptor_8.alignment() } }] } },
                                       { push: { storage: false,
                                                 value: __compactRuntime.StateValue.newCell({ value: _descriptor_0.toValue(nullifier_0),
                                                                                              alignment: _descriptor_0.alignment() }).encode() } },
                                       { push: { storage: true,
                                                 value: __compactRuntime.StateValue.newNull().encode() } },
                                       { ins: { cached: false, n: 1 } },
                                       { ins: { cached: true, n: 1 } }]);
    const tmp_1 = { campaignId: contribution_0.campaignId,
                    nullifier: contribution_0.nullifier,
                    escrowCoinCommitment: contribution_0.escrowCoinCommitment,
                    receiptCommitment: contribution_0.receiptCommitment,
                    claimed: true };
    __compactRuntime.queryLedgerState(context,
                                      partialProofData,
                                      [
                                       { idx: { cached: false,
                                                pushPath: true,
                                                path: [
                                                       { tag: 'value',
                                                         value: { value: _descriptor_8.toValue(3n),
                                                                  alignment: _descriptor_8.alignment() } }] } },
                                       { push: { storage: false,
                                                 value: __compactRuntime.StateValue.newCell({ value: _descriptor_0.toValue(contributionId_0),
                                                                                              alignment: _descriptor_0.alignment() }).encode() } },
                                       { push: { storage: true,
                                                 value: __compactRuntime.StateValue.newCell({ value: _descriptor_3.toValue(tmp_1),
                                                                                              alignment: _descriptor_3.alignment() }).encode() } },
                                       { ins: { cached: false, n: 1 } },
                                       { ins: { cached: true, n: 1 } }]);
    return this._sendShielded_0(context,
                                partialProofData,
                                escrowCoin_0,
                                this._left_0(this._ownPublicKey_0(context,
                                                                  partialProofData)),
                                escrowCoin_0.value);
  }
  _cancelCampaign_0(context,
                    partialProofData,
                    campaignId_0,
                    merchantClaimSecret_0)
  {
    __compactRuntime.assert(_descriptor_2.fromValue(__compactRuntime.queryLedgerState(context,
                                                                                      partialProofData,
                                                                                      [
                                                                                       { dup: { n: 0 } },
                                                                                       { idx: { cached: false,
                                                                                                pushPath: false,
                                                                                                path: [
                                                                                                       { tag: 'value',
                                                                                                         value: { value: _descriptor_8.toValue(0n),
                                                                                                                  alignment: _descriptor_8.alignment() } }] } },
                                                                                       { push: { storage: false,
                                                                                                 value: __compactRuntime.StateValue.newCell({ value: _descriptor_0.toValue(campaignId_0),
                                                                                                                                              alignment: _descriptor_0.alignment() }).encode() } },
                                                                                       'member',
                                                                                       { popeq: { cached: true,
                                                                                                  result: undefined } }]).value),
                            'campaign does not exist');
    const campaign_0 = _descriptor_7.fromValue(__compactRuntime.queryLedgerState(context,
                                                                                 partialProofData,
                                                                                 [
                                                                                  { dup: { n: 0 } },
                                                                                  { idx: { cached: false,
                                                                                           pushPath: false,
                                                                                           path: [
                                                                                                  { tag: 'value',
                                                                                                    value: { value: _descriptor_8.toValue(1n),
                                                                                                             alignment: _descriptor_8.alignment() } }] } },
                                                                                  { idx: { cached: false,
                                                                                           pushPath: false,
                                                                                           path: [
                                                                                                  { tag: 'value',
                                                                                                    value: { value: _descriptor_0.toValue(campaignId_0),
                                                                                                             alignment: _descriptor_0.alignment() } }] } },
                                                                                  { popeq: { cached: false,
                                                                                             result: undefined } }]).value);
    __compactRuntime.assert(campaign_0.status === 0, 'campaign is not open');
    __compactRuntime.assert(this._equal_12(this._deriveMerchantAuthorization_0(merchantClaimSecret_0),
                                           campaign_0.merchantAuthorization),
                            'unauthorized campaign cancellation');
    const tmp_0 = { commitmentVersion: campaign_0.commitmentVersion,
                    commitment: campaign_0.commitment,
                    merchantAuthorization: campaign_0.merchantAuthorization,
                    expiry: campaign_0.expiry,
                    status: 1,
                    contributionCount: campaign_0.contributionCount };
    __compactRuntime.queryLedgerState(context,
                                      partialProofData,
                                      [
                                       { idx: { cached: false,
                                                pushPath: true,
                                                path: [
                                                       { tag: 'value',
                                                         value: { value: _descriptor_8.toValue(1n),
                                                                  alignment: _descriptor_8.alignment() } }] } },
                                       { push: { storage: false,
                                                 value: __compactRuntime.StateValue.newCell({ value: _descriptor_0.toValue(campaignId_0),
                                                                                              alignment: _descriptor_0.alignment() }).encode() } },
                                       { push: { storage: true,
                                                 value: __compactRuntime.StateValue.newCell({ value: _descriptor_7.toValue(tmp_0),
                                                                                              alignment: _descriptor_7.alignment() }).encode() } },
                                       { ins: { cached: false, n: 1 } },
                                       { ins: { cached: true, n: 1 } }]);
    return [];
  }
  _expireCampaign_0(context, partialProofData, campaignId_0) {
    __compactRuntime.assert(_descriptor_2.fromValue(__compactRuntime.queryLedgerState(context,
                                                                                      partialProofData,
                                                                                      [
                                                                                       { dup: { n: 0 } },
                                                                                       { idx: { cached: false,
                                                                                                pushPath: false,
                                                                                                path: [
                                                                                                       { tag: 'value',
                                                                                                         value: { value: _descriptor_8.toValue(0n),
                                                                                                                  alignment: _descriptor_8.alignment() } }] } },
                                                                                       { push: { storage: false,
                                                                                                 value: __compactRuntime.StateValue.newCell({ value: _descriptor_0.toValue(campaignId_0),
                                                                                                                                              alignment: _descriptor_0.alignment() }).encode() } },
                                                                                       'member',
                                                                                       { popeq: { cached: true,
                                                                                                  result: undefined } }]).value),
                            'campaign does not exist');
    const campaign_0 = _descriptor_7.fromValue(__compactRuntime.queryLedgerState(context,
                                                                                 partialProofData,
                                                                                 [
                                                                                  { dup: { n: 0 } },
                                                                                  { idx: { cached: false,
                                                                                           pushPath: false,
                                                                                           path: [
                                                                                                  { tag: 'value',
                                                                                                    value: { value: _descriptor_8.toValue(1n),
                                                                                                             alignment: _descriptor_8.alignment() } }] } },
                                                                                  { idx: { cached: false,
                                                                                           pushPath: false,
                                                                                           path: [
                                                                                                  { tag: 'value',
                                                                                                    value: { value: _descriptor_0.toValue(campaignId_0),
                                                                                                             alignment: _descriptor_0.alignment() } }] } },
                                                                                  { popeq: { cached: false,
                                                                                             result: undefined } }]).value);
    __compactRuntime.assert(campaign_0.status === 0, 'campaign is not open');
    __compactRuntime.assert(this._blockTimeGte_0(context,
                                                 partialProofData,
                                                 campaign_0.expiry),
                            'campaign has not expired');
    const tmp_0 = { commitmentVersion: campaign_0.commitmentVersion,
                    commitment: campaign_0.commitment,
                    merchantAuthorization: campaign_0.merchantAuthorization,
                    expiry: campaign_0.expiry,
                    status: 2,
                    contributionCount: campaign_0.contributionCount };
    __compactRuntime.queryLedgerState(context,
                                      partialProofData,
                                      [
                                       { idx: { cached: false,
                                                pushPath: true,
                                                path: [
                                                       { tag: 'value',
                                                         value: { value: _descriptor_8.toValue(1n),
                                                                  alignment: _descriptor_8.alignment() } }] } },
                                       { push: { storage: false,
                                                 value: __compactRuntime.StateValue.newCell({ value: _descriptor_0.toValue(campaignId_0),
                                                                                              alignment: _descriptor_0.alignment() }).encode() } },
                                       { push: { storage: true,
                                                 value: __compactRuntime.StateValue.newCell({ value: _descriptor_7.toValue(tmp_0),
                                                                                              alignment: _descriptor_7.alignment() }).encode() } },
                                       { ins: { cached: false, n: 1 } },
                                       { ins: { cached: true, n: 1 } }]);
    return [];
  }
  _verifyContributionReceipt_0(contributionId_0,
                               contributionNullifier_0,
                               amount_0,
                               tokenId_0,
                               receiptSecret_0,
                               expectedReceiptCommitment_0)
  {
    return this._equal_13(this._deriveContributionReceiptCommitment_0(contributionId_0,
                                                                      contributionNullifier_0,
                                                                      amount_0,
                                                                      tokenId_0,
                                                                      receiptSecret_0),
                          expectedReceiptCommitment_0);
  }
  _proveContributionSettlement_0(context,
                                 partialProofData,
                                 contributionId_0,
                                 paidAmount_0,
                                 paidToken_0,
                                 receiptSecret_0)
  {
    __compactRuntime.assert(_descriptor_2.fromValue(__compactRuntime.queryLedgerState(context,
                                                                                      partialProofData,
                                                                                      [
                                                                                       { dup: { n: 0 } },
                                                                                       { idx: { cached: false,
                                                                                                pushPath: false,
                                                                                                path: [
                                                                                                       { tag: 'value',
                                                                                                         value: { value: _descriptor_8.toValue(2n),
                                                                                                                  alignment: _descriptor_8.alignment() } }] } },
                                                                                       { push: { storage: false,
                                                                                                 value: __compactRuntime.StateValue.newCell({ value: _descriptor_0.toValue(contributionId_0),
                                                                                                                                              alignment: _descriptor_0.alignment() }).encode() } },
                                                                                       'member',
                                                                                       { popeq: { cached: true,
                                                                                                  result: undefined } }]).value),
                            'contribution does not exist');
    const contribution_0 = _descriptor_3.fromValue(__compactRuntime.queryLedgerState(context,
                                                                                     partialProofData,
                                                                                     [
                                                                                      { dup: { n: 0 } },
                                                                                      { idx: { cached: false,
                                                                                               pushPath: false,
                                                                                               path: [
                                                                                                      { tag: 'value',
                                                                                                        value: { value: _descriptor_8.toValue(3n),
                                                                                                                 alignment: _descriptor_8.alignment() } }] } },
                                                                                      { idx: { cached: false,
                                                                                               pushPath: false,
                                                                                               path: [
                                                                                                      { tag: 'value',
                                                                                                        value: { value: _descriptor_0.toValue(contributionId_0),
                                                                                                                 alignment: _descriptor_0.alignment() } }] } },
                                                                                      { popeq: { cached: false,
                                                                                                 result: undefined } }]).value);
    __compactRuntime.assert(this._equal_14(this._deriveContributionReceiptCommitment_0(contributionId_0,
                                                                                       contribution_0.nullifier,
                                                                                       paidAmount_0,
                                                                                       paidToken_0,
                                                                                       receiptSecret_0),
                                           contribution_0.receiptCommitment),
                            'invalid contribution disclosure');
    return [];
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
  _equal_14(x0, y0) {
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
    campaignIds: {
      isEmpty(...args_0) {
        if (args_0.length !== 0) {
          throw new __compactRuntime.CompactError(`isEmpty: expected 0 arguments, received ${args_0.length}`);
        }
        return _descriptor_2.fromValue(__compactRuntime.queryLedgerState(context,
                                                                         partialProofData,
                                                                         [
                                                                          { dup: { n: 0 } },
                                                                          { idx: { cached: false,
                                                                                   pushPath: false,
                                                                                   path: [
                                                                                          { tag: 'value',
                                                                                            value: { value: _descriptor_8.toValue(0n),
                                                                                                     alignment: _descriptor_8.alignment() } }] } },
                                                                          'size',
                                                                          { push: { storage: false,
                                                                                    value: __compactRuntime.StateValue.newCell({ value: _descriptor_5.toValue(0n),
                                                                                                                                 alignment: _descriptor_5.alignment() }).encode() } },
                                                                          'eq',
                                                                          { popeq: { cached: true,
                                                                                     result: undefined } }]).value);
      },
      size(...args_0) {
        if (args_0.length !== 0) {
          throw new __compactRuntime.CompactError(`size: expected 0 arguments, received ${args_0.length}`);
        }
        return _descriptor_5.fromValue(__compactRuntime.queryLedgerState(context,
                                                                         partialProofData,
                                                                         [
                                                                          { dup: { n: 0 } },
                                                                          { idx: { cached: false,
                                                                                   pushPath: false,
                                                                                   path: [
                                                                                          { tag: 'value',
                                                                                            value: { value: _descriptor_8.toValue(0n),
                                                                                                     alignment: _descriptor_8.alignment() } }] } },
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
                                     'lumapay-campaigns.compact line 30 char 1',
                                     'Bytes<32>',
                                     elem_0)
        }
        return _descriptor_2.fromValue(__compactRuntime.queryLedgerState(context,
                                                                         partialProofData,
                                                                         [
                                                                          { dup: { n: 0 } },
                                                                          { idx: { cached: false,
                                                                                   pushPath: false,
                                                                                   path: [
                                                                                          { tag: 'value',
                                                                                            value: { value: _descriptor_8.toValue(0n),
                                                                                                     alignment: _descriptor_8.alignment() } }] } },
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
    campaigns: {
      isEmpty(...args_0) {
        if (args_0.length !== 0) {
          throw new __compactRuntime.CompactError(`isEmpty: expected 0 arguments, received ${args_0.length}`);
        }
        return _descriptor_2.fromValue(__compactRuntime.queryLedgerState(context,
                                                                         partialProofData,
                                                                         [
                                                                          { dup: { n: 0 } },
                                                                          { idx: { cached: false,
                                                                                   pushPath: false,
                                                                                   path: [
                                                                                          { tag: 'value',
                                                                                            value: { value: _descriptor_8.toValue(1n),
                                                                                                     alignment: _descriptor_8.alignment() } }] } },
                                                                          'size',
                                                                          { push: { storage: false,
                                                                                    value: __compactRuntime.StateValue.newCell({ value: _descriptor_5.toValue(0n),
                                                                                                                                 alignment: _descriptor_5.alignment() }).encode() } },
                                                                          'eq',
                                                                          { popeq: { cached: true,
                                                                                     result: undefined } }]).value);
      },
      size(...args_0) {
        if (args_0.length !== 0) {
          throw new __compactRuntime.CompactError(`size: expected 0 arguments, received ${args_0.length}`);
        }
        return _descriptor_5.fromValue(__compactRuntime.queryLedgerState(context,
                                                                         partialProofData,
                                                                         [
                                                                          { dup: { n: 0 } },
                                                                          { idx: { cached: false,
                                                                                   pushPath: false,
                                                                                   path: [
                                                                                          { tag: 'value',
                                                                                            value: { value: _descriptor_8.toValue(1n),
                                                                                                     alignment: _descriptor_8.alignment() } }] } },
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
                                     'lumapay-campaigns.compact line 31 char 1',
                                     'Bytes<32>',
                                     key_0)
        }
        return _descriptor_2.fromValue(__compactRuntime.queryLedgerState(context,
                                                                         partialProofData,
                                                                         [
                                                                          { dup: { n: 0 } },
                                                                          { idx: { cached: false,
                                                                                   pushPath: false,
                                                                                   path: [
                                                                                          { tag: 'value',
                                                                                            value: { value: _descriptor_8.toValue(1n),
                                                                                                     alignment: _descriptor_8.alignment() } }] } },
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
                                     'lumapay-campaigns.compact line 31 char 1',
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
                                                                                            value: { value: _descriptor_8.toValue(1n),
                                                                                                     alignment: _descriptor_8.alignment() } }] } },
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
    contributionIds: {
      isEmpty(...args_0) {
        if (args_0.length !== 0) {
          throw new __compactRuntime.CompactError(`isEmpty: expected 0 arguments, received ${args_0.length}`);
        }
        return _descriptor_2.fromValue(__compactRuntime.queryLedgerState(context,
                                                                         partialProofData,
                                                                         [
                                                                          { dup: { n: 0 } },
                                                                          { idx: { cached: false,
                                                                                   pushPath: false,
                                                                                   path: [
                                                                                          { tag: 'value',
                                                                                            value: { value: _descriptor_8.toValue(2n),
                                                                                                     alignment: _descriptor_8.alignment() } }] } },
                                                                          'size',
                                                                          { push: { storage: false,
                                                                                    value: __compactRuntime.StateValue.newCell({ value: _descriptor_5.toValue(0n),
                                                                                                                                 alignment: _descriptor_5.alignment() }).encode() } },
                                                                          'eq',
                                                                          { popeq: { cached: true,
                                                                                     result: undefined } }]).value);
      },
      size(...args_0) {
        if (args_0.length !== 0) {
          throw new __compactRuntime.CompactError(`size: expected 0 arguments, received ${args_0.length}`);
        }
        return _descriptor_5.fromValue(__compactRuntime.queryLedgerState(context,
                                                                         partialProofData,
                                                                         [
                                                                          { dup: { n: 0 } },
                                                                          { idx: { cached: false,
                                                                                   pushPath: false,
                                                                                   path: [
                                                                                          { tag: 'value',
                                                                                            value: { value: _descriptor_8.toValue(2n),
                                                                                                     alignment: _descriptor_8.alignment() } }] } },
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
                                     'lumapay-campaigns.compact line 32 char 1',
                                     'Bytes<32>',
                                     elem_0)
        }
        return _descriptor_2.fromValue(__compactRuntime.queryLedgerState(context,
                                                                         partialProofData,
                                                                         [
                                                                          { dup: { n: 0 } },
                                                                          { idx: { cached: false,
                                                                                   pushPath: false,
                                                                                   path: [
                                                                                          { tag: 'value',
                                                                                            value: { value: _descriptor_8.toValue(2n),
                                                                                                     alignment: _descriptor_8.alignment() } }] } },
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
    contributions: {
      isEmpty(...args_0) {
        if (args_0.length !== 0) {
          throw new __compactRuntime.CompactError(`isEmpty: expected 0 arguments, received ${args_0.length}`);
        }
        return _descriptor_2.fromValue(__compactRuntime.queryLedgerState(context,
                                                                         partialProofData,
                                                                         [
                                                                          { dup: { n: 0 } },
                                                                          { idx: { cached: false,
                                                                                   pushPath: false,
                                                                                   path: [
                                                                                          { tag: 'value',
                                                                                            value: { value: _descriptor_8.toValue(3n),
                                                                                                     alignment: _descriptor_8.alignment() } }] } },
                                                                          'size',
                                                                          { push: { storage: false,
                                                                                    value: __compactRuntime.StateValue.newCell({ value: _descriptor_5.toValue(0n),
                                                                                                                                 alignment: _descriptor_5.alignment() }).encode() } },
                                                                          'eq',
                                                                          { popeq: { cached: true,
                                                                                     result: undefined } }]).value);
      },
      size(...args_0) {
        if (args_0.length !== 0) {
          throw new __compactRuntime.CompactError(`size: expected 0 arguments, received ${args_0.length}`);
        }
        return _descriptor_5.fromValue(__compactRuntime.queryLedgerState(context,
                                                                         partialProofData,
                                                                         [
                                                                          { dup: { n: 0 } },
                                                                          { idx: { cached: false,
                                                                                   pushPath: false,
                                                                                   path: [
                                                                                          { tag: 'value',
                                                                                            value: { value: _descriptor_8.toValue(3n),
                                                                                                     alignment: _descriptor_8.alignment() } }] } },
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
                                     'lumapay-campaigns.compact line 33 char 1',
                                     'Bytes<32>',
                                     key_0)
        }
        return _descriptor_2.fromValue(__compactRuntime.queryLedgerState(context,
                                                                         partialProofData,
                                                                         [
                                                                          { dup: { n: 0 } },
                                                                          { idx: { cached: false,
                                                                                   pushPath: false,
                                                                                   path: [
                                                                                          { tag: 'value',
                                                                                            value: { value: _descriptor_8.toValue(3n),
                                                                                                     alignment: _descriptor_8.alignment() } }] } },
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
                                     'lumapay-campaigns.compact line 33 char 1',
                                     'Bytes<32>',
                                     key_0)
        }
        return _descriptor_3.fromValue(__compactRuntime.queryLedgerState(context,
                                                                         partialProofData,
                                                                         [
                                                                          { dup: { n: 0 } },
                                                                          { idx: { cached: false,
                                                                                   pushPath: false,
                                                                                   path: [
                                                                                          { tag: 'value',
                                                                                            value: { value: _descriptor_8.toValue(3n),
                                                                                                     alignment: _descriptor_8.alignment() } }] } },
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
        return self_0.asMap().keys().map(  (key) => {    const value = self_0.asMap().get(key).asCell();    return [      _descriptor_0.fromValue(key.value),      _descriptor_3.fromValue(value.value)    ];  })[Symbol.iterator]();
      }
    },
    contributionNullifiers: {
      isEmpty(...args_0) {
        if (args_0.length !== 0) {
          throw new __compactRuntime.CompactError(`isEmpty: expected 0 arguments, received ${args_0.length}`);
        }
        return _descriptor_2.fromValue(__compactRuntime.queryLedgerState(context,
                                                                         partialProofData,
                                                                         [
                                                                          { dup: { n: 0 } },
                                                                          { idx: { cached: false,
                                                                                   pushPath: false,
                                                                                   path: [
                                                                                          { tag: 'value',
                                                                                            value: { value: _descriptor_8.toValue(4n),
                                                                                                     alignment: _descriptor_8.alignment() } }] } },
                                                                          'size',
                                                                          { push: { storage: false,
                                                                                    value: __compactRuntime.StateValue.newCell({ value: _descriptor_5.toValue(0n),
                                                                                                                                 alignment: _descriptor_5.alignment() }).encode() } },
                                                                          'eq',
                                                                          { popeq: { cached: true,
                                                                                     result: undefined } }]).value);
      },
      size(...args_0) {
        if (args_0.length !== 0) {
          throw new __compactRuntime.CompactError(`size: expected 0 arguments, received ${args_0.length}`);
        }
        return _descriptor_5.fromValue(__compactRuntime.queryLedgerState(context,
                                                                         partialProofData,
                                                                         [
                                                                          { dup: { n: 0 } },
                                                                          { idx: { cached: false,
                                                                                   pushPath: false,
                                                                                   path: [
                                                                                          { tag: 'value',
                                                                                            value: { value: _descriptor_8.toValue(4n),
                                                                                                     alignment: _descriptor_8.alignment() } }] } },
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
                                     'lumapay-campaigns.compact line 34 char 1',
                                     'Bytes<32>',
                                     elem_0)
        }
        return _descriptor_2.fromValue(__compactRuntime.queryLedgerState(context,
                                                                         partialProofData,
                                                                         [
                                                                          { dup: { n: 0 } },
                                                                          { idx: { cached: false,
                                                                                   pushPath: false,
                                                                                   path: [
                                                                                          { tag: 'value',
                                                                                            value: { value: _descriptor_8.toValue(4n),
                                                                                                     alignment: _descriptor_8.alignment() } }] } },
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
    },
    claimNullifiers: {
      isEmpty(...args_0) {
        if (args_0.length !== 0) {
          throw new __compactRuntime.CompactError(`isEmpty: expected 0 arguments, received ${args_0.length}`);
        }
        return _descriptor_2.fromValue(__compactRuntime.queryLedgerState(context,
                                                                         partialProofData,
                                                                         [
                                                                          { dup: { n: 0 } },
                                                                          { idx: { cached: false,
                                                                                   pushPath: false,
                                                                                   path: [
                                                                                          { tag: 'value',
                                                                                            value: { value: _descriptor_8.toValue(5n),
                                                                                                     alignment: _descriptor_8.alignment() } }] } },
                                                                          'size',
                                                                          { push: { storage: false,
                                                                                    value: __compactRuntime.StateValue.newCell({ value: _descriptor_5.toValue(0n),
                                                                                                                                 alignment: _descriptor_5.alignment() }).encode() } },
                                                                          'eq',
                                                                          { popeq: { cached: true,
                                                                                     result: undefined } }]).value);
      },
      size(...args_0) {
        if (args_0.length !== 0) {
          throw new __compactRuntime.CompactError(`size: expected 0 arguments, received ${args_0.length}`);
        }
        return _descriptor_5.fromValue(__compactRuntime.queryLedgerState(context,
                                                                         partialProofData,
                                                                         [
                                                                          { dup: { n: 0 } },
                                                                          { idx: { cached: false,
                                                                                   pushPath: false,
                                                                                   path: [
                                                                                          { tag: 'value',
                                                                                            value: { value: _descriptor_8.toValue(5n),
                                                                                                     alignment: _descriptor_8.alignment() } }] } },
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
                                     'lumapay-campaigns.compact line 35 char 1',
                                     'Bytes<32>',
                                     elem_0)
        }
        return _descriptor_2.fromValue(__compactRuntime.queryLedgerState(context,
                                                                         partialProofData,
                                                                         [
                                                                          { dup: { n: 0 } },
                                                                          { idx: { cached: false,
                                                                                   pushPath: false,
                                                                                   path: [
                                                                                          { tag: 'value',
                                                                                            value: { value: _descriptor_8.toValue(5n),
                                                                                                     alignment: _descriptor_8.alignment() } }] } },
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
        const self_0 = state.asArray()[5];
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
  deriveMerchantAuthorization: (...args_0) => {
    if (args_0.length !== 1) {
      throw new __compactRuntime.CompactError(`deriveMerchantAuthorization: expected 1 argument (as invoked from Typescript), received ${args_0.length}`);
    }
    const merchantClaimSecret_0 = args_0[0];
    if (!(merchantClaimSecret_0.buffer instanceof ArrayBuffer && merchantClaimSecret_0.BYTES_PER_ELEMENT === 1 && merchantClaimSecret_0.length === 32)) {
      __compactRuntime.typeError('deriveMerchantAuthorization',
                                 'argument 1',
                                 'lumapay-campaigns.compact line 37 char 1',
                                 'Bytes<32>',
                                 merchantClaimSecret_0)
    }
    return _dummyContract._deriveMerchantAuthorization_0(merchantClaimSecret_0);
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
                                 'lumapay-campaigns.compact line 44 char 1',
                                 'Bytes<32>',
                                 nonce_0)
    }
    if (!(color_0.buffer instanceof ArrayBuffer && color_0.BYTES_PER_ELEMENT === 1 && color_0.length === 32)) {
      __compactRuntime.typeError('deriveEscrowCoinCommitment',
                                 'argument 2',
                                 'lumapay-campaigns.compact line 44 char 1',
                                 'Bytes<32>',
                                 color_0)
    }
    if (!(typeof(value_0) === 'bigint' && value_0 >= 0n && value_0 <= 340282366920938463463374607431768211455n)) {
      __compactRuntime.typeError('deriveEscrowCoinCommitment',
                                 'argument 3',
                                 'lumapay-campaigns.compact line 44 char 1',
                                 'Uint<0..340282366920938463463374607431768211456>',
                                 value_0)
    }
    return _dummyContract._deriveEscrowCoinCommitment_0(nonce_0,
                                                        color_0,
                                                        value_0);
  },
  deriveCampaignCommitment: (...args_0) => {
    if (args_0.length !== 12) {
      throw new __compactRuntime.CompactError(`deriveCampaignCommitment: expected 12 arguments (as invoked from Typescript), received ${args_0.length}`);
    }
    const campaignId_0 = args_0[0];
    const merchantPrivateIdentity_0 = args_0[1];
    const minimumContribution_0 = args_0[2];
    const maximumContribution_0 = args_0[3];
    const acceptedTokenCount_0 = args_0[4];
    const acceptedTokenA_0 = args_0[5];
    const acceptedTokenB_0 = args_0[6];
    const acceptedTokenC_0 = args_0[7];
    const acceptedTokenD_0 = args_0[8];
    const campaignNonce_0 = args_0[9];
    const randomness_0 = args_0[10];
    const expiry_0 = args_0[11];
    if (!(campaignId_0.buffer instanceof ArrayBuffer && campaignId_0.BYTES_PER_ELEMENT === 1 && campaignId_0.length === 32)) {
      __compactRuntime.typeError('deriveCampaignCommitment',
                                 'argument 1',
                                 'lumapay-campaigns.compact line 57 char 1',
                                 'Bytes<32>',
                                 campaignId_0)
    }
    if (!(merchantPrivateIdentity_0.buffer instanceof ArrayBuffer && merchantPrivateIdentity_0.BYTES_PER_ELEMENT === 1 && merchantPrivateIdentity_0.length === 32)) {
      __compactRuntime.typeError('deriveCampaignCommitment',
                                 'argument 2',
                                 'lumapay-campaigns.compact line 57 char 1',
                                 'Bytes<32>',
                                 merchantPrivateIdentity_0)
    }
    if (!(typeof(minimumContribution_0) === 'bigint' && minimumContribution_0 >= 0n && minimumContribution_0 <= 340282366920938463463374607431768211455n)) {
      __compactRuntime.typeError('deriveCampaignCommitment',
                                 'argument 3',
                                 'lumapay-campaigns.compact line 57 char 1',
                                 'Uint<0..340282366920938463463374607431768211456>',
                                 minimumContribution_0)
    }
    if (!(typeof(maximumContribution_0) === 'bigint' && maximumContribution_0 >= 0n && maximumContribution_0 <= 340282366920938463463374607431768211455n)) {
      __compactRuntime.typeError('deriveCampaignCommitment',
                                 'argument 4',
                                 'lumapay-campaigns.compact line 57 char 1',
                                 'Uint<0..340282366920938463463374607431768211456>',
                                 maximumContribution_0)
    }
    if (!(typeof(acceptedTokenCount_0) === 'bigint' && acceptedTokenCount_0 >= 0n && acceptedTokenCount_0 <= 255n)) {
      __compactRuntime.typeError('deriveCampaignCommitment',
                                 'argument 5',
                                 'lumapay-campaigns.compact line 57 char 1',
                                 'Uint<0..256>',
                                 acceptedTokenCount_0)
    }
    if (!(acceptedTokenA_0.buffer instanceof ArrayBuffer && acceptedTokenA_0.BYTES_PER_ELEMENT === 1 && acceptedTokenA_0.length === 32)) {
      __compactRuntime.typeError('deriveCampaignCommitment',
                                 'argument 6',
                                 'lumapay-campaigns.compact line 57 char 1',
                                 'Bytes<32>',
                                 acceptedTokenA_0)
    }
    if (!(acceptedTokenB_0.buffer instanceof ArrayBuffer && acceptedTokenB_0.BYTES_PER_ELEMENT === 1 && acceptedTokenB_0.length === 32)) {
      __compactRuntime.typeError('deriveCampaignCommitment',
                                 'argument 7',
                                 'lumapay-campaigns.compact line 57 char 1',
                                 'Bytes<32>',
                                 acceptedTokenB_0)
    }
    if (!(acceptedTokenC_0.buffer instanceof ArrayBuffer && acceptedTokenC_0.BYTES_PER_ELEMENT === 1 && acceptedTokenC_0.length === 32)) {
      __compactRuntime.typeError('deriveCampaignCommitment',
                                 'argument 8',
                                 'lumapay-campaigns.compact line 57 char 1',
                                 'Bytes<32>',
                                 acceptedTokenC_0)
    }
    if (!(acceptedTokenD_0.buffer instanceof ArrayBuffer && acceptedTokenD_0.BYTES_PER_ELEMENT === 1 && acceptedTokenD_0.length === 32)) {
      __compactRuntime.typeError('deriveCampaignCommitment',
                                 'argument 9',
                                 'lumapay-campaigns.compact line 57 char 1',
                                 'Bytes<32>',
                                 acceptedTokenD_0)
    }
    if (!(campaignNonce_0.buffer instanceof ArrayBuffer && campaignNonce_0.BYTES_PER_ELEMENT === 1 && campaignNonce_0.length === 32)) {
      __compactRuntime.typeError('deriveCampaignCommitment',
                                 'argument 10',
                                 'lumapay-campaigns.compact line 57 char 1',
                                 'Bytes<32>',
                                 campaignNonce_0)
    }
    if (!(randomness_0.buffer instanceof ArrayBuffer && randomness_0.BYTES_PER_ELEMENT === 1 && randomness_0.length === 32)) {
      __compactRuntime.typeError('deriveCampaignCommitment',
                                 'argument 11',
                                 'lumapay-campaigns.compact line 57 char 1',
                                 'Bytes<32>',
                                 randomness_0)
    }
    if (!(typeof(expiry_0) === 'bigint' && expiry_0 >= 0n && expiry_0 <= 18446744073709551615n)) {
      __compactRuntime.typeError('deriveCampaignCommitment',
                                 'argument 12',
                                 'lumapay-campaigns.compact line 57 char 1',
                                 'Uint<0..18446744073709551616>',
                                 expiry_0)
    }
    return _dummyContract._deriveCampaignCommitment_0(campaignId_0,
                                                      merchantPrivateIdentity_0,
                                                      minimumContribution_0,
                                                      maximumContribution_0,
                                                      acceptedTokenCount_0,
                                                      acceptedTokenA_0,
                                                      acceptedTokenB_0,
                                                      acceptedTokenC_0,
                                                      acceptedTokenD_0,
                                                      campaignNonce_0,
                                                      randomness_0,
                                                      expiry_0);
  },
  deriveContributionNullifier: (...args_0) => {
    if (args_0.length !== 2) {
      throw new __compactRuntime.CompactError(`deriveContributionNullifier: expected 2 arguments (as invoked from Typescript), received ${args_0.length}`);
    }
    const campaignId_0 = args_0[0];
    const contributionSecret_0 = args_0[1];
    if (!(campaignId_0.buffer instanceof ArrayBuffer && campaignId_0.BYTES_PER_ELEMENT === 1 && campaignId_0.length === 32)) {
      __compactRuntime.typeError('deriveContributionNullifier',
                                 'argument 1',
                                 'lumapay-campaigns.compact line 93 char 1',
                                 'Bytes<32>',
                                 campaignId_0)
    }
    if (!(contributionSecret_0.buffer instanceof ArrayBuffer && contributionSecret_0.BYTES_PER_ELEMENT === 1 && contributionSecret_0.length === 32)) {
      __compactRuntime.typeError('deriveContributionNullifier',
                                 'argument 2',
                                 'lumapay-campaigns.compact line 93 char 1',
                                 'Bytes<32>',
                                 contributionSecret_0)
    }
    return _dummyContract._deriveContributionNullifier_0(campaignId_0,
                                                         contributionSecret_0);
  },
  deriveContributionId: (...args_0) => {
    if (args_0.length !== 2) {
      throw new __compactRuntime.CompactError(`deriveContributionId: expected 2 arguments (as invoked from Typescript), received ${args_0.length}`);
    }
    const campaignId_0 = args_0[0];
    const contributionNullifier_0 = args_0[1];
    if (!(campaignId_0.buffer instanceof ArrayBuffer && campaignId_0.BYTES_PER_ELEMENT === 1 && campaignId_0.length === 32)) {
      __compactRuntime.typeError('deriveContributionId',
                                 'argument 1',
                                 'lumapay-campaigns.compact line 104 char 1',
                                 'Bytes<32>',
                                 campaignId_0)
    }
    if (!(contributionNullifier_0.buffer instanceof ArrayBuffer && contributionNullifier_0.BYTES_PER_ELEMENT === 1 && contributionNullifier_0.length === 32)) {
      __compactRuntime.typeError('deriveContributionId',
                                 'argument 2',
                                 'lumapay-campaigns.compact line 104 char 1',
                                 'Bytes<32>',
                                 contributionNullifier_0)
    }
    return _dummyContract._deriveContributionId_0(campaignId_0,
                                                  contributionNullifier_0);
  },
  deriveContributionReceiptCommitment: (...args_0) => {
    if (args_0.length !== 5) {
      throw new __compactRuntime.CompactError(`deriveContributionReceiptCommitment: expected 5 arguments (as invoked from Typescript), received ${args_0.length}`);
    }
    const contributionId_0 = args_0[0];
    const contributionNullifier_0 = args_0[1];
    const amount_0 = args_0[2];
    const tokenId_0 = args_0[3];
    const receiptSecret_0 = args_0[4];
    if (!(contributionId_0.buffer instanceof ArrayBuffer && contributionId_0.BYTES_PER_ELEMENT === 1 && contributionId_0.length === 32)) {
      __compactRuntime.typeError('deriveContributionReceiptCommitment',
                                 'argument 1',
                                 'lumapay-campaigns.compact line 115 char 1',
                                 'Bytes<32>',
                                 contributionId_0)
    }
    if (!(contributionNullifier_0.buffer instanceof ArrayBuffer && contributionNullifier_0.BYTES_PER_ELEMENT === 1 && contributionNullifier_0.length === 32)) {
      __compactRuntime.typeError('deriveContributionReceiptCommitment',
                                 'argument 2',
                                 'lumapay-campaigns.compact line 115 char 1',
                                 'Bytes<32>',
                                 contributionNullifier_0)
    }
    if (!(typeof(amount_0) === 'bigint' && amount_0 >= 0n && amount_0 <= 340282366920938463463374607431768211455n)) {
      __compactRuntime.typeError('deriveContributionReceiptCommitment',
                                 'argument 3',
                                 'lumapay-campaigns.compact line 115 char 1',
                                 'Uint<0..340282366920938463463374607431768211456>',
                                 amount_0)
    }
    if (!(tokenId_0.buffer instanceof ArrayBuffer && tokenId_0.BYTES_PER_ELEMENT === 1 && tokenId_0.length === 32)) {
      __compactRuntime.typeError('deriveContributionReceiptCommitment',
                                 'argument 4',
                                 'lumapay-campaigns.compact line 115 char 1',
                                 'Bytes<32>',
                                 tokenId_0)
    }
    if (!(receiptSecret_0.buffer instanceof ArrayBuffer && receiptSecret_0.BYTES_PER_ELEMENT === 1 && receiptSecret_0.length === 32)) {
      __compactRuntime.typeError('deriveContributionReceiptCommitment',
                                 'argument 5',
                                 'lumapay-campaigns.compact line 115 char 1',
                                 'Bytes<32>',
                                 receiptSecret_0)
    }
    return _dummyContract._deriveContributionReceiptCommitment_0(contributionId_0,
                                                                 contributionNullifier_0,
                                                                 amount_0,
                                                                 tokenId_0,
                                                                 receiptSecret_0);
  },
  deriveContributionClaimNullifier: (...args_0) => {
    if (args_0.length !== 2) {
      throw new __compactRuntime.CompactError(`deriveContributionClaimNullifier: expected 2 arguments (as invoked from Typescript), received ${args_0.length}`);
    }
    const contributionId_0 = args_0[0];
    const merchantClaimSecret_0 = args_0[1];
    if (!(contributionId_0.buffer instanceof ArrayBuffer && contributionId_0.BYTES_PER_ELEMENT === 1 && contributionId_0.length === 32)) {
      __compactRuntime.typeError('deriveContributionClaimNullifier',
                                 'argument 1',
                                 'lumapay-campaigns.compact line 134 char 1',
                                 'Bytes<32>',
                                 contributionId_0)
    }
    if (!(merchantClaimSecret_0.buffer instanceof ArrayBuffer && merchantClaimSecret_0.BYTES_PER_ELEMENT === 1 && merchantClaimSecret_0.length === 32)) {
      __compactRuntime.typeError('deriveContributionClaimNullifier',
                                 'argument 2',
                                 'lumapay-campaigns.compact line 134 char 1',
                                 'Bytes<32>',
                                 merchantClaimSecret_0)
    }
    return _dummyContract._deriveContributionClaimNullifier_0(contributionId_0,
                                                              merchantClaimSecret_0);
  },
  verifyContributionReceipt: (...args_0) => {
    if (args_0.length !== 6) {
      throw new __compactRuntime.CompactError(`verifyContributionReceipt: expected 6 arguments (as invoked from Typescript), received ${args_0.length}`);
    }
    const contributionId_0 = args_0[0];
    const contributionNullifier_0 = args_0[1];
    const amount_0 = args_0[2];
    const tokenId_0 = args_0[3];
    const receiptSecret_0 = args_0[4];
    const expectedReceiptCommitment_0 = args_0[5];
    if (!(contributionId_0.buffer instanceof ArrayBuffer && contributionId_0.BYTES_PER_ELEMENT === 1 && contributionId_0.length === 32)) {
      __compactRuntime.typeError('verifyContributionReceipt',
                                 'argument 1',
                                 'lumapay-campaigns.compact line 330 char 1',
                                 'Bytes<32>',
                                 contributionId_0)
    }
    if (!(contributionNullifier_0.buffer instanceof ArrayBuffer && contributionNullifier_0.BYTES_PER_ELEMENT === 1 && contributionNullifier_0.length === 32)) {
      __compactRuntime.typeError('verifyContributionReceipt',
                                 'argument 2',
                                 'lumapay-campaigns.compact line 330 char 1',
                                 'Bytes<32>',
                                 contributionNullifier_0)
    }
    if (!(typeof(amount_0) === 'bigint' && amount_0 >= 0n && amount_0 <= 340282366920938463463374607431768211455n)) {
      __compactRuntime.typeError('verifyContributionReceipt',
                                 'argument 3',
                                 'lumapay-campaigns.compact line 330 char 1',
                                 'Uint<0..340282366920938463463374607431768211456>',
                                 amount_0)
    }
    if (!(tokenId_0.buffer instanceof ArrayBuffer && tokenId_0.BYTES_PER_ELEMENT === 1 && tokenId_0.length === 32)) {
      __compactRuntime.typeError('verifyContributionReceipt',
                                 'argument 4',
                                 'lumapay-campaigns.compact line 330 char 1',
                                 'Bytes<32>',
                                 tokenId_0)
    }
    if (!(receiptSecret_0.buffer instanceof ArrayBuffer && receiptSecret_0.BYTES_PER_ELEMENT === 1 && receiptSecret_0.length === 32)) {
      __compactRuntime.typeError('verifyContributionReceipt',
                                 'argument 5',
                                 'lumapay-campaigns.compact line 330 char 1',
                                 'Bytes<32>',
                                 receiptSecret_0)
    }
    if (!(expectedReceiptCommitment_0.buffer instanceof ArrayBuffer && expectedReceiptCommitment_0.BYTES_PER_ELEMENT === 1 && expectedReceiptCommitment_0.length === 32)) {
      __compactRuntime.typeError('verifyContributionReceipt',
                                 'argument 6',
                                 'lumapay-campaigns.compact line 330 char 1',
                                 'Bytes<32>',
                                 expectedReceiptCommitment_0)
    }
    return _dummyContract._verifyContributionReceipt_0(contributionId_0,
                                                       contributionNullifier_0,
                                                       amount_0,
                                                       tokenId_0,
                                                       receiptSecret_0,
                                                       expectedReceiptCommitment_0);
  }
};
export const contractReferenceLocations =
  { tag: 'publicLedgerArray', indices: { } };
//# sourceMappingURL=index.js.map
