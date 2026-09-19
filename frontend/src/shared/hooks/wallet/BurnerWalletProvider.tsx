import { createContext, useContext, useEffect, useMemo, useState, type ReactNode } from 'react';
import { useWallet } from './WalletProvider';
import { getUserProfile } from '../../services/api';
import type { UserProfile } from '../../types/user';
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
    /** The ciphertext password-verification value (encryptWithPassword(address, appPassword)) stored as the profile's main_address — NOT the plaintext wallet address. PasswordPrompt decrypts this to check a password. */
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
 * appPassword is a real, user-chosen password now (not the old hardcoded
 * "wallet-authorized" placeholder) — collected and verified by
 * PasswordPrompt.tsx, which already fully implements create/confirm/unlock
 * and was already calling setAppPassword/setIsUnlocked; they were just
 * discarded as no-ops here. CardWalletProvider.tsx reads appPassword from
 * this same context, so this also makes card encryption real. Caveat: any
 * card data already encrypted under the old hardcoded constant (from
 * before this fix) will not decrypt with a newly-chosen real password —
 * there is no way to detect or migrate that from here, since it depends on
 * production data this environment has no visibility into.
 */
export function BurnerWalletProvider({ children }: { children: ReactNode }) {
    const { address, connected } = useWallet();
    const [burnerIdentity, setBurnerIdentity] = useState<BurnerIdentity | null>(null);
    const [burnerAddress, setBurnerAddress] = useState<string | null>(null);
    const [decryptedBurnerKey, setDecryptedBurnerKey] = useState<string | null>(null);
    const [encryptedBurnerKey, setEncryptedBurnerKey] = useState<string | null>(null);
    const [profile, setProfile] = useState<UserProfile | null>(null);
    const [hasProfile, setHasProfile] = useState<boolean | null>(null);
    const [loading, setLoading] = useState(false);
    const [appPassword, setAppPassword] = useState<string | null>(null);
    const [isUnlocked, setIsUnlocked] = useState(false);

    const refreshProfile = async () => {
        if (!address) {
            setProfile(null);
            setHasProfile(null);
            return;
        }
        setLoading(true);
        try {
            const nextProfile = await getUserProfile(address);
            setProfile(nextProfile);
            setHasProfile(Boolean(nextProfile));
        } catch (error) {
            console.error('Failed to load user profile', error);
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        setAppPassword(null);
        setIsUnlocked(false);
        void refreshProfile();
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [address]);

    // Restore the burner identity once both the profile and a real password
    // are available. Split out from refreshProfile (rather than decrypting
    // inline right after setAppPassword) so this reacts to appPassword
    // changing without depending on a stale closure over the password that
    // was current when refreshProfile was last called.
    useEffect(() => {
        let cancelled = false;
        if (!profile?.encrypted_burner_key || !appPassword) {
            setBurnerIdentity(null);
            setBurnerAddress(null);
            setEncryptedBurnerKey(profile?.encrypted_burner_key ?? null);
            return;
        }
        setEncryptedBurnerKey(profile.encrypted_burner_key);
        (async () => {
            try {
                const mnemonic = await decryptWithPassword(profile.encrypted_burner_key!, appPassword);
                if (cancelled) return;
                // The mnemonic is the actual source of truth; the stored
                // address is only a display cache re-derived here.
                const identity = await startBurnerWallet(mnemonic);
                if (cancelled) return;
                const derivedAddress = await getBurnerAddress(identity);
                if (cancelled) return;
                setBurnerIdentity(identity);
                setBurnerAddress(derivedAddress);
                setDecryptedBurnerKey(mnemonic);
            } catch (error) {
                if (!cancelled) console.error('Failed to restore burner wallet from stored mnemonic', error);
            }
        })();
        return () => { cancelled = true; };
    }, [profile, appPassword]);

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
        setAppPassword,
        isUnlocked,
        setIsUnlocked,
        hasProfile,
        userProfileMainAddress: profile?.main_address || null,
        isAutoUnlocking: loading,
        decryptedBurnerAddress: burnerAddress,
        hasBurnerOnChainRecord: Boolean(burnerAddress),
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }), [address, appPassword, burnerAddress, burnerIdentity, connected, decryptedBurnerKey, encryptedBurnerKey, hasProfile, isUnlocked, loading, profile]);

    return <PrivacyWalletContext.Provider value={value}>{children}</PrivacyWalletContext.Provider>;
}

export function useBurnerWallet(): PrivacyWalletContextValue {
    const value = useContext(PrivacyWalletContext);
    if (!value) throw new Error('useBurnerWallet must be used within BurnerWalletProvider.');
    return value;
}
