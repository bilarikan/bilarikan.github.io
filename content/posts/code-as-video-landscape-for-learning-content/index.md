---
title: "Mapping the code-as-video landscape --- deterministic to generative, with a learning-content lens"
date: 2026-05-08
description: "Third post in the Editframe series. After two experiments rebuilding L&D content as code, I step back and map the wider field --- Manim, Motion Canvas, Remotion, Revideo, JSON-API tools, Editframe, HyperFrames, Sora --- through two lenses : deterministic vs generative, and what each tier actually contributes to a learning content workflow."
summary: "The first two posts in this series put Editframe through its paces on a hello-world clip and a 71-second product walkthrough. This third post zooms out. The question is no longer 'does code-as-video work for L&D' --- the first two experiments answered that. It is which other frameworks belong in the picture, where they sit on a deterministic-to-generative spectrum, and what each tier can credibly contribute to a learning content development workflow."
tags:
  - code-as-video
  - editframe
  - hyperframes
  - manim
  - motion-canvas
  - remotion
  - revideo
  - learning-and-development
  - instructional-design
  - ai-agents
  - landscape
categories:
  - perspectives
draft: false
---

The first two posts in this series put a single tool --- [Editframe](https://editframe.com/) --- through its paces. The first was a [hello-world experiment](/posts/video-production-to-dev-workflow-editframe-test-drive/), the second was a [71-second product walkthrough](/posts/code-as-video-with-editframe/) rebuilt entirely from a real open-source codebase. Both confirmed that a code-as-video loop is real enough to keep testing for learning content.

In this post I want to step back from the single-tool view and ask a wider question : which other frameworks belong in this picture, where do they sit on a deterministic-to-generative spectrum, and what does each tier actually contribute to a learning content development workflow ?

## Goal

The goal here is not to pick a winner. It is to build a working map I can come back to when planning the next experiment, when scoping a real L&D pipeline at work, or when a stakeholder asks "could we just use Sora for that ?". Two tools deserve foreground treatment because they fit the code-as-video approach I have been running ; the rest deserve an honest assessment of what they can do for learning content, not a generic feature list.

## Working assumption

If the goal is repeatable, brand-safe, data-driven learning content, two properties matter more than anything else. The first is determinism : the same composition with the same data produces the same output, frame for frame. The second is agent-friendliness : the composition language is something a coding agent already speaks well, so the agent makes fewer hallucination errors and the iteration loop stays inside engineering judgement. Generative tools optimise for neither. They are not the wrong tool for every stage of an L&D pipeline --- they are the wrong tool for the part of the pipeline where structure and accuracy matter.

## Where I started --- and what changed

I want to call out that this map is not coming from a clean sheet. My first dabbles into code-driven video were [Manim](https://www.manim.community/) and [Motion Canvas](https://motioncanvas.io/) a while back. Both are excellent at what they do : Manim for mathematical and explanatory animations in the 3Blue1Brown lineage, Motion Canvas for hand-crafted, choreographed sequences in TypeScript with a real-time editor. They taught me what code-as-video could feel like.

What stopped me building anything serious with either was effort, not capability. Manim's Python and scene-graph idioms are a learning curve on top of any actual video work. Motion Canvas's generator-based scene API is elegant but specific. The agent skills I would lean on today were not in the same shape, and the surface area I had to learn to ship one short product walkthrough was non-trivial.

Editframe was the first framework where the concept clicked at a workable cost. The composition language is HTML, CSS, and React --- things a coding agent is already good at. The agent skills shipped with the framework slot directly into Cursor and Claude Code, so the agent reads the framework's expectations as part of normal context. The first two experiments in this series went from idea to rendered MP4 in hours, not weeks. That is the difference that shifted me from dabbling to building.

That context matters for everything that follows. The lens I am writing through is not "what is the best framework". It is "what makes a code-as-video approach actually viable for a learning team that is not already a video engineering shop".

## The two lenses

I want two lenses on this map, and I want to apply them in the same order each time.

1. **Deterministic vs generative.** A deterministic framework takes a composition and data and produces the same video every time. A generative framework takes a prompt or a reference and produces something plausible but not exactly repeatable. The dial sits between those two endpoints. The further you slide toward generative, the harder it gets to guarantee that a brand colour is exactly right, that a numeric value on screen matches the system of record, or that a translated locale renders the same layout as the source.
2. **L&D contribution.** What does this tier actually let a learning team do that they could not do before, or do at the same quality but faster ? "Learning team" here covers the Learning Program Owner, the Learning Designer, and the Learning Developer chairs I described in the [previous post](/posts/code-as-video-with-editframe/), plus localisation and accessibility partners.

Both lenses matter. A deterministic framework with poor L&D fit (for example raw frame primitives with no abstraction) is a bad recommendation for a learning team. A generative tool with great prompt control still cannot produce the brand-safe, parameterised, locale-fanned output that a release walkthrough needs.

## The spectrum, in one diagram

This is the simplest map I can draw of where the tools sit. Each box is a category, not a single product, because some products straddle.

{{< mermaid >}}
flowchart TD
  det[Fully deterministic<br/>code-as-composition]
  hybrid[Hybrid<br/>compositional base<br/>plus AI layer]
  gen[Fully generative<br/>prompt-to-video]

  det --> ts["Remotion / Motion Canvas / Revideo<br/>React or scene graphs<br/>self-hosted renderer"]
  det --> py["Manim / MoviePy<br/>Python<br/>self-hosted renderer"]
  det --> htmlvideo["Editframe / HyperFrames<br/>HTML and CSS<br/>cloud or local render"]
  det --> jsonapi["Creatomate / Shotstack / JSON2Video<br/>JSON schema<br/>cloud render"]
  det --> aetech["Plainly<br/>After Effects template<br/>cloud render"]

  hybrid --> hyperheygen["HyperFrames plus HeyGen avatar layer<br/>compositional base<br/>generative presenter on top"]

  gen --> sora["Sora / Veo / Kling<br/>prompt or image to video<br/>generative model"]
{{< /mermaid >}}

The diagram intentionally puts five categories in the deterministic column. This is the lane that produces brand-safe, parameterisable, repeatable video. They are different in language, licensing, and infrastructure, but they share the property that "same composition, same data, same output" is part of the contract.

## Tier by tier --- what each one is, and what it brings to L&D

I will walk the categories in the same order the diagram lists them. For each one, there will be a one-paragraph "what it is" read, and a one-paragraph honest call on what it actually contributes to learning content development. The point is not feature parity ; it is fit.

### TypeScript and React frameworks --- Remotion, Motion Canvas, Revideo

**What they are.** [Remotion](https://www.remotion.dev/) builds videos out of React components. Same mental model as a web app, except the output is an MP4. [Motion Canvas](https://motioncanvas.io/) is TypeScript with a generator-based scene graph and a real-time editor, designed for hand-crafted, choreographed animation. [Revideo](https://github.com/redotvideo/revideo) is a Motion Canvas fork with headless rendering, audio support, and a library-first API for automated pipelines. Motion Canvas and Revideo are MIT ; Remotion is permissive for small teams and shifts to a paid licence above team-size thresholds.

**L&D contribution.** Strong for teams that already have a TypeScript and React engineering culture. Remotion fits a data-driven release-walkthrough pipeline well, especially when the same composition fans out to multiple locales or feature variants. Motion Canvas is the right fit when the video is the kind of thing you would normally storyboard scene by scene with an animator --- explanatory math, conceptual diagrams, choreographed product reveals. Revideo is the bridge if you want Motion Canvas's authoring with a render API at the end of the pipeline. The cost is real engineering investment in the renderer side --- you own the build farm, you own the upgrades, you own the breaks.

### Python frameworks --- Manim, MoviePy

**What they are.** [Manim](https://www.manim.community/) is the Python library Grant Sanderson built for 3Blue1Brown, with a community fork (ManimCommunity) that is the production-stable choice. It is opinionated about mathematical and explanatory animation. [MoviePy](https://zulko.github.io/moviepy/) is much lower level --- a video manipulation library, more "pipeline glue" than authored composition. Both are MIT.

**L&D contribution.** Manim is in a category by itself for structured educational content : if the learning outcome is "explain a concept with a moving diagram", Manim's primitives are the closest thing to the right shape. The cost is the learning curve for anyone outside a Python and math audience, and the lack of agent skills tuned to the framework. MoviePy is most useful as plumbing inside a larger pipeline --- splicing clips together, adding overlays, syncing audio --- not as the thing that authors a learning video. For an L&D team standing up its first code-as-video pipeline, neither is the easiest place to start unless mathematical animation is the actual brief.

### HTML and CSS frameworks --- Editframe, HyperFrames

**What they are.** This is the tier the previous two posts in this series have been working in. [Editframe](https://editframe.com/) treats HTML and CSS (and optionally React) as the composition language, with a managed cloud render at the end. [HyperFrames](https://github.com/heygen-com/hyperframes) is the open-source sibling, Apache 2.0, originated by HeyGen, with a local CLI renderer that is non-interactive by default --- the CLI was designed to be called from an agent, not from a human shell session. Both share the underlying insight : video is a web page that moves, and an LLM trained on the open web is better at writing HTML and CSS than at writing a proprietary JSON schema or a TypeScript scene graph.

**L&D contribution.** This is where the experiments in this series landed, and the reason is practical. The agent already speaks the composition language. The skill files plug directly into Cursor or Claude Code. The iteration loop --- spot the issue, ask for a small change, agent edits a file, preview updates --- behaves the way a code review behaves, not the way a video edit cycle behaves. Editframe ships this as a managed product : someone else owns the renderer. HyperFrames ships it as code you run yourself, with the option of layering HeyGen's avatar or AI presenter on top if you ever want a talking-head presenter on a compositional slide base. For L&D pipelines that need brand-safe, data-driven, parameterised video at scale, either of these is the easiest entry point I have tested so far.

### JSON schema cloud APIs --- Creatomate, Shotstack, JSON2Video

**What they are.** [Creatomate](https://creatomate.com/), [Shotstack](https://shotstack.io/), and [JSON2Video](https://json2video.com/) all share the same architecture : you send a JSON payload describing the video, they render it in their cloud, you get a URL back. There is no React, no local renderer, no per-language SDK requirement --- any HTTP client will do. They differ in pricing and surface area : Creatomate has the most developer-complete API and a generous free tier ; Shotstack feels closer to a pipeline primitive ; JSON2Video pairs the API with a stronger no-code GUI for non-developer authoring.

**L&D contribution.** This tier is purpose-built for "template plus data, rendered at scale" --- which is exactly what a release-pipeline L&D team needs when the same walkthrough fans out to twelve locales. The trade is control : you cannot tune the renderer, the schema is the schema, and your composition lives in JSON rather than in a code repo with the rest of your engineering. For an L&D team that does not want to own a renderer at all, this tier is genuinely the right answer. It is also the first tier I would put next to Editframe in a real side-by-side pilot for L&D content.

### After Effects-backed APIs --- Plainly

**What it is.** [Plainly](https://plainlyvideos.com/) is architecturally different : the template lives in After Effects, designers build it in AE, and Plainly's API renders it in the cloud with data injection. The composition language is After Effects, the API surface is REST.

**L&D contribution.** Best when After Effects templates already exist and your design team wants to keep authoring in AE. Overkill if you do not have an AE-native pipeline. For a learning team starting from scratch, this is a heavier lift than the JSON-schema or HTML and CSS tiers ; for a learning team already coupled to an AE-driven brand or marketing team, it is the lowest-friction way to bring data-driven rendering into the existing workflow.

### Hybrid --- compositional base plus generative layer

**What it is.** HyperFrames plus HeyGen's avatar or AI presenter is the cleanest hybrid I have come across. The compositional base stays deterministic --- HTML, CSS, the same primitives a code-as-video pipeline would use --- and the generative layer (an AI-generated talking head) sits on top of it.

**L&D contribution.** This is the configuration I want to actually try. Most learning content benefits from a presenter beat at the front --- a face on screen reading the introduction, before the screen fills with the product walkthrough or the diagram. Generating that presenter from text, on top of a brand-safe deterministic base, is meaningfully different from generating the entire video from a prompt. The L&D contribution is "AI-assisted presenter on top of a compositional base", not "AI-generated video pretending to be brand-safe".

### Fully generative --- Sora, Veo, Kling

**What they are.** [OpenAI Sora](https://openai.com/sora/), Google's Veo, Kuaishou's Kling. Prompt or image to video. The API is now open for developers in some of these. Same prompt does not guarantee the same output. Character consistency across generations is improving but is not a guarantee.

**L&D contribution.** Useful for a different problem from compositional video. Concept exploration, illustrative b-roll, mood boards, "what could this look like" pitches, scene cutaways where the visual is mood rather than fact. The moment you need specific text on screen, a specific layout, a specific data field, or a guaranteed match to brand, this tier is the wrong layer. For L&D pipelines, I would treat this as a separate stage --- a way to generate exploratory clips that a human curates before they enter the deterministic pipeline --- not as a replacement for the compositional layer.

## Side-by-side --- the comparison I will keep coming back to

| Tier | Paradigm | Language | Licensing | Best L&D fit |
|---|---|---|---|---|
| TypeScript and React | Components or scene graph to MP4 | TS / React | MIT (Remotion paid at scale) | Engineering-heavy L&D teams ; data-driven release pipelines |
| Python | Programmatic animation | Python | MIT | Mathematical and explanatory content ; pipeline glue |
| HTML and CSS | Web composition to MP4 | HTML and CSS (and React) | SaaS or Apache 2.0 | Brand-safe, agent-driven L&D content at scale |
| JSON cloud API | JSON schema to cloud render | Any (REST) | SaaS | Template-and-data fan-out, no renderer to own |
| AE-backed cloud API | AE template to cloud render | Any (REST) | SaaS | Existing AE-native design teams |
| Hybrid (HTML plus avatar) | Deterministic base plus generative presenter | HTML and CSS plus AI | Apache 2.0 plus SaaS | Walkthroughs that need a presenter beat |
| Fully generative | Prompt to video | Natural language | SaaS | Concept exploration, illustrative b-roll |

The point of this table is not "pick a row". It is that each row is doing something genuinely different for the L&D function, and the wrong question is "which of these is best". The right question is "which of these belong in your pipeline, at which stage, for which kind of artefact ?".

## Where the determinism lens actually bites

A learning artefact that ends up in a customer enablement library, a regulated training module, or an in-product help surface has constraints the generative tier cannot satisfy.

1. **Brand parity by construction.** A compositional system inherits the brand kit by reference. A generative system approximates it.
2. **Locale fan-out.** Twelve locales of the same release walkthrough should be twelve renders of the same composition, not twelve generations that drift from each other.
3. **Numeric and textual fidelity.** A pricing video showing "$49 / month" must render exactly that string. Generative systems are improving at on-screen text but cannot guarantee it.
4. **Patchability.** A v1.1 patch a month later should be a parameter change on the same composition, not a re-prompt that produces a different video.
5. **Auditability.** A regulated training video needs traceability from learning outcome to script to scene to rendered frame. A code repo carries that lineage. A prompt does not.

Each of these is a hard requirement for some kinds of learning content and not others. Concept explorations and creative pitches do not need any of them. Customer enablement modules and compliance training need all of them.

## Where the L&D-fit lens bites

The other lens is more practical. Even within the deterministic tier, fit varies.

1. **Does the composition language match what your agent is best at ?** HTML and CSS are the easiest target for a code-driven agent loop today. JSON schemas are the easiest for an API-driven service surface. Python is the right choice when the team already lives there.
2. **Who owns the renderer ?** Self-hosted renderers (Remotion, Motion Canvas, HyperFrames) put infrastructure ownership on the team. Managed cloud renderers (Editframe, Creatomate, Shotstack, Plainly) trade control for simpler operations. Pick deliberately ; do not pick by default.
3. **Where does the agent skill surface live ?** A framework that ships agent skills tuned for Cursor and Claude Code (Editframe and HyperFrames both do) shortens the iteration loop materially. A framework without that surface is workable but slower.
4. **What does upgrade and maintenance cost look like ?** Anything self-hosted carries an ongoing maintenance tax. Anything cloud-managed carries a vendor risk. Both are real ; neither is automatically worse.

## Risk or limitation

Two things to call out before this map gets taken too literally.

The first is that this is a snapshot. The HTML and CSS tier did not exist as a category two years ago. The hybrid tier did not exist a year ago. The map will move. The lenses (deterministic vs generative ; L&D fit) should be more stable than the specific products in any tier.

The second is that for a real L&D team, the right next step is not "read the map" --- it is to run a small, scoped side-by-side pilot on a real piece of learning content, with two tools from different tiers, and look at output quality, agent loop quality, and operating cost together. The first two posts in this series did the equivalent of that pilot for Editframe alone. The natural next pilot is to add HyperFrames as the open-source sibling and see what the comparison surfaces.

## What changed

The first two posts answered "does code-as-video work for L&D ?". This third post is the answer to "is Editframe the only tool that fits ?". Short version : no. Editframe and HyperFrames are the two natural picks for the HTML and CSS tier, with Creatomate or Shotstack as the right pick if you want to skip running a renderer entirely. The other tiers earn their place for specific kinds of content --- Manim for mathematical explainers, Plainly for AE-coupled teams, the generative tier for concept exploration. The lens that matters most for learning content is determinism, and the deterministic tier is wider than I had given it credit for before working through this map.

## Next step

The next experiment for me is HyperFrames. I want to put the same kind of brief I gave Editframe in [the second experiment](/posts/code-as-video-with-editframe/) through HyperFrames' local CLI and the same agent loop, and see where the two frameworks actually diverge in practice. Two questions in particular :

1. Does the agent loop feel meaningfully different when the composition language is plain HTML rather than React inside Editframe's component model ?
2. Is the optional HeyGen avatar layer worth pulling in for a customer-enablement walkthrough, or does it pull the artefact toward a presenter style that does not match the brief ?

The pilot will close out this stretch of the series in the same shape as the first two : framing question, Goal, Working assumption, Current approach, Implementation notes, What I learned, Next step. If anything in HyperFrames is meaningfully easier or harder than Editframe was, that is the part worth writing up.
