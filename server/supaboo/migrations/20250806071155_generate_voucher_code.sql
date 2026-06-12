CREATE OR REPLACE FUNCTION generate_voucher_code()
RETURNS TEXT
LANGUAGE plpgsql
AS $$
BEGIN
  RETURN upper(SUBSTRING(md5(random()::text), 1, 8));
END;
$$;
