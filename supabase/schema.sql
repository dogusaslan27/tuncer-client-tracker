-- Tuncer Turizm Client Tracker — Supabase schema
-- Run this in the Supabase SQL editor for your project.

create extension if not exists "pgcrypto";

create table if not exists clients (
  id uuid primary key default gen_random_uuid(),
  full_name text not null,
  nationality text not null,
  visa_type text not null check (visa_type in (
    'Schengen', 'UK', 'USA', 'Canada', 'Australia', 'France VLS-TS', 'Other'
  )),
  status text not null check (status in (
    'Documents Pending', 'Submitted', 'Waiting Decision', 'Approved', 'Refused', 'Interview'
  )),
  priority text not null check (priority in ('High', 'Medium', 'Low')),
  next_action_date date,
  notes text not null default '',
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now()
);

create index if not exists clients_status_idx on clients (status);
create index if not exists clients_next_action_date_idx on clients (next_action_date);

-- Keep updated_at current on every row update.
create or replace function set_updated_at()
returns trigger as $$
begin
  new.updated_at = now();
  return new;
end;
$$ language plpgsql;

drop trigger if exists clients_set_updated_at on clients;
create trigger clients_set_updated_at
  before update on clients
  for each row
  execute function set_updated_at();

-- Row Level Security — required for all tables per KVKK/GDPR policy.
-- This default policy allows any authenticated user (the small internal
-- team, via Supabase Auth) full access. Tighten further (e.g. per-user
-- ownership) if the team grows or client assignment becomes relevant.
alter table clients enable row level security;

create policy "Authenticated users can read clients"
  on clients for select
  to authenticated
  using (true);

create policy "Authenticated users can insert clients"
  on clients for insert
  to authenticated
  with check (true);

create policy "Authenticated users can update clients"
  on clients for update
  to authenticated
  using (true)
  with check (true);

create policy "Authenticated users can delete clients"
  on clients for delete
  to authenticated
  using (true);
