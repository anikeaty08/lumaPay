import React, { useRef, useState } from 'react';
import toast from 'react-hot-toast';

// Invoice/campaign creation only ever saves its recovery bundle (the
// secrets needed to cancel, expire, or claim) to this browser's
// localStorage under lumapay:recovery:<id> — see useCreateInvoice.ts and
// useProfileInvoicesActions.ts's invoiceRecovery()/campaignRecovery(),
// which read from that exact key. There was previously no way back in:
// the error those functions throw explicitly says "Import its recovery
// JSON before managing it," but no import existed anywhere. This is that
// missing half, paired with the download button added to InvoiceCard.tsx.
export const ImportRecoveryButton: React.FC<{ onImported?: () => void }> = ({ onImported }) => {
    const inputRef = useRef<HTMLInputElement>(null);
    const [importing, setImporting] = useState(false);

    const handleFile = async (event: React.ChangeEvent<HTMLInputElement>) => {
        const file = event.target.files?.[0];
        event.target.value = '';
        if (!file) return;

        setImporting(true);
        try {
            const text = await file.text();
            const parsed = JSON.parse(text);
            const id = parsed?.kind === 'invoice' ? parsed.invoiceId
                : parsed?.kind === 'campaign' ? parsed.campaignId
                    : null;
            if (!id || typeof id !== 'string' || !/^[0-9a-f]{64}$/i.test(id) || !parsed?.merchantClaimSecret) {
                throw new Error('This file is not a valid LumaPay recovery backup.');
            }
            localStorage.setItem(`lumapay:recovery:${id}`, JSON.stringify(parsed));
            toast.success('Recovery backup imported. You can now manage this payment request from this browser.');
            onImported?.();
        } catch (cause) {
            toast.error(cause instanceof Error ? cause.message : 'Could not read that recovery file.');
        } finally {
            setImporting(false);
        }
    };

    return (
        <>
            <input
                ref={inputRef}
                type="file"
                accept="application/json"
                onChange={handleFile}
                className="hidden"
            />
            <button
                type="button"
                onClick={() => inputRef.current?.click()}
                disabled={importing}
                title="Restore a payment request's cancel/claim access using a recovery backup downloaded from another browser"
                className="inline-flex items-center gap-1.5 rounded-lg border border-white/10 bg-white/5 px-3 py-1.5 text-[11px] font-semibold text-gray-300 transition hover:border-orange-400/40 hover:text-orange-200 disabled:opacity-50"
            >
                {importing ? 'Importing…' : 'Import Recovery Backup'}
            </button>
        </>
    );
};
