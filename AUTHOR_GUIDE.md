# Author Website Management Guide

Welcome! This guide will help you manage your author websites without needing to know how to code. Everything is done through a user-friendly web interface.

## 📚 Table of Contents

1. [Quick Start](#quick-start)
2. [Using the Admin Interface](#using-the-admin-interface)
3. [Managing Your Pen Names](#managing-your-pen-names)
4. [Writing Blog Posts](#writing-blog-posts)
5. [Managing Your Books](#managing-your-books)
6. [Building Your Websites](#building-your-websites)
7. [Publishing to the Web](#publishing-to-the-web)
8. [Troubleshooting](#troubleshooting)
9. [Customizing Your Website Theme](#customizing-your-website-theme)

---

## Quick Start

### First Time Setup

1. **Install Node.js** (if not already installed)
   - Download from https://nodejs.org/
   - Choose the LTS (Long Term Support) version
   - Follow the installer instructions

2. **Open Terminal/Command Prompt**
   - **Windows**: Press `Win + R`, type `cmd`, press Enter
   - **Mac**: Press `Cmd + Space`, type `Terminal`, press Enter

3. **Navigate to your project folder**
   ```bash
   cd path/to/AuthorWebsites
   ```

4. **Install dependencies** (one-time only)
   ```bash
   npm install
   ```

### Starting the Admin Interface

The admin interface requires **two terminals** running at the same time — one for the site preview and one for the CMS backend.

**Terminal 1** — Start the site preview:
```bash
npm start
```

**Terminal 2** — Start the admin backend (open a second terminal window):
```bash
npm run admin
```

Then open your web browser and go to:
- **Admin Interface**: http://localhost:8080/admin/
- **Preview Your Site**: http://localhost:8080/

> **Tip**: Both terminals must stay open while you work. If you close either one, the admin interface or site preview will stop working.

---

## Using the Admin Interface

### Accessing the Admin

1. Run `npm start` in your terminal
2. Open http://localhost:8080/admin/ in your browser
3. You'll see the Decap CMS dashboard

### Understanding the Sidebar

The sidebar shows different content types you can manage:

- **[Pen Name] - Blog Posts** - Blog posts for each pen name
- **[Pen Name] - Books** - Book catalogs for each pen name
- **Site Pages** - Main pages like Newsletter

> **Note**: Pen name profiles are not managed through the admin interface. See [Managing Your Pen Names](#managing-your-pen-names) for how to add or edit profiles.

---

## Managing Your Pen Names

Pen name profiles are stored in `src/_data/profiles.js` and are **not editable through the admin interface**. Use one of the methods below to add or edit pen names.

### Adding a New Pen Name

The easiest way to add a new pen name is with the Claude Code command:

```
/add-penname
```

This will ask you for the pen name details and automatically:
- Add the profile to `src/_data/profiles.js`
- Create the CSS file, blog folder, and books data file
- Regenerate the admin CMS config (blog and book collections are created automatically)
- Run a test build to verify everything works

### Editing an Existing Pen Name

To edit a pen name's profile (bio, email, social media, etc.), open `src/_data/profiles.js` in your text editor and update the relevant fields.

### Setting the Active Pen Name

The active pen name determines which site builds when you run `npm start`. To change it, edit the `currentProfile` value at the top of `src/_data/profiles.js`, then restart `npm start`.

---

## Writing Blog Posts

### Creating a New Blog Post

1. Click your pen name's blog collection (e.g., **"Rod Thunderen - Blog Posts"**)
2. Click **"New Blog Post"** button
3. Fill in the post details:
   - **Title**: Your blog post title
   - **Description**: A brief summary (for SEO and social media)
   - **Publish Date**: When the post should be published
   - **Body**: Write your post using Markdown (see formatting tips below)

4. Click **"Save"** to save as a draft
5. Click **"Publish"** → **"Publish now"** when ready to make it live

### Formatting Your Posts with Markdown

Markdown is a simple way to format text. Here are the basics:

```markdown
# Large Heading
## Medium Heading
### Small Heading

**Bold text**
*Italic text*

[Link text](https://example.com)

![Image description](/images/photo.jpg)

- Bullet point
- Another bullet point

1. Numbered list
2. Second item
```

### Editing an Existing Post

1. Click your pen name's blog collection
2. Click on the post you want to edit
3. Make your changes
4. Click **"Save"**

### Deleting a Post

1. Click your pen name's blog collection
2. Click on the post you want to delete
3. Click **"Delete entry"** at the top
4. Confirm the deletion

---

## Managing Your Books

### Adding a New Book

1. Click your pen name's book collection (e.g., **"Rod Thunderen - Books"**)
2. Click on the file to open it
3. Click **"Add Books"** button
4. Fill in the book details:
   - **Book Title**: The title of your book
   - **Series Name**: If it's part of a series
   - **Cover Image**: Upload your book cover (click to upload)
   - **Buy Link**: Link to where readers can buy (Amazon, BookShop.org, etc.)
   - **Description**: Book description (optional)
   - **ISBN**: Your book's ISBN (optional)

5. Click **"Save"**

### Editing Book Information

1. Click your pen name's book collection
2. Find the book in the list
3. Make your changes
4. Click **"Save"**

### Reordering Books

Books appear on your website in the order they're listed. To reorder:

1. Click the **⋮⋮** (drag handle) on the left of each book
2. Drag the book up or down
3. Click **"Save"**

### Uploading Book Covers

1. When editing a book, click on the **"Cover Image"** field
2. Click **"Choose an image"**
3. You can either:
   - **Upload**: Choose a file from your computer
   - **Choose existing**: Select an image you've already uploaded

4. Click **"Choose selected"**

---

## Building Your Websites

### Building One Site (Current Pen Name)

To build just the currently active pen name's site:

```bash
npm start
```

This builds the site and lets you preview it at http://localhost:8080/

Press `Ctrl+C` to stop the preview.

### Building All Sites at Once

To build websites for ALL your pen names:

```bash
npm run build:all
```

This creates a separate website folder for each pen name:
- `_site_rodthunderen/`
- `_site_janedoe/`
- `_site_johnsmith/`

Each folder contains a complete, ready-to-publish website.

---

## Publishing to the Web

**📖 For complete deployment instructions, see the [Deployment Guide](DEPLOYMENT_GUIDE.md)**

### Quick Start: Netlify (Recommended - Easiest!)

Netlify is **completely free** and perfect for authors. No technical knowledge required!

#### The Simplest Way (Drag & Drop):

1. **Build your sites**
   ```bash
   npm run build:all
   ```

2. **Deploy with drag-and-drop**
   - Go to: https://app.netlify.com/drop
   - Sign up for a free account (no credit card needed!)
   - Drag your `_site_rodthunderen` folder onto the page
   - Wait a few seconds - **your site is live!**
   - Get your URL like: `rodthunderen.netlify.app`

3. **Repeat for each pen name**
   - Drag `_site_janedoe` to create Jane's site
   - Drag `_site_johnsmith` to create John's site
   - Each pen name = separate website

**That's it!** No command line needed beyond the initial build.

#### The One-Command Way (CLI):

If you'll be updating regularly, use the CLI for super-fast deployments:

1. **One-time setup** (3 minutes):
   ```bash
   npm install -g netlify-cli
   netlify login
   ```

2. **Deploy all sites**:
   ```bash
   npm run deploy:all:netlify
   ```

3. **Deploy one site**:
   ```bash
   npm run deploy:netlify "Rod Thunderen"
   ```

**Why Netlify?**
- ✅ Free forever (unlimited sites!)
- ✅ Automatic HTTPS/SSL
- ✅ Custom domains included
- ✅ 30-second deployments
- ✅ No credit card required
- ✅ Perfect for authors

### Adding Custom Domains

Once your site is on Netlify:

1. Go to https://app.netlify.com/
2. Click on your site
3. Click "Domain management" → "Add custom domain"
4. Enter `rodthunderen.com`
5. Follow the simple DNS instructions

### Alternative: AWS S3 (Advanced Users)

If you're comfortable with AWS or need advanced features:

```bash
# Configure AWS CLI (one time)
aws configure

# Deploy to S3
npm run deploy:all
```

See [Deployment Guide](DEPLOYMENT_GUIDE.md) for detailed S3 instructions.

---

## Troubleshooting

### "npm: command not found"

**Problem**: Node.js is not installed or not in your PATH

**Solution**: Install Node.js from https://nodejs.org/

### Admin interface shows blank page

**Problem**: The site hasn't been built yet

**Solution**: Run `npm start` and wait for the build to complete

### "Cannot find module" errors

**Problem**: Dependencies aren't installed

**Solution**: Run `npm install` in your project folder

### Blog posts not showing up

**Problem**: Wrong pen name is set as active, or posts aren't in the right folder

**Solution**:
1. Check that "Current Active Pen Name" matches your pen name exactly
2. Verify your blog posts are in the correct collection
3. Restart `npm start`

### Images not uploading

**Problem**: Image is too large or wrong format

**Solution**:
- Resize images to under 2MB
- Use JPG or PNG format
- Optimize images before uploading (use TinyPNG.com)

### Deployment fails with "Access Denied"

**Problem**: AWS credentials are incorrect or don't have S3 permissions

**Solution**:
1. Verify your AWS credentials with `aws configure`
2. Check that your AWS user has S3 write permissions
3. Verify the bucket name in `deploy-config.json` is correct

### Changes not appearing on live site

**Problem**: CloudFront cache hasn't been cleared

**Solution**:
1. Add your CloudFront distribution ID to `deploy-config.json`
2. Redeploy with `npm run deploy`
3. Or manually invalidate cache in AWS CloudFront console

### Build fails with "activeProfile is undefined"

**Problem**: Pen name doesn't exist or is misspelled

**Solution**:
1. Check the "Current Active Pen Name" field in Pen Names
2. Make sure it matches a pen name exactly (case-sensitive)
3. Save changes and rebuild

---

## Customizing Your Website Theme

Each pen name's website uses a **theme system** with three layers:

1. **Theme** — The overall look and feel (colors, fonts, spacing)
2. **Base styles** — Shared layout rules used by all themes
3. **Author overrides** — Your personal tweaks on top of the theme

### Available Themes

| Theme | Best For | Look & Feel |
|-------|----------|-------------|
| `dark-gothic` | Urban Fantasy, Paranormal, Dark Romance | Cyan & red on dark blue, serif headings |
| `clean-modern` | Contemporary Fiction, Romance, Literary | Purple & pink, rounded edges, elegant |
| `sci-fi-tech` | Science Fiction, Cyberpunk, Dystopian | Cyan & orange on black, monospace font |

### Changing Your Theme

Edit `src/_data/profiles.js` and change the `theme` property for your pen name:

```js
"Rod Thunderen": {
    // ... other settings ...
    theme: "dark-gothic",  // Change this to any available theme
}
```

After changing, rebuild your site:

```bash
npm start          # Preview one site
npm run build:all  # Build all sites
```

> **Note:** Theme changes are not available in the Decap CMS admin interface — edit the `profiles.js` file directly. This is intentional since theme changes are infrequent.

### Customizing Your Author Overrides

Each pen name has a small CSS override file in `src/css/authors/`. This is where you add personal tweaks on top of your chosen theme.

**File locations:**
- `src/css/authors/rodthunderen.css`
- `src/css/authors/janedoe.css`
- `src/css/authors/johnsmith.css`

**Example — changing your background image:**

```css
:root {
    --bg-image: url('/images/my-custom-background.jpg');
}
```

**Example — overriding a theme color:**

```css
:root {
    --bg-image: url('/images/my-background.jpg');
    --color-accent: #gold;       /* Change link/accent color */
    --color-highlight: #crimson;  /* Change hover/active color */
}
```

### Available CSS Variables

You can override any of these in your author CSS file:

| Variable | What It Controls | Example |
|----------|-----------------|---------|
| `--bg-image` | Background image | `url('/images/bg.jpg')` |
| `--color-bg` | Page background color | `#0a1a24` |
| `--color-text` | Main text color | `#e8e8e8` |
| `--color-accent` | Links, borders, accents | `#00ffff` |
| `--color-highlight` | Hover states, active items | `#ff6347` |
| `--color-heading` | Heading text color | `#00ffff` |
| `--font-body` | Body text font | `'Georgia', serif` |
| `--font-heading` | Heading font | `'Arial', sans-serif` |
| `--book-radius` | Book cover corner rounding | `8px` |
| `--button-radius` | Button corner rounding | `20px` |

### Creating a New Theme

To add a completely new theme:

1. Create a folder: `src/themes/your-theme-name/`
2. Create `src/themes/your-theme-name/theme.css` with `:root` variable definitions
3. Copy an existing theme file as a starting point
4. Set `theme: "your-theme-name"` in your profile

**Example minimal theme file:**

```css
/* src/themes/cozy-romance/theme.css */
:root {
    --color-bg: #fdf6f0;
    --color-text: #3d2c2c;
    --color-accent: #c77dba;
    --color-highlight: #e8457a;
    --font-body: 'Georgia', serif;
    --font-heading: 'Palatino', serif;
    --book-radius: 12px;
    --button-radius: 24px;
}
```

### How Themes Work (Technical Details)

At build time, three CSS files are concatenated into a single `/css/theme.css`:

```
src/themes/{theme-name}/theme.css    ← Color/font variables
src/themes/_base.css                 ← Structural layout rules (uses variables)
src/css/authors/{pen-name}.css       ← Your personal overrides (wins in cascade)
```

This means:
- Only **one CSS file** is loaded per page (good for performance)
- Your author overrides always take priority over the theme
- Themes and base styles are shared across all pen names

### File Structure

```
src/
├── themes/
│   ├── _base.css                  ← Shared layout rules (don't edit unless advanced)
│   ├── dark-gothic/
│   │   └── theme.css              ← Dark gothic color scheme
│   ├── clean-modern/
│   │   └── theme.css              ← Clean modern color scheme
│   └── sci-fi-tech/
│       └── theme.css              ← Sci-fi tech color scheme
├── css/
│   └── authors/
│       ├── rodthunderen.css         ← Vin's overrides
│       ├── janedoe.css            ← Jane's overrides
│       └── johnsmith.css          ← John's overrides
```

---

## Tips for Success

### Content Best Practices

- **Blog Posts**: Aim for 500-1500 words for best SEO
- **Book Descriptions**: Keep them concise and compelling (150-300 words)
- **Images**: Optimize before uploading (use TinyPNG or similar tools)
- **Links**: Always test your buy links before deploying

### Workflow Recommendations

1. **Draft First**: Save blog posts as drafts and review before publishing
2. **Preview Locally**: Always run `npm start` to preview changes before deploying
3. **Test Links**: Click all links in your preview to make sure they work
4. **Backup Regularly**: Commit your changes to Git frequently

### Git Workflow (Optional but Recommended)

To track your changes with Git:

```bash
# Check what files changed
git status

# Add all changes
git add .

# Save your changes with a message
git commit -m "Added new blog post about writing process"

# Push to GitHub
git push
```

---

## Getting Help

### Common Commands Reference

| Task | Command |
|------|---------|
| Start site preview (Terminal 1) | `npm start` |
| Start admin backend (Terminal 2) | `npm run admin` |
| Build all sites | `npm run build:all` |
| Deploy one site | `npm run deploy "Pen Name"` |
| Deploy all sites | `npm run deploy:all` |
| Install dependencies | `npm install` |

### Additional Resources

- **Markdown Guide**: https://www.markdownguide.org/basic-syntax/
- **Decap CMS Docs**: https://decapcms.org/docs/
- **AWS S3 Static Hosting**: https://docs.aws.amazon.com/AmazonS3/latest/userguide/WebsiteHosting.html
- **Node.js Help**: https://nodejs.org/en/docs/

### Support

If you encounter issues not covered in this guide:
1. Check the error message carefully
2. Search for the error online
3. Review the Troubleshooting section above
4. Check the GitHub repository issues

---

## Appendix: File Structure

Understanding where your content lives:

```
AuthorWebsites/
├── src/
│   ├── _data/
│   │   ├── profiles.js              # Your pen names & theme assignments
│   │   ├── rodthunderen_books.json  # Books data
│   │   └── ...
│   ├── themes/                      # Theme system
│   │   ├── _base.css                # Shared structural styles
│   │   ├── dark-gothic/theme.css    # Dark gothic theme
│   │   ├── clean-modern/theme.css   # Clean modern theme
│   │   └── sci-fi-tech/theme.css    # Sci-fi tech theme
│   ├── css/authors/                 # Per-author CSS overrides
│   ├── blogs/
│   │   ├── rodthunderen/            # Vin's blog posts
│   │   ├── janedoe/                 # Jane's blog posts
│   │   └── johnsmith/               # John's blog posts
│   ├── images/                      # All images
│   └── admin/                       # Admin interface
├── _site_rodthunderen/              # Built Vin site
├── _site_janedoe/                   # Built Jane site
├── _site_johnsmith/                 # Built John site
├── scripts/
│   ├── build-all-sites.js           # Build script
│   └── deploy-to-s3.js              # Deployment script
└── package.json                     # Project configuration
```

**Don't edit files in `_site_*` folders** - they're automatically generated and will be overwritten on the next build!

---

Happy writing! 📚✨
