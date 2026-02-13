# AGENT.MD

## Project Overview
- Site: `bil.arikan.ca`
- Stack: Hugo + Congo theme
- Hosting: GitHub Pages (GitHub Actions)
- Theme source: `themes/congo` as a git submodule (branch: `stable`)

## Working Rules For Future Agents
- Treat `bilarikan.github.io` as the repo root.
- Keep configuration in `config/_default/` (not in theme files).
- Avoid editing files inside `themes/congo/` unless the task is explicitly a theme update.
- Be careful when staging commits: do not include submodule pointer/theme edits unless requested.

## Deployment Expectations
- Deployment workflow: `.github/workflows/static.yml`
- Workflow should:
  - checkout with submodules
  - install Hugo (extended)
  - run `hugo --gc --minify`
  - upload `public/` to Pages
- Build output directory is `public/` (not `dist/`).

## Domain And Publishing
- Custom domain file must live at `static/CNAME`.
- `static/CNAME` should contain exactly: `bil.arikan.ca`
- Pushes to `main` trigger production deployment.

## Content Structure
- Primary sections: `content/posts/` and `content/projects/`
- `about` and `contact` pages were intentionally removed.
- Homepage copy is maintained in `content/_index.md`.
- Post format should use a page bundle: `content/posts/<slug>/index.md` (example: `content/posts/welcome-to-hugo/index.md`).

## Post Authoring Conventions
- Use front matter keys commonly used in this repo: `title`, `date`, `description`, `tags`, `categories`, `draft`.
- Keep publish-ready posts as `draft: false`.
- Prefer concise sections and short paragraphs for readability.
- If revising an old draft from outside repo content, create a new post under `content/posts/` and keep the original source draft untouched unless asked.

## Visual Shortcodes (Congo)
- Mermaid diagrams are supported via:
  - `{{< mermaid >}}`
  - `...diagram markup...`
  - `{{< /mermaid >}}`
- Chart.js is supported via:
  - `{{< chart >}}`
  - `...Chart.js config...`
  - `{{< /chart >}}`
- Reference examples:
  - `content/posts/welcome-to-hugo/index.md`
  - `themes/congo/exampleSite/content/samples/diagrams-flowcharts/index.md`
  - `themes/congo/exampleSite/content/samples/charts/index.md`

## Social Links Configuration
- Social/profile links shown as icons are managed in:
  - `config/_default/languages.en.toml`
  - section: `[params.author]` -> `links = [ ... ]`

## Useful Commands
- Local dev: `hugo server -D`
- Production build: `hugo --gc --minify`
- In sandboxed environments where cache write fails: `hugo --gc --minify --cacheDir /tmp/hugo_cache`
- Quick content validation after edits: run production build command and confirm no shortcode/front matter errors.

## Change Hygiene
- Keep changes minimal and project-scoped.
- Update docs/content when behavior changes (especially deployment/config flow).
- If deployment behavior changes, verify both workflow file and README consistency.
