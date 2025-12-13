import { useCallback, useEffect } from "react";
import { Plus } from "lucide-react";
import { useUI } from "../state/uiStore";

const AddButton = () => {
	const { setAddTaskModalOpen, settings } = useUI();

	const openModal = useCallback(() => {
		setAddTaskModalOpen(true);
	}, [setAddTaskModalOpen]);

	useEffect(() => {
		const handleKeyPress = (e: KeyboardEvent) => {
			if (e.key.toLowerCase() === "n") {
				e.preventDefault();
				openModal();
			}
		};
		window.addEventListener("keydown", handleKeyPress);
		return () => window.removeEventListener("keydown", handleKeyPress);
	}, [openModal]);

	return (
		<button
			onClick={openModal}
			className={`
                fixed bottom-8 right-8 z-40
                flex items-center justify-center 
                w-14 h-14 bg-sky-500 text-white 
                rounded-full shadow-lg
                hover:bg-sky-600
                focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-offset-slate-900 focus:ring-sky-500
                transform transition-transform
                ${settings.reduceMotion ? "" : "hover:scale-110 active:scale-100"}`}
			aria-label='New Task (N)'
			title='New Task (N)'>
			<Plus size={28} />
		</button>
	);
};

export default AddButton;
