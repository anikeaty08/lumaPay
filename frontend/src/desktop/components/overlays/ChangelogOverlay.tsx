import { useEffect, useState } from 'react';
import { AnimatePresence, motion } from 'framer-motion';
import { FileText, ShieldCheck, Wallet } from 'lucide-react';

const STORAGE_KEY = 'lumapay_wave1_welcome';

const features = [
    { icon: FileText, title: 'Private invoices', description: 'Create invoice commitments and share a secure payment link without exposing commercial details publicly.' },
    { icon: Wallet, title: 'Midnight wallet connection', description: 'Connect a compatible Midnight wallet to create, review, and pay from the LumaPay app.' },
    { icon: ShieldCheck, title: 'Verifiable settlement', description: 'Use zero-knowledge proofs and private receipts to verify payment state on Midnight Preprod.' }
];

export const ChangelogOverlay = () => {
    const [visible, setVisible] = useState(false);

    useEffect(() => {
        if (!localStorage.getItem(STORAGE_KEY)) setVisible(true);
    }, []);

    const close = () => {
        localStorage.setItem(STORAGE_KEY, 'true');
        setVisible(false);
    };

    return (
        <AnimatePresence>
            {visible && (
                <div className="fixed inset-0 z-[100] flex items-center justify-center p-4">
                    <motion.button aria-label="Close LumaPay Wave 1 welcome" className="absolute inset-0 cursor-default bg-black/80 backdrop-blur-xl" initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} onClick={close} />
                    <motion.section role="dialog" aria-modal="true" aria-label="LumaPay Wave 1" className="relative w-full max-w-2xl overflow-hidden rounded-3xl border border-white/10 bg-[#090909] p-7 shadow-2xl md:p-10" initial={{ opacity: 0, y: 20, scale: 0.97 }} animate={{ opacity: 1, y: 0, scale: 1 }} exit={{ opacity: 0, y: 12, scale: 0.98 }}>
                        <div className="absolute -right-20 -top-20 h-64 w-64 rounded-full bg-orange-500/15 blur-3xl" />
                        <div className="relative">
                            <p className="mb-5 text-[10px] font-bold uppercase tracking-[0.28em] text-orange-300">LumaPay · Wave 1 · First release</p>
                            <h2 className="text-3xl font-black tracking-tight text-white md:text-4xl">Private payments, built for Midnight.</h2>
                            <p className="mt-4 max-w-xl text-sm leading-7 text-white/55">Welcome to the LumaPay first wave. Start with a wallet, an invoice, and a private payment flow.</p>
                            <div className="mt-8 grid gap-3">
                                {features.map(({ icon: Icon, title, description }) => (
                                    <div key={title} className="flex gap-4 rounded-2xl border border-white/[0.07] bg-white/[0.03] p-4">
                                        <Icon className="mt-0.5 h-5 w-5 shrink-0 text-orange-300" />
                                        <div><h3 className="font-semibold text-white">{title}</h3><p className="mt-1 text-sm leading-6 text-white/45">{description}</p></div>
                                    </div>
                                ))}
                            </div>
                            <button onClick={close} className="mt-8 w-full rounded-xl bg-orange-500 px-5 py-3 text-sm font-bold text-white transition hover:bg-orange-400">Explore LumaPay</button>
                        </div>
                    </motion.section>
                </div>
            )}
        </AnimatePresence>
    );
};
