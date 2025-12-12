import React, { useState, useEffect, useCallback } from "react";
import { Play, Pause, RotateCcw } from "lucide-react";
import { useUI } from "../state/uiStore";

type TimerMode = "session" | "shortBreak" | "longBreak";

const MODE_DURATIONS: Record<TimerMode, number> = {
	session: 25 * 60,
	shortBreak: 5 * 60,
	longBreak: 15 * 60,
};

const Pomodoro = () => {
	const { settings } = useUI();
	const [mode, setMode] = useState<TimerMode>("session");
	const [timeRemaining, setTimeRemaining] = useState(MODE_DURATIONS[mode]);
	const [isRunning, setIsRunning] = useState(false);

	const formatTime = (seconds: number) => {
		const mins = Math.floor(seconds / 60);
		const secs = seconds % 60;
		return `${String(mins).padStart(2, "0")}:${String(secs).padStart(2, "0")}`;
	};

	const handleToggle = useCallback(() => {
		setIsRunning((prev) => !prev);
	}, []);

	const handleReset = () => {
		setIsRunning(false);
		setTimeRemaining(MODE_DURATIONS[mode]);
	};

	useEffect(() => {
		let interval: NodeJS.Timeout | null = null;
		if (isRunning && timeRemaining > 0) {
			interval = setInterval(() => {
				setTimeRemaining((prev) => prev - 1);
			}, 1000);
		} else if (timeRemaining === 0) {
			// Simple logic: auto-switch to short break after session
			if (mode === "session") {
				setMode("shortBreak");
				setTimeRemaining(MODE_DURATIONS.shortBreak);
			} else {
				setMode("session");
				setTimeRemaining(MODE_DURATIONS.session);
			}
			setIsRunning(false); // Pause on switch
		}

		return () => {
			if (interval) clearInterval(interval);
		};
	}, [isRunning, timeRemaining, mode]);

	useEffect(() => {
		const handleKeyPress = (e: KeyboardEvent) => {
			if (e.key.toLowerCase() === "p") {
				e.preventDefault();
				handleToggle();
			}
		};
		window.addEventListener("keydown", handleKeyPress);
		return () => window.removeEventListener("keydown", handleKeyPress);
	}, [handleToggle]);

	return (
		<div className='flex items-center gap-2 bg-slate-800/50 rounded-lg px-3 py-1.5'>
			<span
				className={`w-2.5 h-2.5 rounded-full ${isRunning ? "bg-green-400" : "bg-slate-500"} transition-colors ${settings.reduceMotion ? "" : "duration-300"}`}
				aria-hidden='true'
			/>
			<div className='font-mono text-sm text-slate-200' aria-live='polite' aria-atomic='true'>
				{formatTime(timeRemaining)}
			</div>
			<div className='flex items-center'>
				<button
					onClick={handleToggle}
					className='p-1 rounded-md hover:bg-slate-700/80 focus:outline-none focus:ring-2 focus:ring-sky-500/60'
					aria-label={isRunning ? "Pause Pomodoro" : "Start Pomodoro"}>
					{isRunning ?
						<Pause size={16} className='text-slate-300' />
					:	<Play size={16} className='text-slate-300' />}
				</button>
				<button
					onClick={handleReset}
					className='p-1 rounded-md hover:bg-slate-700/80 focus:outline-none focus:ring-2 focus:ring-sky-500/60'
					aria-label='Reset Pomodoro'>
					<RotateCcw size={16} className='text-slate-300' />
				</button>
			</div>
		</div>
	);
};

export default Pomodoro;
