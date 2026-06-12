CREATE INDEX referrals_created_at_desc_idx ON public.referrals USING btree (created_at DESC);

CREATE INDEX referrals_lead_email_idx ON public.referrals USING btree (lead_email);


