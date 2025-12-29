import { Sun, Moon } from "lucide-react";
import { useUIStore } from "../../state/uiStore";

const ThemeToggle = () => {
	const { settings, setSettings } = useUIStore();
	const isDark = settings.theme === "dark";

	const toggleTheme = () => {
		setSettings({ theme: isDark ? "light" : "dark" });
	};

	return (
		<button
			onClick={toggleTheme}
			className="p-2 rounded-xl bg-slate-800/50 hover:bg-slate-800 text-slate-400 hover:text-slate-100 transition-all border border-slate-700/50"
			aria-label={`Switch to ${isDark ? "light" : "dark"} theme`}>
			{isDark ? <Sun className='h-5 w-5' /> : <Moon className='h-5 w-5' />}
		</button>
	);
};

export default ThemeToggle;
