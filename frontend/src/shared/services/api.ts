const API_URL = import.meta.env.VITE_API_URL || 'http://localhost:3000/api';
import { API_URL as MIDNIGHT_API_URL } from '../../midnight/config';
import { hashAddress } from '../utils/core/crypto';
import { CardTokenCode } from '../types/tokens';
import { SupportFeedbackPayload, TelegramLinkSession, CompleteTelegramLinkSessionResponse, LinkedTelegramAccount } from '../types/common';
import { Invoice } from '../types/invoice';
import { UserProfile, CardWalletProfile, CardWalletUpsertPayload } from '../types/user';
import { 
    LumaBotChatResponse 
} from '../types/bot';

type MerchantInvoiceResponse = {
    invoice_id: string;
    amount_atomic: string;
    token_type: string;
    status: string;
    chain_status: string;
    creation_tx_id?: string | null;
    settlement_tx_id?: string | null;
    receipt_commitment?: string | null;
    claimed?: boolean;
    claim_material?: Invoice['claim_material'];
    created_at?: string | null;
    updated_at?: string | null;
    title?: string;
    memo?: string;
    items?: Invoice['invoice_items'];
    payment_opening: { merchant?: string | null; invoiceNonce: string; expiry: string; [key: string]: unknown };
};

type MerchantCampaignResponse = {
    campaign_id: string;
    minimum_contribution: string;
    maximum_contribution: string;
    accepted_tokens: string[];
    status: string;
    chain_status: string;
    contribution_count?: string;
    creation_tx_id?: string | null;
    created_at?: string | null;
    updated_at?: string | null;
    payment_opening: { merchant?: string | null; campaignNonce: string; expiry: string; title?: string; memo?: string; [key: string]: unknown };
    contributions?: Array<{
        contribution_id: string;
        transaction_id?: string | null;
        receipt_commitment?: string | null;
        claimed?: boolean;
        claim_material?: Invoice['claim_material'];
        created_at?: string | null;
        updated_at?: string | null;
    }>;
};

const tokenTypeIndex = (token: string): number => ({ NIGHT: 0, USDCX: 1, USAD: 2 })[token] ?? 0;

function mapMerchantInvoice(value: MerchantInvoiceResponse): Invoice {
    const canonicalStatus = value.chain_status === 'NOT_CREATED' ? value.status : value.chain_status;
    return {
        invoice_hash: value.invoice_id,
        merchant_address: value.payment_opening.merchant || '',
        amount: Number(BigInt(value.amount_atomic)) / 1_000_000,
        status: canonicalStatus as Invoice['status'],
        invoice_transaction_id: value.creation_tx_id || undefined,
        payment_tx_id: value.settlement_tx_id || undefined,
        payment_tx_ids: value.settlement_tx_id ? [value.settlement_tx_id] : [],
        receipt_commitment: value.receipt_commitment || undefined,
        claimed: value.claimed ?? false,
        expiry: value.payment_opening.expiry,
        claim_material: value.claim_material ?? null,
        payment_opening: value.payment_opening,
        created_at: value.created_at || undefined,
        updated_at: value.updated_at || undefined,
        salt: value.payment_opening.invoiceNonce,
        invoice_type: 0,
        token_type: tokenTypeIndex(value.token_type),
        title: value.title || '',
        memo: value.memo || '',
        invoice_items: value.items || [],
        allowed_tokens: [value.token_type],
    };
}

function mapMerchantCampaign(value: MerchantCampaignResponse): Invoice {
    const claimable = value.contributions?.find((contribution) => !contribution.claimed && contribution.claim_material);
    const paid = value.contributions?.find((contribution) => contribution.receipt_commitment);
    const canonicalStatus = claimable
        ? 'SETTLED'
        : (value.chain_status === 'NOT_CREATED' ? value.status : value.chain_status);
    const minimum = Number(BigInt(value.minimum_contribution)) / 1_000_000;
    const isDonation = BigInt(value.minimum_contribution) === 1n && BigInt(value.maximum_contribution) > 1n;
    return {
        invoice_hash: value.campaign_id,
        merchant_address: value.payment_opening.merchant || '',
        amount: isDonation ? 0 : minimum,
        status: canonicalStatus as Invoice['status'],
        invoice_transaction_id: value.creation_tx_id || undefined,
        payment_tx_id: paid?.transaction_id || undefined,
        payment_tx_ids: value.contributions?.map((contribution) => contribution.transaction_id || '').filter(Boolean) ?? [],
        receipt_commitment: paid?.receipt_commitment || undefined,
        claimed: value.contributions?.every((contribution) => contribution.claimed) ?? false,
        expiry: value.payment_opening.expiry,
        claim_material: claimable?.claim_material
            ? { ...claimable.claim_material, contributionId: claimable.contribution_id }
            : null,
        payment_opening: value.payment_opening,
        created_at: value.created_at || undefined,
        updated_at: value.updated_at || undefined,
        salt: value.payment_opening.campaignNonce,
        invoice_type: isDonation ? 2 : 1,
        token_type: tokenTypeIndex(value.accepted_tokens[0] ?? 'NIGHT'),
        title: value.payment_opening.title || (isDonation ? 'Donation campaign' : 'Multi-pay campaign'),
        memo: value.payment_opening.memo || '',
        invoice_items: [],
        allowed_tokens: value.accepted_tokens,
    };
}



export const fetchInvoices = async (status?: string): Promise<Invoice[]> => {
    const url = new URL(`${MIDNIGHT_API_URL}/api/v1/invoices`);
    const campaignsUrl = new URL(`${MIDNIGHT_API_URL}/api/v1/campaigns`);
    if (status) {
        url.searchParams.append('status', status);
        campaignsUrl.searchParams.append('status', status);
    }

    // Fetched independently: a campaigns failure (or vice versa) should not blank
    // out invoices you're otherwise entitled to see, and vice versa.
    const [invoiceResult, campaignResult] = await Promise.allSettled([
        fetch(url.toString(), { credentials: 'include' }).then(async (res) => {
            if (!res.ok) throw new Error(res.status === 401 ? 'AUTH_REQUIRED' : `Failed to fetch invoices (${res.status})`);
            return (await res.json()).map(mapMerchantInvoice);
        }),
        fetch(campaignsUrl.toString(), { credentials: 'include' }).then(async (res) => {
            if (!res.ok) throw new Error(res.status === 401 ? 'AUTH_REQUIRED' : `Failed to fetch campaigns (${res.status})`);
            return (await res.json()).map(mapMerchantCampaign);
        }),
    ]);

    if (invoiceResult.status === 'rejected' && campaignResult.status === 'rejected') {
        throw invoiceResult.reason;
    }
    if (invoiceResult.status === 'rejected') {
        console.error('fetchInvoices: invoice fetch failed', invoiceResult.reason);
    }
    if (campaignResult.status === 'rejected') {
        console.error('fetchInvoices: campaign fetch failed', campaignResult.reason);
    }

    return [
        ...(invoiceResult.status === 'fulfilled' ? invoiceResult.value : []),
        ...(campaignResult.status === 'fulfilled' ? campaignResult.value : []),
    ].sort((left, right) => Date.parse(right.created_at || '') - Date.parse(left.created_at || ''));
};

// Note for anyone touching invoice/campaign API calls: this file has two
// unrelated API base URLs. MIDNIGHT_API_URL (imported above) is real and
// matches the backend's actual /api/v1/... routes; the plain API_URL below
// is a stale pre-v1 base with no matching backend routes at all. Every
// function below that still uses it (updateInvoiceStatus) is effectively
// dead — confirmed by tracing each of its callers.
export const updateInvoiceStatus = async (hash: string, data: Partial<Invoice>): Promise<Invoice> => {
    const response = await fetch(`${API_URL}/invoices/${hash}`, {
        method: 'PATCH',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(data)
    });
    if (!response.ok) {
        const err = await response.json();
        throw new Error(err.error || 'Failed to update invoice');
    }
    return response.json();
};

export const fetchInvoicesByMerchant = async (merchant: string): Promise<Invoice[]> => {
    void merchant;
    return fetchInvoices();
};
export const fetchInvoicesByMerchantForSdk = async (
    merchant: string,
    options?: { forSdk?: boolean }
): Promise<Invoice[]> => {
    void merchant;
    const invoices = await fetchInvoices();
    return options?.forSdk ? invoices.filter((invoice) => invoice.for_sdk) : invoices;
};

export const fetchRecentTransactions = async (limit: number = 10): Promise<Invoice[]> => {
    const invoices = await fetchInvoices();
    return invoices.slice(0, limit);
};






export const getUserProfile = async (address: string): Promise<UserProfile | null> => {
    const hash = await hashAddress(address);
    const response = await fetch(`${API_URL}/users/profile/${hash}`);
    if (!response.ok) {
        if (response.status === 404) {
            return null;
        }
        throw new Error('Failed to fetch user profile');
    }
    return response.json();
};

export const updateUserProfile = async (
    address: string,
    encrypted_main_address: string,
    burner_address?: string,
    encrypted_burner_key?: string,
    profile_main_invoice_hash?: string,
    profile_burner_invoice_hash?: string
): Promise<UserProfile> => {
    const address_hash = await hashAddress(address);
    const response = await fetch(`${API_URL}/users/profile`, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify({
            address_hash,
            main_address: encrypted_main_address,
            burner_address,
            encrypted_burner_key,
            profile_main_invoice_hash,
            profile_burner_invoice_hash
        }),
    });

    if (!response.ok) {
        throw new Error('Failed to update user profile');
    }

    return response.json();
};

export const clearBurnerData = async (address: string): Promise<void> => {
    const address_hash = await hashAddress(address);
    const response = await fetch(`${API_URL}/users/profile/clear-burner`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ address_hash }),
    });
    if (!response.ok) {
        throw new Error('Failed to clear burner data');
    }
};

export const getCardWallet = async (address: string): Promise<CardWalletProfile | null> => {
    void address;
    const response = await fetch(`${MIDNIGHT_API_URL}/api/v1/cards/current`, { credentials: 'include' });
    if (!response.ok) {
        if (response.status === 404) {
            return null;
        }
        throw new Error('Failed to fetch card wallet');
    }
    return response.json();
};

export const upsertCardWallet = async (
    address: string,
    payload: CardWalletUpsertPayload
): Promise<CardWalletProfile> => {
    const address_hash = await hashAddress(address);
    const response = await fetch(`${MIDNIGHT_API_URL}/api/v1/cards`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        credentials: 'include',
        body: JSON.stringify({
            address_hash,
            ...payload
        })
    });

    if (!response.ok) {
        const err = await response.json().catch(() => null);
        throw new Error(err?.error || 'Failed to save card wallet');
    }

    return response.json();
};



export const fetchTelegramLinkSession = async (token: string): Promise<TelegramLinkSession> => {
    const response = await fetch(`${API_URL}/telegram/link-sessions/${encodeURIComponent(token)}`);
    const payload = await response.json().catch(() => null);

    if (!response.ok) {
        throw new Error(payload?.error?.message || payload?.error || 'Failed to load Telegram link session');
    }

    return payload;
};

export const completeTelegramLinkSession = async (payload: {
    token: string;
    midnight_address: string;
    /** Hex-encoded, from ConnectedAPI.signData — not actually base64, despite the historical field name. */
    signature: string;
    /** The signing wallet's verifying key (hex) — required to actually verify the signature server-side; a Midnight address alone can't be reversed back into one. */
    verifying_key: string;
    username?: string;
    midnight_address_client_ciphertext?: string;
}): Promise<CompleteTelegramLinkSessionResponse> => {
    const response = await fetch(`${API_URL}/telegram/link-sessions/complete`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(payload)
    });

    const body = await response.json().catch(() => null);
    if (!response.ok) {
        throw new Error(body?.error || 'Failed to complete Telegram wallet link');
    }

    return body;
};

export const fetchLinkedTelegramAccounts = async (address: string): Promise<LinkedTelegramAccount[]> => {
    const hash = await hashAddress(address);
    const response = await fetch(`${API_URL}/telegram/linked-accounts/${hash}`);
    if (!response.ok) {
        return [];
    }
    return response.json();
};

export const lookupCardWalletByNumberHash = async (
    cardNumberHash: string
): Promise<CardWalletProfile | null> => {
    const response = await fetch(`${MIDNIGHT_API_URL}/api/v1/cards/lookup`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ card_number_hash: cardNumberHash })
    });

    if (!response.ok) {
        if (response.status === 404) {
            return null;
        }
        const err = await response.json().catch(() => null);
        throw new Error(err?.error || 'Failed to look up card wallet');
    }

    return response.json();
};

export const submitCardLimitChange = async (
    address: string,
    mainAddress: string,
    message: string,
    signatureBase64: string
): Promise<CardWalletProfile> => {
    void address;
    void mainAddress;
    const parsed = JSON.parse(message) as { token?: CardTokenCode; next_limits?: Record<string, unknown> };
    const limits = parsed.token && parsed.next_limits
        ? { [parsed.token]: parsed.next_limits }
        : undefined;
    const response = await fetch(`${MIDNIGHT_API_URL}/api/v1/cards/limits`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        credentials: 'include',
        body: JSON.stringify({
            message,
            signature_base64: signatureBase64,
            limits
        })
    });

    if (!response.ok) {
        const err = await response.json().catch(() => null);
        throw new Error(err?.error || 'Failed to update card limits');
    }

    return response.json();
};

export const deleteCardWallet = async (
    address: string,
    mainAddress: string,
    message: string,
    signatureBase64: string,
    deletionTransactionId?: string
): Promise<{ success: boolean; deletion_transaction_id: string | null; card: CardWalletProfile | null }> => {
    void address;
    void mainAddress;
    const response = await fetch(`${MIDNIGHT_API_URL}/api/v1/cards/current`, {
        method: 'DELETE',
        headers: { 'Content-Type': 'application/json' },
        credentials: 'include',
        body: JSON.stringify({
            message,
            signature_base64: signatureBase64,
            card_close_tx_id: deletionTransactionId || null
        })
    });

    if (!response.ok) {
        const err = await response.json().catch(() => null);
        throw new Error(err?.error || 'Failed to delete card wallet');
    }

    return response.json();
};

export const recordCardSpend = async (
    address: string,
    token: CardTokenCode,
    amountMicro: number
): Promise<CardWalletProfile> => {
    const address_hash = await hashAddress(address);
    const response = await fetch(`${MIDNIGHT_API_URL}/api/v1/cards/spend`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        credentials: 'include',
        body: JSON.stringify({
            address_hash,
            token,
            amount_micro: amountMicro
        })
    });

    if (!response.ok) {
        const err = await response.json().catch(() => null);
        throw new Error(err?.error || 'Failed to record card spend');
    }

    return response.json();
};

export const chatWithDashboardAssistant = async (
    message: string,
    context: Record<string, unknown>
): Promise<string> => {
    const response = await fetch(`${API_URL}/dashboard-assistant/chat`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ message, context })
    });

    const payload = await response.json();
    if (!response.ok) {
        throw new Error(payload?.error?.message || payload?.error || 'Failed to chat with dashboard assistant');
    }

    return payload.reply;
};


export const chatWithLumaBot = async (
    message: string,
    context: Record<string, unknown>
): Promise<LumaBotChatResponse> => {
    const response = await fetch(`${API_URL}/lumabot/chat`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ message, context })
    });

    const payload = await response.json();
    if (!response.ok) {
        throw new Error(payload?.error?.message || payload?.error || 'Failed to chat with LumaBot');
    }

    return payload;
};

export const chatWithDeveloperAssistant = async (
    message: string,
    context: Record<string, unknown>
): Promise<string> => {
    const response = await fetch(`${API_URL}/developer-assistant/chat`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ message, context })
    });

    const payload = await response.json();
    if (!response.ok) {
        throw new Error(payload?.error?.message || payload?.error || 'Failed to chat with developer assistant');
    }

    return payload.reply;
};

export const getNotificationPreferences = async (address: string): Promise<{ notify_on_settled: boolean }> => {
    const hash = await hashAddress(address);
    const response = await fetch(`${API_URL}/users/notifications/${hash}`);
    if (!response.ok) {
        if (response.status === 404) return { notify_on_settled: false };
        throw new Error('Failed to fetch notification preferences');
    }
    return response.json();
};

export const updateNotificationPreferences = async (
    address: string,
    prefs: { notify_on_settled: boolean }
): Promise<{ notify_on_settled: boolean }> => {
    const address_hash = await hashAddress(address);
    const response = await fetch(`${API_URL}/users/notifications`, {
        method: 'PATCH',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ address_hash, ...prefs })
    });
    if (!response.ok) {
        throw new Error('Failed to update notification preferences');
    }
    return response.json();
};

export const submitSupportFeedback = async (
    payload: SupportFeedbackPayload
): Promise<{ success: boolean; message: string }> => {
    const response = await fetch(`${API_URL}/support/feedback`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(payload)
    });

    const data = await response.json().catch(() => null);
    if (!response.ok) {
        throw new Error(data?.error?.message || data?.error || 'Failed to submit support feedback');
    }

    return data;
};
