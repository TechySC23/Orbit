/**
 * Route definitions for the Orbit application navigation
 * Includes `lucide-react` icons for consistent UI
 */

import { LayoutDashboard, Kanban, ListTodo, Repeat, Brain, type LucideIcon } from "lucide-react";

export interface Route {
	id: string;
	label: string;
	icon: LucideIcon;
}

export const routes: Route[] = [
	{ id: "dashboard", label: "Dashboard", icon: LayoutDashboard },
	{ id: "board", label: "Board", icon: Kanban },
	{ id: "tasks", label: "Tasks", icon: ListTodo },
	{ id: "focus", label: "Focus", icon: Brain },
	{ id: "habits", label: "Habits", icon: Repeat },
];

export default routes;
