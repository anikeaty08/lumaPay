import { useEffect, useState } from 'react';
import { createCampaignOnChain, type CampaignRecoveryBundle } from '../../../midnight/campaign';
import { API_URL } from '../../../midnight/config';
import { useLeaveGuard } from '../app/LeaveGuardProvider';
import { useWallet } from '../wallet/WalletProvider';

type StoredProfileCampaign = {
    campaignId: string;
    campaignNonce: string;
    paymentUrl: string;
};

function encodeOpening(value: unknown): string {
    const bytes = new TextEncoder().encode(JSON.stringify(value));
    let binary = '';
    for (const byte of bytes) binary += String.fromCharCode(byte);
    return btoa(binary).replaceAll('+', '-').replaceAll('/', '_').replaceAll('=', '');
}

function profileKey(address: string): string {
    return `lumapay:profile-campaign:${address}`;
}

async function registerProfileCampaign(recovery: CampaignRecoveryBundle, opening: Record<string, unknown>): Promise<void> {
    const response = await fetch(`${API_URL}/api/v1/campaigns`, {
        method: 'POST',
        credentials: 'include',
        headers: { 'content-type': 'application/json' },
        body: JSON.stringify({
            campaign_id: recovery.campaignId,
            commitment: recovery.commitment,
            merchant_authorization: recovery.merchantAuthorization,
            expiry: recovery.expiry,
            payment_opening: opening,
            creation_tx_id: recovery.transactionId,
        }),
    });
    if (!response.ok) {
        const payload = await response.json().catch(() => null);
        throw new Error(payload?.error?.message ?? 'Profile campaign registration failed.');
    }
}

export const useProfileQR = () => {
    const { address, api } = useWallet();
    const { setGuard, clearGuard } = useLeaveGuard();
    const [loading, setLoading] = useState(false);
    const [status, setStatus] = useState('');
    const [profile, setProfile] = useState<StoredProfileCampaign | null>(null);

    useEffect(() => {
        if (!address) {
            setProfile(null);
            return;
        }
        try {
            const stored = JSON.parse(localStorage.getItem(profileKey(address)) || 'null');
            setProfile(stored?.campaignId && stored?.paymentUrl ? stored : null);
        } catch {
            setProfile(null);
        }
    }, [address]);

    const initializeQRs = async () => {
        if (!address || !api) {
            setStatus('Connect a Midnight wallet first.');
            return;
        }
        if (profile) {
            setStatus('Your reusable profile QR is already active.');
            return;
        }

        setLoading(true);
        setStatus('Creating a reusable private payment campaign...');
        setGuard({
            active: true,
            title: 'Profile QR setup in progress',
            message: 'Your wallet is creating the reusable Campaigns contract proof. Keep this page open until it is submitted.',
            confirmLabel: 'Leave anyway',
            cancelLabel: 'Stay',
        });
        try {
            const expiry = BigInt(Math.floor(Date.now() / 1_000) + 366 * 24 * 60 * 60);
            const recovery: CampaignRecoveryBundle = await createCampaignOnChain(api, {
                minimumContribution: 1n,
                maximumContribution: (1n << 128n) - 1n,
                acceptedTokens: ['NIGHT'],
                expiry,
            });
            const opening = {
                kind: recovery.kind,
                merchant: address,
                campaignId: recovery.campaignId,
                minimumContribution: recovery.minimumContribution,
                maximumContribution: recovery.maximumContribution,
                acceptedTokens: recovery.acceptedTokens,
                acceptedTokenIds: recovery.acceptedTokenIds,
                expiry: recovery.expiry,
                merchantPrivateIdentity: recovery.merchantPrivateIdentity,
                campaignNonce: recovery.campaignNonce,
                campaignRandomness: recovery.campaignRandomness,
                title: 'Profile payment',
            };
            const paymentUrl = `${window.location.origin}/pay?opening=${encodeURIComponent(encodeOpening(opening))}`;
            const stored = {
                campaignId: recovery.campaignId,
                campaignNonce: recovery.campaignNonce,
                paymentUrl,
            };
            localStorage.setItem(`lumapay:recovery:${recovery.campaignId}`, JSON.stringify(recovery));
            setStatus('Registering your profile campaign with the LumaPay backend...');
            await registerProfileCampaign(recovery, opening);
            localStorage.setItem(profileKey(address), JSON.stringify(stored));
            setProfile(stored);
            setStatus('Reusable profile QR created on Midnight Preprod.');
        } catch (cause) {
            setStatus(`Error: ${cause instanceof Error ? cause.message : 'Profile QR creation failed.'}`);
        } finally {
            clearGuard();
            setLoading(false);
        }
    };

    return {
        initialized: Boolean(profile),
        loading,
        status,
        mainHash: profile?.campaignId ?? null,
        mainSalt: profile?.campaignNonce ?? null,
        mainPaymentUrl: profile?.paymentUrl ?? null,
        burnerHash: null,
        burnerSalt: null,
        burnerPaymentUrl: null,
        initializeQRs,
    };
};
