import { AppError } from '../errors/app-error.js';

const DEFAULT_MODEL = 'gemini-2.5-flash';
const GEMINI_API_BASE = 'https://generativelanguage.googleapis.com/v1beta';

const SYSTEM_INSTRUCTION = `You are LumaBot, the documentation and developer-integration assistant for LumaPay — a private, ZK-proof-based payments app on the Midnight Preprod network.

You help developers understand and integrate the LumaPay Node SDK, REST API, webhooks, and Compact smart contracts. Every message includes a "context" JSON block with the current page's mode (docs or developer-portal) and route.

Answer directly and concretely — code examples, exact endpoint paths, and field names where relevant. If asked about something not yet built on this Preprod deployment (cross-token conversion, LumaPay Card checkout, public-to-shielded conversion), say so plainly rather than imply it works.

You only answer questions — you cannot take actions (create invoices, connect wallets, move funds). Never ask for or handle private keys, seed phrases, or passwords.`;

// A separate, deliberately narrower assistant than LumaBotService: this one
// only answers documentation/integration questions from the Docs/Developer
// pages (DocsChatbot.tsx), so it carries no function-calling tools — there
// is nothing here that should ever trigger a wallet action.
export class DeveloperAssistantService {
    constructor(log) {
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
                'DEVELOPER_ASSISTANT_NOT_CONFIGURED',
                'The developer assistant is not configured on this deployment yet (missing GEMINI_API_KEY).',
                503
            );
        }

        const contents = [{
            role: 'user',
            parts: [{ text: `Page context (JSON):\n${JSON.stringify(context ?? {})}\n\nDeveloper question: ${message}` }]
        }];

        let response;
        try {
            response = await fetch(
                `${GEMINI_API_BASE}/models/${encodeURIComponent(this.model)}:generateContent?key=${encodeURIComponent(this.apiKey)}`,
                {
                    method: 'POST',
                    headers: { 'Content-Type': 'application/json' },
                    body: JSON.stringify({
                        system_instruction: { parts: [{ text: SYSTEM_INSTRUCTION }] },
                        contents
                    })
                }
            );
        } catch (cause) {
            this.log.error('developer_assistant.request_failed', { error: cause instanceof Error ? cause.message : String(cause) });
            throw new AppError('DEVELOPER_ASSISTANT_UNAVAILABLE', 'Could not reach the developer assistant AI backend.', 502);
        }

        if (!response.ok) {
            const body = await response.json().catch(() => null);
            this.log.error('developer_assistant.gemini_error', { status: response.status, body });
            throw new AppError('DEVELOPER_ASSISTANT_UPSTREAM_ERROR', 'Developer assistant AI backend returned an error.', 502, {
                status: response.status
            });
        }

        const payload = await response.json();
        const parts = payload?.candidates?.[0]?.content?.parts ?? [];
        const reply = parts.filter((part) => typeof part.text === 'string').map((part) => part.text).join('\n').trim();

        return { reply: reply || "I'm not sure how to help with that yet." };
    }
}
