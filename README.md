# niamkovich.com

Personal site — Astro, static output, bilingual (Belarusian default, English at `/en/`).

The design is imported from the Claude Design project
`213fa21b-1040-4f44-bcc2-5c2893846ebd` (`index.dc.html`). Its `support.js` runtime
was not carried over: the page declared no dynamic logic, so it ports to plain
static HTML.

## Commands

| Command           | What it does                   |
| ----------------- | ------------------------------ |
| `npm run dev`     | Dev server at `localhost:4321` |
| `npm run build`   | Static build into `dist/`      |
| `npm run preview` | Serve the built output         |
| `npm run check`   | TypeScript + Astro diagnostics |

## Where the content lives

**`cv.yaml`** (repo root) is the single source of truth for the CV — the same
rendercv-format file that generates the PDF. It is imported as a module, so
editing it hot-reloads the dev server. Everything on `/cv` and `/en/cv` comes
from it: dates, structure, and the English prose.

**`src/i18n/cv.be.ts`** translates that prose into Belarusian. Entries are keyed
by a slug derived from each item's own name (`project:smart-caravan`,
`experience:akveo`, …). Anything not translated falls back to the English text
from `cv.yaml`, and `npm run dev` logs a warning naming the missing key — so
adding a job to `cv.yaml` never breaks the build, it just shows up in English
until you add the translation.

Fields that should stay identical in both languages — company names, technology
lists — are listed in that entry's `same: [...]` rather than copied, so the
English text in `cv.yaml` stays the only copy and the warning stays quiet. A
clean `npm run dev` console means nothing is accidentally untranslated.

**`src/i18n/home.ts`** holds the hand-written home page copy in both languages.
It is prose, not generated from `cv.yaml`. Contact details are written as
`{email}`, `{phone}`, `{linkedin}`, `{github}` placeholders and filled in from
`cv.yaml` at build time.

**`src/i18n/ui.ts`** holds nav labels, section headings and meta descriptions.

## Layout notes

`src/styles/global.css` carries the design verbatim, including the attribute
hooks the responsive rules key off:

- `[data-body="screen"]` — the one-page, vertically centred layout with
  viewport-relative type. Used for the home page.
- `[data-body="doc"]` — same look, fixed type scale, top-aligned, scrolls. Used
  for the CV, where `vh`-based typography would read wrong.
- `[data-col]` — the measure column: `55%` wide, indented `11.5%`.
- `[data-side]` — Tufte-style margin notes. They float into the gutter the
  column's width and indent create, so `--col-width`, `--col-indent`,
  `--side-width` and `--side-pull` in `:root` are interdependent — changing one
  alone pushes sidenotes off the page. Under 900px they collapse to
  left-bordered blocks inline with the text.

These styles are deliberately **global**, not component-scoped: Astro's scoping
plus `!important` attribute selectors would break the media queries silently.

## Fonts

- **Alegreya** (body) and **Alegreya Sans SC** (nav, small-caps labels) come from
  `@fontsource`, self-hosted, with the Cyrillic subsets the Belarusian text needs.
- **Skaryna Title** (`public/fonts/skaryna-title.woff2`) sets Belarusian headings.
  It is a 29 KB subset of the original TTF from the design project, limited to
  Latin, Cyrillic and common punctuation. It is a historical Belarusian titling
  face with unicase letterforms — deliberate in Cyrillic, broken-looking in
  Latin — so `html[lang="en"]` falls back to Alegreya's own capitals for headings.

## Before deploying

Set `site` in `astro.config.mjs` to the real domain. Canonical URLs and the
`hreflang` alternates are built from it.

`npm run build` emits a plain static `dist/` — deployable to Netlify, Vercel,
Cloudflare Pages or GitHub Pages with no adapter.
