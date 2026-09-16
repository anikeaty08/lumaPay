import { useState } from 'react';
import { useWallet } from '@/shared/hooks/wallet/WalletProvider';
import { useBurnerWallet } from '../wallet/BurnerWalletProvider';
import {
    buildMerchantAuditReportHtmlAsset,
    downloadMerchantCreditReportHtml,
} from '../../utils/audit/generateMerchantReportsPdf';
import type { AuditReportInput, ReportOptions } from '../../types/receipt';
import { generateMerchantAuditPackage } from '../../utils/audit/auditPackage';
import type { WalletTokenBalance } from '../wallet/useWalletBalances';
import type { GeneratedAuditAssets } from '../../pages/profile/components/modals/ReportConfigModal';

type MerchantStatsSnapshot = {
    mainNIGHT: string;
    mainUSDCx: string;
    mainUSAD: string;
    burnerNIGHT: string;
    burnerUSDCx: string;
    burnerUSAD: string;
    invoices: number;
    settled: number;
    pending: number;
};

interface UseProfileReportsProps {
    combinedInvoices: any[];
    uniqueMainReceipts: any[];
    uniqueBurnerReceipts: any[];
    mainDashboardPayerReceipts: any[];
    balances: WalletTokenBalance[];
    merchantStats: MerchantStatsSnapshot;
    publicKey?: string | null;
    loadingBurner: boolean;
    programId: string;
}

export function useProfileReports({
    combinedInvoices,
    uniqueMainReceipts,
    uniqueBurnerReceipts,
    mainDashboardPayerReceipts,
    balances,
    merchantStats,
    publicKey,
    loadingBurner,
    programId,
}: UseProfileReportsProps) {
    const { api, summary } = useWallet();
    const { decryptedBurnerAddress } = useBurnerWallet();

    const [showReportConfigModal, setShowReportConfigModal] = useState(false);
    const [currentReportType, setCurrentReportType] = useState<'credit' | 'audit'>('audit');
    const [creditReportLoading, setCreditReportLoading] = useState(false);
    const [auditReportLoading, setAuditReportLoading] = useState(false);

    const auditInput: AuditReportInput = {
        merchantAddress: publicKey || '',
        burnerAddress: decryptedBurnerAddress || null,
        balances,
        merchantStats,
        invoices: loadingBurner ? [] : combinedInvoices,
        merchantReceipts: uniqueMainReceipts,
        burnerMerchantReceipts: uniqueBurnerReceipts,
        payerReceipts: mainDashboardPayerReceipts,
        programId,
    };

    const handleDownloadCreditReport = async (options: ReportOptions): Promise<void> => {
        if (!publicKey) return;
        setCreditReportLoading(true);
        try {
            downloadMerchantCreditReportHtml({
                merchantAddress: publicKey,
                burnerAddress: decryptedBurnerAddress || null,
                balances,
                merchantStats,
                invoices: loadingBurner ? [] : combinedInvoices,
                merchantReceipts: uniqueMainReceipts,
                burnerMerchantReceipts: uniqueBurnerReceipts,
                payerReceipts: mainDashboardPayerReceipts
            }, options);
            const toast = (await import('react-hot-toast')).default;
            toast.success('Credit report HTML downloaded.');
        } catch (error: any) {
            console.error('Failed to generate credit report HTML', error);
            const toast = (await import('react-hot-toast')).default;
            toast.error(error?.message || 'Failed to generate credit report HTML');
        } finally {
            setCreditReportLoading(false);
        }
    };

    const handleDownloadAuditReport = async (options: ReportOptions): Promise<GeneratedAuditAssets | void> => {
        if (!publicKey) return;
        setAuditReportLoading(true);
        try {
            const htmlAsset = buildMerchantAuditReportHtmlAsset(auditInput, options);
            const auditBundle = await generateMerchantAuditPackage(auditInput, options, async (message) => {
                if (!api || !summary?.unshieldedAddress) return null;
                const signed = await api.signData(message, { encoding: 'text', keyType: 'unshielded' });
                if (signed.data !== message) throw new Error('Wallet signed unexpected audit data.');
                return { signature: signed.signature, verifyingKey: signed.verifyingKey, signerAddress: summary.unshieldedAddress };
            });

            const toast = (await import('react-hot-toast')).default;
            toast.success('Audit report bundle unlocked. Download the HTML, JSON, and audit key from the popup.');
            return {
                html: htmlAsset.html,
                htmlFilename: htmlAsset.filename,
                packageJson: auditBundle.packageJson || '',
                packageFilename: auditBundle.packageFilename || '',
                auditKey: auditBundle.auditKey,
                auditKeyFilename: auditBundle.auditKeyFilename || ''
            };
        } catch (error: any) {
            console.error('Failed to generate audit report HTML', error);
            const toast = (await import('react-hot-toast')).default;
            toast.error(error?.message || 'Failed to generate audit report bundle');
        } finally {
            setAuditReportLoading(false);
        }
    };

    return {
        showReportConfigModal,
        setShowReportConfigModal,
        currentReportType,
        setCurrentReportType,
        creditReportLoading,
        auditReportLoading,
        handleDownloadCreditReport,
        handleDownloadAuditReport,
    };
}
