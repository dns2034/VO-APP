drop policy "Managers can create branches" on "public"."branches";

drop policy "Managers can delete branches" on "public"."branches";

drop policy "Managers can update branches" on "public"."branches";

drop policy "Managers can view branches" on "public"."branches";

drop policy "Managers can delete availability for their org" on "public"."space_availability";

drop policy "Managers can insert availability for their org" on "public"."space_availability";

drop policy "Managers can update availability for their org" on "public"."space_availability";

create policy "Manager can manage branches in their org"
on "public"."branches"
as permissive
for all
to authenticated
using ((EXISTS ( SELECT 1
   FROM (user_roles
     JOIN user_organizations ON ((user_roles.user_id = user_organizations.user_id)))
  WHERE ((user_roles.user_id = auth.uid()) AND (user_roles.role = 'manager'::roles) AND (user_organizations.organization_id = branches.organization_id)))))
with check ((EXISTS ( SELECT 1
   FROM (user_roles
     JOIN user_organizations ON ((user_roles.user_id = user_organizations.user_id)))
  WHERE ((user_roles.user_id = auth.uid()) AND (user_roles.role = 'manager'::roles) AND (user_organizations.organization_id = branches.organization_id)))));


create policy "Manager can manage products voucher in their org"
on "public"."product_vouchers"
as permissive
for all
to authenticated
using ((EXISTS ( SELECT 1
   FROM ((((products
     JOIN spaces ON ((products.space_id = spaces.id)))
     JOIN branches ON ((spaces.branch_id = branches.id)))
     JOIN user_organizations ON ((branches.organization_id = user_organizations.organization_id)))
     JOIN user_roles ON ((user_organizations.user_id = user_roles.user_id)))
  WHERE ((products.id = product_vouchers.product_id) AND (user_roles.user_id = auth.uid()) AND (user_roles.role = 'manager'::roles)))))
with check ((EXISTS ( SELECT 1
   FROM ((((products
     JOIN spaces ON ((products.space_id = spaces.id)))
     JOIN branches ON ((spaces.branch_id = branches.id)))
     JOIN user_organizations ON ((branches.organization_id = user_organizations.organization_id)))
     JOIN user_roles ON ((user_organizations.user_id = user_roles.user_id)))
  WHERE ((products.id = product_vouchers.product_id) AND (user_roles.user_id = auth.uid()) AND (user_roles.role = 'manager'::roles)))));


create policy "Manager can manage space availability in their org"
on "public"."space_availability"
as permissive
for all
to authenticated
using (((EXISTS ( SELECT 1
   FROM ((spaces
     JOIN branches ON ((branches.id = spaces.branch_id)))
     JOIN user_organizations ON ((user_organizations.organization_id = branches.organization_id)))
  WHERE ((spaces.id = space_availability.space_id) AND (user_organizations.user_id = auth.uid())))) AND (EXISTS ( SELECT 1
   FROM user_roles
  WHERE ((user_roles.user_id = auth.uid()) AND (user_roles.role = 'manager'::roles))))))
with check (((EXISTS ( SELECT 1
   FROM ((spaces
     JOIN branches ON ((branches.id = spaces.branch_id)))
     JOIN user_organizations ON ((user_organizations.organization_id = branches.organization_id)))
  WHERE ((spaces.id = space_availability.space_id) AND (user_organizations.user_id = auth.uid())))) AND (EXISTS ( SELECT 1
   FROM user_roles
  WHERE ((user_roles.user_id = auth.uid()) AND (user_roles.role = 'manager'::roles))))));



