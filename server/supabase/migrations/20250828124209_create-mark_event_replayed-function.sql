set check_function_bodies = off;

CREATE OR REPLACE FUNCTION public.mark_event_replayed(event_id uuid, new_status text)
 RETURNS void
 LANGUAGE plpgsql
AS $function$
begin
  -- Only allow "success" or "failed"
  if new_status not in ('success', 'failed') then
    raise exception 'Invalid status. Allowed values: success, failed';
  end if;

  -- Update event_logs row
  update public.event_logs
  set status = new_status
  where id = event_id;

  if not found then
    raise exception 'Event with id % not found', event_id;
  end if;
end;
$function$
;


