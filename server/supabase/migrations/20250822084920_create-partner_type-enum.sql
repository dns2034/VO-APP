-- migrate:up
create type public.partner_type as enum ('individual', 'business', 'client');

alter table public.partners
    alter column partner_type set data type partner_type using partner_type::partner_type;
