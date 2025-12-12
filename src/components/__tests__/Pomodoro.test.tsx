import React from "react";
import { render, fireEvent, screen, act } from "@testing-library/react";
import Pomodoro from "../Pomodoro";
import { UIProvider } from "../../state/uiStore";

describe("Pomodoro Component", () => {
	const renderWithProvider = (component: React.ReactNode) => {
		return render(<UIProvider>{component}</UIProvider>);
	};

	beforeEach(() => {
		vi.useFakeTimers();
	});

	afterEach(() => {
		vi.runOnlyPendingTimers();
		vi.useRealTimers();
	});

	it("should render the initial time correctly", () => {
		renderWithProvider(<Pomodoro />);
		expect(screen.getByText("25:00")).toBeInTheDocument();
	});

	it("should start and pause the timer when the play/pause button is clicked", () => {
		renderWithProvider(<Pomodoro />);
		const toggleButton = screen.getByLabelText(/start pomodoro/i);
		fireEvent.click(toggleButton);
		expect(screen.getByLabelText(/pause pomodoro/i)).toBeInTheDocument();

		act(() => {
			vi.advanceTimersByTime(1000);
		});

		expect(screen.getByText("24:59")).toBeInTheDocument();

		fireEvent.click(toggleButton);
		expect(screen.getByLabelText(/start pomodoro/i)).toBeInTheDocument();
	});

	it("should reset the timer when the reset button is clicked", () => {
		renderWithProvider(<Pomodoro />);
		const toggleButton = screen.getByLabelText(/start pomodoro/i);
		fireEvent.click(toggleButton);

		act(() => {
			vi.advanceTimersByTime(2000);
		});

		expect(screen.getByText("24:58")).toBeInTheDocument();

		const resetButton = screen.getByLabelText(/reset pomodoro/i);
		fireEvent.click(resetButton);
		expect(screen.getByText("25:00")).toBeInTheDocument();
		expect(screen.getByLabelText(/start pomodoro/i)).toBeInTheDocument();
	});

	it('should respond to the "p" keypress to toggle the timer', () => {
		renderWithProvider(<Pomodoro />);
		fireEvent.keyDown(window, { key: "p", code: "KeyP" });
		expect(screen.getByLabelText(/pause pomodoro/i)).toBeInTheDocument();

		act(() => {
			vi.advanceTimersByTime(1000);
		});

		fireEvent.keyDown(window, { key: "p", code: "KeyP" });
		expect(screen.getByLabelText(/start pomodoro/i)).toBeInTheDocument();
		expect(screen.getByText("24:59")).toBeInTheDocument(); // Stays at 24:59
	});
});
