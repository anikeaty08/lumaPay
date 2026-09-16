export interface CheckoutSession {
    id: string;
    amount: number;
    token_type: 'NIGHT' | 'USDCX' | 'USAD' | 'ANY';
    status: 'PENDING' | 'PROCESSING' | 'OPEN' | 'SETTLED' | 'FAILED';
    invoice_hash: string;
    salt: string;
    success_url?: string;
    cancel_url?: string;
    merchant_name?: string;
    merchant_address?: string;
    merchants?: {
        name: string;
        midnight_address: string;
    };
    invoice_type?: number;
    allowed_tokens?: string[];
    amount_atomic: string;
    settlement_tx_id?: string | null;
    checkout_url?: string;
    payment_opening: {
        kind: 'invoice';
        merchant?: string;
        invoiceId: string;
        amount: string;
        token: string;
        tokenId: string;
        expiry: string;
        merchantPrivateIdentity: string;
        invoiceNonce: string;
        invoiceRandomness: string;
        title?: string;
        memo?: string;
        items?: Array<{ name: string; quantity: number; unitPrice: number; total: number }>;
    };
    claim_material?: {
        nonce: string;
        color: string;
        value: string;
        mtIndex: string;
    } | null;
    chain: {
        invoice_id: string;
        commitment: string;
        commitment_version: string;
        expiry: string;
        creation_tx_id?: string | null;
        settlement_tx_id?: string | null;
        receipt_commitment?: string | null;
        claimed: boolean;
        status: string;
        chain_status: string;
    };
}
