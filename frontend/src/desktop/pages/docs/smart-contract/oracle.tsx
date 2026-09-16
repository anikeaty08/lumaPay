import { Clock, Lock, Shield, Zap } from 'lucide-react';
import type { DocsSection } from '../types';
import { Callout, CodeBlock, MetricCard } from '../ui';
import { GlassCard } from '../../../../shared/components/ui/GlassCard';

const preprodOracleStatus = `// LumaPay Preprod oracle status

export const PREPROD_ORACLE_STATUS = {
  livePaymentAsset: 'NIGHT',
  crossTokenCheckout: false,
  reason: 'No native Midnight stable-token contracts are deployed for this app yet.',
};

// Runtime rule:
// - Create and pay invoices with NIGHT.
// - Do not expose cross-token payment choices in production UI.
// - Re-enable conversion only after real deployed token contracts exist.`;

export const oracleSection: DocsSection = {
    id: 'sc-oracle',
    group: 'Advanced Features',
    label: 'Oracle Conversion',
    eyebrow: 'Smart Contract',
    title: 'Oracle Conversion Status',
    summary:
        'Cross-token conversion is not part of the active Preprod payment surface. LumaPay currently exposes native NIGHT settlement only.',
    content: (
        <div className="space-y-6">
            <div className="grid gap-5 md:grid-cols-4">
                <MetricCard icon={Zap} title="NIGHT only" description="Hosted checkout, BatchPay, card funding, and gift cards use NIGHT on Preprod." />
                <MetricCard icon={Lock} title="No fake quotes" description="The frontend does not render inactive token choices or pretend conversion is available." />
                <MetricCard icon={Shield} title="Safe migration" description="Old compatibility execution was removed instead of shimmed into fake success states." />
                <MetricCard icon={Clock} title="Future extension" description="Oracle conversion can return after real Midnight token contracts and contract tests exist." />
            </div>

            <GlassCard className="p-6">
                <h3 className="mb-4 text-xl font-bold text-white">Current contract rule</h3>
                <p className="text-sm leading-relaxed text-gray-400">
                    LumaPay keeps token routing strict: active Preprod flows settle in NIGHT. Cross-token routing is intentionally absent from the visible app and docs until the token contracts, proofs, and wallet adapter support are deployed and verified.
                </p>
            </GlassCard>

            <CodeBlock title="Preprod oracle status" language="ts" code={preprodOracleStatus} />

            <Callout title="Implementation note" tone="orange">
                Do not restore conversion examples by pointing to old compatibility programs. The next valid implementation must be native Midnight end-to-end: deployed token contracts, typed Compact circuits, SDK adapters, backend validation, and wallet-approved E2E tests.
            </Callout>
        </div>
    ),
};
