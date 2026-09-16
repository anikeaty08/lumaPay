import { mkdir, readFile, rename, writeFile } from 'node:fs/promises';
import path from 'node:path';
import { fileURLToPath } from 'node:url';
import { WebSocket } from 'ws';
import pino from 'pino';
import { setNetworkId } from '@midnight-ntwrk/midnight-js-network-id';
import { deployContract } from '@midnight-ntwrk/midnight-js-contracts';
import { CompiledContract } from '@midnight-ntwrk/midnight-js-protocol/compact-js';
import type { EnvironmentConfiguration } from '@midnight-ntwrk/testkit-js';
import {
    LUMAPAY_COMMITMENT_VERSION,
    LUMAPAY_PRIVATE_STATE_ID
} from '../src/index.js';
import {
    Contract as LumaPayCoreContract,
    type ImpureCircuits as LumaPayCoreImpureCircuits,
    ledger,
    pureCircuits
} from '../src/managed/lumapay-core/contract/index.js';
import { getPreprodConfig } from '../deploy/config.js';
import { readDeploymentSecrets } from '../deploy/env.js';
import { buildProviders } from '../deploy/providers.js';
import {
    addPrivateIndexerSession,
    createOneAmIndexerSession,
    ensureDust,
    formatDust,
    isOneAmPrivateIndexer,
    LumaPayWalletProvider,
    readBalances,
    readDustAccount,
    syncWallet,
    waitForDustSnapshot
} from '../deploy/wallet.js';

globalThis.WebSocket = WebSocket as unknown as typeof globalThis.WebSocket;

const logger = pino({
    level: 'info',
    transport: { target: 'pino-pretty', options: { colorize: true } },
    redact: {
        paths: ['mnemonic', 'seed', 'secret', 'password', '*.mnemonic', '*.seed', '*.secret', '*.password'],
        censor: '[REDACTED]'
    }
});

const currentDirectory = path.dirname(fileURLToPath(import.meta.url));
const contractRoot = path.resolve(currentDirectory, '..');
const compiledAssetPath = path.join(contractRoot, 'src', 'managed', 'lumapay-core');
const deploymentDirectory = path.join(contractRoot, 'deployments');
const deploymentManifest = path.join(deploymentDirectory, 'preprod.json');
const checkOnly = process.argv.includes('--check');

async function probeProofServer(url: string): Promise<void> {
    const response = await fetch(`${url}/health`, {
        signal: AbortSignal.timeout(10_000)
    });
    if (!response.ok) {
        throw new Error(`Proof-server health check failed with HTTP ${response.status}.`);
    }
    const health = await response.json() as { status?: string };
    if (health.status !== 'ok') {
        throw new Error('Proof server did not report status=ok.');
    }
}

async function probeIndexer(url: string): Promise<void> {
    const response = await fetch(url, {
        method: 'POST',
        headers: { 'content-type': 'application/json' },
        body: JSON.stringify({ query: 'query LumaPayHealth { __typename }' }),
        signal: AbortSignal.timeout(10_000)
    });
    if (!response.ok) {
        throw new Error(`Preprod indexer check failed with HTTP ${response.status}.`);
    }
}

async function probeNode(url: string): Promise<void> {
    const response = await fetch(url, {
        method: 'POST',
        headers: { 'content-type': 'application/json' },
        body: JSON.stringify({
            jsonrpc: '2.0',
            id: 1,
            method: 'system_health',
            params: []
        }),
        signal: AbortSignal.timeout(10_000)
    });
    if (!response.ok) {
        throw new Error(`Preprod node check failed with HTTP ${response.status}.`);
    }
    const body = await response.json() as { result?: unknown; error?: unknown };
    if (body.error || body.result === undefined) {
        throw new Error('Preprod node health RPC returned an error.');
    }
}

async function existingDeployment(): Promise<string | undefined> {
    try {
        const parsed = JSON.parse(await readFile(deploymentManifest, 'utf8')) as {
            contractAddress?: string;
        };
        return parsed.contractAddress;
    } catch (error) {
        const code = (error as NodeJS.ErrnoException).code;
        if (code === 'ENOENT') return undefined;
        throw error;
    }
}

async function writeDeploymentManifest(data: Record<string, unknown>): Promise<void> {
    await mkdir(deploymentDirectory, { recursive: true });
    const temporary = `${deploymentManifest}.${process.pid}.tmp`;
    await writeFile(temporary, `${JSON.stringify(data, null, 2)}\n`, {
        encoding: 'utf8',
        flag: 'wx'
    });
    await rename(temporary, deploymentManifest);
}

async function main(): Promise<void> {
    const config = getPreprodConfig();
    const secrets = readDeploymentSecrets();
    setNetworkId(config.networkId);

    let environment: EnvironmentConfiguration = {
        walletNetworkId: config.networkId,
        networkId: config.networkId,
        indexer: config.indexer,
        indexerWS: config.indexerWS,
        node: config.node,
        nodeWS: config.nodeWS,
        faucet: '',
        proofServer: config.proofServer
    };

    let wallet: LumaPayWalletProvider;
    if (isOneAmPrivateIndexer(config.indexer)) {
        const bootstrapWallet = await LumaPayWalletProvider.build(
            logger,
            environment,
            secrets.wallet
        );
        const session = await createOneAmIndexerSession(
            config.indexer,
            bootstrapWallet.unshieldedKeystore
        );
        environment = {
            ...environment,
            indexer: addPrivateIndexerSession(config.indexer, session.token),
            indexerWS: addPrivateIndexerSession(config.indexerWS, session.token)
        };
        logger.info(
            { address: session.address, expiresAt: session.expiresAt },
            'Authenticated a private 1AM indexer session.'
        );
    }

    await Promise.all([
        probeProofServer(config.proofServer),
        probeIndexer(environment.indexer),
        probeNode(config.node)
    ]);
    logger.info('Preprod node, indexer, and local proof server are reachable.');

    const dustStateFile = process.env.LUMAPAY_DUST_STATE_FILE?.trim();
    const serializedDustState = dustStateFile
        ? await readFile(path.resolve(dustStateFile), 'utf8')
        : undefined;
    wallet = await LumaPayWalletProvider.build(
        logger,
        environment,
        secrets.wallet,
        serializedDustState
    );
    try {
        await wallet.start();
        const syncedState = await syncWallet(logger, wallet.wallet);
        const initialDustAccount = readDustAccount(config.networkId, syncedState);
        logger.info(
            { dustAddress: initialDustAccount.address },
            'Derived DUST address; waiting for its DUST ledger state.'
        );
        const dustState = await waitForDustSnapshot(logger, wallet.wallet);
        const address = wallet.getAddress(config.networkId, syncedState);
        const balances = readBalances(dustState);
        const dustAccount = readDustAccount(config.networkId, dustState);
        logger.info(
            {
                address,
                dustAddress: dustAccount.address,
                night: balances.night.toString(),
                dust: balances.dust.toString(),
                dustFormatted: formatDust(balances.dust),
                spendableDustCoins: dustAccount.spendableCoins,
                pendingDustCoins: dustAccount.pendingCoins
            },
            'Preprod wallet is synced.'
        );

        if (balances.night <= 0n) {
            throw new Error(`Wallet has no tNIGHT. Fund ${address} at ${config.faucet}`);
        }
        if (checkOnly) {
            logger.info('Preprod deployment check passed; no transaction was submitted.');
            return;
        }

        const previousAddress = await existingDeployment();
        if (previousAddress && process.env.LUMAPAY_ALLOW_REDEPLOY !== 'true') {
            throw new Error(
                `A deployment already exists at ${previousAddress}. ` +
                'Set LUMAPAY_ALLOW_REDEPLOY=true only for an intentional replacement.'
            );
        }

        const dust = dustAccount.spendableCoins > 0
            ? balances.dust
            : await ensureDust(logger, wallet, dustState);
        logger.info({ dust: dust.toString() }, 'Spendable DUST is available.');

        type LumaPayCoreCircuitId = keyof LumaPayCoreImpureCircuits<unknown> & string;
        const providers = buildProviders<LumaPayCoreCircuitId>(
            wallet,
            compiledAssetPath,
            secrets.privateStatePassword,
            {
                ...config,
                indexer: environment.indexer,
                indexerWS: environment.indexerWS
            }
        );
        const compiledContract = CompiledContract.make(
            'LumaPayCore',
            LumaPayCoreContract
        ).pipe(
            CompiledContract.withVacantWitnesses,
            CompiledContract.withCompiledFileAssets(compiledAssetPath)
        );
        const registryAdminAuthorization = pureCircuits.deriveRegistryAdminAuthorization(
            secrets.registryAdminSecret
        );

        logger.info('Submitting the LumaPay contract deployment to Midnight Preprod.');
        const deployed = await deployContract(providers, {
            compiledContract,
            privateStateId: LUMAPAY_PRIVATE_STATE_ID,
            initialPrivateState: {},
            args: [registryAdminAuthorization]
        });
        const contractAddress = deployed.deployTxData.public.contractAddress;
        const state = await providers.publicDataProvider.queryContractState(contractAddress);
        if (!state) throw new Error('Indexer did not return the deployed contract state.');

        const deployedLedger = ledger(state.data);
        if (
            Buffer.compare(
                Buffer.from(deployedLedger.registryAdminAuthorization),
                Buffer.from(registryAdminAuthorization)
            ) !== 0
        ) {
            throw new Error('Deployed registry-admin commitment does not match local derivation.');
        }

        await writeDeploymentManifest({
            schemaVersion: 1,
            product: 'LumaPay',
            contractModule: 'invoice-core',
            network: config.networkId,
            contractAddress,
            commitmentVersion: LUMAPAY_COMMITMENT_VERSION.toString(),
            compactToolchain: '0.31.1',
            compactLanguage: '0.23.0',
            compactRuntime: '0.16.0',
            midnightJs: '4.1.1',
            walletSdk: '1.2.0',
            proofServer: '8.1.0',
            deployedAt: new Date().toISOString()
        });
        logger.info({ contractAddress }, 'LumaPay is deployed and verified on Preprod.');
    } finally {
        await wallet.stop();
    }
}

main().catch((error: unknown) => {
    logger.error({ err: error }, 'LumaPay Preprod deployment failed.');
    process.exitCode = 1;
});
