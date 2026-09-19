import { AppError } from '../errors/app-error.js';
import { decrypt, encrypt, sha256 } from '../security/crypto.js';

function unwrap(result, operation) {
    if (result.error) {
        throw new AppError('DATABASE_ERROR', `Database operation failed: ${operation}.`, 500, {
            operation,
            databaseCode: result.error.code
        });
    }
    return result.data;
}

export class SupabaseRepository {
    constructor(client) {
        this.client = client;
    }

    async createMerchant({ id, name, midnightAddress, apiKey, webhookUrl, webhookSecret }) {
        const row = {
            id,
            name,
            midnight_address_hash: sha256(midnightAddress),
            midnight_address_ciphertext: encrypt(midnightAddress, 'merchant-address'),
            api_key_hash: sha256(apiKey),
            api_key_ciphertext: encrypt(apiKey, 'merchant-api-key'),
            webhook_url_ciphertext: webhookUrl ? encrypt(webhookUrl, 'merchant-webhook-url') : null,
            webhook_secret_ciphertext: webhookUrl ? encrypt(webhookSecret, 'merchant-webhook-secret') : null
        };
        return unwrap(
            await this.client.from('merchants').insert(row).select().single(),
            'create_merchant'
        );
    }

    async findMerchantByApiKey(apiKey) {
        const result = await this.client
            .from('merchants')
            .select('*')
            .eq('api_key_hash', sha256(apiKey))
            .maybeSingle();
        return unwrap(result, 'find_merchant_by_api_key');
    }

    async findMerchantByMidnightAddress(address) {
        return unwrap(
            await this.client.from('merchants').select('*').eq('midnight_address_hash', sha256(address)).maybeSingle(),
            'find_merchant_by_midnight_address'
        );
    }

    async createAuthChallenge(challenge) {
        return unwrap(await this.client.from('auth_challenges').insert({
            id: challenge.id,
            midnight_address: challenge.address,
            midnight_address_hex: challenge.addressHex,
            nonce_hash: challenge.nonceHash,
            message: challenge.message,
            origin: challenge.origin,
            expires_at: challenge.expiresAt
        }).select().single(), 'create_auth_challenge');
    }

    async getAuthChallenge(id) {
        return unwrap(
            await this.client.from('auth_challenges').select('*').eq('id', id).maybeSingle(),
            'get_auth_challenge'
        );
    }

    async consumeAuthChallenge(id) {
        const rows = unwrap(await this.client.from('auth_challenges').update({
            used_at: new Date().toISOString()
        }).eq('id', id).is('used_at', null).gt('expires_at', new Date().toISOString()).select('id'), 'consume_auth_challenge');
        return rows?.length === 1;
    }

    async createAuthSession(session) {
        return unwrap(await this.client.from('auth_sessions').insert({
            id: session.id,
            token_hash: session.tokenHash,
            midnight_address: session.address,
            merchant_id: session.merchantId,
            expires_at: session.expiresAt
        }).select().single(), 'create_auth_session');
    }

    async findAuthSession(tokenHash) {
        const row = unwrap(await this.client.from('auth_sessions').select('*, merchants(*)')
            .eq('token_hash', tokenHash).is('revoked_at', null)
            .gt('expires_at', new Date().toISOString()).maybeSingle(), 'find_auth_session');
        if (!row) return null;
        return { ...row, merchant: row.merchants ?? null };
    }

    async revokeAuthSession(tokenHash) {
        unwrap(await this.client.from('auth_sessions').update({ revoked_at: new Date().toISOString() })
            .eq('token_hash', tokenHash).is('revoked_at', null), 'revoke_auth_session');
    }

    async attachSessionMerchant(id, merchantId) {
        return unwrap(await this.client.from('auth_sessions').update({ merchant_id: merchantId })
            .eq('id', id).is('merchant_id', null).select('id').single(), 'attach_session_merchant');
    }

    async createInvoice(invoice) {
        return unwrap(
            await this.client.from('invoices').insert({
                invoice_id: invoice.invoiceId,
                merchant_id: invoice.merchantId,
                commitment: invoice.commitment,
                merchant_authorization: invoice.merchantAuthorization,
                expiry: invoice.expiry,
                payment_opening: invoice.paymentOpening,
                payment_opening_digest: sha256(invoice.serializedOpening),
                payment_payload_ciphertext: invoice.serializedOpening,
                payment_payload_digest: sha256(invoice.serializedOpening),
                creation_tx_id: invoice.creationTxId,
                status: 'PENDING'
            }).select().single(),
            'create_invoice'
        );
    }

    async getInvoice(invoiceId) {
        return unwrap(
            await this.client.from('invoices').select('*').eq('invoice_id', invoiceId).maybeSingle(),
            'get_invoice'
        );
    }

    async listMerchantInvoices(merchantId, status) {
        let query = this.client
            .from('invoices')
            .select('*')
            .eq('merchant_id', merchantId)
            .order('created_at', { ascending: false });
        if (status) query = query.eq('status', status);
        return unwrap(await query, 'list_merchant_invoices') ?? [];
    }

    async listReconcilableInvoices(limit = 200) {
        return unwrap(
            await this.client
                .from('invoices')
                .select('*')
                .in('status', ['PENDING', 'OPEN', 'SETTLED'])
                .order('updated_at', { ascending: true })
                .limit(limit),
            'list_reconcilable_invoices'
        ) ?? [];
    }

    async updateInvoiceFromChain(invoiceId, patch) {
        return unwrap(
            await this.client.from('invoices').update({
                ...patch,
                chain_checked_at: new Date().toISOString(),
                updated_at: new Date().toISOString()
            }).eq('invoice_id', invoiceId).select().single(),
            'update_invoice_from_chain'
        );
    }

    async createCampaign(campaign) {
        return unwrap(
            await this.client.from('campaigns').insert({
                campaign_id: campaign.campaignId,
                merchant_id: campaign.merchantId,
                commitment: campaign.commitment,
                merchant_authorization: campaign.merchantAuthorization,
                expiry: campaign.expiry,
                payment_opening: campaign.paymentOpening,
                payment_opening_digest: sha256(campaign.serializedOpening),
                creation_tx_id: campaign.creationTxId,
                status: 'PENDING'
            }).select().single(),
            'create_campaign'
        );
    }

    async getCampaign(campaignId) {
        return unwrap(
            await this.client.from('campaigns').select('*').eq('campaign_id', campaignId).maybeSingle(),
            'get_campaign'
        );
    }

    async listMerchantCampaigns(merchantId, status) {
        let query = this.client
            .from('campaigns')
            .select('*')
            .eq('merchant_id', merchantId)
            .order('created_at', { ascending: false });
        if (status) query = query.eq('status', status);
        return unwrap(await query, 'list_merchant_campaigns') ?? [];
    }

    async updateCampaignFromChain(campaignId, patch) {
        return unwrap(
            await this.client.from('campaigns').update({
                ...patch,
                chain_checked_at: new Date().toISOString(),
                updated_at: new Date().toISOString()
            }).eq('campaign_id', campaignId).select().single(),
            'update_campaign_from_chain'
        );
    }

    async createContribution(contribution) {
        const result = await this.client.from('campaign_contributions').insert({
            contribution_id: contribution.contributionId,
            campaign_id: contribution.campaignId,
            transaction_id: contribution.transactionId,
            escrow_coin_commitment: contribution.escrowCoinCommitment,
            escrow_coin: contribution.escrowCoin,
            receipt_commitment: contribution.receiptCommitment,
            claimed: contribution.claimed
        }).select().single();
        if (result.error?.code === '23505') {
            return unwrap(
                await this.client.from('campaign_contributions')
                    .select('*')
                    .eq('contribution_id', contribution.contributionId)
                    .maybeSingle(),
                'get_existing_contribution'
            );
        }
        return unwrap(result, 'create_contribution');
    }

    async getContribution(contributionId) {
        return unwrap(
            await this.client.from('campaign_contributions').select('*').eq('contribution_id', contributionId).maybeSingle(),
            'get_contribution'
        );
    }

    async listCampaignContributions(campaignId) {
        return unwrap(
            await this.client.from('campaign_contributions')
                .select('*')
                .eq('campaign_id', campaignId)
                .order('created_at', { ascending: false }),
            'list_campaign_contributions'
        ) ?? [];
    }

    async updateContributionFromChain(contributionId, patch) {
        return unwrap(
            await this.client.from('campaign_contributions').update({
                ...patch,
                updated_at: new Date().toISOString()
            }).eq('contribution_id', contributionId).select().single(),
            'update_contribution_from_chain'
        );
    }

    async getCardWalletByOwnerHash(addressHash) {
        return unwrap(
            await this.client.from('card_wallets').select('*').eq('address_hash', addressHash).maybeSingle(),
            'get_card_wallet_by_owner_hash'
        );
    }

    async lookupCardWalletByNumberHash(cardNumberHash) {
        return unwrap(
            await this.client.from('card_wallets')
                .select('address_hash, main_owner, card_id, card_address, card_number_hash, card_last4, card_status, card_label, card_hint, limits, card_metadata_digest, card_vault_commitment, card_creation_tx_id, card_close_tx_id, created_at, updated_at')
                .eq('card_number_hash', cardNumberHash)
                .maybeSingle(),
            'lookup_card_wallet_by_number_hash'
        );
    }

    async upsertCardWallet(card) {
        const row = {
            address_hash: card.addressHash,
            main_owner: card.mainAddress,
            card_id: card.cardId,
            card_address: card.cardAddress,
            encrypted_card_number: card.encryptedCardNumber,
            card_number_hash: card.cardNumberHash,
            card_metadata_digest: card.cardMetadataDigest,
            card_owner_secret_ciphertext: card.cardOwnerSecretCiphertext,
            card_owner_private_identity_ciphertext: card.cardOwnerPrivateIdentityCiphertext,
            card_vault_nonce_ciphertext: card.cardVaultNonceCiphertext,
            card_vault_randomness_ciphertext: card.cardVaultRandomnessCiphertext,
            card_vault_commitment: card.cardVaultCommitment,
            card_creation_tx_id: card.cardCreationTxId,
            card_close_tx_id: card.cardCloseTxId,
            card_last4: card.cardLast4,
            encrypted_card_private_key: card.encryptedCardPrivateKey,
            card_kdf_salt: card.cardKdfSalt,
            card_kdf_algorithm: card.cardKdfAlgorithm,
            card_kdf_params: card.cardKdfParams,
            card_status: card.cardStatus,
            card_label: card.cardLabel,
            card_hint: card.cardHint,
            limits: card.limits,
            updated_at: new Date().toISOString()
        };
        Object.keys(row).forEach((key) => {
            if (row[key] === undefined || row[key] === null) delete row[key];
        });
        return unwrap(
            await this.client.from('card_wallets').upsert(row, { onConflict: 'address_hash' }).select().single(),
            'upsert_card_wallet'
        );
    }

    async updateCardWallet(addressHash, patch) {
        return unwrap(
            await this.client.from('card_wallets').update({
                ...patch,
                updated_at: new Date().toISOString()
            }).eq('address_hash', addressHash).select().single(),
            'update_card_wallet'
        );
    }

    async deleteCardWallet(addressHash, closeTxId) {
        return unwrap(
            await this.client.from('card_wallets').update({
                card_status: 'CLOSED',
                card_close_tx_id: closeTxId ?? null,
                updated_at: new Date().toISOString()
            }).eq('address_hash', addressHash).select().single(),
            'delete_card_wallet'
        );
    }

    async createCheckoutSession(session) {
        return unwrap(
            await this.client.from('checkout_sessions').insert({
                id: session.id,
                merchant_id: session.merchantId,
                invoice_id: session.invoiceId,
                success_url: session.successUrl,
                cancel_url: session.cancelUrl,
                status: 'PENDING'
            }).select().single(),
            'create_checkout_session'
        );
    }

    async getCheckoutSession(id) {
        return unwrap(
            await this.client.from('checkout_sessions').select('*').eq('id', id).maybeSingle(),
            'get_checkout_session'
        );
    }

    async syncCheckoutStatus(invoiceId, status) {
        return unwrap(
            await this.client.from('checkout_sessions').update({
                status,
                updated_at: new Date().toISOString()
            }).eq('invoice_id', invoiceId).select(),
            'sync_checkout_status'
        );
    }

    async claimWebhookDelivery(eventKey, merchantId, eventType, payload) {
        const result = await this.client.from('webhook_deliveries').insert({
            event_key: eventKey,
            merchant_id: merchantId,
            event_type: eventType,
            payload,
            status: 'PENDING'
        });
        if (result.error?.code === '23505') return false;
        unwrap(result, 'claim_webhook_delivery');
        return true;
    }

    async finishWebhookDelivery(eventKey, status, responseCode) {
        unwrap(
            await this.client.from('webhook_deliveries').update({
                status,
                response_code: responseCode,
                attempted_at: new Date().toISOString()
            }).eq('event_key', eventKey),
            'finish_webhook_delivery'
        );
    }

    webhookConfiguration(merchant) {
        if (!merchant?.webhook_url_ciphertext || !merchant?.webhook_secret_ciphertext) return null;
        return {
            url: decrypt(merchant.webhook_url_ciphertext, 'merchant-webhook-url'),
            secret: decrypt(merchant.webhook_secret_ciphertext, 'merchant-webhook-secret')
        };
    }

    async getMerchant(id) {
        return unwrap(
            await this.client.from('merchants').select('*').eq('id', id).maybeSingle(),
            'get_merchant'
        );
    }

    async getMerchantPublic(id) {
        const merchant = await this.getMerchant(id);
        if (!merchant) return null;
        return {
            id: merchant.id,
            name: merchant.name,
            midnight_address: decrypt(merchant.midnight_address_ciphertext, 'merchant-address')
        };
    }

    // address_hash-keyed; the values arriving here (main_address, burner_address,
    // encrypted_burner_key) are already encrypted client-side with the user's own
    // app password before they reach this repository — stored as opaque ciphertext,
    // same non-custodial pattern as merchants.*_ciphertext above.
    async getUserProfile(addressHash) {
        return unwrap(
            await this.client.from('user_profiles').select('*').eq('address_hash', addressHash).maybeSingle(),
            'get_user_profile'
        );
    }

    async upsertUserProfile(profile) {
        return unwrap(
            await this.client.from('user_profiles').upsert({
                address_hash: profile.addressHash,
                main_address: profile.mainAddress,
                burner_address: profile.burnerAddress ?? null,
                encrypted_burner_key: profile.encryptedBurnerKey ?? null,
                profile_main_invoice_hash: profile.profileMainInvoiceHash ?? null,
                profile_burner_invoice_hash: profile.profileBurnerInvoiceHash ?? null,
                updated_at: new Date().toISOString()
            }, { onConflict: 'address_hash' }).select().single(),
            'upsert_user_profile'
        );
    }

    async clearBurnerProfileData(addressHash) {
        return unwrap(
            await this.client.from('user_profiles').update({
                burner_address: null,
                encrypted_burner_key: null,
                profile_burner_invoice_hash: null,
                updated_at: new Date().toISOString()
            }).eq('address_hash', addressHash).select().maybeSingle(),
            'clear_burner_profile_data'
        );
    }

    async getNotificationPreferences(addressHash) {
        const row = unwrap(
            await this.client.from('user_profiles').select('notify_on_settled').eq('address_hash', addressHash).maybeSingle(),
            'get_notification_preferences'
        );
        return row ? { notify_on_settled: row.notify_on_settled } : null;
    }

    async updateNotificationPreferences(addressHash, notifyOnSettled) {
        const row = unwrap(
            await this.client.from('user_profiles').update({
                notify_on_settled: notifyOnSettled,
                updated_at: new Date().toISOString()
            }).eq('address_hash', addressHash).select('notify_on_settled').maybeSingle(),
            'update_notification_preferences'
        );
        if (row) return { notify_on_settled: row.notify_on_settled };
        // No profile row exists yet (user only ever touched notification
        // settings, never generated a burner wallet) — a minimal row is
        // still valid since only address_hash + main_address are required;
        // main_address is unknown here, so store an empty placeholder
        // rather than block on a field this endpoint doesn't receive.
        const created = unwrap(
            await this.client.from('user_profiles').insert({
                address_hash: addressHash,
                main_address: '',
                notify_on_settled: notifyOnSettled
            }).select('notify_on_settled').single(),
            'create_notification_preferences'
        );
        return { notify_on_settled: created.notify_on_settled };
    }
}
