import React from 'react';
import { AlertTriangle, ExternalLink } from 'lucide-react';
import { GlassCard } from '../../../components/ui/GlassCard';

export const MpcGuide: React.FC = () => {
    return (
        <div className="space-y-8">
            <GlassCard className="p-8 md:p-10">
                <span className="text-[11px] uppercase tracking-[0.25em] text-gray-500 font-semibold">MCP Setup</span>
                <h2 className="text-3xl font-bold tracking-tighter text-transparent bg-clip-text bg-gradient-to-r from-orange-400 via-orange-300 to-orange-500 drop-shadow-[0_0_15px_rgba(249,115,22,0.3)] mt-3 mb-2">
                    There Is No Published LumaPay MCP Package Yet
                </h2>
                <p className="text-gray-400 text-sm leading-relaxed mb-6 max-w-4xl">
                    <code className="text-orange-200 bg-orange-500/10 border border-orange-400/15 px-1.5 py-0.5 rounded">@lumapay/mcp</code> is not
                    a real package — do not run <code className="text-white bg-white/5 px-1.5 py-0.5 rounded">npx -y @lumapay/mcp</code> or enter
                    your LumaPay password or wallet recovery phrase into anything claiming to be it. A LumaPay-specific MCP server hasn't been built
                    yet, and until it has, any tool advertising itself as one is not affiliated with LumaPay.
                </p>

                <div className="rounded-2xl border border-red-400/25 bg-red-500/10 px-5 py-5 flex gap-3">
                    <AlertTriangle className="w-5 h-5 text-red-300 shrink-0 mt-0.5" />
                    <p className="text-sm text-red-100 leading-relaxed">
                        Never paste a wallet recovery phrase, private key, or your LumaPay app password into an AI client, MCP prompt, or
                        environment variable for any tool. LumaPay's burner wallet password only ever lives in your browser — no legitimate
                        LumaPay flow asks for it anywhere else.
                    </p>
                </div>
            </GlassCard>

            <GlassCard className="p-8 md:p-10">
                <h3 className="text-2xl font-bold text-gradient-gold drop-shadow-gold mb-3">Use the Midnight MCP Server Instead</h3>
                <p className="text-sm text-gray-300 leading-relaxed mb-4">
                    For working with LumaPay's contracts, SDK, and network integration, use the official Midnight MCP server for authoritative
                    Compact, SDK, and deployment guidance — it's real, published, and maintained by the Midnight team, not LumaPay.
                </p>
                <a
                    href="https://docs.midnight.network"
                    target="_blank"
                    rel="noreferrer"
                    className="inline-flex items-center gap-2 text-sm font-semibold text-orange-300 hover:text-orange-200 transition"
                >
                    Midnight Network documentation <ExternalLink className="w-3.5 h-3.5" />
                </a>
            </GlassCard>

            <GlassCard className="p-8 md:p-10">
                <h3 className="text-2xl font-bold text-gradient-gold drop-shadow-gold mb-3">What's Actually Safe to Automate Today</h3>
                <div className="space-y-4 text-sm text-gray-300 leading-relaxed">
                    <p>
                        LumaPay's public HTTP API — the same one this dashboard runs on, documented in the other tabs above — covers invoice
                        creation, checkout sessions, and webhooks without ever needing a private key or password. Calling it directly with any
                        HTTP client is the supported way to integrate LumaPay into an agent or script today.
                    </p>
                    <p>
                        A future LumaPay MCP surface would only expose safe, non-custodial actions — deployment status, contract identifiers,
                        public invoice state, checkout metadata — and would never accept or return mnemonics, seeds, private-state passwords,
                        invoice openings, or claim secrets.
                    </p>
                </div>
            </GlassCard>
        </div>
    );
};

export default MpcGuide;
