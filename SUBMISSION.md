# LumaPay — Private Payments on Midnight

**Live app:** https://luma-pay-green.vercel.app
**Backend API:** https://lumapay.onrender.com
**Repo:** https://github.com/anikeaty08/lumaPay
**Network:** Midnight Preprod

---

## What it does

LumaPay is a privacy-preserving payments platform built on Midnight. Merchants create invoices, checkout sessions, campaigns (multipay/donation), and gift cards; buyers pay with a connected Midnight wallet — or an ephemeral **burner wallet** for a payment identity fully disconnected from their main address. Every invoice, payment, and settlement is backed by a zero-knowledge proof: the network verifies the payment is valid and correctly routed without exposing the amount or the parties involved.

Core surfaces:
- **Hosted checkout & shareable pay links** — a checkout session or a self-contained `/pay?opening=…` link that carries the full private payment opening, so paying it doesn't depend on any backend lookup.
- **Private invoices & campaigns** — standard, multipay, and donation invoice types, with an Explorer for tracking invoice/payment status.
- **Gift cards** — mint and redeem private, escrowed-coin gift cards on-chain.
- **Burner wallets** — one-time keypairs for anonymous payments, with encrypted on-chain backup/recovery.
- **Merchant dashboard** — analytics, receipts, and **LumaBot**, an AI assistant (Gemini function-calling) that can answer questions from live dashboard context and trigger real actions (create an invoice, sweep burner funds, open a payment flow).
- **Developer platform** — a documented REST API, SDK reference, an MCP server, and Telegram bot integration docs.

## The problem it solves

Most blockchain payment rails are fully transparent by default — anyone can see who paid whom, how much, and when. That's disqualifying for real commerce: payroll, invoicing, gift cards, and everyday personal payments all need privacy. LumaPay uses Midnight's shielded, ZK-proof architecture so payment amounts and participant identities stay private while the network still enforces and verifies correct settlement — the guarantees of on-chain settlement without the surveillance of a fully public ledger.

## Challenges I ran into

- **ZK artifact logistics.** Compact circuits compile through a pinned toolchain (WSL-only on Windows) into proving/verifying keys that run tens of MB *per circuit*. Those compiled artifacts are consumed from three different places (the contracts package's own export map, the backend's contract loader, and the frontend's in-browser proof generation) and had to be treated as deployment-critical binaries, not disposable build output — excluding them as "redundant" initially broke the production build entirely.
- **Cross-site auth.** Once the frontend (Vercel) and backend (Render) moved to different domains, session cookies set with `SameSite=Lax` were silently dropped on every cross-site request. Wallet connect looked like it worked, but every following authenticated call failed — invisible in local dev, where everything is same-site.
- **Indexer access changed under us.** The Preprod indexer we were pointed at started gating reads behind wallet-challenge/API-key auth, taking down every on-chain state lookup with a 401. Moved to the officially-operated public Midnight Preprod indexer instead, and made chain-read failures degrade per-record instead of failing an entire invoice list.
- **No native settlement path for gift cards.** The contracts expose `createGiftCard`/`redeemGiftCard`, but nothing that settles an invoice directly from a gift card's escrowed coin. Paying with a gift card had to be composed client-side: redeem to the connected wallet, then pay normally.
- **Being honest about what's live.** Preprod only has a deployed NIGHT settlement path — no native stablecoin contracts yet — so cross-token conversion, card checkout, and public→shielded conversion all had to be clearly gated in the product UI rather than implied as working.

## Technologies I used

- **Contracts:** Compact (Midnight's ZK circuit language), compiled via the pinned Compact compiler toolchain.
- **Frontend:** React, TypeScript, Vite, Tailwind CSS, Framer Motion, React Router; `@midnight-ntwrk/*` (dApp Connector API, Midnight JS SDK) for wallet connection, in-browser proof generation, and indexer queries.
- **Backend:** Node.js, Express, Supabase (Postgres) for off-chain merchant metadata, the Midnight indexer (GraphQL) for on-chain state, a reconciliation service, and webhook dispatch.
- **AI:** Google Gemini (native function calling) powering LumaBot.
- **Network:** Midnight Preprod — `rpc.preprod.midnight.network` (node), `indexer.preprod.midnight.network` (indexer).
- **Deployment:** Vercel (frontend), Render (backend).
- **Wallets:** Shield / 1AM / Lace-compatible Midnight dApp-connector wallets, plus a custom burner-wallet layer.

## How we built it

Three layers, deliberately non-custodial end to end:

1. **Contracts** define the on-chain state machines and ZK circuits: invoice creation/payment/settlement, campaign contributions, gift-card issuance/redemption/reclaim, and encrypted burner-wallet backup anchoring. Five modules are deployed to Preprod (see addresses below); a sixth (card vault) is compiled and tested, pending deployer-wallet sync.
2. **Backend** is a thin gateway — it never holds funds or private keys. It stores only off-chain metadata (titles, memos, merchant profiles) and a read-through view of on-chain state via the indexer, and runs a reconciliation loop that verifies a submitted transaction against the chain before marking anything settled.
3. **Frontend** drives every proof generation and signature through the connected wallet's own dApp-connector API, so private keys never leave the wallet extension. Checkout links encode the entire private payment opening in the URL itself, so paying one doesn't require a backend round-trip beyond optional state lookups.

## What we learned

- Midnight's dual-state (shielded/unshielded) token model changes how you reason about "balance" — DUST regenerates toward capacity, so an unchanged balance doesn't prove a transaction didn't happen; only an indexed transaction ID does.
- Cross-site cookie auth needs `SameSite=None; Secure` the moment frontend and backend live on different domains — an easy miss when everything works fine in same-site local dev.
- Compiled ZK artifacts are part of the deployable surface area, not build detritus — plan repo/CI strategy around that from day one.
- Product copy has to track the code exactly on a fast-moving Preprod build; a feature that "looks" live but silently no-ops erodes trust faster than an honest "not yet" label.

## What's next for LumaPay

- Deploy the **card vault** contract and ship LumaPay Card (PIN + secret) checkout.
- Native stablecoin contracts on Midnight Preprod, unlocking real cross-token settlement and the Oracle conversion pricing layer.
- An on-chain circuit that settles an invoice directly from a gift card's escrowed coin, replacing the current redeem-then-pay composition.
- Public-to-shielded conversion inside the app itself, without leaving LumaPay.
- LumaBot moving from reactive Q&A/actions toward proactive payment reminders and reconciliation alerts.
- Mainnet deployment once Midnight mainnet is available.

---

## Deployed contract addresses (Midnight Preprod)

Synchronized with [`contracts/lumapay/deployments/preprod-suite.json`](contracts/lumapay/deployments/preprod-suite.json).

| Module | Contract address |
| --- | --- |
| Invoice Core | `252404b3ad5a4f02071bb59d3631a86419cf6c6d1b995ccebe78399fe44000b2` |
| Campaigns | `c7ecd023012aaa863f6c8150d55366aed88e2347f47affbb1c71ccdb5dfbd43a` |
| Gift Cards | `5600a4fc947cc5f56f8c2c8540de86e744f74f01e7befd400f7fd7ce41097d37` |
| Quote Checkout | `b75d261021ec1b56b68ff7167e811f7fdd3bf97e17ae26fb1188a8cb7b2c886a` |
| Backup Anchor | `9b9879c4d0c3aa79ec6dbea8e6b1fe8b4c7391ad5cfa319eb7f0a34bd1e0b16d` |
| Card Vault | *pending deployer wallet sync — not yet deployed* |

**Real-network smoke test evidence** ([`contracts/lumapay/deployments/preprod-smoke.json`](contracts/lumapay/deployments/preprod-smoke.json)):
- Transaction: `00ea606b6b64eb06ec2bd5dedf211f8ea2dfe4523dd9063d6a69c0c26549b3d506`
- Invoice: `03c3265a09d0335cec6e97b66ecb4680de2ae1e8c373afdc3cf221f0fef1463b`
- Indexed state: `OPEN`
