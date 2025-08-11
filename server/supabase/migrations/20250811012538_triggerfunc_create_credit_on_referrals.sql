alter table "public"."referrals" add column "referred_by" uuid;

set check_function_bodies = off;

CREATE OR REPLACE FUNCTION public.create_credit_on_referral()
 RETURNS trigger
 LANGUAGE plpgsql
AS $function$BEGIN
  -- Only proceed if referred_by is not NULL
  IF NEW.referred_by IS NOT NULL THEN
    INSERT INTO public.credits (user_id)
    VALUES (NEW.referred_by);
  END IF;

  RETURN NEW;
END;$function$
;

CREATE TRIGGER trg_create_credit_on_referral AFTER INSERT ON public.referrals FOR EACH ROW EXECUTE FUNCTION create_credit_on_referral();


