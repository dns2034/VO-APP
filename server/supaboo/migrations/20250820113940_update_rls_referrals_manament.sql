
  create policy "Managers can update referrals in their org"
  on "public"."referrals"
  as permissive
  for update
  to authenticated
using ((EXISTS ( SELECT 1
   FROM (user_roles ur
     JOIN user_organizations uo ON ((ur.user_id = uo.user_id)))
  WHERE ((ur.user_id = auth.uid()) AND (ur.role = 'manager'::roles) AND (uo.organization_id IN ( SELECT uo2.organization_id
           FROM user_organizations uo2
          WHERE (uo2.user_id = referrals.referred_by)))))));



