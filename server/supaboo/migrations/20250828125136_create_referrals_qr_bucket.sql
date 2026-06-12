insert into storage.buckets (id, name, public)
values ('referrals_qr', 'referrals_qr', false)
on conflict (id) do nothing;

-- Allow public read (GET) access on referrals_qr
create policy "Public can read referrals_qr"
on storage.objects for select
using (
  bucket_id = 'referrals_qr'
);

-- Allow service_role to insert (upload) new QR codes
create policy "Service role can insert referrals_qr"
on storage.objects for insert
with check (
  bucket_id = 'referrals_qr'
);

-- Allow service_role to update/overwrite existing QR codes if needed
create policy "Service role can update referrals_qr"
on storage.objects for update
using (
  bucket_id = 'referrals_qr'
);

-- Allow service_role to delete QR codes if needed
create policy "Service role can delete referrals_qr"
on storage.objects for delete
using (
  bucket_id = 'referrals_qr'
);