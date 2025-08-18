create type "public"."access_type" as enum ('Hourly', 'Daily');

alter type "public"."subscriptions_type" rename to "subscriptions_type__old_version_to_be_dropped";

create type "public"."subscriptions_type" as enum ('business_address_only', 'virtual_office_for_solo', 'virtual_office_for_team', 'lite_access', 'executive_plan');

alter table "public"."subscriptions" alter column subscriptions_type type "public"."subscriptions_type" using subscriptions_type::text::"public"."subscriptions_type";

drop type "public"."subscriptions_type__old_version_to_be_dropped";

alter table "public"."spaces" add column "access_type" access_type not null default 'Hourly'::access_type;


