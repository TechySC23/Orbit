import { useEffect, useCallback, useRef } from "react";
import { useUI } from "../state/uiStore";
import { type Settings } from "../state/uiTypes";
import { X } from "lucide-react";

// A simple focus trap hook for accessibility - duplicated here for simplicity
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

const SettingsModal = () => {
	const { isSettingsModalOpen, setSettingsModalOpen, settings, setSettings } = useUI();
	const modalRef = useFocusTrap(isSettingsModalOpen);

	const handleClose = useCallback(() => {
		setSettingsModalOpen(false);
	}, [setSettingsModalOpen]);

	const handleSettingChange = <T extends keyof Settings>(key: T, value: Settings[T]) => {
		setSettings({ [key]: value });
	};

	useEffect(() => {
		const handleEscape = (e: KeyboardEvent) => {
			if (e.key === "Escape") handleClose();
		};
		window.addEventListener("keydown", handleEscape);
		return () => window.removeEventListener("keydown", handleEscape);
	}, [handleClose]);

	if (!isSettingsModalOpen) return null;

	return (
		<div className='fixed inset-0 bg-black/40 backdrop-blur-sm flex items-center justify-center z-50'>
			<div
				ref={modalRef}
				className='bg-slate-800 rounded-xl p-6 w-full max-w-lg shadow-lg border border-slate-700'
				role='dialog'
				aria-modal='true'
				aria-labelledby='settings-title'>
				<div className='flex justify-between items-center mb-6'>
					<h2 id='settings-title' className='text-2xl font-semibold text-slate-100'>
						Settings
					</h2>
					<button
						onClick={handleClose}
						className='p-1 rounded-md hover:bg-slate-700/80 focus:outline-none focus:ring-2 focus:ring-sky-500/60'
						aria-label='Close settings'>
						<X size={24} className='text-slate-300' />
					</button>
				</div>

				<div className='space-y-6'>
					{/* Font Family Selection */}
					<div>
						<label htmlFor='font-select' className='block text-base font-medium text-slate-300 mb-2'>
							Font Family
						</label>
						<select
							id='font-select'
							value={settings.font}
							onChange={(e) => handleSettingChange("font", e.target.value as "Inter" | "Roboto" | "Sora")}
							className='w-full bg-slate-900 border border-slate-700 rounded-md px-3 py-2 text-slate-100 focus:ring-2 focus:ring-sky-500/60 focus:border-sky-500'>
							<option value='Inter'>Inter</option>
							<option value='Roboto'>Roboto</option>
							<option value='Sora'>Sora</option>
						</select>
					</div>

					{/* Save Draft Toggle */}
					<div className='flex items-center justify-between bg-slate-900/50 p-3 rounded-md'>
						<label htmlFor='save-draft-toggle' className='text-base font-medium text-slate-300'>
							Save new tasks as draft
						</label>
						<button
							role='switch'
							aria-checked={settings.saveDraft}
							onClick={() => handleSettingChange("saveDraft", !settings.saveDraft)}
							className={`${settings.saveDraft ? "bg-sky-500" : "bg-slate-600"} relative inline-flex h-6 w-11 items-center rounded-full transition-colors focus:outline-none focus:ring-2 focus:ring-sky-500/60 focus:ring-offset-2 focus:ring-offset-slate-800`}
							id='save-draft-toggle'>
							<span
								className={`${settings.saveDraft ? "translate-x-6" : "translate-x-1"} inline-block h-4 w-4 transform rounded-full bg-white transition-transform`}
							/>
						</button>
					</div>

					{/* Reduce Motion Toggle */}
					<div className='flex items-center justify-between bg-slate-900/50 p-3 rounded-md'>
						<label htmlFor='reduce-motion-toggle' className='text-base font-medium text-slate-300'>
							Reduce motion
						</label>
						<button
							role='switch'
							aria-checked={settings.reduceMotion}
							onClick={() => handleSettingChange("reduceMotion", !settings.reduceMotion)}
							className={`${settings.reduceMotion ? "bg-sky-500" : "bg-slate-600"} relative inline-flex h-6 w-11 items-center rounded-full transition-colors focus:outline-none focus:ring-2 focus:ring-sky-500/60 focus:ring-offset-2 focus:ring-offset-slate-800`}
							id='reduce-motion-toggle'>
							<span
								className={`${settings.reduceMotion ? "translate-x-6" : "translate-x-1"} inline-block h-4 w-4 transform rounded-full bg-white transition-transform`}
							/>
						</button>
					</div>

					<div className='text-sm text-slate-400 pt-2 border-t border-slate-700'>
						<p>Advanced settings and customizations will be available in a future version.</p>
					</div>
				</div>

				<div className='mt-8 flex justify-end'>
					<button
						onClick={handleClose}
						className='px-5 py-2 rounded-lg bg-slate-700 hover:bg-slate-600 text-slate-100 font-semibold focus:outline-none focus:ring-2 focus:ring-sky-500/60'>
						Done
					</button>
				</div>
			</div>
		</div>
	);
};

export default SettingsModal;
