# Orbit - The Todo app reimagined

## Overview

Orbit is a local-first productivity application focused on fast, private, and highly-customisable task and focus management. The project is built progressively: a lean web-based (React + Vite) now, with a lightweight desktop shell (Tauri) and optional sync/AI features planned for later releases.

Orbit’s priorities:

- Have a low learning curve design by default.
- Keep user data local by default.
- Deliver a low-latency, keyboard-friendly UI.
- Enable deep customization (themes, density, fonts, UI size).
- Offer optional, opt-in cloud/AI features that respect privacy.
- Be free and open source software, forever.

## Key goals & value proposition

Orbit aims to combine things rarely found together:

1. **Simplicity & Power**: A clean, intuitive interface that scales with user needs.
2. **Local-first with Optional Sync**: Data is stored locally by default, with future plans for conflict-free sync.
3. **Customizability**: Themes, layouts, and workflows that adapt to individual preferences.
4. **Privacy-focused**: No data is sent to servers without explicit user consent.
5. **Open Source**: Community-driven development and transparency.
6. **Lightweight Desktop Experience**: Native-like performance with Tauri, avoiding bloat.
7. **Limitless Productivity Tools**: Built-in Pomodoro timer, task management, and more.
8. **Future-ready**: Plans for AI integration and semantic features, while keeping user control paramount.

## Features

### Included in v0.1 (Alpha)

- Local tasks with list & Kanban views
- Basic Pomodoro timer
- Sub-tasks and notes
- Default dark theme with blue accent and a theme presets UI
- Local persistence (browser IndexedDB for web; SQLite planned for desktop)
- Export / Import task data (JSON)

### Planned (short term: v0.2 → v0.3)

- Rich Markdown notes and attachments
- Natural-language quick add for tasks
- Fuzzy local search
- Additional theme presets (Material 3, Fluent)

### Planned (medium term: v1.0+)

- Optional CRDT-based device sync (conflict-free)
- Habit tracking & gamification
- Plugin API and extension marketplace
- Desktop binaries via Tauri (lightweight native shell)

### Long-term ideas (post v1.x)

- Semantic search & recommendations (optional, user-provided API keys)
- Calendar and external integrations
- Mobile responsive builds (progressive)

## Tech stack overview

- Frontend: **React** + **TypeScript** (Vite)  
- Styling: **Tailwind CSS v4** (via `@tailwindcss/vite`)  
- Local storage: **IndexedDB** for web; **SQLite** planned for Tauri desktop builds  
- State management: **Zustand** (recommended)  
- Sync (future): **CRDT** (Yjs / Automerge or similar)  
- Optional AI (future): Gemini API / local LLM (opt-in)

## Project roadmap

- **v0.1** — Alpha: core model, simple UI shell, Pomodoro, dark theme default.  
- **v0.2** — UI polish, sub-tasks, export/import, keyboard navigation, accessibility basics.  
- **v0.3** — Natural-language quick add, local search, multi-theme presets.  
- **v1.0 (approx. 1 month from v0.1)** — CRDT optional sync, habit features, plugin scaffolding.  
- **v1.x → v2+** — Accessibility refinements, color-blind palettes, semantic search, community plugins.
- **Long-term** — mobile builds, calendar integrations, local LLM support.

## Quick start — development (web)

Prerequisites:

- Node.js (16+ recommended)
- Git

Commands:

```bash
# clone (once)
git clone <repo-url> orbit
cd orbit

# install dependencies
npm install

# run dev server
npm run dev

# build for production (web)
npm run build
````

Notes:

- Tauri desktop dev and builds are planned; instructions will be added when Tauri integration is introduced.
- Tailwind v4 is enabled via the Vite plugin (`@tailwindcss/vite`). The project uses a CSS import of Tailwind; see `src/index.css`.

## Directory structure (recommended)

```
/src
  /components     # small, reusable UI components
  /layouts        # top-level layout components (AppShell, Sidebar, Main)
  /views          # page-level views (Dashboard, Board, Tasks)
  /lib            # utilities, api wrappers, storage adapters
  /hooks          # custom React hooks
  main.tsx
index.html
```

## Development workflow & conventions

- Branches:

  - `main` — production release (tagged)
  - `develop` — integration branch
  - `feat/<short-description>` — feature branch
  - `fix/<short-description>` — bugfix branch

- Commit style: Conventional Commits (e.g., `feat(pomodoro): add basic timer loop`) to support readable history and future automated releases.

- Pull requests:

  - Small, single-purpose PRs
  - Include a short testing note and screenshots for UI changes
  - Link to issue(s) when applicable

## Contribution guide

1. Check open issues or open a new issue to propose a change.
2. Fork the repository. Create a branch from `develop`.
3. Run tests/lint locally (if present).
4. Submit a pull request to `develop`. Include a clear description and testing steps.

Full contributing guidelines and code of conduct will be added as the project matures.

## Privacy & data handling

Orbit is **local-first**; data is stored locally by default. Any cloud or AI features will be opt-in and require explicit user configuration and API keys.

## License

This project is released under the **MIT License**. See `LICENSE` for details.
