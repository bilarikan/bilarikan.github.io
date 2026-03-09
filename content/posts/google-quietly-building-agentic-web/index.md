
---
title: "Google Is Quietly Building the Agentic Web"
date: 2026-03-06T00:00:00-05:00
description: "While OpenAI and Anthropic fought over a Pentagon contract, Google shipped WebMCP, UCP, and A2A — three protocols that together form the infrastructure stack for how AI agents will interact with the web."
summary: "In the same week that OpenAI and Anthropic dominated AI headlines over a rushed military deal, Google was quietly shipping the protocols that will define how agents browse, buy, and collaborate on the web: WebMCP, the Universal Commerce Protocol, and Agent2Agent."
tags: ["ai-agents", "agentic-web", "google", "protocols", "webmcp", "commerce", "a2a"]
categories: ["AI Experiments"]
draft: false
---

The last week of February 2026 gave us a look behind the curtain of the AI industry's contributions to cutting-edge military capabilities. Anthropic was designated a "supply-chain risk to national security" --- a label normally reserved for foreign adversaries --- because they insisted on contractual guardrails against mass surveillance and fully autonomous control in a Pentagon deal. Hours later, OpenAI rushed in to sign the contract themselves. Sam Altman later admitted the whole thing was " rushed" and "sloppy." The contract was amended later to include wording on limitations similar to what Anthropic had been trying to negotiate for months, apparently...

In that same window of time, Google had a sneak peek of WebMCP live in Chrome Canary, the Universal Commerce Protocol processing transactions, and the Agent2Agent protocol is progressing. In this post I want to lay out what Google is creating, why it matters, and what it means if you are building products that will exist on an agentic web.

## The Protocol Stack Nobody Is Talking About

Google, Microsoft, and the Linux Foundation are quietly assembling and clearly documenting three protocols that, taken together, form a coherent stack for how AI agents will interact with the web. This is not a random collection of projects. It is an architecture.

### Web Model Context Protocol

**WebMCP (Web Model Context Protocol)** handles how agents interact with websites. Launched as an early preview in Chrome Canary in February 2026, WebMCP lets websites expose structured tools directly to AI agents through the browser, not some backend connection or API key that you need to jerry-rig together. Instead of an agent guessing what it can do on a page by taking screenshots and parsing pixels, the website just tells the agent: here are my capabilities, here are their schemas, call them directly. 

Two APIs: Declarative (HTML-based, for standard forms) and Imperative (JavaScript, for dynamic interactions). The browser mediates everything with a permission-first model --- agents cannot act without user consent. According to early benchmarks reported by [MarkTechPost](https://www.marktechpost.com/2026/02/14/google-ai-introduces-the-webmcp-to-enable-direct-and-structured-website-interactions-for-new-ai-agents/) and [Kassebaum Engineering](https://www.kassebaumengineering.com/insights/webmcp-ai-agents-browser-interaction/), WebMCP shows a 67% reduction in computational overhead, ~98% task accuracy, and roughly 89% fewer tokens consumed compared to screenshot-based approaches, which is a game changer for projects like in my post [building a live streaming in-app assistant](https://bil.arikan.ca/posts/live-streaming-in-app-assistant/).

I have been building a live multimodal agent that relies on periodic screenshots to understand what a user is doing on screen. It works, but it is not perfect --- the model is forming an understanding of UI context from pixels in images. WebMCP skips that problem entirely. The web has always had a display and interaction layer, the visual one for humans. WebMCP adds a new layer: a structured, machine-readable capability context. In my case, that is the difference between my agent guessing which button to reference and the page telling it directly.

Without WebMCP, a browser agent is essentially flying blind. It takes a screenshot, sends it to a vision model, waits for an interpretation, attempts an action, and then takes another screenshot to see if it worked. Every interaction is a round-trip through pixel space — slow, token-hungry, and wrong often enough to matter. There is no handshake between the agent and the site, no shared understanding of what the page can do. The agent is guessing at a UI built for human eyes.

{{< mermaid >}}
graph LR
    subgraph Input
        A1["AI Agent"]
        B1["Website UI"]
    end

    subgraph Interpretation
        VM["Vision Model"]
    end

    subgraph Outcome
        AC["Action Attempt"]
        ERR["Error / Retry Loop"]
    end

    A1 -->|"Screenshots page"| VM
    B1 -->|"Returns pixels"| VM
    VM -->|"Guesses action"| AC
    AC -->|"Re-screenshots to verify"| VM
    AC -->|"Fails or hits CAPTCHA"| ERR
    ERR -->|"Escalates or abandons"| A1

    style A1 fill:#f9a825,stroke:#333
    style B1 fill:#616161,stroke:#333,color:#fff
    style VM fill:#e53935,stroke:#333,color:#fff
    style AC fill:#e53935,stroke:#333,color:#fff
    style ERR fill:#b71c1c,stroke:#333,color:#fff
{{< /mermaid >}}

With WebMCP, the site stops being a thing the agent has to decode and becomes a thing the agent can directly use. The website publishes its capabilities as structured tools — what actions exist, what inputs they take, what they return — and the browser mediates access with a permission gate. The agent calls a tool, gets a structured response, and moves on. No screenshots, no pixel parsing, no guessing. The 67% reduction in compute overhead and ~98% task accuracy benchmarks are a direct result of this: reliability goes up when you replace interpretation with a contract.

{{< mermaid >}}
graph LR
    subgraph Sources
        W2["Website"]
        E2["Browser Permission Gate"]
    end

    subgraph Mediator
        NM["Navigator Model"]
    end

    subgraph Agent
        A2["AI Agent"]
    end

    W2 -->|"Publishes tools via Declarative HTML or Imperative JS"| NM
    E2 -->|"User consent required"| NM
    NM -->|"Returns tool schema"| A2
    A2 -->|"Calls tool via structured JSON"| NM
    NM -->|"Executes on page"| W2
    W2 -->|"Returns structured result"| A2

    style A2 fill:#43a047,stroke:#333,color:#fff
    style W2 fill:#1e88e5,stroke:#333,color:#fff
    style NM fill:#1e88e5,stroke:#333,color:#fff
    style E2 fill:#0277bd,stroke:#333,color:#fff
{{< /mermaid >}}

---

### Universal Commerce Protocol

**UCP (Universal Commerce Protocol)** handles how agents transact. Announced in January 2026, UCP is an open-source protocol co-developed with Shopify that standardizes how AI agents discover products, manage carts, and complete purchases. It is live today --- Etsy and Wayfair are processing real UCP-powered checkouts for shoppers, with Shopify, Target, and Walmart coming.

The architecture is layered: a Shopping service defines the core (checkout sessions, line items, totals), Capabilities add other functions (Checkout, Orders, Catalog --- each independently versioned), and Extensions augment capabilities with domain-specific details. The checkout flow follows a structure of: incomplete → requires_escalation → ready_for_complete. The agent never touches raw payment data, standard merchants remain the Merchant of Record.

The partner list is not that of small-time players. Visa, Mastercard, Stripe, American Express, Best Buy, Macy's, The Home Depot, and others.

With UCP, the checkout flow is structured end to end. The agent calls into a well-defined Shopping Service, moves through independently versioned Capabilities, and hands off to a payment layer --- all without ever touching raw card data or guessing at UI state. The merchant stays in control, the agent stays in its lane, and the state machine gives both sides a shared language for what's done and what isn't.
{{< mermaid >}}
graph TD
    subgraph "UCP Agentic Checkout Flow"
        U[User / AI Agent] -->|"Discovers products"| S["Shopping Service<br/>(sessions, line items, totals)"]
        S --> CAP["Capabilities\n(Checkout, Orders, Catalog)"]
        CAP --> EXT["Extensions\n(discounts, loyalty, domain-specific)"]
    end

    EXT -->|"Initiates checkout"| I

    subgraph "Checkout State Machine"
        I["incomplete missing info"] -->|"Agent resolves"| RE["requires_escalation<br/>buyer input needed"]
        RE -->|"Resolved or handed off"| R["ready_for_complete agent finalizes"]
    end

    R -->|"Tokenized payment"| PH

    subgraph "Payment Layer"
        PH["Payment Handler (Stripe, Visa, etc.)"]
        PH -->|"Confirmation"| M["Merchant of Record"]
    end

    style U fill:#616161,stroke:#333,color:#fff
    style S fill:#1e88e5,stroke:#333,color:#fff
    style CAP fill:#1e88e5,stroke:#333,color:#fff
    style EXT fill:#1e88e5,stroke:#333,color:#fff
    style I fill:#f9a825,stroke:#333
    style RE fill:#fb8c00,stroke:#333
    style R fill:#43a047,stroke:#333
    style PH fill:#7b1fa2,stroke:#333,color:#fff
    style M fill:#7b1fa2,stroke:#333,color:#fff
{{< /mermaid >}}

Without UCP, an agent attempting the same purchase has to improvise the entire way. It takes screenshots, parses pixels, infers cart state from DOM structure, and hopes the checkout form fields are labeled clearly enough to fill correctly. Every step is a guess. When it hits a proof-of- humanity or authentication challenge, it has no protocol to hand off gracefully --- it just fails, or dumps the problem back on the user. This is the fragile alternative that UCP is designed to replace.

{{< mermaid >}}
graph TD
    subgraph "Agentic Checkout No UCP"
        AU[User / AI Agent] -->|"Scrapes or screenshots pages"| VB["Visual Browser\n(screenshot + pixel parsing)"]
        VB -->|"Interprets UI to find products"| AC["Agent Cart Logic\n(infers line items, totals)"]
        AC -->|"Navigates to checkout page"| AF["Checkout Form\n(DOM parsing, field detection)"]
        AF -->|"Fills fields via automation"| AP["Payment Fields\n(autofill or user-provided tokens)"]
        AP -->|"Clicks confirm button"| ARV["Order Review\n(agent parses confirmation UI)"]
    end

    ARV -->|"Submits order"| AMI

    subgraph "Checkout State Machine"
        AMI["incomplete\nmissing info"] -->|"Agent retries or escalates"| AMRE["requires_escalation\n3DS auth, CAPTCHA, login wall"]
        AMRE -->|"Handed off to user"| AMR["ready_for_complete\nuser or agent confirms"]
    end

    AMR -->|"Raw payment submission\n(no tokenization layer)"| AMPH

    subgraph "Payment Layer"
        AMPH["Payment Handler\n(Stripe, Visa, etc.)"]
        AMPH -->|"Confirmation"| AMM["Merchant of Record"]
    end

    style AU fill:#616161,stroke:#333,color:#fff
    style VB fill:#e53935,stroke:#333,color:#fff
    style AC fill:#e53935,stroke:#333,color:#fff
    style AF fill:#e53935,stroke:#333,color:#fff
    style AP fill:#e53935,stroke:#333,color:#fff
    style ARV fill:#e53935,stroke:#333,color:#fff
    style AMI fill:#f9a825,stroke:#333
    style AMRE fill:#fb8c00,stroke:#333
    style AMR fill:#43a047,stroke:#333
    style AMPH fill:#7b1fa2,stroke:#333,color:#fff
    style AMM fill:#7b1fa2,stroke:#333,color:#fff
{{< /mermaid >}}

---

### Agent2Agent

**A2A (Agent2Agent Protocol)** is older, announced mid-2025 (I can't believe we are in an age where more than 6 months means something is nearly ancient), and handles how agents communicate with each other. Now under Linux Foundation governance, A2A enables agents built on different frameworks by different companies to discover each other's capabilities, delegate tasks, share context, and coordinate actions. Agent Cards (in JSON format) handle capability discovery. Task lifecycle management handles the state. There are over 50 launch partners including Atlassian, Salesforce, SAP, ServiceNow, and PayPal.

A2A complements Anthropic's MCP (which gives agents access to tools) by adding the layer above it: agents talking to agents, not just agents calling tools.

Now stack these three together. An agent discovers what a website can do (WebMCP), transacts through those capabilities (UCP), and coordinates with other agents to complete complex multi-step tasks (A2A). That is a full agentic web layer.

{{< mermaid >}}
graph TD
    subgraph "Agent A"
        AA["Shopping Agent"]
    end

    subgraph "A2A Protocol"
        AC["Agent Card<br/>(JSON discovery)"]
        TM["Task Lifecycle<br/>(assign, progress, complete)"]
    end

    subgraph "Agent B"
        AB["Payment"]
    end

    subgraph "Agent C"
        AX["Logistics"]
    end

    AA -->|"Discovers capabilities"| AC
    AC -->|"Delegates task"| AB
    AC -->|"Delegates task"| AX
    AB -->|"Status updates"| TM
    AX -->|"Status updates"| TM
    TM -->|"Result"| AA

    style AA fill:#43a047,stroke:#333
    style AB fill:#1e88e5,stroke:#333
    style AX fill:#7b1fa2,stroke:#333,color:#fff
    style AC fill:#f9a825,stroke:#333
    style TM fill:#fb8c00,stroke:#333
{{< /mermaid >}}

---

## Google Is Also Winning the Infrastructure Race

Protocols are one thing. Running them at scale is another. Over the past several months I have been evaluating cloud providers for a real-time multimodal AI agent --- comparing Google Cloud, Azure, and AWS head-to-head on latency, cost, and architectural complexity for bidirectional streaming workloads. The results were clear enough that I want to share the key findings here.

The core finding: Google is the only provider offering native bidirectional streaming with simultaneous video and audio reasoning in a single model. Azure's Realtime API is optimized for audio but lacks streaming video input. AWS requires chaining Nova 2 Omni (video/audio input) with Nova 2 Sonic (audio output) --- two separate models, brittle orchestration. Though this may change, may have already as I'm writing this, or I have missed an offering from Azure or AWS, it was still way too easy to build with a Google stack of AI Developer Kit, Google Cloud, and Vertex AI.

## Why This Matters for Practitioners

If you are building products that agents will interact with, the protocol question is, I think, actually more important than the model question right now. Models are commoditizing. The model you use this quarter will be superseded next quarter, some can even be run locally with little challenge and good-enough output. But the protocols that define how agents discover capabilities, transact, and coordinate --- those may have staying power, assuming wide adoption.

Here is the practical framing:

**If you build web products,** WebMCP is the thing to watch. Right now it is Chrome Canary, not production-ready, and is targeted to come before end of 2026 at earliest. But the direction is clear. 

- **If you want the best customer experience,** but do not instrument your site with WebMCP, third-party browser agents will interpret your UI however they want, without your guardrails. Instrumenting WebMCP is how you own the agentic experience on your own product.
- **If you sell things online,** UCP is already live and processing real transactions. The checkout state machine, the tokenized payment flow, the merchant-retains-control model --- this is not speculative. Etsy and Wayfair are doing it now. If agents are going to buy things on behalf of users, the merchants who integrate early will be the ones agents can actually transact with.
- **If you build agentic systems,** A2A defines how your agents will collaborate with other agents. This matters the moment your agent needs to interact with a system you do not control, which is most real-world scenarios.

One constraint worth flagging: WebMCP is Chrome-only for now, and UCP is U.S.-only at launch. Neither is globally production-ready yet. But the direction is set, and the risk of waiting feels similar to the risk of ignoring SEO in 2005 --- by the time it is obvious, the early movers already have the advantage.

## The Irony

With all that context, here is what I keep coming back to. The two companies that dominated AI headlines in late February 2026 were fighting over a military contract that one of them admitted was rushed and sloppy. The company that got almost no coverage was shipping the protocols that will likely define how AI agents interact with the web, buy things, and talk to each other.

Of course, military AI policy matters --- it matters enormously --- and Anthropic's insistence on responsible-use guardrails is a better apprroach, though they are likely just protecting themselves from liability of the wild tech implementations with the Pentagon and Palantir. But if you are a practitioner trying to figure out where the agentic web and commerce is heading, it's in the protocols and frameworks being advanced by Google. The fully automation of weaponry and AI enabled mass-surveillance, powered by Anthropic, OpenAI and Palantir is going to have different effects, though its likely not going to be supporting easier of agentic communication and commerce.

---

**Sources**

- [OpenAI – Our Agreement with the Department of War](https://openai.com/index/our-agreement-with-the-department-of-war/)
- [NPR – OpenAI announces Pentagon deal after Trump bans Anthropic](https://www.npr.org/2026/02/27/nx-s1-5729118/trump-anthropic-pentagon-openai-ai-weapons-ban)
- [CNBC – Altman admits defense deal "looked opportunistic and sloppy"](https://www.cnbc.com/2026/03/03/openai-sam-altman-pentagon-deal-amended-surveillance-limits.html)
- [Chrome for Developers – WebMCP Early Preview](https://developer.chrome.com/blog/webmcp-epp)
- [VentureBeat – Chrome ships WebMCP](https://venturebeat.com/infrastructure/google-chrome-ships-webmcp-in-early-preview-turning-every-website-into-a)
- [Google Blog – New tools for retailers in an agentic shopping era](https://blog.google/products/ads-commerce/agentic-commerce-ai-tools-protocol-retailers-platforms/)
- [TechCrunch – Google announces UCP](https://techcrunch.com/2026/01/11/google-announces-a-new-protocol-to-facilitate-commerce-using-ai-agents/)
- [Shopify Engineering – Building UCP](https://shopify.engineering/UCP)
- [UCP Specification](https://ucp.dev/)
- [A2A Protocol](https://a2a-protocol.org/latest/)
- [Google Developers Blog – A2A Protocol](https://developers.googleblog.com/en/a2a-a-new-era-of-agent-interoperability/)
- [InfoQ – Google and Retail Leaders Launch UCP](https://www.infoq.com/news/2026/01/google-agentic-commerce-ucp/)

