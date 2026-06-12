create type "public"."frequency" as enum ('Weekly', 'Biweekly', 'Monthly', 'Quarterly', 'Yearly');


  create table "public"."subscription_products" (
    "id" uuid not null default gen_random_uuid(),
    "subscription_id" uuid,
    "product_id" uuid,
    "amount" smallint,
    "frequency" frequency not null default 'Weekly'::frequency
      );


alter table "public"."subscription_products" enable row level security;

CREATE UNIQUE INDEX subscription_products_pkey ON public.subscription_products USING btree (id);

alter table "public"."subscription_products" add constraint "subscription_products_pkey" PRIMARY KEY using index "subscription_products_pkey";

alter table "public"."subscription_products" add constraint "subscription_products_product_id_fkey" FOREIGN KEY (product_id) REFERENCES products(id) not valid;

alter table "public"."subscription_products" validate constraint "subscription_products_product_id_fkey";

alter table "public"."subscription_products" add constraint "subscription_products_subscription_id_fkey" FOREIGN KEY (subscription_id) REFERENCES subscriptions(id) not valid;

alter table "public"."subscription_products" validate constraint "subscription_products_subscription_id_fkey";

grant delete on table "public"."subscription_products" to "anon";

grant insert on table "public"."subscription_products" to "anon";

grant references on table "public"."subscription_products" to "anon";

grant select on table "public"."subscription_products" to "anon";

grant trigger on table "public"."subscription_products" to "anon";

grant truncate on table "public"."subscription_products" to "anon";

grant update on table "public"."subscription_products" to "anon";

grant delete on table "public"."subscription_products" to "authenticated";

grant insert on table "public"."subscription_products" to "authenticated";

grant references on table "public"."subscription_products" to "authenticated";

grant select on table "public"."subscription_products" to "authenticated";

grant trigger on table "public"."subscription_products" to "authenticated";

grant truncate on table "public"."subscription_products" to "authenticated";

grant update on table "public"."subscription_products" to "authenticated";

grant delete on table "public"."subscription_products" to "service_role";

grant insert on table "public"."subscription_products" to "service_role";

grant references on table "public"."subscription_products" to "service_role";

grant select on table "public"."subscription_products" to "service_role";

grant trigger on table "public"."subscription_products" to "service_role";

grant truncate on table "public"."subscription_products" to "service_role";

grant update on table "public"."subscription_products" to "service_role";


