# LumaPay agent guide

1. Treat this repository as a Midnight-native LumaPay application.
2. Work contract-first: Compact contracts, deployment verification, backend integration, then frontend behavior.
3. Never reintroduce legacy chain code, dependencies, identifiers, wallet adapters, or terminology.
4. Use `pragma language_version >= 0.19;`, individual exported ledger declarations, `[]` circuit return types, declaration-only witnesses, and `pure circuit` helpers.
5. Keep invoice openings, claim secrets, recovery material, mnemonics, and private-state passwords off-chain and out of logs.
6. Use seconds for Compact block-time comparisons and API expiry fields.
7. Treat indexed Midnight contract state as authoritative; application databases are caches and metadata stores.
8. Keep the five module addresses synchronized with `contracts/lumapay/deployments/preprod-suite.json` and all `.env.example` files.
9. Compile, type-check, test, and run legacy-reference guards before handoff.
10. A deployment is complete only after its contract ID is returned by the Preprod indexer. An unchanged DUST balance is not evidence that no transaction occurred because DUST can regenerate toward its capacity.
