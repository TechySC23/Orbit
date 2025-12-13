import { useState, useEffect, useRef, useCallback } from "react";
import { useUI } from "../state/uiStore";
import { type Task } from "../state/uiTypes";
import { X } from "lucide-react";

// A simple focus trap hook for accessibility
const useFocusTrap = (isOpen: boolean) => {
	const modalRef = useRef<HTMLDivElement>(null);

	useEffect(() => {
		if (!isOpen || !modalRef.current) return;

        const currentModalRef = modalRef.current; // Capture the ref value

		const focusableElements = currentModalRef.querySelectorAll<HTMLElement>(
			'button, [href], input, select, textarea, [tabindex]:not([tabindex="-1"])',
		);
		const firstElement = focusableElements[0];
		const lastElement = focusableElements[focusableElements.length - 1];

		const handleTabKeyPress = (e: KeyboardEvent) => {
			if (e.key !== "Tab") return;

			if (e.shiftKey) {
				// Shift + Tab
				if (document.activeElement === firstElement) {
					lastElement.focus();
					e.preventDefault();
				}
			} else {
				// Tab
				if (document.activeElement === lastElement) {
					firstElement.focus();
					e.preventDefault();
				}
			}
		};

		firstElement?.focus();
		currentModalRef.addEventListener("keydown", handleTabKeyPress);

		return () => {
			currentModalRef?.removeEventListener("keydown", handleTabKeyPress);
		};
	}, [isOpen]);

	return modalRef;
};

const AddTaskModal = () => {
	const { isAddTaskModalOpen, setAddTaskModalOpen, addTask } = useUI();
	const [title, setTitle] = useState("");
	const [description, setDescription] = useState("");
	const [dueDate, setDueDate] = useState("");
	const [priority, setPriority] = useState<"low" | "medium" | "high">("medium");

	const modalRef = useFocusTrap(isAddTaskModalOpen);

	const handleClose = useCallback(() => {
		setAddTaskModalOpen(false);
	}, [setAddTaskModalOpen]);

	const handleSave = () => {
		if (!title.trim()) return;

		const newTask: Omit<Task, "id" | "createdAt"> = {
			title,
			description,
			dueDate,
			priority,
		};
		addTask(newTask);

		// Optionally clear form and close
		setTitle("");
		setDescription("");
		setDueDate("");
		setPriority("medium");
		handleClose();
	};

	useEffect(() => {
		const handleEscape = (e: KeyboardEvent) => {
			if (e.key === "Escape") {
				handleClose();
			}
		};
		window.addEventListener("keydown", handleEscape);
		return () => window.removeEventListener("keydown", handleEscape);
	}, [handleClose]);

	if (!isAddTaskModalOpen) return null;

	return (
		<div className='fixed inset-0 bg-black/40 backdrop-blur-sm flex items-center justify-center z-50'>
			<div
				ref={modalRef}
				className='bg-slate-800 rounded-xl p-6 w-full max-w-2xl shadow-lg border border-slate-700'
				role='dialog'
				aria-modal='true'
				aria-labelledby='add-task-title'>
				<div className='flex justify-between items-center mb-4'>
					<h2 id='add-task-title' className='text-2xl font-semibold text-slate-100'>
						Add New Task
					</h2>
					<button
						onClick={handleClose}
						className='p-1 rounded-md hover:bg-slate-700/80 focus:outline-none focus:ring-2 focus:ring-sky-500/60'
						aria-label='Close add task modal'>
						<X size={24} className='text-slate-300' />
					</button>
				</div>

				<div className='space-y-4'>
					<div>
						<label htmlFor='task-title' className='block text-sm font-medium text-slate-300 mb-1'>
							Title <span className='text-red-400'>*</span>
						</label>
						<input
							type='text'
							id='task-title'
							value={title}
							onChange={(e) => setTitle(e.target.value)}
							className='w-full bg-slate-900 border border-slate-700 rounded-md px-3 py-2 text-slate-100 focus:ring-2 focus:ring-sky-500/60 focus:border-sky-500'
							required
						/>
					</div>

					<div>
						<label htmlFor='task-description' className='block text-sm font-medium text-slate-300 mb-1'>
							Description
						</label>
						<textarea
							id='task-description'
							value={description}
							onChange={(e) => setDescription(e.target.value)}
							rows={4}
							className='w-full bg-slate-900 border border-slate-700 rounded-md px-3 py-2 text-slate-100 focus:ring-2 focus:ring-sky-500/60 focus:border-sky-500'></textarea>
					</div>

					<div className='grid grid-cols-1 md:grid-cols-2 gap-4'>
						<div>
							<label htmlFor='task-due-date' className='block text-sm font-medium text-slate-300 mb-1'>
								Due Date
							</label>
							<input
								type='date'
								id='task-due-date'
								value={dueDate}
								onChange={(e) => setDueDate(e.target.value)}
								className='w-full bg-slate-900 border border-slate-700 rounded-md px-3 py-2 text-slate-100 focus:ring-2 focus:ring-sky-500/60 focus:border-sky-500'
							/>
						</div>
						<div>
							<label htmlFor='task-priority' className='block text-sm font-medium text-slate-300 mb-1'>
								Priority
							</label>
							<select
								id='task-priority'
								value={priority}
								onChange={(e) => setPriority(e.target.value as "low" | "medium" | "high")}
								className='w-full bg-slate-900 border border-slate-700 rounded-md px-3 py-2 text-slate-100 focus:ring-2 focus:ring-sky-500/60 focus:border-sky-500'>
								<option value='low'>Low</option>
								<option value='medium'>Medium</option>
								<option value='high'>High</option>
							</select>
						</div>
					</div>
				</div>

				<div className='mt-6 flex justify-end gap-3'>
					<button
						onClick={handleClose}
						className='px-4 py-2 rounded-lg bg-slate-700 hover:bg-slate-600 text-slate-100 focus:outline-none focus:ring-2 focus:ring-sky-500/60'>
						Cancel
					</button>
					<button
						onClick={handleSave}
						className='px-4 py-2 rounded-lg bg-sky-500 hover:bg-sky-600 text-white font-semibold focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-offset-slate-800 focus:ring-sky-500'>
						Save Task
					</button>
				</div>
			</div>
		</div>
	);
};

export default AddTaskModal;
