/**
 * Sidebar collapse toggle button component
 * Toggles between collapsed/expanded states using lucide-react icons
 */
import React from "react";
import { PanelLeft, PanelRight } from "lucide-react";
import IconButton from "./IconButton";

interface CollapseButtonProps {
	collapsed: boolean;
	onToggle: () => void;
	className?: string;
}

const CollapseButton: React.FC<CollapseButtonProps> = ({ collapsed, onToggle, className = "" }) => {
	return (
		<IconButton aria-label={collapsed ? "Expand sidebar" : "Collapse sidebar"} onClick={onToggle} className={className} variant='ghost' size='sm'>
			{collapsed ?
				<PanelRight className='h-5 w-5' />
			:	<PanelLeft className='h-5 w-5' />}
		</IconButton>
	);
};

export default CollapseButton;
