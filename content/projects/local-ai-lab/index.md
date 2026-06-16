---
title: "The Proxmox Local AI Lab"
date: 2026-05-31T08:00:00-05:00
description: "A map of the whole project : a 3-node Proxmox cluster that runs local LLM inference on two GPUs, a coding agent, and a messaging gateway reachable from my phone --- with no cloud AI in the loop. Start here, then follow the series."
tags: [proxmox, homelab, ai-infra, proxmox-ai-lab]
series: ["Proxmox AI Lab"]
draft: false
---

This is the anchor post for the Proxmox Local AI Lab series. If you have read none of the other posts, start here : it explains what the lab is, why it exists, and where each piece is documented. If you really want to read them all --- not sure why you would do this to yourself --- but this is the map you can come back to.
<!--more-->

I built a 3-node Proxmox cluster out of hardware I already owned --- a GPU workstation that doubles as my desktop, plus two HP ProDesk mini PCs --- and turned it into a local AI stack. Two GPUs serve LLM inference, a coding agent runs tasks in an isolated container, and a messaging gateway lets me talk to the whole thing from Telegram on my phone. No cloud AI sits in the request path --- this is completely self-hosted local AI.

## What this project is

The goal was a Claude Cowork and Claude Code *equivalent* --- local inference, a local agent, local storage --- that I can reach from my phone, that runs without a browser tab open, and that keeps my data on my own hardware. Not air-gapped, not frontier-model quality, and not hands-off. The point was to build it myself and understand every layer, not to clone a hosted product.

What runs today :

- **Local LLM inference** on two GPUs --- a coding model and a conversational model, each on its own graphics card.
- **A coding agent** (Pi) that executes real tasks in a sandboxed container.
- **A messaging gateway** (OpenClaw) that bridges Telegram to the agent layer, with an allowlist and pairing model.
- **Homelab services** --- DNS filtering, monitoring, file and media storage, backups, a git server, and a Minecraft server --- on the two mini PCs.

## The hardware

Three nodes, none of them bought for this project. The workstation already existed as a gaming PC; the two mini PCs were already on hand. The only additions were the RTX 5060 Ti and the two 2 TB HDDs.

| Node | CPU threads | RAM | GPU VRAM | NVMe | HDD |
| --- | --- | --- | --- | --- | --- |
| pve1 --- Workstation | 16 (Ryzen 7 5800X) | 32 GB | 16 GB (RTX 5060 Ti) + 8 GB (RX 6650 XT) | 1 TB | 4 TB (2×2 TB) |
| pve2 --- ProDesk #1 | 4 (i5-7500T) | 16 GB | --- | --- | 1 TB |
| pve3 --- ProDesk #2 | 4 (i5-7500T) | 16 GB | --- | --- | 1 TB |
| **Total** | **24** | **64 GB** | **24 GB** | **1 TB** | **6 TB** |

The split is deliberate : the workstation does all the GPU-bound AI work, and the two ProDesks --- 35 W parts, good for always-on roles --- handle everything else. *Local AI Lab --- Designing and Building a 3-Node Proxmox Cluster for AI* covers the reasoning in full.

## The architecture

Here is the whole stack on one diagram. The 11x containers are the agent layer ; the 10x containers are the inference layer. Keeping those ranges separate makes `pct list` readable as the cluster grows.

{{< mermaid >}}
graph TD
  Phone["📱 Phone<br/>Telegram / Signal"]
  Router["Home router<br/>192.168.2.1"]
  Phone --> Router

  subgraph PVE1["pve1 --- Workstation (192.168.2.121)"]
    direction TB
    OC["CT 111 --- openclaw<br/>192.168.2.134<br/>Gateway : channels + allowlist"]
    AMD["CT 101 --- inference-amd<br/>192.168.2.132<br/>RX 6650 XT · Gemma 4 E4B<br/>llama-server / ROCm · ~51 T/s"]
    PI["CT 110 --- pi-agent<br/>192.168.2.133<br/>Pi + pi-server :8090<br/>workspace sandbox"]
    NV["CT 100 --- inference-nvidia<br/>192.168.2.131<br/>RTX 5060 Ti · Qwopus3.6-27B-MTP<br/>llama-server / CUDA · ~44 T/s"]
    OC -->|"conversation"| AMD
    OC -->|"coding task<br/>HTTP + bearer token"| PI
    PI -->|"code generation"| NV
  end

  subgraph PVE2["pve2 --- ProDesk #1 (192.168.2.122)"]
    direction TB
    NET["Network & Monitoring<br/>AdGuard · Caddy<br/>Prometheus + Grafana · Qdrant"]
  end

  subgraph PVE3["pve3 --- ProDesk #2 (192.168.2.123)"]
    direction TB
    STORE["Storage & Personal<br/>Nextcloud · Jellyfin · Immich<br/>Forgejo · Restic · Minecraft"]
  end

  Router --> OC
  Router --> NET
  Router --> STORE
  TS["Tailscale<br/>remote access"] -.-> PVE1
{{< /mermaid >}}

The request path is the interesting part. A message from my phone hits OpenClaw in CT 111. Conversational replies are served by Gemma on the AMD card. When OpenClaw decides a message is a coding task, it calls the Pi bridge in CT 110 over authenticated HTTP ; Pi runs the task against Qwopus on the NVIDIA card and writes the result into its workspace. Two GPUs, two roles, no contention --- the conversational model never blocks the coding model.

## The way I think about it

The framing that made the whole thing click : the stack is a do-it-yourself version of two Claude products, where the scaffolding is given but every workflow is mine to build.

- **OpenClaw + Telegram ≈ Cowork / dispatch.** The gateway and the channels are handed to me ; deciding what the agent *does* with a message is the part I design.
- **Pi ≈ a Haiku/Sonnet-class Claude Code.** The agent loop exists ; the tools and workflows around it are mine to wire up.

That gap --- between "the loop is there" and "the workflow is mine" --- is the project. The closing post reviews how close the finished stack actually gets, honestly.

## The series

Read in order for the full build, or jump to the piece you need.

1. **[Why I Stopped Relying on Cloud AI for Everything](https://bil.arikan.ca/posts/local-ai-lab-why-local-ai-lab/)** --- the motivation. API costs, data leaving the machine, latency, and wanting an always-on agent. The case for going local, with the honest trade-offs.
2. **[Designing and Setting Up a 3-Node Proxmox Cluster](https://bil.arikan.ca/posts/local-ai-lab-proxmox-cluster-design-and-setup/)** --- the architecture decisions. Why Proxmox, why this node split, the ZFS and GPU strategy, and Tailscale over port forwarding.
3. **[A Minecraft Server on PVE3](https://bil.arikan.ca/posts/local-ai-lab-minecraft-server/)** --- the first real workload on the cluster : a PaperMC server in an LXC, plus why a container beats a VM here and how backups work.
4. **[Local AI Inference on Two GPUs --- llama.cpp on CUDA and ROCm](https://bil.arikan.ca/posts/local-ai-lab-inference-on-two-gpus/)** --- the core of the stack. Two `llama-server` instances, the NVIDIA and AMD paths in full, MTP speculative decoding, and the benchmarks that justify the model choices.
5. **[Setting Up OpenClaw as a Personal AI Gateway](https://bil.arikan.ca/posts/local-ai-lab-setting-up-openclaw/)** --- the gateway. Pointing OpenClaw at the local model, Telegram and Signal channels, and the pairing-and-allowlist security model.
6. **[Setting Up Pi as a Local Coding Agent](https://bil.arikan.ca/posts/local-ai-lab-setting-up-pi-coding-agent/)** --- the execution layer. Why Pi over Opencode, pointing it at Qwopus, the workspace as a security boundary, and a real coding task end to end.
7. **[Bridging OpenClaw and Pi Across Containers](https://bil.arikan.ca/posts/local-ai-lab-bridging-openclaw-and-pi/)** --- the glue. An HTTP bridge over Pi's RPC mode, the OpenClaw tool plugin that calls it, and the hardening (single-flight queue, bearer token) that came with it.
8. **[Connecting Telegram to Your Local AI](https://bil.arikan.ca/posts/local-ai-lab-connecting-telegram-to-your-local-ai/)** --- the mobile path. Pairing the phone, what the allowlist actually does, real round-trip latency, and the agent reaching out first via a heartbeat.
9. **[The Full Stack, Reviewed](https://bil.arikan.ca/posts/local-ai-lab-the-full-stack-reviewed/)** --- the honest review. What the stack is and isn't, how close it gets to Claude, the seven-vector threat model, and what I would build next.

## What the finished stack enables

- **Local chat** from any device on the network or over Tailscale, served by Gemma on the AMD card.
- **A mobile coding agent** --- send a task from Telegram, Pi runs it against Qwopus and reports back.
- **Proactive agents** --- cron-driven heartbeat tasks that message me first, without a prompt.
- **Storage and personal services** --- Nextcloud file sync, Jellyfin media, Immich photo backup, Forgejo git, and Restic backups.
- **Retrieval** --- Qdrant on the network node, positioned for low-latency RAG lookups from the agents (next-iteration work).
- **A game server** --- PaperMC Minecraft on PVE3, isolated from the AI workloads.

## Where it goes next

The stack works, but it is an early build, not a long-run daily driver yet. The top priorities for the next iteration : network segmentation between the agent layer and the rest of the homelab, a Qdrant-backed retrieval tool for the agents, persistent Pi sessions, and long-running automated research, writing, planning, and coding workflows.
