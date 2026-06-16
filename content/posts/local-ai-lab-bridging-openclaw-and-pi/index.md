---
title: "Local AI Lab --- Bridging OpenClaw and Pi Across Containers"
date: 2026-05-29T00:00:00-05:00
description: "Why separate containers for gateway and coding agent, the four options for cross-container delegation, and the HTTP wrapper approach taken to wire them together -- with single-flight queueing, a shared-secret token, and a verify-the-protocol-first deploy."
tags: [proxmox, homelab, ai-infra, proxmox-ai-lab, pi, openclaw, coding-agent]
series: ["Proxmox AI Lab"]
draft: false
---

Container 110 (Pi Coding Agent) and container 111 (OpenClaw) are both running. The question now is how OpenClaw routes a coding task to Pi and gets the result back.

Pi's integration interface is RPC over [stdin/stdout](https://en.wikipedia.org/wiki/Standard_streams) --- it's designed to be driven as a subprocess, not called over a network. OpenClaw lives in a separate container. Separate containers don't share a process space, so "spawn Pi as a subprocess" doesn't work out of the box.

Before getting into the solution, I want to document why I'm keeping them in separate containers in the first place, since the easy answer would be to install Pi inside CT 111 alongside OpenClaw and be done with it.

## Why separate containers

The short answer is replaceability.

OpenClaw and Pi are both actively developed projects. Pi's organization shifted npm namespaces between my planning session and this implementation (from `@mariozechner` to `@earendil-works`). OpenClaw had an acqui-hire scare, transferred to a foundation, and has shipped new major versions across the time I've been building this stack. Neither of these is stable software in the way an OS package is stable.

If Pi is installed inside CT 111, replacing Pi with a different coding agent means modifying the OpenClaw container -- which means also touching OpenClaw's config, dependencies, and service. The risk of breaking the gateway while changing the agent is real, and it goes both ways. An OpenClaw update that changes how extensions work could interfere with Pi if they share a container.

The isolation boundary here is the same reason the inference containers are separate from the agent containers. CT 100 runs llama-server and nothing else. CT 101 runs llama-server and nothing else. Their job is narrow and their surface is clean. CT 110 (Pi) and CT 111 (OpenClaw) should follow the same pattern.

**The practical upside** : swapping either side later means updating a URL in the other's config. If Pi gets replaced by a different harness, OpenClaw's extension points at the same HTTP endpoint -- maybe a different container, maybe the same. If OpenClaw gets replaced by Hermes or something else, the new gateway calls the same Pi bridge. The interface between them is the contract, not the implementation.

## The options

Four ways to bridge across containers :

**Option 1 -- HTTP wrapper in CT 110.** A small Node.js server wraps Pi's RPC mode and exposes it over HTTP. OpenClaw makes a `POST /prompt` call; the server spawns `pi --mode rpc`, pipes the prompt via stdin, reads events from stdout, and returns the accumulated text as JSON. Port 8090 in CT 110. OpenClaw adds a custom tool that calls it.

**Option 2 -- SSH + print mode.** SSH keys from CT 111 → CT 110. OpenClaw runs `ssh root@192.168.2.133 "cd /workspace && pi --model qwopus/qwopus --no-session -p '<task>'"`. No server to write, just key exchange. Trade-off: print mode is stateless (every call is a fresh Pi instance), output comes back as a blob with no streaming, and SSH adds latency and key management surface.

**Option 3 -- OpenClaw's built-in delegation.** OpenClaw v2026.5.x has no mechanism for routing to an external execution agent through config alone. Checked it here and ruled this out now.

**Option 4 -- Shared filesystem queue.** Mount a directory into both containers, OpenClaw writes task files, Pi polls and writes results. Doesn't deliver results in real-time, no way to signal completion cleanly. I like this option as it aligns with my preference for flat files and Obsidian, but I'm not sure it's worth building everything to make this work.

I'm going with Option 1. It matches the existing pattern (everything in this stack talks HTTP to fixed IP:port endpoints), supports streaming later, and lets you test the Pi bridge directly with `curl` without OpenClaw in the loop.

A note on why the wrapper drives Pi in RPC mode rather than just shelling out to print mode (`pi -p`), given that the first version is stateless either way. Print mode hands back a text blob that I'd have to parse heuristically; RPC mode hands back a structured JSONL event stream I can parse exactly, and it's the same interface I'll need when I add persistent sessions and token streaming later. So the wrapper implements RPC's complexity now for the additional options I might use later. For this first version, that's the only reason --- this first version doesn't strictly need it.

## Verify the RPC protocol before writing the wrapper

The entire wrapper rests on one assumption : the exact shape of the JSONL events Pi emits on stdout in RPC mode. If those event names are wrong, the parser silently accumulates nothing and every request looks like a hang. The smoke test in the previous post confirmed Pi writes files in *print* mode -- it did not confirm the *RPC* event schema. So I'll need to confirm this first.

{{< alert "triangle-exclamation" >}}
The naive version of this command -- `printf "..." | pi --mode rpc` --- exits before inference completes. When `printf` finishes, stdin closes immediately and Pi exits before it can respond. Keep stdin open with a `sleep` that outlasts inference.
{{< /alert >}}

```bash
pct exec 110 -- bash -c 'cd /workspace && \
  (printf "%s\n" "{\"type\":\"prompt\",\"message\":\"reply with the single word ready\"}" ; sleep 30) \
  | pi --mode rpc --model qwopus/qwopus --no-session --thinking off'
```

Read the raw stdout and confirm three things the parser depends on :

1. Text arrives as `{"type":"message_update","assistantMessageEvent":{"type":"text_delta","contentIndex":1,"delta":"..."}}`
2. Completion is signalled by `{"type":"agent_end"}`
3. A rejected prompt comes back as `{"type":"response","command":"prompt","success":false,"error":"..."}`

One thing to note about the output: even with `--thinking off`, Pi still emits `thinking_start`, `thinking_delta`, and `thinking_end` events when the provider extension has `reasoning: true` set. The parser ignores these correctly --- it only collects events where `assistantMessageEvent.type === "text_delta"`.

{{< alert "triangle-exclamation" >}}
If any of those names or nesting differ in your Pi version, adjust the three checks in `attachJsonlReader` / the event handler below to match what you actually saw. This is the single most likely thing to be version-skewed -- Pi is on a fast release cadence. Do not skip this step; everything downstream assumes it passed.
{{< /alert >}}

## The HTTP bridge : pi-server

The bridge is a single Node.js file. No framework -- just the built-in `http` and `child_process` modules. It lives at `/opt/pi-server/pi-server.js` in CT 110, runs as a systemd service, and listens on port 8090.

The protocol is simple :

```
POST /prompt
  Header: Authorization: Bearer <token>   (required if PI_BRIDGE_TOKEN is set)
  Body:   { "message": "...", "thinking": "off" | "low" | "medium" | "high" }
  Response (200): { "text": "...", "elapsed_ms": 4200 }
  Response (500): { "error": "...", "partial": "...any text produced before failure..." }

GET /health
  Response: { "status": "ok", "model": "qwopus/qwopus", "workdir": "/workspace", "busy": false }
```

Three things the server does that are worth stating up front, because they shaped the code :

- **One request at a time (single-flight).** The lab has exactly one coding GPU -- the RTX 5060 Ti in CT 100, running a 27B model with a tight KV cache. Two concurrent Pi processes would both stream inference into that one card and contend for VRAM. The server queues requests and runs one Pi process at a time. This isn't a throughput optimization; it's matching the bridge to the hardware it actually has.
- **A shared-secret token.** `POST /prompt` spawns a process with full `bash` access in `/workspace`. That is arbitrary code execution, and the endpoint is reachable by anything on the LAN (and Tailscale). A static bearer token is the minimum sane gate. It's not strong auth --- it's a tripwire that keeps the endpoint from being a wide-open RCE on a flat home network.
- **Errors don't masquerade as success.** If Pi exits before emitting `agent_end`, that's a failure even if some text was already produced. The server returns a 500 with whatever partial text exists, rather than handing OpenClaw half-finished work that reads as complete.

There's a 5-minute timeout, which is generous for any coding task that's going to be useful in a conversation context.

```javascript
#!/usr/bin/env node
'use strict';

const http = require('http');
const { spawn } = require('child_process');
const { StringDecoder } = require('string_decoder');

const PORT = 8090;
const DEFAULT_MODEL = 'qwopus/qwopus';
const DEFAULT_WORKDIR = '/workspace';
const TIMEOUT_MS = 300_000;                       // 5 minutes
const MAX_BODY = 1_000_000;                        // 1 MB request cap
const AUTH_TOKEN = process.env.PI_BRIDGE_TOKEN || ''; // set via systemd; empty disables auth

// --- single-flight: one Pi process at a time (one coding GPU in CT 100) -------
let inFlight = false;
const waiters = [];
function acquire() {
  return new Promise((resolve) => {
    if (!inFlight) { inFlight = true; resolve(); }
    else waiters.push(resolve);
  });
}
function release() {
  const next = waiters.shift();
  if (next) next();          // hand the slot straight to the next waiter
  else inFlight = false;
}

// --- JSONL reader: split on \n only, strip trailing \r (per Pi's RPC docs) ----
function attachJsonlReader(stream, onLine) {
  const decoder = new StringDecoder('utf8');
  let buffer = '';
  stream.on('data', (chunk) => {
    buffer += typeof chunk === 'string' ? chunk : decoder.write(chunk);
    while (true) {
      const idx = buffer.indexOf('\n');
      if (idx === -1) break;
      let line = buffer.slice(0, idx);
      buffer = buffer.slice(idx + 1);
      if (line.endsWith('\r')) line = line.slice(0, -1);
      if (line.trim()) onLine(line);
    }
  });
}

function runPrompt({ message, thinking = 'off', workdir = DEFAULT_WORKDIR, model = DEFAULT_MODEL }) {
  return new Promise((resolve, reject) => {
    const args = ['--mode', 'rpc', '--model', model, '--no-session', '--thinking', thinking];
    const pi = spawn('pi', args, { cwd: workdir, env: process.env });

    const textParts = [];
    let settled = false;
    let ended = false;        // saw a clean agent_end

    const timer = setTimeout(() => finish(new Error('timeout after 5 minutes')), TIMEOUT_MS);

    function finish(err) {
      if (settled) return;
      settled = true;
      clearTimeout(timer);
      try { pi.stdin.end(); } catch (_) {}
      // Pi should exit on stdin EOF; force-kill after a grace period so we never leak.
      const killTimer = setTimeout(() => { try { pi.kill('SIGKILL'); } catch (_) {} }, 2000);
      if (killTimer.unref) killTimer.unref();
      if (err) { err.partial = textParts.join(''); reject(err); }
      else resolve(textParts.join(''));
    }

    attachJsonlReader(pi.stdout, (line) => {
      let event;
      try { event = JSON.parse(line); } catch { return; }
      if (event.type === 'message_update') {
        const ae = event.assistantMessageEvent;
        if (ae && ae.type === 'text_delta' && typeof ae.delta === 'string') textParts.push(ae.delta);
      } else if (event.type === 'agent_end') {
        ended = true;
        finish(null);
      } else if (event.type === 'response' && event.command === 'prompt' && event.success === false) {
        finish(new Error('prompt rejected: ' + (event.error || 'unknown')));
      }
    });

    pi.stderr.on('data', (d) => process.stderr.write('[pi] ' + d));
    pi.on('error', (e) => finish(new Error('failed to spawn pi: ' + e.message)));
    pi.on('close', (code) => {
      // Closing before agent_end is a failure, even if partial text was produced.
      if (!ended) finish(new Error('pi exited (code ' + code + ') before agent_end'));
    });

    pi.stdin.write(JSON.stringify({ type: 'prompt', message }) + '\n');
  });
}

const server = http.createServer((req, res) => {
  const send = (status, body) => {
    res.writeHead(status, { 'Content-Type': 'application/json' });
    res.end(JSON.stringify(body));
  };

  if (req.method === 'GET' && req.url === '/health')
    return send(200, { status: 'ok', model: DEFAULT_MODEL, workdir: DEFAULT_WORKDIR, busy: inFlight });

  if (req.method === 'POST' && req.url === '/prompt') {
    if (AUTH_TOKEN && req.headers['authorization'] !== 'Bearer ' + AUTH_TOKEN)
      return send(401, { error: 'unauthorized' });

    let raw = '';
    let tooBig = false;
    req.on('data', (c) => {
      raw += c;
      if (raw.length > MAX_BODY) { tooBig = true; req.destroy(); }
    });
    req.on('end', async () => {
      if (tooBig) return;
      let body;
      try { body = JSON.parse(raw); } catch { return send(400, { error: 'invalid JSON' }); }
      if (!body.message) return send(400, { error: 'message required' });

      await acquire();                 // wait for the single Pi slot
      const start = Date.now();
      console.log('[' + new Date().toISOString() + '] → ' + body.message.slice(0, 100));
      try {
        const text = await runPrompt(body);
        console.log('[' + new Date().toISOString() + '] ✓ ' + (Date.now() - start) + 'ms');
        send(200, { text, elapsed_ms: Date.now() - start });
      } catch (e) {
        console.error('[' + new Date().toISOString() + '] ✗ ' + e.message);
        send(500, { error: e.message, partial: e.partial || '' });
      } finally {
        release();
      }
    });
    return;
  }

  send(404, { error: 'not found' });
});

server.listen(PORT, '0.0.0.0', () => {
  console.log('pi-server listening on :' + PORT + ' model=' + DEFAULT_MODEL + ' workdir=' + DEFAULT_WORKDIR
    + ' auth=' + (AUTH_TOKEN ? 'on' : 'off'));
});
```

## Deploying the bridge in CT 110

Create the directory and a token, then write the env file the service reads :

```bash
pct exec 110 -- mkdir -p /opt/pi-server

# Generate a shared secret and stash it where the service reads it.
pct exec 110 -- bash -c '
  TOKEN=$(openssl rand -hex 24)
  printf "PI_BRIDGE_TOKEN=%s\n" "$TOKEN" > /opt/pi-server/pi-server.env
  chmod 600 /opt/pi-server/pi-server.env
  echo "$TOKEN" > /opt/pi-server/token   # plain copy, for handing to CT 111 later
  chmod 600 /opt/pi-server/token
  echo "token: $TOKEN"
'
```

Write `pi-server.js` from pve1 (heredoc avoids the need to SSH into CT 110) :

```bash
cat > /tmp/pi-server.js << 'JSEOF'
# ... paste the server code above ...
JSEOF

pct push 110 /tmp/pi-server.js /opt/pi-server/pi-server.js
```

Create the systemd service. Note the `EnvironmentFile` line -- that's what injects the token without it ever appearing in the unit or in `ps` output :

```bash
pct exec 110 -- bash -c "cat > /etc/systemd/system/pi-server.service << 'EOF'
[Unit]
Description=Pi HTTP Bridge
After=network.target

[Service]
Type=simple
EnvironmentFile=/opt/pi-server/pi-server.env
ExecStart=/usr/bin/node /opt/pi-server/pi-server.js
WorkingDirectory=/workspace
Restart=on-failure
RestartSec=5
StandardOutput=journal
StandardError=journal

[Install]
WantedBy=multi-user.target
EOF"

pct exec 110 -- systemctl daemon-reload
pct exec 110 -- systemctl enable --now pi-server.service
pct exec 110 -- systemctl status pi-server.service --no-pager
```

Verify the health endpoint (no auth needed -- it exposes nothing and runs nothing) :

```bash
# From pve1 host -- cross-container call
curl -s http://192.168.2.133:8090/health
# {"status":"ok","model":"qwopus/qwopus","workdir":"/workspace","busy":false}
```

Test a real coding task. `/prompt` needs the token, so read it back from CT 110 and pass it as a bearer header :

```bash
TOKEN=$(pct exec 110 -- cat /opt/pi-server/token)

curl -s -X POST http://192.168.2.133:8090/prompt \
  -H "Content-Type: application/json" \
  -H "Authorization: Bearer $TOKEN" \
  -d '{"message": "Write a Python function that returns the nth Fibonacci number. Save it to /workspace/fib.py."}'

# Confirm the file landed:
pct exec 110 -- cat /workspace/fib.py
```

A request without the header should be refused -- confirm the gate works :

```bash
curl -s -o /dev/null -w '%{http_code}\n' -X POST http://192.168.2.133:8090/prompt \
  -H "Content-Type: application/json" -d '{"message":"hi"}'
# 401
```

{{< alert "lightbulb" >}}
Test from the pve1 host (not from inside CT 110) to confirm the cross-container network path works. A successful response from the host means OpenClaw in CT 111 can reach the same endpoint -- they're on the same bridge.
{{< /alert >}}

## Wiring OpenClaw to the bridge

With the bridge running, OpenClaw needs a way to call it. The mechanism is OpenClaw's plugin SDK, available since v2026.5.17 via `openclaw/plugin-sdk/tool-plugin`. The SDK compiles a TypeScript `defineToolPlugin` entry into a proper plugin package that OpenClaw can install and load.

{{< alert "triangle-exclamation" >}}
I initially tried a simpler approach: drop a TypeScript file into `~/.openclaw/extensions/` and import `ExtensionAPI` from `"openclaw"`. That API does not exist in v2026.5.27. OpenClaw's extension system requires a compiled plugin with a generated manifest.
{{< /alert >}}

### Copy the token to CT 111

The two containers don't share a filesystem, so copy the secret over and lock it down :

```bash
TOKEN=$(pct exec 110 -- cat /opt/pi-server/token)
pct exec 111 -- bash -c "umask 077 && mkdir -p /root/.openclaw && printf '%s' '$TOKEN' > /root/.openclaw/pi-bridge-token"
```

### Scaffold the plugin

```bash
pct exec 111 -- bash -c "cd /opt && openclaw plugins init pi-delegate --name 'Pi Coding Agent'"
```

### Write the tool implementation

Write the source to pve1 first, then push it into the container. The scaffold creates `src/index.ts` with an echo stub --- overwrite it using `find` to handle any filename encoding issues the scaffold may introduce :

```bash
cat > /tmp/pi-delegate-index.ts << 'TSEOF'
import { Type } from "typebox";
import { defineToolPlugin } from "openclaw/plugin-sdk/tool-plugin";
import { readFileSync } from "node:fs";

const PI_BRIDGE = "http://192.168.2.133:8090";

const TOKEN = (() => {
  try {
    return readFileSync("/root/.openclaw/pi-bridge-token", "utf8").trim();
  } catch {
    return "";
  }
})();

export default defineToolPlugin({
  id: "pi-delegate",
  name: "Pi Coding Agent",
  description: "Delegates coding and scripting tasks to the local Pi agent running Qwopus on CT 100.",
  tools: (tool) => [
    tool({
      name: "run_coding_task",
      label: "Run Coding Task",
      description:
        "Delegate a coding or scripting task to the local Pi agent. " +
        "Use for tasks that require reading or writing files, running shell commands, " +
        "or iterative code editing. Provide a complete, self-contained task description.",
      parameters: Type.Object({
        task: Type.String({
          description:
            "The coding task to execute. Be specific about file paths, " +
            "expected outputs, and any constraints.",
        }),
        thinking: Type.Optional(
          Type.Union(
            [
              Type.Literal("off"),
              Type.Literal("low"),
              Type.Literal("medium"),
              Type.Literal("high"),
            ],
            {
              description:
                "Thinking level for the coding model. Use 'off' for simple tasks, " +
                "'medium' or 'high' for complex multi-file work.",
            }
          )
        ),
      }),
      async execute({ task, thinking = "off" }) {
        const res = await fetch(`${PI_BRIDGE}/prompt`, {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            ...(TOKEN ? { Authorization: `Bearer ${TOKEN}` } : {}),
          },
          body: JSON.stringify({ message: task, thinking }),
          signal: AbortSignal.timeout(310_000),
        });
        if (!res.ok) {
          const err = await res.json().catch(() => ({ error: res.statusText }));
          throw new Error(`Pi bridge error: ${err.error}`);
        }
        const { text, elapsed_ms } = await res.json();
        return `${text}\n\n[completed in ${Math.round(elapsed_ms / 1000)}s]`;
      },
    }),
  ],
});
TSEOF

pct push 111 /tmp/pi-delegate-index.ts /tmp/pi-delegate-index.ts
pct exec 111 -- bash -c "find /opt/pi-delegate/src -name 'index.ts*' -exec cp /tmp/pi-delegate-index.ts {} \;"
```

### Build the plugin

The scaffold doesn't include `@types/node`, which is needed for `readFileSync`. Add it, then build :

```bash
pct exec 111 -- bash -c "cd /opt/pi-delegate && npm install --save-dev @types/node && npm run build"
```

### Generate the manifest and install

`openclaw plugins build` reads the compiled entry and writes the `openclaw.plugin.json` manifest that OpenClaw uses for cold discovery :

```bash
pct exec 111 -- bash -c "cd /opt/pi-delegate && openclaw plugins build --entry ./dist/index.js"
```

Before installing, remove `peerDependencies` from `package.json`. This is a required workaround for the global npm install of OpenClaw. During plugin installation, OpenClaw runs `npm install` in a staging copy of the plugin directory. With `openclaw` declared as a peerDependency, npm v7+ installs it as a full package in `node_modules`. OpenClaw's installer then tries to replace it with a symlink and fails, blocking registration. Removing the peerDep declaration lets npm skip it; the manual symlink below provides the runtime resolution.

```bash
pct exec 111 -- python3 -c "
import json
with open('/opt/pi-delegate/package.json') as f:
    d = json.load(f)
d.pop('peerDependencies', None)
with open('/opt/pi-delegate/package.json', 'w') as f:
    json.dump(d, f, indent=2)
"

# Rebuild clean without the peer dep in node_modules
pct exec 111 -- bash -c "cd /opt/pi-delegate && rm -rf node_modules && npm install && npm run build"

pct exec 111 -- bash -c "openclaw plugins install /opt/pi-delegate"
```

After install, create the openclaw symlink the installer couldn't :

```bash
pct exec 111 -- bash -c "mkdir -p /root/.openclaw/extensions/pi-delegate/node_modules && \
  ln -sf /usr/lib/node_modules/openclaw \
  /root/.openclaw/extensions/pi-delegate/node_modules/openclaw"
```

Restart the gateway and confirm the plugin is active :

```bash
pct exec 111 -- bash -c "export XDG_RUNTIME_DIR=/run/user/0 && systemctl --user restart openclaw-gateway.service"

# Should show 9 plugins including pi-delegate
pct exec 111 -- bash -c "export XDG_RUNTIME_DIR=/run/user/0 && \
  journalctl --user -u openclaw-gateway.service -n 5 --no-pager | grep 'http server'"

# Confirm the tool is registered
pct exec 111 -- openclaw plugins inspect pi-delegate
```

Expected inspect output includes `Tools: run_coding_task`.

### Add a system prompt to drive routing

Small local models won't reliably call `run_coding_task` without being told to. Add a system prompt to the Telegram channel config. The correct location is `channels.telegram.groups["*"].systemPrompt` -- not `channels.telegram.systemPrompt` (rejected by the schema) and not `agents.main.systemPrompt` (that key doesn't exist) :

```bash
pct exec 111 -- python3 -c "
import json
with open('/root/.openclaw/openclaw.json') as f:
    d = json.load(f)
d['channels']['telegram']['groups']['*']['systemPrompt'] = (
    'You are a coding and automation assistant with access to a local Pi coding agent '
    'via the run_coding_task tool. ALWAYS use run_coding_task when the user asks you '
    'to write, create, edit, save, or execute any code or script files. Never write '
    'code yourself -- delegate all file-writing and code execution tasks to '
    'run_coding_task. For purely conversational questions that do not involve creating '
    'or running code, answer directly.'
)
with open('/root/.openclaw/openclaw.json', 'w') as f:
    json.dump(d, f, indent=2)
"

pct exec 111 -- bash -c "export XDG_RUNTIME_DIR=/run/user/0 && systemctl --user restart openclaw-gateway.service"
```

## The full delegation path

With both sides wired, the complete flow for a coding task looks like this :

{{< mermaid >}}
graph TD
    User["📱 Telegram"]
    OC["CT 111 · OpenClaw<br/>192.168.2.134"]
    AMD["CT 101 · inference-amd<br/>Gemma 4 E4B<br/>192.168.2.132:8081"]
    Bridge["CT 110 · pi-server<br/>192.168.2.133:8090"]
    Pi["Pi --mode rpc<br/>(subprocess in CT 110)"]
    NV["CT 100 · inference-nvidia<br/>Qwopus3.6-27B<br/>192.168.2.131:8080"]
    WS["/workspace<br/>(CT 110 filesystem)"]

    User -->|"message"| OC
    OC -->|"conversation / routing"| AMD
    AMD -->|"tool call: run_coding_task"| OC
    OC -->|"POST /prompt + bearer token"| Bridge
    Bridge -->|"pi --mode rpc (single-flight)"| Pi
    Pi -->|"inference requests"| NV
    Pi <-->|"read / write / edit / bash"| WS
    Pi -->|"agent_end event"| Bridge
    Bridge -->|"JSON response"| OC
    OC -->|"tool result → model → reply"| User
{{< /mermaid >}}

The conversation model (Gemma 4 E4B on CT 101) handles the routing decision -- it reads the user's message and decides whether to answer directly or call `run_coding_task`. If it calls the tool, OpenClaw makes the authenticated HTTP call to the bridge. The bridge spawns Pi, which calls the coding model (Qwopus on CT 100), executes tool calls against the `/workspace` filesystem, and returns when done. The result flows back through OpenClaw's tool result chain to the model, which incorporates it into its reply, which goes back to the user's phone.

Within a single conversation, the two GPU-heavy containers don't contend : CT 101 serves the conversational turn, then CT 100 serves the coding turn, because the routing is synchronous and OpenClaw waits for the bridge before composing the reply. Across conversations, the guarantee comes from the bridge, not the routing -- the single-flight queue means CT 100 only ever runs one coding task at a time even if two messages arrive at once. The second waits its turn rather than fighting the first for VRAM.

## The path reporting problem

The end-to-end flow works. But there's a cosmetic issue worth documenting: Gemma 4 E4B consistently reports the wrong file path in its Telegram reply. When Pi writes to `/workspace/primes.py` in CT 110, Gemma tells the user the file is at `/root/.openclaw/workspace/primes.py` -- its own OpenClaw workspace, not Pi's.

The first attempt was to anchor the tool result with the correct path. The `execute` function in the pi-delegate plugin was updated to return:

```typescript
return `${text}\n\n[Task complete. Files written to /workspace on the coding agent. Completed in ${Math.round(elapsed_ms / 1000)}s.]`;
```

Gemma ignored it. The reply still cited its own workspace path.

The second option would be strengthening the system prompt further -- something like "when reporting file locations, relay the path from the tool result exactly." At 4B parameters, that kind of fine-grained instruction following is unreliable. It might work on some requests and fail on others.

The decision is to accept this as a known limitation of the conversation model. The routing is correct. Pi received the task, ran it against Qwopus, and wrote the file to `/workspace` in CT 110. The wrong path in Gemma's reply is hallucination, not a bridge bug -- the model is substituting its own frame of reference for the tool's output.

The fix, if it ever becomes a hard requirement, is switching the conversation model to something larger. Qwopus at 27B would be a better instruction-follower here. But that collapses the clean model-to-role split -- Gemma on AMD at 51 T/s for conversation, Qwopus on NVIDIA at 44 T/s for code -- and routes both workloads through a single GPU. Not worth it for a cosmetic issue.

{{< alert "lightbulb" >}}
If you're running a larger conversation model than Gemma 4 E4B, this may not be a problem for you. The path context in the tool return value is there; whether the model uses it depends on its instruction-following capability at the relevant parameter count.
{{< /alert >}}

## What's Next

Telegram mobile setup --- connecting Telegram on a phone to OpenClaw and verifying the full end-to-end path from a real message to a Pi-executed coding task and back.
