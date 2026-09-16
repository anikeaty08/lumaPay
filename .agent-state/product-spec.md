# LumaPay Midnight migration product specification

## Purpose

LumaPay is the Midnight-native continuation of NullPay: a privacy-first invoicing and payments application for merchants, payers, developers, and auditors. The migration must retain the existing product surface and frontend composition while replacing the former chain implementation with Compact contracts, Midnight.js, and Midnight wallet APIs.

## Users and workflows

- Merchants connect a Midnight wallet, authenticate by signing an origin-bound message, create invoices or campaigns, share payment links, monitor settlement, claim funds, manage recovery data, and export audit evidence.
- Payers open direct or hosted payment links, validate the committed terms, pay with a connected Midnight wallet or supported product rail, and retain a verifiable receipt.
- Gift-card issuers fund private cards and recipients redeem them once.
- Developers use the backend API, checkout sessions, SDK examples, and MCP server without receiving or storing user wallet secrets.
- Auditors verify selectively disclosed settlement evidence without receiving unrelated private data.

## In scope

1. Preserve the restored desktop and mobile layouts, routes, copy density, interactions, and feature entry points while rebranding the product to LumaPay.
2. Implement the full former NullPay feature surface on Midnight: invoices, multi-pay campaigns, direct pay, hosted checkout, quote conversion, gift cards, card wallet, burner/privacy wallet, batch pay, merchant dashboard, invoice lifecycle actions, receipts, selective disclosure/auditing, SDK/developer flows, MCP, Telegram integration, settings, QR, and support.
3. Use deployed Compact contracts and indexed Midnight state as settlement authority.
4. Keep wallet signing and private state client-side. Never send mnemonics, seeds, private keys, claim secrets, or private-state passwords to the backend.
5. Remove former-chain source, dependencies, URLs, identifiers, compatibility shims, generated artifacts, documentation, and branding.
6. Maintain rich product documentation comparable to the previous README, updated truthfully for LumaPay and Midnight.
7. Test contracts, backend, frontend, persistence boundaries, responsive UI, and real Preprod interactions in proportion to risk.

## Explicit non-goals

- Replacing the existing React/Vite, Express, Supabase, or Compact/Midnight.js stack.
- Redesigning the frontend information architecture or removing existing product features to make migration easier.
- Custodial signing, server-side storage of wallet recovery material, or synthetic chain data presented as real settlement.
- Inventing unverified explorer URLs or claiming unsupported routes work.

## Architectural constraints

- Contract-first order: Compact contracts and deployment evidence, backend/indexer boundary, frontend adapters, then end-to-end QA.
- Five deployed modules currently define the settlement boundary: Invoice Core, Campaigns, Gift Cards, Quote Checkout, and Backup Anchor.
- Unix seconds are used at contract/API expiry boundaries.
- Public indexed state is authoritative; Supabase stores metadata, wallet-auth sessions, and reconciliation caches.
- Direct DApp Connector 4.x wallet integration; no compatibility layer for the former wallet SDK.
- Preserve secrets outside tracked example files and logs.

## Definition of done

The migration is complete only when:

- every feature in `feature-list.json` is `passing` with reproducible evidence;
- all five required contracts compile, type-check, pass tests, are indexed on Preprod, and their real workflows are smoke-tested;
- all frontend routes render and every action either executes its Midnight workflow or clearly represents a deliberately unavailable external dependency, not a hidden legacy stub;
- backend authentication, chain reads, metadata persistence, reconciliation, checkout, and webhooks pass focused and integration tests;
- no former-chain code, dependencies, URLs, generated artifacts, filenames, branding, or misleading documentation remain outside a deliberately constructed migration guard;
- root and component READMEs, environment examples, MCP docs, deployment docs, and architecture assets reflect the shipped implementation;
- desktop and mobile smoke tests pass, including wallet connection states;
- real Preprod evidence exists for the critical create/pay/claim or redeem lifecycle paths, not only local simulation.

## Unresolved decisions

- A Midnight-native card-wallet settlement design is still required. The existing five-contract suite has no dedicated card-vault lifecycle.
- The authoritative public Midnight transaction-explorer URL is not configured; UI must use copy-only behavior until a verified URL is supplied.
- Telegram production credentials and a deployed Supabase instance are external environment inputs; tests must use local/in-memory boundaries when those services are unavailable.
