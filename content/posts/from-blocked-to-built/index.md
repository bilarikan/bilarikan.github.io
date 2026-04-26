---
title: "From blocked to built : decomposing a stuck project with human + AI collaboration"
date: 2026-04-26
description: A training adaptation project had been stalled for months. No owner, no resources, a 80-hour content library with no clear path to reuse. Here is the decomposition approach I used to move from blocked to a stakeholder-validated proposal in 7 days.
tags:
  - ai
  - instructional-design
  - prompt-engineering
  - human-ai-collaboration
  - learning-design
categories:
  - experiments
draft: false
---

A content adaptation project had been stalled for months. Existing material existed, but no team had a clear mandate to adapt it, the source content's training modality was wrong for the target audience, and the resourcing case was too thin to justify a traditional approach. The guiding question I was working with : **can a single practitioner move a stuck, multi-stakeholder project to a validated proposal using AI-assisted work decomposition --- and if so, what does that actually look like?**

## Goal

Test whether a structured human + AI task decomposition approach could compress both active work hours and calendar time on a complex learning content project --- without cutting the corners that matter (stakeholder alignment, SME review, evidence-based decisions).

## The situation

The project was a training adaptation : take an existing ~80-hour internal colleague-facing, instructor-led training training programme and convert it into something a partner channel could use for Tier 1 support. The business case was real. The source content existed. The gap was everywhere else.

Analyse all of this. Recontextualise it for a different audience, different learning objectives, a different modality, and different expected outcomes. Easy, right?

```
source-training/
├── 01 - Support Process/
│   ├── Support Process - Core.pptx               # 60+ slides, group activities, classroom scenario
│   ├── Support Process - Core.pdf
│   └── Error Reference Guide.pdf
├── 02 - System Configuration/
│   ├── System Configuration - Core.pptx          # Account setup, company configuration, initial data
│   ├── System Configuration - Core.pdf
│   └── data-import-template.csv
├── 03 - Transaction Processing/
│   ├── Transaction Processing.pptx               # Payments, corrections, reconciliation
│   ├── Transaction Processing.pdf
│   ├── Transactions - Trainer Guide.docx
│   ├── Transactions - Delegate Workbook.docx
│   ├── Financial Operations - Trainer Guide.docx
│   └── Financial Operations - Delegate Workbook.docx
├── 04 - Purchasing/
│   ├── Purchasing.pptx                           # Purchasing workflow, approvals
│   ├── Purchasing.pdf
│   ├── purchasing-transaction-definitions.csv
│   └── items-import-template.csv
├── 05 - Sales Process/
│   ├── Sales Process.pptx                        # Order management, workflow steps
│   ├── Sales Process.pdf
│   └── sales-transaction-definitions.csv
├── 06 - Compliance & Regulatory/
│   ├── Compliance - Introduction.pptx
│   ├── Compliance - Advanced.pptx                # Advanced configuration, troubleshooting
│   ├── Compliance - Introduction.pdf
│   └── Compliance - Advanced.pdf
├── 07 - Asset Management/
│   ├── Asset Management.pptx
│   ├── Asset Management.pdf
│   └── Asset Management - Partner Session.pptx   # Separate partner-facing session
├── 08 - Reconciliation/
│   ├── Reconciliation.pptx                       # Reconciliation scenarios
│   ├── Reconciliation.pdf
│   ├── Reconciliation Troubleshooting.pptx       # ← internal process content mixed in
│   └── Reconciliation Troubleshooting.pdf
├── 09 - Inventory Management/                    # ⚠ WIP — two partial versions
│   ├── Inventory - Cycle 1.pptx
│   ├── Inventory - Cycle 1.pdf
│   └── WIP/
│       └── Inventory - Detailed Reporting.pptx
├── 10 - Reporting & Analytics/
│   ├── Reporting & Analytics.pptx                # Report reconciliation, diagnostic framework
│   └── Reporting & Analytics.pdf
├── 11 - Vertical Add-ons/
│   ├── Vertical Add-ons.pptx                     # Niche vertical modules, no current partner coverage
│   ├── Vertical Add-ons.pdf
│   └── Vertical Add-ons Workflow.pdf
├── 12 - Advanced Features/
│   ├── Advanced Features.pptx                    # Optional modules, overview only
│   └── Advanced Features.pdf
└── 13 - Platform & Access/
    ├── Platform & Access.pptx                    # Permissions, login, portal access
    └── Platform & Access.pdf

13 modules · ~80 hours of ILT content · built for internal colleagues in a classroom
```

A conventional approach would have needed : 
- a senior learning designer reviewing ~80 hours of source material, 
- a junior designer processing modules, 
- subject matter expert time for validation, 
- strategy and stakeholder management, 
- and 3--4 review cycles adding weeks of elapsed time. 
Rough estimate : 170--230 active hours across 4--5 people over 6--10 weeks. That resourcing was not available. It probably was not going to be.

The project had also stalled partly because every decision depended on a prior decision. Content ownership was unresolved. Format was unresolved. The target audience knowledge baseline had never been documented. Waiting for those answers in sequence was the same as not starting.

## Working assumption

The shift I was testing is not "use AI to do it faster." It is a different framing entirely :

> **AI generates. The practitioner judges.**
> Each stage produces one concrete, reviewable artifact --- not one-shot work-slop draft someone has to take hours to understand and turn into something else, but a working final proof-of-concept a stakeholder can react to on specific points.

This is different from using AI as a general-purpose assistant. A general-purpose assistant works when the problem is well-specified. When the problem is ambiguous, multi-stakeholder, and requires sequential reasoning from incomplete inputs, the model needs structure. Decomposition of the problem into stages where AI will generate and the human can apply judgment and embed business intent along the way, provides that structure.

The secondary assumption : **working assumptions are a project management tool, not a sign-off substitute.** When the people who own critical decisions are unlikely to engage until they have something concrete to react to, you document the assumptions governing each phase explicitly --- state them, state the consequence if they are wrong, and state what specific input would override them. Then you proceed. Silence becomes acceptance. A targeted correction becomes easy.

## The approach --- 7 stages, 7 artifacts

Each stage ran in a fresh session with a purpose-written prompt. Each produced one markdown artifact. Each artifact was the explicit input to the next stage.

{{< mermaid >}}
flowchart TD
    A["Stage 1<br/>Situation Analysis<br/>What exists, why it stalled,<br/>what the adaptation gap is"] --> B["Stage 2<br/>Plan of Action<br/>Phased structure with output<br/>definitions, not generic WBS"]
    B --> C["Stage 3<br/>Working Assumptions<br/>4 explicit assumptions with<br/>consequences + override conditions"]
    C --> D["Stage 4<br/>Content Triage Matrix<br/>13 source modules scored<br/>against 4 criteria"]
    D --> E["Stage 5<br/>Triage Summary<br/>Narrative patterns the matrix<br/>alone doesn't surface"]
    E --> F["Stage 6<br/>Programme Outline<br/>Two audience-specific versions<br/>grounded in triage findings"]
    F --> G["Stage 7<br/>Analysis & Recommendations<br/>Stakeholder-facing synthesis<br/>with named decision options"]
{{< /mermaid >}}

**Stage 1 --- Situation Analysis.** Feed in the programme documentation, the SME review, and the kick-off materials. The model reads them and produces structured findings across five areas : original intent, why it broke down, what exists, the adaptation gap, open questions. The practitioner validates, corrects, and redirects. The hard constraint built into the prompt : *do not suggest a plan yet. Understanding only.*

```
Read all attached documents in full before writing anything.

Produce a structured analysis covering five areas:
  1. ORIGINAL INTENT — what the programme was supposed to accomplish and for whom
  2. WHY IT STALLED — specific reasons, broken out by resourcing, organisational,
     and content/format issues
  3. WHAT EXISTS — specific materials that could be reused, named precisely
  4. THE ADAPTATION GAP — distance between what exists and what a partner-ready
     version needs
  5. OPEN QUESTIONS — what is unclear or contradictory and cannot be resolved
     from the documents alone

Do not suggest a plan, outline, or approach. This step is understanding only.
If you name a finding, name the document and section it came from.

Before writing, confirm: (1) you have read all attached documents, (2) the date
you will use in the output filename. Do not proceed until I reply "go".
```

**Stage 2 --- Plan of Action.** The phases are pre-specified by the practitioner (me), with the output definition for each phase stated explicitly. The model writes the rationale and scopes the outputs based on what the situation analysis found --- not from standard project templates. This matters because the plan needs to be grounded in the specific constraints of this project, not in how a generic project is supposed to run.

```
Read the situation analysis before writing anything. The plan must be grounded
in the specific findings of that document — not in general project conventions.

Produce a plan with the phase structure below. The phases are pre-specified.
Write the rationale and output definition for each — not the phases themselves.

  Phase 0 — Working Assumptions (document before any content analysis begins)
  Phase 1a — Content Triage (score all source modules against four criteria)
  Phase 1b — Programme Outline (topic-area shape drawn from triage findings)
  Phase 2 — PoC Module Selection and Scope Lock
  Phase 3 — Adaptation Methodology, then PoC Content

For each phase: what it does, why it comes in this position, what the output is,
and the dependency on the prior phase that must be respected.

Add a sequencing section. Note explicitly: if the content owner issues an
explicit restriction, Phase 3 stops. That risk is documented, not assumed away.

Close with "What This Plan Does Not Decide" — (1) full programme scope beyond
the PoC, and (2) SME resourcing model at scale.

Before writing, confirm you can name the three root causes of the project
breakdown from the situation analysis. Wait for "go".
```

**Stage 3 --- Working Assumptions.** Four assumptions made explicit before any content work begins : the definition of Tier 1 support scope, the partner knowledge baseline, the programme format decision, and the content use permission for the proof-of-concept. Each assumption states the consequence if it is wrong and the condition that would override it. This is the stage that keeps the project moving when pending sign-offs are being pushed forward. It also gives stakeholders something specific to push back on rather than a conceptual report.

```
Produce the working assumptions document. Read the situation analysis, plan of
action, and SME review before writing.

Write four assumptions in this order. For each, state:
  1. The assumption — a specific, actionable position, not a hedge or a question
  2. Why it is needed — what is unresolved that makes it necessary
  3. The consequence if it is wrong — be concrete about what changes in the work
  4. The override condition — the specific input that would replace this assumption

  Assumption 1 — Tier 1 support scope definition. No formal taxonomy exists.
  Derive a working definition from the module content itself and operationalise
  it as a short reference list of query types.

  Assumption 2 — Partner knowledge baseline. Conservative floor: certified on
  implementation, no prior formal support training, unfamiliar with internal
  tooling and processes.

  Assumption 3 — Programme format. Standalone partner support track — not a
  modified version of the existing colleague training. Source material is raw
  input to mine, not a template whose shape is preserved.

  Assumption 4 — Content use permission. Producing 1–2 adapted draft modules
  for internal review is a PoC experiment, not a published course, and does not
  require formal sign-off to begin. Work stops if the content owner explicitly
  restricts it.

Close: silence on any assumption is treated as acceptance. Stakeholders are not
asked to generate direction — only to flag a specific disagreement and point to
what would replace it.

Target: one page, two at most.
```

**Stage 4 --- Content Triage Matrix.** Each source module loaded into its own fresh session. The model scores each module against four criteria : partner relevance, troubleshooting density, internal-process contamination, and adaptation cost. The practitioner reviews the scores, catches divergences, and uses the working assumptions as the scoring frame. The session isolation here is intentional --- loading all 13 modules into one session would have created a context problem and produced less focused scoring.

```
Score the attached module against four criteria. Read the working assumptions
first — the Tier 1 definition and partner baseline govern how you score.

PARTNER RELEVANCE — does this module cover topics a partner encounters in live
Tier 1 support?
  Score: High / Medium / Low

TROUBLESHOOTING DENSITY — what proportion of the module is diagnostic content
vs. procedural/instructional?
  Score: High / Mixed / Low

INTERNAL-PROCESS CONTAMINATION — how much assumes access to internal systems,
internal tools, or internal-facing processes a partner would not execute?
  Score: Clean / Partial / Contaminated

ADAPTATION COST — composite estimate of structural work required to make this
module usable as source material.
  Score: Low / Medium / High

Also note sampling confidence: High / Medium / Low.

Observations: 2–3 sentences. Name what the module contains, where the
troubleshooting content sits, and the specific contamination issue if any.
"Lots of internal references" is not useful. "Section 3 walks through the
internal case-logging tool and would need full replacement" is.

Output: a single markdown table row. No header row, just the data row.
```

**Stage 5 --- Triage Summary.** Narrative module-by-module observations. This is where the patterns the matrix does not show get surfaced : where contamination is concentrated versus threaded through a module, where speaker notes carry content the slides do not, which modules look like strong proof-of-concept candidates and why.

```
Write a short narrative summary of this module from a content adapter's
perspective — someone deciding what to keep, what to remove, and what is missing.
Read the working assumptions first.

Cover five items:
  1. What the module contains — scope and structure in one to two sentences
  2. Troubleshooting content — where it sits, what specific scenarios or
     frameworks are present, whether they are in the slides or the speaker notes
  3. Internal-process contamination — what specifically is internal, and whether
     it is threaded throughout or concentrated in identifiable sections
  4. Adaptation notes — the primary work required, named concretely
  5. SME reviewer's view — where their assessment aligns with or diverges from
     what you see in the actual content

Four to six short paragraphs. Working note, not formal analysis. If a section
has nothing to report, skip it rather than padding.
```

**Stage 6 --- Programme Outline (two versions).** An expansive outline for a novice partner audience; a streamlined outline for an experienced partner audience. Both grounded in the triage scores and the SME analysis, not in what a generic curriculum might look like. The two versions were deliberate --- the audience segmentation question was one of the open decisions, and producing both options gives the stakeholder something to choose between rather than something to edit.

```
Produce a working programme outline at the topic-area level. Read all attached
documents before writing. The outline must be grounded in the triage scores,
not in generic instructional design conventions.

This is the [expansive / streamlined] version.

Governing constraints (from the working assumptions):
- Standalone support track — source material is input to mine, not a template
- Partner baseline assumes implementation knowledge, no prior support training
- Tier 1 means cases resolvable without internal infrastructure access
- Content outside Tier 1 scope is excluded by default, not deferred

For each proposed topic area, write:
  1. Name and one-sentence statement of what it contributes to Tier 1 support
  2. Source module(s) with triage scores noted
  3. What transfers — specific content directly usable or usable with reframing
     (name sections, not categories)
  4. What needs removing — specific internal-process content
  5. Known gaps addressed — any SME-identified gaps this topic area fills or misses

After the topic areas:
- Modules not proposed for inclusion — one-sentence reason each, specific enough
  to challenge
- Known content gaps — topics within Tier 1 scope the source library does not cover

Do not write: learning objectives, durations, delivery format, or PoC module
recommendations. Those are later phases.

Before writing, confirm the adaptation cost score for the reporting module and
state the programme format assumption. Wait for "go".
```

**Stage 7 --- Analysis & Recommendations.** Stakeholder-facing synthesis. Three open decisions named with options stated --- not open questions. The framing shift from "here are the questions" to "here are the options" is the difference between inviting commentary and forcing a decision.

```
Produce the consolidated analysis and recommendations. Read all attached
documents before writing. Every sentence either states a finding, makes a case,
or names a decision. Cut anything that does neither.

Six sections:

  1. PROJECT BACKGROUND (half page max) — business problem, original intent,
     why it stalled. One paragraph per root cause. Do not smooth them over.

  2. WHAT WAS DONE (half page max) — what the PoC produced and what each output
     established. State outputs, not process.

  3. KEY FINDINGS (one page max) — synthesise, do not list. Cover:
     - Structural: this is an implementation library, not a support library
     - Contamination: concentrated in specific sections, not threaded throughout
     - Speaker notes: the most valuable diagnostic content is in the notes, not
       on the slides — any adaptation that ignores the notes pane leaves the best
       material behind
     - Strongest PoC module candidates with triage evidence
     - Content gaps within Tier 1 scope the source library does not cover

  4. PROGRAMME PROPOSAL (one page max) — present both programme shapes. For each
     topic area: what it contributes, source module, primary adaptation work.
     Stakeholder-facing voice — shorter and more decisive than the outline.

  5. POC RECOMMENDATION (half page max) — which two modules and why. Decisive
     language. State what the two together demonstrate that either alone would not.

  6. OPEN DECISIONS (half page max) — three decisions, each framed with two
     options stated, not as open questions.
       Decision 1: content ownership sign-off for PoC-level use
       Decision 2: scope of content gaps — in or out, and who authors them
       Decision 3: SME resourcing model if the PoC is green-lit at scale

Target: three to four pages. Written for a senior, time-constrained reader.

Before writing, confirm you can name the three root causes from the situation
analysis and the adaptation cost score for the reporting module. Wait for "go".
```

**Total : 7 calendar days. ~18--25 hours of active time. One person.**

## The honest comparison

Here is what the same work would have looked like staffed as a conventional project.

**Traditional team estimate**

A senior instructional designer acting as primary analyst and curriculum architect would need a minimum of 40 hours just to review ~80 hours of source material at a standard 2:1 review ratio --- before any gap mapping, audience recontextualisation, or programme architecture work. Realistically 80--100 hours for the senior role alone.

A junior ID or content associate processing module-by-module triage, reformatting, and supporting the senior adds another 40--60 hours.

A product subject matter expert validating triage decisions, checking partner relevance calls, and correcting technical nuance typically runs 2 review rounds across all modules --- 4--6 hours per round. Call it 20--30 hours of SME time, which is expensive to schedule and almost always a bottleneck.

A programme lead handling stakeholder management, audience analysis, programme architecture decisions, deck development, and alignment meetings adds another 30--40 hours.

Then the review cycles. Between ID and SME, between ID and programme lead, between programme lead and stakeholders. Each cycle adds 1--2 weeks of calendar time even when the active hours are modest. Realistically 3--4 cycles equals 3--4 weeks of elapsed time.

**Human + AI estimate (this project)**

My active time : context setup, project brief, working rules, source file organisation (~3 hours), prompting and reviewing outputs across sessions (~12--18 hours), stakeholder prep and deck review (~3--4 hours). Roughly 18--25 hours total, over 7 calendar days.

The model's contribution : near-zero elapsed time per task. The triage matrix, situation analysis, programme outline, and deck iterations --- each of which would have taken an ID 4--12 hours --- were generated in minutes. The meaningful constraint was my review cycle, not generation time.

**The comparison**

| | Traditional team | Human + AI |
|---|---|---|
| Active hours | 170--230 hrs | ~18--25 hrs (one person) |
| Calendar time | 6--10 weeks | 7 days |
| Roles needed | 4--5 people | 1 person |
| SME bottleneck | High --- 20--30 hrs to schedule | Deferred to validation phase only |
| Cost | Significant (3--4 FTEs × weeks) | AI subscription |

Compression ratio : roughly 8--12× on active hours, and 6--8× on calendar time.

**The important nuances**

SME review has not been eliminated --- it has been deferred and scoped. The analytical and structural work is front-loaded so that when SME time is spent, it is reacting to something concrete rather than generating direction from scratch. That is a better use of SME time, not just a faster one.

The other honest caveat : I brought the domain context that made this possible. Without an understanding of what the partner audience actually needs versus what the internal colleague audience needs, from similar projects in the past,  the triage and recontextualisation would have been generic. The model amplified that judgment --- it did not substitute for it.

## Four mechanics that made this work

### 1. Decomposition over delegation

The stages are not a chain of "do the next thing." Each stage has a narrow, defined output scope and an explicit constraint on what the model is not asked to do yet. Stage 1 does not suggest a plan. Stage 4 does not recommend which modules to adapt --- that is Stage 5's job, and even Stage 5 explicitly defers the selection decision to Phase 2. The model's tendency to overshoot --- jumping from analysis to recommendation to implementation in a single response --- is managed by prompt-level scope constraints, not by hope.

Decomposition is the architectural layer that makes the other three mechanics possible. Without it, each of the following is applied to one large undifferentiated task. With it, each is applied to a small, well-scoped one.

> Nate B. Jones' [video essay on prompt engineering, context engineering, and intent engineering](https://www.youtube.com/watch?v=QWzLPn164w0) was in inspiration for the following mechanics. His framework gave me vocabulary for how to approach the problem. The next three mechanics use his terms.

### 2. Prompt engineering : scope constraints as first-class design

The baseline : the craft of writing clear instructions. What made this project work at the prompt level was treating scope *constraints* as the most important design decision --- not format, not tone, not output length.

Every prompt in this series has an explicit "do not do X yet" clause. Stage 1 : *do not suggest a plan, understanding only.* Stage 4 : *produce one table row, no header.* Stage 6 : *do not write learning objectives, durations, or PoC module recommendations --- those are later phases.* These constraints are not politeness; they are scope guards. Without them, the model jumps ahead, and the output of Stage 1 contaminates Stage 2 before Stage 2 has started.

The confirmation gate pattern --- "before writing, confirm X. Wait for go." --- is the same mechanic applied as a quality check. If the model cannot confirm what it found in the attached documents, the context load failed and proceeding would produce a confident-sounding but unfounded output.

### 3. Context engineering : designing the information environment

The systematic design of the information environment the model works in --- not just what you put in the prompt, but what you attach, in what order, what you deliberately leave out, and what format minimises overhead.

Every stage in this series runs in a fresh session. Intentionally. A long single session accumulates noise --- earlier outputs, abandoned reasoning threads, back-and-forth --- that degrades response quality in later turns. The discipline : end each session when its artifact is complete. Start fresh for the next one. Attach only what the next stage actually needs.

For the triage stage, the only required inputs were the working assumptions document and the source module itself. Loading the situation analysis and plan of action as well would fill context with content that stage does not use. A model with a clean, scoped context produces more focused outputs than one navigating six prior conversations.

File format is part of context engineering too. Every artifact in this series is a Markdown `.md` file. Markdown is approximately 70% more token-efficient than equivalent Word or Excel files. When you are attaching prior outputs to a new session as context --- which is the whole pattern here --- the format of those files directly affects how much of the context window is consumed by formatting overhead versus actual content. Over a chain of 7 prompts, this compounds significantly.

### 4. Intent engineering : encoding decisions before the work begins

Encoding purpose, goals, values, trade-off hierarchies, and decision boundaries before the work begins --- telling the model not just what to do, but what to want.

In this project, the working assumptions document (Stage 3) is an intent document. Before any content work begins, four assumptions encode : what Tier 1 support means for this audience (the governing purpose), the partner knowledge baseline (the decision frame), the programme format choice (the structural constraint), and the content use permission (the risk boundary). Every triage score, every outline decision, every content reframing call downstream is made against this encoded intent.

The intent document also serves a second function that Jones does not focus on but that matters in a multi-stakeholder project : it externalises the assumptions so they can be challenged. A stakeholder who disagrees with an intent assumption can issue a targeted correction --- not a general review, not a meeting request, just a one-line redirect. Structured this way, silence becomes acceptance. The project does not stall waiting for direction that may never arrive in the form needed to proceed.

## What this does not replace

I have a programme structure and a stakeholder-validated proposal. What is not done : content sign-off from the relevant owners, SME review of the triage decisions, an instructional designer to author the actual modules in the production tech stack. The AI-assisted work gets to a validated proposal in 7 days --- the production path from here is still human-led and requires traditional tools and review cycles.

The decomposition approach is most useful in the analytical and structural phases --- situation analysis, planning, content mapping, outlining, stakeholder synthesis. It does not replace the judgment that happens in SME review, and it does not replace the production work that happens downstream.

## Risk or limitation

**SME review is still the gate.** The triage scores are a practitioner's reading of source material, AI-assisted. They are useful for prioritisation and scoping but they are not a substitute for a subject matter expert confirming that the adaptation judgments are accurate. Any module shortlisted for adaptation needs SME sign-off on the triage call before production begins.

**The approach assumes the practitioner can judge the output.** Each stage produces a reviewable artifact --- but reviewing it effectively requires domain knowledge. If the practitioner cannot catch errors in the model's analysis, the chain of artifacts amplifies those errors forward. The decomposition pattern does not remove the domain expertise requirement; it concentrates it at review checkpoints rather than distributing it across every step.
