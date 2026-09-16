# LumaPay migration runbook

## Prerequisites

- Windows PowerShell, Node.js 22 or newer, npm, WSL, and the Compact compiler version pinned by `contracts/lumapay/.compact-version`.
- Docker for the local proof server when generating proofs.
- Copy each `.env.example` to `.env` only in its own package. Never put real mnemonics, seeds, auth secrets, or private-state passwords in tracked files.
- Preprod uses the contract IDs in `contracts/lumapay/deployments/preprod-suite.json`.

## Install

```powershell
Set-Location contracts/lumapay; npm install
Set-Location ../../backend; npm install
Set-Location ../frontend; npm install
```

## Contract verification

Fast lifecycle tests:

```powershell
Set-Location contracts/lumapay
npm test
```

Full compile, generated bindings, deployment type-check, and tests:

```powershell
npm run verify
```

Real Preprod smoke requires an intentionally funded test wallet and a local proof server:

```powershell
npm run proof:preprod
npm run deploy:preprod:check
npm run smoke:preprod
```

## Backend verification and run

```powershell
Set-Location backend
npm run verify
npm start
```

Apply both Supabase migrations in order when using hosted persistence:

1. `backend/supabase/migrations/001_initial.sql`
2. `backend/supabase/migrations/002_wallet_auth.sql`

## Frontend verification and run

```powershell
Set-Location frontend
npm run build
npm run check:legacy
npm run preview -- --host 127.0.0.1 --port 4173
npm run test:ui
```

`check:legacy` is expected to fail until the migration inventory reaches zero. Treat each reported source file as unfinished; do not weaken the guard.

## Fast baseline

```powershell
Set-Location contracts/lumapay; npm test
Set-Location ../../backend; npm run verify
Set-Location ../frontend; npm run build
```

Current expected baseline on 2026-09-08: contract tests 23/23, backend tests 9/9, frontend production build passes, responsive wallet UI smoke passes, frontend legacy guard fails while remaining feature modules are migrated.

## Known environment limits

- The public transaction explorer base URL is intentionally unset until an authoritative Midnight URL is verified.
- Real wallet-approval flows require an installed Connector 4.x wallet and user approval in the extension.
- Telegram and hosted Supabase integration require deployment-specific credentials not stored in this repository.
