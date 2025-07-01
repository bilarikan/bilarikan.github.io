---
title: Thinking through a AI storyteller for multilevel planning
description: A GenAI-powered tool to structure your goals, triage your schedule, and reflect on your progress by telling the story of your accomplishments.
date: 2025-07-01
---

## Thinking Through My Next Project: A Narative Planner
I've been feeling it a lot lately—the constant pull in a dozen different directions. I want to be a present and engaged father and husband, further knowledge domain expertise, excel in challenging projects at work, consistently develop my skills, maintain my physical health, and still find quiet moments for reflection setting intentions. It feels like modern life is a plate spinning act, and I've been thinking that just keeping the balls in the air isn't enough. I want to feel like I'm moving forward with intention.

I've read from thinkers like Cal Newport or Andrew Hartman and their ideas on multi-level planning, activity prioritization, schedule triage, and deep meanigngful work. I've read the books and listened to the podcasts, and I'm starting to think that a systematic, but playful, interactive, and creative, approach is the key for me to not just manage the chaos, but to weave it into a meaningful narrative.

The thing is, templates and systems on their own can feel static, proformas that you simply fill out and need to think throug later, but that later never comes. The real challenge, I think, is making them a living, breathing part of my daily routine. Maybe an AI-powered narrative multi-level planner inside a notetaking tool, like Obsidian, my favorite note-taking app, to help me not only plan my day, week, quarter and life but also help narrate the story I’m living.

## The Planning: A Strategic Partner in Obsidian
Obsidian is more than just a place where I store notes, it's a place to collect my thoughts, then explore them to maybe create something of them. I love that it's local-first with flat Markdown files rather than some complex file format I can never access without Obsidian. That's why I think it's the perfect home for the personalized planning system I have in mind.

The core of what I want to build is a multi-level planning framework that connects my highest aspirations to my daily actions:

* **Long-Term Objectives:** A place for me to define what truly matters across the major domains of my life—family, career, personal growth, and health.

* **Quarterly Objectives:** Where I can break that grand vision down into concrete, achievable goals for the next 90 days.

* **Weekly Prioritization:** A process at the start of each week where I can work with the AI to perform a "schedule, obligation triage," identifying the most critical tasks that align with my quarterly goals.

* **Daily Time Blocking:** A way to lay out each day with intention, assigning my tasks to specific blocks of time.

This structure is the foundation. But where I think it can become truly transformative is by integrating an intelligent partner like Google's Gemini AI. I don't want the AI to be just a passive tool; I envision it as a collaborator that can help me analyze my commitments, spot potential conflicts, and suggest what might need to be dropped when life inevitably gets too full.

## The Narrative: Turning My Progress into a Story
Here's the part I'm most excited to experiment with: the storytelling.

Productivity can often feel like a sterile series of checkboxes. I finish a task, I check it off, collect measurement, I move on. But I want to understand the impact of that work. How did today's efforts contribute to the person I want to become?

I'm imagining that at the end of each day or week, the plugin could use an GenAI/LLM API to read my completed tasks, my journal entries, and my reflections. It would then weave them into a short, narrative chapter, a "Story of You."

Instead of just a list of accomplishments, I’d get a story. A tough day of coding might be framed as "battling a complex intellectual challenge," while spending the afternoon with my daughter could be "investing in the core foundation of the youth." It’s a gamified, narrative layer on top of reality that I hope will make my own process of reflection more engaging and motivating.

This would also open the door to an interactive dialogue. I want to be able to ask my AI companion questions like:

* "What's the theme of this week's chapter?"

* "Based on my story, what challenges should I anticipate next week?"

* "How can I be a better protagonist in my own narrative?"

My goal is to create a powerful feedback loop for myself that connects my daily grind to my life's grand narrative, helping me ensure that I'm not just busy, but busy with the right things.

## The Implementation: How I'm Thinking About the Technical Side
For those interested in the nuts and bolts, my plan is to build this as a native Obsidian plugin. That means I'll be using TypeScript, which is the standard for Obsidian plugin development. The user interface for the planning views and story chapters will probably be built with standard web technologies (HTML, CSS) rendered within Obsidian's framework.

The AI integration is the most critical piece. My idea is to have the plugin communicate with the Google Gemini API via secure REST API calls. When I want to generate a story or get planning advice, the plugin will gather the context from the notes I select, construct a carefully designed prompt, and send it to the Gemini model. The generated text would then be formatted and displayed back to me in Obsidian. Privacy is paramount here, so I'll have to design the plugin to only send the data I explicitly choose to analyze.

## My Project Plan & First Steps
I know a project this ambitious needs to be built iteratively. I can't just build it all at once, so I'm thinking of breaking down the development into four phases to make sure I'm creating something useful at every stage.

* **Phase 1: Manual Prototyping & Concept Validation.** Before I write a single line of code, my first step has to be testing the core assumptions. I'll start by designing what I think is the ideal document structure for my planning, right in Obsidian. Then, I’ll manually track my activities and goals, copy this info into a Generative AI playground like Google AI Studio, and see what kind of stories and analyses it produces. By pasting these results back into my notes, I can get a feel for the final user experience and see if the core idea is as powerful in practice as it is in my head.

**Phase 2: Core Plugin Development & Automation.** Once I've validated the concept, I can start building the foundational Obsidian plugin. The initial goal will be to simplify and automate the manual work from Phase 1. I'll need it to create the necessary note structure for my plans and, most importantly, automatically pull in relevant data, like calendar events and completed tasks, to centralize the information.

**Phase 3: Full AI Integration.** This is where the plugin will get its intelligence. I'll integrate the Gemini API directly into the tool. This phase should bring my vision to life by enabling the plugin to analyze my schedule, provide smart time-blocking suggestions, ask me clarifying questions to help me triage my priorities, and automatically generate the daily and weekly "Story of You" chapters.

**Phase 4: Exploring a Standalone App & Local LLMs.** Once the Obsidian plugin is mature, I'd like to explore the alternative path: a standalone web application. The goal for this version would be to provide the same functionality but in a browser, using the File System Access API to read my local markdown files. A key part of this phase would be to investigate if I can use locally running Large Language Models (LLMs), which would offer a completely private, offline-first AI experience.

## The "What If": A Standalone Web App
While building this directly into Obsidian is my primary goal for that seamless, integrated feel, I am keeping a parallel path in the back of my mind: a standalone web application. This version would use modern browser technology to read my local .md files. It would give me more flexibility in user interface design and would be accessible from any device with a web browser, though it would lack the deep, native integration of a plugin. Exploring the use of local LLMs, as I noted in Phase 4, would be a huge win for privacy and offline capability, and that's something I'm very interested in.

## A Journey of Intentionality
This project feels like more than just a technical exercise for me. It’s a personal quest to build a system that helps me live more intentionally. I want to create a tool that respects the complexity of a balanced life—one where crushing a work project, reading a bedtime story, hitting a new personal record in the gym, and quiet reflection aren't competing interests, but integral parts of a single, cohesive, and well-lived story. I'm excited to see how it unfolds, and I'll be sure to share the journey as I go.