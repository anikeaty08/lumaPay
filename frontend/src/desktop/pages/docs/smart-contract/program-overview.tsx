import { Code2, GitBranch, Lock, Shield } from 'lucide-react';
import type { DocsSection } from '../types';
import { Callout, CodeBlock, MetricCard } from '../ui';
import { GlassCard } from '../../../../shared/components/ui/GlassCard';

const programHeaderExample = `pragma language_version >= 0.19;

contract LumaPayCore {
  // Ledger: invoice commitments, merchant authorization, lifecycle status
  // Circuits: createInvoice, payInvoice, cancelInvoice, expireInvoice, claimInvoice
}

contract LumaPayCardVault {
  // Ledger: card commitments, daily limits, closed-card flags
  // Circuits: createCard, setDailyLimit, closeCard
}`;

const tokenExecutionExample = `Active Preprod token execution:

- Native NIGHT payments are supported.
- No other asset is exposed as a live Preprod payment route.
- Wallet-approved transfers use Midnight DApp Connector APIs and LumaPay Compact contracts.
- Former-chain compatibility execution is not part of the active build.`;

export const programOverviewSection: DocsSection = {
    id: 'sc-overview',
    group: 'Program Architecture',
    label: 'Program Overview',
    eyebrow: 'Smart Contract',
    title: 'Contract programs, imports, and admin',
    summary:
        'LumaPay is deployed as a Compact contract suite on Midnight Preprod. Live payment execution is NIGHT-only; former test-token program paths are not part of the active build.',
    content: (
        <div className="space-y-6">
            <div className="grid gap-5 md:grid-cols-2 xl:grid-cols-4">
                <MetricCard
                    icon={Code2}
                    title="LumaPayCore"
                    description="The core invoice contract. Handles invoice creation, private payment validation, settlement lifecycle, and merchant claim material."
                />
                <MetricCard
                    icon={Shield}
                    title="LumaPayCardVault"
                    description="The card vault contract. Handles card commitments, daily limits, and card-close authorization."
                />
                <MetricCard
                    icon={GitBranch}
                    title="NIGHT-only Preprod"
                    description="Only native NIGHT payment paths are exposed in this Preprod build."
                />
                <MetricCard
                    icon={Lock}
                    title="Admin authority"
                    description="Admin operations are contract-gated and owned by the configured LumaPay deployer identity."
                />
            </div>

            <CodeBlock title="Compact contract structure" language="compact" code={programHeaderExample} />

            <GlassCard className="p-6">
                <h3 className="mb-4 text-xl font-bold text-white">Why separate contracts?</h3>
                <p className="mb-3 text-sm leading-relaxed text-gray-400">
                    The split between payment contracts and wallet/card contracts keeps value movement, lifecycle state, and card authorization isolated from each other.
                </p>
                <div className="grid gap-4 md:grid-cols-2">
                    <div className="space-y-2 rounded-lg border border-white/[0.08] bg-white/[0.02] p-5">
                        <p className="text-sm font-bold text-white">Core payment contract</p>
                        <ul className="space-y-1 text-xs leading-relaxed text-gray-400">
                            <li>Owns invoice commitments and payment lifecycle state.</li>
                            <li>Validates private payment openings against public commitments.</li>
                            <li>Produces receipt and escrow material used by merchant claims.</li>
                        </ul>
                    </div>
                    <div className="space-y-2 rounded-lg border border-white/[0.08] bg-white/[0.02] p-5">
                        <p className="text-sm font-bold text-white">Wallet/card contract</p>
                        <ul className="space-y-1 text-xs leading-relaxed text-gray-400">
                            <li>Owns card identity commitments and spending limits.</li>
                            <li>Keeps card lifecycle changes separate from invoice settlement.</li>
                            <li>Can evolve without changing invoice invariants.</li>
                        </ul>
                    </div>
                </div>
            </GlassCard>

            <CodeBlock title="Token execution policy" language="text" code={tokenExecutionExample} />

            <Callout title="Preprod policy" tone="orange">
                The active Preprod build supports native NIGHT execution. Stablecoin examples from the old docs were removed because they depended on unavailable test-token programs and should not be presented as live functionality.
            </Callout>
        </div>
    ),
};
