import React, { useEffect, useState } from "react";
import Sidebar from "../components/Sidebar";
import MainView from "../components/MainView";
import { useUIStore } from "../state/uiStore";
import AddTaskModal from "../components/AddTaskModal";
import AddButton from "../components/AddButton";
import LoadingScreen from "../components/LoadingScreen";

const AppShellContent: React.FC = () => {
	const { settings } = useUIStore();
	const [isLoading, setIsLoading] = useState(true);

	useEffect(() => {
		const root = document.documentElement;
		const fontMap = {
			Inter: '"Inter", sans-serif',
			Roboto: '"Roboto", sans-serif',
			Sora: '"Sora", sans-serif',
		};
		root.style.setProperty("--ui-font", fontMap[settings.font] || fontMap.Inter);
		
		// Handle theme projection
		if (settings.theme === "dark") {
			root.classList.add("dark");
		} else {
			root.classList.remove("dark");
		}
	}, [settings.font, settings.theme]);

	return (
		<div className='h-screen w-full flex bg-slate-950 text-slate-100 font-sans overflow-hidden selection:bg-sky-500/30' style={{ fontFamily: "var(--ui-font)" }}>
			{isLoading && <LoadingScreen onComplete={() => setIsLoading(false)} />}
			
			<Sidebar />

			<div className='flex-1 flex flex-col min-w-0 h-full relative'>
				<MainView />
				<AddButton />
			</div>

			<AddTaskModal />
		</div>
	);
};

const AppShell: React.FC = () => {
	return <AppShellContent />;
};

export default AppShell;
