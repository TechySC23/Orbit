/**
 * Theme switching component that toggles between light and dark modes
 * Manages data-theme attribute on documentElement and uses lucide-react icons.
 */
import React, { useState, useEffect } from "react";
import { Sun, Moon } from "lucide-react";
import IconButton from "./IconButton";

const ThemeToggle: React.FC = () => {
	// Default to dark mode as per GEMINI.md, but check for system preference/localStorage
	const [isDark, setIsDark] = useState(true);

	useEffect(() => {
		const storedTheme = localStorage.getItem("orbit-theme");
		const systemPrefersDark = window.matchMedia("(prefers-color-scheme: dark)").matches;
		const initialIsDark = storedTheme ? storedTheme === "dark" : systemPrefersDark;

		setIsDark(initialIsDark);
		document.documentElement.classList.toggle("dark", initialIsDark);
	}, []);

	const toggleTheme = () => {
		const newIsDark = !isDark;
		setIsDark(newIsDark);
		localStorage.setItem("orbit-theme", newIsDark ? "dark" : "light");
		document.documentElement.classList.toggle("dark", newIsDark);
	};

	return (
		<IconButton aria-label={`Switch to ${isDark ? "light" : "dark"} theme`} onClick={toggleTheme} variant='ghost' size='md'>
			{isDark ? <Sun className='h-5 w-5' /> : <Moon className='h-5 w-5' />}
		</IconButton>
	);
};

export default ThemeToggle;

