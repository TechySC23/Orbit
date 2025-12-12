# GEMINI_GLOBAL.md — AI Operating Manual for Orbit

**Audience:** This document is written *for the AI*. It is the authoritative global context for any AI assistant (Gemini CLI, Copilot-style agents) working on **Orbit**. Read this first and follow it strictly for all code generation, edits, and suggestions.

**Project identity reminder (do not hallucinate):**

* **Project name:** Orbit
* **Type:** Local-first productivity (To‑Do) application
* **Target for this repo:** **v0.1‑alpha** (web MVP; desktop shell via Tauri planned later)
* **Core user problems Orbit solves:** private task management, focused workflows (Pomodoro), flexible views (list & Kanban), high customisability, fast offline-first UX.

---

## Primary mission for the AI

When invoked in this repository, your job is to act as a dependable engineering teammate who:

1. Produces **correct**, **maintainable**, and **typed** TypeScript + React code.
2. Prioritises **clarity, accessibility, and UI polish** for the v0.1‑alpha web MVP.
3. Avoids adding features that are out of scope for v0.1 (no storage layer changes, no sync, no AI features beyond opt‑in placeholders).
4. Writes small, well‑scoped changes and explains them concisely. Do not overwrite large files unless explicitly instructed.

Always reference the project local `GEMINI.md` for task‑level constraints; use this global file as higher‑level policy and style guidance.

---

## Tech stack (truthful and exact)

* **Frontend:** React + TypeScript + Vite (web) — this is the immediate working environment.
* **Styling:** Tailwind CSS v4 via `@tailwindcss/vite`. Use Tailwind utility classes; only add CSS modules for micro‑layout exceptions.
* **Icons:** `lucide-react` is allowed and recommended for consistent iconography. No other new UI libraries without explicit instruction.
* **State:** Local component state and small stores (Zustand) may be used later; do not introduce heavy state libraries preemptively.
* **Persistence & packaging:** IndexedDB for web MVP (abstractions already present); Tauri + SQLite planned for desktop packaging after v0.1. Do not modify storage adapters in this pass.

---

## Scope boundaries (hard rules)

* **Allowed:** UI polish, accessibility improvements, layout refactors, component extraction, icon replacement, design token unification, small helper hooks for UI logic, and TypeScript typing fixes. Add tests or lint config where appropriate but keep changes minimal and focused.
* **Forbidden:** Implementing full persistence/sync, adding or changing API keys, integrating third‑party backend services, large rewrites of architecture, or introducing major new dependencies (exceptions require explicit approval).

If asked to implement forbidden items, refuse and instead propose a minimal UI placeholder and a clear plan for the future work.

---

## Design tokens & visual system (v0.1 canonical)

Use these tokens consistently in components you touch.

**Color / semantic tokens (Tailwind classes):**

* Background: `bg-slate-900` (app shell) / `bg-slate-800` (main content)
* Sidebar: `bg-slate-950` with subtle `border-r border-slate-800`
* Primary text: `text-slate-100`; secondary: `text-slate-300`
* Accent: `sky-400` for icons/text; selection border: `border-sky-500/60`
* Focus ring: `ring-2 ring-sky-500/60` for interactive elements

**Spacing & shapes:**

* Use `rounded-lg` / `rounded-xl` for cards and nav items.
* Sidebar nav items: `px-4 py-3 gap-3 flex items-center`. Icon container: `w-8 h-8 flex items-center justify-center rounded-md bg-slate-700/40`.

**Typography guidelines:**

* App title (sidebar): `text-4xl font-extrabold` (desktop).
* Page title (topbar): `text-3xl font-semibold`.
* Navigation labels: `text-lg`.

---

## Accessibility & semantics (non-negotiable)

* Use semantic HTML (or ARIA roles for complex widgets): `<nav>`, `<main>`, `<header>`, `<aside>`. For React components that are interactive, use proper `<button>` elements rather than generic `<div>` where possible.
* All interactive controls must be keyboard accessible and show a visible focus indicator. Use `tabIndex` only when necessary and explain why in a brief comment.
* Add `aria-expanded` to collapse controls, `aria-label` for icon-only buttons, and `role="navigation"` for the sidebar.
* Confirm color contrast for critical text and controls; prefer higher-contrast utility classes from the slate palette.

---

## File & component conventions

* One component per file. File names must match component PascalCase (e.g., `Sidebar.tsx`). Small UI primitives may live under `/src/components/ui/`.
* Export default the component as the primary export. Also export types where public (e.g., `export type NavItem = { id: string; label: string }`).
* Keep components under ~200 lines where feasible; if logic grows, extract to a hook inside `/src/hooks/`.

---

## Commit & PR expectations

* Provide a concise Conventional Commit message for each atomic change. Single milestone UI polish should be a single commit: e.g. `feat(ui): polish app shell, sidebar, topbar, and main view (v0.1-alpha)`.
* If you generate multiple logical changes, group them into small commits with clear scopes.
* A PR should include a short testing checklist and any manual validation steps.

---

## When addressing issues or refactors

Follow this thought process before editing code:

1. Reproduce/confirm the issue in reasoning. (If needed, ask for the minimal terminal output or failing screenshot.)
2. Identify the smallest safe change that resolves the root cause.
3. Implement the change, add a brief inline comment (1 line) why this pattern was chosen. Avoid speculative refactors.
4. Run `tsc` mentally to ensure types line up; avoid introducing `any`.

If a requested change requires broad architectural work, produce a step-by-step migration plan rather than implementing it in one go.

---

## How to respond in output from Gemini CLI operations

When you modify files, in your final reply to the user provide:

1. A list of changed files (paths).
2. One combined Conventional Commit message covering all changes.
3. A short testing checklist specific to the changes.
4. Any follow-up suggestions or risks (1–3 bullet points).

Do not print whole file contents in the final report unless explicitly asked.

---

## Prompt interpretation rules

* If the human asks for design direction or multiple credible options, propose 2 options and recommend one with a short rationale. Implementation follows the single chosen option.
* If the human provides a codebase snippet to change, only edit the necessary lines and keep modifications minimal.
* Never invent external services, endpoints, or credentials. If the human asks for integrations, request user approval and a plan.

---

## Error handling & debugging guidance for AI

* If TypeScript errors are likely, explain the minimal type change necessary to fix them. Show only the specific line or small snippet to update, not the entire file.
* For runtime errors, suggest where to place console logs or how to inspect component props/state.

---

## Exit & safe-fail behavior

* If uncertain about a destructive change, do not commit. Instead produce a clear plan and small, reversible patch.
* If you cannot satisfy the user request due to scope or missing context, explain why and propose a bounded alternative.

---

## Final note — do not hallucinate

* Always base changes on actual files in the repository. If you cannot find a file referenced in a prompt, report exactly which files were missing and offer a safe alternative.
* This file overrides previous global context files; it represents the authoritative guidance for Orbit.

***End of GEMINI_GLOBAL.md***
