CREATE TRIGGER trg_set_reward_voucher_code BEFORE INSERT ON public.reward_vouchers FOR EACH ROW EXECUTE FUNCTION set_reward_voucher_code();


