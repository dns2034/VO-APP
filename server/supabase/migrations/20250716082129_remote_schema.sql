create table "public"."vouchers" (
    "id" uuid not null default gen_random_uuid(),
    "created_at" timestamp with time zone not null default now(),
    "user_id" uuid not null,
    "code" text not null
);


alter table "public"."vouchers" enable row level security;

CREATE UNIQUE INDEX vouchers_pkey ON public.vouchers USING btree (id);

alter table "public"."vouchers" add constraint "vouchers_pkey" PRIMARY KEY using index "vouchers_pkey";

alter table "public"."vouchers" add constraint "vouchers_user_id_fkey" FOREIGN KEY (user_id) REFERENCES auth.users(id) ON UPDATE CASCADE ON DELETE CASCADE not valid;

alter table "public"."vouchers" validate constraint "vouchers_user_id_fkey";

grant delete on table "public"."vouchers" to "anon";

grant insert on table "public"."vouchers" to "anon";

grant references on table "public"."vouchers" to "anon";

grant select on table "public"."vouchers" to "anon";

grant trigger on table "public"."vouchers" to "anon";

grant truncate on table "public"."vouchers" to "anon";

grant update on table "public"."vouchers" to "anon";

grant delete on table "public"."vouchers" to "authenticated";

grant insert on table "public"."vouchers" to "authenticated";

grant references on table "public"."vouchers" to "authenticated";

grant select on table "public"."vouchers" to "authenticated";

grant trigger on table "public"."vouchers" to "authenticated";

grant truncate on table "public"."vouchers" to "authenticated";

grant update on table "public"."vouchers" to "authenticated";

grant delete on table "public"."vouchers" to "service_role";

grant insert on table "public"."vouchers" to "service_role";

grant references on table "public"."vouchers" to "service_role";

grant select on table "public"."vouchers" to "service_role";

grant trigger on table "public"."vouchers" to "service_role";

grant truncate on table "public"."vouchers" to "service_role";

grant update on table "public"."vouchers" to "service_role";


