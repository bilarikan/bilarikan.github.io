---
title: Local AI Lab --- Why I Want to Stop Relying on Cloud AI for Everything
date: 2026-05-21T08:30:00-05:00
description: "The motivation pass for the Proxmox AI Lab series : why a local, always-on AI stack is the next iteration after a year of leaning on cloud AI for everyday work, learning experiments, and code-as-video pipelines."
tags:
  - proxmox
  - homelab
  - ai-infra
  - proxmox-ai-lab
series:
  - Proxmox AI Lab
draft: false
---

Using this post to think-out *why* I am building a local AI lab on Proxmox before I get into any of the *how*. The guiding question is simple : after a couple of years using the first wave of recent AI/LLM products --- ChatGPT, Gemini, CoPilot, Perplexity --- and a year of running against AI build tools and agentic harnesses --- Google AI Studio, Vertex AI, Gemini Live, Claude Cowork, Claude Code, Codex, Cursor, hosted Frontier models to do even more work --- what is the actual problem a local stack solves for me, and what is it not going to solve?

This is the entry post in the Proxmox AI Lab series. No commands here, no configs, or build steps. Just thinking through my motivations, constraints, and the shape of the finished thing I'm aiming for.

## Goal

Stand up an always-on local AI environment that I can :

1. Reach from my laptop, my phone, and anywhere I am that has an internet connection.
2. Use as a Claude Cowork + Claude Code equivalent for everyday practitioner work : coding, writing, building L&D experiments
3. Spin up and tear down entire stacks routinely --- without worrying if my laptop has enough resources left --- so I can prototype something like a local text-to-voice setup, run it for a week, and either keep it or throw it away without it being a massive project
4. Share as repeatable builds with people interested who do not have a homelab and only have modest hardware to spool things up on

The lab is not a replacement for cloud frontier models. It is a complement that takes back the work that does not need a frontier model and gives me a place to run experiments end to end.

## Working assumption

Most of what I want to do with this (coding tasks under 30 minutes, drafting, summarising, prototyping a workflow) does not need a frontier model. It needs a *good enough* model that is **always reachable, predictable in cost, consistent model capability, and fast enough that I do not stop to think about usage limits and API fees before invoking it**. The cloud subscription model is the opposite of that on a few of these points : cost is metered, costs can vary, and models can vary in capability month to month.

If the working assumption is wrong, I will have spent some weekends and the cost of a mid-range GPU finding that out. That's an acceptable trade.

## What pushed me here

Three things stacked up over the last few months and made the cloud-only setup feel like the wrong default.

### 1. The code-as-video work made me want to ship and share stacks, not just outputs

I have been documenting a code-as-video workflow on this blog --- using developer tools (Editframe in particular) to generate learning videos from code instead of clicking around in a video editor. The series so far :

- [Video production to dev workflow : an Editframe test drive](https://bil.arikan.ca/posts/video-production-to-dev-workflow-editframe-test-drive/)
- [Code as video with Editframe](https://bil.arikan.ca/posts/code-as-video-with-editframe/)
- [Code-as-video landscape for learning content](https://bil.arikan.ca/posts/code-as-video-landscape-for-learning-content/)

What that work surfaced, more than the video output itself, is how much value there is in *handing someone a runnable stack* rather than handing them a finished artefact. A code-as-video pipeline is interesting once. A code-as-video pipeline that someone can clone, run on their own machine, and modify --- without even having to worry about frontier model subscriptions and API keys --- that feels valuable to me.

The same logic applies to AI in Learning experiments. A demo of a local text-to-voice setup is one thing. A repeatable build of that setup that an L&D colleague can run on a modest desktop, change the voices on, and use in their own course --- that is what I want to be producing. To produce that reliably I need an environment where I am building and tossing stacks routinely, not occasionally.

### 2. The M1 MacBook Pro experiments were useful, and also showed the ceiling

Before deciding the lab needed to be its own machine, I spent some evenings running as much of a local AI stack as would fit on a 16 GB M1 MacBook Pro. The list, in roughly the order I tried them :

- **Ollama** [here](https://ollama.com/) for running models locally on a headless server
- **LM Studio** [here](https://lmstudio.ai/) for running models locally when I wanted a quick GUI to compare
- **Hugging Face** [here](https://huggingface.co/) when I needed to better understand how Ollama and LM Studio leverage it 
- **Opencode** [here](https://opencode.ai/) as a batteries-included coding agent harness --- MCP, plugins, multiple model providers, a sensible default loadout
- **Pi** ([a minimal coding harness](https://pi.dev/)) as the opposite philosophy --- minimal four-tool core, you build the rest
- **Models** : Gemma4, Qwen 3.5. The point was not to find the best model, it was to feel out which sizes my use cases actually worked well with

Three things came out of that.

First, **a 16 GB unified-memory laptop is enough to learn on but not enough to live on**. I could run a basic coding-sized model and an embedding model and a small UI, but the moment I wanted to keep that running while I did anything else, I could notice the trusty M1 struggling for the very first time. An always-on environment is not a laptop job.

Second, **the harness question matters more than the model question for daily use**. The right model running through the wrong harness still feels worse than a smaller model running through one that fits how I work. I stepped away from the M1 evenings thinking I had a real decision to make there --- *do I want to build my own coding-agent harness on top of Pi (small core, glue work, exact fit), or adopt something like Opencode that already ships most of the tools and accept that some choices will not be mine to make?* The answer became clear when I prompted Pi with Qwen 3.5 to build its own web search extension. It was neat watching the agent build its own extension based on my specification. I was sold on the idea of tweaking the Pi harness to my needs.

Third, **the stuff I want to build is composable**. Coding agent + local LLM + a vector store + a retrieval layer + a voice or vision component. That stack is fine to assemble when each piece can be a container that comes up in seconds. It is painful to assemble on a laptop where every piece competes for the same memory.

### 3. Cloud AI is excellent until you want it on your terms

The friction points with cloud-only AI, in the order they actually bothered me :

- **Reachability.** A Frontier model is not "always on". A subscription that gates how many turns I can take before being asked to upgrade is not too "predictable". Both of those are fine for the experimenting, prototyping, and constant building with an large budget. They are not fine for the always-on use case where I'm spending my hobby budget to make things.
- **Data.** The same notes-and-snippets that I am happy to throw at a cloud model for a one-off question, I am not as happy to throw at it routinely as part of a learning-experiment build I plan to share. A local-first default flips that calculus
- **Cost.** API metering is fine for a known workload. It is the wrong cost shape for "I want to leave this thing running for a week and see what it does"
- **Iteration speed on the wrapper.** Cloud apps are someone else's product. If I want a different glue layer, a different agent surface, a different way to schedule proactive tasks, I have to wait for them to ship it, or build the wrapper around their API and pay both costs

None of this means I am leaving the cloud. Frontier models are still the right tool when I need a frontier model. The point is to stop using them as the default for work where they are not earning the premium.

## What "local" means here, exactly

It is worth being precise, because *local AI* gets used to mean a few different things.

In this case "local" means :

- **Local inference.** Models run on hardware in my house, on GPUs I own
- **Local agent.** The agent loop (the thing deciding what tool to call) runs on the same network
- **Local storage.** Working files, retrieved documents, conversation history all sit on disk in my house
- **Local-reachable, not air-gapped.** The lab still has internet. It can fetch a package, pull a model, call a cloud API when I explicitly want it to. It is not a clean room

Out of scope for the lab, on purpose : multi-user serving, public exposure of any of these services. This is a single-practitioner setup that prioritises reachability for me and shareability of the build patterns over uptime guarantees.

## Hardware that was already in the room

The reason this is feasible without a new build is that the bones are already there. The main workstation is a B550 / Ryzen 7 5800X / 32 GB DDR4 desktop that has been doing dual duty as my gaming machine and my heavier compute box. It already had an RX 6650 XT (8 GB) and a 1 TB NVMe that was only half used.

Two additions made it lab-capable :

- **A Gigabyte RTX 5060 Ti WindForce OC, 16 GB.** This is the inference card. 16 GB of GDDR7 is the size that opens up a coding model in the 20--22 B range at Q4, which is the sweet spot I keep landing on for coding-agent work. It is not a frontier card. It is the smallest card that fits a model I would actually want a coding agent to use, on a board I already owned
- **Two 2 TB SATA HDDs.** Cheap, mirrored, spun up as a ZFS pool for VM disks. Not fast. They do not need to be fast for the agent-and-document workloads. They need to be reliable, capacious, and already available on free SATA ports

The two HP ProDesk 600 G3 mini PCs (i5-7500T, 16 GB each) round out what becomes a 3-node Proxmox cluster. They are not doing AI work. They are doing the homelab plumbing (DNS, reverse proxy, monitoring, vector DB, file server, media, backups) that the lab will lean on.

The point I'm trying to make is just : I did not buy a new $7000CAD machine. I added one GPU, two HDDs, and a habit of keeping the box on.

{{< mermaid >}}
graph LR
    WS["Workstation<br/>Ryzen 7 5800X · 32 GB DDR4<br/>RTX 5060 Ti 16 GB -- inference<br/>1 TB NVMe + 2× 2 TB ZFS"]
    P1["ProDesk Mini #1<br/>i5-7500T · 16 GB<br/>DNS · reverse proxy · monitoring"]
    P2["ProDesk Mini #2<br/>i5-7500T · 16 GB<br/>vector DB · file server · backups"]
    WS --- |Proxmox cluster| P1
    WS --- |Proxmox cluster| P2
    P1 --- P2
{{< /mermaid >}}

## What the finished stack should be able to do

Concretely, when this is built I want to be able to :

1. Send a coding task to the lab from my phone over Signal --- get back a response that is the agent's actual work, not a "here is what I would do" stub
	1. Or draft a concept, project, or blog idea in Obsidian, synced with git, that the agent iterates on to refine, research, or reach a goal
2. Have a single OpenClaw gateway in front of the agent layer, so adding a new messaging surface (Telegram, email, a webhook) is a config change, not a rewrite
3. Run an embedding + retrieval layer or a [Karpathy style LLM Wiki](https://gist.github.com/karpathy/442a6bf555914893e9891c11519de94f) against my own notes, so a question can be answered with my context, not a stranger's
4. Spin up an experimental stack (text-to-voice, image generation, a small RAG demo) as an LXC or VM, run it for as long as it is useful, and tear it down without it leaving residue
5. Package one of those experimental stacks so an L&D colleague can clone it, run it on a modest desktop or mini PC, and use it inside a course they are building.

That last item is the one that ties the lab back to the L&D and code-as-video work : the lab is a forge for runnable, shareable learning-tech builds, not just my private inference rig.

{{< mermaid >}}
graph LR
    Phone["Phone<br/>(Signal)"]
    Laptop["Laptop<br/>(Obsidian · CLI)"]
    GW["OpenClaw Gateway"]
    Agent["Pi Agent Harness"]
    LLM["Local LLM<br/>22B Q4<br/>RTX 5060 Ti"]
    RAG["Retrieval Layer<br/>embedding + vector store"]
    Exp["Experimental LXC/VM<br/>voice · vision · RAG demos"]
    Notes["Personal notes<br/>& docs"]
    Phone --> GW
    Laptop --> GW
    GW --> Agent
    Agent --> LLM
    Agent --> RAG
    Agent --> Exp
    Notes --> RAG
{{< /mermaid >}}

## What this is *not* going to replace

Let's be honest about the gap, because I have read enough "replace your cloud subscription with local AI" posts to know how that ends up.

- **Frontier reasoning quality.** A 22 B coding model running locally is good. It is not Claude Sonnet on a hard task. The lab's job is to handle the 80 % of work that does not need the top of the curve, and to know when to escalate
- **Browser-grade chat polish.** A Signal-and-CLI-and-LXC stack is not going to feel like a finished product. That is fine for me. I understand that it would not be fine for everyone
- **Hands-off operation.** A homelab is a homelab. Drives fail, drivers regress, an Ubuntu kernel update breaks ROCm, and at some point I am the on-call to fix my homelab.

## What's Next

The next post in the series, *Designing the Proxmox Cluster for AI and Homelab Services*, walks through the cluster layout : which workloads land on the workstation, which land on the two ProDesk mini PCs, why the GPUs split the way they do, and how the storage and network plumbing supports the build-and-tear-down workflow described above.
