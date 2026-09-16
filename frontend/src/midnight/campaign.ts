import type { ConnectedAPI } from '@midnight-ntwrk/dapp-connector-api';
import { CompiledContract } from '@midnight-ntwrk/midnight-js-protocol/compact-js';
import { findDeployedContract, getPublicStates } from '@midnight-ntwrk/midnight-js-contracts';
import {
  Contract,
  pureCircuits,
  type ProvableCircuits,
} from '@lumapay/contract/managed/lumapay-campaigns/contract/index.js';
import { CONTRACTS } from './config';
import { canonicalTransactionHash, createMidnightProviders, hex, locateContractCoinIndex, random32, tokenId } from './providers';
import { fromHex } from '@midnight-ntwrk/midnight-js-protocol/compact-runtime';

const compiledContract = CompiledContract.make('LumaPayCampaigns', Contract).pipe(
  CompiledContract.withVacantWitnesses,
  CompiledContract.withCompiledFileAssets('/zk/lumapay-campaigns'),
);

export type CampaignDraft = {
  minimumContribution: bigint;
  maximumContribution: bigint;
  acceptedTokens: string[];
  expiry: bigint;
};

export type CampaignRecoveryBundle = {
  kind: 'campaign';
  campaignId: string;
  minimumContribution: string;
  maximumContribution: string;
  acceptedTokens: string[];
  acceptedTokenIds: string[];
  expiry: string;
  merchantPrivateIdentity: string;
  merchantClaimSecret: string;
  campaignNonce: string;
  campaignRandomness: string;
  commitment: string;
  merchantAuthorization: string;
  transactionId: string;
};

export async function createCampaignOnChain(
  connected: ConnectedAPI,
  draft: CampaignDraft,
): Promise<CampaignRecoveryBundle> {
  const acceptedTokens = [...new Set(draft.acceptedTokens.map((token) => token.toUpperCase()))].slice(0, 4);
  if (acceptedTokens.length === 0) throw new Error('Select at least one accepted token.');
  if (draft.minimumContribution <= 0n || draft.maximumContribution < draft.minimumContribution) {
    throw new Error('The contribution range is invalid.');
  }

  const providers = await createMidnightProviders<keyof ProvableCircuits<unknown>>(
    connected,
    'lumapay-campaigns',
  );
  const campaignId = random32();
  const merchantPrivateIdentity = random32();
  const merchantClaimSecret = random32();
  const campaignNonce = random32();
  const campaignRandomness = random32();
  const ids = await Promise.all(acceptedTokens.map(tokenId));
  const zero = new Uint8Array(32);
  const [tokenA, tokenB = zero, tokenC = zero, tokenD = zero] = ids;
  const merchantAuthorization = pureCircuits.deriveMerchantAuthorization(merchantClaimSecret);
  const commitment = pureCircuits.deriveCampaignCommitment(
    campaignId,
    merchantPrivateIdentity,
    draft.minimumContribution,
    draft.maximumContribution,
    BigInt(ids.length),
    tokenA,
    tokenB,
    tokenC,
    tokenD,
    campaignNonce,
    campaignRandomness,
    draft.expiry,
  );
  const deployed = await findDeployedContract(providers, {
    contractAddress: CONTRACTS.campaigns,
    compiledContract,
    privateStateId: 'lumapay-campaigns-private-state',
    initialPrivateState: {},
  });
  const transaction = await deployed.callTx.createCampaign(
    campaignId,
    commitment,
    merchantAuthorization,
    draft.expiry,
  );

  return {
    kind: 'campaign',
    campaignId: hex(campaignId),
    minimumContribution: draft.minimumContribution.toString(),
    maximumContribution: draft.maximumContribution.toString(),
    acceptedTokens,
    acceptedTokenIds: ids.map(hex),
    expiry: draft.expiry.toString(),
    merchantPrivateIdentity: hex(merchantPrivateIdentity),
    merchantClaimSecret: hex(merchantClaimSecret),
    campaignNonce: hex(campaignNonce),
    campaignRandomness: hex(campaignRandomness),
    commitment: hex(commitment),
    merchantAuthorization: hex(merchantAuthorization),
    transactionId: canonicalTransactionHash(transaction.public.txId),
  };
}

export type CampaignPaymentOpening = {
  campaignId: string;
  minimumContribution: string;
  maximumContribution: string;
  acceptedTokens: string[];
  acceptedTokenIds: string[];
  merchantPrivateIdentity: string;
  campaignNonce: string;
  campaignRandomness: string;
};

export type CampaignEscrowCoin = {
  nonce: string;
  color: string;
  value: string;
  mtIndex: string;
};

async function campaignContract(connected: ConnectedAPI) {
  const providers = await createMidnightProviders<keyof ProvableCircuits<unknown>>(connected, 'lumapay-campaigns');
  const deployed = await findDeployedContract(providers, {
    contractAddress: CONTRACTS.campaigns,
    compiledContract,
    privateStateId: 'lumapay-campaigns-private-state',
    initialPrivateState: {}
  });
  return { deployed, providers };
}

export async function contributeOnChain(
  connected: ConnectedAPI,
  opening: CampaignPaymentOpening,
  amount: bigint,
  token: string
): Promise<{ transactionId: string; contributionId: string; contributionSecret: string; receiptSecret: string; receiptCommitment: string; escrowCoin: CampaignEscrowCoin }> {
  const tokenIndex = opening.acceptedTokens.findIndex((candidate) => candidate.toUpperCase() === token.toUpperCase());
  if (tokenIndex < 0) throw new Error(`${token} is not accepted by this campaign.`);
  if (amount < BigInt(opening.minimumContribution) || amount > BigInt(opening.maximumContribution)) {
    throw new Error('Contribution amount is outside the campaign range.');
  }
  const { deployed, providers } = await campaignContract(connected);
  const campaignId = fromHex(opening.campaignId);
  const contributionSecret = random32();
  const receiptSecret = random32();
  const ids = opening.acceptedTokenIds.map(fromHex);
  const zero = new Uint8Array(32);
  const [tokenA, tokenB = zero, tokenC = zero, tokenD = zero] = ids;
  const color = ids[tokenIndex];
  if (!color) throw new Error('Payment token opening is incomplete.');
  const nullifier = pureCircuits.deriveContributionNullifier(campaignId, contributionSecret);
  const contributionId = pureCircuits.deriveContributionId(campaignId, nullifier);
  const receiptCommitment = pureCircuits.deriveContributionReceiptCommitment(
    contributionId, nullifier, amount, color, receiptSecret
  );
  const coin = { nonce: random32(), color, value: amount };
  const before = await getPublicStates(providers.publicDataProvider, CONTRACTS.campaigns);
  const transaction = await deployed.callTx.contribute(
    campaignId,
    fromHex(opening.merchantPrivateIdentity),
    BigInt(opening.minimumContribution),
    BigInt(opening.maximumContribution),
    BigInt(ids.length),
    tokenA,
    tokenB,
    tokenC,
    tokenD,
    fromHex(opening.campaignNonce),
    fromHex(opening.campaignRandomness),
    contributionSecret,
    receiptSecret,
    coin
  );
  const mtIndex = locateContractCoinIndex(before.zswapChainState, transaction.public.tx, CONTRACTS.campaigns);
  return {
    transactionId: String(transaction.public.txId),
    contributionId: hex(contributionId),
    contributionSecret: hex(contributionSecret),
    receiptSecret: hex(receiptSecret),
    receiptCommitment: hex(receiptCommitment),
    escrowCoin: { nonce: hex(coin.nonce), color: hex(coin.color), value: coin.value.toString(), mtIndex: mtIndex.toString() }
  };
}

export async function cancelCampaignOnChain(
  connected: ConnectedAPI,
  recovery: Pick<CampaignRecoveryBundle, 'campaignId' | 'merchantClaimSecret'>
): Promise<{ transactionId: string }> {
  const { deployed } = await campaignContract(connected);
  const transaction = await deployed.callTx.cancelCampaign(
    fromHex(recovery.campaignId),
    fromHex(recovery.merchantClaimSecret)
  );
  return { transactionId: String(transaction.public.txId) };
}

export async function expireCampaignOnChain(
  connected: ConnectedAPI,
  campaignId: string
): Promise<{ transactionId: string }> {
  const { deployed } = await campaignContract(connected);
  const transaction = await deployed.callTx.expireCampaign(fromHex(campaignId));
  return { transactionId: String(transaction.public.txId) };
}

export async function claimContributionOnChain(
  connected: ConnectedAPI,
  recovery: Pick<CampaignRecoveryBundle, 'merchantClaimSecret'>,
  contributionId: string,
  escrowCoin: CampaignEscrowCoin
): Promise<{ transactionId: string }> {
  const { deployed } = await campaignContract(connected);
  const transaction = await deployed.callTx.claimContribution(
    fromHex(contributionId),
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
