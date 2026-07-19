# AGENTS.md

## Cursor Cloud specific instructions

This repo is a personal portfolio site (Vite + React + TypeScript + shadcn/ui + Tailwind) with an optional local Express OTP dev server and a **remote** Supabase backend.

### Services

- **Frontend (required)** — Vite dev server on port `8080` (see `vite.config.ts`). Run with `npm run dev`. This is the main product.
- **OTP server (optional)** — Express app in `server/` on port `4000`, used only by the Contact section's "Phone / Message" one-time-PIN flow. Run with `npm run dev` from inside `server/`. Standard scripts are in `server/package.json` and `server/README.md`.
- **Supabase (remote, hosted)** — The app talks to a hosted Supabase project via the `VITE_SUPABASE_*` values already committed in `.env`. Used by the contact form (`send-contact-email` edge function) and the visitor counter (`track_unique_visitor` RPC). No local Supabase instance is needed; the `supabase/` folder holds migrations/edge functions for that remote project.

### Non-obvious notes

- **Package manager:** `bun.lock`/`bun.lockb` are present, but bun is not installed on the VM. Use `npm` (a `package-lock.json` exists for both the root and `server/`). The update script installs both.
- **OTP flow wiring:** The frontend calls the OTP server at `import.meta.env.VITE_API_BASE`, which defaults to `''`. There is no Vite proxy, so to exercise the OTP flow end-to-end in dev you must start the frontend with `VITE_API_BASE=http://localhost:4000 npm run dev` (otherwise `/api/*` requests hit the Vite server and 404). The rest of the site works without this.
- **OTP codes in dev:** Without Twilio env vars, the OTP server does not send SMS — it logs `Simulated: OTP for <phone> is <code>` to its console. Read the code from the server log to complete verification.
- **Lint:** `npm run lint` runs but reports ~9 pre-existing errors / ~7 warnings in app code (`no-explicit-any`, empty-object-type, etc.). These are pre-existing, not environment issues.
- **Lint/build race:** Do not run `npm run lint` and `npm run build` at the same time — the Vite build writes a temporary `vite.config.ts.timestamp-*.mjs` that ESLint may try to read, causing a spurious `ENOENT`. Run them sequentially.
- **Interactive terminal:** `/terminal` is an in-app command console (`help`, `ls`, etc.) that is a good no-dependency smoke test of the frontend.
