---
description: Change an existing pen name's theme and/or layout
---

Update an existing pen name's theme and/or layout in `src/_data/profiles.js`.

**Usage**: /set-theme [Pen Name]

## Important: Do NOT explore the codebase first

All context you need is in this file. The only prep steps are:
1. Run `node scripts/list-themes.js` to get available themes
2. Run `ls src/_includes/layouts/partials/*.njk` to get available layouts
3. Read `src/_data/profiles.js` to get the current pen name list

## Step 1: Show current state

Read `src/_data/profiles.js` and display a table of pen names with their current `theme` and `siteLayout` values.

If a pen name was provided as an argument, pre-select it. Otherwise, ask which pen name to update.

## Step 2: Ask the user (use AskUserQuestion)

Ask in a single round:

- **Theme** — single-select from available themes (from `list-themes.js` output). Show theme name, display name, and "Best for" genres. Include option: "Keep current" (default).
- **Layout** — single-select from available layouts (`.njk` filenames without extension from `src/_includes/layouts/partials/`). Include option: "Keep current" (default). Mention `/create-theme` if they want a custom layout.

If the user picks "Keep current" for both, inform them nothing needs to change and exit.

## Step 3: Update profiles.js

Edit `src/_data/profiles.js` to update ONLY the changed fields for the selected pen name:

- `theme` — the theme folder name (e.g., `urban-noir`, `clean-modern`)
- `siteLayout` — the layout partial name (e.g., `topnav`, `sidebar`, or a custom layout name)

Do NOT modify any other fields in the profile.

## Step 4: Validate

Run these commands in sequence:
1. `node scripts/list-themes.js` — confirm the theme is correctly assigned
2. `npm run build` — verify the site builds without errors

If the build fails, diagnose and fix the issue (most likely a missing theme or layout file).

## Step 5: Report

Show the user:
- Pen name updated
- Previous theme → new theme (if changed)
- Previous layout → new layout (if changed)
- Remind them to preview with: `npm start -- "Pen Name"`
