import { useFocusStore } from "../state/focusStore";
import { Play, Pause, RotateCcw, Brain, Coffee, CupSoda } from "lucide-react";

const FocusView = () => {
	const { timeLeft, isActive, mode, toggleTimer, resetTimer, setMode } = useFocusStore();

	const formatTime = (seconds: number) => {
		const mins = Math.floor(seconds / 60);
		const secs = seconds % 60;
		return `${String(mins).padStart(2, "0")}:${String(secs).padStart(2, "0")}`;
	};

	/* Unused helper for now
	const getModeLabel = (m: typeof mode) => {
		switch (m) {
			case "session":
				return "Focus";
			case "shortBreak":
				return "Short Break";
			case "longBreak":
				return "Long Break";
		}
	};
    */

	const getModeIcon = (m: typeof mode) => {
		switch (m) {
			case "focus":
				return <Brain size={20} />;
			case "shortBreak":
				return <Coffee size={20} />;
			case "longBreak":
				return <CupSoda size={20} />;
		}
	};



	return (
		<div className='flex flex-col items-center justify-center h-full min-h-[60vh] max-w-2xl mx-auto animate-in fade-in duration-500'>
            
            {/* Mode Selectors */}
            <div className="flex bg-slate-800/50 p-1.5 rounded-full mb-12 border border-slate-700/50">
                {(["focus", "shortBreak", "longBreak"] as const).map((m) => (
                    <button
                        key={m}
                        onClick={() => setMode(m)}
                        className={`
                            px-4 py-2 rounded-full text-sm font-medium transition-all duration-300 flex items-center gap-2
                            ${mode === m 
                                ? "bg-slate-700 text-sky-400 shadow-sm" 
                                : "text-slate-400 hover:text-slate-200 hover:bg-slate-800"
                            }
                        `}
                    >
                         {getModeIcon(m)}
                         {m === "focus" ? "Focus" : m === "shortBreak" ? "Short Break" : "Long Break"}
                    </button>
                ))}
            </div>

			{/* Main Timer Display */}
			<div className='relative mb-12 group'>
				<div 
                    className='text-[12rem] leading-none font-black text-slate-100 tabular-nums select-none tracking-tighter'
                    style={{ fontFamily: "var(--font-family, 'Inter'), monospace" }}
                    aria-label={`Time remaining: ${formatTime(timeLeft)}`}
                    >
					{formatTime(timeLeft)}
				</div>
                <div className="text-center text-slate-500 text-lg font-bold tracking-[0.2em] uppercase mt-4">
                    {isActive ? "Flow State" : "Ready"}
                </div>
			</div>

			{/* Controls */}
			<div className='flex items-center gap-6'>
				<button
					onClick={toggleTimer}
					className={`
                        group relative flex items-center justify-center w-20 h-20 rounded-full 
                        transition-all duration-300
                        ${isActive 
                            ? "bg-slate-800 hover:bg-slate-700 text-slate-300" 
                            : "bg-sky-500 hover:bg-sky-400 text-white shadow-lg shadow-sky-900/20"
                        }
                    `}
					aria-label={isActive ? "Pause" : "Start"}>
					{isActive ? <Pause size={32} /> : <Play size={32} className="ml-1" />}
				</button>
                
				<button
					onClick={resetTimer}
					className='
                        p-4 rounded-full text-slate-500 hover:bg-slate-800 hover:text-slate-300 
                        transition-all duration-300
                    '
					aria-label='Reset Timer'>
					<RotateCcw size={24} />
				</button>
			</div>
		</div>
	);
};

export default FocusView;
