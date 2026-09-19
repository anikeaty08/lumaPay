import { BurnerSweepCurrency } from '../../types/tokens';
import { startBurnerWallet, getBurnerBalances, buildProvenBurnerTransfer, submitBurnerTransfer } from '../../../midnight/burnerWallet';

interface SweepBurnerFundsParams {
    /** The burner identity's 24-word mnemonic (see BurnerWalletProvider's decryptedBurnerKey) — not a legacy record key. */
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
    onStatus?.('Restoring your burner identity...');
    onLog?.('Deriving the burner wallet from its saved mnemonic.');
    const identity = await startBurnerWallet(decryptedBurnerKey);

    onStatus?.('Checking spendable balance...');
    const { balances, fullySynced } = await getBurnerBalances(identity);
    if (!fullySynced) {
        onLog?.(`Warning: this burner wallet has not finished syncing yet — its reported balance (${balances.NIGHT} NIGHT) may be incomplete.`);
    }
    if (balances.NIGHT < amount) {
        throw new Error(`This burner wallet's spendable balance (${balances.NIGHT} NIGHT) is less than the requested sweep amount.`);
    }

    onStatus?.('Generating the private transfer proof...');
    onLog?.('Building and proving the shielded transfer transaction.');
    const amountMicros = BigInt(Math.round(amount * 1_000_000));
    const proven = await buildProvenBurnerTransfer(identity, destination, amountMicros);

    onStatus?.('Broadcasting to the Midnight network...');
    onLog?.('Submitting the proven transaction to the Preprod node.');
    const txId = await submitBurnerTransfer(proven);
    onLog?.(`Sweep confirmed in block. Transaction: ${txId}`);

    return { txIds: [txId], amount, currency };
};
