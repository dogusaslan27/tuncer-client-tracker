# Tuncer Turizm — Client Tracker

Internal tool for tracking visa client cases: status, priority, next
action dates, and overdue follow-ups.

## Setup

1. Install dependencies:
   ```
   npm install
   ```
2. Create a Supabase project, then run [`supabase/schema.sql`](./supabase/schema.sql)
   in the Supabase SQL editor to create the `clients` table with RLS enabled.
3. Copy `.env.example` to `.env` and fill in your Supabase project URL and anon key.
4. Enable Supabase Auth (email/password or magic link) and create accounts
   for the team — RLS policies require an authenticated user.
5. Start the dev server:
   ```
   npm run dev
   ```

## Stack

- React + TypeScript + Vite
- Tailwind CSS (Tuncer brand palette in `tailwind.config.ts`)
- Supabase (Postgres + Auth + RLS)
- `date-fns` (Turkish locale), `papaparse` (CSV export)

## Structure

See `src/components/ui` for reusable primitives (Button, Badge, Modal,
Table, Input, Select) and `src/components/features` for domain components
(VisaStatusBadge, PriorityBadge, ClientsTable, ClientFormModal, etc).

Data model and statuses live in `src/types/index.ts` and `src/lib/constants.ts`.

## Data privacy (KVKK / GDPR)

- No client PII is logged to the console or external services.
- Row Level Security is enabled on the `clients` table — only authenticated
  team members can read/write.
- If document uploads are added later, use signed Supabase Storage URLs
  with a 1-hour expiry only.

## Still to do

- Wire up Supabase Auth login screen (currently assumes a signed-in session).
- Document upload module (Supabase Storage).
- Per-client detail/history view.
