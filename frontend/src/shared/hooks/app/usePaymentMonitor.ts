import { useEffect, useRef } from 'react';
import toast from 'react-hot-toast';
import { useWallet } from '../wallet/WalletProvider';

const POLL_INTERVAL_MS = 5_000;

function playPaymentSound() {
    try {
        const context = new (window.AudioContext || (window as any).webkitAudioContext)();
        const notes = [523.25, 659.25, 783.99];
        notes.forEach((frequency, index) => {
            const oscillator = context.createOscillator();
            const gain = context.createGain();
            const start = context.currentTime + index * 0.12;
            oscillator.frequency.value = frequency;
            gain.gain.setValueAtTime(0.2, start);
            gain.gain.exponentialRampToValueAtTime(0.001, start + 0.2);
            oscillator.connect(gain);
            gain.connect(context.destination);
            oscillator.start(start);
            oscillator.stop(start + 0.2);
        });
        window.setTimeout(() => void context.close(), 1_000);
    } catch {
        // Audio can be blocked until the user interacts with the page.
    }
}

export const usePaymentMonitor = () => {
    const { address, authenticated } = useWallet();
    const known = useRef<Map<string, { status: string; claimed: boolean }>>(new Map());

    useEffect(() => {
        if (!address || !authenticated || window.location.pathname === '/') return;
        let active = true;
        let timer: number | undefined;

        const poll = async () => {
            try {
                const { fetchInvoices } = await import('../../services/api');
                const invoices = await fetchInvoices();
                if (!active) return;
                for (const invoice of invoices) {
                    const previous = known.current.get(invoice.invoice_hash);
                    const current = { status: invoice.status, claimed: Boolean(invoice.claimed) };
                    known.current.set(invoice.invoice_hash, current);
                    if (!previous) continue;
                    if (previous.status !== 'SETTLED' && current.status === 'SETTLED') {
                        playPaymentSound();
                        toast.success(`Payment received for invoice ${invoice.invoice_hash.slice(0, 8)}…`, {
                            id: `settled:${invoice.invoice_hash}`,
                            duration: 6_000,
                        });
                    } else if (!previous.claimed && current.claimed) {
                        toast.success(`Funds claimed for invoice ${invoice.invoice_hash.slice(0, 8)}…`, {
                            id: `claimed:${invoice.invoice_hash}`,
                            duration: 5_000,
                        });
                    }
                }
            } catch {
                // Authentication and indexer transitions are retried by the next poll.
            } finally {
                if (active) timer = window.setTimeout(() => void poll(), POLL_INTERVAL_MS);
            }
        };

        void poll();
        return () => {
            active = false;
            if (timer !== undefined) window.clearTimeout(timer);
        };
    }, [address, authenticated]);
};
