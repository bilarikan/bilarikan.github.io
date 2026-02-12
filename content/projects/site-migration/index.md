---
title: "bil.arikan.ca Migration"
date: 2026-02-11T00:00:00-05:00
description: "How bil.arikan.ca moved from Astro to Hugo with Congo, including GitHub Pages deployment updates."
tags: ["hugo", "astro", "migration", "github-pages", "congo"]
draft: false
---

This project documents the migration of `bil.arikan.ca` from an Astro-based site to a Hugo-based site using the Congo theme.

## Why migrate

The Astro site was working, but I wanted a setup that is simpler to maintain for long-form writing, easier to run as a content-first workflow, and included support for [Mermaid.js](https://mermaid-js.github.io/) or [Chart.js](https://www.chartjs.org/docs/latest/general/).

Migration goals:

- Keep GitHub Pages deployment automatic on push to `main`
- Preserve custom domain support for `bil.arikan.ca`
- Reduce framework overhead for everyday publishing
- Keep the theme maintainable through an upstream submodule

## Migration process

### 1. Archive the Astro baseline

Before removing anything, I captured the historical state:

- Reviewed commit history for reference
- Tagged the final Astro version (`astro-final`)

This created a clean rollback point and preserved implementation history.

### 2. Remove Astro-specific files

I removed Astro/runtime artifacts and project structure that no longer applied (`src`, `dist`, Node package files, Astro config, etc.).

### 3. Keep repository essentials

I preserved key repository infrastructure:

- `.github/workflows/`
- `.gitignore`
- `.vscode/`
- `README.md`
- custom-domain handling (moved to `static/CNAME` for Hugo)

### 4. Initialize Hugo and structure content

I initialized Hugo in-place and created content collections for:

- `content/posts`
- `content/projects`

I then added initial pages/posts to confirm templates, list pages, and homepage rendering were all functional.

### 5. Add Congo as a Git submodule

Congo is tracked as a submodule under `themes/congo` on the `stable` branch. This keeps theme updates explicit and version-controlled in the parent repo.

### 6. Move configuration to site-level files

Instead of editing theme defaults, site settings live in `config/_default/`:

- `hugo.toml` for site URL, outputs, and core settings
- `params.toml` for theme behavior
- `languages.en.toml` for title/author/links
- `menus.en.toml` for navigation

This makes upgrades easier because theme files remain mostly untouched.

### 7. Update GitHub Pages automation for Hugo

The previous workflow was Astro-oriented (artifact from `dist`) and did not build Hugo output.

Deployment was updated to:

- checkout submodules
- install Hugo (extended)
- run `hugo --gc --minify`
- upload `public/` as the Pages artifact
- deploy via GitHub Pages Actions

Workflow path: `.github/workflows/static.yml`

## Custom domain continuity

To keep `bil.arikan.ca` working with Hugo, the domain file is stored at:

- `static/CNAME`

Hugo copies this into the build output root, so GitHub Pages serves the custom domain correctly.

## Outcome

The site now runs on Hugo + Congo with a simpler content authoring flow and push-to-deploy GitHub Pages automation.

What improved most:

- Faster local iteration for content updates
- Cleaner long-term structure for configuration and content
- More predictable deployment pipeline for a static personal site
