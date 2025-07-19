Production Commands
Pull from production
npx supabase db pull --db-url postgresql://postgres:73R9yNL86b3dZxI8MPrmLMPIOQrBKxHt@api.virtualoffice.incub8.space:54324/postgres

Pull from production
npx supabase db pull --db-url postgresql://postgres:73R9yNL86b3dZxI8MPrmLMPIOQrBKxHt@api.virtualoffice.incub8.space:54324/postgres

Push to production
npx supabase db push --db-url postgresql://postgres:73R9yNL86b3dZxI8MPrmLMPIOQrBKxHt@api.virtualoffice.incub8.space:54324/postgres

Development Commands
Pull From Local Gui
npx supabase db pull --schema public,auth,storage --db-url postgresql://postgres:postgres@127.0.0.1:54322/postgres

npx supabase db pull --db-url postgresql://postgres:postgres@127.0.0.1:54322/postgres

Reset DB WARNING!! THIS RESETS THE CURRENT DATABASE CONTAINER
npx supabase db reset

Generate Types
npx supabase gen types typescript --local > types/supabase.ts

supabase db dump --data-only

npx supabase db dump --data-only > supabase/seed.sql --db-url postgresql://postgres:postgres@127.0.0.1:54322/postgres
