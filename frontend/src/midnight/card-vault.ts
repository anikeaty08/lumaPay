import type { ConnectedAPI } from '@midnight-ntwrk/dapp-connector-api';
import { CompiledContract } from '@midnight-ntwrk/midnight-js-protocol/compact-js';
import { findDeployedContract } from '@midnight-ntwrk/midnight-js-contracts';
import {
  Contract,
  pureCircuits,
  type ProvableCircuits,
} from '@lumapay/contract/managed/lumapay-card-vault/contract/index.js';
import { fromHex } from '@midnight-ntwrk/midnight-js-protocol/compact-runtime';
import { CONTRACTS } from './config';
import { createMidnightProviders, hex, random32, tokenId } from './providers';

const compiledContract = CompiledContract.make('LumaPayCardVault', Contract).pipe(
  CompiledContract.withVacantWitnesses,
  CompiledContract.withCompiledFileAssets('/zk/lumapay-card-vault'),
);

async function cardVaultContract(connected: ConnectedAPI) {
  if (!CONTRACTS['card-vault']) {
    throw new Error('LumaPay card-vault contract address is not configured.');
  }
  const providers = await createMidnightProviders<keyof ProvableCircuits<unknown>>(connected, 'lumapay-card-vault');
  const deployed = await findDeployedContract(providers, {
    contractAddress: CONTRACTS['card-vault'],
    compiledContract,
    privateStateId: 'lumapay-card-vault-private-state',
    initialPrivateState: {}
  });
  return deployed;
}

export type CardVaultOpening = {
  cardId: string;
  ownerSecret: string;
  ownerPrivateIdentity: string;
  vaultNonce: string;
  vaultRandomness: string;
  cardNumberHash: string;
  metadataDigest: string;
  dailyLimit: string;
  ownerAuthorization: string;
  commitment: string;
};

export async function createCardVaultOnChain(
  connected: ConnectedAPI,
  args: {
    cardNumberHash: string;
    metadataDigest: string;
    dailyLimit: bigint;
  }
): Promise<CardVaultOpening & { transactionId: string }> {
  const cardId = random32();
  const ownerSecret = random32();
  const ownerPrivateIdentity = random32();
  const vaultNonce = random32();
  const vaultRandomness = random32();
  const cardNumberHash = fromHex(args.cardNumberHash);
  const metadataDigest = fromHex(args.metadataDigest);
  const ownerAuthorization = pureCircuits.deriveCardOwnerAuthorization(ownerSecret);
  const commitment = pureCircuits.deriveCardVaultCommitment(
    cardId,
    ownerPrivateIdentity,
    cardNumberHash,
    metadataDigest,
    args.dailyLimit,
    vaultNonce,
    vaultRandomness,
  );
  const deployed = await cardVaultContract(connected);
  const transaction = await deployed.callTx.createCardVault(
    cardId,
    commitment,
    ownerAuthorization,
    cardNumberHash,
    metadataDigest,
    args.dailyLimit,
  );

  return {
    cardId: hex(cardId),
    ownerSecret: hex(ownerSecret),
    ownerPrivateIdentity: hex(ownerPrivateIdentity),
    vaultNonce: hex(vaultNonce),
    vaultRandomness: hex(vaultRandomness),
    cardNumberHash: args.cardNumberHash,
    metadataDigest: args.metadataDigest,
    dailyLimit: args.dailyLimit.toString(),
    ownerAuthorization: hex(ownerAuthorization),
    commitment: hex(commitment),
    transactionId: String(transaction.public.txId),
  };
}

export async function setCardDailyLimitOnChain(
  connected: ConnectedAPI,
  cardId: string,
  ownerSecret: string,
  dailyLimit: bigint
): Promise<{ transactionId: string }> {
  const deployed = await cardVaultContract(connected);
  const transaction = await deployed.callTx.setCardDailyLimit(fromHex(cardId), fromHex(ownerSecret), dailyLimit);
  return { transactionId: String(transaction.public.txId) };
}

export async function closeCardVaultOnChain(
  connected: ConnectedAPI,
  cardId: string,
  ownerSecret: string
): Promise<{ transactionId: string }> {
  const deployed = await cardVaultContract(connected);
  const transaction = await deployed.callTx.closeCardVault(fromHex(cardId), fromHex(ownerSecret));
  return { transactionId: String(transaction.public.txId) };
}

export async function recordCardSpendOnChain(
  connected: ConnectedAPI,
  opening: Pick<CardVaultOpening, 'cardId' | 'ownerPrivateIdentity' | 'cardNumberHash' | 'metadataDigest' | 'dailyLimit' | 'vaultNonce' | 'vaultRandomness'>,
  args: {
    paymentId?: string;
    token: string;
    amount: bigint;
    epochDay?: bigint;
  }
): Promise<{ transactionId: string; spendId: string; spendSecret: string }> {
  const deployed = await cardVaultContract(connected);
  const paymentId = args.paymentId ? fromHex(args.paymentId) : random32();
  const spendSecret = random32();
  const spendId = pureCircuits.deriveCardSpendNullifier(fromHex(opening.cardId), paymentId, spendSecret);
  const transaction = await deployed.callTx.recordCardSpend(
    fromHex(opening.cardId),
    fromHex(opening.ownerPrivateIdentity),
    fromHex(opening.cardNumberHash),
    fromHex(opening.metadataDigest),
    BigInt(opening.dailyLimit),
    fromHex(opening.vaultNonce),
    fromHex(opening.vaultRandomness),
    paymentId,
    spendSecret,
    await tokenId(args.token),
    args.amount,
    args.epochDay ?? BigInt(Math.floor(Date.now() / 86_400_000)),
  );
  return {
    transactionId: String(transaction.public.txId),
    spendId: hex(spendId),
    spendSecret: hex(spendSecret),
  };
}
