# LumaPay migration progress

## Current status - 2026-09-08

The migration is active. Compact contracts, backend foundation, and the restored frontend build are verified. The application is not fully migrated yet because card-vault deployment is still waiting on wallet sync, and several secondary feature modules still need native Midnight replacements for former compatibility execution paths.

### Proven slices

- Six Compact modules compile; five have Preprod contract IDs in `contracts/lumapay/deployments/preprod-suite.json`, and card-vault is awaiting deployment.
- Contract lifecycle/invariant tests pass 25/25.
- Real Preprod invoice creation/read smoke is recorded in `preprod-smoke.json`.
- Express backend uses Midnight indexed reads and passes 18/18 tests, including typed public reads for deployed modules and card-vault read routes.
- Wallet authentication verifies origin-bound, expiring, single-use Midnight signatures and stores opaque session cookies.
- Direct invoice and campaign creation/payment adapters and gift-card create/redeem adapters use Midnight.js.
- Restored frontend layout is retained and rebranded to LumaPay.
- Wallet modal redesign preserves button placement and passes desktop/mobile smoke, including installed-wallet startup discovery.
- Replacement LumaPay raster architecture and brand assets exist.
- Hosted checkout resolves payer-safe terms, validates canonical state, pays Invoice Core through Midnight.js, stores payer recovery material locally, and reconciles settlement through the backend.
- The rich root README has been restored around the LumaPay/Midnight architecture and verified deployment evidence.
- Merchant dashboard and invoice details load authenticated API/indexer data and use Invoice Core cancel, expire, claim, and receipt verification instead of record scraping.
- Checkout reconciliation accepts merchant claim coordinates only after verifying them against the on-chain escrow commitment.
- Profile QR creates a reusable Campaigns payment opening, and payment notifications poll authenticated indexed state rather than wallet records or direct Supabase subscriptions.
- Campaign metadata registration, contribution registration, contribution history, merchant claim-material exposure, and dashboard cancel/expire/claim adapters are wired through the Campaigns contract and backend registry.
- The new `lumapay-card-vault.compact` deployable module compiles, is copied into managed artifacts, is included in suite build/deploy scripts, and has lifecycle/replay/limit tests.
- Card wallet registration, NIGHT limit updates, and close/delete now use a Midnight card-vault frontend adapter plus authenticated `/api/v1/cards` backend mirror routes.
- Active Preprod payment/card creation UI is narrowed to NIGHT; USDCX/USAD are not exposed as live Preprod payment choices.
- BatchPay uses the connected Midnight wallet payment adapter for NIGHT invoices; inactive stablecoin execution paths are not exposed on Preprod.
- Local preview and backend are currently running at `http://127.0.0.1:4173/` and `http://127.0.0.1:3000/health`, so wallet sign-in has a local API target.

### Baseline evidence from this session

- `contracts/lumapay: npm test` - PASS, 25 tests.
- `backend: npm run verify` - PASS, legacy guard plus 18 tests.
- `frontend: npm run build` - PASS, 4,960 modules transformed after card-vault/NIGHT-only updates.
- `frontend: npm run check:legacy` - PASS for the guarded shipped frontend source/package scan.
- `frontend: npm run test:ui` - PASS for preserved home, hosted checkout, desktop wallet dialog, keyboard close, and mobile bottom sheet.

### Open defects and risks

- Card-vault deployment is still waiting for the deployer wallet/indexer sync to reach the funded DUST UTXO. Latest observed sync was about `170,257 / 1,494,167`.
- Card top-up now routes through the connected Midnight wallet private-transfer adapter for native shielded recipients, but existing pseudo card addresses are rejected until card-vault deployment/native card-address creation finishes.
- Card sweep/private-balance scan and burner wallet sweep are fail-closed until native Midnight spend-authority support is available; the old compatibility execution layer has been removed from shipped frontend source.
- Broad legacy grep is clean for Aleo/Provable execution markers in frontend/backend/docs/README/.agent-state except frozen package metadata outside shipped source.
- Gift-card and payment escrow coin-index recovery is implemented but still needs real Preprod redemption/payment verification.
- A real wallet-approved hosted checkout payment still needs Preprod verification; browser smoke currently verifies session resolution and the preserved payment-method surface.

### Exact next slice

Finish card-vault Preprod deployment once wallet sync reaches spendable DUST, write the deployed address into manifests/env docs, then continue native private-transfer support for card top-up/sweep/payment, burner, batch-pay, gift-card recovery, quote checkout, and remaining developer/audit surfaces.
