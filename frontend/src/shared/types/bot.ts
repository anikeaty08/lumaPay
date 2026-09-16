export type LumaBotToolName =
    | 'connect_wallet'
    | 'create_invoice'
    | 'pay_invoice'
    | 'get_transaction_info'
    | 'get_analytics'
    | 'check_burner_balance'
    | 'sweep_funds';

export type LumaBotCreateInvoiceArgs = {
    amount?: number;
    currency?: 'NIGHT' | 'USDCX' | 'USAD' | 'ANY';
    title?: string;
    invoice_type?: 'standard' | 'multipay' | 'donation';
    wallet?: 'main' | 'burner';
    memo?: string;
};

export type LumaBotPayInvoiceArgs = {
    payment_link?: string;
    invoice_hash?: string;
    wallet?: 'main' | 'burner';
    amount?: number;
    currency?: 'NIGHT' | 'USDCX' | 'USAD';
};

export type LumaBotSweepFundsArgs = {
    amount?: number;
    currency?: 'NIGHT' | 'USDCX' | 'USAD';
    wallet?: 'main' | 'burner';
    destination?: string;
};

export type LumaBotToolCall =
    | {
        name: 'connect_wallet';
        args: Record<string, never>;
        missingArgs?: string[];
    }
    | {
        name: 'create_invoice';
        args: LumaBotCreateInvoiceArgs;
        missingArgs?: string[];
    }
    | {
        name: 'pay_invoice';
        args: LumaBotPayInvoiceArgs;
        missingArgs?: string[];
    }
    | {
        name: 'get_transaction_info';
        args: {
            invoice_hash?: string;
            wallet?: 'main' | 'burner';
            limit?: number;
        };
        missingArgs?: string[];
    }
    | {
        name: 'get_analytics';
        args: {
            wallet?: 'main' | 'burner';
            days?: number;
        };
        missingArgs?: string[];
    }
    | {
        name: 'check_burner_balance';
        args: Record<string, never>;
        missingArgs?: string[];
    }
    | {
        name: 'sweep_funds';
        args: LumaBotSweepFundsArgs;
        missingArgs?: string[];
    };

export type LumaBotPendingToolCall = {
    name: LumaBotToolName;
    args: Record<string, unknown>;
    missingArgs: string[];
    metadata?: Record<string, unknown>;
};

export interface LumaBotChatResponse {
    reply: string;
    toolCall?: LumaBotToolCall;
}

export interface TransactionStatusUpdate {
    transactionId: string;
    status: string;
    invoiceHash?: string;
}

export interface InvoicePaidUpdate {
    invoiceHash: string;
    paymentTxId: string;
    amount: number;
    tokenType: number;
}
