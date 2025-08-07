create table "public"."businesses" (
    "id" uuid not null default gen_random_uuid(),
    "created_at" timestamp with time zone not null default now(),
    "user_id" uuid not null default gen_random_uuid(),
    "name" text not null,
    "description" text,
    "website" text,
    "phone" text,
    "email" text,
    "logo_url" text
);


alter table "public"."businesses" enable row level security;

CREATE UNIQUE INDEX businesses_pkey ON public.businesses USING btree (id);

alter table "public"."businesses" add constraint "businesses_pkey" PRIMARY KEY using index "businesses_pkey";

alter table "public"."businesses" add constraint "businesses_user_id_fkey" FOREIGN KEY (user_id) REFERENCES auth.users(id) ON UPDATE CASCADE ON DELETE CASCADE not valid;

alter table "public"."businesses" validate constraint "businesses_user_id_fkey";

grant delete on table "public"."businesses" to "anon";

grant insert on table "public"."businesses" to "anon";

grant references on table "public"."businesses" to "anon";

grant select on table "public"."businesses" to "anon";

grant trigger on table "public"."businesses" to "anon";

grant truncate on table "public"."businesses" to "anon";

grant update on table "public"."businesses" to "anon";

grant delete on table "public"."businesses" to "authenticated";

grant insert on table "public"."businesses" to "authenticated";

grant references on table "public"."businesses" to "authenticated";

grant select on table "public"."businesses" to "authenticated";

grant trigger on table "public"."businesses" to "authenticated";

grant truncate on table "public"."businesses" to "authenticated";

grant update on table "public"."businesses" to "authenticated";

grant delete on table "public"."businesses" to "service_role";

grant insert on table "public"."businesses" to "service_role";

grant references on table "public"."businesses" to "service_role";

grant select on table "public"."businesses" to "service_role";

grant trigger on table "public"."businesses" to "service_role";

grant truncate on table "public"."businesses" to "service_role";

grant update on table "public"."businesses" to "service_role";

create policy "Clients can delete their businesses"
on "public"."businesses"
as permissive
for delete
to authenticated
using ((user_id = auth.uid()));


create policy "Clients can update their businesses"
on "public"."businesses"
as permissive
for update
to authenticated
using ((user_id = auth.uid()));


create policy "Clients can view businesses inside their organization"
on "public"."businesses"
as permissive
for select
to authenticated
using ((EXISTS ( SELECT 1
   FROM (user_organizations uo_owner
     JOIN user_organizations uo_viewer ON ((uo_owner.organization_id = uo_viewer.organization_id)))
  WHERE ((uo_owner.user_id = businesses.user_id) AND (uo_viewer.user_id = auth.uid())))));



