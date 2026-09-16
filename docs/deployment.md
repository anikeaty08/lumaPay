# Deployment

The LumaPay Preprod deployment is in progress. Five modules are deployed and indexed in `contracts/lumapay/deployments/preprod-suite.json`; `card-vault` is compiled/tested and is waiting for the deployer wallet sync before its address can be written.

## Services

- Node: `wss://rpc.preprod.midnight.network`
- Indexer HTTP: `https://api-preprod.1am.xyz/api/v4/graphql`
- Indexer WebSocket: `wss://api-preprod.1am.xyz/api/v4/graphql/ws`
- Node WebSocket: `wss://rpc.preprod.midnight.network`
- Proof server: local `http://127.0.0.1:6300`

## Commands

```bash
cd contracts/lumapay
npm run deploy:preprod:check
npm run deploy:suite:preprod
npm run smoke:preprod
```

The suite deployer is manifest-aware: it skips modules that already have a `preprod.<module>.json` manifest and deploys missing modules only. A deployment must be confirmed by querying indexed contract state. Wallet UI DUST may remain at its capacity after fees because DUST regenerates; it is not a deployment receipt.

Never place credentials in `.env.example`, documentation, deployment manifests, screenshots, or logs.
