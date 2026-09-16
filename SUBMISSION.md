# LumaPay — Private Payments on Midnight

**Live app:** https://luma-pay-green.vercel.app
**Backend API:** https://lumapay.onrender.com
**Repo:** https://github.com/anikeaty08/lumaPay
**Network:** Midnight Preprod

## What it does

LumaPay is a privacy-preserving payments platform on Midnight. Merchants create invoices, checkout sessions, campaigns, and gift cards; buyers pay with a connected wallet or an ephemeral **burner wallet** for an identity disconnected from their main address.

- **Checkout & pay links** — a self-contained `/pay?opening=…` link carries the full private payment opening; paying it needs no backend lookup.
- **Invoices & campaigns** — standard, multipay, and donation types, with an Explorer for status tracking.
- **Gift cards** — mint and redeem private, escrowed-coin gift cards on-chain.
- **Burner wallets** — one-time keypairs with encrypted on-chain backup/recovery.
- **Merchant dashboard** — analytics, receipts, and **LumaBot**, a Gemini-powered assistant that answers from live dashboard context and triggers real actions.
- **Developer platform** — REST API, SDK docs, an MCP server, Telegram bot integration.

## The problem it solves

Blockchain payment rails are usually fully transparent — anyone can see who paid whom, how much, when. That disqualifies real commerce: payroll, invoicing, gift cards, personal payments all need privacy. LumaPay uses Midnight's shielded, ZK-proof architecture so amounts and participants stay private while the network still verifies correct settlement — on-chain guarantees without public surveillance.

## Challenges I ran into

- **ZK artifact logistics.** Compiled proving/verifying keys run tens of MB per circuit and are consumed from three places (contracts package, backend, frontend). Excluding them as "redundant build output" broke production entirely — they're deployable surface area.
- **Cross-site auth.** Once frontend (Vercel) and backend (Render) sat on different domains, `SameSite=Lax` cookies were silently dropped on every cross-site request — login looked fine, every following call 401'd. Invisible in same-site local dev.
- **Indexer access changed under us.** Our Preprod indexer started gating reads behind wallet-challenge auth, 401ing every chain read. Switched to the official public Midnight indexer, and made chain-read failures degrade per-record instead of failing whole lists.
- **No native gift-card settlement circuit.** Only `createGiftCard`/`redeemGiftCard` exist — paying an invoice with a gift card is composed client-side: redeem to wallet, then pay.
- **Staying honest.** Preprod only has NIGHT settlement live, so cross-token conversion, card checkout, and public→shielded conversion are clearly gated in the UI, not implied as working.

## Technologies I used

Compact (ZK circuits) · React, TypeScript, Vite, Tailwind, Framer Motion · `@midnight-ntwrk/*` dApp Connector + JS SDK · Node.js, Express, Supabase (Postgres) · Midnight indexer (GraphQL) · Google Gemini (function calling) · Vercel + Render · Shield/1AM/Lace-compatible wallets.

## How we built it

Three layers, non-custodial end to end. **Contracts** define the on-chain state machines and ZK circuits — invoice payment/settlement, campaign contributions, gift-card issuance/redemption, encrypted burner-wallet backups. Five modules are live on Preprod; a sixth (card vault) is compiled/tested, pending deployer-wallet sync. **Backend** is a thin gateway that never holds funds or keys — just off-chain metadata plus a read-through view of chain state, with a reconciliation loop that verifies transactions before marking anything settled. **Frontend** drives every proof and signature through the wallet's own connector API, so keys never leave the extension; pay links encode the full private payment opening in the URL.

## What we learned

- Midnight's dual-state model changes how you reason about balance — DUST regenerates toward capacity, so only an indexed transaction ID proves a payment happened.
- Cross-site cookies need `SameSite=None; Secure` the moment frontend/backend split domains.
- Compiled ZK artifacts are deployable surface area, not build detritus.
- Product copy has to track the code exactly — a feature that looks live but silently no-ops erodes trust faster than an honest "not yet."

## What's next for LumaPay

- Deploy card vault, ship LumaPay Card checkout.
- Native stablecoins on Preprod → real cross-token settlement + Oracle pricing.
- A circuit that settles an invoice directly from a gift card's coin.
- Public-to-shielded conversion inside the app.
- LumaBot moving toward proactive payment reminders and reconciliation alerts.
- Mainnet once Midnight mainnet is available.

## Deployed contract addresses (Midnight Preprod)

| Module | Contract address |
| --- | --- |
| Invoice Core | `252404b3ad5a4f02071bb59d3631a86419cf6c6d1b995ccebe78399fe44000b2` |
| Campaigns | `c7ecd023012aaa863f6c8150d55366aed88e2347f47affbb1c71ccdb5dfbd43a` |
| Gift Cards | `5600a4fc947cc5f56f8c2c8540de86e744f74f01e7befd400f7fd7ce41097d37` |
| Quote Checkout | `b75d261021ec1b56b68ff7167e811f7fdd3bf97e17ae26fb1188a8cb7b2c886a` |
| Backup Anchor | `9b9879c4d0c3aa79ec6dbea8e6b1fe8b4c7391ad5cfa319eb7f0a34bd1e0b16d` |
| Card Vault | pending deployer wallet sync |

Smoke evidence: tx `00ea606b6b64eb06ec2bd5dedf211f8ea2dfe4523dd9063d6a69c0c26549b3d506`, invoice `03c3265a09d0335cec6e97b66ecb4680de2ae1e8c373afdc3cf221f0fef1463b`, state `OPEN`.
