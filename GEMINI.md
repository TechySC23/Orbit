# Orbit — Project Context & Guidelines

This file defines the instruction context that Gemini CLI (and other AI coding assistants) should use when generating or modifying code in this repository. Place this at the project root. Do not remove unless intentionally disabling AI context.

## Core Project Summary

**Orbit** is a productivity application with a local-first focus.  
Goal for v0.1-alpha (web MVP): Deliver a professional, accessible, desktop-first UI shell with task navigation and placeholders for core modules (Dashboard, Board, Tasks, Habits).  
Future releases will deliver persistent storage, sync, AI features, and plugins.

## Tech Stack

- **Frontend:** React + TypeScript + Vite  
- **Styling:** Tailwind CSS v4 (via `@tailwindcss/vite`)  
- **Icons:** lucide-react  
- **Future enhancements:** Zustand store, SQLite (Tauri), CRDT sync, optional AI

## Coding Standards

- **TypeScript first:** All components must be typed; avoid `any`.  
- **Functional components only.**  
- **Hooks for state logic.**  
- **Tailwind utility-first styling:** Avoid custom CSS except tiny modules for layout fixes.  
- **Consistent spacing & tokens:** Use the designated slate/sky palette (dark default).  
- **Accessibility:** Focus rings, `aria-*` on interactive elements, keyboard navigation.

## UI & Design Tokens

Use these tokens consistently:

- **Palette (dark default):**
  - Sidebar: `bg-slate-950`, nav item: `bg-slate-800`, hover: `bg-slate-800/70`  
  - Main: `bg-slate-900`  
  - Text primary: `text-slate-100`, secondary: `text-slate-300`  
  - Accent: `sky-400` (text) / `sky-500/60` (borders)  
  - Focus ring: `ring-2 ring-sky-500/60`

- **Typography:**
  - App title: `text-4xl font-extrabold`
  - Page title: `text-3xl font-semibold`
  - Nav item labels: `text-lg`

- **Layout & spacing:**
  - Sidebar items: `px-4 py-3 rounded-xl`
  - Icon containers: `w-8 h-8 flex items-center justify-center rounded-md bg-slate-700/40`

## Component Responsibilities

### App Shell

- Manages overall layout: sidebar, topbar, content view.
- Accepts no props for now; manages internal layout state.
- Should be accessible and keyboard friendly.

### Sidebar

- Shows navigation items with icons.
- Collapsible: show icons only when collapsed.
- Highlights selected item with accent border and color.
- Supports keyboard navigation (arrow keys, Enter).

### Topbar

- Displays current page title.
- Includes search input with `aria-label`.
- Includes Pomodoro placeholder (non-functional).
- Includes theme toggle (updates `data-theme` on `document.documentElement`).

### MainView

- Scrollable content area.
- Default placeholder text center aligned when empty.

## Behavior Rules

- **Do not implement backend logic yet.**  
- **Do not implement routing yet.**  
- **Do not implement storage yet.**  
- Focus only on layout and UI polish for v0.1-alpha.

## When Generating Code

When responding to coding requests:

- Include brief inline comments explaining decisions (1–2 lines).  
- Ensure no TypeScript errors compile.  
- Use only permitted dependencies.  
- Ask a clarifying question if requirements are ambiguous.

## Manuals & Scripts

- Dev run: `npm install` → `npm run dev`  
- Build web: `npm run build`

## AI Interaction Expectations

- Use this context by default; do not ask for it again.  
- For every task, return a **single combined commit message** following Conventional Commits.  
- Do not modify files outside the intended scope.

## Commit Style

Use Conventional Commits:

```
feat(scope): short description (v0.1-alpha)
fix(scope): fix description
refactor(scope): restructure description
docs(scope): update documentation
```

## Current Milestone

**v0.1-alpha:** UI polish only, no persistence, no routing, no sync.

End of instruction context.
