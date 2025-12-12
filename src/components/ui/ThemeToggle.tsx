/**
 * Theme switching component that toggles between light and dark modes
 * Manages data-theme attribute on documentElement
 * TODO: Add localStorage persistence when user preferences are implemented
 */

import React, { useState, useEffect } from "react";
import IconButton from "./IconButton";

const ThemeToggle: React.FC = () => {
	const [isDark, setIsDark] = useState(false);

	// Initialize theme based on system preference or stored preference
	useEffect(() => {
		const storedTheme = localStorage.getItem("orbit-theme");
		const systemPrefersDark = window.matchMedia("(prefers-color-scheme: dark)").matches;
		const initialTheme = storedTheme || (systemPrefersDark ? "dark" : "light");

		setIsDark(initialTheme === "dark");
		document.documentElement.setAttribute("data-theme", initialTheme);
	}, []);

	const toggleTheme = () => {
		const newTheme = isDark ? "light" : "dark";
		setIsDark(!isDark);
		document.documentElement.setAttribute("data-theme", newTheme);

		// TODO: Persist theme preference when user management is added
		// localStorage.setItem('orbit-theme', newTheme);
	};

	const SunIcon = (
		<svg className='h-5 w-5' fill='none' viewBox='0 0 24 24' stroke='currentColor' aria-hidden='true'>
			<path
				strokeLinecap='round'
				strokeLinejoin='round'
				strokeWidth={2}
				d='M12 3v1m0 16v1m9-9h-1M4 12H3m15.364 6.364l-.707-.707M6.343 6.343l-.707-.707m12.728 0l-.707.707M6.343 17.657l-.707.707M16 12a4 4 0 11-8 0 4 4 0 018 0z'
			/>
		</svg>
	);

	const MoonIcon = (
		<svg className='h-5 w-5' fill='none' viewBox='0 0 24 24' stroke='currentColor' aria-hidden='true'>
			<path
				strokeLinecap='round'
				strokeLinejoin='round'
				strokeWidth={2}
				d='M20.354 15.354A9 9 0 018.646 3.646 9.003 9.003 0 0012 21a9.003 9.003 0 008.354-5.646z'
			/>
		</svg>
	);

	return (
		<IconButton aria-label={`Switch to ${isDark ? "light" : "dark"} theme`} onClick={toggleTheme} variant='ghost' size='md'>
			{isDark ? SunIcon : MoonIcon}
		</IconButton>
	);
};

export default ThemeToggle;
