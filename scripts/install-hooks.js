#!/usr/bin/env node
/**
 * Installs git hooks to prevent accidentally committing sensitive pen name files.
 * Run automatically via npm postinstall, or manually: node scripts/install-hooks.js
 */

const fs = require('fs');
const path = require('path');

const hooksDir = path.join(__dirname, '..', '.git', 'hooks');
if (!fs.existsSync(hooksDir)) {
    console.log('[hooks] No .git/hooks directory found — skipping hook install.');
    process.exit(0);
}

// The pre-commit hook reads profiles.example.js at commit time to learn which
// pen name slugs are "safe" (demo data that's meant to be public). Any staged
// files that look like pen-name-specific paths but don't match those slugs get
// blocked — so authors never accidentally push their real identities.
const hookContent = `#!/bin/sh
#
# Pre-commit hook: Prevent accidentally committing real pen name data.
# Installed by scripts/install-hooks.js — do not edit manually.
#

# --- Block profiles.js (always) ---
if git diff --cached --name-only | grep -q "^src/_data/profiles\\\\.js$"; then
    echo ""
    echo "BLOCKED: src/_data/profiles.js contains your real pen names."
    echo ""
    echo "Only profiles.example.js should be committed."
    echo "To unstage:  git reset HEAD src/_data/profiles.js"
    echo ""
    exit 1
fi

# --- Block non-example pen name files ---
# Extract slugs from profiles.example.js (the pen names that ARE safe to commit)
EXAMPLE_FILE="src/_data/profiles.example.js"
if [ ! -f "$EXAMPLE_FILE" ]; then
    echo "WARNING: $EXAMPLE_FILE not found — cannot verify pen name safety."
    exit 0
fi

# Pull slugs from outputFolder lines like: outputFolder: "_site_rodthunderen", // comment
SAFE_SLUGS=$(grep 'outputFolder:' "$EXAMPLE_FILE" | sed 's|.*_site_||; s|["/,].*||; s|[[:space:]]||g')

# Pen-name-specific path patterns to check
STAGED=$(git diff --cached --name-only)
BLOCKED=""

for FILE in $STAGED; do
    SLUG=""
    case "$FILE" in
        src/_data/*_books.json)    SLUG=$(echo "$FILE" | sed 's|src/_data/||; s|_books\\.json||') ;;
        src/blogs/*/*)             SLUG=$(echo "$FILE" | sed 's|src/blogs/||; s|/.*||') ;;
        src/css/authors/*.css)     SLUG=$(echo "$FILE" | sed 's|src/css/authors/||; s|\\.css||') ;;
        src/images/*/*)            SLUG=$(echo "$FILE" | sed 's|src/images/||; s|/.*||') ;;
    esac

    if [ -n "$SLUG" ]; then
        SAFE=false
        for S in $SAFE_SLUGS; do
            if [ "$SLUG" = "$S" ]; then
                SAFE=true
                break
            fi
        done
        if [ "$SAFE" = "false" ]; then
            BLOCKED="$BLOCKED\\n  $FILE"
        fi
    fi
done

if [ -n "$BLOCKED" ]; then
    echo ""
    echo "BLOCKED: These files belong to a pen name not in profiles.example.js:"
    echo -e "$BLOCKED"
    echo ""
    echo "If this pen name is meant to be a PUBLIC example, add it to profiles.example.js."
    echo "Otherwise, add these files to .gitignore to keep your identity private."
    echo ""
    echo "To unstage all blocked files:"
    echo "  git reset HEAD <file>"
    echo ""
    exit 1
fi
`;

const hookPath = path.join(hooksDir, 'pre-commit');

// Always overwrite our managed hook (identified by the marker comment)
if (fs.existsSync(hookPath)) {
    const existing = fs.readFileSync(hookPath, 'utf8');
    if (existing.includes('Installed by scripts/install-hooks.js')) {
        fs.writeFileSync(hookPath, hookContent, { mode: 0o755 });
        console.log('[hooks] Updated pre-commit hook.');
        process.exit(0);
    }
    // Has a custom hook — append ours
    fs.appendFileSync(hookPath, '\n' + hookContent);
    console.log('[hooks] Appended pen name protection to existing pre-commit hook.');
} else {
    fs.writeFileSync(hookPath, hookContent, { mode: 0o755 });
    console.log('[hooks] Installed pre-commit hook to protect pen name privacy.');
}
