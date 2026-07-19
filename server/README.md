# Portfolio API Server (development)

Express server used during local development for OTP verification and dynamic blog feeds.

## Endpoints

- `POST /api/send-otp` — `{ phone }`
- `POST /api/verify-otp` — `{ phone, code }`
- `GET /api/blogs?limit=6` — fetches latest Medium + Hashnode posts

## Blog feed configuration

Medium posts are pulled from the official RSS feed:

```
https://medium.com/feed/@YOUR_USERNAME
```

### Step 1: Find your Medium username

Open your Medium profile. The URL looks like:

```
https://medium.com/@your-username
```

Use `your-username` (without `@`) as `MEDIUM_USERNAME`.

> **Important:** `@nakamotosecurity` currently returns 404 on Medium. Update this to your real handle.

### Step 2: Verify the feed works

```bash
curl -A "Mozilla/5.0" "https://medium.com/feed/@YOUR_USERNAME" | grep "<item>" | wc -l
```

If the count is greater than 0, the feed is working.

### Step 3: Set environment variables

Create `server/.env` (or root `.env`):

```env
MEDIUM_USERNAME=your-username
HASHNODE_HOST=toxsec.hashnode.dev

# Optional overrides
MEDIUM_RSS_URL=
RSS2JSON_API_KEY=
```

For the frontend, also set in root `.env`:

```env
VITE_MEDIUM_USERNAME=your-username
VITE_HASHNODE_HOST=toxsec.hashnode.dev
```

### Optional: RSS2JSON fallback

If Medium blocks direct RSS fetches from your server IP, sign up at https://rss2json.com and set:

```env
RSS2JSON_API_KEY=your_api_key
```

## OTP configuration

- `PORT` (optional, default 4000)
- `TWILIO_ACCOUNT_SID` (optional)
- `TWILIO_AUTH_TOKEN` (optional)
- `TWILIO_FROM` (optional)

## Run locally

```bash
cd server
npm install
node index.js
```

The frontend proxies `/api/blogs` to this server during `npm run dev`.

## Production

Deploy the `fetch-blogs` Supabase edge function and set the same env vars in Supabase:

- `MEDIUM_USERNAME`
- `HASHNODE_HOST`
- `MEDIUM_RSS_URL` (optional)
- `RSS2JSON_API_KEY` (optional)
