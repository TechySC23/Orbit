// src/state/uiStore.tsx
import { createContext, useContext, useState, type ReactNode } from "react";
import type { UIState, Task, Settings } from "./uiTypes";
import { getInitialSettings, getInitialTasks } from "./uiUtils";

const UIContext = createContext<UIState | null>(null);

export function UIProvider({ children }: { children: ReactNode }) {
	const [tasks, setTasks] = useState<Task[]>(getInitialTasks());
	const [currentRoute, setCurrentRoute] = useState("/");
	const [settings, setSettingsState] = useState<Settings>(getInitialSettings());
	const [isAddTaskModalOpen, setAddTaskModalOpen] = useState(false);
	const [isSettingsModalOpen, setSettingsModalOpen] = useState(false);

	const addTask: UIState["addTask"] = (task) => {
		setTasks((prev) => [
			...prev,
			{
				...task,
				id: crypto.randomUUID(),
				createdAt: new Date().toISOString(),
			},
		]);
	};

	const removeTask: UIState["removeTask"] = (id) => {
		setTasks((prev) => prev.filter((t) => t.id !== id));
	};

	const setSettings: UIState["setSettings"] = (partial) => {
		setSettingsState((prev) => ({ ...prev, ...partial }));
	};

	const value: UIState = {
		tasks,
		addTask,
		removeTask,
		currentRoute,
		setCurrentRoute,
		settings,
		setSettings,
		isAddTaskModalOpen,
		setAddTaskModalOpen,
		isSettingsModalOpen,
		setSettingsModalOpen,
	};

	return <UIContext.Provider value={value}>{children}</UIContext.Provider>;
}

export function useUI() {
	const ctx = useContext(UIContext);
	if (!ctx) {
		throw new Error("useUI must be used inside UIProvider");
	}
	return ctx;
}
