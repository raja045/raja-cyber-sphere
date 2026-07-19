# Raja — Cyber Sphere (Portfolio)

A cybersecurity-themed personal portfolio built with **Vite + React + TypeScript + Tailwind + shadcn/ui**, with a remote **Supabase** backend and an OTP "verify to reveal phone" flow.

## Local development

```bash
npm install
npm run dev        # Vite dev server on http://localhost:8080
```

The OTP flow needs an API. For local dev you can run the standalone Express server:

```bash
npm install --prefix server
npm run dev --prefix server        # Express on http://localhost:4000
# then run the frontend pointing at it:
VITE_API_BASE=http://localhost:4000 npm run dev
```

On Vercel the OTP endpoints run as serverless functions at `/api/*` (same origin),
so `VITE_API_BASE` should be left unset in production.

## Deploying to Vercel

This repo is Vercel-ready:

- **Framework preset:** Vite (auto-detected). Build command `npm run build`, output `dist`.
- **SPA routing:** `vercel.json` rewrites all non-`/api` routes to `/index.html` so
  client-side routes like `/terminal` work on direct load / refresh.
- **Serverless API:** `api/send-otp.js` and `api/verify-otp.js` replace the Express
  server in production. They are stateless (an HMAC-signed token carries the hashed
  code + expiry), which is required because serverless invocations don't share memory.

### Environment variables to set in Vercel

Required (client-side, already committed in `.env` but best set in the dashboard):

- `VITE_SUPABASE_URL`
- `VITE_SUPABASE_PUBLISHABLE_KEY`
- `VITE_SUPABASE_PROJECT_ID`

Recommended / optional (server-side, for the OTP functions):

- `OTP_SECRET` — HMAC secret for signing OTP tokens (set a strong random value in prod).
- `TWILIO_ACCOUNT_SID`, `TWILIO_AUTH_TOKEN`, `TWILIO_FROM` — enable real SMS delivery.
  Without them, codes are only logged to the function console (dev/testing only).

> Note: the Supabase edge function in `supabase/functions/send-contact-email` and its
> migrations target the hosted Supabase project and are deployed via the Supabase CLI,
> independently of Vercel.
