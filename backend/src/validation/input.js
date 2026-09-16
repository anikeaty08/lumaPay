import { AppError } from '../errors/app-error.js';
import { normalizeBytes32 } from '../domain/identifiers.js';

export function requiredString(value, label, maximum = 512) {
    const normalized = String(value ?? '').trim();
    if (!normalized || normalized.length > maximum) {
        throw new AppError(
            'INPUT_INVALID',
            `${label} is required and must be at most ${maximum} characters.`,
            400,
            { label }
        );
    }
    return normalized;
}

export function optionalHttpUrl(value, label) {
    if (value === undefined || value === null || value === '') return null;
    const normalized = requiredString(value, label, 2048);
    let parsed;
    try { parsed = new URL(normalized); } catch {
        throw new AppError('URL_INVALID', `${label} must be a valid URL.`, 400, { label });
    }
    if (!['https:', 'http:'].includes(parsed.protocol)) {
        throw new AppError('URL_INVALID', `${label} must use HTTP or HTTPS.`, 400, { label });
    }
    if (process.env.NODE_ENV === 'production' && parsed.protocol !== 'https:') {
        throw new AppError('URL_INSECURE', `${label} must use HTTPS in production.`, 400, { label });
    }
    return parsed.toString();
}

const U128_MAX = (1n << 128n) - 1n;

function unsignedInteger(value, label, maximum = U128_MAX) {
    const normalized = requiredString(value, label, 48);
    if (!/^\d+$/.test(normalized)) {
        throw new AppError('PAYMENT_OPENING_INVALID', `${label} must be an unsigned decimal integer.`, 400, { label });
    }
    const integer = BigInt(normalized);
    if (integer < 0n || integer > maximum) {
        throw new AppError('PAYMENT_OPENING_INVALID', `${label} is outside the supported range.`, 400, { label });
    }
    return normalized;
}

function optionalDisplayString(value, label, maximum) {
    if (value === undefined || value === null || value === '') return null;
    return requiredString(value, label, maximum);
}

export function invoicePaymentOpening(value, expectedInvoiceId, expectedExpiry) {
    if (!value || typeof value !== 'object' || Array.isArray(value)) {
        throw new AppError('PAYMENT_OPENING_INVALID', 'payment_opening must be an object.', 400);
    }
    if (value.kind !== 'invoice') {
        throw new AppError('PAYMENT_OPENING_INVALID', 'payment_opening.kind must be invoice.', 400);
    }
    const invoiceId = normalizeBytes32(value.invoiceId, 'payment_opening.invoiceId');
    const expiry = unsignedInteger(value.expiry, 'payment_opening.expiry', (1n << 64n) - 1n);
    if (expectedInvoiceId && invoiceId !== expectedInvoiceId) {
        throw new AppError('PAYMENT_OPENING_MISMATCH', 'Payment opening invoice ID does not match the invoice.', 400);
    }
    if (expectedExpiry && expiry !== expectedExpiry) {
        throw new AppError('PAYMENT_OPENING_MISMATCH', 'Payment opening expiry does not match the invoice.', 400);
    }
    const amount = unsignedInteger(value.amount, 'payment_opening.amount');
    if (BigInt(amount) === 0n) {
        throw new AppError('PAYMENT_OPENING_INVALID', 'Invoice payment amount must be greater than zero.', 400);
    }
    const token = requiredString(value.token, 'payment_opening.token', 24).toUpperCase();
    if (!/^[A-Z0-9_-]+$/.test(token)) {
        throw new AppError('PAYMENT_OPENING_INVALID', 'payment_opening.token has an invalid format.', 400);
    }

    let items = null;
    if (value.items !== undefined && value.items !== null) {
        if (!Array.isArray(value.items) || value.items.length > 100) {
            throw new AppError('PAYMENT_OPENING_INVALID', 'payment_opening.items must contain at most 100 entries.', 400);
        }
        items = value.items.map((item, index) => {
            if (!item || typeof item !== 'object' || Array.isArray(item)) {
                throw new AppError('PAYMENT_OPENING_INVALID', `payment_opening.items[${index}] is invalid.`, 400);
            }
            const quantity = Number(item.quantity);
            const unitPrice = Number(item.unitPrice);
            const total = Number(item.total);
            if (![quantity, unitPrice, total].every(Number.isFinite) || quantity < 0 || unitPrice < 0 || total < 0) {
                throw new AppError('PAYMENT_OPENING_INVALID', `payment_opening.items[${index}] contains an invalid amount.`, 400);
            }
            return {
                name: requiredString(item.name, `payment_opening.items[${index}].name`, 160),
                quantity,
                unitPrice,
                total
            };
        });
    }

    return Object.freeze({
        version: 1,
        kind: 'invoice',
        invoiceId,
        amount,
        token,
        tokenId: normalizeBytes32(value.tokenId, 'payment_opening.tokenId'),
        expiry,
        merchant: optionalDisplayString(value.merchant, 'payment_opening.merchant', 512),
        merchantPrivateIdentity: normalizeBytes32(value.merchantPrivateIdentity, 'payment_opening.merchantPrivateIdentity'),
        invoiceNonce: normalizeBytes32(value.invoiceNonce, 'payment_opening.invoiceNonce'),
        invoiceRandomness: normalizeBytes32(value.invoiceRandomness, 'payment_opening.invoiceRandomness'),
        title: optionalDisplayString(value.title, 'payment_opening.title', 160),
        memo: optionalDisplayString(value.memo, 'payment_opening.memo', 2_000),
        items
    });
}

export function qualifiedEscrowCoin(value) {
    if (value === undefined || value === null) return null;
    if (typeof value !== 'object' || Array.isArray(value)) {
        throw new AppError('ESCROW_COIN_INVALID', 'escrow_coin must be an object.', 400);
    }
    const amount = unsignedInteger(value.value, 'escrow_coin.value');
    if (BigInt(amount) === 0n) {
        throw new AppError('ESCROW_COIN_INVALID', 'escrow_coin.value must be greater than zero.', 400);
    }
    return Object.freeze({
        nonce: normalizeBytes32(value.nonce, 'escrow_coin.nonce'),
        color: normalizeBytes32(value.color, 'escrow_coin.color'),
        value: amount,
        mtIndex: unsignedInteger(value.mtIndex, 'escrow_coin.mtIndex')
    });
}

export function campaignPaymentOpening(value, expectedCampaignId, expectedExpiry) {
    if (!value || typeof value !== 'object' || Array.isArray(value)) {
        throw new AppError('CAMPAIGN_OPENING_INVALID', 'payment_opening must be an object.', 400);
    }
    if (value.kind !== 'campaign') {
        throw new AppError('CAMPAIGN_OPENING_INVALID', 'payment_opening.kind must be campaign.', 400);
    }
    const campaignId = normalizeBytes32(value.campaignId, 'payment_opening.campaignId');
    const expiry = unsignedInteger(value.expiry, 'payment_opening.expiry', (1n << 64n) - 1n);
    if (expectedCampaignId && campaignId !== expectedCampaignId) {
        throw new AppError('CAMPAIGN_OPENING_MISMATCH', 'Payment opening campaign ID does not match the campaign.', 400);
    }
    if (expectedExpiry && expiry !== expectedExpiry) {
        throw new AppError('CAMPAIGN_OPENING_MISMATCH', 'Payment opening expiry does not match the campaign.', 400);
    }
    const minimumContribution = unsignedInteger(value.minimumContribution, 'payment_opening.minimumContribution');
    const maximumContribution = unsignedInteger(value.maximumContribution, 'payment_opening.maximumContribution');
    if (BigInt(minimumContribution) === 0n || BigInt(maximumContribution) < BigInt(minimumContribution)) {
        throw new AppError('CAMPAIGN_OPENING_INVALID', 'Campaign contribution range is invalid.', 400);
    }
    if (!Array.isArray(value.acceptedTokens) || value.acceptedTokens.length < 1 || value.acceptedTokens.length > 4) {
        throw new AppError('CAMPAIGN_OPENING_INVALID', 'acceptedTokens must contain one to four tokens.', 400);
    }
    if (!Array.isArray(value.acceptedTokenIds) || value.acceptedTokenIds.length !== value.acceptedTokens.length) {
        throw new AppError('CAMPAIGN_OPENING_INVALID', 'acceptedTokenIds must match acceptedTokens.', 400);
    }
    const acceptedTokens = value.acceptedTokens.map((token, index) => {
        const normalized = requiredString(token, `payment_opening.acceptedTokens[${index}]`, 24).toUpperCase();
        if (!/^[A-Z0-9_-]+$/.test(normalized)) {
            throw new AppError('CAMPAIGN_OPENING_INVALID', 'acceptedTokens contains an invalid token.', 400);
        }
        return normalized;
    });
    const acceptedTokenIds = value.acceptedTokenIds.map((id, index) =>
        normalizeBytes32(id, `payment_opening.acceptedTokenIds[${index}]`)
    );
    if (new Set(acceptedTokens).size !== acceptedTokens.length) {
        throw new AppError('CAMPAIGN_OPENING_INVALID', 'acceptedTokens must be unique.', 400);
    }
    if (new Set(acceptedTokenIds).size !== acceptedTokenIds.length) {
        throw new AppError('CAMPAIGN_OPENING_INVALID', 'acceptedTokenIds must be unique.', 400);
    }
    return Object.freeze({
        version: 1,
        kind: 'campaign',
        campaignId,
        minimumContribution,
        maximumContribution,
        acceptedTokens,
        acceptedTokenIds,
        expiry,
        merchantPrivateIdentity: normalizeBytes32(value.merchantPrivateIdentity, 'payment_opening.merchantPrivateIdentity'),
        campaignNonce: normalizeBytes32(value.campaignNonce, 'payment_opening.campaignNonce'),
        campaignRandomness: normalizeBytes32(value.campaignRandomness, 'payment_opening.campaignRandomness')
    });
}

export function campaignInput(body) {
    const expiry = BigInt(requiredString(body.expiry, 'expiry', 24));
    const now = BigInt(Math.floor(Date.now() / 1000));
    if (expiry <= now || expiry > now + 366n * 24n * 60n * 60n) {
        throw new AppError('CAMPAIGN_EXPIRY_INVALID', 'expiry must be a future Unix timestamp in seconds.', 400);
    }
    const campaignId = normalizeBytes32(body.campaign_id, 'campaign_id');
    const paymentOpening = campaignPaymentOpening(body.payment_opening, campaignId, expiry.toString());
    const serializedOpening = JSON.stringify(paymentOpening);
    return {
        campaignId,
        commitment: normalizeBytes32(body.commitment, 'commitment'),
        merchantAuthorization: normalizeBytes32(body.merchant_authorization, 'merchant_authorization'),
        expiry: expiry.toString(),
        paymentOpening,
        serializedOpening,
        creationTxId: body.creation_tx_id
            ? normalizeBytes32(body.creation_tx_id, 'creation_tx_id')
            : null
    };
}

function optionalString(value, label, maximum = 4096) {
    if (value === undefined || value === null || value === '') return null;
    return requiredString(value, label, maximum);
}

export function cardMirrorInput(body, expectedAddressHash) {
    const addressHash = requiredString(body.address_hash, 'address_hash', 64).toLowerCase();
    if (!/^[0-9a-f]{64}$/.test(addressHash)) {
        throw new AppError('CARD_INPUT_INVALID', 'address_hash must be a SHA-256 hexadecimal digest.', 400);
    }
    if (expectedAddressHash && addressHash !== expectedAddressHash) {
        throw new AppError('CARD_OWNER_MISMATCH', 'Card owner does not match the authenticated wallet.', 403);
    }
    const cardId = body.card_id ? normalizeBytes32(body.card_id, 'card_id') : null;
    return {
        addressHash,
        mainAddress: optionalString(body.main_address, 'main_address', 512),
        cardId,
        cardAddress: optionalString(body.card_address, 'card_address', 4096),
        encryptedCardNumber: optionalString(body.encrypted_card_number, 'encrypted_card_number', 4096),
        cardNumberHash: body.card_number_hash ? normalizeBytes32(body.card_number_hash, 'card_number_hash') : null,
        cardMetadataDigest: body.card_metadata_digest ? normalizeBytes32(body.card_metadata_digest, 'card_metadata_digest') : null,
        cardOwnerSecretCiphertext: optionalString(body.card_owner_secret_ciphertext, 'card_owner_secret_ciphertext', 4096),
        cardOwnerPrivateIdentityCiphertext: optionalString(body.card_owner_private_identity_ciphertext, 'card_owner_private_identity_ciphertext', 4096),
        cardVaultNonceCiphertext: optionalString(body.card_vault_nonce_ciphertext, 'card_vault_nonce_ciphertext', 4096),
        cardVaultRandomnessCiphertext: optionalString(body.card_vault_randomness_ciphertext, 'card_vault_randomness_ciphertext', 4096),
        cardVaultCommitment: body.card_vault_commitment ? normalizeBytes32(body.card_vault_commitment, 'card_vault_commitment') : null,
        cardCreationTxId: body.card_creation_tx_id ? normalizeBytes32(body.card_creation_tx_id, 'card_creation_tx_id') : null,
        cardCloseTxId: body.card_close_tx_id ? normalizeBytes32(body.card_close_tx_id, 'card_close_tx_id') : null,
        cardLast4: optionalString(body.card_last4, 'card_last4', 8),
        encryptedCardPrivateKey: optionalString(body.encrypted_card_private_key, 'encrypted_card_private_key', 4096),
        cardKdfSalt: optionalString(body.card_kdf_salt, 'card_kdf_salt', 512),
        cardKdfAlgorithm: optionalString(body.card_kdf_algorithm, 'card_kdf_algorithm', 64),
        cardKdfParams: body.card_kdf_params && typeof body.card_kdf_params === 'object' && !Array.isArray(body.card_kdf_params)
            ? body.card_kdf_params
            : null,
        cardStatus: optionalString(body.card_status, 'card_status', 32) ?? 'ACTIVE',
        cardLabel: optionalString(body.card_label, 'card_label', 512),
        cardHint: optionalString(body.card_hint, 'card_hint', 512),
        limits: body.limits && typeof body.limits === 'object' && !Array.isArray(body.limits)
            ? body.limits
            : null
    };
}

export function invoiceInput(body) {
    const expiry = BigInt(requiredString(body.expiry, 'expiry', 24));
    const now = BigInt(Math.floor(Date.now() / 1000));
    if (expiry <= now || expiry > now + 366n * 24n * 60n * 60n) {
        throw new AppError('INVOICE_EXPIRY_INVALID', 'expiry must be a future Unix timestamp in seconds.', 400);
    }
    const invoiceId = normalizeBytes32(body.invoice_id, 'invoice_id');
    const paymentOpening = invoicePaymentOpening(body.payment_opening, invoiceId, expiry.toString());
    const serializedOpening = JSON.stringify(paymentOpening);
    return {
        invoiceId,
        commitment: normalizeBytes32(body.commitment, 'commitment'),
        merchantAuthorization: normalizeBytes32(
            body.merchant_authorization,
            'merchant_authorization'
        ),
        expiry: expiry.toString(),
        paymentOpening,
        serializedOpening,
        creationTxId: body.creation_tx_id
            ? normalizeBytes32(body.creation_tx_id, 'creation_tx_id')
            : null
    };
}
