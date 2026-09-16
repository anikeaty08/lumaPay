import { existsSync, readFileSync } from 'node:fs';
import path from 'node:path';
import { fileURLToPath } from 'node:url';
import { AppError } from '../errors/app-error.js';

const currentDirectory = path.dirname(fileURLToPath(import.meta.url));
const workspaceRoot = path.resolve(currentDirectory, '..', '..', '..');

const NETWORKS = Object.freeze({
    undeployed: Object.freeze({
        networkId: 'undeployed',
        node: 'http://127.0.0.1:9944',
        indexer: 'http://127.0.0.1:8088/api/v4/graphql',
        indexerWS: 'ws://127.0.0.1:8088/api/v4/graphql/ws'
    }),
    preview: Object.freeze({
        networkId: 'preview',
        node: 'https://rpc.preview.midnight.network',
        indexer: 'https://indexer.preview.midnight.network/api/v4/graphql',
        indexerWS: 'wss://indexer.preview.midnight.network/api/v4/graphql/ws'
    }),
    preprod: Object.freeze({
        networkId: 'preprod',
        node: 'wss://rpc.preprod.midnight.network',
        // The official Midnight-operated indexer. api-preprod.1am.xyz (1AM's
        // ProofStation infra) now gates its indexer behind X-API-Key/wallet-
        // challenge auth that this backend never implemented, so every chain
        // read 401'd. This one is publicly queryable, no auth required.
        indexer: 'https://indexer.preprod.midnight.network/api/v4/graphql',
        indexerWS: 'wss://indexer.preprod.midnight.network/api/v4/graphql/ws'
    }),
    mainnet: Object.freeze({
        networkId: 'mainnet',
        node: 'https://rpc.mainnet.midnight.network',
        indexer: 'https://indexer.mainnet.midnight.network/api/v4/graphql',
        indexerWS: 'wss://indexer.mainnet.midnight.network/api/v4/graphql/ws'
    })
});

function deploymentAddress(networkId) {
    const explicit = process.env.LUMAPAY_CONTRACT_ADDRESS?.trim();
    if (explicit) return explicit;

    const manifestPath = path.join(
        workspaceRoot,
        'contracts',
        'lumapay',
        'deployments',
        `${networkId}.json`
    );
    if (!existsSync(manifestPath)) return null;
    const manifest = JSON.parse(readFileSync(manifestPath, 'utf8'));
    return manifest.contractAddress ?? null;
}

function deploymentSuite(networkId) {
    const manifestPath = path.join(
        workspaceRoot,
        'contracts',
        'lumapay',
        'deployments',
        `${networkId}-suite.json`
    );
    if (!existsSync(manifestPath)) {
        const core = deploymentAddress(networkId);
        return core ? { 'invoice-core': core } : {};
    }
    const manifestContracts = JSON.parse(readFileSync(manifestPath, 'utf8')).contracts ?? {};
    return {
        ...manifestContracts,
        'invoice-core': process.env.LUMAPAY_INVOICE_CORE_CONTRACT_ADDRESS?.trim() || manifestContracts['invoice-core'],
        campaigns: process.env.LUMAPAY_CAMPAIGNS_CONTRACT_ADDRESS?.trim() || manifestContracts.campaigns,
        'gift-cards': process.env.LUMAPAY_GIFT_CARDS_CONTRACT_ADDRESS?.trim() || manifestContracts['gift-cards'],
        'quote-checkout': process.env.LUMAPAY_QUOTE_CHECKOUT_CONTRACT_ADDRESS?.trim() || manifestContracts['quote-checkout'],
        'backup-anchor': process.env.LUMAPAY_BACKUP_ANCHOR_CONTRACT_ADDRESS?.trim() || manifestContracts['backup-anchor'],
        'card-vault': process.env.LUMAPAY_CARD_VAULT_CONTRACT_ADDRESS?.trim() || manifestContracts['card-vault']
    };
}

export function getEnvironment() {
    const requestedNetwork = process.env.MIDNIGHT_NETWORK?.trim() || 'preprod';
    const network = NETWORKS[requestedNetwork];
    if (!network) {
        throw new AppError(
            'MIDNIGHT_NETWORK_INVALID',
            `Unsupported Midnight network: ${requestedNetwork}.`,
            500
        );
    }

    const contracts = deploymentSuite(network.networkId);
    const contractAddress = deploymentAddress(network.networkId) ?? contracts['invoice-core'] ?? null;
    const invalidContract = Object.entries(contracts).find(([, address]) => (
        address && !/^[0-9a-f]{64}$/i.test(address)
    ));
    if (invalidContract || (contractAddress && !/^[0-9a-f]{64}$/i.test(contractAddress))) {
        throw new AppError(
            'MIDNIGHT_CONTRACT_ADDRESS_INVALID',
            `${invalidContract?.[0] ?? 'LUMAPAY_CONTRACT_ADDRESS'} must be 32-byte hexadecimal.`,
            500
        );
    }

    const configuredOrigins = [
        'http://localhost:5173',
        'http://127.0.0.1:5173',
        'http://localhost:4173',
        'http://127.0.0.1:4173',
        process.env.FRONTEND_URL,
        ...(process.env.CORS_ALLOWED_ORIGINS ?? '').split(',')
    ].filter(Boolean).map((origin) => origin.trim().replace(/\/+$/, ''));

    const installedArtifactsRoot = path.join(
        workspaceRoot,
        'backend',
        'generated',
        'lumapay'
    );
    const workspaceArtifactsRoot = path.join(
        workspaceRoot,
        'contracts',
        'lumapay',
        'dist',
        'managed'
    );
    const artifactsRoot = existsSync(installedArtifactsRoot)
        ? installedArtifactsRoot
        : workspaceArtifactsRoot;

    return Object.freeze({
        product: 'LumaPay',
        network: Object.freeze({
            ...network,
            node: process.env.MIDNIGHT_NODE_URL?.trim() || network.node,
            indexer: process.env.MIDNIGHT_INDEXER_URL?.trim() || network.indexer,
            indexerWS: process.env.MIDNIGHT_INDEXER_WS_URL?.trim() || network.indexerWS
        }),
        contractAddress,
        contracts: Object.freeze(contracts),
        frontendUrl: (process.env.FRONTEND_URL?.trim() || 'http://localhost:5173').replace(/\/+$/, ''),
        contractModulePath: process.env.LUMAPAY_CONTRACT_MODULE_PATH?.trim() || path.join(
            artifactsRoot,
            'lumapay-core',
            'contract',
            'index.js'
        ),
        contractModulePaths: Object.freeze(Object.fromEntries(
            Object.keys(contracts).map((module) => [
                module,
                path.join(
                    artifactsRoot,
                    module === 'invoice-core' ? 'lumapay-core' : `lumapay-${module}`,
                    'contract',
                    'index.js'
                )
            ])
        )),
        corsOrigins: [...new Set(configuredOrigins)],
        reconciliationSecret: process.env.LUMAPAY_RECONCILIATION_SECRET?.trim() || null,
        reconciliationEnabled: process.env.LUMAPAY_RECONCILER_ENABLED === 'true',
        reconciliationIntervalMs: Math.max(
            5_000,
            Number(process.env.LUMAPAY_RECONCILIATION_INTERVAL_MS ?? 15_000)
        ),
        auth: Object.freeze({
            challengeTtlMs: Math.max(60_000, Number(process.env.LUMAPAY_AUTH_CHALLENGE_TTL_MS ?? 300_000)),
            sessionTtlMs: Math.max(300_000, Number(process.env.LUMAPAY_AUTH_SESSION_TTL_MS ?? 43_200_000)),
            secureCookies: process.env.NODE_ENV === 'production'
        })
    });
}

export { NETWORKS };
