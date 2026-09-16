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

create index if not exists campaigns_merchant_idx on campaigns(merchant_id, status, updated_at);
create index if not exists campaign_contributions_campaign_idx on campaign_contributions(campaign_id, created_at);

comment on column campaigns.payment_opening is
  'Payer-safe Campaigns contract opening. Must never contain merchant claim secrets, wallet keys, mnemonics, or recovery credentials.';

comment on column campaign_contributions.escrow_coin is
  'Commitment-verified qualified coin coordinates submitted after payer settlement and exposed only to the authenticated merchant for contribution claims.';
