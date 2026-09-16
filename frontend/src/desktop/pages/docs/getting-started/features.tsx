import { Activity, Bot, Gift, GitBranch, Package, QrCode, Shield, Sparkles, Wallet } from 'lucide-react';
import type { DocsSection } from '../types';
import { Callout, MetricCard } from '../ui';

export const featuresSection: DocsSection = {
    id: 'gs-features',
    group: 'Overview',
    label: 'Features',
    eyebrow: 'Features',
    title: 'Core product features',
    summary:
        'LumaPay spans far beyond a single invoice contract. The Preprod build focuses live execution on native NIGHT payments, merchant infrastructure, SDK and CLI tooling, hosted checkout, MCP integrations, gift cards, batch payments, and merchant-facing operational features.',
    content: (
        <div className="space-y-6">
            <div className="grid gap-5 md:grid-cols-2 xl:grid-cols-3">
                <MetricCard
                    icon={Shield}
                    title="Zero-Knowledge Invoices"
                    description="Merchant addresses and amounts are hashed on-chain using BHP256, preserving privacy. Only the invoice hash appears publicly; the actual commercial details stay off-chain or encrypted."
                />
                <MetricCard
                    icon={Wallet}
                    title="NIGHT on Preprod"
                    description="Live Preprod execution uses native NIGHT. Other asset choices are not exposed in this build."
                />
                <MetricCard
                    icon={GitBranch}
                    title="Standard, Multipay, and Donation"
                    description="Single-settlement invoices for one-time payments, multi-contributor campaigns for crowdfunding, and open-ended donation flows. Preprod settlement is NIGHT-only."
                />
                <MetricCard
                    icon={Package}
                    title="Node &amp; Python SDKs"
                    description="Backend SDKs for Node.js and Python create hosted checkout sessions, retrieve sessions, verify webhooks, and read local invoice manifests so merchant apps stay server-first."
                />
                <MetricCard
                    icon={Sparkles}
                    title="CLI Onboarding Wizard"
                    description="Interactive onboarding handles invoice generation, salt creation, relayer-assisted setup, and writing lumapay.json so merchants don't hand-roll salts and manifest files."
                />
                <MetricCard
                    icon={Bot}
                    title="MCP Server for AI Clients"
                    description="LumaPay MCP makes invoice creation, payment, and transaction inspection available in clients like Claude, Codex, OpenClaw, Cursor, and Antigravity."
                />
                <MetricCard
                    icon={Activity}
                    title="Settlement Integrity"
                    description="Wallet-approved Midnight payments carry the private proof material needed for settlement and merchant claim flows."
                />
                <MetricCard
                    icon={QrCode}
                    title="Profile QR &amp; Payment Links"
                    description="Persistent payment links tied to merchant wallet. Shareable QR codes and copy-link buttons for fast buyer handoff without backend integration."
                />
                <MetricCard
                    icon={Gift}
                    title="Gift Cards &amp; Batch Payments"
                    description="On-chain gift card records with private ownership. Batch payment UIs for payroll, disbursements, and multi-recipient transfers from a single interface."
                />
            </div>

            <Callout title="Feature takeaway" tone="emerald">
                The biggest thing to understand is that LumaPay is already opinionated about the whole merchant lifecycle:
                invoice definition, checkout session creation, buyer payment UX, backend fulfillment, realtime status, native
                NIGHT settlement (cross-token Oracle conversion is a future wave), and AI-assisted operations all share one
                underlying payment model backed by Midnight ZK proofs.
            </Callout>
        </div>
    ),
};


