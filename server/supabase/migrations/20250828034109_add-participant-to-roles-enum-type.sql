alter table "public"."profiles" alter column "role" drop default;

alter type "public"."roles" rename to "roles__old_version_to_be_dropped";

create type "public"."roles" as enum ('manager', 'participant', 'client', 'superadmin');

alter table "public"."profiles" alter column role type "public"."roles" using role::text::"public"."roles";

alter table "public"."user_roles" alter column role type "public"."roles" using role::text::"public"."roles";

alter table "public"."profiles" alter column "role" set default 'client'::roles;

drop type "public"."roles__old_version_to_be_dropped";


