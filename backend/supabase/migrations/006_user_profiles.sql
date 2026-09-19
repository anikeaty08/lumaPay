-- User profiles: burner-wallet identity + notification preferences.
-- Keyed by address_hash (SHA-256 of the owning Midnight address, computed
-- client-side — see frontend/src/shared/utils/core/crypto.ts#hashAddress),
-- never the plaintext address. main_address/burner_address/
-- encrypted_burner_key arrive already encrypted client-side with the
-- user's own app password (encryptWithPassword) — the backend never has
-- the key material to decrypt them; it stores opaque ciphertext only,
-- matching this project's non-custodial design elsewhere (merchants.*_ciphertext).
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
