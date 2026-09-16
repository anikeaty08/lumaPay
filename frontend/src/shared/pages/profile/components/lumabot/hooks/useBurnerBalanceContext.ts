import { useCallback, useState } from 'react';
import { fetchAllPrivateBalances } from '../../burnerwallet/scanner';
import type { BotBalanceView } from '../../../../../types/lumabot';
import { formatPublicMappingBalance } from '../lib/utils';

const EMPTY_BALANCES: BotBalanceView[] = [
    { token: 'NIGHT', publicBalance: '0.00', privateBalance: '0.00', loading: false },
];

const LOADING_BALANCES: BotBalanceView[] = [
    { token: 'NIGHT', publicBalance: '0.00', privateBalance: '0.00', loading: true },
];

export const useBurnerBalanceContext = (
    decryptedBurnerAddress: string | null | undefined,
    decryptedBurnerKey: string | null | undefined
) => {
    const [burnerBalances, setBurnerBalances] = useState<BotBalanceView[]>(EMPTY_BALANCES);

    const loadBurnerBalanceContext = useCallback(async (): Promise<BotBalanceView[]> => {
        const updatePublicBalance = async (walletAddress: string, programId: string, mappingName: string, suffix: string) => {
            try {
                const response = await fetch(`https://api.explorer.midnight.org/v1/testnet/program/${programId}/mapping/${mappingName}/${walletAddress}`);
                if (!response.ok) {
                    return '0.00';
                }

                const data = await response.json();
                return formatPublicMappingBalance(data, suffix);
            } catch {
                return '0.00';
            }
        };

        if (!decryptedBurnerAddress) {
            setBurnerBalances(EMPTY_BALANCES);
            return EMPTY_BALANCES;
        }

        setBurnerBalances(LOADING_BALANCES);

        try {
            const [creditsPublic] = await Promise.all([
                updatePublicBalance(decryptedBurnerAddress, 'credits.midnight', 'account', 'u64'),
            ]);

            let privateBalances = { NIGHT: 0 };
            if (decryptedBurnerKey) {
                try {
                    privateBalances = await fetchAllPrivateBalances(decryptedBurnerKey);
                } catch (error) {
                    console.warn('Failed to fetch burner private balances for LumaBot context:', error);
                }
            }

            const nextBalances: BotBalanceView[] = [
                {
                    token: 'NIGHT',
                    publicBalance: creditsPublic,
                    privateBalance: privateBalances.NIGHT.toFixed(2),
                    loading: false,
                },
            ];
            setBurnerBalances(nextBalances);
            return nextBalances;
        } catch (error) {
            console.error('Failed to build burner balance context for LumaBot:', error);
            setBurnerBalances(EMPTY_BALANCES);
            return EMPTY_BALANCES;
        }
    }, [decryptedBurnerAddress, decryptedBurnerKey]);

    return {
        burnerBalances,
        loadBurnerBalanceContext,
    };
};
