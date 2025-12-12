/**
 * Accessible icon button component with keyboard navigation and focus states
 * Reusable primitive for interactive icons throughout the app
 * TODO: Add loading state when async actions are implemented
 */

import React from "react";

interface IconButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
	children: React.ReactNode;
	"aria-label": string;
	variant?: "default" | "ghost" | "outline";
	size?: "sm" | "md" | "lg";
}

const IconButton = React.forwardRef<HTMLButtonElement, IconButtonProps>(
	({ children, "aria-label": ariaLabel, variant = "default", size = "md", className = "", ...props }, ref) => {
		const baseClasses = [
			"inline-flex items-center justify-center",
			"transition-colors duration-200",
			"focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2",
			"disabled:opacity-50 disabled:cursor-not-allowed",
			"hover:bg-gray-100 dark:hover:bg-gray-700",
			"active:scale-95",
		];

		const variantClasses = {
			default: "bg-transparent border-0",
			ghost: "bg-transparent hover:bg-gray-100 dark:hover:bg-gray-700",
			outline: "bg-transparent border border-gray-300 dark:border-gray-600 hover:bg-gray-50 dark:hover:bg-gray-800",
		};

		const sizeClasses = {
			sm: "h-8 w-8 rounded",
			md: "h-10 w-10 rounded-md",
			lg: "h-12 w-12 rounded-lg",
		};

		const classes = [...baseClasses, variantClasses[variant], sizeClasses[size], className].join(" ");

		return (
			<button ref={ref} aria-label={ariaLabel} className={classes} {...props}>
				{children}
			</button>
		);
	},
);

IconButton.displayName = "IconButton";

export default IconButton;
