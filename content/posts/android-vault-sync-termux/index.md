---
title: "Android Vault Sync Update: Replacing GitSync with Termux"
date: 2026-04-18T00:00:00-04:00
description: "Why I replaced GitSync with Termux for Android Obsidian sync, and the setup that fixed the index corruption problem."
summary: "GitSync worked reliably for editing existing notes, but adding a new note triggered an index corruption error every time. This is a follow-up to my original vault sync post, documenting the switch to Termux and why the underlying architecture difference matters."
tags: ["obsidian", "git", "github", "android", "termux", "knowledge-management"]
categories: ["Workflow"]
draft: false
---

This is a follow-up to [Private Obsidian Vault Sync with GitHub](https://bil.arikan.ca/posts/obsidian-private-github-sync/). The macOS and Windows setup from that post still stands. The Android section does not.

## What broke

The GitSync setup worked reliably for edits to existing notes. Adding a new note was a different story. GitSync would report `repository index corrupted` after the sync — even though checking GitHub confirmed the commit had landed successfully.

The distinction is the diagnostic: modifying a tracked file only requires updating an existing entry in Git's index. Adding a new file requires Git to write a new entry into the index binary. On Android shared storage, GitSync isn't getting the atomic write it needs for that operation, so the local index ends up in an inconsistent state after every new note.

{{< mermaid >}}
sequenceDiagram
  participant O as Obsidian
  participant FS as Android shared storage
  participant GS as GitSync
  participant GI as Git index
  participant GH as GitHub

  O->>FS: Write new note file
  GS->>GI: Attempt atomic index write (new entry)
  Note over GI,FS: Filesystem does not guarantee<br/>atomic write on shared storage
  GI-->>GS: Index written non-atomically
  GS->>GH: Push succeeds (data reaches GitHub)
  GI--xGS: Local index now inconsistent
  GS-->>O: ❌ "repository index corrupted"
{{< /mermaid >}}

The data was never actually lost. The push succeeded. But the local index was corrupted, and GitSync would refuse to operate cleanly until the index was rebuilt. That's a friction tax I didn't want to pay indefinitely.

## What I switched to

Termux. It's a terminal emulator that runs a real Linux userspace on Android without requiring root. Git inside Termux writes to the index the way Git expects, which means the corruption problem goes away entirely.

The trade-off is that sync is no longer fully automatic out of the box — you run a pull or push from Termux rather than having an app do it in the background. For my workflow that's acceptable. I'll revisit scheduled sync via `cronie` later if I miss the automation.

## Setup

### 1. Install Termux

Install [Termux from F-Droid](https://f-droid.org/packages/com.termux/), not the Play Store. The Play Store version is unmaintained.

### 2. Initial package setup

```bash
pkg update && pkg upgrade
pkg install git openssh
```

### 3. Grant storage access

```bash
termux-setup-storage
```

Approve the permission dialog. After that, your Android storage is accessible at `~/storage/shared/`.

### 4. Configure Git

```bash
git config --global user.name "Your Name"
git config --global user.email "your@email.com"
```

### 5. Set up SSH for GitHub

```bash
ssh-keygen -t ed25519 -C "your@email.com"
```

Accept the defaults. Then get the public key:

```bash
cat ~/.ssh/id_ed25519.pub
```

The output you need starts with `ssh-ed25519` followed by a long string, then your email — all on one line. That's the key. Go to **GitHub → Settings → SSH and GPG keys → New SSH key** and paste it in.

One thing worth noting: `ssh-keygen` prints a fingerprint during key generation that looks like `SHA256:abc123... you@email.com`. That is not the key. If you paste that into GitHub it will tell you the format is invalid. Run `cat` on the `.pub` file to get the actual key.

Test the connection:

```bash
ssh -T git@github.com
```

You should see a greeting with your GitHub username.

### 6. Connect to the existing vault repo

Navigate to the vault folder and switch the remote to SSH:

```bash
cd ~/storage/shared/Obsidian/Obsidian-vault-main
git config --global --add safe.directory /storage/emulated/0/Obsidian/Obsidian-vault-main
git remote set-url origin git@github.com:bilarikan/Obsidian-vault-main.git
```

The `safe.directory` line is required. Git's ownership check flags repos on Android shared storage because the folder's user ID doesn't match the Termux process user ID. This is a security feature, not a bug, and the one-time config exception is the intended resolution.

Verify the remote:

```bash
git remote -v
```

You should see `git@github.com:bilarikan/Obsidian-vault-main.git` for both fetch and push.

Test a pull:

```bash
git pull
```

### 7. Daily workflow

Open Termux, navigate to the vault, pull before editing and push after:

```bash
cd ~/storage/shared/Obsidian/Obsidian-vault-main
git pull
```

After editing in Obsidian:

```bash
git add .
git commit -m "vault backup: $(date '+%Y-%m-%d %H:%M')"
git push
```

If you want to reduce the typing, here's the whole pull-stage-commit-push cycle as a single pasteable command:

```bash
cd ~/storage/shared/Obsidian/Obsidian-vault-main && \
git pull --rebase && \
git add -A && \
(git diff --cached --quiet || git commit -m "vault sync: $(date '+%Y-%m-%d %H:%M')") && \
git push
```

A few deliberate choices in here worth unpacking.

`git add -A` instead of `git add .` ensures deletions get staged — if you removed a note, you want that reflected on every device. The `--quiet ||` conditional on the commit means the command won't error out if you open Obsidian, change nothing, and run it anyway. `--rebase` on the pull keeps your history linear instead of adding a merge commit every time you sync from a second device. And the `&&` chaining means the whole thing stops and surfaces an error if any step fails, so a bad pull won't let you push on top of a conflict.

I may wrap this into a short shell script to reduce the typing overhead further.

It's also worth being honest about what this isn't. "Sync" implies two-way reconciliation — the Dropbox or iCloud model where changes on both ends get merged automatically. Git doesn't do that. What `git pull` actually does is `fetch` + `rebase` (or `merge`), which means if two devices have edited the same file, Git will stop and ask you to resolve the conflict manually before it proceeds.

For a solo vault where you're disciplined about finishing on one device before picking up on another, that scenario is unlikely. But it's the ceiling to know about before you hit it.

If you edit your vault on two devices before syncing, you may run into merge conflicts. In that case, reconcile the changes manually on your workstation first, then run the following in Termux on Android to reset the local repository to match the remote:

```bash
git fetch origin && git reset --hard origin/main
```

## What this replaces

Section 9 of the original post (GitSync setup) is superseded by this. Everything else in that post remains current.

The short version of why: GitSync wraps Git in an Android app context and inherits the filesystem atomicity constraints of Android shared storage. Termux runs Git in a proper Linux userspace and doesn't have that problem. The corruption issue is architectural, not a GitSync bug to wait out.

## Updated Android architecture

Obsidian and Termux both point at the same vault folder on shared storage. Obsidian handles the notes. Termux handles the Git operations. No third-party sync app in the middle.

{{< mermaid >}}
flowchart LR
  O["Obsidian (Android)"] -->|reads and writes vault files| S["Shared storage"]
  T["Termux (Git)"] -->|git pull / git push| GH["GitHub private repo"]
  S -->|same folder| T
{{< /mermaid >}}

And for the full picture across all three devices — replacing the diagram in the original post:

{{< mermaid >}}
flowchart TB
  subgraph macOS
    M["Obsidian (Git plugin)"] -->|commit| MG["Git repo (local)"]
  end
  subgraph Android
    A["Obsidian (notes only)"] -->|reads/writes files| S["Shared storage"]
    T["Termux (Git)"] <-->|git pull / push| S
  end
  subgraph Windows
    W["Obsidian (Git plugin)"] -->|commit| WG["Git repo (local)"]
  end

  MG -->|push| GH["GitHub private repo"]
  T  -->|push| GH
  WG -->|push| GH
  GH -->|pull| MG
  GH -->|pull| T
  GH -->|pull| WG
{{< /mermaid >}}
