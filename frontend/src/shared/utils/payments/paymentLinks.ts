export interface ParsedPaymentLink {
    merchant: string | null;
    amount: string | null;
    salt: string | null;
    hash: string | null;
    title: string;
    memo: string;
    tokenType: number;
    invoiceType: number;
    raw: string;
    href: string;
    /**
     * The full decoded payment opening from a modern `?opening=` link (its
     * `kind` is 'invoice' or 'campaign') — the only source of the fields
     * actually needed to build a payable transaction (merchantPrivateIdentity,
     * invoiceNonce/invoiceRandomness, or the campaign equivalents). No
     * backend endpoint re-exposes this for an arbitrary invoice/campaign ID
     * by design (payment openings are private, transmitted only via the
     * link itself), so any caller that needs to actually pay this link —
     * not just display it — must read from here, not from a fetch. Null
     * for the legacy `?merchant&salt&hash` link format.
     */
    opening: Record<string, unknown> | null;
}

// Decodes the base64url `opening` payload used by /pay?opening=... links
// (see frontend/src/shared/hooks/payments/useSharedPayment.ts#decodeOpening).
// Kept forgiving: any malformed/unexpected payload just falls through to null
// so the caller can report the standard "not a valid link" error.
const decodeOpeningParam = (encoded: string): Record<string, unknown> | null => {
    try {
        const base64 = encoded.replaceAll('-', '+').replaceAll('_', '/').padEnd(Math.ceil(encoded.length / 4) * 4, '=');
        const bytes = Uint8Array.from(atob(base64), (character) => character.charCodeAt(0));
        const value = JSON.parse(new TextDecoder().decode(bytes));
        return value && typeof value === 'object' ? value as Record<string, unknown> : null;
    } catch {
        return null;
    }
};

const tokenTypeFromCode = (code: unknown): number => {
    const normalized = String(code ?? '').toLowerCase();
    return normalized === 'usdcx' ? 1 : normalized === 'usad' ? 2 : normalized === 'any' ? 3 : 0;
};

export const parsePaymentLink = (rawValue: string): ParsedPaymentLink | null => {
    const trimmed = rawValue.trim();
    if (!trimmed) return null;

    try {
        let url: URL;
        try {
            url = new URL(trimmed);
        } catch {
            if (trimmed.startsWith('http')) return null;
            url = new URL(trimmed, window.location.origin);
        }

        const merchant = url.searchParams.get('merchant');
        const amount = url.searchParams.get('amount');
        const salt = url.searchParams.get('salt');
        const hash = url.searchParams.get('hash');
        const title = url.searchParams.get('title') || '';
        const memo = url.searchParams.get('memo') || '';
        const tokenParam = url.searchParams.get('token');
        const typeParam = url.searchParams.get('type');

        if (hash || (merchant && salt)) {
            return {
                merchant,
                amount,
                salt,
                hash,
                title,
                memo,
                tokenType: tokenTypeFromCode(tokenParam),
                invoiceType: typeParam === 'donation' ? 2 : typeParam === 'multipay' ? 1 : 0,
                raw: trimmed,
                href: url.toString(),
                opening: null,
            };
        }

        // Current-format shared payment link: a single base64url `opening` param
        // carrying the full invoice/campaign payment opening (see /pay page).
        const openingParam = url.searchParams.get('opening');
        const opening = openingParam ? decodeOpeningParam(openingParam) : null;
        if (opening && (opening.kind === 'invoice' || opening.kind === 'campaign')) {
            const openingHash = opening.kind === 'invoice' ? opening.invoiceId : opening.campaignId;
            const openingSalt = opening.kind === 'invoice' ? opening.invoiceNonce : opening.campaignNonce;
            const openingToken = opening.kind === 'invoice'
                ? opening.token
                : (opening.acceptedTokens as string[] | undefined)?.[0] ?? 'NIGHT';
            if (typeof openingHash === 'string') {
                // A campaign's minimumContribution of exactly 1 (micro-unit)
                // is the sentinel useCreateInvoice.ts/useSharedPayment.ts
                // both use for "open donation amount" — anything else with
                // a fixed minimum is a Multi Pay campaign, not a donation.
                const isDonation = opening.kind === 'campaign'
                    && typeof opening.minimumContribution === 'string'
                    && (() => { try { return BigInt(opening.minimumContribution as string) === 1n; } catch { return false; } })();
                return {
                    merchant: typeof opening.merchant === 'string' ? opening.merchant : null,
                    amount: opening.kind === 'invoice' && typeof opening.amount === 'string' ? opening.amount : null,
                    salt: typeof openingSalt === 'string' ? openingSalt : null,
                    hash: openingHash,
                    title: typeof opening.title === 'string' ? opening.title : '',
                    memo: typeof opening.memo === 'string' ? opening.memo : '',
                    tokenType: tokenTypeFromCode(openingToken),
                    invoiceType: opening.kind === 'campaign' ? (isDonation ? 2 : 1) : 0,
                    raw: trimmed,
                    href: url.toString(),
                    opening,
                };
            }
        }

        return null;
    } catch {
        return null;
    }
};
