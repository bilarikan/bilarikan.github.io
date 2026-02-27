---
title: "In-App Live Assistant"
date: 2026-02-13T00:00:00-05:00
description: "An open-source kit for building a real-time in-app assistant that listens to voice, sees the screen, and guides users step-by-step."
tags: ["open-source", "ai-agents", "multimodal", "streaming", "voice", "screen-sharing", "xapi", "learning-measurement"]
draft: false
---

This is a project I am actively pursuing: an open-source “in-app live assistant” pattern that other product teams can embed.

The core idea is simple: if the assistant can listen and *see the current UI*, it can give concrete next-step guidance instead of generic chatbot answers.

## Goal

Build a reusable baseline that can be integrated into a web product to provide:

1. **Live help:** microphone + screen context in one session.
2. **Fast responses:** low-latency, voice-first guidance.
3. **Step-by-step flow:** one instruction, wait for action, next instruction.
4. **Measurement hooks:** optional xAPI statements so “learning-in-the-product” can be observed, not just assumed.

## Working assumption

My assumption is that most “help” content fails inside products because it is separated from the moment of need and staying in the flow.

In this case, I am treating help as a live interaction loop:

- the user tries a step
- the assistant sees what happened
- the assistant adjusts and guides the next step
- the assistant and operator stay in the flow with natural language

If I can make that loop reliable, the rest (knowledge integration, evaluation, productization) becomes a sequence of iterations.

## Current approach (high level)

I am building this as a small set of composable parts, not a monolith:

1. **A lightweight web client** that can capture mic audio + screen context and stream it during a session.
2. **A streaming runtime** that manages sessions and forwards live inputs to a multimodal model, then streams responses back.
3. **An instruction + guardrail layer** tuned for support: brief, concrete, no professional advice, and willing to say “I don’t know”.
4. **A grounding interface** (initially generic) that can later be swapped for product documentation and internal procedures.
5. **An xAPI emitter** (optional) to record progress signals to a Learning Record Store (LRS).

{{< mermaid >}}
flowchart TB
  U[User in product UI] -->|Mic + screen| C[Embedded client]
  C -->|Live session| R[Streaming runtime]
  R -->|Realtime inputs| M[Multimodal model]
  M -->|Audio + text events| R
  R -->|Streamed response| C

  C -->|optional xAPI statements| L[LRS]
{{< /mermaid >}}

## xAPI angle (why include it)

I want to test a specific idea: if the assistant is guiding someone through a workflow, that guidance is a *learning experience*, and it should be measurable.

At a high level, I am looking to capture signals like:

- a user attempted a step
- a step was completed (or failed)
- the assistant intervened
- time-to-complete and number of corrections

The point is not surveillance. The point is to create feedback loops:

- Did guidance reduce errors?
- Did completion rates improve?
- Which steps cause repeat confusion?
- Are users becoming more independent over time?

## Status

> **Status**
> - [x] Working end-to-end prototype of the live interaction loop (voice + screen → voice guidance)
> - [ ] Package the pattern as a clean open-source “starter kit”
> - [ ] Create a defined Cloud Infrastructure approach that works for the prototype and captures/logs PII info
> - [ ] Define a small xAPI vocabulary for “guided in-product learning” events
> - [ ] Add a minimal evaluation harness (latency, completion, error rate)

## Risks and constraints

- **Privacy and security:** screen + voice can contain sensitive data. Production use needs explicit consent, access control, and retention limits.
- **Grounding quality:** without a curated knowledge source, the assistant can be confidently wrong. Scope must be narrow.
- **Reliability:** streaming UX breaks in messy ways (permissions, jitter, reconnection). This needs real hardening work.

## Next step

My next step is to turn the prototype into something others can actually use:

1. define the smallest “embed surface” for a product team
2. define the cloud and AI architecture
3. add the xAPI measurement path behind a feature flag
4. publish a reference workflow and measure it end-to-end

Related: my first write-up of the experiment path that led here is in `/posts/live-streaming-in-app-assistant/`.

