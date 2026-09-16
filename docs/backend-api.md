# Backend API

The API defaults to port `3000`.

| Method | Route | Purpose |
| --- | --- | --- |
| GET | `/health` | Process health |
| GET | `/api/v1/midnight/status` | Network and deployment index status |
| GET | `/api/v1/contracts` | Contract module identifiers |
| GET | `/api/v1/chain/invoices/:invoiceId` | Direct canonical invoice lookup |
| GET | `/api/v1/chain/campaigns/:campaignId` | Campaign state lookup |
| GET | `/api/v1/chain/contributions/:contributionId` | Contribution state lookup |
| GET | `/api/v1/chain/gift-cards/:giftCardId` | Gift-card state lookup |
| GET | `/api/v1/chain/quotes/:quoteId` | Quote state lookup |
| GET | `/api/v1/chain/quote-providers/:providerId` | Quote-provider lookup |
| GET | `/api/v1/chain/backup-anchors/:ownerId` | Backup digest-anchor lookup |
| GET | `/api/v1/chain/card-vaults/:cardId` | Card-vault public state lookup |
| GET | `/api/v1/chain/card-spends/:spendId` | Card spend state lookup |
| POST | `/api/v1/merchants` | Create merchant metadata |
| POST | `/api/v1/invoices` | Store invoice metadata |
| GET | `/api/v1/invoices` | List authenticated merchant invoices with canonical chain state |
| GET | `/api/v1/invoices/:invoiceId` | Read public invoice metadata and chain state |
| POST | `/api/v1/invoices/:invoiceId/reconcile` | Reconcile a submitted invoice transaction |
| POST | `/api/v1/campaigns` | Store campaign metadata after on-chain creation |
| GET | `/api/v1/campaigns` | List authenticated merchant campaigns and verified contribution claim material |
| GET | `/api/v1/campaigns/:campaignId` | Resolve payer-safe campaign metadata |
| POST | `/api/v1/campaigns/:campaignId/reconcile` | Reconcile campaign status after cancel or expiry |
| POST | `/api/v1/campaigns/:campaignId/contributions` | Register a settled contribution and verify escrow claim material |
| POST | `/api/v1/campaigns/:campaignId/contributions/:contributionId/reconcile` | Reconcile a contribution claim |
| GET | `/api/v1/cards/current` | Read authenticated encrypted card mirror |
| POST | `/api/v1/cards` | Store authenticated encrypted card-vault mirror metadata |
| POST | `/api/v1/cards/lookup` | Resolve payer-safe card metadata by card-number hash |
| POST | `/api/v1/cards/limits` | Update authenticated NIGHT card limit mirror |
| POST | `/api/v1/cards/spend` | Record NIGHT-only card spend metadata |
| DELETE | `/api/v1/cards/current` | Mark authenticated card closed after card-vault close |
| POST | `/api/v1/checkout-sessions` | Create a checkout session |
| GET | `/api/v1/checkout-sessions/:id` | Resolve hosted checkout terms |
| POST | `/api/v1/checkout-sessions/:id/reconcile` | Reconcile a public checkout payment handoff |

Health, status, contract discovery, and direct chain reads work without Supabase. Database-backed routes return `503` until `SUPABASE_URL` and `SUPABASE_SERVICE_ROLE_KEY` are configured. The backend does not accept wallet mnemonics or private keys.
