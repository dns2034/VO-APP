set check_function_bodies = off;

CREATE OR REPLACE FUNCTION public.voucher_store_msg_id(voucher_id uuid, msg_id text)
 RETURNS boolean
 LANGUAGE plpgsql
AS $function$
declare
  updated_count int := 0;
begin
  -- Update product_vouchers
  update public.product_vouchers
  set voucher_tx_msg_id = msg_id,
      updated_at = now()
  where id = voucher_id
    and (voucher_tx_msg_id is distinct from msg_id); -- idempotent
  get diagnostics updated_count = row_count;

  if updated_count > 0 then
    return true;
  end if;

  -- Update cash_vouchers
  update public.cash_vouchers
  set voucher_tx_msg_id = msg_id
  where id = voucher_id
    and (voucher_tx_msg_id is distinct from msg_id); -- idempotent
  get diagnostics updated_count = row_count;

  return updated_count > 0;
end;
$function$
;


