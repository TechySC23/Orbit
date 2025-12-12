/**
 * Keyboard navigation hook for sidebar navigation
 * Enables arrow key navigation through navigation items
 * TODO: Add more sophisticated keyboard navigation patterns when needed
 */

import { useCallback } from 'react';

interface UseKeyboardNavProps {
  itemCount: number;
  onSelectItem?: (index: number) => void;
}

export const useKeyboardNav = ({ itemCount, onSelectItem }: UseKeyboardNavProps) => {
  const onKeyDown = useCallback((event: React.KeyboardEvent<HTMLDivElement>) => {
    // Handle arrow key navigation
    if (event.key === 'ArrowDown' || event.key === 'ArrowUp') {
      event.preventDefault();
      
      const activeElement = document.activeElement as HTMLElement;
      const currentIndex = activeElement?.dataset?.navIndex 
        ? parseInt(activeElement.dataset.navIndex, 10) 
        : -1;
      
      let nextIndex = currentIndex;
      
      if (event.key === 'ArrowDown') {
        nextIndex = currentIndex < itemCount - 1 ? currentIndex + 1 : 0;
      } else if (event.key === 'ArrowUp') {
        nextIndex = currentIndex > 0 ? currentIndex - 1 : itemCount - 1;
      }
      
      // Find the next navigable element and focus it
      const nextElement = document.querySelector<HTMLButtonElement>(
        `[data-nav-index="${nextIndex}"]`
      );
      
      if (nextElement) {
        nextElement.focus();
        onSelectItem?.(nextIndex);
      }
    }
    
    // Handle Enter/Space to activate the focused item
    if (event.key === 'Enter' || event.key === ' ') {
      const activeElement = document.activeElement as HTMLElement;
      if (activeElement?.dataset?.navIndex) {
        const index = parseInt(activeElement.dataset.navIndex, 10);
        onSelectItem?.(index);
      }
    }
  }, [itemCount, onSelectItem]);
  
  return { onKeyDown };
};

export default useKeyboardNav;