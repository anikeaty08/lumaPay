import { FileCode2, Hash, Lock, Wallet } from 'lucide-react';
import type { DocsSection } from '../types';
import { GlassCard } from '../../../../shared/components/ui/GlassCard';
import { Callout } from '../ui';

export const transitionReferenceSection: DocsSection = {
    id: 'qr-transitions',
    group: 'Contracts',
    label: 'Transitions',
    eyebrow: 'Quick Reference',
    title: 'Smart Contract Transition Reference',
    summary: 'Quick reference for the active LumaPay Compact suite on Midnight Preprod. Live payment execution is NIGHT-only.',
    content: (
        <div className="space-y-6">
            <GlassCard className="p-6">
                <h3 className="mb-4 flex items-center gap-2 text-lg font-bold text-white">
                    <FileCode2 className="h-5 w-5 text-orange-300" />
                    Invoice Core and Campaign Contracts
                </h3>
                <div className="overflow-x-auto">
                    <table className="w-full text-sm">
                        <thead>
                            <tr className="border-b border-white/[0.08]">
                                <th className="px-3 py-2 text-left text-[10px] font-black uppercase tracking-widest text-gray-500">Circuit</th>
                                <th className="px-3 py-2 text-left text-[10px] font-black uppercase tracking-widest text-gray-500">Purpose</th>
                                <th className="px-3 py-2 text-left text-[10px] font-black uppercase tracking-widest text-gray-500">Asset</th>
                                <th className="px-3 py-2 text-left text-[10px] font-black uppercase tracking-widest text-gray-500">Module</th>
                            </tr>
                        </thead>
                        <tbody className="text-gray-300">
                            <tr className="border-b border-white/[0.04]"><td className="px-3 py-2 font-mono text-xs text-orange-300">create_invoice</td><td className="px-3 py-2 text-xs">Create a fixed-amount invoice opening</td><td className="px-3 py-2 text-xs">NIGHT</td><td className="px-3 py-2 text-xs">Invoice Core</td></tr>
                            <tr className="border-b border-white/[0.04]"><td className="px-3 py-2 font-mono text-xs text-orange-300">pay_invoice</td><td className="px-3 py-2 text-xs">Settle an open invoice</td><td className="px-3 py-2 text-xs">NIGHT</td><td className="px-3 py-2 text-xs">Invoice Core</td></tr>
                            <tr className="border-b border-white/[0.04]"><td className="px-3 py-2 font-mono text-xs text-orange-300">cancel_invoice</td><td className="px-3 py-2 text-xs">Cancel an unpaid invoice</td><td className="px-3 py-2 text-xs">NIGHT</td><td className="px-3 py-2 text-xs">Invoice Core</td></tr>
                            <tr className="border-b border-white/[0.04]"><td className="px-3 py-2 font-mono text-xs text-orange-300">expire_invoice</td><td className="px-3 py-2 text-xs">Expire stale invoice state</td><td className="px-3 py-2 text-xs">NIGHT</td><td className="px-3 py-2 text-xs">Invoice Core</td></tr>
                            <tr className="border-b border-white/[0.04]"><td className="px-3 py-2 font-mono text-xs text-orange-300">claim_invoice</td><td className="px-3 py-2 text-xs">Expose verified merchant claim material</td><td className="px-3 py-2 text-xs">NIGHT</td><td className="px-3 py-2 text-xs">Invoice Core</td></tr>
                            <tr className="border-b border-white/[0.04]"><td className="px-3 py-2 font-mono text-xs text-orange-300">create_campaign</td><td className="px-3 py-2 text-xs">Create a reusable payment/donation opening</td><td className="px-3 py-2 text-xs">NIGHT</td><td className="px-3 py-2 text-xs">Campaigns</td></tr>
                            <tr><td className="px-3 py-2 font-mono text-xs text-orange-300">contribute_campaign</td><td className="px-3 py-2 text-xs">Settle a campaign payment</td><td className="px-3 py-2 text-xs">NIGHT</td><td className="px-3 py-2 text-xs">Campaigns</td></tr>
                        </tbody>
                    </table>
                </div>
            </GlassCard>

            <GlassCard className="p-6">
                <h3 className="mb-4 flex items-center gap-2 text-lg font-bold text-white">
                    <Wallet className="h-5 w-5 text-blue-300" />
                    Card, Gift Card, Checkout, and Backup Contracts
                </h3>
                <div className="overflow-x-auto">
                    <table className="w-full text-sm">
                        <thead>
                            <tr className="border-b border-white/[0.08]">
                                <th className="px-3 py-2 text-left text-[10px] font-black uppercase tracking-widest text-gray-500">Circuit</th>
                                <th className="px-3 py-2 text-left text-[10px] font-black uppercase tracking-widest text-gray-500">Purpose</th>
                                <th className="px-3 py-2 text-left text-[10px] font-black uppercase tracking-widest text-gray-500">Module</th>
                            </tr>
                        </thead>
                        <tbody className="text-gray-300">
                            <tr className="border-b border-white/[0.04]"><td className="px-3 py-2 font-mono text-xs text-blue-300">create_card_vault</td><td className="px-3 py-2 text-xs">Create a card-vault record</td><td className="px-3 py-2 text-xs">Card Vault</td></tr>
                            <tr className="border-b border-white/[0.04]"><td className="px-3 py-2 font-mono text-xs text-blue-300">set_card_daily_limit</td><td className="px-3 py-2 text-xs">Update the card NIGHT cap</td><td className="px-3 py-2 text-xs">Card Vault</td></tr>
                            <tr className="border-b border-white/[0.04]"><td className="px-3 py-2 font-mono text-xs text-blue-300">close_card</td><td className="px-3 py-2 text-xs">Close a card-vault record</td><td className="px-3 py-2 text-xs">Card Vault</td></tr>
                            <tr className="border-b border-white/[0.04]"><td className="px-3 py-2 font-mono text-xs text-blue-300">create_gift_card_record</td><td className="px-3 py-2 text-xs">Create a NIGHT gift-card record</td><td className="px-3 py-2 text-xs">Gift Cards</td></tr>
                            <tr className="border-b border-white/[0.04]"><td className="px-3 py-2 font-mono text-xs text-blue-300">redeem_gift_card</td><td className="px-3 py-2 text-xs">Redeem a NIGHT gift-card record</td><td className="px-3 py-2 text-xs">Gift Cards</td></tr>
                            <tr className="border-b border-white/[0.04]"><td className="px-3 py-2 font-mono text-xs text-blue-300">record_checkout_quote</td><td className="px-3 py-2 text-xs">Anchor checkout quote metadata</td><td className="px-3 py-2 text-xs">Quote Checkout</td></tr>
                            <tr><td className="px-3 py-2 font-mono text-xs text-blue-300">anchor_backup</td><td className="px-3 py-2 text-xs">Anchor encrypted recovery metadata</td><td className="px-3 py-2 text-xs">Backup Anchor</td></tr>
                        </tbody>
                    </table>
                </div>
            </GlassCard>

            <div className="grid gap-4 md:grid-cols-3">
                <GlassCard className="p-5">
                    <div className="mb-3 flex items-center gap-2">
                        <Lock className="h-4 w-4 text-orange-300" />
                        <h4 className="text-sm font-bold text-white">Invoice Type Codes</h4>
                    </div>
                    <div className="space-y-1 text-xs text-gray-400">
                        <div className="flex justify-between"><span className="font-mono text-orange-300">0u8</span><span>Standard</span></div>
                        <div className="flex justify-between"><span className="font-mono text-orange-300">1u8</span><span>Multi-pay</span></div>
                        <div className="flex justify-between"><span className="font-mono text-orange-300">2u8</span><span>Donation/campaign</span></div>
                    </div>
                </GlassCard>
                <GlassCard className="p-5">
                    <div className="mb-3 flex items-center gap-2">
                        <Hash className="h-4 w-4 text-blue-300" />
                        <h4 className="text-sm font-bold text-white">Token Type Codes</h4>
                    </div>
                    <div className="space-y-1 text-xs text-gray-400">
                        <div className="flex justify-between"><span className="font-mono text-blue-300">0u8</span><span>NIGHT</span></div>
                        <div className="flex justify-between"><span className="font-mono text-blue-300">3u8</span><span>ANY resolves to NIGHT on Preprod</span></div>
                    </div>
                </GlassCard>
                <GlassCard className="p-5">
                    <div className="mb-3 flex items-center gap-2">
                        <Wallet className="h-4 w-4 text-emerald-300" />
                        <h4 className="text-sm font-bold text-white">Status Codes</h4>
                    </div>
                    <div className="space-y-1 text-xs text-gray-400">
                        <div className="flex justify-between"><span className="font-mono text-emerald-300">0u8</span><span>Open</span></div>
                        <div className="flex justify-between"><span className="font-mono text-emerald-300">1u8</span><span>Settled</span></div>
                    </div>
                </GlassCard>
            </div>

            <Callout title="Preprod execution rule" tone="blue">
                LumaPay exposes only real Midnight Preprod execution paths. Stablecoin and cross-token shortcuts are not documented or rendered until native contracts exist for those assets.
            </Callout>
        </div>
    ),
};
