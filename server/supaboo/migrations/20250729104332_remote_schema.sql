alter table "public"."products" drop constraint "products_organization_id_fkey";

create table "public"."organization_pages" (
    "id" uuid not null default gen_random_uuid(),
    "created_at" timestamp with time zone not null default now(),
    "page_url" text not null
);


alter table "public"."organization_pages" enable row level security;

alter table "public"."products" drop column "organization_id";

alter table "public"."products" add column "space_id" uuid;

alter table "public"."space_availability" alter column "space_id" drop default;

alter table "public"."space_availability" disable row level security;

CREATE UNIQUE INDEX organization_pages_pkey ON public.organization_pages USING btree (id);

alter table "public"."organization_pages" add constraint "organization_pages_pkey" PRIMARY KEY using index "organization_pages_pkey";

alter table "public"."products" add constraint "products_space_id_fkey" FOREIGN KEY (space_id) REFERENCES spaces(id) ON UPDATE CASCADE ON DELETE CASCADE not valid;

alter table "public"."products" validate constraint "products_space_id_fkey";

grant delete on table "public"."organization_pages" to "anon";

grant insert on table "public"."organization_pages" to "anon";

grant references on table "public"."organization_pages" to "anon";

grant select on table "public"."organization_pages" to "anon";

grant trigger on table "public"."organization_pages" to "anon";

grant truncate on table "public"."organization_pages" to "anon";

grant update on table "public"."organization_pages" to "anon";

grant delete on table "public"."organization_pages" to "authenticated";

grant insert on table "public"."organization_pages" to "authenticated";

grant references on table "public"."organization_pages" to "authenticated";

grant select on table "public"."organization_pages" to "authenticated";

grant trigger on table "public"."organization_pages" to "authenticated";

grant truncate on table "public"."organization_pages" to "authenticated";

grant update on table "public"."organization_pages" to "authenticated";

grant delete on table "public"."organization_pages" to "service_role";

grant insert on table "public"."organization_pages" to "service_role";

grant references on table "public"."organization_pages" to "service_role";

grant select on table "public"."organization_pages" to "service_role";

grant trigger on table "public"."organization_pages" to "service_role";

grant truncate on table "public"."organization_pages" to "service_role";

grant update on table "public"."organization_pages" to "service_role";

create policy "Enable update"
on "public"."product_vouchers"
as permissive
for update
to public
using ((user_id = auth.uid()))
with check ((user_id = auth.uid()));



