# Multi-Site Author Website System

A static site generator for fiction authors managing multiple pen names. Built with [Eleventy (11ty)](https://www.11ty.dev/), this system creates separate websites for each author identity from a single codebase.

## Features

- **Multiple Pen Names** - Each pen name gets its own website, blog, book catalog, and styling
- **Blog Management** - Write and publish blog posts per pen name
- **Book Catalogs** - Showcase books with covers, descriptions, and buy links
- **Newsletter Signup** - Collect reader emails with Web3Forms integration
- **Decap CMS** - Browser-based editor for blog posts and books (local development)
- **Claude Code Commands** - Manage profiles, build, and validate with slash commands
- **Static Output** - Fast, secure sites with no server required

## Quick Start

### Prerequisites

- [Node.js](https://nodejs.org/) 18 or higher
- npm (comes with Node.js)

### Install

```bash
git clone https://github.com/RLRyals/AuthorWebsitess.git
cd AuthorWebsitess
npm install
```

### Development

Start the dev server to preview the currently active pen name's site:

```bash
npm start
```

Visit http://localhost:8080/ to see the site.

### Switching the Active Pen Name

Without arguments, `npm start` and `npm run build` use the first profile in `src/_data/profiles.js`. To work on a specific pen name's site, pass the name as an argument:

```bash
npm start -- "Jane Doe"
npm run build -- "Jane Doe"
```

Available pen names are listed in the `profiles` object in `src/_data/profiles.js`. Use `/list-profiles` in Claude Code to see all configured pen names and their status.

### Using Decap CMS (Blog Posts & Books)

Decap CMS provides a browser-based editor for writing blog posts and managing book catalogs.

1. Open a terminal and start the CMS backend:
   ```bash
   npm run admin
   ```

2. Open a second terminal and start the dev server:
   ```bash
   npm start
   ```

3. Visit http://localhost:8080/admin/ to open the CMS editor

**Note:** The CMS local backend runs an unauthenticated server. Use only for local development.

### Using Claude Code Commands

If you have [Claude Code](https://claude.com/claude-code) installed, these slash commands provide an easy workflow:

| Command | Description |
|---------|-------------|
| `/add-penname [Name]` | Create a new pen name with all required files |
| `/list-profiles` | Show all pen names and their status |
| `/validate-config` | Check all configuration files for errors |
| `/build-dev` | Build the currently active pen name's site |
| `/build-all` | Build all pen name sites with progress tracking |

## npm Scripts

| Command | Description |
|---------|-------------|
| `npm start` | Start dev server (first pen name, or `-- "Name"`) |
| `npm run build` | Build a pen name's site (`-- "Name"` optional) |
| `npm run build:all` | Build all pen name sites |
| `npm run admin` | Start Decap CMS local backend |
| `npm run deploy:netlify` | Deploy sites to Netlify |
| `npm run deploy:all:netlify` | Build and deploy all sites to Netlify |
| `npm run deploy:s3` | Deploy sites to AWS S3 |
| `npm run deploy:all` | Build and deploy all sites to S3 |

## How It Works

### Architecture

Each pen name has isolated:
- **Output folder** (`_site_penname/`) - the generated static site
- **Blog posts** (`src/blogs/penname/`) - markdown files
- **Book catalog** (`src/_data/penname_books.json`) - JSON data
- **Stylesheet** (`src/css/penname.css`) - custom look and feel

The active pen name is controlled by the `ELEVENTY_PEN_NAME` environment variable. When not set, the first profile in `src/_data/profiles.js` is used. The `npm run build:all` script iterates through all profiles, setting this variable for each build.

### Directory Structure

```
AuthorWebsites/
├── src/
│   ├── _data/               # Data files
│   │   ├── profiles.js      # Pen name configurations
│   │   └── *_books.json     # Book catalogs per author
│   ├── _includes/layouts/   # Nunjucks page templates
│   ├── blogs/               # Blog posts by pen name
│   │   └── rodthunderen/
│   ├── css/                 # Stylesheets per pen name
│   ├── images/              # Media files
│   └── admin/               # Decap CMS interface
├── scripts/
│   ├── build-all-sites.js   # Multi-site build automation
│   ├── deploy-to-netlify.js # Netlify deployment
│   └── deploy-to-s3.js      # S3 deployment
├── .claude/
│   └── commands/            # Claude Code slash commands
├── _site_*/                 # Generated sites (gitignored)
└── .eleventy.js             # Eleventy configuration
```

## Content Management

### Managing Pen Names

Use the `/add-penname` Claude Code command, or manually edit `src/_data/profiles.js`. Each profile requires:

- `penName`, `pageTitle`, `website`, `email`, `bio`, `genre`
- `outputFolder` - build destination (e.g., `_site_myname`)
- `styles` - CSS filename (e.g., `myname.css`)
- `blogFolder` - blog directory (e.g., `blogs/myname`)
- `bookList` - books JSON file (e.g., `myname_books.json`)
- `social` - twitter, facebook, instagram handles

### Writing Blog Posts

**Via Decap CMS:** Open http://localhost:8080/admin/, select a pen name's blog collection, and click "New Blog Post."

**Via files:** Create `.md` files in `src/blogs/penname/`:

```markdown
---
layout: layouts/post.njk
author: "Pen Name"
title: "My Post Title"
description: "Brief description"
date: 2024-08-24
tags: post
---

Post content here...
```

### Managing Books

**Via Decap CMS:** Open http://localhost:8080/admin/ and select a pen name's Books collection.

**Via files:** Edit `src/_data/penname_books.json`:

```json
{
  "books": [
    {
      "name": "Book Title",
      "series": "Series Name",
      "image": "/images/penname/books/cover.png",
      "link": "https://amazon.com/...",
      "description": "Book description",
      "isbn": "978-1234567890"
    }
  ]
}
```

## Deployment

See the [Deployment Guide](DEPLOYMENT_GUIDE.md) for detailed instructions.

### Netlify (Recommended)

Free, simple, and includes HTTPS and custom domains.

**Drag & Drop:**
1. Build sites: `npm run build:all`
2. Go to https://app.netlify.com/drop
3. Drag your `_site_penname` folder
4. Done!

**CLI:**
```bash
npm install -g netlify-cli
netlify login
npm run deploy:all:netlify
```

### AWS S3 (Advanced)

```bash
aws configure
cp deploy-config.json.example deploy-config.json
# Edit deploy-config.json with your bucket names
npm run deploy:all
```

## Customization

### Styling

Each pen name has its own CSS file at `src/css/penname.css`. Edit colors, fonts, and layout independently per author.

### Templates

Edit Nunjucks templates in `src/_includes/layouts/`:
- `base.njk` - HTML wrapper with navigation
- `home.njk` - Homepage layout
- `post.njk` - Blog post layout

## Tech Stack

- [Eleventy 3.0](https://www.11ty.dev/) - Static site generator
- [Decap CMS 3.0](https://decapcms.org/) - Content management (blog posts & books)
- [Nunjucks](https://mozilla.github.io/nunjucks/) - Template engine
- [Luxon](https://moment.github.io/luxon/) - Date formatting
- [@11ty/eleventy-img](https://www.11ty.dev/docs/plugins/image/) - Image optimization

## License

[Your License Here]
