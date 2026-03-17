#!/usr/bin/env node
/**
 * Lists all available themes with their metadata.
 * Reads the comment header from each src/themes/[name]/theme.css.
 * Also shows which pen name (if any) currently uses each theme.
 *
 * Usage: node scripts/list-themes.js
 */

const fs = require('fs');
const path = require('path');

const themesDir = path.join(__dirname, '..', 'src', 'themes');
const profilesPath = path.join(__dirname, '..', 'src', '_data', 'profiles.js');

// Load profiles to map themes → pen names
const { profiles } = require(profilesPath);
const themeToAuthor = {};
for (const [name, profile] of Object.entries(profiles)) {
    if (profile.theme) {
        themeToAuthor[profile.theme] = name;
    }
}

// Read theme directories
const entries = fs.readdirSync(themesDir, { withFileTypes: true });
const themes = [];

for (const entry of entries) {
    if (!entry.isDirectory()) continue;

    const cssPath = path.join(themesDir, entry.name, 'theme.css');
    if (!fs.existsSync(cssPath)) continue;

    const css = fs.readFileSync(cssPath, 'utf8');

    // Extract "Theme: ..." from comment header
    const nameMatch = css.match(/Theme:\s*(.+)/i);
    const bestForMatch = css.match(/Best for:\s*(.+)/i);

    themes.push({
        folder: entry.name,
        displayName: nameMatch ? nameMatch[1].trim() : entry.name,
        bestFor: bestForMatch ? bestForMatch[1].trim() : '',
        usedBy: themeToAuthor[entry.name] || ''
    });
}

// Output as a table
console.log('\nAvailable Themes:\n');
console.log('| Theme Folder | Display Name | Best For | Used By |');
console.log('|---|---|---|---|');
for (const t of themes) {
    console.log(`| ${t.folder} | ${t.displayName} | ${t.bestFor} | ${t.usedBy || '—'} |`);
}
console.log('');
