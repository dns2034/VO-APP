alter table "public"."organization_pages" add column if not exists "organization_id" uuid not null;

ALTER TABLE public.organization_pages
DROP CONSTRAINT IF EXISTS organization_pages_organization_id_fkey;

alter table "public"."organization_pages" add constraint "organization_pages_organization_id_fkey" FOREIGN KEY (organization_id) REFERENCES organizations(id) ON UPDATE CASCADE ON DELETE CASCADE not valid;

alter table "public"."organization_pages" validate constraint "organization_pages_organization_id_fkey";

DROP POLICY IF EXISTS "Enable select for organization page with the same organization"
ON public.organization_pages;

create policy "Enable select for organization page with the same organization"
on "public"."organization_pages"
as permissive
for select
to authenticated
using ((EXISTS ( SELECT 1
   FROM user_organizations uo
  WHERE ((uo.user_id = auth.uid()) AND (uo.organization_id = organization_pages.organization_id)))));



