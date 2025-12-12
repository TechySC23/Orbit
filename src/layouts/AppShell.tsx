/**
 * Main application shell layout, orchestrating polished UI components.
 * Manages sidebar collapse state and renders the main app structure.
 */
import React, { useState } from "react";
import Sidebar from "../components/Sidebar";
import Topbar from "../components/Topbar";
import MainView from "../components/MainView";
import routes from "../lib/routes";

const AppShell: React.FC = () => {
	const [sidebarCollapsed, setSidebarCollapsed] = useState(false);
	const [currentRoute, setCurrentRoute] = useState("dashboard"); // Default route

	const handleSidebarToggle = () => {
		setSidebarCollapsed(!sidebarCollapsed);
	};

	const handleNavigate = (routeId: string) => {
		setCurrentRoute(routeId);
		// Actual routing logic will be implemented later
	};

	const currentPage = routes.find((r) => r.id === currentRoute);

	return (
		<div className='h-screen w-full flex bg-slate-900 text-slate-100 font-sans'>
			{/* Sidebar */}
			<Sidebar
				collapsed={sidebarCollapsed}
				onToggle={handleSidebarToggle}
				onNavigate={handleNavigate}
				currentRoute={currentRoute}
			/>

			{/* Main Content Area */}
			<div className='flex-1 flex flex-col min-w-0'>
				{/* Topbar */}
				<Topbar title={currentPage?.label} />

				{/* Main View - shows placeholder content */}
				<MainView />
			</div>
		</div>
	);
};

export default AppShell;

