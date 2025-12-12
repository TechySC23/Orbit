import React from "react";
import { render, fireEvent, screen } from "@testing-library/react";
import AddTaskModal from "../AddTaskModal";
import { useUI } from "../../state/uiStore";
import { vi } from "vitest";

// Mock the useUI hook
vi.mock("../../state/uiStore", () => ({
	useUI: vi.fn(),
}));

const mockSetAddTaskModalOpen = vi.fn();
const mockAddTask = vi.fn();

describe("AddTaskModal Component", () => {
	beforeEach(() => {
		vi.clearAllMocks();
	});

	it("should not render when isAddTaskModalOpen is false", () => {
		(useUI as jest.Mock).mockReturnValue({
			isAddTaskModalOpen: false,
			setAddTaskModalOpen: mockSetAddTaskModalOpen,
			addTask: mockAddTask,
			settings: { saveDraft: false },
		});
		const { container } = render(<AddTaskModal />);
		expect(container.firstChild).toBeNull();
	});

	it("should render when isAddTaskModalOpen is true", () => {
		(useUI as jest.Mock).mockReturnValue({
			isAddTaskModalOpen: true,
			setAddTaskModalOpen: mockSetAddTaskModalOpen,
			addTask: mockAddTask,
			settings: { saveDraft: false },
		});
		render(<AddTaskModal />);
		expect(screen.getByText("Add New Task")).toBeInTheDocument();
	});

	it("should close when the escape key is pressed", () => {
		(useUI as jest.Mock).mockReturnValue({
			isAddTaskModalOpen: true,
			setAddTaskModalOpen: mockSetAddTaskModalOpen,
			addTask: mockAddTask,
			settings: { saveDraft: false },
		});
		render(<AddTaskModal />);
		fireEvent.keyDown(window, { key: "Escape", code: "Escape" });
		expect(mockSetAddTaskModalOpen).toHaveBeenCalledWith(false);
	});

	it("should not save a task if the title is empty", () => {
		(useUI as jest.Mock).mockReturnValue({
			isAddTaskModalOpen: true,
			setAddTaskModalOpen: mockSetAddTaskModalOpen,
			addTask: mockAddTask,
			settings: { saveDraft: false },
		});
		render(<AddTaskModal />);
		const saveButton = screen.getByText(/save task/i);
		fireEvent.click(saveButton);
		expect(mockAddTask).not.toHaveBeenCalled();
	});

	it("should save a task when the title is provided", () => {
		(useUI as jest.Mock).mockReturnValue({
			isAddTaskModalOpen: true,
			setAddTaskModalOpen: mockSetAddTaskModalOpen,
			addTask: mockAddTask,
			settings: { saveDraft: false },
		});
		render(<AddTaskModal />);

		const titleInput = screen.getByLabelText(/title/i);
		fireEvent.change(titleInput, { target: { value: "Test Task" } });

		const saveButton = screen.getByText(/save task/i);
		fireEvent.click(saveButton);

		expect(mockAddTask).toHaveBeenCalledWith({
			title: "Test Task",
			description: "",
			dueDate: "",
			priority: "medium",
		});
		expect(mockSetAddTaskModalOpen).toHaveBeenCalledWith(false);
	});
});
