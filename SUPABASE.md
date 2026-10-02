# Connect Supabase (production backend)

The app runs in two modes:
- **Local demo** (default): everything in your browser's localStorage. No setup.
- **Cloud** (production): Supabase Postgres + auth. Accounts persist across devices.

## 1. Create the project
1. supabase.com → New project → name `godcode`, save the database password, pick a region close to your users.
2. Wait ~2 minutes for provisioning.

## 2. Create the tables
Dashboard → SQL Editor → New query → paste the full contents of `supabase/schema.sql` → Run.
This creates `profiles` + `saved_insights`, row-level security, the signup trigger,
column grants (client can never write `plan`), and a backfill for any pre-existing users.

## 3. Get the API keys
Settings → API:
- Project URL → `VITE_SUPABASE_URL`
- anon public key → `VITE_SUPABASE_ANON_KEY`

## 4. Run locally
```bash
cp .env.example .env.local   # fill in the two values
npm install                  # pulls @supabase/supabase-js
npm run dev                  # cloud mode is active when the env vars are set
