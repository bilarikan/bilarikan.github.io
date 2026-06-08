---
title: "Code-as-Video for Learning Content"
date: 2026-06-01T00:00:00-05:00
description: "An ongoing experiment in treating video production like a dev workflow --- composition as code, reproducible renders, and a coding agent in the loop --- evaluated through a learning-content lens."
summary: "If a video composition is code, it can be versioned, parameterised, brand-gated, and re-rendered on demand. This project tests how far an agentic, code-as-video workflow can take learning and product video, and where it should still stop and hand back to a person."
tags: ["code-as-video", "editframe", "video-production", "ai-agents", "learning-and-development", "instructional-design", "experiments", "workflow"]
draft: false
---

This is a running experiment in treating video production like a software workflow : the composition is code, the output is reproducible, and a coding agent helps move through the rough edges.

The guiding question is simple : if a learning or product video is built from code rather than dragged together in a timeline editor, what changes --- for the output, for the cost, and for the people who used to own each step ?

## Goal

The practical objective is to find out where a code-as-video workflow credibly replaces traditional video authoring for learning content, and where it does not.

I am not trying to automate video end-to-end. I am trying to find the line : which production steps move cleanly into a coding agent's hands, and which editorial calls should stay with a person.

## Working assumption

My assumption is that for repeatable, brand-safe, data-driven learning content, two properties matter more than raw visual polish :

1. **Determinism** : the same composition with the same data renders the same output, frame for frame.
2. **Agent-friendliness** : the composition language is something a coding agent already speaks well, so the iteration loop stays inside engineering judgement instead of opaque regeneration.

If those two hold, then most of the cost of a new video shifts from production to editorial --- script, scene timing, choreography --- and a v1.1 patch becomes a parameter change rather than a re-open-from-cold edit session.

## Model I am testing

I am running this as a small stack the agent and I can both see and control, not a black box :

1. **Control layer** : me, the coding agent, and the framework's agent skills.
2. **Source layer** : the inspectable project pieces --- HTML, CSS, local assets, generated speech, subtitle text.
3. **Runtime layer** : the local tools that turn source into a preview and a final MP4.

Every change lands in exactly one of those layers. That is the part that started to feel like a software workflow rather than video editing.

{{< mermaid >}}
flowchart TD
  A[Control layer<br/>me + coding agent + agent skills] -->|edits| B[Source layer<br/>HTML, CSS, assets, narration, subtitles]
  B -->|preview + render| C[Runtime layer<br/>dev server + CLI + headless render]
  C -->|MP4| D[Output<br/>reproducible video]
  D -->|review notes| A
{{< /mermaid >}}

## Where it stands

The project has run through three passes so far, each written up as a full post.

> **Status**
> - [x] Experiment 01 --- hello-world clip scaffolded, iterated, and rendered locally
> - [x] Experiment 02 --- a 71-second product walkthrough rebuilt entirely from a real open-source codebase
> - [x] Landscape map --- the wider field placed on a deterministic-to-generative spectrum, with an L&D-fit lens
> - [ ] Next pilot --- run the same brief through HyperFrames and compare the agent loop side by side

### 1. Hello world --- video production as a dev workflow

The first pass answered the smallest version of the question : can I scaffold an Editframe project, iterate with a coding agent, preview locally, and render a short MP4 from the command line ? The clip was trivial on purpose. The point was the loop --- a small change in, a close-to-previous output back --- and capturing every failure point as a guardrail for later.

Full write-up : [Hello world with Editframe --- video production as a dev workflow](/posts/video-production-to-dev-workflow-editframe-test-drive/)

### 2. A real product walkthrough --- source-driven generation

The second pass pointed the agent at [Akaunting's](https://akaunting.com/) open-source codebase and asked for a how-to on creating an invoice, with every product UI scene rebuilt from source rather than screen-recorded. The final video came in at 71 seconds. The interesting result was not the runtime --- it was what the workflow did to the traditional split of work across Learning Program Owner, Learning Designer, and Learning Developer. Most of that flow collapsed into one feedback loop, and the Developer's chair changed shape the most.

Full write-up : [Code-as-video with Editframe --- video production as a dev workflow](/posts/code-as-video-with-editframe/)

### 3. Mapping the landscape --- deterministic to generative

The third pass stepped back from the single tool and mapped the wider field --- Manim, Motion Canvas, Remotion, Revideo, JSON-API services, Editframe, HyperFrames, and the generative tier (Sora, Veo, Kling) --- through two lenses : deterministic vs generative, and what each tier actually contributes to a learning-content pipeline. The short version : code-as-video is not an Editframe-only story, and the deterministic tier is wider than I had credited.

Full write-up : [Mapping the code-as-video landscape --- deterministic to generative, with a learning-content lens](/posts/code-as-video-landscape-for-learning-content/)

## What the approach buys

Pulling the three passes together, the benefits that actually showed up :

1. **Reproducibility** : the video lives in a repo with `package.json`, a preview server, and a CLI render. Re-render any time, get the same result.
2. **Patchability** : a v1.1 change is a parameter edit and a re-render, not a project re-open from cold.
3. **Brand safety by construction** : reusable, approved components carry across scenes, so brand parity is an automatic property rather than a review gate.
4. **Localization at render cost** : twelve locales of the same release video are twelve renders, not twelve edit sessions.
5. **Auditability** : the repo carries lineage from learning outcome to script to scene to rendered frame --- which matters for compliance and regulated training.
6. **Leverage per decision** : the editorial calls concentrate, and each one drives more output than it used to.

## Risk and limitation

A few constraints to keep this honest :

1. **It does not fit everything.** Most release walkthroughs, in-product tours, and enablement modules belong on the automated side. Key launches, customer stories, and exec messages stay manual.
2. **Upfront design cost is real.** You have to find the right primitives before you can parameterise anything. That is engineering effort paid before the first video ships.
3. **The editorial spine stays human.** Flow choice, script, per-scene timing, and highlight choreography are taste decisions that respond to a person watching the preview. Automating them smooths out exactly the lines that make a video useful.
4. **Render cost scales with volume.** The bill is a small base plus a render tail. That is attractive at scale, not at hello-world scale, and needs a budget and chargeback model before a cloud tier goes on.
5. **The map will move.** The HTML-and-CSS tier did not exist as a category two years ago. The lenses should outlast the specific tools.

## Next step

The next pilot is HyperFrames --- the open-source sibling in the same HTML-and-CSS tier. I want to put the same brief I gave Editframe in experiment 02 through HyperFrames' local CLI and the same agent loop, and see where the two diverge in practice : does the loop feel different when the composition language is plain HTML rather than React inside a component model, and is an optional avatar layer worth pulling into a customer-enablement walkthrough or does it push the artefact toward a presenter style that does not match the brief ?

For a real L&D team, the recommendation that comes out of this work is not "read the map". It is to run a small, scoped side-by-side pilot on a real piece of learning content, with two tools from different tiers, and look at output quality, agent-loop quality, and operating cost together.
