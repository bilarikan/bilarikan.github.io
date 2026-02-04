# bil.arikan.ca - Personal Website

A blazingly fast personal website built with **Hugo** and the **Congo** theme, hosted on GitHub Pages with a custom domain.

## Migration Journey: Astro → Hugo

This repository documents the transition from an Astro-based static site to a Hugo-based site with the Congo theme. This README serves as a guide for understanding the migration process and the new setup.

---

## Table of Contents

- [Project Overview](#project-overview)
- [Why Hugo and Congo?](#why-hugo-and-congo)
- [Migration Process](#migration-process)
- [Project Structure](#project-structure)
- [Installation & Setup](#installation--setup)
- [Configuration](#configuration)
- [Local Development](#local-development)
- [Deployment](#deployment)
- [Custom Domain Setup](#custom-domain-setup)
- [Important Notes](#important-notes)

---

## Project Overview

This is a personal website and blog powered by:
- **Static Site Generator**: Hugo (written in Go)
- **Theme**: Congo (modern, customizable, responsive)
- **Hosting**: GitHub Pages
- **Custom Domain**: bil.arikan.ca
- **Deployment**: GitHub Actions CI/CD

### Why Hugo and Congo?

**Hugo advantages:**
- Ultra-fast build times (milliseconds for large sites)
- Simple directory structure and intuitive file organization
- Powerful template system with built-in functions
- Excellent documentation and large community

**Congo theme advantages:**
- Modern, minimal design
- Excellent customization options
- Fast loading times
- Built-in dark mode
- Responsive and accessible
- Well-maintained by the community

---

## Migration Process

### Step 1: Archive the Existing Astro Site

Before starting the Hugo setup, I archived the existing Astro-based site:

```bash
# Document and backup the existing site structure
git log --oneline > ASTRO_MIGRATION_LOG.txt

# Tag the final Astro version
git tag -a astro-final -m "Final Astro-based site version"
git push origin astro-final
```

### Step 2: Remove Astro Files

After archiving, removed all Astro-specific files and directories:

```bash
# Remove Astro configuration and node_modules
rm -rf node_modules package.json package-lock.json
rm -rf src/ public/ dist/ draft/
rm astro.config.mjs tsconfig.json LICENSE package-lock.json package.json
```

### Step 3: Preserve Essential Files

Kept files needed for GitHub Pages and deployment:

```
✓ .github/          (workflows directory)
✓ .gitignore        (update for Hugo)
✓ .vscode/           (vscode directory)
✓ README.md         (this file - updated)
✓ CNAME             (custom domain configuration)
```

### Step 4: Initialize Hugo

With the directory cleaned, initialized the new Hugo site:

```bash
# Install Hugo (via Homebrew on macOS)
brew install hugo

# Create new Hugo site content structure
hugo new site . --force
```

---

## New Hugo Project Structure

After the migration, the final project structure looks like:

```
bilarikan.github.io/
├── .github/
│   └── workflows/
│       └── hugo.yml              # GitHub Actions deployment workflow
├── content/
│   ├── posts/                    # Blog posts
│   │   └── _index.md
│   ├── projects/                 # Project showcase
│   │   └── _index.md
│   ├── about.md                  # About page
│   └── contact.md                # Contact page
├── static/
│   ├── img/                      # Images and assets
│   └── ...
├── themes/
│   └── congo/                    # Congo theme (git submodule)
├── .github/
├── .gitignore
├── .gitmodules                   # Git submodule configuration
├── CNAME                         # Custom domain (bil.arikan.ca)
├── hugo.toml                     # Hugo configuration
├── README.md                     # This file
└── LICENSE
```

---


### Step 5: Add Congo Theme as Git Submodule

The Congo theme is added as a git submodule, allowing it to be updated independently:

```bash
# Add Congo theme
git submodule add -b stable https://github.com/jpanther/congo.git themes/congo

# Initialize and update submodules
git submodule init
git submodule update
```

### Step 3: Configure the Site

The `hugo.toml` file contains all configuration. Key settings:

```toml
baseURL = 'https://bil.arikan.ca/'
languageCode = 'en-us'
title = 'Bil Arikan'
theme = 'congo'
enableRobotsTXT = true
summaryLength = 30

[pagination]
pagerSize = 10

[outputs]
home = ["HTML", "RSS", "JSON"]

[params]
colorScheme = "auto"           # auto, light, or dark
defaultTheme = "auto"
enableSearch = true
enableCodeCopy = true

[[params.author]]
name = "Bil Arikan"
image = "img/profile.jpg"
headline = "Learner & Tinkerer"
bio = "Exploring ideas at the intersection of learning & technology"
links = [
  { github = "https://github.com/bilarikan" },
  { linkedin = "https://linkedin.com/in/bilarikan" }
]
```

---

## Configuration

### Directory Structure in Content

Organize the content logically:

```
content/
├── posts/
│   ├── _index.md                 # Posts list page
│   └── my-first-post.md
├── projects/
│   ├── _index.md                 # Projects list page
│   └── project-1.md
├── about.md                      # About page
└── contact.md                    # Contact page
```

### Front Matter for Posts

Each markdown file starts with front matter:

```markdown
---
title: "Post Title"
date: 2025-02-04
description: "Brief description for SEO and previews"
tags: ["tag1", "tag2"]
categories: ["Category"]
draft: false
---

Your content here...
```

### Custom Domain Configuration

For the custom domain `bil.arikan.ca`:

1. Create a `CNAME` file in the `static/` directory with your domain:
```
bil.arikan.ca
```

2. Configure DNS records with your domain registrar pointing to GitHub Pages

3. Enable custom domain in GitHub Pages settings (Settings → Pages → Custom domain)

---

## Local Development

### Running the Development Server

```bash
# Start Hugo server with draft posts
hugo server -D

# Visit http://localhost:1313 in your browser
```

The `-D` flag includes draft posts. Hugo automatically rebuilds when you save files, providing instant feedback.

### Building for Production

```bash
# Generate production build
hugo --minify

# This creates the public/ directory ready for deployment
```

---

## Deployment

### GitHub Actions Workflow

The site automatically builds and deploys when you push to the main branch. The workflow file is located at `.github/workflows/hugo.yml`:

**Key steps:**
1. Checkout code with submodules
2. Setup Hugo (extended version)
3. Build site with `hugo --minify`
4. Upload artifacts to GitHub Pages
5. Deploy using GitHub's deployment API

### Manual Deployment

```bash
# Commit and push changes
git add .
git commit -m "Add new post or update content"
git push origin main
```

GitHub Actions automatically triggers and deploys within seconds.

### Updating the Congo Theme

```bash
# Update theme to latest stable version
git submodule update --remote themes/congo

# Commit changes
git add .
git commit -m "Update Congo theme"
git push origin main
```

---

## Custom Domain Setup

### DNS Configuration

For `bil.arikan.ca`, you need to:

1. **Add DNS records** with your domain registrar:
   - Type: CNAME
   - Host: `www` (or appropriate subdomain)
   - Value: `bilarikan.github.io`

2. **GitHub Pages Settings:**
   - Go to repository → Settings → Pages
   - Under "Custom domain," enter: `bil.arikan.ca`
   - Enable "Enforce HTTPS"

3. **Verify CNAME File:**
   - Ensure `static/CNAME` contains your domain
   - The file will be copied to the root of the built site

---

## Important Notes

### .gitignore Configuration

```
# Hugo
/public/
/resources/_gen/
/.hugo_build.lock

# OS
.DS_Store
Thumbs.db

# Editor
.vscode/
.idea/

# Backup Files
*.bak
*.old
```

**Important:** The `public/` directory is ignored because GitHub Actions regenerates it on every deployment.

### Common Issues & Solutions

| Issue | Solution |
|-------|----------|
| Theme not loading | Run `git submodule update --init --recursive` |
| Extended Hugo required | Install: `brew install hugo --with-extended` |
| Build fails locally but works on GitHub | Check Hugo version matches (use `extended: true` in workflow) |
| Custom domain not working | Verify CNAME file exists and DNS records are configured |
| Submodule conflicts | Run `git submodule foreach git fetch` and update |

### Performance & SEO

This Hugo + Congo setup provides:
- Static HTML files (no server processing)
- Minified assets automatically
- GitHub's CDN for fast delivery
- Automatic HTTPS
- SEO-friendly URLs and structure
- RSS feed generation
- Optimized images and lazy loading

### Cost

**Total cost: $0**
- Hugo: Free & open source
- Congo theme: Free
- GitHub Pages: Free for public repos
- GitHub Actions: 2,000 minutes/month free (more than enough)
- SSL Certificate: Included with GitHub Pages

---

## Tips & Best Practices

1. **Always use Extended Hugo** - Required for SCSS/Sass support
2. **Update theme via submodules** - Keeps themes independent and updatable
3. **Test locally first** - Always run `hugo server` before pushing
4. **Use meaningful commit messages** - Makes migration history clear
5. **Organize content logically** - Use directories for different content types
6. **Enable draft mode for WIP** - Set `draft: true` in front matter while writing

---

## References

- [Hugo Official Documentation](https://gohugo.io/documentation/)
- [Congo Theme GitHub](https://github.com/jpanther/congo)
- [GitHub Pages Documentation](https://docs.github.com/en/pages)
- [Migration Guide](https://rwgb.github.io/posts/github-pages-hugo/)

---

**Site:** https://bil.arikan.ca | **Repository:** https://github.com/bilarikan/bilarikan.github.io
| `npm install`             | Installs dependencies                            |
| `npm run dev`             | Starts local dev server at `localhost:4321`      |
| `npm run build`           | Build your production site to `./dist/`          |
| `npm run preview`         | Preview your build locally, before deploying     |
| `npm run astro ...`       | Run CLI commands like `astro add`, `astro check` |
| `npm run astro -- --help` | Get help using the Astro CLI                     |

## 👀 Want to learn more?

Check out [Starlight’s docs](https://starlight.astro.build/), read [the Astro documentation](https://docs.astro.build), or jump into the [Astro Discord server](https://astro.build/chat).
