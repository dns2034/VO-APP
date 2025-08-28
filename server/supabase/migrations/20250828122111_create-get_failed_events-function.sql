set check_function_bodies = off;

CREATE OR REPLACE FUNCTION public.get_failed_events()
 RETURNS TABLE(event_id uuid, voucher_id uuid, payload jsonb, created_at timestamp with time zone)
 LANGUAGE sql
 SECURITY DEFINER
AS $function$
  select
    el.id as event_id,
    (el.payload->>'voucher_id')::uuid as voucher_id,
    el.payload,
    el.created_at
  from public.event_logs el
  where el.status = 'failed';
$function$
;


