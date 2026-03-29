---
description: Scaffold a new pen name with all required files
---

Create a new pen name identity with all required files and configuration.

**Usage**: /add-penname [Pen Name]

## Important: Do NOT explore the codebase first

All the context you need is in this file. Skip reading templates or exploring the project. The only prep step is running `node scripts/list-themes.js` to get the current theme list — then go straight to asking the user questions and creating files.

## Naming Convention

Strip spaces and lowercase the pen name to create the **slug** (NOT kebab-case with hyphens):
- "Sarah Williams" → `sarahwilliams`
- "Max Sterling" → `maxsterling`
- "Lily Hart" → `lilyhart`

This slug is used everywhere: folder names, file names, CSS paths, output directories.

## Step 1: Ask the user (use AskUserQuestion)

Ask these in two rounds at most:

**Round 1** (4 questions max):
- Pen name (free text)
- Genre(s) — multi-select: Romance, Fantasy, Thriller/Suspense, Sci-Fi (allow "Other")
- Site layout — single-select from available layouts in `src/_includes/layouts/partials/` (list `.njk` files). Default options: "Top Navigation" (`topnav`) or "Sidebar" (`sidebar`). Suggest `/create-theme` for custom layouts.
- Theme — single-select from available themes below (allow "Other" for new theme, or suggest `/create-theme` for full layout + theme from a visual reference)

**Round 2** (3 questions max):
- Website URL — suggest `[slug].com` and `[slug]books.com`
- Email — suggest `contact@[slug].com` and `hello@[slug].com`
- Content — "Generate placeholder bio/tagline/series?" or "I'll provide details"
  - If they choose to provide details, ask for: bio, series name/tagline, social handles

## Available Themes

**Before asking the user about themes**, run `node scripts/list-themes.js` to get the current list of themes, their genres, and which pen names use them. Present these as the theme options in Round 1.

If the user wants a new theme, create `src/themes/[new-theme-name]/theme.css`. Use an existing theme as a structural reference — the theme CSS defines `:root` variables and structural overrides. Key variables to define:

```
--color-bg, --color-text, --color-text-muted, --color-heading,
--color-accent, --color-highlight, --color-nav, --color-border,
--color-accent-glow, --font-body, --font-heading, --line-height,
--content-width, --nav-align, --nav-transform, --book-border,
--book-radius, --book-shadow, --book-hover-shadow, --button-radius
```

For sidebar themes, also define: `--sidebar-width, --sidebar-bg`

## Step 2: Create files (all in parallel where possible)

### File 1: Profile entry in `src/_data/profiles.js`

**Note:** `profiles.js` is gitignored (real pen names stay private). If it doesn't exist yet, copy from `profiles.example.js` first. The build does this automatically, but for `/add-penname` you should check and copy if needed before adding the new profile.

Add a new key to the `profiles` object. Exact format:

```javascript
"Pen Name": {
    penName: "Pen Name",
    realName: "Not Shared",
    website: "https://[url]",
    pageTitle: "Pen Name",
    email: "[email]",
    newsletter: {
        embedCode: "",
        url: ""
    },
    bio: `[bio text]`,
    genre: "[genre(s)]",
    social: {
        // Any of: twitter, facebook, instagram, tiktok, bluesky, threads
        // Use handle format: "@handle" for short-form, full URL for links
    },
    homepage: {
        heading: "[series or brand heading]",
        tagline: "[short tagline]",
        description: "[1-2 sentence hook]",
        seriesName: "[series name]",
        seriesBlurb: "[2-3 sentence series description]",
        ctaText: "Read Book One",
        ctaPrimaryLink: "",              // URL for primary CTA — e.g., Amazon link, newsletter, series page (falls back to first book's link if empty)
        ctaSecondary: "[secondary CTA label]",
        ctaSecondaryLink: "[link]"
    },
    outputFolder: "_site_[slug]",
    theme: "[theme-name]",           // folder name in src/themes/
    styles: "authors/[slug].css",    // relative to src/css/
    background: "/images/[slug]-bg.jpg",
    siteLayout: "topnav",            // matches partial in src/_includes/layouts/partials/ ("topnav", "sidebar", or custom)
    blogFolder: "blogs/[slug]",
    bookList: "[slug]_books.json"
}
```

If layout is "sidebar", also add: `sidebarImage: "/images/[slug]/sidebar-bg.svg"`

### File 2: Books data — `src/_data/[slug]_books.json`

```json
{
  "books": []
}
```

### File 3: Author CSS — `src/css/authors/[slug].css`

Create author-specific CSS overrides. Structure:
- `:root` extended palette variables (accent colors for the theme)
- Topnav layout fix (if topnav): `.layout-topnav .main-content { margin-left: 0; }` and `.layout-topnav .main-content::before { left: 0; }`
- Hero background effects (diagonal lines or subtle patterns)
- Book cover glow animations (conic-gradient aura with `@keyframes`)
- Section divider gradients
- Heading text gradients (h1 with `-webkit-background-clip: text`)
- Nav accent colors
- Blog list hover effects (top-edge glow reveal)
- Button styles (`.btn`, `.btn-primary`, `.btn-outline`)
- Book image CTA overrides
- Scrollbar and selection colors
- Main content ambient radial gradients
- Mobile responsive adjustments

Match the color palette to the chosen theme. Use the theme's accent colors throughout.

### File 4: Blog index — `src/blogs/[slug]/index.njk`

```njk
---
layout: layouts/base.njk
pageTitle: " - Blog"
eleventyNavigation:
  key: Blog
  order: 2
permalink: "blog/"
---
# Blog Posts

{% for post in collections.blog %}
<article>
    <h2><a href="{{ post.url }}">{{ post.data.title }}</a></h2>
    <time datetime="{{ post.date | dateIso }}">{{ post.date | dateReadable }}</time>
</article>
{% endfor %}
```

### File 5: New theme (only if user requested a new theme) — `src/themes/[theme-name]/theme.css`

## Step 3: Regenerate CMS config & validate

```bash
node scripts/generate-cms-config.js
npm run build -- "[Pen Name]"
```

Both must succeed. If the build fails, diagnose and fix.

## Step 4: Report

Show a summary table of created files and provide these next steps:
- Preview: `npm start -- "[Pen Name]"`
- Add books: edit `src/_data/[slug]_books.json`
- Add covers: place in `src/images/[slug]/books/`
- Write blog posts: add `.md` files to `src/blogs/[slug]/`
- Customize theme: tweak CSS files

## Duplicate check

Before creating anything, check if `src/_data/profiles.js` exists. If not, copy `src/_data/profiles.example.js` to `src/_data/profiles.js`. Then check if the pen name already exists in profiles.js. If it does, warn the user and ask for confirmation before overwriting.
