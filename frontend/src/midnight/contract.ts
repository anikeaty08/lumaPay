import type { ConnectedAPI } from '@midnight-ntwrk/dapp-connector-api';
import { CompiledContract } from '@midnight-ntwrk/midnight-js-protocol/compact-js';
import { findDeployedContract, getPublicStates } from '@midnight-ntwrk/midnight-js-contracts';
import {
  Contract,
  pureCircuits,
  type ProvableCircuits
} from '@lumapay/contract/managed/lumapay-core/contract/index.js';
import { CONTRACTS } from './config';
import { canonicalTransactionHash, createMidnightProviders, hex, locateContractCoinIndex, random32, tokenId } from './providers';
import { fromHex } from '@midnight-ntwrk/midnight-js-protocol/compact-runtime';

const compiledContract = CompiledContract.make('LumaPayCore', Contract).pipe(
  CompiledContract.withVacantWitnesses,
  CompiledContract.withCompiledFileAssets('/zk/lumapay-core')
);
export type InvoiceDraft = {
  amount: bigint;
  token: string;
  expiry: bigint;
};

export type InvoiceRecoveryBundle = {
  kind: 'invoice';
  invoiceId: string;
  amount: string;
  token: string;
  tokenId: string;
  expiry: string;
  merchantPrivateIdentity: string;
  merchantClaimSecret: string;
  invoiceNonce: string;
  invoiceRandomness: string;
  commitment: string;
  merchantAuthorization: string;
  transactionId: string;
};

export async function createInvoiceOnChain(
  connected: ConnectedAPI,
  draft: InvoiceDraft
): Promise<InvoiceRecoveryBundle> {
  const providers = await createMidnightProviders<keyof ProvableCircuits<unknown>>(
    connected,
    'lumapay-core'
  );

  const invoiceId = random32();
  const merchantPrivateIdentity = random32();
  const merchantClaimSecret = random32();
  const invoiceNonce = random32();
  const invoiceRandomness = random32();
  const paymentToken = await tokenId(draft.token);
  const merchantAuthorization = pureCircuits.deriveMerchantAuthorization(merchantClaimSecret);
  const commitment = pureCircuits.deriveInvoiceCommitment(
    invoiceId,
    merchantPrivateIdentity,
    draft.amount,
    paymentToken,
    invoiceNonce,
    invoiceRandomness,
    draft.expiry
  );
  const deployed = await findDeployedContract(providers, {
    contractAddress: CONTRACTS['invoice-core'],
    compiledContract,
    privateStateId: 'lumapay-core-private-state',
    initialPrivateState: {}
  });
  const transaction = await deployed.callTx.createInvoice(
    invoiceId,
    commitment,
    merchantAuthorization,
    draft.expiry
  );
  const transactionId = canonicalTransactionHash(transaction.public.txId);

  return {
    kind: 'invoice',
    invoiceId: hex(invoiceId),
    amount: draft.amount.toString(),
    token: draft.token,
    tokenId: hex(paymentToken),
    expiry: draft.expiry.toString(),
    merchantPrivateIdentity: hex(merchantPrivateIdentity),
    merchantClaimSecret: hex(merchantClaimSecret),
    invoiceNonce: hex(invoiceNonce),
    invoiceRandomness: hex(invoiceRandomness),
    commitment: hex(commitment),
    merchantAuthorization: hex(merchantAuthorization),
    transactionId
  };
}

export type InvoicePaymentOpening = {
  invoiceId: string;
  amount: string;
  token: string;
  tokenId?: string;
  expiry?: string;
  merchantPrivateIdentity: string;
  invoiceNonce: string;
  invoiceRandomness: string;
};

export type InvoiceEscrowCoin = {
  nonce: string;
  color: string;
  value: string;
  mtIndex: string;
};

async function invoiceContract(connected: ConnectedAPI) {
  const providers = await createMidnightProviders<keyof ProvableCircuits<unknown>>(connected, 'lumapay-core');
  const deployed = await findDeployedContract(providers, {
    contractAddress: CONTRACTS['invoice-core'],
    compiledContract,
    privateStateId: 'lumapay-core-private-state',
    initialPrivateState: {}
  });
  return { deployed, providers };
}

export async function payInvoiceOnChain(
  connected: ConnectedAPI,
  opening: InvoicePaymentOpening
): Promise<{ transactionId: string; paymentSecret: string; receiptSecret: string; receiptCommitment: string; escrowCoin: { nonce: string; color: string; value: string; mtIndex: string } }> {
  const { deployed, providers } = await invoiceContract(connected);
  const invoiceId = fromHex(opening.invoiceId);
  const amount = BigInt(opening.amount);
  const color = opening.tokenId ? fromHex(opening.tokenId) : await tokenId(opening.token);
  const paymentSecret = random32();
  const receiptSecret = random32();
  // The invoice commitment already binds this random value. Reusing it as the
  // escrow nonce lets the merchant reconstruct claim material from their local
  // recovery bundle without receiving a payer secret.
  const coin = { nonce: fromHex(opening.invoiceRandomness), color, value: amount };
  const before = await getPublicStates(providers.publicDataProvider, CONTRACTS['invoice-core']);
  const nullifier = pureCircuits.derivePaymentNullifier(invoiceId, paymentSecret);
  const receiptCommitment = pureCircuits.deriveReceiptCommitment(
    invoiceId,
    nullifier,
    amount,
    color,
    receiptSecret
  );
  const transaction = await deployed.callTx.payInvoice(
    invoiceId,
    fromHex(opening.merchantPrivateIdentity),
    amount,
    color,
    fromHex(opening.invoiceNonce),
    fromHex(opening.invoiceRandomness),
    paymentSecret,
    receiptSecret,
    coin
  );
  const mtIndex = locateContractCoinIndex(before.zswapChainState, transaction.public.tx, CONTRACTS['invoice-core']);
  return {
    transactionId: String(transaction.public.txId),
    paymentSecret: hex(paymentSecret),
    receiptSecret: hex(receiptSecret),
    receiptCommitment: hex(receiptCommitment),
    escrowCoin: { nonce: hex(coin.nonce), color: hex(coin.color), value: coin.value.toString(), mtIndex: mtIndex.toString() }
  };
}

export async function cancelInvoiceOnChain(
  connected: ConnectedAPI,
  recovery: Pick<InvoiceRecoveryBundle, 'invoiceId' | 'merchantClaimSecret'>
): Promise<{ transactionId: string }> {
  const { deployed } = await invoiceContract(connected);
  const transaction = await deployed.callTx.cancelInvoice(
    fromHex(recovery.invoiceId),
    fromHex(recovery.merchantClaimSecret)
  );
  return { transactionId: String(transaction.public.txId) };
}

export async function expireInvoiceOnChain(
  connected: ConnectedAPI,
  invoiceId: string
): Promise<{ transactionId: string }> {
  const { deployed } = await invoiceContract(connected);
  const transaction = await deployed.callTx.expireInvoice(fromHex(invoiceId));
  return { transactionId: String(transaction.public.txId) };
}

export async function claimInvoiceOnChain(
  connected: ConnectedAPI,
  recovery: Pick<InvoiceRecoveryBundle, 'invoiceId' | 'merchantClaimSecret'>,
  escrowCoin: InvoiceEscrowCoin
): Promise<{ transactionId: string }> {
  const { deployed } = await invoiceContract(connected);
  const transaction = await deployed.callTx.claimInvoice(
    fromHex(recovery.invoiceId),
    fromHex(recovery.merchantClaimSecret),
    {
      nonce: fromHex(escrowCoin.nonce),
      color: fromHex(escrowCoin.color),
      value: BigInt(escrowCoin.value),
      mt_index: BigInt(escrowCoin.mtIndex)
    }
  );
  return { transactionId: String(transaction.public.txId) };
}
