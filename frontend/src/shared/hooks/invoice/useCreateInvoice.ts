import { useCallback, useEffect, useState } from 'react';
import { useWallet } from '../wallet/WalletProvider';
import type { InvoiceData, InvoiceItem } from '../../types/invoice';
import { createInvoiceOnChain, type InvoiceRecoveryBundle } from '../../../midnight/contract';
import { createCampaignOnChain, type CampaignRecoveryBundle } from '../../../midnight/campaign';
import { API_URL } from '../../../midnight/config';

export type InvoiceType = 'standard' | 'multipay' | 'donation';

const TOKEN_CODES = ['NIGHT'] as const;
const toAtomic = (amount: number) => BigInt(Math.round(amount * 1_000_000));

function encodePaymentOpening(value: unknown): string {
    const bytes = new TextEncoder().encode(JSON.stringify(value));
    let binary = '';
    for (const byte of bytes) binary += String.fromCharCode(byte);
    return btoa(binary).replaceAll('+', '-').replaceAll('/', '_').replaceAll('=', '');
}

function saveRecoveryBundle(id: string, bundle: InvoiceRecoveryBundle | CampaignRecoveryBundle): void {
    localStorage.setItem(`lumapay:recovery:${id}`, JSON.stringify(bundle));
}

async function registerCreatedRequest(
    kind: InvoiceRecoveryBundle['kind'] | CampaignRecoveryBundle['kind'],
    bundle: InvoiceRecoveryBundle | CampaignRecoveryBundle,
    paymentOpening: Record<string, unknown>,
): Promise<void> {
    const isInvoice = kind === 'invoice';
    const response = await fetch(`${API_URL}/api/v1/${isInvoice ? 'invoices' : 'campaigns'}`, {
        method: 'POST',
        credentials: 'include',
        headers: { 'content-type': 'application/json' },
        body: JSON.stringify(isInvoice ? {
            invoice_id: (bundle as InvoiceRecoveryBundle).invoiceId,
            commitment: bundle.commitment,
            merchant_authorization: bundle.merchantAuthorization,
            expiry: bundle.expiry,
            payment_opening: paymentOpening,
            creation_tx_id: bundle.transactionId,
        } : {
            campaign_id: (bundle as CampaignRecoveryBundle).campaignId,
            commitment: bundle.commitment,
            merchant_authorization: bundle.merchantAuthorization,
            expiry: bundle.expiry,
            payment_opening: paymentOpening,
            creation_tx_id: bundle.transactionId,
        }),
    });
    if (!response.ok) {
        const payload = await response.json().catch(() => null);
        throw new Error(payload?.error?.message ?? 'Backend registration failed.');
    }
}

export const useCreateInvoice = () => {
    const { api, address: publicKey } = useWallet();
    const [amount, setAmount] = useState<number | ''>('');
    const [loading, setLoading] = useState(false);
    const [invoiceData, setInvoiceData] = useState<InvoiceData | null>(null);
    const [invoiceTitle, setInvoiceTitle] = useState('');
    const [memo, setMemo] = useState('');
    const [status, setStatus] = useState('');
    const [invoiceType, setInvoiceType] = useState<InvoiceType>('standard');
    const [tokenType, setTokenType] = useState(0);
    const [walletType, setWalletType] = useState(0);
    const [items, setItems] = useState<InvoiceItem[]>([]);
    const [showItems, setShowItems] = useState(false);
    const [forSdk, setForSdk] = useState(false);
    const [selectedAllowedTokens, setSelectedAllowedTokens] = useState<string[]>(['NIGHT']);

    useEffect(() => {
        const base = TOKEN_CODES[tokenType] ?? 'NIGHT';
        setSelectedAllowedTokens(Array.from(new Set([base])));
    }, [tokenType]);

    const addItem = useCallback(() => {
        setItems((current) => [...current, { name: '', quantity: 1, unitPrice: 0, total: 0 }]);
    }, []);

    const updateItem = useCallback((index: number, field: keyof InvoiceItem, value: string | number) => {
        setItems((current) => {
            const next = current.map((entry) => ({ ...entry }));
            const item = next[index];
            if (!item) return current;
            if (field === 'name') item.name = String(value);
            if (field === 'quantity') item.quantity = Number(value) || 0;
            if (field === 'unitPrice') item.unitPrice = Number(value) || 0;
            item.total = item.quantity * item.unitPrice;
            const total = next.reduce((sum, entry) => sum + entry.total, 0);
            setAmount(total > 0 ? total : '');
            return next;
        });
    }, []);

    const removeItem = useCallback((index: number) => {
        setItems((current) => {
            const next = current.filter((_, itemIndex) => itemIndex !== index);
            const total = next.reduce((sum, entry) => sum + entry.total, 0);
            setAmount(total > 0 ? total : '');
            return next;
        });
    }, []);

    const handleCreate = async () => {
        if (!api || !publicKey) {
            setStatus('Connect a Midnight wallet first.');
            return;
        }
        if (invoiceType !== 'donation' && (amount === '' || amount <= 0)) {
            setStatus('Enter a positive amount.');
            return;
        }

        setLoading(true);
        setStatus(invoiceType === 'standard' ? 'Generating invoice proof…' : 'Generating campaign proof…');
        try {
            const expiry = BigInt(Math.floor(Date.now() / 1_000) + 86_400);
            const baseToken = TOKEN_CODES[tokenType] ?? 'NIGHT';
            let id: string;
            let salt: string;
            let paymentOpening: Record<string, unknown>;
            let recovery: InvoiceRecoveryBundle | CampaignRecoveryBundle;

            if (invoiceType === 'standard') {
                const bundle = await createInvoiceOnChain(api, {
                    amount: toAtomic(Number(amount)),
                    token: baseToken,
                    expiry,
                });
                recovery = bundle;
                id = bundle.invoiceId;
                salt = bundle.invoiceNonce;
                paymentOpening = {
                    kind: bundle.kind,
                    merchant: publicKey,
                    invoiceId: bundle.invoiceId,
                    amount: bundle.amount,
                    token: bundle.token,
                    tokenId: bundle.tokenId,
                    expiry: bundle.expiry,
                    merchantPrivateIdentity: bundle.merchantPrivateIdentity,
                    invoiceNonce: bundle.invoiceNonce,
                    invoiceRandomness: bundle.invoiceRandomness,
                };
            } else {
                const fixed = invoiceType === 'multipay' ? toAtomic(Number(amount)) : null;
                const bundle = await createCampaignOnChain(api, {
                    minimumContribution: fixed ?? 1n,
                    maximumContribution: fixed ?? ((1n << 128n) - 1n),
                    acceptedTokens: selectedAllowedTokens.filter((token) => token === 'NIGHT'),
                    expiry,
                });
                recovery = bundle;
                id = bundle.campaignId;
                salt = bundle.campaignNonce;
                paymentOpening = {
                    kind: bundle.kind,
                    merchant: publicKey,
                    campaignId: bundle.campaignId,
                    minimumContribution: bundle.minimumContribution,
                    maximumContribution: bundle.maximumContribution,
                    acceptedTokens: bundle.acceptedTokens,
                    acceptedTokenIds: bundle.acceptedTokenIds,
                    expiry: bundle.expiry,
                    merchantPrivateIdentity: bundle.merchantPrivateIdentity,
                    campaignNonce: bundle.campaignNonce,
                    campaignRandomness: bundle.campaignRandomness,
                };
            }

            saveRecoveryBundle(id, recovery);
            setStatus('Registering the request with the LumaPay backend...');
            await registerCreatedRequest(recovery.kind, recovery, paymentOpening);
            const paymentUrl = new URL('/pay', window.location.origin);
            paymentUrl.searchParams.set('opening', encodePaymentOpening({
                ...paymentOpening,
                title: invoiceTitle || undefined,
                memo: memo || undefined,
                items: showItems ? items : undefined,
                forSdk,
            }));
            setInvoiceData({
                merchant: publicKey,
                amount: amount === '' ? 0 : amount,
                salt,
                hash: id,
                link: paymentUrl.toString(),
                title: invoiceTitle || undefined,
                type: invoiceType === 'standard' ? 0 : invoiceType === 'multipay' ? 1 : 2,
            });
            setStatus('Created on Midnight Preprod. Recovery material was saved only in this browser.');
        } catch (error) {
            setStatus(`Error: ${error instanceof Error ? error.message : 'Creation failed.'}`);
        } finally {
            setLoading(false);
        }
    };

    const resetInvoice = () => {
        setInvoiceData(null);
        setAmount('');
        setInvoiceTitle('');
        setMemo('');
        setStatus('');
        setInvoiceType('standard');
        setTokenType(0);
        setWalletType(0);
        setItems([]);
        setShowItems(false);
        setForSdk(false);
        setSelectedAllowedTokens(['NIGHT']);
    };

    return {
        amount, setAmount, invoiceTitle, setInvoiceTitle, memo, setMemo, status, loading,
        invoiceData, handleCreate, resetInvoice, publicKey, invoiceType, setInvoiceType,
        tokenType, setTokenType, walletType, setWalletType, items, showItems, setShowItems,
        forSdk, setForSdk, selectedAllowedTokens, setSelectedAllowedTokens,
        addItem, updateItem, removeItem,
    };
};
