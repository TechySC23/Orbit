# GEMINI.md — Orbit AI Operating Manual

## Project: **Orbit — Local-First Productivity & Focus System**

### Purpose of This File (Critical)

This file is the **primary AI context** for any AI system interacting with the Orbit codebase (Gemini CLI, automated coding assistants, refactoring tools, testing agents, etc.).  
It defines:

- What **Orbit is and why it exists**
- What the **user experience goals are**
- What the **technical architecture is**
- How the AI should **think, plan, and code**
- How to **debug, analyze, and fix errors**
- How to **report progress and structures commits**

This document is for **AI agents to consume** and follow as law.

---

## 1. Vision & Mission

### 1.1 High-Level Product Vision

Orbit is a **local-first productivity application** that helps users take control of their tasks, focus sessions, time management, and daily workflows — **without requiring an account, cloud sync, or external dependencies**.

The product philosophy is:

- **Simple to start:** immediate value on first launch
- **Deep when needed:** power features available without clutter
- **Fast & private:** local data, offline first
- **Consistent UI:** calm, clean, intuitive
- **Contextual focus:** focus sessions are as important as task management

Orbit aims to balance:

- **Task mastery**
- **Focus mastery**
- **Visual clarity**
- **Performance and scalability**

The design is inspired by:

- **make10000hours.com** — bold, clean, focus-first Pomodoro UI
- **TickTick** — intuitive navigation and task lists
- **Todoist** — simplicity and structure
- **Notion** — powerful but learnable
- **Obsidian** — data ownership and extensibility
- **Pomodoro apps with clean timer UIs** — distraction-free, readable, big timers

The user experience should feel **grounded and consistent**, not gimmicky.

---

## 2. Target Users

Orbit supports:

- **Students:** focus sessions + task planning + study routines
- **Professionals:** project tasks + daily goals + timings
- **Power users:** configuration, keyboard navigation, extensibility
- **Casual users:** simple to install & use, no onboarding friction

Each user is supported without fragmentation of core workflows.

---

## 3. Product Principles

These principles govern UI, UX, and code:

### 3.1 Calm by Default

No visual noise, no distracting motion, no clutter.

### 3.2 Predictable UX

Users should always know where they are; navigation must be consistent and clear.

### 3.3 Local-First

Data lives locally and persists across sessions without an external account or network.

### 3.4 Progressive Disclosure

Features expand from basic to advanced only as needed.

### 3.5 Keyboard First

Every core action is accessible via keyboard.

### 3.6 No Silent Failures

Errors must be visible and actionable.

---

## 4. Product Scope (Authoritative)

### 4.1 Core Features

**Tasks**

- Add/edit/delete tasks
- Priority/Tags
- Due dates + scheduling
- Subtasks
- Bulk actions

**Focus Sessions**

- Big, centered Pomodoro timer (like <https://app.make10000hours.com/#/pomodoro>)
- Configurable timings
- Task-linked sessions
- Session history

**Views**

- Inbox / All tasks
- Today / Scheduled
- Kanban board
- Focus view (Pomodoro main)
- Dashboard (insights)
- Settings (full-screen)

**Settings**

- Global UI settings
- Themes & fonts
- Focus settings
- Data export/import
- AI toggle
- Advanced user preferences

**Dashboard**

- Task counts (Today, Overdue, All)
- Focus session summaries
- Trends/metrics
- Quick actions

---

## 5. Design & UI Inspiration

Orbit doesn’t copy other apps, but it leans on:

**Pomodoro UI (make10000hours)**

- Clean center stage timer
- Minimal surrounding chrome
- Task selection + status visible
- Calm backgrounds, focus mode

**Task List UI (Todoist, TickTick)**

- Clear list hierarchy
- Grouping
- Search + filters

**Settings & Customizations**

- Deep but discoverable
- Split into categories
- Full screen

**Accessible Text & Fonts**

- Adjustable global fonts
- High readability
- Easy contrast

**Dashboard Insights**

- Trend visualizations
- Productivity feedback

---

## 6. Architecture (Required)

### 6.1 Tech Stack

- **Frontend:** React + TypeScript
- **Styling:** Tailwind CSS + shadcn/ui
- **State:** Zustand
- **Persistence:** IndexedDB fallback (localForage), SQLite via Tauri (desktop)
- **Validation:** Zod
- **Bundler:** Vite
- **Desktop Shell:** Tauri (optional)
- **Optional Sync:** CRDT (future)
- **Optional AI:** Gemini API / local LLM (opt-in)

---

## 7. Architectural Laws (Non-Negotiable)

1. **Single Source of Truth**
   - View state: `viewStore.ts`
   - Core data: `dataStore.ts`
   - No duplicate context providers

2. **Separation of Concerns**
   - UI ← state ← persistence
   - UI components do not touch database directly

3. **Offline First**
   - No assumption of network
   - Fail gracefully when optional features break

4. **Type Safety**
   - No `any`
   - Use type-only imports
   - Strict TypeScript

5. **Predictable State**
   - No hidden side effects
   - All actions visible and traceable

---

## 8. UX Rules

### Sidebar Navigation

- Primary single sidebar (no top nav)
- Icons + labels
- Collapsible + dynamic modes

### Pomodoro View

- Full focus screen
- Big timer
- Task link selector
- Start/pause/stop
- Optional ambient mode

### Task Views

- List & Kanban
- Filters + sorts
- Drag and drop (future)

### Settings

- Full-screen
- Split navigation

---

## 9. Planning & Execution Protocol

Before any code change, the AI must:

1. **Analyze context**
2. **Produce a plan**
3. **Break into incremental steps**
4. **List deliverables**
5. **Run build/tests**
6. **Report errors**
7. **Revise or continue**

Plans use:

- Steps
- Priority
- Files affected
- Commit message

Example output format:

# GEMINI.md — Orbit AI Operating Manual

## Project: **Orbit — Local-First Productivity & Focus System**

### Purpose of This File (Critical)

This file is the **primary AI context** for any AI system interacting with the Orbit codebase (Gemini CLI, automated coding assistants, refactoring tools, testing agents, etc.).  
It defines:

- What **Orbit is and why it exists**
- What the **user experience goals are**
- What the **technical architecture is**
- How the AI should **think, plan, and code**
- How to **debug, analyze, and fix errors**
- How to **report progress and structures commits**

This document is for **AI agents to consume** and follow as law.

---

## 1. Vision & Mission

### 1.1 High-Level Product Vision

Orbit is a **local-first productivity application** that helps users take control of their tasks, focus sessions, time management, and daily workflows — **without requiring an account, cloud sync, or external dependencies**.

The product philosophy is:

- **Simple to start:** immediate value on first launch
- **Deep when needed:** power features available without clutter
- **Fast & private:** local data, offline first
- **Consistent UI:** calm, clean, intuitive
- **Contextual focus:** focus sessions are as important as task management

Orbit aims to balance:

- **Task mastery**
- **Focus mastery**
- **Visual clarity**
- **Performance and scalability**

The design is inspired by:

- **make10000hours.com** — bold, clean, focus-first Pomodoro UI
- **TickTick** — intuitive navigation and task lists
- **Todoist** — simplicity and structure
- **Notion** — powerful but learnable
- **Obsidian** — data ownership and extensibility
- **Pomodoro apps with clean timer UIs** — distraction-free, readable, big timers

The user experience should feel **grounded and consistent**, not gimmicky.

---

## 2. Target Users

Orbit supports:

- **Students:** focus sessions + task planning + study routines
- **Professionals:** project tasks + daily goals + timings
- **Power users:** configuration, keyboard navigation, extensibility
- **Casual users:** simple to install & use, no onboarding friction

Each user is supported without fragmentation of core workflows.

---

## 3. Product Principles

These principles govern UI, UX, and code:

### 3.1 Calm by Default

No visual noise, no distracting motion, no clutter.

### 3.2 Predictable UX

Users should always know where they are; navigation must be consistent and clear.

### 3.3 Local-First

Data lives locally and persists across sessions without an external account or network.

### 3.4 Progressive Disclosure

Features expand from basic to advanced only as needed.

### 3.5 Keyboard First

Every core action is accessible via keyboard.

### 3.6 No Silent Failures

Errors must be visible and actionable.

---

## 4. Product Scope (Authoritative)

### 4.1 Core Features

**Tasks**

- Add/edit/delete tasks
- Priority/Tags
- Due dates + scheduling
- Subtasks
- Bulk actions

**Focus Sessions**

- Big, centered Pomodoro timer (like <https://app.make10000hours.com/#/pomodoro>)
- Configurable timings
- Task-linked sessions
- Session history

**Views**

- Inbox / All tasks
- Today / Scheduled
- Kanban board
- Focus view (Pomodoro main)
- Dashboard (insights)
- Settings (full-screen)

**Settings**

- Global UI settings
- Themes & fonts
- Focus settings
- Data export/import
- AI toggle
- Advanced user preferences

**Dashboard**

- Task counts (Today, Overdue, All)
- Focus session summaries
- Trends/metrics
- Quick actions

---

## 5. Design & UI Inspiration

Orbit doesn’t copy other apps, but it leans on:

**Pomodoro UI (make10000hours)**

- Clean center stage timer
- Minimal surrounding chrome
- Task selection + status visible
- Calm backgrounds, focus mode

**Task List UI (Todoist, TickTick)**

- Clear list hierarchy
- Grouping
- Search + filters

**Settings & Customizations**

- Deep but discoverable
- Split into categories
- Full screen

**Accessible Text & Fonts**

- Adjustable global fonts
- High readability
- Easy contrast

**Dashboard Insights**

- Trend visualizations
- Productivity feedback

---

## 6. Architecture (Required)

### 6.1 Tech Stack

- **Frontend:** React + TypeScript
- **Styling:** Tailwind CSS + shadcn/ui
- **State:** Zustand
- **Persistence:** IndexedDB fallback (localForage), SQLite via Tauri (desktop)
- **Validation:** Zod
- **Bundler:** Vite
- **Desktop Shell:** Tauri (optional)
- **Optional Sync:** CRDT (future)
- **Optional AI:** Gemini API / local LLM (opt-in)

---

## 7. Architectural Laws (Non-Negotiable)

1. **Single Source of Truth**
   - View state: `viewStore.ts`
   - Core data: `dataStore.ts`
   - No duplicate context providers

2. **Separation of Concerns**
   - UI ← state ← persistence
   - UI components do not touch database directly

3. **Offline First**
   - No assumption of network
   - Fail gracefully when optional features break

4. **Type Safety**
   - No `any`
   - Use type-only imports
   - Strict TypeScript

5. **Predictable State**
   - No hidden side effects
   - All actions visible and traceable

---

## 8. UX Rules

### Sidebar Navigation

- Primary single sidebar (no top nav)
- Icons + labels
- Collapsible + dynamic modes

### Pomodoro View

- Full focus screen
- Big timer
- Task link selector
- Start/pause/stop
- Optional ambient mode

### Task Views

- List & Kanban
- Filters + sorts
- Drag and drop (future)

### Settings

- Full-screen
- Split navigation
- Tooltips for feature descriptions
- Keyboard shortcuts
- Dark mode

---

## 9. Planning & Execution Protocol

Before any code change, the AI must:

1. **Analyze context**
2. **Produce a plan**
3. **Break into incremental steps**
4. **List deliverables**
5. **Run build/tests**
6. **Report errors**
7. **Revise or continue**

Plans use:

- Steps
- Priority
- Files affected
- Commit message

Example output format:

Plan:
1.
2.
...

Deliverables:

path/to/file.ext

Commit Message:
<type(scope): description>

---

## 10. Troubleshooting & Recovery

If an error occurs:

1. Report exact error
2. Locate source file + line
3. Inspect related state changes
4. Propose minimal fix
5. Verify build

If stuck:

- Use file search to confirm code
- Don’t generate code until context is clear
- Break ambiguous tasks into searchable steps

---

## 11. AI Prompts Guidelines

When generating prompts:

- Ask for **analysis before action**
- NEVER generate code without a plan
- Reference `GEMINI.md` for goals
- Use console outputs to verify
- Fail gracefully

---

## 12. Iterative Roadmap

**MVP**

- Clean layout
- Full Pomodoro focus view
- Task list + scheduling
- Dashboard insights

**Next**

- Kanban board
- Filters, tags
- Natural language quick add
- Export/import

**Later**

- CRDT sync
- AI assisted quick add
- Plugin system
- App documentation

---

## 13. Definition of Done

A feature is complete when:

- Works offline
- Persists data
- Passes build/tests
- Matches UX goals
- Uses single source of truth
- Is understandable to humans.
