
import React, { createContext, useContext, useState, useEffect, ReactNode } from 'react';

// == TYPES ==
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

type UIState = {
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

// == DEFAULTS & LOCALSTORAGE ==
const getInitialSettings = (): Settings => {
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

const getInitialTasks = (): Task[] => {
    // For v0.1, tasks are in-memory. This can be extended later.
    return [];
}

// == CONTEXT ==
const UIContext = createContext<UIState | undefined>(undefined);

// == PROVIDER ==
export const UIProvider = ({ children }: { children: ReactNode }) => {
  const [tasks, setTasks] = useState<Task[]>(getInitialTasks());
  const [currentRoute, setCurrentRoute] = useState<string>('dashboard');
  const [settings, setSettingsState] = useState<Settings>(getInitialSettings());
  const [isAddTaskModalOpen, setAddTaskModalOpen] = useState(false);
  const [isSettingsModalOpen, setSettingsModalOpen] = useState(false);

  useEffect(() => {
    // Apply theme
    document.documentElement.dataset.theme = settings.theme;
    // Apply font
    document.documentElement.style.setProperty('--ui-font', `"${settings.font}", system-ui, sans-serif`);
    // Apply reduced motion
    if (settings.reduceMotion) {
      document.documentElement.dataset.reducedMotion = 'true';
    } else {
      delete document.documentElement.dataset.reducedMotion;
    }
  }, [settings]);

  const setSettings = (newSettings: Partial<Settings>) => {
    setSettingsState(prevSettings => {
      const updatedSettings = { ...prevSettings, ...newSettings };
      localStorage.setItem('orbit:settings', JSON.stringify(updatedSettings));
      return updatedSettings;
    });
  };

  const addTask = (task: Omit<Task, 'id' | 'createdAt'>) => {
    const newTask: Task = {
      ...task,
      id: `${Date.now()}`,
      createdAt: new Date().toISOString(),
    };
    setTasks(prevTasks => [...prevTasks, newTask]);

    if (settings.saveDraft) {
        localStorage.setItem('orbit:task-draft', JSON.stringify(newTask));
    }
  };

  const removeTask = (id: string) => {
    setTasks(prevTasks => prevTasks.filter(task => task.id !== id));
  };

  const value = {
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
    setSettingsModalOpen
  };

  return <UIContext.Provider value={value}>{children}</UIContext.Provider>;
};

// == HOOK ==
export const useUI = (): UIState => {
  const context = useContext(UIContext);
  if (context === undefined) {
    throw new Error('useUI must be used within a UIProvider');
  }
  return context;
};
