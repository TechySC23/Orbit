/**
 * Main content viewport component with scrolling and padding
 * Renders children content in a scrollable area with consistent spacing
 * TODO: Add content loading states when data fetching is implemented
 */

import React from "react";

interface MainViewProps {
	children?: React.ReactNode;
	className?: string;
}

const MainView: React.FC<MainViewProps> = ({ children, className = "" }) => {
	return (
		<main
			className={`
        flex-1 overflow-y-auto p-6 
        bg-gray-50 dark:bg-gray-900
        ${className}
      `}
			role='main'
			aria-label='Main content area'>
			<div className='max-w-7xl mx-auto'>
				{children || (
					<div className='text-center py-12'>
						<h2 className='text-2xl font-semibold text-gray-900 dark:text-gray-100 mb-2'>Welcome to Orbit</h2>
						<p className='text-gray-600 dark:text-gray-400'>Dashboard coming soon</p>
					</div>
				)}
			</div>
		</main>
	);
};

export default MainView;
