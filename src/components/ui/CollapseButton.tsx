/**
 * Sidebar collapse toggle button component
 * Toggles between collapsed/expanded states with animated chevron icon
 * TODO: Add animation for chevron rotation when advanced transitions are needed
 */

import React from 'react';
import IconButton from './IconButton';

interface CollapseButtonProps {
  collapsed: boolean;
  onToggle: () => void;
  className?: string;
}

const CollapseButton: React.FC<CollapseButtonProps> = ({ 
  collapsed, 
  onToggle, 
  className = '' 
}) => {
  const ChevronIcon = (
    <svg
      className={`h-4 w-4 transition-transform duration-200 ${collapsed ? 'rotate-180' : ''}`}
      fill="none"
      viewBox="0 0 24 24"
      stroke="currentColor"
      aria-hidden="true"
    >
      <path
        strokeLinecap="round"
        strokeLinejoin="round"
        strokeWidth={2}
        d="M15 19l-7-7 7-7"
      />
    </svg>
  );

  return (
    <IconButton
      aria-label={collapsed ? 'Expand sidebar' : 'Collapse sidebar'}
      onClick={onToggle}
      className={className}
      variant="ghost"
      size="sm"
    >
      {ChevronIcon}
    </IconButton>
  );
};

export default CollapseButton;