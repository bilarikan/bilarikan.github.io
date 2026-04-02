---
title: "Translation vs. Localisation Is the Wrong Frame"
date: 2026-04-02
draft: false
description: "The debate around what counts as translation or localisation misses the point. Here's another way to think about it: layers of context — and why that maps cleanly onto a multi-agent architecture."
categories: ["AI Experiments", "Learning Architecture"]
tags: ["Localisation", "Translation", "Ai-Agents", "Copilot-Studio", "Learning-Design", "Instructional-Design", "Multi-Agent"]
---

I've been working on an agent team approch to translation and localisation of training content, and I got some pointed feedback, as well as debates on definitions: where exactly does translation end and localisation begin?

The short version : 
* there's no way an agent could properly localise content and understand legislative differences between countries
* a critique of my understanding of what "translation" vs. "localisation" actually means

My honest reaction is that the binary — translation over here, localisation over there — is less useful than people think it is. And that thinking in **layers of context** is a more productive frame, both intellectually and architecturally.

---

## The Traditional Thoughts

The distinction you'll find amount Learning design and development teams goes roughly like this:

**Translation** is converting text from one language to another while preserving meaning. **Localisation** is the broader work of adapting content for a specific locale: dates, currencies, idioms, formality register, cultural references, regional examples.

This is a meaningful distinction. It's also constantly blurred.

A human translator doing good work is already doing some localisation. A localisation specialist leaning on machine translation is doing some translation. The tools in the industry — CAT tools, translation memories, glossaries — blur the line further. And the moment you introduce an LLM, the line mostly disappears: a model doesn't have a separate "translate" mode and "localise" mode, it reasons about the whole problem at once.

So when someone says *"your agent can't do localisation, it only does translation"* — I'd push back on the premise. The question isn't whether a system sits on the right side of an arbitrary line. It's **which types of contextual knowledge does it have access to, and how reliable is each one?**

That's a much more useful question. And it maps onto an architecture.

---

## A Different Frame: Layers of Context

Rather than a binary, I find it more useful to think about **layers of contextual knowledge**, each of which carries different meaning, has different sources, and has different implications for an AI system.

| Layer | What It Governs | Examples |
|---|---|---|
| **Linguistic** | Grammar, syntax, vocabulary, idiomatic fluency | Natural phrasing in the target language |
| **Terminological** | Product-specific and domain-specific vocabulary | Approved UI labels, accounting terms, branded names |
| **Cultural** | Tone, formality register, examples, metaphors | Which "football" you mean; formal vs. informal address |
| **Regulatory / Legislative** | Jurisdiction-specific compliance content | VAT rules in France, GST in Canada, GDPR references |
| **Organisational** | Client or partner-specific style, branding | A specific company's internal terminology or voice guide |

The first three layers : linguistic, terminological, cultural — are where most of the volume is – and is also easier, think 80% of the volume but 20% of the effort. For training content, product documentation, and learning materials, the vast majority of what needs to happen is in those three buckets.

The fourth layer : regulatory and legislative — is where the feedback was pointing. And that feedback is fair, as far as it goes: **a child agent whose instructions are written by a non-lawyer is not going to catch every nuance in French labour code or South African consumer protection law.** That's true.

But here's the thing : neither would a human translator without specialised legal training. The professional practice in localisation is to **flag** regulatory content for subject matter expert review, not to expect the translator to resolve it. The agent should do the same.

The fifth layer : organisational context — is the most variable and the most interesting. It covers areas of business size, industry, etc. It's what a glossary upload feature or a RAG-backed knowledge source addresses.

---

## What the Critics Got Right (and Wrong)

The critique that legislative differences are beyond what an agent can reliably handle is **a scope observation**.

What it isn't is an architectural flaw.

The critics are conflating two separate problems:

1. *The agent doesn't have legislative knowledge baked in* — **true, and fixable**
2. *Therefore the architecture is wrong* — **I... I don't even know why I'm trying anymore**

If regulatory content is in scope, the path forward is enriching the knowledge available to the relevant child agents: RAG over jurisdiction-specific compliance documents, explicit flagging of regulatory references in the output, a post-translation review agent that scores against a compliance checklist. These are knowledge and routing problems, not reasons to abandon the orchestration pattern.

And if regulatory content is genuinely out of scope for automated processing — which is a defensible position — the right response is a confidence and escalation design. The agent surfaces those segments, notes why they need human review, and routes them appropriately. The orchestrator is well-placed to handle this.

---

## How the Layers Map to the Architecture

This is where the framing becomes practically useful rather than just conceptually tidy.

{{< mermaid >}}
flowchart TD
    U([User Input]) --> O["🧠 Orchestrator<br/>(routes by language + country + product)"]
    
    O --> L1["Layer 1–2<br/>Linguistic + Terminological<br/>Child agent system instructions<br/>+ product glossary"]
    O --> L2["Layer 3<br/>Cultural<br/>Child agent locale rules<br/>(register, formatting, metaphors)"]
    O --> L3["Layer 4<br/>Regulatory<br/>RAG: compliance docs<br/>OR flag for SME review"]
    O --> L4["Layer 5<br/>Organisational<br/>User-uploaded glossary<br/>OR partner knowledge source"]
    
    L1 --> OUT["📄 Translated Output"]
    L2 --> OUT
    L3 --> OUT
    L4 --> OUT
{{< /mermaid >}}

Each layer becomes either a **knowledge source injected into the relevant child agent**, a **routing rule in the orchestrator**, or an **escalation trigger** when confidence is low or the content requires domain expertise the system doesn't have.

The child agents I built currently handle layers 1, 2, and 3 directly — linguistic fluency, product terminology, and cultural rules are encoded in their instructions. Layer 4 (regulatory) is partially addressed through locale-specific instruction content (date formats, currency conventions, common legislation references), with the understanding that complex legal content should be flagged. Layer 5 is the next meaningful capability addition: a glossary upload that all child agents reference, keeping terminology consistent across runs.

This is, incidentally, also why a monolithic agent trying to do all five layers at once would be a mess. The context windows get bloated, the instructions conflict, and the model makes inconsistent decisions. Decomposing by layer — and by locale — keeps each agent's reasoning space clean and focused.

---

## Decomposition as a Design Approach

The layers model only becomes useful if you actually act on it — and the action it calls for is **decomposition**: breaking a complex problem into smaller parts, each of which can be handled by a component that knows exactly what it needs to know.

The general pattern looks like this:

{{< mermaid >}}
flowchart TD
    P["Complex Problem"] --> D["Decompose by<br/>type of knowledge required"]
    D --> C1["Component A<br/>(knows X)"]
    D --> C2["Component B<br/>(knows Y)"]
    D --> C3["Component C<br/>(knows Z)"]
    C1 --> E{"Can it<br/>reliably handle this?"}
    C2 --> E
    C3 --> E
    E -- Yes --> OUT["Handle it"]
    E -- No --> ESC["Flag it / escalate<br/>to a specialist"]
{{< /mermaid >}}

Each component is given a clearly scoped responsibility and the knowledge it needs to fulfil that responsibility. When a component reaches the edge of what it reliably knows, it doesn't guess — it hands off.

This is not a novel idea. It's how good software is designed, how specialist teams are structured, and how professional services workflows operate. What changes with multi-agent AI is that the components are now agents, the knowledge sources are instructions and RAG, and the escalation paths are routing rules in an orchestrator.

The translation problem maps cleanly onto this pattern because the layers of context are already a decomposition — each layer is a distinct type of knowledge with a distinct source. The architecture follows directly from that.

---

## The Takeaway for Anyone Building Similar Systems

If you're designing agentic systems for content translation or localisation — whether in Copilot Studio, a custom-built multi-agent framework, or anything in between — I'd suggest leading with the layers-of-context model rather than the translation/localisation binary.

It gives you a cleaner design story:

- **Which layers are in scope?** (Decide upfront, not after receiving feedback)
- **What knowledge sources address each layer?** (Instructions, RAG, uploaded glossaries, external APIs)
- **What's the escalation design for layers you can't reliably address?** (Flagging, human review queues, confidence scoring)
- **How does the orchestrator route based on this?** (By locale, by content type, by confidence threshold)

The translation/localisation binary mostly generates arguments about definitions. The layers model generates architecture decisions. One of those is more useful when you're actually trying to build something.

---

*This is a follow-up to [Building a Localisation Agent in Microsoft Copilot Studio](/posts/building-a-localisation-agent-in-copilot-studio/), which covers the build in detail. The architectural questions in this post came directly from feedback on that one.*