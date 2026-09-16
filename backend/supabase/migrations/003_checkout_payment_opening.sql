alter table invoices
  add column if not exists payment_opening jsonb,
  add column if not exists payment_opening_digest text,
  add column if not exists escrow_coin jsonb;

alter table checkout_sessions
  add column if not exists settlement_tx_id text,
  add column if not exists error_code text;

comment on column invoices.payment_opening is
  'Payer-safe Compact opening. Must never contain merchant claim secrets, wallet keys, mnemonics, or recovery credentials.';

comment on column invoices.payment_opening_digest is
  'SHA-256 digest of the canonical JSON opening stored by the backend.';

comment on column invoices.escrow_coin is
  'Commitment-verified qualified coin coordinates used only by the authenticated merchant to claim settled escrow.';
