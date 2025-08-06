create table "public"."booking_cancellations" (
    "id" uuid not null default gen_random_uuid(),
    "booking_id" uuid not null,
    "cancelled_by" uuid not null,
    "remarks" text,
    "cancelled_at" timestamp with time zone not null default now()
);


CREATE UNIQUE INDEX booking_cancellations_pkey ON public.booking_cancellations USING btree (id);

alter table "public"."booking_cancellations" add constraint "booking_cancellations_pkey" PRIMARY KEY using index "booking_cancellations_pkey";

alter table "public"."booking_cancellations" add constraint "booking_cancellations_booking_id_fkey" FOREIGN KEY (booking_id) REFERENCES bookings(id) ON DELETE CASCADE not valid;

alter table "public"."booking_cancellations" validate constraint "booking_cancellations_booking_id_fkey";

alter table "public"."booking_cancellations" add constraint "booking_cancellations_cancelled_by_fkey" FOREIGN KEY (cancelled_by) REFERENCES auth.users(id) ON DELETE CASCADE not valid;

alter table "public"."booking_cancellations" validate constraint "booking_cancellations_cancelled_by_fkey";

grant delete on table "public"."booking_cancellations" to "anon";

grant insert on table "public"."booking_cancellations" to "anon";

grant references on table "public"."booking_cancellations" to "anon";

grant select on table "public"."booking_cancellations" to "anon";

grant trigger on table "public"."booking_cancellations" to "anon";

grant truncate on table "public"."booking_cancellations" to "anon";

grant update on table "public"."booking_cancellations" to "anon";

grant delete on table "public"."booking_cancellations" to "authenticated";

grant insert on table "public"."booking_cancellations" to "authenticated";

grant references on table "public"."booking_cancellations" to "authenticated";

grant select on table "public"."booking_cancellations" to "authenticated";

grant trigger on table "public"."booking_cancellations" to "authenticated";

grant truncate on table "public"."booking_cancellations" to "authenticated";

grant update on table "public"."booking_cancellations" to "authenticated";

grant delete on table "public"."booking_cancellations" to "service_role";

grant insert on table "public"."booking_cancellations" to "service_role";

grant references on table "public"."booking_cancellations" to "service_role";

grant select on table "public"."booking_cancellations" to "service_role";

grant trigger on table "public"."booking_cancellations" to "service_role";

grant truncate on table "public"."booking_cancellations" to "service_role";

grant update on table "public"."booking_cancellations" to "service_role";


