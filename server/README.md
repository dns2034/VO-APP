

Pull from production
npx supabase db pull --db-url postgresql://postgres:73R9yNL86b3dZxI8MPrmLMPIOQrBKxHt@api.virtualoffice.incub8.space:54324/postgres

Pull from production
npx supabase db pull --db-url postgresql://postgres:73R9yNL86b3dZxI8MPrmLMPIOQrBKxHt@api.virtualoffice.incub8.space:54324/postgres

Push to production
npx supabase db push --db-url postgresql://postgres:73R9yNL86b3dZxI8MPrmLMPIOQrBKxHt@api.virtualoffice.incub8.space:54324/postgres

pull schema

npx supabase db pull --schema public,auth,storage --db-url postgresql://postgres:postgres@127.0.0.1:54322/postgres

npx supabase migration repair --status applied 20250716070409 --db-url postgresql://postgres:postgres@127.0.0.1:54322/postgres