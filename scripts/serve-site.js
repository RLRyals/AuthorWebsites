#!/usr/bin/env node

/**
 * Serve a pen name's site with live reload.
 *
 * Usage:
 *   node scripts/serve-site.js "Jane Doe"
 *   npm start -- "Jane Doe"
 *
 * If no pen name is provided, the first profile in profiles.js is used.
 */

const { execSync } = require('child_process');
const path = require('path');

const penName = process.argv.slice(2).join(' ') || null;
const env = { ...process.env };

if (penName) {
    env.ELEVENTY_PEN_NAME = penName;
}

execSync('npx @11ty/eleventy --serve', {
    env,
    stdio: 'inherit',
    cwd: path.join(__dirname, '..')
});
