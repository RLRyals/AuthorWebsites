#!/usr/bin/env node

/**
 * Build a single pen name's site.
 *
 * Usage:
 *   node scripts/build-site.js "Jane Doe"
 *   npm run build -- "Jane Doe"
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

execSync('npx @11ty/eleventy', {
    env,
    stdio: 'inherit',
    cwd: path.join(__dirname, '..')
});
