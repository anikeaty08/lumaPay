import { useMemo, useState } from 'react';
import { tokenLabel, invoiceTypeLabel, walletLabel } from '../../../../../utils/midnight/midnightUtils';
import { sweepBurnerFundsToDestination } from '../../../../../utils/burner/burnerSweep';
import { chatWithLumaBot } from '../../../../../services/api';
import type { LumaBotToolCall } from '../../../../../types/bot';
import type { BurnerSweepCurrency } from '../../../../../types/tokens';
import type {
    BotBalanceView,
    DashboardChatbotProps,
    PendingToolCall,
    PendingToolMetadata,
} from '../../../../../types/lumabot';

interface LumaBotControllerParams extends DashboardChatbotProps {
    connected: boolean;
    address?: string | null;
    executeTransaction?: unknown;
    transactionStatus?: unknown;
    requestTransactionHistory?: unknown;
    navigate: (to: string) => void;
    appPassword?: string | null;
    decryptedBurnerAddress?: string | null;
    decryptedBurnerKey?: string | null;
    burnerBalances: BotBalanceView[];
    loadBurnerBalanceContext: () => Promise<BotBalanceView[]>;
    messages: Array<{ role: 'assistant' | 'user'; content: string }>;
    appendMessage: (message: { id: number; role: 'assistant' | 'user'; content: string }) => void;
    appendAssistantMessage: (content: string, invoiceData?: import('../../../../../types/invoice').InvoiceData) => void;
}

export const useLumaBotController = ({
    mainWalletAddress,
    burnerWalletAddress,
    balances,
    merchantStats,
    invoices,
    mainMerchantReceipts,
    burnerMerchantReceipts,
    payerReceipts,
    connected,
    address,
    executeTransaction,
    transactionStatus,
    requestTransactionHistory,
    navigate,
    appPassword,
    decryptedBurnerAddress,
    decryptedBurnerKey,
    burnerBalances,
    loadBurnerBalanceContext,
    messages,
    appendMessage,
    appendAssistantMessage,
}: LumaBotControllerParams) => {
    const [isThinking, setIsThinking] = useState(false);
    const [actionStatus, setActionStatus] = useState('');
    const [pendingToolCall, setPendingToolCall] = useState<PendingToolCall>(null);

    const dashboardContext = useMemo(() => {
        const route = typeof window === 'undefined' ? '' : window.location.pathname;

        return {
            mode: 'dashboard',
            route,
            wallet: {
                connected,
                address: address || mainWalletAddress,
                burnerAddress: decryptedBurnerAddress || burnerWalletAddress,
                hasAppPassword: Boolean(appPassword),
                burnerUnlocked: Boolean(decryptedBurnerKey),
            },
            walletAddresses: {
                main: mainWalletAddress,
                burner: burnerWalletAddress,
            },
            mainWalletBalances: balances.map((balance) => ({
                token: balance.name,
                publicBalance: balance.public,
                privateBalance: balance.private,
                loading: balance.loading,
            })),
            burnerWalletBalances: burnerBalances,
            stats: {
                totalInvoices: merchantStats.invoices,
                pendingInvoices: merchantStats.pending,
                settledInvoices: merchantStats.settled,
                mainVolume: {
                    credits: merchantStats.mainNIGHT,
                },
                burnerVolume: {
                    credits: merchantStats.burnerNIGHT,
                },
            },
            invoices: invoices.map((invoice) => ({
                invoiceHash: invoice.invoiceHash,
                amount: invoice.amount.toFixed(2),
                token: tokenLabel(invoice.tokenType),
                invoiceType: invoiceTypeLabel(invoice.invoiceType),
                wallet: walletLabel(invoice.walletType),
                status: invoice.status === 'SETTLED' || invoice.status === 1 ? 'SETTLED' : 'PENDING',
                memo: invoice.memo || '',
                donations: invoice.donations || null,
            })),
            merchantReceipts: {
                main: mainMerchantReceipts.map((receipt) => ({
                    receiptHash: receipt.receiptHash,
                    invoiceHash: receipt.invoiceHash,
                    amount: (Number(receipt.amount) / 1_000_000).toFixed(2),
                    token: tokenLabel(receipt.tokenType),
                    wallet: 'Main',
                })),
                burner: burnerMerchantReceipts.map((receipt) => ({
                    receiptHash: receipt.receiptHash,
                    invoiceHash: receipt.invoiceHash,
                    amount: (Number(receipt.amount) / 1_000_000).toFixed(2),
                    token: tokenLabel(receipt.tokenType),
                    wallet: 'Burner',
                })),
            },
            recentConversation: messages.slice(-8).map((message) => ({
                role: message.role,
                content: message.content,
            })),
            payerReceipts: payerReceipts.map((receipt) => ({
                receiptHash: receipt.receiptHash,
                invoiceHash: receipt.invoiceHash,
                amount: (Number(receipt.amount) / 1_000_000).toFixed(2),
                token: tokenLabel(receipt.tokenType),
                merchant: receipt.merchant,
            })),
        };
    }, [
        connected,
        address,
        appPassword,
        decryptedBurnerAddress,
        decryptedBurnerKey,
        mainWalletAddress,
        burnerWalletAddress,
        balances,
        burnerBalances,
        merchantStats,
        invoices,
        mainMerchantReceipts,
        burnerMerchantReceipts,
        messages,
        payerReceipts,
    ]);

    const buildPendingToolCall = (
        toolCall: LumaBotToolCall,
        metadata?: PendingToolMetadata
    ): PendingToolCall => ({
        name: toolCall.name,
        args: toolCall.args as Record<string, unknown>,
        missingArgs: toolCall.missingArgs || [],
        ...(metadata ? { metadata } : {}),
    });

    const prepareSweepFollowUp = async (
        toolCall: Extract<LumaBotToolCall, { name: 'sweep_funds' }>,
        fallbackReply: string
    ) => {
        if (!connected || !address) {
            appendAssistantMessage('Connect your main wallet first, then I can sweep burner funds into it.');
            return;
        }

        if (!decryptedBurnerAddress || !decryptedBurnerKey) {
            appendAssistantMessage('Your burner wallet is not unlocked right now. Unlock it first, then I can sweep funds from burner to main.');
            return;
        }

        setActionStatus('Scanning burner wallet records...');
        const freshBurnerBalances = await loadBurnerBalanceContext();
        const availableBurnerBalances: Record<BurnerSweepCurrency, number> = {
            NIGHT: Number(freshBurnerBalances.find((entry) => entry.token === 'NIGHT')?.privateBalance) || 0,
        };

        setPendingToolCall(buildPendingToolCall(toolCall, { availableBurnerBalances }));
        appendAssistantMessage([
            'Your burner wallet private balances are:',
            '',
            `- NIGHT: ${availableBurnerBalances.NIGHT.toFixed(2)}`,
            '',
            fallbackReply || 'Tell me how much NIGHT you want to sweep.',
            'Examples: `0.3 NIGHT` or `all NIGHT`.',
            'You can also say `cancel`.',
        ].join('\n'));
    };

    const executePlannedToolCall = async (toolCall: LumaBotToolCall) => {
        if (toolCall.name === 'connect_wallet') {
            appendAssistantMessage('Use the wallet button below to connect Shield. Once connected, I will use that browser wallet directly.');
            return;
        }

        if (toolCall.name === 'pay_invoice') {
            if (!toolCall.args.payment_link) {
                appendAssistantMessage('Share the LumaPay payment link and I will open the normal payment flow for you.');
                return;
            }

            const url = new URL(toolCall.args.payment_link);
            navigate(`/pay${url.search}`);
            appendAssistantMessage('I opened the in-app payment flow. Continue there and approve the payment with your wallet popup.');
            return;
        }

        if (toolCall.name === 'check_burner_balance') {
            if (!decryptedBurnerAddress || !decryptedBurnerKey) {
                appendAssistantMessage('Your burner wallet is not unlocked right now, so I cannot read its balances yet.');
                return;
            }

            setActionStatus('Scanning burner wallet records...');
            const resolvedBalances = await loadBurnerBalanceContext();
            appendAssistantMessage([
                'Your burner wallet balances are:',
                '',
                ...resolvedBalances.map((entry) => `- ${entry.token}: public ${entry.publicBalance}, private ${entry.privateBalance}`),
            ].join('\n'));
            return;
        }

        if (toolCall.name === 'get_analytics') {
            appendAssistantMessage([
                'Current dashboard snapshot:',
                '',
                `- Invoices: ${merchantStats.invoices} total`,
                `- Pending: ${merchantStats.pending}`,
                `- Settled: ${merchantStats.settled}`,
                `- Main volume: ${merchantStats.mainNIGHT} NIGHT`,
                `- Burner volume: ${merchantStats.burnerNIGHT} NIGHT`,
            ].join('\n'));
            return;
        }

        if (toolCall.name === 'get_transaction_info') {
            const invoiceHash = toolCall.args.invoice_hash?.trim().toLowerCase();
            if (invoiceHash) {
                const matchedInvoice = invoices.find((invoice) => invoice.invoiceHash.toLowerCase() === invoiceHash);
                if (!matchedInvoice) {
                    appendAssistantMessage(`I could not find an invoice with hash \`${toolCall.args.invoice_hash}\` in your current dashboard context.`);
                    return;
                }

                appendAssistantMessage([
                    'Invoice details:',
                    '',
                    `- Hash: \`${matchedInvoice.invoiceHash}\``,
                    `- Amount: ${matchedInvoice.amount.toFixed(2)} ${tokenLabel(matchedInvoice.tokenType)}`,
                    `- Type: ${invoiceTypeLabel(matchedInvoice.invoiceType)}`,
                    `- Wallet: ${walletLabel(matchedInvoice.walletType)}`,
                    `- Status: ${matchedInvoice.status === 'SETTLED' || matchedInvoice.status === 1 ? 'SETTLED' : 'PENDING'}`,
                    ...(matchedInvoice.memo ? [`- Memo: ${matchedInvoice.memo}`] : []),
                ].join('\n'));
                return;
            }

            const limit = toolCall.args.limit && toolCall.args.limit > 0 ? toolCall.args.limit : 5;
            const recentInvoices = invoices.slice(0, limit);

            if (recentInvoices.length === 0) {
                appendAssistantMessage('There are no invoices in your current dashboard context yet.');
                return;
            }

            appendAssistantMessage([
                `Recent invoices (${recentInvoices.length}):`,
                '',
                ...recentInvoices.map((invoice) =>
                    `- \`${invoice.invoiceHash}\` | ${invoice.amount.toFixed(2)} ${tokenLabel(invoice.tokenType)} | ${invoice.status === 'SETTLED' || invoice.status === 1 ? 'SETTLED' : 'PENDING'}`
                ),
            ].join('\n'));
            return;
        }

        if (toolCall.name === 'sweep_funds') {
            if (!connected || !address) {
                appendAssistantMessage('Connect your main wallet first, then I can sweep burner funds into it.');
                return;
            }

            if (!decryptedBurnerKey) {
                appendAssistantMessage('Your burner wallet is not unlocked right now. Unlock it first, then I can sweep funds from burner to main.');
                return;
            }

            const currencyMap: Record<'NIGHT', BurnerSweepCurrency> = {
                NIGHT: 'NIGHT',
            };

            if (!toolCall.args.currency || toolCall.args.amount == null) {
                await prepareSweepFollowUp(toolCall, 'Tell me how much NIGHT you want to sweep.');
                return;
            }

            const mappedCurrency = currencyMap[toolCall.args.currency as keyof typeof currencyMap];
            const amount = Number(toolCall.args.amount);
            if (!mappedCurrency || !Number.isFinite(amount) || amount <= 0) {
                appendAssistantMessage('Tell me the NIGHT amount to sweep, like `0.3 NIGHT`.');
                return;
            }

            let availableBurnerBalances = pendingToolCall?.name === 'sweep_funds'
                ? pendingToolCall.metadata?.availableBurnerBalances
                : undefined;

            if (!availableBurnerBalances) {
                setActionStatus('Scanning burner wallet records...');
                const freshBurnerBalances = await loadBurnerBalanceContext();
                availableBurnerBalances = {
                    NIGHT: Number(freshBurnerBalances.find((entry) => entry.token === 'NIGHT')?.privateBalance) || 0,
                };
            }

            if (amount > (availableBurnerBalances[mappedCurrency] || 0)) {
                appendAssistantMessage(`That exceeds your available private ${mappedCurrency} burner balance of ${(availableBurnerBalances[mappedCurrency] || 0).toFixed(2)}.`);
                return;
            }

            const destination = toolCall.args.destination === 'main_wallet' || !toolCall.args.destination
                ? address
                : toolCall.args.destination;

            const sweepResult = await sweepBurnerFundsToDestination({
                decryptedBurnerKey,
                amount,
                currency: mappedCurrency,
                destination,
                onStatus: setActionStatus,
            });

            setPendingToolCall(null);
            appendAssistantMessage([
                `Burner sweep submitted${destination === address ? ' to your main wallet' : ''}${sweepResult.txIds.length > 1 ? ` across ${sweepResult.txIds.length} transactions` : ''}.`,
                '',
                ...sweepResult.txIds.map((txId: string, index: number) => `- Transfer ${index + 1}: \`${txId}\``),
            ].join('\n'));
            return;
        }

        if (toolCall.name !== 'create_invoice') {
            return;
        }

        if (!connected || !address) {
            appendAssistantMessage('Connect your wallet first, then I can create the invoice through the normal Shield popup flow.');
            return;
        }

        if (!appPassword) {
            appendAssistantMessage('Your LumaPay app layer is locked right now. Unlock it first, then I can create invoices from prompts.');
            return;
        }

        const walletType = toolCall.args.wallet === 'burner' ? 1 : 0;
        void executeTransaction;
        void transactionStatus;
        void requestTransactionHistory;
        void appPassword;
        void decryptedBurnerAddress;
        setActionStatus('Opening native invoice creation flow...');
        navigate('/create');
        appendAssistantMessage([
            `I opened the native Create Invoice flow for your ${walletType === 1 ? 'privacy' : 'main'} wallet.`,
            '',
            'Stablecoin shortcuts are disabled on Preprod; create this as a NIGHT invoice and approve it in Shield.',
        ].join('\n'));
    };

    const sendMessage = async (message: string, onInputReset?: () => void) => {
        const trimmed = message.trim();
        if (!trimmed || isThinking) return;

        appendMessage({
            id: Date.now(),
            role: 'user',
            content: trimmed,
        });
        onInputReset?.();
        setIsThinking(true);
        setActionStatus('');

        try {
            if (/^(cancel|stop|nevermind|never mind)$/i.test(trimmed) && pendingToolCall) {
                const cancelledLabel = pendingToolCall.name === 'create_invoice'
                    ? 'Invoice creation'
                    : pendingToolCall.name === 'sweep_funds'
                        ? 'Sweep'
                        : 'Tool flow';
                setPendingToolCall(null);
                appendAssistantMessage(`${cancelledLabel} cancelled.`);
                return;
            }

            const response = await chatWithLumaBot(trimmed, {
                ...dashboardContext,
                pendingToolCall: pendingToolCall
                    ? {
                        name: pendingToolCall.name,
                        args: pendingToolCall.args,
                        missingArgs: pendingToolCall.missingArgs,
                        metadata: pendingToolCall.metadata,
                    }
                    : null,
            });

            if (!response.toolCall) {
                setPendingToolCall(null);
                if (response.reply) {
                    appendAssistantMessage(response.reply);
                }
                return;
            }

            if (response.toolCall.missingArgs && response.toolCall.missingArgs.length > 0) {
                if (response.toolCall.name === 'sweep_funds') {
                    await prepareSweepFollowUp(response.toolCall, response.reply);
                    return;
                }

                setPendingToolCall(buildPendingToolCall(response.toolCall));
                if (response.reply) {
                    appendAssistantMessage(response.reply);
                }
                return;
            }

            setPendingToolCall(null);
            await executePlannedToolCall(response.toolCall);
        } catch (error) {
            const errorMessage = error instanceof Error ? error.message : 'Unknown error';
            appendAssistantMessage(`LumaBot error: ${errorMessage}`);
        } finally {
            setActionStatus('');
            setIsThinking(false);
        }
    };

    return {
        isThinking,
        actionStatus,
        pendingToolCall,
        sendMessage,
    };
};
