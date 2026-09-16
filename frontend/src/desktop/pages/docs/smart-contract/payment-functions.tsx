import { ShieldCheck, Zap, Shield } from 'lucide-react';
import type { DocsSection } from '../types';
import { Callout, CodeBlock } from '../ui';
import { GlassCard } from '../../../../shared/components/ui/GlassCard';

const payInvoiceExample = `export circuit payInvoice(
  invoiceId: Bytes<32>,
  merchantPrivateIdentity: Bytes<32>,
  amount: Uint<64>,
  tokenType: Bytes<32>,
  invoiceNonce: Bytes<32>,
  invoiceRandomness: Bytes<32>,
  paymentSecret: Bytes<32>,
  receiptSecret: Bytes<32>,
  coin: CoinInfo
): [] {
  // Recompute the invoice commitment.
  // Verify lifecycle state and expiry.
  // Bind escrow coin material to the paid invoice.
  // Record receipt/claim material for reconciliation.
}`;

export const paymentFunctionsSection: DocsSection = {
    id: 'sc-payments',
    group: 'Contract Functions',
    label: 'Payment Circuits',
    eyebrow: 'Smart Contract',
    title: 'Payment Circuits — Native Midnight Settlement',
    summary:
        'Payment circuits validate a private payment opening against the committed invoice and produce settlement material for backend reconciliation and merchant claims.',
    content: (
        <div className="space-y-6">
            <div className="grid gap-4 md:grid-cols-2">
                <GlassCard className="p-6">
                    <div className="mb-4 flex items-center gap-2">
                        <Zap className="h-5 w-5 text-yellow-400" />
                        <h3 className="text-lg font-bold text-white">Atomic settlement</h3>
                    </div>
                    <p className="text-sm text-gray-400 leading-relaxed">
                        A payment is accepted only when the private opening matches the invoice commitment, amount, token id, lifecycle state, and expiry rules. Invalid payments are rejected before merchant reconciliation.
                    </p>
                </GlassCard>
                <GlassCard className="p-6">
                    <div className="mb-4 flex items-center gap-2">
                        <ShieldCheck className="h-5 w-5 text-emerald-400" />
                        <h3 className="text-lg font-bold text-white">Private receipt material</h3>
                    </div>
                    <p className="text-sm text-gray-400 leading-relaxed">
                        The wallet produces payment and receipt secrets locally. LumaPay stores only the material needed to prove settlement and support merchant claim flows.
                    </p>
                </GlassCard>
            </div>

            <GlassCard className="overflow-hidden p-0">
                <div className="border-b border-white/[0.08] bg-white/[0.02] px-6 py-4">
                    <div className="flex items-center gap-3">
                        <Shield className="h-4 w-4 text-orange-300" />
                        <p className="text-[10px] font-black uppercase tracking-widest text-orange-300">Circuit: payInvoice</p>
                    </div>
                </div>
                <div className="px-6 py-5">
                    <p className="mb-4 text-sm text-gray-400">
                        The active Preprod payment path is native NIGHT through the Midnight wallet connector and LumaPay Compact contract adapter.
                    </p>
                    <CodeBlock title="Native payment circuit shape" language="compact" code={payInvoiceExample} />
                </div>
            </GlassCard>

            <GlassCard className="p-6">
                <h3 className="mb-4 text-xl font-bold text-white">The integrity checks</h3>
                <div className="space-y-4">
                    {[
                        { title: 'Commitment match', desc: 'The circuit recomputes the invoice commitment from private opening material.' },
                        { title: 'Amount match', desc: 'The paid amount must equal the committed invoice amount, except donation flows that explicitly allow variable amounts.' },
                        { title: 'Token policy', desc: 'The current Preprod adapter accepts native NIGHT only.' },
                        { title: 'Lifecycle guard', desc: 'Cancelled, expired, and settled invoices cannot be paid again.' },
                        { title: 'Receipt binding', desc: 'Payment secrets and receipt secrets are bound to the invoice id for later verification.' },
                    ].map((step, index) => (
                        <div key={step.title} className="flex items-start gap-4 rounded-lg border border-white/[0.04] bg-white/[0.01] p-3">
                            <div className="flex h-6 w-6 shrink-0 items-center justify-center rounded-full bg-orange-500/20 text-orange-400 font-mono text-[10px]">{index + 1}</div>
                            <div>
                                <h4 className="text-sm font-bold text-white">{step.title}</h4>
                                <p className="text-xs text-gray-500 leading-relaxed">{step.desc}</p>
                            </div>
                        </div>
                    ))}
                </div>
            </GlassCard>

            <Callout title="Preprod token scope" tone="orange">
                Cross-token examples are intentionally absent from the active docs. Additional assets require real native Midnight contracts before they can be reintroduced.
            </Callout>
        </div>
    ),
};
