create table "public"."partner_referrals" (
    "id" uuid not null default gen_random_uuid(),
    "created_at" timestamp with time zone not null default now(),
    "metadata" jsonb,
    "referred_ by" uuid not null default auth.uid()
);


alter table "public"."partner_referrals" enable row level security;

CREATE UNIQUE INDEX partner_referrals_pkey ON public.partner_referrals USING btree (id);

alter table "public"."partner_referrals" add constraint "partner_referrals_pkey" PRIMARY KEY using index "partner_referrals_pkey";

grant delete on table "public"."partner_referrals" to "anon";

grant insert on table "public"."partner_referrals" to "anon";

grant references on table "public"."partner_referrals" to "anon";

grant select on table "public"."partner_referrals" to "anon";

grant trigger on table "public"."partner_referrals" to "anon";

grant truncate on table "public"."partner_referrals" to "anon";

grant update on table "public"."partner_referrals" to "anon";

grant delete on table "public"."partner_referrals" to "authenticated";

grant insert on table "public"."partner_referrals" to "authenticated";

grant references on table "public"."partner_referrals" to "authenticated";

grant select on table "public"."partner_referrals" to "authenticated";

grant trigger on table "public"."partner_referrals" to "authenticated";

grant truncate on table "public"."partner_referrals" to "authenticated";

grant update on table "public"."partner_referrals" to "authenticated";

grant delete on table "public"."partner_referrals" to "service_role";

grant insert on table "public"."partner_referrals" to "service_role";

grant references on table "public"."partner_referrals" to "service_role";

grant select on table "public"."partner_referrals" to "service_role";

grant trigger on table "public"."partner_referrals" to "service_role";

grant truncate on table "public"."partner_referrals" to "service_role";

grant update on table "public"."partner_referrals" to "service_role";


