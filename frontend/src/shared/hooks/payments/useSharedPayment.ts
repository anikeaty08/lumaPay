import { useCallback, useEffect, useState } from 'react';
import { useSearchParams } from 'react-router-dom';
import { useWallet } from '../wallet/WalletProvider';
import type { InvoiceState, PaymentNoteInput, PaymentStep } from '../../types/payments';
import { getTokenTypeFromCode } from '../../utils/payments/tokens';
import type { TokenCode } from '../../types/tokens';
import { API_URL } from '../../../midnight/config';
import { payInvoiceOnChain, type InvoicePaymentOpening } from '../../../midnight/contract';
import { contributeOnChain, type CampaignPaymentOpening } from '../../../midnight/campaign';
import { decodeGiftCode, redeemGiftCardsOnChain } from '../../../midnight/gift-card';

type PaymentOpening = ({
    kind: 'invoice';
    merchant?: string;
    expiry: string;
    title?: string;
    memo?: string;
    items?: InvoiceState['items'];
} & InvoicePaymentOpening) | ({
    kind: 'campaign';
    merchant?: string;
    expiry: string;
    title?: string;
    memo?: string;
    items?: InvoiceState['items'];
} & CampaignPaymentOpening);

type PaymentQuote = { expected_amount: number; expires_at: number; signature: string; from_token: string; to_token: string };
type GiftCardRedeemOption = { giftCode: string; availableAmount: number; redeemMicros: number; tokenProgram: string; tokenLabel: string; isNIGHT: boolean };

const tokenFromType = (_value: number): TokenCode => 'NIGHT';
const toDisplayAmount = (value: string) => Number(BigInt(value)) / 1_000_000;

function decodeOpening(encoded: string): PaymentOpening {
    const base64 = encoded.replaceAll('-', '+').replaceAll('_', '/').padEnd(Math.ceil(encoded.length / 4) * 4, '=');
    const bytes = Uint8Array.from(atob(base64), (character) => character.charCodeAt(0));
    const value = JSON.parse(new TextDecoder().decode(bytes)) as PaymentOpening;
    const id = value.kind === 'invoice' ? value.invoiceId : value.campaignId;
    if (!/^[0-9a-f]{64}$/i.test(id) || !/^\d+$/.test(value.expiry)) {
        throw new Error('The payment opening is malformed.');
    }
    if (BigInt(value.expiry) <= BigInt(Math.floor(Date.now() / 1_000))) {
        throw new Error('This payment request has expired.');
    }
    return value;
}

async function registerCampaignContribution(
    campaignId: string,
    result: Awaited<ReturnType<typeof contributeOnChain>>,
): Promise<void> {
    const response = await fetch(`${API_URL}/api/v1/campaigns/${encodeURIComponent(campaignId)}/contributions`, {
        method: 'POST',
        credentials: 'include',
        headers: { 'content-type': 'application/json' },
        body: JSON.stringify({
            contribution_id: result.contributionId,
            transaction_id: result.transactionId,
            escrow_coin: result.escrowCoin,
        }),
    });
    if (!response.ok) {
        const payload = await response.json().catch(() => null);
        throw new Error(payload?.error?.message ?? 'Contribution registration failed.');
    }
}

// Without this, the merchant's escrow claim material (the coin data needed
// to actually withdraw a settled payment) never reaches the backend for a
// payment made through a direct /pay?opening= link — a payer has no
// merchant session to hit the merchant-authenticated invoice endpoints
// with, and nothing else in this flow ever reported it. The route is
// deliberately public and self-verifying against the chain (see its
// backend comment), the same way campaign contributions already work above.
export async function reportInvoicePayment(
    invoiceId: string,
    result: Awaited<ReturnType<typeof payInvoiceOnChain>>,
): Promise<void> {
    const response = await fetch(`${API_URL}/api/v1/invoices/${encodeURIComponent(invoiceId)}/reconcile`, {
        method: 'POST',
        credentials: 'include',
        headers: { 'content-type': 'application/json' },
        body: JSON.stringify({
            transaction_id: result.transactionId,
            escrow_coin: result.escrowCoin,
        }),
    });
    if (!response.ok) {
        const payload = await response.json().catch(() => null);
        throw new Error(payload?.error?.message ?? 'Payment could not be recorded for the merchant to claim.');
    }
}

export const useSharedPayment = () => {
    const [searchParams] = useSearchParams();
    const { api, address: publicKey } = useWallet();
    const [opening, setOpening] = useState<PaymentOpening | null>(null);
    const [invoice, setInvoice] = useState<InvoiceState | null>(null);
    const [donationAmount, setDonationAmount] = useState('');
    const [status, setStatus] = useState('Verifying payment request…');
    const [step, setStep] = useState<PaymentStep>('CONNECT');
    const [loading, setLoading] = useState(true);
    const [txId, setTxId] = useState<string | null>(null);
    const [error, setError] = useState<string | null>(null);
    const [paymentSecret, setPaymentSecret] = useState<string | null>(null);
    const [receiptHash, setReceiptHash] = useState<string | null>(null);
    const [receiptSearchFailed, setReceiptSearchFailed] = useState(false);
    const [statusLog, setStatusLog] = useState<string[]>([]);
    const [quote] = useState<PaymentQuote | null>(null);
    const [giftCardRedeemOption, setGiftCardRedeemOption] = useState<GiftCardRedeemOption | null>(null);

    const appendStatus = useCallback((message: string) => {
        setStatus(message);
        setStatusLog((current) => current.at(-1) === message ? current : [...current, message]);
    }, []);

    useEffect(() => {
        const encoded = searchParams.get('opening');
        if (!encoded) {
            setError('Invalid LumaPay link: the private payment opening is missing.');
            setLoading(false);
            return;
        }
        try {
            const decoded = decodeOpening(encoded);
            const id = decoded.kind === 'invoice' ? decoded.invoiceId : decoded.campaignId;
            const token = decoded.kind === 'invoice' ? decoded.token : decoded.acceptedTokens[0] ?? 'NIGHT';
            const amount = decoded.kind === 'invoice'
                ? toDisplayAmount(decoded.amount)
                : BigInt(decoded.minimumContribution) === 1n ? 0 : toDisplayAmount(decoded.minimumContribution);
            const next: InvoiceState = {
                merchant: decoded.merchant ?? 'Private merchant',
                amount,
                salt: decoded.kind === 'invoice' ? decoded.invoiceNonce : decoded.campaignNonce,
                hash: id,
                title: decoded.title ?? '',
                memo: decoded.memo ?? '',
                tokenType: getTokenTypeFromCode(token as TokenCode),
                invoiceType: decoded.kind === 'invoice' ? 0 : amount === 0 ? 2 : 1,
                allowedTokens: decoded.kind === 'campaign' ? decoded.acceptedTokens : [decoded.token],
                items: decoded.items
            };
            setOpening(decoded);
            setInvoice(next);
            setStep(publicKey ? 'PAY' : 'CONNECT');
            setError(null);
            appendStatus('Payment request verified locally.');
            void fetch(`${API_URL}/api/v1/chain/${decoded.kind === 'invoice' ? 'invoices' : 'campaigns'}/${id}`)
                .then(async (response) => response.ok ? response.json() : null)
                .then((chain) => {
                    if (!chain) return;
                    if (decoded.kind === 'invoice' && chain.status === 'SETTLED') setStep('ALREADY_PAID');
                    if (['CANCELLED', 'EXPIRED'].includes(chain.status)) setError(`This payment request is ${chain.status.toLowerCase()}.`);
                }).catch(() => undefined);
        } catch (cause) {
            setError(cause instanceof Error ? cause.message : 'The payment request is invalid.');
        } finally {
            setLoading(false);
        }
    }, [appendStatus, publicKey, searchParams]);

    const payInvoice = useCallback(async (selectedToken?: number, notes: PaymentNoteInput = {}) => {
        if (!api || !opening || !invoice) {
            setError('Connect a Midnight wallet before paying.');
            return;
        }
        setLoading(true);
        setError(null);
        try {
            const token = tokenFromType(selectedToken ?? invoice.tokenType);
            const paidAmountAtomic = opening.kind === 'invoice'
                ? opening.amount
                : String(BigInt(Math.round((invoice.amount > 0 ? invoice.amount : Number(donationAmount)) * 1_000_000)));
            appendStatus('Generating the private payment proof…');
            const result = opening.kind === 'invoice'
                ? await (async () => {
                    const receipt = await payInvoiceOnChain(api, opening);
                    appendStatus('Recording the payment for merchant claim...');
                    await reportInvoicePayment(opening.invoiceId, receipt);
                    return receipt;
                })()
                : await (async () => {
                    const contribution = await contributeOnChain(
                        api,
                        opening,
                        BigInt(paidAmountAtomic),
                        token
                    );
                    appendStatus('Registering the contribution for merchant claim...');
                    await registerCampaignContribution(opening.campaignId, contribution);
                    return contribution;
                })();
            setTxId(result.transactionId);
            setPaymentSecret('paymentSecret' in result ? result.paymentSecret : result.contributionSecret);
            setReceiptHash(result.receiptCommitment);
            // amount/token/merchant aren't on `result` itself (the on-chain
            // receipt only proves the payment happened, not what it was
            // for) — added here from `invoice`/`opening`, which are the
            // only place this data exists, so useProfileData.ts's payer
            // receipt list has something to actually display.
            localStorage.setItem(`lumapay:receipt:${invoice.hash}:${result.transactionId}`, JSON.stringify({
                ...result,
                requestId: invoice.hash,
                kind: opening.kind,
                payerAddress: publicKey,
                merchant: invoice.merchant,
                amount: paidAmountAtomic,
                token,
                payerNote: notes.payerNote?.trim() || null,
                merchantNote: notes.merchantNote?.trim() || null,
                createdAt: new Date().toISOString()
            }));
            appendStatus('Payment submitted to Midnight Preprod.');
            setStep('SUCCESS');
        } catch (cause) {
            const message = cause instanceof Error ? cause.message : 'Payment failed.';
            setError(message);
            appendStatus(`Payment failed: ${message}`);
        } finally {
            setLoading(false);
        }
    }, [api, appendStatus, donationAmount, invoice, opening]);

    const unsupported = useCallback(async (..._arguments: unknown[]) => {
        setError('This payment method is being migrated to the LumaPay Midnight contract adapter. Use the connected wallet for this payment.');
    }, []);

    // There is no on-chain circuit that settles an invoice directly from a
    // gift card's escrowed coin (only payInvoice / contribution circuits
    // exist). So "pay with gift card" composes two things that do work:
    // redeem the card's balance into the connected wallet, then let the
    // buyer complete the normal wallet payment via payInvoice above.
    const payWithGiftCard = useCallback(async (giftCode: string, ..._rest: unknown[]) => {
        if (!api || !publicKey) {
            setError('Connect a Midnight wallet before paying with a gift card.');
            return;
        }
        setLoading(true);
        setError(null);
        try {
            appendStatus('Checking gift card balance…');
            const cards = decodeGiftCode(giftCode.trim());
            const states = await Promise.all(cards.map(async (card) => {
                const response = await fetch(`${API_URL}/api/v1/chain/gift-cards/${card.giftCardId}`);
                return response.ok ? response.json() : null;
            }));
            const openCards = cards.filter((_card, index) => states[index]?.status === 'OPEN');
            if (openCards.length === 0) throw new Error('This gift card is already redeemed, expired, or unavailable.');
            const availableAmount = openCards.reduce((total, card) => (
                card.token === 'NIGHT' ? total + Number(BigInt(card.amount)) / 1_000_000 : total
            ), 0);
            setGiftCardRedeemOption({
                giftCode: giftCode.trim(),
                availableAmount,
                redeemMicros: Math.round(availableAmount * 1_000_000),
                tokenProgram: 'NIGHT',
                tokenLabel: 'NIGHT',
                isNIGHT: true,
            });
            appendStatus(`This gift card holds ${availableAmount} NIGHT. Redeem it to your wallet, then pay to complete the invoice.`);
        } catch (cause) {
            const message = cause instanceof Error ? cause.message : 'Could not read that gift card.';
            setError(message);
            appendStatus(`Gift card check failed: ${message}`);
        } finally {
            setLoading(false);
        }
    }, [api, appendStatus, publicKey]);

    const redeemGiftCardBalance = useCallback(async () => {
        if (!api || !publicKey || !giftCardRedeemOption) {
            setError('Connect a Midnight wallet before redeeming a gift card.');
            return;
        }
        setLoading(true);
        setError(null);
        try {
            appendStatus('Redeeming gift card to your connected wallet…');
            const cards = decodeGiftCode(giftCardRedeemOption.giftCode);
            const states = await Promise.all(cards.map(async (card) => {
                const response = await fetch(`${API_URL}/api/v1/chain/gift-cards/${card.giftCardId}`);
                return response.ok ? response.json() : null;
            }));
            const openCards = cards.filter((_card, index) => states[index]?.status === 'OPEN');
            if (openCards.length === 0) throw new Error('This gift card is already redeemed, expired, or unavailable.');
            await redeemGiftCardsOnChain(api, openCards);
            setGiftCardRedeemOption(null);
            appendStatus('Gift card redeemed to your wallet. Pay now to complete the invoice with your new balance.');
        } catch (cause) {
            const message = cause instanceof Error ? cause.message : 'Gift card redemption failed.';
            setError(message);
            appendStatus(`Redemption failed: ${message}`);
        } finally {
            setLoading(false);
        }
    }, [api, appendStatus, giftCardRedeemOption, publicKey]);

    const handleConnect = useCallback(async () => {
        if (publicKey) setStep('PAY');
    }, [publicKey]);

    const resetPaymentFeedback = useCallback(() => {
        setError(null);
        setStatus('');
        setStatusLog([]);
    }, []);

    const checkOracleQuote = useCallback(async (..._arguments: unknown[]): Promise<PaymentQuote | null> => null, []);
    const convertPublicToPrivate = useCallback(async (..._arguments: unknown[]) => {
        appendStatus('Midnight balances are shielded by the connected wallet.');
    }, [appendStatus]);

    return {
        invoice, donationAmount, setDonationAmount, status, setStatus, step, setStep,
        loading, setLoading, txId, setTxId, conversionTxId: null, error, setError,
        programId: opening?.kind ?? null, paymentSecret, receiptHash, receiptSearchFailed,
        setReceiptSearchFailed, giftCardRedeemOption, statusLog,
        clearStatusLog: () => setStatusLog([]), resetPaymentFeedback, publicKey,
        payInvoice, quote, quoteTimeRemaining: 0, checkOracleQuote, handleConnect,
        convertPublicToPrivate,
        payWithCard: unsupported, payWithGiftCard, redeemGiftCardBalance
    };
};
