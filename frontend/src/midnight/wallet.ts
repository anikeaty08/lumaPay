import type { ConnectedAPI, InitialAPI } from '@midnight-ntwrk/dapp-connector-api';
import { setNetworkId } from '@midnight-ntwrk/midnight-js-network-id';
import { NETWORK_ID } from './config';

declare global {
  interface Window {
    midnight?: Record<string, InitialAPI>;
  }
}

export type WalletSummary = {
  name: string;
  address: string;
  unshieldedAddress: string;
  dustBalance: bigint;
  dustCap: bigint;
};

export function discoverWallets(): InitialAPI[] {
  return Object.values(window.midnight ?? {}).filter((wallet): wallet is InitialAPI => (
    Boolean(wallet?.name) && wallet.apiVersion?.startsWith('4.') && typeof wallet.connect === 'function'
  ));
}

export async function connectWallet(wallet: InitialAPI): Promise<{ api: ConnectedAPI; summary: WalletSummary }> {
  const api = await wallet.connect(NETWORK_ID);
  const status = await api.getConnectionStatus();
  if (status.status !== 'connected') throw new Error('The wallet did not authorize this connection.');
  if (status.networkId.toLowerCase() !== NETWORK_ID) {
    throw new Error(`Switch the wallet network to ${NETWORK_ID}.`);
  }
  setNetworkId(NETWORK_ID);
  const [{ shieldedAddress }, { unshieldedAddress }, dust] = await Promise.all([
    api.getShieldedAddresses(),
    api.getUnshieldedAddress(),
    api.getDustBalance()
  ]);
  return {
    api,
    summary: {
      name: wallet.name,
      address: shieldedAddress,
      unshieldedAddress,
      dustBalance: dust.balance,
      dustCap: dust.cap
    }
  };
}
