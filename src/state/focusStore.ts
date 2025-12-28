import { create, type StateCreator } from "zustand";

type TimerMode = "session" | "shortBreak" | "longBreak";

const MODE_DURATIONS: Record<TimerMode, number> = {
	session: 25 * 60,
	shortBreak: 5 * 60,
	longBreak: 15 * 60,
};

interface FocusState {
	mode: TimerMode;
	timeLeft: number;
	isActive: boolean;
	setMode: (mode: TimerMode) => void;
	toggleTimer: () => void;
	resetTimer: () => void;
	tick: () => void;
}

let timerInterval: ReturnType<typeof setInterval> | null = null;

const createFocusStore: StateCreator<FocusState> = (set, get) => ({
	mode: "session",
	timeLeft: MODE_DURATIONS.session,
	isActive: false,

	setMode: (mode) => {
		if (timerInterval) clearInterval(timerInterval);
		timerInterval = null;
		set({
			mode,
			timeLeft: MODE_DURATIONS[mode],
			isActive: false,
		});
	},

	toggleTimer: () => {
		const { isActive } = get();
		const nextActive = !isActive;

		if (nextActive) {
			if (timerInterval) clearInterval(timerInterval);
			timerInterval = setInterval(() => {
				get().tick();
			}, 1000);
		} else {
			if (timerInterval) clearInterval(timerInterval);
			timerInterval = null;
		}

		set({ isActive: nextActive });
	},

	resetTimer: () => {
		if (timerInterval) clearInterval(timerInterval);
		timerInterval = null;
		const { mode } = get();
		set({
			timeLeft: MODE_DURATIONS[mode],
			isActive: false,
		});
	},

	tick: () => {
		const { timeLeft, isActive } = get();
		if (isActive && timeLeft > 1) {
			set({ timeLeft: timeLeft - 1 });
		} else if (isActive && timeLeft <= 1) {
			set({ timeLeft: 0, isActive: false });
			if (timerInterval) {
				clearInterval(timerInterval);
				timerInterval = null;
			}
		}
	},
});

export const useFocusStore = create<FocusState>(createFocusStore);
export { MODE_DURATIONS };
