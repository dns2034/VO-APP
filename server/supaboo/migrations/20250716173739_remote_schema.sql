create type "public"."booking_status" as enum ('booked', 'cancelled', 'pending');

create table "public"."space_availability" (
    "id" uuid not null default gen_random_uuid(),
    "created_at" timestamp with time zone not null default now(),
    "date" date not null,
    "opening_time" time with time zone not null,
    "closing_time" time with time zone not null,
    "space_id" uuid not null default gen_random_uuid()
);


alter table "public"."space_availability" enable row level security;

alter table "public"."bookings" add column "booking_status" booking_status not null default 'cancelled'::booking_status;

CREATE UNIQUE INDEX space_availability_pkey ON public.space_availability USING btree (id);

alter table "public"."space_availability" add constraint "space_availability_pkey" PRIMARY KEY using index "space_availability_pkey";

alter table "public"."space_availability" add constraint "space_availability_space_id_fkey" FOREIGN KEY (space_id) REFERENCES spaces(id) ON UPDATE CASCADE ON DELETE CASCADE not valid;

alter table "public"."space_availability" validate constraint "space_availability_space_id_fkey";

grant delete on table "public"."space_availability" to "anon";

grant insert on table "public"."space_availability" to "anon";

grant references on table "public"."space_availability" to "anon";

grant select on table "public"."space_availability" to "anon";

grant trigger on table "public"."space_availability" to "anon";

grant truncate on table "public"."space_availability" to "anon";

grant update on table "public"."space_availability" to "anon";

grant delete on table "public"."space_availability" to "authenticated";

grant insert on table "public"."space_availability" to "authenticated";

grant references on table "public"."space_availability" to "authenticated";

grant select on table "public"."space_availability" to "authenticated";

grant trigger on table "public"."space_availability" to "authenticated";

grant truncate on table "public"."space_availability" to "authenticated";

grant update on table "public"."space_availability" to "authenticated";

grant delete on table "public"."space_availability" to "service_role";

grant insert on table "public"."space_availability" to "service_role";

grant references on table "public"."space_availability" to "service_role";

grant select on table "public"."space_availability" to "service_role";

grant trigger on table "public"."space_availability" to "service_role";

grant truncate on table "public"."space_availability" to "service_role";

grant update on table "public"."space_availability" to "service_role";


