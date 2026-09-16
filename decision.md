# LumaPay architecture decisions

## Midnight-native rebuild

LumaPay uses Compact and Midnight.js directly. The previous execution layer was removed rather than maintained as a compatibility path.

## Split contract suite

Five contracts isolate resource usage and product boundaries: Invoice Core, Campaigns, Gift Cards, Quote Checkout, and Backup Anchor. Invoice Core owns the canonical invoice lifecycle. Other modules keep independent state and can evolve without forcing a monolithic redeployment.

## Commitment-based privacy

Private invoice values are committed locally. The public ledger stores commitments, nullifiers, expiry, and lifecycle state. Recovery data and merchant claim secrets stay with the parties. Backup Anchor stores only integrity commitments—not encrypted wallet data or credentials.

## Settlement boundary

Contracts are the settlement authority. The Express backend reads indexed state, coordinates checkout metadata and reconciliation, and may store that metadata in Supabase. It does not receive wallet mnemonics or sign normal user transactions.

## Runtime compatibility

The SDK packages are pinned to the verified Midnight 4.1.1 family, with `@midnight-ntwrk/onchain-runtime-v3` resolved once at `3.0.0`. Vite deduplicates the Compact and on-chain runtimes to prevent cross-instance WASM type identity failures.

## Time model

All contract and API expiry values are Unix seconds. UI display code may convert to milliseconds only at the presentation boundary.
