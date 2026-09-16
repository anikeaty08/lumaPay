import type { ConnectedAPI } from '@midnight-ntwrk/dapp-connector-api';
import { Binding, CostModel, Proof, SignatureEnabled, Transaction } from '@midnight-ntwrk/midnight-js-protocol/ledger';
import { fromHex, toHex } from '@midnight-ntwrk/midnight-js-protocol/compact-runtime';
import { dappConnectorProofProvider } from '@midnight-ntwrk/midnight-js-dapp-connector-proof-provider';
import { FetchZkConfigProvider } from '@midnight-ntwrk/midnight-js-fetch-zk-config-provider';
import { indexerPublicDataProvider } from '@midnight-ntwrk/midnight-js-indexer-public-data-provider';
import { levelPrivateStateProvider, type LevelFactory } from '@midnight-ntwrk/midnight-js-level-private-state-provider';
import { BrowserLevel } from 'browser-level';
import type { UnboundTransaction } from '@midnight-ntwrk/midnight-js-types';
import type { ShieldedCoinInfo, ZswapChainState } from '@midnight-ntwrk/ledger-v8';

const browserLevelFactory = ((name: string) => (
  new BrowserLevel(name, { valueEncoding: 'utf8' })
)) as unknown as LevelFactory;

// The SDK uses transaction identifiers to watch for finalization. LumaPay
// separately records the canonical 32-byte transaction hash in its API.
const transactionHashes = new Map<string, string>();

export function canonicalTransactionHash(transactionId: string): string {
  const hash = transactionHashes.get(transactionId);
  if (!hash) {
    throw new Error('The canonical transaction hash was unavailable after submission. Please retry the invoice creation.');
  }
  return hash;
}

export function random32(): Uint8Array {
  return crypto.getRandomValues(new Uint8Array(32));
}

export function hex(bytes: Uint8Array): string {
  return Array.from(bytes, (value) => value.toString(16).padStart(2, '0')).join('');
}

export function locateContractCoinIndex(
  initialState: ZswapChainState,
  transaction: Transaction<SignatureEnabled, Proof, Binding>,
  contractAddress: string
): bigint {
  let state = initialState;
  const applyOffer = (offer: any) => {
    const targetCommitments = new Set(
      (offer?.outputs ?? [])
        .filter((output: any) => String(output.contractAddress ?? '') === contractAddress)
        .map((output: any) => String(output.commitment))
    );
    const [next, inserted] = state.tryApply(offer, new Set([contractAddress]));
    state = next;
    for (const [commitment, index] of inserted) {
      if (targetCommitments.has(String(commitment))) return index as bigint;
    }
    return null;
  };
  if (transaction.guaranteedOffer) {
    const found = applyOffer(transaction.guaranteedOffer);
    if (found !== null) return found;
  }
  for (const [, offer] of [...(transaction.fallibleOffer?.entries() ?? [])].sort(([left], [right]) => left - right)) {
    const found = applyOffer(offer);
    if (found !== null) return found;
  }
  throw new Error('The finalized transaction did not contain the expected contract-owned coin.');
}

export type StoredQualifiedCoin = ShieldedCoinInfo & { mt_index: bigint };

export async function tokenId(symbol: string): Promise<Uint8Array> {
  if (symbol.trim().toUpperCase() === 'NIGHT') return new Uint8Array(32);
  const configured = symbol.trim().toUpperCase() === 'USDCX'
    ? import.meta.env.VITE_LUMAPAY_USDCX_TOKEN_ID
    : symbol.trim().toUpperCase() === 'USAD'
      ? import.meta.env.VITE_LUMAPAY_USAD_TOKEN_ID
      : undefined;
  if (configured) {
    if (!/^[0-9a-f]{64}$/i.test(configured)) throw new Error(`${symbol} token ID must be 32-byte hexadecimal.`);
    return Uint8Array.from(configured.match(/.{2}/g) ?? [], (byte: string) => Number.parseInt(byte, 16));
  }
  return new Uint8Array(await crypto.subtle.digest('SHA-256', new TextEncoder().encode(symbol)));
}

function privateStatePassword(): string {
  const key = 'lumapay-private-state-password';
  const existing = localStorage.getItem(key);
  if (existing) return existing;
  const password = `Lp!Aa9_${hex(random32())}`;
  localStorage.setItem(key, password);
  return password;
}

export async function createMidnightProviders<CircuitKey extends string>(
  connected: ConnectedAPI,
  artifactName: string
) {
  const config = await connected.getConfiguration();
  const shielded = await connected.getShieldedAddresses();
  const zkConfigProvider = new FetchZkConfigProvider<CircuitKey>(
    `${window.location.origin}/zk/${artifactName}`,
    fetch.bind(window)
  );
  const proofProvider = config.proverServerUri
    ? (await import('@midnight-ntwrk/midnight-js-http-client-proof-provider')).httpClientProofProvider(
        config.proverServerUri,
        zkConfigProvider
      )
    : await dappConnectorProofProvider(connected, zkConfigProvider, CostModel.initialCostModel());

  return {
    privateStateProvider: levelPrivateStateProvider({
      privateStoragePasswordProvider: privateStatePassword,
      accountId: shielded.shieldedAddress,
      levelFactory: browserLevelFactory
    }),
    publicDataProvider: indexerPublicDataProvider(
      config.indexerUri,
      config.indexerWsUri,
      globalThis.WebSocket as unknown as Parameters<typeof indexerPublicDataProvider>[2]
    ),
    zkConfigProvider,
    proofProvider,
    walletProvider: {
      getCoinPublicKey: () => shielded.shieldedCoinPublicKey,
      getEncryptionPublicKey: () => shielded.shieldedEncryptionPublicKey,
      balanceTx: async (tx: UnboundTransaction) => {
        const result = await connected.balanceUnsealedTransaction(toHex(tx.serialize()));
        return Transaction.deserialize<SignatureEnabled, Proof, Binding>(
          'signature',
          'proof',
          'binding',
          fromHex(result.tx)
        );
      }
    },
    midnightProvider: {
      submitTx: async (tx: Transaction<SignatureEnabled, Proof, Binding>) => {
        await connected.submitTransaction(toHex(tx.serialize()));
        const transactionId = tx.identifiers()[0];
        if (!transactionId) throw new Error('Midnight did not return a transaction identifier.');
        transactionHashes.set(transactionId, tx.transactionHash());
        return transactionId;
      }
    }
  };
}
