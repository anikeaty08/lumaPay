create table if not exists merchants (
  id uuid primary key,
  name text not null,
  midnight_address_hash text not null,
  midnight_address_ciphertext text not null,
  api_key_hash text not null unique,
  api_key_ciphertext text not null,
  webhook_url_ciphertext text,
  webhook_secret_ciphertext text,
  created_at timestamptz not null default now()
);

create table if not exists invoices (
  invoice_id text primary key check (invoice_id ~ '^[0-9a-f]{64}$'),
  merchant_id uuid not null references merchants(id),
  commitment text not null,
  commitment_version text not null default '1',
  merchant_authorization text not null,
  expiry text not null,
  payment_opening jsonb not null,
  payment_opening_digest text not null,
  payment_payload_ciphertext text,
  payment_payload_digest text,
  creation_tx_id text,
  settlement_tx_id text,
  settlement_nullifier text,
  escrow_coin_commitment text,
  escrow_coin jsonb,
  receipt_commitment text,
  claimed boolean not null default false,
  status text not null check (status in ('PENDING','OPEN','SETTLED','CANCELLED','EXPIRED')),
  chain text not null default 'midnight',
  network text not null default 'preprod',
  chain_checked_at timestamptz,
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now()
);

create table if not exists checkout_sessions (
  id uuid primary key,
  merchant_id uuid not null references merchants(id),
  invoice_id text not null references invoices(invoice_id),
  success_url text,
  cancel_url text,
  status text not null default 'PENDING',
  settlement_tx_id text,
  error_code text,
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now()
);

create table if not exists campaigns (
  campaign_id text primary key check (campaign_id ~ '^[0-9a-f]{64}$'),
  merchant_id uuid not null references merchants(id),
  commitment text not null,
  commitment_version text not null default '1',
  merchant_authorization text not null,
  expiry text not null,
  payment_opening jsonb not null,
  payment_opening_digest text not null,
  creation_tx_id text,
  contribution_count text not null default '0',
  status text not null check (status in ('PENDING','OPEN','CANCELLED','EXPIRED')),
  chain text not null default 'midnight',
  network text not null default 'preprod',
  chain_checked_at timestamptz,
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now()
);

create table if not exists campaign_contributions (
  contribution_id text primary key check (contribution_id ~ '^[0-9a-f]{64}$'),
  campaign_id text not null references campaigns(campaign_id),
  transaction_id text,
  escrow_coin_commitment text,
  escrow_coin jsonb,
  receipt_commitment text,
  claimed boolean not null default false,
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now()
);

create table if not exists card_wallets (
  address_hash text primary key check (address_hash ~ '^[0-9a-f]{64}$'),
  main_owner text,
  card_id text unique check (card_id is null or card_id ~ '^[0-9a-f]{64}$'),
  card_address text,
  encrypted_card_number text,
  card_number_hash text unique check (card_number_hash is null or card_number_hash ~ '^[0-9a-f]{64}$'),
  card_metadata_digest text check (card_metadata_digest is null or card_metadata_digest ~ '^[0-9a-f]{64}$'),
  card_owner_secret_ciphertext text,
  card_owner_private_identity_ciphertext text,
  card_vault_nonce_ciphertext text,
  card_vault_randomness_ciphertext text,
  card_vault_commitment text check (card_vault_commitment is null or card_vault_commitment ~ '^[0-9a-f]{64}$'),
  card_creation_tx_id text check (card_creation_tx_id is null or card_creation_tx_id ~ '^[0-9a-f]{64}$'),
  card_close_tx_id text check (card_close_tx_id is null or card_close_tx_id ~ '^[0-9a-f]{64}$'),
  card_last4 text,
  encrypted_card_private_key text,
  card_kdf_salt text,
  card_kdf_algorithm text,
  card_kdf_params jsonb,
  card_status text not null default 'ACTIVE' check (card_status in ('ACTIVE','CLOSED')),
  card_label text,
  card_hint text,
  limits jsonb,
  card_limits_updated_at timestamptz,
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now()
);

create table if not exists webhook_deliveries (
  event_key text primary key,
  merchant_id uuid not null references merchants(id),
  event_type text not null,
  payload jsonb not null,
  status text not null,
  response_code integer,
  attempted_at timestamptz,
  created_at timestamptz not null default now()
);

create index if not exists invoices_reconciliation_idx on invoices(status, updated_at);
create index if not exists checkout_sessions_invoice_idx on checkout_sessions(invoice_id);
create index if not exists campaigns_merchant_idx on campaigns(merchant_id, status, updated_at);
create index if not exists campaign_contributions_campaign_idx on campaign_contributions(campaign_id, created_at);
create index if not exists card_wallets_status_idx on card_wallets(card_status, updated_at);
