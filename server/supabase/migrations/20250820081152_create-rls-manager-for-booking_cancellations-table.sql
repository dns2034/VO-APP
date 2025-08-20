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
  v_is_manager boolean;
begin
  -- Step 0: Access control check
  IF NEW.booked_by = auth.uid() THEN
    -- client booking for themselves (valid)
    NULL; 
  ELSE
    -- check if current user is a manager for this booking's organization
    SELECT EXISTS (
      SELECT 1
      FROM user_roles ur
      JOIN user_organizations uo ON uo.user_id = ur.user_id
      JOIN branches br ON br.organization_id = uo.organization_id
      JOIN spaces s ON s.branch_id = br.id
      JOIN space_units su ON su.space_id = s.id
      WHERE ur.user_id = auth.uid()
        AND ur.role = 'manager'
        AND su.id = NEW.space_unit_id
    )
    INTO v_is_manager;

    IF NOT v_is_manager THEN
      RAISE EXCEPTION 'Access denied: only client or manager of org can submit booking';
    END IF;
  END IF;

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
      CASE WHEN v_is_manager THEN new.booked_by ELSE auth.uid() END,
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

create policy "Managers can view cancellations in their org"
on "public"."booking_cancellations"
as permissive
for all
to authenticated
using ((EXISTS ( SELECT 1
   FROM (((((user_roles
     JOIN user_organizations ON ((user_organizations.user_id = user_roles.user_id)))
     JOIN bookings ON ((bookings.id = booking_cancellations.booking_id)))
     JOIN space_units ON ((space_units.id = bookings.space_unit_id)))
     JOIN spaces ON ((spaces.id = space_units.space_id)))
     JOIN branches ON ((branches.id = spaces.branch_id)))
  WHERE ((user_roles.user_id = auth.uid()) AND (user_roles.role = 'manager'::roles) AND (user_organizations.organization_id = branches.organization_id)))));



