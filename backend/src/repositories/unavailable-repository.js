import { AppError } from '../errors/app-error.js';

export class UnavailableRepository {
    #unavailable() {
        throw new AppError(
            'DATABASE_UNAVAILABLE',
            'Configure SUPABASE_URL and SUPABASE_SERVICE_ROLE_KEY to enable merchant data.',
            503
        );
    }

    findMerchantByApiKey() { return this.#unavailable(); }
    findMerchantByMidnightAddress() { return this.#unavailable(); }
    createAuthChallenge() { return this.#unavailable(); }
    getAuthChallenge() { return this.#unavailable(); }
    consumeAuthChallenge() { return this.#unavailable(); }
    createAuthSession() { return this.#unavailable(); }
    findAuthSession() { return this.#unavailable(); }
    revokeAuthSession() { return this.#unavailable(); }
    attachSessionMerchant() { return this.#unavailable(); }
    createMerchant() { return this.#unavailable(); }
    createInvoice() { return this.#unavailable(); }
    getInvoice() { return this.#unavailable(); }
    listMerchantInvoices() { return this.#unavailable(); }
    createCheckoutSession() { return this.#unavailable(); }
    getCheckoutSession() { return this.#unavailable(); }
    listReconcilableInvoices() { return this.#unavailable(); }
    updateInvoiceFromChain() { return this.#unavailable(); }
    syncCheckoutStatus() { return this.#unavailable(); }
    createCampaign() { return this.#unavailable(); }
    getCampaign() { return this.#unavailable(); }
    listMerchantCampaigns() { return this.#unavailable(); }
    updateCampaignFromChain() { return this.#unavailable(); }
    createContribution() { return this.#unavailable(); }
    getContribution() { return this.#unavailable(); }
    listCampaignContributions() { return this.#unavailable(); }
    updateContributionFromChain() { return this.#unavailable(); }
    getCardWalletByOwnerHash() { return this.#unavailable(); }
    lookupCardWalletByNumberHash() { return this.#unavailable(); }
    upsertCardWallet() { return this.#unavailable(); }
    updateCardWallet() { return this.#unavailable(); }
    deleteCardWallet() { return this.#unavailable(); }
    claimWebhookDelivery() { return this.#unavailable(); }
    finishWebhookDelivery() { return this.#unavailable(); }
    webhookConfiguration() { return null; }
    getMerchant() { return this.#unavailable(); }
    getMerchantPublic() { return this.#unavailable(); }
}
