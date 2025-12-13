// src/state/uiUtils.ts
import type { Settings, Task } from "./uiTypes";

export const getInitialSettings = (): Settings => {
  const savedSettings = localStorage.getItem('orbit:settings');
  const defaults: Settings = {
    theme: 'dark',
    font: 'Inter',
    reduceMotion: false,
    saveDraft: true,
  };
  try {
    return savedSettings ? { ...defaults, ...JSON.parse(savedSettings) } : defaults;
  } catch (error) {
    console.error("Failed to parse settings from localStorage", error);
    return defaults;
  }
};

export const getInitialTasks = (): Task[] => {
    // For v0.1, tasks are in-memory. This can be extended later.
    return [];
};
