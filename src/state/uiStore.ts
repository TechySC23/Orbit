import { create } from "zustand";
import { persist } from "zustand/middleware";
import type { Task, Settings } from "./uiTypes";

export type SidebarMode = "collapsed" | "expanded";

interface UIState {
	// Data
	tasks: Task[];

	// Routing
	currentRoute: string;
	previousRoute: string | null;

	// UI Settings (Persisted)
	settings: Settings;
	sidebarMode: SidebarMode;

	// UI Elements
	isAddTaskModalOpen: boolean;

	// Actions
	addTask: (task: Omit<Task, "id" | "createdAt">) => void;
	removeTask: (id: string) => void;
	setCurrentRoute: (route: string) => void;
	setSettings: (partial: Partial<Settings>) => void;
	setSidebarMode: (mode: SidebarMode) => void;
	setAddTaskModalOpen: (isOpen: boolean) => void;
}

export const useUIStore = create<UIState>()(
	persist(
		(set, get) => ({
			tasks: [],
			currentRoute: "dashboard",
			previousRoute: null,
			sidebarMode: "expanded",
			isAddTaskModalOpen: false,
			settings: {
				theme: "dark",
				font: "Inter",
				reduceMotion: false,
				saveDraft: true,
			},

			addTask: (task) => {
				set((state) => ({
					tasks: [
						...state.tasks,
						{
							...task,
							id: crypto.randomUUID(),
							createdAt: new Date().toISOString(),
						},
					],
				}));
			},

			removeTask: (id) => {
				set((state) => ({
					tasks: state.tasks.filter((t) => t.id !== id),
				}));
			},

			setCurrentRoute: (route) => {
				const { currentRoute } = get();
				if (currentRoute === route) return;
				set({
					previousRoute: currentRoute,
					currentRoute: route,
				});
			},

			setSettings: (partial) => {
				set((state) => ({
					settings: { ...state.settings, ...partial },
				}));
			},

			setSidebarMode: (mode) => {
				set({ sidebarMode: mode });
			},

			setAddTaskModalOpen: (isOpen) => {
				set({ isAddTaskModalOpen: isOpen });
			},
		}),
		{
			name: "orbit-ui-storage",
			partialize: (state) => ({
				settings: state.settings,
				sidebarMode: state.sidebarMode,
				isAddTaskModalOpen: state.isAddTaskModalOpen,
				// Implicitly NOT persisting currentRoute, previousRoute, or tasks per current plan
				// Wait, tasks should probably be persisted if it's local-first?
				// GEMINI.md says "Persistence: IndexedDB fallback (localForage), SQLite via Tauri".
				// The user said "Persist only UI preferences (sidebarMode, font, theme). Do NOT persist navigation".
				// I will stick to the user's explicit instruction for Phase 2: ONLY UI preferences.
			}),
		},
	),
);
