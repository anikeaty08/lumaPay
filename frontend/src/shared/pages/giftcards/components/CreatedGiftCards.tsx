import React, { useCallback, useEffect, useMemo, useState } from 'react';
import { useWallet } from '@/shared/hooks/wallet/WalletProvider';
import { Copy, Loader2, RefreshCw } from 'lucide-react';
import toast from 'react-hot-toast';
import { API_URL } from '../../../../midnight/config';
import { encodeCode, type GiftCardIssuerRecovery } from '../../../../midnight/gift-card';

interface CreatedGiftCardEntry {
    id: string;
    giftCardAddress: string;
    giftCode: string;
    label: string;
    amount: number;
    token: string;
    status: 'OPEN' | 'USED' | 'UNKNOWN';
    isLoadingStatus: boolean;
}

const RECOVERY_KEY_PREFIX = 'lumapay:gift-card:';

function shortenAddress(value: string) {
    if (value.length <= 16) {
        return value;
    }
    return `${value.slice(0, 8)}...${value.slice(-6)}`;
}

// Recovery bundles are cached in this browser's localStorage at creation
// time (see CreateGiftCard.tsx) — that's the actual source of truth for
// "which cards did I mint," since the connected Midnight wallet has no
// record-query API to enumerate them from (requestRecords/decrypt are Leo
// wallet-connector methods that don't exist on a real Midnight wallet;
// calling them always threw here, which is why this list was always empty
// with a silent error toast before).
function readRecoveryBundlesFromStorage(): GiftCardIssuerRecovery[] {
    const entries: GiftCardIssuerRecovery[] = [];
    for (let index = 0; index < localStorage.length; index += 1) {
        const key = localStorage.key(index);
        if (!key || !key.startsWith(RECOVERY_KEY_PREFIX)) continue;
        try {
            const raw = localStorage.getItem(key);
            if (!raw) continue;
            const parsed = JSON.parse(raw) as GiftCardIssuerRecovery;
            if (parsed?.giftCardId) entries.push(parsed);
        } catch {
            // Skip anything that isn't a valid recovery bundle.
        }
    }
    return entries;
}

export const CreatedGiftCards: React.FC = () => {
    const { address } = useWallet();
    const [entries, setEntries] = useState<CreatedGiftCardEntry[]>([]);
    const [isLoading, setIsLoading] = useState(false);
    const [hasLoaded, setHasLoaded] = useState(false);
    const [copiedId, setCopiedId] = useState<string | null>(null);
    const fetchIdRef = React.useRef(0);

    const loadCreatedGiftCards = useCallback(async () => {
        const currentFetchId = ++fetchIdRef.current;
        setIsLoading(true);

        const bundles = readRecoveryBundlesFromStorage();
        const nextEntries: CreatedGiftCardEntry[] = bundles.map((bundle) => ({
            id: bundle.giftCardId,
            giftCardAddress: bundle.giftCardId,
            giftCode: encodeCode([{
                giftCardId: bundle.giftCardId,
                amount: bundle.amount,
                token: bundle.token,
                tokenId: bundle.tokenId,
                giftSecret: bundle.giftSecret,
                giftRandomness: bundle.giftRandomness,
                expiry: bundle.expiry,
                escrowCoin: bundle.escrowCoin,
            }]),
            label: bundle.label || '',
            amount: Number(BigInt(bundle.amount)) / 1_000_000,
            token: bundle.token,
            status: 'UNKNOWN',
            isLoadingStatus: true,
        }));

        setEntries(nextEntries);
        setHasLoaded(true);
        setIsLoading(false);

        await Promise.all(nextEntries.map(async (entry) => {
            try {
                const response = await fetch(`${API_URL}/api/v1/chain/gift-cards/${entry.giftCardAddress}`);
                if (currentFetchId !== fetchIdRef.current) return;
                const status: CreatedGiftCardEntry['status'] = !response.ok
                    ? 'UNKNOWN'
                    : (await response.json())?.status === 'OPEN' ? 'OPEN' : 'USED';
                setEntries((current) => current.map((item) => (
                    item.id === entry.id ? { ...item, status, isLoadingStatus: false } : item
                )));
            } catch {
                if (currentFetchId !== fetchIdRef.current) return;
                setEntries((current) => current.map((item) => (
                    item.id === entry.id ? { ...item, status: 'UNKNOWN', isLoadingStatus: false } : item
                )));
            }
        }));
    }, []);

    useEffect(() => {
        loadCreatedGiftCards();
    }, [loadCreatedGiftCards]);

    const totalCount = entries.length;
    const usedCount = useMemo(
        () => entries.filter((entry) => entry.status === 'USED').length,
        [entries]
    );

    const copyGiftCode = async (giftCode: string, entryId: string) => {
        try {
            await navigator.clipboard.writeText(giftCode);
            setCopiedId(entryId);
            toast.success('Gift code copied.');
            setTimeout(() => setCopiedId(null), 2000);
        } catch {
            toast.error('Could not copy — your browser blocked clipboard access.');
        }
    };

    if (!address) {
        return (
            <div className="py-10 text-center">
                <p className="text-sm text-white/70">Connect your wallet to view created gift cards.</p>
            </div>
        );
    }

    return (
        <div className="space-y-5">
            <div className="flex items-center justify-between gap-4">
                <div>
                    <p className="text-[10px] font-semibold uppercase tracking-[0.26em] text-white/30">Created In This Browser</p>
                    <p className="mt-1 text-sm font-medium text-orange-100/90">
                        {hasLoaded ? (
                            <>
                                <span className="text-white">{totalCount}</span> created card{totalCount === 1 ? '' : 's'} / <span className="text-white">{usedCount}</span> used
                            </>
                        ) : 'Loading created cards...'}
                    </p>
                </div>
                <button
                    type="button"
                    onClick={() => loadCreatedGiftCards()}
                    disabled={isLoading}
                    className="group inline-flex items-center gap-2 rounded-xl border border-white/5 bg-white/[0.03] backdrop-blur-md px-3.5 py-2.5 text-xs font-semibold text-white/70 transition-all duration-300 hover:border-orange-500/30 hover:bg-orange-500/10 hover:text-orange-300 disabled:opacity-50 hover:shadow-[0_0_15px_rgba(249,115,22,0.15)]"
                >
                    {isLoading ? <Loader2 className="h-3.5 w-3.5 animate-spin" /> : <RefreshCw className="h-3.5 w-3.5 transition-transform duration-500 group-hover:rotate-180" />}
                    Refresh
                </button>
            </div>

            <p className="text-[10px] leading-relaxed text-white/25">
                This list reads recovery data cached in this browser at creation time — it won't show cards created on another device.
            </p>

            {!isLoading && hasLoaded && entries.length === 0 ? (
                <div className="rounded-[1.8rem] border border-white/5 bg-white/[0.02] backdrop-blur-xl px-5 py-12 text-center shadow-inner">
                    <p className="text-sm font-medium text-white/75">No gift-card history found yet.</p>
                    <p className="mt-2 text-xs text-white/40">
                        Cards you mint in this browser will appear here.
                    </p>
                </div>
            ) : null}

            <div className="space-y-3">
                {entries.map((entry) => {
                    const isUsed = entry.status === 'USED';

                    return (
                        <div
                            key={entry.id}
                            className="group relative overflow-hidden rounded-[1.8rem] border border-white/5 bg-white/[0.02] p-5 shadow-[0_8px_30px_rgba(0,0,0,0.12)] backdrop-blur-2xl transition-all duration-300 hover:-translate-y-1 hover:border-orange-500/20 hover:bg-white/[0.03] hover:shadow-[0_20px_40px_rgba(249,115,22,0.08)]"
                        >
                            {/* Subtle top glare/gradient */}
                            <div className="absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent via-white/10 to-transparent opacity-0 transition-opacity duration-300 group-hover:opacity-100" />

                            <div className="flex items-start justify-between gap-4">
                                <div className="min-w-0">
                                    {(entry.isLoadingStatus || isUsed) && (
                                        <div className="mb-4 flex items-center gap-2">
                                            {entry.isLoadingStatus ? (
                                                <div className="h-[26px] w-[68px] animate-pulse rounded-full bg-white/[0.05]" />
                                            ) : (
                                                <span className="inline-flex items-center rounded-full border border-white/5 bg-white/5 px-2.5 py-1.5 text-[10px] font-bold uppercase tracking-[0.16em] text-white/40 backdrop-blur-md">
                                                    Used
                                                </span>
                                            )}
                                        </div>
                                    )}
                                    <p className="text-[10px] uppercase tracking-[0.22em] text-white/30">Card address</p>
                                    <p className="mt-1.5 font-mono text-sm font-medium text-white/80">{shortenAddress(entry.giftCardAddress)}</p>
                                    {entry.label && (
                                        <>
                                            <p className="mt-3 text-[10px] uppercase tracking-[0.22em] text-white/30">Label</p>
                                            <p className="mt-1 text-sm text-orange-100/85">{entry.label}</p>
                                        </>
                                    )}
                                </div>
                                <button
                                    type="button"
                                    onClick={() => copyGiftCode(entry.giftCode, entry.id)}
                                    className="shrink-0 inline-flex items-center gap-2 rounded-xl border border-white/5 bg-white/[0.03] backdrop-blur-md px-3.5 py-2.5 text-xs font-semibold text-white/70 transition-all duration-300 hover:border-orange-500/30 hover:bg-orange-500/10 hover:text-orange-300 hover:shadow-[0_0_15px_rgba(249,115,22,0.1)] active:scale-95"
                                >
                                    <Copy className={`h-3.5 w-3.5 transition-transform duration-300 ${copiedId === entry.id ? 'scale-110 text-orange-400' : 'group-hover:scale-110'}`} />
                                    {copiedId === entry.id ? 'Copied' : 'Copy code'}
                                </button>
                            </div>

                            <div className="mt-5 border-t border-white/5 pt-5 pb-1">
                                <div className="grid grid-cols-1 gap-3">
                                    <div className="px-1">
                                        <p className="text-[10px] font-semibold uppercase tracking-[0.22em] text-white/40">
                                            {entry.token}
                                        </p>
                                        <p className={`mt-2.5 text-2xl font-bold tracking-tight transition-colors duration-300 ${
                                            !isUsed ? 'text-orange-400 drop-shadow-[0_0_8px_rgba(249,115,22,0.4)]' : 'text-white/90'
                                        }`}>
                                            {entry.amount.toFixed(2)}
                                        </p>
                                    </div>
                                </div>
                            </div>
                        </div>
                    );
                })}
            </div>
        </div>
    );
};
