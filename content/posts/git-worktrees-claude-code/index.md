---
title: "Git Worktrees and Claude Code: Why My Local Files Didn't Update"
date: 2026-04-18T12:00:00-04:00
description: "What git worktrees are, how Claude Code uses them by default, and why that meant my local files didn't update until I ran git pull."
summary: "While creating a blog post with Claude Code, I noticed the changes were on GitHub but not visible in my local files. The reason was git worktrees -- a Git feature that lets Claude work in isolation without touching your local working directory. Here is what happened and what the trade-offs are."
tags: ["git", "claude-code", "workflow", "knowledge-management"]
categories: ["Workflow"]
draft: false
---

While creating the [Android Vault Sync update post](https://bil.arikan.ca/posts/android-vault-sync-termux/) with Claude Code, I noticed something odd. The changes landed on GitHub, the deployment ran, the post was live -- but when I looked at my local repo, the files weren't there. No new post, no updated `CLAUDE.md`, no `.gitignore` change.

Why?

## Goal

Understand how Claude Code uses git worktrees to make and push changes, why that means local files don't update automatically, and what the trade-offs are compared to making changes directly in the local repo.

## What a git worktree is

Most of the time, a git repository has one working directory -- the folder on disk where you see and edit files. A git worktree is a way to check out a second (or third, or fourth) branch from the same repository into a completely separate folder, without cloning the repo again.

Both working directories share the same underlying git history and object store. They just point at different branches and live at different paths on disk.

```
/my-project/              ← main working directory (branch: main)
/my-project/.claude/
  worktrees/
    vibrant-mclean-4783f7/  ← worktree (branch: claude/vibrant-mclean-4783f7)
```

Changes made in the worktree directory don't appear in the main working directory, and vice versa. They are isolated by branch.

## How Claude Code uses worktrees

Claude Code creates a git worktree by default when it starts a session on a project. In this case it created one at:

```
.claude/worktrees/vibrant-mclean-4783f7/
```

On a branch named `claude/vibrant-mclean-4783f7`. Every file edit, every commit I made during that session happened inside that worktree directory, on that branch -- not in the main repo working directory.

{{< mermaid >}}
flowchart LR
  subgraph Local machine
    A["Main working dir\n(branch: main)"]
    B["Claude worktree\n(branch: claude/vibrant-mclean-4783f7)"]
  end
  GH["GitHub remote\n(origin/main)"]

  A -->|git push| GH
  B -->|git push origin claude/...branch...:main| GH
  GH -->|git pull| A
{{< /mermaid >}}

## The push and why local didn't update

When the work was done, the commit was pushed from the worktree branch directly to `main` on GitHub:

```bash
git push origin claude/vibrant-mclean-4783f7:main
```

This is the `source:destination` refspec form -- push the local worktree branch to the remote `main` branch. GitHub received the commits and the deployment ran. But the local `main` branch in my original working directory was never touched. It was still pointing at the old commit.

This is correct git behaviour. A `git push` updates the remote. It does not update any other local branch. To bring the local `main` forward, an explicit `git pull` is needed:

```bash
git pull origin main
```

That fast-forwarded the local branch to match the remote, and all the files appeared.

{{< mermaid >}}
sequenceDiagram
  participant W as Claude worktree
  participant GH as GitHub (remote main)
  participant L as Local main branch

  W->>W: Edit files, commit
  W->>GH: git push origin worktree-branch:main
  Note over GH: Remote main updated ✓
  Note over L: Local main still at old commit ✗
  L->>GH: git pull origin main
  Note over L: Local main now up to date ✓
{{< /mermaid >}}

One caveat. `git pull` only fast-forwards cleanly if the local `main` has not moved since Claude started. If I have committed directly on local `main` during the session, the two branches diverge and a plain `git pull` either fails or creates a merge commit. In that case, `git pull --rebase origin main` replays the local commits on top of the remote -- which is what I actually had to do the second time this happened.

## Why Claude Code takes this approach

The worktree model is a deliberate isolation strategy. The alternative -- Claude making changes directly in your main working directory -- has real risks.

If you have uncommitted changes in your working directory when Claude starts, a direct edit could overwrite or conflict with them. If Claude stages files, it might pick up files you hadn't intended to include. If something goes wrong mid-task, your working directory is now in a mixed state.

Working in a worktree on a separate branch sidesteps all of that. Your local working directory is untouched. You can review what Claude did, compare branches, and decide whether to bring it forward before it lands in your working files.

## Comparing the two approaches

| | Worktree approach | Direct local approach |
|---|---|---|
| Your local files | Unchanged until you `git pull` | Updated immediately |
| Your uncommitted work | Safe -- worktree is isolated | At risk if Claude stages or commits carelessly |
| Review before local update | Yes -- you can inspect the branch first | No -- changes are already in your working dir |
| Mental model complexity | Higher -- two working directories to track | Lower -- one working directory |
| Submodule setup | Needed separately in each worktree | Already initialized |
| Disk space | Two copies of working files | One copy |
| Cleanup after session | Worktree dir and branch linger; needs `.claude/` in `.gitignore` | None |

The worktree approach favours safety and reviewability. The direct approach favours immediacy and simplicity. For a solo developer working on a local blog with no uncommitted changes at risk, either works. For a shared repo or a session where you have work in progress, the worktree approach is the safer default.

## Cleanup after the session

Pulling changes into local `main` is only part of the picture. The worktree directory, its branch, and the worktree registration all linger after the push. Leaving them in place is not dangerous, but they create two ongoing issues: persistent `git status` noise, and the risk of a stray `git add -A` in the main working directory staging the worktree as a gitlink.

That second risk hit me directly. A later commit in the main working directory swept up `.claude/worktrees/vibrant-mclean-4783f7` as a mode-160000 gitlink -- git saw the `.git` file inside the worktree and registered it as a submodule-style pointer. Nothing in `.gitmodules` matched it, so it was a dangling reference in pushed history. Harmless, but not clean.

The fix is four steps, once per session:

1. Add `.claude/` to `.gitignore` so future sessions cannot leak into a commit.
2. If already committed, remove the stray gitlink: `git rm --cached .claude/worktrees/<name>`.
3. Unregister the worktree: `git worktree remove --force .claude/worktrees/<name>`.
4. Delete the leftover branch: `git branch -D claude/<name>`.

With those done, `git worktree list` shows only the main checkout and `git status` is clean again.

## What changed in this session

The submodule point is worth flagging from direct experience. The Congo theme is a git submodule. In the main repo it was already initialized. In Claude's worktree, it was not -- running `hugo server` in the worktree failed until `git submodule update --init --recursive` was run inside it. That is a one-time cost per worktree, and the `CLAUDE.md` now documents it.

The other concrete outcome: the end-of-session checklist. Any Claude Code task that pushes to `main` expects a `git pull` in the main working directory afterward, then the worktree cleanup above. If the local branch has moved during the session, use `git pull --rebase origin main`. It is not a failure or a sync problem -- it is just how the model works.

## Next step

I want to test whether Claude Code can be configured to push to a feature branch and open a pull request instead of pushing directly to `main`. That would add a review step before changes land, which could be a useful default for larger content changes or any post that touches config files.
