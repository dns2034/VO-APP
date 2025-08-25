-- migrate:up
create table public.partners (
                                 id uuid not null default gen_random_uuid(),
                                 name text,
                                 partner_type text not null,
                                 partner_id bigint not null
);

create unique index partners_pkey on public.partners (id);

alter table public.partners add constraint partners_pkey
    primary key using index partners_pkey;

grant delete, insert, references, select, trigger, truncate, update
  on table public.partners to anon;

grant delete, insert, references, select, trigger, truncate, update
  on table public.partners to authenticated;

grant delete, insert, references, select, trigger, truncate, update
  on table public.partners to service_role;
