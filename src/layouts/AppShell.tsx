
import React, { useState } from "react";
import Sidebar from "../components/Sidebar";
import Topbar from "../components/Topbar";
import MainView from "../components/MainView";
import { UIProvider, useUI } from "../state/uiStore";
import routes from "../lib/routes";
import AddTaskModal from "../components/AddTaskModal";
import SettingsModal from "../components/SettingsModal";
import AddButton from "../components/AddButton";

const AppShellContent: React.FC = () => {
    const [sidebarCollapsed, setSidebarCollapsed] = useState(false);
	const { currentRoute, setCurrentRoute } = useUI();

	const handleSidebarToggle = () => {
		setSidebarCollapsed(!sidebarCollapsed);
	};

	const currentPage = routes.find((r) => r.id === currentRoute);

	return (
		<div className='h-screen w-full flex bg-slate-900 text-slate-100 font-sans'>
			<Sidebar
				collapsed={sidebarCollapsed}
				onToggle={handleSidebarToggle}
				onNavigate={setCurrentRoute}
				currentRoute={currentRoute}
			/>

			<div className='flex-1 flex flex-col min-w-0'>
				<Topbar title={currentPage?.label} />
				<MainView />
			</div>

            {/* Modals and Global UI */}
            <AddTaskModal />
            <SettingsModal />
            <AddButton />
		</div>
	);
}


const AppShell: React.FC = () => {
    return (
        <UIProvider>
            <AppShellContent />
        </UIProvider>
    )
}

export default AppShell;

