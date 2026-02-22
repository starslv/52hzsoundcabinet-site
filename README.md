# 52Hz Sound Cabinet

Next.js 14 (App Router) bilingual site with Sanity CMS integration.

## Start

```bash
npm install
npm run dev
```

## Environment

Copy `.env.example` to `.env.local` and set:

- `NEXT_PUBLIC_SANITY_PROJECT_ID`
- `NEXT_PUBLIC_SANITY_DATASET`
- `NEXT_PUBLIC_SANITY_API_VERSION`
- `SANITY_API_READ_TOKEN` (optional, for private datasets)

## Routes

- `/en/...` and `/zh/...` locale routes
- `/studio` Sanity Studio
- Middleware redirects non-locale routes (except `/studio`) to `/en/...`

CMS-backed sections:

- `/[lang]/projects` and `/[lang]/projects/[slug]`
- `/[lang]/research` and `/[lang]/research/[slug]`
- `/[lang]/press`
- `/[lang]/field-expeditions` and `/[lang]/field-expeditions/[slug]`

## Sanity schema types

- `project`
- `researchPost`
- `pressItem`
- `expedition`

All include bilingual fields (`*_en`, `*_zh`) and media/link fields.
