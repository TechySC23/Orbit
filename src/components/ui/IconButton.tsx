/**
 * Accessible icon button component with keyboard navigation and focus states
 * Reusable primitive for interactive icons throughout the app
 * Conforms to the design tokens specified in GEMINI.md
 */
import React from "react";

interface IconButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
	children: React.ReactNode;
	"aria-label": string;
	variant?: "default" | "ghost";
	size?: "sm" | "md" | "lg";
}

const IconButton = React.forwardRef<HTMLButtonElement, IconButtonProps>(
	({ children, "aria-label": ariaLabel, variant = "default", size = "md", className = "", ...props }, ref) => {
		// Base classes for all icon buttons, ensuring accessibility and consistent transitions
		const baseClasses =
			"inline-flex items-center justify-center rounded-md transition-colors duration-200 focus:outline-none focus-visible:ring-2 focus-visible:ring-sky-500/60 disabled:opacity-50 disabled:cursor-not-allowed active:scale-95";

		// Variant styles based on the design system
		const variantClasses = {
			default: "text-slate-300 hover:bg-slate-800/70",
			ghost: "text-slate-400 hover:bg-slate-700/50 hover:text-slate-100",
		};

		// Size variants to control padding and icon size
		const sizeClasses = {
			sm: "h-8 w-8",
			md: "h-9 w-9",
			lg: "h-10 w-10",
		};

		const classes = [baseClasses, variantClasses[variant], sizeClasses[size], className].join(" ");

		return (
			<button ref={ref} aria-label={ariaLabel} className={classes} {...props}>
				{children}
			</button>
		);
	},
);

IconButton.displayName = "IconButton";

export default IconButton;

