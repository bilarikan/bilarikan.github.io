---
title: "Building Learning Content for Humans and Agents"
date: 2026-02-13T00:00:00-05:00
description: "How L&D teams can move from locked course packages to open knowledge assets that work for both people and AI assistants."
summary: "A practical model for future-ready learning content: human-first experiences built on machine-readable knowledge."
tags: ["learning-design", "ai-agents", "knowledge-management", "markdown"]
categories: ["Learning Architecture"]
draft: false
---

I recently revisited Andrej Karpathy's YC talk, especially his point about building for agents and future infrastructure. It pushed me to reframe a core Learning & Development (L&D) question:

Are we building learning content for the way work used to happen, or for the way work is starting to happen now?

## The Shift We Need to Design For

We are moving into a model of partial autonomy: people do the judgment-heavy work, while AI assistants help with navigation, retrieval, summarization, and execution support.

In that world, learning content has two audiences:

1. People who need clarity and context.
2. AI agents that need structure and access.

Most current e-learning stacks still optimize only for audience #1.

## Why Traditional Course Packages Break in an Agent Workflow

Tools like Storyline, Camtasia, or Vyond can produce strong visual learning experiences. The issue is not design quality. The issue is content architecture.

Published output is usually:

1. A complex web app (heavy DOM + JavaScript state).
2. Tool-specific, proprietary runtime logic.
3. Wrapped inside SCORM for LMS tracking.

That architecture is good for launch-and-track workflows, but poor for machine retrieval.

If someone asks an assistant, "Summarize our five critical safety steps," the answer should be immediate. In many SCORM-based systems, it is not.

## From Course-First to Knowledge-First

The core move is simple:

Design learning experiences on top of open, structured knowledge assets, not the other way around.

Markdown is one practical format because it is:

1. Easy for humans to read and edit.
2. Easy for AI systems to parse.
3. Portable across web, PDF, docs, and APIs.

{{< mermaid >}}
flowchart LR
  A[Expert Knowledge] --> B[Markdown Knowledge Base]
  B --> C[Human Learning Experience]
  B --> D[AI Assistant Retrieval]
  C --> E[Practice and Performance]
  D --> E
{{< /mermaid >}}

## Quick Comparison of Content Formats

The values below are directional, but the pattern is consistent across most organizations.

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

## A Practical 90-Day Start

You do not need to rebuild everything.

1. Pick one high-value learning journey (for example onboarding or safety).
2. Extract core procedures into structured Markdown docs.
3. Keep existing SCORM modules, but link them to the open knowledge source.
4. Add a retrieval layer so assistants can answer from those docs.
5. Measure time-to-answer and performance support usage.

This gives you a low-risk bridge from legacy course delivery to future-ready learning infrastructure.

## Final Thought

The real opportunity is not "AI features in authoring tools." It is designing a knowledge foundation that both people and assistants can use.

When knowledge is open, structured, and reusable, learning teams stop producing one-time courses and start building long-term capability infrastructure.

---

Related talks:

- Andrej Karpathy at Y Combinator: [Software Is Changing (Again)](https://youtu.be/LCEmiRjPEtQ?si=2UfttzDJj3vDRbQY)
- Department of Product commentary: [Andrej Karpathy's latest talk](https://youtu.be/p3BG2tPkG3s?si=aoasFIhqHaeVipjr)
