export interface PrivateBalances {
    NIGHT: number;
}

export type SweepCurrency = 'NIGHT';

export interface BurnerWalletSettingsProps {
    itemVariants: any;
    transactions: any[];
}

export interface ScannerSession {
    scannerBase: string;
    scannerHeaders: Record<string, string>;
    scannerUuid: string;
    account: any;
}
