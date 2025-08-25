-- migrate:up
create table public.cash_vouchers (
                                      id uuid not null default gen_random_uuid(),
                                      created_at timestamptz default now(),
                                      partner_id bigint not null,
                                      code text not null,
                                      amount integer not null default 500,
                                      expires_at timestamptz not null default (now() + interval '30 days'),
                                      msg_tx_id text,
                                      status text
);

create unique index vouchers_code_key on public.cash_vouchers (code);
create unique index vouchers_pkey on public.cash_vouchers (id);

alter table public.cash_vouchers add constraint vouchers_pkey
    primary key using index vouchers_pkey;

alter table public.cash_vouchers add constraint vouchers_code_key
    unique using index vouchers_code_key;

grant delete, insert, references, select, trigger, truncate, update
  on table public.cash_vouchers to anon;

grant delete, insert, references, select, trigger, truncate, update
  on table public.cash_vouchers to authenticated;

grant delete, insert, references, select, trigger, truncate, update
  on table public.cash_vouchers to service_role;
