---
title: "Private Obsidian Vault Sync with GitHub"
date: 2026-02-22T00:00:00-05:00
description: "A practical walkthrough for connecting an Obsidian vault to a private GitHub repo using the Obsidian Git plugin on macOS, with a short Windows addendum."
summary: "I walk through a private GitHub repo setup, connect it to an Obsidian vault with the Obsidian Git plugin, and outline the automation settings I use to keep notes synced."
tags: ["obsidian", "git", "github", "macos", "knowledge-management"]
categories: ["Workflow"]
draft: false
---

How do I keep an Obsidian vault private while still getting reliable version control and sync across machines?

## Goal

Set up a private GitHub repository and connect it to an Obsidian vault so I can sync notes with Git, using macOS as the baseline system.

## Working assumption

I want Git, not Obsidian Sync, because I want full control over history, a backup I can own later with a private Gitea server, and it is a neat thing to try out.

## Quick preamble (Obsidian, Git, GitHub)

Obsidian is a local-first Markdown editor. A vault is just a folder on disk, so it plays nicely with Git.

Git is the version control system that tracks changes in files over time. It lets me commit, diff, and roll back.

GitHub is the hosted Git service. A private repository keeps the vault content visible only to the accounts you grant access to.

## Current approach

I treat the vault folder as the repo, keep all commits local, then rely on the Obsidian Git community plugin to handle periodic pulls and pushes to GitHub.

## Implementation notes (macOS baseline)

1. Download and install Obsidian: [Obsidian - Sharpen your thinking](https://obsidian.md/)
2. Create a new vault folder: [Create a vault](https://help.obsidian.md/vault)
3. Install Git: [Download Git](https://git-scm.com/downloads)
4. Create a private repository on GitHub: [Create a new repository](https://docs.github.com/en/repositories/creating-and-managing-repositories/creating-a-new-repository)
5. Initialize Git inside the vault and connect the GitHub remote.
6. Add a minimal `.gitignore` for Obsidian workspace noise.
7. Install and configure the Obsidian Git community plugin.
8. Test a commit, push, and pull.
9. Setup on an Android device.
10. Setup on a Windows device.

### 1. Install Obsidian

1. Download and install Obsidian from [obsidian.md](https://obsidian.md/).

### 2. Create the vault

1. Open Obsidian.
2. Create a new vault and choose a stable folder location, for example `~/Documents/Obsidian/MyVault`.
3. Add a few test notes so there is content to commit.

### 3. Install Git (macOS)

1. Run `git --version` in Terminal.
2. If Git is missing, install it using Homebrew.
3. Install Homebrew if you do not have it: [Homebrew](https://brew.sh/).
4. Run `brew install git`.

If you do not want Homebrew, the Xcode Command Line Tools also install Git with `xcode-select --install`.

### 4. Create a private GitHub repo

1. Create a new repository on GitHub.
2. Set the visibility to private.
3. Do not add a README or .gitignore yet. I want the first commit to come from the local vault.

### 5. Initialize Git in the vault and connect the remote

From the vault folder:

```bash
git init
git branch -M main
git add .
git commit -m "Initial vault"
```

Setup GitHub with a personal access token (HTTPS):

1. Go to [Personal account > Developer Settings](https://github.com/settings/tokens), Personal access token > Tokens (classic) 
2. Generate a 'new token (classic)' in GitHub with the top level`repo` scope.
3. Use the token when prompted for your password in the bash command, making sure to replace `<username>` and `<repo>` with your own:

```bash
git remote add origin https://github.com/<username>/<repo>.git
git push -u origin main
```

#### Or if you prefer, a SSH setup rather than the personal access token
I didn't try this though. Simply read it and documenting here, so mileage may vary.

1. Check for an existing key with `ls ~/.ssh`.
2. If you need a new key, run `ssh-keygen -t ed25519 -C "you@example.com"`.
3. Add the key to the agent with `ssh-add --apple-use-keychain ~/.ssh/id_ed25519`.
4. Copy the public key with `pbcopy < ~/.ssh/id_ed25519.pub`.
5. Add the key in GitHub under Settings > SSH and GPG keys.

Add the remote and push the first commit.

If you plan to use SSH:

```bash
git remote add origin git@github.com:<username>/<repo>.git
git push -u origin main
```

### 6. Add a minimal `.gitignore`

In the vault root, create a `.gitignore` file with the following:

```gitignore
.DS_Store
.obsidian/
```

This will prevent local obsidian cache from the various systems to create issues (e.g. Git Community plugin on macOS but not on Android, because it needs to use the Android Gitsync app). Add any other files you don't want syncing across devices here as you discover them.

### 7. Install and configure the Obsidian Git plugin

1. In Obsidian, open Settings.
2. Enable Community plugins.
3. Browse and install `Git`.
4. Enable the plugin.

Configuration I typically set to have a one-person simple pull of changes on opening Obsidian and commit-sync on closing Obsidian :

1. **Pull on startup** so I do not overwrite updates from another machine already committed to the repository.
2. **Auto commit-and-sync interval (minutes)** so it will auto commit-and-sync every 5 minutes.
3. **Auto commit-and-sync after stopping file edits** so it will commit and sync after editing a file not during.
4. **Commit message on manual commit** with `vault backup: {{date}}` to have a predictable commit message format that includes the timestamp when manually commiting.
5. **Commit message on auto commit and sync** with `vault backup: {{date}}` to have a predictable commit message format that includes the timestamp when the auto commit triggers.

The plugin uses your system Git, so make sure `git` works in Terminal.

### 8. Test the full loop

1. Make a note change.
2. Wait 5 minutes.
3. Confirm the commit appears in the private repo.

From there, you can make a change to the file on github.com, close and start Obsidian to do a pull, and validate the full round trip by checking to change is there.

{{< mermaid >}}
flowchart LR
  O["Obsidian vault (macOS)"] -->|commit| G["Git repo (local)"]
  G -->|push| GH["GitHub private repo"]
  GH -->|pull| G
  G -->|update working tree| O
{{< /mermaid >}}

### 9. Setup on Android
This section relies on the Obsidian Git community plugin developer’s recommendation to use [GitSync for Android](https://play.google.com/store/apps/details?id=com.viscouspot.gitsync) and the walkthrough from [ViscousPotential](https://viscouspotenti.al/posts/gitsync-all-devices-tutorial).

Before proceeding, make sure your `.gitignore` includes `.obsidian/`. Syncing mobile `.obsidian` settings into the desktop vault usually creates plugin and config conflicts between desktop and mobile.

1. Install Obsidian for Android.
2. Install GitSync for Android.
3. Open GitSync and run the onboarding:
   1. Select “Let’s Go” on the welcome screen.
   2. Accept notifications permissions so you can see background sync status.
   3. Accept “all files access” permission so the app can read and write the vault.
4. Authenticate with GitHub:
   1. Choose the GitHub OAuth option.
   2. Sign in in the browser and approve access.
   3. Fill in your author details (name and email) when prompted.
5. Clone the repository:
   1. Select the repository from the list.
   2. Create a new empty folder on your device (separate from any existing vault contents).
   3. Choose that folder as the clone destination.
6. Open Obsidian and use “Open folder as vault” to open the cloned folder.
7. If you have the Obsidian Git plugin installed on mobile, disable it for this device to avoid conflicts with GitSync.
8. Configure background sync in GitSync:
   1. Enable the accessibility service (used to detect app open/close).
   2. Add Obsidian to the monitored app list.
   3. Enable “sync on app opened” and/or “sync on app closed”.
   4. Optionally enable scheduled sync (as often as every 15 minutes).

### 10. Setup on Windows

1. Install Git for Windows and confirm `git --version` works in PowerShell or Git Bash.
2. Create a folder for the vault, e.g. `C:\Obsidian\MyVault`
3. Initialize the repository from Powershell in the vault folder: 
```Powershell
git init
git branch -M main
git add .
git commit -m "Initial vault"
```
4. Use SSH to setup the connection with Github.com
   1. Generate an SSH Key: From Powershell `ssh-keygen -t ed25519 -C "your_email@example.com"` (Press Enter a few times to accept defaults).
   2. Copy the contents of the .pub file created in your C:\Users\YourName\.ssh folder
   3. Go to Github.com settings > SSH and GPG keys > New Key, past the contents of the .pub file created and confirm adding the SSH key
5. Complete the initial Git push, types `yes` when asked if you want to continue with the SSH connection
```Powershell
git remote add origin git@github.com:<username>/<repo>.git
git push -u origin main
```
6. The Obsidian Git plugin setup is the same.
7. I've read about setting `core.autocrlf` to `true` in the Git settings on Windows, so that it avoids line ending noise when collaborating with macOS. I haven't set this and haven't noticed an issue yet.

{{< mermaid >}}
flowchart TB
  subgraph macOS
    M[Obsidian vault] -->|commit| MG["Git repo (local)"]
  end
  subgraph Android
    A[Obsidian vault] -->|sync via GitSync| AG["Git repo (local)"]
  end
  subgraph Windows
    W[Obsidian vault] -->|commit| WG["Git repo (local)"]
  end

  MG -->|push| GH[GitHub private repo]
  AG -->|push| GH
  WG -->|push| GH
  GH -->|pull| MG
  GH -->|pull| AG
  GH -->|pull| WG
{{< /mermaid >}}


## Practical pilot

I test the setup in this order:

1. Add a test note to the vault.
2. Push the first commit from Terminal to confirm the remote works.
3. Confirm the change on the Github.com repo.
4. Add a new line to the test note.
5. Enable Obsidian Git and run a manual commit from inside Obsidian.
6. Confirm the change on the Github.com repo.
7. Enable auto-pull and auto-push on Obsidian on macOS and Android once the manual path is stable.

## Troubleshooting

If the sync starts behaving oddly, I treat it like a clean re-clone problem instead of trying to patch it in place.

Common issues and the fastest fixes:

1. **Plugin settings disappear or keep changing**  
   This usually means `.obsidian/` got synced. Add `.obsidian/` to `.gitignore`, then remove the tracked folder from Git and re-clone on mobile.
   ```bash
   git rm -r --cached .obsidian
   git commit -m "Stop tracking Obsidian settings"
   git push
   ```
2. **GitSync is not auto-syncing**  
   Re-check that the accessibility service is enabled, Obsidian is added to the app list, and “sync on app opened/closed” is turned on.
3. **Clone/auth problems**  
   Re-run OAuth inside GitSync and confirm the repo is visible under your GitHub account.

If you are still stuck, back up your notes, delete the mobile vault folder, uninstall Obsidian and GitSync, then set up again from a clean clone. That path is usually faster than debugging a half-broken state.

## Risk or limitation

The biggest risk is accidentally committing sensitive data. A private repo is still a repo, so I treat the vault like production and avoid API keys, client data, or secrets. If I need secrets, I keep them outside the vault.

Large binary attachments can also bloat the repo. If I store a lot of images or PDFs, I consider Git LFS or a separate attachments folder that is not tracked.
