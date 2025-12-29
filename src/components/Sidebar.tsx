import React from "react";
import routes from "../lib/routes";
import { useUIStore } from "../state/uiStore";
import { Orbit, Settings as SettingsIcon } from "lucide-react";

/**
 * Simplified, state-driven Sidebar.
 * Supports: collapsed (icon-only with background) and expanded.
 */
const Sidebar: React.FC = () => {
	const { sidebarMode, currentRoute, setCurrentRoute } = useUIStore();

	const isExpanded = sidebarMode === "expanded";

	// We separate Settings from the main navigation list.
	const navRoutes = routes.filter((r) => r.id !== "settings");
	const settingsRoute = routes.find((r) => r.id === "settings");

	return (
		<aside
			className={`
				${isExpanded ? "w-72" : "w-20"}
				bg-slate-950 text-slate-100
				transition-all duration-300 ease-in-out
				flex flex-col h-full z-40 relative border-r border-slate-800/50
			`}
			aria-label='Main navigation'>
			
			{/* App Logo */}
			<div className={`flex items-center h-24 px-6 ${isExpanded ? "justify-start" : "justify-center"}`}>
				<div className='flex items-center gap-4 group cursor-pointer' onClick={() => setCurrentRoute("dashboard")}>
					<div className="bg-sky-500/10 p-2 rounded-xl group-hover:bg-sky-500/20 transition-colors">
						<Orbit className='h-8 w-8 text-sky-400' />
					</div>
					{isExpanded && <h1 className='text-2xl font-black text-slate-100 tracking-tighter'>ORBIT</h1>}
				</div>
			</div>

			{/* Primary Navigation */}
			<nav className='flex-1 px-3 space-y-1.5 overflow-y-auto' role='navigation'>
				{navRoutes.map((route) => {
					const isSelected = route.id === currentRoute;
					const Icon = route.icon;

					return (
						<button
							key={route.id}
							onClick={() => setCurrentRoute(route.id)}
							className={`
								w-full flex items-center px-4 py-3.5 rounded-2xl
								transition-all duration-200 group relative
								${isSelected 
									? "bg-sky-500/10 text-sky-400 shadow-[inset_0_0_0_1px_rgba(14,165,233,0.2)]" 
									: "text-slate-400 hover:bg-slate-800/50 hover:text-slate-100"
								}
								${!isExpanded ? "justify-center" : "justify-start"}
							`}
							aria-current={isSelected ? "page" : undefined}
						>
							<div className='flex-shrink-0'>
								<Icon size={24} strokeWidth={isSelected ? 2.5 : 2} />
							</div>
							
							{isExpanded && (
								<span className='ml-4 font-bold text-sm uppercase tracking-widest truncate'>
									{route.label}
								</span>
							)}

							{/* Tooltip for collapsed mode */}
							{!isExpanded && (
								<div className="absolute left-full ml-4 px-3 py-1.5 bg-slate-800 text-slate-200 text-xs font-bold rounded-lg opacity-0 group-hover:opacity-100 transition-opacity pointer-events-none whitespace-nowrap z-50 border border-slate-700 shadow-xl">
									{route.label}
								</div>
							)}
						</button>
					);
				})}
			</nav>

			{/* Fixed Bottom Action — Settings */}
			<div className='p-3 border-t border-slate-800/50'>
				{settingsRoute && (
					<button
						onClick={() => setCurrentRoute("settings")}
						className={`
							w-full flex items-center px-4 py-3.5 rounded-2xl
							transition-all duration-200 group relative
							${currentRoute === "settings" 
								? "bg-sky-500/10 text-sky-400 shadow-[inset_0_0_0_1px_rgba(14,165,233,0.2)]" 
								: "text-slate-400 hover:bg-slate-800/50 hover:text-slate-100"
							}
							${!isExpanded ? "justify-center" : "justify-start"}
						`}
					>
						<div className='flex-shrink-0'>
							<SettingsIcon size={24} strokeWidth={currentRoute === "settings" ? 2.5 : 2} />
						</div>
						
						{isExpanded && (
							<span className='ml-4 font-bold text-sm uppercase tracking-widest truncate'>
								{settingsRoute.label}
							</span>
						)}

						{!isExpanded && (
							<div className="absolute left-full ml-4 px-3 py-1.5 bg-slate-800 text-slate-200 text-xs font-bold rounded-lg opacity-0 group-hover:opacity-100 transition-opacity pointer-events-none whitespace-nowrap z-50 border border-slate-700 shadow-xl">
								{settingsRoute.label}
							</div>
						)}
					</button>
				)}
			</div>
		</aside>
	);
};

export default Sidebar;
