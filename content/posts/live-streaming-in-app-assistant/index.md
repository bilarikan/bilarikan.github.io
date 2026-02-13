---
title: "Experiment: A Live In-App Assistant (Voice + Screen)"
date: 2026-02-13T00:00:00-05:00
description: "Working notes from recreating a live multimodal assistant that listens to voice and sees the screen to guide a user through an app."
summary: "I tried to recreate a Google AI Studio proof-of-concept in code. The first path failed on authentication; the second produced a working bidirectional streaming prototype; the third pushed it toward a realistic scenario."
tags: ["ai-agents", "multimodal", "streaming", "voice", "prototyping", "customer-support"]
categories: ["AI Experiments"]
draft: false
---

Can a live assistant listen to a user and see their screen, and still guide them through a task in real time?

I had a proof-of-concept working in Google AI Studio. This post is a first, high-level recap of what I tried to recreate it in code, what failed, and what finally worked.

## Goal

Build a small end-to-end prototype of an in-product assistant that can:

1. Listen to the user (microphone).
2. See the current UI context (screen share).
3. Respond quickly in voice.
4. Guide step-by-step through one workflow.

This is not about building a “smart” assistant. It is about validating the interaction pattern and getting a repeatable baseline that I can iterate on.

## Working assumption

My assumption is that most in-app help fails because it is not contextual.

In this case, “context” is not a long chat history. It is what the user is looking at right now, plus a short voice loop that stays tight:

- one instruction
- one user action
- next instruction
- using natural language

If latency is low enough and scope is narrow enough, this can feel closer to live support than to a chatbot.

## Outcome

> **Outcome**
> - [x] Recreated the core loop: mic + screen → assistant voice guidance
> - [ ] Recreated the original “cloud tutorial” build path (blocked by authentication)
> - [x] Built a working bidirectional streaming prototype using ADK streaming
> - [x] Enhanced it toward a more product-like support scenario (guardrails + grounding hooks)

## Model I am testing

At a high level, I am testing one idea:

If I stream *just enough* real-time context (voice + a lightweight view of the screen), then the assistant can stay concrete and guide the next action instead of giving generic advice.

{{< mermaid >}}
flowchart LR
  U[User] -->|Voice + screen share| C[Browser client]
  C -->|Live session| R[Streaming runtime]
  R -->|Realtime input| M[Live multimodal model]
  M -->|Audio + text events| R
  R -->|Streamed response| C
  C --> U
{{< /mermaid >}}

## Practical pilot (what I built)

I ended up progressing through three stages.

### Stage 1: recreate an existing cloud tutorial (failed)

I started by trying to recreate a “full” project path: set up a cloud account, enable the right services, and run an existing live streaming demo project.

The blocker was authentication. I could not get a stable, working configuration and I did not have a clear mental model of what was failing (API key vs. cloud auth vs. service permissions).

This was a useful failure because it clarified a constraint: if the auth is fuzzy, I will burn time on plumbing and never reach the UX questions I actually want to test.

### Stage 2: follow the ADK bidirectional streaming path (worked)

Next, I followed the ADK streaming documentation and built a minimal, local prototype end-to-end.

One key gap showed up fast: the default dev UI supported live mic (and optionally camera), but not screen share.

So I wrote a small custom browser client that:

1. Starts a live session.
2. Streams microphone audio in real time.
3. Captures periodic screen snapshots.
4. Plays the assistant’s streamed audio response.

That gave me a working “listen + see + guide” loop.

### Stage 3: make it feel like product assistance (worked)

Once the loop worked, I shifted from “tech demo” to “assistance behavior”.

I tightened the instruction set so the assistant:

- stays brief (voice-first)
- gives one step at a time
- waits for user action before continuing
- declines professional advice outside software guidance

I also added the idea of grounding. In the prototype, I used a generic external search tool as a stand-in. In a real product, this would be replaced with retrieval against internal help content and known procedures.

## What changed (the pivot that mattered)

The biggest change was not a better prompt. It was a smaller target.

I stopped trying to reproduce a cloud deployment path and focused on the smallest end-to-end loop I could run locally:

1. start a session
2. stream mic audio
3. stream screen context
4. receive streamed voice back

Once that loop existed, I could iterate on behavior, safety boundaries, and documentation.

## Risks and limitations (for now)

This kind of assistant is powerful and risky because screen + voice is sensitive.

For now, the main constraints I am holding are:

- **Privacy and security:** screen share can contain personal data. Any production version needs clear consent, access control, retention limits, and strong logging hygiene.
- **Truth and grounding:** without a controlled knowledge source, the assistant can be confidently wrong. Scope has to be narrow, and answers should be grounded.
- **Reliability:** streaming introduces UX failure modes (permissions, network jitter, latency spikes). The prototype needs hardening before it is credible in a real support flow.

## Next step

My next iteration is to make this measurable and repeatable:

1. pick one workflow and define “success” (time, errors, completion)
2. add a small, curated knowledge source to ground guidance
3. instrument latency and task completion so improvements are visible

In follow-up posts, I will document the technical build steps for each prototype, but this post is the high-level narrative and the core pivot: get the loop working first, then improve everything else.
