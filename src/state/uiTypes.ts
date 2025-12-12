// src/state/uiTypes.ts

export type Task = {
  id: string;
  title: string;
  description?: string;
  dueDate?: string;
  priority?: 'low' | 'medium' | 'high';
  createdAt: string;
};

export type Settings = {
  theme: 'light' | 'dark';
  font: 'Inter' | 'Roboto' | 'Sora';
  reduceMotion: boolean;
  saveDraft: boolean;
};

export type UIState = {
  tasks: Task[];
  addTask: (task: Omit<Task, 'id' | 'createdAt'>) => void;
  removeTask: (id: string) => void;
  currentRoute: string;
  setCurrentRoute: (route: string) => void;
  settings: Settings;
  setSettings: (settings: Partial<Settings>) => void;
  isAddTaskModalOpen: boolean;
  setAddTaskModalOpen: (isOpen: boolean) => void;
  isSettingsModalOpen: boolean;
  setSettingsModalOpen: (isOpen: boolean) => void;
};
