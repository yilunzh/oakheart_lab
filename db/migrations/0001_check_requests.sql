-- Applied 2026-10-04 to the Neon database connected to the oakheart-lab Vercel project.
-- That database is shared with another project, so everything for this site lives in
-- its own schema. Forward-only; additive.
create schema if not exists oakheart;

create table if not exists oakheart.check_requests (
  id uuid primary key default gen_random_uuid(),
  created_at timestamptz not null default now(),
  request_key text not null unique,
  business_name text not null,
  website text not null,
  website_host text not null,
  location text not null,
  business_type text not null,
  email text not null,
  question text,
  heard_from text,
  referrer text,
  utm jsonb,
  ip_hash text,
  status text not null default 'new',
  notified_at timestamptz
);

create index if not exists check_requests_dedupe_idx
  on oakheart.check_requests (email, website_host, created_at desc);
create index if not exists check_requests_ip_idx
  on oakheart.check_requests (ip_hash, created_at desc);
