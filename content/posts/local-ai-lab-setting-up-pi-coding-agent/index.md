---
title: "Local AI Lab --- Setting Up Pi as a Local Coding Agent"
date: 2026-05-28T00:00:00-05:00
description: "CT 110 from scratch: Pi v0.74.2, a TypeScript provider extension for Qwopus on llama-server, thinking mode for Qwen3-based models, and a confirmed smoke test."
tags: [proxmox, homelab, ai-infra, proxmox-ai-lab, pi, coding-agent]
series: ["Proxmox AI Lab"]
draft: false
---

The last two posts got the inference layer and the gateway running. CT 100 is serving Qwopus at 44 T/s with MTP speculative decoding active. CT 101 is serving Gemma 4 E4B at 51 T/s. CT 111 (OpenClaw) is routing Telegram messages to the AMD container and responding.

What's missing: the coding execution layer. OpenClaw can converse -- it can answer questions, maintain context across turns, and route messages through the gateway. What it can't do is open files, write code, or run a terminal command. That's a different job, and it belongs to a different tool.

This post covers setting up CT 110 -- the Pi coding agent container -- and getting it to a confirmed working state against the NVIDIA inference endpoint.

## Harness choice : why Pi over Opencode

When I originally scoped this stack, I chose [Pi](https://github.com/badlogic/pi-mono) over Open Interpreter, Aider, and OpenHands. Before building this out on Proxmox, I spent some time running both Pi and Opencode on my M1 MacBook Pro (16 GB) against the same model families -- Qwen 2.5/3, Gemma, Kimi K2 --- via Ollama and LM Studio. The goal was to make the harness decision portable before committing to a container.

Opencode is the obvious "just works" choice. MCP support out of the box, a broader provider list, a GUI option, active development. If I wanted to be productive immediately with a minimal setup tax, Opencode would have been the answer.

The reason I came back to Pi is harder to justify purely on features, and that's kind of the point. I want to understand how a coding agent actually works -- not at the level of "I read the README," but at the level of building the integration layer myself, making mistakes, and knowing why each piece is there. Pi's core is genuinely minimal : four tools (`read`, `write`, `edit`, `bash`), a clean RPC interface, and a TypeScript extension system for anything beyond that. There's no magic I'm not in control of.

With Opencode, I'd have been productive faster. With Pi, I'm building the harness --- the HTTP bridge, the OpenClaw custom tool, the provider extension. Each of those is a layer I understand because I wrote it. When something breaks in production (and things will break), I'll know where to look.

The practical consideration that made Pi the right call technically, not just philosophically : the RPC mode is strict JSONL over stdin/stdout, which is exactly the interface you want when driving an agent programmatically from another container. Opencode's integration surface is different -- it's designed more for direct use than for being called as a subprocess from an external gateway. Pi's design assumes you'll drive it; Opencode's design assumes you'll use it.

Pi is the execution layer. OpenClaw is the gateway.

## Pi's role in this stack

Before the setup, it's worth being explicit about what Pi does and doesn't do.

Pi gives an LLM four core tools: `read`, `write`, `edit`, and `bash`. When you send Pi a coding task, the model uses those tools in a loop --- read the relevant files, write or edit them, run tests, repeat -- until it decides it's done or runs out of context. Sessions are stored as JSONL files. The model can be anything that speaks an OpenAI-compatible API.

What Pi is not : a conversation layer. It doesn't manage channel connections, it doesn't hold a persistent daemon waiting for messages, it doesn't maintain a conversational history in the way OpenClaw does. Pi is a task executor -- you hand it a well-formed instruction and it runs until it completes or fails.

In this stack, OpenClaw handles all conversation and routing. When a message arrives that needs code execution -- "refactor this function", "write a script to do X", "debug this error" -- OpenClaw delegates it to Pi. Pi takes the task, works against the NVIDIA inference endpoint (Qwopus), and returns the result. The NVIDIA container stays idle from OpenClaw's perspective until a coding task comes in; then Pi brings it into the loop.

{{< mermaid >}}
graph TD
  TG["Telegram / Signal message"] --> OC["OpenClaw --- CT 111<br/>conversation + routing"]
  OC -->|"chat"| GEMMA["Gemma 4 E4B --- CT 101<br/>RX 6650 XT · conversation"]
  OC -->|"coding task<br/>(bridge wired in next post)"| PI["Pi --- CT 110<br/>read · write · edit · bash<br/>/workspace"]
  PI -->|"code generation"| QW["Qwopus 27B --- CT 100<br/>RTX 5060 Ti · coding"]
{{< /mermaid >}}

## Container setup

CT 110 follows the same pattern as the inference containers : Ubuntu 24.04, unprivileged, created on pve1 where the GPU inference is already running.

```bash
pct create 110 local:vztmpl/ubuntu-24.04-standard_24.04-2_amd64.tar.zst \
  --hostname pi-agent \
  --cores 2 \
  --memory 4096 \
  --swap 512 \
  --rootfs local-zfs:8 \
  --net0 name=eth0,bridge=vmbr0,ip=192.168.2.133/24,gw=192.168.2.1 \
  --nameserver 192.168.2.1 \
  --searchdomain local \
  --unprivileged 1 \
  --features nesting=1 \
  --onboot 1 \
  --start 1
```

Something worth calling out :

`--features nesting=1` is needed for npm's lifecycle scripts inside unprivileged containers. Without it, some postinstall hooks fail with `EACCES` in ways that look like permission errors on the package itself.

Verify it came up :

```bash
pct status 110
pct exec 110 -- ip addr show eth0
```

## Node.js 20

Pi requires Node 20 or newer. Ubuntu 24.04's packaged Node version is behind, so install via NodeSource :

```bash
pct exec 110 -- bash -c "
  apt-get update -qq &&
  apt-get install -y curl ca-certificates &&
  curl -fsSL https://deb.nodesource.com/setup_20.x | bash - &&
  apt-get install -y nodejs
"
```

Verify :

```bash
pct exec 110 -- node --version   # v20.x.x
```

## Installing Pi

The npm package moved organisations between the original planning and this post. The package at `@mariozechner/pi-coding-agent` is deprecated -- it still installs (v0.73.1) but emits deprecation warnings and is behind the current release. The active package is now `@earendil-works/pi-coding-agent`.

```bash
pct exec 110 -- npm install -g @earendil-works/pi-coding-agent
pct exec 110 -- pi --version
```

Expected output : `0.74.2` (or newer). The package is lighter than the old one -- 125 packages vs 203 -- because the deprecated version bundled some things that got split into separate packages in the reorganisation.

## Provider extension : connecting to Qwopus

Pi's way of adding custom providers changed in recent versions. The docs still mention a `~/.pi/agent/models.json` file for simple cases, but the current approach for local llama-server endpoints is a TypeScript extension. Extensions are auto-discovered from `~/.pi/agent/extensions/` on startup.

The extension registers CT 100's llama-server (192.168.2.131, port 8080) as an `openai-completions` provider. Qwopus3.6-27B-v2-MTP is a Qwen3-based model, which means it supports thinking mode -- controlled via the chat template's `enable_thinking` parameter. Pi exposes this through `thinkingFormat: "qwen-chat-template"` in the model's compat settings.

```bash
pct exec 110 -- mkdir -p /root/.pi/agent/extensions

pct exec 110 -- bash -c "cat > /root/.pi/agent/extensions/qwopus.ts << 'EOF'
import type { ExtensionAPI } from \"@earendil-works/pi-coding-agent\";

export default function (pi: ExtensionAPI) {
  pi.registerProvider(\"qwopus\", {
    name: \"Qwopus (NVIDIA/llama-server)\",
    baseUrl: \"http://192.168.2.131:8080/v1\",
    apiKey: \"llama-local\",
    api: \"openai-completions\",
    models: [
      {
        id: \"qwopus\",
        name: \"Qwopus3.6-27B-v2-MTP Q3_K_M\",
        reasoning: true,
        input: [\"text\"],
        cost: { input: 0, output: 0, cacheRead: 0, cacheWrite: 0 },
        contextWindow: 32768,
        maxTokens: 8192,
        thinkingLevelMap: {
          off: null,
          minimal: \"low\",
          low: \"low\",
          medium: \"medium\",
          high: \"high\",
          xhigh: \"high\",
        },
        compat: {
          thinkingFormat: \"qwen-chat-template\",
          supportsDeveloperRole: false,
          maxTokensField: \"max_tokens\",
        },
      },
    ],
  });
}
EOF"
```

Verify Pi picks it up :

```bash
pct exec 110 -- pi --list-models qwopus
```

Expected :

```
provider  model   context  max-out  thinking  images
qwopus    qwopus  32.8K    8.2K     yes       no
```

The `thinking: yes` column confirms Pi read the extension, loaded the provider, and registered the model with the correct capabilities.

{{< alert "lightbulb" >}}
Whether thinking mode actually fires on inference depends on whether the llama-server build on CT 100 passes `chat_template_kwargs` through to the Qwen3 Jinja template. I'll verify during first use by checking the response quality -- thinking responses have a noticeably different structure to non-thinking ones. If thinking is off despite the `reasoning: true` flag, I'll check llama-server's build date and update if it predates Qwen3 template support.
{{< /alert >}}

## Workspace setup

The working directory is the Pi agent's filesystem boundary. Whatever directory you run Pi from is the directory it reads, writes, edits, and executes bash in. Keeping this isolated to `/workspace` means that even if the model does something unexpected, it's contained to that directory.

```bash
pct exec 110 -- mkdir -p /workspace
```

That's the full setup. The security model is the container boundary itself --- Pi runs with the container's filesystem permissions, which are already isolated from the host by the LXC unprivileged boundary.

## Smoke test

Print mode (`-p`) runs Pi non-interactively -- it sends the prompt, waits for the agent to finish, prints the result, and exits. Combined with `--no-session`, each call is stateless. This is how the HTTP bridge in the next post will call Pi.

```bash
pct exec 110 -- bash -c "
  cd /workspace &&
  pi --model qwopus/qwopus --thinking off --no-session \
     -p 'Write a Python script called hello.py that prints the current date and time. Save it to hello.py.'
"
```

Output :

```
Done! The script is saved at `/workspace/hello.py`. It imports `datetime`
and prints the current date and time. Running it outputs:
2026-05-30 20:51:58.980433
```

Verify the file :

```bash
pct exec 110 -- cat /workspace/hello.py
```

```python
from datetime import datetime
print(datetime.now())
```

This confirms the full path : Pi → llama-server on CT 100 → response received → `write` tool called → file on disk in `/workspace`. Everything from the container to the model to the tool execution is working.

## What's Next

The Pi container is working. The remaining piece is the connection between CT 111 (OpenClaw) and CT 110 (Pi) -- specifically, how OpenClaw delegates a coding task across containers to Pi's RPC interface. The next post covers that design and the HTTP bridge approach taken to wire them together.
