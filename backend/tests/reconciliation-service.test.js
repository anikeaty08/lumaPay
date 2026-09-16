import test from 'node:test';
import assert from 'node:assert/strict';
import { ReconciliationService } from '../src/services/reconciliation-service.js';

const invoiceId = '11'.repeat(32);
const transactionId = '22'.repeat(32);
const coin = {
    nonce: '33'.repeat(32),
    color: '00'.repeat(32),
    value: '12500000',
    mtIndex: '7'
};
const campaignId = '99'.repeat(32);
const contributionId = 'aa'.repeat(32);

function fixture(validCoin) {
    const local = {
        invoice_id: invoiceId,
        commitment: '44'.repeat(32),
        merchant_authorization: '55'.repeat(32),
        status: 'OPEN',
        claimed: false
    };
    let storedPatch = null;
    const repository = {
        async getInvoice() { return local; },
        async updateInvoiceFromChain(_id, patch) {
            storedPatch = patch;
            return { ...local, ...patch };
        },
        async syncCheckoutStatus() {}
    };
    const gateway = {
        async waitForTransaction() {},
        async getInvoice() {
            return {
                status: 'SETTLED',
                commitment: local.commitment,
                merchant_authorization: local.merchant_authorization,
                settlement_nullifier: '66'.repeat(32),
                escrow_coin_commitment: '77'.repeat(32),
                receipt_commitment: '88'.repeat(32),
                claimed: false,
                commitment_version: '1'
            };
        },
        async verifyEscrowCoin(value, commitment) {
            assert.deepEqual(value, coin);
            assert.equal(commitment, '77'.repeat(32));
            return validCoin;
        }
    };
    const service = new ReconciliationService(
        repository,
        gateway,
        { async sendInvoiceEvent() {} },
        { warn() {}, error() {} }
    );
    return { service, storedPatch: () => storedPatch };
}

test('reconciliation persists only commitment-verified merchant claim material', async () => {
    const { service, storedPatch } = fixture(true);
    await service.reconcileInvoice(invoiceId, transactionId, coin);
    assert.deepEqual(storedPatch().escrow_coin, coin);
    assert.equal(storedPatch().settlement_tx_id, transactionId);
});

test('reconciliation rejects mismatched merchant claim material', async () => {
    const { service, storedPatch } = fixture(false);
    await assert.rejects(
        () => service.reconcileInvoice(invoiceId, transactionId, coin),
        (error) => error.code === 'ESCROW_COIN_MISMATCH'
    );
    assert.equal(storedPatch(), null);
});

function campaignFixture(validCoin) {
    const campaign = {
        campaign_id: campaignId,
        commitment: '12'.repeat(32),
        merchant_authorization: '13'.repeat(32),
        status: 'OPEN'
    };
    let storedContribution = null;
    const repository = {
        async getCampaign() { return campaign; },
        async updateCampaignFromChain(_id, patch) { return { ...campaign, ...patch }; },
        async createContribution(value) {
            storedContribution = value;
            return {
                contribution_id: value.contributionId,
                campaign_id: value.campaignId,
                escrow_coin: value.escrowCoin,
                claimed: value.claimed
            };
        }
    };
    const gateway = {
        async waitForTransaction() {},
        async getCampaign() {
            return {
                status: 'OPEN',
                commitment: campaign.commitment,
                merchant_authorization: campaign.merchant_authorization,
                contribution_count: '1',
                commitment_version: '1'
            };
        },
        async getContribution() {
            return {
                contribution_id: contributionId,
                campaign_id: campaignId,
                escrow_coin_commitment: '14'.repeat(32),
                receipt_commitment: '15'.repeat(32),
                claimed: false
            };
        },
        async verifyCampaignEscrowCoin(value, commitment) {
            assert.deepEqual(value, coin);
            assert.equal(commitment, '14'.repeat(32));
            return validCoin;
        }
    };
    const service = new ReconciliationService(
        repository,
        gateway,
        { async sendInvoiceEvent() {} },
        { warn() {}, error() {} }
    );
    return { service, storedContribution: () => storedContribution };
}

test('campaign contribution registration persists verified merchant claim material', async () => {
    const { service, storedContribution } = campaignFixture(true);
    await service.registerContribution(campaignId, transactionId, {
        contributionId,
        coin
    });
    assert.equal(storedContribution().contributionId, contributionId);
    assert.deepEqual(storedContribution().escrowCoin, coin);
});

test('campaign contribution registration rejects mismatched claim material', async () => {
    const { service, storedContribution } = campaignFixture(false);
    await assert.rejects(
        () => service.registerContribution(campaignId, transactionId, {
            contributionId,
            coin
        }),
        (error) => error.code === 'ESCROW_COIN_MISMATCH'
    );
    assert.equal(storedContribution(), null);
});
