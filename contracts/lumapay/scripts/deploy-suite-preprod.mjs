import { existsSync } from 'node:fs';
import { mkdir, readFile, rename, writeFile } from 'node:fs/promises';
import path from 'node:path';
import { fileURLToPath } from 'node:url';
import { WebSocket } from 'ws';
import pino from 'pino';
import { firstValueFrom } from 'rxjs';
import { setNetworkId } from '@midnight-ntwrk/midnight-js-network-id';
import { deployContract } from '@midnight-ntwrk/midnight-js-contracts';
import { CompiledContract } from '@midnight-ntwrk/midnight-js-protocol/compact-js';
import { getPreprodConfig } from '../deploy/config.ts';
import { readDeploymentSecrets } from '../deploy/env.ts';
import { buildProviders } from '../deploy/providers.ts';
import {
    addPrivateIndexerSession,
    createOneAmIndexerSession,
    formatDust,
    isOneAmPrivateIndexer,
    LumaPayWalletProvider,
    readBalances,
    readDustAccount,
    syncWallet,
    waitForDustSnapshot
} from '../deploy/wallet.ts';
import { Contract as CampaignsContract } from '../src/managed/lumapay-campaigns/contract/index.js';
import { Contract as GiftCardsContract } from '../src/managed/lumapay-gift-cards/contract/index.js';
import {
    Contract as QuoteCheckoutContract,
    ledger as quoteCheckoutLedger,
    pureCircuits as quoteCheckoutPureCircuits
} from '../src/managed/lumapay-quote-checkout/contract/index.js';
import { Contract as BackupAnchorContract } from '../src/managed/lumapay-backup-anchor/contract/index.js';
import { Contract as CardVaultContract } from '../src/managed/lumapay-card-vault/contract/index.js';

globalThis.WebSocket = WebSocket;

const logger = pino({
    level: 'info',
    transport: { target: 'pino-pretty', options: { colorize: true } },
    redact: {
        paths: ['mnemonic', 'seed', 'secret', 'password', 'token', '*.token'],
        censor: '[REDACTED]'
    }
});

const contractRoot = path.resolve(path.dirname(fileURLToPath(import.meta.url)), '..');
const deploymentDirectory = path.join(contractRoot, 'deployments');
const coreManifestPath = path.join(deploymentDirectory, 'preprod.json');
const suiteManifestPath = path.join(deploymentDirectory, 'preprod-suite.json');

const targets = [
    { slug: 'campaigns', name: 'LumaPayCampaigns', Contract: CampaignsContract, args: () => [] },
    { slug: 'gift-cards', name: 'LumaPayGiftCards', Contract: GiftCardsContract, args: () => [] },
    {
        slug: 'quote-checkout',
        name: 'LumaPayQuoteCheckout',
        Contract: QuoteCheckoutContract,
        args: (secrets) => [
            quoteCheckoutPureCircuits.deriveRegistryAdminAuthorization(
                secrets.registryAdminSecret
            )
        ]
    },
    { slug: 'backup-anchor', name: 'LumaPayBackupAnchor', Contract: BackupAnchorContract, args: () => [] },
    { slug: 'card-vault', name: 'LumaPayCardVault', Contract: CardVaultContract, args: () => [] }
];

async function probe(url, options = {}) {
    const response = await fetch(url, { ...options, signal: AbortSignal.timeout(10_000) });
    if (!response.ok) throw new Error(`Health check failed for ${new URL(url).origin}.`);
}

async function readManifest(manifestPath) {
    if (!existsSync(manifestPath)) return null;
    return JSON.parse(await readFile(manifestPath, 'utf8'));
}

async function writeJsonAtomic(destination, value) {
    await mkdir(path.dirname(destination), { recursive: true });
    const temporary = `${destination}.${process.pid}.tmp`;
    await writeFile(temporary, `${JSON.stringify(value, null, 2)}\n`, { flag: 'wx' });
    await rename(temporary, destination);
}

async function waitForSpendableDustChange(wallet, timeoutMs = 5 * 60_000) {
    const deadline = Date.now() + timeoutMs;
    while (Date.now() < deadline) {
        const state = await firstValueFrom(wallet.state());
        if (state.dust.availableCoins.length > 0) return;
        logger.info(
            { pendingDustCoins: state.dust.pendingCoins.length },
            'Waiting for the next spendable DUST change coin.'
        );
        await new Promise((resolve) => setTimeout(resolve, 5_000));
    }
    throw new Error('Timed out waiting for a spendable DUST change coin.');
}

async function main() {
    const config = getPreprodConfig();
    const secrets = readDeploymentSecrets();
    setNetworkId(config.networkId);

    let environment = {
        walletNetworkId: config.networkId,
        networkId: config.networkId,
        indexer: config.indexer,
        indexerWS: config.indexerWS,
        node: config.node,
        nodeWS: config.nodeWS,
        faucet: '',
        proofServer: config.proofServer
    };

    if (isOneAmPrivateIndexer(config.indexer)) {
        const bootstrap = await LumaPayWalletProvider.build(logger, environment, secrets.wallet);
        const session = await createOneAmIndexerSession(
            config.indexer,
            bootstrap.unshieldedKeystore
        );
        environment = {
            ...environment,
            indexer: addPrivateIndexerSession(config.indexer, session.token),
            indexerWS: addPrivateIndexerSession(config.indexerWS, session.token)
        };
    }

    await Promise.all([
        probe(`${config.proofServer}/health`),
        probe(environment.indexer, {
            method: 'POST',
            headers: { 'content-type': 'application/json' },
            body: JSON.stringify({ query: 'query LumaPaySuiteHealth { __typename }' })
        })
    ]);

    const dustStateFile = process.env.LUMAPAY_DUST_STATE_FILE?.trim();
    const serializedDustState = dustStateFile
        ? await readFile(path.resolve(dustStateFile), 'utf8')
        : undefined;
    const wallet = await LumaPayWalletProvider.build(
        logger,
        environment,
        secrets.wallet,
        serializedDustState
    );

    try {
        await wallet.start();
        const synced = await syncWallet(logger, wallet.wallet);
        const dustState = await waitForDustSnapshot(logger, wallet.wallet);
        const balances = readBalances(dustState);
        const dustAccount = readDustAccount(config.networkId, dustState);
        if (balances.night <= 0n || dustAccount.spendableCoins < 1) {
            throw new Error('The suite deployer requires tNIGHT and one spendable DUST coin.');
        }
        logger.info(
            { dust: formatDust(balances.dust), dustAddress: dustAccount.address },
            'Suite deployment wallet is ready.'
        );

        const addresses = {};
        const core = await readManifest(coreManifestPath);
        if (!core?.contractAddress) throw new Error('The invoice-core deployment manifest is missing.');
        addresses['invoice-core'] = core.contractAddress;

        for (const target of targets) {
            const manifestPath = path.join(deploymentDirectory, `preprod.${target.slug}.json`);
            const existing = await readManifest(manifestPath);
            if (existing?.contractAddress) {
                addresses[target.slug] = existing.contractAddress;
                logger.info({ module: target.slug, contractAddress: existing.contractAddress }, 'Module already deployed; skipping.');
                continue;
            }

            const assetPath = path.join(contractRoot, 'src', 'managed', `lumapay-${target.slug}`);
            const providers = buildProviders(
                wallet,
                assetPath,
                secrets.privateStatePassword,
                { ...config, indexer: environment.indexer, indexerWS: environment.indexerWS }
            );
            const compiledContract = CompiledContract.make(target.name, target.Contract).pipe(
                CompiledContract.withVacantWitnesses,
                CompiledContract.withCompiledFileAssets(assetPath)
            );

            logger.info({ module: target.slug }, 'Submitting LumaPay module deployment.');
            const deployed = await deployContract(providers, {
                compiledContract,
                privateStateId: `lumapay-${target.slug}-private-state`,
                initialPrivateState: {},
                args: target.args(secrets)
            });
            const contractAddress = deployed.deployTxData.public.contractAddress;
            const state = await providers.publicDataProvider.queryContractState(contractAddress);
            if (!state) throw new Error(`Indexer did not return ${target.slug} state.`);

            if (target.slug === 'quote-checkout') {
                const deployedLedger = quoteCheckoutLedger(state.data);
                const expected = quoteCheckoutPureCircuits.deriveRegistryAdminAuthorization(
                    secrets.registryAdminSecret
                );
                if (Buffer.compare(
                    Buffer.from(deployedLedger.registryAdminAuthorization),
                    Buffer.from(expected)
                ) !== 0) throw new Error('Quote registry admin commitment verification failed.');
            }

            const manifest = {
                schemaVersion: 1,
                product: 'LumaPay',
                contractModule: target.slug,
                network: config.networkId,
                contractAddress,
                compactToolchain: '0.31.1',
                deployedAt: new Date().toISOString()
            };
            await writeJsonAtomic(manifestPath, manifest);
            addresses[target.slug] = contractAddress;
            logger.info({ module: target.slug, contractAddress }, 'Module deployed and indexed.');

            const isLastTarget = target.slug === targets.at(-1).slug;
            if (isOneAmPrivateIndexer(config.indexer) && !isLastTarget) {
                logger.info(
                    'Private-indexer mode completed one module; refresh the wallet snapshot before continuing.'
                );
                return;
            }
            if (!isLastTarget) await waitForSpendableDustChange(wallet.wallet);
        }

        await writeJsonAtomic(suiteManifestPath, {
            schemaVersion: 1,
            product: 'LumaPay',
            network: config.networkId,
            contracts: addresses,
            completedAt: new Date().toISOString()
        });
        logger.info({ addresses }, 'The complete LumaPay contract suite is deployed.');
    } finally {
        await wallet.stop();
    }
}

main().catch((error) => {
    logger.error({ err: error }, 'LumaPay suite deployment failed.');
    process.exitCode = 1;
});
