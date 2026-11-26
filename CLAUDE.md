# markomarinovic.com

Personal site built with Next.js 16 (App Router), React 19, TypeScript and Tailwind CSS 4. Deployed on Vercel. Package manager is Bun.

## Commands

- `bun install` - install dependencies
- `bun dev` - local server on http://localhost:3000
- `bun run lint` - Oxlint (`.oxlintrc.json`)
- `bunx tsc --noEmit` - type check
- `bun run build` - production build; every page is prerendered

## Layout

- `app/` - routes only: `page.tsx`, `layout.tsx`, `not-found.tsx`, `robots.ts`, `sitemap.ts`, `texts/`, `work/`
- `components/layout/` - nav, footer, gradient background
- `components/theme/` - next-themes provider and the light/dark/gradient toggle
- `components/ui/` - shared page frame: `Page`, `PageHeader`, `Section`
- `components/texts/` - text list row and the markdown renderer
- `components/work/` - project card and project icons
- `lib/site.ts` - site URL, nav links, projects, socials, timeline
- `lib/texts.ts` - text types, sorting, date formatting and `getText` for a page
- `lib/theme.ts` - the inline script that sets the theme class before paint
- `texts/index.ts` - the list of texts (data only); `texts/<slug>.md` - one markdown file per entry
- `public/` - avatar, OG image, and text images under `public/images/<text-slug>/`

## Conventions

- Server Components by default. Add `'use client'` only for state, effects or browser APIs; today that's the nav and the theme components.
- Data lives in `lib/`, rendering lives in `components/` and `app/`. `lib/` never imports from `components/`.
- Group new components by feature folder, not by type. One component per concern; shared layout goes in `components/ui/`.
- Style with Tailwind utilities and the theme tokens in `app/globals.css` (`bg-background`, `text-foreground-muted`, `border-border`...). No hard-coded colors in components.
- New routes are static: export `metadata` or `generateMetadata`, and `generateStaticParams` with `dynamicParams = false` for dynamic segments.
- Internal links use `next/link`, external links are `<a target="_blank" rel="noopener noreferrer">`.
- No code comments and no dead code. Delete what's unused.
- TypeScript only and `strict`. No `any` and no `@ts-` overrides.
- Add a dependency only when the platform or an existing one can't do the job.

## Before a pull request

Run `bun run lint`, `bunx tsc --noEmit` and `bun run build`. For a change you can see, run the built site with `bun run start` and check the page in light, dark and gradient themes.

## Shipping

Branch off `main` and open a pull request. Vercel builds a preview for each pull request.
