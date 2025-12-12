/**
 * Collapsible sidebar navigation component
 * Displays app logo and navigation items with keyboard navigation support
 * TODO: Add active state highlighting based on current route
 * TODO: Add navigation icons when available from design system
 */

import React, { useState } from 'react';
import routes from '../lib/routes';
import useKeyboardNav from '../hooks/useKeyboardNav';

interface SidebarProps {
  collapsed: boolean;
  onNavigate?: (routeId: string) => void;
  className?: string;
}

const Sidebar: React.FC<SidebarProps> = ({ 
  collapsed, 
  onNavigate, 
  className = '' 
}) => {
  const [selectedIndex, setSelectedIndex] = useState(0);
  const { onKeyDown } = useKeyboardNav({
    itemCount: routes.length,
    onSelectItem: (index) => {
      setSelectedIndex(index);
      onNavigate?.(routes[index].id);
    },
  });

  const handleNavigate = (routeId: string, index: number) => {
    setSelectedIndex(index);
    onNavigate?.(routeId);
  };

  return (
    <aside
      className={`
        bg-white dark:bg-gray-800 
        border-r border-gray-200 dark:border-gray-700
        transition-all duration-300 ease-in-out
        ${collapsed ? 'w-16' : 'w-64'}
        flex flex-col
        ${className}
      `}
      aria-label="Main navigation"
      aria-expanded={!collapsed}
    >
      {/* App Logo/Title */}
      <div className="h-16 flex items-center justify-center border-b border-gray-200 dark:border-gray-700">
        {collapsed ? (
          <div className="w-8 h-8 bg-blue-600 rounded-lg flex items-center justify-center">
            <span className="text-white font-bold text-lg">O</span>
          </div>
        ) : (
          <h1 className="text-xl font-bold text-gray-900 dark:text-gray-100">
            Orbit
          </h1>
        )}
      </div>

      {/* Navigation */}
      <nav 
        className="flex-1 px-3 py-4 space-y-1"
        role="navigation"
        aria-label="Sidebar navigation"
        onKeyDown={onKeyDown}
      >
        {routes.map((route, index) => {
          const isSelected = selectedIndex === index;
          
          return (
            <button
              key={route.id}
              data-nav-index={index}
              onClick={() => handleNavigate(route.id, index)}
              className={`
                w-full flex items-center px-3 py-2 text-sm font-medium rounded-md
                transition-colors duration-200
                focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-inset
                ${
                  isSelected
                    ? 'bg-blue-100 dark:bg-blue-900 text-blue-900 dark:text-blue-100'
                    : 'text-gray-700 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-700'
                }
                ${collapsed ? 'justify-center' : 'justify-start'}
              `}
              aria-current={isSelected ? 'page' : undefined}
              aria-label={`Navigate to ${route.label}${collapsed ? ' (sidebar collapsed)' : ''}`}
              title={collapsed ? route.label : undefined}
            >
              {/* Navigation Icon Placeholder */}
              <div 
                className={`
                  flex-shrink-0 w-5 h-5 
                  ${collapsed ? '' : 'mr-3'}
                `}
              >
                {/* TODO: Replace with actual icons */}
                <div className="w-full h-full bg-current opacity-50 rounded" />
              </div>
              
              {!collapsed && (
                <span className="truncate">{route.label}</span>
              )}
            </button>
          );
        })}
      </nav>
    </aside>
  );
};

export default Sidebar;