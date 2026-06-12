set check_function_bodies = off;

CREATE OR REPLACE FUNCTION public.prevent_past_booking(new bookings)
 RETURNS bookings
 LANGUAGE plpgsql
AS $function$
BEGIN
  IF NEW.start_time IS NOT NULL THEN
    IF (NEW.date + NEW.start_time) < NOW() THEN
      RAISE EXCEPTION 'Cannot book for a past date/time.';
    END IF;
  ELSE
    IF NEW.date < CURRENT_DATE THEN
      RAISE EXCEPTION 'Cannot book for a past date.';
    END IF;
  END IF;

  RETURN NEW;
END;
$function$
;


