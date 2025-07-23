# Supabase Server (Database & Migrations)

This folder contains all Supabase backend configuration, migrations, and database management scripts for the Virtual Office App.

---

## Setup Instructions

### 1. Install Docker

- **Docker Engine** is required to run the local Supabase stack.
- Download and install [Docker Desktop](https://www.docker.com/products/docker-desktop/) for your OS.
- After installation, ensure Docker is running by executing:
  ```sh
  docker --version
  ```

### 2. Install Supabase CLI

- Install the Supabase CLI globally:
  ```sh
  npm install -g supabase
  ```
- Verify installation:
  ```sh
  npx supabase --version
  ```

### 3. Start Supabase Locally

- In this folder, run:
  ```sh
  npx supabase start
  ```
- This will spin up the Supabase stack (Postgres, API, Studio, etc.) using Docker containers.

### 4. Apply Migrations

- To apply all migrations to your local database:
  ```sh
  npx supabase db reset
  ```
  or
  ```sh
  npx supabase db push
  ```

---

## Production Commands

**Pull schema from production database**

```sh
npx supabase db pull --db-url postgresql://postgres:73R9yNL86b3dZxI8MPrmLMPIOQrBKxHt@api.virtualoffice.incub8.space:54324/postgres
```

**Push local migrations to production**

```sh
npx supabase db push --db-url postgresql://postgres:73R9yNL86b3dZxI8MPrmLMPIOQrBKxHt@api.virtualoffice.incub8.space:54324/postgres
```

---

## Development Commands

npx supabase db push --db-url postgresql://postgres:73R9yNL86b3dZxI8MPrmLMPIOQrBKxHt@api.virtualoffice.incub8.space:54324/postgres
**Pull schema from local Supabase instance**

```sh
npx supabase db pull --schema public,auth,storage --db-url postgresql://postgres:postgres@127.0.0.1:54322/postgres
```

or

```sh
npx supabase db pull --db-url postgresql://postgres:postgres@127.0.0.1:54322/postgres
```

**Reset local database (WARNING: This will erase all data in your local DB container)**

```sh
npx supabase db reset
```

**Generate TypeScript types from local schema**

```sh
npx supabase gen types typescript --local > types/supabase.ts
```

**Dump only data from the local database**

```sh
npx supabase db dump --data-only
```

or

```sh
npx supabase db dump --data-only > supabase/seed.sql --db-url postgresql://postgres:postgres@127.0.0.1:54322/postgres
```

---

**Remove all migrations from Production server**

```sh
DELETE FROM supabase_migrations.schema_migrations;
```

**Reset remote DB**

```sh
DROP SCHEMA public CASCADE;
DROP SCHEMA supabase_migrations CASCADE;

CREATE SCHEMA public AUTHORIZATION postgres;
CREATE SCHEMA supabase_migrations AUTHORIZATION postgres;

GRANT ALL ON SCHEMA public TO postgres;
GRANT ALL ON SCHEMA supabase_migrations TO postgres;
```

## Notes

- Replace credentials and URLs as needed for your environment.
- See [Supabase CLI documentation](https://supabase.com/docs/guides/cli) for more details and advanced usage.
- Always backup your data before running destructive commands like `db reset`.
