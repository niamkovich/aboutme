# niamkovich.dev

Personal site — Astro, static output, bilingual (Belarusian default, English at `/en/`).

The design is imported from the Claude Design project
`213fa21b-1040-4f44-bcc2-5c2893846ebd` (`index.dc.html`). Its `support.js` runtime
was not carried over: the page declared no dynamic logic, so it ports to plain
static HTML.

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

## Typography

`src/styles/global.css` follows
[the-proportional-web](https://github.com/owickstrom/the-proportional-web) —
Bringhurst's _Elements of Typographic Style_ applied to the web.

**One line-height is the atom.** `--lh: 1.2rem` is the unit of vertical rhythm,
and every vertical measure in the file is an integer multiple of it, so every
line of text on every page sits on the same baseline grid. Horizontal measures
are all in `ch`. The only `px` in the file are the root font size and the
hairline rule.

**To loosen or tighten the whole document, change `--lh`. Nothing else.** The
type scale, every margin and the grid all follow from it.

Consequences worth knowing before editing:

- Nothing is sized against the viewport. The root steps `16px → 14px` at 480px
  and that is the entire responsive type story — no `clamp()`, no `vh`, no
  per-breakpoint font sizes.
- Paragraphs are separated by a `3ch` first-line indent, not a blank line
  (`p + p`). A paragraph directly after a heading is flush and gets no extra
  space, since the heading already sets it.
- Text is justified with `hyphens: auto`. English hyphenates; Belarusian does
  not, because no browser ships a Belarusian dictionary — so Belarusian
  paragraphs show wider word spacing. That is a known, accepted trade-off. To
  undo it, drop `text-align: justify` from the `:is(p, li, dd)` rule.
- Any new vertical spacing must be `calc(var(--lh) * n)`. If you need a
  fractional value, pair it with its complement so the block still advances a
  whole number of lines — `h2` does this with `0.25` padding and `0.75` margin.
- Borders that sit in the flow break the grid: a `1.5px` border snaps to `1px`
  at DPR 1, so the block ends up half a pixel short and everything below drifts.
  The rule under `h2` is drawn with an inset `box-shadow`, which takes no layout
  space at any pixel ratio. Do the same for any new horizontal rule.
- `[data-row]` uses `align-items: start`, not `baseline`. Baseline-aligning two
  different families at different sizes makes the row about a pixel taller than
  one line, and that error accumulates down the page.

The attribute hooks the layout and the Astro components share:

- `[data-body="screen"]` — vertically centred; used for the home page. At a
  fixed rem size it scrolls on a short window rather than shrinking to fit.
- `[data-body="doc"]` — top-aligned, scrolls. Used for the CV. Both modes now
  share one type scale; only the alignment differs.
- `[data-col]` — the measure, `--measure: 66ch`.
- `[data-side]` — margin notes. They float into a gutter of `--side-width` plus
  `--side-gap`, pulled right by exactly that sum, so the sidenote column no
  longer depends on how wide the measure is. Under 900px they collapse to
  left-bordered blocks inline with the text.

These styles are deliberately **global**, not component-scoped: Astro's scoping
would break the attribute-selector media queries silently.

To check the grid after a change, overlay it:

```css
[data-body] {
  background-image: repeating-linear-gradient(
    to bottom,
    rgb(220 0 0 / 0.35) 0 1px,
    transparent 1px var(--lh)
  );
}
```

Every line of text should sit in the same position between two red rules the
whole way down the page.

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
