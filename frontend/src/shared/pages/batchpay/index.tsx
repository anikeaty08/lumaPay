import { useMemo, useState, useEffect, useRef, type ChangeEvent } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { 
    Check,
    ChevronDown, 
    Coins, 
    Hash, 
    Info, 
    MessageSquare, 
    ShieldCheck, 
    Terminal, 
    Trash2,
    User, 
    Zap 
} from 'lucide-react';
import { useWallet } from '@/shared/hooks/wallet/WalletProvider';
import { GlassCard } from '../../components/ui/GlassCard';
import { Button } from '../../components/ui/Button';
import { PaymentActivityConsole } from '../../components/payments/PaymentActivityConsole';
import { Input } from '../../components/ui/Input';
import { reportInvoicePayment } from '../../hooks/payments/useSharedPayment';
import { getInvoiceData, getInvoiceHashFromMapping } from '../../utils/midnight/midnightUtils';
import { ANY_ALLOWED_TOKENS, getAllowedTokensForInvoice, getTokenCodeFromType, getTokenLabel, getTokenTypeFromCode, TOKEN_LABELS } from '../../utils/payments/tokens';
import { parsePaymentLink } from '../../utils/payments/paymentLinks';
import { payInvoiceOnChain, type InvoicePaymentOpening } from '@/midnight/contract';

interface BatchInvoiceRow {
    id: string;
    merchant: string;
    hash: string;
    salt: string;
    amount: number;
    memo: string;
    tokenType: number;
    invoiceType: number;
    status: string;
    source: 'link' | 'qr';
    selectedTokenType: number | null;
    donationAmount: string;
    executionState: 'idle' | 'queued' | 'processing' | 'paid' | 'failed';
    executionMessage: string | null;
    txId: string | null;
    paymentOpening: InvoicePaymentOpening | null;
}

const shorten = (value: string) => `${value.slice(0, 10)}...${value.slice(-6)}`;
const getEffectiveAmount = (row: BatchInvoiceRow) => {
    if (row.invoiceType === 2) {
        const donation = Number(row.donationAmount);
        return Number.isFinite(donation) && donation > 0 ? donation : 0;
    }
    return row.amount;
};

const getEffectiveTokenType = (row: BatchInvoiceRow) => {
    if (row.tokenType === 3) return row.selectedTokenType;
    return row.tokenType;
};


const formatExecutionState = (row: BatchInvoiceRow) => {
    if (row.executionState === 'paid') return 'PAID';
    if (row.executionState === 'processing') return 'PROCESSING';
    if (row.executionState === 'failed') return 'FAILED';
    return row.status;
};

const extractErrorDetails = (error: unknown) => {
    if (!error) return 'Unknown error';
    if (typeof error === 'string') return error;

    const err = error as Record<string, any>;
    const candidates = [
        err.message,
        err.reason,
        err.details,
        err.data?.message,
        err.data?.reason,
        err.data?.details,
        err.error?.message,
        err.error?.reason,
        err.error?.details,
    ].filter((value) => typeof value === 'string' && value.trim().length > 0);

    if (candidates.length > 0) {
        return candidates.join(' | ');
    }

    try {
        return JSON.stringify(error);
    } catch {
        return 'Unknown error';
    }
};

const isConfigComplete = (row: BatchInvoiceRow) => {
    if (row.status !== 'OPEN') return false;
    if (getEffectiveTokenType(row) === null) return false;
    return getEffectiveAmount(row) > 0;
};

export const BatchPayPage = () => {
    const { api, address: publicKey } = useWallet();
    const [rawInput, setRawInput] = useState('');
    const [rows, setRows] = useState<BatchInvoiceRow[]>([]);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState<string | null>(null);
    const [batchStatus, setBatchStatus] = useState<string>('');
    const [batchLogs, setBatchLogs] = useState<string[]>([]);
    const [activeDropdownId, setActiveDropdownId] = useState<string | null>(null);
    const dropdownRef = useRef<HTMLDivElement>(null);

    useEffect(() => {
        const handleClickOutside = (event: MouseEvent) => {
            if (dropdownRef.current && !dropdownRef.current.contains(event.target as Node)) {
                setActiveDropdownId(null);
            }
        };
        document.addEventListener('mousedown', handleClickOutside);
        return () => document.removeEventListener('mousedown', handleClickOutside);
    }, []);

    const openRows = useMemo(() => rows.filter((row) => row.status === 'OPEN'), [rows]);
    const unresolvedRows = useMemo(() => openRows.filter((row) => !isConfigComplete(row)), [openRows]);
    const readyRows = useMemo(() => openRows.filter((row) => isConfigComplete(row)), [openRows]);
    const paidRows = useMemo(() => readyRows.filter((row) => row.executionState === 'paid'), [readyRows]);
    const batchCompleted = readyRows.length > 0 && paidRows.length === readyRows.length;
    const burnerRequirementMessage = useMemo(() => {
        if (!publicKey) return 'Connect your main wallet first. Batch receipts mint back to your main wallet.';
        if (!api) return 'Connect a Midnight DApp Connector wallet before starting the batch.';
        return null;
    }, [api, publicKey]);
    const activeRequirementMessage = burnerRequirementMessage;

    const totals = useMemo(() => {
        return readyRows.reduce(
            (acc, row) => {
                const amount = getEffectiveAmount(row);
                const tokenType = getEffectiveTokenType(row);
                if (tokenType === 1) acc.usdcx += amount;
                else if (tokenType === 2) acc.usad += amount;
                else acc.credits += amount;
                return acc;
            },
            { credits: 0, usdcx: 0, usad: 0 }
        );
    }, [readyRows]);

    const updateRow = (rowId: string, patch: Partial<BatchInvoiceRow>) => {
        setRows((current) => current.map((row) => row.id === rowId ? { ...row, ...patch } : row));
    };

    const removeRow = (rowId: string) => {
        setRows((current) => current.filter((row) => row.id !== rowId));
        if (activeDropdownId === rowId) {
            setActiveDropdownId(null);
        }
    };

    const pushBatchLog = (message: string) => {
        const stamped = `[${new Date().toLocaleTimeString()}] ${message}`;
        setBatchLogs((current) => [...current, stamped]);
    };

    const assertNativeBatchRow = (row: BatchInvoiceRow) => {
        const tokenType = getEffectiveTokenType(row);
        if (tokenType !== 0) {
            throw new Error('BatchPay is NIGHT-only on Preprod until USDCx/USAD token contracts are available.');
        }
        // Multi Pay/Donation links are campaigns (a different contract,
        // paid via a contribution circuit) — BatchPay's execution below
        // only ever submits the standard-invoice payment circuit, so these
        // can never actually go through here. Fail clearly up front rather
        // than with the generic "incomplete payment opening" message,
        // which would otherwise wrongly suggest the link itself was bad.
        if (row.invoiceType !== 0) {
            throw new Error(`Invoice ${shorten(row.hash)} is a Multi Pay/Donation campaign — BatchPay only supports standard invoices right now. Pay it individually from its own link.`);
        }
        if (!row.paymentOpening) {
            throw new Error(`Invoice ${shorten(row.hash)} is missing its native Midnight payment opening.`);
        }
        if (!row.paymentOpening.invoiceId || !row.paymentOpening.merchantPrivateIdentity || !row.paymentOpening.invoiceNonce || !row.paymentOpening.invoiceRandomness) {
            throw new Error(`Invoice ${shorten(row.hash)} is not a complete native invoice payment opening.`);
        }
        const amountMicros = Math.round(getEffectiveAmount(row) * 1_000_000);
        if (String(amountMicros) !== row.paymentOpening.amount) {
            throw new Error(`Invoice ${shorten(row.hash)} amount does not match its native payment opening.`);
        }
    };

    const appendResolvedLink = async (rawValue: string, source: 'link' | 'qr') => {
        const parsed = parsePaymentLink(rawValue);
        if (!parsed) {
            throw new Error('That does not look like a valid LumaPay payment link or QR payload.');
        }

        let hash = parsed.hash;
        const merchant = parsed.merchant;
        const salt = parsed.salt;
        const amount = parsed.amount;
        const invoiceType = parsed.invoiceType;
        const tokenType = parsed.tokenType;
        const memo = parsed.memo;

        if (!hash && salt) {
            hash = await getInvoiceHashFromMapping(salt);
        }
        if (!hash) {
            throw new Error('Could not resolve the invoice hash from that link.');
        }

        // No backend endpoint re-exposes a private payment opening for an
        // arbitrary invoice ID (by design), so the link's own decoded
        // `opening` is the only source for the fields a payment actually
        // needs (merchantPrivateIdentity, invoiceNonce/invoiceRandomness).
        // This used to come from fetchInvoiceByHash(), which called a route
        // that doesn't exist on the backend and, even fixed, wouldn't have
        // returned this data anyway — so paymentOpening was always null and
        // no invoice could ever actually be paid through BatchPay.
        const chainInvoice = await getInvoiceData(hash).catch(() => null);

        let finalAmount = 0;
        if (amount) {
            if (amount.includes('u')) finalAmount = Number(amount.split('u')[0]) / 1_000_000;
            else finalAmount = Number(amount);
        }

        if (!merchant || !salt) {
            throw new Error(`Missing merchant or salt for invoice ${hash}.`);
        }

        const openingPayload = parsed.opening;
        const paymentOpening: InvoicePaymentOpening | null = openingPayload && openingPayload.kind === 'invoice'
            ? {
                invoiceId: String(openingPayload.invoiceId ?? hash),
                amount: String(openingPayload.amount ?? ''),
                token: String(openingPayload.token ?? 'NIGHT'),
                tokenId: typeof openingPayload.tokenId === 'string' ? openingPayload.tokenId : undefined,
                expiry: typeof openingPayload.expiry === 'string' ? openingPayload.expiry : undefined,
                merchantPrivateIdentity: String(openingPayload.merchantPrivateIdentity ?? ''),
                invoiceNonce: String(openingPayload.invoiceNonce ?? ''),
                invoiceRandomness: String(openingPayload.invoiceRandomness ?? ''),
            }
            : null;

        setRows((current) => {
            if (current.some((row) => row.hash === hash)) return current;
            const allowedTokens = getAllowedTokensForInvoice(tokenType, invoiceType);
            const defaultToken = tokenType === 3 ? getTokenTypeFromCode(allowedTokens[0] || ANY_ALLOWED_TOKENS[0]) : tokenType;
            return [
                ...current,
                {
                    id: `${hash}-${source}`,
                    merchant,
                    hash,
                    salt,
                    amount: finalAmount,
                    memo,
                    tokenType,
                    invoiceType,
                    status: chainInvoice?.status === 1 ? 'SETTLED' : 'OPEN',
                    source,
                    selectedTokenType: tokenType === 3 ? defaultToken : tokenType,
                    donationAmount: invoiceType === 2 ? '' : String(finalAmount || ''),
                    executionState: 'idle',
                    executionMessage: null,
                    txId: null,
                    paymentOpening,
                },
            ];
        });
    };

    const handleAddLinks = async () => {
        const values = rawInput.split('\n').map((value) => value.trim()).filter(Boolean);
        if (!values.length) return;

        try {
            setLoading(true);
            setError(null);
            for (const value of values) {
                await appendResolvedLink(value, 'link');
            }
            setRawInput('');
        } catch (err: any) {
            setError(err.message || 'Could not add that invoice.');
        } finally {
            setLoading(false);
        }
    };

    const handleQrUpload = async (event: ChangeEvent<HTMLInputElement>) => {
        const file = event.target.files?.[0];
        if (!file) return;

        try {
            setLoading(true);
            setError(null);
            const Detector = (window as any).BarcodeDetector;
            if (!Detector) {
                throw new Error('QR image import needs a browser with BarcodeDetector support.');
            }

            const detector = new Detector({ formats: ['qr_code'] });
            const bitmap = await createImageBitmap(file);
            const result = await detector.detect(bitmap);
            const rawValue = result?.[0]?.rawValue;
            if (!rawValue) {
                throw new Error('No LumaPay QR code was found in that image.');
            }

            await appendResolvedLink(rawValue, 'qr');
        } catch (err: any) {
            setError(err.message || 'Could not read that QR code.');
        } finally {
            setLoading(false);
            event.target.value = '';
        }
    };

    const runBatchExecution = async (payerOwner: string) => {
        if (!api) {
            throw new Error('Connect a Midnight wallet before running BatchPay.');
        }

        let succeeded = 0;
        let failed = 0;

        for (const tokenType of [0]) {
            const tokenRows = readyRows.filter((row) => getEffectiveTokenType(row) === tokenType);
            if (!tokenRows.length) continue;

            for (let index = 0; index < tokenRows.length; index += 1) {
                const row = tokenRows[index];

                // Each row is isolated: a wallet rejection, insufficient
                // balance, or DB hiccup on invoice N used to throw out of
                // this whole loop, silently skipping every invoice after it
                // even though they have nothing to do with N's failure (and
                // even though N's on-chain payment may have already gone
                // through). Now it's marked 'failed' and the batch continues.
                try {
                    assertNativeBatchRow(row);

                    updateRow(row.id, { executionState: 'processing', executionMessage: 'Authorizing payment...', txId: null });
                    setBatchStatus(`Authorizing ${TOKEN_LABELS[getTokenCodeFromType(tokenType)]} payment ${index + 1}/${tokenRows.length}...`);
                    pushBatchLog(`Requesting wallet approval for ${TOKEN_LABELS[getTokenCodeFromType(tokenType)]} payment ${index + 1} of ${tokenRows.length}.`);

                    const receipt = await payInvoiceOnChain(api, row.paymentOpening!);
                    const transactionId = receipt.transactionId;
                    if (!transactionId) {
                        throw new Error(`Missing transaction ID for invoice ${row.hash}.`);
                    }

                    updateRow(row.id, { executionState: 'processing', executionMessage: 'Confirmed on-chain. Recording for merchant claim...', txId: transactionId });
                    pushBatchLog(`Invoice ${shorten(row.hash)} confirmed on-chain. Reporting the payment so the merchant can claim it.`);

                    try {
                        // The public, self-verifying reconcile endpoint —
                        // not a raw status PATCH — since this is also the
                        // only thing that ever delivers the merchant's
                        // escrow claim material to the backend for a
                        // directly-paid invoice. See its backend comment.
                        await reportInvoicePayment(row.hash, receipt);
                        pushBatchLog(`Database updated for invoice ${shorten(row.hash)} with payment tx ${shorten(transactionId)}.`);
                    } catch (syncError: any) {
                        const syncMessage = syncError?.message || 'Unknown invoice sync failure';
                        // The payment itself already succeeded on-chain (real
                        // value moved) — only the DB sync failed. Keep the
                        // txId visible and let the batch continue instead of
                        // treating this as a fatal, batch-halting error.
                        updateRow(row.id, {
                            executionState: 'failed',
                            executionMessage: 'Payment confirmed on-chain, but saving the tx id to the database failed. Keep this transaction ID — it settled.',
                            txId: transactionId
                        });
                        pushBatchLog(`Invoice ${shorten(row.hash)} was paid on-chain, but database sync failed: ${syncMessage}`);
                        failed += 1;
                        continue;
                    }

                    localStorage.setItem(`lumapay:receipt:${row.hash}:${transactionId}`, JSON.stringify({
                        ...receipt,
                        requestId: row.hash,
                        kind: 'invoice',
                        payerAddress: payerOwner,
                        merchant: row.merchant,
                        amount: row.paymentOpening!.amount,
                        token: row.paymentOpening!.token,
                        createdAt: new Date().toISOString()
                    }));

                    updateRow(row.id, { executionState: 'paid', executionMessage: 'Paid successfully.', txId: transactionId });
                    pushBatchLog(`Invoice ${shorten(row.hash)} paid successfully.`);
                    succeeded += 1;
                } catch (rowError: any) {
                    const rowMessage = extractErrorDetails(rowError) || rowError?.message || 'Payment failed.';
                    updateRow(row.id, { executionState: 'failed', executionMessage: rowMessage, txId: null });
                    pushBatchLog(`Invoice ${shorten(row.hash)} failed: ${rowMessage}`);
                    failed += 1;
                }
            }
        }

        const summary = failed === 0
            ? `Batch payment complete. All ${succeeded} invoice(s) were paid successfully.`
            : `Batch payment finished with ${succeeded} paid and ${failed} failed. Check each row above for details — failed rows can be retried without re-paying the ones that already succeeded.`;
        setBatchStatus(summary);
        pushBatchLog(summary);
        if (failed > 0 && succeeded === 0) {
            throw new Error(summary);
        }
    };

    const handlePayAll = async () => {
        if (burnerRequirementMessage) {
            setError(burnerRequirementMessage);
            return;
        }
        const payerOwner: string = publicKey!;
        if (!readyRows.length) {
            setError('Add at least one open invoice with a complete payment configuration.');
            return;
        }
        if (unresolvedRows.length > 0) {
            setError('Finish the donation amount and token selection for every open invoice before paying.');
            return;
        }
        try {
            setLoading(true);
            setError(null);
            setBatchLogs([]);
            setRows((current) => current.map((row) => row.status === 'OPEN' ? { ...row, executionState: 'queued', executionMessage: null } : row));

            for (const row of readyRows) {
                assertNativeBatchRow(row);
            }
            setBatchStatus('Starting native Midnight wallet-approved batch execution...');
            pushBatchLog(`Starting payment execution for ${readyRows.length} invoice(s).`);
            await runBatchExecution(payerOwner);
        } catch (err: any) {
            const detailedError = extractErrorDetails(err);
            console.error('Batch payment failed', err);
            setError(detailedError || 'Batch payment failed.');
            pushBatchLog(`Batch payment failed: ${detailedError}`);
            setBatchStatus('');
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="w-full max-w-6xl mx-auto px-4 pt-10 pb-20 relative min-h-screen">
            <div className="fixed inset-0 pointer-events-none z-0 opacity-30">
                <div className="absolute top-[-10%] left-[-10%] w-[40%] h-[40%] bg-white/5 rounded-full blur-[120px] animate-float" />
                <div className="absolute top-[20%] right-[-5%] w-[30%] h-[30%] bg-zinc-800/20 rounded-full blur-[100px] animate-float-delayed" />
                <div className="absolute bottom-[-10%] left-[20%] w-[35%] h-[35%] bg-white/5 rounded-full blur-[120px] animate-pulse-slow" />
            </div>

            <div className="absolute top-[-150px] left-1/2 -translate-x-1/2 w-screen h-[800px] z-0 pointer-events-none flex justify-center overflow-hidden">
                <img
                    src="/assets/lumapay-network-hero.png"
                    alt="Midnight privacy network"
                    className="w-full h-full object-cover opacity-40 mix-blend-screen mask-image-gradient-b"
                    style={{
                        maskImage: 'linear-gradient(to bottom, rgba(0,0,0,1) 0%, rgba(0,0,0,0) 100%)',
                        WebkitMaskImage: 'linear-gradient(to bottom, rgba(0,0,0,1) 0%, rgba(0,0,0,0) 100%)'
                    }}
                />
            </div>

            <div className="relative z-10 flex w-full flex-col gap-8">
                <motion.div
                    initial={{ opacity: 0, y: 16 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.5 }}
                    className="flex flex-col items-center justify-center text-center mb-6"
                >
                    <h1 className="text-4xl md:text-5xl font-bold mb-6 tracking-tighter leading-tight !text-white drop-shadow-[0_0_20px_rgba(255,255,255,0.2)]">
                        Batch{' '}
                        <span className="text-transparent bg-clip-text bg-gradient-to-r from-orange-400 via-orange-300 to-orange-500 drop-shadow-[0_0_15px_rgba(249,115,22,0.3)]">
                            Payments
                        </span>
                    </h1>
                    <p className="text-gray-300 text-sm md:text-base leading-relaxed max-w-md mb-6">
                        Paste payment links or import QR payloads. Configure your cart, then approve each private payment through your connected Midnight wallet.
                    </p>
                </motion.div>

                {activeRequirementMessage && (
                    <GlassCard className="mx-auto max-w-3xl border border-red-500/25 bg-[linear-gradient(135deg,rgba(239,68,68,0.12),rgba(127,29,29,0.08))] p-5 sm:p-6">
                        <div className="flex items-start gap-4">
                            <div className="mt-0.5 flex h-10 w-10 shrink-0 items-center justify-center rounded-2xl border border-red-400/25 bg-red-500/12 text-red-300 shadow-[0_10px_30px_rgba(127,29,29,0.22)]">
                                <svg className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z" />
                                </svg>
                            </div>
                            <div className="min-w-0 flex-1">
                                <div className="flex items-center gap-3">
                                    <p className="text-sm font-semibold tracking-[0.2em] text-red-300 uppercase">Action Required</p>
                                    <span className="h-px flex-1 bg-gradient-to-r from-red-400/30 to-transparent" />
                                </div>
                                <p className="mt-2 text-sm leading-7 text-red-50/88">{activeRequirementMessage}</p>
                            </div>
                        </div>
                    </GlassCard>
                )}

                <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
                    <div className="lg:col-span-7 xl:col-span-8 flex flex-col gap-6">
                        <GlassCard className="border-white/10 p-6 sm:p-8">
                            <div className="mb-6 flex flex-col gap-1.5">
                                <h2 className="text-xl font-medium text-white flex items-center gap-2">
                                    <span className="flex h-6 w-6 items-center justify-center rounded-full bg-white/10 text-xs font-bold text-white">1</span>
                                    Add Invoices
                                </h2>
                                <p className="text-sm text-gray-400 pl-8">Paste LumaPay payment links or upload QR payloads to build your cart.</p>
                            </div>
                            <div className="pl-8">
                                <Input
                                    label="Payment Links"
                                    value={rawInput}
                                    onChange={(event: any) => setRawInput(event.target.value)}
                                    placeholder="Paste one payment link per line..."
                                />
                                <div className="mt-4 flex flex-wrap gap-3">
                                    <Button variant="primary" onClick={handleAddLinks} disabled={loading || !rawInput.trim()}>
                                        {loading ? 'Resolving...' : 'Add Links'}
                                    </Button>
                                    <label className="inline-flex cursor-pointer items-center rounded-xl border border-white/10 bg-white/[0.02] px-4 py-3 text-sm font-medium text-white transition-colors hover:border-white/20 hover:bg-white/[0.04]">
                                        Upload QR
                                        <input type="file" accept="image/*" className="hidden" onChange={handleQrUpload} />
                                    </label>
                                </div>
                                {error && !activeRequirementMessage && <p className="mt-3 text-sm text-red-400">{error}</p>}
                            </div>
                        </GlassCard>

                        <GlassCard className="border-white/10 p-6 sm:p-8 overflow-visible">
                            <div className="mb-6 flex items-center justify-between">
                                <div className="flex flex-col gap-1.5">
                                    <h2 className="text-xl font-medium text-white flex items-center gap-2">
                                        <span className="flex h-6 w-6 items-center justify-center rounded-full bg-white/10 text-xs font-bold text-white">2</span>
                                        Invoice Summary
                                    </h2>
                                    <p className="text-sm text-gray-400 pl-8">{rows.length} item{rows.length === 1 ? '' : 's'} in cart</p>
                                </div>
                                {rows.length > 0 && (
                                    <button 
                                        onClick={() => setRows([])} 
                                        disabled={loading}
                                        className="text-sm text-gray-500 hover:text-red-400 transition-colors disabled:opacity-50 disabled:cursor-not-allowed px-3 py-1.5 rounded-lg hover:bg-red-500/10"
                                    >
                                        Clear Cart
                                    </button>
                                )}
                            </div>
                            
                            <div className="space-y-4 pl-8">
                                {rows.length === 0 && (
                                    <div className="rounded-2xl border border-dashed border-white/10 bg-white/[0.01] p-8 text-center text-sm text-gray-500">
                                        No invoices added yet.
                                    </div>
                                )}
                                <AnimatePresence mode="popLayout">
                                    {rows.map((row) => {
                                    const allowedTokens = getAllowedTokensForInvoice(row.tokenType, row.invoiceType);
                                    const effectiveTokenType = getEffectiveTokenType(row);
                                    const effectiveAmount = getEffectiveAmount(row);
                                    const isWaitingConfig = (row.tokenType === 3 || row.invoiceType === 2) && row.status === 'OPEN' && (!row.selectedTokenType && row.invoiceType !== 2);

                                    return (
                                        <motion.div 
                                            layout
                                            initial={{ opacity: 0, scale: 0.98 }}
                                            animate={{ opacity: 1, scale: 1 }}
                                            exit={{ opacity: 0, scale: 0.98 }}
                                            key={row.id} 
                                            style={{ zIndex: activeDropdownId === row.id ? 50 : 0 }}
                                            className={`group relative rounded-2xl border transition-all duration-500 
                                                ${row.executionState === 'paid' ? 'border-emerald-500/20 bg-emerald-500/[0.02]' : 
                                                  row.executionState === 'failed' ? 'border-red-500/20 bg-red-500/[0.02]' : 
                                                  isWaitingConfig ? 'border-orange-500/30 bg-orange-500/[0.03]' : 'border-white/10 bg-white/[0.02]'}
                                                p-5 hover:border-white/20 hover:bg-white/[0.04]`}
                                        >
                                            {/* Status Header */}
                                            <div className="flex flex-wrap items-center justify-between gap-4">
                                                <div className="flex items-center gap-3">
                                                    <span className="flex items-center gap-1.5 rounded-full border border-white/10 bg-black/40 px-2.5 py-1 text-[10px] font-bold uppercase tracking-wider text-gray-400">
                                                        <Zap className="h-3 w-3 text-orange-400" />
                                                        {row.source} link
                                                    </span>
                                                    <span className={`flex items-center gap-1.5 rounded-full px-2.5 py-1 text-[10px] font-bold uppercase tracking-wider ${
                                                        row.executionState === 'paid' ? 'bg-emerald-500/10 text-emerald-400 border border-emerald-500/20' : 
                                                        row.executionState === 'failed' ? 'bg-red-500/10 text-red-400 border border-red-500/20' : 
                                                        row.executionState === 'processing' ? 'bg-blue-500/10 text-blue-400 border border-blue-500/20' : 
                                                        row.status === 'SETTLED' ? 'bg-emerald-500/10 text-emerald-400 border border-emerald-500/20' : 
                                                        'bg-white/5 text-gray-500 border border-white/10'
                                                    }`}>
                                                        {row.executionState === 'processing' && <span className="h-1.5 w-1.5 rounded-full bg-blue-400 animate-pulse" />}
                                                        {formatExecutionState(row)}
                                                    </span>
                                                </div>
                                                <div className="flex items-center gap-3">
                                                    <div className="text-[10px] font-bold uppercase tracking-widest text-gray-600">
                                                        <span className="flex items-center gap-1"><Hash className="h-2.5 w-2.5" /> {row.hash.slice(0, 8)}</span>
                                                    </div>
                                                    <button
                                                        type="button"
                                                        onClick={() => removeRow(row.id)}
                                                        disabled={loading}
                                                        className="flex h-9 w-9 items-center justify-center rounded-xl border border-white/10 bg-white/[0.02] text-gray-500 transition-all hover:border-red-500/30 hover:bg-red-500/10 hover:text-red-300 disabled:cursor-not-allowed disabled:opacity-50"
                                                        title="Remove invoice from cart"
                                                        aria-label="Remove invoice from cart"
                                                    >
                                                        <Trash2 className="h-4 w-4" />
                                                    </button>
                                                </div>
                                            </div>

                                            {/* Main Info Grid */}
                                            <div className="mt-6 grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-4">
                                                <div className="space-y-1">
                                                    <p className="flex items-center gap-1.5 text-[10px] font-bold uppercase tracking-wider text-gray-500">
                                                        <User className="h-3 w-3" /> Merchant
                                                    </p>
                                                    <p className="font-mono text-xs text-gray-200">{shorten(row.merchant)}</p>
                                                </div>
                                                <div className="space-y-1">
                                                    <p className="flex items-center gap-1.5 text-[10px] font-bold uppercase tracking-wider text-gray-500">
                                                        <Coins className="h-3 w-3" /> Amount
                                                    </p>
                                                    <p className="text-sm font-medium text-white">
                                                        {effectiveAmount || 0} <span className="text-[10px] text-gray-500">{effectiveTokenType === null ? getTokenLabel(row.tokenType, row.invoiceType) : TOKEN_LABELS[getTokenCodeFromType(effectiveTokenType)]}</span>
                                                    </p>
                                                </div>
                                                <div className="space-y-1">
                                                    <p className="flex items-center gap-1.5 text-[10px] font-bold uppercase tracking-wider text-gray-500">
                                                        <ShieldCheck className="h-3 w-3" /> Type
                                                    </p>
                                                    <p className="text-xs text-gray-200">{row.invoiceType === 2 ? 'Donation' : row.invoiceType === 1 ? 'Multi Pay' : 'Standard'}</p>
                                                </div>
                                                <div className="space-y-1">
                                                    <p className="flex items-center gap-1.5 text-[10px] font-bold uppercase tracking-wider text-gray-500">
                                                        <Terminal className="h-3 w-3" /> Status
                                                    </p>
                                                    <p className="text-xs text-gray-200 capitalize">{row.status.toLowerCase()}</p>
                                                </div>
                                            </div>

                                            {/* Configuration Panel */}
                                            {(row.tokenType === 3 || row.invoiceType === 2) && row.status === 'OPEN' && (
                                                <motion.div 
                                                    initial={{ opacity: 0, y: 10 }}
                                                    animate={{ opacity: 1, y: 0 }}
                                                    className="mt-6 rounded-2xl border border-orange-400/20 bg-gradient-to-b from-orange-400/[0.08] to-transparent p-4"
                                                >
                                                    <div className="grid gap-5 sm:grid-cols-2">
                                                        <div className="space-y-2">
                                                            <label className="text-[10px] font-bold uppercase tracking-[0.15em] text-orange-300/80 flex items-center gap-1.5">
                                                                <Coins className="h-3 w-3" /> Payment Token
                                                            </label>
                                                            <div className="relative" ref={activeDropdownId === row.id ? dropdownRef : null}>
                                                                <button
                                                                    disabled={loading}
                                                                    onClick={(e) => {
                                                                        e.stopPropagation();
                                                                        setActiveDropdownId(activeDropdownId === row.id ? null : row.id);
                                                                    }}
                                                                    className="w-full flex items-center justify-between rounded-xl border border-white/10 bg-black/60 px-4 py-3 text-sm font-medium text-white outline-none transition-all focus:border-orange-400/50 hover:border-white/20 active:scale-[0.98]"
                                                                >
                                                                    <span className="flex items-center gap-2">
                                                                        <div className="h-1.5 w-1.5 rounded-full bg-orange-400 shadow-[0_0_8px_rgba(251,146,60,0.4)]" />
                                                                        {effectiveTokenType === null ? 'Select Token' : TOKEN_LABELS[getTokenCodeFromType(effectiveTokenType)]}
                                                                    </span>
                                                                    <ChevronDown className={`h-4 w-4 text-gray-500 transition-transform duration-300 ${activeDropdownId === row.id ? 'rotate-180 text-orange-400' : ''}`} />
                                                                </button>
                                                                
                                                                <AnimatePresence>
                                                                    {activeDropdownId === row.id && (
                                                                        <motion.div
                                                                            initial={{ opacity: 0, y: 8, scale: 0.95 }}
                                                                            animate={{ opacity: 1, y: 0, scale: 1 }}
                                                                            exit={{ opacity: 0, y: 8, scale: 0.95 }}
                                                                            transition={{ duration: 0.2, ease: [0.23, 1, 0.32, 1] }}
                                                                            className="absolute left-0 right-0 top-full z-50 mt-2 rounded-2xl border border-white/10 bg-[#0A0A0A]/95 p-1.5 shadow-[0_20px_50px_rgba(0,0,0,0.5)] backdrop-blur-2xl"
                                                                        >
                                                                            {allowedTokens.map((tokenCode) => {
                                                                                const tType = getTokenTypeFromCode(tokenCode);
                                                                                const isSelected = effectiveTokenType === tType;
                                                                                return (
                                                                                    <button
                                                                                        key={tokenCode}
                                                                                        onClick={(e) => {
                                                                                            e.stopPropagation();
                                                                                            updateRow(row.id, { selectedTokenType: tType });
                                                                                            setActiveDropdownId(null);
                                                                                        }}
                                                                                        className={`group/opt flex w-full items-center justify-between rounded-xl px-3 py-2.5 text-sm transition-all ${
                                                                                            isSelected 
                                                                                                ? 'bg-orange-500/10 text-orange-400' 
                                                                                                : 'text-gray-400 hover:bg-white/5 hover:text-white'
                                                                                        }`}
                                                                                    >
                                                                                        <span className="flex items-center gap-2.5">
                                                                                            <div className={`h-1.5 w-1.5 rounded-full transition-all duration-300 ${isSelected ? 'bg-orange-400 shadow-[0_0_10px_rgba(251,146,60,0.6)]' : 'bg-white/10 group-hover/opt:bg-white/30'}`} />
                                                                                            {TOKEN_LABELS[tokenCode]}
                                                                                        </span>
                                                                                        {isSelected && (
                                                                                            <motion.div
                                                                                                initial={{ scale: 0 }}
                                                                                                animate={{ scale: 1 }}
                                                                                                className="flex h-5 w-5 items-center justify-center rounded-full bg-orange-500/20"
                                                                                            >
                                                                                                <Check className="h-3 w-3 text-orange-400" />
                                                                                            </motion.div>
                                                                                        )}
                                                                                    </button>
                                                                                );
                                                                            })}
                                                                        </motion.div>
                                                                    )}
                                                                </AnimatePresence>
                                                            </div>
                                                        </div>

                                                        {row.invoiceType === 2 && (
                                                            <div className="space-y-2">
                                                                <label className="text-[10px] font-bold uppercase tracking-[0.15em] text-orange-300/80 flex items-center gap-1.5">
                                                                    <Coins className="h-3 w-3" /> Donation Amount
                                                                </label>
                                                                <div className="relative">
                                                                    <input
                                                                        type="number"
                                                                        min="0"
                                                                        step="0.000001"
                                                                        value={row.donationAmount}
                                                                        disabled={loading}
                                                                        onChange={(event) => updateRow(row.id, { donationAmount: event.target.value })}
                                                                        placeholder="0.00"
                                                                        className="w-full rounded-xl border border-white/10 bg-black/60 px-4 py-3 text-sm font-medium text-white outline-none transition-all focus:border-orange-400/50 hover:border-white/20"
                                                                    />
                                                                    <span className="pointer-events-none absolute inset-y-0 right-4 flex items-center text-[10px] font-bold uppercase tracking-widest text-orange-400/60">
                                                                        {effectiveTokenType === null ? 'Token' : TOKEN_LABELS[getTokenCodeFromType(effectiveTokenType)]}
                                                                    </span>
                                                                </div>
                                                            </div>
                                                        )}
                                                    </div>
                                                </motion.div>
                                            )}

                                            {/* Footer Extras */}
                                            {(row.memo || row.executionMessage || row.txId) && (
                                                <div className="mt-5 flex flex-col gap-3 border-t border-white/5 pt-4">
                                                    {row.memo && (
                                                        <div className="flex items-start gap-2.5 text-xs text-gray-400">
                                                            <MessageSquare className="mt-0.5 h-3 w-3 shrink-0 text-gray-600" />
                                                            <span className="italic leading-relaxed">"{row.memo}"</span>
                                                        </div>
                                                    )}
                                                    {row.executionMessage && (
                                                        <div className="flex items-start gap-2.5 text-[11px] text-gray-300">
                                                            <Info className="mt-0.5 h-3 w-3 shrink-0 text-blue-400" />
                                                            {row.executionMessage}
                                                        </div>
                                                    )}
                                                    {row.txId && (
                                                        <div className="flex items-center gap-2.5 text-[10px] text-gray-500">
                                                            <Terminal className="h-3 w-3 shrink-0 text-gray-700" />
                                                            Tx: <span className="font-mono text-gray-400">{shorten(row.txId)}</span>
                                                        </div>
                                                    )}
                                                </div>
                                            )}
                                        </motion.div>
                                    );
                                })}
                                </AnimatePresence>
                            </div>
                        </GlassCard>
                    </div>

                    <div className="lg:col-span-5 xl:col-span-4 flex flex-col gap-6 lg:sticky lg:top-24">
                        <GlassCard className="border-white/10 p-6 relative overflow-hidden group">
                            <div className="absolute inset-0 bg-gradient-to-br from-white/[0.03] to-transparent pointer-events-none" />
                            <div className="relative z-10 space-y-6">
                                <div>
                                    <h2 className="text-xl font-medium text-white">Review & Pay</h2>
                                    <p className="mt-1 text-sm text-gray-400">Total cart amounts</p>
                                </div>
                                <div className="grid grid-cols-1 gap-2">
                                    <div className="rounded-xl border border-white/10 bg-white/[0.02] p-3 text-center transition-colors group-hover:bg-white/[0.04]">
                                        <p className="text-[10px] font-bold uppercase tracking-wider text-gray-500">NIGHT</p>
                                        <p className="mt-1 text-lg font-medium text-white">{totals.credits.toFixed(2)}</p>
                                    </div>
                                </div>
                                <div className="space-y-2.5 text-xs text-gray-400 rounded-xl bg-black/40 p-4 border border-white/5">
                                    <div className="flex justify-between items-center">
                                        <span>Main wallet</span>
                                        <span className="font-mono text-gray-300">{publicKey ? shorten(publicKey) : 'Not connected'}</span>
                                    </div>
                                    <div className="flex justify-between items-center">
                                        <span>Execution</span>
                                        <span className={api ? 'text-emerald-400' : 'text-amber-400'}>
                                            {api ? 'Native Midnight wallet' : 'Not ready'}
                                        </span>
                                    </div>
                                </div>
                                {unresolvedRows.length > 0 && <p className="text-sm text-red-400">{unresolvedRows.length} open invoice(s) still need setup.</p>}
                                {batchStatus && <p className="text-sm text-white/80">{batchStatus}</p>}
                                
                                {batchCompleted && (
                                    <div className="rounded-xl border border-emerald-500/20 bg-emerald-500/10 p-4">
                                        <p className="text-[10px] font-bold uppercase tracking-wider text-emerald-400">Success</p>
                                        <p className="mt-1 text-sm font-medium text-emerald-100">All {paidRows.length} invoices were paid.</p>
                                    </div>
                                )}

                                <Button
                                    variant="primary"
                                    onClick={handlePayAll}
                                    disabled={loading || openRows.length === 0 || batchCompleted}
                                    className="w-full py-3.5 text-sm"
                                >
                                    {loading
                                        ? (
                                            <div className="flex items-center justify-center gap-2">
                                                <div className="h-4 w-4 animate-spin rounded-full border-2 border-white/20 border-t-white" />
                                                <span className="font-medium">Processing...</span>
                                            </div>
                                        )
                                        : batchCompleted
                                            ? 'Payments Completed'
                                            : `Pay All with Wallet${readyRows.length ? ` (${readyRows.length})` : ''}`}
                                </Button>
                            </div>
                        </GlassCard>

                        {batchLogs.length > 0 && (
                            <PaymentActivityConsole
                                method="wallet"
                                statusLog={batchLogs}
                                title="Batch Progress"
                            />
                        )}
                    </div>
                </div>
            </div>
        </div>
    );
};

