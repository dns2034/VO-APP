alter table "public"."bookings" add column "remarks" text;

CREATE UNIQUE INDEX bookings_pkey ON public.bookings USING btree (id);

alter table "public"."bookings" add constraint "bookings_pkey" PRIMARY KEY using index "bookings_pkey";


