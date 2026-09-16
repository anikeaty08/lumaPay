import test from 'node:test';
import assert from 'node:assert/strict';
import request from 'supertest';
import { createApp } from '../src/app.js';

const id = '11'.repeat(32);
const commitment = '22'.repeat(32);
const authorization = '33'.repeat(32);
const merchantIdentity = '44'.repeat(32);
const invoiceNonce = '55'.repeat(32);
const invoiceRandomness = '66'.repeat(32);
const tokenId = '00'.repeat(32);
const campaignId = '77'.repeat(32);
const campaignCommitment = '88'.repeat(32);
const contributionId = '99'.repeat(32);
const contributionCommitment = 'aa'.repeat(32);

function paymentOpening(expiry) {
    return {
        version: 1,
        kind: 'invoice',
        invoiceId: id,
        amount: '12500000',
        token: 'NIGHT',
        tokenId,
        expiry,
        merchant: 'mn_shield-addr_test',
        merchantPrivateIdentity: merchantIdentity,
        invoiceNonce,
        invoiceRandomness,
        title: 'Private consulting invoice'
    };
}

function campaignOpening(expiry) {
    return {
        version: 1,
        kind: 'campaign',
        campaignId,
        minimumContribution: '1000000',
        maximumContribution: '5000000',
        acceptedTokens: ['NIGHT'],
        acceptedTokenIds: [tokenId],
        expiry,
        merchant: 'mn_shield-addr_test',
        merchantPrivateIdentity: merchantIdentity,
        campaignNonce: invoiceNonce,
        campaignRandomness: invoiceRandomness
    };
}

function runtime(options = {}) {
    const invoices = new Map();
    const campaigns = new Map();
    const contributions = new Map();
    const sessions = new Map();
    const merchant = { id: 'merchant-1' };
    return {
        environment: {
            corsOrigins: ['http://localhost:5173'],
            frontendUrl: 'http://localhost:5173',
            network: { networkId: 'preprod' },
            contracts: { 'invoice-core': 'aa'.repeat(32) }
        },
        logger: { info() {}, warn() {}, error() {} },
        gateway: {
            async status() {
                return { network: 'preprod', contract_indexed: true };
            },
            async getInvoice(invoiceId) {
                const invoice = invoices.get(invoiceId);
                return invoice ? {
                    invoice_id: invoiceId,
                    status: options.chainStatus ?? 'OPEN',
                    commitment: invoice.commitment,
                    commitment_version: '1',
                    receipt_commitment: '00'.repeat(32),
                    claimed: false
                } : null;
            },
            async verifyInvoiceOpening(opening, expected) {
                return opening.invoiceId === id && expected === commitment;
            },
            async verifyCampaignOpening(opening, expected) {
                return opening.campaignId === campaignId && expected === campaignCommitment;
            },
            async waitForTransaction() {},
            async verifyCampaignEscrowCoin(coin, expected) {
                return coin.nonce === '12'.repeat(32) && expected === contributionCommitment;
            },
            async getCampaign(value) {
                if (value === id) return { campaign_id: value, status: 'OPEN' };
                const campaign = campaigns.get(value);
                return campaign ? {
                    campaign_id: value,
                    status: 'OPEN',
                    commitment: campaign.commitment,
                    merchant_authorization: campaign.merchant_authorization,
                    commitment_version: '1',
                    contribution_count: String(contributions.size)
                } : null;
            },
            async getContribution(value) {
                if (value !== contributionId) return null;
                return {
                    contribution_id: contributionId,
                    campaign_id: campaignId,
                    escrow_coin_commitment: contributionCommitment,
                    receipt_commitment: 'bb'.repeat(32),
                    claimed: false
                };
            },
            async getGiftCard(value) { return value === id ? { gift_card_id: value, status: 'OPEN' } : null; },
            async getQuote() { return null; },
            async getQuoteProvider() { return null; },
            async getBackupAnchor(value) { return value === id ? { owner_id: value, format_version: '1' } : null; },
            async getCardVault(value) { return value === id ? { card_id: value, status: 'ACTIVE' } : null; },
            async getCardSpend() { return null; }
        },
        repository: {
            async findMerchantByApiKey(apiKey) { return apiKey === 'valid' ? merchant : null; },
            async createMerchant(value) { return value; },
            async createInvoice(value) {
                const row = {
                    ...value,
                    invoice_id: value.invoiceId,
                    merchant_id: value.merchantId,
                    payment_opening: value.paymentOpening,
                    status: 'PENDING'
                };
                invoices.set(value.invoiceId, row);
                return row;
            },
            async getInvoice(invoiceId) { return invoices.get(invoiceId) ?? null; },
            async listMerchantInvoices(merchantId, status) {
                return [...invoices.values()].filter((invoice) =>
                    invoice.merchant_id === merchantId && (!status || invoice.status === status)
                );
            },
            async createCampaign(value) {
                const row = {
                    ...value,
                    campaign_id: value.campaignId,
                    merchant_id: value.merchantId,
                    merchant_authorization: value.merchantAuthorization,
                    payment_opening: value.paymentOpening,
                    status: 'PENDING',
                    contribution_count: '0'
                };
                campaigns.set(value.campaignId, row);
                return row;
            },
            async getCampaign(value) { return campaigns.get(value) ?? null; },
            async listMerchantCampaigns(merchantId, status) {
                return [...campaigns.values()].filter((campaign) =>
                    campaign.merchant_id === merchantId && (!status || campaign.status === status)
                );
            },
            async updateCampaignFromChain(value, patch) {
                const row = { ...campaigns.get(value), ...patch };
                campaigns.set(value, row);
                return row;
            },
            async createContribution(value) {
                const row = {
                    contribution_id: value.contributionId,
                    campaign_id: value.campaignId,
                    transaction_id: value.transactionId,
                    escrow_coin_commitment: value.escrowCoinCommitment,
                    escrow_coin: value.escrowCoin,
                    receipt_commitment: value.receiptCommitment,
                    claimed: value.claimed
                };
                contributions.set(value.contributionId, row);
                return row;
            },
            async getContribution(value) { return contributions.get(value) ?? null; },
            async listCampaignContributions(value) {
                return [...contributions.values()].filter((contribution) => contribution.campaign_id === value);
            },
            async updateContributionFromChain(value, patch) {
                const row = { ...contributions.get(value), ...patch };
                contributions.set(value, row);
                return row;
            },
            async createCheckoutSession(value) {
                const row = { ...value, merchant_id: value.merchantId, invoice_id: value.invoiceId, status: 'PENDING' };
                sessions.set(value.id, row);
                return row;
            },
            async getCheckoutSession(sessionId) { return sessions.get(sessionId) ?? null; },
            async getMerchantPublic() { return { id: merchant.id, name: 'Luma Studio', midnight_address: 'mn_shield-addr_test' }; }
        },
        reconciliation: {
            async reconcileInvoice(invoiceId) { return { invoice_id: invoiceId, status: 'OPEN' }; },
            async reconcileCampaign(value) {
                const campaign = campaigns.get(value);
                const row = { ...campaign, status: 'OPEN', chain_status: 'OPEN', contribution_count: String(contributions.size) };
                campaigns.set(value, row);
                return row;
            },
            async registerContribution(value, transactionId, escrowCoin) {
                const chainContribution = await this.gateway?.getContribution?.(escrowCoin.contributionId);
                void chainContribution;
                const row = {
                    contribution_id: escrowCoin.contributionId,
                    campaign_id: value,
                    transaction_id: transactionId,
                    escrow_coin_commitment: contributionCommitment,
                    escrow_coin: escrowCoin.coin,
                    receipt_commitment: 'bb'.repeat(32),
                    claimed: false
                };
                contributions.set(row.contribution_id, row);
                return row;
            },
            async reconcileContribution(_campaignId, value) {
                const row = { ...contributions.get(value), claimed: true };
                contributions.set(value, row);
                return row;
            }
        }
    };
}

test('health and contract discovery expose LumaPay Preprod configuration', async () => {
    const app = createApp(runtime());
    const health = await request(app).get('/health').expect(200);
    assert.equal(health.body.product, 'LumaPay');
    const contracts = await request(app).get('/api/v1/contracts').expect(200);
    assert.equal(contracts.body.contracts['invoice-core'], 'aa'.repeat(32));
});

test('invoice creation requires merchant authentication', async () => {
    const app = createApp(runtime());
    await request(app).post('/api/v1/invoices').send({}).expect(401);
});

test('authenticated invoice creation validates and persists Midnight fields', async () => {
    const app = createApp(runtime());
    const expiry = String(Math.floor(Date.now() / 1000) + 60);
    const created = await request(app)
        .post('/api/v1/invoices')
        .set('x-lumapay-api-key', 'valid')
        .send({
            invoice_id: id,
            commitment,
            merchant_authorization: authorization,
            expiry,
            payment_opening: paymentOpening(expiry)
        })
        .expect(201);
    assert.equal(created.body.invoice_id, id);
    assert.equal(created.body.status, 'PENDING');

    const fetched = await request(app).get(`/api/v1/invoices/${id}`).expect(200);
    assert.equal(fetched.body.chain_status, 'OPEN');
    assert.equal(fetched.body.payment_opening, undefined);
});

test('hosted checkout exposes only payer-safe terms and canonical chain state', async () => {
    const app = createApp(runtime());
    const expiry = String(Math.floor(Date.now() / 1000) + 300);
    await request(app)
        .post('/api/v1/invoices')
        .set('x-lumapay-api-key', 'valid')
        .send({
            invoice_id: id,
            commitment,
            merchant_authorization: authorization,
            expiry,
            payment_opening: paymentOpening(expiry)
        })
        .expect(201);

    const created = await request(app)
        .post('/api/v1/checkout-sessions')
        .set('x-lumapay-api-key', 'valid')
        .send({ invoice_id: id, success_url: 'https://merchant.example/success' })
        .expect(201);
    assert.match(created.body.checkout_url, /\/checkout\//);
    assert.equal(created.body.payment_opening.invoiceId, id);
    assert.equal(created.body.payment_opening.merchantClaimSecret, undefined);
    assert.equal(created.body.chain.status, 'OPEN');

    const fetched = await request(app)
        .get(`/api/v1/checkout-sessions/${created.body.id}`)
        .expect(200);
    assert.equal(fetched.body.amount_atomic, '12500000');
    assert.equal(fetched.body.token_type, 'NIGHT');
    assert.equal(fetched.body.merchant_name, 'Luma Studio');
});

test('merchant invoice list exposes owned Midnight metadata and canonical state', async () => {
    const app = createApp(runtime());
    const expiry = String(Math.floor(Date.now() / 1000) + 300);
    await request(app)
        .post('/api/v1/invoices')
        .set('x-lumapay-api-key', 'valid')
        .send({
            invoice_id: id,
            commitment,
            merchant_authorization: authorization,
            expiry,
            payment_opening: paymentOpening(expiry)
        })
        .expect(201);

    const response = await request(app)
        .get('/api/v1/invoices')
        .set('x-lumapay-api-key', 'valid')
        .expect(200);
    assert.equal(response.body.length, 1);
    assert.equal(response.body[0].invoice_id, id);
    assert.equal(response.body[0].amount_atomic, '12500000');
    assert.equal(response.body[0].chain_status, 'OPEN');
    assert.equal(response.body[0].payment_opening.merchantClaimSecret, undefined);
});

test('campaign registration persists payer-safe opening and exposes merchant contribution claim material', async () => {
    const app = createApp(runtime());
    const expiry = String(Math.floor(Date.now() / 1000) + 300);
    const opening = campaignOpening(expiry);
    await request(app)
        .post('/api/v1/campaigns')
        .set('x-lumapay-api-key', 'valid')
        .send({
            campaign_id: campaignId,
            commitment: campaignCommitment,
            merchant_authorization: authorization,
            expiry,
            payment_opening: opening
        })
        .expect(201);

    await request(app)
        .post(`/api/v1/campaigns/${campaignId}/contributions`)
        .send({
            contribution_id: contributionId,
            transaction_id: '13'.repeat(32),
            escrow_coin: {
                nonce: '12'.repeat(32),
                color: tokenId,
                value: '1000000',
                mtIndex: '9'
            }
        })
        .expect(201);

    const response = await request(app)
        .get('/api/v1/campaigns')
        .set('x-lumapay-api-key', 'valid')
        .expect(200);
    assert.equal(response.body.length, 1);
    assert.equal(response.body[0].campaign_id, campaignId);
    assert.equal(response.body[0].payment_opening.merchantClaimSecret, undefined);
    assert.equal(response.body[0].contributions[0].claim_material.value, '1000000');
});

test('invoice metadata rejects an opening for a different invoice', async () => {
    const expiry = String(Math.floor(Date.now() / 1000) + 300);
    const response = await request(createApp(runtime()))
        .post('/api/v1/invoices')
        .set('x-lumapay-api-key', 'valid')
        .send({
            invoice_id: id,
            commitment,
            merchant_authorization: authorization,
            expiry,
            payment_opening: { ...paymentOpening(expiry), invoiceId: '99'.repeat(32) }
        })
        .expect(400);
    assert.equal(response.body.error.code, 'PAYMENT_OPENING_MISMATCH');
});

test('hosted checkout rejects an invoice that is no longer open', async () => {
    const app = createApp(runtime({ chainStatus: 'CANCELLED' }));
    const expiry = String(Math.floor(Date.now() / 1000) + 300);
    await request(app)
        .post('/api/v1/invoices')
        .set('x-lumapay-api-key', 'valid')
        .send({
            invoice_id: id,
            commitment,
            merchant_authorization: authorization,
            expiry,
            payment_opening: paymentOpening(expiry)
        })
        .expect(201);

    const response = await request(app)
        .post('/api/v1/checkout-sessions')
        .set('x-lumapay-api-key', 'valid')
        .send({ invoice_id: id })
        .expect(409);
    assert.equal(response.body.error.code, 'INVOICE_NOT_PAYABLE');
});

test('unknown routes use stable structured errors', async () => {
    const response = await request(createApp(runtime())).get('/missing').expect(404);
    assert.equal(response.body.error.code, 'ROUTE_NOT_FOUND');
});

test('direct chain invoice lookup does not require database access', async () => {
    const app = createApp(runtime());
    const response = await request(app).get(`/api/v1/chain/invoices/${id}`).expect(404);
    assert.equal(response.body.error.code, 'INVOICE_NOT_FOUND');
});

test('all deployed modules expose typed public chain reads', async () => {
    const app = createApp(runtime());
    const campaign = await request(app).get(`/api/v1/chain/campaigns/${id}`).expect(200);
    assert.equal(campaign.body.status, 'OPEN');
    const giftCard = await request(app).get(`/api/v1/chain/gift-cards/${id}`).expect(200);
    assert.equal(giftCard.body.gift_card_id, id);
    const anchor = await request(app).get(`/api/v1/chain/backup-anchors/${id}`).expect(200);
    assert.equal(anchor.body.format_version, '1');
    const cardVault = await request(app).get(`/api/v1/chain/card-vaults/${id}`).expect(200);
    assert.equal(cardVault.body.status, 'ACTIVE');
    const missing = await request(app).get(`/api/v1/chain/quotes/${id}`).expect(404);
    assert.equal(missing.body.error.code, 'QUOTE_NOT_FOUND');
});
