import React from "react";
import { Orbit } from "lucide-react";

/**
 * Minimal loading screen that fades out after a short duration.
 */
const LoadingScreen: React.FC<{ onComplete: () => void }> = ({ onComplete }) => {
	React.useEffect(() => {
		const timer = setTimeout(() => {
			onComplete();
		}, 800);
		return () => clearTimeout(timer);
	}, [onComplete]);

	return (
		<div className='fixed inset-0 z-[100] flex flex-col items-center justify-center bg-slate-950 animate-out fade-out fill-mode-forwards duration-700 delay-100'>
            <div className="flex flex-col items-center gap-6 animate-in zoom-in-95 duration-500">
                <div className="bg-sky-500/10 p-5 rounded-3xl border border-sky-500/20 shadow-2xl shadow-sky-500/10">
                    <Orbit size={64} className="text-sky-400" />
                </div>
                <h1 className="text-4xl font-black text-slate-100 tracking-tighter uppercase">Orbit</h1>
            </div>
		</div>
	);
};

export default LoadingScreen;
