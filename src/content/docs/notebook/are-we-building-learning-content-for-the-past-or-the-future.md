---
title: Are We Building Learning Content for the Past or the Future?
description: First entry of my personal site. Quiet start to a place to capture my thoughts as they form, and reflect on learning, technology, and more.
date: 2025-07-01
tableOfContents:
  minHeadingLevel: 4
  maxHeadingLevel: 5
---
A few days ago, I watched Andrej Karpathy’s presentation for Y Combinator, and one idea has been circling in my thoughts: Build for Agents and Future Infrastructure. While Karpathy was speaking to an audience of startup founders and developers, the implications for the world of learning and development are profound. It forced me to ask a critical question: Are we, as learning professionals, designing content for how work is done today, or for the rapidly approaching future of human-AI collaboration?

#### The dominant paradigm in L&D
The dominant paradigm in L&D is still focused on creating learning experiences exclusively for human consumption. We are rushing to adopt the latest "AI features" inside our existing tools, but we're missing the forest for the trees. The real revolution isn't about using AI to help us create content faster; it's about fundamentally rethinking the architecture of our learning content so that AI Agents can become partners in the learning process itself.

#### Partial autonomy
We are on the cusp of what Karpathy calls "partial autonomy"—a state where humans and AI agents work together to operate software and complete tasks. In this world, our learning content needs to serve two audiences: the human user and their AI assistant.

#### The Black Box Problem: Why Our Current Tools Fail the Agent Test
For years, the gold standard for creating interactive e-learning has been to use powerful authoring tools like Articulate Storyline, TechSmith Camtasia, or Vyond. These tools are fantastic for building visually engaging, interactive experiences for people. The problem is what they produce under the hood.

When you publish a course from one of these tools, you don't get a simple, clean document. You get a self-contained web application. This typically includes:

* **A Complex DOM:** The output is a maze of nested divs, complex CSS, and obfuscated JavaScript that controls animations, triggers, and state changes. Valuable text content is often buried deep within this structure, making it incredibly difficult for an AI to parse and extract meaningful information.

* **Proprietary Data Structures:** The core content, quizzes, and interactions are stored in proprietary JavaScript objects or XML files. An external AI agent can't simply "read" this; it would need a highly specialized parser designed for that specific authoring tool's output.

* **The SCORM Wrapper:** To make matters worse, we often package these outputs into a SCORM (Sharable Content Object Reference Model) container to be loaded into a Learning Management System (LMS). SCORM is essentially a zip file with a manifest that tells the LMS how to launch and track the "learning object." It was designed for interoperability and tracking, not for knowledge accessibility. For an AI agent, a SCORM package is a locked box inside another locked box.

Imagine asking an AI assistant, "Hey, can you quickly summarize the five key safety procedures from our company's training module?" If that module is a Storyline SCORM package, the agent's task is nearly impossible. It cannot read the content without launching the entire web application and trying to navigate its complex, proprietary structure—a task it is not built for.

#### The Lure of Internal AI vs. The Need for Architectural Change
The current trend in the L&D tech world is to embed AI inside the authoring tools. "Generate a quiz with AI!", "Create a video script with AI!", "Suggest images with AI!". While these features can be helpful for productivity, they are a form of what Karpathy might call simple augmentation. They help the human designer work faster.

They do not, however, solve the fundamental architectural problem. We are using AI to build more of the same locked-box content, just more efficiently. We are so focused on the novelty of AI add-ons that we aren't asking the bigger question: How do we get our valuable knowledge out of the LMS and into a format that a new generation of AI systems can access and use?

This is the shift from augmentation to agents. An agent doesn't just help you write; it acts on your behalf. For an AI agent to be a useful partner to your employees, it needs access to the same knowledge they do. Our current infrastructure, built on LMS paywalls and SCORM packages, is a direct barrier to this future.

#### Markdown and the Open Knowledge Ecosystem
This is where a profound, almost deceptively simple, solution comes into play: LLM-friendly formats. The most powerful and accessible of these is Markdown.

Markdown is a lightweight markup language that is both human-readable and machine-readable. It has no complex code, no proprietary containers. It is simply text, structured with clean, semantic tags.

By shifting our core learning content from proprietary e-learning formats to Markdown, we transform it from a "course" into a "knowledge asset." This asset can be:

* **Stored in an open knowledge base:** This means more than just swapping a restrictive LMS for a help-center platform. Many of the major product knowledge base systems can be just as bad as an LMS, with web structures that are a nightmare to navigate and find relevant information in for humans, let alone AI agents. When I say open, think of a version-controlled repository (like Git), a clean modern wiki, or a universally searchable internal site built with a simple framework like Astro and it's Starlight theme.

* **Instantly indexed and understood by AI:** An AI agent can parse thousands of Markdown files in seconds, building a comprehensive understanding of your products, processes, and policies.

* **Flexible and Future-Proof:** Markdown, or alternatives like AsciiDoc, content can be easily converted to a web page, a PDF, a presentation, or even used as a source to dynamically generate a quiz or interactive session via an API call. You are no longer locked into a single output format.

This approach positions our learning content as a foundational layer for what Karpathy calls the new "LLM as an Operating System." In this paradigm, agents will execute tasks for users by drawing on available resources. An open, accessible, and well-structured knowledge base is the most critical resource you can provide.

#### Building for the Future of Learning
Andrej Karpathy's presentation touched on many other fascinating concepts—from the psychological quirks of LLMs (how we anthropomorphize and interact with them) to "vibe-based coding" (steering an AI towards a goal without perfect specifications). All these ideas point to a future of more fluid, dynamic, and collaborative interaction with technology.

#### As learning professionals, we have a choice
We can continue to focus on building beautiful, isolated experiences inside the walled gardens of our current tools. Or, we can start thinking like architects. We can design the foundational knowledge infrastructure that will empower both our human employees and their future AI partners. The first step is to stop creating content that is locked in the past and start building knowledge for the agents of the future.
---
You can find Andrej Karpathy's full Y Combinator presentation here. I also first came across this talk via the excellent Department of Product channel.