---
topic: Midnight first-wave contract knowledge
researched_at: 2026-09-16
source_policy: Official Midnight documentation
scope: Core Compact contracts and local development only
refresh_when: Selecting a network, installing a toolchain, adding wallet integration, or deploying
---

# Midnight: first-wave knowledge

## Scope

This is the smallest reliable foundation for a first Midnight contract. It covers the contract execution model, Compact syntax, privacy boundaries, local proving, and tests. It deliberately leaves token flows, cross-contract design, browser wallets, production endpoints, and upgrade operations for later waves.

## Contract model

Midnight contracts combine three parts:

1. Public ledger state, replicated by the network.
2. Bounded zero-knowledge circuits that prove a state transition is valid.
3. Local TypeScript witness functions that supply private values from the user's device.

```text
private values + current public state
        -> Compact circuit constraints
        -> ZK proof + public transcript
        -> verifier-key check and Impact execution
        -> new public state
```

A deployed contract has an address, public state, and a verifier key for each exported circuit. The network verifies the proof and executes the public transcript; it does not execute the original Compact source or trust the frontend.

The guessing-game example in the Midnight documentation is explanatory pseudocode, not compile-ready Compact. It shows that hidden factors can satisfy a circuit while only the old and new public state values appear on-chain.

Sources: [Smart contracts on Midnight](https://docs.midnight.network/concepts/how-midnight-works/smart-contracts), [Transaction semantics](https://docs.midnight.network/concepts/how-midnight-works/semantics).

## Privacy rules

Treat these as public:

- Contract address, exported circuit name, transaction timing, ledger reads/writes, and normal ledger-operation arguments.
- Values written to a ledger field, returned from an exported circuit, or passed to another contract.
- `Set`, `Map`, and `Counter` keys, values, and amounts.

Treat these as private to the chain unless deliberately exposed:

- Witness return values.
- Private circuit inputs and derived values.
- Internal circuit computation.
- Client private state.

`disclose(value)` only tells the compiler that an intended public crossing is acceptable. It does not publish the value by itself. Place it directly at the ledger write or other public boundary.

The special exception is Merkle-tree insertion: the inserted leaf is hidden by that operation, though a low-entropy value can still be guessed and checked. A hash alone also does not hide a guessable value; use a commitment with fresh, cryptographically strong randomness when the value must remain hidden.

Sources: [Private data](https://docs.midnight.network/concepts/how-midnight-works/keeping-data-private), [Explicit disclosure](https://docs.midnight.network/compact/reference/explicit-disclosure), [Security and best practices](https://docs.midnight.network/guides/security-best-practices).

## Compact essentials

```compact
pragma language_version >= 0.19;

import CompactStandardLibrary;

export ledger counter: Counter;
export ledger owner: Bytes<32>;

witness secretKey(): Bytes<32>;

pure circuit ownerId(sk: Bytes<32>): Bytes<32> {
  return persistentHash<Vector<2, Bytes<32>>>([
    pad(32, "first-wave:owner"),
    sk,
  ]);
}

export circuit increment(): [] {
  counter.increment(1);
}
```

Rules that matter immediately:

- Use individual `ledger` declarations, not a ledger block.
- Entry points are `export circuit` declarations and use `[]` for no return value.
- A witness has a declaration only; TypeScript supplies its body.
- Use `pure circuit` for helpers that do not access ledger state or witnesses.
- Compact is statically typed and bounded. Loops need compile-time bounds; recursion is forbidden.
- Local values are immutable. Public state changes through ledger operations or their supported shorthand.
- `sealed ledger` values can be initialized at deployment and cannot change afterward.
- Prefer `Counter.increment()` over manual read-add-write when it matches the rule, because it reduces stale-state conflicts.

Useful types: `Boolean`, `Field`, `Uint<n>`, `Bytes<n>`, `Opaque<"string">`, `Vector<n, T>`, tuples, `struct`, and `enum`.

Sources: [Compact reference](https://docs.midnight.network/compact/reference/compact-reference), [Writing a contract](https://docs.midnight.network/compact/reference/writing), [Ledger data types](https://docs.midnight.network/compact/data-types/ledger-adt).

## Witness and access-control rule

Every user can provide a different witness implementation. Witness values are not trusted merely because a proof exists; the circuit must constrain them with `assert`.

Never use `ownPublicKey()` as caller authentication. It is a witness and can be controlled by a malicious prover. For first-wave authorization, derive a public identifier from a secret with `persistentHash` and a unique domain separator, store the derived value, then assert a later derivation matches it.

```compact
export circuit privilegedAction(): [] {
  assert(ownerId(secretKey()) == owner, "not authorized");
  // authorized state transition
}
```

Use a new domain separator for each purpose. Do not reuse commitment randomness. Use `persistentHash` or `persistentCommit` for values kept in public state; transient primitives are for temporary circuit computation only.

Sources: [Smart contract security](https://docs.midnight.network/compact/smart-contract-security), [Security and best practices](https://docs.midnight.network/guides/security-best-practices).

## First-wave toolchain baseline

As checked on 2026-09-16, the official compatibility matrix lists this tested combination for Preview, Preprod, and Mainnet:

| Component | Tested version |
| --- | --- |
| Compact devtools | `0.5.1` |
| Compact compiler | `0.31.1` |
| Compact runtime | `0.16.0` |
| Compact JS | `2.5.1` |
| Midnight.js | `4.1.1` |
| Proof server | `8.1.0` |

The latest Compact release is newer (`0.34.0`, language `0.26.0`), so do not use it for network deployment merely because it is latest. Pin the target network's tested set, query the installed compiler, and compile before deciding the pragma and dependencies.

```sh
compact --version
compact compile --version
compact compile --language-version
compact compile --runtime-version
compact compile --ledger-version
```

The compiler produces generated JavaScript, TypeScript declarations, contract metadata, ZKIR, and proving/verifying keys. Do not hand-edit generated artifacts. A build made with `--skip-zk` is useful for quick iteration but cannot prove or deploy.

Sources: [Compatibility matrix](https://docs.midnight.network/relnotes/support-matrix), [Compact releases](https://docs.midnight.network/relnotes/compact), [Compiler usage](https://docs.midnight.network/compact/compilation-and-tooling/compiler-usage).

## Local development flow

1. Install Compact and Docker. On Windows, use WSL for Midnight development.
2. Scaffold a minimal contract with `npx create-mn-app <project-name>` or add a `.compact` source file to an existing Midnight project.
3. Run the local node, indexer, and proof server. The standard proof-server port is `6300`.
4. Compile the contract and inspect generated `contract-info.json`.
5. Implement witnesses in TypeScript and keep secrets in local private state.
6. Run unit tests for circuits before using a network.
7. Run one local end-to-end test: deploy, call an exported circuit, wait for finalization, and query the final public state.

The proof server sees raw witness values while generating a proof. Run it locally for sensitive applications; a remote prover is a trust decision.

Sources: [Install the toolchain](https://docs.midnight.network/getting-started/installation), [Create a Midnight DApp](https://docs.midnight.network/getting-started/quickstart), [Proving transactions locally](https://docs.midnight.network/guides/local-proving).

## First-wave verification gate

Do not advance beyond local development until all of these are true:

- The Compact contract compiles with the pinned toolchain.
- Every ledger write and public return has been reviewed for disclosure.
- Every witness-dependent condition is asserted inside a circuit.
- A forged secret or malformed input fails.
- State transitions and boundary values are tested.
- No error message includes a secret or sensitive value.
- A local proof server can generate a proof and one end-to-end call finalizes.
- Generated artifacts and dependency versions are recorded together.

## Explicitly deferred

Leave these for a later wave unless the first contract requires them:

- Shielded or unshielded custom tokens and payment flows.
- Contract-to-contract calls.
- Browser wallet and DApp Connector integration.
- Remote indexer, viewing-key, and hosted proving architecture.
- Maintenance authority, verifier-key updates, and production deployment.
- Mainnet endpoint configuration and operational monitoring.

## Refresh protocol

Before moving to Preview, Preprod, or Mainnet:

1. Reopen the [compatibility matrix](https://docs.midnight.network/relnotes/support-matrix).
2. Check release notes newer than this file's research date.
3. Pin versions as a tested set.
4. Recompile and rerun unit plus end-to-end tests.
5. Review proof-server and indexer trust boundaries before handling real private data.
