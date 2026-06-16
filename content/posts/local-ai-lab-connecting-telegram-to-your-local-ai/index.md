---
title: "Local AI Lab --- Connecting Telegram to Your Local AI"
date: 2026-05-30T00:00:00-05:00
description: "Setting up the Telegram channel in OpenClaw, pairing the bot, and the troubleshooting story behind a static IP change that silently killed the connection."
tags: [proxmox, homelab, ai-infra, proxmox-ai-lab, openclaw, telegram]
series: ["Proxmox AI Lab"]
draft: false
---

Once OpenClaw is running and pointing at the local inference endpoint, the next step is giving it a way to receive messages. OpenClaw supports multiple messaging channels natively -- Telegram, Signal, Discord, and others. This post covers Telegram : getting a bot token, connecting the channel, pairing it to your account, and trying it out.

## Getting a bot token

Telegram bots are created through BotFather. Open Telegram, search for `@BotFather`, and run `/newbot`. It asks for a name and a username (the username must end in `bot`). At the end, BotFather gives you a token in the format `1234567890:ABCDEFabcdefABCDEF-1234567890abcdef`.

{{< figure src="001.png" alt="BotFather command menu in Telegram" caption="BotFather is itself a bot. `/newbot` creates the bot ; `/token`, `/revoke`, and `/setname` under Bot Settings are the ones worth knowing later." >}}

That token is the credential for the bot API.

{{< alert "triangle-exclamation" >}}
If you're using Ghostty or another terminal with bracketed paste mode enabled, do not paste the token directly into a shell command. Bracketed paste wraps clipboard content in escape sequences (`\e[200~...\e[201~`) that appear as literal characters appended to the string. The result looks like a valid token but is ~20 characters longer than it should be, causing 401 Unauthorized errors from Telegram that are hard to diagnose. Write the token to a file with a text editor instead.
{{< /alert >}}

Write the token to a file inside CT 111 :

```bash
pct exec 111 -- nano /root/.openclaw/telegram-token
# Paste the token, save with Ctrl+X → Y → Enter
```

## Adding the Telegram channel

From inside CT 111 :

```bash
pct exec 111 -- openclaw channels add
```

OpenClaw presents an interactive channel picker. Select Telegram, then point it at the token file :

```bash
openclaw channels telegram setup --token-file /root/.openclaw/telegram-token
```

This registers the bot with Telegram's API, sets up long polling, and writes the channel config to `~/.openclaw/openclaw.json`.

## Pairing and allowlist

OpenClaw's security model requires explicitly pairing a user before it will respond to them. Send any message to the bot from your Telegram account -- OpenClaw logs the sender's numeric user ID in the gateway output.

Get the ID from the logs :

```bash
pct exec 111 -- bash -c "tail -20 /tmp/openclaw/openclaw-\$(date +%Y-%m-%d).log" | python3 -c "
import sys, json
for line in sys.stdin:
    try:
        d = json.loads(line)
        if 'unpaired' in d.get('message', '').lower() or 'user' in d.get('message', '').lower():
            print(d.get('time','')[:19], d.get('message',''))
    except: pass
"
```

Add the ID to the allowlist :

```bash
openclaw config set channels.telegram.policy.allowlist '["YOUR_NUMERIC_ID"]' --strict-json
openclaw gateway restart
```

Send a test message. You should get a response from Gemma 4 E4B (CT 101 / AMD container) routed through OpenClaw.

## First message : the auto-compaction wall

The very first real message back from the bot wasn't a reply -- it was an error :

{{< figure src="002.png" alt="OpenClaw auto-compaction error in Telegram" caption="Every turn comes back as an auto-compaction failure : the model can't fit the conversation plus the room it needs to summarize it. `/new` clears the session but the next message hits the same wall." >}}

> *"Auto-compaction could not recover this turn. [...] To prevent this, increase your compaction buffer by setting `agents.defaults.compaction.reserveTokensFloor` to 20000 or higher in your config."*

The cause is a context-size mismatch, not a Telegram problem. llama-server on CT 101 was started with `--ctx-size 8192`, and OpenClaw reserves part of the window for its own compaction (summarization) pass. At 8192 total there's no room left to both hold the conversation and run the summarizer, so every turn fails the same way -- and starting a fresh session with `/new` only resets you to the same ceiling.

The short version of the fix is two changes that have to agree with each other :

1. **Raise the server context window.** Restart llama-server on CT 101 with `--ctx-size 32768` instead of `8192`. Gemma 4 E4B was trained on 131k context, so this is well within range and the RX 6650 XT has the VRAM headroom.
2. **Set the compaction floor.** `openclaw config set agents.defaults.compaction.reserveTokensFloor 16000` -- roughly half the window, leaving ~16k for conversation and ~16k for the summarizer.

There's a third gotcha : OpenClaw's derived `models.json` can keep the old per-model `contextWindow` of 8192 even after the provider-level change, so it has to be patched directly.

{{< alert "circle-info" >}}
I covered this end to end -- including the `models.json` merge-precedence trap and the exact commands -- in the `Local AI Lab --- Setting Up OpenClaw as a Personal AI Gateway` post. The above is the summary ; that post has the full troubleshooting.
{{< /alert >}}

## Giving the bot an identity

With compaction sorted, the bot replies -- but out of the box it's a generic assistant with no sense of what it's for. The first thing it did once online was ask :

{{< figure src="003.png" alt="The bot asking for its name and purpose, and the identity definition sent back" caption="The bot comes online and asks who it is. I answer once : a name (Klaus), a role, the three areas it works across, and a personality so its replies have a consistent voice." >}}

So I gave it one. The identity I sent back defines four things :

- **A name** -- Klaus. Small thing, but it makes the bot a named collaborator rather than an anonymous endpoint, and it's what the system prompt and logs refer to.
- **A role and what it is *not*** -- a personal assistant to help me think and build, explicitly *not* a chatbot and *not* a homelab monitor. Saying what it isn't keeps a small model from drifting into those framings.
- **Three areas of work** -- Obsidian (notes and knowledge), research (writing and coding projects), and orchestration (relaying between Telegram and the Pi coding agent without me babysitting each step).
- **A personality** -- a badger : relentless, low-drama, quiet by default, specific when it matters. This isn't decoration ; a consistent persona makes the replies predictable, which is what you want from something you talk to on your phone all day.

This identity becomes the channel system prompt. It's also where routing behaviour gets anchored later --- telling the model when to answer directly versus when to hand a coding task off to Pi.

## What working looks like

After pairing, the flow is :

{{< mermaid >}}
graph TD
  Phone["📱 Telegram app<br/>(anywhere)"] --> TGAPI["Telegram servers"]
  TGAPI -->|"OpenClaw polls outbound<br/>no inbound port"| OC["OpenClaw --- CT 111<br/>allowlist gate"]
  OC -->|"unknown sender"| DROP["ignored<br/>until I pair them"]
  OC -->|"allowlisted : chat"| GEMMA["Gemma 4 E4B --- CT 101<br/>192.168.2.132:8081"]
  OC -->|"allowlisted : coding"| PI["Pi --- CT 110<br/>→ Qwopus on CT 100"]
{{< /mermaid >}}

One thing to note : "no public exposure" means no inbound port and no self-hosted endpoint on the internet. OpenClaw reaches Telegram outbound and long-polls for messages, so nothing in the lab listens on a public address. Inference and code execution stay entirely local --- but the message text does transit Telegram's servers, which is inherent to using a Telegram bot. If that transit is a dealbreaker, the Signal channel is a stricter option but not as bot friendly. 

Latency from send to first token : roughly 2--4 seconds in my setup. The delay is mostly the network round-trip to Telegram's polling API plus the time for the model to start generating. Gemma 4 E4B runs at 51 T/s on the RX 6650 XT, so actual generation is fast once it starts.

## Testing the full round trip on a coding task

The chat path works. The real test is the full loop : a coding task typed on a phone, routed through OpenClaw, handed to the Pi bridge, executed by the coding model on the GPU, and reported back -- all without me touching a terminal. This needs the HTTP bridge from the [next post]({{< ref "local-ai-lab-bridging-openclaw-and-pi" >}}) in place, but it's worth showing here because it's the moment the whole stack proves itself end to end.

{{< figure src="004.png" alt="Coding tasks sent over Telegram, executed by Pi, and reported back" caption="Two coding tasks and a weather question over Telegram. Klaus delegates the code to Pi (which writes the files), then answers the weather directly -- routing works in both directions." >}}

I sent : *"Write a python script that prints the first 10 prime numbers. Save it to `/workspace/primes10.py`."* A few seconds later the reply confirmed the file was written and the script ran. A second variant (9 primes) worked the same way, and a plain *"how is the weather in Toronto today?"* was answered directly rather than delegated -- so the routing decision is going both ways correctly.

One honest wrinkle is visible in the screenshot. Pi writes the file to `/workspace/primes10.py` in CT 110, but Klaus reports it as `/root/.openclaw/workspace/primes10.py` -- its *own* OpenClaw workspace path, not Pi's. The file landed in the right place ; the reply just cites the wrong one.

{{< alert "lightbulb" >}}
This is a small-model artifact, not a bridge bug. Gemma 4 E4B at 4B parameters substitutes its own frame of reference for the path returned in the tool result, even when the correct path is handed to it explicitly. A larger conversation model follows the tool output more faithfully -- but for a cosmetic path string, swapping the model isn't worth collapsing the clean Gemma-for-chat / Qwopus-for-code split. I dig into this in the bridging post.
{{< /alert >}}
