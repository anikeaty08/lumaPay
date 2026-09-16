import type { InvoiceRecord } from '../../types/invoice';
import type { BurnerWalletRecord, MerchantReceipt, PayerReceipt } from '../../types/receipt';
import { API_URL, CONTRACTS } from '../../../midnight/config';

export const CORE_PROGRAM_ID = CONTRACTS['invoice-core'];
export const WALLET_PROGRAM_ID = CONTRACTS['backup-anchor'];
export const PROGRAM_ID = CORE_PROGRAM_ID;

export const tokenLabel = (tokenType: number) => tokenType === 1 ? 'USDCx' : tokenType === 2 ? 'USAD' : tokenType === 3 ? 'Any token' : 'NIGHT';
export const invoiceTypeLabel = (invoiceType: number) => invoiceType === 1 ? 'Multi-Pay' : invoiceType === 2 ? 'Donation' : 'Standard';
export const walletLabel = (walletType: number) => walletType === 1 ? 'Card' : 'Main';
export const truncateAddress = (value?: string | null) => value ? `${value.slice(0, 10)}…${value.slice(-6)}` : 'Not connected';

export async function estimateExecutionFee(_options?: unknown): Promise<number> {
    // DApp Connector 4.x calculates and funds the exact fee while balancing the unsealed transaction.
    return 0;
}

export async function fetchBurnerRecordsFromTx(transactionId: string, _walletMaterial?: unknown): Promise<unknown[]> {
    const matches: unknown[] = [];
    for (let index = 0; index < localStorage.length; index += 1) {
        const key = localStorage.key(index);
        if (!key?.startsWith('lumapay:receipt:')) continue;
        try {
            const value = JSON.parse(localStorage.getItem(key) ?? 'null');
            if (value?.transactionId === transactionId) matches.push(value);
        } catch { /* ignore malformed browser-owned entries */ }
    }
    return matches;
}

export function stringToField(value: string): string {
    const bytes = new TextEncoder().encode(value);
    if (bytes.length > 31) throw new Error(`Value exceeds Compact field capacity (${bytes.length}/31 bytes).`);
    const hex = Array.from(bytes, (byte) => byte.toString(16).padStart(2, '0')).join('') || '0';
    return `${BigInt(`0x${hex}`).toString()}field`;
}

export function fieldToString(value: string): string {
    try {
        let hex = BigInt(value.replace('field', '')).toString(16);
        if (hex.length % 2) hex = `0${hex}`;
        return new TextDecoder().decode(Uint8Array.from(hex.match(/.{2}/g) ?? [], (byte) => Number.parseInt(byte, 16))).replace(/\0/g, '');
    } catch { return ''; }
}

export function generateSalt(): string {
    return Array.from(crypto.getRandomValues(new Uint8Array(32)), (byte) => byte.toString(16).padStart(2, '0')).join('');
}

export async function getInvoiceHashFromMapping(nonce: string): Promise<string | null> {
    for (let index = 0; index < localStorage.length; index += 1) {
        const key = localStorage.key(index);
        if (!key?.startsWith('lumapay:recovery:')) continue;
        try {
            const recovery = JSON.parse(localStorage.getItem(key) ?? 'null');
            if (recovery?.invoiceNonce === nonce) return recovery.invoiceId ?? null;
            if (recovery?.campaignNonce === nonce) return recovery.campaignId ?? null;
        } catch { /* ignore malformed browser-owned entries */ }
    }
    return null;
}

export async function getInvoiceData(hash: string): Promise<{ status: number; tokenType: number; invoiceType: number } | null> {
    try {
        const response = await fetch(`${API_URL}/api/v1/chain/invoices/${encodeURIComponent(hash)}`);
        if (!response.ok) return null;
        const value = await response.json();
        const status = value.status === 'SETTLED' ? 1 : value.status === 'OPEN' ? 0 : 2;
        return { status, tokenType: 0, invoiceType: 0 };
    } catch { return null; }
}

export async function getInvoiceStatus(hash: string): Promise<number | null> {
    return (await getInvoiceData(hash))?.status ?? null;
}

function unsupportedComplianceProof(): never {
    throw new Error('The configured Midnight token does not expose a freeze-list proof circuit.');
}
export async function getFreezeListRoot(..._arguments: unknown[]): Promise<string | null> { return null; }
export async function getFreezeListCount(..._arguments: unknown[]): Promise<number> { return 0; }
export async function getFreezeListIndex(..._arguments: unknown[]): Promise<string | null> { return null; }
export async function generateFreezeListProof(..._arguments: unknown[]): Promise<string> { return unsupportedComplianceProof(); }

function recordObject(record: any): any {
    if (!record) return null;
    if (typeof record === 'object' && !record.plaintext) return record;
    if (typeof record.plaintext === 'string' && record.plaintext.trim().startsWith('{')) {
        try { return JSON.parse(record.plaintext); } catch { return null; }
    }
    return null;
}

export function parseInvoice(record: any, ..._arguments: unknown[]): InvoiceRecord | null {
    const value = recordObject(record);
    const invoiceHash = value?.invoiceId ?? value?.invoiceHash ?? value?.invoice_hash;
    if (!invoiceHash) return null;
    return {
        owner: value.owner ?? value.merchant ?? '',
        invoiceHash,
        amount: Number(value.amount ?? 0),
        tokenType: Number(value.tokenType ?? value.token_type ?? 0),
        invoiceType: Number(value.invoiceType ?? value.invoice_type ?? 0),
        salt: value.invoiceNonce ?? value.salt ?? '',
        title: value.title ?? '',
        memo: value.memo ?? '',
        walletType: Number(value.walletType ?? value.wallet_type ?? 0)
    };
}

export function parsePayerReceipt(record: any, ..._arguments: unknown[]): PayerReceipt | null {
    const value = recordObject(record);
    const receiptHash = value?.receiptCommitment ?? value?.receiptHash ?? value?.receipt_hash;
    const invoiceHash = value?.requestId ?? value?.invoiceHash ?? value?.invoice_hash;
    if (!receiptHash || !invoiceHash) return null;
    return {
        owner: value.owner ?? '', merchant: value.merchant ?? '', receiptHash, invoiceHash,
        amount: Number(value.amount ?? 0), tokenType: Number(value.tokenType ?? 0),
        payerNote: value.payerNote ?? '', timestamp: Date.parse(value.createdAt ?? '') || 0,
        created_at: value.createdAt, transactionId: value.transactionId
    };
}

export function parseMerchantReceipt(record: any, ..._arguments: unknown[]): MerchantReceipt | null {
    const payer = parsePayerReceipt(record);
    if (!payer) return null;
    return {
        owner: payer.owner, receiptHash: payer.receiptHash, invoiceHash: payer.invoiceHash,
        amount: payer.amount, tokenType: payer.tokenType, merchantNote: recordObject(record)?.merchantNote ?? '',
        timestamp: payer.timestamp, created_at: payer.created_at, transactionId: payer.transactionId
    };
}

export function parseBurnerBackupRecord(record: any, ..._arguments: unknown[]): BurnerWalletRecord | null {
    const value = recordObject(record);
    if (!value?.burnerAddress) return null;
    return { owner: value.owner ?? '', burnerAddress: value.burnerAddress, passwordPart: '', pkParts: [] };
}
