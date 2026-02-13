---
title: "Building Learning Content for Humans and Agents"
date: 2026-02-13T00:00:00-05:00
description: "How L&D teams can move from locked course packages to open knowledge assets that work for both people and AI assistants."
summary: "A working model for designing learning content that supports both human understanding and agent retrieval."
tags: ["learning-design", "ai-agents", "knowledge-management", "markdown"]
categories: ["Learning Architecture"]
draft: false
---

I came back to Andrej Karpathy's YC talk with a learning-design lens, and one question stayed with me:

Are we building learning content for the way work used to happen, or for the way work is starting to happen now?

## Goal

In this post, I want to map a practical shift for L&D teams:

Move from course packages as final outputs to open knowledge assets that can support both humans and agents.

## Working assumption

My assumption is that we are entering a partial-autonomy model. Humans do judgment-heavy work. Agents help with retrieval, summarization, and workflow support.

In this case, learning content has two audiences:

1. Humans who need context, clarity, and practice.
2. Agents that need accessible structure.

Many current learning stacks still optimize mostly for audience #1.

## Current architecture gap

Tools like Storyline, Camtasia, or Vyond can produce strong visual learning experiences. The issue is not design quality. The issue is content architecture.

In many implementations, output is:

1. A complex web app (heavy DOM + JavaScript state).
2. Tool-specific, proprietary runtime logic.
3. Wrapped inside SCORM for LMS tracking.

This works for launch-and-track, but it is weak for retrieval across systems.

If someone asks an assistant, "What are our five critical safety steps?", the system should answer quickly and correctly. In many SCORM-heavy setups, that is hard.

## Model I am testing

My working model is course experience on top of open knowledge assets.

Markdown is useful here because it is:

1. Easy for humans to read and edit.
2. Easy for machines to parse.
3. Portable across multiple outputs.

{{< mermaid >}}
flowchart LR
  A[Subject Matter Expertise] --> B[Open Structured Knowledge]
  B --> C[Human Learning Experiences]
  B --> D[Agent Retrieval and Guidance]
  C --> E[Improved Performance]
  D --> E
{{< /mermaid >}}

## Directional comparison

These values are directional, but this is the pattern I keep seeing in practice.

<!-- prettier-ignore-start -->
{{< chart >}}
type: 'bar',
data: {
  labels: ['SCORM Package', 'Video-Only Module', 'PDF Handbook', 'Markdown Knowledge Base'],
  datasets: [
    {
      label: 'Human Learning UX',
      data: [8, 7, 6, 8],
      backgroundColor: 'rgba(59, 130, 246, 0.55)'
    },
    {
      label: 'AI Accessibility',
      data: [2, 1, 4, 9],
      backgroundColor: 'rgba(16, 185, 129, 0.55)'
    }
  ]
},
options: {
  responsive: true,
  scales: {
    y: {
      beginAtZero: true,
      max: 10
    }
  }
}
{{< /chart >}}
<!-- prettier-ignore-end -->

## Practical pilot (90 days)

I do not think teams need a full rebuild to start. A narrow pilot is enough.

1. Pick one high-value learning journey (for example onboarding or safety).
2. Extract core procedures into structured Markdown docs.
3. Keep existing course modules, but connect them to the open source content.
4. Add retrieval so assistants can answer from those same docs.
5. Track time-to-answer and on-the-job support usage.

This creates a low-risk bridge from legacy delivery to future-ready learning infrastructure.

## How I am building capability through this

This is also how I am developing my own capabilities:

1. Markdown-first knowledge design for reusable content operations.
2. Information architecture for retrieval quality.
3. Pair-programming with AI agents to prototype faster.
4. Stronger judgment loops: generate with AI, decide with human responsibility.

In short: architect openly, automate selectively, and keep accountability human.

## Next step

For my next iteration, I want to run this model on one concrete workflow end-to-end, then compare outcomes against a traditional course-only flow.

The core idea remains: the bigger opportunity is not only AI features in tools. It is the knowledge architecture underneath those tools.

---

Related talks:

- Andrej Karpathy at Y Combinator: [Software Is Changing (Again)](https://youtu.be/LCEmiRjPEtQ?si=2UfttzDJj3vDRbQY)
- Department of Product commentary: [Andrej Karpathy's latest talk](https://youtu.be/p3BG2tPkG3s?si=aoasFIhqHaeVipjr)
