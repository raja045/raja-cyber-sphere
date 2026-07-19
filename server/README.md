# Portfolio API Server (development)

Express server for OTP verification and dynamic blog feeds.

## Endpoints

- `POST /api/send-otp` — `{ phone }`
- `POST /api/verify-otp` — `{ phone, code }`
- `GET /api/blogs?limit=6` — merged Medium + Hashnode feed

## Blog feed logic

Posts are fetched using the same pattern as the Vercel serverless example:

| Platform | Primary | Fallback |
|----------|---------|----------|
| **Medium** | RSS via `rss-parser` (`medium.com/feed/@username`) | — |
| **Hashnode** | GraphQL API (`gql.hashnode.com`) | RSS feed |

Both sources use `Promise.allSettled` — if one platform fails, the other still loads.

### Environment variables

```env
MEDIUM_USERNAME=seeurity
MEDIUM_FEED=https://medium.com/feed/@seeurity
HASHNODE_HOST=seeurity.hashnode.dev
HASHNODE_PAT=           # optional, for Hashnode GraphQL Pro API
```

### Verify locally

```bash
cd server
npm install
node index.js

# In another terminal:
curl http://localhost:4000/api/blogs?limit=6
```

### Hashnode GraphQL note

Hashnode now requires a Pro plan + Personal Access Token for GraphQL. Without `HASHNODE_PAT`, the server automatically falls back to the RSS feed at `https://{HOST}/rss.xml`.

## OTP configuration

- `PORT` (optional, default 4000)
- `TWILIO_ACCOUNT_SID`, `TWILIO_AUTH_TOKEN`, `TWILIO_FROM` (optional)

## Production (Vercel)

The site ships with a Vercel serverless route at `api/blogs.ts`. After merging and deploying:

1. Add env vars in the Vercel project dashboard (optional — defaults work for `@seeurity` / `seeurity.hashnode.dev`):
   - `MEDIUM_USERNAME` or `MEDIUM_FEED`
   - `HASHNODE_HOST`
   - `HASHNODE_PAT` (optional, for Hashnode GraphQL)
2. Redeploy — the Blogs nav dropdown and `// 07 Latest Writing` section will load posts automatically.

Alternatively, deploy the `fetch-blogs` Supabase edge function with the same env vars.
