alter table "public"."points" add column "booking_id" uuid;

CREATE UNIQUE INDEX points_booking_id_key ON public.points USING btree (booking_id);

alter table "public"."points" add constraint "points_booking_id_fkey" FOREIGN KEY (booking_id) REFERENCES bookings(id) ON DELETE CASCADE not valid;

alter table "public"."points" validate constraint "points_booking_id_fkey";

alter table "public"."points" add constraint "points_booking_id_key" UNIQUE using index "points_booking_id_key";


