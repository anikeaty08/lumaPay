import type { ConnectedAPI } from '@midnight-ntwrk/dapp-connector-api';
import { CompiledContract } from '@midnight-ntwrk/midnight-js-protocol/compact-js';
import { fromHex } from '@midnight-ntwrk/midnight-js-protocol/compact-runtime';
import { findDeployedContract, getPublicStates } from '@midnight-ntwrk/midnight-js-contracts';
import { Contract, pureCircuits, type ProvableCircuits } from '@lumapay/contract/managed/lumapay-gift-cards/contract/index.js';
import { CONTRACTS } from './config';
import { createMidnightProviders, hex, locateContractCoinIndex, random32, tokenId } from './providers';

const compiledContract = CompiledContract.make('LumaPayGiftCards', Contract).pipe(
  CompiledContract.withVacantWitnesses,
  CompiledContract.withCompiledFileAssets('/zk/lumapay-gift-cards')
);

export type GiftCardOpening = {
  giftCardId: string;
  amount: string;
  token: string;
  tokenId: string;
  giftSecret: string;
  giftRandomness: string;
  expiry: string;
  escrowCoin: { nonce: string; color: string; value: string; mtIndex: string };
};

export type GiftCardIssuerRecovery = GiftCardOpening & {
  issuerSecret: string;
  transactionId: string;
  label: string;
};

function encodeCode(cards: GiftCardOpening[]): string {
  const bytes = new TextEncoder().encode(JSON.stringify({ version: 1, network: 'preprod', cards }));
  let binary = '';
  bytes.forEach((byte) => { binary += String.fromCharCode(byte); });
  return `LUMA-${btoa(binary).replaceAll('+', '-').replaceAll('/', '_').replaceAll('=', '')}`;
}

export function decodeGiftCode(code: string): GiftCardOpening[] {
  if (!code.startsWith('LUMA-')) throw new Error('Gift code format is invalid.');
  const encoded = code.slice(5).replaceAll('-', '+').replaceAll('_', '/');
  const binary = atob(encoded.padEnd(Math.ceil(encoded.length / 4) * 4, '='));
  const payload = JSON.parse(new TextDecoder().decode(Uint8Array.from(binary, (character) => character.charCodeAt(0))));
  if (payload?.version !== 1 || payload?.network !== 'preprod' || !Array.isArray(payload.cards)) throw new Error('Gift code is not a LumaPay Preprod card.');
  return payload.cards;
}

export async function createGiftCardsOnChain(
  connected: ConnectedAPI,
  assets: Array<{ token: string; amount: bigint }>,
  label: string,
  expiry: bigint
): Promise<{ giftCode: string; recovery: GiftCardIssuerRecovery[] }> {
  const providers = await createMidnightProviders<keyof ProvableCircuits<unknown>>(connected, 'lumapay-gift-cards');
  const deployed = await findDeployedContract(providers, {
    contractAddress: CONTRACTS['gift-cards'], compiledContract,
    privateStateId: 'lumapay-gift-cards-private-state', initialPrivateState: {}
  });
  const recovery: GiftCardIssuerRecovery[] = [];
  for (const asset of assets) {
    const giftCardId = random32();
    const giftSecret = random32();
    const giftRandomness = random32();
    const issuerSecret = random32();
    const color = await tokenId(asset.token);
    const coin = { nonce: giftCardId, color, value: asset.amount };
    const issuerAuthorization = pureCircuits.deriveGiftCardIssuerAuthorization(giftCardId, issuerSecret);
    const before = await getPublicStates(providers.publicDataProvider, CONTRACTS['gift-cards']);
    const transaction = await deployed.callTx.createGiftCard(
      giftCardId, asset.amount, color, giftSecret, giftRandomness,
      issuerAuthorization, expiry, coin
    );
    const mtIndex = locateContractCoinIndex(before.zswapChainState, transaction.public.tx, CONTRACTS['gift-cards']);
    recovery.push({
      giftCardId: hex(giftCardId), amount: asset.amount.toString(), token: asset.token,
      tokenId: hex(color), giftSecret: hex(giftSecret), giftRandomness: hex(giftRandomness),
      issuerSecret: hex(issuerSecret), expiry: expiry.toString(), transactionId: String(transaction.public.txId),
      escrowCoin: { nonce: hex(coin.nonce), color: hex(color), value: asset.amount.toString(), mtIndex: mtIndex.toString() },
      label
    });
  }
  const openings = recovery.map(({ issuerSecret: _secret, transactionId: _tx, label: _label, ...opening }) => opening);
  return { giftCode: encodeCode(openings), recovery };
}

export async function redeemGiftCodeOnChain(connected: ConnectedAPI, code: string): Promise<string[]> {
  return redeemGiftCardsOnChain(connected, decodeGiftCode(code));
}

export async function redeemGiftCardsOnChain(connected: ConnectedAPI, cards: GiftCardOpening[]): Promise<string[]> {
  const providers = await createMidnightProviders<keyof ProvableCircuits<unknown>>(connected, 'lumapay-gift-cards');
  const deployed = await findDeployedContract(providers, {
    contractAddress: CONTRACTS['gift-cards'], compiledContract,
    privateStateId: 'lumapay-gift-cards-private-state', initialPrivateState: {}
  });
  const transactions: string[] = [];
  for (const card of cards) {
    const transaction = await deployed.callTx.redeemGiftCard(
      fromHex(card.giftCardId), BigInt(card.amount), fromHex(card.tokenId),
      fromHex(card.giftSecret), fromHex(card.giftRandomness),
      { nonce: fromHex(card.escrowCoin.nonce), color: fromHex(card.escrowCoin.color), value: BigInt(card.escrowCoin.value), mt_index: BigInt(card.escrowCoin.mtIndex) }
    );
    transactions.push(String(transaction.public.txId));
  }
  return transactions;
}
