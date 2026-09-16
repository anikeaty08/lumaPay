import { useEffect, useRef, useState } from 'react';
import { API_URL } from '../../../midnight/config';
import type { CheckoutSession } from '../../types/checkout';

const TERMINAL_STATUSES = new Set(['SETTLED', 'FAILED']);
const POLL_INTERVAL_MS = 3_000;

async function readCheckoutSession(sessionId: string, signal?: AbortSignal): Promise<CheckoutSession> {
    const response = await fetch(
        `${API_URL}/api/v1/checkout-sessions/${encodeURIComponent(sessionId)}`,
        { credentials: 'include', signal },
    );
    const body = await response.json().catch(() => null);
    if (!response.ok) {
        if (response.status === 404) throw new Error('Checkout session not found.');
        throw new Error(body?.error?.message || 'Failed to load checkout details.');
    }
    return body as CheckoutSession;
}

function redirectAfterSettlement(session: CheckoutSession): number | undefined {
    if (session.status !== 'SETTLED' || !session.success_url) return undefined;
    return window.setTimeout(() => {
        const url = new URL(session.success_url!, window.location.origin);
        url.searchParams.set('session_id', session.id);
        window.location.assign(url.toString());
    }, 3_000);
}

export const useCheckoutSession = (sessionId: string | undefined) => {
    const [session, setSession] = useState<CheckoutSession | null>(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState<string | null>(null);
    const redirected = useRef(false);

    useEffect(() => {
        if (!sessionId) {
            setError('Invalid checkout URL.');
            setLoading(false);
            return;
        }

        const controller = new AbortController();
        let pollTimer: number | undefined;
        let redirectTimer: number | undefined;
        let active = true;

        const poll = async (initial = false) => {
            try {
                const next = await readCheckoutSession(sessionId, controller.signal);
                if (!active) return;
                setSession(next);
                setError(null);
                if (next.status === 'SETTLED' && !redirected.current) {
                    redirected.current = true;
                    redirectTimer = redirectAfterSettlement(next);
                }
                if (!TERMINAL_STATUSES.has(next.status)) {
                    pollTimer = window.setTimeout(() => void poll(), POLL_INTERVAL_MS);
                }
            } catch (cause) {
                if (!active || controller.signal.aborted) return;
                setError(cause instanceof Error ? cause.message : 'Failed to load checkout details.');
                if (!initial) pollTimer = window.setTimeout(() => void poll(), POLL_INTERVAL_MS);
            } finally {
                if (initial && active) setLoading(false);
            }
        };

        void poll(true);
        return () => {
            active = false;
            controller.abort();
            if (pollTimer !== undefined) window.clearTimeout(pollTimer);
            if (redirectTimer !== undefined) window.clearTimeout(redirectTimer);
        };
    }, [sessionId]);

    return { session, loading, error };
};
