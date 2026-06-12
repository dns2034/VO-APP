alter table "public"."rewards" drop constraint "rewards_price_check";

create table "public"."products" (
    "id" uuid not null default gen_random_uuid(),
    "created_at" timestamp with time zone not null default now(),
    "name" text not null,
    "description" text not null,
    "image_path" text not null,
    "price" integer not null default 0
);


alter table "public"."products" enable row level security;

alter table "public"."rewards" add column "organization_id" uuid not null;

alter table "public"."rewards" alter column "price" set default 0;

alter table "public"."rewards" alter column "price" set data type integer using "price"::integer;

CREATE UNIQUE INDEX products_pkey ON public.products USING btree (id);

alter table "public"."products" add constraint "products_pkey" PRIMARY KEY using index "products_pkey";

alter table "public"."rewards" add constraint "rewards_organization_id_fkey" FOREIGN KEY (organization_id) REFERENCES organizations(id) ON UPDATE CASCADE ON DELETE CASCADE not valid;

alter table "public"."rewards" validate constraint "rewards_organization_id_fkey";

alter table "public"."rewards" add constraint "rewards_price_check" CHECK (((price)::numeric > (0)::numeric)) not valid;

alter table "public"."rewards" validate constraint "rewards_price_check";

grant delete on table "public"."products" to "anon";

grant insert on table "public"."products" to "anon";

grant references on table "public"."products" to "anon";

grant select on table "public"."products" to "anon";

grant trigger on table "public"."products" to "anon";

grant truncate on table "public"."products" to "anon";

grant update on table "public"."products" to "anon";

grant delete on table "public"."products" to "authenticated";

grant insert on table "public"."products" to "authenticated";

grant references on table "public"."products" to "authenticated";

grant select on table "public"."products" to "authenticated";

grant trigger on table "public"."products" to "authenticated";

grant truncate on table "public"."products" to "authenticated";

grant update on table "public"."products" to "authenticated";

grant delete on table "public"."products" to "service_role";

grant insert on table "public"."products" to "service_role";

grant references on table "public"."products" to "service_role";

grant select on table "public"."products" to "service_role";

grant trigger on table "public"."products" to "service_role";

grant truncate on table "public"."products" to "service_role";

grant update on table "public"."products" to "service_role";


