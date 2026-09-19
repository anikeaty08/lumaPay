import crypto from 'node:crypto';
import express from 'express';
import cors from 'cors';
import { AppError, asAppError } from './errors/app-error.js';
import { normalizeBytes32 } from './domain/identifiers.js';
import {
    campaignInput,
    campaignPaymentOpening,
    cardMirrorInput,
    invoiceInput,
    invoicePaymentOpening,
    optionalHttpUrl,
    qualifiedEscrowCoin,
    requiredString
} from './validation/input.js';
import { randomToken, sha256 } from './security/crypto.js';

const asyncRoute = (handler) => (request, response, next) => {
    Promise.resolve(handler(request, response, next)).catch(next);
};

// On-chain enrichment (indexer lookups) is best-effort: a freshly-created record
// that hasn't been indexed yet, or a momentary indexer hiccup, should degrade to
// DB-only data instead of failing the entire list/detail response.
async function safeChainLookup(runtime, label, fn) {
    try {
        return await fn();
    } catch (error) {
        runtime.logger.warn('chain.lookup_degraded', { label, error: asAppError(error) });
        return null;
    }
}

function merchantAuth(runtime) {
    return asyncRoute(async (request, _response, next) => {
        const apiKey = request.get('x-lumapay-api-key')?.trim();
        const sessionToken = readCookie(request, 'lumapay_session');
        const session = sessionToken ? await runtime.auth.resolveSession(sessionToken) : null;
        const merchant = apiKey
            ? await runtime.repository.findMerchantByApiKey(apiKey)
            : session?.merchant;
        if (!apiKey && !sessionToken) {
            throw new AppError('AUTH_REQUIRED', 'A LumaPay wallet session or API key is required.', 401);
        }
        if (!merchant) throw new AppError('AUTH_INVALID', 'The LumaPay credentials are invalid.', 401);
        request.merchant = merchant;
        request.authSession = session;
        next();
    });
}

function readCookie(request, name) {
    const cookies = String(request.get('cookie') ?? '').split(';');
    for (const cookie of cookies) {
        const separator = cookie.indexOf('=');
        if (separator < 0) continue;
        if (cookie.slice(0, separator).trim() === name) {
            return decodeURIComponent(cookie.slice(separator + 1).trim());
        }
    }
    return null;
}

function walletAuth(runtime) {
    return asyncRoute(async (request, _response, next) => {
        const token = readCookie(request, 'lumapay_session');
        const session = await runtime.auth.resolveSession(token);
        if (!session) throw new AppError('AUTH_REQUIRED', 'Connect and sign in with a Midnight wallet.', 401);
        request.authSession = session;
        next();
    });
}

function storedInvoiceOpening(invoice) {
    let value = invoice.payment_opening ?? invoice.paymentOpening;
    if (typeof value === 'string') {
        try { value = JSON.parse(value); } catch {
            throw new AppError('PAYMENT_OPENING_CORRUPT', 'Stored payment opening is not valid JSON.', 409);
        }
    }
    return invoicePaymentOpening(value, invoice.invoice_id, String(invoice.expiry));
}

function storedCampaignOpening(campaign) {
    let value = campaign.payment_opening ?? campaign.paymentOpening;
    if (typeof value === 'string') {
        try { value = JSON.parse(value); } catch {
            throw new AppError('CAMPAIGN_OPENING_CORRUPT', 'Stored campaign opening is not valid JSON.', 409);
        }
    }
    return campaignPaymentOpening(value, campaign.campaign_id, String(campaign.expiry));
}

function publicInvoice(invoice, chain) {
    return {
        invoice_id: invoice.invoice_id,
        commitment: invoice.commitment,
        commitment_version: chain?.commitment_version ?? invoice.commitment_version ?? '1',
        expiry: String(invoice.expiry),
        creation_tx_id: invoice.creation_tx_id ?? null,
        settlement_tx_id: invoice.settlement_tx_id ?? null,
        receipt_commitment: chain?.receipt_commitment ?? invoice.receipt_commitment ?? null,
        claimed: chain?.claimed ?? invoice.claimed ?? false,
        status: chain?.status ?? invoice.status,
        chain_status: chain?.status ?? 'NOT_CREATED'
    };
}

function publicCampaign(campaign, chain) {
    return {
        campaign_id: campaign.campaign_id,
        commitment: campaign.commitment,
        commitment_version: chain?.commitment_version ?? campaign.commitment_version ?? '1',
        expiry: String(campaign.expiry),
        creation_tx_id: campaign.creation_tx_id ?? null,
        contribution_count: chain?.contribution_count ?? campaign.contribution_count ?? '0',
        status: chain?.status ?? campaign.status,
        chain_status: chain?.status ?? 'NOT_CREATED'
    };
}

function merchantInvoice(invoice, chain) {
    const opening = storedInvoiceOpening(invoice);
    return {
        ...publicInvoice(invoice, chain),
        amount_atomic: opening.amount,
        token_type: opening.token,
        title: opening.title ?? '',
        memo: opening.memo ?? '',
        items: opening.items ?? [],
        payment_opening: opening,
        claim_material: chain?.status === 'SETTLED' ? (invoice.escrow_coin ?? null) : null,
        created_at: invoice.created_at ?? null,
        updated_at: invoice.updated_at ?? null
    };
}

async function merchantCampaign(runtime, campaign, chain) {
    const opening = storedCampaignOpening(campaign);
    const contributions = await runtime.repository.listCampaignContributions(campaign.campaign_id);
    return {
        ...publicCampaign(campaign, chain),
        minimum_contribution: opening.minimumContribution,
        maximum_contribution: opening.maximumContribution,
        accepted_tokens: opening.acceptedTokens,
        accepted_token_ids: opening.acceptedTokenIds,
        payment_opening: opening,
        contributions: contributions.map((contribution) => ({
            contribution_id: contribution.contribution_id,
            transaction_id: contribution.transaction_id ?? null,
            escrow_coin_commitment: contribution.escrow_coin_commitment ?? null,
            receipt_commitment: contribution.receipt_commitment ?? null,
            claimed: contribution.claimed ?? false,
            claim_material: contribution.claimed ? null : (contribution.escrow_coin ?? null),
            created_at: contribution.created_at ?? null,
            updated_at: contribution.updated_at ?? null
        })),
        created_at: campaign.created_at ?? null,
        updated_at: campaign.updated_at ?? null
    };
}

function publicCard(card) {
    if (!card) return null;
    return {
        address_hash: card.address_hash,
        main_owner: card.main_owner ?? null,
        card_id: card.card_id ?? null,
        card_address: card.card_address ?? '',
        card_number_hash: card.card_number_hash ?? null,
        card_metadata_digest: card.card_metadata_digest ?? null,
        card_vault_commitment: card.card_vault_commitment ?? null,
        card_creation_tx_id: card.card_creation_tx_id ?? null,
        card_close_tx_id: card.card_close_tx_id ?? null,
        card_last4: card.card_last4 ?? null,
        card_status: card.card_status ?? 'ACTIVE',
        card_label: card.card_label ?? null,
        card_hint: card.card_hint ?? null,
        limits: card.limits ?? null,
        card_limits_updated_at: card.card_limits_updated_at ?? null,
        created_at: card.created_at ?? null,
        updated_at: card.updated_at ?? null
    };
}

function privateCard(card) {
    if (!card) return null;
    return {
        ...publicCard(card),
        encrypted_card_address: card.card_address ?? null,
        encrypted_card_number: card.encrypted_card_number ?? null,
        encrypted_card_private_key: card.encrypted_card_private_key ?? '',
        card_kdf_salt: card.card_kdf_salt ?? '',
        card_kdf_algorithm: card.card_kdf_algorithm ?? '',
        card_kdf_params: card.card_kdf_params ?? null,
        card_owner_secret_ciphertext: card.card_owner_secret_ciphertext ?? null,
        card_owner_private_identity_ciphertext: card.card_owner_private_identity_ciphertext ?? null,
        card_vault_nonce_ciphertext: card.card_vault_nonce_ciphertext ?? null,
        card_vault_randomness_ciphertext: card.card_vault_randomness_ciphertext ?? null
    };
}

async function checkoutSessionView(runtime, session) {
    const invoiceId = session.invoice_id ?? session.invoiceId;
    const invoice = await runtime.repository.getInvoice(invoiceId);
    if (!invoice) throw new AppError('INVOICE_NOT_FOUND', 'Checkout invoice not found.', 404);
    const opening = storedInvoiceOpening(invoice);
    const chain = await runtime.gateway.getInvoice(invoiceId);
    if (!chain) {
        throw new AppError('INVOICE_NOT_INDEXED', 'Checkout invoice is not indexed on Midnight yet.', 409);
    }
    if (chain.commitment !== invoice.commitment) {
        throw new AppError('INVOICE_COMMITMENT_MISMATCH', 'Cached and indexed invoice commitments differ.', 409);
    }
    if (!(await runtime.gateway.verifyInvoiceOpening(opening, chain.commitment))) {
        throw new AppError('PAYMENT_OPENING_MISMATCH', 'Checkout terms do not match the indexed invoice commitment.', 409);
    }
    const merchantId = session.merchant_id ?? session.merchantId;
    const merchant = await runtime.repository.getMerchantPublic(merchantId);
    const expiredByTime = BigInt(opening.expiry) <= BigInt(Math.floor(Date.now() / 1_000));
    const terminalFailure = chain.status === 'CANCELLED' || chain.status === 'EXPIRED' || expiredByTime;
    const status = chain.status === 'SETTLED'
        ? 'SETTLED'
        : terminalFailure
            ? 'FAILED'
            : (session.status === 'PROCESSING' ? 'PROCESSING' : 'PENDING');
    return {
        id: session.id,
        status,
        invoice_hash: invoiceId,
        amount_atomic: opening.amount,
        amount: Number(BigInt(opening.amount)) / 1_000_000,
        token_type: opening.token,
        allowed_tokens: [opening.token],
        invoice_type: 0,
        salt: opening.invoiceNonce,
        merchant_name: merchant?.name ?? 'Private merchant',
        merchant_address: opening.merchant ?? merchant?.midnight_address ?? null,
        success_url: session.success_url ?? session.successUrl ?? null,
        cancel_url: session.cancel_url ?? session.cancelUrl ?? null,
        checkout_url: `${runtime.environment.frontendUrl}/checkout/${encodeURIComponent(session.id)}`,
        settlement_tx_id: invoice.settlement_tx_id ?? null,
        payment_opening: opening,
        chain: publicInvoice(invoice, chain)
    };
}

export function createApp(runtime) {
    const app = express();
    app.disable('x-powered-by');
    app.use(cors({
        credentials: true,
        origin(origin, callback) {
            if (!origin || runtime.environment.corsOrigins.includes(origin.replace(/\/+$/, ''))) {
                callback(null, true);
            } else callback(new AppError('CORS_ORIGIN_DENIED', 'Origin is not allowed.', 403));
        }
    }));
    app.use(express.json({ limit: '32kb' }));

    app.get('/health', (_request, response) => response.json({
        ok: true,
        product: 'LumaPay',
        network: runtime.environment.network.networkId
    }));

    // Render (and most PaaS default health checks / uptime pings) hit `/`
    // rather than `/health`. Without this it 404s every deploy, and on a
    // free-tier instance any request — including a health check — is enough
    // to wake it back up, so this doubles as the frontend's wake-up target.
    app.get('/', (_request, response) => response.json({ ok: true, product: 'LumaPay' }));

    app.get('/api/v1/midnight/status', asyncRoute(async (_request, response) => {
        response.json(await runtime.gateway.status());
    }));

    app.get('/api/v1/contracts', (_request, response) => {
        response.json({ network: runtime.environment.network.networkId, contracts: runtime.environment.contracts });
    });

    app.post('/lumabot/chat', asyncRoute(async (request, response) => {
        const message = requiredString(request.body.message, 'message', 4000);
        const context = request.body.context && typeof request.body.context === 'object' ? request.body.context : {};
        response.json(await runtime.lumabot.chat(message, context));
    }));

    // address_hash-keyed (SHA-256 of the owning address, hashed client-side —
    // see frontend hashAddress()), not gated by the merchant session cookie:
    // a user's ability to compute the matching hash of their own address is
    // the access control here, same as elsewhere this repo hashes rather
    // than stores plaintext identifiers.
    const HEX_64 = /^[0-9a-f]{64}$/i;
    const optionalString = (value, label, maximum) => {
        if (value === undefined || value === null || value === '') return null;
        return requiredString(value, label, maximum);
    };

    app.get('/users/profile/:hash', asyncRoute(async (request, response) => {
        if (!HEX_64.test(request.params.hash)) throw new AppError('ADDRESS_HASH_INVALID', 'address_hash must be 32-byte hexadecimal.', 400);
        const profile = await runtime.repository.getUserProfile(request.params.hash.toLowerCase());
        if (!profile) throw new AppError('USER_PROFILE_NOT_FOUND', 'No profile found for this address.', 404);
        response.json(profile);
    }));

    app.post('/users/profile', asyncRoute(async (request, response) => {
        const addressHash = requiredString(request.body.address_hash, 'address_hash', 64).toLowerCase();
        if (!HEX_64.test(addressHash)) throw new AppError('ADDRESS_HASH_INVALID', 'address_hash must be 32-byte hexadecimal.', 400);
        const profile = await runtime.repository.upsertUserProfile({
            addressHash,
            mainAddress: requiredString(request.body.main_address, 'main_address', 8192),
            burnerAddress: optionalString(request.body.burner_address, 'burner_address', 8192),
            encryptedBurnerKey: optionalString(request.body.encrypted_burner_key, 'encrypted_burner_key', 8192),
            profileMainInvoiceHash: optionalString(request.body.profile_main_invoice_hash, 'profile_main_invoice_hash', 64),
            profileBurnerInvoiceHash: optionalString(request.body.profile_burner_invoice_hash, 'profile_burner_invoice_hash', 64)
        });
        response.status(201).json(profile);
    }));

    app.post('/users/profile/clear-burner', asyncRoute(async (request, response) => {
        const addressHash = requiredString(request.body.address_hash, 'address_hash', 64).toLowerCase();
        if (!HEX_64.test(addressHash)) throw new AppError('ADDRESS_HASH_INVALID', 'address_hash must be 32-byte hexadecimal.', 400);
        const profile = await runtime.repository.clearBurnerProfileData(addressHash);
        if (!profile) throw new AppError('USER_PROFILE_NOT_FOUND', 'No profile found for this address.', 404);
        response.json(profile);
    }));

    app.get('/users/notifications/:hash', asyncRoute(async (request, response) => {
        if (!HEX_64.test(request.params.hash)) throw new AppError('ADDRESS_HASH_INVALID', 'address_hash must be 32-byte hexadecimal.', 400);
        const prefs = await runtime.repository.getNotificationPreferences(request.params.hash.toLowerCase());
        response.json(prefs ?? { notify_on_settled: false });
    }));

    app.patch('/users/notifications', asyncRoute(async (request, response) => {
        const addressHash = requiredString(request.body.address_hash, 'address_hash', 64).toLowerCase();
        if (!HEX_64.test(addressHash)) throw new AppError('ADDRESS_HASH_INVALID', 'address_hash must be 32-byte hexadecimal.', 400);
        const prefs = await runtime.repository.updateNotificationPreferences(addressHash, Boolean(request.body.notify_on_settled));
        response.json(prefs);
    }));

    app.post('/support/feedback', asyncRoute(async (request, response) => {
        const email = requiredString(request.body.email, 'email', 320);
        if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
            throw new AppError('EMAIL_INVALID', 'A valid email address is required.', 400);
        }
        const type = requiredString(request.body.type, 'type', 16);
        if (!['complaint', 'feedback'].includes(type)) {
            throw new AppError('FEEDBACK_TYPE_INVALID', "type must be 'complaint' or 'feedback'.", 400);
        }
        const message = requiredString(request.body.message, 'message', 4000);
        const walletAddress = request.body.walletAddress
            ? requiredString(request.body.walletAddress, 'walletAddress', 512)
            : null;
        await runtime.repository.createSupportFeedback({
            id: crypto.randomUUID(),
            email,
            type,
            message,
            walletAddress
        });
        response.status(201).json({ success: true, message: "Thanks — we've got it." });
    }));

    app.post('/api/v1/auth/challenges', asyncRoute(async (request, response) => {
        const origin = String(request.get('origin') || request.body.origin || '').replace(/\/+$/, '');
        const challenge = await runtime.auth.createChallenge({
            address: request.body.midnight_address,
            origin
        });
        response.status(201).json(challenge);
    }));

    app.post('/api/v1/auth/sessions', asyncRoute(async (request, response) => {
        const session = await runtime.auth.createSession({
            challengeId: requiredString(request.body.challenge_id, 'challenge_id', 128),
            data: requiredString(request.body.data, 'data', 4096),
            signature: requiredString(request.body.signature, 'signature', 128),
            verifyingKey: requiredString(request.body.verifying_key, 'verifying_key', 64)
        });
        response.cookie('lumapay_session', session.token, {
            httpOnly: true,
            secure: runtime.environment.auth.secureCookies,
            // The frontend (Vercel) and backend (Render) live on different
            // domains, so every request between them is cross-site from the
            // cookie's perspective. SameSite=Lax is silently dropped by the
            // browser on cross-site fetches — the cookie would get set once
            // on login and then never sent back, permanently AUTH_REQUIRED.
            // SameSite=None requires Secure, so this only applies once we're
            // actually on HTTPS (production); local http://127.0.0.1 dev,
            // where frontend and backend share the same site, keeps Lax.
            sameSite: runtime.environment.auth.secureCookies ? 'none' : 'lax',
            path: '/',
            expires: session.expiresAt
        });
        response.status(201).json({
            authenticated: true,
            midnight_address: session.address,
            merchant_id: session.merchant?.id ?? null,
            expires_at: session.expiresAt.toISOString()
        });
    }));

    const walletAuthenticated = walletAuth(runtime);
    app.get('/api/v1/auth/session', walletAuthenticated, (request, response) => {
        response.json({
            authenticated: true,
            midnight_address: request.authSession.midnight_address,
            merchant_id: request.authSession.merchant?.id ?? request.authSession.merchant_id ?? null,
            expires_at: request.authSession.expires_at
        });
    });

    app.delete('/api/v1/auth/session', walletAuthenticated, asyncRoute(async (request, response) => {
        const token = readCookie(request, 'lumapay_session');
        await runtime.repository.revokeAuthSession(sha256(token));
        response.clearCookie('lumapay_session', {
            path: '/',
            secure: runtime.environment.auth.secureCookies,
            sameSite: runtime.environment.auth.secureCookies ? 'none' : 'lax'
        });
        response.status(204).end();
    }));

    app.get('/api/v1/chain/invoices/:invoiceId', asyncRoute(async (request, response) => {
        const id = normalizeBytes32(request.params.invoiceId, 'invoice_id');
        const invoice = await runtime.gateway.getInvoice(id);
        if (!invoice) throw new AppError('INVOICE_NOT_FOUND', 'Invoice not found on-chain.', 404);
        response.json(invoice);
    }));

    const publicChainRead = (parameter, field, load, code, label) => asyncRoute(async (request, response) => {
        const id = normalizeBytes32(request.params[parameter], field);
        const record = await load(id);
        if (!record) throw new AppError(code, `${label} not found on-chain.`, 404);
        response.json(record);
    });

    app.get('/api/v1/chain/campaigns/:campaignId', publicChainRead(
        'campaignId', 'campaign_id', (id) => runtime.gateway.getCampaign(id),
        'CAMPAIGN_NOT_FOUND', 'Campaign'
    ));
    app.get('/api/v1/chain/contributions/:contributionId', publicChainRead(
        'contributionId', 'contribution_id', (id) => runtime.gateway.getContribution(id),
        'CONTRIBUTION_NOT_FOUND', 'Contribution'
    ));
    app.get('/api/v1/chain/gift-cards/:giftCardId', publicChainRead(
        'giftCardId', 'gift_card_id', (id) => runtime.gateway.getGiftCard(id),
        'GIFT_CARD_NOT_FOUND', 'Gift card'
    ));
    app.get('/api/v1/chain/quotes/:quoteId', publicChainRead(
        'quoteId', 'quote_id', (id) => runtime.gateway.getQuote(id),
        'QUOTE_NOT_FOUND', 'Quote'
    ));
    app.get('/api/v1/chain/quote-providers/:providerId', publicChainRead(
        'providerId', 'provider_id', (id) => runtime.gateway.getQuoteProvider(id),
        'QUOTE_PROVIDER_NOT_FOUND', 'Quote provider'
    ));
    app.get('/api/v1/chain/backup-anchors/:ownerId', publicChainRead(
        'ownerId', 'owner_id', (id) => runtime.gateway.getBackupAnchor(id),
        'BACKUP_ANCHOR_NOT_FOUND', 'Backup anchor'
    ));
    app.get('/api/v1/chain/card-vaults/:cardId', publicChainRead(
        'cardId', 'card_id', (id) => runtime.gateway.getCardVault(id),
        'CARD_VAULT_NOT_FOUND', 'Card vault'
    ));
    app.get('/api/v1/chain/card-spends/:spendId', publicChainRead(
        'spendId', 'card_spend_id', (id) => runtime.gateway.getCardSpend(id),
        'CARD_SPEND_NOT_FOUND', 'Card spend'
    ));

    app.get('/api/v1/cards/current', walletAuthenticated, asyncRoute(async (request, response) => {
        const addressHash = sha256(request.authSession.midnight_address);
        const card = await runtime.repository.getCardWalletByOwnerHash(addressHash);
        if (!card) throw new AppError('CARD_NOT_FOUND', 'Card wallet not found.', 404);
        response.json(privateCard(card));
    }));

    app.post('/api/v1/cards', walletAuthenticated, asyncRoute(async (request, response) => {
        const addressHash = sha256(request.authSession.midnight_address);
        const card = cardMirrorInput(request.body, addressHash);
        const saved = await runtime.repository.upsertCardWallet(card);
        response.status(201).json(privateCard(saved));
    }));

    app.post('/api/v1/cards/lookup', asyncRoute(async (request, response) => {
        const cardNumberHash = normalizeBytes32(request.body.card_number_hash, 'card_number_hash');
        const card = await runtime.repository.lookupCardWalletByNumberHash(cardNumberHash);
        if (!card) throw new AppError('CARD_NOT_FOUND', 'Card wallet not found.', 404);
        response.json(publicCard(card));
    }));

    app.post('/api/v1/cards/limits', walletAuthenticated, asyncRoute(async (request, response) => {
        const addressHash = sha256(request.authSession.midnight_address);
        const card = await runtime.repository.getCardWalletByOwnerHash(addressHash);
        if (!card) throw new AppError('CARD_NOT_FOUND', 'Card wallet not found.', 404);
        const limits = request.body.limits && typeof request.body.limits === 'object' && !Array.isArray(request.body.limits)
            ? request.body.limits
            : card.limits;
        const saved = await runtime.repository.updateCardWallet(addressHash, {
            limits,
            card_limits_updated_at: new Date().toISOString()
        });
        response.json(privateCard(saved));
    }));

    app.post('/api/v1/cards/spend', walletAuthenticated, asyncRoute(async (request, response) => {
        const addressHash = sha256(request.authSession.midnight_address);
        const clientAddressHash = requiredString(request.body.address_hash, 'address_hash', 64).toLowerCase();
        if (clientAddressHash !== addressHash) {
            throw new AppError('CARD_OWNER_MISMATCH', 'Card owner does not match the authenticated wallet.', 403);
        }
        const token = requiredString(request.body.token, 'token', 24).toUpperCase();
        if (token !== 'NIGHT') {
            throw new AppError('TOKEN_UNAVAILABLE', 'Card spend is NIGHT-only on Preprod.', 400);
        }
        const amountMicro = BigInt(requiredString(request.body.amount_micro, 'amount_micro', 48));
        if (amountMicro <= 0n) throw new AppError('CARD_SPEND_INVALID', 'amount_micro must be positive.', 400);
        const card = await runtime.repository.getCardWalletByOwnerHash(addressHash);
        if (!card) throw new AppError('CARD_NOT_FOUND', 'Card wallet not found.', 404);
        response.json(privateCard(card));
    }));

    app.delete('/api/v1/cards/current', walletAuthenticated, asyncRoute(async (request, response) => {
        const addressHash = sha256(request.authSession.midnight_address);
        const closeTxId = request.body?.card_close_tx_id
            ? normalizeBytes32(request.body.card_close_tx_id, 'card_close_tx_id')
            : null;
        const card = await runtime.repository.deleteCardWallet(addressHash, closeTxId);
        response.json({ success: true, deletion_transaction_id: closeTxId, card: privateCard(card) });
    }));

    app.post('/api/v1/merchants', walletAuthenticated, asyncRoute(async (request, response) => {
        if (request.authSession.merchant_id || request.authSession.merchant) {
            throw new AppError('MERCHANT_ALREADY_EXISTS', 'This wallet already has a merchant account.', 409);
        }
        const apiKey = randomToken('luma_live_');
        const webhookUrl = optionalHttpUrl(request.body.webhook_url, 'webhook_url');
        const merchant = await runtime.repository.createMerchant({
            id: crypto.randomUUID(),
            name: requiredString(request.body.name, 'name', 120),
            midnightAddress: request.authSession.midnight_address,
            apiKey,
            webhookUrl,
            webhookSecret: webhookUrl ? randomToken('whsec_') : null
        });
        await runtime.repository.attachSessionMerchant(request.authSession.id, merchant.id);
        response.status(201).json({ merchant_id: merchant.id, api_key: apiKey });
    }));

    const authenticated = merchantAuth(runtime);
    app.post('/api/v1/invoices', authenticated, asyncRoute(async (request, response) => {
        const input = invoiceInput(request.body);
        const invoice = await runtime.repository.createInvoice({
            ...input,
            merchantId: request.merchant.id
        });
        response.status(201).json(invoice);
    }));

    app.get('/api/v1/invoices', authenticated, asyncRoute(async (request, response) => {
        const requestedStatus = request.query.status
            ? requiredString(request.query.status, 'status', 16).toUpperCase()
            : null;
        if (requestedStatus && !['PENDING', 'OPEN', 'SETTLED', 'CANCELLED', 'EXPIRED'].includes(requestedStatus)) {
            throw new AppError('STATUS_INVALID', 'Invoice status is invalid.', 400);
        }
        const invoices = await runtime.repository.listMerchantInvoices(request.merchant.id, requestedStatus);
        const views = await Promise.all(invoices.map(async (invoice) => {
            const invoiceId = invoice.invoice_id ?? invoice.invoiceId;
            const chain = await safeChainLookup(runtime, 'invoice', () => runtime.gateway.getInvoice(invoiceId));
            return merchantInvoice(invoice, chain);
        }));
        response.json(views);
    }));

    app.get('/api/v1/invoices/:invoiceId', asyncRoute(async (request, response) => {
        const id = normalizeBytes32(request.params.invoiceId, 'invoice_id');
        const local = await runtime.repository.getInvoice(id);
        if (!local) throw new AppError('INVOICE_NOT_FOUND', 'Invoice not found.', 404);
        const chain = await safeChainLookup(runtime, 'invoice', () => runtime.gateway.getInvoice(id));
        response.json(publicInvoice(local, chain));
    }));

    app.post('/api/v1/invoices/:invoiceId/reconcile', authenticated, asyncRoute(async (request, response) => {
        const invoice = await runtime.reconciliation.reconcileInvoice(
            request.params.invoiceId,
            request.body.transaction_id,
            qualifiedEscrowCoin(request.body.escrow_coin)
        );
        response.json(invoice);
    }));

    app.post('/api/v1/campaigns', authenticated, asyncRoute(async (request, response) => {
        const input = campaignInput(request.body);
        if (!(await runtime.gateway.verifyCampaignOpening(input.paymentOpening, input.commitment))) {
            throw new AppError('CAMPAIGN_OPENING_MISMATCH', 'Campaign terms do not match the supplied commitment.', 400);
        }
        const campaign = await runtime.repository.createCampaign({
            ...input,
            merchantId: request.merchant.id
        });
        response.status(201).json(campaign);
    }));

    app.get('/api/v1/campaigns', authenticated, asyncRoute(async (request, response) => {
        const requestedStatus = request.query.status
            ? requiredString(request.query.status, 'status', 16).toUpperCase()
            : null;
        if (requestedStatus && !['PENDING', 'OPEN', 'CANCELLED', 'EXPIRED'].includes(requestedStatus)) {
            throw new AppError('STATUS_INVALID', 'Campaign status is invalid.', 400);
        }
        const campaigns = await runtime.repository.listMerchantCampaigns(request.merchant.id, requestedStatus);
        const views = await Promise.all(campaigns.map(async (campaign) => {
            const campaignId = campaign.campaign_id ?? campaign.campaignId;
            const chain = await safeChainLookup(runtime, 'campaign', () => runtime.gateway.getCampaign(campaignId));
            return merchantCampaign(runtime, campaign, chain);
        }));
        response.json(views);
    }));

    app.get('/api/v1/campaigns/:campaignId', asyncRoute(async (request, response) => {
        const id = normalizeBytes32(request.params.campaignId, 'campaign_id');
        const local = await runtime.repository.getCampaign(id);
        if (!local) throw new AppError('CAMPAIGN_NOT_FOUND', 'Campaign not found.', 404);
        const chain = await safeChainLookup(runtime, 'campaign', () => runtime.gateway.getCampaign(id));
        response.json({
            ...publicCampaign(local, chain),
            payment_opening: storedCampaignOpening(local)
        });
    }));

    app.post('/api/v1/campaigns/:campaignId/reconcile', authenticated, asyncRoute(async (request, response) => {
        const campaignId = normalizeBytes32(request.params.campaignId, 'campaign_id');
        const campaign = await runtime.repository.getCampaign(campaignId);
        if (!campaign || campaign.merchant_id !== request.merchant.id) {
            throw new AppError('CAMPAIGN_NOT_FOUND', 'Campaign not found.', 404);
        }
        response.json(await runtime.reconciliation.reconcileCampaign(
            campaignId,
            request.body.transaction_id
                ? normalizeBytes32(request.body.transaction_id, 'transaction_id')
                : null
        ));
    }));

    app.post('/api/v1/campaigns/:campaignId/contributions', asyncRoute(async (request, response) => {
        const contribution = await runtime.reconciliation.registerContribution(
            request.params.campaignId,
            normalizeBytes32(request.body.transaction_id, 'transaction_id'),
            {
                contributionId: normalizeBytes32(request.body.contribution_id, 'contribution_id'),
                coin: qualifiedEscrowCoin(request.body.escrow_coin)
            }
        );
        response.status(201).json({
            contribution_id: contribution.contribution_id,
            campaign_id: contribution.campaign_id,
            transaction_id: contribution.transaction_id,
            receipt_commitment: contribution.receipt_commitment,
            claimed: contribution.claimed
        });
    }));

    app.post('/api/v1/campaigns/:campaignId/contributions/:contributionId/reconcile', authenticated, asyncRoute(async (request, response) => {
        const campaignId = normalizeBytes32(request.params.campaignId, 'campaign_id');
        const campaign = await runtime.repository.getCampaign(campaignId);
        if (!campaign || campaign.merchant_id !== request.merchant.id) {
            throw new AppError('CAMPAIGN_NOT_FOUND', 'Campaign not found.', 404);
        }
        const contribution = await runtime.reconciliation.reconcileContribution(
            campaignId,
            request.params.contributionId,
            request.body.transaction_id
                ? normalizeBytes32(request.body.transaction_id, 'transaction_id')
                : null
        );
        response.json({
            contribution_id: contribution.contribution_id,
            campaign_id: contribution.campaign_id,
            receipt_commitment: contribution.receipt_commitment,
            claimed: contribution.claimed
        });
    }));

    app.post('/api/v1/checkout-sessions', authenticated, asyncRoute(async (request, response) => {
        const invoiceId = normalizeBytes32(request.body.invoice_id, 'invoice_id');
        const invoice = await runtime.repository.getInvoice(invoiceId);
        if (!invoice || invoice.merchant_id !== request.merchant.id) {
            throw new AppError('INVOICE_NOT_FOUND', 'Invoice not found.', 404);
        }
        const chain = await runtime.gateway.getInvoice(invoiceId);
        if (!chain) throw new AppError('INVOICE_NOT_INDEXED', 'Invoice is not indexed on Midnight yet.', 409);
        const opening = storedInvoiceOpening(invoice);
        if (chain.status !== 'OPEN' || BigInt(opening.expiry) <= BigInt(Math.floor(Date.now() / 1_000))) {
            throw new AppError('INVOICE_NOT_PAYABLE', 'Only an open, unexpired invoice can create a checkout session.', 409);
        }
        if (chain.commitment !== invoice.commitment) {
            throw new AppError('INVOICE_COMMITMENT_MISMATCH', 'Cached and indexed invoice commitments differ.', 409);
        }
        if (!(await runtime.gateway.verifyInvoiceOpening(opening, chain.commitment))) {
            throw new AppError('PAYMENT_OPENING_MISMATCH', 'Checkout terms do not match the indexed invoice commitment.', 409);
        }
        const session = await runtime.repository.createCheckoutSession({
            id: crypto.randomUUID(),
            merchantId: request.merchant.id,
            invoiceId,
            successUrl: optionalHttpUrl(request.body.success_url, 'success_url'),
            cancelUrl: optionalHttpUrl(request.body.cancel_url, 'cancel_url')
        });
        response.status(201).json(await checkoutSessionView(runtime, session));
    }));

    app.get('/api/v1/checkout-sessions/:id', asyncRoute(async (request, response) => {
        const session = await runtime.repository.getCheckoutSession(
            requiredString(request.params.id, 'checkout_session_id', 64)
        );
        if (!session) throw new AppError('CHECKOUT_SESSION_NOT_FOUND', 'Checkout session not found.', 404);
        response.json(await checkoutSessionView(runtime, session));
    }));

    app.post('/api/v1/checkout-sessions/:id/reconcile', asyncRoute(async (request, response) => {
        const sessionId = requiredString(request.params.id, 'checkout_session_id', 64);
        const session = await runtime.repository.getCheckoutSession(sessionId);
        if (!session) throw new AppError('CHECKOUT_SESSION_NOT_FOUND', 'Checkout session not found.', 404);
        const transactionId = normalizeBytes32(request.body.transaction_id, 'transaction_id');
        await runtime.reconciliation.reconcileInvoice(
            session.invoice_id ?? session.invoiceId,
            transactionId,
            qualifiedEscrowCoin(request.body.escrow_coin)
        );
        const refreshed = await runtime.repository.getCheckoutSession(sessionId) ?? session;
        response.json(await checkoutSessionView(runtime, refreshed));
    }));

    app.use((_request, _response, next) => next(
        new AppError('ROUTE_NOT_FOUND', 'API route not found.', 404)
    ));
    app.use((error, request, response, _next) => {
        const normalized = asAppError(error);
        runtime.logger.error('api.request_failed', {
            method: request.method,
            path: request.path,
            code: normalized.code,
            error: normalized
        });
        response.status(normalized.status).json({
            error: { code: normalized.code, message: normalized.message, details: normalized.details }
        });
    });
    return app;
}
