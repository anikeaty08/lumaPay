import { existsSync } from 'node:fs';
import { pathToFileURL } from 'node:url';
import { WebSocket } from 'ws';
import { AppError } from '../errors/app-error.js';
import { bytes32, hex, normalizeBytes32 } from '../domain/identifiers.js';

const INVOICE_STATUS = Object.freeze(['OPEN', 'SETTLED', 'CANCELLED', 'EXPIRED']);
const CAMPAIGN_STATUS = Object.freeze(['OPEN', 'CANCELLED', 'EXPIRED']);
const GIFT_CARD_STATUS = Object.freeze(['OPEN', 'REDEEMED', 'RECLAIMED']);
const CARD_VAULT_STATUS = Object.freeze(['ACTIVE', 'CLOSED']);

function jsonSafe(value) {
    if (typeof value === 'bigint') return value.toString();
    if (value instanceof Uint8Array) return hex(value);
    if (Array.isArray(value)) return value.map(jsonSafe);
    if (!value || typeof value !== 'object') return value;
    return Object.fromEntries(Object.entries(value).map(([key, item]) => [key, jsonSafe(item)]));
}

export class MidnightGateway {
    constructor(environment, log) {
        this.environment = environment;
        this.log = log;
        this.provider = null;
        this.contractModules = new Map();
        this.initializing = null;
    }

    isConfigured() {
        return Boolean(this.environment.contractAddress);
    }

    requireContractAddress() {
        if (!this.environment.contractAddress) {
            throw new AppError(
                'MIDNIGHT_CONTRACT_NOT_DEPLOYED',
                'The LumaPay contract address is not configured yet.',
                503
            );
        }
        return this.environment.contractAddress;
    }

    async initialize() {
        if (this.provider && this.contractModules.has('invoice-core')) return;
        if (this.initializing) return this.initializing;
        this.initializing = this.#initialize();
        try { await this.initializing; } finally { this.initializing = null; }
    }

    async #initialize() {
        if (!existsSync(this.environment.contractModulePath)) {
            throw new AppError(
                'MIDNIGHT_CONTRACT_ARTIFACT_MISSING',
                'Build contracts/lumapay before starting the backend.',
                500
            );
        }
        globalThis.WebSocket = WebSocket;
        const [{ setNetworkId }, { indexerPublicDataProvider }, contractModule] = await Promise.all([
            import('@midnight-ntwrk/midnight-js-network-id'),
            import('@midnight-ntwrk/midnight-js-indexer-public-data-provider'),
            import(pathToFileURL(this.environment.contractModulePath).href)
        ]);
        setNetworkId(this.environment.network.networkId);
        this.provider = indexerPublicDataProvider(
            this.environment.network.indexer,
            this.environment.network.indexerWS
        );
        this.contractModules.set('invoice-core', contractModule);
    }

    async contractSnapshot(module = 'invoice-core') {
        const address = this.environment.contracts[module] ?? (
            module === 'invoice-core' ? this.requireContractAddress() : null
        );
        if (!address) throw new AppError('MIDNIGHT_MODULE_NOT_DEPLOYED', `${module} is not deployed.`, 503);
        await this.initialize();
        if (!this.contractModules.has(module)) {
            const modulePath = this.environment.contractModulePaths[module];
            if (!modulePath || !existsSync(modulePath)) {
                throw new AppError('MIDNIGHT_CONTRACT_ARTIFACT_MISSING', `${module} artifact is missing.`, 500);
            }
            this.contractModules.set(module, await import(pathToFileURL(modulePath).href));
        }
        const state = await this.provider.queryContractState(address);
        if (!state) {
            throw new AppError('MIDNIGHT_CONTRACT_NOT_INDEXED', 'Contract is not indexed yet.', 503);
        }
        return {
            state,
            ledger: this.contractModules.get(module).ledger(state.data)
        };
    }

    invoiceFromLedger(ledger, invoiceId) {
        const id = normalizeBytes32(invoiceId, 'invoice_id');
        const key = bytes32(id, 'invoice_id');
        if (!ledger.invoices.member(key)) return null;
        const invoice = ledger.invoices.lookup(key);
        return Object.freeze({
            invoice_id: id,
            commitment_version: invoice.commitmentVersion.toString(),
            commitment: hex(invoice.commitment),
            merchant_authorization: hex(invoice.merchantAuthorization),
            expiry: invoice.expiry.toString(),
            status: INVOICE_STATUS[invoice.status] ?? 'UNKNOWN',
            settlement_nullifier: hex(invoice.settlementNullifier),
            escrow_coin_commitment: hex(invoice.escrowCoinCommitment),
            receipt_commitment: hex(invoice.receiptCommitment),
            claimed: invoice.claimed
        });
    }

    async getInvoice(invoiceId) {
        const { ledger } = await this.contractSnapshot();
        return this.invoiceFromLedger(ledger, invoiceId);
    }

    async verifyInvoiceOpening(opening, expectedCommitment) {
        await this.initialize();
        const contractModule = this.contractModules.get('invoice-core');
        const derive = contractModule?.pureCircuits?.deriveInvoiceCommitment;
        if (typeof derive !== 'function') {
            throw new AppError(
                'MIDNIGHT_CONTRACT_ARTIFACT_INVALID',
                'Invoice commitment circuit is missing from the generated contract artifact.',
                500
            );
        }
        const derived = derive(
            bytes32(opening.invoiceId, 'payment_opening.invoiceId'),
            bytes32(opening.merchantPrivateIdentity, 'payment_opening.merchantPrivateIdentity'),
            BigInt(opening.amount),
            bytes32(opening.tokenId, 'payment_opening.tokenId'),
            bytes32(opening.invoiceNonce, 'payment_opening.invoiceNonce'),
            bytes32(opening.invoiceRandomness, 'payment_opening.invoiceRandomness'),
            BigInt(opening.expiry)
        );
        return hex(derived) === normalizeBytes32(expectedCommitment, 'commitment');
    }

    async verifyEscrowCoin(coin, expectedCommitment) {
        await this.initialize();
        const derive = this.contractModules.get('invoice-core')?.pureCircuits?.deriveEscrowCoinCommitment;
        if (typeof derive !== 'function') {
            throw new AppError(
                'MIDNIGHT_CONTRACT_ARTIFACT_INVALID',
                'Escrow coin commitment circuit is missing from the generated contract artifact.',
                500
            );
        }
        const derived = derive(
            bytes32(coin.nonce, 'escrow_coin.nonce'),
            bytes32(coin.color, 'escrow_coin.color'),
            BigInt(coin.value)
        );
        return hex(derived) === normalizeBytes32(expectedCommitment, 'escrow_coin_commitment');
    }

    async verifyCampaignOpening(opening, expectedCommitment) {
        await this.contractSnapshot('campaigns');
        const derive = this.contractModules.get('campaigns')?.pureCircuits?.deriveCampaignCommitment;
        if (typeof derive !== 'function') {
            throw new AppError(
                'MIDNIGHT_CONTRACT_ARTIFACT_INVALID',
                'Campaign commitment circuit is missing from the generated contract artifact.',
                500
            );
        }
        const zero = new Uint8Array(32);
        const tokenIds = opening.acceptedTokenIds.map((id) => bytes32(id, 'payment_opening.acceptedTokenIds'));
        const [tokenA, tokenB = zero, tokenC = zero, tokenD = zero] = tokenIds;
        const derived = derive(
            bytes32(opening.campaignId, 'payment_opening.campaignId'),
            bytes32(opening.merchantPrivateIdentity, 'payment_opening.merchantPrivateIdentity'),
            BigInt(opening.minimumContribution),
            BigInt(opening.maximumContribution),
            BigInt(tokenIds.length),
            tokenA,
            tokenB,
            tokenC,
            tokenD,
            bytes32(opening.campaignNonce, 'payment_opening.campaignNonce'),
            bytes32(opening.campaignRandomness, 'payment_opening.campaignRandomness'),
            BigInt(opening.expiry)
        );
        return hex(derived) === normalizeBytes32(expectedCommitment, 'commitment');
    }

    async verifyCampaignEscrowCoin(coin, expectedCommitment) {
        await this.contractSnapshot('campaigns');
        const derive = this.contractModules.get('campaigns')?.pureCircuits?.deriveEscrowCoinCommitment;
        if (typeof derive !== 'function') {
            throw new AppError(
                'MIDNIGHT_CONTRACT_ARTIFACT_INVALID',
                'Campaign escrow coin commitment circuit is missing from the generated contract artifact.',
                500
            );
        }
        const derived = derive(
            bytes32(coin.nonce, 'escrow_coin.nonce'),
            bytes32(coin.color, 'escrow_coin.color'),
            BigInt(coin.value)
        );
        return hex(derived) === normalizeBytes32(expectedCommitment, 'escrow_coin_commitment');
    }

    async getCampaign(campaignId) {
        const id = normalizeBytes32(campaignId, 'campaign_id');
        const { ledger } = await this.contractSnapshot('campaigns');
        const key = bytes32(id, 'campaign_id');
        if (!ledger.campaigns.member(key)) return null;
        const campaign = ledger.campaigns.lookup(key);
        return Object.freeze({
            campaign_id: id,
            commitment_version: campaign.commitmentVersion.toString(),
            commitment: hex(campaign.commitment),
            merchant_authorization: hex(campaign.merchantAuthorization),
            expiry: campaign.expiry.toString(),
            status: CAMPAIGN_STATUS[campaign.status] ?? 'UNKNOWN',
            contribution_count: campaign.contributionCount.toString()
        });
    }

    async getContribution(contributionId) {
        const id = normalizeBytes32(contributionId, 'contribution_id');
        const { ledger } = await this.contractSnapshot('campaigns');
        const key = bytes32(id, 'contribution_id');
        if (!ledger.contributions.member(key)) return null;
        const contribution = ledger.contributions.lookup(key);
        return Object.freeze({
            contribution_id: id,
            campaign_id: hex(contribution.campaignId),
            nullifier: hex(contribution.nullifier),
            escrow_coin_commitment: hex(contribution.escrowCoinCommitment),
            receipt_commitment: hex(contribution.receiptCommitment),
            claimed: contribution.claimed
        });
    }

    async getGiftCard(giftCardId) {
        const id = normalizeBytes32(giftCardId, 'gift_card_id');
        const { ledger } = await this.contractSnapshot('gift-cards');
        const key = bytes32(id, 'gift_card_id');
        if (!ledger.giftCards.member(key)) return null;
        const giftCard = ledger.giftCards.lookup(key);
        return Object.freeze({
            gift_card_id: id,
            commitment_version: giftCard.commitmentVersion.toString(),
            commitment: hex(giftCard.commitment),
            issuer_authorization: hex(giftCard.issuerAuthorization),
            expiry: giftCard.expiry.toString(),
            escrow_coin_commitment: hex(giftCard.escrowCoinCommitment),
            redemption_nullifier: hex(giftCard.redemptionNullifier),
            status: GIFT_CARD_STATUS[giftCard.status] ?? 'UNKNOWN'
        });
    }

    async getQuote(quoteId) {
        const id = normalizeBytes32(quoteId, 'quote_id');
        const { ledger } = await this.contractSnapshot('quote-checkout');
        const key = bytes32(id, 'quote_id');
        if (!ledger.quotes.member(key)) return null;
        const quote = ledger.quotes.lookup(key);
        return Object.freeze({
            quote_id: id,
            commitment_version: quote.commitmentVersion.toString(),
            commitment: hex(quote.commitment),
            provider_id: hex(quote.providerId),
            expiry: quote.expiry.toString(),
            consumed: quote.consumed
        });
    }

    async getQuoteProvider(providerId) {
        const id = normalizeBytes32(providerId, 'provider_id');
        const { ledger } = await this.contractSnapshot('quote-checkout');
        const key = bytes32(id, 'provider_id');
        if (!ledger.quoteProviderIds.member(key)) return null;
        return Object.freeze({
            provider_id: id,
            enabled: true,
            authorization: hex(ledger.quoteProviderAuthorizations.lookup(key))
        });
    }

    async getBackupAnchor(ownerId) {
        const id = normalizeBytes32(ownerId, 'owner_id');
        const { ledger } = await this.contractSnapshot('backup-anchor');
        const key = bytes32(id, 'owner_id');
        if (!ledger.backupAnchors.member(key)) return null;
        const anchor = ledger.backupAnchors.lookup(key);
        return Object.freeze({
            owner_id: id,
            format_version: anchor.formatVersion.toString(),
            authorization: hex(anchor.authorization),
            encrypted_blob_digest: hex(anchor.encryptedBlobDigest)
        });
    }

    async getCardVault(cardId) {
        const id = normalizeBytes32(cardId, 'card_id');
        const { ledger } = await this.contractSnapshot('card-vault');
        const key = bytes32(id, 'card_id');
        if (!ledger.cardVaults.member(key)) return null;
        const vault = ledger.cardVaults.lookup(key);
        return Object.freeze({
            card_id: id,
            commitment_version: vault.commitmentVersion.toString(),
            commitment: hex(vault.commitment),
            owner_authorization: hex(vault.ownerAuthorization),
            card_number_hash: hex(vault.cardNumberHash),
            metadata_digest: hex(vault.metadataDigest),
            daily_limit: vault.dailyLimit.toString(),
            spent_epoch_day: vault.spentEpochDay.toString(),
            spent_amount: vault.spentAmount.toString(),
            status: CARD_VAULT_STATUS[vault.status] ?? 'UNKNOWN'
        });
    }

    async getCardSpend(spendId) {
        const id = normalizeBytes32(spendId, 'card_spend_id');
        const { ledger } = await this.contractSnapshot('card-vault');
        const key = bytes32(id, 'card_spend_id');
        if (!ledger.cardSpends.member(key)) return null;
        const spend = ledger.cardSpends.lookup(key);
        return Object.freeze({
            card_spend_id: id,
            card_id: hex(spend.cardId),
            payment_id: hex(spend.paymentId),
            token_id: hex(spend.tokenId),
            amount: spend.amount.toString(),
            epoch_day: spend.epochDay.toString()
        });
    }

    async waitForTransaction(transactionId, timeoutMs = 20_000) {
        const id = normalizeBytes32(transactionId, 'transaction_id');
        await this.initialize();
        let timeoutId;
        try {
            const data = await Promise.race([
                this.provider.watchForTxData(id),
                new Promise((_, reject) => {
                    timeoutId = setTimeout(
                        () => reject(new AppError(
                            'MIDNIGHT_TRANSACTION_PENDING',
                            'Transaction is not finalized in the indexer yet.',
                            202
                        )),
                        timeoutMs
                    );
                })
            ]);
            return jsonSafe(data);
        } finally {
            clearTimeout(timeoutId);
        }
    }

    async status() {
        await this.initialize();
        const modules = {};
        for (const [module, address] of Object.entries(this.environment.contracts)) {
            // A module with no configured address (e.g. card-vault, not yet
            // deployed) isn't a chain-read failure — report it as such
            // instead of handing an empty/undefined address to the indexer,
            // which throws and previously took down this whole endpoint for
            // every module just because one hadn't been deployed yet.
            if (!address) {
                modules[module] = { address: null, indexed: false };
                continue;
            }
            let indexed = false;
            try {
                indexed = Boolean(await this.provider.queryContractState(address));
            } catch (error) {
                this.log.warn('chain.status_query_degraded', { module, error: error instanceof Error ? error.message : String(error) });
            }
            modules[module] = { address, indexed };
        }
        return {
            network: this.environment.network.networkId,
            node: this.environment.network.node,
            indexer: this.environment.network.indexer,
            contract_address: this.environment.contractAddress,
            contract_indexed: modules['invoice-core']?.indexed ?? false,
            contracts: modules
        };
    }

    async subscribe(onChange, onError) {
        const address = this.requireContractAddress();
        await this.initialize();
        return this.provider
            .contractStateObservable(address, { type: 'latest' })
            .subscribe({ next: onChange, error: onError });
    }

    async dispose() {
        if (this.provider?.dispose) await this.provider.dispose();
        this.provider = null;
        this.contractModules.clear();
    }
}
