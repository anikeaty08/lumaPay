import { useMemo } from 'react';
import type { MerchantReceipt } from '../../types/receipt';

export interface ProfilePayment {
    type: 'main' | 'burner';
    amount: number;
    tokenType: number;
    timestamp: number;
    receiptHash: string;
    txId: string;
}

export const useProfilePayments = (
    mainHash: string | null,
    burnerHash: string | null,
    initialMainReceipts: MerchantReceipt[],
    initialBurnerReceipts: MerchantReceipt[],
) => {
    const unifiedPayments = useMemo<ProfilePayment[]>(() => {
        const mapReceipt = (receipt: MerchantReceipt, type: 'main' | 'burner'): ProfilePayment => ({
            type,
            amount: Number(receipt.amount) / 1_000_000,
            tokenType: receipt.tokenType,
            timestamp: receipt.timestamp || 0,
            receiptHash: receipt.receiptHash,
            txId: receipt.transactionId || '',
        });
        return [
            ...initialMainReceipts.filter((receipt) => receipt.invoiceHash === mainHash).map((receipt) => mapReceipt(receipt, 'main')),
            ...initialBurnerReceipts.filter((receipt) => receipt.invoiceHash === burnerHash).map((receipt) => mapReceipt(receipt, 'burner')),
        ].sort((left, right) => right.timestamp - left.timestamp);
    }, [burnerHash, initialBurnerReceipts, initialMainReceipts, mainHash]);

    return { unifiedPayments };
};
