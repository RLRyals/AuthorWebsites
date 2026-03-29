# AuthorWebsite — Agent Quick Reference

Multi-pen-name Eleventy static site generator for fiction authors. Single codebase, multiple independent websites.

## Architecture

- **`ELEVENTY_PEN_NAME`** env var controls which site builds (defaults to first profile)
- **`src/_data/profiles.js`** — all pen name configs (gitignored; copy from `profiles.example.js` if missing)
- **`scripts/build-all-sites.js`** — iterates profiles, sets `ELEVENTY_PEN_NAME` per build
- Each pen name builds to a separate `_site_*` folder (gitignored)

## Critical Files

| File | Purpose |
|------|---------|
| `.eleventy.js` | Build config, CSS pipeline, blog filtering |
| `src/_data/profiles.js` | Pen name configs (gitignored) |
| `src/_data/profiles.example.js` | Template for new clones |
| `src/themes/{name}/theme.css` | Theme definitions (colors, fonts, components) |
| `src/css/authors/{slug}.css` | Per-author CSS overrides |
| `src/themes/_base.css` | Shared structural CSS (referenced by all themes) |
| `src/_includes/layouts/base.njk` | Main HTML template — dynamically includes layout partials |
| `src/_includes/layout.njk` | Legacy wrapper (used by homepage) — same dynamic include |
| `src/_includes/layouts/partials/` | Layout partials: `topnav.njk`, `sidebar.njk`, custom layouts |
| `src/index.njk` | Homepage template |
| `scripts/list-themes.js` | Lists themes (parses `Theme:` and `Best for:` from CSS comments) |
| `scripts/generate-cms-config.js` | Generates Decap CMS config from profiles |

## Naming Convention

Slug = lowercase, no spaces, **no hyphens** (NOT kebab-case):
- "Sarah Williams" -> `sarahwilliams`
- "Max Sterling" -> `maxsterling`

Used for: folder names, CSS files, output dirs, book JSON filenames.

## CSS Pipeline

Concatenated at build time in `.eleventy.js` (`eleventy.before` hook):

```
src/themes/_base.css          (structural styles)
  + src/themes/{name}/theme.css  (theme variables + overrides)
  + src/css/authors/{slug}.css   (author-specific overrides)
  = _site_{slug}/css/theme.css   (single output file)
```

## Layout System

Layout set per profile via `siteLayout` field — value matches a partial filename in `src/_includes/layouts/partials/`.

**Built-in layouts:**
- `topnav` — header bar with author name (left) + horizontal nav menu (right), main content below, footer at bottom
- `sidebar` — fixed 240px left column with author name at top, vertical nav, social links + copyright at bottom; main content in right flex area

**Custom layouts** — add a new `.njk` partial to `src/_includes/layouts/partials/`. Use `/create-theme` to generate layout + theme from a visual reference.

**Nav items** — defined by `eleventyNavigation` frontmatter in `.njk` pages (Home order:0, Blog order:2, etc.)

**Homepage CTAs** — fully configurable per profile:
- `homepage.ctaPrimaryLink` — URL for primary button (falls back to first book's purchase link)
- `homepage.ctaText` — button label (e.g., "Read Book One", "Subscribe Now")
- `homepage.ctaSecondary` / `homepage.ctaSecondaryLink` — secondary button

All layouts collapse to single-column on mobile.

## Commands

| Command | Purpose |
|---------|---------|
| `npm start` | Dev server (first profile or `-- "Pen Name"`) |
| `npm run build` | Build single site |
| `npm run build:all` | Build all pen name sites |
| `node scripts/list-themes.js` | List available themes |
| `node scripts/generate-cms-config.js` | Regenerate CMS config |

## Slash Commands

| Skill | Purpose |
|-------|---------|
| `/add-penname` | Scaffold a new pen name with all files |
| `/create-theme` | Generate layout + theme from image or spec |
| `/set-theme` | Change an existing pen name's theme and/or layout |
| `/build-dev` | Build current pen name with validation |
| `/build-all` | Build all sites with progress tracking |
| `/validate-config` | Validate all configs and dependencies |
| `/list-profiles` | Show all pen names and their status |

## Code Style

- 4-space indent, single quotes, semicolons, no trailing commas
- Nunjucks templates (`.njk`), plain CSS (no preprocessor)
- ESLint configured in `eslint.config.js`

## Do Not Commit

`_site_*`, `profiles.js`, `.env`, `.env.local`, `deploy-config.json`, `netlify-config.json`, `node_modules/`
