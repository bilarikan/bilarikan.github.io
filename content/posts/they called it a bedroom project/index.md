---
title: "What AI Builders Inside Large Orgs Actually Deal With When They Are Not a Part of Developer, Engineering, or Technology Teams"
date: 2026-06-07
description: "Building AI prototypes inside a large enterprise is not just a technical challenge. It is a political one. In this post I want to name the patterns that make it hard --- the dismissals, the capture mechanisms, and the structural reasons good ideas get sidelined --- and show that they are documented, predictable, and supported by research. Then I share the tactics I have found that actually help."
summary: "The first time an AI prototype I built got dismissed as a 'bedroom project', it felt personal. By the third time, I started to see a system. In this post I name the patterns AI builders hit inside large enterprises --- provenance attacks, role-legitimacy challenges, capture mechanisms, balkanised AI efforts, the owner gauntlet, brittle delivery systems, induced in-group rivalry, and the shape-shifter's double bind --- show that each one is documented in organisational research, and lay out the tactics I have tested for getting past the dismissal hump."
tags:
  - ai-builder
  - intrapreneurship
  - enterprise-ai
  - prototyping
  - org-dynamics
  - innovation
  - learning-technologist
categories:
  - perspectives
draft: false
---

> **Note:** This post is about patterns, not specific people or places. The examples are drawn from my own experience building AI prototypes inside a large enterprise, but names, products, teams, and specifics are anonymised or generalised. No proprietary data, internal systems, or confidential business logic is described here. Where I point to research, I link the source so you can check my own 'read' against the literature.

I built a functioning proof of concept for a real-time multimodal in-product help agent --- one that watches your screen, listens to your question through your microphone, and infers in real time using your natural language, your screen, and product documentation to guide you step by step through the product. Text-chat had been the dominant AI interface in our product. This was something different. It worked as a proof-of-concept and became more real after I prototyped it using Google's Agent Development Kit.

I showed it in live demos. I got genuine interest. I also got this :

> _Bil built this in his bedroom._

> _Actual engineers need to look into this._

> _This is a cool AI demo you could make because of AI --- but it isn't production-ready._

> _Did you submit an AI Innovation intake form for this?_

> _Why didn't you build this with our official AI Innovation tools?_

> _This is great --- thanks. We're going to use it for our IT project. You can go back to your desk._

> _This still needs to go through compliance._

None of those are technical critiques. They are status critiques, procedural deflections, and capture moves dressed up as due diligence. None of them engage with what the demo showed.

I had researched and written thorough documentation of the solution design, architecture, business case, and economics --- I was able to address specific questions requiring the details. But the same fall-back statements remained, and I am never certain what the real reasons --- one and two --- are for not wanting to move forward, because I kept getting reasons three, four, and five that never got to the true blockers.

The first time you hit these, they feel personal. The second time, you empathise with the challenges and constraints folks are under. The third time, you start to see the system. And once you see the system, you can start working with it instead of against it --- flow like water, rather than smashing against stone. What helped me most was discovering that almost none of this is unique to me, the organisation, or even to AI. The patterns are old, well-studied, and have names. Naming them is the first step to not taking them personally.

The guiding question for this post is simple : why do genuinely useful AI prototypes get dismissed inside organisations that say they want AI innovation, and what can a builder actually do about it?

## Goal

The goal here is not a manifesto. It is a field card.

I want to describe the landscape someone trying to build with AI actually operates in inside a large enterprise, name the forces that create resistance, point to the research that shows those forces are real and predictable, and offer a set of practical tactics I have tested or plan to try. This is my working model after a year of building proofs of concept, navigating demo rooms, and watching good ideas get sidelined.

Some of it is specific to my context. Most of it, I suspect, will be recognisable to anyone doing similar work inside a similarly sized organisation.

## Working assumption

The first working assumption is that most of the resistance someone trying to build with AI encounters is not personal and not irrational. It is a predictable output of how large organisations protect themselves from change. Understanding that does not make the resistance disappear, but it does change how you respond to it.

The second working assumption is that **a prototype is not a formal proposal**. It is a demonstration of a possible future. In the design and innovation literature, a prototype works best as a _boundary object_ --- a shared reference point that lets people from different functions engage with the same thing from their own expertise, without having to agree on everything first ([Star & Griesemer, 1989](https://en.wikipedia.org/wiki/Boundary_object); for the design-prototype version, see [the boundary-objects-in-innovation work](https://dl.designresearchsociety.org/drs-conference-papers/drs2012/researchpapers/116/)). Treating a prototype as a proposal invites people to evaluate it as one, and proposals get judged on completeness, risk, and organisational fit --- all of which a prototype will fail on by design. Keeping it a boundary object keeps the conversation on the capability, not the artifact.

## The dismissal layer

The most common form of resistance is the dismissal. It usually arrives as one of a few recognisable variants.

**The provenance attack.** _"Bil built this in his bedroom."_ The demo gets judged on where it came from rather than what it shows. This is the oldest pattern in the book : Katz and Allen documented the **Not-Invented-Here syndrome** in a study of 50 R&D project groups back in 1982, showing that groups systematically devalue ideas based on their origin rather than their merit ([Katz & Allen, 1982](https://onlinelibrary.wiley.com/doi/abs/10.1111/j.1467-9310.1982.tb00478.x)). The classic version is rejecting _external_ ideas. The enterprise-AI version is subtler --- the idea was generated internally, but _outside the standard team or process_, so the origin still becomes the argument. Either way, provenance is being used to avoid engaging with the thing itself.

**The production-readiness deflection.** _"This isn't ready for production."_ True, and also irrelevant. A prototype is not supposed to be production-ready. Saying so is not a critique ; it is a change of subject. The useful question is whether the capability is worth pursuing, not whether this particular artifact is deployable. Even with economic modelling of the potential cost impacts, the looming shadow of roadmap changes and new projects stalls discussion of next steps.

There is a research finding underneath this that took the sting out of it for me. Mueller, Melwani and Goncalo showed that people hold a hidden **bias against creativity** that activates when they feel uncertain --- and, crucially, that this bias _impairs their ability to recognise a good creative idea even when they are actively looking for one_ ([Mueller, Melwani & Goncalo, 2012](https://journals.sagepub.com/doi/10.1177/0956797611421018)). A live AI demo is a maximally uncertain stimulus. So the room that says it wants innovation and then reaches for "not production-ready" is not necessarily being cynical. Under uncertainty, that is the predictable human response. The fix is to reduce the uncertainty, not to win the argument.

**The tooling-attribution dismissal.** A newer variant, specific to this moment : _"You only built this because AI made it easy."_ The implication is that the capability is cheap and therefore unserious. It is worth noticing that this is the provenance attack wearing a 2026 coat --- it relocates the credit from the builder to the tool, which is just another way of not engaging with what was shown. Though, I should admit that I invite the 'unserious' label as my style is to work extremely hard to synthesise complex systems into simple explanations and visuals --- a double-edged skill learned during my time as a telecommunications systems instructor and a learning developer.

**The proxy attack.** This one is subtler. If a written proposal is thorough enough that it is hard to attack directly, the sceptic will find the weakest-looking surface instead and attack that. The demo is usually that surface. In my case the dismissals almost never landed on my written proposals --- they landed on the scrappy demo, because the demo _looked_ attackable. So the dismissal was not really about the demo. It was about the proposal the demo supported, redirected onto an easier target.

What these have in common is that none of them engage with the capability being demonstrated. They are all ways of stopping the conversation without having it.

## The role layer

The dismissal layer goes after the artifact. This next set of moves goes after _you_ --- your standing to be in the room, and your willingness to keep going.

**The role-legitimacy challenge.** _"Who are you? Your title is Learning Program Manager, but you're asking about things well outside that role."_ This is the stay-in-your-lane move, and it is the most personal of the lot. What I have found that works is to answer it lightly --- a quick, jovial nod to my earlier background as a technician and technologist, and a mention that a sponsor asked me to look at the problem. That usually gets the conversation moving again. What it does not do is tell me what was actually being asked : was it about seniority, authority, my level in the org, or just territory? I rarely find out.

Edwin Hollander's old idea of **idiosyncrasy credit** explains both the challenge and why the workaround works. Hollander showed that a group extends you a kind of running balance of credit --- earned through demonstrated competence and through being liked --- and only once you have banked enough are you permitted to deviate from what the group expects of your role ([Hollander, 1958](https://en.wikipedia.org/wiki/Idiosyncrasy_credit)). A title is shorthand for how much credit the group thinks you should have. Asking about things "outside your role" spends credit you may not visibly have yet. Naming my technical background and the sponsor's request is, in effect, a fast deposit --- competence plus borrowed authority --- before I overdraw. The durable fix is the same as tactic seven below : build a visible track record so the credit is already in the account before the question gets asked.

**The pre-emptive discouragement.** A quieter one : people who spend real energy convincing you the solution will probably never happen, so there is no point putting serious planning, effort, or resources behind it. It can sound like realism, even like kindness. But notice what it is doing --- it lowers your investment before anyone has evaluated the idea on its merits. Sometimes it is genuine context-sharing. Often it is an antibody response ([Blank, 2019](https://steveblank.com/2019/10/15/between-a-rock-and-a-hard-place-organizational-and-innovation-theater/)) : discouraging the effort is cheaper than engaging with it. The reframe I use : treat the prediction as information about _their_ certainty and incentives, not mine. If the only argument against pursuing something is that it probably will not survive the org, that may unintentionally be a statement about the org, not about the idea.

## The capture layer

Dismissal is one pattern. Capture is another, and in some ways it is harder to navigate, because it starts with agreement.

**IT capture** looks like governance. The approved path for building AI solutions leads through a centralised process --- in practice, into a specific cloud infrastructure controlled by the IT department. The stated rationale is security, compliance, and scalability. All of those are real. The effect, however, is that concepts built elsewhere get absorbed into IT's roadmap, the original builders get sidelined, and the credit follows the infrastructure. The intake process is not always an innovation and assurance channel ; it can turn into an innovation funnel into a different team's portfolio, discarding the original thinker once they are squeezed of their innovative juices.

**L&D capture** looks like support. A grassroots community of AI practitioners is artificially formed. The internal learning-and-development function --- well-intentioned, doing exactly what it is meant to do --- moves to coordinate and formalise the skills, knowledge, and practices. From there it becomes a program with a curriculum, a sponsor, and an enrolment process. The energy that made it interesting drains out. What started as builders sharing cool new approaches with others willing to try them out is turned into a stale curriculum of what worked six months ago, and becomes a foundations course that everyone has to take.

**Lateral capture** looks like collaboration. This is the one I underestimated. A peer team --- often a sister business unit's learning or product group --- engages with your concept, then spends the working session steadily reframing it toward something they want to own, and quietly manoeuvres with the leaders above you to position your direction as the risky one. You think you are co-designing. They are re-pointing the work. You can walk into the last day of a workshop with a detailed proposal nearly ready to submit --- that you had worked all night on --- and you walk out having spent the final day helping produce a single weak slide in someone else's grand vision with no clear direction --- because they wanted to pivot into a direction that gave them control.

**Sponsor capture.** A senior leader sees the work, gets excited, and takes it on as their team's project. That is the best version : the concept gets resources and air cover. The harder version is that it also gets a new owner, a new direction, and a new set of constraints, and the builder becomes a contributor to someone else's initiative. Credit is the first thing to drift, scope is usually next. Another version of this is senior leaders not displaying interest and only fully buying in after _other_ senior leaders show interest --- and then quietly rewriting history into "I always supported this concept."

None of these are necessarily malicious. Organisational research frames the underlying driver clearly : people develop **psychological ownership** over intangible things like ideas and goals, and that ownership produces **territoriality** --- defending, marking, and withholding ([Brown, Lawrence & Robinson, 2005](https://journals.aom.org/doi/10.5465/AMR.2005.17293710)). Capture is territoriality expressed as enthusiasm. The problem is that absorption is not the same as adoption, and standardisation is not the same as progress.

## The structural layer

Underneath the dismissals and the capture mechanisms is a structural problem that makes all of them worse : most large organisations do not have a real intake path for internally generated AI innovation.

What they have instead is a patchwork. IT has a cloud platform and a process for using it, but a convoluted intake process where path-finders and explorers are weeded out. One VP has budget for a small AI team. Another has found a strong builder on her team and carved out time. A third is running a pilot that may or may not connect to anything else. None of these efforts coordinate. None share infrastructure, tooling, or learnings. They compete for executive attention, because that is the only resource they share.

Steve Blank has a name for the visible version of this : **innovation theater** --- hackathons, innovation labs, and intake forms that produce lanyards and activity but little that moves the business, while the real operating units quietly ignore the output. He also names the force that kills the substance underneath the theater : **innovation antibodies**, the departments and processes that treat every new idea as a risk to be managed rather than a possibility to be tested ([Blank, 2019](https://steveblank.com/2019/10/15/between-a-rock-and-a-hard-place-organizational-and-innovation-theater/)). A "false intake path" is innovation theater with a capture mechanism bolted on : it performs openness to innovation while functioning as a routing layer into an existing team's empire.

The result is balkanisation --- multiple small efforts running in parallel, none strong enough to be the institutional answer, each protective of its own territory. Air time becomes the scarce resource everyone optimises for, instead of actual outcomes.

In that environment, a builder with a strong proof of concept is not presenting to an audience evaluating ideas on their merits. They are presenting into a political economy where every new idea is also a potential threat to someone's headcount, roadmap, or claim to relevance. That is why the same demo can get an enthusiastic response from half the room and a deflection from the other half.

## The owner layer

The structural problem has a human face, and it is the one a builder spends the most time in front of : owners.

A useful AI proof of concept rarely has a single audience. It has a queue of them. To move from "interesting" to "let us pilot this," I have to win over the product owner, then the function owners whose turf the concept touches --- marketing, cloud operations, support --- then the knowledge-domain experts and subject-matter experts, and often a team or leader who has been anointed as "the" AI function. Each one is a gate, and each gate is pitched separately. Political scientists have a precise name for this : every one of those owners is a _veto player_, an actor whose agreement is required to move off the status quo. George Tsebelis's work shows that the probability of change falls as the number of veto players rises, and falls further the more their priorities diverge ([Tsebelis, 1995](https://en.wikipedia.org/wiki/Veto_Players)). A proof of concept that needs eight separate yeses, from owners who each optimise for something different, is not suffering bad luck when it stalls. It is running into arithmetic.

The part that surprised me is that buy-in does not flow downhill. A director can be genuinely sold, and the owners reporting to that director --- the people who would actually do the work --- still need to be convinced from scratch before they will pick it up. Then, if the concept turns out to be useful for a second product or a second region, the whole sequence starts again with a new set of owners.

There is a quiet asymmetry in this. I am pitching to gain buy-in for my own proof of concept, and every "yes" creates another workstream I am now partly responsible for --- more threads, more meetings, more priming --- without much changing on the other side of the ledger. A startup founder doing this much selling at least has the eventual carrot of an acquisition or equity. Inside an org, the compensation is the same whether you run one thread or five, and the five push your real workload well past the 100% mark. The incentive structure quietly rewards the pitching, not the building.

**The domain-expert gap-find.** A specific and recurring move : a genuinely expert owner --- in model selection, site reliability engineering, vector data architecture, front-end, back-end, or cloud --- examines the proof of concept, finds the one area I have not yet researched or optimised, and treats that single gap as proof the whole thing will not make it. The unstated logic is that an idea must be fully optimised before it is worth pursuing. But a proof of concept is, by definition, not optimised everywhere yet ; that is what the pilot is for. This is Donald Knuth's old warning about premature optimisation pointed at people instead of code : demanding optimisation before you know what actually matters is not rigour, it is a way of not starting.

**The late-arriving senior leader.** Word travels up. A leader two levels removed catches wind of the project a director is running and decides they need to weigh in --- often less to evaluate the idea than to be seen evaluating it. A recognisable archetype shows up here : the executive who pre-emptively diminishes, theatrically explaining a system or concept that "people need to understand better" before the room is allowed to take the work seriously. It reads as a status display more than a technical objection, and it is worth recognising as such, so you do not mistake it for a real blocker.

Underneath all of these owners is a single mismatch in mindset. The builder is operating in an objectives-outcomes-hypothesis-experiment frame : here is the outcome I think is possible, here is the hypothesis, let us run a small test and measure. The owners are very often operating in a total-systems-architecture, perfect-knowledge, early-optimisation frame : show me the complete design, the full risk picture, and the optimised solution before we commit. Those two frames do not meet in the middle on their own. The product teams that have escaped this --- Booking.com is the standard example --- did it by making the experiment, not the architecture review, the unit of progress ([Thomke, HBR 2020](https://hbr.org/2020/03/building-a-culture-of-experimentation) ; practitioner write-up at [Hustle Badger](https://www.hustlebadger.com/what-do-product-teams-do/booking-com-experimentation-culture/)).

## The systems layer

That mindset mismatch is not only cultural. It is built into the systems.

The honest version of the problem is this : the systems most large organisations run on are not set up to extract value from AI concepts that originate outside the development, engineering, and technology teams. The DevOps, site-reliability, big-data, and experimentation movements all passed through the enterprise over the last fifteen years, and they left real artifacts behind --- pipelines, dashboards, the vocabulary of A/B testing, and a body of evidence that faster, smaller, measured releases actually correlate with better organisational performance ([Forsgren, Humble & Kim, _Accelerate_, 2018](https://itrevolution.com/product/accelerate/)). But in organisations that constantly reshape their market segments, absorb acquisitions, and shift strategy to keep shareholder value climbing quarter over quarter, those movements never fully settled into the operating system. They became things some teams do, not the way the place works.

There are two well-studied reasons for that, and neither is anyone's fault. The first is the tension James March named between _exploration_ and _exploitation_, later termed organisational ambidexterity by O'Reilly and Tushman : a system tuned for exploitation rewards efficiency, control, and variance reduction, while exploration needs the opposite --- autonomy, slack, and a tolerance for variance ([O'Reilly & Tushman, 2013](https://papers.ssrn.com/sol3/papers.cfm?abstract_id=2285704)). Most large enterprises are very good at exploitation, and an AI proof of concept is a pure exploration object dropped into a machine built to suppress variance. The second reason is older still. Hannan and Freeman's account of _structural inertia_ observes that organisations survive by being reliable and accountable --- by reducing the variability of what they produce and documenting the procedural rationality behind every decision --- and that this very reliability is what makes them resist change, more so as they grow older and larger ([Hannan & Freeman, 1984](http://www.iot.ntnu.no/innovation/norsi-pims-courses/harrison/Hannan%20&%20Freeman%20(1984).PDF)). An experimentation system asks the organisation to tolerate variance and to act before the procedural rationality is fully documented. That is precisely the thing structural inertia exists to prevent.

It is worth being concrete about what "settled in" looks like, because it does exist. Booking.com built a system where an employee can take a hypothesis straight to the live product behind controls, with measurement and guardrails built into the path itself, instead of routing every idea through manual analysis and sign-off. The reported result was an enormous volume of small, measured product improvements --- on the order of a thousand concurrent tests at any moment ([Thomke & Beyersdorfer, HBS case](https://www.hbs.edu/faculty/Pages/item.aspx?num=55158) ; engineering write-up at [Booking.com](https://booking.ai/scaling-experimentation-quality-at-booking-com-726152ee4ef0)). The lesson is not "be Booking.com." It is that the bottleneck was never the supply of ideas --- it was the system between an idea and a measured test, and that system can be designed differently.

The market is already pricing this in. Nearly every full-stack, back-end automation service --- Lovable, v0 by Vercel, and the rest --- is, underneath the convenience, a way to capture product development into someone else's infrastructure. That is the same capture pattern from earlier in this post, now operating at the level of the industry rather than the org chart : whoever owns the system that turns an idea into a running build owns a great deal of the value.

And this lands hardest on the engineering teams, who I want to be fair to here. They are being asked to do three difficult things at once : keep their committed roadmap moving ; take on the vetting and the real engineering of valuable-but-unfinished concepts now arriving from semi-technical people who can suddenly build working proofs of concept ; and rethink the entire product delivery and maintenance lifecycle for an age of agentic builders. That is a genuinely hard position, and a lot of what reads as resistance from engineering is the rational response of a team with no slack being handed a fourth job. The systems layer is where the builder's frustration and the engineer's frustration turn out to be the same problem seen from two ends.

## The in-group layer

The patterns so far are mostly about the work. This one is about the people doing it, and what happens when leaders --- wittingly or not --- turn a group of builders into competitors.

Many AI builders are not only shipping prototypes ; they are trying to grow into something like an AI-innovator role that does not formally exist yet. Senior leaders notice this, and a common move --- sometimes deliberate, often not --- is to let the aspirants compete : back several builders loosely, watch whose concept gains the most traction, and reward the winner. On paper that reads as meritocracy. In practice it imports a specific and well-studied dynamic, in three parts.

**The clique.** Leaders do not relate to everyone who reports up to them in the same way. _Leader-member exchange_ theory describes how a leader forms higher-trust, higher-resource relationships with an in-group and thinner ones with an out-group, and how that differentiation reproduces inequality when the boundaries are left unmanaged or are justified without transparency ([Graen & Uhl-Bien, 1995](https://en.wikipedia.org/wiki/Leader%E2%80%93member_exchange_theory)). For a builder, being inside the in-group means access, air cover, and information ; being outside it means doing the same work with less of all three --- and often not knowing which group you are in.

**The tribe.** Once the line is drawn, it takes on a life of its own. _Social identity theory_ shows that the mere existence of an in-group and an out-group is enough to produce favouritism and bias ; in the original experiments, people would give up absolute gains just to widen the gap between their group and the other one ([Tajfel & Turner, 1979](https://www.simplypsychology.org/social-identity-theory.html)). Builders start to identify by camp, and sharing what works with someone in the other camp begins to feel like helping the competition.

**The tournament.** When a leader signals that they will back whichever AI concept wins, they are running what economists call a rank-order tournament --- a structure that is genuinely good at extracting effort when output is hard to measure ([Lazear & Rosen, 1981](https://en.wikipedia.org/wiki/Tournament_theory)). The catch is that tournaments only stay productive when the contestants' work is independent. AI building is the opposite : it depends on shared infrastructure, shared learnings, and reused components. Under that kind of interdependence, forced internal competition has been shown to degrade cooperation and invite quiet sabotage and information hoarding --- which is why Microsoft abandoned its stack-ranking system in 2013 after concluding it had done exactly that ([Kellogg Insight](https://insight.kellogg.northwestern.edu/article/performance-review-ranking-system-best)).

Put together, this is balkanisation seen from the inside. The structural layer described five mediocre AI efforts competing instead of one strong one ; the in-group layer is the human version of the same loss --- builders who could be compounding each other's work hiding it instead, because the scarce resource they are really competing for is the leader's favour, and favour is positional. The charitable read, which I think is usually the correct one, is that leaders reach for competition because it feels like a cheap way to surface the best idea. The research just says that when the work is interdependent, the cheap way turns out to be expensive.

## The shape-shifter's double bind

There is one more challenge, and it is less about how others receive the work than about what the work demands of you.

To get a concept moving, I have to bring it to very different teams --- program, product, UX, front-end, back-end --- each with its own composition, strengths, and preferences. None of them starts from a blank page. So I do the priming : enough program framing, enough design, enough working front-end or back-end to prove the thing is possible and give each team a place to stand. This is **boundary spanning** in the literal sense Tushman and Scanlan described --- one person carrying information and possibility across the seams between units, which is exactly where innovation tends to stall and where communication is most prone to distortion ([Tushman & Scanlan, 1981](https://journals.aom.org/doi/10.5465/255842)).

The bind is that the priming has to land in a narrow band. Do too little, and the specialist team "shuts down" --- the input was not in the form they are used to, so nothing starts. Do too much, and I have stepped onto their craft, and the feedback turns to _"this isn't to our standard."_ That second reaction is territoriality again ([Brown, Lawrence & Robinson, 2005](https://journals.aom.org/doi/10.5465/AMR.2005.17293710)) --- the specialist defending the boundary of their work. So I am expected to produce something concrete enough to react to, and penalised for having produced it with the 'wrong' hands or without the formal 'credentials' required. There is no position in that band that is fully safe from criticism, which is worth naming plainly : the criticism is structural, not a verdict on the work or on you.

## What actually helps

Now, the practical part. These are tactics I have tested or am considering trying across demos, proposals, and informal conversations. Where I can, I have tied each one to why it should work, not just that it worked for me.

**1. Pre-empt the deflection before they can use it.**

Open the demo by naming what the artifact is and is not : _"What I am about to show is a proof of concept. It is not a production build, and it is not a proposal for one. The question I want to explore is whether this capability is worth pursuing, and what it would take to get there."_

This removes the "not production-ready" line of attack by saying it first, and it reframes the question from "is this done?" to "is this directionally right?". It is also doing something the research points to directly : if uncertainty is what triggers the bias against creativity ([Mueller, Melwani & Goncalo, 2012](https://journals.sagepub.com/doi/10.1177/0956797611421018)), then naming the boundaries of the artifact lowers the uncertainty in the room, which is the actual lever.

**2. Shift the closing question.**

Instead of ending with _"what do you think?"_, end with _"what would need to be true for this to be worth pursuing?"_. The first invites a verdict. The second forces the sceptic to articulate a _condition_, which is a far more productive place to negotiate from. It also lowers the interpersonal cost of engaging honestly --- which is the core of what Amy Edmondson calls **psychological safety**, the shared belief that you can raise a question or a doubt without it being held against you ([Edmondson, 1999](https://web.mit.edu/curhan/www/docs/Articles/15341_Readings/Group_Performance/Edmondson%20Psychological%20safety.pdf)). A room that feels safe to name conditions will engage with substance ; a room that does not will reach for the safe deflection.

**3. Do not present alone if you can avoid it.**

The "bedroom project" framing collapses when a second credible voice is in the room. That voice does not need to be senior --- a peer from engineering, product, or design who has looked at the work and can speak to what a real build path involves is enough. This is the boundary-object idea in action : a prototype that two functions have already engaged with is no longer one person's artifact, it is a shared reference point. The moment it is not just _Bil's thing_, the provenance attack loses most of its force.

**4. Do the research, and build documentation with real technical accuracy.**

You do not need years of seniority to earn a place in the conversation. You need to have done the work. Spending focused time to research a domain, gather the relevant details, and build documentation that is technically accurate --- or to put together a reasonable working model of how something would function --- does more to establish standing than any title. The goal is not to write the definitive text in a field you are not fully versed in. It is to get a credible, accurate-enough grasp of the facts that engineering, legal, InfoSec, and the other gatekeepers will care about, and to write it down clearly.

This does two things the research points to. First, it pre-empts the procedural deflections directly : when someone reaches for _"this still needs to go through InfoSec and legal,"_ a builder who already has a documented first-pass on data handling, threat surface, and compliance touchpoints has changed the conversation from "you haven't thought about this" to "here are my readings --- where am I wrong?". Second, it lowers the uncertainty in the room, which is the actual lever on the bias against creativity ([Mueller, Melwani & Goncalo, 2012](https://journals.sagepub.com/doi/10.1177/0956797611421018)). Accurate documentation is also the clearest way to bank competence credit before you need to spend it --- the _alpha value_ in Hollander's idiosyncrasy-credit model ([Hollander, 1958](https://en.wikipedia.org/wiki/Idiosyncrasy_credit)). Modern tools make this far more achievable for one person than it used to be ; the constraint is no longer access to information, it is the discipline to verify it and write it down honestly.

**5. Protect the concept through obscurity early.**

The best time to absorb a concept is before it has its own identity and momentum. An idea announced before it is real is easy to redirect ; an idea that already has a small working group, a few concrete outputs, and a shared vocabulary is much harder to absorb cleanly.

This is not just my instinct --- it is a documented strategy. Miller and Wedell-Wedellsborg make **the case for stealth innovation** : developing an idea quietly, out of the line of fire, until it is robust enough to survive contact with the organisation ([Miller & Wedell-Wedellsborg, HBR 2013](https://hbr.org/2013/03/the-case-for-stealth-innovation)). The organisational-behaviour literature goes further : Mainemelis's award-winning work on **creative deviance** describes exactly the move of continuing to develop an idea after it has been told to stop, and shows that ideas developed out of sight are _less_ subject to the conformity pressures and biases that kill novel ideas early ([Mainemelis, 2010](https://journals.aom.org/doi/10.5465/amr.35.4.zok558)). The implication : do not socialise a concept widely until it has enough shape to defend itself.

**6. Find the champion who understands the structural problem, not just the demo.**

An enthusiastic VP who likes the demo is useful. A VP who understands _why the intake path is broken_ and has the appetite to say so in a room is a different kind of useful. The first gives the idea air cover ; the second changes the conditions the idea operates in. Howell and Higgins, in their study of innovation **champions**, found that effective champions do not just cheerlead --- they articulate a clear vision, deploy a wide range of influence tactics, and crucially work the political process : securing top-level backing, building peer support, and sometimes pushing ideas through without formal approval ([Howell & Higgins, 1990](https://eric.ed.gov/?id=EJ411660)). If you can find a champion who operates at that level, invest in the relationship.

**7. Build in public, inside the organisation.**

The most durable protection for a concept is a visible track record : working sessions, documented experiments, posts like this one, a consistent practice of showing work as it develops. It is slower than a single demo, but it builds something a demo cannot --- a pattern of credibility that is hard to dismiss with one line about bedrooms. It is also the direct counter to NIH-style provenance attacks ([Katz & Allen, 1982](https://onlinelibrary.wiley.com/doi/abs/10.1111/j.1467-9310.1982.tb00478.x)) : a documented body of work establishes a legitimate provenance of its own. It is, in idiosyncrasy-credit terms, how you keep a positive balance in the account before anyone asks who you are.

**8. Prime just enough, then hand the craft back deliberately.**

The shape-shifter's double bind has no perfectly safe position, but it has a better one : produce the smallest artifact that makes the possibility legible --- a rough prototype, a one-page flow, a thin slice of working code --- and present it explicitly as a starting point _for them_, not a finished example of their craft. Something like : _"This is a scrappy version to react to. The real build is yours, and you will do it better than this."_ That framing does two things at once. It gives the team the concrete object they need before they will engage --- the prototype doing its job as a boundary object --- and it pre-emptively returns ownership of the craft, which lowers the territorial response ([Brown, Lawrence & Robinson, 2005](https://journals.aom.org/doi/10.5465/AMR.2005.17293710)). You spend a little credit to start, and deposit some straight back by naming their expertise.

**9. Resist the tournament ; build the cohort instead.**

If the in-group layer runs on leaders pitting builders against each other, the counter-move is to make the builders legible to each other rather than only to the leader. A loose peer cohort --- builders across the different fiefdoms comparing notes on what actually works --- is something no single leader's tournament can easily co-opt, because it is a network rather than a team, and it has no prize to win. That matters precisely because the work is interdependent : the research on forced internal competition says cooperation, not ranking, is what interdependent work needs ([Kellogg Insight](https://insight.kellogg.northwestern.edu/article/performance-review-ranking-system-best)). A cohort also quietly changes the incentive --- when collaboration is visible and credited, helping a peer stops being a threat to your own standing. This is the same instinct behind the informal session I describe under _Next step_ : not coalition-building, just refusing to let the work stay siloed.

## Risk or limitation

A few honest caveats.

These tactics assume a builder with some standing and some runway. If the political environment is actively hostile rather than just resistant, some of them will not be enough. There are organisations where the intake path is not just broken but deliberately protective or cannibalising, and where the right answer may be to find a different environment.

The capture mechanisms are also not always bad. Sometimes the right outcome is for a concept to be absorbed by a better-resourced team that can actually build it. The thing worth protecting is credit and influence over direction --- not necessarily ownership of the execution.

And the research I have cited describes tendencies, not laws. NIH, the bias against creativity, territoriality, innovation theater --- these are well-evidenced patterns, but they are probabilistic. Plenty of rooms engage in good faith. The point of naming the patterns is not to assume the worst of everyone ; it is to stop assuming the problem is you.

The structural diagnosis here --- balkanisation, false intake paths, competitive air time --- is my read of my context. It is recognisable to others I have talked to. It is not universal.

## Next step

I am planning to run a small, informal session with a handful of folks I know who are trying to build with AI. The goal is not to build a coalition or formalise a community --- it is to test whether the patterns I have named here resonate with people in similar positions, and to learn what they have found that works. Delivering what I think I have learned is also the fastest way to find out where I am wrong.

If the session is useful, I will write a follow-up about what came out of it. For now, this post is the artifact I want to start that conversation with.

## Further reading

- **Not-Invented-Here syndrome** --- Katz, R. & Allen, T. J. (1982). _Investigating the Not Invented Here (NIH) Syndrome._ R&D Management, 12(1). [Wiley](https://onlinelibrary.wiley.com/doi/abs/10.1111/j.1467-9310.1982.tb00478.x)
- **Bias against creativity** --- Mueller, J. S., Melwani, S. & Goncalo, J. A. (2012). _The Bias Against Creativity : Why People Desire but Reject Creative Ideas._ Psychological Science, 23(1). [SAGE](https://journals.sagepub.com/doi/10.1177/0956797611421018)
- **Territoriality and psychological ownership** --- Brown, G., Lawrence, T. B. & Robinson, S. L. (2005). _Territoriality in Organizations._ Academy of Management Review, 30(3). [AOM](https://journals.aom.org/doi/10.5465/AMR.2005.17293710)
- **Stealth innovation** --- Miller, P. & Wedell-Wedellsborg, T. (2013). _The Case for Stealth Innovation._ Harvard Business Review. [HBR](https://hbr.org/2013/03/the-case-for-stealth-innovation)
- **Creative deviance** --- Mainemelis, C. (2010). _Stealing Fire : Creative Deviance in the Evolution of New Ideas._ Academy of Management Review, 35(4), 558--578. [AOM](https://journals.aom.org/doi/10.5465/amr.35.4.zok558)
- **Innovation champions** --- Howell, J. M. & Higgins, C. A. (1990). _Champions of Technological Innovation._ Administrative Science Quarterly, 35(2), 317--341. [ERIC](https://eric.ed.gov/?id=EJ411660)
- **Idiosyncrasy credit** --- Hollander, E. P. (1958). _Conformity, Status, and Idiosyncrasy Credit._ Psychological Review, 65(2). [Overview](https://en.wikipedia.org/wiki/Idiosyncrasy_credit)
- **Boundary spanning** --- Tushman, M. L. & Scanlan, T. J. (1981). _Boundary Spanning Individuals : Their Role in Information Transfer and Their Antecedents._ Academy of Management Journal, 24(2). [AOM](https://journals.aom.org/doi/10.5465/255842)
- **Psychological safety** --- Edmondson, A. (1999). _Psychological Safety and Learning Behavior in Work Teams._ Administrative Science Quarterly, 44(2). [PDF](https://web.mit.edu/curhan/www/docs/Articles/15341_Readings/Group_Performance/Edmondson%20Psychological%20safety.pdf)
- **Innovation theater and antibodies** --- Blank, S. (2019). _Why Companies and Government Do "Innovation Theater" Instead of Actual Innovation._ [steveblank.com](https://steveblank.com/2019/10/15/between-a-rock-and-a-hard-place-organizational-and-innovation-theater/)
- **Experimentation culture** --- Thomke, S. (2020). _Building a Culture of Experimentation._ Harvard Business Review, 98(2). [HBR](https://hbr.org/2020/03/building-a-culture-of-experimentation) ; Thomke & Beyersdorfer, _Booking.com_ (HBS case) [HBS](https://www.hbs.edu/faculty/Pages/item.aspx?num=55158) ; practitioner write-ups at [Hustle Badger](https://www.hustlebadger.com/what-do-product-teams-do/booking-com-experimentation-culture/) and [Booking.com engineering](https://booking.ai/scaling-experimentation-quality-at-booking-com-726152ee4ef0).
- **Veto players** --- Tsebelis, G. (1995). _Decision Making in Political Systems : Veto Players in Presidentialism, Parliamentarism, Multicameralism and Multipartyism._ British Journal of Political Science, 25(3). [Overview](https://en.wikipedia.org/wiki/Veto_Players)
- **Organisational ambidexterity** --- March, J. G. (1991). _Exploration and Exploitation in Organizational Learning._ Organization Science, 2(1) ; O'Reilly, C. A. & Tushman, M. L. (2013). _Organizational Ambidexterity : Past, Present and Future._ [SSRN](https://papers.ssrn.com/sol3/papers.cfm?abstract_id=2285704)
- **Structural inertia** --- Hannan, M. T. & Freeman, J. (1984). _Structural Inertia and Organizational Change._ American Sociological Review, 49(2), 149--164. [PDF](http://www.iot.ntnu.no/innovation/norsi-pims-courses/harrison/Hannan%20&%20Freeman%20(1984).PDF)
- **Software delivery performance** --- Forsgren, N., Humble, J. & Kim, G. (2018). _Accelerate : The Science of Lean Software and DevOps._ [IT Revolution](https://itrevolution.com/product/accelerate/)
- **In-group / out-group (social identity)** --- Tajfel, H. & Turner, J. C. (1979). _An Integrative Theory of Intergroup Conflict._ [Overview](https://www.simplypsychology.org/social-identity-theory.html)
- **Leader-member exchange** --- Graen, G. B. & Uhl-Bien, M. (1995). _Relationship-Based Approach to Leadership : Development of LMX Theory over 25 Years._ Leadership Quarterly, 6(2). [Overview](https://en.wikipedia.org/wiki/Leader%E2%80%93member_exchange_theory)
- **Tournament theory and forced ranking** --- Lazear, E. P. & Rosen, S. (1981). _Rank-Order Tournaments as Optimum Labor Contracts._ Journal of Political Economy, 89(5). [Overview](https://en.wikipedia.org/wiki/Tournament_theory) ; on the cost of forced ranking under interdependence, see [Kellogg Insight](https://insight.kellogg.northwestern.edu/article/performance-review-ranking-system-best).
- **Prototypes as boundary objects** --- Star, S. L. & Griesemer, J. R. (1989), on boundary objects ([overview](https://en.wikipedia.org/wiki/Boundary_object)) ; and design prototypes as boundary objects in innovation ([DRS 2012](https://dl.designresearchsociety.org/drs-conference-papers/drs2012/researchpapers/116/)).
