/**
 * Top navigation bar with page title, search, and utility components
 * Contains theme toggle and Pomodoro widget placeholder
 * TODO: Implement search functionality when backend integration is ready
 * TODO: Add real Pomodoro widget with timer functionality
 */

import React from 'react';
import ThemeToggle from './ui/ThemeToggle';

interface TopbarProps {
  title?: string;
  className?: string;
}

const Topbar: React.FC<TopbarProps> = ({ 
  title = 'Dashboard', 
  className = '' 
}) => {
  return (
    <header 
      className={`
        h-16 bg-white dark:bg-gray-800 
        border-b border-gray-200 dark:border-gray-700 
        px-6 flex items-center justify-between
        ${className}
      `}
      role="banner"
    >
      {/* Left side - Page title */}
      <div className="flex-1">
        <h1 
          className="text-xl font-semibold text-gray-900 dark:text-gray-100"
          aria-live="polite"
        >
          {title}
        </h1>
      </div>

      {/* Center - Search input */}
      <div className="flex-1 max-w-md mx-8">
        <div className="relative">
          <label 
            htmlFor="global-search" 
            className="sr-only"
          >
            Search
          </label>
          <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
            <svg
              className="h-4 w-4 text-gray-400"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
              aria-hidden="true"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"
              />
            </svg>
          </div>
          <input
            id="global-search"
            type="search"
            placeholder="Search..."
            className="
              block w-full pl-10 pr-3 py-2 
              border border-gray-300 dark:border-gray-600
              rounded-md leading-5 
              bg-white dark:bg-gray-700
              text-gray-900 dark:text-gray-100
              placeholder-gray-500 dark:placeholder-gray-400
              focus:outline-none focus:ring-1 focus:ring-blue-500 
              focus:border-blue-500
              sm:text-sm
            "
            aria-label="Search functionality (not yet implemented)"
          />
        </div>
      </div>

      {/* Right side - Utilities */}
      <div className="flex-1 flex items-center justify-end space-x-3">
        {/* Pomodoro widget placeholder */}
        <div className="hidden md:flex items-center space-x-2 px-3 py-1 rounded-md bg-gray-100 dark:bg-gray-700">
          <div className="w-2 h-2 bg-green-500 rounded-full animate-pulse" />
          <span className="text-sm text-gray-600 dark:text-gray-400">
            25:00
          </span>
        </div>
        
        <ThemeToggle />
      </div>
    </header>
  );
};

export default Topbar;