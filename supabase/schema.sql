-- Run this once in Supabase → SQL Editor → New query → Run
-- Stores product catalog + orders for Cloudflare Pages hosting

create table if not exists public.store (
  key text primary key,
  value jsonb not null default '[]'::jsonb,
  updated_at timestamptz not null default now()
);

alter table public.store enable row level security;

-- Anyone can read the public product catalog
drop policy if exists "Public read products" on public.store;
create policy "Public read products"
  on public.store
  for select
  using (key = 'products');

-- No public insert/update/delete (admin writes use service role from Cloudflare)

insert into public.store (key, value)
values ('products', '[]'::jsonb)
on conflict (key) do nothing;

insert into public.store (key, value)
values ('orders', '[]'::jsonb)
on conflict (key) do nothing;
