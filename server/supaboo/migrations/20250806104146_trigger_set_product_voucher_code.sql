CREATE TRIGGER trg_set_product_voucher_code BEFORE INSERT ON public.product_vouchers FOR EACH ROW EXECUTE FUNCTION set_product_voucher_code();


