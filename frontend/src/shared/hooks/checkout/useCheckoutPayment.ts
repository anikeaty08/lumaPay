import { useCallback, useEffect, useState } from 'react';
import { API_URL } from '../../../midnight/config';
import { payInvoiceOnChain } from '../../../midnight/contract';
import { decodeGiftCode, redeemGiftCardsOnChain } from '../../../midnight/gift-card';
import type { CheckoutSession } from '../../types/checkout';
import { useLeaveGuard } from '../app/LeaveGuardProvider';
import { useWalletErrorHandler } from '../wallet/WalletErrorBoundary';
import { useWallet } from '../wallet/WalletProvider';

interface GiftCardRedeemOption {
    giftCode: string;
    availableAmount: number;
    tokenLabel: string;
}

interface PaymentNoteInput {
    payerNote?: string;
    merchantNote?: string | null;
}

interface Quote {
    expected_amount: number;
    expires_at: number;
    signature: string;
    from_token: string;
    to_token: string;
}

const unavailable = (feature: string) =>
    `${feature} is being migrated to its dedicated Midnight contract. Use the connected Midnight wallet for this checkout.`;

export const useCheckoutPayment = (session: CheckoutSession | null) => {
    const { api, address: publicKey } = useWallet();
    const { handleWalletError } = useWalletErrorHandler();
    const { setGuard, clearGuard } = useLeaveGuard();
    const [status, setStatus] = useState('');
    const [statusLog, setStatusLog] = useState<string[]>([]);
    const [txId, setTxId] = useState<string | null>(null);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState<string | null>(null);
    const [success, setSuccess] = useState(false);
    const [step, setStep] = useState<'PAY' | 'CONVERT'>('PAY');
    const [giftCardRedeemOption, setGiftCardRedeemOption] = useState<GiftCardRedeemOption | null>(null);
    const [quote] = useState<Quote | null>(null);
    const [quoteTimeRemaining] = useState(0);

    const report = useCallback((message: string) => {
        setStatus(message);
        setStatusLog((current) => [...current, message]);
    }, []);

    useEffect(() => {
        if (session?.status === 'SETTLED') {
            setSuccess(true);
            setTxId((current) => current ?? session.settlement_tx_id ?? session.chain?.settlement_tx_id ?? null);
            clearGuard();
        }
    }, [clearGuard, session?.chain?.settlement_tx_id, session?.settlement_tx_id, session?.status]);

    useEffect(() => () => clearGuard(), [clearGuard]);

    const pay = useCallback(async (
        _donationAmount?: number,
        selectedToken?: string,
        notes?: PaymentNoteInput,
        _quoteOverride?: { signature: string; expires_at: number; expected_amount: number },
    ) => {
        if (!session) {
            setError('Checkout details are not loaded yet.');
            return;
        }
        if (!api || !publicKey) {
            setError('Connect a Midnight wallet before paying.');
            return;
        }
        if (session.status === 'SETTLED') {
            setSuccess(true);
            return;
        }
        if (session.status === 'FAILED' || session.chain?.status === 'CANCELLED' || session.chain?.status === 'EXPIRED') {
            setError('This checkout can no longer be paid.');
            return;
        }

        const opening = session.payment_opening;
        const token = selectedToken || opening.token;
        if (token !== opening.token) {
            setError(`This invoice is committed to ${opening.token}. Cross-token quotes are not enabled for this session.`);
            return;
        }
        if (opening.invoiceId !== session.invoice_hash || opening.amount !== session.amount_atomic) {
            setError('Checkout terms do not match the canonical invoice.');
            return;
        }
        if (BigInt(opening.expiry) <= BigInt(Math.floor(Date.now() / 1_000))) {
            setError('This checkout has expired.');
            return;
        }

        setLoading(true);
        setError(null);
        setSuccess(false);
        setStatusLog([]);
        setGuard({
            active: true,
            title: 'Payment in progress',
            message: 'Your wallet is creating and submitting a Midnight proof. Keep this page open until reconciliation finishes.',
            confirmLabel: 'Leave anyway',
            cancelLabel: 'Stay',
        });

        try {
            report('Confirm the shielded payment in your Midnight wallet.');
            const receipt = await payInvoiceOnChain(api, opening);
            setTxId(receipt.transactionId);
            report('Payment submitted. Verifying indexed settlement.');

            localStorage.setItem(`lumapay:checkout-recovery:${session.id}`, JSON.stringify({
                version: 1,
                sessionId: session.id,
                invoiceId: opening.invoiceId,
                transactionId: receipt.transactionId,
                token: opening.token,
                amount: opening.amount,
                payerAddress: publicKey,
                paymentSecret: receipt.paymentSecret,
                receiptSecret: receipt.receiptSecret,
                receiptCommitment: receipt.receiptCommitment,
                escrowCoin: receipt.escrowCoin,
                payerNote: notes?.payerNote?.trim() || undefined,
                merchantNote: notes?.merchantNote?.trim() || undefined,
                createdAt: new Date().toISOString(),
            }));

            const response = await fetch(
                `${API_URL}/api/v1/checkout-sessions/${encodeURIComponent(session.id)}/reconcile`,
                {
                    method: 'POST',
                    credentials: 'include',
                    headers: { 'Content-Type': 'application/json' },
                    body: JSON.stringify({
                        transaction_id: receipt.transactionId,
                        escrow_coin: receipt.escrowCoin,
                    }),
                },
            );
            const reconciled = await response.json().catch(() => null);
            if (!response.ok) throw new Error(reconciled?.error?.message || 'Payment reconciliation failed.');

            if (reconciled.status === 'SETTLED') {
                setSuccess(true);
                report('Payment settled on Midnight.');
                clearGuard();
            } else {
                report('Payment is submitted and awaiting indexer confirmation.');
            }
        } catch (cause) {
            handleWalletError(cause);
            const message = cause instanceof Error ? cause.message : 'Midnight payment failed.';
            setError(message);
            report(`Payment failed: ${message}`);
            clearGuard();
        } finally {
            setLoading(false);
        }
    }, [api, clearGuard, handleWalletError, publicKey, report, session, setGuard]);

    const rejectFeature = useCallback((feature: string) => {
        setError(unavailable(feature));
    }, []);

    const payWithCard = useCallback(async (..._args: unknown[]) => rejectFeature('LumaPay Card checkout'), [rejectFeature]);

    // There is no on-chain circuit that settles an invoice directly from a
    // gift card's escrowed coin (only payInvoice / payInvoiceWithQuote exist).
    // So "pay with gift card" is a two-step composition of two things that do
    // work: redeem the card's balance into the connected wallet, then let the
    // buyer complete the normal wallet payment.
    const payWithGiftCard = useCallback(async (giftCode: string, ..._rest: unknown[]) => {
        if (!api || !publicKey) {
            setError('Connect a Midnight wallet before paying with a gift card.');
            return;
        }
        setLoading(true);
        setError(null);
        try {
            report('Checking gift card balance…');
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
            setGiftCardRedeemOption({ giftCode: giftCode.trim(), availableAmount, tokenLabel: 'NIGHT' });
            report(`This gift card holds ${availableAmount} NIGHT. Redeem it to your wallet, then hit Pay to complete the invoice.`);
        } catch (cause) {
            const message = cause instanceof Error ? cause.message : 'Could not read that gift card.';
            setError(message);
            report(`Gift card check failed: ${message}`);
        } finally {
            setLoading(false);
        }
    }, [api, publicKey, report]);

    const convertPublicToPrivate = useCallback(async (_amount?: number) => rejectFeature('Public-to-shielded conversion'), [rejectFeature]);

    const redeemGiftCardBalance = useCallback(async () => {
        if (!api || !publicKey || !giftCardRedeemOption) {
            setError('Connect a Midnight wallet before redeeming a gift card.');
            return;
        }
        setLoading(true);
        setError(null);
        try {
            report('Redeeming gift card to your connected wallet…');
            const cards = decodeGiftCode(giftCardRedeemOption.giftCode);
            const states = await Promise.all(cards.map(async (card) => {
                const response = await fetch(`${API_URL}/api/v1/chain/gift-cards/${card.giftCardId}`);
                return response.ok ? response.json() : null;
            }));
            const openCards = cards.filter((_card, index) => states[index]?.status === 'OPEN');
            if (openCards.length === 0) throw new Error('This gift card is already redeemed, expired, or unavailable.');
            await redeemGiftCardsOnChain(api, openCards);
            setGiftCardRedeemOption(null);
            report('Gift card redeemed to your wallet. Hit Pay to complete the invoice with your new balance.');
        } catch (cause) {
            const message = cause instanceof Error ? cause.message : 'Gift card redemption failed.';
            setError(message);
            report(`Redemption failed: ${message}`);
        } finally {
            setLoading(false);
        }
    }, [api, publicKey, giftCardRedeemOption, report]);
    const checkOracleQuote = useCallback(async (_from: string, _to: string, _amount: number) => {
        setError('Cross-token quotes are not enabled for this checkout session.');
        return null;
    }, []);

    return {
        pay,
        payWithCard,
        payWithGiftCard,
        convertPublicToPrivate,
        status,
        statusLog,
        txId,
        loading,
        error,
        success,
        step,
        setStep,
        publicKey,
        giftCardRedeemOption,
        redeemGiftCardBalance,
        quote,
        quoteTimeRemaining,
        checkOracleQuote,
    };
};
