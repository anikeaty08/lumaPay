import type { ConnectedAPI, HistoryEntry } from '@midnight-ntwrk/dapp-connector-api';
import { shieldedToken, unshieldedToken } from '@midnight-ntwrk/ledger-v8';

export type MidnightTransferKind = 'shielded' | 'unshielded';

export const NIGHT_ATOMIC_SCALE = 1_000_000n;

const NIGHT_TOKEN_BY_KIND: Record<MidnightTransferKind, string> = {
  shielded: shieldedToken().raw,
  unshielded: unshieldedToken().raw,
};

export function toNightAtomic(amount: number): bigint {
  if (!Number.isFinite(amount) || amount <= 0) {
    throw new Error('Amount must be greater than zero.');
  }
  const micros = Math.round(amount * Number(NIGHT_ATOMIC_SCALE));
  if (!Number.isSafeInteger(micros) || micros <= 0) {
    throw new Error('Amount is outside the supported NIGHT precision range.');
  }
  return BigInt(micros);
}

export function isNativeMidnightAddress(value: string | null | undefined): value is string {
  const candidate = value?.trim();
  if (!candidate) return false;
  if (candidate.startsWith('mn_card_')) return false;
  return /^mn_[a-z0-9_]*1[023456789acdefghjklmnpqrstuvwxyz]+$/i.test(candidate)
    || /^midnight1[023456789acdefghjklmnpqrstuvwxyz]+$/i.test(candidate);
}

async function readRecentHistory(api: ConnectedAPI): Promise<HistoryEntry[]> {
  try {
    return await api.getTxHistory(0, 25);
  } catch {
    return [];
  }
}

export async function submitNightTransfer(
  api: ConnectedAPI,
  params: {
    recipient: string;
    amountAtomic: bigint;
    kind?: MidnightTransferKind;
    payFees?: boolean;
  },
): Promise<{ transactionId: string }> {
  const kind = params.kind ?? 'shielded';
  if (!isNativeMidnightAddress(params.recipient)) {
    throw new Error('Recipient must be a native Midnight wallet address.');
  }
  if (params.amountAtomic <= 0n) {
    throw new Error('Transfer amount must be greater than zero.');
  }

  await api.hintUsage(['makeTransfer', 'submitTransaction', 'getTxHistory']);
  const before = new Set((await readRecentHistory(api)).map((entry) => entry.txHash));
  const transfer = await api.makeTransfer([{
    kind,
    type: NIGHT_TOKEN_BY_KIND[kind],
    value: params.amountAtomic,
    recipient: params.recipient,
  }], { payFees: params.payFees ?? true });

  await api.submitTransaction(transfer.tx);

  const deadline = Date.now() + 10_000;
  while (Date.now() < deadline) {
    const latest = await readRecentHistory(api);
    const candidate = latest.find((entry) => !before.has(entry.txHash));
    if (candidate?.txHash) return { transactionId: candidate.txHash };
    await new Promise((resolve) => window.setTimeout(resolve, 750));
  }

  return { transactionId: 'submitted' };
}
