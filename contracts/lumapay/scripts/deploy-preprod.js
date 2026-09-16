import { mkdir, readFile, rename, writeFile } from 'node:fs/promises';
import path from 'node:path';
import { fileURLToPath } from 'node:url';
import { WebSocket } from 'ws';
import pino from 'pino';
import { setNetworkId } from '@midnight-ntwrk/midnight-js-network-id';
import { deployContract } from '@midnight-ntwrk/midnight-js-contracts';
import { createCompiledLumaPayContract, ledger, LUMAPAY_COMMITMENT_VERSION, LUMAPAY_PRIVATE_STATE_ID, pureCircuits } from '../src/index.js';
import { getPreprodConfig } from '../deploy/config.js';
import { readDeploymentSecrets } from '../deploy/env.js';
import { buildProviders } from '../deploy/providers.js';
import { ensureDust, LumaPayWalletProvider, readBalances, syncWallet } from '../deploy/wallet.js';
globalThis.WebSocket = WebSocket;
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
const compiledAssetPath = path.join(contractRoot, 'src', 'managed', 'lumapay');
const deploymentDirectory = path.join(contractRoot, 'deployments');
const deploymentManifest = path.join(deploymentDirectory, 'preprod.json');
const checkOnly = process.argv.includes('--check');
async function probe(url, label) {
    const response = await fetch(url, { signal: AbortSignal.timeout(10_000) });
    if (!response.ok) {
        throw new Error(`${label} failed with HTTP ${response.status}.`);
    }
}
async function existingDeployment() {
    try {
        const parsed = JSON.parse(await readFile(deploymentManifest, 'utf8'));
        return parsed.contractAddress;
    }
    catch (error) {
        const code = error.code;
        if (code === 'ENOENT')
            return undefined;
        throw error;
    }
}
async function writeDeploymentManifest(data) {
    await mkdir(deploymentDirectory, { recursive: true });
    const temporary = `${deploymentManifest}.${process.pid}.tmp`;
    await writeFile(temporary, `${JSON.stringify(data, null, 2)}\n`, {
        encoding: 'utf8',
        flag: 'wx'
    });
    await rename(temporary, deploymentManifest);
}
async function main() {
    const config = getPreprodConfig();
    const secrets = readDeploymentSecrets();
    setNetworkId(config.networkId);
    await Promise.all([
        probe(`${config.proofServer}/health`, 'Proof-server health check'),
        probe(config.indexer, 'Preprod indexer check'),
        probe(config.node, 'Preprod node check')
    ]);
    logger.info('Preprod node, indexer, and local proof server are reachable.');
    const environment = {
        walletNetworkId: config.networkId,
        networkId: config.networkId,
        indexer: config.indexer,
        indexerWS: config.indexerWS,
        node: config.node,
        nodeWS: config.nodeWS,
        faucet: '',
        proofServer: config.proofServer
    };
    const wallet = await LumaPayWalletProvider.build(logger, environment, secrets.wallet);
    try {
        await wallet.start();
        const syncedState = await syncWallet(logger, wallet.wallet);
        const address = wallet.getAddress(config.networkId, syncedState);
        const balances = readBalances(syncedState);
        logger.info({ address, night: balances.night.toString(), dust: balances.dust.toString() }, 'Preprod wallet is synced.');
        if (balances.night <= 0n) {
            throw new Error(`Wallet has no tNIGHT. Fund ${address} at ${config.faucet}`);
        }
        if (checkOnly) {
            logger.info('Preprod deployment check passed; no transaction was submitted.');
            return;
        }
        const previousAddress = await existingDeployment();
        if (previousAddress && process.env.LUMAPAY_ALLOW_REDEPLOY !== 'true') {
            throw new Error(`A deployment already exists at ${previousAddress}. ` +
                'Set LUMAPAY_ALLOW_REDEPLOY=true only for an intentional replacement.');
        }
        const dust = balances.dust > 0n
            ? balances.dust
            : await ensureDust(logger, wallet, syncedState);
        logger.info({ dust: dust.toString() }, 'Spendable DUST is available.');
        const providers = buildProviders(wallet, compiledAssetPath, secrets.privateStatePassword, config);
        const compiledContract = createCompiledLumaPayContract(compiledAssetPath);
        const registryAdminAuthorization = pureCircuits.deriveRegistryAdminAuthorization(secrets.registryAdminSecret);
        logger.info('Submitting the LumaPay contract deployment to Midnight Preprod.');
        const deployed = await deployContract(providers, {
            compiledContract,
            privateStateId: LUMAPAY_PRIVATE_STATE_ID,
            initialPrivateState: {},
            args: [registryAdminAuthorization]
        });
        const contractAddress = deployed.deployTxData.public.contractAddress;
        const state = await providers.publicDataProvider.queryContractState(contractAddress);
        if (!state)
            throw new Error('Indexer did not return the deployed contract state.');
        const deployedLedger = ledger(state.data);
        if (Buffer.compare(Buffer.from(deployedLedger.registryAdminAuthorization), Buffer.from(registryAdminAuthorization)) !== 0) {
            throw new Error('Deployed registry-admin commitment does not match local derivation.');
        }
        await writeDeploymentManifest({
            schemaVersion: 1,
            product: 'LumaPay',
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
    }
    finally {
        await wallet.stop();
    }
}
main().catch((error) => {
    logger.error({ error }, 'LumaPay Preprod deployment failed.');
    process.exitCode = 1;
});
//# sourceMappingURL=deploy-preprod.js.map