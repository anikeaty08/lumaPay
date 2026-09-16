import { signWebhook } from '../security/crypto.js';

export class WebhookService {
    constructor(repository, log, fetchImplementation = fetch) {
        this.repository = repository;
        this.log = log;
        this.fetch = fetchImplementation;
    }

    async sendInvoiceEvent(invoice, previousStatus) {
        if (invoice.status === previousStatus) return { delivered: false, reason: 'unchanged' };
        const merchant = await this.repository.getMerchant(invoice.merchant_id);
        const configuration = this.repository.webhookConfiguration(merchant);
        if (!configuration) return { delivered: false, reason: 'not_configured' };

        const eventType = `invoice.${invoice.status.toLowerCase()}`;
        const eventKey = `${invoice.invoice_id}:${eventType}`;
        const payload = {
            schema_version: 1,
            event: eventType,
            invoice_id: invoice.invoice_id,
            status: invoice.status,
            settlement_tx_id: invoice.settlement_tx_id,
            receipt_commitment: invoice.receipt_commitment,
            claimed: invoice.claimed,
            occurred_at: new Date().toISOString()
        };

        if (!await this.repository.claimWebhookDelivery(
            eventKey,
            invoice.merchant_id,
            eventType,
            payload
        )) {
            return { delivered: false, reason: 'duplicate' };
        }

        const timestamp = Math.floor(Date.now() / 1000).toString();
        const body = JSON.stringify(payload);
        let responseCode = null;
        try {
            const response = await this.fetch(configuration.url, {
                method: 'POST',
                headers: {
                    'content-type': 'application/json',
                    'x-lumapay-timestamp': timestamp,
                    'x-lumapay-signature': signWebhook(configuration.secret, timestamp, body)
                },
                body,
                signal: AbortSignal.timeout(10_000)
            });
            responseCode = response.status;
            await this.repository.finishWebhookDelivery(
                eventKey,
                response.ok ? 'DELIVERED' : 'FAILED',
                response.status
            );
            return { delivered: response.ok, responseCode: response.status };
        } catch (error) {
            await this.repository.finishWebhookDelivery(eventKey, 'FAILED', responseCode);
            this.log.warn('webhook.failed', { eventKey, error });
            return { delivered: false, reason: 'request_failed' };
        }
    }
}
