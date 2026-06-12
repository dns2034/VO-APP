create table "public"."product_vouchers" (
    "id" uuid not null default gen_random_uuid(),
    "created_at" timestamp with time zone not null default now(),
    "code" text not null,
    "user_id" uuid not null,
    "product_id" uuid not null
);


alter table "public"."product_vouchers" enable row level security;

create table "public"."reward_vouchers" (
    "id" uuid not null default gen_random_uuid(),
    "created_at" timestamp with time zone not null default now(),
    "code" text not null,
    "user_id" uuid not null,
    "product_id" uuid not null
);


CREATE UNIQUE INDEX product_vouchers_code_key ON public.product_vouchers USING btree (code);

CREATE UNIQUE INDEX product_vouchers_pkey ON public.product_vouchers USING btree (id);

CREATE UNIQUE INDEX reward_vouchers_code_key ON public.reward_vouchers USING btree (code);

CREATE UNIQUE INDEX reward_vouchers_pkey ON public.reward_vouchers USING btree (id);

alter table "public"."product_vouchers" add constraint "product_vouchers_pkey" PRIMARY KEY using index "product_vouchers_pkey";

alter table "public"."reward_vouchers" add constraint "reward_vouchers_pkey" PRIMARY KEY using index "reward_vouchers_pkey";

alter table "public"."product_vouchers" add constraint "product_vouchers_code_key" UNIQUE using index "product_vouchers_code_key";

alter table "public"."product_vouchers" add constraint "product_vouchers_product_id_fkey" FOREIGN KEY (product_id) REFERENCES products(id) ON UPDATE CASCADE ON DELETE CASCADE not valid;

alter table "public"."product_vouchers" validate constraint "product_vouchers_product_id_fkey";

alter table "public"."product_vouchers" add constraint "product_vouchers_user_id_fkey" FOREIGN KEY (user_id) REFERENCES auth.users(id) ON UPDATE CASCADE ON DELETE CASCADE not valid;

alter table "public"."product_vouchers" validate constraint "product_vouchers_user_id_fkey";

alter table "public"."reward_vouchers" add constraint "reward_vouchers_code_key" UNIQUE using index "reward_vouchers_code_key";

alter table "public"."reward_vouchers" add constraint "reward_vouchers_product_id_fkey" FOREIGN KEY (product_id) REFERENCES products(id) ON UPDATE CASCADE ON DELETE CASCADE not valid;

alter table "public"."reward_vouchers" validate constraint "reward_vouchers_product_id_fkey";

alter table "public"."reward_vouchers" add constraint "reward_vouchers_user_id_fkey" FOREIGN KEY (user_id) REFERENCES auth.users(id) ON UPDATE CASCADE ON DELETE CASCADE not valid;

alter table "public"."reward_vouchers" validate constraint "reward_vouchers_user_id_fkey";

grant delete on table "public"."product_vouchers" to "anon";

grant insert on table "public"."product_vouchers" to "anon";

grant references on table "public"."product_vouchers" to "anon";

grant select on table "public"."product_vouchers" to "anon";

grant trigger on table "public"."product_vouchers" to "anon";

grant truncate on table "public"."product_vouchers" to "anon";

grant update on table "public"."product_vouchers" to "anon";

grant delete on table "public"."product_vouchers" to "authenticated";

grant insert on table "public"."product_vouchers" to "authenticated";

grant references on table "public"."product_vouchers" to "authenticated";

grant select on table "public"."product_vouchers" to "authenticated";

grant trigger on table "public"."product_vouchers" to "authenticated";

grant truncate on table "public"."product_vouchers" to "authenticated";

grant update on table "public"."product_vouchers" to "authenticated";

grant delete on table "public"."product_vouchers" to "service_role";

grant insert on table "public"."product_vouchers" to "service_role";

grant references on table "public"."product_vouchers" to "service_role";

grant select on table "public"."product_vouchers" to "service_role";

grant trigger on table "public"."product_vouchers" to "service_role";

grant truncate on table "public"."product_vouchers" to "service_role";

grant update on table "public"."product_vouchers" to "service_role";

grant delete on table "public"."reward_vouchers" to "anon";

grant insert on table "public"."reward_vouchers" to "anon";

grant references on table "public"."reward_vouchers" to "anon";

grant select on table "public"."reward_vouchers" to "anon";

grant trigger on table "public"."reward_vouchers" to "anon";

grant truncate on table "public"."reward_vouchers" to "anon";

grant update on table "public"."reward_vouchers" to "anon";

grant delete on table "public"."reward_vouchers" to "authenticated";

grant insert on table "public"."reward_vouchers" to "authenticated";

grant references on table "public"."reward_vouchers" to "authenticated";

grant select on table "public"."reward_vouchers" to "authenticated";

grant trigger on table "public"."reward_vouchers" to "authenticated";

grant truncate on table "public"."reward_vouchers" to "authenticated";

grant update on table "public"."reward_vouchers" to "authenticated";

grant delete on table "public"."reward_vouchers" to "service_role";

grant insert on table "public"."reward_vouchers" to "service_role";

grant references on table "public"."reward_vouchers" to "service_role";

grant select on table "public"."reward_vouchers" to "service_role";

grant trigger on table "public"."reward_vouchers" to "service_role";

grant truncate on table "public"."reward_vouchers" to "service_role";

grant update on table "public"."reward_vouchers" to "service_role";


