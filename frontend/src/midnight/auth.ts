import type { ConnectedAPI } from '@midnight-ntwrk/dapp-connector-api';
import { API_URL } from './config';

type Challenge = { challenge_id: string; message: string; expires_at: string };
type Session = { authenticated: true; midnight_address: string; merchant_id: string | null; expires_at: string };

async function responseJson<T>(response: Response): Promise<T> {
  const body = await response.json().catch(() => null);
  if (!response.ok) {
    throw new Error(body?.error?.message || `LumaPay authentication failed (${response.status}).`);
  }
  return body as T;
}

export async function authenticateWallet(api: ConnectedAPI, unshieldedAddress: string): Promise<Session> {
  const challenge = await responseJson<Challenge>(await fetch(`${API_URL}/api/v1/auth/challenges`, {
    method: 'POST',
    credentials: 'include',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ midnight_address: unshieldedAddress, origin: window.location.origin })
  }));
  const signed = await api.signData(challenge.message, { encoding: 'text', keyType: 'unshielded' });
  if (signed.data !== challenge.message) throw new Error('Wallet signed unexpected authentication data.');
  const session = await responseJson<Session>(await fetch(`${API_URL}/api/v1/auth/sessions`, {
    method: 'POST',
    credentials: 'include',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({
      challenge_id: challenge.challenge_id,
      data: signed.data,
      signature: signed.signature,
      verifying_key: signed.verifyingKey
    })
  }));
  if (!session.merchant_id) {
    await responseJson(await fetch(`${API_URL}/api/v1/merchants`, {
      method: 'POST',
      credentials: 'include',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ name: 'LumaPay Merchant' })
    }));
  }
  return session;
}

export async function signOutWallet(): Promise<void> {
  const response = await fetch(`${API_URL}/api/v1/auth/session`, {
    method: 'DELETE',
    credentials: 'include'
  });
  if (!response.ok && response.status !== 401) {
    throw new Error('LumaPay could not close the backend session.');
  }
}
