import { useCallback, useEffect, useMemo } from 'react';
import { useWallet } from '../wallet/WalletProvider';
import { useBurnerWallet } from '../wallet/BurnerWalletProvider';
import { useTransactions } from '../transactions/useTransactions';
import type { InvoiceRecord } from '../../types/invoice';
import type { MerchantReceipt, PayerReceipt } from '../../types/receipt';

const TOKEN_TYPES: Record<string, number> = { NIGHT: 0, USDCX: 1, USAD: 2 };

function localPayerReceipts(address: string | null | undefined): PayerReceipt[] {
    if (!address) return [];
    const receipts: PayerReceipt[] = [];
    for (let index = 0; index < localStorage.length; index += 1) {
        const key = localStorage.key(index);
        if (!key?.startsWith('lumapay:checkout-recovery:')) continue;
        try {
            const value = JSON.parse(localStorage.getItem(key) || 'null');
            if (!value || value.payerAddress !== address) continue;
            receipts.push({
                owner: address,
                merchant: '',
                receiptHash: value.receiptCommitment,
                invoiceHash: value.invoiceId,
                amount: Number(BigInt(value.amount)),
                tokenType: TOKEN_TYPES[value.token] ?? 0,
                payerNote: value.payerNote || '',
                timestamp: Date.parse(value.createdAt) || 0,
                created_at: value.createdAt,
                transactionId: value.transactionId,
            });
        } catch {
            // Ignore malformed local entries; recovery JSON is never executed.
        }
    }
    return receipts.sort((left, right) => right.timestamp - left.timestamp);
}

export function useProfileData(publicKey: string | undefined | null) {
    const { authenticated } = useWallet();
    const { decryptedBurnerKey, decryptedBurnerAddress } = useBurnerWallet();
    const { transactions, loading: loadingTransactions, fetchTransactions } = useTransactions(publicKey || undefined);

    const createdInvoices = useMemo<InvoiceRecord[]>(() => transactions.map((invoice) => ({
        owner: invoice.merchant_address,
        invoiceHash: invoice.invoice_hash,
        amount: Math.round(Number(invoice.amount) * 1_000_000),
        tokenType: invoice.token_type ?? 0,
        invoiceType: invoice.invoice_type ?? 0,
        salt: invoice.salt ?? '',
        title: invoice.title ?? '',
        memo: invoice.memo ?? '',
        walletType: 0,
        claimed: invoice.claimed,
        expiry: invoice.expiry,
        claimMaterial: invoice.claim_material,
        receiptCommitment: invoice.receipt_commitment,
        paymentOpening: invoice.payment_opening,
    })), [transactions]);

    const merchantReceipts = useMemo<MerchantReceipt[]>(() => transactions
        .filter((invoice) => invoice.status === 'SETTLED' && invoice.receipt_commitment)
        .map((invoice) => ({
            owner: invoice.merchant_address,
            receiptHash: invoice.receipt_commitment!,
            invoiceHash: invoice.invoice_hash,
            amount: Math.round(Number(invoice.amount) * 1_000_000),
            tokenType: invoice.token_type ?? 0,
            merchantNote: '',
            timestamp: invoice.updated_at ? Date.parse(invoice.updated_at) : 0,
            created_at: invoice.updated_at,
            transactionId: invoice.payment_tx_id,
        })), [transactions]);

    const payerReceipts = useMemo(
        () => localPayerReceipts(publicKey),
        [publicKey, transactions],
    );

    const refresh = useCallback(async () => {
        if (!publicKey || !authenticated) return;
        await fetchTransactions();
    }, [authenticated, fetchTransactions, publicKey]);

    useEffect(() => {
        void refresh();
    }, [refresh]);

    return {
        transactions,
        loadingTransactions,
        createdInvoices,
        merchantReceipts,
        payerReceipts,
        burnerCreatedInvoices: [] as InvoiceRecord[],
        burnerMerchantReceipts: [] as MerchantReceipt[],
        loadingCreated: loadingTransactions,
        loadingReceipts: loadingTransactions,
        loadingPayerReceipts: false,
        loadingBurner: false,
        decryptedBurnerKey,
        decryptedBurnerAddress,
        profileMainHash: null,
        profileBurnerHash: null,
        fetchCreatedInvoices: refresh,
        fetchMerchantReceipts: refresh,
        fetchPayerReceipts: async () => undefined,
        fetchTransactions,
        refreshPaymentTimeline: refresh,
    };
}
