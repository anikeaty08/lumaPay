import { Clock, Lock, Shield, TrendingUp } from 'lucide-react';
import type { DocsSection } from '../types';
import { Callout, CodeBlock, MetricCard } from '../ui';
import { GlassCard } from '../../../../shared/components/ui/GlassCard';

const oracleStatusExample = `// GET /api/oracle/status
// Current Preprod behavior:
{
  "network": "preprod",
  "live_payment_asset": "NIGHT",
  "cross_token_quotes_enabled": false,
  "reason": "No native stable-token contracts are deployed for this LumaPay Preprod build."
}`;

export const oracleApiSection: DocsSection = {
    id: 'api-oracle',
    group: 'Endpoints',
    label: 'Oracle',
    eyebrow: 'API Reference',
    title: 'Oracle API — Preprod status',
    summary:
        'Cross-token quote APIs are not exposed in the active Preprod build. LumaPay checkout uses native NIGHT settlement only.',
    content: (
        <div className="space-y-6">
            <div className="grid gap-5 md:grid-cols-4">
                <MetricCard icon={TrendingUp} title="No live quotes" description="Cross-token pricing is disabled for this Preprod build." />
                <MetricCard icon={Lock} title="NIGHT only" description="Checkout sessions, invoices, and payment adapters settle in NIGHT." />
                <MetricCard icon={Clock} title="No stale expiry" description="There are no quote-expiry semantics until quote generation is reintroduced." />
                <MetricCard icon={Shield} title="No fake assets" description="The API docs do not advertise unavailable token routes." />
            </div>

            <CodeBlock title="Oracle status" language="json" code={oracleStatusExample} />

            <GlassCard className="p-6">
                <h3 className="mb-4 text-xl font-bold text-white">Re-enabling requirements</h3>
                <p className="text-sm leading-relaxed text-gray-400">
                    Quote endpoints should only return after the app has real native Midnight token contracts, Compact conversion circuits, backend validation, SDK support, and wallet-approved end-to-end tests.
                </p>
            </GlassCard>

            <Callout title="Client usage" tone="blue">
                Current clients should send <code className="rounded bg-white/10 px-1.5 py-0.5">currency: 'NIGHT'</code> and use the standard hosted checkout or direct wallet payment flow.
            </Callout>
        </div>
    ),
};
