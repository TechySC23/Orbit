/**
 * Main content viewport component with scrolling and padding.
 * Styled according to the design tokens in GEMINI.md.
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
        flex-1 overflow-y-auto p-8 
        bg-slate-900
        ${className}
      `}
			role='main'
			aria-label='Main content area'>
			<div className='max-w-full mx-auto'>
				{children || (
					<div className='text-center py-20'>
						<h2 className='text-2xl font-semibold text-slate-200 mb-2'>View is empty</h2>
						<p className='text-slate-400'>Select an item from the sidebar to get started.</p>
					</div>
				)}
			</div>
		</main>
	);
};

export default MainView;

