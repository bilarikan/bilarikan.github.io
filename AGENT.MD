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

## Author Voice And Writing Style (bil.arikan.ca)
- Primary voice is first-person practitioner voice (`I`, `my`, `in this post I want to...`), not detached analyst voice.
- Tone should be practical, direct, and iterative: explain what is being tested, why, and what changes next.
- Prefer concrete statements over abstract language. Prioritize usefulness over polish.
- Keep claims measured and evidence-aware (for example: `directional`, `in this case`, `for now`, `next iteration`).
- Show explicit thinking flow: problem -> assumption -> approach -> implementation/pilot -> next step.
- Position AI as a collaborator for speed/prototyping, while final judgment and accountability remain human.
- Avoid inflated language, hype, motivational filler, or generic "thought leadership" phrasing.
- Frequently use walkthrough sequencing language: `now`, `before we start`, `in this case`, `from there`, `with this change`, `next step`.
- Call out constraints and risks directly (for example security, privacy, measurement limits), then state the mitigation.
- Preserve transparent iteration notes: explicitly document failures, corrections, and what changed after troubleshooting.
- Prefer scenario-driven explanation: define context, target audience, and business/learning impact before technical implementation details.

## Preferred Post Structure For This Site
- Open with a clear framing sentence and one guiding question.
- Add a `Goal` section that states the practical objective of the post.
- Add a `Working assumption` (or equivalent) to make reasoning explicit.
- Add `Current approach` / `Model I am testing` with concrete workflow steps.
- Add one practical execution section (`Practical pilot`, `90-day plan`, or `Implementation notes`).
- Close with `Next step` (what will be tested or changed in the next iteration).
- When relevant, include a short `Risk or limitation` section and a `What changed` summary.
- For experiment-style posts, mirror this sequence when appropriate:
  - `Goal`
  - `Outcome` (checkboxes allowed)
  - `Prerequisites`
  - `Scenario` / `Target audience`
  - `Implementation` / `Breakdown`
  - `Next experiment`

## Style Cues To Mirror
- Short-to-medium sentences with clear transitions.
- Use sequencing language often: `in this case`, `from there`, `now`, `with this`, `for now`.
- Prefer explicit section headers over long uninterrupted prose.
- Use numbered lists for steps, decisions, or comparisons.
- When using Mermaid/Chart, include only if it clarifies the argument; avoid placeholder/demo visuals.
- Use "quick recap" and "implementation notes" style transitions when moving from concept to execution.
- Use pragmatic markdown patterns seen in resources:
  - Blockquoted `Outcome` and `Next experiment` notes for progress snapshots.
  - Checklists for status tracking (`[x]` / `[ ]`) when documenting experiments.
  - Short "breakdown" subsections to explain actor/verb/object, risk/mitigation, or step intent.

## Voice Calibration Sources
- Always calibrate voice from `AGENT RESOURCES/` first.
- Primary writing references in that folder (first priority):
  - `AGENT RESOURCES/Introduction to experiments.md`
  - `AGENT RESOURCES/Experiment 01 ‐ Static Site Statement.md`
  - `AGENT RESOURCES/Experiment 02 ‐ Secure Credentials and Data Privacy.md`
  - `AGENT RESOURCES/Experiment 03 ‐ Measurement Strategy & KPIs.md`
- Primary speaking references in that folder (second priority for cadence and transitions):
  - `AGENT RESOURCES/Introduction-captions.vtt`
  - `AGENT RESOURCES/Data model-captions.vtt`
  - `AGENT RESOURCES/Demonstrate xapi-captions.vtt`
  - `AGENT RESOURCES/Security considerations-captions.vtt`
- If writing reference `.md` files are empty or missing, use the `.vtt` files as the active voice baseline.
- De-prioritize other local draft documents if they conflict with `AGENT RESOURCES/` sources.

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
