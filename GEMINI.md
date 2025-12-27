# GEMINI.md

## Project Name: Orbit  

**A Local-First, Offline-Capable Productivity System**

---

## 0. Purpose of This File (Critical)

This file exists primarily for **AI agents** (Gemini CLI, coding assistants, refactoring tools) that work on the Orbit codebase.  
It is the **primary and authoritative source** for all architectural, philosophical, and procedural decisions.

Its job is to:

- **Prevent architectural drift**  
  By defining fixed technical boundaries (Section 6) and non-negotiable laws (Section 7), all code must align with the established structure.

- **Prevent duplicated state or logic**  
  By mandating a Single Source of Truth for core data, we avoid inconsistent state and long-term maintenance issues.

- **Prevent “tool loops”**  
  The planning and execution rules in Section 9 force sequential, executable steps instead of endless planning.

- **Force disciplined, verifiable development**  
  Every change must map to the roadmap and satisfy the Definition of Done.

- **Ensure consistent decision-making**  
  This document acts as a canonical style guide, decision log, and scope boundary.

If instructions here conflict with assumptions made by an AI (for example, assuming a cloud dependency), **this file overrides the AI’s assumptions**.

---

## 1. High-Level Vision

Orbit is a **local-first productivity application** designed to be a complete personal digital workspace.  
Its core purpose is to manage **tasks, time, and focus** without reliance on external services.

Orbit must be:

- **Fully usable without internet access**  
  All canonical data is stored locally (SQLite / IndexedDB). Network loss must never interrupt workflow.

- **Fast on low-end hardware**  
  Achieved through minimal dependencies, efficient React rendering, and a Tauri + Rust backend.

- **Private by default**  
  User data never leaves the device unless the user explicitly opts in. No telemetry. No analytics.

- **Deeply customizable without being overwhelming**  
  Customization is progressively disclosed. Simple defaults first, deep control later.

- **Suitable for beginners and advanced users**  
  Simple task entry for newcomers; keyboard-first, automation-ready workflows for power users.

- **Easy to maintain and extend**  
  Enforced via strict TypeScript, Zod validation, and separation of concerns.

Orbit is **not** a clone of any existing app.  
It is a synthesis of proven ideas, built with modern tooling and a rigid architectural spine.

Orbit must feel:

- **Calm, not noisy**  
- **Capable, not bloated**  
- **Powerful, not confusing**

---

## 2. Core Philosophy

### 2.1 Local-First First Principles

Orbit follows the strongest interpretation of the local-first model:

- Core features must work with **zero network access**
- No account is required for core functionality
- All user data lives locally by default
- Sync, AI, and cloud features are **optional layers**, never dependencies

Local-first is **not an optimization**.  
It is the default operating mode, chosen for latency, reliability, and data ownership.

---

### 2.2 Open Source ≠ Rough Edges

Orbit is open source, but:

- UI must feel intentional and polished
- Code must be readable and conventional
- State must be predictable and explicit
- Features must be finished or explicitly disabled

Incomplete experiments must **never** ship as half-features.

---

### 2.3 Simple Defaults, Infinite Depth

Orbit must be usable in under 5 minutes:

- Add a task
- Start a Pomodoro
- Change a theme
- View tasks
- Basic keyboard navigation
- Hyper fast navigation (command palette later)

At the same time, Orbit must allow:

- Advanced workflows (filters, automation, scripting later)
- Deep UI customization (fonts, colors, layouts, themes, colors, text size, etc.)
- Keyboard-first navigation, and mouse for beginners.
- Power-user features without friction

Nothing advanced is forced on beginners.

---

## 3. Target Users

### Students

- Assignments and deadlines
- Study sessions with Pomodoro
- Habit building
- Minimal friction note-taking

### Professionals

- Project planning
- Task prioritization
- Time tracking via focus sessions
- Keyboard-driven workflows

### Power Users

- Custom themes
- Plugin system (future)
- Automation hooks
- Full data ownership

All three groups must be supported **without fragmenting the app**.

---

## 4. Feature Scope (Authoritative)

### 4.1 Task System

The Task is the atomic unit of Orbit.

- Tasks (name, description, priority, date{today, tomorrow, weekend, few hours later, evening, morning, etc.}, etc.)
- Sub-tasks (recursive, shallow by default: max 3 levels, not quantitatively enforced)
- Priorities (user-configurable)
- Due dates and soft deadlines
- Recurring tasks
- States: todo / doing / done / archived, (customizable in future)
- Filters (by state, priority, tags, due date)
- Sorting (by due date, priority, creation date, custom)
- Actions supported even as bulk (change state, delete, tag, prioritize, duplicate, copy.)
- Quick add (natural language support planned)

Bonus features:

- Tags (user-defined, multi-select)
- Import / export (JSON, CSV, markdown, etc. future)
- Pinnable. (future)
- Won't Do. (postpone like feature) [unplanned.]

Archived tasks are hidden by default but always searchable.

---

### 4.2 Views

Views are **pure projections of state**.

- Classic list view
- Kanban view - columns based on task state (Drag and drop to change state)
- Eisenhower Matrix (future)
- Upcoming, Today, Overdue smart views
- Custom views (future)
- Future calendar/timeline support

Bonus features:

- Grouping (by tag, priority, due date)
- Collapsible sections

Views **do not own state**.  
They render filtered/sorted data from the store.

---

### 4.3 Pomodoro & Focus

- Configurable Pomodoro cycles
- Task-linked sessions
- Local persistence of sessions
- Session history and stats (local only)
- Optional short breaks and long breaks
- Support for timeline view of the day's pomodoro sessions. (future)

Pomodoro must:

- Work offline
- Survive reloads
- Never block task interaction
- Be customizable
- Support notifications (local only)
- Also support ambient sounds (optional, future.)

---

### 4.4 Notes System

Notes are task-attached by default, but extensible.

Baseline:

- Markdown support
- Inline formatting
- Code blocks

Planned:

- Block-based note model (Notion-style, local, toggleable)
- Structured storage (not raw strings)
- Extensible block types

Notes must be:

- Fast
- Exportable
- Non-proprietary
- Plugin-friendly (future)

---

### 4.5 Habits & Gamification

Inspired by Habitica, but grounded.

- Habits
- Streaks
- XP and levels
- Visual feedback
- Positive reinforcement

Rules:

- Optional
- Fully disable-able
- Never affect core task logic
- Motivational, not manipulative

---

### 4.6 Themes & Customization

#### Default

- Dark theme
- Blue accent
- Clean and neutral

#### Systems

- Fluent Design
- Material 3 Expressive
- Fully custom themes
- And more themes.

#### Options

- Accent colors
- Fonts
- UI scale
- Text size
- Icons
- Animations
- Sounds
- etc.

Accessibility:

- Reduced motion
- Full keyboard navigation
- WCAG AA contrast minimum

---

### 4.7 AI (Optional, Opt-In)

AI is an **external utility layer**.

Planned uses:

- Speech-to-text (Gemini API)
- Semantic search
- Task suggestions
- Productivity summaries
- Natural language task entry
- Automated note organization (decision pending)

Rules:

- Never required
- Never blocking
- Clearly labeled
- Graceful failure
- Fully disable-able

---

## 5. Inspiration: Principles, Not Copies

- **Todoist** → Speed, low friction
- **TickTick** → Feature cohesion
- **Notion** → Structured content, gentle learning
- **Obsidian** → Local data ownership
- **Raycast** → Keyboard-first speed
- **Habitica** → Positive engagement

Avoid:

- Mandatory accounts
- Cloud lock-in
- Over-gamification
- Feature overload on first launch
- Cluttered UI
- Slow performance
- Unpredictable state
- Proprietary data formats
- Poor accessibility
- Inconsistent UX patterns
- Ugly design

---

## 6. Technical Stack (Fixed)

Frontend:

- React
- TypeScript
- Vite

UI:

- Tailwind CSS
- shadcn/ui

State:

- Zustand

Desktop:

- Tauri (Rust backend)

Persistence:

- SQLite (primary)
- IndexedDB via localForage (fallback)

Validation:

- Zod

Sync (future):

- CRDT (Automerge or Yjs)

AI:

- Gemini API (optional)

Tooling:

- GitHub Actions
- Commit lint
- Semantic release

---

## 7. Architectural Laws (Non-Negotiable)

1. **Single Source of Truth**
   - UI state → `uiStore.tsx`
   - Core data → `dataStore.tsx`
   - No duplicate providers or hooks

2. **Clear Separation**
   - UI ≠ State ≠ Persistence ≠ Sync

3. **Offline First**
   - No feature assumes network access

4. **Type Safety**
   - No `any`
   - Prefer `unknown`
   - Use type-only imports

5. **Predictable State**
   - No hidden side effects
   - Explicit updates only

---

## 8. Roadmap

This roadmap is just a rough and flexible guide, please ask the user for more details if needed.

### v0.1 — MVP

- Local-only
- Tasks
- Kanban + list
- Pomodoro
- SQLite persistence
- Settings
- Default dark theme

### v0.2

- Sub-tasks
- Markdown notes
- Priority UI
- Export / import

### v0.3

- Natural language quick add
- Theme presets
- Local fuzzy search

### v1

- Optional CRDT sync
- Habits
- Accessibility & keyboard UX

### v1.5+

- AI features
- Plugin system
- Documentation site

---

## 9. AI Agent Instructions (Critical)

### Before Changes

- Read repo structure
- Identify patterns
- Locate source of truth
- Understand existing code
- Understand which feature to change.
- Understand the effects.

### Planning

- Always create a plan
- Small, executable steps
- and use the write_todos tool.
- Categorize by time:
  - Very Short (<30 sec)
    - Short (<1 min)
    - Medium (~5 min)
    - Long (~10 min)
    - Very Long (>10 min)
- Break down long tasks
- Execute sequentially
- Verify after each step
- No multi-tasking.

### Execution

- One focused change set
- Verify build/tests
- Remove deprecated code
- Document changes
- Update types
- Follow established patterns

### When Stuck

- Stop
- Re-read existing code
- Search before inventing
- Do not introduce new abstractions
- Search online using the Google Search tool.
- Also check the todos for incomplete or leftover (commonly in progress) tasks.
  - If still stuck, find the in progress task, and make it complete, and resume the work from there.

### Completion

- Summarize changes
- Provide commit message
- List risks and follow-ups

---

## 10. Definition of Done

A feature is complete when:

- Works offline
- Persists correctly
- Does not break existing flows
- Is understandable to the developer.
- Respects Orbit’s philosophy

---

**End of GEMINI.md**
