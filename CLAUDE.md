# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Commands

Package manager: `bun` (see `bun.lockb`), though npm scripts work identically.

- `bun dev` — start Next.js dev server on http://localhost:3000
- `bun run build` — production build
- `bun start` — serve production build
- `bun run lint` — run `next lint` (ESLint 9 + `eslint-config-next`)

There is no test suite.

## Architecture

Single-page Next.js 15 App Router portfolio (React 19, Tailwind v4, TypeScript). The entire site is `app/page.tsx` — a client component rendering a tabbed project gallery.

### Data-driven tabs

Four tabs (`dev`, `design`, `web3`, `opensource`) are backed by four separate arrays in `constant/`:

- `dev-projects.ts`, `web3-projects.ts` — standard project cards (title, status, stack, technologies[])
- `design-projects.ts` — design work (thumbnail, designTool[], designLink)
- `opensource.ts` — PR entries (repository, pullRequestUrl)

`app/page.tsx` switches the active array via `getProjectsForTab()` and passes `tab` as a prop so `ProjectCard` can select the correct layout. **Adding a new category means: add a constant file, add a tab switch case, add a branch in `ProjectCard`.**

### ProjectCard branching

`components/blocks/ProjectCard.tsx` is the single card component but contains three completely different return blocks selected by the `tab` prop:

1. `tab === "design"` — thumbnail + design tool bubbles + "Open Design" button
2. `tab === "opensource"` — GitHub-PR styled card with merged badge (note: PR number is currently generated client-side via `Math.random()` — not real data)
3. default (`dev`/`web3`) — status badge + stack badge + technology bubbles

All card variants share the `ProjectCardProps` type defined locally in the file (not the global `ProjectCardProps` in `types/index.d.ts`, which is a legacy/simpler version — prefer the local type when editing cards).

### Supporting components

- `components/blocks/BubbleLogo.tsx` — renders tech/tool icons from `/public/tech/*` referenced by `{ name, icon }` objects in the constants
- `components/blocks/PreviewContainer.tsx` / `PreviewContainerTB.tsx` — thumbnail containers for design cards
- `components/magicui/blur-fade.tsx` — entry animation wrapper around the whole page
- `components/ui/` — shadcn-style primitives (`tabs`, `badge`). `components.json` is configured for shadcn with alias `@/components`.

### Assets

- `public/tech/` — tech stack icons referenced by string path in project constants
- `public/companies/` — org logos for opensource cards
- `public/imgs/` — OG/Twitter images wired up in `app/layout.tsx` metadata

### Path aliases

`@/*` → repo root (see `tsconfig.json`). Imports use `@/components`, `@/constant`, `@/lib`, `@/hooks`.
