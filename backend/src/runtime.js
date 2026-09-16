import { getEnvironment } from './config/environment.js';
import { createSupabaseClient } from './config/supabase.js';
import { logger } from './observability/logger.js';
import { SupabaseRepository } from './repositories/supabase-repository.js';
import { UnavailableRepository } from './repositories/unavailable-repository.js';
import { MidnightGateway } from './services/midnight-gateway.js';
import { ReconciliationService } from './services/reconciliation-service.js';
import { WebhookService } from './services/webhook-service.js';
import { WalletAuthService } from './services/wallet-auth-service.js';

export function createRuntime(overrides = {}) {
    const environment = overrides.environment ?? getEnvironment();
    const log = overrides.logger ?? logger;
    const databaseConfigured = Boolean(
        process.env.SUPABASE_URL?.trim() && process.env.SUPABASE_SERVICE_ROLE_KEY?.trim()
    );
    const repository = overrides.repository ?? (
        databaseConfigured
            ? new SupabaseRepository(overrides.supabase ?? createSupabaseClient())
            : new UnavailableRepository()
    );
    const gateway = overrides.gateway ?? new MidnightGateway(environment, log);
    const webhooks = overrides.webhooks ?? new WebhookService(repository, log);
    const reconciliation = overrides.reconciliation ?? new ReconciliationService(
        repository,
        gateway,
        webhooks,
        log
    );
    const auth = overrides.auth ?? new WalletAuthService(repository, environment);

    return {
        environment,
        logger: log,
        repository,
        gateway,
        webhooks,
        reconciliation,
        auth,
        async start() {
            if (environment.reconciliationEnabled) {
                await reconciliation.start(environment.reconciliationIntervalMs);
            }
        },
        async stop() {
            reconciliation.stop();
            await gateway.dispose();
        }
    };
}
