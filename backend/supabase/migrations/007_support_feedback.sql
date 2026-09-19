-- Support/feedback submissions from the in-app support form
-- (frontend/src/shared/pages/support-feedback -> POST /support/feedback,
-- previously 404 — no backend route existed at all).
create table if not exists support_feedback (
    id uuid primary key,
    email text not null,
    type text not null check (type in ('complaint', 'feedback')),
    message text not null,
    wallet_address text,
    created_at timestamptz not null default now()
);

create index if not exists support_feedback_created_at_idx on support_feedback (created_at);
