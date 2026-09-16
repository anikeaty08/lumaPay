import { AppError } from '../errors/app-error.js';
import { normalizeBytes32 } from '../domain/identifiers.js';

const TERMINAL = new Set(['SETTLED', 'CANCELLED', 'EXPIRED']);

export class ReconciliationService {
    constructor(repository, gateway, webhooks, log) {
        this.repository = repository;
        this.gateway = gateway;
        this.webhooks = webhooks;
        this.log = log;
        this.timer = null;
        this.subscription = null;
        this.running = false;
    }

    async reconcileInvoice(invoiceId, transactionId, escrowCoin = null) {
        const id = normalizeBytes32(invoiceId, 'invoice_id');
        const local = await this.repository.getInvoice(id);
        if (!local) throw new AppError('INVOICE_NOT_FOUND', 'Invoice not found.', 404);

        if (transactionId) {
            await this.gateway.waitForTransaction(transactionId, 30_000);
        }
        const chain = await this.gateway.getInvoice(id);
        if (!chain) {
            return { ...local, chain_status: 'NOT_CREATED' };
        }
        if (chain.commitment !== local.commitment) {
            throw new AppError(
                'INVOICE_COMMITMENT_MISMATCH',
                'On-chain invoice commitment does not match the cached invoice.',
                409
            );
        }
        if (chain.merchant_authorization !== local.merchant_authorization) {
            throw new AppError(
                'INVOICE_MERCHANT_AUTHORIZATION_MISMATCH',
                'On-chain merchant authorization does not match the cached invoice.',
                409
            );
        }
        if (escrowCoin && chain.status === 'SETTLED' && !(await this.gateway.verifyEscrowCoin(
            escrowCoin,
            chain.escrow_coin_commitment
        ))) {
            throw new AppError(
                'ESCROW_COIN_MISMATCH',
                'Escrow claim material does not match the settled on-chain commitment.',
                409
            );
        }

        const previousStatus = local.status;
        const updated = await this.repository.updateInvoiceFromChain(id, {
            status: chain.status,
            settlement_tx_id: chain.status === 'SETTLED'
                ? (transactionId ?? local.settlement_tx_id)
                : local.settlement_tx_id,
            settlement_nullifier: chain.settlement_nullifier,
            escrow_coin_commitment: chain.escrow_coin_commitment,
            escrow_coin: escrowCoin ?? local.escrow_coin ?? null,
            receipt_commitment: chain.receipt_commitment,
            claimed: chain.claimed,
            commitment_version: chain.commitment_version
        });
        await this.repository.syncCheckoutStatus(id, chain.status);

        if (TERMINAL.has(chain.status) || chain.claimed !== local.claimed) {
            await this.webhooks.sendInvoiceEvent(updated, previousStatus);
        }
        return { ...updated, chain_status: chain.status };
    }

    async reconcileCampaign(campaignId, transactionId = null) {
        const id = normalizeBytes32(campaignId, 'campaign_id');
        const local = await this.repository.getCampaign(id);
        if (!local) throw new AppError('CAMPAIGN_NOT_FOUND', 'Campaign not found.', 404);
        if (transactionId) {
            await this.gateway.waitForTransaction(transactionId, 30_000);
        }
        const chain = await this.gateway.getCampaign(id);
        if (!chain) return { ...local, chain_status: 'NOT_CREATED' };
        if (chain.commitment !== local.commitment) {
            throw new AppError(
                'CAMPAIGN_COMMITMENT_MISMATCH',
                'On-chain campaign commitment does not match the cached campaign.',
                409
            );
        }
        if (chain.merchant_authorization !== local.merchant_authorization) {
            throw new AppError(
                'CAMPAIGN_MERCHANT_AUTHORIZATION_MISMATCH',
                'On-chain campaign merchant authorization does not match the cached campaign.',
                409
            );
        }
        const updated = await this.repository.updateCampaignFromChain(id, {
            status: chain.status,
            contribution_count: chain.contribution_count,
            commitment_version: chain.commitment_version
        });
        return { ...updated, chain_status: chain.status };
    }

    async registerContribution(campaignId, transactionId, escrowCoin) {
        const id = normalizeBytes32(campaignId, 'campaign_id');
        if (!escrowCoin?.coin) throw new AppError('ESCROW_COIN_INVALID', 'escrow_coin is required.', 400);
        const local = await this.repository.getCampaign(id);
        if (!local) throw new AppError('CAMPAIGN_NOT_FOUND', 'Campaign not found.', 404);

        if (transactionId) {
            await this.gateway.waitForTransaction(transactionId, 30_000);
        }
        const chainCampaign = await this.gateway.getCampaign(id);
        if (!chainCampaign) throw new AppError('CAMPAIGN_NOT_INDEXED', 'Campaign is not indexed on Midnight yet.', 409);
        if (chainCampaign.status !== 'OPEN') {
            throw new AppError('CAMPAIGN_NOT_OPEN', 'Only an open campaign can accept contributions.', 409);
        }
        if (chainCampaign.commitment !== local.commitment) {
            throw new AppError('CAMPAIGN_COMMITMENT_MISMATCH', 'Cached and indexed campaign commitments differ.', 409);
        }
        const contribution = await this.gateway.getContribution(escrowCoin.contributionId);
        if (!contribution) {
            throw new AppError('CONTRIBUTION_NOT_INDEXED', 'Contribution is not indexed on Midnight yet.', 409);
        }
        if (contribution.campaign_id !== id) {
            throw new AppError('CONTRIBUTION_CAMPAIGN_MISMATCH', 'Contribution is not for this campaign.', 409);
        }
        if (!(await this.gateway.verifyCampaignEscrowCoin(escrowCoin.coin, contribution.escrow_coin_commitment))) {
            throw new AppError(
                'ESCROW_COIN_MISMATCH',
                'Escrow claim material does not match the contribution commitment.',
                409
            );
        }
        await this.reconcileCampaign(id);
        return this.repository.createContribution({
            contributionId: contribution.contribution_id,
            campaignId: id,
            transactionId,
            escrowCoinCommitment: contribution.escrow_coin_commitment,
            escrowCoin: escrowCoin.coin,
            receiptCommitment: contribution.receipt_commitment,
            claimed: contribution.claimed
        });
    }

    async reconcileContribution(campaignId, contributionId, transactionId = null) {
        const campaign = normalizeBytes32(campaignId, 'campaign_id');
        const id = normalizeBytes32(contributionId, 'contribution_id');
        const local = await this.repository.getContribution(id);
        if (!local) throw new AppError('CONTRIBUTION_NOT_FOUND', 'Contribution not found.', 404);
        if (local.campaign_id !== campaign) {
            throw new AppError('CONTRIBUTION_CAMPAIGN_MISMATCH', 'Contribution is not for this campaign.', 409);
        }
        if (transactionId) {
            await this.gateway.waitForTransaction(transactionId, 30_000);
        }
        const chain = await this.gateway.getContribution(id);
        if (!chain) throw new AppError('CONTRIBUTION_NOT_INDEXED', 'Contribution is not indexed on Midnight yet.', 409);
        if (chain.campaign_id !== campaign) {
            throw new AppError('CONTRIBUTION_CAMPAIGN_MISMATCH', 'Indexed contribution is not for this campaign.', 409);
        }
        return this.repository.updateContributionFromChain(id, {
            escrow_coin_commitment: chain.escrow_coin_commitment,
            receipt_commitment: chain.receipt_commitment,
            claimed: chain.claimed
        });
    }

    async reconcileAll() {
        if (this.running || !this.gateway.isConfigured()) return { processed: 0, skipped: true };
        this.running = true;
        let processed = 0;
        const failures = [];
        try {
            const invoices = await this.repository.listReconcilableInvoices();
            for (const invoice of invoices) {
                try {
                    await this.reconcileInvoice(invoice.invoice_id);
                    processed += 1;
                } catch (error) {
                    failures.push({ invoice_id: invoice.invoice_id, code: error.code ?? 'UNKNOWN' });
                    this.log.warn('reconcile.invoice_failed', { invoiceId: invoice.invoice_id, error });
                }
            }
            return { processed, failures };
        } finally {
            this.running = false;
        }
    }

    async start(intervalMs) {
        if (!this.gateway.isConfigured() || this.timer) return;
        const run = () => void this.reconcileAll().catch((error) => {
            this.log.error('reconcile.cycle_failed', { error });
        });
        this.subscription = await this.gateway.subscribe(run, (error) => {
            this.log.warn('reconcile.subscription_failed', { error });
        });
        this.timer = setInterval(run, intervalMs);
        this.timer.unref();
        run();
    }

    stop() {
        if (this.timer) clearInterval(this.timer);
        this.timer = null;
        this.subscription?.unsubscribe();
        this.subscription = null;
    }
}
