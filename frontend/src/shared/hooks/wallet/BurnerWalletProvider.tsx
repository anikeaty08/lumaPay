import { createContext, useContext, useEffect, useMemo, useState, type ReactNode } from 'react';
import { useWallet } from './WalletProvider';

interface PrivacyWalletContextValue {
    burnerAddress: string | null;
    decryptedBurnerKey: string | null;
    setDecryptedBurnerKey: (key: string | null) => void;
    encryptedBurnerKey: string | null;
    refreshProfile: () => Promise<void>;
    fetchedFromChain: boolean;
    hasOnChainRecord: boolean;
    setHasOnChainRecord: (value: boolean) => void;
    appPassword: string | null;
    setAppPassword: (password: string | null) => void;
    isUnlocked: boolean;
    setIsUnlocked: (value: boolean) => void;
    hasProfile: boolean | null;
    userProfileMainAddress: string | null;
    isAutoUnlocking: boolean;
    decryptedBurnerAddress: string | null;
    hasBurnerOnChainRecord: boolean;
}

const PrivacyWalletContext = createContext<PrivacyWalletContextValue | undefined>(undefined);

/**
 * Midnight keeps spending keys inside the connected wallet. LumaPay uses the
 * wallet's shielded address as its privacy wallet and never creates, exports,
 * encrypts, or uploads a second private key.
 */
export function BurnerWalletProvider({ children }: { children: ReactNode }) {
    const { api, address, connected } = useWallet();
    const [shieldedAddress, setShieldedAddress] = useState<string | null>(null);
    const [loading, setLoading] = useState(false);

    const refreshProfile = async () => {
        if (!api) {
            setShieldedAddress(null);
            return;
        }
        setLoading(true);
        try {
            setShieldedAddress((await api.getShieldedAddresses()).shieldedAddress);
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        void refreshProfile();
    }, [api]);

    const value = useMemo<PrivacyWalletContextValue>(() => ({
        burnerAddress: shieldedAddress,
        decryptedBurnerKey: null,
        setDecryptedBurnerKey: () => undefined,
        encryptedBurnerKey: null,
        refreshProfile,
        fetchedFromChain: Boolean(shieldedAddress),
        hasOnChainRecord: false,
        setHasOnChainRecord: () => undefined,
        appPassword: connected ? 'wallet-authorized' : null,
        setAppPassword: () => undefined,
        isUnlocked: connected,
        setIsUnlocked: () => undefined,
        hasProfile: connected,
        userProfileMainAddress: address,
        isAutoUnlocking: loading,
        decryptedBurnerAddress: shieldedAddress,
        hasBurnerOnChainRecord: false,
    }), [address, connected, loading, shieldedAddress]);

    return <PrivacyWalletContext.Provider value={value}>{children}</PrivacyWalletContext.Provider>;
}

export function useBurnerWallet(): PrivacyWalletContextValue {
    const value = useContext(PrivacyWalletContext);
    if (!value) throw new Error('useBurnerWallet must be used within BurnerWalletProvider.');
    return value;
}
