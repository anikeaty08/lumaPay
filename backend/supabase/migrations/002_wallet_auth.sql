create table if not exists auth_challenges (
  id text primary key,
  midnight_address text not null,
  midnight_address_hex text not null check (midnight_address_hex ~ '^[0-9a-f]{64}$'),
  nonce_hash text not null,
  message text not null,
  origin text not null,
  expires_at timestamptz not null,
  used_at timestamptz,
  created_at timestamptz not null default now()
);

create table if not exists auth_sessions (
  id text primary key,
  token_hash text not null unique,
  midnight_address text not null,
  merchant_id uuid references merchants(id),
  expires_at timestamptz not null,
  revoked_at timestamptz,
  created_at timestamptz not null default now()
);

create index if not exists auth_challenges_expiry_idx on auth_challenges(expires_at);
create index if not exists auth_sessions_expiry_idx on auth_sessions(expires_at);
create index if not exists auth_sessions_merchant_idx on auth_sessions(merchant_id);
