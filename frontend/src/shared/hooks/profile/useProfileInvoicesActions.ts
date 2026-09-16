import { useState } from 'react';
import toast from 'react-hot-toast';
import { API_URL } from '../../../midnight/config';
import {
    cancelCampaignOnChain,
    claimContributionOnChain,
    expireCampaignOnChain,
    type CampaignRecoveryBundle,
} from '../../../midnight/campaign';
import {
    cancelInvoiceOnChain,
    claimInvoiceOnChain,
    expireInvoiceOnChain,
    type InvoiceRecoveryBundle,
} from '../../../midnight/contract';
import { useLeaveGuard } from '../app/LeaveGuardProvider';
import { useWalletErrorHandler } from '../wallet/WalletErrorBoundary';
import { useWallet } from '../wallet/WalletProvider';

interface UseProfileInvoicesActionsProps {
    fetchCreatedInvoices: () => Promise<void>;
    fetchTransactions: () => Promise<void>;
    fetchMerchantReceipts: () => Promise<void>;
    fetchPayerReceipts: () => Promise<void>;
}

function invoiceRecovery(invoiceId: string): InvoiceRecoveryBundle {
    const raw = localStorage.getItem(`lumapay:recovery:${invoiceId}`);
    if (!raw) {
        throw new Error('This browser does not have the merchant recovery bundle for this invoice. Import its recovery JSON before managing it.');
    }
    const recovery = JSON.parse(raw);
    if (recovery?.kind !== 'invoice' || recovery.invoiceId !== invoiceId || !recovery.merchantClaimSecret) {
        throw new Error('The stored merchant recovery bundle is invalid.');
    }
    return recovery as InvoiceRecoveryBundle;
}

function campaignRecovery(campaignId: string): CampaignRecoveryBundle {
    const raw = localStorage.getItem(`lumapay:recovery:${campaignId}`);
    if (!raw) {
        throw new Error('This browser does not have the merchant recovery bundle for this campaign. Import its recovery JSON before managing it.');
    }
    const recovery = JSON.parse(raw);
    if (recovery?.kind !== 'campaign' || recovery.campaignId !== campaignId || !recovery.merchantClaimSecret) {
        throw new Error('The stored campaign recovery bundle is invalid.');
    }
    return recovery as CampaignRecoveryBundle;
}

async function reconcile(invoiceId: string, transactionId: string): Promise<void> {
    const response = await fetch(`${API_URL}/api/v1/invoices/${encodeURIComponent(invoiceId)}/reconcile`, {
        method: 'POST',
        credentials: 'include',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ transaction_id: transactionId }),
    });
    const body = await response.json().catch(() => null);
    if (!response.ok) throw new Error(body?.error?.message || 'Invoice reconciliation failed.');
}

async function reconcileCampaign(campaignId: string, transactionId: string): Promise<void> {
    const response = await fetch(`${API_URL}/api/v1/campaigns/${encodeURIComponent(campaignId)}/reconcile`, {
        method: 'POST',
        credentials: 'include',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ transaction_id: transactionId }),
    });
    const body = await response.json().catch(() => null);
    if (!response.ok) throw new Error(body?.error?.message || 'Campaign reconciliation failed.');
}

async function reconcileContribution(campaignId: string, contributionId: string, transactionId: string): Promise<void> {
    const response = await fetch(`${API_URL}/api/v1/campaigns/${encodeURIComponent(campaignId)}/contributions/${encodeURIComponent(contributionId)}/reconcile`, {
        method: 'POST',
        credentials: 'include',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ transaction_id: transactionId }),
    });
    const body = await response.json().catch(() => null);
    if (!response.ok) throw new Error(body?.error?.message || 'Contribution reconciliation failed.');
}

export function useProfileInvoicesActions({
    fetchCreatedInvoices,
    fetchTransactions,
    fetchMerchantReceipts,
    fetchPayerReceipts,
}: UseProfileInvoicesActionsProps) {
    const { api } = useWallet();
    const { handleWalletError } = useWalletErrorHandler();
    const { setGuard, clearGuard } = useLeaveGuard();
    const [invoicePendingDeletion, setInvoicePendingDeletion] = useState<any>(null);
    const [deletingInvoiceId, setDeletingInvoiceId] = useState<string | null>(null);
    const [settling, setSettling] = useState<string | null>(null);
    const [showVerifyModal, setShowVerifyModal] = useState(false);
    const [verifyingInvoice, setVerifyingInvoice] = useState<any>(null);
    const [verifyInput, setVerifyInput] = useState('');
    const [verifyStatus, setVerifyStatus] = useState<'IDLE' | 'CHECKING' | 'FOUND' | 'NOT_FOUND' | 'ERROR' | 'MISMATCH'>('IDLE');
    const [verifiedRecord, setVerifiedRecord] = useState<any>(null);

    const refreshAll = async () => {
        await Promise.all([
            fetchTransactions(),
            fetchCreatedInvoices(),
            fetchMerchantReceipts(),
            fetchPayerReceipts(),
        ]);
    };

    const handleDeleteInvoice = async (invoice: any) => {
        if (!invoice?.invoiceHash) return;
        if (invoice.status !== 'OPEN' && invoice.status !== 'PENDING') {
            toast.error('Only an open payment request can be cancelled or expired.');
            return;
        }
        setInvoicePendingDeletion(invoice);
    };

    const confirmDeleteInvoice = async () => {
        const invoice = invoicePendingDeletion;
        setInvoicePendingDeletion(null);
        if (!invoice?.invoiceHash) return;
        if (!api) {
            toast.error('Connect your Midnight wallet first.');
            return;
        }

        setDeletingInvoiceId(invoice.invoiceHash);
        setGuard({
            active: true,
            title: 'Invoice update in progress',
            message: 'Keep this page open while the Midnight transaction is submitted and indexed.',
            confirmLabel: 'Leave anyway',
            cancelLabel: 'Stay',
        });
        try {
            const expired = BigInt(invoice.expiry || '0') <= BigInt(Math.floor(Date.now() / 1_000));
            toast.loading(expired ? 'Expiring payment request on Midnight...' : 'Cancelling payment request on Midnight...', { id: 'invoice-lifecycle' });
            if (invoice.invoiceType === 0) {
                const recovery = invoiceRecovery(invoice.invoiceHash);
                const result = expired
                    ? await expireInvoiceOnChain(api, invoice.invoiceHash)
                    : await cancelInvoiceOnChain(api, recovery);
                await reconcile(invoice.invoiceHash, result.transactionId);
            } else {
                const recovery = campaignRecovery(invoice.invoiceHash);
                const result = expired
                    ? await expireCampaignOnChain(api, invoice.invoiceHash)
                    : await cancelCampaignOnChain(api, recovery);
                await reconcileCampaign(invoice.invoiceHash, result.transactionId);
            }
            await refreshAll();
            toast.success(expired ? 'Payment request expired.' : 'Payment request cancelled.', { id: 'invoice-lifecycle' });
        } catch (cause) {
            toast.dismiss('invoice-lifecycle');
            if (!handleWalletError(cause)) {
                toast.error(cause instanceof Error ? cause.message : 'Invoice update failed.');
            }
        } finally {
            clearGuard();
            setDeletingInvoiceId(null);
        }
    };

    const handleSettle = async (invoice: any) => {
        if (!invoice?.invoiceHash || !api) {
            toast.error('Connect your Midnight wallet first.');
            return;
        }
        if (invoice.status !== 'SETTLED' || invoice.claimed) {
            toast.error(invoice.claimed ? 'This payment request is already claimed.' : 'The payment request must be settled before claiming.');
            return;
        }
        if (!invoice.claimMaterial) {
            toast.error('Verified escrow claim material has not synced yet. Refresh after settlement confirmation.');
            return;
        }

        setSettling(invoice.invoiceHash);
        setGuard({
            active: true,
            title: 'Claim in progress',
            message: 'Keep this page open while the settled escrow is claimed to your Midnight wallet.',
            confirmLabel: 'Leave anyway',
            cancelLabel: 'Stay',
        });
        try {
            toast.loading('Claiming settled escrow...', { id: 'invoice-claim' });
            if (invoice.invoiceType === 0) {
                const recovery = invoiceRecovery(invoice.invoiceHash);
                const result = await claimInvoiceOnChain(api, recovery, invoice.claimMaterial);
                await reconcile(invoice.invoiceHash, result.transactionId);
            } else {
                const contributionId = invoice.claimMaterial.contributionId;
                if (!contributionId) throw new Error('Contribution ID is missing from campaign claim material.');
                const recovery = campaignRecovery(invoice.invoiceHash);
                const result = await claimContributionOnChain(api, recovery, contributionId, invoice.claimMaterial);
                await reconcileContribution(invoice.invoiceHash, contributionId, result.transactionId);
            }
            await refreshAll();
            toast.success('Funds claimed.', { id: 'invoice-claim' });
        } catch (cause) {
            toast.dismiss('invoice-claim');
            if (!handleWalletError(cause)) {
                toast.error(cause instanceof Error ? cause.message : 'Invoice claim failed.');
            }
        } finally {
            clearGuard();
            setSettling(null);
        }
    };

    const handleVerifyReceipt = async () => {
        if (!verifyInput || !verifyingInvoice?.invoiceHash) return;
        setVerifyStatus('CHECKING');
        setVerifiedRecord(null);
        try {
            const response = await fetch(`${API_URL}/api/v1/chain/invoices/${encodeURIComponent(verifyingInvoice.invoiceHash)}`);
            const chain = await response.json().catch(() => null);
            if (!response.ok) throw new Error(chain?.error?.message || 'Unable to read the invoice from Midnight.');
            const supplied = verifyInput.trim().toLowerCase().replace(/^0x/, '');
            const expected = String(chain.receipt_commitment || '').toLowerCase().replace(/^0x/, '');
            if (!expected || /^0+$/.test(expected)) {
                setVerifyStatus('NOT_FOUND');
                return;
            }
            setVerifiedRecord({
                invoiceHash: chain.invoice_id,
                receiptHash: chain.receipt_commitment,
                settlementNullifier: chain.settlement_nullifier,
                status: chain.status,
            });
            setVerifyStatus(supplied === expected ? 'FOUND' : 'MISMATCH');
        } catch (cause) {
            setVerifyStatus('ERROR');
            toast.error(cause instanceof Error ? cause.message : 'Receipt verification failed.');
        }
    };

    return {
        invoicePendingDeletion,
        setInvoicePendingDeletion,
        deletingInvoiceId,
        settling,
        showVerifyModal,
        setShowVerifyModal,
        verifyingInvoice,
        setVerifyingInvoice,
        verifyInput,
        setVerifyInput,
        verifyStatus,
        setVerifyStatus,
        verifiedRecord,
        setVerifiedRecord,
        handleDeleteInvoice,
        confirmDeleteInvoice,
        handleSettle,
        handleVerifyReceipt,
    };
}
