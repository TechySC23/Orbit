/**
 * Top navigation bar with page title, search, and utility components.
 * Styled according to the design tokens in GEMINI.md.
 */
import React from "react";
import { Search, Clock4 } from "lucide-react";
import ThemeToggle from "./ui/ThemeToggle";

interface TopbarProps {
	title?: string;
	className?: string;
}

const Topbar: React.FC<TopbarProps> = ({ title = "Dashboard", className = "" }) => {
	return (
		<header
			className={`
        h-20 bg-slate-900 
        border-b border-slate-800/50
        px-6 flex items-center justify-between flex-shrink-0
        ${className}
      `}
			role='banner'>
			{/* Left side - Page title */}
			<div className='flex-1'>
				<h1 className='text-3xl font-semibold text-slate-100' aria-live='polite'>
					{title}
				</h1>
			</div>

			{/* Center - Search input */}
			<div className='flex-1 max-w-sm mx-8'>
				<div className='relative'>
					<label htmlFor='global-search' className='sr-only'>
						Search
					</label>
					<div className='absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none'>
						<Search className='h-5 w-5 text-slate-500' aria-hidden='true' />
					</div>
					<input
						id='global-search'
						type='search'
						placeholder='Search...'
						className='
              block w-full pl-11 pr-4 py-2.5
              border-0
              rounded-lg
              bg-slate-800/70
              text-slate-100
              placeholder-slate-500
              focus:outline-none focus:ring-2 focus:ring-inset focus:ring-sky-500/60
              text-base
            '
						aria-label='Search (not implemented)'
					/>
				</div>
			</div>

			{/* Right side - Utilities */}
			<div className='flex-1 flex items-center justify-end space-x-2'>
				{/* Pomodoro widget placeholder */}
				<div className='hidden md:flex items-center space-x-2 px-3 py-1.5 rounded-lg bg-slate-800/70 text-slate-400'>
					<Clock4 className='h-5 w-5' />
					<span className='text-sm font-medium'>25:00</span>
				</div>

				<ThemeToggle />
			</div>
		</header>
	);
};

export default Topbar;

