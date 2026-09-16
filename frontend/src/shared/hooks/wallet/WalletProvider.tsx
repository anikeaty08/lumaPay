import {
    createContext,
    useCallback,
    useContext,
    useEffect,
    useMemo,
    useState,
    type ReactNode,
} from 'react';
import type { ConnectedAPI, InitialAPI } from '@midnight-ntwrk/dapp-connector-api';
import { connectWallet, discoverWallets, type WalletSummary } from '../../../midnight/wallet';
import { authenticateWallet, signOutWallet } from '../../../midnight/auth';

type LegacyTransactionResult = { transactionId: string };

export interface LumaWalletContextValue {
    api: ConnectedAPI | null;
    address: string | null;
    connected: boolean;
    connecting: boolean;
    authenticated: boolean;
    authenticating: boolean;
    authError: string | null;
    summary: WalletSummary | null;
    wallets: Array<{ adapter: { name: string }; readyState: 'Installed' }>;
    wallet: { adapter: {
        name: string;
        transactionStatus: (id: string) => Promise<unknown>;
        signMessage: (message: string | Uint8Array) => Promise<Uint8Array>;
    } } | null;
    connect: () => Promise<void>;
    disconnect: () => Promise<void>;
    signIn: () => Promise<void>;
    select: (name: string) => Promise<void>;
    executeTransaction: (transaction: unknown) => Promise<LegacyTransactionResult>;
    requestRecords: (...args: unknown[]) => Promise<unknown[]>;
    decrypt: (ciphertext: string) => Promise<string>;
    transactionStatus: (id: string) => Promise<unknown>;
    requestTransactionHistory: (...args: unknown[]) => Promise<unknown[]>;
}

const WalletContext = createContext<LumaWalletContextValue | null>(null);

const unsupportedLegacyOperation = (operation: string): never => {
    throw new Error(`${operation} must use the LumaPay Midnight contract adapter.`);
};

export function LumaWalletProvider({ children }: { children: ReactNode }) {
    const initialWallets = useMemo(() => discoverWallets(), []);
    const [available, setAvailable] = useState<InitialAPI[]>(initialWallets);
    const [selected, setSelected] = useState<InitialAPI | null>(initialWallets[0] ?? null);
    const [api, setApi] = useState<ConnectedAPI | null>(null);
    const [summary, setSummary] = useState<WalletSummary | null>(null);
    const [connecting, setConnecting] = useState(false);
    const [authenticated, setAuthenticated] = useState(false);
    const [authenticating, setAuthenticating] = useState(false);
    const [authError, setAuthError] = useState<string | null>(null);

    const authenticate = useCallback(async (connectedApi: ConnectedAPI, walletSummary: WalletSummary) => {
        setAuthenticating(true);
        setAuthError(null);
        try {
            await authenticateWallet(connectedApi, walletSummary.unshieldedAddress);
            setAuthenticated(true);
        } catch (cause) {
            setAuthenticated(false);
            setAuthError(cause instanceof Error ? cause.message : 'Wallet sign-in failed.');
            throw cause;
        } finally {
            setAuthenticating(false);
        }
    }, []);

    useEffect(() => {
        const refresh = () => {
            const discovered = discoverWallets();
            setAvailable(discovered);
            setSelected((current) => current ?? discovered[0] ?? null);
        };
        refresh();
        const timer = window.setInterval(refresh, 1_000);
        return () => window.clearInterval(timer);
    }, []);

    const connectSelected = useCallback(async () => {
        if (!selected) throw new Error('Install a Midnight DApp Connector 4.x wallet to continue.');
        setConnecting(true);
        try {
            const result = await connectWallet(selected);
            setApi(result.api);
            setSummary(result.summary);
            void authenticate(result.api, result.summary).catch(() => undefined);
        } finally {
            setConnecting(false);
        }
    }, [authenticate, selected]);

    const disconnect = useCallback(async () => {
        try { await signOutWallet(); } finally {
            setApi(null);
            setSummary(null);
            setAuthenticated(false);
            setAuthError(null);
        }
    }, []);

    const select = useCallback(async (name: string) => {
        const next = available.find((candidate) => candidate.name === name || candidate.rdns === name);
        if (!next) throw new Error(`Midnight wallet "${name}" is not available.`);
        setSelected(next);
        setConnecting(true);
        try {
            const result = await connectWallet(next);
            setApi(result.api);
            setSummary(result.summary);
            void authenticate(result.api, result.summary).catch(() => undefined);
        } finally {
            setConnecting(false);
        }
    }, [authenticate, available]);

    const signIn = useCallback(async () => {
        if (!api || !summary) throw new Error('Connect a Midnight wallet first.');
        await authenticate(api, summary);
    }, [api, authenticate, summary]);

    const value = useMemo<LumaWalletContextValue>(() => ({
        api,
        address: summary?.address ?? null,
        connected: Boolean(api && summary),
        connecting,
        authenticated,
        authenticating,
        authError,
        summary,
        wallets: available.map((candidate) => ({ adapter: { name: candidate.name }, readyState: 'Installed' })),
        wallet: selected && api ? {
            adapter: {
                name: selected.name,
                transactionStatus: async (id: string) => {
                    const history = await api.getTxHistory(0, 100);
                    return history.find((entry) => entry.txHash === id)?.txStatus ?? 'pending';
                },
                signMessage: async (message: string | Uint8Array) => {
                    const text = typeof message === 'string' ? message : new TextDecoder().decode(message);
                    const signed = await api.signData(text, { encoding: 'text', keyType: 'unshielded' });
                    if (signed.data !== text) throw new Error('Wallet returned a signature for unexpected data.');
                    if (!/^[0-9a-f]+$/i.test(signed.signature) || signed.signature.length % 2 !== 0) {
                        throw new Error('Wallet returned an invalid signature encoding.');
                    }
                    return Uint8Array.from(signed.signature.match(/.{2}/g) ?? [], (byte) => Number.parseInt(byte, 16));
                },
            },
        } : null,
        connect: connectSelected,
        disconnect,
        signIn,
        select,
        executeTransaction: async () => unsupportedLegacyOperation('Transaction execution'),
        requestRecords: async () => unsupportedLegacyOperation('Record queries'),
        decrypt: async () => unsupportedLegacyOperation('Record decryption'),
        transactionStatus: async () => unsupportedLegacyOperation('Transaction status lookup'),
        requestTransactionHistory: async () => api ? api.getTxHistory(0, 100) : [],
    }), [api, authError, authenticated, authenticating, available, connectSelected, connecting, disconnect, select, selected, signIn, summary]);

    return <WalletContext.Provider value={value}>{children}</WalletContext.Provider>;
}

export function useWallet(): LumaWalletContextValue {
    const value = useContext(WalletContext);
    if (!value) throw new Error('useWallet must be used inside LumaWalletProvider.');
    return value;
}

export const MidnightWalletProvider = LumaWalletProvider;
