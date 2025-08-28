alter table "public"."cash_vouchers" drop column "msg_tx_id";

alter table "public"."cash_vouchers" add column "voucher_tx_msg_id" text;


