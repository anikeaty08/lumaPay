# Pending migrations — apply manually

Two migrations from this session aren't applied to your live Supabase database yet. I don't have DB access to run them myself (only the REST-level service-role key, which can't execute DDL — no `psql`, no Postgres connection string, no Supabase CLI available in this environment).

## Fastest way: Supabase SQL Editor

1. Open your project at [supabase.com/dashboard](https://supabase.com/dashboard) → **SQL Editor** → **New query**.
2. Paste everything below and click **Run**. It's idempotent (`if not exists`) — safe to run even if part of it is already applied.

```sql
-- 006_user_profiles.sql
create table if not exists user_profiles (
    address_hash text primary key,
    main_address text not null,
    burner_address text,
    encrypted_burner_key text,
    profile_main_invoice_hash text,
    profile_burner_invoice_hash text,
    notify_on_settled boolean not null default false,
    created_at timestamptz not null default now(),
    updated_at timestamptz not null default now()
);
create index if not exists user_profiles_updated_at_idx on user_profiles (updated_at);

-- 007_support_feedback.sql
create table if not exists support_feedback (
    id uuid primary key,
    email text not null,
    type text not null check (type in ('complaint', 'feedback')),
    message text not null,
    wallet_address text,
    created_at timestamptz not null default now()
);
create index if not exists support_feedback_created_at_idx on support_feedback (created_at);
```

3. Done. No backend restart needed — these routes already handle both "table exists" and "table missing" (503 `DATABASE_UNAVAILABLE`-style errors) correctly, so it'll just start working.

## What breaks without this

- **Burner wallet generation** — the core feature from this session's biggest chunk of work (`/users/profile`) — 404s without `user_profiles`.
- **Notification preferences** in Settings — same table.
- **The in-app support/feedback form** — 404s without `support_feedback`.

## If you'd rather I do it via CLI next time

Install the Supabase CLI (`npm install -g supabase`) and run `supabase link --project-ref <your-project-ref>` once, interactively, in your own terminal (it needs an OAuth login I can't do on your behalf). After that's linked, I *can* run `supabase db push` myself for any future migration — that's the one setup step only you can do.
