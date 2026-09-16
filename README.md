<div align="center">

# LumaPay

### Private invoicing and shielded settlement on Midnight

Create committed invoices, accept private payments, retain verifiable receipts, and disclose only the settlement facts an auditor actually needs.

![LumaPay Midnight architecture](frontend/public/assets/lumapay-system-architecture.png)

</div>

## Why LumaPay

Most blockchain payment products make the payer, merchant, amount, token, balance, and transaction graph easy to correlate. That is a poor default for payroll, freelance invoices, fundraising, subscriptions, business-to-business settlement, and everyday commerce.

LumaPay uses Midnight's shielded assets and Compact zero-knowledge circuits to separate private payment terms from the public state required to prevent replay and prove settlement. The chain receives commitments, nullifiers, expiry, and lifecycle state. Wallet credentials, invoice openings, claim material, and private recovery data stay with the parties that need them.

LumaPay is non-custodial:

- Wallets authorize signatures and transactions directly.
- The backend never receives a mnemonic, seed, private key, or claim secret.
- Supabase stores application metadata and reconciliation caches, not settlement authority.
- Midnight indexed contract state decides whether an invoice, contribution, quote, gift card, or backup anchor is valid.

## Product surface

The application retains the complete desktop and mobile product experience while its execution paths are migrated to Midnight-native boundaries.

| Product area | User outcome | Settlement module |
| --- | --- | --- |
| Private invoices | Commit fixed payment terms, share a private opening, settle once, claim, cancel, or expire | Invoice Core |
| Campaigns and donations | Accept multiple independent contributions while preventing contribution replay | Campaigns |
| Gift cards | Fund shielded gift-card escrow, share a redeemable code, redeem once, or recover after expiry | Gift Cards |
| Quote checkout | Authorize an exact cross-token quote with provider, amount, pair, expiry, and replay checks | Quote Checkout |
| Private backup integrity | Register, update, rotate, and delete a digest for encrypted client-side recovery data | Backup Anchor |
| Hosted checkout | Create an authenticated checkout session and hand a payer to a public settlement page | Backend + settlement module |
| Merchant workspace | View invoices, receipts, settlement state, analytics, QR links, and audit exports | Indexed state + metadata cache |
| Developer tools | Integrate checkout through HTTP, SDK examples, MCP clients, and browser wallet handoff | Backend API + Midnight.js |

The restored interface also contains card-wallet, privacy-wallet, batch-payment, Telegram, and advanced dashboard workflows. See [Implementation status](#implementation-status) for the exact migration state; LumaPay does not present an unfinished compatibility path as a completed Midnight feature.

## Privacy model

### Commit private terms, publish only lifecycle state

A merchant prepares invoice terms locally and derives a domain-separated identifier and commitment. The payment link carries the payer-safe opening needed to validate those terms. The contract stores the minimum public state needed to enforce the invoice lifecycle.

```text
Private invoice terms
        |
        v
Local commitment + opening -----> payment link / QR
        |
        v
Compact circuit validation -----> public commitment, expiry, status
        |
        v
Shielded escrow payment --------> nullifier + receipt commitment
        |
        v
Merchant claim -----------------> terminal settlement proof
```

### Party-owned recovery material

The party who needs a secret retains it:

- The merchant retains claim/cancellation recovery for created invoices.
- The payer retains payment receipt recovery and escrow coin metadata needed by supported follow-up actions.
- A gift-card code contains payer-safe redemption information; issuer recovery is stored separately.
- Encrypted backup payloads remain off-chain. Backup Anchor stores only a digest and authorization commitment.

### Selective disclosure

LumaPay can package signed evidence that binds a disclosed claim to a Midnight wallet address and chain reference. An auditor verifies the signature and only the fields intentionally included in the package. Unrelated wallet history and private invoice metadata are not required.

## Contract architecture

LumaPay uses six independently deployable contracts instead of one monolith. This keeps circuit resources bounded and allows product modules to evolve without redeploying every feature.

### Invoice Core

- Creates commitment-based single-pay invoices.
- Accepts one qualified shielded coin into contract escrow.
- Enforces opening, token, amount, expiry, and replay invariants.
- Supports authenticated merchant claim and cancellation.
- Records terminal status and selectively provable settlement state.

### Campaigns

- Creates multi-pay or donation-style campaigns.
- Tracks independent contribution identifiers and nullifiers.
- Accepts and proves multiple shielded contributions.
- Supports authenticated claims while preserving accepted contributions after campaign closure.

### Gift Cards

- Locks a qualified shielded coin against a gift-card commitment.
- Redeems once to the wallet authorizing the redemption transaction.
- Rejects token, amount, coin, expiry, and replay mismatches.
- Lets only the issuer reclaim an expired card.

### Quote Checkout

- Manages an authorized quote-provider registry.
- Registers exact quote commitments with token pair, amounts, invoice, and expiry.
- Executes converted payment once and invalidates replay.
- Supports provider removal and key rotation.

### Backup Anchor

- Stores only an integrity digest and authorization commitment.
- Supports register, update, authorization rotation, and deletion.
- Never stores encrypted wallet data, passwords, or recovery credentials.

### Card Vault

- Anchors card profile commitments, card-number hashes, metadata digests, NIGHT limits, spend nullifiers, and close status.
- Keeps full card number, authorization secrets, and card metadata encrypted off-chain in the authenticated backend mirror.
- Supports create, metadata update, NIGHT limit update, spend recording, replay rejection, and close/delete lifecycle.

Read the full circuit and state breakdown in [docs/contract-suite.md](docs/contract-suite.md).

## Midnight Preprod deployment

All public identifiers below are synchronized with [`contracts/lumapay/deployments/preprod-suite.json`](contracts/lumapay/deployments/preprod-suite.json) and the package environment examples.

| Module | Contract address |
| --- | --- |
| Invoice Core | `252404b3ad5a4f02071bb59d3631a86419cf6c6d1b995ccebe78399fe44000b2` |
| Campaigns | `c7ecd023012aaa863f6c8150d55366aed88e2347f47affbb1c71ccdb5dfbd43a` |
| Gift Cards | `5600a4fc947cc5f56f8c2c8540de86e744f74f01e7befd400f7fd7ce41097d37` |
| Quote Checkout | `b75d261021ec1b56b68ff7167e811f7fdd3bf97e17ae26fb1188a8cb7b2c886a` |
| Backup Anchor | `9b9879c4d0c3aa79ec6dbea8e6b1fe8b4c7391ad5cfa319eb7f0a34bd1e0b16d` |
| Card Vault | pending deployer wallet sync |

The recorded real-network smoke transaction is:

- Transaction: `00ea606b6b64eb06ec2bd5dedf211f8ea2dfe4523dd9063d6a69c0c26549b3d506`
- Invoice: `03c3265a09d0335cec6e97b66ecb4680de2ae1e8c373afdc3cf221f0fef1463b`
- Indexed state: `OPEN`
- Evidence: [`contracts/lumapay/deployments/preprod-smoke.json`](contracts/lumapay/deployments/preprod-smoke.json)

An unchanged DUST balance does not prove that no transaction occurred. DUST is a renewable transaction resource that can regenerate toward its capacity; contract/indexer state and transaction identifiers are the deployment evidence.

## System architecture

```text
+--------------------------------------------------------------+
| React / Vite                                                 |
| merchant UI | payer UI | wallet connector | local recovery   |
+------------------------+-------------------------------------+
                         | signed wallet actions / public reads
                         v
+--------------------------------------------------------------+
| Midnight boundary                                            |
| Connector 4.x | Midnight.js providers | proof server         |
+------------------------+-------------------------------------+
                         | ZK transactions
                         v
+--------------------------------------------------------------+
| Compact contract suite                                       |
| invoices | campaigns | gift cards | quotes | backups | cards |
+------------------------+-------------------------------------+
                         | indexed public state
                         v
+--------------------------------------------------------------+
| Express backend                                              |
| chain reads | wallet auth | metadata | reconciliation        |
+------------------------+-------------------------------------+
                         | optional persistence
                         v
+--------------------------------------------------------------+
| Supabase                                                     |
| merchants | sessions | metadata | checkout | webhooks        |
+--------------------------------------------------------------+
```

The backend is not a signer for normal user payments. It verifies wallet authentication, reads indexed state, persists merchant-owned metadata, and reconciles public lifecycle changes.

## Wallet connection and authentication

LumaPay discovers installed wallets through `window.midnight` and requires DApp Connector API 4.x.

1. The frontend requests a challenge for the wallet's unshielded address.
2. The backend creates a random, origin-bound challenge with issued-at and expiry times.
3. The wallet signs the exact connector-formatted message.
4. The backend verifies the signature and proves the verifying key maps to the requested Midnight address.
5. The challenge is consumed once and an opaque session token is returned in an HTTP-only, SameSite cookie.
6. Production cookies are marked Secure.

Signing in does not submit a transaction and does not spend DUST. It authenticates merchant API actions for the browser session.

## Repository layout

```text
LumaPay/
├── contracts/lumapay/   Compact source, generated bindings, tests, deploy tools
├── backend/             Express API, indexer gateway, auth, reconciliation, data access
├── frontend/            React/Vite desktop and mobile product interface
├── docs/                Architecture, contracts, API, deployment, frontend, MCP
├── assets/              Source brand and architecture assets
├── .agent-state/        Durable specification, feature ledger, runbook, progress
├── agent.md             Repository operating rules
└── decision.md          Architecture decisions
```

The workspace directory retains its historical filesystem name; shipped package names, UI branding, environment keys, contracts, and documentation use LumaPay.

## Prerequisites

- Node.js 22 or newer
- npm
- WSL for the pinned Compact compiler workflow on Windows
- Docker when running the local proof server
- A compatible Midnight Connector 4.x wallet for browser transactions
- Preprod DUST when submitting real transactions
- Supabase only when testing hosted persistence

## Environment setup

Each package has a secret-free `.env.example`. A root template is also provided for reference.

```powershell
Copy-Item contracts/lumapay/.env.example contracts/lumapay/.env
Copy-Item backend/.env.example backend/.env
Copy-Item frontend/.env.example frontend/.env
```

Add real secrets only to ignored `.env` files. Never commit:

- wallet mnemonic or seed;
- issuer, registry, attester, or authorization secrets;
- private-state password;
- Supabase service-role key;
- encryption key;
- API keys or webhook signing secrets.

Default Preprod services:

| Service | Endpoint |
| --- | --- |
| Indexer HTTP | `https://api-preprod.1am.xyz/api/v4/graphql` |
| Indexer WebSocket | `wss://api-preprod.1am.xyz/api/v4/graphql/ws` |
| Node WebSocket | `wss://rpc.preprod.midnight.network` |
| Local proof server | `http://127.0.0.1:6300` |

## Install and run

Install each workspace independently:

```powershell
Set-Location contracts/lumapay
npm install

Set-Location ../../backend
npm install

Set-Location ../frontend
npm install
```

Start the backend:

```powershell
Set-Location backend
npm start
```

Start the frontend in another terminal:

```powershell
Set-Location frontend
npm run dev
```

Open `http://localhost:5173`.

## Verification

### Contracts

```powershell
Set-Location contracts/lumapay
npm run verify
```

This compiles the Compact suite, rebuilds generated bindings, type-checks deployment code, and runs lifecycle, authorization, replay, expiry, privacy, and toolchain tests.

### Backend

```powershell
Set-Location backend
npm run verify
```

This runs the backend legacy guard and API/authentication tests.

### Frontend

```powershell
Set-Location frontend
npm run build
npm run preview -- --host 127.0.0.1 --port 4173
npm run test:ui
npm run check:legacy
```

The responsive UI smoke covers the preserved landing page, desktop wallet modal, keyboard close behavior, installed-wallet detection, and mobile bottom-sheet layout.

### Real Preprod smoke

This command submits a real transaction. Run it only with an intentionally funded test wallet and a local proof server:

```powershell
Set-Location contracts/lumapay
npm run proof:preprod
npm run deploy:preprod:check
npm run smoke:preprod
```

## Backend API

All routes use the `/api/v1` namespace except health.

| Method | Route | Purpose | Authentication |
| --- | --- | --- | --- |
| `GET` | `/health` | Process and configured network health | Public |
| `GET` | `/api/v1/midnight/status` | Indexer/network status | Public |
| `GET` | `/api/v1/contracts` | Configured contract suite | Public |
| `POST` | `/api/v1/auth/challenges` | Create origin-bound wallet challenge | Public |
| `POST` | `/api/v1/auth/sessions` | Verify signature and create session | Signed challenge |
| `GET` | `/api/v1/auth/session` | Inspect current wallet session | Session cookie |
| `DELETE` | `/api/v1/auth/session` | Revoke current session | Session cookie |
| `GET` | `/api/v1/chain/invoices/:id` | Read canonical invoice state | Public |
| `GET` | `/api/v1/chain/campaigns/:id` | Read canonical campaign state | Public |
| `GET` | `/api/v1/chain/contributions/:id` | Read contribution state | Public |
| `GET` | `/api/v1/chain/gift-cards/:id` | Read gift-card state | Public |
| `GET` | `/api/v1/chain/quotes/:id` | Read quote state | Public |
| `GET` | `/api/v1/chain/quote-providers/:id` | Read quote-provider state | Public |
| `GET` | `/api/v1/chain/backup-anchors/:id` | Read backup anchor | Public |
| `GET` | `/api/v1/chain/card-vaults/:id` | Read card-vault public state | Public |
| `GET` | `/api/v1/chain/card-spends/:id` | Read card spend record | Public |
| `POST` | `/api/v1/merchants` | Create wallet-bound merchant | Session cookie |
| `POST` | `/api/v1/invoices` | Store invoice metadata | Session or API key |
| `GET` | `/api/v1/invoices` | List the authenticated merchant's invoices with canonical state | Session or API key |
| `GET` | `/api/v1/invoices/:id` | Read metadata plus chain status | Public |
| `POST` | `/api/v1/invoices/:id/reconcile` | Reconcile transaction/status | Session or API key |
| `POST` | `/api/v1/campaigns` | Store campaign metadata after on-chain creation | Session or API key |
| `GET` | `/api/v1/campaigns` | List owned campaigns, contributions, and verified claim material | Session or API key |
| `GET` | `/api/v1/campaigns/:id` | Resolve payer-safe campaign metadata | Public |
| `POST` | `/api/v1/campaigns/:id/reconcile` | Reconcile campaign status after cancel/expire | Session or API key |
| `POST` | `/api/v1/campaigns/:id/contributions` | Register a settled contribution and verify escrow material | Public payer handoff |
| `POST` | `/api/v1/campaigns/:id/contributions/:contributionId/reconcile` | Reconcile contribution claim state | Session or API key |
| `GET` | `/api/v1/cards/current` | Read authenticated card mirror | Session cookie |
| `POST` | `/api/v1/cards` | Store encrypted card-vault mirror metadata | Session cookie |
| `POST` | `/api/v1/cards/lookup` | Resolve payer-safe card metadata by card hash | Public |
| `POST` | `/api/v1/cards/limits` | Update authenticated card NIGHT limit mirror | Session cookie |
| `POST` | `/api/v1/cards/spend` | Record NIGHT-only card spend metadata | Session cookie |
| `DELETE` | `/api/v1/cards/current` | Mark authenticated card closed after card-vault close | Session cookie |
| `POST` | `/api/v1/checkout-sessions` | Create hosted checkout | Session or API key |
| `GET` | `/api/v1/checkout-sessions/:id` | Resolve hosted checkout | Public |
| `POST` | `/api/v1/checkout-sessions/:id/reconcile` | Verify and reconcile a submitted checkout transaction | Public checkout handoff |

See [docs/backend-api.md](docs/backend-api.md) for validation and response details.

## Supabase migrations

Apply migrations in order:

1. [`backend/supabase/migrations/001_midnight_core.sql`](backend/supabase/migrations/001_midnight_core.sql)
2. [`backend/supabase/migrations/002_wallet_auth.sql`](backend/supabase/migrations/002_wallet_auth.sql)
3. [`backend/supabase/migrations/003_checkout_payment_opening.sql`](backend/supabase/migrations/003_checkout_payment_opening.sql)
4. [`backend/supabase/migrations/004_campaign_registry.sql`](backend/supabase/migrations/004_campaign_registry.sql)
5. [`backend/supabase/migrations/005_card_wallets.sql`](backend/supabase/migrations/005_card_wallets.sql)

The application can use an in-memory repository for tests. Production metadata, wallet challenges, sessions, checkout sessions, and reconciliation state belong in Supabase.

## MCP and agent integrations

LumaPay's MCP boundary is intended for invoice creation, lookup, reconciliation, and checkout orchestration. An agent may prepare actions or return a browser handoff, but user wallet transactions still require the wallet-controlled signing surface.

Start with [docs/lumapay-mcp-server.md](docs/lumapay-mcp-server.md). Any published MCP command must use the same contract identifiers, API routes, network endpoints, and non-custodial rules described here.

## Implementation status

LumaPay is being migrated in verified vertical slices. Current authoritative status lives in [`.agent-state/feature-list.json`](.agent-state/feature-list.json).

### Verified

- Six-module Compact lifecycle tests: 25/25 passing.
- Five Preprod contract addresses and indexed invoice creation evidence; card-vault is compiled/tested and waiting on deployer wallet sync.
- Backend Midnight chain reads and reconciliation foundation.
- Origin-bound wallet signature authentication, merchant invoice/campaign listing, payer-safe checkout, card chain reads, and claim-material validation: 18/18 backend tests passing.
- Hosted checkout reads canonical terms, pays Invoice Core, stores payer recovery locally, and reconciles through the backend.
- Dashboard and invoice details read authenticated merchant metadata plus indexed state; standard invoices use direct Midnight cancel, expire, claim, and receipt-verification adapters.
- Direct invoice/campaign create and pay adapters.
- Card-vault create, NIGHT limit, close/delete frontend adapter plus authenticated backend card mirror routes.
- Gift-card create/redeem adapter and contract tests.
- Restored LumaPay desktop/mobile interface.
- Responsive wallet connection interface and UI smoke.
- LumaPay architecture and brand image assets.

### Still being completed

- Real hosted checkout settlement integration tests.
- Complete dashboard/indexed-state migration for secondary widgets.
- Real Preprod pay/claim and gift-card redeem/reclaim smoke evidence.
- Quote-provider production workflow and converted checkout UI.
- Card-vault Preprod deployment and native card top-up/sweep/payment private-transfer adapter.
- Privacy-wallet restore/sweep migration.
- Batch-payment orchestration.
- Remaining developer, audit, QR, monitoring, and Telegram reconciliation.
- Removal of every remaining compatibility import, obsolete explorer URL, misleading claim, and corrupted text glyph.

This distinction is deliberate: a visible route is not considered migrated until its real Midnight boundary and acceptance test pass.

## Security invariants

- Never log or persist wallet recovery material.
- Never embed populated secrets in example files, screenshots, fixtures, manifests, or documentation.
- Bind authentication challenges to address, origin, nonce, issue time, expiry, network, and purpose.
- Consume each challenge once and store only hashed session tokens.
- Validate every 32-byte identifier at API boundaries.
- Treat every contract transition as replay-sensitive.
- Keep merchant claim material separate from payer receipt material.
- Store only a digest for encrypted recovery backups.
- Validate chain state before accepting cached metadata as settled.
- Do not invent an explorer URL; show copyable transaction identifiers until an authoritative public explorer is configured.

## Documentation

- [Architecture](docs/architecture.md)
- [Contract suite](docs/contract-suite.md)
- [Deployment](docs/deployment.md)
- [Backend API](docs/backend-api.md)
- [Frontend integration](docs/frontend.md)
- [MCP setup](docs/lumapay-mcp-server.md)
- [Agent guide](agent.md)
- [Architecture decisions](decision.md)
- [Migration runbook](.agent-state/runbook.md)
- [Feature acceptance ledger](.agent-state/feature-list.json)

## License

See the package-level license metadata before redistribution. Midnight SDK and Compact toolchain components remain subject to their respective upstream licenses.
