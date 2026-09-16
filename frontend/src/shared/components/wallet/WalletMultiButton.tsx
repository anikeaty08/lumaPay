import {
    useEffect,
    useId,
    useRef,
    useState,
    type ButtonHTMLAttributes,
} from 'react';
import {
    ArrowRight,
    Check,
    ChevronDown,
    Copy,
    LoaderCircle,
    LogOut,
    MoonStar,
    ShieldCheck,
    Wallet,
    X,
} from 'lucide-react';
import { createPortal } from 'react-dom';
import { useWallet } from '../../hooks/wallet/WalletProvider';

const compactAddress = (value: string) => `${value.slice(0, 10)}...${value.slice(-6)}`;
const SHIELD_EXTENSION_URL = 'https://www.midnight.gd/';

const focusableSelector = [
    'button:not([disabled])',
    '[href]',
    'input:not([disabled])',
    'select:not([disabled])',
    'textarea:not([disabled])',
    '[tabindex]:not([tabindex="-1"])',
].join(',');

export function WalletMultiButton({ className = '', onClick, ...props }: ButtonHTMLAttributes<HTMLButtonElement>) {
    const {
        address,
        authError,
        authenticated,
        authenticating,
        connected,
        connecting,
        disconnect,
        select,
        signIn,
        summary,
        wallets,
    } = useWallet();
    const [open, setOpen] = useState(false);
    const [copied, setCopied] = useState(false);
    const [error, setError] = useState<string | null>(null);
    const [pendingWallet, setPendingWallet] = useState<string | null>(null);
    const dialogRef = useRef<HTMLElement>(null);
    const triggerRef = useRef<HTMLButtonElement>(null);
    const titleId = useId();
    const descriptionId = useId();

    useEffect(() => {
        if (!open) return;

        const previousOverflow = document.body.style.overflow;
        document.body.style.overflow = 'hidden';
        dialogRef.current?.querySelector<HTMLElement>(focusableSelector)?.focus();

        const onKeyDown = (event: KeyboardEvent) => {
            if (event.key === 'Escape') {
                setOpen(false);
                return;
            }
            if (event.key !== 'Tab' || !dialogRef.current) return;

            const focusable = Array.from(dialogRef.current.querySelectorAll<HTMLElement>(focusableSelector));
            if (focusable.length === 0) return;
            const first = focusable[0];
            const last = focusable[focusable.length - 1];
            if (event.shiftKey && document.activeElement === first) {
                event.preventDefault();
                last.focus();
            } else if (!event.shiftKey && document.activeElement === last) {
                event.preventDefault();
                first.focus();
            }
        };

        window.addEventListener('keydown', onKeyDown);
        return () => {
            document.body.style.overflow = previousOverflow;
            window.removeEventListener('keydown', onKeyDown);
            triggerRef.current?.focus();
        };
    }, [open]);

    const connectWallet = async (name: string) => {
        setError(null);
        setPendingWallet(name);
        try {
            await select(name);
        } catch (cause) {
            const message = cause instanceof Error ? cause.message : 'We could not connect this wallet. Try again.';
            setError(message);
            console.error('[LumaPay wallet] Connect failed:', cause);
        } finally {
            setPendingWallet(null);
        }
    };

    const copyAddress = async () => {
        if (!summary) return;
        try {
            await navigator.clipboard.writeText(summary.address);
            setCopied(true);
            window.setTimeout(() => setCopied(false), 1_500);
        } catch {
            setError('Your browser blocked clipboard access. Copy the address from your wallet instead.');
        }
    };

    const label = connecting
        ? 'Connecting...'
        : connected && address
            ? compactAddress(address)
            : 'Connect wallet';

    return <>
        <button
            {...props}
            ref={triggerRef}
            type="button"
            aria-haspopup="dialog"
            aria-expanded={open}
            className={`inline-flex items-center gap-2 ${className}`}
            disabled={connecting || props.disabled}
            onClick={(event) => {
                onClick?.(event);
                if (!event.defaultPrevented) {
                    setError(null);
                    setOpen(true);
                }
            }}
        >
            {connecting
                ? <LoaderCircle className="h-4 w-4 animate-spin" aria-hidden="true" />
                : <Wallet className="h-4 w-4" aria-hidden="true" />}
            <span>{label}</span>
            {!connecting && <ChevronDown className="h-3.5 w-3.5 opacity-60" aria-hidden="true" />}
        </button>

        {open && createPortal(
            <div
                className="fixed inset-0 z-[80] flex items-end justify-center bg-black/70 p-0 backdrop-blur-sm sm:items-center sm:p-5"
                onMouseDown={(event) => event.target === event.currentTarget && setOpen(false)}
            >
                <section
                    ref={dialogRef}
                    role="dialog"
                    aria-modal="true"
                    aria-labelledby={titleId}
                    aria-describedby={descriptionId}
                    className="relative max-h-[92dvh] w-full overflow-y-auto rounded-t-[1.5rem] border border-white/[0.12] bg-[#090909] text-white shadow-[0_-16px_70px_rgba(0,0,0,0.7)] sm:max-w-[29rem] sm:rounded-[1.5rem] sm:shadow-[0_28px_100px_rgba(0,0,0,0.72)]"
                >
                    <div className="h-1 w-full bg-gradient-to-r from-transparent via-orange-400/80 to-transparent" />
                    <div className="relative overflow-hidden px-5 pb-6 pt-5 sm:px-7 sm:pb-7 sm:pt-6">
                        <div className="pointer-events-none absolute -right-24 -top-24 h-52 w-52 rounded-full bg-orange-400/[0.07] blur-3xl" />

                        <header className="relative flex items-start justify-between gap-5">
                            <div className="min-w-0">
                                <div className="mb-4 flex items-center gap-2 text-[0.66rem] font-medium uppercase tracking-[0.2em] text-orange-300/80">
                                    <MoonStar className="h-3.5 w-3.5" aria-hidden="true" />
                                    LumaPay on Midnight
                                </div>
                                <h2 id={titleId} className="text-balance text-[1.65rem] font-semibold leading-tight tracking-[-0.04em]">
                                    {connected ? 'Your wallet' : 'Connect a wallet'}
                                </h2>
                                <p id={descriptionId} className="mt-2 max-w-[36ch] text-sm leading-6 text-zinc-400">
                                    {connected
                                        ? 'Review the active connection and signed-in status.'
                                        : 'Choose an installed Midnight wallet. You approve every signature and transaction.'}
                                </p>
                            </div>
                            <button
                                type="button"
                                aria-label="Close wallet dialog"
                                onClick={() => setOpen(false)}
                                className="grid h-9 w-9 shrink-0 place-items-center rounded-full border border-white/10 bg-white/[0.04] text-zinc-400 transition duration-200 hover:border-white/20 hover:bg-white/[0.09] hover:text-white active:scale-95 focus:outline-none focus-visible:ring-2 focus-visible:ring-orange-300"
                            >
                                <X className="h-4 w-4" aria-hidden="true" />
                            </button>
                        </header>

                        {connected && summary ? (
                            <div className="relative mt-6">
                                <div className="overflow-hidden rounded-2xl border border-white/[0.09] bg-[#101010]">
                                    <div className="flex items-center gap-3.5 px-4 py-4">
                                        <span className="grid h-11 w-11 shrink-0 place-items-center rounded-[0.8rem] border border-orange-300/20 bg-orange-300/[0.09] text-orange-300">
                                            <Wallet className="h-5 w-5" aria-hidden="true" />
                                        </span>
                                        <div className="min-w-0 flex-1">
                                            <div className="flex items-center gap-2">
                                                <p className="truncate text-sm font-semibold">{summary.name}</p>
                                                <span className="h-1.5 w-1.5 shrink-0 rounded-full bg-emerald-400 shadow-[0_0_10px_rgba(52,211,153,0.7)]" aria-label="Connected" />
                                            </div>
                                            <p className="mt-1 truncate font-mono text-[0.7rem] text-zinc-500">{compactAddress(summary.address)}</p>
                                        </div>
                                        <button
                                            type="button"
                                            onClick={() => void copyAddress()}
                                            aria-label="Copy shielded wallet address"
                                            className="inline-flex h-9 items-center gap-1.5 rounded-lg px-2.5 text-xs font-medium text-zinc-400 transition duration-200 hover:bg-white/[0.06] hover:text-white active:scale-95 focus:outline-none focus-visible:ring-2 focus-visible:ring-orange-300"
                                        >
                                            {copied ? <Check className="h-3.5 w-3.5 text-emerald-400" /> : <Copy className="h-3.5 w-3.5" />}
                                            {copied ? 'Copied' : 'Copy'}
                                        </button>
                                    </div>

                                    <dl className="grid grid-cols-2 border-t border-white/[0.07]">
                                        <div className="px-4 py-3.5">
                                            <dt className="text-[0.64rem] font-medium uppercase tracking-[0.15em] text-zinc-600">Available DUST</dt>
                                            <dd className="mt-1.5 truncate font-mono text-sm tabular-nums text-zinc-200">{summary.dustBalance.toString()}</dd>
                                        </div>
                                        <div className="border-l border-white/[0.07] px-4 py-3.5">
                                            <dt className="text-[0.64rem] font-medium uppercase tracking-[0.15em] text-zinc-600">Network</dt>
                                            <dd className="mt-1.5 font-mono text-sm text-zinc-200">Preprod</dd>
                                        </div>
                                    </dl>
                                </div>

                                <div className={`mt-3 rounded-xl border px-3.5 py-3 ${authenticated ? 'border-emerald-300/15 bg-emerald-300/[0.05]' : 'border-orange-300/15 bg-orange-300/[0.05]'}`}>
                                    <div className="flex items-start gap-2.5">
                                        {authenticating
                                            ? <LoaderCircle className="mt-0.5 h-4 w-4 shrink-0 animate-spin text-orange-300" aria-hidden="true" />
                                            : <ShieldCheck className={`mt-0.5 h-4 w-4 shrink-0 ${authenticated ? 'text-emerald-400' : 'text-orange-300'}`} aria-hidden="true" />}
                                        <div className="min-w-0 flex-1">
                                            <p className="text-xs font-semibold text-zinc-200">
                                                {authenticating ? 'Waiting for your signature' : authenticated ? 'Signed in securely' : 'Wallet connected'}
                                            </p>
                                            <p className="mt-1 text-xs leading-5 text-zinc-500">
                                                {authenticated
                                                    ? 'Merchant features are unlocked for this browser session.'
                                                    : authError || 'Sign a message to unlock merchant features. No transaction or fee is involved.'}
                                            </p>
                                            {!authenticated && !authenticating && (
                                                <button
                                                    type="button"
                                                    onClick={() => void signIn().catch(() => undefined)}
                                                    className="mt-2 inline-flex items-center gap-1.5 text-xs font-semibold text-orange-300 transition duration-200 hover:text-orange-200 focus:outline-none focus-visible:ring-2 focus-visible:ring-orange-300"
                                                >
                                                    Sign in with wallet <ArrowRight className="h-3.5 w-3.5" aria-hidden="true" />
                                                </button>
                                            )}
                                        </div>
                                    </div>
                                </div>

                                {error && <p role="alert" className="mt-3 rounded-xl border border-red-300/15 bg-red-400/[0.07] px-3.5 py-3 text-xs leading-5 text-red-200">{error}</p>}

                                <div className="mt-4 flex items-center justify-between gap-4">
                                    <p className="text-[0.7rem] leading-5 text-zinc-600">Private keys never leave your wallet.</p>
                                    <button
                                        type="button"
                                        onClick={async () => {
                                            await disconnect();
                                            setOpen(false);
                                        }}
                                        className="inline-flex h-10 shrink-0 items-center gap-2 rounded-xl border border-white/[0.09] px-3.5 text-xs font-semibold text-zinc-400 transition duration-200 hover:border-red-300/20 hover:bg-red-400/[0.06] hover:text-red-200 active:scale-[0.98] focus:outline-none focus-visible:ring-2 focus-visible:ring-red-300"
                                    >
                                        <LogOut className="h-3.5 w-3.5" aria-hidden="true" />
                                        Disconnect
                                    </button>
                                </div>
                            </div>
                        ) : (
                            <div className="relative mt-6">
                                {wallets.length > 0 ? (
                                    <div className="space-y-2" aria-busy={connecting}>
                                        {wallets.map(({ adapter }) => {
                                            const isPending = pendingWallet === adapter.name;
                                            return (
                                                <button
                                                    key={adapter.name}
                                                    type="button"
                                                    disabled={connecting}
                                                    onClick={() => void connectWallet(adapter.name)}
                                                    className="group flex w-full items-center gap-3.5 rounded-2xl border border-white/[0.08] bg-[#101010] px-3.5 py-3.5 text-left transition duration-200 hover:-translate-y-0.5 hover:border-orange-300/20 hover:bg-[#15130f] active:translate-y-0 active:scale-[0.99] focus:outline-none focus-visible:ring-2 focus-visible:ring-orange-300 disabled:cursor-wait disabled:opacity-60"
                                                >
                                                    <span className="grid h-11 w-11 shrink-0 place-items-center rounded-[0.8rem] border border-white/[0.08] bg-white/[0.04] text-zinc-300 transition group-hover:border-orange-300/20 group-hover:text-orange-300">
                                                        {isPending
                                                            ? <LoaderCircle className="h-5 w-5 animate-spin" aria-hidden="true" />
                                                            : <Wallet className="h-5 w-5" aria-hidden="true" />}
                                                    </span>
                                                    <span className="min-w-0 flex-1">
                                                        <span className="block truncate text-sm font-semibold text-zinc-100">{adapter.name}</span>
                                                        <span className="mt-1 block text-xs text-zinc-500">{isPending ? 'Approve the request in your wallet' : 'Installed and ready'}</span>
                                                    </span>
                                                    <ArrowRight className="h-4 w-4 text-zinc-700 transition duration-200 group-hover:translate-x-0.5 group-hover:text-orange-300" aria-hidden="true" />
                                                </button>
                                            );
                                        })}
                                    </div>
                                ) : (
                                    <div className="rounded-2xl border border-dashed border-white/[0.12] bg-white/[0.025] px-6 py-8 text-center">
                                        <span className="mx-auto grid h-11 w-11 place-items-center rounded-xl bg-white/[0.05] text-zinc-400">
                                            <Wallet className="h-5 w-5" aria-hidden="true" />
                                        </span>
                                        <p className="mt-4 text-sm font-semibold text-zinc-200">No Midnight wallet found</p>
                                        <p className="mx-auto mt-2 max-w-[34ch] text-xs leading-5 text-zinc-500">Install Shield or another wallet that injects Midnight DApp Connector 4.x, set it to Preprod, then reload this page.</p>
                                        <a
                                            href={SHIELD_EXTENSION_URL}
                                            target="_blank"
                                            rel="noreferrer"
                                            className="mt-4 inline-flex h-10 items-center justify-center rounded-xl border border-orange-300/20 bg-orange-300/10 px-4 text-xs font-semibold text-orange-200 transition duration-200 hover:border-orange-200/40 hover:bg-orange-300/15 focus:outline-none focus-visible:ring-2 focus-visible:ring-orange-300"
                                        >
                                            Get Shield Wallet Extension
                                        </a>
                                    </div>
                                )}

                                {error && <p role="alert" className="mt-3 rounded-xl border border-red-300/15 bg-red-400/[0.07] px-3.5 py-3 text-xs leading-5 text-red-200">{error}</p>}

                                <div className="mt-5 flex items-start gap-2.5 border-t border-white/[0.07] pt-4 text-[0.7rem] leading-5 text-zinc-600">
                                    <ShieldCheck className="mt-0.5 h-3.5 w-3.5 shrink-0 text-zinc-500" aria-hidden="true" />
                                    <p>LumaPay never asks for your recovery phrase or private keys.</p>
                                </div>
                            </div>
                        )}
                    </div>
                </section>
            </div>,
            document.body,
        )}
    </>;
}
