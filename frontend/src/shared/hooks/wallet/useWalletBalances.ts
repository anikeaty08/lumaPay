import { useEffect, useState } from 'react';
import { useWallet } from '@/shared/hooks/wallet/WalletProvider';
import { shieldedToken, unshieldedToken } from '@midnight-ntwrk/ledger-v8';

export interface WalletTokenBalance {
    name: 'NIGHT';
    public: string;
    private: string;
    publicAmount: number;
    privateAmount: number;
    loading: boolean;
}

const INITIAL_BALANCES: WalletTokenBalance[] = [
    { name: 'NIGHT', public: '0.00', private: '0.00', publicAmount: 0, privateAmount: 0, loading: true },
];

const NIGHT_UNSHIELDED_TOKEN = unshieldedToken().raw;
const NIGHT_SHIELDED_TOKEN = shieldedToken().raw;
type WalletBalanceMap = Record<string, bigint>;

export const useWalletBalances = () => {
    const { api, address } = useWallet();
    const [balances, setBalances] = useState<WalletTokenBalance[]>(INITIAL_BALANCES);

    useEffect(() => {
        let cancelled = false;

        const format = (atomic: bigint) => Number(atomic) / 1_000_000;
        const fetchNightBalance = async (): Promise<WalletTokenBalance> => {
            const [unshieldedBalances, shieldedBalances] = await Promise.all([
                (api?.getUnshieldedBalances() as Promise<WalletBalanceMap> | undefined) ?? Promise.resolve({} as WalletBalanceMap),
                (api?.getShieldedBalances() as Promise<WalletBalanceMap> | undefined) ?? Promise.resolve({} as WalletBalanceMap),
            ]);
            const publicAmount = format(unshieldedBalances[NIGHT_UNSHIELDED_TOKEN] ?? 0n);
            const privateAmount = format(shieldedBalances[NIGHT_SHIELDED_TOKEN] ?? 0n);
            return {
                name: 'NIGHT',
                public: publicAmount.toFixed(2),
                private: privateAmount.toFixed(2),
                publicAmount,
                privateAmount,
                loading: false,
            };
        };

        const fetchAllBalances = async () => {
            if (!address || !api) {
                if (!cancelled) {
                    setBalances(INITIAL_BALANCES.map((balance) => ({ ...balance, loading: false })));
                }
                return;
            }

            if (!cancelled) {
                setBalances(INITIAL_BALANCES);
            }

            try {
                const results = [await fetchNightBalance()];

                if (!cancelled) {
                    setBalances(results);
                }
            } catch (error) {
                console.error('Failed to fetch wallet balances', error);
                if (!cancelled) {
                    setBalances(INITIAL_BALANCES.map((balance) => ({ ...balance, loading: false })));
                }
            }
        };

        fetchAllBalances();

        return () => {
            cancelled = true;
        };
    }, [address, api]);

    return { balances };
};
