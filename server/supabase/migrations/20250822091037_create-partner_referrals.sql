-- migrate:up
create table public.partner_referrals (
                                          id uuid not null default gen_random_uuid(),
                                          created_at timestamptz not null default now(),
                                          metadata jsonb,
                                          referred_by uuid not null default auth.uid()
);

alter table public.partner_referrals enable row level security;

create unique index partner_referrals_pkey on public.partner_referrals (id);

alter table public.partner_referrals add constraint partner_referrals_pkey
    primary key using index partner_referrals_pkey;

grant delete, insert, references, select, trigger, truncate, update
  on table public.partner_referrals to anon;

grant delete, insert, references, select, trigger, truncate, update
  on table public.partner_referrals to authenticated;

grant delete, insert, references, select, trigger, truncate, update
  on table public.partner_referrals to service_role;
