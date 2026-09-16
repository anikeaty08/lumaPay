import { BurnerSweepCurrency } from '../../types/tokens';

interface SweepBurnerFundsParams {
    decryptedBurnerKey: string;
    amount: number;
    currency: BurnerSweepCurrency;
    destination: string;
    onStatus?: (status: string) => void;
    onLog?: (message: string) => void;
}

interface SweepBurnerFundsResult {
    txIds: string[];
    amount: number;
    currency: BurnerSweepCurrency;
}

export const sweepBurnerFundsToDestination = async ({
    decryptedBurnerKey,
    amount,
    currency,
    destination,
    onStatus,
    onLog
}: SweepBurnerFundsParams): Promise<SweepBurnerFundsResult> => {
    void decryptedBurnerKey;
    void amount;
    void currency;
    void destination;
    onStatus?.('Burner sweep requires the native Midnight wallet-approved transfer adapter.');
    onLog?.('Legacy burner record execution has been removed. Use the connected Shield wallet flow until native burner spend authority is available.');
    throw new Error('Burner sweep needs native Midnight burner spend authority. Legacy compatibility execution has been removed for Preprod safety.');
};
