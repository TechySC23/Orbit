// src/state/useUI.ts
import { createContext, useContext } from 'react';
import { type UIState } from './uiTypes';

// == CONTEXT ==
export const UIContext = createContext<UIState | undefined>(undefined);

// == HOOK ==
export const useUI = (): UIState => {
  const context = useContext(UIContext);
  if (context === undefined) {
    throw new Error('useUI must be used within a UIProvider');
  }
  return context;
};
