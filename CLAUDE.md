# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Project Overview

Jmills Entertainment website (jmillsent.com) — a video production company portfolio. Lerna monorepo with two packages: `web` (Next.js frontend) and `studio` (Sanity v2 CMS).

## Commands

### Development
```bash
bun run dev              # Run both web and studio in parallel (from root)
cd web && bun run dev    # Web only (Next.js with Turbopack, localhost:3000)
cd studio && bun run dev # Studio only (Sanity v2)
```

### Build / Lint / Test
```bash
bun run build            # Build both packages (from root)
cd web && bun run build  # Build web only
cd web && bun run lint   # ESLint (Next.js core-web-vitals)
cd web && bun run test   # Playwright tests (Chromium, Firefox, WebKit)
cd web && bunx knip      # Dead code detection
```

**Package manager is Bun** (enforced via `preinstall` script). Use `bun` not `npm`.

## Architecture

### Web (`/web`)
- **Next.js 16** with **Pages Router** (not App Router) — all routes in `web/pages/`
- **React 19**, **Tailwind CSS v4** (via PostCSS)
- Path aliases: `@/components/*`, `@/lib/*`
- Data fetching uses `getStaticProps`/`getStaticPaths` with GROQ queries via `next-sanity`
- Sanity client configured in `web/lib/sanity.js`
- Image URLs built with `@sanity/image-url` via `web/lib/urlForSanitySource.js`
- Portable Text rendered with `@portabletext/react` (custom components in `web/lib/sanity.js`)
- Forms use Formik + Yup; submissions go to DynamoDB (via `web/lib/dynamo-db.js`) and SES email (`web/lib/send-ses-email.js`)
- Newsletter signup via Mailchimp API
- Video playback via Vimeo player (`@vimeo/player`)
- URL query state managed with `nuqs`
- Dynamic routes: `/work/[slug]`, `/news/[slug]`, `/private-gallery/[slug]`, `/work/category/[workItemCategory]`
- API routes in `web/pages/api/`: contact form, custom reel, fresh cuts newsletter

### Studio (`/studio`)
- **Sanity v2** (legacy, not v3) — configured via `studio/sanity.json`, not `sanity.config.ts`
- Project ID: `0c7luntu`, Dataset: `production`
- React 17 (required for Sanity v2 compatibility)
- Schemas in `studio/schemas/` — document types include: workItem, workItemCategory, newsItem, portfolioItem, episode, teamMember, service, brand, plus page singletons (homePage, aboutPage, workPage, etc.)
- Plugins: desk-tool, dashboard (Vercel widget), order-documents, media library, S3 DAM

### Sanity MCP
- Project ID: `0c7luntu`
- Dataset: `production`

## Code Style

- Prettier: no semicolons, single quotes, trailing commas (es5), 2-space tabs, Tailwind plugin
- ESLint: Next.js core-web-vitals config
- Custom fonts: Proxima Nova (Adobe Typekit), Gothic Outline Title (custom)
- Custom colors: gold (`#967738`), trans-black

## Environment Variables

Copy `web/.env.example` to `web/.env.local`. Required vars: AWS credentials (DynamoDB/SES), Sanity project ID/dataset/API token, Google Maps API key, Mailchimp credentials.

## Deployment

Vercel — push to `master` triggers automatic deployment. Web and Studio are separate Vercel projects. Studio has conditional build logic (`studio/vercel-ignore-build.sh`).
