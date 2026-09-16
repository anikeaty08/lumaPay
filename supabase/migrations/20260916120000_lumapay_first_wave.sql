-- LumaPay First Wave — Midnight-backed merchant data
-- Applied through Supabase SQL Editor or `supabase db push`.

create table if not exists public.merchants (
  id uuid primary key,
  name text not null check (char_length(name) between 1 and 120),
  midnight_address_hash text not null unique,
  midnight_address_ciphertext text not null,
  api_key_hash text not null unique,
  api_key_ciphertext text not null,
  webhook_url_ciphertext text,
  webhook_secret_ciphertext text,
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now()
);

create table if not exists public.auth_challenges (
  id text primary key,
  midnight_address text not null,
  midnight_address_hex text not null,
  nonce_hash text not null,
  message text not null,
  origin text not null,
  expires_at timestamptz not null,
  used_at timestamptz,
  created_at timestamptz not null default now()
);
create index if not exists auth_challenges_expiry_idx on public.auth_challenges (expires_at);

create table if not exists public.auth_sessions (
  id text primary key,
  token_hash text not null unique,
  midnight_address text not null,
  merchant_id uuid references public.merchants(id) on delete set null,
  expires_at timestamptz not null,
  revoked_at timestamptz,
  created_at timestamptz not null default now()
);
create index if not exists auth_sessions_active_idx on public.auth_sessions (token_hash, expires_at) where revoked_at is null;

create table if not exists public.invoices (
  invoice_id text primary key,
  merchant_id uuid not null references public.merchants(id) on delete restrict,
  commitment text not null,
  merchant_authorization text not null,
  expiry text not null,
  payment_opening jsonb not null,
  payment_opening_digest text not null,
  payment_payload_ciphertext text not null,
  payment_payload_digest text not null,
  creation_tx_id text,
  settlement_tx_id text,
  settlement_nullifier text,
  escrow_coin_commitment text,
  escrow_coin text,
  receipt_commitment text,
  claimed boolean not null default false,
  commitment_version text,
  status text not null default 'PENDING' check (status in ('PENDING', 'OPEN', 'SETTLED', 'CANCELLED', 'EXPIRED')),
  chain_checked_at timestamptz,
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now()
);
create index if not exists invoices_merchant_created_idx on public.invoices (merchant_id, created_at desc);
create index if not exists invoices_reconcile_idx on public.invoices (updated_at asc) where status in ('PENDING', 'OPEN', 'SETTLED');

create table if not exists public.campaigns (
  campaign_id text primary key,
  merchant_id uuid not null references public.merchants(id) on delete restrict,
  commitment text not null,
  merchant_authorization text not null,
  expiry text not null,
  payment_opening jsonb not null,
  payment_opening_digest text not null,
  creation_tx_id text,
  contribution_count bigint not null default 0,
  commitment_version text,
  status text not null default 'PENDING' check (status in ('PENDING', 'OPEN', 'CANCELLED', 'EXPIRED')),
  chain_checked_at timestamptz,
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now()
);
create index if not exists campaigns_merchant_created_idx on public.campaigns (merchant_id, created_at desc);

create table if not exists public.campaign_contributions (
  contribution_id text primary key,
  campaign_id text not null references public.campaigns(campaign_id) on delete cascade,
  transaction_id text,
  escrow_coin_commitment text not null,
  escrow_coin text not null,
  receipt_commitment text,
  claimed boolean not null default false,
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now()
);
create index if not exists campaign_contributions_campaign_idx on public.campaign_contributions (campaign_id, created_at desc);

create table if not exists public.card_wallets (
  address_hash text primary key,
  main_owner text not null,
  card_id text not null,
  card_address text not null,
  encrypted_card_number text not null,
  card_number_hash text not null unique,
  card_metadata_digest text not null,
  card_owner_secret_ciphertext text not null,
  card_owner_private_identity_ciphertext text not null,
  card_vault_nonce_ciphertext text not null,
  card_vault_randomness_ciphertext text not null,
  card_vault_commitment text not null,
  card_creation_tx_id text,
  card_close_tx_id text,
  card_last4 text not null,
  encrypted_card_private_key text not null,
  card_kdf_salt text not null,
  card_kdf_algorithm text not null,
  card_kdf_params jsonb not null,
  card_status text not null default 'OPEN' check (card_status in ('OPEN', 'CLOSED')),
  card_label text,
  card_hint text,
  limits jsonb not null default '{}'::jsonb,
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now()
);

create table if not exists public.checkout_sessions (
  id text primary key,
  merchant_id uuid not null references public.merchants(id) on delete restrict,
  invoice_id text not null references public.invoices(invoice_id) on delete cascade,
  success_url text,
  cancel_url text,
  status text not null default 'PENDING',
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now()
);
create index if not exists checkout_sessions_invoice_idx on public.checkout_sessions (invoice_id);

create table if not exists public.webhook_deliveries (
  event_key text primary key,
  merchant_id uuid not null references public.merchants(id) on delete cascade,
  event_type text not null,
  payload jsonb not null,
  status text not null default 'PENDING' check (status in ('PENDING', 'DELIVERED', 'FAILED')),
  response_code integer,
  attempted_at timestamptz,
  created_at timestamptz not null default now()
);

-- The browser never accesses these private tables directly. The backend uses the service-role key.
alter table public.merchants enable row level security;
alter table public.auth_challenges enable row level security;
alter table public.auth_sessions enable row level security;
alter table public.invoices enable row level security;
alter table public.campaigns enable row level security;
alter table public.campaign_contributions enable row level security;
alter table public.card_wallets enable row level security;
alter table public.checkout_sessions enable row level security;
alter table public.webhook_deliveries enable row level security;
