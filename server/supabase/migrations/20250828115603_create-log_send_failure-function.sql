set check_function_bodies = off;

CREATE OR REPLACE FUNCTION public.log_send_failure(p_event_type text, p_voucher_id uuid, p_context jsonb DEFAULT '{}'::jsonb, p_source text DEFAULT 'system'::text)
 RETURNS uuid
 LANGUAGE plpgsql
AS $function$
declare
  v_id uuid;
begin
  insert into event_logs (event_type, payload, status, source)
  values (
    p_event_type,
    jsonb_build_object(
      'voucher_id', p_voucher_id,
      'context', p_context
    ),
    'failed',
    p_source
  )
  returning id into v_id;

  return v_id;
end;
$function$
;


