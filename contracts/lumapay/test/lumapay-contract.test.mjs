import assert from 'node:assert/strict';
import { readFileSync, readdirSync, statSync } from 'node:fs';
import { join } from 'node:path';
import { describe, test } from 'node:test';
import {
    createCircuitContext,
    createConstructorContext,
    sampleContractAddress
} from '@midnight-ntwrk/compact-runtime';
import {
    CampaignStatus,
    Contract,
    GiftCardStatus,
    InvoiceStatus,
    ledger,
    pureCircuits
} from '../src/managed/lumapay/contract/index.js';

const bytes = (seed) => new Uint8Array(32).fill(seed % 256);
const asHex = (value) => Buffer.from(value).toString('hex');

class ContractHarness {
    constructor({ time = 1_000 } = {}) {
        this.time = time;
        this.adminSecret = bytes(1);
        this.contract = new Contract({});
        this.contractAddress = sampleContractAddress();
        this.defaultCaller = bytes(2);

        const initial = this.contract.initialState(
            createConstructorContext(undefined, { bytes: this.defaultCaller }),
            pureCircuits.deriveRegistryAdminAuthorization(this.adminSecret)
        );
        this.state = initial.currentContractState;
    }

    call(circuit, args, { caller = this.defaultCaller, time = this.time } = {}) {
        const context = createCircuitContext(
            this.contractAddress,
            { bytes: caller },
            this.state,
            undefined,
            undefined,
            undefined,
            time
        );
        const result = this.contract.impureCircuits[circuit](context, ...args);
        this.state = result.context.currentQueryContext.state;
        return result;
    }

    readLedger() {
        return ledger('data' in this.state ? this.state.data : this.state);
    }
}

function createInvoice(harness, base = 10, overrides = {}) {
    const invoice = {
        id: bytes(base),
        merchantIdentity: bytes(base + 1),
        amount: 5_000_000n,
        token: bytes(base + 2),
        invoiceNonce: bytes(base + 3),
        randomness: bytes(base + 4),
        paymentSecret: bytes(base + 5),
        receiptSecret: bytes(base + 6),
        merchantSecret: bytes(base + 7),
        coinNonce: bytes(base + 8),
        expiry: 2_000n,
        ...overrides
    };
    invoice.commitment = pureCircuits.deriveInvoiceCommitment(
        invoice.id,
        invoice.merchantIdentity,
        invoice.amount,
        invoice.token,
        invoice.invoiceNonce,
        invoice.randomness,
        invoice.expiry
    );
    invoice.merchantAuthorization = pureCircuits.deriveMerchantAuthorization(
        invoice.merchantSecret
    );
    invoice.coin = {
        nonce: invoice.coinNonce,
        color: invoice.token,
        value: invoice.amount
    };
    invoice.qualifiedCoin = { ...invoice.coin, mt_index: 0n };

    harness.call('createInvoice', [
        invoice.id,
        invoice.commitment,
        invoice.merchantAuthorization,
        invoice.expiry
    ]);
    return invoice;
}

function payInvoice(harness, invoice, overrides = {}, options = {}) {
    const values = { ...invoice, ...overrides };
    return harness.call('payInvoice', [
        values.id,
        values.merchantIdentity,
        values.amount,
        values.token,
        values.invoiceNonce,
        values.randomness,
        values.paymentSecret,
        values.receiptSecret,
        values.coin
    ], options);
}

function createCampaign(harness, base = 60, overrides = {}) {
    const campaign = {
        id: bytes(base),
        merchantIdentity: bytes(base + 1),
        minimum: 1_000n,
        maximum: 10_000n,
        tokenCount: 2n,
        tokenA: bytes(base + 2),
        tokenB: bytes(base + 3),
        tokenC: bytes(base + 4),
        tokenD: bytes(base + 5),
        nonce: bytes(base + 6),
        randomness: bytes(base + 7),
        merchantSecret: bytes(base + 8),
        expiry: 2_000n,
        ...overrides
    };
    campaign.commitment = pureCircuits.deriveCampaignCommitment(
        campaign.id,
        campaign.merchantIdentity,
        campaign.minimum,
        campaign.maximum,
        campaign.tokenCount,
        campaign.tokenA,
        campaign.tokenB,
        campaign.tokenC,
        campaign.tokenD,
        campaign.nonce,
        campaign.randomness,
        campaign.expiry
    );
    campaign.merchantAuthorization = pureCircuits.deriveMerchantAuthorization(
        campaign.merchantSecret
    );
    harness.call('createCampaign', [
        campaign.id,
        campaign.commitment,
        campaign.merchantAuthorization,
        campaign.expiry
    ]);
    return campaign;
}

function contribute(harness, campaign, base = 90, overrides = {}, options = {}) {
    const contribution = {
        secret: bytes(base),
        receiptSecret: bytes(base + 1),
        coin: {
            nonce: bytes(base + 2),
            color: campaign.tokenA,
            value: 2_500n
        },
        ...overrides
    };
    contribution.nullifier = pureCircuits.deriveContributionNullifier(
        campaign.id,
        contribution.secret
    );
    contribution.id = pureCircuits.deriveContributionId(
        campaign.id,
        contribution.nullifier
    );
    contribution.qualifiedCoin = { ...contribution.coin, mt_index: 0n };

    const result = harness.call('contribute', [
        campaign.id,
        campaign.merchantIdentity,
        campaign.minimum,
        campaign.maximum,
        campaign.tokenCount,
        campaign.tokenA,
        campaign.tokenB,
        campaign.tokenC,
        campaign.tokenD,
        campaign.nonce,
        campaign.randomness,
        contribution.secret,
        contribution.receiptSecret,
        contribution.coin
    ], options);
    return { ...contribution, result };
}

function createGiftCard(harness, base = 120, overrides = {}) {
    const gift = {
        id: bytes(base),
        amount: 3_000n,
        token: bytes(base + 1),
        giftSecret: bytes(base + 2),
        randomness: bytes(base + 3),
        issuerSecret: bytes(base + 4),
        coinNonce: bytes(base + 5),
        expiry: 2_000n,
        ...overrides
    };
    gift.issuerAuthorization = pureCircuits.deriveGiftCardIssuerAuthorization(
        gift.id,
        gift.issuerSecret
    );
    gift.coin = { nonce: gift.coinNonce, color: gift.token, value: gift.amount };
    gift.qualifiedCoin = { ...gift.coin, mt_index: 0n };
    harness.call('createGiftCard', [
        gift.id,
        gift.amount,
        gift.token,
        gift.giftSecret,
        gift.randomness,
        gift.issuerAuthorization,
        gift.expiry,
        gift.coin
    ]);
    return gift;
}

function registerProvider(harness, base = 150) {
    const provider = {
        id: bytes(base),
        secret: bytes(base + 1)
    };
    provider.authorization = pureCircuits.deriveQuoteProviderAuthorization(
        provider.id,
        provider.secret
    );
    harness.call('registerQuoteProvider', [
        provider.id,
        provider.authorization,
        harness.adminSecret
    ]);
    return provider;
}

function registerQuote(harness, invoice, provider, base = 160, overrides = {}) {
    const quote = {
        id: bytes(base),
        paymentToken: bytes(base + 1),
        acceptedPaymentAmount: 7_250n,
        expiry: 1_500n,
        randomness: bytes(base + 2),
        ...overrides
    };
    quote.commitment = pureCircuits.deriveQuoteCommitment(
        quote.id,
        provider.id,
        invoice.id,
        invoice.token,
        invoice.amount,
        quote.paymentToken,
        quote.acceptedPaymentAmount,
        quote.expiry,
        quote.randomness
    );
    harness.call('registerQuote', [
        quote.id,
        provider.id,
        quote.commitment,
        quote.expiry,
        provider.secret
    ]);
    quote.coin = {
        nonce: bytes(base + 3),
        color: quote.paymentToken,
        value: quote.acceptedPaymentAmount
    };
    return quote;
}

function payWithQuote(harness, invoice, provider, quote, overrides = {}, options = {}) {
    const values = {
        invoiceId: invoice.id,
        merchantIdentity: invoice.merchantIdentity,
        requestedAmount: invoice.amount,
        requestedToken: invoice.token,
        invoiceNonce: invoice.invoiceNonce,
        invoiceRandomness: invoice.randomness,
        quoteId: quote.id,
        providerId: provider.id,
        paymentToken: quote.paymentToken,
        acceptedPaymentAmount: quote.acceptedPaymentAmount,
        quoteRandomness: quote.randomness,
        paymentSecret: invoice.paymentSecret,
        receiptSecret: invoice.receiptSecret,
        coin: quote.coin,
        ...overrides
    };
    return harness.call('payInvoiceWithQuote', [
        values.invoiceId,
        values.merchantIdentity,
        values.requestedAmount,
        values.requestedToken,
        values.invoiceNonce,
        values.invoiceRandomness,
        values.quoteId,
        values.providerId,
        values.paymentToken,
        values.acceptedPaymentAmount,
        values.quoteRandomness,
        values.paymentSecret,
        values.receiptSecret,
        values.coin
    ], options);
}

describe('LumaPay single-pay invoice settlement', () => {
    test('creates, settles, receipts, and lets only the authenticated merchant claim', () => {
        const harness = new ContractHarness();
        const invoice = createInvoice(harness);
        const open = harness.readLedger().invoices.lookup(invoice.id);
        assert.equal(open.status, InvoiceStatus.OPEN);
        assert.deepEqual(Object.keys(open).sort(), [
            'claimed',
            'commitment',
            'commitmentVersion',
            'escrowCoinCommitment',
            'expiry',
            'merchantAuthorization',
            'receiptCommitment',
            'settlementNullifier',
            'status'
        ]);

        payInvoice(harness, invoice, {}, { caller: bytes(30) });
        const settled = harness.readLedger().invoices.lookup(invoice.id);
        assert.equal(settled.status, InvoiceStatus.SETTLED);
        assert.equal(settled.claimed, false);
        assert.equal(
            pureCircuits.verifyReceipt(
                invoice.id,
                settled.settlementNullifier,
                invoice.amount,
                invoice.token,
                invoice.receiptSecret,
                settled.receiptCommitment
            ),
            true
        );

        const merchantCaller = bytes(31);
        const claim = harness.call('claimInvoice', [
            invoice.id,
            invoice.merchantSecret,
            invoice.qualifiedCoin
        ], { caller: merchantCaller });
        assert.equal(claim.result.sent.value, invoice.amount);
        assert.equal(claim.result.change.is_some, false);
        assert.equal(
            asHex(claim.context.currentZswapLocalState.outputs[0].recipient.left.bytes),
            asHex(merchantCaller)
        );
        assert.equal(harness.readLedger().invoices.lookup(invoice.id).claimed, true);
    });

    test('rejects duplicate invoice creation and duplicate payment execution', () => {
        const harness = new ContractHarness();
        const invoice = createInvoice(harness);
        assert.throws(() => harness.call('createInvoice', [
            invoice.id,
            invoice.commitment,
            invoice.merchantAuthorization,
            invoice.expiry
        ]), /invoice already exists/);

        payInvoice(harness, invoice);
        assert.throws(() => payInvoice(harness, invoice), /invoice is not open/);
        assert.equal(harness.readLedger().paymentNullifiers.size(), 1n);
    });

    test('enforces expiry on-chain and records the EXPIRED terminal state', () => {
        const harness = new ContractHarness();
        const invoice = createInvoice(harness, 20, { expiry: 1_100n });
        assert.throws(
            () => payInvoice(harness, invoice, {}, { time: 1_100 }),
            /invoice has expired/
        );
        assert.throws(
            () => harness.call('expireInvoice', [invoice.id], { time: 1_099 }),
            /invoice has not expired/
        );
        harness.call('expireInvoice', [invoice.id], { time: 1_100 });
        assert.equal(harness.readLedger().invoices.lookup(invoice.id).status, InvoiceStatus.EXPIRED);
        assert.throws(() => payInvoice(harness, invoice), /invoice is not open/);
    });

    test('rejects wrong opening secret, amount, token, and coin', () => {
        const harness = new ContractHarness();
        const invoice = createInvoice(harness);
        assert.throws(
            () => payInvoice(harness, invoice, { randomness: bytes(250) }),
            /invalid invoice opening/
        );
        assert.throws(
            () => payInvoice(harness, invoice, { amount: invoice.amount + 1n }),
            /invalid invoice opening/
        );
        assert.throws(
            () => payInvoice(harness, invoice, { token: bytes(249) }),
            /invalid invoice opening/
        );
        assert.throws(
            () => payInvoice(harness, invoice, {
                coin: { ...invoice.coin, value: invoice.amount - 1n }
            }),
            /wrong payment amount/
        );
        assert.throws(
            () => payInvoice(harness, invoice, {
                coin: { ...invoice.coin, color: bytes(248) }
            }),
            /wrong payment token/
        );
        assert.equal(harness.readLedger().invoices.lookup(invoice.id).status, InvoiceStatus.OPEN);
    });

    test('rejects unauthorized, wrong-coin, and repeated claims', () => {
        const harness = new ContractHarness();
        const invoice = createInvoice(harness);
        payInvoice(harness, invoice);
        assert.throws(() => harness.call('claimInvoice', [
            invoice.id,
            bytes(240),
            invoice.qualifiedCoin
        ]), /unauthorized claim/);
        assert.throws(() => harness.call('claimInvoice', [
            invoice.id,
            invoice.merchantSecret,
            { ...invoice.qualifiedCoin, nonce: bytes(239) }
        ]), /wrong escrow coin/);

        harness.call('claimInvoice', [
            invoice.id,
            invoice.merchantSecret,
            invoice.qualifiedCoin
        ]);
        assert.throws(() => harness.call('claimInvoice', [
            invoice.id,
            invoice.merchantSecret,
            invoice.qualifiedCoin
        ]), /invoice already claimed/);
        assert.equal(harness.readLedger().claimNullifiers.size(), 1n);
    });

    test('allows only the merchant to cancel and makes cancellation terminal', () => {
        const harness = new ContractHarness();
        const invoice = createInvoice(harness);
        assert.throws(
            () => harness.call('cancelInvoice', [invoice.id, bytes(230)]),
            /unauthorized cancellation/
        );
        harness.call('cancelInvoice', [invoice.id, invoice.merchantSecret]);
        assert.equal(harness.readLedger().invoices.lookup(invoice.id).status, InvoiceStatus.CANCELLED);
        assert.throws(() => payInvoice(harness, invoice), /invoice is not open/);
        assert.throws(
            () => harness.call('cancelInvoice', [invoice.id, invoice.merchantSecret]),
            /invoice is not open/
        );
    });

    test('keeps batch orchestration safe through per-invoice atomic validation', () => {
        const harness = new ContractHarness();
        const first = createInvoice(harness, 10);
        const second = createInvoice(harness, 40);
        payInvoice(harness, first);
        assert.throws(() => payInvoice(harness, second, {
            coin: { ...second.coin, value: second.amount - 1n }
        }), /wrong payment amount/);

        let state = harness.readLedger();
        assert.equal(state.invoices.lookup(first.id).status, InvoiceStatus.SETTLED);
        assert.equal(state.invoices.lookup(second.id).status, InvoiceStatus.OPEN);
        payInvoice(harness, second);
        state = harness.readLedger();
        assert.equal(state.invoices.lookup(second.id).status, InvoiceStatus.SETTLED);
    });

    test('receipt verification and selective settlement proof reject altered disclosures', () => {
        const harness = new ContractHarness();
        const invoice = createInvoice(harness);
        payInvoice(harness, invoice);
        const settled = harness.readLedger().invoices.lookup(invoice.id);

        assert.equal(pureCircuits.verifyReceipt(
            invoice.id,
            settled.settlementNullifier,
            invoice.amount + 1n,
            invoice.token,
            invoice.receiptSecret,
            settled.receiptCommitment
        ), false);
        harness.call('proveInvoiceSettlement', [
            invoice.id,
            invoice.amount,
            invoice.token,
            invoice.receiptSecret
        ]);
        assert.throws(() => harness.call('proveInvoiceSettlement', [
            invoice.id,
            invoice.amount + 1n,
            invoice.token,
            invoice.receiptSecret
        ]), /invalid settlement disclosure/);
    });
});

describe('LumaPay multi-pay campaigns', () => {
    test('tracks independent contributions, nullifiers, receipts, and claims', () => {
        const harness = new ContractHarness();
        const campaign = createCampaign(harness);
        const first = contribute(harness, campaign, 90);
        const second = contribute(harness, campaign, 100, {
            coin: { nonce: bytes(102), color: campaign.tokenB, value: 5_000n }
        });

        const state = harness.readLedger();
        assert.equal(state.campaigns.lookup(campaign.id).contributionCount, 2n);
        assert.equal(state.contributionNullifiers.size(), 2n);
        assert.equal(state.contributions.lookup(first.id).claimed, false);
        assert.equal(
            pureCircuits.verifyContributionReceipt(
                first.id,
                first.nullifier,
                first.coin.value,
                first.coin.color,
                first.receiptSecret,
                state.contributions.lookup(first.id).receiptCommitment
            ),
            true
        );

        harness.call('claimContribution', [
            first.id,
            campaign.merchantSecret,
            first.qualifiedCoin
        ]);
        assert.equal(harness.readLedger().contributions.lookup(first.id).claimed, true);
        assert.equal(harness.readLedger().contributions.lookup(second.id).claimed, false);
    });

    test('rejects contribution replay, invalid amount, wrong token, and expired campaign', () => {
        const harness = new ContractHarness();
        const campaign = createCampaign(harness, 60, { expiry: 1_100n });
        const contribution = contribute(harness, campaign);
        assert.throws(
            () => contribute(harness, campaign, 90),
            /contribution replay/
        );
        assert.throws(
            () => contribute(harness, campaign, 110, {
                coin: { nonce: bytes(112), color: campaign.tokenA, value: campaign.minimum - 1n }
            }),
            /contribution amount outside campaign range/
        );
        assert.throws(
            () => contribute(harness, campaign, 115, {
                coin: { nonce: bytes(117), color: bytes(220), value: 2_000n }
            }),
            /token not accepted by campaign/
        );
        assert.throws(
            () => contribute(harness, campaign, 120, {}, { time: 1_100 }),
            /campaign has expired/
        );
        assert.equal(harness.readLedger().contributionIds.size(), 1n);
        assert.equal(asHex(contribution.id), asHex(
            pureCircuits.deriveContributionId(campaign.id, contribution.nullifier)
        ));
    });

    test('authorizes campaign closure and still permits claims for accepted funds', () => {
        const harness = new ContractHarness();
        const campaign = createCampaign(harness);
        const contribution = contribute(harness, campaign);
        assert.throws(
            () => harness.call('cancelCampaign', [campaign.id, bytes(210)]),
            /unauthorized campaign cancellation/
        );
        harness.call('cancelCampaign', [campaign.id, campaign.merchantSecret]);
        assert.equal(harness.readLedger().campaigns.lookup(campaign.id).status, CampaignStatus.CANCELLED);
        assert.throws(() => contribute(harness, campaign, 130), /campaign is not open/);
        assert.throws(() => harness.call('claimContribution', [
            contribution.id,
            bytes(209),
            contribution.qualifiedCoin
        ]), /unauthorized contribution claim/);
        harness.call('claimContribution', [
            contribution.id,
            campaign.merchantSecret,
            contribution.qualifiedCoin
        ]);
        assert.equal(harness.readLedger().contributions.lookup(contribution.id).claimed, true);
    });

    test('marks an elapsed campaign expired and proves a contribution selectively', () => {
        const harness = new ContractHarness();
        const campaign = createCampaign(harness, 60, { expiry: 1_100n });
        const contribution = contribute(harness, campaign);
        harness.call('proveContributionSettlement', [
            contribution.id,
            contribution.coin.value,
            contribution.coin.color,
            contribution.receiptSecret
        ]);
        assert.throws(() => harness.call('proveContributionSettlement', [
            contribution.id,
            contribution.coin.value + 1n,
            contribution.coin.color,
            contribution.receiptSecret
        ]), /invalid contribution disclosure/);
        harness.call('expireCampaign', [campaign.id], { time: 1_100 });
        assert.equal(harness.readLedger().campaigns.lookup(campaign.id).status, CampaignStatus.EXPIRED);
    });
});

describe('LumaPay gift-card escrow', () => {
    test('redeems once to the current authenticated wallet without exposing its identity', () => {
        const harness = new ContractHarness();
        const gift = createGiftCard(harness);
        assert.throws(() => harness.call('redeemGiftCard', [
            gift.id,
            gift.amount,
            gift.token,
            bytes(200),
            gift.randomness,
            gift.qualifiedCoin
        ]), /invalid gift card opening/);

        const recipient = bytes(201);
        const result = harness.call('redeemGiftCard', [
            gift.id,
            gift.amount,
            gift.token,
            gift.giftSecret,
            gift.randomness,
            gift.qualifiedCoin
        ], { caller: recipient });
        assert.equal(result.result.sent.value, gift.amount);
        assert.equal(
            asHex(result.context.currentZswapLocalState.outputs[0].recipient.left.bytes),
            asHex(recipient)
        );
        assert.equal(harness.readLedger().giftCards.lookup(gift.id).status, GiftCardStatus.REDEEMED);
        assert.throws(() => harness.call('redeemGiftCard', [
            gift.id,
            gift.amount,
            gift.token,
            gift.giftSecret,
            gift.randomness,
            gift.qualifiedCoin
        ]), /gift card is not open/);
    });

    test('rejects wrong token, amount, and escrow coin', () => {
        const harness = new ContractHarness();
        const gift = createGiftCard(harness);
        assert.throws(() => harness.call('redeemGiftCard', [
            gift.id,
            gift.amount + 1n,
            gift.token,
            gift.giftSecret,
            gift.randomness,
            gift.qualifiedCoin
        ]), /invalid gift card opening/);
        assert.throws(() => harness.call('redeemGiftCard', [
            gift.id,
            gift.amount,
            bytes(199),
            gift.giftSecret,
            gift.randomness,
            gift.qualifiedCoin
        ]), /invalid gift card opening/);
        assert.throws(() => harness.call('redeemGiftCard', [
            gift.id,
            gift.amount,
            gift.token,
            gift.giftSecret,
            gift.randomness,
            { ...gift.qualifiedCoin, nonce: bytes(198) }
        ]), /wrong gift card escrow coin/);
    });

    test('blocks redemption after expiry and permits only issuer recovery', () => {
        const harness = new ContractHarness();
        const gift = createGiftCard(harness, 120, { expiry: 1_100n });
        assert.throws(() => harness.call('redeemGiftCard', [
            gift.id,
            gift.amount,
            gift.token,
            gift.giftSecret,
            gift.randomness,
            gift.qualifiedCoin
        ], { time: 1_100 }), /gift card has expired/);
        assert.throws(() => harness.call('reclaimExpiredGiftCard', [
            gift.id,
            bytes(197),
            gift.qualifiedCoin
        ], { time: 1_100 }), /unauthorized gift card reclaim/);
        harness.call('reclaimExpiredGiftCard', [
            gift.id,
            gift.issuerSecret,
            gift.qualifiedCoin
        ], { time: 1_100, caller: bytes(196) });
        assert.equal(harness.readLedger().giftCards.lookup(gift.id).status, GiftCardStatus.RECLAIMED);
    });
});

describe('LumaPay modular quote authorization and converted payment', () => {
    test('registers a provider and settles the exact quoted alternative token amount', () => {
        const harness = new ContractHarness();
        const invoice = createInvoice(harness);
        const provider = registerProvider(harness);
        const quote = registerQuote(harness, invoice, provider);
        payWithQuote(harness, invoice, provider, quote);

        const state = harness.readLedger();
        const settled = state.invoices.lookup(invoice.id);
        assert.equal(settled.status, InvoiceStatus.SETTLED);
        assert.equal(state.quotes.lookup(quote.id).consumed, true);
        assert.equal(pureCircuits.verifyReceipt(
            invoice.id,
            settled.settlementNullifier,
            quote.acceptedPaymentAmount,
            quote.paymentToken,
            invoice.receiptSecret,
            settled.receiptCommitment
        ), true);
    });

    test('rejects unauthorized providers and registry administration', () => {
        const harness = new ContractHarness();
        const providerId = bytes(150);
        const providerSecret = bytes(151);
        const authorization = pureCircuits.deriveQuoteProviderAuthorization(
            providerId,
            providerSecret
        );
        assert.throws(() => harness.call('registerQuoteProvider', [
            providerId,
            authorization,
            bytes(195)
        ]), /unauthorized quote provider registration/);

        const provider = registerProvider(harness);
        const invoice = createInvoice(harness);
        const quoteCommitment = pureCircuits.deriveQuoteCommitment(
            bytes(160), provider.id, invoice.id, invoice.token, invoice.amount,
            bytes(161), 7_250n, 1_500n, bytes(162)
        );
        assert.throws(() => harness.call('registerQuote', [
            bytes(160), provider.id, quoteCommitment, 1_500n, bytes(194)
        ]), /unauthorized quote/);
    });

    test('rejects quote identity, pair, amount, expiry, and replay failures', () => {
        const harness = new ContractHarness();
        const invoice = createInvoice(harness);
        const provider = registerProvider(harness);
        const quote = registerQuote(harness, invoice, provider);

        assert.throws(() => payWithQuote(harness, invoice, provider, quote, {
            quoteRandomness: bytes(193)
        }), /invalid quote opening/);
        assert.throws(() => payWithQuote(harness, invoice, provider, quote, {
            requestedAmount: invoice.amount + 1n
        }), /invalid invoice opening/);
        assert.throws(() => payWithQuote(harness, invoice, provider, quote, {
            coin: { ...quote.coin, value: quote.acceptedPaymentAmount - 1n }
        }), /wrong quoted payment amount/);
        assert.throws(() => payWithQuote(harness, invoice, provider, quote, {
            coin: { ...quote.coin, color: bytes(192) }
        }), /wrong quoted payment token/);
        assert.throws(
            () => payWithQuote(harness, invoice, provider, quote, {}, { time: 1_500 }),
            /quote has expired/
        );

        payWithQuote(harness, invoice, provider, quote);
        assert.throws(
            () => payWithQuote(harness, invoice, provider, quote),
            /invoice is not open/
        );
    });

    test('provider removal invalidates its outstanding quotes and key rotation is enforced', () => {
        const harness = new ContractHarness();
        const invoice = createInvoice(harness);
        const provider = registerProvider(harness);
        const quote = registerQuote(harness, invoice, provider);
        harness.call('removeQuoteProvider', [provider.id, harness.adminSecret]);
        assert.throws(
            () => payWithQuote(harness, invoice, provider, quote),
            /quote provider is disabled/
        );

        const replacementSecret = bytes(191);
        const replacementAuthorization = pureCircuits.deriveQuoteProviderAuthorization(
            provider.id,
            replacementSecret
        );
        harness.call('registerQuoteProvider', [
            provider.id,
            replacementAuthorization,
            harness.adminSecret
        ]);
        assert.throws(() => harness.call('registerQuote', [
            bytes(190),
            provider.id,
            bytes(189),
            1_400n,
            provider.secret
        ]), /unauthorized quote/);
    });
});

describe('LumaPay encrypted backup integrity anchors', () => {
    test('stores only a digest and requires domain-separated authorization for lifecycle changes', () => {
        const harness = new ContractHarness();
        const ownerId = bytes(170);
        const secret = bytes(171);
        const authorization = pureCircuits.deriveBackupAuthorization(ownerId, secret);
        const firstDigest = bytes(172);
        harness.call('registerBackupAnchor', [ownerId, authorization, firstDigest]);

        let anchor = harness.readLedger().backupAnchors.lookup(ownerId);
        assert.equal(asHex(anchor.encryptedBlobDigest), asHex(firstDigest));
        assert.deepEqual(Object.keys(anchor).sort(), [
            'authorization',
            'encryptedBlobDigest',
            'formatVersion'
        ]);
        assert.throws(() => harness.call('updateBackupAnchor', [
            ownerId,
            bytes(188),
            bytes(173)
        ]), /unauthorized backup update/);
        harness.call('updateBackupAnchor', [ownerId, secret, bytes(173)]);

        const rotatedSecret = bytes(174);
        const rotatedAuthorization = pureCircuits.deriveBackupAuthorization(ownerId, rotatedSecret);
        harness.call('rotateBackupAuthorization', [ownerId, secret, rotatedAuthorization]);
        assert.throws(
            () => harness.call('deleteBackupAnchor', [ownerId, secret]),
            /unauthorized backup deletion/
        );
        harness.call('deleteBackupAnchor', [ownerId, rotatedSecret]);
        assert.equal(harness.readLedger().backupOwnerIds.member(ownerId), false);
    });
});

describe('LumaPay cryptographic and toolchain invariants', () => {
    test('uses unique domain separators and keeps each within Compact Bytes<32>', () => {
        const source = readFileSync(new URL('../src/lumapay.compact', import.meta.url), 'utf8');
        const domains = [...source.matchAll(/pad\(32, "([^"]+)"\)/g)].map((match) => match[1]);
        assert.ok(domains.length >= 18);
        assert.equal(new Set(domains).size, domains.length);
        for (const domain of domains) {
            assert.ok(Buffer.byteLength(domain, 'utf8') <= 32, `${domain} exceeds 32 bytes`);
            assert.match(domain, /^lumapay:/);
        }

        const sharedSecret = bytes(180);
        const id = bytes(181);
        const derived = [
            pureCircuits.deriveMerchantAuthorization(sharedSecret),
            pureCircuits.derivePaymentNullifier(id, sharedSecret),
            pureCircuits.deriveClaimNullifier(id, sharedSecret),
            pureCircuits.deriveContributionNullifier(id, sharedSecret),
            pureCircuits.deriveGiftCardRedemptionNullifier(id, sharedSecret),
            pureCircuits.deriveGiftCardReclaimNullifier(id, sharedSecret),
            pureCircuits.deriveBackupAuthorization(id, sharedSecret)
        ].map(asHex);
        assert.equal(new Set(derived).size, derived.length);
    });

    test('contains no legacy execution primitives or brands', () => {
        const source = readFileSync(new URL('../src/lumapay.compact', import.meta.url), 'utf8');
        assert.doesNotMatch(
            source,
            new RegExp(['a' + 'leo', 'BHP256', 'transfer_private', `credits\\.${'a' + 'leo'}`, 'USDCx', 'USAD', 'Null' + 'Pay'].join('|'), 'i')
        );
    });

    test('pins a production-compatible compiler/language/runtime and emits every proof key', () => {
        const contractInfo = JSON.parse(readFileSync(
            new URL('../src/managed/lumapay/compiler/contract-info.json', import.meta.url),
            'utf8'
        ));
        assert.equal(contractInfo['compiler-version'], '0.31.1');
        assert.equal(contractInfo['language-version'], '0.23.0');
        assert.equal(contractInfo['runtime-version'], '0.16.0');
        const provedCircuits = contractInfo.circuits.filter((circuit) => circuit.proof);
        assert.equal(provedCircuits.length, 25);

        const keyDirectory = new URL('../src/managed/lumapay/keys', import.meta.url);
        const keyPath = keyDirectory.pathname.startsWith('/') && process.platform === 'win32'
            ? keyDirectory.pathname.slice(1)
            : keyDirectory.pathname;
        const keyFiles = readdirSync(keyPath);
        assert.equal(keyFiles.length, provedCircuits.length * 2);
        for (const filename of keyFiles) {
            assert.ok(statSync(join(keyPath, filename)).size > 0, `${filename} is empty`);
        }
    });
});
