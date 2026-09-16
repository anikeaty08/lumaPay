import { randomBytes } from 'node:crypto';
import { existsSync } from 'node:fs';
import { mkdir, readFile, writeFile } from 'node:fs/promises';
import path from 'node:path';
import { fileURLToPath } from 'node:url';
import { WebSocket } from 'ws';
import pino from 'pino';
import { setNetworkId } from '@midnight-ntwrk/midnight-js-network-id';
import { findDeployedContract } from '@midnight-ntwrk/midnight-js-contracts';
import { CompiledContract } from '@midnight-ntwrk/midnight-js-protocol/compact-js';
import type { EnvironmentConfiguration } from '@midnight-ntwrk/testkit-js';
import {
    Contract,
    ledger,
    pureCircuits,
    type ImpureCircuits
} from '../src/managed/lumapay-core/contract/index.js';
import { getPreprodConfig } from '../deploy/config.js';
import { readDeploymentSecrets } from '../deploy/env.js';
import { buildProviders } from '../deploy/providers.js';
import {
    addPrivateIndexerSession,
    createOneAmIndexerSession,
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
    redact: { paths: ['*.secret', '*.mnemonic', '*.seed'], censor: '[REDACTED]' }
});

const root = path.resolve(path.dirname(fileURLToPath(import.meta.url)), '..');
const coreAssets = path.join(root, 'src', 'managed', 'lumapay-core');
const suiteManifestPath = path.join(root, 'deployments', 'preprod-suite.json');
const resultPath = path.join(root, 'deployments', 'preprod-smoke.json');

const bytes32 = () => new Uint8Array(randomBytes(32));
const asHex = (value: Uint8Array) => Buffer.from(value).toString('hex');

async function main(): Promise<void> {
    const config = getPreprodConfig();
    const secrets = readDeploymentSecrets();
    const manifest = JSON.parse(await readFile(suiteManifestPath, 'utf8')) as {
        contracts: Record<string, string>;
    };
    const contractAddress = manifest.contracts['invoice-core'];
    if (!contractAddress) throw new Error('Invoice-core suite address is missing.');
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
        logger.info({ expiresAt: session.expiresAt }, 'Authenticated the 1AM indexer session.');
    }
    const snapshotPath = process.env.LUMAPAY_DUST_STATE_FILE?.trim();
    const snapshot = snapshotPath && existsSync(path.resolve(snapshotPath))
        ? await readFile(path.resolve(snapshotPath), 'utf8')
        : undefined;
    const wallet = await LumaPayWalletProvider.build(logger, environment, secrets.wallet, snapshot);

    try {
        await wallet.start();
        const synced = await syncWallet(logger, wallet.wallet);
        const dustState = await waitForDustSnapshot(logger, wallet.wallet);
        const dust = readDustAccount(config.networkId, dustState);
        const balances = readBalances(dustState);
        if (dust.spendableCoins < 1 || balances.dust <= 0n) {
            throw new Error('No spendable DUST coin is available for the real smoke transaction.');
        }

        type CircuitId = keyof ImpureCircuits<unknown> & string;
        const providers = buildProviders<CircuitId>(
            wallet,
            coreAssets,
            secrets.privateStatePassword,
            { ...config, indexer: environment.indexer, indexerWS: environment.indexerWS }
        );
        const compiledContract = CompiledContract.make('LumaPayCore', Contract).pipe(
            CompiledContract.withVacantWitnesses,
            CompiledContract.withCompiledFileAssets(coreAssets)
        );
        const invoiceId = bytes32();
        const merchantIdentity = bytes32();
        const merchantSecret = bytes32();
        const invoiceNonce = bytes32();
        const randomness = bytes32();
        const token = bytes32();
        const amount = 1_000_000n;
        const expiry = BigInt(Math.floor(Date.now() / 1000) + 15 * 60);
        const commitment = pureCircuits.deriveInvoiceCommitment(
            invoiceId,
            merchantIdentity,
            amount,
            token,
            invoiceNonce,
            randomness,
            expiry
        );
        const authorization = pureCircuits.deriveMerchantAuthorization(merchantSecret);
        const deployed = await findDeployedContract(providers, {
            contractAddress,
            compiledContract,
            privateStateId: 'lumapay-preprod-smoke-private-state',
            initialPrivateState: {}
        });

        logger.info({ contractAddress }, 'Submitting a real createInvoice smoke transaction.');
        const result = await deployed.callTx.createInvoice(
            invoiceId,
            commitment,
            authorization,
            expiry
        );
        const state = await providers.publicDataProvider.queryContractState(contractAddress);
        if (!state) throw new Error('Invoice-core state disappeared after the smoke transaction.');
        const opened = ledger(state.data).invoices.lookup(invoiceId);
        if (opened.status !== 0) throw new Error('Smoke invoice did not finalize in OPEN state.');

        await mkdir(path.dirname(resultPath), { recursive: true });
        await writeFile(resultPath, `${JSON.stringify({
            schemaVersion: 1,
            network: config.networkId,
            contractAddress,
            invoiceId: asHex(invoiceId),
            transactionId: String(result.public.txId),
            status: 'OPEN',
            verifiedAt: new Date().toISOString()
        }, null, 2)}\n`);
        logger.info(
            { invoiceId: asHex(invoiceId), transactionId: String(result.public.txId) },
            'Real Preprod invoice transaction finalized and its ledger state was verified.'
        );
    } finally {
        await wallet.stop();
    }
}

main().catch((error: unknown) => {
    logger.error({ err: error }, 'Real Preprod invoice smoke test failed.');
    process.exitCode = 1;
});
