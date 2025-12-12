/**
 * Main application shell layout component
 * Orchestrates sidebar, topbar, and main content areas with responsive behavior
 * Manages sidebar collapse state and provides the overall app structure
 * TODO: Add responsive behavior for mobile/tablet breakpoints
 * TODO: Implement route-based content loading
 */

import React, { useState } from 'react';
import Sidebar from '../components/Sidebar';
import Topbar from '../components/Topbar';
import MainView from '../components/MainView';
import CollapseButton from '../components/ui/CollapseButton';

interface AppShellProps {
  children?: React.ReactNode;
  className?: string;
}

const AppShell: React.FC<AppShellProps> = ({ 
  children, 
  className = '' 
}) => {
  const [sidebarCollapsed, setSidebarCollapsed] = useState(false);
  const [currentRoute, setCurrentRoute] = useState('dashboard');

  const handleSidebarToggle = () => {
    setSidebarCollapsed(!sidebarCollapsed);
  };

  const handleNavigate = (routeId: string) => {
    setCurrentRoute(routeId);
    // TODO: Implement actual routing when router is added
    console.log('Navigate to:', routeId);
  };

  const getPageTitle = () => {
    const routeMap: Record<string, string> = {
      dashboard: 'Dashboard',
      board: 'Board',
      tasks: 'Tasks',
      habits: 'Habits',
    };
    return routeMap[currentRoute] || 'Dashboard';
  };

  return (
    <div className={`h-screen flex bg-gray-50 dark:bg-gray-900 ${className}`}>
      {/* Sidebar */}
      <Sidebar 
        collapsed={sidebarCollapsed}
        onNavigate={handleNavigate}
      />
      
      {/* Main Content Area */}
      <div className="flex-1 flex flex-col min-w-0">
        {/* Topbar */}
        <Topbar title={getPageTitle()} />
        
        {/* Main View */}
        <MainView>
          {children}
        </MainView>
      </div>

      {/* Floating Collapse Button (only visible when sidebar is collapsed) */}
      {sidebarCollapsed && (
        <div className="fixed left-4 top-20 z-10">
          <CollapseButton 
            collapsed={sidebarCollapsed}
            onToggle={handleSidebarToggle}
          />
        </div>
      )}
    </div>
  );
};

export default AppShell;