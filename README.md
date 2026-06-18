# rajareddy.site

Personal portfolio for Raja Shekar Reddy Seelam — security engineer, AI red-teaming, cloud.

## Stack
- Next.js 16 (App Router) + React 19 + TypeScript
- Tailwind CSS v4 (CSS-first theme via `@theme inline`)
- `next/font` for Inter + Geist Mono (self-hosted; no Google CDN at runtime)
- `next/og` for dynamic OpenGraph image at `/og.png`
- Optional Resend for the contact form (falls back to stdout logging)

## Development
```bash
npm install
npm run dev      # http://localhost:3000
npm run build    # production build
npm run start    # serve the build
npm run lint
```

## Project layout
```
src/
  app/                       Routes, layout, route handlers
    api/contact/route.ts     Contact form endpoint
    og.png/route.tsx         Dynamic OG image
    sitemap.ts robots.ts     Built-in metadata routes
  components/
    site/                    Nav, Footer, Section, JsonLd, Container
    sections/                Hero, Work, Experience, Skills, Contact
    ui/                      Chip, etc.
  lib/
    site.ts                  Single source of truth for site metadata
    projects.ts              Featured + other projects
    cv.ts                    Experience, skills, education, volunteering
public/
  photos/                    Profile photos
  raja-shekar-reddy-seelam-resume.pdf   Drop your latest resume here
```

## Customizing
- **Site identity, links, proof points** → `src/lib/site.ts`
- **Projects** → `src/lib/projects.ts`
- **Experience / skills / education** → `src/lib/cv.ts`
- **Design tokens (colors, gradients, radii)** → `src/app/globals.css` (`@theme inline` block)

## Deploy
Vercel. Push the branch → preview URL auto-builds. Promote to production once approved.

Optional env vars:
- `RESEND_API_KEY` — enable real email delivery for the contact form
- `CONTACT_TO_EMAIL`, `CONTACT_FROM_EMAIL` — override defaults
