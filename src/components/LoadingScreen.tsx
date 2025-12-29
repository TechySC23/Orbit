import React, { useState, useEffect } from "react";
import { Orbit } from "lucide-react";
import { useUIStore } from "../state/uiStore";

/**
 * Minimal loading screen that fades out after a short duration.
 */
const LoadingScreen: React.FC<{ onComplete: () => void }> = ({ onComplete }) => {
	const [isExiting, setIsExiting] = useState(false);
	const { settings } = useUIStore();
	const reduceMotion = settings.reduceMotion;

	useEffect(() => {
		// 1. Stay duration where logo is static and fully visible
		const stayDuration = 800;
		// 2. Fade duration
		const fadeDuration = reduceMotion ? 0 : 700;

		// Trigger the exit animation
		const exitTimer = setTimeout(() => {
			setIsExiting(true);
		}, stayDuration);

		// Trigger unmount after animation completes
		const unmountTimer = setTimeout(() => {
			onComplete();
		}, stayDuration + fadeDuration + 50); // Small buffer to ensure frames finish

		return () => {
			clearTimeout(exitTimer);
			clearTimeout(unmountTimer);
		};
	}, [onComplete, reduceMotion]);

	return (
		<div 
			className={`
				fixed inset-0 z-[100] flex flex-col items-center justify-center bg-slate-950 
				transition-opacity ease-in-out
				${isExiting ? "opacity-0 pointer-events-none" : "opacity-100"}
			`}
			style={{ transitionDuration: reduceMotion ? "0ms" : "700ms" }}
			aria-hidden="true"
		>
			<div className={`
				flex flex-col items-center gap-6 
				transition-all ease-out
				${isExiting ? "scale-95 opacity-0" : "scale-100 opacity-100"}
			`}
			style={{ transitionDuration: reduceMotion ? "0ms" : "500ms" }}
			>
				<div className="bg-sky-500/10 p-5 rounded-3xl border border-sky-500/20 shadow-2xl shadow-sky-500/10">
					<Orbit size={64} className="text-sky-400" />
				</div>
				<h1 className="text-4xl font-black text-slate-100 tracking-tighter uppercase">Orbit</h1>
			</div>
		</div>
	);
};

export default LoadingScreen;
