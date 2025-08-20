set check_function_bodies = off;

CREATE OR REPLACE FUNCTION public.submit_booking()
 RETURNS trigger
 LANGUAGE plpgsql
 SECURITY DEFINER
AS $function$declare 
  v_product_id UUID;
  v_product_duration SMALLINT;
  v_opening TIME WITH TIME ZONE;
  v_closing TIME WITH TIME ZONE;
  v_user_role public.roles;
  v_is_manager_booking boolean;
begin
  -- Check if current user is a manager booking for same-org client
  SELECT EXISTS (
    SELECT 1 
    FROM user_roles
    JOIN user_organizations ON user_organizations.user_id = user_roles.user_id
    JOIN user_organizations AS client_org ON client_org.user_id = new.booked_by
    JOIN space_units ON space_units.id = new.space_unit_id
    JOIN spaces ON spaces.id = space_units.space_id
    JOIN branches ON branches.id = spaces.branch_id
    WHERE user_roles.user_id = auth.uid()
    AND user_roles.role = 'manager'
    AND user_organizations.organization_id = branches.organization_id
    AND client_org.organization_id = branches.organization_id
  ) INTO v_is_manager_booking;

  -- Only check client role restriction if it's not a manager booking
  if not v_is_manager_booking then
    --  Step 0: Ensure only clients can book
    select user_role
    into v_user_role
    from public.get_booking_with_user()
    where booking_id = new.id;

    if v_user_role is distinct from 'client' then
      raise exception 'Invalid booking access: only clients can submit bookings';
    end if;
  end if;

  --  Step 1: Prevent booking past date/time
  new := prevent_past_booking(new);

  --  Step 2: Validate subscription rules & voucher (no more auto-gen here)
  new := handle_subscription_and_voucher(new);

  --  Step 3: If voucher is present, get product details
  if new.product_voucher_id is not null then
    select * into v_product_id, v_product_duration
    from get_product_info(new.product_voucher_id);

    --  Step 4: Get space availability for the selected date
    select * into v_opening, v_closing
    from get_space_availability(new.space_unit_id, new.date);

    --  Step 5: Assign correct booking times
    select * into new.start_time, new.end_time
    from assign_booking_times_by_duration(
      new.start_time,
      new.end_time,
      v_opening,
      v_closing,
      v_product_duration
    );

    --  Step 6: Validate time boundaries
    perform validate_time_within_bounds(
      new.start_time,
      new.end_time,
      v_opening,
      v_closing
    );

    --  Step 7: Check for overlapping bookings
    perform check_booking_overlap(
      new.space_unit_id,
      new.date,
      new.start_time,
      new.end_time
    );

    --  Step 8: Validate and mark voucher as used
    -- Use client's ID for voucher validation in manager bookings
    perform verify_product_voucher(
      CASE WHEN v_is_manager_booking THEN new.booked_by ELSE auth.uid() END,
      new.space_unit_id,
      new.start_time,
      new.end_time,
      new.product_voucher_id
    );

    perform set_product_voucher_used(new.product_voucher_id);

  else
    --  If voucher is NULL but allowed by subscription,
    -- still enforce basic booking validations
    select * into v_opening, v_closing
    from get_space_availability(new.space_unit_id, new.date);

    perform validate_time_within_bounds(
      new.start_time,
      new.end_time,
      v_opening,
      v_closing
    );

    perform check_booking_overlap(
      new.space_unit_id,
      new.date,
      new.start_time,
      new.end_time
    );
  end if;

  return new;
end;$function$
;

create policy "Managers can delete in their org"
on "public"."bookings"
as permissive
for delete
to authenticated
using ((EXISTS ( SELECT 1
   FROM ((((user_roles ur
     JOIN user_organizations uo ON ((ur.user_id = uo.user_id)))
     JOIN space_units su ON ((bookings.space_unit_id = su.id)))
     JOIN spaces s ON ((su.space_id = s.id)))
     JOIN branches b ON ((s.branch_id = b.id)))
  WHERE ((ur.user_id = auth.uid()) AND (ur.role = 'manager'::roles) AND (uo.organization_id = b.organization_id)))));


create policy "Managers can insert bookings for same org clients"
on "public"."bookings"
as permissive
for insert
to authenticated
with check (((EXISTS ( SELECT 1
   FROM (user_roles ur
     JOIN user_organizations uo ON ((uo.user_id = ur.user_id)))
  WHERE ((ur.user_id = auth.uid()) AND (ur.role = 'manager'::roles) AND (uo.organization_id IN ( SELECT branches.organization_id
           FROM ((space_units su
             JOIN spaces s ON ((s.id = su.space_id)))
             JOIN branches ON ((branches.id = s.branch_id)))
          WHERE (su.id = bookings.space_unit_id)))))) AND (EXISTS ( SELECT 1
   FROM user_organizations client_org
  WHERE ((client_org.user_id = bookings.booked_by) AND (client_org.organization_id IN ( SELECT branches.organization_id
           FROM ((space_units su
             JOIN spaces s ON ((s.id = su.space_id)))
             JOIN branches ON ((branches.id = s.branch_id)))
          WHERE (su.id = bookings.space_unit_id))))))));


create policy "Managers can update bookings in their org"
on "public"."bookings"
as permissive
for update
to authenticated
using ((EXISTS ( SELECT 1
   FROM ((((user_roles ur
     JOIN user_organizations uo ON ((ur.user_id = uo.user_id)))
     JOIN space_units su ON ((bookings.space_unit_id = su.id)))
     JOIN spaces s ON ((su.space_id = s.id)))
     JOIN branches b ON ((s.branch_id = b.id)))
  WHERE ((ur.user_id = auth.uid()) AND (ur.role = 'manager'::roles) AND (uo.organization_id = b.organization_id)))));


create policy "Managers can view bookings in their org"
on "public"."bookings"
as permissive
for select
to authenticated
using ((EXISTS ( SELECT 1
   FROM ((((user_roles ur
     JOIN user_organizations uo ON ((ur.user_id = uo.user_id)))
     JOIN space_units su ON ((bookings.space_unit_id = su.id)))
     JOIN spaces s ON ((su.space_id = s.id)))
     JOIN branches b ON ((s.branch_id = b.id)))
  WHERE ((ur.user_id = auth.uid()) AND (ur.role = 'manager'::roles) AND (uo.organization_id = b.organization_id)))));



