---
title: 
description: 
date: 
tableOfContents:
  minHeadingLevel: 4
  maxHeadingLevel: 5
---

Of course. Your current folder naming system is already quite robust and well-thought-out for a flat organization. The use of a numerical prefix for status and priority is a great way to leverage the default alphanumeric sorting of your file explorer to keep relevant folders at the top.

The proposed addition of timestamps is also a good instinct for adding another layer of valuable, at-a-glance information.

Here is an analysis of your system and a suggested refinement, followed by a complete documentation guide you can use as a reference.

### Analysis and Recommendations

Your system is effective because it prioritizes actionability. By placing status and priority first, you ensure that what you need to work on is always visible at the top of your file list.

The main challenge with adding timestamps at the end is that it can make filenames very long and doesn't contribute to the primary sorting order. A more effective approach is to place the date at the beginning of the name, right after the status/priority prefix.

Here is the recommended, improved structure:

**`[Prefix]_[StartDate]_[Category]_[Descriptor]`**

* `01_2025-01-20_learning_astro-experiment`
* `95_2025-03-07_profession_sage-course-reimbursement`

**Why this structure is an improvement:**

1.  **Enhanced Sorting:** It maintains your primary sort by **Status** and **Priority**, but now adds a secondary sort by **StartDate**. All your "Doing" (`0`) folders will be grouped, and within that group, they'll be sorted chronologically.
2.  **Eliminates Redundancy:** You don't need an end date in the filename. The status prefix (`9` for Archived, `3` for Paused) already tells you the project is no longer active. The `StartDate` provides historical context of its origin. This avoids the extra step of renaming a folder upon completion to add a second date.
3.  **Clarity and Conciseness:** It keeps the most critical sorting and metadata at the beginning of the filename, making it easier to scan quickly.

***

### Folder Naming Convention Documentation

Here is a complete guide to the recommended folder naming system.

#### **1. System Overview**

This naming convention is designed for a flat folder structure, where all project and topic folders exist in a single location. It uses a consistent naming pattern to sort folders automatically by their status, importance, and creation date, making it easy to see what is active, what is next, and what is archived.

#### **2. Folder Name Structure**

The structure consists of four components, separated by underscores (`_`). Words within a component are separated by hyphens (`-`).

**`[Prefix]_[StartDate]_[Category]_[Descriptor]`**

* **Example:** `01_2025-01-20_learning_astro-experiment`

| Component | Example | Purpose |
| :--- | :--- | :--- |
| **`[Prefix]`** | `01` | A two-digit code for **Status** and **Priority**. Controls the primary sort order. |
| **`[StartDate]`**| `2025-01-20` | The date the project or activity was initiated. Uses the `YYYY-MM-DD` format for correct chronological sorting. |
| **`[Category]`** | `learning` | A single, broad keyword identifying the area of life or work. |
| **`[Descriptor]`**| `astro-experiment`| A short, specific description of the folder's contents. |

---

#### **3. Component Guide**

##### **`[Prefix]`** - Status & Priority `[SP]`

The prefix is a two-digit number. The first digit (`S`) is for **Status**, and the second (`P`) is for **Priority**.

* **`S` - Status Code (First Digit):**

| Code | Status | Description |
| :--- | :--- | :--- |
| **`0`** | **Doing** | Actively working on. Your current focus. |
| **`1`** | **Up Next** | Queued up. To be started as soon as a `Doing` slot opens. |
| **`2`** | **Preparing** | In the planning or setup phase; not yet fully active. |
| **`3`** | **Paused** | On hold. Intend to resume in the future. |
| **`6`** | **Canceled** | Intentionally stopped and will not be resumed. |
| **`9`** | **Archived** | Completed, saved for reference, or no longer relevant. |

* **`P` - Priority Code (Second Digit):**

| Code | Priority | Description |
| :--- | :--- | :--- |
| **`1`** | **Critical** | Urgent and important. High-impact deadlines. |
| **`2-4`**| **High** | Important with significant consequences. |
| **`5`** | **Medium** | Standard importance. |
| **`6-8`**| **Low** | Can be delayed with minor consequences. |
| **`9`** | **Reference** | No action required; for information or future reference only. |

##### **`[StartDate]`** - `YYYY-MM-DD`

* Use the ISO 8601 standard format: **`YYYY-MM-DD`**.
* This represents the date the folder was created or the project was started.
* This date **should not change** throughout the lifecycle of the folder.

##### **`[Category]`** - General Identifier

* A single, lowercase word to provide broad context. Be consistent.
* **Examples:** `learning`, `profession`, `military`, `personal`, `health`, `finance`, `volunteering`, `project`.

##### **`[Descriptor]`** - Specific Description

* A short, clear description of the specific content.
* Use **hyphens `-`** to separate words.
* Be descriptive but brief. For example, use `course-reimbursement-cases` instead of `business-cases-for-course-reimbursements`.

---

#### **4. Workflow Example: The Lifecycle of a Project**

Let's follow a project from idea to completion.

1.  **Creation (Planning Phase):** You decide to learn a new programming language. You create the folder while you gather resources. It's high priority.
    * `22_2025-07-15_learning_python-for-data-science`
    *(Status: `2`-Preparing, Priority: `2`-High)*

2.  **Becomes Active:** You finish your current learning project and start this one. You change the status to "Doing".
    * `02_2025-07-15_learning_python-for-data-science`
    *(Status: `0`-Doing, Priority: `2`-High)*

3.  **Project is Paused:** A critical work project comes up, and you have to put your learning on hold.
    * `32_2025-07-15_learning_python-for-data-science`
    *(Status: `3`-Paused, Priority: `2`-High)*

4.  **Project is Completed:** You eventually finish the course. You now want to archive the folder for future reference. Its reference value is medium.
    * `95_2025-07-15_learning_python-for-data-science`
    *(Status: `9`-Archived, Priority: `5`-Medium)*

The folder now sits at the bottom of your file list, but its name contains a complete history of its origin, purpose, and timeline.