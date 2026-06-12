create table "public"."cash_vouchers" (
    "id" uuid not null default gen_random_uuid(),
    "created_at" timestamp with time zone default now(),
    "partner_id" bigint not null,
    "code" text not null,
    "amount" integer not null default 500,
    "expires_at" timestamp with time zone not null default (now() + '30 days'::interval),
    "msg_tx_id" text,
    "status" text
);


CREATE UNIQUE INDEX vouchers_code_key ON public.cash_vouchers USING btree (code);

CREATE UNIQUE INDEX vouchers_pkey ON public.cash_vouchers USING btree (id);

alter table "public"."cash_vouchers" add constraint "vouchers_pkey" PRIMARY KEY using index "vouchers_pkey";

alter table "public"."cash_vouchers" add constraint "vouchers_code_key" UNIQUE using index "vouchers_code_key";

grant delete on table "public"."cash_vouchers" to "anon";

grant insert on table "public"."cash_vouchers" to "anon";

grant references on table "public"."cash_vouchers" to "anon";

grant select on table "public"."cash_vouchers" to "anon";

grant trigger on table "public"."cash_vouchers" to "anon";

grant truncate on table "public"."cash_vouchers" to "anon";

grant update on table "public"."cash_vouchers" to "anon";

grant delete on table "public"."cash_vouchers" to "authenticated";

grant insert on table "public"."cash_vouchers" to "authenticated";

grant references on table "public"."cash_vouchers" to "authenticated";

grant select on table "public"."cash_vouchers" to "authenticated";

grant trigger on table "public"."cash_vouchers" to "authenticated";

grant truncate on table "public"."cash_vouchers" to "authenticated";

grant update on table "public"."cash_vouchers" to "authenticated";

grant delete on table "public"."cash_vouchers" to "service_role";

grant insert on table "public"."cash_vouchers" to "service_role";

grant references on table "public"."cash_vouchers" to "service_role";

grant select on table "public"."cash_vouchers" to "service_role";

grant trigger on table "public"."cash_vouchers" to "service_role";

grant truncate on table "public"."cash_vouchers" to "service_role";

grant update on table "public"."cash_vouchers" to "service_role";


