# Contract suite

## Invoice Core

Creates commitment-backed invoices, checks expiry and replay protection, records payment state, supports merchant claims, and exposes receipt verification.

## Campaigns

Tracks multi-payment campaigns independently from single-invoice settlement.

## Gift Cards

Manages gift-card commitments and lifecycle state without publishing private redemption material.

## Quote Checkout

Anchors quote-checkout authorization and lifecycle data. External prices remain an application concern unless a verified attestation is explicitly included in the contract protocol.

## Backup Anchor

Anchors digests for encrypted recovery material. It never stores plaintext secrets, private keys, mnemonics, or complete wallet backups.

Generated contract and ZK artifacts live under `contracts/lumapay/dist/managed`. Frontend build tooling copies only the required Invoice Core browser artifacts into `frontend/public/zk/lumapay-core`.
