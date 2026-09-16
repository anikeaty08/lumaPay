import { useMemo } from 'react';
import { useWallet } from '@/shared/hooks/wallet/WalletProvider';

const isMidnightWalletDetected = () => typeof window !== 'undefined' && Object.keys(window.midnight ?? {}).length > 0;

export const useShieldAvailability = () => {
    try {
        const { connected, wallets } = useWallet();

        const hasShieldWallet = useMemo(() => (
            connected || wallets.some(({ readyState }) => readyState === 'Installed')
        ), [connected, wallets]);

        return {
            hasShieldWallet,
            shouldShowMobileDashboard: hasShieldWallet,
        };
    } catch {
        // Wallet providers not mounted — use lightweight fallback
        const hasShieldWallet = isMidnightWalletDetected();
        return {
            hasShieldWallet,
            shouldShowMobileDashboard: hasShieldWallet,
        };
    }
};
