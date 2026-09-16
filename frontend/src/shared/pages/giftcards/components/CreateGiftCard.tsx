import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { useWallet } from '@/shared/hooks/wallet/WalletProvider';
import { Copy, CheckCircle2, Loader2 } from 'lucide-react';
import { WalletMultiButton } from '@/shared/components/wallet/WalletMultiButton';
import toast from 'react-hot-toast';
import { FloatingGiftCard } from './FloatingGiftCard';
import { getUtf8ByteLength, GIFT_CARD_RECORD_LABEL_MAX_BYTES } from '../../../utils/core/compactInputLimits';
import { createGiftCardsOnChain } from '@/midnight/gift-card';

export const CreateGiftCard: React.FC = () => {
    const { address, api } = useWallet();
    const [amounts, setAmounts] = useState({ NIGHT: '' });
    const [label, setLabel] = useState('');
    const [isGenerating, setIsGenerating] = useState(false);
    const [step, setStep] = useState<'INPUT' | 'FUNDING' | 'SUCCESS'>('INPUT');
    const [fundingStatus, setFundingStatus] = useState<string>('');
    const [giftCode, setGiftCode] = useState<string>('');
    const [copied, setCopied] = useState(false);
    const [historySaved, setHistorySaved] = useState(false);
    const labelBytes = getUtf8ByteLength(label.trim());
    const labelTooLong = labelBytes > GIFT_CARD_RECORD_LABEL_MAX_BYTES;

    const handleCreate = async (e: React.FormEvent) => {
        e.preventDefault();

        const midnightAmt = Number(amounts.NIGHT || 0);

        if (midnightAmt <= 0) {
            toast.error('Please enter a NIGHT amount.');
            return;
        }
        if (labelTooLong) {
            toast.error(`Keep the gift-card label within ${GIFT_CARD_RECORD_LABEL_MAX_BYTES} bytes.`);
            return;
        }

        if (!address || !api) {
            toast.error('Please connect your wallet first.');
            return;
        }

        try {
            setIsGenerating(true);
            setStep('FUNDING');
            setFundingStatus('Generating private gift-card secrets…');
            setGiftCode('');
            setCopied(false);
            setHistorySaved(false);

            const assetsToFund = [
                { token: 'NIGHT', amount: BigInt(Math.round(midnightAmt * 1_000_000)) }
            ].filter(a => a.amount > 0);
            setFundingStatus(`Creating ${assetsToFund.length} private asset ${assetsToFund.length === 1 ? 'card' : 'cards'} on Midnight…`);
            const result = await createGiftCardsOnChain(api, assetsToFund, label.trim(), BigInt(Math.floor(Date.now() / 1_000) + 31_536_000));
            result.recovery.forEach((entry) => localStorage.setItem(`lumapay:gift-card:${entry.giftCardId}`, JSON.stringify(entry)));
            setHistorySaved(true);
            setGiftCode(result.giftCode);
            setStep('SUCCESS');
            toast.success('Gift Card created successfully!');

        } catch (error: any) {
            console.error(error);
            toast.error(error.message || 'Failed to generate gift card.');
            setStep('INPUT');
        } finally {
            setIsGenerating(false);
        }
    };

    const copyCode = () => {
        navigator.clipboard.writeText(giftCode);
        setCopied(true);
        setTimeout(() => setCopied(false), 2000);
    };

    const reset = () => {
        setAmounts({ NIGHT: '' });
        setLabel('');
        setGiftCode('');
        setHistorySaved(false);
        setStep('INPUT');
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
                        onSubmit={handleCreate}
                        className="space-y-5"
                    >
                        {/* Preview card */}
                        <div className="mb-2">
                            <FloatingGiftCard amounts={{ NIGHT: amounts.NIGHT }} />
                        </div>

                        {/* Amount inputs */}
                        <div className="space-y-3">
                            <div className="relative flex items-center bg-white/[0.02] rounded-2xl overflow-hidden group h-14">
                                <div className="absolute inset-x-0 bottom-0 h-[1px] bg-gradient-to-r from-transparent via-white/10 to-transparent group-focus-within:via-orange-500/50 transition-all duration-500" />
                                <span className="pl-5 text-xs font-semibold text-white/30 uppercase tracking-[0.2em] w-24 shrink-0 transition-colors group-focus-within:text-white/50">
                                    Label
                                </span>
                                <input
                                    type="text"
                                    value={label}
                                    onChange={(e) => setLabel(e.target.value)}
                                    className="flex-1 h-full bg-transparent px-5 text-right text-sm text-white font-light focus:outline-none placeholder-white/10"
                                    placeholder="Birthday card"
                                />
                            </div>
                            <div className={`-mt-1 text-right text-[10px] ${labelTooLong ? 'text-red-400' : 'text-white/25'}`}>
                                Gift-card label lives in one Compact field: {labelBytes}/{GIFT_CARD_RECORD_LABEL_MAX_BYTES} bytes.
                            </div>
                            {(['NIGHT'] as const).map((token) => (
                                <div
                                    key={token}
                                    className="relative flex items-center bg-white/[0.02] rounded-2xl overflow-hidden group h-14"
                                >
                                    <div className="absolute inset-x-0 bottom-0 h-[1px] bg-gradient-to-r from-transparent via-white/10 to-transparent group-focus-within:via-orange-500/50 transition-all duration-500" />
                                    <span className="pl-5 text-xs font-semibold text-white/30 uppercase tracking-[0.2em] w-24 shrink-0 transition-colors group-focus-within:text-white/50">
                                        {token === 'NIGHT' ? 'NIGHT' : token}
                                    </span>
                                    <input
                                        type="number"
                                        step="0.000001"
                                        min="0"
                                        value={amounts[token]}
                                        onChange={(e) => setAmounts({ ...amounts, [token]: e.target.value })}
                                        className="flex-1 h-full bg-transparent px-5 text-right text-lg text-white font-light focus:outline-none placeholder-white/10 [appearance:textfield] [&::-webkit-outer-spin-button]:appearance-none [&::-webkit-inner-spin-button]:appearance-none"
                                        placeholder="0.00"
                                    />
                                </div>
                            ))}
                        </div>

                        {/* Footer */}
                        <div className="flex items-center justify-between pt-4">
                            <p className="text-[10px] uppercase tracking-widest text-white/20">
                                Powered by <span className="font-semibold text-white/40">Midnight Zk</span>
                            </p>
                            {address ? (
                                <button
                                    type="submit"
                                    disabled={isGenerating || !amounts.NIGHT || labelTooLong}
                                    className="px-6 py-4 text-sm font-semibold bg-white text-black rounded-xl hover:bg-white/90 active:scale-[0.98] transition-all disabled:opacity-30 disabled:cursor-not-allowed flex items-center gap-2 shadow-[0_0_20px_rgba(255,255,255,0.1)] shrink-0 group relative overflow-hidden"
                                >
                                    <div className="absolute inset-0 bg-gradient-to-r from-orange-400/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity" />
                                    <span className="relative z-10">{isGenerating ? 'Minting...' : 'Mint Card'}</span>
                                </button>
                            ) : (
                                <div className="wallet-adapter-wrapper [&>button]:!rounded-xl [&>button]:!h-12 [&>button]:!px-6 [&>button]:!text-sm [&>button]:!font-semibold [&>button]:!bg-white [&>button]:!text-black [&>button]:!shadow-[0_0_20px_rgba(255,255,255,0.1)]">
                                    <WalletMultiButton />
                                </div>
                            )}
                        </div>
                    </motion.form>
                )}

                {step === 'FUNDING' && (
                    <motion.div
                        key="funding"
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        exit={{ opacity: 0 }}
                        className="flex flex-col items-center py-10 text-center gap-6"
                    >
                        <Loader2 className="w-8 h-8 text-white/40 animate-spin" />
                        <div>
                            <h3 className="text-base font-semibold text-white mb-1">Forging Card</h3>
                            <p className="text-sm text-white/40 font-mono max-w-xs">{fundingStatus}</p>
                        </div>
                        <div className="w-full pointer-events-none opacity-50">
                            <FloatingGiftCard amounts={{ NIGHT: amounts.NIGHT }} isInteractive={false} />
                        </div>
                    </motion.div>
                )}

                {step === 'SUCCESS' && (
                    <motion.div
                        key="success"
                        initial={{ opacity: 0, y: 10 }}
                        animate={{ opacity: 1, y: 0 }}
                        className="flex flex-col items-center text-center gap-6"
                    >
                        <div className="w-10 h-10 rounded-full bg-green-500/10 border border-green-500/20 flex items-center justify-center">
                            <CheckCircle2 className="w-5 h-5 text-green-400" />
                        </div>
                        <div>
                            <h3 className="text-lg font-semibold text-white mb-1">Gift Card Ready</h3>
                            <p className="text-sm text-white/40">Share this code with the recipient — they can redeem it instantly.</p>
                            <p className={`mt-2 text-xs ${historySaved ? 'text-green-300/80' : 'text-amber-300/80'}`}>
                                {historySaved
                                    ? 'Saved to your private on-chain gift-card history.'
                                    : 'On-chain history backup failed for this card, so keep this code safe.'}
                            </p>
                        </div>

                        <div className="w-full cursor-pointer" onClick={copyCode}>
                            <FloatingGiftCard giftCode={giftCode} amounts={{ NIGHT: amounts.NIGHT }} isInteractive={false} />
                            <p className="mt-3 text-xs text-white/25 flex items-center justify-center gap-1.5">
                                <Copy className="w-3 h-3" />
                                {copied ? 'copied' : 'Click to copy code'}
                            </p>
                        </div>

                        <button
                            onClick={reset}
                            className="text-sm text-white/30 hover:text-white/60 transition-colors"
                        >
                            Create another card
                        </button>
                    </motion.div>
                )}
            </AnimatePresence>
        </div>
    );
};
