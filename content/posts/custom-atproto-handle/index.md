---
title: "Setting up a custom ATProto handle with a domain you already own"
date: 2026-05-18
description: "How I moved from @bilarikan.bsky.social to @bil.arikan.ca across Bluesky and Tangled --- including two failed attempts and the fix that worked."
tags: ["atproto", "bluesky", "tangled", "dns", "hugo", "indieweb"]
categories: ["experiments"]
draft: false
---

I already owned `arikan.ca`. I was already on Bluesky as `@bilarikan.bsky.social` and on Gander as `@bil.gander.social`. I was also starting to look at [Tangled](https://tangled.sh) as a GitHub alternative --- it runs on ATProto for its social layer, which meant sorting out my identity there was part of the same problem. The question I wanted to answer : can I consolidate those into a single identity I actually control, anchored to my own domain?

## Goal

Set `@bil.arikan.ca` as my canonical ATProto handle --- one identity that works on Bluesky, Tangled, and any other ATProto-based platform, without depending on any platform's subdomain.

## Working assumption

ATProto uses a DID (Decentralized Identifier) as the stable anchor under every handle. The handle is just a human-readable alias that resolves back to the DID. If I can prove I own `bil.arikan.ca`, any ATProto app will accept it as my handle. Ownership proof is either a DNS TXT record or a `.well-known` file served over HTTPS.

## Prerequisites

- A domain you control with DNS access (in this case : Namecheap managing `arikan.ca`)
- An existing Bluesky account to get your DID from
- Optional but useful : a GitHub Pages site already serving from that subdomain

In my case, `bil.arikan.ca` was already a CNAME pointing to `bilarikan.github.io` --- my Hugo/Congo blog. That turned out to be relevant.

## Implementation

### Step 1 : Get your DID from Bluesky

In Bluesky, go to **Settings → Account → Handle → I have my own domain**. Enter `bil.arikan.ca`. Bluesky generates a verification string in the format `did=did:plc:xxxxxxxxxx`. Copy it. This is your DID --- it is public by design and contains no personal information.

### Step 2 : First attempt --- DNS TXT record

The standard method is a DNS TXT record. In Namecheap Advanced DNS, I added :

| Field | Value |
|---|---|
| Type | TXT |
| Host | `_atproto.bil` |
| Value | `did=did:plc:gw27fma2jgn2jxpei7bmky53` |
| TTL | Automatic |

The subdomain host field is the non-obvious part. Bluesky's UI shows `_atproto` as the host regardless of whether you are setting a root domain or subdomain handle. The note below the form says the record should resolve at `_atproto.bil.arikan.ca` --- that is the accurate instruction. In Namecheap the host field needs to be `_atproto.bil`, not just `_atproto`.

I confirmed propagation via dnschecker.org. Green checkmarks globally. Went back to Bluesky, hit **Verify DNS Record** --- and got "Failed to verify handle. Please try again."

### Step 3 : Diagnosing the failure

The DNS record was correct. The failure might have been a caching issue on Bluesky's verifier side or some complexity in my DNS records for arikan.ca. Rather than waiting it out, I switched to the second verification method.

### Step 4 : The `.well-known` file approach

ATProto supports a second verification path : serve a plain text file at `https://<your-handle>/.well-known/atproto-did` containing only your DID (no `did=` prefix, just the raw DID string).

Since `bil.arikan.ca` already serves my Hugo site via GitHub Pages, I created the file in my repo. First attempt : I put it directly at `.well-known/atproto-did` in the repo root.

That produced a 404 at `https://bil.arikan.ca/.well-known/atproto-did`.

The reason : Hugo does not pass through files from the repo root. It only serves what it builds into `public/`. Files outside `static/` are invisible to the deployed site.

### Step 5 : The fix --- `static/` folder

In Hugo, anything placed in `static/` is copied as-is to the build output root. The correct path is :

```
static/.well-known/atproto-did
```

File contents --- one line, no trailing whitespace :

```
did:plc:gw27fma2jgn2jxpei7bmky53
```

After committing and waiting for the GitHub Actions build to complete, `https://bil.arikan.ca/.well-known/atproto-did` returned the DID correctly.

Back in Bluesky, switched to the **No DNS Panel** tab, hit Verify --- confirmed immediately. Handle updated to `@bil.arikan.ca`.

### Step 6 : Tangled login

Tangled uses ATProto for authentication. At the login screen I entered `@bil.arikan.ca` as my handle and used my Bluesky credentials. Tangled resolved the DID from the `.well-known` file, authenticated via the same identity layer, and I was in --- no separate account creation needed.

## What changed

> **Outcome**
> - [x] `@bil.arikan.ca` set as Bluesky handle
> - [x] `@bilarikan.bsky.social` automatically reserved (does not expire)
> - [x] Tangled account authenticated via the same ATProto identity
> - [x] `.well-known/atproto-did` serving correctly from Hugo static folder

## Troubleshooting notes

Two things that tripped me up, documented here for the next iteration :

1. **Subdomain TXT host field** --- Bluesky's UI says `_atproto` but for a subdomain handle you need `_atproto.<subdomain>` in your registrar. In Namecheap that means the Host field is `_atproto.bil`.

2. **Hugo ignores repo root files** --- placing `.well-known/atproto-did` at the repo root does nothing. It needs to be under `static/` so Hugo copies it into the build output. Same rule applies to `robots.txt`, `favicon.ico`, or any file that needs to live at a specific path without Hugo processing it.

## A note on the DID being public

The DID is visible to anyone looking at your Bluesky profile already. Committing it to a public GitHub repo is not a privacy concern --- it is the intended mechanism. It maps to your account but does not grant access to it. Think of it as a phone number in a public directory, not a password. This was a concern for me initially, later calmed when learning about how ATprotocol uses did numbers.

## Flow summary

{{< mermaid >}}
flowchart TD
    A["Own a domain<br/>arikan.ca"] --> B["Get DID from<br/>Bluesky settings"]
    B --> C{"Choose verification<br/>method"}
    C -->|DNS TXT| D["Add _atproto.bil TXT<br/>record in Namecheap"]
    C -->|Well-known file| E["Create static/.well-known/atproto-did<br/>in Hugo repo"]
    D --> F["Verify in Bluesky<br/>DNS Panel tab"]
    E --> G["Verify in Bluesky<br/>No DNS Panel tab"]
    F --> H["@bil.arikan.ca<br/>confirmed"]
    G --> H
    H --> I["Log into Tangled<br/>with same handle + credentials"]
{{< /mermaid >}}

## Next experiment

Now that `@bil.arikan.ca` is the canonical identity, the next step is pushing a public repo to Tangled and observing how the social layer behaves in practice --- stars, follows, the timeline. The goal is to get a firsthand read on whether the ATProto-native collaboration model changes anything about how open source work feels, or whether it is just GitHub with a different URL.

## One more thing to watch : Gander.social

I am genuinely looking forward to Gander.social adding custom domain handle support. Right now I am `@bil.gander.social` there, and the same `.well-known` approach should work once they open it up.

The part I have not figured out yet : I currently have a Bluesky-issued DID and presumably a separate Gander-issued DID. If both platforms eventually resolve `bil.arikan.ca`, which DID does the `.well-known` file point to? One file, one DID --- that is going to require some thought. For now I am leaving it as an open question and will revisit when Gander flips the switch.
