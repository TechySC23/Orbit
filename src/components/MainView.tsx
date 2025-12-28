import { useUI } from "../state/uiStore";
import { type Task } from "../state/uiTypes";
import { CheckCircle2, Circle, Trash2 } from "lucide-react";
import FocusView from "../views/FocusView";

// == TaskList Component (local to MainView) ==
const TaskItem = ({ task }: { task: Task }) => {
	const { removeTask } = useUI();
	return (
		<div className='flex items-center p-3 bg-slate-800/50 rounded-lg border border-slate-700/50 hover:bg-slate-800 transition-colors'>
			<button className='mr-3 flex-shrink-0'>
				<Circle className='h-6 w-6 text-slate-500 hover:text-sky-400' />
			</button>
			<div className='flex-grow'>
				<p className='text-slate-100'>{task.title}</p>
				{task.description && <p className='text-sm text-slate-400 mt-1'>{task.description}</p>}
			</div>
			<div className='flex items-center gap-2 ml-4'>
				{task.dueDate && <span className='text-xs bg-slate-700 px-2 py-0.5 rounded-full text-slate-300'>{task.dueDate}</span>}
				{task.priority && (
					<span
						className={`text-xs px-2 py-0.5 rounded-full ${
							task.priority === "high" ? "bg-red-500/20 text-red-300"
							: task.priority === "medium" ? "bg-yellow-500/20 text-yellow-300"
							: "bg-green-500/20 text-green-300"
						}`}>
						{task.priority}
					</span>
				)}
				<button onClick={() => removeTask(task.id)} className='p-1.5 rounded-md hover:bg-slate-700 text-slate-400 hover:text-red-400'>
					<Trash2 size={16} />
				</button>
			</div>
		</div>
	);
};

const TaskList = () => {
	const { tasks } = useUI();
	if (tasks.length === 0) {
		return (
			<div className='text-center py-20'>
				<CheckCircle2 className='mx-auto h-12 w-12 text-green-500' />
				<h2 className='mt-4 text-2xl font-semibold text-slate-200 mb-2'>All Clear!</h2>
				<p className='text-slate-400'>You have no tasks. Add one using the '+' button.</p>
			</div>
		);
	}
	return (
		<div className='space-y-3'>
			{tasks.map((task) => (
				<TaskItem key={task.id} task={task} />
			))}
		</div>
	);
};

// == Dashboard Component (local to MainView) ==
const Dashboard = () => {
	const { tasks } = useUI();
	const today = new Date().toISOString().split("T")[0];
	const dueToday = tasks.filter((t) => t.dueDate === today).length;

	return (
		<div className='grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6'>
			<div className='bg-slate-800/50 p-6 rounded-lg'>
				<h3 className='text-slate-400 text-sm font-medium'>Total Tasks</h3>
				<p className='text-4xl font-bold text-slate-100 mt-2'>{tasks.length}</p>
			</div>
			<div className='bg-slate-800/50 p-6 rounded-lg'>
				<h3 className='text-slate-400 text-sm font-medium'>Due Today</h3>
				<p className='text-4xl font-bold text-slate-100 mt-2'>{dueToday}</p>
			</div>
			<div className='bg-slate-800/50 p-6 rounded-lg'>
				<h3 className='text-slate-400 text-sm font-medium'>Active Pomodoro</h3>
				<p className='text-2xl font-semibold text-slate-100 mt-3'>Inactive</p>
			</div>
		</div>
	);
};

// == MainView Component ==
interface MainViewProps {
	children?: React.ReactNode;
	className?: string;
}

const MainView: React.FC<MainViewProps> = ({ children, className = "" }) => {
	const { currentRoute } = useUI();

	const renderContent = () => {
		switch (currentRoute) {
			case "tasks":
				return <TaskList />;
			case "focus":
				return <FocusView />;
			case "dashboard":
				return <Dashboard />;
			default:
				return (
					children || (
						<div className='text-center py-20'>
							<h2 className='text-2xl font-semibold text-slate-200 mb-2'>View is empty</h2>
							<p className='text-slate-400'>Select an item from the sidebar to get started.</p>
						</div>
					)
				);
		}
	};

	return (
		<main
			className={`
        flex-1 overflow-y-auto p-8 
        bg-slate-900
        ${className}
      `}
			role='main'
			aria-label='Main content area'>
			<div className='max-w-full mx-auto'>{renderContent()}</div>
		</main>
	);
};

export default MainView;
