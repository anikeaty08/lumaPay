import { useState, useCallback } from 'react';
import { useWallet } from '@/shared/hooks/wallet/WalletProvider';
import { useBurnerWallet } from '../wallet/BurnerWalletProvider';
import { encryptWithPassword } from '../../utils/core/crypto';
import type { PrivateBalances, SweepCurrency } from '../../types/burner';
import { sweepBurnerFundsToDestination } from '../../utils/burner/burnerSweep';

export function useBurnerActions() {
    const { address, api } = useWallet();
    const {
        burnerAddress, decryptedBurnerKey,
        setDecryptedBurnerKey, refreshProfile, fetchedFromChain,
        hasOnChainRecord, appPassword,
        decryptedBurnerAddress, hasBurnerOnChainRecord,
        burnerIdentity
    } = useBurnerWallet();

    const [isGenerating, setIsGenerating] = useState(false);
    const [isDecrypting, setIsDecrypting] = useState(false);
    const [isBackingUp, setIsBackingUp] = useState(false);
    const [backupSuccess, setBackupSuccess] = useState('');
    const [backupTxId, setBackupTxId] = useState<string | null>(null);
    const [isSweeping, setIsSweeping] = useState(false);
    const [isScanningBalances, setIsScanningBalances] = useState(false);
    const [copied, setCopied] = useState(false);
    const [error, setError] = useState<string | null>(null);

    const [showGenerateModal, setShowGenerateModal] = useState(false);
    const [showUnlockModal, setShowUnlockModal] = useState(false);
    const [showBackupModal, setShowBackupModal] = useState(false);
    const [showSweepModal, setShowSweepModal] = useState(false);

    const [password, setPassword] = useState('');
    const [showPassword, setShowPassword] = useState(false);
    const [sweepAmount, setSweepAmount] = useState('');
    const [sweepCurrency, setSweepCurrency] = useState<SweepCurrency>('NIGHT');
    const [sweepDestination, setSweepDestination] = useState(address || '');

    const [sweepSuccess, setSweepSuccess] = useState('');
    const [sweepTxId, setSweepTxId] = useState<string | null>(null);
    const [sweepLogs, setSweepLogs] = useState<string[]>([]);

    const [privateBalances, setPrivateBalances] = useState<PrivateBalances>({ NIGHT: -1 });

    const addLog = useCallback((msg: string) => {
        setSweepLogs((prev) => [...prev, `[${new Date().toLocaleTimeString()}] ${msg}`]);
    }, []);

    const openSweepModal = useCallback(() => {
        setError(null);
        setSweepLogs([]);
        setSweepTxId(null);
        setSweepSuccess('');
        setPrivateBalances({ NIGHT: -1 });
        setSweepDestination(address || '');
        setShowSweepModal(true);
        setIsScanningBalances(false);
    }, [address, decryptedBurnerKey]);

    const fetchPrivateBalances = useCallback(async () => {
        setIsScanningBalances(true);
        setPrivateBalances({ NIGHT: -1 });
        try {
            if (!burnerIdentity) {
                setPrivateBalances({ NIGHT: 0 });
                return;
            }
            // Reads live (possibly-partial) wallet state rather than blocking
            // on a full sync — Preprod's full event history can take over an
            // hour to walk for a fresh wallet (verified). A freshly generated
            // burner legitimately has 0 either way; this matters for an
            // *existing* burner whose balance may still be mid-sync.
            const { getBurnerBalances } = await import('../../../midnight/burnerWallet');
            const result = await getBurnerBalances(burnerIdentity);
            setPrivateBalances(result.balances);
        } catch (e) {
            console.error('Failed to fetch private balances:', e);
            setPrivateBalances({ NIGHT: 0 });
        } finally {
            setIsScanningBalances(false);
        }
    }, [burnerIdentity]);

    const handleGenerateBurner = async (e?: React.FormEvent) => {
        if (e) e.preventDefault();
        if (!address) { setError('Wallet not connected.'); return; }
        if (!api) { setError('Connect a Midnight DApp Connector wallet first.'); return; }
        if (!appPassword) { setError('App is locked.'); return; }
        try {
            setIsGenerating(true);
            setError(null);
            // A real, independent identity — generated locally, never derived
            // from or shared with the connected main wallet. The mnemonic is
            // the actual recovery material; burner_address is a display cache
            // re-derived from it on every load (see BurnerWalletProvider).
            const { generateBurnerMnemonic, burnerWordsToMnemonic, startBurnerWallet, getBurnerAddress } = await import('../../../midnight/burnerWallet');
            const mnemonic = burnerWordsToMnemonic(generateBurnerMnemonic());
            const identity = await startBurnerWallet(mnemonic);
            const realBurnerAddress = await getBurnerAddress(identity);

            const encryptedKeyPayload = await encryptWithPassword(mnemonic, appPassword);
            const encryptedBurnerAddress = await encryptWithPassword(realBurnerAddress, appPassword);
            const encryptedMainAddress = await encryptWithPassword(address, appPassword);
            const { updateUserProfile } = await import('../../services/api');
            await updateUserProfile(address, encryptedMainAddress, encryptedBurnerAddress, encryptedKeyPayload);
            setDecryptedBurnerKey(mnemonic);
            await refreshProfile();
            setShowGenerateModal(false);
            setPassword('');
        } catch (err: any) {
            console.error(err);
            setError(err.message || 'Failed to generate Burner Wallet.');
        } finally {
            setIsGenerating(false);
        }
    };

    const handleUnlockBurner = async (e?: React.FormEvent) => {
        if (e) e.preventDefault();
        if (!appPassword) { setError('App is locked.'); return; }
        try {
            setIsDecrypting(true);
            setError(null);
            setDecryptedBurnerKey(null);
            await refreshProfile();
            setShowUnlockModal(false);
            setPassword('');
        } catch (err: any) {
            console.error('Unlock failed', err);
            setError('Incorrect password or corrupted data.');
        } finally {
            setIsDecrypting(false);
        }
    };

    const handleBackupRecord = async (e?: React.FormEvent) => {
        if (e) e.preventDefault();
        if (!api || !appPassword) {
            setError('Wallet must be connected and unlocked.');
            return;
        }
        setIsBackingUp(true);
        setError('Privacy wallet backup is managed by the connected Midnight wallet. Legacy burner-key backup execution has been removed.');
        setIsBackingUp(false);
    };

    const handleSweepFunds = async (e: React.FormEvent) => {
        e.preventDefault();
        if (!address) { setError('Connect your Midnight wallet before sweeping funds.'); return; }

        const currentBal = privateBalances[sweepCurrency];
        if (currentBal >= 0 && Number(sweepAmount) > currentBal) {
            setError(`Insufficient private ${sweepCurrency} balance (Available: ${currentBal.toFixed(4)}).`);
            return;
        }

        if (!sweepAmount || isNaN(Number(sweepAmount)) || Number(sweepAmount) <= 0) {
            setError('Please enter a valid positive amount.');
            return;
        }
        if (!sweepDestination) {
            setError('Please enter a destination address.');
            return;
        }

        try {
            setIsSweeping(true);
            setError(null);
            setSweepSuccess('');
            setSweepTxId(null);
            setSweepLogs([]);

            const sweepResult = await sweepBurnerFundsToDestination({
                decryptedBurnerKey: decryptedBurnerKey || 'wallet-authorized',
                amount: Number(sweepAmount),
                currency: sweepCurrency,
                destination: sweepDestination,
                onLog: addLog
            });

            setSweepTxId(sweepResult.txIds[0] || null);
            setSweepSuccess(
                sweepResult.txIds.length > 1
                    ? `Sweep broadcasted successfully across ${sweepResult.txIds.length} transactions!`
                    : 'Sweep broadcasted successfully!'
            );
            setSweepAmount('');
        } catch (err: any) {
            console.error('DPS Sweep Failed:', err);
            addLog(`Error: ${err.message}`);
            setError(err.message || 'Sweeping funds failed during DPS request.');
        } finally {
            setIsSweeping(false);
        }
    };

    const handleCopyKey = () => {
        if (!decryptedBurnerKey) return;
        navigator.clipboard.writeText(decryptedBurnerKey);
        setCopied(true);
        setTimeout(() => setCopied(false), 2000);
    };

    return {
        address, burnerAddress, decryptedBurnerKey, fetchedFromChain, hasOnChainRecord,
        decryptedBurnerAddress, hasBurnerOnChainRecord,
        isGenerating, isDecrypting, isBackingUp, isSweeping, copied,
        error, setError,
        showGenerateModal, setShowGenerateModal,
        showUnlockModal, setShowUnlockModal,
        showBackupModal, setShowBackupModal,
        showSweepModal, setShowSweepModal,
        backupSuccess, setBackupSuccess, backupTxId, setBackupTxId,
        password, setPassword, showPassword, setShowPassword,
        sweepAmount, setSweepAmount,
        sweepCurrency, setSweepCurrency,
        sweepDestination, setSweepDestination,
        sweepSuccess, setSweepSuccess, sweepTxId, setSweepTxId,
        sweepLogs, setSweepLogs,
        privateBalances, setPrivateBalances, isScanningBalances,
        handleGenerateBurner, handleUnlockBurner, handleBackupRecord,
        handleSweepFunds, handleCopyKey, fetchPrivateBalances, openSweepModal,
        addLog,
    };
}
