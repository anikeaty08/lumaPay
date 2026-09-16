# LumaPay Midnight contract suite

This package is the Midnight-native settlement layer for LumaPay. It contains the Compact contracts, generated bindings, tests, deployment scripts, and Preprod manifests used by the frontend and backend.

The suite is intentionally split into bounded modules:

- `lumapay-core.compact` — committed private invoices, payment, claim, cancel, expire, and settlement proof.
- `lumapay-campaigns.compact` — multipay and donation campaigns with contribution replay protection.
- `lumapay-gift-cards.compact` — private gift-card escrow, single redemption, and issuer reclaim after expiry.
- `lumapay-quote-checkout.compact` — quote-provider registry and exact quoted checkout lifecycle.
- `lumapay-backup-anchor.compact` — digest-only encrypted recovery integrity anchors.
- `lumapay-card-vault.compact` — card profile commitments, NIGHT limits, spend nullifiers, and close lifecycle.

Private openings, payer receipt secrets, merchant claim secrets, backup payloads, and card metadata do not belong on-chain. The contracts store commitments, nullifiers, lifecycle state, expiry, and other public facts needed to verify correctness.

## Compile and verify

On Windows, the pinned Compact compiler workflow runs through WSL:

```powershell
npm run verify
```

That command:

1. compiles the Compact suite;
2. rebuilds generated managed artifacts;
3. type-checks deployment scripts;
4. runs lifecycle, replay, expiry, authorization, and privacy invariant tests.

For faster local loops:

```powershell
npm run compile:suite:wsl
npm run build
npm test
```

## Preprod deployment

Deployment uses the Midnight Preprod indexer, node, local proof server, and a funded test wallet configured only in a private `.env` file.

```powershell
Copy-Item .env.example .env
npm run proof:preprod
npm run deploy:preprod:check
npm run deploy:suite:preprod
```

Current public manifests live in `deployments/`:

- `preprod-suite.json` — deployed five-module suite manifest.
- `preprod.json` — Invoice Core manifest.
- `preprod.campaigns.json` — Campaigns manifest.
- `preprod.gift-cards.json` — Gift Cards manifest.
- `preprod.quote-checkout.json` — Quote Checkout manifest.
- `preprod.backup-anchor.json` — Backup Anchor manifest.
- `preprod.card-vault.json` — Card Vault manifest, created only after the running deployer wallet sync completes.
- `preprod-smoke.json` — real indexed Preprod smoke evidence.

The deployer is manifest-aware and skips modules that already have manifests unless an explicit redeploy override is supplied.

## Security rules

- Never commit a populated `.env`.
- Never commit mnemonics, seeds, registry/admin secrets, private-state passwords, or raw wallet material.
- Keep issuer, registry/admin, attester, and backup/card authorization secrets separate.
- Verify contract state through the indexer before treating a transaction as authoritative.
- Treat DUST wallet UI balance as fee-capacity information, not as the deployment receipt.
