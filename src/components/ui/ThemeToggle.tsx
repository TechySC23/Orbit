import React, { useCallback, useEffect } from "react";
import { Sun, Moon } from "lucide-react";
import IconButton from "./IconButton";
import { useUI } from "../../state/uiStore";

const ThemeToggle: React.FC = () => {
	const { settings, setSettings } = useUI();
	const isDark = settings.theme === "dark";

	const toggleTheme = useCallback(() => {
		setSettings({ theme: isDark ? "light" : "dark" });
	}, [isDark, setSettings]);

	useEffect(() => {
		const handleKeyPress = (e: KeyboardEvent) => {
			if (e.key === ".") {
				e.preventDefault();
				toggleTheme();
			}
		};
		window.addEventListener("keydown", handleKeyPress);
		return () => window.removeEventListener("keydown", handleKeyPress);
	}, [toggleTheme]);

	return (
		<IconButton
			aria-label={`Switch to ${isDark ? "light" : "dark"} theme (.)`}
			title={`Switch to ${isDark ? "light" : "dark"} theme (.)`}
			onClick={toggleTheme}
			variant='ghost'
			size='md'>
			{isDark ?
				<Sun className='h-5 w-5' />
			:	<Moon className='h-5 w-5' />}
		</IconButton>
	);
};

export default ThemeToggle;
