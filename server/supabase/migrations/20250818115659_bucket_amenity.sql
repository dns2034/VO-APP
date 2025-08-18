-- Create a new bucket for amenities photos
insert into storage.buckets (id, name, public)
values ('amenities', 'amenities', true);

-- Managers can upload
create policy "Managers can upload amenities photos"
on storage.objects
for insert to authenticated
with check (
  bucket_id = 'amenities'
  and exists (
    select 1
    from public.user_roles
    join public.user_organizations on user_roles.user_id = user_organizations.user_id
    where user_roles.user_id = auth.uid()
      and user_roles.role = 'manager'::roles
  )
);

-- Managers can delete
create policy "Managers can delete amenities photos"
on storage.objects
for delete to authenticated
using (
  bucket_id = 'amenities'
  and exists (
    select 1
    from public.user_roles
    join public.user_organizations on user_roles.user_id = user_organizations.user_id
    where user_roles.user_id = auth.uid()
      and user_roles.role = 'manager'::roles
  )
);

-- Managers can update metadata
create policy "Managers can update amenities photos metadata"
on storage.objects
for update to authenticated
using (
  bucket_id = 'amenities'
  and exists (
    select 1
    from public.user_roles
    join public.user_organizations on user_roles.user_id = user_organizations.user_id
    where user_roles.user_id = auth.uid()
      and user_roles.role = 'manager'::roles
  )
)
with check (bucket_id = 'amenities');