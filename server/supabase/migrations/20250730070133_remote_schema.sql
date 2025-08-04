alter table "public"."bookings" drop constraint "bookings_space_id_fkey";

create table "public"."space_units" (
    "id" uuid not null default gen_random_uuid(),
    "created_at" timestamp with time zone not null default now(),
    "name" text not null,
    "space_id" uuid not null
);


alter table "public"."bookings" drop column "space_id";

alter table "public"."bookings" add column "space_unit_id" uuid not null;

CREATE UNIQUE INDEX space_units_pkey ON public.space_units USING btree (id);

alter table "public"."space_units" add constraint "space_units_pkey" PRIMARY KEY using index "space_units_pkey";

alter table "public"."bookings" add constraint "bookings_space_unit_id_fkey" FOREIGN KEY (space_unit_id) REFERENCES space_units(id) ON UPDATE CASCADE ON DELETE CASCADE not valid;

alter table "public"."bookings" validate constraint "bookings_space_unit_id_fkey";

alter table "public"."space_units" add constraint "space_units_space_id_fkey" FOREIGN KEY (space_id) REFERENCES spaces(id) ON UPDATE CASCADE ON DELETE CASCADE not valid;

alter table "public"."space_units" validate constraint "space_units_space_id_fkey";

grant delete on table "public"."space_units" to "anon";

grant insert on table "public"."space_units" to "anon";

grant references on table "public"."space_units" to "anon";

grant select on table "public"."space_units" to "anon";

grant trigger on table "public"."space_units" to "anon";

grant truncate on table "public"."space_units" to "anon";

grant update on table "public"."space_units" to "anon";

grant delete on table "public"."space_units" to "authenticated";

grant insert on table "public"."space_units" to "authenticated";

grant references on table "public"."space_units" to "authenticated";

grant select on table "public"."space_units" to "authenticated";

grant trigger on table "public"."space_units" to "authenticated";

grant truncate on table "public"."space_units" to "authenticated";

grant update on table "public"."space_units" to "authenticated";

grant delete on table "public"."space_units" to "service_role";

grant insert on table "public"."space_units" to "service_role";

grant references on table "public"."space_units" to "service_role";

grant select on table "public"."space_units" to "service_role";

grant trigger on table "public"."space_units" to "service_role";

grant truncate on table "public"."space_units" to "service_role";

grant update on table "public"."space_units" to "service_role";


