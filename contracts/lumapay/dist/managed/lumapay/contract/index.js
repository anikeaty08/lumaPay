import * as __compactRuntime from '@midnight-ntwrk/compact-runtime';
__compactRuntime.checkRuntimeVersion('0.16.0');

export var InvoiceStatus;
(function (InvoiceStatus) {
  InvoiceStatus[InvoiceStatus['OPEN'] = 0] = 'OPEN';
  InvoiceStatus[InvoiceStatus['SETTLED'] = 1] = 'SETTLED';
  InvoiceStatus[InvoiceStatus['CANCELLED'] = 2] = 'CANCELLED';
  InvoiceStatus[InvoiceStatus['EXPIRED'] = 3] = 'EXPIRED';
})(InvoiceStatus || (InvoiceStatus = {}));

export var CampaignStatus;
(function (CampaignStatus) {
  CampaignStatus[CampaignStatus['OPEN'] = 0] = 'OPEN';
  CampaignStatus[CampaignStatus['CANCELLED'] = 1] = 'CANCELLED';
  CampaignStatus[CampaignStatus['EXPIRED'] = 2] = 'EXPIRED';
})(CampaignStatus || (CampaignStatus = {}));

export var GiftCardStatus;
(function (GiftCardStatus) {
  GiftCardStatus[GiftCardStatus['OPEN'] = 0] = 'OPEN';
  GiftCardStatus[GiftCardStatus['REDEEMED'] = 1] = 'REDEEMED';
  GiftCardStatus[GiftCardStatus['RECLAIMED'] = 2] = 'RECLAIMED';
})(GiftCardStatus || (GiftCardStatus = {}));

const _descriptor_0 = new __compactRuntime.CompactTypeBytes(32);

const _descriptor_1 = __compactRuntime.CompactTypeBoolean;

class _ContributionPublicState_0 {
  alignment() {
    return _descriptor_0.alignment().concat(_descriptor_0.alignment().concat(_descriptor_0.alignment().concat(_descriptor_0.alignment().concat(_descriptor_1.alignment()))));
  }
  fromValue(value_0) {
    return {
      campaignId: _descriptor_0.fromValue(value_0),
      nullifier: _descriptor_0.fromValue(value_0),
      escrowCoinCommitment: _descriptor_0.fromValue(value_0),
      receiptCommitment: _descriptor_0.fromValue(value_0),
      claimed: _descriptor_1.fromValue(value_0)
    }
  }
  toValue(value_0) {
    return _descriptor_0.toValue(value_0.campaignId).concat(_descriptor_0.toValue(value_0.nullifier).concat(_descriptor_0.toValue(value_0.escrowCoinCommitment).concat(_descriptor_0.toValue(value_0.receiptCommitment).concat(_descriptor_1.toValue(value_0.claimed)))));
  }
}

const _descriptor_2 = new _ContributionPublicState_0();

const _descriptor_3 = new __compactRuntime.CompactTypeUnsignedInteger(340282366920938463463374607431768211455n, 16);

const _descriptor_4 = new __compactRuntime.CompactTypeUnsignedInteger(65535n, 2);

class _BackupAnchorPublicState_0 {
  alignment() {
    return _descriptor_4.alignment().concat(_descriptor_0.alignment().concat(_descriptor_0.alignment()));
  }
  fromValue(value_0) {
    return {
      formatVersion: _descriptor_4.fromValue(value_0),
      authorization: _descriptor_0.fromValue(value_0),
      encryptedBlobDigest: _descriptor_0.fromValue(value_0)
    }
  }
  toValue(value_0) {
    return _descriptor_4.toValue(value_0.formatVersion).concat(_descriptor_0.toValue(value_0.authorization).concat(_descriptor_0.toValue(value_0.encryptedBlobDigest)));
  }
}

const _descriptor_5 = new _BackupAnchorPublicState_0();

const _descriptor_6 = new __compactRuntime.CompactTypeUnsignedInteger(18446744073709551615n, 8);

const _descriptor_7 = new __compactRuntime.CompactTypeEnum(3, 1);

class _InvoicePublicState_0 {
  alignment() {
    return _descriptor_4.alignment().concat(_descriptor_0.alignment().concat(_descriptor_0.alignment().concat(_descriptor_6.alignment().concat(_descriptor_7.alignment().concat(_descriptor_0.alignment().concat(_descriptor_0.alignment().concat(_descriptor_0.alignment().concat(_descriptor_1.alignment()))))))));
  }
  fromValue(value_0) {
    return {
      commitmentVersion: _descriptor_4.fromValue(value_0),
      commitment: _descriptor_0.fromValue(value_0),
      merchantAuthorization: _descriptor_0.fromValue(value_0),
      expiry: _descriptor_6.fromValue(value_0),
      status: _descriptor_7.fromValue(value_0),
      settlementNullifier: _descriptor_0.fromValue(value_0),
      escrowCoinCommitment: _descriptor_0.fromValue(value_0),
      receiptCommitment: _descriptor_0.fromValue(value_0),
      claimed: _descriptor_1.fromValue(value_0)
    }
  }
  toValue(value_0) {
    return _descriptor_4.toValue(value_0.commitmentVersion).concat(_descriptor_0.toValue(value_0.commitment).concat(_descriptor_0.toValue(value_0.merchantAuthorization).concat(_descriptor_6.toValue(value_0.expiry).concat(_descriptor_7.toValue(value_0.status).concat(_descriptor_0.toValue(value_0.settlementNullifier).concat(_descriptor_0.toValue(value_0.escrowCoinCommitment).concat(_descriptor_0.toValue(value_0.receiptCommitment).concat(_descriptor_1.toValue(value_0.claimed)))))))));
  }
}

const _descriptor_8 = new _InvoicePublicState_0();

class _QuotePublicState_0 {
  alignment() {
    return _descriptor_4.alignment().concat(_descriptor_0.alignment().concat(_descriptor_0.alignment().concat(_descriptor_6.alignment().concat(_descriptor_1.alignment()))));
  }
  fromValue(value_0) {
    return {
      commitmentVersion: _descriptor_4.fromValue(value_0),
      commitment: _descriptor_0.fromValue(value_0),
      providerId: _descriptor_0.fromValue(value_0),
      expiry: _descriptor_6.fromValue(value_0),
      consumed: _descriptor_1.fromValue(value_0)
    }
  }
  toValue(value_0) {
    return _descriptor_4.toValue(value_0.commitmentVersion).concat(_descriptor_0.toValue(value_0.commitment).concat(_descriptor_0.toValue(value_0.providerId).concat(_descriptor_6.toValue(value_0.expiry).concat(_descriptor_1.toValue(value_0.consumed)))));
  }
}

const _descriptor_9 = new _QuotePublicState_0();

class _ShieldedCoinInfo_0 {
  alignment() {
    return _descriptor_0.alignment().concat(_descriptor_0.alignment().concat(_descriptor_3.alignment()));
  }
  fromValue(value_0) {
    return {
      nonce: _descriptor_0.fromValue(value_0),
      color: _descriptor_0.fromValue(value_0),
      value: _descriptor_3.fromValue(value_0)
    }
  }
  toValue(value_0) {
    return _descriptor_0.toValue(value_0.nonce).concat(_descriptor_0.toValue(value_0.color).concat(_descriptor_3.toValue(value_0.value)));
  }
}

const _descriptor_10 = new _ShieldedCoinInfo_0();

const _descriptor_11 = new __compactRuntime.CompactTypeEnum(2, 1);

class _GiftCardPublicState_0 {
  alignment() {
    return _descriptor_4.alignment().concat(_descriptor_0.alignment().concat(_descriptor_0.alignment().concat(_descriptor_6.alignment().concat(_descriptor_0.alignment().concat(_descriptor_0.alignment().concat(_descriptor_11.alignment()))))));
  }
  fromValue(value_0) {
    return {
      commitmentVersion: _descriptor_4.fromValue(value_0),
      commitment: _descriptor_0.fromValue(value_0),
      issuerAuthorization: _descriptor_0.fromValue(value_0),
      expiry: _descriptor_6.fromValue(value_0),
      escrowCoinCommitment: _descriptor_0.fromValue(value_0),
      redemptionNullifier: _descriptor_0.fromValue(value_0),
      status: _descriptor_11.fromValue(value_0)
    }
  }
  toValue(value_0) {
    return _descriptor_4.toValue(value_0.commitmentVersion).concat(_descriptor_0.toValue(value_0.commitment).concat(_descriptor_0.toValue(value_0.issuerAuthorization).concat(_descriptor_6.toValue(value_0.expiry).concat(_descriptor_0.toValue(value_0.escrowCoinCommitment).concat(_descriptor_0.toValue(value_0.redemptionNullifier).concat(_descriptor_11.toValue(value_0.status)))))));
  }
}

const _descriptor_12 = new _GiftCardPublicState_0();

class _QualifiedShieldedCoinInfo_0 {
  alignment() {
    return _descriptor_0.alignment().concat(_descriptor_0.alignment().concat(_descriptor_3.alignment().concat(_descriptor_6.alignment())));
  }
  fromValue(value_0) {
    return {
      nonce: _descriptor_0.fromValue(value_0),
      color: _descriptor_0.fromValue(value_0),
      value: _descriptor_3.fromValue(value_0),
      mt_index: _descriptor_6.fromValue(value_0)
    }
  }
  toValue(value_0) {
    return _descriptor_0.toValue(value_0.nonce).concat(_descriptor_0.toValue(value_0.color).concat(_descriptor_3.toValue(value_0.value).concat(_descriptor_6.toValue(value_0.mt_index))));
  }
}

const _descriptor_13 = new _QualifiedShieldedCoinInfo_0();

class _Maybe_0 {
  alignment() {
    return _descriptor_1.alignment().concat(_descriptor_10.alignment());
  }
  fromValue(value_0) {
    return {
      is_some: _descriptor_1.fromValue(value_0),
      value: _descriptor_10.fromValue(value_0)
    }
  }
  toValue(value_0) {
    return _descriptor_1.toValue(value_0.is_some).concat(_descriptor_10.toValue(value_0.value));
  }
}

const _descriptor_14 = new _Maybe_0();

class _ShieldedSendResult_0 {
  alignment() {
    return _descriptor_14.alignment().concat(_descriptor_10.alignment());
  }
  fromValue(value_0) {
    return {
      change: _descriptor_14.fromValue(value_0),
      sent: _descriptor_10.fromValue(value_0)
    }
  }
  toValue(value_0) {
    return _descriptor_14.toValue(value_0.change).concat(_descriptor_10.toValue(value_0.sent));
  }
}

const _descriptor_15 = new _ShieldedSendResult_0();

const _descriptor_16 = new __compactRuntime.CompactTypeEnum(2, 1);

class _CampaignPublicState_0 {
  alignment() {
    return _descriptor_4.alignment().concat(_descriptor_0.alignment().concat(_descriptor_0.alignment().concat(_descriptor_6.alignment().concat(_descriptor_16.alignment().concat(_descriptor_6.alignment())))));
  }
  fromValue(value_0) {
    return {
      commitmentVersion: _descriptor_4.fromValue(value_0),
      commitment: _descriptor_0.fromValue(value_0),
      merchantAuthorization: _descriptor_0.fromValue(value_0),
      expiry: _descriptor_6.fromValue(value_0),
      status: _descriptor_16.fromValue(value_0),
      contributionCount: _descriptor_6.fromValue(value_0)
    }
  }
  toValue(value_0) {
    return _descriptor_4.toValue(value_0.commitmentVersion).concat(_descriptor_0.toValue(value_0.commitment).concat(_descriptor_0.toValue(value_0.merchantAuthorization).concat(_descriptor_6.toValue(value_0.expiry).concat(_descriptor_16.toValue(value_0.status).concat(_descriptor_6.toValue(value_0.contributionCount))))));
  }
}

const _descriptor_17 = new _CampaignPublicState_0();

const _descriptor_18 = new __compactRuntime.CompactTypeUnsignedInteger(255n, 1);

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

const _descriptor_19 = new _ZswapCoinPublicKey_0();

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

const _descriptor_20 = new _ContractAddress_0();

class _Either_0 {
  alignment() {
    return _descriptor_1.alignment().concat(_descriptor_19.alignment().concat(_descriptor_20.alignment()));
  }
  fromValue(value_0) {
    return {
      is_left: _descriptor_1.fromValue(value_0),
      left: _descriptor_19.fromValue(value_0),
      right: _descriptor_20.fromValue(value_0)
    }
  }
  toValue(value_0) {
    return _descriptor_1.toValue(value_0.is_left).concat(_descriptor_19.toValue(value_0.left).concat(_descriptor_20.toValue(value_0.right)));
  }
}

const _descriptor_21 = new _Either_0();

const _descriptor_22 = __compactRuntime.CompactTypeField;

class _tuple_0 {
  alignment() {
    return _descriptor_0.alignment().concat(_descriptor_4.alignment().concat(_descriptor_0.alignment().concat(_descriptor_0.alignment().concat(_descriptor_0.alignment().concat(_descriptor_0.alignment().concat(_descriptor_3.alignment().concat(_descriptor_0.alignment().concat(_descriptor_3.alignment().concat(_descriptor_6.alignment().concat(_descriptor_0.alignment()))))))))));
  }
  fromValue(value_0) {
    return [
      _descriptor_0.fromValue(value_0),
      _descriptor_4.fromValue(value_0),
      _descriptor_0.fromValue(value_0),
      _descriptor_0.fromValue(value_0),
      _descriptor_0.fromValue(value_0),
      _descriptor_0.fromValue(value_0),
      _descriptor_3.fromValue(value_0),
      _descriptor_0.fromValue(value_0),
      _descriptor_3.fromValue(value_0),
      _descriptor_6.fromValue(value_0),
      _descriptor_0.fromValue(value_0)
    ]
  }
  toValue(value_0) {
    return _descriptor_0.toValue(value_0[0]).concat(_descriptor_4.toValue(value_0[1]).concat(_descriptor_0.toValue(value_0[2]).concat(_descriptor_0.toValue(value_0[3]).concat(_descriptor_0.toValue(value_0[4]).concat(_descriptor_0.toValue(value_0[5]).concat(_descriptor_3.toValue(value_0[6]).concat(_descriptor_0.toValue(value_0[7]).concat(_descriptor_3.toValue(value_0[8]).concat(_descriptor_6.toValue(value_0[9]).concat(_descriptor_0.toValue(value_0[10])))))))))));
  }
}

const _descriptor_23 = new _tuple_0();

const _descriptor_24 = new __compactRuntime.CompactTypeBytes(21);

class _CoinPreimage_0 {
  alignment() {
    return _descriptor_24.alignment().concat(_descriptor_10.alignment().concat(_descriptor_1.alignment().concat(_descriptor_0.alignment())));
  }
  fromValue(value_0) {
    return {
      domain_sep: _descriptor_24.fromValue(value_0),
      info: _descriptor_10.fromValue(value_0),
      dataType: _descriptor_1.fromValue(value_0),
      data: _descriptor_0.fromValue(value_0)
    }
  }
  toValue(value_0) {
    return _descriptor_24.toValue(value_0.domain_sep).concat(_descriptor_10.toValue(value_0.info).concat(_descriptor_1.toValue(value_0.dataType).concat(_descriptor_0.toValue(value_0.data))));
  }
}

const _descriptor_25 = new _CoinPreimage_0();

class _tuple_1 {
  alignment() {
    return _descriptor_0.alignment().concat(_descriptor_4.alignment().concat(_descriptor_0.alignment().concat(_descriptor_3.alignment().concat(_descriptor_0.alignment().concat(_descriptor_0.alignment().concat(_descriptor_0.alignment().concat(_descriptor_6.alignment())))))));
  }
  fromValue(value_0) {
    return [
      _descriptor_0.fromValue(value_0),
      _descriptor_4.fromValue(value_0),
      _descriptor_0.fromValue(value_0),
      _descriptor_3.fromValue(value_0),
      _descriptor_0.fromValue(value_0),
      _descriptor_0.fromValue(value_0),
      _descriptor_0.fromValue(value_0),
      _descriptor_6.fromValue(value_0)
    ]
  }
  toValue(value_0) {
    return _descriptor_0.toValue(value_0[0]).concat(_descriptor_4.toValue(value_0[1]).concat(_descriptor_0.toValue(value_0[2]).concat(_descriptor_3.toValue(value_0[3]).concat(_descriptor_0.toValue(value_0[4]).concat(_descriptor_0.toValue(value_0[5]).concat(_descriptor_0.toValue(value_0[6]).concat(_descriptor_6.toValue(value_0[7]))))))));
  }
}

const _descriptor_26 = new _tuple_1();

class _tuple_2 {
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

const _descriptor_27 = new _tuple_2();

class _tuple_3 {
  alignment() {
    return _descriptor_0.alignment().concat(_descriptor_4.alignment().concat(_descriptor_0.alignment().concat(_descriptor_0.alignment().concat(_descriptor_3.alignment().concat(_descriptor_3.alignment().concat(_descriptor_18.alignment().concat(_descriptor_0.alignment().concat(_descriptor_0.alignment().concat(_descriptor_0.alignment().concat(_descriptor_0.alignment().concat(_descriptor_0.alignment().concat(_descriptor_0.alignment().concat(_descriptor_6.alignment())))))))))))));
  }
  fromValue(value_0) {
    return [
      _descriptor_0.fromValue(value_0),
      _descriptor_4.fromValue(value_0),
      _descriptor_0.fromValue(value_0),
      _descriptor_0.fromValue(value_0),
      _descriptor_3.fromValue(value_0),
      _descriptor_3.fromValue(value_0),
      _descriptor_18.fromValue(value_0),
      _descriptor_0.fromValue(value_0),
      _descriptor_0.fromValue(value_0),
      _descriptor_0.fromValue(value_0),
      _descriptor_0.fromValue(value_0),
      _descriptor_0.fromValue(value_0),
      _descriptor_0.fromValue(value_0),
      _descriptor_6.fromValue(value_0)
    ]
  }
  toValue(value_0) {
    return _descriptor_0.toValue(value_0[0]).concat(_descriptor_4.toValue(value_0[1]).concat(_descriptor_0.toValue(value_0[2]).concat(_descriptor_0.toValue(value_0[3]).concat(_descriptor_3.toValue(value_0[4]).concat(_descriptor_3.toValue(value_0[5]).concat(_descriptor_18.toValue(value_0[6]).concat(_descriptor_0.toValue(value_0[7]).concat(_descriptor_0.toValue(value_0[8]).concat(_descriptor_0.toValue(value_0[9]).concat(_descriptor_0.toValue(value_0[10]).concat(_descriptor_0.toValue(value_0[11]).concat(_descriptor_0.toValue(value_0[12]).concat(_descriptor_6.toValue(value_0[13]))))))))))))));
  }
}

const _descriptor_28 = new _tuple_3();

class _tuple_4 {
  alignment() {
    return _descriptor_0.alignment().concat(_descriptor_0.alignment().concat(_descriptor_0.alignment().concat(_descriptor_3.alignment().concat(_descriptor_0.alignment().concat(_descriptor_0.alignment())))));
  }
  fromValue(value_0) {
    return [
      _descriptor_0.fromValue(value_0),
      _descriptor_0.fromValue(value_0),
      _descriptor_0.fromValue(value_0),
      _descriptor_3.fromValue(value_0),
      _descriptor_0.fromValue(value_0),
      _descriptor_0.fromValue(value_0)
    ]
  }
  toValue(value_0) {
    return _descriptor_0.toValue(value_0[0]).concat(_descriptor_0.toValue(value_0[1]).concat(_descriptor_0.toValue(value_0[2]).concat(_descriptor_3.toValue(value_0[3]).concat(_descriptor_0.toValue(value_0[4]).concat(_descriptor_0.toValue(value_0[5]))))));
  }
}

const _descriptor_29 = new _tuple_4();

class _tuple_5 {
  alignment() {
    return _descriptor_0.alignment().concat(_descriptor_4.alignment().concat(_descriptor_0.alignment().concat(_descriptor_0.alignment().concat(_descriptor_3.alignment().concat(_descriptor_0.alignment().concat(_descriptor_0.alignment().concat(_descriptor_0.alignment().concat(_descriptor_6.alignment()))))))));
  }
  fromValue(value_0) {
    return [
      _descriptor_0.fromValue(value_0),
      _descriptor_4.fromValue(value_0),
      _descriptor_0.fromValue(value_0),
      _descriptor_0.fromValue(value_0),
      _descriptor_3.fromValue(value_0),
      _descriptor_0.fromValue(value_0),
      _descriptor_0.fromValue(value_0),
      _descriptor_0.fromValue(value_0),
      _descriptor_6.fromValue(value_0)
    ]
  }
  toValue(value_0) {
    return _descriptor_0.toValue(value_0[0]).concat(_descriptor_4.toValue(value_0[1]).concat(_descriptor_0.toValue(value_0[2]).concat(_descriptor_0.toValue(value_0[3]).concat(_descriptor_3.toValue(value_0[4]).concat(_descriptor_0.toValue(value_0[5]).concat(_descriptor_0.toValue(value_0[6]).concat(_descriptor_0.toValue(value_0[7]).concat(_descriptor_6.toValue(value_0[8])))))))));
  }
}

const _descriptor_30 = new _tuple_5();

class _tuple_6 {
  alignment() {
    return _descriptor_0.alignment().concat(_descriptor_0.alignment().concat(_descriptor_0.alignment().concat(_descriptor_3.alignment())));
  }
  fromValue(value_0) {
    return [
      _descriptor_0.fromValue(value_0),
      _descriptor_0.fromValue(value_0),
      _descriptor_0.fromValue(value_0),
      _descriptor_3.fromValue(value_0)
    ]
  }
  toValue(value_0) {
    return _descriptor_0.toValue(value_0[0]).concat(_descriptor_0.toValue(value_0[1]).concat(_descriptor_0.toValue(value_0[2]).concat(_descriptor_3.toValue(value_0[3]))));
  }
}

const _descriptor_31 = new _tuple_6();

const _descriptor_32 = new __compactRuntime.CompactTypeVector(2, _descriptor_22);

class _tuple_7 {
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

const _descriptor_33 = new _tuple_7();

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

const _descriptor_34 = new _Either_1();

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
      deriveQuoteProviderAuthorization(context, ...args_1) {
        return { result: pureCircuits.deriveQuoteProviderAuthorization(...args_1), context };
      },
      deriveBackupAuthorization(context, ...args_1) {
        return { result: pureCircuits.deriveBackupAuthorization(...args_1), context };
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
      deriveQuoteCommitment(context, ...args_1) {
        return { result: pureCircuits.deriveQuoteCommitment(...args_1), context };
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
                                     'lumapay.compact line 400 char 1',
                                     'CircuitContext',
                                     contextOrig_0)
        }
        if (!(invoiceId_0.buffer instanceof ArrayBuffer && invoiceId_0.BYTES_PER_ELEMENT === 1 && invoiceId_0.length === 32)) {
          __compactRuntime.typeError('createInvoice',
                                     'argument 1 (argument 2 as invoked from Typescript)',
                                     'lumapay.compact line 400 char 1',
                                     'Bytes<32>',
                                     invoiceId_0)
        }
        if (!(invoiceCommitment_0.buffer instanceof ArrayBuffer && invoiceCommitment_0.BYTES_PER_ELEMENT === 1 && invoiceCommitment_0.length === 32)) {
          __compactRuntime.typeError('createInvoice',
                                     'argument 2 (argument 3 as invoked from Typescript)',
                                     'lumapay.compact line 400 char 1',
                                     'Bytes<32>',
                                     invoiceCommitment_0)
        }
        if (!(merchantAuthorizationCommitment_0.buffer instanceof ArrayBuffer && merchantAuthorizationCommitment_0.BYTES_PER_ELEMENT === 1 && merchantAuthorizationCommitment_0.length === 32)) {
          __compactRuntime.typeError('createInvoice',
                                     'argument 3 (argument 4 as invoked from Typescript)',
                                     'lumapay.compact line 400 char 1',
                                     'Bytes<32>',
                                     merchantAuthorizationCommitment_0)
        }
        if (!(typeof(expiry_0) === 'bigint' && expiry_0 >= 0n && expiry_0 <= 18446744073709551615n)) {
          __compactRuntime.typeError('createInvoice',
                                     'argument 4 (argument 5 as invoked from Typescript)',
                                     'lumapay.compact line 400 char 1',
                                     'Uint<0..18446744073709551616>',
                                     expiry_0)
        }
        const context = { ...contextOrig_0, gasCost: __compactRuntime.emptyRunningCost() };
        const partialProofData = {
          input: {
            value: _descriptor_0.toValue(invoiceId_0).concat(_descriptor_0.toValue(invoiceCommitment_0).concat(_descriptor_0.toValue(merchantAuthorizationCommitment_0).concat(_descriptor_6.toValue(expiry_0)))),
            alignment: _descriptor_0.alignment().concat(_descriptor_0.alignment().concat(_descriptor_0.alignment().concat(_descriptor_6.alignment())))
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
                                     'lumapay.compact line 429 char 1',
                                     'CircuitContext',
                                     contextOrig_0)
        }
        if (!(invoiceId_0.buffer instanceof ArrayBuffer && invoiceId_0.BYTES_PER_ELEMENT === 1 && invoiceId_0.length === 32)) {
          __compactRuntime.typeError('payInvoice',
                                     'argument 1 (argument 2 as invoked from Typescript)',
                                     'lumapay.compact line 429 char 1',
                                     'Bytes<32>',
                                     invoiceId_0)
        }
        if (!(merchantPrivateIdentity_0.buffer instanceof ArrayBuffer && merchantPrivateIdentity_0.BYTES_PER_ELEMENT === 1 && merchantPrivateIdentity_0.length === 32)) {
          __compactRuntime.typeError('payInvoice',
                                     'argument 2 (argument 3 as invoked from Typescript)',
                                     'lumapay.compact line 429 char 1',
                                     'Bytes<32>',
                                     merchantPrivateIdentity_0)
        }
        if (!(typeof(amount_0) === 'bigint' && amount_0 >= 0n && amount_0 <= 340282366920938463463374607431768211455n)) {
          __compactRuntime.typeError('payInvoice',
                                     'argument 3 (argument 4 as invoked from Typescript)',
                                     'lumapay.compact line 429 char 1',
                                     'Uint<0..340282366920938463463374607431768211456>',
                                     amount_0)
        }
        if (!(tokenId_0.buffer instanceof ArrayBuffer && tokenId_0.BYTES_PER_ELEMENT === 1 && tokenId_0.length === 32)) {
          __compactRuntime.typeError('payInvoice',
                                     'argument 4 (argument 5 as invoked from Typescript)',
                                     'lumapay.compact line 429 char 1',
                                     'Bytes<32>',
                                     tokenId_0)
        }
        if (!(invoiceNonce_0.buffer instanceof ArrayBuffer && invoiceNonce_0.BYTES_PER_ELEMENT === 1 && invoiceNonce_0.length === 32)) {
          __compactRuntime.typeError('payInvoice',
                                     'argument 5 (argument 6 as invoked from Typescript)',
                                     'lumapay.compact line 429 char 1',
                                     'Bytes<32>',
                                     invoiceNonce_0)
        }
        if (!(invoiceRandomness_0.buffer instanceof ArrayBuffer && invoiceRandomness_0.BYTES_PER_ELEMENT === 1 && invoiceRandomness_0.length === 32)) {
          __compactRuntime.typeError('payInvoice',
                                     'argument 6 (argument 7 as invoked from Typescript)',
                                     'lumapay.compact line 429 char 1',
                                     'Bytes<32>',
                                     invoiceRandomness_0)
        }
        if (!(paymentSecret_0.buffer instanceof ArrayBuffer && paymentSecret_0.BYTES_PER_ELEMENT === 1 && paymentSecret_0.length === 32)) {
          __compactRuntime.typeError('payInvoice',
                                     'argument 7 (argument 8 as invoked from Typescript)',
                                     'lumapay.compact line 429 char 1',
                                     'Bytes<32>',
                                     paymentSecret_0)
        }
        if (!(receiptSecret_0.buffer instanceof ArrayBuffer && receiptSecret_0.BYTES_PER_ELEMENT === 1 && receiptSecret_0.length === 32)) {
          __compactRuntime.typeError('payInvoice',
                                     'argument 8 (argument 9 as invoked from Typescript)',
                                     'lumapay.compact line 429 char 1',
                                     'Bytes<32>',
                                     receiptSecret_0)
        }
        if (!(typeof(coin_0) === 'object' && coin_0.nonce.buffer instanceof ArrayBuffer && coin_0.nonce.BYTES_PER_ELEMENT === 1 && coin_0.nonce.length === 32 && coin_0.color.buffer instanceof ArrayBuffer && coin_0.color.BYTES_PER_ELEMENT === 1 && coin_0.color.length === 32 && typeof(coin_0.value) === 'bigint' && coin_0.value >= 0n && coin_0.value <= 340282366920938463463374607431768211455n)) {
          __compactRuntime.typeError('payInvoice',
                                     'argument 9 (argument 10 as invoked from Typescript)',
                                     'lumapay.compact line 429 char 1',
                                     'struct ShieldedCoinInfo<nonce: Bytes<32>, color: Bytes<32>, value: Uint<0..340282366920938463463374607431768211456>>',
                                     coin_0)
        }
        const context = { ...contextOrig_0, gasCost: __compactRuntime.emptyRunningCost() };
        const partialProofData = {
          input: {
            value: _descriptor_0.toValue(invoiceId_0).concat(_descriptor_0.toValue(merchantPrivateIdentity_0).concat(_descriptor_3.toValue(amount_0).concat(_descriptor_0.toValue(tokenId_0).concat(_descriptor_0.toValue(invoiceNonce_0).concat(_descriptor_0.toValue(invoiceRandomness_0).concat(_descriptor_0.toValue(paymentSecret_0).concat(_descriptor_0.toValue(receiptSecret_0).concat(_descriptor_10.toValue(coin_0))))))))),
            alignment: _descriptor_0.alignment().concat(_descriptor_0.alignment().concat(_descriptor_3.alignment().concat(_descriptor_0.alignment().concat(_descriptor_0.alignment().concat(_descriptor_0.alignment().concat(_descriptor_0.alignment().concat(_descriptor_0.alignment().concat(_descriptor_10.alignment()))))))))
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
                                     'lumapay.compact line 480 char 1',
                                     'CircuitContext',
                                     contextOrig_0)
        }
        if (!(invoiceId_0.buffer instanceof ArrayBuffer && invoiceId_0.BYTES_PER_ELEMENT === 1 && invoiceId_0.length === 32)) {
          __compactRuntime.typeError('claimInvoice',
                                     'argument 1 (argument 2 as invoked from Typescript)',
                                     'lumapay.compact line 480 char 1',
                                     'Bytes<32>',
                                     invoiceId_0)
        }
        if (!(merchantClaimSecret_0.buffer instanceof ArrayBuffer && merchantClaimSecret_0.BYTES_PER_ELEMENT === 1 && merchantClaimSecret_0.length === 32)) {
          __compactRuntime.typeError('claimInvoice',
                                     'argument 2 (argument 3 as invoked from Typescript)',
                                     'lumapay.compact line 480 char 1',
                                     'Bytes<32>',
                                     merchantClaimSecret_0)
        }
        if (!(typeof(escrowCoin_0) === 'object' && escrowCoin_0.nonce.buffer instanceof ArrayBuffer && escrowCoin_0.nonce.BYTES_PER_ELEMENT === 1 && escrowCoin_0.nonce.length === 32 && escrowCoin_0.color.buffer instanceof ArrayBuffer && escrowCoin_0.color.BYTES_PER_ELEMENT === 1 && escrowCoin_0.color.length === 32 && typeof(escrowCoin_0.value) === 'bigint' && escrowCoin_0.value >= 0n && escrowCoin_0.value <= 340282366920938463463374607431768211455n && typeof(escrowCoin_0.mt_index) === 'bigint' && escrowCoin_0.mt_index >= 0n && escrowCoin_0.mt_index <= 18446744073709551615n)) {
          __compactRuntime.typeError('claimInvoice',
                                     'argument 3 (argument 4 as invoked from Typescript)',
                                     'lumapay.compact line 480 char 1',
                                     'struct QualifiedShieldedCoinInfo<nonce: Bytes<32>, color: Bytes<32>, value: Uint<0..340282366920938463463374607431768211456>, mt_index: Uint<0..18446744073709551616>>',
                                     escrowCoin_0)
        }
        const context = { ...contextOrig_0, gasCost: __compactRuntime.emptyRunningCost() };
        const partialProofData = {
          input: {
            value: _descriptor_0.toValue(invoiceId_0).concat(_descriptor_0.toValue(merchantClaimSecret_0).concat(_descriptor_13.toValue(escrowCoin_0))),
            alignment: _descriptor_0.alignment().concat(_descriptor_0.alignment().concat(_descriptor_13.alignment()))
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
        partialProofData.output = { value: _descriptor_15.toValue(result_0), alignment: _descriptor_15.alignment() };
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
                                     'lumapay.compact line 524 char 1',
                                     'CircuitContext',
                                     contextOrig_0)
        }
        if (!(invoiceId_0.buffer instanceof ArrayBuffer && invoiceId_0.BYTES_PER_ELEMENT === 1 && invoiceId_0.length === 32)) {
          __compactRuntime.typeError('cancelInvoice',
                                     'argument 1 (argument 2 as invoked from Typescript)',
                                     'lumapay.compact line 524 char 1',
                                     'Bytes<32>',
                                     invoiceId_0)
        }
        if (!(merchantClaimSecret_0.buffer instanceof ArrayBuffer && merchantClaimSecret_0.BYTES_PER_ELEMENT === 1 && merchantClaimSecret_0.length === 32)) {
          __compactRuntime.typeError('cancelInvoice',
                                     'argument 2 (argument 3 as invoked from Typescript)',
                                     'lumapay.compact line 524 char 1',
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
                                     'lumapay.compact line 546 char 1',
                                     'CircuitContext',
                                     contextOrig_0)
        }
        if (!(invoiceId_0.buffer instanceof ArrayBuffer && invoiceId_0.BYTES_PER_ELEMENT === 1 && invoiceId_0.length === 32)) {
          __compactRuntime.typeError('expireInvoice',
                                     'argument 1 (argument 2 as invoked from Typescript)',
                                     'lumapay.compact line 546 char 1',
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
                                     'lumapay.compact line 582 char 1',
                                     'CircuitContext',
                                     contextOrig_0)
        }
        if (!(campaignId_0.buffer instanceof ArrayBuffer && campaignId_0.BYTES_PER_ELEMENT === 1 && campaignId_0.length === 32)) {
          __compactRuntime.typeError('createCampaign',
                                     'argument 1 (argument 2 as invoked from Typescript)',
                                     'lumapay.compact line 582 char 1',
                                     'Bytes<32>',
                                     campaignId_0)
        }
        if (!(campaignCommitment_0.buffer instanceof ArrayBuffer && campaignCommitment_0.BYTES_PER_ELEMENT === 1 && campaignCommitment_0.length === 32)) {
          __compactRuntime.typeError('createCampaign',
                                     'argument 2 (argument 3 as invoked from Typescript)',
                                     'lumapay.compact line 582 char 1',
                                     'Bytes<32>',
                                     campaignCommitment_0)
        }
        if (!(merchantAuthorizationCommitment_0.buffer instanceof ArrayBuffer && merchantAuthorizationCommitment_0.BYTES_PER_ELEMENT === 1 && merchantAuthorizationCommitment_0.length === 32)) {
          __compactRuntime.typeError('createCampaign',
                                     'argument 3 (argument 4 as invoked from Typescript)',
                                     'lumapay.compact line 582 char 1',
                                     'Bytes<32>',
                                     merchantAuthorizationCommitment_0)
        }
        if (!(typeof(expiry_0) === 'bigint' && expiry_0 >= 0n && expiry_0 <= 18446744073709551615n)) {
          __compactRuntime.typeError('createCampaign',
                                     'argument 4 (argument 5 as invoked from Typescript)',
                                     'lumapay.compact line 582 char 1',
                                     'Uint<0..18446744073709551616>',
                                     expiry_0)
        }
        const context = { ...contextOrig_0, gasCost: __compactRuntime.emptyRunningCost() };
        const partialProofData = {
          input: {
            value: _descriptor_0.toValue(campaignId_0).concat(_descriptor_0.toValue(campaignCommitment_0).concat(_descriptor_0.toValue(merchantAuthorizationCommitment_0).concat(_descriptor_6.toValue(expiry_0)))),
            alignment: _descriptor_0.alignment().concat(_descriptor_0.alignment().concat(_descriptor_0.alignment().concat(_descriptor_6.alignment())))
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
                                     'lumapay.compact line 608 char 1',
                                     'CircuitContext',
                                     contextOrig_0)
        }
        if (!(campaignId_0.buffer instanceof ArrayBuffer && campaignId_0.BYTES_PER_ELEMENT === 1 && campaignId_0.length === 32)) {
          __compactRuntime.typeError('contribute',
                                     'argument 1 (argument 2 as invoked from Typescript)',
                                     'lumapay.compact line 608 char 1',
                                     'Bytes<32>',
                                     campaignId_0)
        }
        if (!(merchantPrivateIdentity_0.buffer instanceof ArrayBuffer && merchantPrivateIdentity_0.BYTES_PER_ELEMENT === 1 && merchantPrivateIdentity_0.length === 32)) {
          __compactRuntime.typeError('contribute',
                                     'argument 2 (argument 3 as invoked from Typescript)',
                                     'lumapay.compact line 608 char 1',
                                     'Bytes<32>',
                                     merchantPrivateIdentity_0)
        }
        if (!(typeof(minimumContribution_0) === 'bigint' && minimumContribution_0 >= 0n && minimumContribution_0 <= 340282366920938463463374607431768211455n)) {
          __compactRuntime.typeError('contribute',
                                     'argument 3 (argument 4 as invoked from Typescript)',
                                     'lumapay.compact line 608 char 1',
                                     'Uint<0..340282366920938463463374607431768211456>',
                                     minimumContribution_0)
        }
        if (!(typeof(maximumContribution_0) === 'bigint' && maximumContribution_0 >= 0n && maximumContribution_0 <= 340282366920938463463374607431768211455n)) {
          __compactRuntime.typeError('contribute',
                                     'argument 4 (argument 5 as invoked from Typescript)',
                                     'lumapay.compact line 608 char 1',
                                     'Uint<0..340282366920938463463374607431768211456>',
                                     maximumContribution_0)
        }
        if (!(typeof(acceptedTokenCount_0) === 'bigint' && acceptedTokenCount_0 >= 0n && acceptedTokenCount_0 <= 255n)) {
          __compactRuntime.typeError('contribute',
                                     'argument 5 (argument 6 as invoked from Typescript)',
                                     'lumapay.compact line 608 char 1',
                                     'Uint<0..256>',
                                     acceptedTokenCount_0)
        }
        if (!(acceptedTokenA_0.buffer instanceof ArrayBuffer && acceptedTokenA_0.BYTES_PER_ELEMENT === 1 && acceptedTokenA_0.length === 32)) {
          __compactRuntime.typeError('contribute',
                                     'argument 6 (argument 7 as invoked from Typescript)',
                                     'lumapay.compact line 608 char 1',
                                     'Bytes<32>',
                                     acceptedTokenA_0)
        }
        if (!(acceptedTokenB_0.buffer instanceof ArrayBuffer && acceptedTokenB_0.BYTES_PER_ELEMENT === 1 && acceptedTokenB_0.length === 32)) {
          __compactRuntime.typeError('contribute',
                                     'argument 7 (argument 8 as invoked from Typescript)',
                                     'lumapay.compact line 608 char 1',
                                     'Bytes<32>',
                                     acceptedTokenB_0)
        }
        if (!(acceptedTokenC_0.buffer instanceof ArrayBuffer && acceptedTokenC_0.BYTES_PER_ELEMENT === 1 && acceptedTokenC_0.length === 32)) {
          __compactRuntime.typeError('contribute',
                                     'argument 8 (argument 9 as invoked from Typescript)',
                                     'lumapay.compact line 608 char 1',
                                     'Bytes<32>',
                                     acceptedTokenC_0)
        }
        if (!(acceptedTokenD_0.buffer instanceof ArrayBuffer && acceptedTokenD_0.BYTES_PER_ELEMENT === 1 && acceptedTokenD_0.length === 32)) {
          __compactRuntime.typeError('contribute',
                                     'argument 9 (argument 10 as invoked from Typescript)',
                                     'lumapay.compact line 608 char 1',
                                     'Bytes<32>',
                                     acceptedTokenD_0)
        }
        if (!(campaignNonce_0.buffer instanceof ArrayBuffer && campaignNonce_0.BYTES_PER_ELEMENT === 1 && campaignNonce_0.length === 32)) {
          __compactRuntime.typeError('contribute',
                                     'argument 10 (argument 11 as invoked from Typescript)',
                                     'lumapay.compact line 608 char 1',
                                     'Bytes<32>',
                                     campaignNonce_0)
        }
        if (!(campaignRandomness_0.buffer instanceof ArrayBuffer && campaignRandomness_0.BYTES_PER_ELEMENT === 1 && campaignRandomness_0.length === 32)) {
          __compactRuntime.typeError('contribute',
                                     'argument 11 (argument 12 as invoked from Typescript)',
                                     'lumapay.compact line 608 char 1',
                                     'Bytes<32>',
                                     campaignRandomness_0)
        }
        if (!(contributionSecret_0.buffer instanceof ArrayBuffer && contributionSecret_0.BYTES_PER_ELEMENT === 1 && contributionSecret_0.length === 32)) {
          __compactRuntime.typeError('contribute',
                                     'argument 12 (argument 13 as invoked from Typescript)',
                                     'lumapay.compact line 608 char 1',
                                     'Bytes<32>',
                                     contributionSecret_0)
        }
        if (!(receiptSecret_0.buffer instanceof ArrayBuffer && receiptSecret_0.BYTES_PER_ELEMENT === 1 && receiptSecret_0.length === 32)) {
          __compactRuntime.typeError('contribute',
                                     'argument 13 (argument 14 as invoked from Typescript)',
                                     'lumapay.compact line 608 char 1',
                                     'Bytes<32>',
                                     receiptSecret_0)
        }
        if (!(typeof(coin_0) === 'object' && coin_0.nonce.buffer instanceof ArrayBuffer && coin_0.nonce.BYTES_PER_ELEMENT === 1 && coin_0.nonce.length === 32 && coin_0.color.buffer instanceof ArrayBuffer && coin_0.color.BYTES_PER_ELEMENT === 1 && coin_0.color.length === 32 && typeof(coin_0.value) === 'bigint' && coin_0.value >= 0n && coin_0.value <= 340282366920938463463374607431768211455n)) {
          __compactRuntime.typeError('contribute',
                                     'argument 14 (argument 15 as invoked from Typescript)',
                                     'lumapay.compact line 608 char 1',
                                     'struct ShieldedCoinInfo<nonce: Bytes<32>, color: Bytes<32>, value: Uint<0..340282366920938463463374607431768211456>>',
                                     coin_0)
        }
        const context = { ...contextOrig_0, gasCost: __compactRuntime.emptyRunningCost() };
        const partialProofData = {
          input: {
            value: _descriptor_0.toValue(campaignId_0).concat(_descriptor_0.toValue(merchantPrivateIdentity_0).concat(_descriptor_3.toValue(minimumContribution_0).concat(_descriptor_3.toValue(maximumContribution_0).concat(_descriptor_18.toValue(acceptedTokenCount_0).concat(_descriptor_0.toValue(acceptedTokenA_0).concat(_descriptor_0.toValue(acceptedTokenB_0).concat(_descriptor_0.toValue(acceptedTokenC_0).concat(_descriptor_0.toValue(acceptedTokenD_0).concat(_descriptor_0.toValue(campaignNonce_0).concat(_descriptor_0.toValue(campaignRandomness_0).concat(_descriptor_0.toValue(contributionSecret_0).concat(_descriptor_0.toValue(receiptSecret_0).concat(_descriptor_10.toValue(coin_0)))))))))))))),
            alignment: _descriptor_0.alignment().concat(_descriptor_0.alignment().concat(_descriptor_3.alignment().concat(_descriptor_3.alignment().concat(_descriptor_18.alignment().concat(_descriptor_0.alignment().concat(_descriptor_0.alignment().concat(_descriptor_0.alignment().concat(_descriptor_0.alignment().concat(_descriptor_0.alignment().concat(_descriptor_0.alignment().concat(_descriptor_0.alignment().concat(_descriptor_0.alignment().concat(_descriptor_10.alignment())))))))))))))
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
                                     'lumapay.compact line 697 char 1',
                                     'CircuitContext',
                                     contextOrig_0)
        }
        if (!(contributionId_0.buffer instanceof ArrayBuffer && contributionId_0.BYTES_PER_ELEMENT === 1 && contributionId_0.length === 32)) {
          __compactRuntime.typeError('claimContribution',
                                     'argument 1 (argument 2 as invoked from Typescript)',
                                     'lumapay.compact line 697 char 1',
                                     'Bytes<32>',
                                     contributionId_0)
        }
        if (!(merchantClaimSecret_0.buffer instanceof ArrayBuffer && merchantClaimSecret_0.BYTES_PER_ELEMENT === 1 && merchantClaimSecret_0.length === 32)) {
          __compactRuntime.typeError('claimContribution',
                                     'argument 2 (argument 3 as invoked from Typescript)',
                                     'lumapay.compact line 697 char 1',
                                     'Bytes<32>',
                                     merchantClaimSecret_0)
        }
        if (!(typeof(escrowCoin_0) === 'object' && escrowCoin_0.nonce.buffer instanceof ArrayBuffer && escrowCoin_0.nonce.BYTES_PER_ELEMENT === 1 && escrowCoin_0.nonce.length === 32 && escrowCoin_0.color.buffer instanceof ArrayBuffer && escrowCoin_0.color.BYTES_PER_ELEMENT === 1 && escrowCoin_0.color.length === 32 && typeof(escrowCoin_0.value) === 'bigint' && escrowCoin_0.value >= 0n && escrowCoin_0.value <= 340282366920938463463374607431768211455n && typeof(escrowCoin_0.mt_index) === 'bigint' && escrowCoin_0.mt_index >= 0n && escrowCoin_0.mt_index <= 18446744073709551615n)) {
          __compactRuntime.typeError('claimContribution',
                                     'argument 3 (argument 4 as invoked from Typescript)',
                                     'lumapay.compact line 697 char 1',
                                     'struct QualifiedShieldedCoinInfo<nonce: Bytes<32>, color: Bytes<32>, value: Uint<0..340282366920938463463374607431768211456>, mt_index: Uint<0..18446744073709551616>>',
                                     escrowCoin_0)
        }
        const context = { ...contextOrig_0, gasCost: __compactRuntime.emptyRunningCost() };
        const partialProofData = {
          input: {
            value: _descriptor_0.toValue(contributionId_0).concat(_descriptor_0.toValue(merchantClaimSecret_0).concat(_descriptor_13.toValue(escrowCoin_0))),
            alignment: _descriptor_0.alignment().concat(_descriptor_0.alignment().concat(_descriptor_13.alignment()))
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
        partialProofData.output = { value: _descriptor_15.toValue(result_0), alignment: _descriptor_15.alignment() };
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
                                     'lumapay.compact line 734 char 1',
                                     'CircuitContext',
                                     contextOrig_0)
        }
        if (!(campaignId_0.buffer instanceof ArrayBuffer && campaignId_0.BYTES_PER_ELEMENT === 1 && campaignId_0.length === 32)) {
          __compactRuntime.typeError('cancelCampaign',
                                     'argument 1 (argument 2 as invoked from Typescript)',
                                     'lumapay.compact line 734 char 1',
                                     'Bytes<32>',
                                     campaignId_0)
        }
        if (!(merchantClaimSecret_0.buffer instanceof ArrayBuffer && merchantClaimSecret_0.BYTES_PER_ELEMENT === 1 && merchantClaimSecret_0.length === 32)) {
          __compactRuntime.typeError('cancelCampaign',
                                     'argument 2 (argument 3 as invoked from Typescript)',
                                     'lumapay.compact line 734 char 1',
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
                                     'lumapay.compact line 752 char 1',
                                     'CircuitContext',
                                     contextOrig_0)
        }
        if (!(campaignId_0.buffer instanceof ArrayBuffer && campaignId_0.BYTES_PER_ELEMENT === 1 && campaignId_0.length === 32)) {
          __compactRuntime.typeError('expireCampaign',
                                     'argument 1 (argument 2 as invoked from Typescript)',
                                     'lumapay.compact line 752 char 1',
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
                                     'lumapay.compact line 784 char 1',
                                     'CircuitContext',
                                     contextOrig_0)
        }
        if (!(giftCardId_0.buffer instanceof ArrayBuffer && giftCardId_0.BYTES_PER_ELEMENT === 1 && giftCardId_0.length === 32)) {
          __compactRuntime.typeError('createGiftCard',
                                     'argument 1 (argument 2 as invoked from Typescript)',
                                     'lumapay.compact line 784 char 1',
                                     'Bytes<32>',
                                     giftCardId_0)
        }
        if (!(typeof(amount_0) === 'bigint' && amount_0 >= 0n && amount_0 <= 340282366920938463463374607431768211455n)) {
          __compactRuntime.typeError('createGiftCard',
                                     'argument 2 (argument 3 as invoked from Typescript)',
                                     'lumapay.compact line 784 char 1',
                                     'Uint<0..340282366920938463463374607431768211456>',
                                     amount_0)
        }
        if (!(tokenId_0.buffer instanceof ArrayBuffer && tokenId_0.BYTES_PER_ELEMENT === 1 && tokenId_0.length === 32)) {
          __compactRuntime.typeError('createGiftCard',
                                     'argument 3 (argument 4 as invoked from Typescript)',
                                     'lumapay.compact line 784 char 1',
                                     'Bytes<32>',
                                     tokenId_0)
        }
        if (!(giftSecret_0.buffer instanceof ArrayBuffer && giftSecret_0.BYTES_PER_ELEMENT === 1 && giftSecret_0.length === 32)) {
          __compactRuntime.typeError('createGiftCard',
                                     'argument 4 (argument 5 as invoked from Typescript)',
                                     'lumapay.compact line 784 char 1',
                                     'Bytes<32>',
                                     giftSecret_0)
        }
        if (!(giftRandomness_0.buffer instanceof ArrayBuffer && giftRandomness_0.BYTES_PER_ELEMENT === 1 && giftRandomness_0.length === 32)) {
          __compactRuntime.typeError('createGiftCard',
                                     'argument 5 (argument 6 as invoked from Typescript)',
                                     'lumapay.compact line 784 char 1',
                                     'Bytes<32>',
                                     giftRandomness_0)
        }
        if (!(issuerAuthorizationCommitment_0.buffer instanceof ArrayBuffer && issuerAuthorizationCommitment_0.BYTES_PER_ELEMENT === 1 && issuerAuthorizationCommitment_0.length === 32)) {
          __compactRuntime.typeError('createGiftCard',
                                     'argument 6 (argument 7 as invoked from Typescript)',
                                     'lumapay.compact line 784 char 1',
                                     'Bytes<32>',
                                     issuerAuthorizationCommitment_0)
        }
        if (!(typeof(expiry_0) === 'bigint' && expiry_0 >= 0n && expiry_0 <= 18446744073709551615n)) {
          __compactRuntime.typeError('createGiftCard',
                                     'argument 7 (argument 8 as invoked from Typescript)',
                                     'lumapay.compact line 784 char 1',
                                     'Uint<0..18446744073709551616>',
                                     expiry_0)
        }
        if (!(typeof(coin_0) === 'object' && coin_0.nonce.buffer instanceof ArrayBuffer && coin_0.nonce.BYTES_PER_ELEMENT === 1 && coin_0.nonce.length === 32 && coin_0.color.buffer instanceof ArrayBuffer && coin_0.color.BYTES_PER_ELEMENT === 1 && coin_0.color.length === 32 && typeof(coin_0.value) === 'bigint' && coin_0.value >= 0n && coin_0.value <= 340282366920938463463374607431768211455n)) {
          __compactRuntime.typeError('createGiftCard',
                                     'argument 8 (argument 9 as invoked from Typescript)',
                                     'lumapay.compact line 784 char 1',
                                     'struct ShieldedCoinInfo<nonce: Bytes<32>, color: Bytes<32>, value: Uint<0..340282366920938463463374607431768211456>>',
                                     coin_0)
        }
        const context = { ...contextOrig_0, gasCost: __compactRuntime.emptyRunningCost() };
        const partialProofData = {
          input: {
            value: _descriptor_0.toValue(giftCardId_0).concat(_descriptor_3.toValue(amount_0).concat(_descriptor_0.toValue(tokenId_0).concat(_descriptor_0.toValue(giftSecret_0).concat(_descriptor_0.toValue(giftRandomness_0).concat(_descriptor_0.toValue(issuerAuthorizationCommitment_0).concat(_descriptor_6.toValue(expiry_0).concat(_descriptor_10.toValue(coin_0)))))))),
            alignment: _descriptor_0.alignment().concat(_descriptor_3.alignment().concat(_descriptor_0.alignment().concat(_descriptor_0.alignment().concat(_descriptor_0.alignment().concat(_descriptor_0.alignment().concat(_descriptor_6.alignment().concat(_descriptor_10.alignment())))))))
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
                                     'lumapay.compact line 828 char 1',
                                     'CircuitContext',
                                     contextOrig_0)
        }
        if (!(giftCardId_0.buffer instanceof ArrayBuffer && giftCardId_0.BYTES_PER_ELEMENT === 1 && giftCardId_0.length === 32)) {
          __compactRuntime.typeError('redeemGiftCard',
                                     'argument 1 (argument 2 as invoked from Typescript)',
                                     'lumapay.compact line 828 char 1',
                                     'Bytes<32>',
                                     giftCardId_0)
        }
        if (!(typeof(amount_0) === 'bigint' && amount_0 >= 0n && amount_0 <= 340282366920938463463374607431768211455n)) {
          __compactRuntime.typeError('redeemGiftCard',
                                     'argument 2 (argument 3 as invoked from Typescript)',
                                     'lumapay.compact line 828 char 1',
                                     'Uint<0..340282366920938463463374607431768211456>',
                                     amount_0)
        }
        if (!(tokenId_0.buffer instanceof ArrayBuffer && tokenId_0.BYTES_PER_ELEMENT === 1 && tokenId_0.length === 32)) {
          __compactRuntime.typeError('redeemGiftCard',
                                     'argument 3 (argument 4 as invoked from Typescript)',
                                     'lumapay.compact line 828 char 1',
                                     'Bytes<32>',
                                     tokenId_0)
        }
        if (!(giftSecret_0.buffer instanceof ArrayBuffer && giftSecret_0.BYTES_PER_ELEMENT === 1 && giftSecret_0.length === 32)) {
          __compactRuntime.typeError('redeemGiftCard',
                                     'argument 4 (argument 5 as invoked from Typescript)',
                                     'lumapay.compact line 828 char 1',
                                     'Bytes<32>',
                                     giftSecret_0)
        }
        if (!(giftRandomness_0.buffer instanceof ArrayBuffer && giftRandomness_0.BYTES_PER_ELEMENT === 1 && giftRandomness_0.length === 32)) {
          __compactRuntime.typeError('redeemGiftCard',
                                     'argument 5 (argument 6 as invoked from Typescript)',
                                     'lumapay.compact line 828 char 1',
                                     'Bytes<32>',
                                     giftRandomness_0)
        }
        if (!(typeof(escrowCoin_0) === 'object' && escrowCoin_0.nonce.buffer instanceof ArrayBuffer && escrowCoin_0.nonce.BYTES_PER_ELEMENT === 1 && escrowCoin_0.nonce.length === 32 && escrowCoin_0.color.buffer instanceof ArrayBuffer && escrowCoin_0.color.BYTES_PER_ELEMENT === 1 && escrowCoin_0.color.length === 32 && typeof(escrowCoin_0.value) === 'bigint' && escrowCoin_0.value >= 0n && escrowCoin_0.value <= 340282366920938463463374607431768211455n && typeof(escrowCoin_0.mt_index) === 'bigint' && escrowCoin_0.mt_index >= 0n && escrowCoin_0.mt_index <= 18446744073709551615n)) {
          __compactRuntime.typeError('redeemGiftCard',
                                     'argument 6 (argument 7 as invoked from Typescript)',
                                     'lumapay.compact line 828 char 1',
                                     'struct QualifiedShieldedCoinInfo<nonce: Bytes<32>, color: Bytes<32>, value: Uint<0..340282366920938463463374607431768211456>, mt_index: Uint<0..18446744073709551616>>',
                                     escrowCoin_0)
        }
        const context = { ...contextOrig_0, gasCost: __compactRuntime.emptyRunningCost() };
        const partialProofData = {
          input: {
            value: _descriptor_0.toValue(giftCardId_0).concat(_descriptor_3.toValue(amount_0).concat(_descriptor_0.toValue(tokenId_0).concat(_descriptor_0.toValue(giftSecret_0).concat(_descriptor_0.toValue(giftRandomness_0).concat(_descriptor_13.toValue(escrowCoin_0)))))),
            alignment: _descriptor_0.alignment().concat(_descriptor_3.alignment().concat(_descriptor_0.alignment().concat(_descriptor_0.alignment().concat(_descriptor_0.alignment().concat(_descriptor_13.alignment())))))
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
        partialProofData.output = { value: _descriptor_15.toValue(result_0), alignment: _descriptor_15.alignment() };
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
                                     'lumapay.compact line 880 char 1',
                                     'CircuitContext',
                                     contextOrig_0)
        }
        if (!(giftCardId_0.buffer instanceof ArrayBuffer && giftCardId_0.BYTES_PER_ELEMENT === 1 && giftCardId_0.length === 32)) {
          __compactRuntime.typeError('reclaimExpiredGiftCard',
                                     'argument 1 (argument 2 as invoked from Typescript)',
                                     'lumapay.compact line 880 char 1',
                                     'Bytes<32>',
                                     giftCardId_0)
        }
        if (!(issuerSecret_0.buffer instanceof ArrayBuffer && issuerSecret_0.BYTES_PER_ELEMENT === 1 && issuerSecret_0.length === 32)) {
          __compactRuntime.typeError('reclaimExpiredGiftCard',
                                     'argument 2 (argument 3 as invoked from Typescript)',
                                     'lumapay.compact line 880 char 1',
                                     'Bytes<32>',
                                     issuerSecret_0)
        }
        if (!(typeof(escrowCoin_0) === 'object' && escrowCoin_0.nonce.buffer instanceof ArrayBuffer && escrowCoin_0.nonce.BYTES_PER_ELEMENT === 1 && escrowCoin_0.nonce.length === 32 && escrowCoin_0.color.buffer instanceof ArrayBuffer && escrowCoin_0.color.BYTES_PER_ELEMENT === 1 && escrowCoin_0.color.length === 32 && typeof(escrowCoin_0.value) === 'bigint' && escrowCoin_0.value >= 0n && escrowCoin_0.value <= 340282366920938463463374607431768211455n && typeof(escrowCoin_0.mt_index) === 'bigint' && escrowCoin_0.mt_index >= 0n && escrowCoin_0.mt_index <= 18446744073709551615n)) {
          __compactRuntime.typeError('reclaimExpiredGiftCard',
                                     'argument 3 (argument 4 as invoked from Typescript)',
                                     'lumapay.compact line 880 char 1',
                                     'struct QualifiedShieldedCoinInfo<nonce: Bytes<32>, color: Bytes<32>, value: Uint<0..340282366920938463463374607431768211456>, mt_index: Uint<0..18446744073709551616>>',
                                     escrowCoin_0)
        }
        const context = { ...contextOrig_0, gasCost: __compactRuntime.emptyRunningCost() };
        const partialProofData = {
          input: {
            value: _descriptor_0.toValue(giftCardId_0).concat(_descriptor_0.toValue(issuerSecret_0).concat(_descriptor_13.toValue(escrowCoin_0))),
            alignment: _descriptor_0.alignment().concat(_descriptor_0.alignment().concat(_descriptor_13.alignment()))
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
        partialProofData.output = { value: _descriptor_15.toValue(result_0), alignment: _descriptor_15.alignment() };
        return { result: result_0, context: context, proofData: partialProofData, gasCost: context.gasCost };
      },
      rotateRegistryAdmin: (...args_1) => {
        if (args_1.length !== 3) {
          throw new __compactRuntime.CompactError(`rotateRegistryAdmin: expected 3 arguments (as invoked from Typescript), received ${args_1.length}`);
        }
        const contextOrig_0 = args_1[0];
        const currentAdminSecret_0 = args_1[1];
        const newAdminAuthorizationCommitment_0 = args_1[2];
        if (!(typeof(contextOrig_0) === 'object' && contextOrig_0.currentQueryContext != undefined)) {
          __compactRuntime.typeError('rotateRegistryAdmin',
                                     'argument 1 (as invoked from Typescript)',
                                     'lumapay.compact line 919 char 1',
                                     'CircuitContext',
                                     contextOrig_0)
        }
        if (!(currentAdminSecret_0.buffer instanceof ArrayBuffer && currentAdminSecret_0.BYTES_PER_ELEMENT === 1 && currentAdminSecret_0.length === 32)) {
          __compactRuntime.typeError('rotateRegistryAdmin',
                                     'argument 1 (argument 2 as invoked from Typescript)',
                                     'lumapay.compact line 919 char 1',
                                     'Bytes<32>',
                                     currentAdminSecret_0)
        }
        if (!(newAdminAuthorizationCommitment_0.buffer instanceof ArrayBuffer && newAdminAuthorizationCommitment_0.BYTES_PER_ELEMENT === 1 && newAdminAuthorizationCommitment_0.length === 32)) {
          __compactRuntime.typeError('rotateRegistryAdmin',
                                     'argument 2 (argument 3 as invoked from Typescript)',
                                     'lumapay.compact line 919 char 1',
                                     'Bytes<32>',
                                     newAdminAuthorizationCommitment_0)
        }
        const context = { ...contextOrig_0, gasCost: __compactRuntime.emptyRunningCost() };
        const partialProofData = {
          input: {
            value: _descriptor_0.toValue(currentAdminSecret_0).concat(_descriptor_0.toValue(newAdminAuthorizationCommitment_0)),
            alignment: _descriptor_0.alignment().concat(_descriptor_0.alignment())
          },
          output: undefined,
          publicTranscript: [],
          privateTranscriptOutputs: []
        };
        const result_0 = this._rotateRegistryAdmin_0(context,
                                                     partialProofData,
                                                     currentAdminSecret_0,
                                                     newAdminAuthorizationCommitment_0);
        partialProofData.output = { value: [], alignment: [] };
        return { result: result_0, context: context, proofData: partialProofData, gasCost: context.gasCost };
      },
      registerQuoteProvider: (...args_1) => {
        if (args_1.length !== 4) {
          throw new __compactRuntime.CompactError(`registerQuoteProvider: expected 4 arguments (as invoked from Typescript), received ${args_1.length}`);
        }
        const contextOrig_0 = args_1[0];
        const providerId_0 = args_1[1];
        const providerAuthorizationCommitment_0 = args_1[2];
        const registryAdminSecret_0 = args_1[3];
        if (!(typeof(contextOrig_0) === 'object' && contextOrig_0.currentQueryContext != undefined)) {
          __compactRuntime.typeError('registerQuoteProvider',
                                     'argument 1 (as invoked from Typescript)',
                                     'lumapay.compact line 934 char 1',
                                     'CircuitContext',
                                     contextOrig_0)
        }
        if (!(providerId_0.buffer instanceof ArrayBuffer && providerId_0.BYTES_PER_ELEMENT === 1 && providerId_0.length === 32)) {
          __compactRuntime.typeError('registerQuoteProvider',
                                     'argument 1 (argument 2 as invoked from Typescript)',
                                     'lumapay.compact line 934 char 1',
                                     'Bytes<32>',
                                     providerId_0)
        }
        if (!(providerAuthorizationCommitment_0.buffer instanceof ArrayBuffer && providerAuthorizationCommitment_0.BYTES_PER_ELEMENT === 1 && providerAuthorizationCommitment_0.length === 32)) {
          __compactRuntime.typeError('registerQuoteProvider',
                                     'argument 2 (argument 3 as invoked from Typescript)',
                                     'lumapay.compact line 934 char 1',
                                     'Bytes<32>',
                                     providerAuthorizationCommitment_0)
        }
        if (!(registryAdminSecret_0.buffer instanceof ArrayBuffer && registryAdminSecret_0.BYTES_PER_ELEMENT === 1 && registryAdminSecret_0.length === 32)) {
          __compactRuntime.typeError('registerQuoteProvider',
                                     'argument 3 (argument 4 as invoked from Typescript)',
                                     'lumapay.compact line 934 char 1',
                                     'Bytes<32>',
                                     registryAdminSecret_0)
        }
        const context = { ...contextOrig_0, gasCost: __compactRuntime.emptyRunningCost() };
        const partialProofData = {
          input: {
            value: _descriptor_0.toValue(providerId_0).concat(_descriptor_0.toValue(providerAuthorizationCommitment_0).concat(_descriptor_0.toValue(registryAdminSecret_0))),
            alignment: _descriptor_0.alignment().concat(_descriptor_0.alignment().concat(_descriptor_0.alignment()))
          },
          output: undefined,
          publicTranscript: [],
          privateTranscriptOutputs: []
        };
        const result_0 = this._registerQuoteProvider_0(context,
                                                       partialProofData,
                                                       providerId_0,
                                                       providerAuthorizationCommitment_0,
                                                       registryAdminSecret_0);
        partialProofData.output = { value: [], alignment: [] };
        return { result: result_0, context: context, proofData: partialProofData, gasCost: context.gasCost };
      },
      rotateQuoteProvider: (...args_1) => {
        if (args_1.length !== 4) {
          throw new __compactRuntime.CompactError(`rotateQuoteProvider: expected 4 arguments (as invoked from Typescript), received ${args_1.length}`);
        }
        const contextOrig_0 = args_1[0];
        const providerId_0 = args_1[1];
        const newProviderAuthorizationCommitment_0 = args_1[2];
        const registryAdminSecret_0 = args_1[3];
        if (!(typeof(contextOrig_0) === 'object' && contextOrig_0.currentQueryContext != undefined)) {
          __compactRuntime.typeError('rotateQuoteProvider',
                                     'argument 1 (as invoked from Typescript)',
                                     'lumapay.compact line 956 char 1',
                                     'CircuitContext',
                                     contextOrig_0)
        }
        if (!(providerId_0.buffer instanceof ArrayBuffer && providerId_0.BYTES_PER_ELEMENT === 1 && providerId_0.length === 32)) {
          __compactRuntime.typeError('rotateQuoteProvider',
                                     'argument 1 (argument 2 as invoked from Typescript)',
                                     'lumapay.compact line 956 char 1',
                                     'Bytes<32>',
                                     providerId_0)
        }
        if (!(newProviderAuthorizationCommitment_0.buffer instanceof ArrayBuffer && newProviderAuthorizationCommitment_0.BYTES_PER_ELEMENT === 1 && newProviderAuthorizationCommitment_0.length === 32)) {
          __compactRuntime.typeError('rotateQuoteProvider',
                                     'argument 2 (argument 3 as invoked from Typescript)',
                                     'lumapay.compact line 956 char 1',
                                     'Bytes<32>',
                                     newProviderAuthorizationCommitment_0)
        }
        if (!(registryAdminSecret_0.buffer instanceof ArrayBuffer && registryAdminSecret_0.BYTES_PER_ELEMENT === 1 && registryAdminSecret_0.length === 32)) {
          __compactRuntime.typeError('rotateQuoteProvider',
                                     'argument 3 (argument 4 as invoked from Typescript)',
                                     'lumapay.compact line 956 char 1',
                                     'Bytes<32>',
                                     registryAdminSecret_0)
        }
        const context = { ...contextOrig_0, gasCost: __compactRuntime.emptyRunningCost() };
        const partialProofData = {
          input: {
            value: _descriptor_0.toValue(providerId_0).concat(_descriptor_0.toValue(newProviderAuthorizationCommitment_0).concat(_descriptor_0.toValue(registryAdminSecret_0))),
            alignment: _descriptor_0.alignment().concat(_descriptor_0.alignment().concat(_descriptor_0.alignment()))
          },
          output: undefined,
          publicTranscript: [],
          privateTranscriptOutputs: []
        };
        const result_0 = this._rotateQuoteProvider_0(context,
                                                     partialProofData,
                                                     providerId_0,
                                                     newProviderAuthorizationCommitment_0,
                                                     registryAdminSecret_0);
        partialProofData.output = { value: [], alignment: [] };
        return { result: result_0, context: context, proofData: partialProofData, gasCost: context.gasCost };
      },
      removeQuoteProvider: (...args_1) => {
        if (args_1.length !== 3) {
          throw new __compactRuntime.CompactError(`removeQuoteProvider: expected 3 arguments (as invoked from Typescript), received ${args_1.length}`);
        }
        const contextOrig_0 = args_1[0];
        const providerId_0 = args_1[1];
        const registryAdminSecret_0 = args_1[2];
        if (!(typeof(contextOrig_0) === 'object' && contextOrig_0.currentQueryContext != undefined)) {
          __compactRuntime.typeError('removeQuoteProvider',
                                     'argument 1 (as invoked from Typescript)',
                                     'lumapay.compact line 976 char 1',
                                     'CircuitContext',
                                     contextOrig_0)
        }
        if (!(providerId_0.buffer instanceof ArrayBuffer && providerId_0.BYTES_PER_ELEMENT === 1 && providerId_0.length === 32)) {
          __compactRuntime.typeError('removeQuoteProvider',
                                     'argument 1 (argument 2 as invoked from Typescript)',
                                     'lumapay.compact line 976 char 1',
                                     'Bytes<32>',
                                     providerId_0)
        }
        if (!(registryAdminSecret_0.buffer instanceof ArrayBuffer && registryAdminSecret_0.BYTES_PER_ELEMENT === 1 && registryAdminSecret_0.length === 32)) {
          __compactRuntime.typeError('removeQuoteProvider',
                                     'argument 2 (argument 3 as invoked from Typescript)',
                                     'lumapay.compact line 976 char 1',
                                     'Bytes<32>',
                                     registryAdminSecret_0)
        }
        const context = { ...contextOrig_0, gasCost: __compactRuntime.emptyRunningCost() };
        const partialProofData = {
          input: {
            value: _descriptor_0.toValue(providerId_0).concat(_descriptor_0.toValue(registryAdminSecret_0)),
            alignment: _descriptor_0.alignment().concat(_descriptor_0.alignment())
          },
          output: undefined,
          publicTranscript: [],
          privateTranscriptOutputs: []
        };
        const result_0 = this._removeQuoteProvider_0(context,
                                                     partialProofData,
                                                     providerId_0,
                                                     registryAdminSecret_0);
        partialProofData.output = { value: [], alignment: [] };
        return { result: result_0, context: context, proofData: partialProofData, gasCost: context.gasCost };
      },
      registerQuote: (...args_1) => {
        if (args_1.length !== 6) {
          throw new __compactRuntime.CompactError(`registerQuote: expected 6 arguments (as invoked from Typescript), received ${args_1.length}`);
        }
        const contextOrig_0 = args_1[0];
        const quoteId_0 = args_1[1];
        const providerId_0 = args_1[2];
        const quoteCommitment_0 = args_1[3];
        const expiry_0 = args_1[4];
        const providerSecret_0 = args_1[5];
        if (!(typeof(contextOrig_0) === 'object' && contextOrig_0.currentQueryContext != undefined)) {
          __compactRuntime.typeError('registerQuote',
                                     'argument 1 (as invoked from Typescript)',
                                     'lumapay.compact line 989 char 1',
                                     'CircuitContext',
                                     contextOrig_0)
        }
        if (!(quoteId_0.buffer instanceof ArrayBuffer && quoteId_0.BYTES_PER_ELEMENT === 1 && quoteId_0.length === 32)) {
          __compactRuntime.typeError('registerQuote',
                                     'argument 1 (argument 2 as invoked from Typescript)',
                                     'lumapay.compact line 989 char 1',
                                     'Bytes<32>',
                                     quoteId_0)
        }
        if (!(providerId_0.buffer instanceof ArrayBuffer && providerId_0.BYTES_PER_ELEMENT === 1 && providerId_0.length === 32)) {
          __compactRuntime.typeError('registerQuote',
                                     'argument 2 (argument 3 as invoked from Typescript)',
                                     'lumapay.compact line 989 char 1',
                                     'Bytes<32>',
                                     providerId_0)
        }
        if (!(quoteCommitment_0.buffer instanceof ArrayBuffer && quoteCommitment_0.BYTES_PER_ELEMENT === 1 && quoteCommitment_0.length === 32)) {
          __compactRuntime.typeError('registerQuote',
                                     'argument 3 (argument 4 as invoked from Typescript)',
                                     'lumapay.compact line 989 char 1',
                                     'Bytes<32>',
                                     quoteCommitment_0)
        }
        if (!(typeof(expiry_0) === 'bigint' && expiry_0 >= 0n && expiry_0 <= 18446744073709551615n)) {
          __compactRuntime.typeError('registerQuote',
                                     'argument 4 (argument 5 as invoked from Typescript)',
                                     'lumapay.compact line 989 char 1',
                                     'Uint<0..18446744073709551616>',
                                     expiry_0)
        }
        if (!(providerSecret_0.buffer instanceof ArrayBuffer && providerSecret_0.BYTES_PER_ELEMENT === 1 && providerSecret_0.length === 32)) {
          __compactRuntime.typeError('registerQuote',
                                     'argument 5 (argument 6 as invoked from Typescript)',
                                     'lumapay.compact line 989 char 1',
                                     'Bytes<32>',
                                     providerSecret_0)
        }
        const context = { ...contextOrig_0, gasCost: __compactRuntime.emptyRunningCost() };
        const partialProofData = {
          input: {
            value: _descriptor_0.toValue(quoteId_0).concat(_descriptor_0.toValue(providerId_0).concat(_descriptor_0.toValue(quoteCommitment_0).concat(_descriptor_6.toValue(expiry_0).concat(_descriptor_0.toValue(providerSecret_0))))),
            alignment: _descriptor_0.alignment().concat(_descriptor_0.alignment().concat(_descriptor_0.alignment().concat(_descriptor_6.alignment().concat(_descriptor_0.alignment()))))
          },
          output: undefined,
          publicTranscript: [],
          privateTranscriptOutputs: []
        };
        const result_0 = this._registerQuote_0(context,
                                               partialProofData,
                                               quoteId_0,
                                               providerId_0,
                                               quoteCommitment_0,
                                               expiry_0,
                                               providerSecret_0);
        partialProofData.output = { value: [], alignment: [] };
        return { result: result_0, context: context, proofData: partialProofData, gasCost: context.gasCost };
      },
      payInvoiceWithQuote: (...args_1) => {
        if (args_1.length !== 15) {
          throw new __compactRuntime.CompactError(`payInvoiceWithQuote: expected 15 arguments (as invoked from Typescript), received ${args_1.length}`);
        }
        const contextOrig_0 = args_1[0];
        const invoiceId_0 = args_1[1];
        const merchantPrivateIdentity_0 = args_1[2];
        const requestedAmount_0 = args_1[3];
        const requestedToken_0 = args_1[4];
        const invoiceNonce_0 = args_1[5];
        const invoiceRandomness_0 = args_1[6];
        const quoteId_0 = args_1[7];
        const providerId_0 = args_1[8];
        const paymentToken_0 = args_1[9];
        const acceptedPaymentAmount_0 = args_1[10];
        const quoteRandomness_0 = args_1[11];
        const paymentSecret_0 = args_1[12];
        const receiptSecret_0 = args_1[13];
        const coin_0 = args_1[14];
        if (!(typeof(contextOrig_0) === 'object' && contextOrig_0.currentQueryContext != undefined)) {
          __compactRuntime.typeError('payInvoiceWithQuote',
                                     'argument 1 (as invoked from Typescript)',
                                     'lumapay.compact line 1021 char 1',
                                     'CircuitContext',
                                     contextOrig_0)
        }
        if (!(invoiceId_0.buffer instanceof ArrayBuffer && invoiceId_0.BYTES_PER_ELEMENT === 1 && invoiceId_0.length === 32)) {
          __compactRuntime.typeError('payInvoiceWithQuote',
                                     'argument 1 (argument 2 as invoked from Typescript)',
                                     'lumapay.compact line 1021 char 1',
                                     'Bytes<32>',
                                     invoiceId_0)
        }
        if (!(merchantPrivateIdentity_0.buffer instanceof ArrayBuffer && merchantPrivateIdentity_0.BYTES_PER_ELEMENT === 1 && merchantPrivateIdentity_0.length === 32)) {
          __compactRuntime.typeError('payInvoiceWithQuote',
                                     'argument 2 (argument 3 as invoked from Typescript)',
                                     'lumapay.compact line 1021 char 1',
                                     'Bytes<32>',
                                     merchantPrivateIdentity_0)
        }
        if (!(typeof(requestedAmount_0) === 'bigint' && requestedAmount_0 >= 0n && requestedAmount_0 <= 340282366920938463463374607431768211455n)) {
          __compactRuntime.typeError('payInvoiceWithQuote',
                                     'argument 3 (argument 4 as invoked from Typescript)',
                                     'lumapay.compact line 1021 char 1',
                                     'Uint<0..340282366920938463463374607431768211456>',
                                     requestedAmount_0)
        }
        if (!(requestedToken_0.buffer instanceof ArrayBuffer && requestedToken_0.BYTES_PER_ELEMENT === 1 && requestedToken_0.length === 32)) {
          __compactRuntime.typeError('payInvoiceWithQuote',
                                     'argument 4 (argument 5 as invoked from Typescript)',
                                     'lumapay.compact line 1021 char 1',
                                     'Bytes<32>',
                                     requestedToken_0)
        }
        if (!(invoiceNonce_0.buffer instanceof ArrayBuffer && invoiceNonce_0.BYTES_PER_ELEMENT === 1 && invoiceNonce_0.length === 32)) {
          __compactRuntime.typeError('payInvoiceWithQuote',
                                     'argument 5 (argument 6 as invoked from Typescript)',
                                     'lumapay.compact line 1021 char 1',
                                     'Bytes<32>',
                                     invoiceNonce_0)
        }
        if (!(invoiceRandomness_0.buffer instanceof ArrayBuffer && invoiceRandomness_0.BYTES_PER_ELEMENT === 1 && invoiceRandomness_0.length === 32)) {
          __compactRuntime.typeError('payInvoiceWithQuote',
                                     'argument 6 (argument 7 as invoked from Typescript)',
                                     'lumapay.compact line 1021 char 1',
                                     'Bytes<32>',
                                     invoiceRandomness_0)
        }
        if (!(quoteId_0.buffer instanceof ArrayBuffer && quoteId_0.BYTES_PER_ELEMENT === 1 && quoteId_0.length === 32)) {
          __compactRuntime.typeError('payInvoiceWithQuote',
                                     'argument 7 (argument 8 as invoked from Typescript)',
                                     'lumapay.compact line 1021 char 1',
                                     'Bytes<32>',
                                     quoteId_0)
        }
        if (!(providerId_0.buffer instanceof ArrayBuffer && providerId_0.BYTES_PER_ELEMENT === 1 && providerId_0.length === 32)) {
          __compactRuntime.typeError('payInvoiceWithQuote',
                                     'argument 8 (argument 9 as invoked from Typescript)',
                                     'lumapay.compact line 1021 char 1',
                                     'Bytes<32>',
                                     providerId_0)
        }
        if (!(paymentToken_0.buffer instanceof ArrayBuffer && paymentToken_0.BYTES_PER_ELEMENT === 1 && paymentToken_0.length === 32)) {
          __compactRuntime.typeError('payInvoiceWithQuote',
                                     'argument 9 (argument 10 as invoked from Typescript)',
                                     'lumapay.compact line 1021 char 1',
                                     'Bytes<32>',
                                     paymentToken_0)
        }
        if (!(typeof(acceptedPaymentAmount_0) === 'bigint' && acceptedPaymentAmount_0 >= 0n && acceptedPaymentAmount_0 <= 340282366920938463463374607431768211455n)) {
          __compactRuntime.typeError('payInvoiceWithQuote',
                                     'argument 10 (argument 11 as invoked from Typescript)',
                                     'lumapay.compact line 1021 char 1',
                                     'Uint<0..340282366920938463463374607431768211456>',
                                     acceptedPaymentAmount_0)
        }
        if (!(quoteRandomness_0.buffer instanceof ArrayBuffer && quoteRandomness_0.BYTES_PER_ELEMENT === 1 && quoteRandomness_0.length === 32)) {
          __compactRuntime.typeError('payInvoiceWithQuote',
                                     'argument 11 (argument 12 as invoked from Typescript)',
                                     'lumapay.compact line 1021 char 1',
                                     'Bytes<32>',
                                     quoteRandomness_0)
        }
        if (!(paymentSecret_0.buffer instanceof ArrayBuffer && paymentSecret_0.BYTES_PER_ELEMENT === 1 && paymentSecret_0.length === 32)) {
          __compactRuntime.typeError('payInvoiceWithQuote',
                                     'argument 12 (argument 13 as invoked from Typescript)',
                                     'lumapay.compact line 1021 char 1',
                                     'Bytes<32>',
                                     paymentSecret_0)
        }
        if (!(receiptSecret_0.buffer instanceof ArrayBuffer && receiptSecret_0.BYTES_PER_ELEMENT === 1 && receiptSecret_0.length === 32)) {
          __compactRuntime.typeError('payInvoiceWithQuote',
                                     'argument 13 (argument 14 as invoked from Typescript)',
                                     'lumapay.compact line 1021 char 1',
                                     'Bytes<32>',
                                     receiptSecret_0)
        }
        if (!(typeof(coin_0) === 'object' && coin_0.nonce.buffer instanceof ArrayBuffer && coin_0.nonce.BYTES_PER_ELEMENT === 1 && coin_0.nonce.length === 32 && coin_0.color.buffer instanceof ArrayBuffer && coin_0.color.BYTES_PER_ELEMENT === 1 && coin_0.color.length === 32 && typeof(coin_0.value) === 'bigint' && coin_0.value >= 0n && coin_0.value <= 340282366920938463463374607431768211455n)) {
          __compactRuntime.typeError('payInvoiceWithQuote',
                                     'argument 14 (argument 15 as invoked from Typescript)',
                                     'lumapay.compact line 1021 char 1',
                                     'struct ShieldedCoinInfo<nonce: Bytes<32>, color: Bytes<32>, value: Uint<0..340282366920938463463374607431768211456>>',
                                     coin_0)
        }
        const context = { ...contextOrig_0, gasCost: __compactRuntime.emptyRunningCost() };
        const partialProofData = {
          input: {
            value: _descriptor_0.toValue(invoiceId_0).concat(_descriptor_0.toValue(merchantPrivateIdentity_0).concat(_descriptor_3.toValue(requestedAmount_0).concat(_descriptor_0.toValue(requestedToken_0).concat(_descriptor_0.toValue(invoiceNonce_0).concat(_descriptor_0.toValue(invoiceRandomness_0).concat(_descriptor_0.toValue(quoteId_0).concat(_descriptor_0.toValue(providerId_0).concat(_descriptor_0.toValue(paymentToken_0).concat(_descriptor_3.toValue(acceptedPaymentAmount_0).concat(_descriptor_0.toValue(quoteRandomness_0).concat(_descriptor_0.toValue(paymentSecret_0).concat(_descriptor_0.toValue(receiptSecret_0).concat(_descriptor_10.toValue(coin_0)))))))))))))),
            alignment: _descriptor_0.alignment().concat(_descriptor_0.alignment().concat(_descriptor_3.alignment().concat(_descriptor_0.alignment().concat(_descriptor_0.alignment().concat(_descriptor_0.alignment().concat(_descriptor_0.alignment().concat(_descriptor_0.alignment().concat(_descriptor_0.alignment().concat(_descriptor_3.alignment().concat(_descriptor_0.alignment().concat(_descriptor_0.alignment().concat(_descriptor_0.alignment().concat(_descriptor_10.alignment())))))))))))))
          },
          output: undefined,
          publicTranscript: [],
          privateTranscriptOutputs: []
        };
        const result_0 = this._payInvoiceWithQuote_0(context,
                                                     partialProofData,
                                                     invoiceId_0,
                                                     merchantPrivateIdentity_0,
                                                     requestedAmount_0,
                                                     requestedToken_0,
                                                     invoiceNonce_0,
                                                     invoiceRandomness_0,
                                                     quoteId_0,
                                                     providerId_0,
                                                     paymentToken_0,
                                                     acceptedPaymentAmount_0,
                                                     quoteRandomness_0,
                                                     paymentSecret_0,
                                                     receiptSecret_0,
                                                     coin_0);
        partialProofData.output = { value: [], alignment: [] };
        return { result: result_0, context: context, proofData: partialProofData, gasCost: context.gasCost };
      },
      registerBackupAnchor: (...args_1) => {
        if (args_1.length !== 4) {
          throw new __compactRuntime.CompactError(`registerBackupAnchor: expected 4 arguments (as invoked from Typescript), received ${args_1.length}`);
        }
        const contextOrig_0 = args_1[0];
        const ownerId_0 = args_1[1];
        const backupAuthorizationCommitment_0 = args_1[2];
        const encryptedBlobDigest_0 = args_1[3];
        if (!(typeof(contextOrig_0) === 'object' && contextOrig_0.currentQueryContext != undefined)) {
          __compactRuntime.typeError('registerBackupAnchor',
                                     'argument 1 (as invoked from Typescript)',
                                     'lumapay.compact line 1118 char 1',
                                     'CircuitContext',
                                     contextOrig_0)
        }
        if (!(ownerId_0.buffer instanceof ArrayBuffer && ownerId_0.BYTES_PER_ELEMENT === 1 && ownerId_0.length === 32)) {
          __compactRuntime.typeError('registerBackupAnchor',
                                     'argument 1 (argument 2 as invoked from Typescript)',
                                     'lumapay.compact line 1118 char 1',
                                     'Bytes<32>',
                                     ownerId_0)
        }
        if (!(backupAuthorizationCommitment_0.buffer instanceof ArrayBuffer && backupAuthorizationCommitment_0.BYTES_PER_ELEMENT === 1 && backupAuthorizationCommitment_0.length === 32)) {
          __compactRuntime.typeError('registerBackupAnchor',
                                     'argument 2 (argument 3 as invoked from Typescript)',
                                     'lumapay.compact line 1118 char 1',
                                     'Bytes<32>',
                                     backupAuthorizationCommitment_0)
        }
        if (!(encryptedBlobDigest_0.buffer instanceof ArrayBuffer && encryptedBlobDigest_0.BYTES_PER_ELEMENT === 1 && encryptedBlobDigest_0.length === 32)) {
          __compactRuntime.typeError('registerBackupAnchor',
                                     'argument 3 (argument 4 as invoked from Typescript)',
                                     'lumapay.compact line 1118 char 1',
                                     'Bytes<32>',
                                     encryptedBlobDigest_0)
        }
        const context = { ...contextOrig_0, gasCost: __compactRuntime.emptyRunningCost() };
        const partialProofData = {
          input: {
            value: _descriptor_0.toValue(ownerId_0).concat(_descriptor_0.toValue(backupAuthorizationCommitment_0).concat(_descriptor_0.toValue(encryptedBlobDigest_0))),
            alignment: _descriptor_0.alignment().concat(_descriptor_0.alignment().concat(_descriptor_0.alignment()))
          },
          output: undefined,
          publicTranscript: [],
          privateTranscriptOutputs: []
        };
        const result_0 = this._registerBackupAnchor_0(context,
                                                      partialProofData,
                                                      ownerId_0,
                                                      backupAuthorizationCommitment_0,
                                                      encryptedBlobDigest_0);
        partialProofData.output = { value: [], alignment: [] };
        return { result: result_0, context: context, proofData: partialProofData, gasCost: context.gasCost };
      },
      updateBackupAnchor: (...args_1) => {
        if (args_1.length !== 4) {
          throw new __compactRuntime.CompactError(`updateBackupAnchor: expected 4 arguments (as invoked from Typescript), received ${args_1.length}`);
        }
        const contextOrig_0 = args_1[0];
        const ownerId_0 = args_1[1];
        const backupSecret_0 = args_1[2];
        const encryptedBlobDigest_0 = args_1[3];
        if (!(typeof(contextOrig_0) === 'object' && contextOrig_0.currentQueryContext != undefined)) {
          __compactRuntime.typeError('updateBackupAnchor',
                                     'argument 1 (as invoked from Typescript)',
                                     'lumapay.compact line 1138 char 1',
                                     'CircuitContext',
                                     contextOrig_0)
        }
        if (!(ownerId_0.buffer instanceof ArrayBuffer && ownerId_0.BYTES_PER_ELEMENT === 1 && ownerId_0.length === 32)) {
          __compactRuntime.typeError('updateBackupAnchor',
                                     'argument 1 (argument 2 as invoked from Typescript)',
                                     'lumapay.compact line 1138 char 1',
                                     'Bytes<32>',
                                     ownerId_0)
        }
        if (!(backupSecret_0.buffer instanceof ArrayBuffer && backupSecret_0.BYTES_PER_ELEMENT === 1 && backupSecret_0.length === 32)) {
          __compactRuntime.typeError('updateBackupAnchor',
                                     'argument 2 (argument 3 as invoked from Typescript)',
                                     'lumapay.compact line 1138 char 1',
                                     'Bytes<32>',
                                     backupSecret_0)
        }
        if (!(encryptedBlobDigest_0.buffer instanceof ArrayBuffer && encryptedBlobDigest_0.BYTES_PER_ELEMENT === 1 && encryptedBlobDigest_0.length === 32)) {
          __compactRuntime.typeError('updateBackupAnchor',
                                     'argument 3 (argument 4 as invoked from Typescript)',
                                     'lumapay.compact line 1138 char 1',
                                     'Bytes<32>',
                                     encryptedBlobDigest_0)
        }
        const context = { ...contextOrig_0, gasCost: __compactRuntime.emptyRunningCost() };
        const partialProofData = {
          input: {
            value: _descriptor_0.toValue(ownerId_0).concat(_descriptor_0.toValue(backupSecret_0).concat(_descriptor_0.toValue(encryptedBlobDigest_0))),
            alignment: _descriptor_0.alignment().concat(_descriptor_0.alignment().concat(_descriptor_0.alignment()))
          },
          output: undefined,
          publicTranscript: [],
          privateTranscriptOutputs: []
        };
        const result_0 = this._updateBackupAnchor_0(context,
                                                    partialProofData,
                                                    ownerId_0,
                                                    backupSecret_0,
                                                    encryptedBlobDigest_0);
        partialProofData.output = { value: [], alignment: [] };
        return { result: result_0, context: context, proofData: partialProofData, gasCost: context.gasCost };
      },
      rotateBackupAuthorization: (...args_1) => {
        if (args_1.length !== 4) {
          throw new __compactRuntime.CompactError(`rotateBackupAuthorization: expected 4 arguments (as invoked from Typescript), received ${args_1.length}`);
        }
        const contextOrig_0 = args_1[0];
        const ownerId_0 = args_1[1];
        const currentBackupSecret_0 = args_1[2];
        const newBackupAuthorizationCommitment_0 = args_1[3];
        if (!(typeof(contextOrig_0) === 'object' && contextOrig_0.currentQueryContext != undefined)) {
          __compactRuntime.typeError('rotateBackupAuthorization',
                                     'argument 1 (as invoked from Typescript)',
                                     'lumapay.compact line 1157 char 1',
                                     'CircuitContext',
                                     contextOrig_0)
        }
        if (!(ownerId_0.buffer instanceof ArrayBuffer && ownerId_0.BYTES_PER_ELEMENT === 1 && ownerId_0.length === 32)) {
          __compactRuntime.typeError('rotateBackupAuthorization',
                                     'argument 1 (argument 2 as invoked from Typescript)',
                                     'lumapay.compact line 1157 char 1',
                                     'Bytes<32>',
                                     ownerId_0)
        }
        if (!(currentBackupSecret_0.buffer instanceof ArrayBuffer && currentBackupSecret_0.BYTES_PER_ELEMENT === 1 && currentBackupSecret_0.length === 32)) {
          __compactRuntime.typeError('rotateBackupAuthorization',
                                     'argument 2 (argument 3 as invoked from Typescript)',
                                     'lumapay.compact line 1157 char 1',
                                     'Bytes<32>',
                                     currentBackupSecret_0)
        }
        if (!(newBackupAuthorizationCommitment_0.buffer instanceof ArrayBuffer && newBackupAuthorizationCommitment_0.BYTES_PER_ELEMENT === 1 && newBackupAuthorizationCommitment_0.length === 32)) {
          __compactRuntime.typeError('rotateBackupAuthorization',
                                     'argument 3 (argument 4 as invoked from Typescript)',
                                     'lumapay.compact line 1157 char 1',
                                     'Bytes<32>',
                                     newBackupAuthorizationCommitment_0)
        }
        const context = { ...contextOrig_0, gasCost: __compactRuntime.emptyRunningCost() };
        const partialProofData = {
          input: {
            value: _descriptor_0.toValue(ownerId_0).concat(_descriptor_0.toValue(currentBackupSecret_0).concat(_descriptor_0.toValue(newBackupAuthorizationCommitment_0))),
            alignment: _descriptor_0.alignment().concat(_descriptor_0.alignment().concat(_descriptor_0.alignment()))
          },
          output: undefined,
          publicTranscript: [],
          privateTranscriptOutputs: []
        };
        const result_0 = this._rotateBackupAuthorization_0(context,
                                                           partialProofData,
                                                           ownerId_0,
                                                           currentBackupSecret_0,
                                                           newBackupAuthorizationCommitment_0);
        partialProofData.output = { value: [], alignment: [] };
        return { result: result_0, context: context, proofData: partialProofData, gasCost: context.gasCost };
      },
      deleteBackupAnchor: (...args_1) => {
        if (args_1.length !== 3) {
          throw new __compactRuntime.CompactError(`deleteBackupAnchor: expected 3 arguments (as invoked from Typescript), received ${args_1.length}`);
        }
        const contextOrig_0 = args_1[0];
        const ownerId_0 = args_1[1];
        const backupSecret_0 = args_1[2];
        if (!(typeof(contextOrig_0) === 'object' && contextOrig_0.currentQueryContext != undefined)) {
          __compactRuntime.typeError('deleteBackupAnchor',
                                     'argument 1 (as invoked from Typescript)',
                                     'lumapay.compact line 1179 char 1',
                                     'CircuitContext',
                                     contextOrig_0)
        }
        if (!(ownerId_0.buffer instanceof ArrayBuffer && ownerId_0.BYTES_PER_ELEMENT === 1 && ownerId_0.length === 32)) {
          __compactRuntime.typeError('deleteBackupAnchor',
                                     'argument 1 (argument 2 as invoked from Typescript)',
                                     'lumapay.compact line 1179 char 1',
                                     'Bytes<32>',
                                     ownerId_0)
        }
        if (!(backupSecret_0.buffer instanceof ArrayBuffer && backupSecret_0.BYTES_PER_ELEMENT === 1 && backupSecret_0.length === 32)) {
          __compactRuntime.typeError('deleteBackupAnchor',
                                     'argument 2 (argument 3 as invoked from Typescript)',
                                     'lumapay.compact line 1179 char 1',
                                     'Bytes<32>',
                                     backupSecret_0)
        }
        const context = { ...contextOrig_0, gasCost: __compactRuntime.emptyRunningCost() };
        const partialProofData = {
          input: {
            value: _descriptor_0.toValue(ownerId_0).concat(_descriptor_0.toValue(backupSecret_0)),
            alignment: _descriptor_0.alignment().concat(_descriptor_0.alignment())
          },
          output: undefined,
          publicTranscript: [],
          privateTranscriptOutputs: []
        };
        const result_0 = this._deleteBackupAnchor_0(context,
                                                    partialProofData,
                                                    ownerId_0,
                                                    backupSecret_0);
        partialProofData.output = { value: [], alignment: [] };
        return { result: result_0, context: context, proofData: partialProofData, gasCost: context.gasCost };
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
                                     'lumapay.compact line 1193 char 1',
                                     'CircuitContext',
                                     contextOrig_0)
        }
        if (!(invoiceId_0.buffer instanceof ArrayBuffer && invoiceId_0.BYTES_PER_ELEMENT === 1 && invoiceId_0.length === 32)) {
          __compactRuntime.typeError('proveInvoiceSettlement',
                                     'argument 1 (argument 2 as invoked from Typescript)',
                                     'lumapay.compact line 1193 char 1',
                                     'Bytes<32>',
                                     invoiceId_0)
        }
        if (!(typeof(paidAmount_0) === 'bigint' && paidAmount_0 >= 0n && paidAmount_0 <= 340282366920938463463374607431768211455n)) {
          __compactRuntime.typeError('proveInvoiceSettlement',
                                     'argument 2 (argument 3 as invoked from Typescript)',
                                     'lumapay.compact line 1193 char 1',
                                     'Uint<0..340282366920938463463374607431768211456>',
                                     paidAmount_0)
        }
        if (!(paidToken_0.buffer instanceof ArrayBuffer && paidToken_0.BYTES_PER_ELEMENT === 1 && paidToken_0.length === 32)) {
          __compactRuntime.typeError('proveInvoiceSettlement',
                                     'argument 3 (argument 4 as invoked from Typescript)',
                                     'lumapay.compact line 1193 char 1',
                                     'Bytes<32>',
                                     paidToken_0)
        }
        if (!(receiptSecret_0.buffer instanceof ArrayBuffer && receiptSecret_0.BYTES_PER_ELEMENT === 1 && receiptSecret_0.length === 32)) {
          __compactRuntime.typeError('proveInvoiceSettlement',
                                     'argument 4 (argument 5 as invoked from Typescript)',
                                     'lumapay.compact line 1193 char 1',
                                     'Bytes<32>',
                                     receiptSecret_0)
        }
        const context = { ...contextOrig_0, gasCost: __compactRuntime.emptyRunningCost() };
        const partialProofData = {
          input: {
            value: _descriptor_0.toValue(invoiceId_0).concat(_descriptor_3.toValue(paidAmount_0).concat(_descriptor_0.toValue(paidToken_0).concat(_descriptor_0.toValue(receiptSecret_0)))),
            alignment: _descriptor_0.alignment().concat(_descriptor_3.alignment().concat(_descriptor_0.alignment().concat(_descriptor_0.alignment())))
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
                                     'lumapay.compact line 1214 char 1',
                                     'CircuitContext',
                                     contextOrig_0)
        }
        if (!(contributionId_0.buffer instanceof ArrayBuffer && contributionId_0.BYTES_PER_ELEMENT === 1 && contributionId_0.length === 32)) {
          __compactRuntime.typeError('proveContributionSettlement',
                                     'argument 1 (argument 2 as invoked from Typescript)',
                                     'lumapay.compact line 1214 char 1',
                                     'Bytes<32>',
                                     contributionId_0)
        }
        if (!(typeof(paidAmount_0) === 'bigint' && paidAmount_0 >= 0n && paidAmount_0 <= 340282366920938463463374607431768211455n)) {
          __compactRuntime.typeError('proveContributionSettlement',
                                     'argument 2 (argument 3 as invoked from Typescript)',
                                     'lumapay.compact line 1214 char 1',
                                     'Uint<0..340282366920938463463374607431768211456>',
                                     paidAmount_0)
        }
        if (!(paidToken_0.buffer instanceof ArrayBuffer && paidToken_0.BYTES_PER_ELEMENT === 1 && paidToken_0.length === 32)) {
          __compactRuntime.typeError('proveContributionSettlement',
                                     'argument 3 (argument 4 as invoked from Typescript)',
                                     'lumapay.compact line 1214 char 1',
                                     'Bytes<32>',
                                     paidToken_0)
        }
        if (!(receiptSecret_0.buffer instanceof ArrayBuffer && receiptSecret_0.BYTES_PER_ELEMENT === 1 && receiptSecret_0.length === 32)) {
          __compactRuntime.typeError('proveContributionSettlement',
                                     'argument 4 (argument 5 as invoked from Typescript)',
                                     'lumapay.compact line 1214 char 1',
                                     'Bytes<32>',
                                     receiptSecret_0)
        }
        const context = { ...contextOrig_0, gasCost: __compactRuntime.emptyRunningCost() };
        const partialProofData = {
          input: {
            value: _descriptor_0.toValue(contributionId_0).concat(_descriptor_3.toValue(paidAmount_0).concat(_descriptor_0.toValue(paidToken_0).concat(_descriptor_0.toValue(receiptSecret_0)))),
            alignment: _descriptor_0.alignment().concat(_descriptor_3.alignment().concat(_descriptor_0.alignment().concat(_descriptor_0.alignment())))
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
      createInvoice: this.circuits.createInvoice,
      payInvoice: this.circuits.payInvoice,
      claimInvoice: this.circuits.claimInvoice,
      cancelInvoice: this.circuits.cancelInvoice,
      expireInvoice: this.circuits.expireInvoice,
      createCampaign: this.circuits.createCampaign,
      contribute: this.circuits.contribute,
      claimContribution: this.circuits.claimContribution,
      cancelCampaign: this.circuits.cancelCampaign,
      expireCampaign: this.circuits.expireCampaign,
      createGiftCard: this.circuits.createGiftCard,
      redeemGiftCard: this.circuits.redeemGiftCard,
      reclaimExpiredGiftCard: this.circuits.reclaimExpiredGiftCard,
      rotateRegistryAdmin: this.circuits.rotateRegistryAdmin,
      registerQuoteProvider: this.circuits.registerQuoteProvider,
      rotateQuoteProvider: this.circuits.rotateQuoteProvider,
      removeQuoteProvider: this.circuits.removeQuoteProvider,
      registerQuote: this.circuits.registerQuote,
      payInvoiceWithQuote: this.circuits.payInvoiceWithQuote,
      registerBackupAnchor: this.circuits.registerBackupAnchor,
      updateBackupAnchor: this.circuits.updateBackupAnchor,
      rotateBackupAuthorization: this.circuits.rotateBackupAuthorization,
      deleteBackupAnchor: this.circuits.deleteBackupAnchor,
      proveInvoiceSettlement: this.circuits.proveInvoiceSettlement,
      proveContributionSettlement: this.circuits.proveContributionSettlement
    };
    this.provableCircuits = {
      createInvoice: this.circuits.createInvoice,
      payInvoice: this.circuits.payInvoice,
      claimInvoice: this.circuits.claimInvoice,
      cancelInvoice: this.circuits.cancelInvoice,
      expireInvoice: this.circuits.expireInvoice,
      createCampaign: this.circuits.createCampaign,
      contribute: this.circuits.contribute,
      claimContribution: this.circuits.claimContribution,
      cancelCampaign: this.circuits.cancelCampaign,
      expireCampaign: this.circuits.expireCampaign,
      createGiftCard: this.circuits.createGiftCard,
      redeemGiftCard: this.circuits.redeemGiftCard,
      reclaimExpiredGiftCard: this.circuits.reclaimExpiredGiftCard,
      rotateRegistryAdmin: this.circuits.rotateRegistryAdmin,
      registerQuoteProvider: this.circuits.registerQuoteProvider,
      rotateQuoteProvider: this.circuits.rotateQuoteProvider,
      removeQuoteProvider: this.circuits.removeQuoteProvider,
      registerQuote: this.circuits.registerQuote,
      payInvoiceWithQuote: this.circuits.payInvoiceWithQuote,
      registerBackupAnchor: this.circuits.registerBackupAnchor,
      updateBackupAnchor: this.circuits.updateBackupAnchor,
      rotateBackupAuthorization: this.circuits.rotateBackupAuthorization,
      deleteBackupAnchor: this.circuits.deleteBackupAnchor,
      proveInvoiceSettlement: this.circuits.proveInvoiceSettlement,
      proveContributionSettlement: this.circuits.proveContributionSettlement
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
                                 'lumapay.compact line 104 char 1',
                                 'Bytes<32>',
                                 registryAdminAuthorizationCommitment_0)
    }
    const state_0 = new __compactRuntime.ContractState();
    let stateValue_0 = __compactRuntime.StateValue.newArray();
    let stateValue_2 = __compactRuntime.StateValue.newArray();
    stateValue_2 = stateValue_2.arrayPush(__compactRuntime.StateValue.newNull());
    stateValue_2 = stateValue_2.arrayPush(__compactRuntime.StateValue.newNull());
    stateValue_2 = stateValue_2.arrayPush(__compactRuntime.StateValue.newNull());
    stateValue_2 = stateValue_2.arrayPush(__compactRuntime.StateValue.newNull());
    stateValue_0 = stateValue_0.arrayPush(stateValue_2);
    let stateValue_1 = __compactRuntime.StateValue.newArray();
    stateValue_1 = stateValue_1.arrayPush(__compactRuntime.StateValue.newNull());
    stateValue_1 = stateValue_1.arrayPush(__compactRuntime.StateValue.newNull());
    stateValue_1 = stateValue_1.arrayPush(__compactRuntime.StateValue.newNull());
    stateValue_1 = stateValue_1.arrayPush(__compactRuntime.StateValue.newNull());
    stateValue_1 = stateValue_1.arrayPush(__compactRuntime.StateValue.newNull());
    stateValue_1 = stateValue_1.arrayPush(__compactRuntime.StateValue.newNull());
    stateValue_1 = stateValue_1.arrayPush(__compactRuntime.StateValue.newNull());
    stateValue_1 = stateValue_1.arrayPush(__compactRuntime.StateValue.newNull());
    stateValue_1 = stateValue_1.arrayPush(__compactRuntime.StateValue.newNull());
    stateValue_1 = stateValue_1.arrayPush(__compactRuntime.StateValue.newNull());
    stateValue_1 = stateValue_1.arrayPush(__compactRuntime.StateValue.newNull());
    stateValue_1 = stateValue_1.arrayPush(__compactRuntime.StateValue.newNull());
    stateValue_1 = stateValue_1.arrayPush(__compactRuntime.StateValue.newNull());
    stateValue_1 = stateValue_1.arrayPush(__compactRuntime.StateValue.newNull());
    stateValue_1 = stateValue_1.arrayPush(__compactRuntime.StateValue.newNull());
    stateValue_0 = stateValue_0.arrayPush(stateValue_1);
    state_0.data = new __compactRuntime.ChargedState(stateValue_0);
    state_0.setOperation('createInvoice', new __compactRuntime.ContractOperation());
    state_0.setOperation('payInvoice', new __compactRuntime.ContractOperation());
    state_0.setOperation('claimInvoice', new __compactRuntime.ContractOperation());
    state_0.setOperation('cancelInvoice', new __compactRuntime.ContractOperation());
    state_0.setOperation('expireInvoice', new __compactRuntime.ContractOperation());
    state_0.setOperation('createCampaign', new __compactRuntime.ContractOperation());
    state_0.setOperation('contribute', new __compactRuntime.ContractOperation());
    state_0.setOperation('claimContribution', new __compactRuntime.ContractOperation());
    state_0.setOperation('cancelCampaign', new __compactRuntime.ContractOperation());
    state_0.setOperation('expireCampaign', new __compactRuntime.ContractOperation());
    state_0.setOperation('createGiftCard', new __compactRuntime.ContractOperation());
    state_0.setOperation('redeemGiftCard', new __compactRuntime.ContractOperation());
    state_0.setOperation('reclaimExpiredGiftCard', new __compactRuntime.ContractOperation());
    state_0.setOperation('rotateRegistryAdmin', new __compactRuntime.ContractOperation());
    state_0.setOperation('registerQuoteProvider', new __compactRuntime.ContractOperation());
    state_0.setOperation('rotateQuoteProvider', new __compactRuntime.ContractOperation());
    state_0.setOperation('removeQuoteProvider', new __compactRuntime.ContractOperation());
    state_0.setOperation('registerQuote', new __compactRuntime.ContractOperation());
    state_0.setOperation('payInvoiceWithQuote', new __compactRuntime.ContractOperation());
    state_0.setOperation('registerBackupAnchor', new __compactRuntime.ContractOperation());
    state_0.setOperation('updateBackupAnchor', new __compactRuntime.ContractOperation());
    state_0.setOperation('rotateBackupAuthorization', new __compactRuntime.ContractOperation());
    state_0.setOperation('deleteBackupAnchor', new __compactRuntime.ContractOperation());
    state_0.setOperation('proveInvoiceSettlement', new __compactRuntime.ContractOperation());
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
                                       { idx: { cached: false,
                                                pushPath: true,
                                                path: [
                                                       { tag: 'value',
                                                         value: { value: _descriptor_18.toValue(0n),
                                                                  alignment: _descriptor_18.alignment() } }] } },
                                       { push: { storage: false,
                                                 value: __compactRuntime.StateValue.newCell({ value: _descriptor_18.toValue(0n),
                                                                                              alignment: _descriptor_18.alignment() }).encode() } },
                                       { push: { storage: true,
                                                 value: __compactRuntime.StateValue.newMap(
                                                          new __compactRuntime.StateMap()
                                                        ).encode() } },
                                       { ins: { cached: false, n: 1 } },
                                       { ins: { cached: true, n: 1 } }]);
    __compactRuntime.queryLedgerState(context,
                                      partialProofData,
                                      [
                                       { idx: { cached: false,
                                                pushPath: true,
                                                path: [
                                                       { tag: 'value',
                                                         value: { value: _descriptor_18.toValue(0n),
                                                                  alignment: _descriptor_18.alignment() } }] } },
                                       { push: { storage: false,
                                                 value: __compactRuntime.StateValue.newCell({ value: _descriptor_18.toValue(1n),
                                                                                              alignment: _descriptor_18.alignment() }).encode() } },
                                       { push: { storage: true,
                                                 value: __compactRuntime.StateValue.newMap(
                                                          new __compactRuntime.StateMap()
                                                        ).encode() } },
                                       { ins: { cached: false, n: 1 } },
                                       { ins: { cached: true, n: 1 } }]);
    __compactRuntime.queryLedgerState(context,
                                      partialProofData,
                                      [
                                       { idx: { cached: false,
                                                pushPath: true,
                                                path: [
                                                       { tag: 'value',
                                                         value: { value: _descriptor_18.toValue(0n),
                                                                  alignment: _descriptor_18.alignment() } }] } },
                                       { push: { storage: false,
                                                 value: __compactRuntime.StateValue.newCell({ value: _descriptor_18.toValue(2n),
                                                                                              alignment: _descriptor_18.alignment() }).encode() } },
                                       { push: { storage: true,
                                                 value: __compactRuntime.StateValue.newMap(
                                                          new __compactRuntime.StateMap()
                                                        ).encode() } },
                                       { ins: { cached: false, n: 1 } },
                                       { ins: { cached: true, n: 1 } }]);
    __compactRuntime.queryLedgerState(context,
                                      partialProofData,
                                      [
                                       { idx: { cached: false,
                                                pushPath: true,
                                                path: [
                                                       { tag: 'value',
                                                         value: { value: _descriptor_18.toValue(0n),
                                                                  alignment: _descriptor_18.alignment() } }] } },
                                       { push: { storage: false,
                                                 value: __compactRuntime.StateValue.newCell({ value: _descriptor_18.toValue(3n),
                                                                                              alignment: _descriptor_18.alignment() }).encode() } },
                                       { push: { storage: true,
                                                 value: __compactRuntime.StateValue.newMap(
                                                          new __compactRuntime.StateMap()
                                                        ).encode() } },
                                       { ins: { cached: false, n: 1 } },
                                       { ins: { cached: true, n: 1 } }]);
    __compactRuntime.queryLedgerState(context,
                                      partialProofData,
                                      [
                                       { idx: { cached: false,
                                                pushPath: true,
                                                path: [
                                                       { tag: 'value',
                                                         value: { value: _descriptor_18.toValue(1n),
                                                                  alignment: _descriptor_18.alignment() } }] } },
                                       { push: { storage: false,
                                                 value: __compactRuntime.StateValue.newCell({ value: _descriptor_18.toValue(0n),
                                                                                              alignment: _descriptor_18.alignment() }).encode() } },
                                       { push: { storage: true,
                                                 value: __compactRuntime.StateValue.newMap(
                                                          new __compactRuntime.StateMap()
                                                        ).encode() } },
                                       { ins: { cached: false, n: 1 } },
                                       { ins: { cached: true, n: 1 } }]);
    __compactRuntime.queryLedgerState(context,
                                      partialProofData,
                                      [
                                       { idx: { cached: false,
                                                pushPath: true,
                                                path: [
                                                       { tag: 'value',
                                                         value: { value: _descriptor_18.toValue(1n),
                                                                  alignment: _descriptor_18.alignment() } }] } },
                                       { push: { storage: false,
                                                 value: __compactRuntime.StateValue.newCell({ value: _descriptor_18.toValue(1n),
                                                                                              alignment: _descriptor_18.alignment() }).encode() } },
                                       { push: { storage: true,
                                                 value: __compactRuntime.StateValue.newMap(
                                                          new __compactRuntime.StateMap()
                                                        ).encode() } },
                                       { ins: { cached: false, n: 1 } },
                                       { ins: { cached: true, n: 1 } }]);
    __compactRuntime.queryLedgerState(context,
                                      partialProofData,
                                      [
                                       { idx: { cached: false,
                                                pushPath: true,
                                                path: [
                                                       { tag: 'value',
                                                         value: { value: _descriptor_18.toValue(1n),
                                                                  alignment: _descriptor_18.alignment() } }] } },
                                       { push: { storage: false,
                                                 value: __compactRuntime.StateValue.newCell({ value: _descriptor_18.toValue(2n),
                                                                                              alignment: _descriptor_18.alignment() }).encode() } },
                                       { push: { storage: true,
                                                 value: __compactRuntime.StateValue.newMap(
                                                          new __compactRuntime.StateMap()
                                                        ).encode() } },
                                       { ins: { cached: false, n: 1 } },
                                       { ins: { cached: true, n: 1 } }]);
    __compactRuntime.queryLedgerState(context,
                                      partialProofData,
                                      [
                                       { idx: { cached: false,
                                                pushPath: true,
                                                path: [
                                                       { tag: 'value',
                                                         value: { value: _descriptor_18.toValue(1n),
                                                                  alignment: _descriptor_18.alignment() } }] } },
                                       { push: { storage: false,
                                                 value: __compactRuntime.StateValue.newCell({ value: _descriptor_18.toValue(3n),
                                                                                              alignment: _descriptor_18.alignment() }).encode() } },
                                       { push: { storage: true,
                                                 value: __compactRuntime.StateValue.newMap(
                                                          new __compactRuntime.StateMap()
                                                        ).encode() } },
                                       { ins: { cached: false, n: 1 } },
                                       { ins: { cached: true, n: 1 } }]);
    __compactRuntime.queryLedgerState(context,
                                      partialProofData,
                                      [
                                       { idx: { cached: false,
                                                pushPath: true,
                                                path: [
                                                       { tag: 'value',
                                                         value: { value: _descriptor_18.toValue(1n),
                                                                  alignment: _descriptor_18.alignment() } }] } },
                                       { push: { storage: false,
                                                 value: __compactRuntime.StateValue.newCell({ value: _descriptor_18.toValue(4n),
                                                                                              alignment: _descriptor_18.alignment() }).encode() } },
                                       { push: { storage: true,
                                                 value: __compactRuntime.StateValue.newMap(
                                                          new __compactRuntime.StateMap()
                                                        ).encode() } },
                                       { ins: { cached: false, n: 1 } },
                                       { ins: { cached: true, n: 1 } }]);
    __compactRuntime.queryLedgerState(context,
                                      partialProofData,
                                      [
                                       { idx: { cached: false,
                                                pushPath: true,
                                                path: [
                                                       { tag: 'value',
                                                         value: { value: _descriptor_18.toValue(1n),
                                                                  alignment: _descriptor_18.alignment() } }] } },
                                       { push: { storage: false,
                                                 value: __compactRuntime.StateValue.newCell({ value: _descriptor_18.toValue(5n),
                                                                                              alignment: _descriptor_18.alignment() }).encode() } },
                                       { push: { storage: true,
                                                 value: __compactRuntime.StateValue.newMap(
                                                          new __compactRuntime.StateMap()
                                                        ).encode() } },
                                       { ins: { cached: false, n: 1 } },
                                       { ins: { cached: true, n: 1 } }]);
    __compactRuntime.queryLedgerState(context,
                                      partialProofData,
                                      [
                                       { idx: { cached: false,
                                                pushPath: true,
                                                path: [
                                                       { tag: 'value',
                                                         value: { value: _descriptor_18.toValue(1n),
                                                                  alignment: _descriptor_18.alignment() } }] } },
                                       { push: { storage: false,
                                                 value: __compactRuntime.StateValue.newCell({ value: _descriptor_18.toValue(6n),
                                                                                              alignment: _descriptor_18.alignment() }).encode() } },
                                       { push: { storage: true,
                                                 value: __compactRuntime.StateValue.newMap(
                                                          new __compactRuntime.StateMap()
                                                        ).encode() } },
                                       { ins: { cached: false, n: 1 } },
                                       { ins: { cached: true, n: 1 } }]);
    __compactRuntime.queryLedgerState(context,
                                      partialProofData,
                                      [
                                       { idx: { cached: false,
                                                pushPath: true,
                                                path: [
                                                       { tag: 'value',
                                                         value: { value: _descriptor_18.toValue(1n),
                                                                  alignment: _descriptor_18.alignment() } }] } },
                                       { push: { storage: false,
                                                 value: __compactRuntime.StateValue.newCell({ value: _descriptor_18.toValue(7n),
                                                                                              alignment: _descriptor_18.alignment() }).encode() } },
                                       { push: { storage: true,
                                                 value: __compactRuntime.StateValue.newMap(
                                                          new __compactRuntime.StateMap()
                                                        ).encode() } },
                                       { ins: { cached: false, n: 1 } },
                                       { ins: { cached: true, n: 1 } }]);
    __compactRuntime.queryLedgerState(context,
                                      partialProofData,
                                      [
                                       { idx: { cached: false,
                                                pushPath: true,
                                                path: [
                                                       { tag: 'value',
                                                         value: { value: _descriptor_18.toValue(1n),
                                                                  alignment: _descriptor_18.alignment() } }] } },
                                       { push: { storage: false,
                                                 value: __compactRuntime.StateValue.newCell({ value: _descriptor_18.toValue(8n),
                                                                                              alignment: _descriptor_18.alignment() }).encode() } },
                                       { push: { storage: true,
                                                 value: __compactRuntime.StateValue.newMap(
                                                          new __compactRuntime.StateMap()
                                                        ).encode() } },
                                       { ins: { cached: false, n: 1 } },
                                       { ins: { cached: true, n: 1 } }]);
    __compactRuntime.queryLedgerState(context,
                                      partialProofData,
                                      [
                                       { idx: { cached: false,
                                                pushPath: true,
                                                path: [
                                                       { tag: 'value',
                                                         value: { value: _descriptor_18.toValue(1n),
                                                                  alignment: _descriptor_18.alignment() } }] } },
                                       { push: { storage: false,
                                                 value: __compactRuntime.StateValue.newCell({ value: _descriptor_18.toValue(9n),
                                                                                              alignment: _descriptor_18.alignment() }).encode() } },
                                       { push: { storage: true,
                                                 value: __compactRuntime.StateValue.newMap(
                                                          new __compactRuntime.StateMap()
                                                        ).encode() } },
                                       { ins: { cached: false, n: 1 } },
                                       { ins: { cached: true, n: 1 } }]);
    __compactRuntime.queryLedgerState(context,
                                      partialProofData,
                                      [
                                       { idx: { cached: false,
                                                pushPath: true,
                                                path: [
                                                       { tag: 'value',
                                                         value: { value: _descriptor_18.toValue(1n),
                                                                  alignment: _descriptor_18.alignment() } }] } },
                                       { push: { storage: false,
                                                 value: __compactRuntime.StateValue.newCell({ value: _descriptor_18.toValue(10n),
                                                                                              alignment: _descriptor_18.alignment() }).encode() } },
                                       { push: { storage: true,
                                                 value: __compactRuntime.StateValue.newMap(
                                                          new __compactRuntime.StateMap()
                                                        ).encode() } },
                                       { ins: { cached: false, n: 1 } },
                                       { ins: { cached: true, n: 1 } }]);
    __compactRuntime.queryLedgerState(context,
                                      partialProofData,
                                      [
                                       { idx: { cached: false,
                                                pushPath: true,
                                                path: [
                                                       { tag: 'value',
                                                         value: { value: _descriptor_18.toValue(1n),
                                                                  alignment: _descriptor_18.alignment() } }] } },
                                       { push: { storage: false,
                                                 value: __compactRuntime.StateValue.newCell({ value: _descriptor_18.toValue(11n),
                                                                                              alignment: _descriptor_18.alignment() }).encode() } },
                                       { push: { storage: true,
                                                 value: __compactRuntime.StateValue.newMap(
                                                          new __compactRuntime.StateMap()
                                                        ).encode() } },
                                       { ins: { cached: false, n: 1 } },
                                       { ins: { cached: true, n: 1 } }]);
    __compactRuntime.queryLedgerState(context,
                                      partialProofData,
                                      [
                                       { idx: { cached: false,
                                                pushPath: true,
                                                path: [
                                                       { tag: 'value',
                                                         value: { value: _descriptor_18.toValue(1n),
                                                                  alignment: _descriptor_18.alignment() } }] } },
                                       { push: { storage: false,
                                                 value: __compactRuntime.StateValue.newCell({ value: _descriptor_18.toValue(12n),
                                                                                              alignment: _descriptor_18.alignment() }).encode() } },
                                       { push: { storage: true,
                                                 value: __compactRuntime.StateValue.newMap(
                                                          new __compactRuntime.StateMap()
                                                        ).encode() } },
                                       { ins: { cached: false, n: 1 } },
                                       { ins: { cached: true, n: 1 } }]);
    __compactRuntime.queryLedgerState(context,
                                      partialProofData,
                                      [
                                       { idx: { cached: false,
                                                pushPath: true,
                                                path: [
                                                       { tag: 'value',
                                                         value: { value: _descriptor_18.toValue(1n),
                                                                  alignment: _descriptor_18.alignment() } }] } },
                                       { push: { storage: false,
                                                 value: __compactRuntime.StateValue.newCell({ value: _descriptor_18.toValue(13n),
                                                                                              alignment: _descriptor_18.alignment() }).encode() } },
                                       { push: { storage: true,
                                                 value: __compactRuntime.StateValue.newMap(
                                                          new __compactRuntime.StateMap()
                                                        ).encode() } },
                                       { ins: { cached: false, n: 1 } },
                                       { ins: { cached: true, n: 1 } }]);
    __compactRuntime.queryLedgerState(context,
                                      partialProofData,
                                      [
                                       { idx: { cached: false,
                                                pushPath: true,
                                                path: [
                                                       { tag: 'value',
                                                         value: { value: _descriptor_18.toValue(1n),
                                                                  alignment: _descriptor_18.alignment() } }] } },
                                       { push: { storage: false,
                                                 value: __compactRuntime.StateValue.newCell({ value: _descriptor_18.toValue(14n),
                                                                                              alignment: _descriptor_18.alignment() }).encode() } },
                                       { push: { storage: true,
                                                 value: __compactRuntime.StateValue.newCell({ value: _descriptor_0.toValue(new Uint8Array(32)),
                                                                                              alignment: _descriptor_0.alignment() }).encode() } },
                                       { ins: { cached: false, n: 1 } },
                                       { ins: { cached: true, n: 1 } }]);
    __compactRuntime.assert(!this._equal_0(registryAdminAuthorizationCommitment_0,
                                           new Uint8Array(32)),
                            'registry admin authorization is required');
    __compactRuntime.queryLedgerState(context,
                                      partialProofData,
                                      [
                                       { idx: { cached: false,
                                                pushPath: true,
                                                path: [
                                                       { tag: 'value',
                                                         value: { value: _descriptor_18.toValue(1n),
                                                                  alignment: _descriptor_18.alignment() } }] } },
                                       { push: { storage: false,
                                                 value: __compactRuntime.StateValue.newCell({ value: _descriptor_18.toValue(14n),
                                                                                              alignment: _descriptor_18.alignment() }).encode() } },
                                       { push: { storage: true,
                                                 value: __compactRuntime.StateValue.newCell({ value: _descriptor_0.toValue(registryAdminAuthorizationCommitment_0),
                                                                                              alignment: _descriptor_0.alignment() }).encode() } },
                                       { ins: { cached: false, n: 1 } },
                                       { ins: { cached: true, n: 1 } }]);
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
    const recipient_0 = this._right_0(_descriptor_20.fromValue(__compactRuntime.queryLedgerState(context,
                                                                                                 partialProofData,
                                                                                                 [
                                                                                                  { dup: { n: 2 } },
                                                                                                  { idx: { cached: true,
                                                                                                           pushPath: false,
                                                                                                           path: [
                                                                                                                  { tag: 'value',
                                                                                                                    value: { value: _descriptor_18.toValue(0n),
                                                                                                                             alignment: _descriptor_18.alignment() } }] } },
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
                                                         value: { value: _descriptor_18.toValue(1n),
                                                                  alignment: _descriptor_18.alignment() } }] } },
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
    const selfAddr_0 = _descriptor_20.fromValue(__compactRuntime.queryLedgerState(context,
                                                                                  partialProofData,
                                                                                  [
                                                                                   { dup: { n: 2 } },
                                                                                   { idx: { cached: true,
                                                                                            pushPath: false,
                                                                                            path: [
                                                                                                   { tag: 'value',
                                                                                                     value: { value: _descriptor_18.toValue(0n),
                                                                                                              alignment: _descriptor_18.alignment() } }] } },
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
                                                         value: { value: _descriptor_18.toValue(0n),
                                                                  alignment: _descriptor_18.alignment() } }] } },
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
                                                         value: { value: _descriptor_18.toValue(2n),
                                                                  alignment: _descriptor_18.alignment() } }] } },
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
                                                           value: { value: _descriptor_18.toValue(1n),
                                                                    alignment: _descriptor_18.alignment() } }] } },
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
                                                           value: { value: _descriptor_18.toValue(2n),
                                                                    alignment: _descriptor_18.alignment() } }] } },
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
                                                           value: { value: _descriptor_18.toValue(1n),
                                                                    alignment: _descriptor_18.alignment() } }] } },
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
    return this._persistentHash_8({ domain_sep:
                                      new Uint8Array([109, 105, 100, 110, 105, 103, 104, 116, 58, 122, 115, 119, 97, 112, 45, 99, 99, 91, 118, 49, 93]),
                                    info: coin_0,
                                    dataType: recipient_0.is_left,
                                    data:
                                      recipient_0.is_left ?
                                      recipient_0.left.bytes :
                                      recipient_0.right.bytes });
  }
  _coinNullifier_0(coin_0, addr_0) {
    return this._persistentHash_8({ domain_sep:
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
                                                                                        value: { value: _descriptor_18.toValue(2n),
                                                                                                 alignment: _descriptor_18.alignment() } }] } },
                                                                      { push: { storage: false,
                                                                                value: __compactRuntime.StateValue.newCell({ value: _descriptor_6.toValue(time_0),
                                                                                                                             alignment: _descriptor_6.alignment() }).encode() } },
                                                                      'lt',
                                                                      { popeq: { cached: true,
                                                                                 result: undefined } }]).value);
  }
  _blockTimeGte_0(context, partialProofData, time_0) {
    return !this._blockTimeLt_0(context, partialProofData, time_0);
  }
  _transientHash_0(value_0) {
    const result_0 = __compactRuntime.transientHash(_descriptor_32, value_0);
    return result_0;
  }
  _persistentHash_0(value_0) {
    const result_0 = __compactRuntime.persistentHash(_descriptor_33, value_0);
    return result_0;
  }
  _persistentHash_1(value_0) {
    const result_0 = __compactRuntime.persistentHash(_descriptor_30, value_0);
    return result_0;
  }
  _persistentHash_2(value_0) {
    const result_0 = __compactRuntime.persistentHash(_descriptor_31, value_0);
    return result_0;
  }
  _persistentHash_3(value_0) {
    const result_0 = __compactRuntime.persistentHash(_descriptor_28, value_0);
    return result_0;
  }
  _persistentHash_4(value_0) {
    const result_0 = __compactRuntime.persistentHash(_descriptor_29, value_0);
    return result_0;
  }
  _persistentHash_5(value_0) {
    const result_0 = __compactRuntime.persistentHash(_descriptor_26, value_0);
    return result_0;
  }
  _persistentHash_6(value_0) {
    const result_0 = __compactRuntime.persistentHash(_descriptor_27, value_0);
    return result_0;
  }
  _persistentHash_7(value_0) {
    const result_0 = __compactRuntime.persistentHash(_descriptor_23, value_0);
    return result_0;
  }
  _persistentHash_8(value_0) {
    const result_0 = __compactRuntime.persistentHash(_descriptor_25, value_0);
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
      value: _descriptor_19.toValue(result_0),
      alignment: _descriptor_19.alignment()
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
  _deriveQuoteProviderAuthorization_0(providerId_0, providerSecret_0) {
    return this._persistentHash_6([new Uint8Array([108, 117, 109, 97, 112, 97, 121, 58, 113, 117, 111, 116, 101, 45, 112, 114, 111, 118, 105, 100, 101, 114, 58, 118, 49, 0, 0, 0, 0, 0, 0, 0]),
                                   providerId_0,
                                   providerSecret_0]);
  }
  _deriveBackupAuthorization_0(ownerId_0, backupSecret_0) {
    return this._persistentHash_6([new Uint8Array([108, 117, 109, 97, 112, 97, 121, 58, 98, 97, 99, 107, 117, 112, 45, 97, 117, 116, 104, 58, 118, 49, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0]),
                                   ownerId_0,
                                   backupSecret_0]);
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
    return this._persistentHash_6([new Uint8Array([108, 117, 109, 97, 112, 97, 121, 58, 112, 97, 121, 109, 101, 110, 116, 45, 110, 117, 108, 108, 105, 102, 105, 101, 114, 58, 118, 49, 0, 0, 0, 0]),
                                   invoiceId_0,
                                   paymentSecret_0]);
  }
  _deriveClaimNullifier_0(invoiceId_0, merchantClaimSecret_0) {
    return this._persistentHash_6([new Uint8Array([108, 117, 109, 97, 112, 97, 121, 58, 99, 108, 97, 105, 109, 45, 110, 117, 108, 108, 105, 102, 105, 101, 114, 58, 118, 49, 0, 0, 0, 0, 0, 0]),
                                   invoiceId_0,
                                   merchantClaimSecret_0]);
  }
  _deriveEscrowCoinCommitment_0(nonce_0, color_0, value_0) {
    return this._persistentHash_2([new Uint8Array([108, 117, 109, 97, 112, 97, 121, 58, 101, 115, 99, 114, 111, 119, 45, 99, 111, 105, 110, 58, 118, 49, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0]),
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
    return this._persistentHash_3([new Uint8Array([108, 117, 109, 97, 112, 97, 121, 58, 99, 97, 109, 112, 97, 105, 103, 110, 45, 99, 111, 109, 109, 105, 116, 109, 101, 110, 116, 58, 118, 49, 0, 0]),
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
    return this._persistentHash_6([new Uint8Array([108, 117, 109, 97, 112, 97, 121, 58, 99, 111, 110, 116, 114, 105, 98, 117, 116, 105, 111, 110, 45, 110, 102, 58, 118, 49, 0, 0, 0, 0, 0, 0]),
                                   campaignId_0,
                                   contributionSecret_0]);
  }
  _deriveContributionId_0(campaignId_0, contributionNullifier_0) {
    return this._persistentHash_6([new Uint8Array([108, 117, 109, 97, 112, 97, 121, 58, 99, 111, 110, 116, 114, 105, 98, 117, 116, 105, 111, 110, 45, 105, 100, 58, 118, 49, 0, 0, 0, 0, 0, 0]),
                                   campaignId_0,
                                   contributionNullifier_0]);
  }
  _deriveContributionReceiptCommitment_0(contributionId_0,
                                         contributionNullifier_0,
                                         amount_0,
                                         tokenId_0,
                                         receiptSecret_0)
  {
    return this._persistentHash_4([new Uint8Array([108, 117, 109, 97, 112, 97, 121, 58, 99, 111, 110, 116, 114, 105, 98, 117, 116, 105, 111, 110, 45, 114, 101, 99, 101, 105, 112, 116, 58, 118, 49, 0]),
                                   contributionId_0,
                                   contributionNullifier_0,
                                   amount_0,
                                   tokenId_0,
                                   receiptSecret_0]);
  }
  _deriveContributionClaimNullifier_0(contributionId_0, merchantClaimSecret_0) {
    return this._persistentHash_6([new Uint8Array([108, 117, 109, 97, 112, 97, 121, 58, 99, 111, 110, 116, 114, 105, 98, 117, 116, 105, 111, 110, 45, 99, 108, 97, 105, 109, 58, 118, 49, 0, 0, 0]),
                                   contributionId_0,
                                   merchantClaimSecret_0]);
  }
  _deriveGiftCardCommitment_0(giftCardId_0,
                              amount_0,
                              tokenId_0,
                              giftSecret_0,
                              randomness_0,
                              expiry_0)
  {
    return this._persistentHash_5([new Uint8Array([108, 117, 109, 97, 112, 97, 121, 58, 103, 105, 102, 116, 45, 99, 97, 114, 100, 45, 99, 111, 109, 109, 105, 116, 109, 101, 110, 116, 58, 118, 49, 0]),
                                   1n,
                                   giftCardId_0,
                                   amount_0,
                                   tokenId_0,
                                   giftSecret_0,
                                   randomness_0,
                                   expiry_0]);
  }
  _deriveGiftCardIssuerAuthorization_0(giftCardId_0, issuerSecret_0) {
    return this._persistentHash_6([new Uint8Array([108, 117, 109, 97, 112, 97, 121, 58, 103, 105, 102, 116, 45, 99, 97, 114, 100, 45, 105, 115, 115, 117, 101, 114, 58, 118, 49, 0, 0, 0, 0, 0]),
                                   giftCardId_0,
                                   issuerSecret_0]);
  }
  _deriveGiftCardRedemptionNullifier_0(giftCardId_0, giftSecret_0) {
    return this._persistentHash_6([new Uint8Array([108, 117, 109, 97, 112, 97, 121, 58, 103, 105, 102, 116, 45, 99, 97, 114, 100, 45, 114, 101, 100, 101, 101, 109, 58, 118, 49, 0, 0, 0, 0, 0]),
                                   giftCardId_0,
                                   giftSecret_0]);
  }
  _deriveGiftCardReclaimNullifier_0(giftCardId_0, issuerSecret_0) {
    return this._persistentHash_6([new Uint8Array([108, 117, 109, 97, 112, 97, 121, 58, 103, 105, 102, 116, 45, 99, 97, 114, 100, 45, 114, 101, 99, 108, 97, 105, 109, 58, 118, 49, 0, 0, 0, 0]),
                                   giftCardId_0,
                                   issuerSecret_0]);
  }
  _deriveQuoteCommitment_0(quoteId_0,
                           providerId_0,
                           invoiceId_0,
                           requestedToken_0,
                           requestedAmount_0,
                           paymentToken_0,
                           acceptedPaymentAmount_0,
                           expiry_0,
                           randomness_0)
  {
    return this._persistentHash_7([new Uint8Array([108, 117, 109, 97, 112, 97, 121, 58, 113, 117, 111, 116, 101, 45, 99, 111, 109, 109, 105, 116, 109, 101, 110, 116, 58, 118, 49, 0, 0, 0, 0, 0]),
                                   1n,
                                   quoteId_0,
                                   providerId_0,
                                   invoiceId_0,
                                   requestedToken_0,
                                   requestedAmount_0,
                                   paymentToken_0,
                                   acceptedPaymentAmount_0,
                                   expiry_0,
                                   randomness_0]);
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
                                                                                                          value: { value: _descriptor_18.toValue(0n),
                                                                                                                   alignment: _descriptor_18.alignment() } },
                                                                                                        { tag: 'value',
                                                                                                          value: { value: _descriptor_18.toValue(0n),
                                                                                                                   alignment: _descriptor_18.alignment() } }] } },
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
                                                         value: { value: _descriptor_18.toValue(0n),
                                                                  alignment: _descriptor_18.alignment() } },
                                                       { tag: 'value',
                                                         value: { value: _descriptor_18.toValue(0n),
                                                                  alignment: _descriptor_18.alignment() } }] } },
                                       { push: { storage: false,
                                                 value: __compactRuntime.StateValue.newCell({ value: _descriptor_0.toValue(invoiceId_0),
                                                                                              alignment: _descriptor_0.alignment() }).encode() } },
                                       { push: { storage: true,
                                                 value: __compactRuntime.StateValue.newNull().encode() } },
                                       { ins: { cached: false, n: 1 } },
                                       { ins: { cached: true, n: 2 } }]);
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
                                                         value: { value: _descriptor_18.toValue(0n),
                                                                  alignment: _descriptor_18.alignment() } },
                                                       { tag: 'value',
                                                         value: { value: _descriptor_18.toValue(1n),
                                                                  alignment: _descriptor_18.alignment() } }] } },
                                       { push: { storage: false,
                                                 value: __compactRuntime.StateValue.newCell({ value: _descriptor_0.toValue(invoiceId_0),
                                                                                              alignment: _descriptor_0.alignment() }).encode() } },
                                       { push: { storage: true,
                                                 value: __compactRuntime.StateValue.newCell({ value: _descriptor_8.toValue(tmp_0),
                                                                                              alignment: _descriptor_8.alignment() }).encode() } },
                                       { ins: { cached: false, n: 1 } },
                                       { ins: { cached: true, n: 2 } }]);
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
                                                                                                         value: { value: _descriptor_18.toValue(0n),
                                                                                                                  alignment: _descriptor_18.alignment() } },
                                                                                                       { tag: 'value',
                                                                                                         value: { value: _descriptor_18.toValue(0n),
                                                                                                                  alignment: _descriptor_18.alignment() } }] } },
                                                                                       { push: { storage: false,
                                                                                                 value: __compactRuntime.StateValue.newCell({ value: _descriptor_0.toValue(invoiceId_0),
                                                                                                                                              alignment: _descriptor_0.alignment() }).encode() } },
                                                                                       'member',
                                                                                       { popeq: { cached: true,
                                                                                                  result: undefined } }]).value),
                            'invoice does not exist');
    const invoice_0 = _descriptor_8.fromValue(__compactRuntime.queryLedgerState(context,
                                                                                partialProofData,
                                                                                [
                                                                                 { dup: { n: 0 } },
                                                                                 { idx: { cached: false,
                                                                                          pushPath: false,
                                                                                          path: [
                                                                                                 { tag: 'value',
                                                                                                   value: { value: _descriptor_18.toValue(0n),
                                                                                                            alignment: _descriptor_18.alignment() } },
                                                                                                 { tag: 'value',
                                                                                                   value: { value: _descriptor_18.toValue(1n),
                                                                                                            alignment: _descriptor_18.alignment() } }] } },
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
                                                                                                          value: { value: _descriptor_18.toValue(0n),
                                                                                                                   alignment: _descriptor_18.alignment() } },
                                                                                                        { tag: 'value',
                                                                                                          value: { value: _descriptor_18.toValue(2n),
                                                                                                                   alignment: _descriptor_18.alignment() } }] } },
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
                                                         value: { value: _descriptor_18.toValue(0n),
                                                                  alignment: _descriptor_18.alignment() } },
                                                       { tag: 'value',
                                                         value: { value: _descriptor_18.toValue(2n),
                                                                  alignment: _descriptor_18.alignment() } }] } },
                                       { push: { storage: false,
                                                 value: __compactRuntime.StateValue.newCell({ value: _descriptor_0.toValue(nullifier_0),
                                                                                              alignment: _descriptor_0.alignment() }).encode() } },
                                       { push: { storage: true,
                                                 value: __compactRuntime.StateValue.newNull().encode() } },
                                       { ins: { cached: false, n: 1 } },
                                       { ins: { cached: true, n: 2 } }]);
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
                                                         value: { value: _descriptor_18.toValue(0n),
                                                                  alignment: _descriptor_18.alignment() } },
                                                       { tag: 'value',
                                                         value: { value: _descriptor_18.toValue(1n),
                                                                  alignment: _descriptor_18.alignment() } }] } },
                                       { push: { storage: false,
                                                 value: __compactRuntime.StateValue.newCell({ value: _descriptor_0.toValue(invoiceId_0),
                                                                                              alignment: _descriptor_0.alignment() }).encode() } },
                                       { push: { storage: true,
                                                 value: __compactRuntime.StateValue.newCell({ value: _descriptor_8.toValue(tmp_0),
                                                                                              alignment: _descriptor_8.alignment() }).encode() } },
                                       { ins: { cached: false, n: 1 } },
                                       { ins: { cached: true, n: 2 } }]);
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
                                                                                                         value: { value: _descriptor_18.toValue(0n),
                                                                                                                  alignment: _descriptor_18.alignment() } },
                                                                                                       { tag: 'value',
                                                                                                         value: { value: _descriptor_18.toValue(0n),
                                                                                                                  alignment: _descriptor_18.alignment() } }] } },
                                                                                       { push: { storage: false,
                                                                                                 value: __compactRuntime.StateValue.newCell({ value: _descriptor_0.toValue(invoiceId_0),
                                                                                                                                              alignment: _descriptor_0.alignment() }).encode() } },
                                                                                       'member',
                                                                                       { popeq: { cached: true,
                                                                                                  result: undefined } }]).value),
                            'invoice does not exist');
    const invoice_0 = _descriptor_8.fromValue(__compactRuntime.queryLedgerState(context,
                                                                                partialProofData,
                                                                                [
                                                                                 { dup: { n: 0 } },
                                                                                 { idx: { cached: false,
                                                                                          pushPath: false,
                                                                                          path: [
                                                                                                 { tag: 'value',
                                                                                                   value: { value: _descriptor_18.toValue(0n),
                                                                                                            alignment: _descriptor_18.alignment() } },
                                                                                                 { tag: 'value',
                                                                                                   value: { value: _descriptor_18.toValue(1n),
                                                                                                            alignment: _descriptor_18.alignment() } }] } },
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
                                                                                                          value: { value: _descriptor_18.toValue(0n),
                                                                                                                   alignment: _descriptor_18.alignment() } },
                                                                                                        { tag: 'value',
                                                                                                          value: { value: _descriptor_18.toValue(3n),
                                                                                                                   alignment: _descriptor_18.alignment() } }] } },
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
                                                         value: { value: _descriptor_18.toValue(0n),
                                                                  alignment: _descriptor_18.alignment() } },
                                                       { tag: 'value',
                                                         value: { value: _descriptor_18.toValue(3n),
                                                                  alignment: _descriptor_18.alignment() } }] } },
                                       { push: { storage: false,
                                                 value: __compactRuntime.StateValue.newCell({ value: _descriptor_0.toValue(nullifier_0),
                                                                                              alignment: _descriptor_0.alignment() }).encode() } },
                                       { push: { storage: true,
                                                 value: __compactRuntime.StateValue.newNull().encode() } },
                                       { ins: { cached: false, n: 1 } },
                                       { ins: { cached: true, n: 2 } }]);
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
                                                         value: { value: _descriptor_18.toValue(0n),
                                                                  alignment: _descriptor_18.alignment() } },
                                                       { tag: 'value',
                                                         value: { value: _descriptor_18.toValue(1n),
                                                                  alignment: _descriptor_18.alignment() } }] } },
                                       { push: { storage: false,
                                                 value: __compactRuntime.StateValue.newCell({ value: _descriptor_0.toValue(invoiceId_0),
                                                                                              alignment: _descriptor_0.alignment() }).encode() } },
                                       { push: { storage: true,
                                                 value: __compactRuntime.StateValue.newCell({ value: _descriptor_8.toValue(tmp_0),
                                                                                              alignment: _descriptor_8.alignment() }).encode() } },
                                       { ins: { cached: false, n: 1 } },
                                       { ins: { cached: true, n: 2 } }]);
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
                                                                                                         value: { value: _descriptor_18.toValue(0n),
                                                                                                                  alignment: _descriptor_18.alignment() } },
                                                                                                       { tag: 'value',
                                                                                                         value: { value: _descriptor_18.toValue(0n),
                                                                                                                  alignment: _descriptor_18.alignment() } }] } },
                                                                                       { push: { storage: false,
                                                                                                 value: __compactRuntime.StateValue.newCell({ value: _descriptor_0.toValue(invoiceId_0),
                                                                                                                                              alignment: _descriptor_0.alignment() }).encode() } },
                                                                                       'member',
                                                                                       { popeq: { cached: true,
                                                                                                  result: undefined } }]).value),
                            'invoice does not exist');
    const invoice_0 = _descriptor_8.fromValue(__compactRuntime.queryLedgerState(context,
                                                                                partialProofData,
                                                                                [
                                                                                 { dup: { n: 0 } },
                                                                                 { idx: { cached: false,
                                                                                          pushPath: false,
                                                                                          path: [
                                                                                                 { tag: 'value',
                                                                                                   value: { value: _descriptor_18.toValue(0n),
                                                                                                            alignment: _descriptor_18.alignment() } },
                                                                                                 { tag: 'value',
                                                                                                   value: { value: _descriptor_18.toValue(1n),
                                                                                                            alignment: _descriptor_18.alignment() } }] } },
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
                                                         value: { value: _descriptor_18.toValue(0n),
                                                                  alignment: _descriptor_18.alignment() } },
                                                       { tag: 'value',
                                                         value: { value: _descriptor_18.toValue(1n),
                                                                  alignment: _descriptor_18.alignment() } }] } },
                                       { push: { storage: false,
                                                 value: __compactRuntime.StateValue.newCell({ value: _descriptor_0.toValue(invoiceId_0),
                                                                                              alignment: _descriptor_0.alignment() }).encode() } },
                                       { push: { storage: true,
                                                 value: __compactRuntime.StateValue.newCell({ value: _descriptor_8.toValue(tmp_0),
                                                                                              alignment: _descriptor_8.alignment() }).encode() } },
                                       { ins: { cached: false, n: 1 } },
                                       { ins: { cached: true, n: 2 } }]);
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
                                                                                                         value: { value: _descriptor_18.toValue(0n),
                                                                                                                  alignment: _descriptor_18.alignment() } },
                                                                                                       { tag: 'value',
                                                                                                         value: { value: _descriptor_18.toValue(0n),
                                                                                                                  alignment: _descriptor_18.alignment() } }] } },
                                                                                       { push: { storage: false,
                                                                                                 value: __compactRuntime.StateValue.newCell({ value: _descriptor_0.toValue(invoiceId_0),
                                                                                                                                              alignment: _descriptor_0.alignment() }).encode() } },
                                                                                       'member',
                                                                                       { popeq: { cached: true,
                                                                                                  result: undefined } }]).value),
                            'invoice does not exist');
    const invoice_0 = _descriptor_8.fromValue(__compactRuntime.queryLedgerState(context,
                                                                                partialProofData,
                                                                                [
                                                                                 { dup: { n: 0 } },
                                                                                 { idx: { cached: false,
                                                                                          pushPath: false,
                                                                                          path: [
                                                                                                 { tag: 'value',
                                                                                                   value: { value: _descriptor_18.toValue(0n),
                                                                                                            alignment: _descriptor_18.alignment() } },
                                                                                                 { tag: 'value',
                                                                                                   value: { value: _descriptor_18.toValue(1n),
                                                                                                            alignment: _descriptor_18.alignment() } }] } },
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
                                                         value: { value: _descriptor_18.toValue(0n),
                                                                  alignment: _descriptor_18.alignment() } },
                                                       { tag: 'value',
                                                         value: { value: _descriptor_18.toValue(1n),
                                                                  alignment: _descriptor_18.alignment() } }] } },
                                       { push: { storage: false,
                                                 value: __compactRuntime.StateValue.newCell({ value: _descriptor_0.toValue(invoiceId_0),
                                                                                              alignment: _descriptor_0.alignment() }).encode() } },
                                       { push: { storage: true,
                                                 value: __compactRuntime.StateValue.newCell({ value: _descriptor_8.toValue(tmp_0),
                                                                                              alignment: _descriptor_8.alignment() }).encode() } },
                                       { ins: { cached: false, n: 1 } },
                                       { ins: { cached: true, n: 2 } }]);
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
  _createCampaign_0(context,
                    partialProofData,
                    campaignId_0,
                    campaignCommitment_0,
                    merchantAuthorizationCommitment_0,
                    expiry_0)
  {
    __compactRuntime.assert(!this._equal_13(campaignId_0, new Uint8Array(32)),
                            'campaign id is required');
    __compactRuntime.assert(!this._equal_14(campaignCommitment_0,
                                            new Uint8Array(32)),
                            'campaign commitment is required');
    __compactRuntime.assert(!this._equal_15(merchantAuthorizationCommitment_0,
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
                                                                                                          value: { value: _descriptor_18.toValue(1n),
                                                                                                                   alignment: _descriptor_18.alignment() } },
                                                                                                        { tag: 'value',
                                                                                                          value: { value: _descriptor_18.toValue(0n),
                                                                                                                   alignment: _descriptor_18.alignment() } }] } },
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
                                                         value: { value: _descriptor_18.toValue(1n),
                                                                  alignment: _descriptor_18.alignment() } },
                                                       { tag: 'value',
                                                         value: { value: _descriptor_18.toValue(0n),
                                                                  alignment: _descriptor_18.alignment() } }] } },
                                       { push: { storage: false,
                                                 value: __compactRuntime.StateValue.newCell({ value: _descriptor_0.toValue(campaignId_0),
                                                                                              alignment: _descriptor_0.alignment() }).encode() } },
                                       { push: { storage: true,
                                                 value: __compactRuntime.StateValue.newNull().encode() } },
                                       { ins: { cached: false, n: 1 } },
                                       { ins: { cached: true, n: 2 } }]);
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
                                                         value: { value: _descriptor_18.toValue(1n),
                                                                  alignment: _descriptor_18.alignment() } },
                                                       { tag: 'value',
                                                         value: { value: _descriptor_18.toValue(1n),
                                                                  alignment: _descriptor_18.alignment() } }] } },
                                       { push: { storage: false,
                                                 value: __compactRuntime.StateValue.newCell({ value: _descriptor_0.toValue(campaignId_0),
                                                                                              alignment: _descriptor_0.alignment() }).encode() } },
                                       { push: { storage: true,
                                                 value: __compactRuntime.StateValue.newCell({ value: _descriptor_17.toValue(tmp_0),
                                                                                              alignment: _descriptor_17.alignment() }).encode() } },
                                       { ins: { cached: false, n: 1 } },
                                       { ins: { cached: true, n: 2 } }]);
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
    __compactRuntime.assert(_descriptor_1.fromValue(__compactRuntime.queryLedgerState(context,
                                                                                      partialProofData,
                                                                                      [
                                                                                       { dup: { n: 0 } },
                                                                                       { idx: { cached: false,
                                                                                                pushPath: false,
                                                                                                path: [
                                                                                                       { tag: 'value',
                                                                                                         value: { value: _descriptor_18.toValue(1n),
                                                                                                                  alignment: _descriptor_18.alignment() } },
                                                                                                       { tag: 'value',
                                                                                                         value: { value: _descriptor_18.toValue(0n),
                                                                                                                  alignment: _descriptor_18.alignment() } }] } },
                                                                                       { push: { storage: false,
                                                                                                 value: __compactRuntime.StateValue.newCell({ value: _descriptor_0.toValue(campaignId_0),
                                                                                                                                              alignment: _descriptor_0.alignment() }).encode() } },
                                                                                       'member',
                                                                                       { popeq: { cached: true,
                                                                                                  result: undefined } }]).value),
                            'campaign does not exist');
    const campaign_0 = _descriptor_17.fromValue(__compactRuntime.queryLedgerState(context,
                                                                                  partialProofData,
                                                                                  [
                                                                                   { dup: { n: 0 } },
                                                                                   { idx: { cached: false,
                                                                                            pushPath: false,
                                                                                            path: [
                                                                                                   { tag: 'value',
                                                                                                     value: { value: _descriptor_18.toValue(1n),
                                                                                                              alignment: _descriptor_18.alignment() } },
                                                                                                   { tag: 'value',
                                                                                                     value: { value: _descriptor_18.toValue(1n),
                                                                                                              alignment: _descriptor_18.alignment() } }] } },
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
    __compactRuntime.assert(this._equal_16(expectedCommitment_0,
                                           campaign_0.commitment),
                            'invalid campaign opening');
    let t_0, t_1;
    __compactRuntime.assert((t_1 = coin_0.value, t_1 >= minimumContribution_0)
                            &&
                            (t_0 = coin_0.value, t_0 <= maximumContribution_0),
                            'contribution amount outside campaign range');
    const tokenAllowed_0 = this._equal_17(coin_0.color, acceptedTokenA_0)
                           ||
                           acceptedTokenCount_0 >= 2n
                           &&
                           this._equal_18(coin_0.color, acceptedTokenB_0)
                           ||
                           acceptedTokenCount_0 >= 3n
                           &&
                           this._equal_19(coin_0.color, acceptedTokenC_0)
                           ||
                           acceptedTokenCount_0 >= 4n
                           &&
                           this._equal_20(coin_0.color, acceptedTokenD_0);
    __compactRuntime.assert(tokenAllowed_0, 'token not accepted by campaign');
    const nullifier_0 = this._deriveContributionNullifier_0(campaignId_0,
                                                            contributionSecret_0);
    const contributionId_0 = this._deriveContributionId_0(campaignId_0,
                                                          nullifier_0);
    __compactRuntime.assert(!_descriptor_1.fromValue(__compactRuntime.queryLedgerState(context,
                                                                                       partialProofData,
                                                                                       [
                                                                                        { dup: { n: 0 } },
                                                                                        { idx: { cached: false,
                                                                                                 pushPath: false,
                                                                                                 path: [
                                                                                                        { tag: 'value',
                                                                                                          value: { value: _descriptor_18.toValue(1n),
                                                                                                                   alignment: _descriptor_18.alignment() } },
                                                                                                        { tag: 'value',
                                                                                                          value: { value: _descriptor_18.toValue(4n),
                                                                                                                   alignment: _descriptor_18.alignment() } }] } },
                                                                                        { push: { storage: false,
                                                                                                  value: __compactRuntime.StateValue.newCell({ value: _descriptor_0.toValue(nullifier_0),
                                                                                                                                               alignment: _descriptor_0.alignment() }).encode() } },
                                                                                        'member',
                                                                                        { popeq: { cached: true,
                                                                                                   result: undefined } }]).value),
                            'contribution replay');
    __compactRuntime.assert(!_descriptor_1.fromValue(__compactRuntime.queryLedgerState(context,
                                                                                       partialProofData,
                                                                                       [
                                                                                        { dup: { n: 0 } },
                                                                                        { idx: { cached: false,
                                                                                                 pushPath: false,
                                                                                                 path: [
                                                                                                        { tag: 'value',
                                                                                                          value: { value: _descriptor_18.toValue(1n),
                                                                                                                   alignment: _descriptor_18.alignment() } },
                                                                                                        { tag: 'value',
                                                                                                          value: { value: _descriptor_18.toValue(2n),
                                                                                                                   alignment: _descriptor_18.alignment() } }] } },
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
                                                         value: { value: _descriptor_18.toValue(1n),
                                                                  alignment: _descriptor_18.alignment() } },
                                                       { tag: 'value',
                                                         value: { value: _descriptor_18.toValue(4n),
                                                                  alignment: _descriptor_18.alignment() } }] } },
                                       { push: { storage: false,
                                                 value: __compactRuntime.StateValue.newCell({ value: _descriptor_0.toValue(nullifier_0),
                                                                                              alignment: _descriptor_0.alignment() }).encode() } },
                                       { push: { storage: true,
                                                 value: __compactRuntime.StateValue.newNull().encode() } },
                                       { ins: { cached: false, n: 1 } },
                                       { ins: { cached: true, n: 2 } }]);
    __compactRuntime.queryLedgerState(context,
                                      partialProofData,
                                      [
                                       { idx: { cached: false,
                                                pushPath: true,
                                                path: [
                                                       { tag: 'value',
                                                         value: { value: _descriptor_18.toValue(1n),
                                                                  alignment: _descriptor_18.alignment() } },
                                                       { tag: 'value',
                                                         value: { value: _descriptor_18.toValue(2n),
                                                                  alignment: _descriptor_18.alignment() } }] } },
                                       { push: { storage: false,
                                                 value: __compactRuntime.StateValue.newCell({ value: _descriptor_0.toValue(contributionId_0),
                                                                                              alignment: _descriptor_0.alignment() }).encode() } },
                                       { push: { storage: true,
                                                 value: __compactRuntime.StateValue.newNull().encode() } },
                                       { ins: { cached: false, n: 1 } },
                                       { ins: { cached: true, n: 2 } }]);
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
                                                         value: { value: _descriptor_18.toValue(1n),
                                                                  alignment: _descriptor_18.alignment() } },
                                                       { tag: 'value',
                                                         value: { value: _descriptor_18.toValue(3n),
                                                                  alignment: _descriptor_18.alignment() } }] } },
                                       { push: { storage: false,
                                                 value: __compactRuntime.StateValue.newCell({ value: _descriptor_0.toValue(contributionId_0),
                                                                                              alignment: _descriptor_0.alignment() }).encode() } },
                                       { push: { storage: true,
                                                 value: __compactRuntime.StateValue.newCell({ value: _descriptor_2.toValue(tmp_0),
                                                                                              alignment: _descriptor_2.alignment() }).encode() } },
                                       { ins: { cached: false, n: 1 } },
                                       { ins: { cached: true, n: 2 } }]);
    const tmp_1 = { commitmentVersion: campaign_0.commitmentVersion,
                    commitment: campaign_0.commitment,
                    merchantAuthorization: campaign_0.merchantAuthorization,
                    expiry: campaign_0.expiry,
                    status: campaign_0.status,
                    contributionCount:
                      ((t1) => {
                        if (t1 > 18446744073709551615n) {
                          throw new __compactRuntime.CompactError('lumapay.compact line 693 char 28: cast from Field or Uint value to smaller Uint value failed: ' + t1 + ' is greater than 18446744073709551615');
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
                                                         value: { value: _descriptor_18.toValue(1n),
                                                                  alignment: _descriptor_18.alignment() } },
                                                       { tag: 'value',
                                                         value: { value: _descriptor_18.toValue(1n),
                                                                  alignment: _descriptor_18.alignment() } }] } },
                                       { push: { storage: false,
                                                 value: __compactRuntime.StateValue.newCell({ value: _descriptor_0.toValue(campaignId_0),
                                                                                              alignment: _descriptor_0.alignment() }).encode() } },
                                       { push: { storage: true,
                                                 value: __compactRuntime.StateValue.newCell({ value: _descriptor_17.toValue(tmp_1),
                                                                                              alignment: _descriptor_17.alignment() }).encode() } },
                                       { ins: { cached: false, n: 1 } },
                                       { ins: { cached: true, n: 2 } }]);
    return [];
  }
  _claimContribution_0(context,
                       partialProofData,
                       contributionId_0,
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
                                                                                                         value: { value: _descriptor_18.toValue(1n),
                                                                                                                  alignment: _descriptor_18.alignment() } },
                                                                                                       { tag: 'value',
                                                                                                         value: { value: _descriptor_18.toValue(2n),
                                                                                                                  alignment: _descriptor_18.alignment() } }] } },
                                                                                       { push: { storage: false,
                                                                                                 value: __compactRuntime.StateValue.newCell({ value: _descriptor_0.toValue(contributionId_0),
                                                                                                                                              alignment: _descriptor_0.alignment() }).encode() } },
                                                                                       'member',
                                                                                       { popeq: { cached: true,
                                                                                                  result: undefined } }]).value),
                            'contribution does not exist');
    const contribution_0 = _descriptor_2.fromValue(__compactRuntime.queryLedgerState(context,
                                                                                     partialProofData,
                                                                                     [
                                                                                      { dup: { n: 0 } },
                                                                                      { idx: { cached: false,
                                                                                               pushPath: false,
                                                                                               path: [
                                                                                                      { tag: 'value',
                                                                                                        value: { value: _descriptor_18.toValue(1n),
                                                                                                                 alignment: _descriptor_18.alignment() } },
                                                                                                      { tag: 'value',
                                                                                                        value: { value: _descriptor_18.toValue(3n),
                                                                                                                 alignment: _descriptor_18.alignment() } }] } },
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
                        _descriptor_17.fromValue(__compactRuntime.queryLedgerState(context,
                                                                                   partialProofData,
                                                                                   [
                                                                                    { dup: { n: 0 } },
                                                                                    { idx: { cached: false,
                                                                                             pushPath: false,
                                                                                             path: [
                                                                                                    { tag: 'value',
                                                                                                      value: { value: _descriptor_18.toValue(1n),
                                                                                                               alignment: _descriptor_18.alignment() } },
                                                                                                    { tag: 'value',
                                                                                                      value: { value: _descriptor_18.toValue(1n),
                                                                                                               alignment: _descriptor_18.alignment() } }] } },
                                                                                    { idx: { cached: false,
                                                                                             pushPath: false,
                                                                                             path: [
                                                                                                    { tag: 'value',
                                                                                                      value: { value: _descriptor_0.toValue(tmp_0),
                                                                                                               alignment: _descriptor_0.alignment() } }] } },
                                                                                    { popeq: { cached: false,
                                                                                               result: undefined } }]).value));
    __compactRuntime.assert(this._equal_21(this._deriveMerchantAuthorization_0(merchantClaimSecret_0),
                                           campaign_0.merchantAuthorization),
                            'unauthorized contribution claim');
    __compactRuntime.assert(this._equal_22(this._deriveEscrowCoinCommitment_0(escrowCoin_0.nonce,
                                                                              escrowCoin_0.color,
                                                                              escrowCoin_0.value),
                                           contribution_0.escrowCoinCommitment),
                            'wrong contribution escrow coin');
    const nullifier_0 = this._deriveContributionClaimNullifier_0(contributionId_0,
                                                                 merchantClaimSecret_0);
    __compactRuntime.assert(!_descriptor_1.fromValue(__compactRuntime.queryLedgerState(context,
                                                                                       partialProofData,
                                                                                       [
                                                                                        { dup: { n: 0 } },
                                                                                        { idx: { cached: false,
                                                                                                 pushPath: false,
                                                                                                 path: [
                                                                                                        { tag: 'value',
                                                                                                          value: { value: _descriptor_18.toValue(0n),
                                                                                                                   alignment: _descriptor_18.alignment() } },
                                                                                                        { tag: 'value',
                                                                                                          value: { value: _descriptor_18.toValue(3n),
                                                                                                                   alignment: _descriptor_18.alignment() } }] } },
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
                                                         value: { value: _descriptor_18.toValue(0n),
                                                                  alignment: _descriptor_18.alignment() } },
                                                       { tag: 'value',
                                                         value: { value: _descriptor_18.toValue(3n),
                                                                  alignment: _descriptor_18.alignment() } }] } },
                                       { push: { storage: false,
                                                 value: __compactRuntime.StateValue.newCell({ value: _descriptor_0.toValue(nullifier_0),
                                                                                              alignment: _descriptor_0.alignment() }).encode() } },
                                       { push: { storage: true,
                                                 value: __compactRuntime.StateValue.newNull().encode() } },
                                       { ins: { cached: false, n: 1 } },
                                       { ins: { cached: true, n: 2 } }]);
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
                                                         value: { value: _descriptor_18.toValue(1n),
                                                                  alignment: _descriptor_18.alignment() } },
                                                       { tag: 'value',
                                                         value: { value: _descriptor_18.toValue(3n),
                                                                  alignment: _descriptor_18.alignment() } }] } },
                                       { push: { storage: false,
                                                 value: __compactRuntime.StateValue.newCell({ value: _descriptor_0.toValue(contributionId_0),
                                                                                              alignment: _descriptor_0.alignment() }).encode() } },
                                       { push: { storage: true,
                                                 value: __compactRuntime.StateValue.newCell({ value: _descriptor_2.toValue(tmp_1),
                                                                                              alignment: _descriptor_2.alignment() }).encode() } },
                                       { ins: { cached: false, n: 1 } },
                                       { ins: { cached: true, n: 2 } }]);
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
    __compactRuntime.assert(_descriptor_1.fromValue(__compactRuntime.queryLedgerState(context,
                                                                                      partialProofData,
                                                                                      [
                                                                                       { dup: { n: 0 } },
                                                                                       { idx: { cached: false,
                                                                                                pushPath: false,
                                                                                                path: [
                                                                                                       { tag: 'value',
                                                                                                         value: { value: _descriptor_18.toValue(1n),
                                                                                                                  alignment: _descriptor_18.alignment() } },
                                                                                                       { tag: 'value',
                                                                                                         value: { value: _descriptor_18.toValue(0n),
                                                                                                                  alignment: _descriptor_18.alignment() } }] } },
                                                                                       { push: { storage: false,
                                                                                                 value: __compactRuntime.StateValue.newCell({ value: _descriptor_0.toValue(campaignId_0),
                                                                                                                                              alignment: _descriptor_0.alignment() }).encode() } },
                                                                                       'member',
                                                                                       { popeq: { cached: true,
                                                                                                  result: undefined } }]).value),
                            'campaign does not exist');
    const campaign_0 = _descriptor_17.fromValue(__compactRuntime.queryLedgerState(context,
                                                                                  partialProofData,
                                                                                  [
                                                                                   { dup: { n: 0 } },
                                                                                   { idx: { cached: false,
                                                                                            pushPath: false,
                                                                                            path: [
                                                                                                   { tag: 'value',
                                                                                                     value: { value: _descriptor_18.toValue(1n),
                                                                                                              alignment: _descriptor_18.alignment() } },
                                                                                                   { tag: 'value',
                                                                                                     value: { value: _descriptor_18.toValue(1n),
                                                                                                              alignment: _descriptor_18.alignment() } }] } },
                                                                                   { idx: { cached: false,
                                                                                            pushPath: false,
                                                                                            path: [
                                                                                                   { tag: 'value',
                                                                                                     value: { value: _descriptor_0.toValue(campaignId_0),
                                                                                                              alignment: _descriptor_0.alignment() } }] } },
                                                                                   { popeq: { cached: false,
                                                                                              result: undefined } }]).value);
    __compactRuntime.assert(campaign_0.status === 0, 'campaign is not open');
    __compactRuntime.assert(this._equal_23(this._deriveMerchantAuthorization_0(merchantClaimSecret_0),
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
                                                         value: { value: _descriptor_18.toValue(1n),
                                                                  alignment: _descriptor_18.alignment() } },
                                                       { tag: 'value',
                                                         value: { value: _descriptor_18.toValue(1n),
                                                                  alignment: _descriptor_18.alignment() } }] } },
                                       { push: { storage: false,
                                                 value: __compactRuntime.StateValue.newCell({ value: _descriptor_0.toValue(campaignId_0),
                                                                                              alignment: _descriptor_0.alignment() }).encode() } },
                                       { push: { storage: true,
                                                 value: __compactRuntime.StateValue.newCell({ value: _descriptor_17.toValue(tmp_0),
                                                                                              alignment: _descriptor_17.alignment() }).encode() } },
                                       { ins: { cached: false, n: 1 } },
                                       { ins: { cached: true, n: 2 } }]);
    return [];
  }
  _expireCampaign_0(context, partialProofData, campaignId_0) {
    __compactRuntime.assert(_descriptor_1.fromValue(__compactRuntime.queryLedgerState(context,
                                                                                      partialProofData,
                                                                                      [
                                                                                       { dup: { n: 0 } },
                                                                                       { idx: { cached: false,
                                                                                                pushPath: false,
                                                                                                path: [
                                                                                                       { tag: 'value',
                                                                                                         value: { value: _descriptor_18.toValue(1n),
                                                                                                                  alignment: _descriptor_18.alignment() } },
                                                                                                       { tag: 'value',
                                                                                                         value: { value: _descriptor_18.toValue(0n),
                                                                                                                  alignment: _descriptor_18.alignment() } }] } },
                                                                                       { push: { storage: false,
                                                                                                 value: __compactRuntime.StateValue.newCell({ value: _descriptor_0.toValue(campaignId_0),
                                                                                                                                              alignment: _descriptor_0.alignment() }).encode() } },
                                                                                       'member',
                                                                                       { popeq: { cached: true,
                                                                                                  result: undefined } }]).value),
                            'campaign does not exist');
    const campaign_0 = _descriptor_17.fromValue(__compactRuntime.queryLedgerState(context,
                                                                                  partialProofData,
                                                                                  [
                                                                                   { dup: { n: 0 } },
                                                                                   { idx: { cached: false,
                                                                                            pushPath: false,
                                                                                            path: [
                                                                                                   { tag: 'value',
                                                                                                     value: { value: _descriptor_18.toValue(1n),
                                                                                                              alignment: _descriptor_18.alignment() } },
                                                                                                   { tag: 'value',
                                                                                                     value: { value: _descriptor_18.toValue(1n),
                                                                                                              alignment: _descriptor_18.alignment() } }] } },
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
                                                         value: { value: _descriptor_18.toValue(1n),
                                                                  alignment: _descriptor_18.alignment() } },
                                                       { tag: 'value',
                                                         value: { value: _descriptor_18.toValue(1n),
                                                                  alignment: _descriptor_18.alignment() } }] } },
                                       { push: { storage: false,
                                                 value: __compactRuntime.StateValue.newCell({ value: _descriptor_0.toValue(campaignId_0),
                                                                                              alignment: _descriptor_0.alignment() }).encode() } },
                                       { push: { storage: true,
                                                 value: __compactRuntime.StateValue.newCell({ value: _descriptor_17.toValue(tmp_0),
                                                                                              alignment: _descriptor_17.alignment() }).encode() } },
                                       { ins: { cached: false, n: 1 } },
                                       { ins: { cached: true, n: 2 } }]);
    return [];
  }
  _verifyContributionReceipt_0(contributionId_0,
                               contributionNullifier_0,
                               amount_0,
                               tokenId_0,
                               receiptSecret_0,
                               expectedReceiptCommitment_0)
  {
    return this._equal_24(this._deriveContributionReceiptCommitment_0(contributionId_0,
                                                                      contributionNullifier_0,
                                                                      amount_0,
                                                                      tokenId_0,
                                                                      receiptSecret_0),
                          expectedReceiptCommitment_0);
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
    __compactRuntime.assert(!this._equal_25(giftCardId_0, new Uint8Array(32)),
                            'gift card id is required');
    __compactRuntime.assert(!_descriptor_1.fromValue(__compactRuntime.queryLedgerState(context,
                                                                                       partialProofData,
                                                                                       [
                                                                                        { dup: { n: 0 } },
                                                                                        { idx: { cached: false,
                                                                                                 pushPath: false,
                                                                                                 path: [
                                                                                                        { tag: 'value',
                                                                                                          value: { value: _descriptor_18.toValue(1n),
                                                                                                                   alignment: _descriptor_18.alignment() } },
                                                                                                        { tag: 'value',
                                                                                                          value: { value: _descriptor_18.toValue(5n),
                                                                                                                   alignment: _descriptor_18.alignment() } }] } },
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
    __compactRuntime.assert(!this._equal_26(issuerAuthorizationCommitment_0,
                                            new Uint8Array(32)),
                            'gift card issuer authorization is required');
    __compactRuntime.assert(this._equal_27(coin_0.value, amount_0),
                            'wrong gift card amount');
    __compactRuntime.assert(this._equal_28(coin_0.color, tokenId_0),
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
                                                         value: { value: _descriptor_18.toValue(1n),
                                                                  alignment: _descriptor_18.alignment() } },
                                                       { tag: 'value',
                                                         value: { value: _descriptor_18.toValue(5n),
                                                                  alignment: _descriptor_18.alignment() } }] } },
                                       { push: { storage: false,
                                                 value: __compactRuntime.StateValue.newCell({ value: _descriptor_0.toValue(giftCardId_0),
                                                                                              alignment: _descriptor_0.alignment() }).encode() } },
                                       { push: { storage: true,
                                                 value: __compactRuntime.StateValue.newNull().encode() } },
                                       { ins: { cached: false, n: 1 } },
                                       { ins: { cached: true, n: 2 } }]);
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
                                                         value: { value: _descriptor_18.toValue(1n),
                                                                  alignment: _descriptor_18.alignment() } },
                                                       { tag: 'value',
                                                         value: { value: _descriptor_18.toValue(6n),
                                                                  alignment: _descriptor_18.alignment() } }] } },
                                       { push: { storage: false,
                                                 value: __compactRuntime.StateValue.newCell({ value: _descriptor_0.toValue(giftCardId_0),
                                                                                              alignment: _descriptor_0.alignment() }).encode() } },
                                       { push: { storage: true,
                                                 value: __compactRuntime.StateValue.newCell({ value: _descriptor_12.toValue(tmp_0),
                                                                                              alignment: _descriptor_12.alignment() }).encode() } },
                                       { ins: { cached: false, n: 1 } },
                                       { ins: { cached: true, n: 2 } }]);
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
                                                                                                         value: { value: _descriptor_18.toValue(1n),
                                                                                                                  alignment: _descriptor_18.alignment() } },
                                                                                                       { tag: 'value',
                                                                                                         value: { value: _descriptor_18.toValue(5n),
                                                                                                                  alignment: _descriptor_18.alignment() } }] } },
                                                                                       { push: { storage: false,
                                                                                                 value: __compactRuntime.StateValue.newCell({ value: _descriptor_0.toValue(giftCardId_0),
                                                                                                                                              alignment: _descriptor_0.alignment() }).encode() } },
                                                                                       'member',
                                                                                       { popeq: { cached: true,
                                                                                                  result: undefined } }]).value),
                            'gift card does not exist');
    const giftCard_0 = _descriptor_12.fromValue(__compactRuntime.queryLedgerState(context,
                                                                                  partialProofData,
                                                                                  [
                                                                                   { dup: { n: 0 } },
                                                                                   { idx: { cached: false,
                                                                                            pushPath: false,
                                                                                            path: [
                                                                                                   { tag: 'value',
                                                                                                     value: { value: _descriptor_18.toValue(1n),
                                                                                                              alignment: _descriptor_18.alignment() } },
                                                                                                   { tag: 'value',
                                                                                                     value: { value: _descriptor_18.toValue(6n),
                                                                                                              alignment: _descriptor_18.alignment() } }] } },
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
    __compactRuntime.assert(this._equal_29(this._deriveGiftCardCommitment_0(giftCardId_0,
                                                                            amount_0,
                                                                            tokenId_0,
                                                                            giftSecret_0,
                                                                            giftRandomness_0,
                                                                            giftCard_0.expiry),
                                           giftCard_0.commitment),
                            'invalid gift card opening');
    __compactRuntime.assert(amount_0 > 0n, 'gift card amount must be positive');
    __compactRuntime.assert(this._equal_30(escrowCoin_0.value, amount_0),
                            'wrong gift card escrow amount');
    __compactRuntime.assert(this._equal_31(escrowCoin_0.color, tokenId_0),
                            'wrong gift card escrow token');
    __compactRuntime.assert(this._equal_32(this._deriveEscrowCoinCommitment_0(escrowCoin_0.nonce,
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
                                                                                                          value: { value: _descriptor_18.toValue(1n),
                                                                                                                   alignment: _descriptor_18.alignment() } },
                                                                                                        { tag: 'value',
                                                                                                          value: { value: _descriptor_18.toValue(7n),
                                                                                                                   alignment: _descriptor_18.alignment() } }] } },
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
                                                         value: { value: _descriptor_18.toValue(1n),
                                                                  alignment: _descriptor_18.alignment() } },
                                                       { tag: 'value',
                                                         value: { value: _descriptor_18.toValue(7n),
                                                                  alignment: _descriptor_18.alignment() } }] } },
                                       { push: { storage: false,
                                                 value: __compactRuntime.StateValue.newCell({ value: _descriptor_0.toValue(nullifier_0),
                                                                                              alignment: _descriptor_0.alignment() }).encode() } },
                                       { push: { storage: true,
                                                 value: __compactRuntime.StateValue.newNull().encode() } },
                                       { ins: { cached: false, n: 1 } },
                                       { ins: { cached: true, n: 2 } }]);
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
                                                         value: { value: _descriptor_18.toValue(1n),
                                                                  alignment: _descriptor_18.alignment() } },
                                                       { tag: 'value',
                                                         value: { value: _descriptor_18.toValue(6n),
                                                                  alignment: _descriptor_18.alignment() } }] } },
                                       { push: { storage: false,
                                                 value: __compactRuntime.StateValue.newCell({ value: _descriptor_0.toValue(giftCardId_0),
                                                                                              alignment: _descriptor_0.alignment() }).encode() } },
                                       { push: { storage: true,
                                                 value: __compactRuntime.StateValue.newCell({ value: _descriptor_12.toValue(tmp_0),
                                                                                              alignment: _descriptor_12.alignment() }).encode() } },
                                       { ins: { cached: false, n: 1 } },
                                       { ins: { cached: true, n: 2 } }]);
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
                                                                                                         value: { value: _descriptor_18.toValue(1n),
                                                                                                                  alignment: _descriptor_18.alignment() } },
                                                                                                       { tag: 'value',
                                                                                                         value: { value: _descriptor_18.toValue(5n),
                                                                                                                  alignment: _descriptor_18.alignment() } }] } },
                                                                                       { push: { storage: false,
                                                                                                 value: __compactRuntime.StateValue.newCell({ value: _descriptor_0.toValue(giftCardId_0),
                                                                                                                                              alignment: _descriptor_0.alignment() }).encode() } },
                                                                                       'member',
                                                                                       { popeq: { cached: true,
                                                                                                  result: undefined } }]).value),
                            'gift card does not exist');
    const giftCard_0 = _descriptor_12.fromValue(__compactRuntime.queryLedgerState(context,
                                                                                  partialProofData,
                                                                                  [
                                                                                   { dup: { n: 0 } },
                                                                                   { idx: { cached: false,
                                                                                            pushPath: false,
                                                                                            path: [
                                                                                                   { tag: 'value',
                                                                                                     value: { value: _descriptor_18.toValue(1n),
                                                                                                              alignment: _descriptor_18.alignment() } },
                                                                                                   { tag: 'value',
                                                                                                     value: { value: _descriptor_18.toValue(6n),
                                                                                                              alignment: _descriptor_18.alignment() } }] } },
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
    __compactRuntime.assert(this._equal_33(this._deriveGiftCardIssuerAuthorization_0(giftCardId_0,
                                                                                     issuerSecret_0),
                                           giftCard_0.issuerAuthorization),
                            'unauthorized gift card reclaim');
    __compactRuntime.assert(this._equal_34(this._deriveEscrowCoinCommitment_0(escrowCoin_0.nonce,
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
                                                                                                          value: { value: _descriptor_18.toValue(1n),
                                                                                                                   alignment: _descriptor_18.alignment() } },
                                                                                                        { tag: 'value',
                                                                                                          value: { value: _descriptor_18.toValue(7n),
                                                                                                                   alignment: _descriptor_18.alignment() } }] } },
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
                                                         value: { value: _descriptor_18.toValue(1n),
                                                                  alignment: _descriptor_18.alignment() } },
                                                       { tag: 'value',
                                                         value: { value: _descriptor_18.toValue(7n),
                                                                  alignment: _descriptor_18.alignment() } }] } },
                                       { push: { storage: false,
                                                 value: __compactRuntime.StateValue.newCell({ value: _descriptor_0.toValue(nullifier_0),
                                                                                              alignment: _descriptor_0.alignment() }).encode() } },
                                       { push: { storage: true,
                                                 value: __compactRuntime.StateValue.newNull().encode() } },
                                       { ins: { cached: false, n: 1 } },
                                       { ins: { cached: true, n: 2 } }]);
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
                                                         value: { value: _descriptor_18.toValue(1n),
                                                                  alignment: _descriptor_18.alignment() } },
                                                       { tag: 'value',
                                                         value: { value: _descriptor_18.toValue(6n),
                                                                  alignment: _descriptor_18.alignment() } }] } },
                                       { push: { storage: false,
                                                 value: __compactRuntime.StateValue.newCell({ value: _descriptor_0.toValue(giftCardId_0),
                                                                                              alignment: _descriptor_0.alignment() }).encode() } },
                                       { push: { storage: true,
                                                 value: __compactRuntime.StateValue.newCell({ value: _descriptor_12.toValue(tmp_0),
                                                                                              alignment: _descriptor_12.alignment() }).encode() } },
                                       { ins: { cached: false, n: 1 } },
                                       { ins: { cached: true, n: 2 } }]);
    return this._sendShielded_0(context,
                                partialProofData,
                                escrowCoin_0,
                                this._left_0(this._ownPublicKey_0(context,
                                                                  partialProofData)),
                                escrowCoin_0.value);
  }
  _rotateRegistryAdmin_0(context,
                         partialProofData,
                         currentAdminSecret_0,
                         newAdminAuthorizationCommitment_0)
  {
    __compactRuntime.assert(this._equal_35(this._deriveRegistryAdminAuthorization_0(currentAdminSecret_0),
                                           _descriptor_0.fromValue(__compactRuntime.queryLedgerState(context,
                                                                                                     partialProofData,
                                                                                                     [
                                                                                                      { dup: { n: 0 } },
                                                                                                      { idx: { cached: false,
                                                                                                               pushPath: false,
                                                                                                               path: [
                                                                                                                      { tag: 'value',
                                                                                                                        value: { value: _descriptor_18.toValue(1n),
                                                                                                                                 alignment: _descriptor_18.alignment() } },
                                                                                                                      { tag: 'value',
                                                                                                                        value: { value: _descriptor_18.toValue(14n),
                                                                                                                                 alignment: _descriptor_18.alignment() } }] } },
                                                                                                      { popeq: { cached: false,
                                                                                                                 result: undefined } }]).value)),
                            'unauthorized registry admin rotation');
    __compactRuntime.assert(!this._equal_36(newAdminAuthorizationCommitment_0,
                                            new Uint8Array(32)),
                            'new registry admin authorization is required');
    __compactRuntime.queryLedgerState(context,
                                      partialProofData,
                                      [
                                       { idx: { cached: false,
                                                pushPath: true,
                                                path: [
                                                       { tag: 'value',
                                                         value: { value: _descriptor_18.toValue(1n),
                                                                  alignment: _descriptor_18.alignment() } }] } },
                                       { push: { storage: false,
                                                 value: __compactRuntime.StateValue.newCell({ value: _descriptor_18.toValue(14n),
                                                                                              alignment: _descriptor_18.alignment() }).encode() } },
                                       { push: { storage: true,
                                                 value: __compactRuntime.StateValue.newCell({ value: _descriptor_0.toValue(newAdminAuthorizationCommitment_0),
                                                                                              alignment: _descriptor_0.alignment() }).encode() } },
                                       { ins: { cached: false, n: 1 } },
                                       { ins: { cached: true, n: 1 } }]);
    return [];
  }
  _registerQuoteProvider_0(context,
                           partialProofData,
                           providerId_0,
                           providerAuthorizationCommitment_0,
                           registryAdminSecret_0)
  {
    __compactRuntime.assert(this._equal_37(this._deriveRegistryAdminAuthorization_0(registryAdminSecret_0),
                                           _descriptor_0.fromValue(__compactRuntime.queryLedgerState(context,
                                                                                                     partialProofData,
                                                                                                     [
                                                                                                      { dup: { n: 0 } },
                                                                                                      { idx: { cached: false,
                                                                                                               pushPath: false,
                                                                                                               path: [
                                                                                                                      { tag: 'value',
                                                                                                                        value: { value: _descriptor_18.toValue(1n),
                                                                                                                                 alignment: _descriptor_18.alignment() } },
                                                                                                                      { tag: 'value',
                                                                                                                        value: { value: _descriptor_18.toValue(14n),
                                                                                                                                 alignment: _descriptor_18.alignment() } }] } },
                                                                                                      { popeq: { cached: false,
                                                                                                                 result: undefined } }]).value)),
                            'unauthorized quote provider registration');
    __compactRuntime.assert(!this._equal_38(providerId_0, new Uint8Array(32)),
                            'quote provider id is required');
    __compactRuntime.assert(!this._equal_39(providerAuthorizationCommitment_0,
                                            new Uint8Array(32)),
                            'quote provider authorization is required');
    __compactRuntime.assert(!_descriptor_1.fromValue(__compactRuntime.queryLedgerState(context,
                                                                                       partialProofData,
                                                                                       [
                                                                                        { dup: { n: 0 } },
                                                                                        { idx: { cached: false,
                                                                                                 pushPath: false,
                                                                                                 path: [
                                                                                                        { tag: 'value',
                                                                                                          value: { value: _descriptor_18.toValue(1n),
                                                                                                                   alignment: _descriptor_18.alignment() } },
                                                                                                        { tag: 'value',
                                                                                                          value: { value: _descriptor_18.toValue(10n),
                                                                                                                   alignment: _descriptor_18.alignment() } }] } },
                                                                                        { push: { storage: false,
                                                                                                  value: __compactRuntime.StateValue.newCell({ value: _descriptor_0.toValue(providerId_0),
                                                                                                                                               alignment: _descriptor_0.alignment() }).encode() } },
                                                                                        'member',
                                                                                        { popeq: { cached: true,
                                                                                                   result: undefined } }]).value),
                            'quote provider already exists');
    __compactRuntime.queryLedgerState(context,
                                      partialProofData,
                                      [
                                       { idx: { cached: false,
                                                pushPath: true,
                                                path: [
                                                       { tag: 'value',
                                                         value: { value: _descriptor_18.toValue(1n),
                                                                  alignment: _descriptor_18.alignment() } },
                                                       { tag: 'value',
                                                         value: { value: _descriptor_18.toValue(10n),
                                                                  alignment: _descriptor_18.alignment() } }] } },
                                       { push: { storage: false,
                                                 value: __compactRuntime.StateValue.newCell({ value: _descriptor_0.toValue(providerId_0),
                                                                                              alignment: _descriptor_0.alignment() }).encode() } },
                                       { push: { storage: true,
                                                 value: __compactRuntime.StateValue.newNull().encode() } },
                                       { ins: { cached: false, n: 1 } },
                                       { ins: { cached: true, n: 2 } }]);
    __compactRuntime.queryLedgerState(context,
                                      partialProofData,
                                      [
                                       { idx: { cached: false,
                                                pushPath: true,
                                                path: [
                                                       { tag: 'value',
                                                         value: { value: _descriptor_18.toValue(1n),
                                                                  alignment: _descriptor_18.alignment() } },
                                                       { tag: 'value',
                                                         value: { value: _descriptor_18.toValue(11n),
                                                                  alignment: _descriptor_18.alignment() } }] } },
                                       { push: { storage: false,
                                                 value: __compactRuntime.StateValue.newCell({ value: _descriptor_0.toValue(providerId_0),
                                                                                              alignment: _descriptor_0.alignment() }).encode() } },
                                       { push: { storage: true,
                                                 value: __compactRuntime.StateValue.newCell({ value: _descriptor_0.toValue(providerAuthorizationCommitment_0),
                                                                                              alignment: _descriptor_0.alignment() }).encode() } },
                                       { ins: { cached: false, n: 1 } },
                                       { ins: { cached: true, n: 2 } }]);
    return [];
  }
  _rotateQuoteProvider_0(context,
                         partialProofData,
                         providerId_0,
                         newProviderAuthorizationCommitment_0,
                         registryAdminSecret_0)
  {
    __compactRuntime.assert(this._equal_40(this._deriveRegistryAdminAuthorization_0(registryAdminSecret_0),
                                           _descriptor_0.fromValue(__compactRuntime.queryLedgerState(context,
                                                                                                     partialProofData,
                                                                                                     [
                                                                                                      { dup: { n: 0 } },
                                                                                                      { idx: { cached: false,
                                                                                                               pushPath: false,
                                                                                                               path: [
                                                                                                                      { tag: 'value',
                                                                                                                        value: { value: _descriptor_18.toValue(1n),
                                                                                                                                 alignment: _descriptor_18.alignment() } },
                                                                                                                      { tag: 'value',
                                                                                                                        value: { value: _descriptor_18.toValue(14n),
                                                                                                                                 alignment: _descriptor_18.alignment() } }] } },
                                                                                                      { popeq: { cached: false,
                                                                                                                 result: undefined } }]).value)),
                            'unauthorized quote provider rotation');
    __compactRuntime.assert(_descriptor_1.fromValue(__compactRuntime.queryLedgerState(context,
                                                                                      partialProofData,
                                                                                      [
                                                                                       { dup: { n: 0 } },
                                                                                       { idx: { cached: false,
                                                                                                pushPath: false,
                                                                                                path: [
                                                                                                       { tag: 'value',
                                                                                                         value: { value: _descriptor_18.toValue(1n),
                                                                                                                  alignment: _descriptor_18.alignment() } },
                                                                                                       { tag: 'value',
                                                                                                         value: { value: _descriptor_18.toValue(10n),
                                                                                                                  alignment: _descriptor_18.alignment() } }] } },
                                                                                       { push: { storage: false,
                                                                                                 value: __compactRuntime.StateValue.newCell({ value: _descriptor_0.toValue(providerId_0),
                                                                                                                                              alignment: _descriptor_0.alignment() }).encode() } },
                                                                                       'member',
                                                                                       { popeq: { cached: true,
                                                                                                  result: undefined } }]).value),
                            'quote provider does not exist');
    __compactRuntime.assert(!this._equal_41(newProviderAuthorizationCommitment_0,
                                            new Uint8Array(32)),
                            'new quote provider authorization is required');
    __compactRuntime.queryLedgerState(context,
                                      partialProofData,
                                      [
                                       { idx: { cached: false,
                                                pushPath: true,
                                                path: [
                                                       { tag: 'value',
                                                         value: { value: _descriptor_18.toValue(1n),
                                                                  alignment: _descriptor_18.alignment() } },
                                                       { tag: 'value',
                                                         value: { value: _descriptor_18.toValue(11n),
                                                                  alignment: _descriptor_18.alignment() } }] } },
                                       { push: { storage: false,
                                                 value: __compactRuntime.StateValue.newCell({ value: _descriptor_0.toValue(providerId_0),
                                                                                              alignment: _descriptor_0.alignment() }).encode() } },
                                       { push: { storage: true,
                                                 value: __compactRuntime.StateValue.newCell({ value: _descriptor_0.toValue(newProviderAuthorizationCommitment_0),
                                                                                              alignment: _descriptor_0.alignment() }).encode() } },
                                       { ins: { cached: false, n: 1 } },
                                       { ins: { cached: true, n: 2 } }]);
    return [];
  }
  _removeQuoteProvider_0(context,
                         partialProofData,
                         providerId_0,
                         registryAdminSecret_0)
  {
    __compactRuntime.assert(this._equal_42(this._deriveRegistryAdminAuthorization_0(registryAdminSecret_0),
                                           _descriptor_0.fromValue(__compactRuntime.queryLedgerState(context,
                                                                                                     partialProofData,
                                                                                                     [
                                                                                                      { dup: { n: 0 } },
                                                                                                      { idx: { cached: false,
                                                                                                               pushPath: false,
                                                                                                               path: [
                                                                                                                      { tag: 'value',
                                                                                                                        value: { value: _descriptor_18.toValue(1n),
                                                                                                                                 alignment: _descriptor_18.alignment() } },
                                                                                                                      { tag: 'value',
                                                                                                                        value: { value: _descriptor_18.toValue(14n),
                                                                                                                                 alignment: _descriptor_18.alignment() } }] } },
                                                                                                      { popeq: { cached: false,
                                                                                                                 result: undefined } }]).value)),
                            'unauthorized quote provider removal');
    __compactRuntime.assert(_descriptor_1.fromValue(__compactRuntime.queryLedgerState(context,
                                                                                      partialProofData,
                                                                                      [
                                                                                       { dup: { n: 0 } },
                                                                                       { idx: { cached: false,
                                                                                                pushPath: false,
                                                                                                path: [
                                                                                                       { tag: 'value',
                                                                                                         value: { value: _descriptor_18.toValue(1n),
                                                                                                                  alignment: _descriptor_18.alignment() } },
                                                                                                       { tag: 'value',
                                                                                                         value: { value: _descriptor_18.toValue(10n),
                                                                                                                  alignment: _descriptor_18.alignment() } }] } },
                                                                                       { push: { storage: false,
                                                                                                 value: __compactRuntime.StateValue.newCell({ value: _descriptor_0.toValue(providerId_0),
                                                                                                                                              alignment: _descriptor_0.alignment() }).encode() } },
                                                                                       'member',
                                                                                       { popeq: { cached: true,
                                                                                                  result: undefined } }]).value),
                            'quote provider does not exist');
    __compactRuntime.queryLedgerState(context,
                                      partialProofData,
                                      [
                                       { idx: { cached: false,
                                                pushPath: true,
                                                path: [
                                                       { tag: 'value',
                                                         value: { value: _descriptor_18.toValue(1n),
                                                                  alignment: _descriptor_18.alignment() } },
                                                       { tag: 'value',
                                                         value: { value: _descriptor_18.toValue(10n),
                                                                  alignment: _descriptor_18.alignment() } }] } },
                                       { push: { storage: false,
                                                 value: __compactRuntime.StateValue.newCell({ value: _descriptor_0.toValue(providerId_0),
                                                                                              alignment: _descriptor_0.alignment() }).encode() } },
                                       { rem: { cached: false } },
                                       { ins: { cached: true, n: 2 } }]);
    __compactRuntime.queryLedgerState(context,
                                      partialProofData,
                                      [
                                       { idx: { cached: false,
                                                pushPath: true,
                                                path: [
                                                       { tag: 'value',
                                                         value: { value: _descriptor_18.toValue(1n),
                                                                  alignment: _descriptor_18.alignment() } },
                                                       { tag: 'value',
                                                         value: { value: _descriptor_18.toValue(11n),
                                                                  alignment: _descriptor_18.alignment() } }] } },
                                       { push: { storage: false,
                                                 value: __compactRuntime.StateValue.newCell({ value: _descriptor_0.toValue(providerId_0),
                                                                                              alignment: _descriptor_0.alignment() }).encode() } },
                                       { rem: { cached: false } },
                                       { ins: { cached: true, n: 2 } }]);
    return [];
  }
  _registerQuote_0(context,
                   partialProofData,
                   quoteId_0,
                   providerId_0,
                   quoteCommitment_0,
                   expiry_0,
                   providerSecret_0)
  {
    __compactRuntime.assert(!this._equal_43(quoteId_0, new Uint8Array(32)),
                            'quote id is required');
    __compactRuntime.assert(!this._equal_44(quoteCommitment_0,
                                            new Uint8Array(32)),
                            'quote commitment is required');
    __compactRuntime.assert(!_descriptor_1.fromValue(__compactRuntime.queryLedgerState(context,
                                                                                       partialProofData,
                                                                                       [
                                                                                        { dup: { n: 0 } },
                                                                                        { idx: { cached: false,
                                                                                                 pushPath: false,
                                                                                                 path: [
                                                                                                        { tag: 'value',
                                                                                                          value: { value: _descriptor_18.toValue(1n),
                                                                                                                   alignment: _descriptor_18.alignment() } },
                                                                                                        { tag: 'value',
                                                                                                          value: { value: _descriptor_18.toValue(8n),
                                                                                                                   alignment: _descriptor_18.alignment() } }] } },
                                                                                        { push: { storage: false,
                                                                                                  value: __compactRuntime.StateValue.newCell({ value: _descriptor_0.toValue(quoteId_0),
                                                                                                                                               alignment: _descriptor_0.alignment() }).encode() } },
                                                                                        'member',
                                                                                        { popeq: { cached: true,
                                                                                                   result: undefined } }]).value),
                            'quote already exists');
    __compactRuntime.assert(_descriptor_1.fromValue(__compactRuntime.queryLedgerState(context,
                                                                                      partialProofData,
                                                                                      [
                                                                                       { dup: { n: 0 } },
                                                                                       { idx: { cached: false,
                                                                                                pushPath: false,
                                                                                                path: [
                                                                                                       { tag: 'value',
                                                                                                         value: { value: _descriptor_18.toValue(1n),
                                                                                                                  alignment: _descriptor_18.alignment() } },
                                                                                                       { tag: 'value',
                                                                                                         value: { value: _descriptor_18.toValue(10n),
                                                                                                                  alignment: _descriptor_18.alignment() } }] } },
                                                                                       { push: { storage: false,
                                                                                                 value: __compactRuntime.StateValue.newCell({ value: _descriptor_0.toValue(providerId_0),
                                                                                                                                              alignment: _descriptor_0.alignment() }).encode() } },
                                                                                       'member',
                                                                                       { popeq: { cached: true,
                                                                                                  result: undefined } }]).value),
                            'quote provider is disabled');
    __compactRuntime.assert(this._blockTimeLt_0(context,
                                                partialProofData,
                                                expiry_0),
                            'quote expiry must be in the future');
    __compactRuntime.assert(this._equal_45(this._deriveQuoteProviderAuthorization_0(providerId_0,
                                                                                    providerSecret_0),
                                           _descriptor_0.fromValue(__compactRuntime.queryLedgerState(context,
                                                                                                     partialProofData,
                                                                                                     [
                                                                                                      { dup: { n: 0 } },
                                                                                                      { idx: { cached: false,
                                                                                                               pushPath: false,
                                                                                                               path: [
                                                                                                                      { tag: 'value',
                                                                                                                        value: { value: _descriptor_18.toValue(1n),
                                                                                                                                 alignment: _descriptor_18.alignment() } },
                                                                                                                      { tag: 'value',
                                                                                                                        value: { value: _descriptor_18.toValue(11n),
                                                                                                                                 alignment: _descriptor_18.alignment() } }] } },
                                                                                                      { idx: { cached: false,
                                                                                                               pushPath: false,
                                                                                                               path: [
                                                                                                                      { tag: 'value',
                                                                                                                        value: { value: _descriptor_0.toValue(providerId_0),
                                                                                                                                 alignment: _descriptor_0.alignment() } }] } },
                                                                                                      { popeq: { cached: false,
                                                                                                                 result: undefined } }]).value)),
                            'unauthorized quote');
    __compactRuntime.queryLedgerState(context,
                                      partialProofData,
                                      [
                                       { idx: { cached: false,
                                                pushPath: true,
                                                path: [
                                                       { tag: 'value',
                                                         value: { value: _descriptor_18.toValue(1n),
                                                                  alignment: _descriptor_18.alignment() } },
                                                       { tag: 'value',
                                                         value: { value: _descriptor_18.toValue(8n),
                                                                  alignment: _descriptor_18.alignment() } }] } },
                                       { push: { storage: false,
                                                 value: __compactRuntime.StateValue.newCell({ value: _descriptor_0.toValue(quoteId_0),
                                                                                              alignment: _descriptor_0.alignment() }).encode() } },
                                       { push: { storage: true,
                                                 value: __compactRuntime.StateValue.newNull().encode() } },
                                       { ins: { cached: false, n: 1 } },
                                       { ins: { cached: true, n: 2 } }]);
    const tmp_0 = { commitmentVersion: 1n,
                    commitment: quoteCommitment_0,
                    providerId: providerId_0,
                    expiry: expiry_0,
                    consumed: false };
    __compactRuntime.queryLedgerState(context,
                                      partialProofData,
                                      [
                                       { idx: { cached: false,
                                                pushPath: true,
                                                path: [
                                                       { tag: 'value',
                                                         value: { value: _descriptor_18.toValue(1n),
                                                                  alignment: _descriptor_18.alignment() } },
                                                       { tag: 'value',
                                                         value: { value: _descriptor_18.toValue(9n),
                                                                  alignment: _descriptor_18.alignment() } }] } },
                                       { push: { storage: false,
                                                 value: __compactRuntime.StateValue.newCell({ value: _descriptor_0.toValue(quoteId_0),
                                                                                              alignment: _descriptor_0.alignment() }).encode() } },
                                       { push: { storage: true,
                                                 value: __compactRuntime.StateValue.newCell({ value: _descriptor_9.toValue(tmp_0),
                                                                                              alignment: _descriptor_9.alignment() }).encode() } },
                                       { ins: { cached: false, n: 1 } },
                                       { ins: { cached: true, n: 2 } }]);
    return [];
  }
  _payInvoiceWithQuote_0(context,
                         partialProofData,
                         invoiceId_0,
                         merchantPrivateIdentity_0,
                         requestedAmount_0,
                         requestedToken_0,
                         invoiceNonce_0,
                         invoiceRandomness_0,
                         quoteId_0,
                         providerId_0,
                         paymentToken_0,
                         acceptedPaymentAmount_0,
                         quoteRandomness_0,
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
                                                                                                         value: { value: _descriptor_18.toValue(0n),
                                                                                                                  alignment: _descriptor_18.alignment() } },
                                                                                                       { tag: 'value',
                                                                                                         value: { value: _descriptor_18.toValue(0n),
                                                                                                                  alignment: _descriptor_18.alignment() } }] } },
                                                                                       { push: { storage: false,
                                                                                                 value: __compactRuntime.StateValue.newCell({ value: _descriptor_0.toValue(invoiceId_0),
                                                                                                                                              alignment: _descriptor_0.alignment() }).encode() } },
                                                                                       'member',
                                                                                       { popeq: { cached: true,
                                                                                                  result: undefined } }]).value),
                            'invoice does not exist');
    __compactRuntime.assert(_descriptor_1.fromValue(__compactRuntime.queryLedgerState(context,
                                                                                      partialProofData,
                                                                                      [
                                                                                       { dup: { n: 0 } },
                                                                                       { idx: { cached: false,
                                                                                                pushPath: false,
                                                                                                path: [
                                                                                                       { tag: 'value',
                                                                                                         value: { value: _descriptor_18.toValue(1n),
                                                                                                                  alignment: _descriptor_18.alignment() } },
                                                                                                       { tag: 'value',
                                                                                                         value: { value: _descriptor_18.toValue(8n),
                                                                                                                  alignment: _descriptor_18.alignment() } }] } },
                                                                                       { push: { storage: false,
                                                                                                 value: __compactRuntime.StateValue.newCell({ value: _descriptor_0.toValue(quoteId_0),
                                                                                                                                              alignment: _descriptor_0.alignment() }).encode() } },
                                                                                       'member',
                                                                                       { popeq: { cached: true,
                                                                                                  result: undefined } }]).value),
                            'quote does not exist');
    const invoice_0 = _descriptor_8.fromValue(__compactRuntime.queryLedgerState(context,
                                                                                partialProofData,
                                                                                [
                                                                                 { dup: { n: 0 } },
                                                                                 { idx: { cached: false,
                                                                                          pushPath: false,
                                                                                          path: [
                                                                                                 { tag: 'value',
                                                                                                   value: { value: _descriptor_18.toValue(0n),
                                                                                                            alignment: _descriptor_18.alignment() } },
                                                                                                 { tag: 'value',
                                                                                                   value: { value: _descriptor_18.toValue(1n),
                                                                                                            alignment: _descriptor_18.alignment() } }] } },
                                                                                 { idx: { cached: false,
                                                                                          pushPath: false,
                                                                                          path: [
                                                                                                 { tag: 'value',
                                                                                                   value: { value: _descriptor_0.toValue(invoiceId_0),
                                                                                                            alignment: _descriptor_0.alignment() } }] } },
                                                                                 { popeq: { cached: false,
                                                                                            result: undefined } }]).value);
    const quote_0 = _descriptor_9.fromValue(__compactRuntime.queryLedgerState(context,
                                                                              partialProofData,
                                                                              [
                                                                               { dup: { n: 0 } },
                                                                               { idx: { cached: false,
                                                                                        pushPath: false,
                                                                                        path: [
                                                                                               { tag: 'value',
                                                                                                 value: { value: _descriptor_18.toValue(1n),
                                                                                                          alignment: _descriptor_18.alignment() } },
                                                                                               { tag: 'value',
                                                                                                 value: { value: _descriptor_18.toValue(9n),
                                                                                                          alignment: _descriptor_18.alignment() } }] } },
                                                                               { idx: { cached: false,
                                                                                        pushPath: false,
                                                                                        path: [
                                                                                               { tag: 'value',
                                                                                                 value: { value: _descriptor_0.toValue(quoteId_0),
                                                                                                          alignment: _descriptor_0.alignment() } }] } },
                                                                               { popeq: { cached: false,
                                                                                          result: undefined } }]).value);
    __compactRuntime.assert(invoice_0.status === 0, 'invoice is not open');
    __compactRuntime.assert(this._blockTimeLt_0(context,
                                                partialProofData,
                                                invoice_0.expiry),
                            'invoice has expired');
    __compactRuntime.assert(!quote_0.consumed, 'quote already consumed');
    __compactRuntime.assert(this._blockTimeLt_0(context,
                                                partialProofData,
                                                quote_0.expiry),
                            'quote has expired');
    __compactRuntime.assert(this._equal_46(quote_0.providerId, providerId_0),
                            'wrong quote provider');
    __compactRuntime.assert(_descriptor_1.fromValue(__compactRuntime.queryLedgerState(context,
                                                                                      partialProofData,
                                                                                      [
                                                                                       { dup: { n: 0 } },
                                                                                       { idx: { cached: false,
                                                                                                pushPath: false,
                                                                                                path: [
                                                                                                       { tag: 'value',
                                                                                                         value: { value: _descriptor_18.toValue(1n),
                                                                                                                  alignment: _descriptor_18.alignment() } },
                                                                                                       { tag: 'value',
                                                                                                         value: { value: _descriptor_18.toValue(10n),
                                                                                                                  alignment: _descriptor_18.alignment() } }] } },
                                                                                       { push: { storage: false,
                                                                                                 value: __compactRuntime.StateValue.newCell({ value: _descriptor_0.toValue(providerId_0),
                                                                                                                                              alignment: _descriptor_0.alignment() }).encode() } },
                                                                                       'member',
                                                                                       { popeq: { cached: true,
                                                                                                  result: undefined } }]).value),
                            'quote provider is disabled');
    __compactRuntime.assert(requestedAmount_0 > 0n,
                            'requested amount must be positive');
    __compactRuntime.assert(acceptedPaymentAmount_0 > 0n,
                            'accepted payment amount must be positive');
    __compactRuntime.assert(!this._equal_47(paymentToken_0, requestedToken_0),
                            'conversion requires a different token');
    __compactRuntime.assert(this._equal_48(this._deriveInvoiceCommitment_0(invoiceId_0,
                                                                           merchantPrivateIdentity_0,
                                                                           requestedAmount_0,
                                                                           requestedToken_0,
                                                                           invoiceNonce_0,
                                                                           invoiceRandomness_0,
                                                                           invoice_0.expiry),
                                           invoice_0.commitment),
                            'invalid invoice opening');
    __compactRuntime.assert(this._equal_49(this._deriveQuoteCommitment_0(quoteId_0,
                                                                         providerId_0,
                                                                         invoiceId_0,
                                                                         requestedToken_0,
                                                                         requestedAmount_0,
                                                                         paymentToken_0,
                                                                         acceptedPaymentAmount_0,
                                                                         quote_0.expiry,
                                                                         quoteRandomness_0),
                                           quote_0.commitment),
                            'invalid quote opening');
    __compactRuntime.assert(this._equal_50(coin_0.color, paymentToken_0),
                            'wrong quoted payment token');
    __compactRuntime.assert(this._equal_51(coin_0.value, acceptedPaymentAmount_0),
                            'wrong quoted payment amount');
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
                                                                                                          value: { value: _descriptor_18.toValue(0n),
                                                                                                                   alignment: _descriptor_18.alignment() } },
                                                                                                        { tag: 'value',
                                                                                                          value: { value: _descriptor_18.toValue(2n),
                                                                                                                   alignment: _descriptor_18.alignment() } }] } },
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
                                                         value: { value: _descriptor_18.toValue(0n),
                                                                  alignment: _descriptor_18.alignment() } },
                                                       { tag: 'value',
                                                         value: { value: _descriptor_18.toValue(2n),
                                                                  alignment: _descriptor_18.alignment() } }] } },
                                       { push: { storage: false,
                                                 value: __compactRuntime.StateValue.newCell({ value: _descriptor_0.toValue(nullifier_0),
                                                                                              alignment: _descriptor_0.alignment() }).encode() } },
                                       { push: { storage: true,
                                                 value: __compactRuntime.StateValue.newNull().encode() } },
                                       { ins: { cached: false, n: 1 } },
                                       { ins: { cached: true, n: 2 } }]);
    const tmp_0 = { commitmentVersion: invoice_0.commitmentVersion,
                    commitment: invoice_0.commitment,
                    merchantAuthorization: invoice_0.merchantAuthorization,
                    expiry: invoice_0.expiry,
                    status: 1,
                    settlementNullifier: nullifier_0,
                    escrowCoinCommitment:
                      this._deriveEscrowCoinCommitment_0(coin_0.nonce,
                                                         coin_0.color,
                                                         coin_0.value),
                    receiptCommitment:
                      this._deriveReceiptCommitment_0(invoiceId_0,
                                                      nullifier_0,
                                                      acceptedPaymentAmount_0,
                                                      paymentToken_0,
                                                      receiptSecret_0),
                    claimed: false };
    __compactRuntime.queryLedgerState(context,
                                      partialProofData,
                                      [
                                       { idx: { cached: false,
                                                pushPath: true,
                                                path: [
                                                       { tag: 'value',
                                                         value: { value: _descriptor_18.toValue(0n),
                                                                  alignment: _descriptor_18.alignment() } },
                                                       { tag: 'value',
                                                         value: { value: _descriptor_18.toValue(1n),
                                                                  alignment: _descriptor_18.alignment() } }] } },
                                       { push: { storage: false,
                                                 value: __compactRuntime.StateValue.newCell({ value: _descriptor_0.toValue(invoiceId_0),
                                                                                              alignment: _descriptor_0.alignment() }).encode() } },
                                       { push: { storage: true,
                                                 value: __compactRuntime.StateValue.newCell({ value: _descriptor_8.toValue(tmp_0),
                                                                                              alignment: _descriptor_8.alignment() }).encode() } },
                                       { ins: { cached: false, n: 1 } },
                                       { ins: { cached: true, n: 2 } }]);
    const tmp_1 = { commitmentVersion: quote_0.commitmentVersion,
                    commitment: quote_0.commitment,
                    providerId: quote_0.providerId,
                    expiry: quote_0.expiry,
                    consumed: true };
    __compactRuntime.queryLedgerState(context,
                                      partialProofData,
                                      [
                                       { idx: { cached: false,
                                                pushPath: true,
                                                path: [
                                                       { tag: 'value',
                                                         value: { value: _descriptor_18.toValue(1n),
                                                                  alignment: _descriptor_18.alignment() } },
                                                       { tag: 'value',
                                                         value: { value: _descriptor_18.toValue(9n),
                                                                  alignment: _descriptor_18.alignment() } }] } },
                                       { push: { storage: false,
                                                 value: __compactRuntime.StateValue.newCell({ value: _descriptor_0.toValue(quoteId_0),
                                                                                              alignment: _descriptor_0.alignment() }).encode() } },
                                       { push: { storage: true,
                                                 value: __compactRuntime.StateValue.newCell({ value: _descriptor_9.toValue(tmp_1),
                                                                                              alignment: _descriptor_9.alignment() }).encode() } },
                                       { ins: { cached: false, n: 1 } },
                                       { ins: { cached: true, n: 2 } }]);
    return [];
  }
  _registerBackupAnchor_0(context,
                          partialProofData,
                          ownerId_0,
                          backupAuthorizationCommitment_0,
                          encryptedBlobDigest_0)
  {
    __compactRuntime.assert(!this._equal_52(ownerId_0, new Uint8Array(32)),
                            'backup owner id is required');
    __compactRuntime.assert(!this._equal_53(backupAuthorizationCommitment_0,
                                            new Uint8Array(32)),
                            'backup authorization is required');
    __compactRuntime.assert(!this._equal_54(encryptedBlobDigest_0,
                                            new Uint8Array(32)),
                            'encrypted backup digest is required');
    __compactRuntime.assert(!_descriptor_1.fromValue(__compactRuntime.queryLedgerState(context,
                                                                                       partialProofData,
                                                                                       [
                                                                                        { dup: { n: 0 } },
                                                                                        { idx: { cached: false,
                                                                                                 pushPath: false,
                                                                                                 path: [
                                                                                                        { tag: 'value',
                                                                                                          value: { value: _descriptor_18.toValue(1n),
                                                                                                                   alignment: _descriptor_18.alignment() } },
                                                                                                        { tag: 'value',
                                                                                                          value: { value: _descriptor_18.toValue(12n),
                                                                                                                   alignment: _descriptor_18.alignment() } }] } },
                                                                                        { push: { storage: false,
                                                                                                  value: __compactRuntime.StateValue.newCell({ value: _descriptor_0.toValue(ownerId_0),
                                                                                                                                               alignment: _descriptor_0.alignment() }).encode() } },
                                                                                        'member',
                                                                                        { popeq: { cached: true,
                                                                                                   result: undefined } }]).value),
                            'backup anchor already exists');
    __compactRuntime.queryLedgerState(context,
                                      partialProofData,
                                      [
                                       { idx: { cached: false,
                                                pushPath: true,
                                                path: [
                                                       { tag: 'value',
                                                         value: { value: _descriptor_18.toValue(1n),
                                                                  alignment: _descriptor_18.alignment() } },
                                                       { tag: 'value',
                                                         value: { value: _descriptor_18.toValue(12n),
                                                                  alignment: _descriptor_18.alignment() } }] } },
                                       { push: { storage: false,
                                                 value: __compactRuntime.StateValue.newCell({ value: _descriptor_0.toValue(ownerId_0),
                                                                                              alignment: _descriptor_0.alignment() }).encode() } },
                                       { push: { storage: true,
                                                 value: __compactRuntime.StateValue.newNull().encode() } },
                                       { ins: { cached: false, n: 1 } },
                                       { ins: { cached: true, n: 2 } }]);
    const tmp_0 = { formatVersion: 1n,
                    authorization: backupAuthorizationCommitment_0,
                    encryptedBlobDigest: encryptedBlobDigest_0 };
    __compactRuntime.queryLedgerState(context,
                                      partialProofData,
                                      [
                                       { idx: { cached: false,
                                                pushPath: true,
                                                path: [
                                                       { tag: 'value',
                                                         value: { value: _descriptor_18.toValue(1n),
                                                                  alignment: _descriptor_18.alignment() } },
                                                       { tag: 'value',
                                                         value: { value: _descriptor_18.toValue(13n),
                                                                  alignment: _descriptor_18.alignment() } }] } },
                                       { push: { storage: false,
                                                 value: __compactRuntime.StateValue.newCell({ value: _descriptor_0.toValue(ownerId_0),
                                                                                              alignment: _descriptor_0.alignment() }).encode() } },
                                       { push: { storage: true,
                                                 value: __compactRuntime.StateValue.newCell({ value: _descriptor_5.toValue(tmp_0),
                                                                                              alignment: _descriptor_5.alignment() }).encode() } },
                                       { ins: { cached: false, n: 1 } },
                                       { ins: { cached: true, n: 2 } }]);
    return [];
  }
  _updateBackupAnchor_0(context,
                        partialProofData,
                        ownerId_0,
                        backupSecret_0,
                        encryptedBlobDigest_0)
  {
    __compactRuntime.assert(_descriptor_1.fromValue(__compactRuntime.queryLedgerState(context,
                                                                                      partialProofData,
                                                                                      [
                                                                                       { dup: { n: 0 } },
                                                                                       { idx: { cached: false,
                                                                                                pushPath: false,
                                                                                                path: [
                                                                                                       { tag: 'value',
                                                                                                         value: { value: _descriptor_18.toValue(1n),
                                                                                                                  alignment: _descriptor_18.alignment() } },
                                                                                                       { tag: 'value',
                                                                                                         value: { value: _descriptor_18.toValue(12n),
                                                                                                                  alignment: _descriptor_18.alignment() } }] } },
                                                                                       { push: { storage: false,
                                                                                                 value: __compactRuntime.StateValue.newCell({ value: _descriptor_0.toValue(ownerId_0),
                                                                                                                                              alignment: _descriptor_0.alignment() }).encode() } },
                                                                                       'member',
                                                                                       { popeq: { cached: true,
                                                                                                  result: undefined } }]).value),
                            'backup anchor does not exist');
    const anchor_0 = _descriptor_5.fromValue(__compactRuntime.queryLedgerState(context,
                                                                               partialProofData,
                                                                               [
                                                                                { dup: { n: 0 } },
                                                                                { idx: { cached: false,
                                                                                         pushPath: false,
                                                                                         path: [
                                                                                                { tag: 'value',
                                                                                                  value: { value: _descriptor_18.toValue(1n),
                                                                                                           alignment: _descriptor_18.alignment() } },
                                                                                                { tag: 'value',
                                                                                                  value: { value: _descriptor_18.toValue(13n),
                                                                                                           alignment: _descriptor_18.alignment() } }] } },
                                                                                { idx: { cached: false,
                                                                                         pushPath: false,
                                                                                         path: [
                                                                                                { tag: 'value',
                                                                                                  value: { value: _descriptor_0.toValue(ownerId_0),
                                                                                                           alignment: _descriptor_0.alignment() } }] } },
                                                                                { popeq: { cached: false,
                                                                                           result: undefined } }]).value);
    __compactRuntime.assert(this._equal_55(this._deriveBackupAuthorization_0(ownerId_0,
                                                                             backupSecret_0),
                                           anchor_0.authorization),
                            'unauthorized backup update');
    __compactRuntime.assert(!this._equal_56(encryptedBlobDigest_0,
                                            new Uint8Array(32)),
                            'encrypted backup digest is required');
    const tmp_0 = { formatVersion: anchor_0.formatVersion,
                    authorization: anchor_0.authorization,
                    encryptedBlobDigest: encryptedBlobDigest_0 };
    __compactRuntime.queryLedgerState(context,
                                      partialProofData,
                                      [
                                       { idx: { cached: false,
                                                pushPath: true,
                                                path: [
                                                       { tag: 'value',
                                                         value: { value: _descriptor_18.toValue(1n),
                                                                  alignment: _descriptor_18.alignment() } },
                                                       { tag: 'value',
                                                         value: { value: _descriptor_18.toValue(13n),
                                                                  alignment: _descriptor_18.alignment() } }] } },
                                       { push: { storage: false,
                                                 value: __compactRuntime.StateValue.newCell({ value: _descriptor_0.toValue(ownerId_0),
                                                                                              alignment: _descriptor_0.alignment() }).encode() } },
                                       { push: { storage: true,
                                                 value: __compactRuntime.StateValue.newCell({ value: _descriptor_5.toValue(tmp_0),
                                                                                              alignment: _descriptor_5.alignment() }).encode() } },
                                       { ins: { cached: false, n: 1 } },
                                       { ins: { cached: true, n: 2 } }]);
    return [];
  }
  _rotateBackupAuthorization_0(context,
                               partialProofData,
                               ownerId_0,
                               currentBackupSecret_0,
                               newBackupAuthorizationCommitment_0)
  {
    __compactRuntime.assert(_descriptor_1.fromValue(__compactRuntime.queryLedgerState(context,
                                                                                      partialProofData,
                                                                                      [
                                                                                       { dup: { n: 0 } },
                                                                                       { idx: { cached: false,
                                                                                                pushPath: false,
                                                                                                path: [
                                                                                                       { tag: 'value',
                                                                                                         value: { value: _descriptor_18.toValue(1n),
                                                                                                                  alignment: _descriptor_18.alignment() } },
                                                                                                       { tag: 'value',
                                                                                                         value: { value: _descriptor_18.toValue(12n),
                                                                                                                  alignment: _descriptor_18.alignment() } }] } },
                                                                                       { push: { storage: false,
                                                                                                 value: __compactRuntime.StateValue.newCell({ value: _descriptor_0.toValue(ownerId_0),
                                                                                                                                              alignment: _descriptor_0.alignment() }).encode() } },
                                                                                       'member',
                                                                                       { popeq: { cached: true,
                                                                                                  result: undefined } }]).value),
                            'backup anchor does not exist');
    const anchor_0 = _descriptor_5.fromValue(__compactRuntime.queryLedgerState(context,
                                                                               partialProofData,
                                                                               [
                                                                                { dup: { n: 0 } },
                                                                                { idx: { cached: false,
                                                                                         pushPath: false,
                                                                                         path: [
                                                                                                { tag: 'value',
                                                                                                  value: { value: _descriptor_18.toValue(1n),
                                                                                                           alignment: _descriptor_18.alignment() } },
                                                                                                { tag: 'value',
                                                                                                  value: { value: _descriptor_18.toValue(13n),
                                                                                                           alignment: _descriptor_18.alignment() } }] } },
                                                                                { idx: { cached: false,
                                                                                         pushPath: false,
                                                                                         path: [
                                                                                                { tag: 'value',
                                                                                                  value: { value: _descriptor_0.toValue(ownerId_0),
                                                                                                           alignment: _descriptor_0.alignment() } }] } },
                                                                                { popeq: { cached: false,
                                                                                           result: undefined } }]).value);
    __compactRuntime.assert(this._equal_57(this._deriveBackupAuthorization_0(ownerId_0,
                                                                             currentBackupSecret_0),
                                           anchor_0.authorization),
                            'unauthorized backup rotation');
    __compactRuntime.assert(!this._equal_58(newBackupAuthorizationCommitment_0,
                                            new Uint8Array(32)),
                            'new backup authorization is required');
    const tmp_0 = { formatVersion: anchor_0.formatVersion,
                    authorization: newBackupAuthorizationCommitment_0,
                    encryptedBlobDigest: anchor_0.encryptedBlobDigest };
    __compactRuntime.queryLedgerState(context,
                                      partialProofData,
                                      [
                                       { idx: { cached: false,
                                                pushPath: true,
                                                path: [
                                                       { tag: 'value',
                                                         value: { value: _descriptor_18.toValue(1n),
                                                                  alignment: _descriptor_18.alignment() } },
                                                       { tag: 'value',
                                                         value: { value: _descriptor_18.toValue(13n),
                                                                  alignment: _descriptor_18.alignment() } }] } },
                                       { push: { storage: false,
                                                 value: __compactRuntime.StateValue.newCell({ value: _descriptor_0.toValue(ownerId_0),
                                                                                              alignment: _descriptor_0.alignment() }).encode() } },
                                       { push: { storage: true,
                                                 value: __compactRuntime.StateValue.newCell({ value: _descriptor_5.toValue(tmp_0),
                                                                                              alignment: _descriptor_5.alignment() }).encode() } },
                                       { ins: { cached: false, n: 1 } },
                                       { ins: { cached: true, n: 2 } }]);
    return [];
  }
  _deleteBackupAnchor_0(context, partialProofData, ownerId_0, backupSecret_0) {
    __compactRuntime.assert(_descriptor_1.fromValue(__compactRuntime.queryLedgerState(context,
                                                                                      partialProofData,
                                                                                      [
                                                                                       { dup: { n: 0 } },
                                                                                       { idx: { cached: false,
                                                                                                pushPath: false,
                                                                                                path: [
                                                                                                       { tag: 'value',
                                                                                                         value: { value: _descriptor_18.toValue(1n),
                                                                                                                  alignment: _descriptor_18.alignment() } },
                                                                                                       { tag: 'value',
                                                                                                         value: { value: _descriptor_18.toValue(12n),
                                                                                                                  alignment: _descriptor_18.alignment() } }] } },
                                                                                       { push: { storage: false,
                                                                                                 value: __compactRuntime.StateValue.newCell({ value: _descriptor_0.toValue(ownerId_0),
                                                                                                                                              alignment: _descriptor_0.alignment() }).encode() } },
                                                                                       'member',
                                                                                       { popeq: { cached: true,
                                                                                                  result: undefined } }]).value),
                            'backup anchor does not exist');
    const anchor_0 = _descriptor_5.fromValue(__compactRuntime.queryLedgerState(context,
                                                                               partialProofData,
                                                                               [
                                                                                { dup: { n: 0 } },
                                                                                { idx: { cached: false,
                                                                                         pushPath: false,
                                                                                         path: [
                                                                                                { tag: 'value',
                                                                                                  value: { value: _descriptor_18.toValue(1n),
                                                                                                           alignment: _descriptor_18.alignment() } },
                                                                                                { tag: 'value',
                                                                                                  value: { value: _descriptor_18.toValue(13n),
                                                                                                           alignment: _descriptor_18.alignment() } }] } },
                                                                                { idx: { cached: false,
                                                                                         pushPath: false,
                                                                                         path: [
                                                                                                { tag: 'value',
                                                                                                  value: { value: _descriptor_0.toValue(ownerId_0),
                                                                                                           alignment: _descriptor_0.alignment() } }] } },
                                                                                { popeq: { cached: false,
                                                                                           result: undefined } }]).value);
    __compactRuntime.assert(this._equal_59(this._deriveBackupAuthorization_0(ownerId_0,
                                                                             backupSecret_0),
                                           anchor_0.authorization),
                            'unauthorized backup deletion');
    __compactRuntime.queryLedgerState(context,
                                      partialProofData,
                                      [
                                       { idx: { cached: false,
                                                pushPath: true,
                                                path: [
                                                       { tag: 'value',
                                                         value: { value: _descriptor_18.toValue(1n),
                                                                  alignment: _descriptor_18.alignment() } },
                                                       { tag: 'value',
                                                         value: { value: _descriptor_18.toValue(12n),
                                                                  alignment: _descriptor_18.alignment() } }] } },
                                       { push: { storage: false,
                                                 value: __compactRuntime.StateValue.newCell({ value: _descriptor_0.toValue(ownerId_0),
                                                                                              alignment: _descriptor_0.alignment() }).encode() } },
                                       { rem: { cached: false } },
                                       { ins: { cached: true, n: 2 } }]);
    __compactRuntime.queryLedgerState(context,
                                      partialProofData,
                                      [
                                       { idx: { cached: false,
                                                pushPath: true,
                                                path: [
                                                       { tag: 'value',
                                                         value: { value: _descriptor_18.toValue(1n),
                                                                  alignment: _descriptor_18.alignment() } },
                                                       { tag: 'value',
                                                         value: { value: _descriptor_18.toValue(13n),
                                                                  alignment: _descriptor_18.alignment() } }] } },
                                       { push: { storage: false,
                                                 value: __compactRuntime.StateValue.newCell({ value: _descriptor_0.toValue(ownerId_0),
                                                                                              alignment: _descriptor_0.alignment() }).encode() } },
                                       { rem: { cached: false } },
                                       { ins: { cached: true, n: 2 } }]);
    return [];
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
                                                                                                         value: { value: _descriptor_18.toValue(0n),
                                                                                                                  alignment: _descriptor_18.alignment() } },
                                                                                                       { tag: 'value',
                                                                                                         value: { value: _descriptor_18.toValue(0n),
                                                                                                                  alignment: _descriptor_18.alignment() } }] } },
                                                                                       { push: { storage: false,
                                                                                                 value: __compactRuntime.StateValue.newCell({ value: _descriptor_0.toValue(invoiceId_0),
                                                                                                                                              alignment: _descriptor_0.alignment() }).encode() } },
                                                                                       'member',
                                                                                       { popeq: { cached: true,
                                                                                                  result: undefined } }]).value),
                            'invoice does not exist');
    const invoice_0 = _descriptor_8.fromValue(__compactRuntime.queryLedgerState(context,
                                                                                partialProofData,
                                                                                [
                                                                                 { dup: { n: 0 } },
                                                                                 { idx: { cached: false,
                                                                                          pushPath: false,
                                                                                          path: [
                                                                                                 { tag: 'value',
                                                                                                   value: { value: _descriptor_18.toValue(0n),
                                                                                                            alignment: _descriptor_18.alignment() } },
                                                                                                 { tag: 'value',
                                                                                                   value: { value: _descriptor_18.toValue(1n),
                                                                                                            alignment: _descriptor_18.alignment() } }] } },
                                                                                 { idx: { cached: false,
                                                                                          pushPath: false,
                                                                                          path: [
                                                                                                 { tag: 'value',
                                                                                                   value: { value: _descriptor_0.toValue(invoiceId_0),
                                                                                                            alignment: _descriptor_0.alignment() } }] } },
                                                                                 { popeq: { cached: false,
                                                                                            result: undefined } }]).value);
    __compactRuntime.assert(invoice_0.status === 1, 'invoice is not settled');
    __compactRuntime.assert(this._equal_60(this._deriveReceiptCommitment_0(invoiceId_0,
                                                                           invoice_0.settlementNullifier,
                                                                           paidAmount_0,
                                                                           paidToken_0,
                                                                           receiptSecret_0),
                                           invoice_0.receiptCommitment),
                            'invalid settlement disclosure');
    return [];
  }
  _proveContributionSettlement_0(context,
                                 partialProofData,
                                 contributionId_0,
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
                                                                                                         value: { value: _descriptor_18.toValue(1n),
                                                                                                                  alignment: _descriptor_18.alignment() } },
                                                                                                       { tag: 'value',
                                                                                                         value: { value: _descriptor_18.toValue(2n),
                                                                                                                  alignment: _descriptor_18.alignment() } }] } },
                                                                                       { push: { storage: false,
                                                                                                 value: __compactRuntime.StateValue.newCell({ value: _descriptor_0.toValue(contributionId_0),
                                                                                                                                              alignment: _descriptor_0.alignment() }).encode() } },
                                                                                       'member',
                                                                                       { popeq: { cached: true,
                                                                                                  result: undefined } }]).value),
                            'contribution does not exist');
    const contribution_0 = _descriptor_2.fromValue(__compactRuntime.queryLedgerState(context,
                                                                                     partialProofData,
                                                                                     [
                                                                                      { dup: { n: 0 } },
                                                                                      { idx: { cached: false,
                                                                                               pushPath: false,
                                                                                               path: [
                                                                                                      { tag: 'value',
                                                                                                        value: { value: _descriptor_18.toValue(1n),
                                                                                                                 alignment: _descriptor_18.alignment() } },
                                                                                                      { tag: 'value',
                                                                                                        value: { value: _descriptor_18.toValue(3n),
                                                                                                                 alignment: _descriptor_18.alignment() } }] } },
                                                                                      { idx: { cached: false,
                                                                                               pushPath: false,
                                                                                               path: [
                                                                                                      { tag: 'value',
                                                                                                        value: { value: _descriptor_0.toValue(contributionId_0),
                                                                                                                 alignment: _descriptor_0.alignment() } }] } },
                                                                                      { popeq: { cached: false,
                                                                                                 result: undefined } }]).value);
    __compactRuntime.assert(this._equal_61(this._deriveContributionReceiptCommitment_0(contributionId_0,
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
  _equal_14(x0, y0) {
    if (!x0.every((x, i) => y0[i] === x)) { return false; }
    return true;
  }
  _equal_15(x0, y0) {
    if (!x0.every((x, i) => y0[i] === x)) { return false; }
    return true;
  }
  _equal_16(x0, y0) {
    if (!x0.every((x, i) => y0[i] === x)) { return false; }
    return true;
  }
  _equal_17(x0, y0) {
    if (!x0.every((x, i) => y0[i] === x)) { return false; }
    return true;
  }
  _equal_18(x0, y0) {
    if (!x0.every((x, i) => y0[i] === x)) { return false; }
    return true;
  }
  _equal_19(x0, y0) {
    if (!x0.every((x, i) => y0[i] === x)) { return false; }
    return true;
  }
  _equal_20(x0, y0) {
    if (!x0.every((x, i) => y0[i] === x)) { return false; }
    return true;
  }
  _equal_21(x0, y0) {
    if (!x0.every((x, i) => y0[i] === x)) { return false; }
    return true;
  }
  _equal_22(x0, y0) {
    if (!x0.every((x, i) => y0[i] === x)) { return false; }
    return true;
  }
  _equal_23(x0, y0) {
    if (!x0.every((x, i) => y0[i] === x)) { return false; }
    return true;
  }
  _equal_24(x0, y0) {
    if (!x0.every((x, i) => y0[i] === x)) { return false; }
    return true;
  }
  _equal_25(x0, y0) {
    if (!x0.every((x, i) => y0[i] === x)) { return false; }
    return true;
  }
  _equal_26(x0, y0) {
    if (!x0.every((x, i) => y0[i] === x)) { return false; }
    return true;
  }
  _equal_27(x0, y0) {
    if (x0 !== y0) { return false; }
    return true;
  }
  _equal_28(x0, y0) {
    if (!x0.every((x, i) => y0[i] === x)) { return false; }
    return true;
  }
  _equal_29(x0, y0) {
    if (!x0.every((x, i) => y0[i] === x)) { return false; }
    return true;
  }
  _equal_30(x0, y0) {
    if (x0 !== y0) { return false; }
    return true;
  }
  _equal_31(x0, y0) {
    if (!x0.every((x, i) => y0[i] === x)) { return false; }
    return true;
  }
  _equal_32(x0, y0) {
    if (!x0.every((x, i) => y0[i] === x)) { return false; }
    return true;
  }
  _equal_33(x0, y0) {
    if (!x0.every((x, i) => y0[i] === x)) { return false; }
    return true;
  }
  _equal_34(x0, y0) {
    if (!x0.every((x, i) => y0[i] === x)) { return false; }
    return true;
  }
  _equal_35(x0, y0) {
    if (!x0.every((x, i) => y0[i] === x)) { return false; }
    return true;
  }
  _equal_36(x0, y0) {
    if (!x0.every((x, i) => y0[i] === x)) { return false; }
    return true;
  }
  _equal_37(x0, y0) {
    if (!x0.every((x, i) => y0[i] === x)) { return false; }
    return true;
  }
  _equal_38(x0, y0) {
    if (!x0.every((x, i) => y0[i] === x)) { return false; }
    return true;
  }
  _equal_39(x0, y0) {
    if (!x0.every((x, i) => y0[i] === x)) { return false; }
    return true;
  }
  _equal_40(x0, y0) {
    if (!x0.every((x, i) => y0[i] === x)) { return false; }
    return true;
  }
  _equal_41(x0, y0) {
    if (!x0.every((x, i) => y0[i] === x)) { return false; }
    return true;
  }
  _equal_42(x0, y0) {
    if (!x0.every((x, i) => y0[i] === x)) { return false; }
    return true;
  }
  _equal_43(x0, y0) {
    if (!x0.every((x, i) => y0[i] === x)) { return false; }
    return true;
  }
  _equal_44(x0, y0) {
    if (!x0.every((x, i) => y0[i] === x)) { return false; }
    return true;
  }
  _equal_45(x0, y0) {
    if (!x0.every((x, i) => y0[i] === x)) { return false; }
    return true;
  }
  _equal_46(x0, y0) {
    if (!x0.every((x, i) => y0[i] === x)) { return false; }
    return true;
  }
  _equal_47(x0, y0) {
    if (!x0.every((x, i) => y0[i] === x)) { return false; }
    return true;
  }
  _equal_48(x0, y0) {
    if (!x0.every((x, i) => y0[i] === x)) { return false; }
    return true;
  }
  _equal_49(x0, y0) {
    if (!x0.every((x, i) => y0[i] === x)) { return false; }
    return true;
  }
  _equal_50(x0, y0) {
    if (!x0.every((x, i) => y0[i] === x)) { return false; }
    return true;
  }
  _equal_51(x0, y0) {
    if (x0 !== y0) { return false; }
    return true;
  }
  _equal_52(x0, y0) {
    if (!x0.every((x, i) => y0[i] === x)) { return false; }
    return true;
  }
  _equal_53(x0, y0) {
    if (!x0.every((x, i) => y0[i] === x)) { return false; }
    return true;
  }
  _equal_54(x0, y0) {
    if (!x0.every((x, i) => y0[i] === x)) { return false; }
    return true;
  }
  _equal_55(x0, y0) {
    if (!x0.every((x, i) => y0[i] === x)) { return false; }
    return true;
  }
  _equal_56(x0, y0) {
    if (!x0.every((x, i) => y0[i] === x)) { return false; }
    return true;
  }
  _equal_57(x0, y0) {
    if (!x0.every((x, i) => y0[i] === x)) { return false; }
    return true;
  }
  _equal_58(x0, y0) {
    if (!x0.every((x, i) => y0[i] === x)) { return false; }
    return true;
  }
  _equal_59(x0, y0) {
    if (!x0.every((x, i) => y0[i] === x)) { return false; }
    return true;
  }
  _equal_60(x0, y0) {
    if (!x0.every((x, i) => y0[i] === x)) { return false; }
    return true;
  }
  _equal_61(x0, y0) {
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
                                                                                            value: { value: _descriptor_18.toValue(0n),
                                                                                                     alignment: _descriptor_18.alignment() } },
                                                                                          { tag: 'value',
                                                                                            value: { value: _descriptor_18.toValue(0n),
                                                                                                     alignment: _descriptor_18.alignment() } }] } },
                                                                          'size',
                                                                          { push: { storage: false,
                                                                                    value: __compactRuntime.StateValue.newCell({ value: _descriptor_6.toValue(0n),
                                                                                                                                 alignment: _descriptor_6.alignment() }).encode() } },
                                                                          'eq',
                                                                          { popeq: { cached: true,
                                                                                     result: undefined } }]).value);
      },
      size(...args_0) {
        if (args_0.length !== 0) {
          throw new __compactRuntime.CompactError(`size: expected 0 arguments, received ${args_0.length}`);
        }
        return _descriptor_6.fromValue(__compactRuntime.queryLedgerState(context,
                                                                         partialProofData,
                                                                         [
                                                                          { dup: { n: 0 } },
                                                                          { idx: { cached: false,
                                                                                   pushPath: false,
                                                                                   path: [
                                                                                          { tag: 'value',
                                                                                            value: { value: _descriptor_18.toValue(0n),
                                                                                                     alignment: _descriptor_18.alignment() } },
                                                                                          { tag: 'value',
                                                                                            value: { value: _descriptor_18.toValue(0n),
                                                                                                     alignment: _descriptor_18.alignment() } }] } },
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
                                     'lumapay.compact line 79 char 1',
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
                                                                                            value: { value: _descriptor_18.toValue(0n),
                                                                                                     alignment: _descriptor_18.alignment() } },
                                                                                          { tag: 'value',
                                                                                            value: { value: _descriptor_18.toValue(0n),
                                                                                                     alignment: _descriptor_18.alignment() } }] } },
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
        const self_0 = state.asArray()[0].asArray()[0];
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
                                                                                            value: { value: _descriptor_18.toValue(0n),
                                                                                                     alignment: _descriptor_18.alignment() } },
                                                                                          { tag: 'value',
                                                                                            value: { value: _descriptor_18.toValue(1n),
                                                                                                     alignment: _descriptor_18.alignment() } }] } },
                                                                          'size',
                                                                          { push: { storage: false,
                                                                                    value: __compactRuntime.StateValue.newCell({ value: _descriptor_6.toValue(0n),
                                                                                                                                 alignment: _descriptor_6.alignment() }).encode() } },
                                                                          'eq',
                                                                          { popeq: { cached: true,
                                                                                     result: undefined } }]).value);
      },
      size(...args_0) {
        if (args_0.length !== 0) {
          throw new __compactRuntime.CompactError(`size: expected 0 arguments, received ${args_0.length}`);
        }
        return _descriptor_6.fromValue(__compactRuntime.queryLedgerState(context,
                                                                         partialProofData,
                                                                         [
                                                                          { dup: { n: 0 } },
                                                                          { idx: { cached: false,
                                                                                   pushPath: false,
                                                                                   path: [
                                                                                          { tag: 'value',
                                                                                            value: { value: _descriptor_18.toValue(0n),
                                                                                                     alignment: _descriptor_18.alignment() } },
                                                                                          { tag: 'value',
                                                                                            value: { value: _descriptor_18.toValue(1n),
                                                                                                     alignment: _descriptor_18.alignment() } }] } },
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
                                     'lumapay.compact line 80 char 1',
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
                                                                                            value: { value: _descriptor_18.toValue(0n),
                                                                                                     alignment: _descriptor_18.alignment() } },
                                                                                          { tag: 'value',
                                                                                            value: { value: _descriptor_18.toValue(1n),
                                                                                                     alignment: _descriptor_18.alignment() } }] } },
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
                                     'lumapay.compact line 80 char 1',
                                     'Bytes<32>',
                                     key_0)
        }
        return _descriptor_8.fromValue(__compactRuntime.queryLedgerState(context,
                                                                         partialProofData,
                                                                         [
                                                                          { dup: { n: 0 } },
                                                                          { idx: { cached: false,
                                                                                   pushPath: false,
                                                                                   path: [
                                                                                          { tag: 'value',
                                                                                            value: { value: _descriptor_18.toValue(0n),
                                                                                                     alignment: _descriptor_18.alignment() } },
                                                                                          { tag: 'value',
                                                                                            value: { value: _descriptor_18.toValue(1n),
                                                                                                     alignment: _descriptor_18.alignment() } }] } },
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
        const self_0 = state.asArray()[0].asArray()[1];
        return self_0.asMap().keys().map(  (key) => {    const value = self_0.asMap().get(key).asCell();    return [      _descriptor_0.fromValue(key.value),      _descriptor_8.fromValue(value.value)    ];  })[Symbol.iterator]();
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
                                                                                            value: { value: _descriptor_18.toValue(0n),
                                                                                                     alignment: _descriptor_18.alignment() } },
                                                                                          { tag: 'value',
                                                                                            value: { value: _descriptor_18.toValue(2n),
                                                                                                     alignment: _descriptor_18.alignment() } }] } },
                                                                          'size',
                                                                          { push: { storage: false,
                                                                                    value: __compactRuntime.StateValue.newCell({ value: _descriptor_6.toValue(0n),
                                                                                                                                 alignment: _descriptor_6.alignment() }).encode() } },
                                                                          'eq',
                                                                          { popeq: { cached: true,
                                                                                     result: undefined } }]).value);
      },
      size(...args_0) {
        if (args_0.length !== 0) {
          throw new __compactRuntime.CompactError(`size: expected 0 arguments, received ${args_0.length}`);
        }
        return _descriptor_6.fromValue(__compactRuntime.queryLedgerState(context,
                                                                         partialProofData,
                                                                         [
                                                                          { dup: { n: 0 } },
                                                                          { idx: { cached: false,
                                                                                   pushPath: false,
                                                                                   path: [
                                                                                          { tag: 'value',
                                                                                            value: { value: _descriptor_18.toValue(0n),
                                                                                                     alignment: _descriptor_18.alignment() } },
                                                                                          { tag: 'value',
                                                                                            value: { value: _descriptor_18.toValue(2n),
                                                                                                     alignment: _descriptor_18.alignment() } }] } },
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
                                     'lumapay.compact line 81 char 1',
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
                                                                                            value: { value: _descriptor_18.toValue(0n),
                                                                                                     alignment: _descriptor_18.alignment() } },
                                                                                          { tag: 'value',
                                                                                            value: { value: _descriptor_18.toValue(2n),
                                                                                                     alignment: _descriptor_18.alignment() } }] } },
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
        const self_0 = state.asArray()[0].asArray()[2];
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
                                                                                            value: { value: _descriptor_18.toValue(0n),
                                                                                                     alignment: _descriptor_18.alignment() } },
                                                                                          { tag: 'value',
                                                                                            value: { value: _descriptor_18.toValue(3n),
                                                                                                     alignment: _descriptor_18.alignment() } }] } },
                                                                          'size',
                                                                          { push: { storage: false,
                                                                                    value: __compactRuntime.StateValue.newCell({ value: _descriptor_6.toValue(0n),
                                                                                                                                 alignment: _descriptor_6.alignment() }).encode() } },
                                                                          'eq',
                                                                          { popeq: { cached: true,
                                                                                     result: undefined } }]).value);
      },
      size(...args_0) {
        if (args_0.length !== 0) {
          throw new __compactRuntime.CompactError(`size: expected 0 arguments, received ${args_0.length}`);
        }
        return _descriptor_6.fromValue(__compactRuntime.queryLedgerState(context,
                                                                         partialProofData,
                                                                         [
                                                                          { dup: { n: 0 } },
                                                                          { idx: { cached: false,
                                                                                   pushPath: false,
                                                                                   path: [
                                                                                          { tag: 'value',
                                                                                            value: { value: _descriptor_18.toValue(0n),
                                                                                                     alignment: _descriptor_18.alignment() } },
                                                                                          { tag: 'value',
                                                                                            value: { value: _descriptor_18.toValue(3n),
                                                                                                     alignment: _descriptor_18.alignment() } }] } },
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
                                     'lumapay.compact line 82 char 1',
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
                                                                                            value: { value: _descriptor_18.toValue(0n),
                                                                                                     alignment: _descriptor_18.alignment() } },
                                                                                          { tag: 'value',
                                                                                            value: { value: _descriptor_18.toValue(3n),
                                                                                                     alignment: _descriptor_18.alignment() } }] } },
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
        const self_0 = state.asArray()[0].asArray()[3];
        return self_0.asMap().keys().map((elem) => _descriptor_0.fromValue(elem.value))[Symbol.iterator]();
      }
    },
    campaignIds: {
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
                                                                                            value: { value: _descriptor_18.toValue(1n),
                                                                                                     alignment: _descriptor_18.alignment() } },
                                                                                          { tag: 'value',
                                                                                            value: { value: _descriptor_18.toValue(0n),
                                                                                                     alignment: _descriptor_18.alignment() } }] } },
                                                                          'size',
                                                                          { push: { storage: false,
                                                                                    value: __compactRuntime.StateValue.newCell({ value: _descriptor_6.toValue(0n),
                                                                                                                                 alignment: _descriptor_6.alignment() }).encode() } },
                                                                          'eq',
                                                                          { popeq: { cached: true,
                                                                                     result: undefined } }]).value);
      },
      size(...args_0) {
        if (args_0.length !== 0) {
          throw new __compactRuntime.CompactError(`size: expected 0 arguments, received ${args_0.length}`);
        }
        return _descriptor_6.fromValue(__compactRuntime.queryLedgerState(context,
                                                                         partialProofData,
                                                                         [
                                                                          { dup: { n: 0 } },
                                                                          { idx: { cached: false,
                                                                                   pushPath: false,
                                                                                   path: [
                                                                                          { tag: 'value',
                                                                                            value: { value: _descriptor_18.toValue(1n),
                                                                                                     alignment: _descriptor_18.alignment() } },
                                                                                          { tag: 'value',
                                                                                            value: { value: _descriptor_18.toValue(0n),
                                                                                                     alignment: _descriptor_18.alignment() } }] } },
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
                                     'lumapay.compact line 84 char 1',
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
                                                                                            value: { value: _descriptor_18.toValue(1n),
                                                                                                     alignment: _descriptor_18.alignment() } },
                                                                                          { tag: 'value',
                                                                                            value: { value: _descriptor_18.toValue(0n),
                                                                                                     alignment: _descriptor_18.alignment() } }] } },
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
        const self_0 = state.asArray()[1].asArray()[0];
        return self_0.asMap().keys().map((elem) => _descriptor_0.fromValue(elem.value))[Symbol.iterator]();
      }
    },
    campaigns: {
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
                                                                                            value: { value: _descriptor_18.toValue(1n),
                                                                                                     alignment: _descriptor_18.alignment() } },
                                                                                          { tag: 'value',
                                                                                            value: { value: _descriptor_18.toValue(1n),
                                                                                                     alignment: _descriptor_18.alignment() } }] } },
                                                                          'size',
                                                                          { push: { storage: false,
                                                                                    value: __compactRuntime.StateValue.newCell({ value: _descriptor_6.toValue(0n),
                                                                                                                                 alignment: _descriptor_6.alignment() }).encode() } },
                                                                          'eq',
                                                                          { popeq: { cached: true,
                                                                                     result: undefined } }]).value);
      },
      size(...args_0) {
        if (args_0.length !== 0) {
          throw new __compactRuntime.CompactError(`size: expected 0 arguments, received ${args_0.length}`);
        }
        return _descriptor_6.fromValue(__compactRuntime.queryLedgerState(context,
                                                                         partialProofData,
                                                                         [
                                                                          { dup: { n: 0 } },
                                                                          { idx: { cached: false,
                                                                                   pushPath: false,
                                                                                   path: [
                                                                                          { tag: 'value',
                                                                                            value: { value: _descriptor_18.toValue(1n),
                                                                                                     alignment: _descriptor_18.alignment() } },
                                                                                          { tag: 'value',
                                                                                            value: { value: _descriptor_18.toValue(1n),
                                                                                                     alignment: _descriptor_18.alignment() } }] } },
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
                                     'lumapay.compact line 85 char 1',
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
                                                                                            value: { value: _descriptor_18.toValue(1n),
                                                                                                     alignment: _descriptor_18.alignment() } },
                                                                                          { tag: 'value',
                                                                                            value: { value: _descriptor_18.toValue(1n),
                                                                                                     alignment: _descriptor_18.alignment() } }] } },
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
                                     'lumapay.compact line 85 char 1',
                                     'Bytes<32>',
                                     key_0)
        }
        return _descriptor_17.fromValue(__compactRuntime.queryLedgerState(context,
                                                                          partialProofData,
                                                                          [
                                                                           { dup: { n: 0 } },
                                                                           { idx: { cached: false,
                                                                                    pushPath: false,
                                                                                    path: [
                                                                                           { tag: 'value',
                                                                                             value: { value: _descriptor_18.toValue(1n),
                                                                                                      alignment: _descriptor_18.alignment() } },
                                                                                           { tag: 'value',
                                                                                             value: { value: _descriptor_18.toValue(1n),
                                                                                                      alignment: _descriptor_18.alignment() } }] } },
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
        const self_0 = state.asArray()[1].asArray()[1];
        return self_0.asMap().keys().map(  (key) => {    const value = self_0.asMap().get(key).asCell();    return [      _descriptor_0.fromValue(key.value),      _descriptor_17.fromValue(value.value)    ];  })[Symbol.iterator]();
      }
    },
    contributionIds: {
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
                                                                                            value: { value: _descriptor_18.toValue(1n),
                                                                                                     alignment: _descriptor_18.alignment() } },
                                                                                          { tag: 'value',
                                                                                            value: { value: _descriptor_18.toValue(2n),
                                                                                                     alignment: _descriptor_18.alignment() } }] } },
                                                                          'size',
                                                                          { push: { storage: false,
                                                                                    value: __compactRuntime.StateValue.newCell({ value: _descriptor_6.toValue(0n),
                                                                                                                                 alignment: _descriptor_6.alignment() }).encode() } },
                                                                          'eq',
                                                                          { popeq: { cached: true,
                                                                                     result: undefined } }]).value);
      },
      size(...args_0) {
        if (args_0.length !== 0) {
          throw new __compactRuntime.CompactError(`size: expected 0 arguments, received ${args_0.length}`);
        }
        return _descriptor_6.fromValue(__compactRuntime.queryLedgerState(context,
                                                                         partialProofData,
                                                                         [
                                                                          { dup: { n: 0 } },
                                                                          { idx: { cached: false,
                                                                                   pushPath: false,
                                                                                   path: [
                                                                                          { tag: 'value',
                                                                                            value: { value: _descriptor_18.toValue(1n),
                                                                                                     alignment: _descriptor_18.alignment() } },
                                                                                          { tag: 'value',
                                                                                            value: { value: _descriptor_18.toValue(2n),
                                                                                                     alignment: _descriptor_18.alignment() } }] } },
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
                                     'lumapay.compact line 86 char 1',
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
                                                                                            value: { value: _descriptor_18.toValue(1n),
                                                                                                     alignment: _descriptor_18.alignment() } },
                                                                                          { tag: 'value',
                                                                                            value: { value: _descriptor_18.toValue(2n),
                                                                                                     alignment: _descriptor_18.alignment() } }] } },
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
        const self_0 = state.asArray()[1].asArray()[2];
        return self_0.asMap().keys().map((elem) => _descriptor_0.fromValue(elem.value))[Symbol.iterator]();
      }
    },
    contributions: {
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
                                                                                            value: { value: _descriptor_18.toValue(1n),
                                                                                                     alignment: _descriptor_18.alignment() } },
                                                                                          { tag: 'value',
                                                                                            value: { value: _descriptor_18.toValue(3n),
                                                                                                     alignment: _descriptor_18.alignment() } }] } },
                                                                          'size',
                                                                          { push: { storage: false,
                                                                                    value: __compactRuntime.StateValue.newCell({ value: _descriptor_6.toValue(0n),
                                                                                                                                 alignment: _descriptor_6.alignment() }).encode() } },
                                                                          'eq',
                                                                          { popeq: { cached: true,
                                                                                     result: undefined } }]).value);
      },
      size(...args_0) {
        if (args_0.length !== 0) {
          throw new __compactRuntime.CompactError(`size: expected 0 arguments, received ${args_0.length}`);
        }
        return _descriptor_6.fromValue(__compactRuntime.queryLedgerState(context,
                                                                         partialProofData,
                                                                         [
                                                                          { dup: { n: 0 } },
                                                                          { idx: { cached: false,
                                                                                   pushPath: false,
                                                                                   path: [
                                                                                          { tag: 'value',
                                                                                            value: { value: _descriptor_18.toValue(1n),
                                                                                                     alignment: _descriptor_18.alignment() } },
                                                                                          { tag: 'value',
                                                                                            value: { value: _descriptor_18.toValue(3n),
                                                                                                     alignment: _descriptor_18.alignment() } }] } },
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
                                     'lumapay.compact line 87 char 1',
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
                                                                                            value: { value: _descriptor_18.toValue(1n),
                                                                                                     alignment: _descriptor_18.alignment() } },
                                                                                          { tag: 'value',
                                                                                            value: { value: _descriptor_18.toValue(3n),
                                                                                                     alignment: _descriptor_18.alignment() } }] } },
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
                                     'lumapay.compact line 87 char 1',
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
                                                                                            value: { value: _descriptor_18.toValue(1n),
                                                                                                     alignment: _descriptor_18.alignment() } },
                                                                                          { tag: 'value',
                                                                                            value: { value: _descriptor_18.toValue(3n),
                                                                                                     alignment: _descriptor_18.alignment() } }] } },
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
        const self_0 = state.asArray()[1].asArray()[3];
        return self_0.asMap().keys().map(  (key) => {    const value = self_0.asMap().get(key).asCell();    return [      _descriptor_0.fromValue(key.value),      _descriptor_2.fromValue(value.value)    ];  })[Symbol.iterator]();
      }
    },
    contributionNullifiers: {
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
                                                                                            value: { value: _descriptor_18.toValue(1n),
                                                                                                     alignment: _descriptor_18.alignment() } },
                                                                                          { tag: 'value',
                                                                                            value: { value: _descriptor_18.toValue(4n),
                                                                                                     alignment: _descriptor_18.alignment() } }] } },
                                                                          'size',
                                                                          { push: { storage: false,
                                                                                    value: __compactRuntime.StateValue.newCell({ value: _descriptor_6.toValue(0n),
                                                                                                                                 alignment: _descriptor_6.alignment() }).encode() } },
                                                                          'eq',
                                                                          { popeq: { cached: true,
                                                                                     result: undefined } }]).value);
      },
      size(...args_0) {
        if (args_0.length !== 0) {
          throw new __compactRuntime.CompactError(`size: expected 0 arguments, received ${args_0.length}`);
        }
        return _descriptor_6.fromValue(__compactRuntime.queryLedgerState(context,
                                                                         partialProofData,
                                                                         [
                                                                          { dup: { n: 0 } },
                                                                          { idx: { cached: false,
                                                                                   pushPath: false,
                                                                                   path: [
                                                                                          { tag: 'value',
                                                                                            value: { value: _descriptor_18.toValue(1n),
                                                                                                     alignment: _descriptor_18.alignment() } },
                                                                                          { tag: 'value',
                                                                                            value: { value: _descriptor_18.toValue(4n),
                                                                                                     alignment: _descriptor_18.alignment() } }] } },
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
                                     'lumapay.compact line 88 char 1',
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
                                                                                            value: { value: _descriptor_18.toValue(1n),
                                                                                                     alignment: _descriptor_18.alignment() } },
                                                                                          { tag: 'value',
                                                                                            value: { value: _descriptor_18.toValue(4n),
                                                                                                     alignment: _descriptor_18.alignment() } }] } },
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
        const self_0 = state.asArray()[1].asArray()[4];
        return self_0.asMap().keys().map((elem) => _descriptor_0.fromValue(elem.value))[Symbol.iterator]();
      }
    },
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
                                                                                            value: { value: _descriptor_18.toValue(1n),
                                                                                                     alignment: _descriptor_18.alignment() } },
                                                                                          { tag: 'value',
                                                                                            value: { value: _descriptor_18.toValue(5n),
                                                                                                     alignment: _descriptor_18.alignment() } }] } },
                                                                          'size',
                                                                          { push: { storage: false,
                                                                                    value: __compactRuntime.StateValue.newCell({ value: _descriptor_6.toValue(0n),
                                                                                                                                 alignment: _descriptor_6.alignment() }).encode() } },
                                                                          'eq',
                                                                          { popeq: { cached: true,
                                                                                     result: undefined } }]).value);
      },
      size(...args_0) {
        if (args_0.length !== 0) {
          throw new __compactRuntime.CompactError(`size: expected 0 arguments, received ${args_0.length}`);
        }
        return _descriptor_6.fromValue(__compactRuntime.queryLedgerState(context,
                                                                         partialProofData,
                                                                         [
                                                                          { dup: { n: 0 } },
                                                                          { idx: { cached: false,
                                                                                   pushPath: false,
                                                                                   path: [
                                                                                          { tag: 'value',
                                                                                            value: { value: _descriptor_18.toValue(1n),
                                                                                                     alignment: _descriptor_18.alignment() } },
                                                                                          { tag: 'value',
                                                                                            value: { value: _descriptor_18.toValue(5n),
                                                                                                     alignment: _descriptor_18.alignment() } }] } },
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
                                     'lumapay.compact line 90 char 1',
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
                                                                                            value: { value: _descriptor_18.toValue(1n),
                                                                                                     alignment: _descriptor_18.alignment() } },
                                                                                          { tag: 'value',
                                                                                            value: { value: _descriptor_18.toValue(5n),
                                                                                                     alignment: _descriptor_18.alignment() } }] } },
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
        const self_0 = state.asArray()[1].asArray()[5];
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
                                                                                            value: { value: _descriptor_18.toValue(1n),
                                                                                                     alignment: _descriptor_18.alignment() } },
                                                                                          { tag: 'value',
                                                                                            value: { value: _descriptor_18.toValue(6n),
                                                                                                     alignment: _descriptor_18.alignment() } }] } },
                                                                          'size',
                                                                          { push: { storage: false,
                                                                                    value: __compactRuntime.StateValue.newCell({ value: _descriptor_6.toValue(0n),
                                                                                                                                 alignment: _descriptor_6.alignment() }).encode() } },
                                                                          'eq',
                                                                          { popeq: { cached: true,
                                                                                     result: undefined } }]).value);
      },
      size(...args_0) {
        if (args_0.length !== 0) {
          throw new __compactRuntime.CompactError(`size: expected 0 arguments, received ${args_0.length}`);
        }
        return _descriptor_6.fromValue(__compactRuntime.queryLedgerState(context,
                                                                         partialProofData,
                                                                         [
                                                                          { dup: { n: 0 } },
                                                                          { idx: { cached: false,
                                                                                   pushPath: false,
                                                                                   path: [
                                                                                          { tag: 'value',
                                                                                            value: { value: _descriptor_18.toValue(1n),
                                                                                                     alignment: _descriptor_18.alignment() } },
                                                                                          { tag: 'value',
                                                                                            value: { value: _descriptor_18.toValue(6n),
                                                                                                     alignment: _descriptor_18.alignment() } }] } },
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
                                     'lumapay.compact line 91 char 1',
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
                                                                                            value: { value: _descriptor_18.toValue(1n),
                                                                                                     alignment: _descriptor_18.alignment() } },
                                                                                          { tag: 'value',
                                                                                            value: { value: _descriptor_18.toValue(6n),
                                                                                                     alignment: _descriptor_18.alignment() } }] } },
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
                                     'lumapay.compact line 91 char 1',
                                     'Bytes<32>',
                                     key_0)
        }
        return _descriptor_12.fromValue(__compactRuntime.queryLedgerState(context,
                                                                          partialProofData,
                                                                          [
                                                                           { dup: { n: 0 } },
                                                                           { idx: { cached: false,
                                                                                    pushPath: false,
                                                                                    path: [
                                                                                           { tag: 'value',
                                                                                             value: { value: _descriptor_18.toValue(1n),
                                                                                                      alignment: _descriptor_18.alignment() } },
                                                                                           { tag: 'value',
                                                                                             value: { value: _descriptor_18.toValue(6n),
                                                                                                      alignment: _descriptor_18.alignment() } }] } },
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
        const self_0 = state.asArray()[1].asArray()[6];
        return self_0.asMap().keys().map(  (key) => {    const value = self_0.asMap().get(key).asCell();    return [      _descriptor_0.fromValue(key.value),      _descriptor_12.fromValue(value.value)    ];  })[Symbol.iterator]();
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
                                                                                            value: { value: _descriptor_18.toValue(1n),
                                                                                                     alignment: _descriptor_18.alignment() } },
                                                                                          { tag: 'value',
                                                                                            value: { value: _descriptor_18.toValue(7n),
                                                                                                     alignment: _descriptor_18.alignment() } }] } },
                                                                          'size',
                                                                          { push: { storage: false,
                                                                                    value: __compactRuntime.StateValue.newCell({ value: _descriptor_6.toValue(0n),
                                                                                                                                 alignment: _descriptor_6.alignment() }).encode() } },
                                                                          'eq',
                                                                          { popeq: { cached: true,
                                                                                     result: undefined } }]).value);
      },
      size(...args_0) {
        if (args_0.length !== 0) {
          throw new __compactRuntime.CompactError(`size: expected 0 arguments, received ${args_0.length}`);
        }
        return _descriptor_6.fromValue(__compactRuntime.queryLedgerState(context,
                                                                         partialProofData,
                                                                         [
                                                                          { dup: { n: 0 } },
                                                                          { idx: { cached: false,
                                                                                   pushPath: false,
                                                                                   path: [
                                                                                          { tag: 'value',
                                                                                            value: { value: _descriptor_18.toValue(1n),
                                                                                                     alignment: _descriptor_18.alignment() } },
                                                                                          { tag: 'value',
                                                                                            value: { value: _descriptor_18.toValue(7n),
                                                                                                     alignment: _descriptor_18.alignment() } }] } },
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
                                     'lumapay.compact line 92 char 1',
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
                                                                                            value: { value: _descriptor_18.toValue(1n),
                                                                                                     alignment: _descriptor_18.alignment() } },
                                                                                          { tag: 'value',
                                                                                            value: { value: _descriptor_18.toValue(7n),
                                                                                                     alignment: _descriptor_18.alignment() } }] } },
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
        const self_0 = state.asArray()[1].asArray()[7];
        return self_0.asMap().keys().map((elem) => _descriptor_0.fromValue(elem.value))[Symbol.iterator]();
      }
    },
    quoteIds: {
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
                                                                                            value: { value: _descriptor_18.toValue(1n),
                                                                                                     alignment: _descriptor_18.alignment() } },
                                                                                          { tag: 'value',
                                                                                            value: { value: _descriptor_18.toValue(8n),
                                                                                                     alignment: _descriptor_18.alignment() } }] } },
                                                                          'size',
                                                                          { push: { storage: false,
                                                                                    value: __compactRuntime.StateValue.newCell({ value: _descriptor_6.toValue(0n),
                                                                                                                                 alignment: _descriptor_6.alignment() }).encode() } },
                                                                          'eq',
                                                                          { popeq: { cached: true,
                                                                                     result: undefined } }]).value);
      },
      size(...args_0) {
        if (args_0.length !== 0) {
          throw new __compactRuntime.CompactError(`size: expected 0 arguments, received ${args_0.length}`);
        }
        return _descriptor_6.fromValue(__compactRuntime.queryLedgerState(context,
                                                                         partialProofData,
                                                                         [
                                                                          { dup: { n: 0 } },
                                                                          { idx: { cached: false,
                                                                                   pushPath: false,
                                                                                   path: [
                                                                                          { tag: 'value',
                                                                                            value: { value: _descriptor_18.toValue(1n),
                                                                                                     alignment: _descriptor_18.alignment() } },
                                                                                          { tag: 'value',
                                                                                            value: { value: _descriptor_18.toValue(8n),
                                                                                                     alignment: _descriptor_18.alignment() } }] } },
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
                                     'lumapay.compact line 94 char 1',
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
                                                                                            value: { value: _descriptor_18.toValue(1n),
                                                                                                     alignment: _descriptor_18.alignment() } },
                                                                                          { tag: 'value',
                                                                                            value: { value: _descriptor_18.toValue(8n),
                                                                                                     alignment: _descriptor_18.alignment() } }] } },
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
        const self_0 = state.asArray()[1].asArray()[8];
        return self_0.asMap().keys().map((elem) => _descriptor_0.fromValue(elem.value))[Symbol.iterator]();
      }
    },
    quotes: {
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
                                                                                            value: { value: _descriptor_18.toValue(1n),
                                                                                                     alignment: _descriptor_18.alignment() } },
                                                                                          { tag: 'value',
                                                                                            value: { value: _descriptor_18.toValue(9n),
                                                                                                     alignment: _descriptor_18.alignment() } }] } },
                                                                          'size',
                                                                          { push: { storage: false,
                                                                                    value: __compactRuntime.StateValue.newCell({ value: _descriptor_6.toValue(0n),
                                                                                                                                 alignment: _descriptor_6.alignment() }).encode() } },
                                                                          'eq',
                                                                          { popeq: { cached: true,
                                                                                     result: undefined } }]).value);
      },
      size(...args_0) {
        if (args_0.length !== 0) {
          throw new __compactRuntime.CompactError(`size: expected 0 arguments, received ${args_0.length}`);
        }
        return _descriptor_6.fromValue(__compactRuntime.queryLedgerState(context,
                                                                         partialProofData,
                                                                         [
                                                                          { dup: { n: 0 } },
                                                                          { idx: { cached: false,
                                                                                   pushPath: false,
                                                                                   path: [
                                                                                          { tag: 'value',
                                                                                            value: { value: _descriptor_18.toValue(1n),
                                                                                                     alignment: _descriptor_18.alignment() } },
                                                                                          { tag: 'value',
                                                                                            value: { value: _descriptor_18.toValue(9n),
                                                                                                     alignment: _descriptor_18.alignment() } }] } },
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
                                     'lumapay.compact line 95 char 1',
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
                                                                                            value: { value: _descriptor_18.toValue(1n),
                                                                                                     alignment: _descriptor_18.alignment() } },
                                                                                          { tag: 'value',
                                                                                            value: { value: _descriptor_18.toValue(9n),
                                                                                                     alignment: _descriptor_18.alignment() } }] } },
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
                                     'lumapay.compact line 95 char 1',
                                     'Bytes<32>',
                                     key_0)
        }
        return _descriptor_9.fromValue(__compactRuntime.queryLedgerState(context,
                                                                         partialProofData,
                                                                         [
                                                                          { dup: { n: 0 } },
                                                                          { idx: { cached: false,
                                                                                   pushPath: false,
                                                                                   path: [
                                                                                          { tag: 'value',
                                                                                            value: { value: _descriptor_18.toValue(1n),
                                                                                                     alignment: _descriptor_18.alignment() } },
                                                                                          { tag: 'value',
                                                                                            value: { value: _descriptor_18.toValue(9n),
                                                                                                     alignment: _descriptor_18.alignment() } }] } },
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
        const self_0 = state.asArray()[1].asArray()[9];
        return self_0.asMap().keys().map(  (key) => {    const value = self_0.asMap().get(key).asCell();    return [      _descriptor_0.fromValue(key.value),      _descriptor_9.fromValue(value.value)    ];  })[Symbol.iterator]();
      }
    },
    quoteProviderIds: {
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
                                                                                            value: { value: _descriptor_18.toValue(1n),
                                                                                                     alignment: _descriptor_18.alignment() } },
                                                                                          { tag: 'value',
                                                                                            value: { value: _descriptor_18.toValue(10n),
                                                                                                     alignment: _descriptor_18.alignment() } }] } },
                                                                          'size',
                                                                          { push: { storage: false,
                                                                                    value: __compactRuntime.StateValue.newCell({ value: _descriptor_6.toValue(0n),
                                                                                                                                 alignment: _descriptor_6.alignment() }).encode() } },
                                                                          'eq',
                                                                          { popeq: { cached: true,
                                                                                     result: undefined } }]).value);
      },
      size(...args_0) {
        if (args_0.length !== 0) {
          throw new __compactRuntime.CompactError(`size: expected 0 arguments, received ${args_0.length}`);
        }
        return _descriptor_6.fromValue(__compactRuntime.queryLedgerState(context,
                                                                         partialProofData,
                                                                         [
                                                                          { dup: { n: 0 } },
                                                                          { idx: { cached: false,
                                                                                   pushPath: false,
                                                                                   path: [
                                                                                          { tag: 'value',
                                                                                            value: { value: _descriptor_18.toValue(1n),
                                                                                                     alignment: _descriptor_18.alignment() } },
                                                                                          { tag: 'value',
                                                                                            value: { value: _descriptor_18.toValue(10n),
                                                                                                     alignment: _descriptor_18.alignment() } }] } },
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
                                     'lumapay.compact line 96 char 1',
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
                                                                                            value: { value: _descriptor_18.toValue(1n),
                                                                                                     alignment: _descriptor_18.alignment() } },
                                                                                          { tag: 'value',
                                                                                            value: { value: _descriptor_18.toValue(10n),
                                                                                                     alignment: _descriptor_18.alignment() } }] } },
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
        const self_0 = state.asArray()[1].asArray()[10];
        return self_0.asMap().keys().map((elem) => _descriptor_0.fromValue(elem.value))[Symbol.iterator]();
      }
    },
    quoteProviderAuthorizations: {
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
                                                                                            value: { value: _descriptor_18.toValue(1n),
                                                                                                     alignment: _descriptor_18.alignment() } },
                                                                                          { tag: 'value',
                                                                                            value: { value: _descriptor_18.toValue(11n),
                                                                                                     alignment: _descriptor_18.alignment() } }] } },
                                                                          'size',
                                                                          { push: { storage: false,
                                                                                    value: __compactRuntime.StateValue.newCell({ value: _descriptor_6.toValue(0n),
                                                                                                                                 alignment: _descriptor_6.alignment() }).encode() } },
                                                                          'eq',
                                                                          { popeq: { cached: true,
                                                                                     result: undefined } }]).value);
      },
      size(...args_0) {
        if (args_0.length !== 0) {
          throw new __compactRuntime.CompactError(`size: expected 0 arguments, received ${args_0.length}`);
        }
        return _descriptor_6.fromValue(__compactRuntime.queryLedgerState(context,
                                                                         partialProofData,
                                                                         [
                                                                          { dup: { n: 0 } },
                                                                          { idx: { cached: false,
                                                                                   pushPath: false,
                                                                                   path: [
                                                                                          { tag: 'value',
                                                                                            value: { value: _descriptor_18.toValue(1n),
                                                                                                     alignment: _descriptor_18.alignment() } },
                                                                                          { tag: 'value',
                                                                                            value: { value: _descriptor_18.toValue(11n),
                                                                                                     alignment: _descriptor_18.alignment() } }] } },
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
                                     'lumapay.compact line 97 char 1',
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
                                                                                            value: { value: _descriptor_18.toValue(1n),
                                                                                                     alignment: _descriptor_18.alignment() } },
                                                                                          { tag: 'value',
                                                                                            value: { value: _descriptor_18.toValue(11n),
                                                                                                     alignment: _descriptor_18.alignment() } }] } },
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
                                     'lumapay.compact line 97 char 1',
                                     'Bytes<32>',
                                     key_0)
        }
        return _descriptor_0.fromValue(__compactRuntime.queryLedgerState(context,
                                                                         partialProofData,
                                                                         [
                                                                          { dup: { n: 0 } },
                                                                          { idx: { cached: false,
                                                                                   pushPath: false,
                                                                                   path: [
                                                                                          { tag: 'value',
                                                                                            value: { value: _descriptor_18.toValue(1n),
                                                                                                     alignment: _descriptor_18.alignment() } },
                                                                                          { tag: 'value',
                                                                                            value: { value: _descriptor_18.toValue(11n),
                                                                                                     alignment: _descriptor_18.alignment() } }] } },
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
        const self_0 = state.asArray()[1].asArray()[11];
        return self_0.asMap().keys().map(  (key) => {    const value = self_0.asMap().get(key).asCell();    return [      _descriptor_0.fromValue(key.value),      _descriptor_0.fromValue(value.value)    ];  })[Symbol.iterator]();
      }
    },
    backupOwnerIds: {
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
                                                                                            value: { value: _descriptor_18.toValue(1n),
                                                                                                     alignment: _descriptor_18.alignment() } },
                                                                                          { tag: 'value',
                                                                                            value: { value: _descriptor_18.toValue(12n),
                                                                                                     alignment: _descriptor_18.alignment() } }] } },
                                                                          'size',
                                                                          { push: { storage: false,
                                                                                    value: __compactRuntime.StateValue.newCell({ value: _descriptor_6.toValue(0n),
                                                                                                                                 alignment: _descriptor_6.alignment() }).encode() } },
                                                                          'eq',
                                                                          { popeq: { cached: true,
                                                                                     result: undefined } }]).value);
      },
      size(...args_0) {
        if (args_0.length !== 0) {
          throw new __compactRuntime.CompactError(`size: expected 0 arguments, received ${args_0.length}`);
        }
        return _descriptor_6.fromValue(__compactRuntime.queryLedgerState(context,
                                                                         partialProofData,
                                                                         [
                                                                          { dup: { n: 0 } },
                                                                          { idx: { cached: false,
                                                                                   pushPath: false,
                                                                                   path: [
                                                                                          { tag: 'value',
                                                                                            value: { value: _descriptor_18.toValue(1n),
                                                                                                     alignment: _descriptor_18.alignment() } },
                                                                                          { tag: 'value',
                                                                                            value: { value: _descriptor_18.toValue(12n),
                                                                                                     alignment: _descriptor_18.alignment() } }] } },
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
                                     'lumapay.compact line 99 char 1',
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
                                                                                            value: { value: _descriptor_18.toValue(1n),
                                                                                                     alignment: _descriptor_18.alignment() } },
                                                                                          { tag: 'value',
                                                                                            value: { value: _descriptor_18.toValue(12n),
                                                                                                     alignment: _descriptor_18.alignment() } }] } },
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
        const self_0 = state.asArray()[1].asArray()[12];
        return self_0.asMap().keys().map((elem) => _descriptor_0.fromValue(elem.value))[Symbol.iterator]();
      }
    },
    backupAnchors: {
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
                                                                                            value: { value: _descriptor_18.toValue(1n),
                                                                                                     alignment: _descriptor_18.alignment() } },
                                                                                          { tag: 'value',
                                                                                            value: { value: _descriptor_18.toValue(13n),
                                                                                                     alignment: _descriptor_18.alignment() } }] } },
                                                                          'size',
                                                                          { push: { storage: false,
                                                                                    value: __compactRuntime.StateValue.newCell({ value: _descriptor_6.toValue(0n),
                                                                                                                                 alignment: _descriptor_6.alignment() }).encode() } },
                                                                          'eq',
                                                                          { popeq: { cached: true,
                                                                                     result: undefined } }]).value);
      },
      size(...args_0) {
        if (args_0.length !== 0) {
          throw new __compactRuntime.CompactError(`size: expected 0 arguments, received ${args_0.length}`);
        }
        return _descriptor_6.fromValue(__compactRuntime.queryLedgerState(context,
                                                                         partialProofData,
                                                                         [
                                                                          { dup: { n: 0 } },
                                                                          { idx: { cached: false,
                                                                                   pushPath: false,
                                                                                   path: [
                                                                                          { tag: 'value',
                                                                                            value: { value: _descriptor_18.toValue(1n),
                                                                                                     alignment: _descriptor_18.alignment() } },
                                                                                          { tag: 'value',
                                                                                            value: { value: _descriptor_18.toValue(13n),
                                                                                                     alignment: _descriptor_18.alignment() } }] } },
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
                                     'lumapay.compact line 100 char 1',
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
                                                                                            value: { value: _descriptor_18.toValue(1n),
                                                                                                     alignment: _descriptor_18.alignment() } },
                                                                                          { tag: 'value',
                                                                                            value: { value: _descriptor_18.toValue(13n),
                                                                                                     alignment: _descriptor_18.alignment() } }] } },
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
                                     'lumapay.compact line 100 char 1',
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
                                                                                            value: { value: _descriptor_18.toValue(1n),
                                                                                                     alignment: _descriptor_18.alignment() } },
                                                                                          { tag: 'value',
                                                                                            value: { value: _descriptor_18.toValue(13n),
                                                                                                     alignment: _descriptor_18.alignment() } }] } },
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
        const self_0 = state.asArray()[1].asArray()[13];
        return self_0.asMap().keys().map(  (key) => {    const value = self_0.asMap().get(key).asCell();    return [      _descriptor_0.fromValue(key.value),      _descriptor_5.fromValue(value.value)    ];  })[Symbol.iterator]();
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
                                                                                          value: { value: _descriptor_18.toValue(1n),
                                                                                                   alignment: _descriptor_18.alignment() } },
                                                                                        { tag: 'value',
                                                                                          value: { value: _descriptor_18.toValue(14n),
                                                                                                   alignment: _descriptor_18.alignment() } }] } },
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
                                 'lumapay.compact line 112 char 1',
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
                                 'lumapay.compact line 119 char 1',
                                 'Bytes<32>',
                                 adminSecret_0)
    }
    return _dummyContract._deriveRegistryAdminAuthorization_0(adminSecret_0);
  },
  deriveQuoteProviderAuthorization: (...args_0) => {
    if (args_0.length !== 2) {
      throw new __compactRuntime.CompactError(`deriveQuoteProviderAuthorization: expected 2 arguments (as invoked from Typescript), received ${args_0.length}`);
    }
    const providerId_0 = args_0[0];
    const providerSecret_0 = args_0[1];
    if (!(providerId_0.buffer instanceof ArrayBuffer && providerId_0.BYTES_PER_ELEMENT === 1 && providerId_0.length === 32)) {
      __compactRuntime.typeError('deriveQuoteProviderAuthorization',
                                 'argument 1',
                                 'lumapay.compact line 126 char 1',
                                 'Bytes<32>',
                                 providerId_0)
    }
    if (!(providerSecret_0.buffer instanceof ArrayBuffer && providerSecret_0.BYTES_PER_ELEMENT === 1 && providerSecret_0.length === 32)) {
      __compactRuntime.typeError('deriveQuoteProviderAuthorization',
                                 'argument 2',
                                 'lumapay.compact line 126 char 1',
                                 'Bytes<32>',
                                 providerSecret_0)
    }
    return _dummyContract._deriveQuoteProviderAuthorization_0(providerId_0,
                                                              providerSecret_0);
  },
  deriveBackupAuthorization: (...args_0) => {
    if (args_0.length !== 2) {
      throw new __compactRuntime.CompactError(`deriveBackupAuthorization: expected 2 arguments (as invoked from Typescript), received ${args_0.length}`);
    }
    const ownerId_0 = args_0[0];
    const backupSecret_0 = args_0[1];
    if (!(ownerId_0.buffer instanceof ArrayBuffer && ownerId_0.BYTES_PER_ELEMENT === 1 && ownerId_0.length === 32)) {
      __compactRuntime.typeError('deriveBackupAuthorization',
                                 'argument 1',
                                 'lumapay.compact line 137 char 1',
                                 'Bytes<32>',
                                 ownerId_0)
    }
    if (!(backupSecret_0.buffer instanceof ArrayBuffer && backupSecret_0.BYTES_PER_ELEMENT === 1 && backupSecret_0.length === 32)) {
      __compactRuntime.typeError('deriveBackupAuthorization',
                                 'argument 2',
                                 'lumapay.compact line 137 char 1',
                                 'Bytes<32>',
                                 backupSecret_0)
    }
    return _dummyContract._deriveBackupAuthorization_0(ownerId_0, backupSecret_0);
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
                                 'lumapay.compact line 148 char 1',
                                 'Bytes<32>',
                                 invoiceId_0)
    }
    if (!(merchantPrivateIdentity_0.buffer instanceof ArrayBuffer && merchantPrivateIdentity_0.BYTES_PER_ELEMENT === 1 && merchantPrivateIdentity_0.length === 32)) {
      __compactRuntime.typeError('deriveInvoiceCommitment',
                                 'argument 2',
                                 'lumapay.compact line 148 char 1',
                                 'Bytes<32>',
                                 merchantPrivateIdentity_0)
    }
    if (!(typeof(amount_0) === 'bigint' && amount_0 >= 0n && amount_0 <= 340282366920938463463374607431768211455n)) {
      __compactRuntime.typeError('deriveInvoiceCommitment',
                                 'argument 3',
                                 'lumapay.compact line 148 char 1',
                                 'Uint<0..340282366920938463463374607431768211456>',
                                 amount_0)
    }
    if (!(tokenId_0.buffer instanceof ArrayBuffer && tokenId_0.BYTES_PER_ELEMENT === 1 && tokenId_0.length === 32)) {
      __compactRuntime.typeError('deriveInvoiceCommitment',
                                 'argument 4',
                                 'lumapay.compact line 148 char 1',
                                 'Bytes<32>',
                                 tokenId_0)
    }
    if (!(invoiceNonce_0.buffer instanceof ArrayBuffer && invoiceNonce_0.BYTES_PER_ELEMENT === 1 && invoiceNonce_0.length === 32)) {
      __compactRuntime.typeError('deriveInvoiceCommitment',
                                 'argument 5',
                                 'lumapay.compact line 148 char 1',
                                 'Bytes<32>',
                                 invoiceNonce_0)
    }
    if (!(randomness_0.buffer instanceof ArrayBuffer && randomness_0.BYTES_PER_ELEMENT === 1 && randomness_0.length === 32)) {
      __compactRuntime.typeError('deriveInvoiceCommitment',
                                 'argument 6',
                                 'lumapay.compact line 148 char 1',
                                 'Bytes<32>',
                                 randomness_0)
    }
    if (!(typeof(expiry_0) === 'bigint' && expiry_0 >= 0n && expiry_0 <= 18446744073709551615n)) {
      __compactRuntime.typeError('deriveInvoiceCommitment',
                                 'argument 7',
                                 'lumapay.compact line 148 char 1',
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
                                 'lumapay.compact line 173 char 1',
                                 'Bytes<32>',
                                 invoiceId_0)
    }
    if (!(paymentSecret_0.buffer instanceof ArrayBuffer && paymentSecret_0.BYTES_PER_ELEMENT === 1 && paymentSecret_0.length === 32)) {
      __compactRuntime.typeError('derivePaymentNullifier',
                                 'argument 2',
                                 'lumapay.compact line 173 char 1',
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
                                 'lumapay.compact line 184 char 1',
                                 'Bytes<32>',
                                 invoiceId_0)
    }
    if (!(merchantClaimSecret_0.buffer instanceof ArrayBuffer && merchantClaimSecret_0.BYTES_PER_ELEMENT === 1 && merchantClaimSecret_0.length === 32)) {
      __compactRuntime.typeError('deriveClaimNullifier',
                                 'argument 2',
                                 'lumapay.compact line 184 char 1',
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
                                 'lumapay.compact line 195 char 1',
                                 'Bytes<32>',
                                 nonce_0)
    }
    if (!(color_0.buffer instanceof ArrayBuffer && color_0.BYTES_PER_ELEMENT === 1 && color_0.length === 32)) {
      __compactRuntime.typeError('deriveEscrowCoinCommitment',
                                 'argument 2',
                                 'lumapay.compact line 195 char 1',
                                 'Bytes<32>',
                                 color_0)
    }
    if (!(typeof(value_0) === 'bigint' && value_0 >= 0n && value_0 <= 340282366920938463463374607431768211455n)) {
      __compactRuntime.typeError('deriveEscrowCoinCommitment',
                                 'argument 3',
                                 'lumapay.compact line 195 char 1',
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
                                 'lumapay.compact line 208 char 1',
                                 'Bytes<32>',
                                 invoiceId_0)
    }
    if (!(settlementNullifier_0.buffer instanceof ArrayBuffer && settlementNullifier_0.BYTES_PER_ELEMENT === 1 && settlementNullifier_0.length === 32)) {
      __compactRuntime.typeError('deriveReceiptCommitment',
                                 'argument 2',
                                 'lumapay.compact line 208 char 1',
                                 'Bytes<32>',
                                 settlementNullifier_0)
    }
    if (!(typeof(amount_0) === 'bigint' && amount_0 >= 0n && amount_0 <= 340282366920938463463374607431768211455n)) {
      __compactRuntime.typeError('deriveReceiptCommitment',
                                 'argument 3',
                                 'lumapay.compact line 208 char 1',
                                 'Uint<0..340282366920938463463374607431768211456>',
                                 amount_0)
    }
    if (!(tokenId_0.buffer instanceof ArrayBuffer && tokenId_0.BYTES_PER_ELEMENT === 1 && tokenId_0.length === 32)) {
      __compactRuntime.typeError('deriveReceiptCommitment',
                                 'argument 4',
                                 'lumapay.compact line 208 char 1',
                                 'Bytes<32>',
                                 tokenId_0)
    }
    if (!(receiptSecret_0.buffer instanceof ArrayBuffer && receiptSecret_0.BYTES_PER_ELEMENT === 1 && receiptSecret_0.length === 32)) {
      __compactRuntime.typeError('deriveReceiptCommitment',
                                 'argument 5',
                                 'lumapay.compact line 208 char 1',
                                 'Bytes<32>',
                                 receiptSecret_0)
    }
    return _dummyContract._deriveReceiptCommitment_0(invoiceId_0,
                                                     settlementNullifier_0,
                                                     amount_0,
                                                     tokenId_0,
                                                     receiptSecret_0);
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
                                 'lumapay.compact line 227 char 1',
                                 'Bytes<32>',
                                 campaignId_0)
    }
    if (!(merchantPrivateIdentity_0.buffer instanceof ArrayBuffer && merchantPrivateIdentity_0.BYTES_PER_ELEMENT === 1 && merchantPrivateIdentity_0.length === 32)) {
      __compactRuntime.typeError('deriveCampaignCommitment',
                                 'argument 2',
                                 'lumapay.compact line 227 char 1',
                                 'Bytes<32>',
                                 merchantPrivateIdentity_0)
    }
    if (!(typeof(minimumContribution_0) === 'bigint' && minimumContribution_0 >= 0n && minimumContribution_0 <= 340282366920938463463374607431768211455n)) {
      __compactRuntime.typeError('deriveCampaignCommitment',
                                 'argument 3',
                                 'lumapay.compact line 227 char 1',
                                 'Uint<0..340282366920938463463374607431768211456>',
                                 minimumContribution_0)
    }
    if (!(typeof(maximumContribution_0) === 'bigint' && maximumContribution_0 >= 0n && maximumContribution_0 <= 340282366920938463463374607431768211455n)) {
      __compactRuntime.typeError('deriveCampaignCommitment',
                                 'argument 4',
                                 'lumapay.compact line 227 char 1',
                                 'Uint<0..340282366920938463463374607431768211456>',
                                 maximumContribution_0)
    }
    if (!(typeof(acceptedTokenCount_0) === 'bigint' && acceptedTokenCount_0 >= 0n && acceptedTokenCount_0 <= 255n)) {
      __compactRuntime.typeError('deriveCampaignCommitment',
                                 'argument 5',
                                 'lumapay.compact line 227 char 1',
                                 'Uint<0..256>',
                                 acceptedTokenCount_0)
    }
    if (!(acceptedTokenA_0.buffer instanceof ArrayBuffer && acceptedTokenA_0.BYTES_PER_ELEMENT === 1 && acceptedTokenA_0.length === 32)) {
      __compactRuntime.typeError('deriveCampaignCommitment',
                                 'argument 6',
                                 'lumapay.compact line 227 char 1',
                                 'Bytes<32>',
                                 acceptedTokenA_0)
    }
    if (!(acceptedTokenB_0.buffer instanceof ArrayBuffer && acceptedTokenB_0.BYTES_PER_ELEMENT === 1 && acceptedTokenB_0.length === 32)) {
      __compactRuntime.typeError('deriveCampaignCommitment',
                                 'argument 7',
                                 'lumapay.compact line 227 char 1',
                                 'Bytes<32>',
                                 acceptedTokenB_0)
    }
    if (!(acceptedTokenC_0.buffer instanceof ArrayBuffer && acceptedTokenC_0.BYTES_PER_ELEMENT === 1 && acceptedTokenC_0.length === 32)) {
      __compactRuntime.typeError('deriveCampaignCommitment',
                                 'argument 8',
                                 'lumapay.compact line 227 char 1',
                                 'Bytes<32>',
                                 acceptedTokenC_0)
    }
    if (!(acceptedTokenD_0.buffer instanceof ArrayBuffer && acceptedTokenD_0.BYTES_PER_ELEMENT === 1 && acceptedTokenD_0.length === 32)) {
      __compactRuntime.typeError('deriveCampaignCommitment',
                                 'argument 9',
                                 'lumapay.compact line 227 char 1',
                                 'Bytes<32>',
                                 acceptedTokenD_0)
    }
    if (!(campaignNonce_0.buffer instanceof ArrayBuffer && campaignNonce_0.BYTES_PER_ELEMENT === 1 && campaignNonce_0.length === 32)) {
      __compactRuntime.typeError('deriveCampaignCommitment',
                                 'argument 10',
                                 'lumapay.compact line 227 char 1',
                                 'Bytes<32>',
                                 campaignNonce_0)
    }
    if (!(randomness_0.buffer instanceof ArrayBuffer && randomness_0.BYTES_PER_ELEMENT === 1 && randomness_0.length === 32)) {
      __compactRuntime.typeError('deriveCampaignCommitment',
                                 'argument 11',
                                 'lumapay.compact line 227 char 1',
                                 'Bytes<32>',
                                 randomness_0)
    }
    if (!(typeof(expiry_0) === 'bigint' && expiry_0 >= 0n && expiry_0 <= 18446744073709551615n)) {
      __compactRuntime.typeError('deriveCampaignCommitment',
                                 'argument 12',
                                 'lumapay.compact line 227 char 1',
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
                                 'lumapay.compact line 263 char 1',
                                 'Bytes<32>',
                                 campaignId_0)
    }
    if (!(contributionSecret_0.buffer instanceof ArrayBuffer && contributionSecret_0.BYTES_PER_ELEMENT === 1 && contributionSecret_0.length === 32)) {
      __compactRuntime.typeError('deriveContributionNullifier',
                                 'argument 2',
                                 'lumapay.compact line 263 char 1',
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
                                 'lumapay.compact line 274 char 1',
                                 'Bytes<32>',
                                 campaignId_0)
    }
    if (!(contributionNullifier_0.buffer instanceof ArrayBuffer && contributionNullifier_0.BYTES_PER_ELEMENT === 1 && contributionNullifier_0.length === 32)) {
      __compactRuntime.typeError('deriveContributionId',
                                 'argument 2',
                                 'lumapay.compact line 274 char 1',
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
                                 'lumapay.compact line 285 char 1',
                                 'Bytes<32>',
                                 contributionId_0)
    }
    if (!(contributionNullifier_0.buffer instanceof ArrayBuffer && contributionNullifier_0.BYTES_PER_ELEMENT === 1 && contributionNullifier_0.length === 32)) {
      __compactRuntime.typeError('deriveContributionReceiptCommitment',
                                 'argument 2',
                                 'lumapay.compact line 285 char 1',
                                 'Bytes<32>',
                                 contributionNullifier_0)
    }
    if (!(typeof(amount_0) === 'bigint' && amount_0 >= 0n && amount_0 <= 340282366920938463463374607431768211455n)) {
      __compactRuntime.typeError('deriveContributionReceiptCommitment',
                                 'argument 3',
                                 'lumapay.compact line 285 char 1',
                                 'Uint<0..340282366920938463463374607431768211456>',
                                 amount_0)
    }
    if (!(tokenId_0.buffer instanceof ArrayBuffer && tokenId_0.BYTES_PER_ELEMENT === 1 && tokenId_0.length === 32)) {
      __compactRuntime.typeError('deriveContributionReceiptCommitment',
                                 'argument 4',
                                 'lumapay.compact line 285 char 1',
                                 'Bytes<32>',
                                 tokenId_0)
    }
    if (!(receiptSecret_0.buffer instanceof ArrayBuffer && receiptSecret_0.BYTES_PER_ELEMENT === 1 && receiptSecret_0.length === 32)) {
      __compactRuntime.typeError('deriveContributionReceiptCommitment',
                                 'argument 5',
                                 'lumapay.compact line 285 char 1',
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
                                 'lumapay.compact line 304 char 1',
                                 'Bytes<32>',
                                 contributionId_0)
    }
    if (!(merchantClaimSecret_0.buffer instanceof ArrayBuffer && merchantClaimSecret_0.BYTES_PER_ELEMENT === 1 && merchantClaimSecret_0.length === 32)) {
      __compactRuntime.typeError('deriveContributionClaimNullifier',
                                 'argument 2',
                                 'lumapay.compact line 304 char 1',
                                 'Bytes<32>',
                                 merchantClaimSecret_0)
    }
    return _dummyContract._deriveContributionClaimNullifier_0(contributionId_0,
                                                              merchantClaimSecret_0);
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
                                 'lumapay.compact line 315 char 1',
                                 'Bytes<32>',
                                 giftCardId_0)
    }
    if (!(typeof(amount_0) === 'bigint' && amount_0 >= 0n && amount_0 <= 340282366920938463463374607431768211455n)) {
      __compactRuntime.typeError('deriveGiftCardCommitment',
                                 'argument 2',
                                 'lumapay.compact line 315 char 1',
                                 'Uint<0..340282366920938463463374607431768211456>',
                                 amount_0)
    }
    if (!(tokenId_0.buffer instanceof ArrayBuffer && tokenId_0.BYTES_PER_ELEMENT === 1 && tokenId_0.length === 32)) {
      __compactRuntime.typeError('deriveGiftCardCommitment',
                                 'argument 3',
                                 'lumapay.compact line 315 char 1',
                                 'Bytes<32>',
                                 tokenId_0)
    }
    if (!(giftSecret_0.buffer instanceof ArrayBuffer && giftSecret_0.BYTES_PER_ELEMENT === 1 && giftSecret_0.length === 32)) {
      __compactRuntime.typeError('deriveGiftCardCommitment',
                                 'argument 4',
                                 'lumapay.compact line 315 char 1',
                                 'Bytes<32>',
                                 giftSecret_0)
    }
    if (!(randomness_0.buffer instanceof ArrayBuffer && randomness_0.BYTES_PER_ELEMENT === 1 && randomness_0.length === 32)) {
      __compactRuntime.typeError('deriveGiftCardCommitment',
                                 'argument 5',
                                 'lumapay.compact line 315 char 1',
                                 'Bytes<32>',
                                 randomness_0)
    }
    if (!(typeof(expiry_0) === 'bigint' && expiry_0 >= 0n && expiry_0 <= 18446744073709551615n)) {
      __compactRuntime.typeError('deriveGiftCardCommitment',
                                 'argument 6',
                                 'lumapay.compact line 315 char 1',
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
                                 'lumapay.compact line 338 char 1',
                                 'Bytes<32>',
                                 giftCardId_0)
    }
    if (!(issuerSecret_0.buffer instanceof ArrayBuffer && issuerSecret_0.BYTES_PER_ELEMENT === 1 && issuerSecret_0.length === 32)) {
      __compactRuntime.typeError('deriveGiftCardIssuerAuthorization',
                                 'argument 2',
                                 'lumapay.compact line 338 char 1',
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
                                 'lumapay.compact line 349 char 1',
                                 'Bytes<32>',
                                 giftCardId_0)
    }
    if (!(giftSecret_0.buffer instanceof ArrayBuffer && giftSecret_0.BYTES_PER_ELEMENT === 1 && giftSecret_0.length === 32)) {
      __compactRuntime.typeError('deriveGiftCardRedemptionNullifier',
                                 'argument 2',
                                 'lumapay.compact line 349 char 1',
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
                                 'lumapay.compact line 360 char 1',
                                 'Bytes<32>',
                                 giftCardId_0)
    }
    if (!(issuerSecret_0.buffer instanceof ArrayBuffer && issuerSecret_0.BYTES_PER_ELEMENT === 1 && issuerSecret_0.length === 32)) {
      __compactRuntime.typeError('deriveGiftCardReclaimNullifier',
                                 'argument 2',
                                 'lumapay.compact line 360 char 1',
                                 'Bytes<32>',
                                 issuerSecret_0)
    }
    return _dummyContract._deriveGiftCardReclaimNullifier_0(giftCardId_0,
                                                            issuerSecret_0);
  },
  deriveQuoteCommitment: (...args_0) => {
    if (args_0.length !== 9) {
      throw new __compactRuntime.CompactError(`deriveQuoteCommitment: expected 9 arguments (as invoked from Typescript), received ${args_0.length}`);
    }
    const quoteId_0 = args_0[0];
    const providerId_0 = args_0[1];
    const invoiceId_0 = args_0[2];
    const requestedToken_0 = args_0[3];
    const requestedAmount_0 = args_0[4];
    const paymentToken_0 = args_0[5];
    const acceptedPaymentAmount_0 = args_0[6];
    const expiry_0 = args_0[7];
    const randomness_0 = args_0[8];
    if (!(quoteId_0.buffer instanceof ArrayBuffer && quoteId_0.BYTES_PER_ELEMENT === 1 && quoteId_0.length === 32)) {
      __compactRuntime.typeError('deriveQuoteCommitment',
                                 'argument 1',
                                 'lumapay.compact line 371 char 1',
                                 'Bytes<32>',
                                 quoteId_0)
    }
    if (!(providerId_0.buffer instanceof ArrayBuffer && providerId_0.BYTES_PER_ELEMENT === 1 && providerId_0.length === 32)) {
      __compactRuntime.typeError('deriveQuoteCommitment',
                                 'argument 2',
                                 'lumapay.compact line 371 char 1',
                                 'Bytes<32>',
                                 providerId_0)
    }
    if (!(invoiceId_0.buffer instanceof ArrayBuffer && invoiceId_0.BYTES_PER_ELEMENT === 1 && invoiceId_0.length === 32)) {
      __compactRuntime.typeError('deriveQuoteCommitment',
                                 'argument 3',
                                 'lumapay.compact line 371 char 1',
                                 'Bytes<32>',
                                 invoiceId_0)
    }
    if (!(requestedToken_0.buffer instanceof ArrayBuffer && requestedToken_0.BYTES_PER_ELEMENT === 1 && requestedToken_0.length === 32)) {
      __compactRuntime.typeError('deriveQuoteCommitment',
                                 'argument 4',
                                 'lumapay.compact line 371 char 1',
                                 'Bytes<32>',
                                 requestedToken_0)
    }
    if (!(typeof(requestedAmount_0) === 'bigint' && requestedAmount_0 >= 0n && requestedAmount_0 <= 340282366920938463463374607431768211455n)) {
      __compactRuntime.typeError('deriveQuoteCommitment',
                                 'argument 5',
                                 'lumapay.compact line 371 char 1',
                                 'Uint<0..340282366920938463463374607431768211456>',
                                 requestedAmount_0)
    }
    if (!(paymentToken_0.buffer instanceof ArrayBuffer && paymentToken_0.BYTES_PER_ELEMENT === 1 && paymentToken_0.length === 32)) {
      __compactRuntime.typeError('deriveQuoteCommitment',
                                 'argument 6',
                                 'lumapay.compact line 371 char 1',
                                 'Bytes<32>',
                                 paymentToken_0)
    }
    if (!(typeof(acceptedPaymentAmount_0) === 'bigint' && acceptedPaymentAmount_0 >= 0n && acceptedPaymentAmount_0 <= 340282366920938463463374607431768211455n)) {
      __compactRuntime.typeError('deriveQuoteCommitment',
                                 'argument 7',
                                 'lumapay.compact line 371 char 1',
                                 'Uint<0..340282366920938463463374607431768211456>',
                                 acceptedPaymentAmount_0)
    }
    if (!(typeof(expiry_0) === 'bigint' && expiry_0 >= 0n && expiry_0 <= 18446744073709551615n)) {
      __compactRuntime.typeError('deriveQuoteCommitment',
                                 'argument 8',
                                 'lumapay.compact line 371 char 1',
                                 'Uint<0..18446744073709551616>',
                                 expiry_0)
    }
    if (!(randomness_0.buffer instanceof ArrayBuffer && randomness_0.BYTES_PER_ELEMENT === 1 && randomness_0.length === 32)) {
      __compactRuntime.typeError('deriveQuoteCommitment',
                                 'argument 9',
                                 'lumapay.compact line 371 char 1',
                                 'Bytes<32>',
                                 randomness_0)
    }
    return _dummyContract._deriveQuoteCommitment_0(quoteId_0,
                                                   providerId_0,
                                                   invoiceId_0,
                                                   requestedToken_0,
                                                   requestedAmount_0,
                                                   paymentToken_0,
                                                   acceptedPaymentAmount_0,
                                                   expiry_0,
                                                   randomness_0);
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
                                 'lumapay.compact line 565 char 1',
                                 'Bytes<32>',
                                 invoiceId_0)
    }
    if (!(settlementNullifier_0.buffer instanceof ArrayBuffer && settlementNullifier_0.BYTES_PER_ELEMENT === 1 && settlementNullifier_0.length === 32)) {
      __compactRuntime.typeError('verifyReceipt',
                                 'argument 2',
                                 'lumapay.compact line 565 char 1',
                                 'Bytes<32>',
                                 settlementNullifier_0)
    }
    if (!(typeof(amount_0) === 'bigint' && amount_0 >= 0n && amount_0 <= 340282366920938463463374607431768211455n)) {
      __compactRuntime.typeError('verifyReceipt',
                                 'argument 3',
                                 'lumapay.compact line 565 char 1',
                                 'Uint<0..340282366920938463463374607431768211456>',
                                 amount_0)
    }
    if (!(tokenId_0.buffer instanceof ArrayBuffer && tokenId_0.BYTES_PER_ELEMENT === 1 && tokenId_0.length === 32)) {
      __compactRuntime.typeError('verifyReceipt',
                                 'argument 4',
                                 'lumapay.compact line 565 char 1',
                                 'Bytes<32>',
                                 tokenId_0)
    }
    if (!(receiptSecret_0.buffer instanceof ArrayBuffer && receiptSecret_0.BYTES_PER_ELEMENT === 1 && receiptSecret_0.length === 32)) {
      __compactRuntime.typeError('verifyReceipt',
                                 'argument 5',
                                 'lumapay.compact line 565 char 1',
                                 'Bytes<32>',
                                 receiptSecret_0)
    }
    if (!(expectedReceiptCommitment_0.buffer instanceof ArrayBuffer && expectedReceiptCommitment_0.BYTES_PER_ELEMENT === 1 && expectedReceiptCommitment_0.length === 32)) {
      __compactRuntime.typeError('verifyReceipt',
                                 'argument 6',
                                 'lumapay.compact line 565 char 1',
                                 'Bytes<32>',
                                 expectedReceiptCommitment_0)
    }
    return _dummyContract._verifyReceipt_0(invoiceId_0,
                                           settlementNullifier_0,
                                           amount_0,
                                           tokenId_0,
                                           receiptSecret_0,
                                           expectedReceiptCommitment_0);
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
                                 'lumapay.compact line 767 char 1',
                                 'Bytes<32>',
                                 contributionId_0)
    }
    if (!(contributionNullifier_0.buffer instanceof ArrayBuffer && contributionNullifier_0.BYTES_PER_ELEMENT === 1 && contributionNullifier_0.length === 32)) {
      __compactRuntime.typeError('verifyContributionReceipt',
                                 'argument 2',
                                 'lumapay.compact line 767 char 1',
                                 'Bytes<32>',
                                 contributionNullifier_0)
    }
    if (!(typeof(amount_0) === 'bigint' && amount_0 >= 0n && amount_0 <= 340282366920938463463374607431768211455n)) {
      __compactRuntime.typeError('verifyContributionReceipt',
                                 'argument 3',
                                 'lumapay.compact line 767 char 1',
                                 'Uint<0..340282366920938463463374607431768211456>',
                                 amount_0)
    }
    if (!(tokenId_0.buffer instanceof ArrayBuffer && tokenId_0.BYTES_PER_ELEMENT === 1 && tokenId_0.length === 32)) {
      __compactRuntime.typeError('verifyContributionReceipt',
                                 'argument 4',
                                 'lumapay.compact line 767 char 1',
                                 'Bytes<32>',
                                 tokenId_0)
    }
    if (!(receiptSecret_0.buffer instanceof ArrayBuffer && receiptSecret_0.BYTES_PER_ELEMENT === 1 && receiptSecret_0.length === 32)) {
      __compactRuntime.typeError('verifyContributionReceipt',
                                 'argument 5',
                                 'lumapay.compact line 767 char 1',
                                 'Bytes<32>',
                                 receiptSecret_0)
    }
    if (!(expectedReceiptCommitment_0.buffer instanceof ArrayBuffer && expectedReceiptCommitment_0.BYTES_PER_ELEMENT === 1 && expectedReceiptCommitment_0.length === 32)) {
      __compactRuntime.typeError('verifyContributionReceipt',
                                 'argument 6',
                                 'lumapay.compact line 767 char 1',
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
