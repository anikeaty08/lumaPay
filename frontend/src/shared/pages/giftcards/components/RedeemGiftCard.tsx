import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { useWallet } from '@/shared/hooks/wallet/WalletProvider';
import { Search, Loader2, ArrowRight, CheckCircle2 } from 'lucide-react';
import { WalletMultiButton } from '@/shared/components/wallet/WalletMultiButton';
import toast from 'react-hot-toast';
import { FloatingGiftCard } from './FloatingGiftCard';
import { ScratchReveal } from './ScratchReveal';
import { PaymentActivityConsole } from '../../../components/payments/PaymentActivityConsole';
import { decodeGiftCode, redeemGiftCardsOnChain, type GiftCardOpening } from '@/midnight/gift-card';
import { API_URL } from '@/midnight/config';

export const RedeemGiftCard: React.FC = () => {
    const { address, api } = useWallet();
    const [giftCode, setGiftCode] = useState('');
    const [cards, setCards] = useState<GiftCardOpening[]>([]);
    const [step, setStep] = useState<'INPUT' | 'SCANNING' | 'BALANCES' | 'SWEEPING' | 'SUCCESS'>('INPUT');
    const [isRevealed, setIsRevealed] = useState(false);
    const [balances, setBalances] = useState<{ NIGHT: number }>({ NIGHT: -1 });
    const [sweepToken, setSweepToken] = useState<'NIGHT'>('NIGHT');
    const [sweepAmount, setSweepAmount] = useState('');
    const [logs, setLogs] = useState<string[]>([]);
    const [txId, setTxId] = useState<string | null>(null);

    const addLog = (msg: string) => {
        setLogs(prev => [...prev, `[${new Date().toLocaleTimeString()}] ${msg}`]);
    };

    const handleScan = async (e: React.FormEvent) => {
        e.preventDefault();
        if (!giftCode.startsWith('LUMA-')) {
            toast.error('Invalid gift card format. LumaPay codes start with "LUMA-".');
            return;
        }

        // ── Reset all stale state BEFORE the async fetch ─────────────────────
        setBalances({ NIGHT: -1 });
        setIsRevealed(false);
        setLogs([]);
        setTxId(null);
        setSweepAmount('');
        // ─────────────────────────────────────────────────────────────────────

        try {
            setStep('SCANNING');
            const decoded = decodeGiftCode(giftCode.trim());
            const states = await Promise.all(decoded.map(async (card) => {
                const response = await fetch(`${API_URL}/api/v1/chain/gift-cards/${card.giftCardId}`);
                return response.ok ? response.json() : null;
            }));
            const openCards = decoded.filter((_card, index) => states[index]?.status === 'OPEN');
            if (openCards.length === 0) throw new Error('This gift card is already redeemed, expired, or unavailable.');
            setCards(openCards);
            const foundBalances = openCards.reduce<{ NIGHT: number }>((total, card) => {
                if (card.token === 'NIGHT') {
                    total.NIGHT += Number(BigInt(card.amount)) / 1_000_000;
                }
                return total;
            }, { NIGHT: 0 });
            setBalances(foundBalances);

            // Auto-select the first token with a balance > 0
            if (foundBalances.NIGHT > 0) setSweepToken('NIGHT');

            setStep('BALANCES');
        } catch (err) {
            toast.error(err instanceof Error ? err.message : 'Invalid gift card code or corrupted data.');
            setStep('INPUT');
        }
    };

    const handleSweep = async () => {
        if (!address || !api) {
            toast.error('Please connect your destination wallet first.');
            return;
        }

        const amtNum = Number(sweepAmount);
        if (isNaN(amtNum) || amtNum !== balances[sweepToken]) {
            toast.error(`Gift cards redeem the full ${balances[sweepToken].toFixed(6)} ${sweepToken} balance.`);
            return;
        }

        setStep('SWEEPING');
        setLogs([]);
        setTxId(null);

        try {
            addLog(`Generating redemption proof for ${sweepToken}…`);
            const selected = cards.filter((card) => card.token === sweepToken);
            const transactionIds = await redeemGiftCardsOnChain(api, selected);
            const transactionId = transactionIds[0] ?? '';
            addLog(`Redemption accepted by Midnight. Transaction: ${transactionIds.join(', ')}`);
            setTxId(transactionId);
            setStep('SUCCESS');

        } catch (err: any) {
            console.error('DPS Sweep Failed:', err);
            addLog(`✗ Error: ${err.message}`);
            toast.error(err.message || 'Failed to sweep funds.');
            // We do not revert step unless user wants to go back. Let them see logs.
        }
    };

    return (
        <div className="w-full">
            <AnimatePresence mode="wait">
                {step === 'INPUT' && (
                    <motion.form
                        key="input"
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        exit={{ opacity: 0 }}
                        onSubmit={handleScan}
                        className="space-y-4"
                    >
                        <div>
                            <p className="text-xs text-white/30 uppercase tracking-widest mb-1">Gift Code</p>
                            <input
                                type="text"
                                value={giftCode}
                                onChange={(e) => {
                                    setGiftCode(e.target.value);
                                    // Clear any stale balances when the code changes
                                    setBalances({ NIGHT: -1 });
                                    setIsRevealed(false);
                                }}
                                className="w-full bg-white/[0.03] border border-white/[0.08] rounded-xl py-3.5 px-4 text-sm text-white font-mono placeholder-white/20 focus:outline-none focus:border-white/20 transition-all"
                                placeholder="gift-..."
                                spellCheck={false}
                            />
                        </div>
                        <button
                            type="submit"
                            disabled={!giftCode}
                            className="w-full py-3 text-sm font-semibold bg-gradient-to-r from-orange-500 to-orange-400 text-white rounded-lg hover:from-orange-400 hover:to-orange-300 active:scale-[0.98] transition-all disabled:opacity-30 disabled:cursor-not-allowed flex items-center justify-center gap-2 shadow-[0_0_15px_rgba(249,115,22,0.25)]"
                        >
                            <Search className="w-4 h-4" /> Scan Card
                        </button>
                    </motion.form>
                )}

                {step === 'SCANNING' && (
                    <motion.div
                        key="scanning"
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        exit={{ opacity: 0 }}
                        className="flex flex-col items-center py-12 gap-4 text-center"
                    >
                        <Loader2 className="w-7 h-7 text-white/40 animate-spin" />
                        <div>
                            <p className="text-sm font-medium text-white">Scanning network</p>
                            <p className="text-xs text-white/30 mt-1">Checking Midnight blockchain for private records</p>
                        </div>
                    </motion.div>
                )}

                {step === 'BALANCES' && (
                    <motion.div
                        key="balances"
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        className="space-y-5"
                    >
                        {/* Scratch card */}
                        <div className="w-full">
                             <ScratchReveal onReveal={() => setIsRevealed(true)}>
                                 <FloatingGiftCard amounts={{ NIGHT: balances.NIGHT }} isInteractive={false} />
                             </ScratchReveal>
                        </div>
                        
                        <AnimatePresence>
                            {isRevealed && (
                                <motion.div
                                    initial={{ opacity: 0, y: 8 }}
                                    animate={{ opacity: 1, y: 0 }}
                                    className="space-y-4"
                                >
                                    {/* Token balances - Ultra Minimalist Design */}
                                    <div className="flex flex-col gap-3 py-2">
                                        <p className="text-[10px] uppercase tracking-[0.2em] text-white/30 font-semibold px-2">Available Assets</p>
                                        <div className="grid grid-cols-1 gap-3">
                                            {([
                                                { key: 'NIGHT', label: 'NIGHT', activeBg: 'bg-white/[0.08] shadow-[0_4px_20px_rgba(255,255,255,0.05)]' },
                                            ] as const).map(({ key, label, activeBg }) => {
                                                const bal = balances[key];
                                                const isSelected = sweepToken === key;
                                                const hasBalance = bal > 0;
                                                return (
                                                    <button
                                                        key={key}
                                                        type="button"
                                                        disabled={!hasBalance}
                                                        onClick={() => {
                                                            if (hasBalance) {
                                                                setSweepToken(key);
                                                                setSweepAmount(String(bal));
                                                            }
                                                        }}
                                                        className={`relative overflow-hidden flex flex-col items-center justify-center p-5 rounded-2xl transition-all duration-300 group disabled:opacity-40 disabled:cursor-not-allowed ${
                                                            isSelected
                                                                ? `border border-white/20 ${activeBg}`
                                                                : 'border border-transparent bg-white/[0.02] hover:bg-white/[0.04]'
                                                        }`}
                                                    >
                                                        {isSelected && (
                                                            <div className="absolute top-0 w-12 h-[2px] bg-gradient-to-r from-transparent via-white/50 to-transparent" />
                                                        )}
                                                        <p className={`text-xs uppercase tracking-[0.15em] mb-2 transition-colors ${isSelected ? 'text-white/60' : 'text-white/30'}`}>
                                                            {label}
                                                        </p>
                                                        <div className="flex items-baseline gap-1">
                                                            <p className={`text-2xl font-light font-sans tracking-tight transition-colors ${
                                                                hasBalance ? (isSelected ? 'text-white' : 'text-white/80') : 'text-white/20'
                                                            }`}>
                                                                {hasBalance ? bal.toFixed(2) : '0.00'}
                                                            </p>
                                                        </div>
                                                    </button>
                                                );
                                            })}
                                        </div>
                                    </div>

                                    {/* Withdraw row */}
                                    <div className="flex gap-3 pt-2">
                                        <div className="relative flex-1 bg-white/[0.02] rounded-xl overflow-hidden group">
                                            <div className="absolute inset-x-0 bottom-0 h-[1px] bg-gradient-to-r from-transparent via-white/10 to-transparent group-focus-within:via-orange-500/50 transition-all duration-500" />
                                            <input
                                                type="number"
                                                value={sweepAmount}
                                                onChange={(e) => setSweepAmount(e.target.value)}
                                                className="w-full h-full bg-transparent px-5 py-4 text-lg text-white font-light focus:outline-none [appearance:textfield] [&::-webkit-outer-spin-button]:appearance-none [&::-webkit-inner-spin-button]:appearance-none placeholder-white/10"
                                                placeholder={`Max: ${balances[sweepToken].toFixed(2)}`}
                                            />
                                        </div>
                                        {address ? (
                                            <button
                                                onClick={handleSweep}
                                                disabled={!sweepAmount}
                                                className="px-6 py-4 text-sm font-semibold bg-white text-black rounded-xl hover:bg-white/90 active:scale-[0.98] transition-all disabled:opacity-30 disabled:cursor-not-allowed flex items-center gap-2 shadow-[0_0_20px_rgba(255,255,255,0.1)] shrink-0 group relative overflow-hidden"
                                            >
                                                <div className="absolute inset-0 bg-gradient-to-r from-orange-400/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity" />
                                                <span className="relative z-10">Withdraw</span>
                                                <ArrowRight className="w-4 h-4 relative z-10 group-hover:translate-x-1 transition-transform" />
                                            </button>
                                        ) : (
                                            <div className="wallet-adapter-wrapper shrink-0 [&>button]:!rounded-xl [&>button]:!h-full [&>button]:!px-6 [&>button]:!text-sm [&>button]:!font-semibold [&>button]:!bg-white [&>button]:!text-black [&>button]:!shadow-[0_0_20px_rgba(255,255,255,0.1)]">
                                                <WalletMultiButton />
                                            </div>
                                        )}
                                    </div>
                                </motion.div>
                            )}
                        </AnimatePresence>

                        <button
                            onClick={() => {
                                setStep('INPUT');
                                // Clear balances so re-scanning always fetches fresh data
                                setBalances({ NIGHT: -1 });
                                setIsRevealed(false);
                            }}
                            className="w-full text-xs text-white/25 hover:text-white/50 pt-2 transition-colors"
                        >Cancel</button>
                    </motion.div>
                )}

                {step === 'SWEEPING' && (
                    <motion.div
                        key="sweeping"
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        className="py-6 space-y-4"
                    >
                        <div className="flex items-center gap-3">
                            <Loader2 className="w-5 h-5 text-white/40 animate-spin shrink-0" />
                            <div>
                                <p className="text-sm font-medium text-white">Generating ZK Proofs</p>
                                <p className="text-xs text-white/30">Your wallet approval stays local to your browser.</p>
                            </div>
                        </div>
                        <PaymentActivityConsole
                            method="giftcard"
                            statusLog={logs}
                            title="Redemption Progress"
                            compact
                        />
                        <button onClick={() => setStep('BALANCES')} className="text-xs text-white/25 hover:text-white/50">Go back</button>
                    </motion.div>
                )}

                {step === 'SUCCESS' && (
                    <motion.div
                        key="success"
                        initial={{ opacity: 0, y: 10 }}
                        animate={{ opacity: 1, y: 0 }}
                        className="flex flex-col items-center text-center gap-5 py-4"
                    >
                        <div className="w-10 h-10 rounded-full bg-green-500/10 border border-green-500/20 flex items-center justify-center">
                            <CheckCircle2 className="w-5 h-5 text-green-400" />
                        </div>
                        <div>
                            <h3 className="text-lg font-semibold text-white mb-1">Funds Redeemed</h3>
                            <p className="text-sm text-white/40">Funds are on their way to your connected wallet.</p>
                        </div>
                        {txId && (
                            <div
                                className="text-xs text-white/40 font-mono bg-white/[0.04] border border-white/[0.07] px-4 py-2 rounded-lg hover:border-white/15 transition-colors"
                            >
                                Tx: {txId.substring(0, 20)}...
                            </div>
                        )}
                        <button
                            onClick={() => { setGiftCode(''); setStep('INPUT'); }}
                            className="text-sm text-white/30 hover:text-white/60 transition-colors"
                        >
                            Redeem another card
                        </button>
                    </motion.div>
                )}
            </AnimatePresence>
        </div>
    );
};
