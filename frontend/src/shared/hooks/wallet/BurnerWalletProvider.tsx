import { createContext, useContext, useEffect, useMemo, useState, type ReactNode } from 'react';
import { useWallet } from './WalletProvider';
import { getUserProfile } from '../../services/api';
import { decryptWithPassword } from '../../utils/core/crypto';
import { startBurnerWallet, getBurnerAddress, type BurnerIdentity } from '../../../midnight/burnerWallet';

interface PrivacyWalletContextValue {
    burnerAddress: string | null;
    /** The burner identity's 24-word recovery mnemonic, decrypted — only ever held in memory, never logged or sent anywhere. Null until generated or unlocked this session. */
    decryptedBurnerKey: string | null;
    setDecryptedBurnerKey: (key: string | null) => void;
    encryptedBurnerKey: string | null;
    /** The live, syncing wallet instance (frontend/src/midnight/burnerWallet.ts) — needed to read balances or build a spend. Null until a mnemonic is available. */
    burnerIdentity: BurnerIdentity | null;
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
 * A genuinely independent Midnight identity for burner payments — an
 * HD-derived keypair (frontend/src/midnight/burnerWallet.ts), not the
 * connected main wallet's own shielded address relabeled. The mnemonic is
 * generated client-side (useBurnerActions.ts#handleGenerateBurner), never
 * leaves the browser unencrypted, and is persisted to the backend only as
 * ciphertext (encryptWithPassword) keyed by the hash of the main address.
 *
 * NOTE on appPassword: this still uses the pre-existing "wallet-authorized"
 * placeholder (see below) rather than a real user-chosen password — the
 * card-wallet feature also reads appPassword from this same context, and
 * introducing a real password is a shared-system change (affects cards too)
 * that deserves its own dedicated pass, not a rushed edit bundled into this
 * one. The mnemonic is still real and independent; only the password
 * protecting its at-rest ciphertext is the known-weak part.
 */
export function BurnerWalletProvider({ children }: { children: ReactNode }) {
    const { api, address, connected } = useWallet();
    const [burnerIdentity, setBurnerIdentity] = useState<BurnerIdentity | null>(null);
    const [burnerAddress, setBurnerAddress] = useState<string | null>(null);
    const [decryptedBurnerKey, setDecryptedBurnerKey] = useState<string | null>(null);
    const [encryptedBurnerKey, setEncryptedBurnerKey] = useState<string | null>(null);
    const [hasProfile, setHasProfile] = useState<boolean | null>(null);
    const [loading, setLoading] = useState(false);

    const appPassword = connected ? 'wallet-authorized' : null;

    const refreshProfile = async () => {
        if (!address) {
            setBurnerIdentity(null);
            setBurnerAddress(null);
            setEncryptedBurnerKey(null);
            setHasProfile(null);
            return;
        }
        setLoading(true);
        try {
            const profile = await getUserProfile(address);
            setHasProfile(Boolean(profile));

            if (!profile?.burner_address || !profile?.encrypted_burner_key) {
                setBurnerIdentity(null);
                setBurnerAddress(null);
                setEncryptedBurnerKey(null);
                return;
            }
            setEncryptedBurnerKey(profile.encrypted_burner_key);

            // Restore the same identity from its stored (encrypted) mnemonic
            // rather than trusting the stored address alone — the mnemonic
            // is the actual source of truth, the address is a display cache.
            if (!appPassword) return;
            const mnemonic = await decryptWithPassword(profile.encrypted_burner_key, appPassword).catch(() => null);
            if (!mnemonic) return;
            const identity = await startBurnerWallet(mnemonic);
            const derivedAddress = await getBurnerAddress(identity);
            setBurnerIdentity(identity);
            setBurnerAddress(derivedAddress);
            setDecryptedBurnerKey(mnemonic);
        } catch (error) {
            console.error('Failed to load burner profile', error);
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        void refreshProfile();
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [address]);

    const value = useMemo<PrivacyWalletContextValue>(() => ({
        burnerAddress,
        decryptedBurnerKey,
        setDecryptedBurnerKey,
        encryptedBurnerKey,
        burnerIdentity,
        refreshProfile,
        fetchedFromChain: Boolean(burnerAddress),
        hasOnChainRecord: Boolean(burnerAddress),
        setHasOnChainRecord: () => undefined,
        appPassword,
        setAppPassword: () => undefined,
        isUnlocked: connected,
        setIsUnlocked: () => undefined,
        hasProfile,
        userProfileMainAddress: address,
        isAutoUnlocking: loading,
        decryptedBurnerAddress: burnerAddress,
        hasBurnerOnChainRecord: Boolean(burnerAddress),
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }), [address, appPassword, burnerAddress, burnerIdentity, connected, decryptedBurnerKey, encryptedBurnerKey, hasProfile, loading]);

    void api;
    return <PrivacyWalletContext.Provider value={value}>{children}</PrivacyWalletContext.Provider>;
}

export function useBurnerWallet(): PrivacyWalletContextValue {
    const value = useContext(PrivacyWalletContext);
    if (!value) throw new Error('useBurnerWallet must be used within BurnerWalletProvider.');
    return value;
}
