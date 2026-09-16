import { AppError } from '../errors/app-error.js';

const DEFAULT_MODEL = 'gemini-2.5-flash';
const GEMINI_API_BASE = 'https://generativelanguage.googleapis.com/v1beta';

// Args the frontend controller (useLumaBotController.ts) actually requires
// before it will execute a tool call without asking a follow-up question.
// Keep this in sync with that file's own checks.
const REQUIRED_ARGS = {
    connect_wallet: [],
    create_invoice: [],
    pay_invoice: ['payment_link'],
    get_transaction_info: [],
    get_analytics: [],
    check_burner_balance: [],
    sweep_funds: ['currency', 'amount']
};

const FUNCTION_DECLARATIONS = [
    {
        name: 'connect_wallet',
        description: 'Prompt the buyer/merchant to connect their Midnight wallet (Shield browser extension). Use when they ask to connect, log in, or sign in.',
        parameters: { type: 'object', properties: {} }
    },
    {
        name: 'create_invoice',
        description: 'Open the native invoice creation flow. Use when the user wants to create, request, or bill for a payment/invoice.',
        parameters: {
            type: 'object',
            properties: {
                amount: { type: 'number', description: 'Amount in major units (e.g. 5 for 5 NIGHT).' },
                currency: { type: 'string', enum: ['NIGHT', 'USDCX', 'USAD', 'ANY'] },
                title: { type: 'string' },
                invoice_type: { type: 'string', enum: ['standard', 'multipay', 'donation'] },
                wallet: { type: 'string', enum: ['main', 'burner'] },
                memo: { type: 'string' }
            }
        }
    },
    {
        name: 'pay_invoice',
        description: 'Open the payment flow for a LumaPay checkout/payment link the user pasted or referenced. Requires the payment_link.',
        parameters: {
            type: 'object',
            properties: {
                payment_link: { type: 'string', description: 'The full LumaPay checkout or /pay URL.' },
                invoice_hash: { type: 'string' },
                wallet: { type: 'string', enum: ['main', 'burner'] },
                amount: { type: 'number' },
                currency: { type: 'string', enum: ['NIGHT', 'USDCX', 'USAD'] }
            }
        }
    },
    {
        name: 'get_transaction_info',
        description: "Look up one invoice by hash, or list the user's recent invoices from the dashboard context already provided.",
        parameters: {
            type: 'object',
            properties: {
                invoice_hash: { type: 'string' },
                wallet: { type: 'string', enum: ['main', 'burner'] },
                limit: { type: 'number' }
            }
        }
    },
    {
        name: 'get_analytics',
        description: "Summarize the user's dashboard stats (invoice counts, settled/pending, volume) from the context already provided.",
        parameters: {
            type: 'object',
            properties: {
                wallet: { type: 'string', enum: ['main', 'burner'] },
                days: { type: 'number' }
            }
        }
    },
    {
        name: 'check_burner_balance',
        description: "Scan and report the user's burner (privacy) wallet balances. Use when they ask about burner/private balance specifically.",
        parameters: { type: 'object', properties: {} }
    },
    {
        name: 'sweep_funds',
        description: 'Sweep private burner wallet funds to the main wallet or another destination address. Requires currency and amount; ask for whichever is missing before calling this.',
        parameters: {
            type: 'object',
            properties: {
                amount: { type: 'number' },
                currency: { type: 'string', enum: ['NIGHT', 'USDCX', 'USAD'] },
                wallet: { type: 'string', enum: ['main', 'burner'] },
                destination: { type: 'string' }
            }
        }
    }
];

const SYSTEM_INSTRUCTION = `You are LumaBot, the in-app assistant for LumaPay — a private, ZK-proof-based payments app on the Midnight Preprod network.

Every message includes a "context" JSON block describing the user's current dashboard: wallet connection state, main/burner balances, invoice stats, recent invoices, receipts, and recent conversation. Prefer answering directly from that context for informational questions (balances, invoice counts, invoice status, recent activity) — you usually don't need a tool call just to report numbers that are already in the context.

Call a tool function when the user wants to DO something (connect a wallet, create an invoice, pay a link, sweep burner funds), or when they explicitly ask you to re-check live on-chain state (burner balance, a specific invoice by hash) rather than the snapshot in context — those trigger the app's own live lookup.

This is a Preprod build: cross-token conversion, LumaPay Card checkout, and public-to-shielded conversion are not implemented yet — say so plainly if asked, don't imply they work.

Keep replies short and concrete. Never ask for or handle private keys, seed phrases, or passwords — wallet actions always go through the user's own wallet popup.`;

export class LumaBotService {
    constructor(environment, log) {
        this.environment = environment;
        this.log = log;
        this.apiKey = process.env.GEMINI_API_KEY?.trim() || null;
        this.model = process.env.GEMINI_MODEL?.trim() || DEFAULT_MODEL;
    }

    isConfigured() {
        return Boolean(this.apiKey);
    }

    async chat(message, context) {
        if (!this.isConfigured()) {
            throw new AppError(
                'LUMABOT_NOT_CONFIGURED',
                'LumaBot is not configured on this deployment yet (missing GEMINI_API_KEY).',
                503
            );
        }

        const history = Array.isArray(context?.recentConversation) ? context.recentConversation : [];
        const contents = [
            ...history.map((entry) => ({
                role: entry.role === 'assistant' ? 'model' : 'user',
                parts: [{ text: String(entry.content ?? '') }]
            })),
            {
                role: 'user',
                parts: [{ text: `Dashboard context (JSON):\n${JSON.stringify(context ?? {})}\n\nUser message: ${message}` }]
            }
        ];

        let response;
        try {
            response = await fetch(
                `${GEMINI_API_BASE}/models/${encodeURIComponent(this.model)}:generateContent?key=${encodeURIComponent(this.apiKey)}`,
                {
                    method: 'POST',
                    headers: { 'Content-Type': 'application/json' },
                    body: JSON.stringify({
                        system_instruction: { parts: [{ text: SYSTEM_INSTRUCTION }] },
                        contents,
                        tools: [{ function_declarations: FUNCTION_DECLARATIONS }]
                    })
                }
            );
        } catch (cause) {
            this.log.error('lumabot.request_failed', { error: cause instanceof Error ? cause.message : String(cause) });
            throw new AppError('LUMABOT_UNAVAILABLE', 'Could not reach the LumaBot AI backend.', 502);
        }

        if (!response.ok) {
            const body = await response.json().catch(() => null);
            this.log.error('lumabot.gemini_error', { status: response.status, body });
            throw new AppError('LUMABOT_UPSTREAM_ERROR', 'LumaBot AI backend returned an error.', 502, {
                status: response.status
            });
        }

        const payload = await response.json();
        const parts = payload?.candidates?.[0]?.content?.parts ?? [];
        const functionCallPart = parts.find((part) => part.functionCall);
        const textParts = parts.filter((part) => typeof part.text === 'string').map((part) => part.text);
        const reply = textParts.join('\n').trim();

        if (!functionCallPart) {
            return { reply: reply || "I'm not sure how to help with that yet." };
        }

        const name = functionCallPart.functionCall.name;
        const args = functionCallPart.functionCall.args ?? {};
        const required = REQUIRED_ARGS[name] ?? [];
        const missingArgs = required.filter((key) => args[key] === undefined || args[key] === null || args[key] === '');

        return {
            reply: reply || (missingArgs.length ? 'I need a bit more information first.' : 'On it.'),
            toolCall: { name, args, missingArgs }
        };
    }
}
