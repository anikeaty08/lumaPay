import type { PrivateBalances, ScannerSession } from '../../../../types/burner';

const EMPTY_BALANCES: PrivateBalances = { NIGHT: 0 };

export async function getScannerSession(_decryptedBurnerKey: string): Promise<ScannerSession> {
    throw new Error('Legacy record-scanner sessions are disabled. LumaPay uses the connected Midnight wallet for native Preprod execution.');
}

export async function scanProgramBalance(
    _session: ScannerSession,
    _programFilter: string,
    _recordName: string,
): Promise<number> {
    return 0;
}

export async function fetchAllPrivateBalances(_decryptedBurnerKey: string): Promise<PrivateBalances> {
    return { ...EMPTY_BALANCES };
}

export async function findSpendableRecord(
    _session: ScannerSession,
    _programFilter: string,
    _recordName: string,
    _microcreditsRequired: number,
    _isNIGHT: boolean,
): Promise<string | null> {
    return null;
}

export async function listSpendableRecords(
    _session: ScannerSession,
    _programFilter: string,
    _recordName: string,
    _isNIGHT: boolean,
): Promise<Array<{ plaintext: string; microcredits: number }>> {
    return [];
}

export async function findOwnedInvoiceRecord(
    _session: ScannerSession,
    _programFilter: string,
    _invoiceHash: string,
): Promise<string | null> {
    return null;
}
