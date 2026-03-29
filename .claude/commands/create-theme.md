---
description: Generate a layout and theme from an image or written spec
---

Create a new layout + theme from a visual reference (screenshot, image, color palette, or written description).

**Usage**: /create-theme [Theme Name]

## Important: Do NOT explore the codebase first

All the context you need is in this file. The only prep steps are:
1. Run `node scripts/list-themes.js` to get the current theme list
2. List files in `src/_includes/layouts/partials/` to see available layouts

Then go straight to asking the user questions.

## Step 1: Gather input (use AskUserQuestion)

Ask in two rounds at most.

**Round 1** (4 questions max):
- Theme name — kebab-case folder name (e.g., `cozy-warmth`, `dark-romance`, `tech-thriller`). Will be used as folder name in `src/themes/` and as `siteLayout` value if a custom layout is created.
- Visual reference — ask the user to provide ONE of:
  - A screenshot or image of a website they like (paste or provide file path)
  - A color palette (hex codes for background, text, accent, highlight)
  - A written description of the look and feel they want
- Target genre(s) — to inform font choices, mood, and the `Best for:` line in the theme header
- Layout — single-select: choose from existing layouts (list the `.njk` files found in `src/_includes/layouts/partials/`), OR "Custom" if they want a new layout structure

**Round 2** (up to 3 questions, adapt based on Round 1):
- If image was provided: read the image using the Read tool, extract dominant colors, present the proposed color palette for confirmation/adjustment
- Font pairing preference — suggest options based on genre:
  - Serif headings + sans body (romance, literary, cozy mystery)
  - All sans-serif (thriller, sci-fi, contemporary)
  - Monospace accents + sans body (cyberpunk, tech thriller)
  - Serif throughout (historical, gothic, dark fantasy)
- If "Custom" layout was selected: ask where the author name should go, how navigation should be arranged, any special sections (hero banner, featured book strip, centered layout, etc.)

## Step 2: Analyze the visual reference

**If image provided:**
- Read the image file directly — Claude can analyze it visually
- Extract: dominant background color, text color, accent/highlight colors, font style impressions, layout structure (header type, content areas, CTA styling, footer treatment)
- Map observations to CSS variables and layout decisions

**If color palette provided:**
- Parse the hex codes
- Derive muted text, border, and glow colors from the palette
- Choose complementary highlight color if not provided

**If written description provided:**
- Interpret mood/aesthetic into a color palette
- Choose fonts that match the described feel
- Determine layout structure from any layout preferences mentioned

## Step 3: Create layout partial (only if "Custom" layout)

**Skip this step** if the user chose an existing layout (topnav, sidebar, etc.).

Create: `src/_includes/layouts/partials/[theme-name].njk`

The layout partial MUST include these standard elements:
- Author name/brand as a link to `/` (use `{{ author.penName }}`)
- Navigation menu: `{{ collections.all | eleventyNavigation | eleventyNavigationToHtml(navigationOptions) | safe }}`
- Main content area with `id="skip"`: `<main id="skip" class="main-content">{{ content | safe }}</main>`
- Footer with copyright: `<p>&copy; {{ site.now }} {{ author.penName }}</p>`

Use CSS class names that your theme CSS will target. Follow the patterns in existing partials:
- `topnav.njk` uses: `.site-wrapper`, `.site-header`, `.header-brand`, `.main-content`, `footer`
- `sidebar.njk` uses: `.site-layout`, `.sidebar`, `.sidebar-brand`, `.sidebar-footer`, `.sidebar-social`, `.main-content`

For custom layouts, use a unique wrapper class (e.g., `.layout-[theme-name]`) so CSS doesn't conflict with existing layouts.

## Step 4: Create theme CSS

Create: `src/themes/[theme-name]/theme.css`

### Required header comment (parsed by `scripts/list-themes.js`):

```css
/* ==========================================================================
   Theme: [Display Name]
   Best for: [Genre1, Genre2, Genre3]
   ========================================================================== */
```

### Required `:root` CSS variables:

```css
:root {
    /* Colors */
    --color-bg: [background];
    --color-text: [main text];
    --color-text-muted: [secondary text, use rgba for transparency];
    --color-heading: [heading color];
    --color-accent: [links, nav, interactive elements];
    --color-highlight: [hover states, active elements];
    --color-nav: [nav link color];
    --color-border: [borders, dividers — use rgba];
    --color-accent-glow: [glow/shadow color — use rgba];

    /* Typography */
    --font-body: [body font stack];
    --font-heading: [heading font stack];
    --line-height: [1.6-1.8];

    /* Layout */
    --content-width: [900px-1200px];
    --nav-align: [center, flex-start, or flex-end];
    --nav-transform: [uppercase or none];

    /* Components */
    --book-border: [border for book covers];
    --book-radius: [border-radius for books, typically 6-12px];
    --book-shadow: [box-shadow for book covers];
    --book-hover-shadow: [box-shadow on hover];
    --button-radius: [border-radius for buttons];
}
```

**If sidebar layout**, also define:
```css
    --sidebar-width: [200-300px];
    --sidebar-bg: [sidebar background, often rgba];
```

### Optional structural CSS

Beyond the variables, add structural styles that match the visual reference. Examples from existing themes:

- **Background effects**: layered gradients, ambient patterns (see `urban-noir/theme.css`)
- **Header/nav enhancements**: custom styling for `.site-header`, `.nav-link`, etc.
- **Button styles**: `.btn`, `.btn-primary`, `.btn-outline` customizations
- **Hover animations**: transitions, glows, transforms
- **Custom layout styles**: if a custom layout partial was created, add all CSS for its unique classes here
- **Mobile responsive rules**: `@media (max-width: 768px)` adjustments

Use `clean-modern/theme.css` as a minimal reference (variables only, ~33 lines) or `urban-noir/theme.css` as a full-featured reference (~546 lines with structural CSS).

## Step 5: Validate

Run these commands:

```bash
node scripts/list-themes.js
```

Confirm the new theme appears in the table with correct display name and "Best for" genres.

If a pen name is available to test with, update its profile to use the new theme and layout, then build:

```bash
npm run build -- "[Pen Name]"
```

If a custom layout was created, the build will fail with a clear error if the Nunjucks partial has syntax issues.

## Step 6: Report

Show the user:
1. **Color palette** — table of CSS variable names and their values
2. **Layout** — which layout partial is used (existing or newly created)
3. **Files created** — list of new files

**Next steps to tell the user:**
- To use this theme with a new pen name: run `/add-penname` and select this theme + layout
- To use with an existing pen name: update `theme` and `siteLayout` fields in `src/_data/profiles.js`
- Author-specific CSS overrides go in `src/css/authors/[slug].css`
- Homepage CTAs are configured in `profiles.js` → `homepage.ctaPrimaryLink` and `homepage.ctaSecondaryLink`
- Preview: `npm start -- "[Pen Name]"`

## Theme naming convention

Theme folder names use **kebab-case** (unlike pen name slugs which have no hyphens):
- `cozy-warmth` (good)
- `dark-romance` (good)
- `cozywarmth` (wrong for themes)

## Duplicate check

Before creating anything, check if `src/themes/[theme-name]/` already exists. If it does, warn the user and ask for confirmation before overwriting. Similarly check if `src/_includes/layouts/partials/[theme-name].njk` exists when creating a custom layout.
