# niamkovich.dev

Personal site — Astro, static output, bilingual (Belarusian default, English at `/en/`).

The visual design (color tokens, dark mode, typography) is ported from the
[wqqz.dev](https://github.com/imwqqz/wqqz.dev) Astro theme (MIT licensed).
Only its design tokens and layout patterns were carried over — this site's
content structure, i18n, routing, and pages (About, CV, Apps, Contact, per-app
Privacy policies) are original.

## Commands

| Command           | What it does                              |
| ----------------- | ----------------------------------------- |
| `npm run dev`     | Dev server at `localhost:4321`            |
| `npm run build`   | Static build into `dist/`                 |
| `npm run preview` | Serve the built output                    |
| `npm run check`   | TypeScript + Astro diagnostics            |
| `npm run lint`    | ESLint (`--fix` variant: `lint:fix`)      |
| `npm run format`  | Prettier write (`format:check` to verify) |
| `npm run verify`  | format:check → lint → check, in order     |

Requires Node ≥ 24.16 (`.nvmrc` pins it) — `eslint-plugin-astro` refuses to
install below that. `eslint-plugin-jsx-a11y` is deliberately absent: it has no
ESLint 10 support yet, so the `astro/jsx-a11y-*` rules are unavailable and
accessibility is checked by hand rather than by rule.

## Where the content lives

**`cv.yaml`** (repo root) is the single source of truth for the CV — the same
rendercv-format file that generates the PDF. It is imported as a module, so
editing it hot-reloads the dev server. Everything on `/cv` and `/en/cv` comes
from it: dates, structure, and the English prose.

**`src/data/cv.be.ts`** translates that prose into Belarusian, sitting next to
`cv.ts` since it's the only thing that reads it. Entries are keyed by a slug
derived from each item's own name (`project:smart-caravan`, `experience:akveo`,
…). Anything not translated falls back to the English text from `cv.yaml`, and
`npm run dev` logs a warning naming the missing key — so adding a job to
`cv.yaml` never breaks the build, it just shows up in English until you add
the translation.

Fields that should stay identical in both languages — company names, technology
lists — are listed in that entry's `same: [...]` rather than copied, so the
English text in `cv.yaml` stays the only copy and the warning stays quiet. A
clean `npm run dev` console means nothing is accidentally untranslated.

**`src/components/` follows one rule: a component that owns localized strings
gets its own directory, alongside its `ComponentName.i18n.ts`; a component
that doesn't stays flat at the top level.** So `Nav.astro` + `Nav.i18n.ts`
live in `components/Nav/`, and the same for `HomePage`, `CvPage`, `AppsPage`,
`ContactPage`, `ContactDetails`. `components/Privacy/` is the one
two-component case — `PrivacyIndexPage.astro` and `PrivacyPolicyPage.astro`
share `Privacy.i18n.ts`, so both live there with it. Everything with no copy
of its own — `AppCard.astro`, `CvEntry.astro`, `LabelledGrid.astro`,
`PageSection.astro` — stays at `components/` root; `AppCard.astro` reads
`AppsPage`'s copy (`./AppsPage/AppsPage.i18n`) without owning any of its own.
Each `*.i18n.ts` exports a `Record<Locale, ...Copy>`, same shape throughout.
There's no shared "common strings" file: a string needed in two places (like
the placeholder-content notice) is just written twice rather than pulled
through an indirection only two places use.

**`src/lib/locale.ts`** holds the one truly cross-cutting piece — `Locale`,
`NavSection`, `localePath()`, `otherLocale()` — used by the data layer,
`Base.astro`, and every `*.i18n.ts` file above. It has no translated strings
of its own, which is why it lives in `src/lib/` with the other framework-free
utilities (`tags.ts`, `search.ts`, …) instead of next to any one component.

**`src/data/apps.ts`** holds the apps section: one entry per app (slug, store
links, per-locale name/tagline/description and privacy-policy body). Content
is currently placeholder — no real apps are published yet. `getApps()` backs
`/apps` and `/privacy`; `getApp()` backs each `/privacy/<slug>` page.

## Pages

| Route (`be`, default) | Route (`en`)         | Content                                                                                         |
| --------------------- | -------------------- | ----------------------------------------------------------------------------------------------- |
| `/`                   | `/en/`               | About (`HomePage.astro`)                                                                        |
| `/cv`                 | `/en/cv`             | CV (`CvPage.astro`)                                                                             |
| `/apps`               | `/en/apps`           | Apps list (`AppsPage.astro`)                                                                    |
| `/contact`            | `/en/contact`        | Contact details (`ContactPage.astro`)                                                           |
| `/privacy`            | `/en/privacy`        | Index of per-app policies                                                                       |
| `/privacy/<slug>`     | `/en/privacy/<slug>` | One privacy policy per app, statically generated via `getStaticPaths()` from `src/data/apps.ts` |

**`/blog`** is not part of the be/en split — posts are single-language (see
below), so it lives at an unprefixed path with no locale counterpart.
`Base.astro`'s `translated={false}` prop skips hreflang alternates and the
language-switch link for these pages.

| Route              | Content                                         |
| ------------------ | ----------------------------------------------- |
| `/blog`            | Post list with live search and tag filter       |
| `/blog/<slug>`     | One post, rendered from `src/content/blog/*.md` |
| `/blog/tags`       | All tags with post counts                       |
| `/blog/tags/<tag>` | Posts filtered by tag                           |

## Design system

`src/styles/global.css` defines the color palette as CSS custom properties in
`oklch()`, light values under `:root` and dark values under `.dark` (see
`@custom-variant dark` at the top of the file). `src/layouts/Base.astro` reads
`localStorage`/`prefers-color-scheme` in an inline script and toggles the
`.dark` class on `<html>` before first paint, so there's no flash of the wrong
theme. There is no visible light/dark toggle — it follows the system
preference, matching the source theme.

Components use semantic Tailwind utilities (`bg-background`, `text-foreground`,
`text-muted-foreground`, `bg-card`, `border-border`, `text-accent`, …) mapped
from those tokens via `@theme inline`, never raw colors — that's what makes
dark mode work without a single `dark:` prefixed class anywhere.

Section headers use a shared pattern: `text-xs font-semibold text-muted-foreground
uppercase tracking-wider`, optionally with a small `@lucide/astro` icon.
Repeated blocks (contact links, skill/language grids, CV entries) are their
own components — `ContactDetails.astro`, `LabelledGrid.astro`, `CvEntry.astro`
— rather than styled inline more than once.

## Fonts

**JetBrains Mono**, self-hosted via `@fontsource/jetbrains-mono` (weights 400,
500, 600, 700 plus 400/600 italic), is the only font — matching the source
theme's monospace-everywhere look. The package's per-weight CSS already
includes a Cyrillic `unicode-range`, so Belarusian text needs no extra setup.

## Blog

Mechanically ported from the [wqqz.dev](https://github.com/imwqqz/wqqz.dev)
theme's archive/blog feature (MIT licensed), adapted to this site's routing
and renamed `archives` → `blog` throughout.

Belarusian is the site's main language, so blog chrome (nav, breadcrumbs,
search UI, "N min read", tag/date formatting) is hardcoded Belarusian rather
than pulled from the `*.i18n.ts` system used elsewhere — the blog isn't
translated (see below), so there's no second language for it to switch to.
A post can still be written in English (`lang: en`); that only changes its
own `<html lang>` and date formatting, not the surrounding chrome.

**Writing a post**: add a markdown file to `src/content/blog/`. Frontmatter
(validated by `src/content.config.ts`):

```yaml
title: string
description: string
date: 2026-01-01
tags: [string] # optional, default []
draft: false # optional — drafts are excluded from getBlogPosts()
lang: be # 'be' | 'en', default 'be' — sets that post's <html lang>
ogImage: string # optional
```

`src/content/blog/welcome-to-the-blog.md` is a demo post — delete it once you
have real content.

**Markdown**: posts render through Astro's own default processor — no custom
remark/rehype pipeline. That still covers GFM (tables, task lists,
strikethrough, autolinks, footnotes) and stable heading `id`s (needed for the
TOC's `#anchor` links) out of the box. `astro.config.mjs` sets
`markdown: { syntaxHighlight: false }`, so code fences render as plain
`<pre><code>` with no highlighting. The source theme's callouts (`> [!TIP]`),
tabbed code fences, and Expressive Code/KaTeX were all removed as unneeded —
see git history if any of that is ever wanted back.

**Search & tags**: `/blog`'s `BlogList` (`src/components/blog/`) is a React
island (`client:load`) — the only React on this otherwise framework-free
site. Search is a client-side ranked token match over title/excerpt/tags
(`src/lib/search.ts`, ported) with no index build step, plus a ⌘K/Ctrl+K
overlay (`SearchOverlay.tsx`). Tags come from `src/lib/tags.ts` (ported);
`/blog/tags` and `/blog/tags/<tag>` are plain server-rendered Astro pages.

**Table of contents**: `TableOfContents.astro` builds a two-level (h2/h3)
tree from the post's headings and highlights the current section via
`IntersectionObserver` — a from-scratch, simpler replacement for the source
theme's `astro-toc` package + manual scroll-position script.

## Deploying

`npm run build` emits a plain static `dist/` — deployable to Netlify, Vercel,
Cloudflare Pages or GitHub Pages with no adapter.

Deployment to GitHub Pages is automated by `.github/workflows/deploy.yml` on
every push to `main`. It builds, runs `npm run verify`, and publishes `dist/`
via `actions/deploy-pages`. Two things must stay in sync:

- `site` in `astro.config.mjs` and the single line in `public/CNAME` must hold
  the same custom domain (currently `niamkovich.dev`) — the former drives
  canonical/hreflang URLs, the latter tells GitHub Pages which domain to serve.
- Repo Settings → Pages → Source must be set to "GitHub Actions" (one-time,
  can't be scripted from the repo), and DNS for the domain must point at
  GitHub Pages.
