/**
 * Collapsible sidebar navigation component, styled according to GEMINI.md
 * Displays app logo, navigation items with lucide-react icons, and a collapse button.
 * Supports keyboard navigation and highlights the active route.
 */
import React, { useState } from "react";
import routes from "../lib/routes";
import useKeyboardNav from "../hooks/useKeyboardNav";
import CollapseButton from "./ui/CollapseButton";
import { Orbit } from "lucide-react"; // Using an icon for the logo

interface SidebarProps {
	collapsed: boolean;
	onToggle: () => void;
	onNavigate?: (routeId: string) => void;
	className?: string;
	currentRoute: string;
}

const Sidebar: React.FC<SidebarProps> = ({ collapsed, onToggle, onNavigate, className = "", currentRoute }) => {
	const getInitialIndex = () => routes.findIndex((r) => r.id === currentRoute);
	const [selectedIndex, setSelectedIndex] = useState(getInitialIndex);

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
        bg-slate-950 text-slate-100
        transition-all duration-300 ease-in-out
        flex flex-col h-full
        ${collapsed ? "w-20" : "w-64"}
        ${className}
      `}
			aria-label='Main navigation'
			aria-expanded={!collapsed}>
			{/* App Logo/Title */}
			<div className={`flex items-center h-20 px-4 ${collapsed ? "justify-center" : "justify-start"}`}>
				<div className='flex items-center space-x-3'>
					<Orbit className='h-8 w-8 text-sky-400' />
					{!collapsed && <h1 className='text-2xl font-extrabold text-slate-50'>Orbit</h1>}
				</div>
			</div>

			{/* Navigation */}
			<nav className='flex-1 px-4 space-y-2' role='navigation' aria-label='Sidebar navigation' onKeyDown={onKeyDown}>
				{routes.map((route, index) => {
					const isSelected = route.id === currentRoute;
					const Icon = route.icon;

					return (
						<button
							key={route.id}
							data-nav-index={index}
							onClick={() => handleNavigate(route.id, index)}
							className={`
                w-full flex items-center px-4 py-3 rounded-xl
                text-lg transition-colors duration-200
                focus:outline-none focus-visible:ring-2 focus-visible:ring-sky-500/60
                ${isSelected ? "bg-slate-800 text-sky-400 border-r-4 border-sky-500/60" : "text-slate-300 hover:bg-slate-800/70"}
                ${collapsed ? "justify-center" : ""}
              `}
							aria-current={isSelected ? "page" : undefined}
							aria-label={route.label}
							title={collapsed ? route.label : undefined}>
							<div className='w-8 h-8 flex items-center justify-center rounded-md'>
								<Icon className={`h-6 w-6 ${isSelected ? "text-sky-400" : "text-slate-400"}`} />
							</div>
							{!collapsed && <span className='ml-3 truncate'>{route.label}</span>}
						</button>
					);
				})}
			</nav>

			{/* Footer - Collapse Button */}
			<div className={`px-4 py-4 mt-auto border-t border-slate-800/50 ${collapsed ? "flex justify-center" : "flex justify-end"}`}>
				<CollapseButton collapsed={collapsed} onToggle={onToggle} />
			</div>
		</aside>
	);
};

export default Sidebar;
