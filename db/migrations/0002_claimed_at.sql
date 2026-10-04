-- Applied 2026-10-04. Lease column for crash-safe notification retries:
-- a retry claims a lead by setting claimed_at; notified_at is set only after a successful send.
alter table oakheart.check_requests add column if not exists claimed_at timestamptz;
