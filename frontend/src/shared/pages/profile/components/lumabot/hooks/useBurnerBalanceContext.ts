import { useCallback, useState } from 'react';
import type { BotBalanceView } from '../../../../../types/lumabot';

// Burner-wallet balance scanning against real Midnight chain state isn't
// built yet (scanner.ts's fetchAllPrivateBalances is a deliberate stub —
// same "legacy record execution removed" state as burner sweep/backup).
// This previously called api.explorer.midnight.org with Aleo-style
// program/mapping URL params ("credits.midnight") to fake a public balance
// — a different chain's API shape entirely, so every response was either a
// 404 or unrelated data, silently swallowed into a hardcoded "0.00" that
// looked like a verified real answer. Report "unavailable" instead of a
// confident-looking number nobody actually checked.
const UNAVAILABLE_BALANCES: BotBalanceView[] = [
    { token: 'NIGHT', publicBalance: 'unavailable', privateBalance: 'unavailable', loading: false },
];

const LOADING_BALANCES: BotBalanceView[] = [
    { token: 'NIGHT', publicBalance: 'unavailable', privateBalance: 'unavailable', loading: true },
];

export const useBurnerBalanceContext = (
    decryptedBurnerAddress: string | null | undefined,
    _decryptedBurnerKey: string | null | undefined
) => {
    const [burnerBalances, setBurnerBalances] = useState<BotBalanceView[]>(UNAVAILABLE_BALANCES);

    const loadBurnerBalanceContext = useCallback(async (): Promise<BotBalanceView[]> => {
        if (!decryptedBurnerAddress) {
            setBurnerBalances(UNAVAILABLE_BALANCES);
            return UNAVAILABLE_BALANCES;
        }
        // Nothing to await yet — surfaced as a brief loading blip so the
        // caller's "scanning..." status message still reads correctly.
        setBurnerBalances(LOADING_BALANCES);
        setBurnerBalances(UNAVAILABLE_BALANCES);
        return UNAVAILABLE_BALANCES;
    }, [decryptedBurnerAddress]);

    return {
        burnerBalances,
        loadBurnerBalanceContext,
    };
};
