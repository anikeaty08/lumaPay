import { API_URL } from '../midnight/config';

export type ContractStatus = {
  address: string;
  indexed: boolean;
};

export type NetworkStatus = {
  network: string;
  contract_indexed: boolean;
  contracts: Record<string, ContractStatus>;
};

async function request<T>(path: string): Promise<T> {
  const response = await fetch(`${API_URL}${path}`, { signal: AbortSignal.timeout(10_000) });
  if (!response.ok) {
    const body = await response.json().catch(() => null) as { error?: { message?: string } } | null;
    throw new Error(body?.error?.message || `LumaPay API returned ${response.status}.`);
  }
  return response.json() as Promise<T>;
}

export type ChainResource =
  | 'invoices'
  | 'campaigns'
  | 'contributions'
  | 'gift-cards'
  | 'quotes'
  | 'quote-providers'
  | 'backup-anchors';

export const api = {
  status: () => request<NetworkStatus>('/api/v1/midnight/status'),
  invoice: (invoiceId: string) => request<Record<string, unknown>>(`/api/v1/chain/invoices/${invoiceId}`),
  chainRecord: (resource: ChainResource, id: string) => (
    request<Record<string, unknown>>(`/api/v1/chain/${resource}/${id}`)
  )
};
