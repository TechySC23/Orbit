import { useUIStore } from "../state/uiStore";
import { useFocusStore } from "../state/focusStore";
import { type Task } from "../state/uiTypes";
import { CheckCircle2, Circle, Trash2, Layout, Repeat, Timer, Package } from "lucide-react";
import FocusView from "../views/FocusView";
import SettingsView from "../views/SettingsView";

// == TaskList Component (local to MainView) ==
const TaskItem = ({ task }: { task: Task }) => {
	const { removeTask } = useUIStore();
	return (
		<div className='flex items-center p-3 bg-slate-800/50 rounded-lg border border-slate-700/50 hover:bg-slate-800 transition-colors'>
			<button className='mr-3 flex-shrink-0'>
				<Circle className='h-6 w-6 text-slate-500 hover:text-sky-400' />
			</button>
			<div className='flex-grow'>
				<p className='text-slate-100 font-medium'>{task.title}</p>
				{task.description && <p className='text-sm text-slate-400 mt-1'>{task.description}</p>}
			</div>
			<div className='flex items-center gap-2 ml-4'>
				{task.dueDate && <span className='text-xs bg-slate-700 px-3 py-1 rounded-full text-slate-300 font-mono'>{task.dueDate}</span>}
				{task.priority && (
					<span
						className={`text-xs px-2 py-0.5 rounded-full font-medium uppercase tracking-wider ${
							task.priority === "high" ? "bg-red-500/20 text-red-300"
							: task.priority === "medium" ? "bg-yellow-500/20 text-yellow-300"
							: "bg-green-500/20 text-green-300"
						}`}>
						{task.priority}
					</span>
				)}
				<button onClick={() => removeTask(task.id)} className='p-1.5 rounded-md hover:bg-slate-700 text-slate-400 hover:text-red-400 transition-colors'>
					<Trash2 size={16} />
				</button>
			</div>
		</div>
	);
};

const TaskList = () => {
	const { tasks } = useUIStore();
	if (tasks.length === 0) {
		return (
			<div className='flex flex-col items-center justify-center py-20 animate-in fade-in duration-700'>
				<CheckCircle2 size={64} className='text-slate-700 mb-6' />
				<h2 className='text-2xl font-semibold text-slate-200 mb-2'>Zero Tasks</h2>
				<p className='text-slate-500'>Your inbox is perfectly clear. Take a deep breath.</p>
			</div>
		);
	}
	return (
		<div className='max-w-4xl mx-auto space-y-3 animate-in fade-in slide-in-from-bottom-2 duration-400'>
            <div className="flex justify-between items-center mb-6">
                <h2 className="text-xl font-bold text-slate-300 uppercase tracking-widest">Inbox</h2>
                <span className="text-sm text-slate-500 font-mono">{tasks.length} tasks</span>
            </div>
			{tasks.map((task) => (
				<TaskItem key={task.id} task={task} />
			))}
		</div>
	);
};

// == Empty/Placeholder State Component ==
const PlaceholderView = ({ title, icon: Icon, description }: { title: string; icon: any; description: string }) => (
	<div className='flex flex-col items-center justify-center py-32 animate-in fade-in duration-700'>
		<Icon size={80} className='text-slate-800 mb-8' />
		<h2 className='text-3xl font-bold text-slate-200 mb-3 tracking-tight'>{title}</h2>
		<p className='text-slate-500 max-w-sm text-center leading-relaxed'>{description}</p>
	</div>
);

// == Dashboard Component (local to MainView) ==
const Dashboard = () => {
	const { tasks } = useUIStore();
	const { isActive, mode, timeLeft } = useFocusStore();
	
	const today = new Date().toISOString().split("T")[0];
	const dueToday = tasks.filter((t) => t.dueDate === today).length;

    const formatShortTime = (seconds: number) => {
        const mins = Math.floor(seconds / 60);
        const secs = seconds % 60;
        return `${mins}m ${secs}s`;
    };

	return (
		<div className='max-w-6xl mx-auto animate-in fade-in duration-500'>
            <div className="mb-12">
                <h1 className="text-4xl font-extrabold text-slate-100 tracking-tight mb-2">Welcome Back</h1>
                <p className="text-slate-400 text-lg">Here's the pulse of your productivity.</p>
            </div>

			<div className='grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8'>
				<div className='bg-slate-800/30 p-8 rounded-2xl border border-slate-700/40 relative overflow-hidden group'>
                    <div className="absolute top-0 right-0 p-4 opacity-10 group-hover:opacity-20 transition-opacity">
                        <Package size={80} />
                    </div>
					<h3 className='text-slate-500 text-sm font-bold uppercase tracking-widest'>Total Tasks</h3>
					<p className='text-6xl font-black text-slate-100 mt-4 tabular-nums'>{tasks.length}</p>
				</div>
                
				<div className='bg-slate-800/30 p-8 rounded-2xl border border-slate-700/40 relative overflow-hidden group'>
                    <div className="absolute top-0 right-0 p-4 opacity-10 group-hover:opacity-20 transition-opacity">
                        <Layout size={80} />
                    </div>
					<h3 className='text-slate-500 text-sm font-bold uppercase tracking-widest'>Due Today</h3>
					<p className='text-6xl font-black text-slate-100 mt-4 tabular-nums'>{dueToday}</p>
				</div>

				<div className={`p-8 rounded-2xl border relative overflow-hidden group transition-all duration-500 ${isActive ? "bg-sky-500/10 border-sky-500/30" : "bg-slate-800/30 border-slate-700/40"}`}>
                    <div className={`absolute top-0 right-0 p-4 opacity-10 group-hover:opacity-20 transition-opacity ${isActive ? "text-sky-400" : "text-slate-400"}`}>
                        <Timer size={80} />
                    </div>
					<h3 className={`text-sm font-bold uppercase tracking-widest ${isActive ? "text-sky-400" : "text-slate-500"}`}>
                        {isActive ? `Active ${mode}` : "Focus Engine"}
                    </h3>
					<p className={`text-4xl font-black mt-6 tabular-nums ${isActive ? "text-slate-100" : "text-slate-600"}`}>
                        {isActive ? formatShortTime(timeLeft) : "STANDBY"}
                    </p>
				</div>
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
	const { currentRoute } = useUIStore();

	const renderContent = () => {
		switch (currentRoute) {
			case "tasks":
				return <TaskList />;
			case "focus":
				return <FocusView />;
			case "settings":
				return <SettingsView />;
			case "dashboard":
				return <Dashboard />;
			case "board":
				return <PlaceholderView 
                    title="Kanban Board" 
                    icon={Layout} 
                    description="Visualize your workflow in Phase 3. A powerful drag-and-drop experience is coming soon." 
                />;
			case "habits":
				return <PlaceholderView 
                    title="Habit Mastery" 
                    icon={Repeat} 
                    description="Track your daily routines and build long-term consistency. Planned for Version 0.2." 
                />;
			default:
				return (
					children || (
						<div className='flex flex-col items-center justify-center py-32'>
							<h2 className='text-2xl font-semibold text-slate-500'>Route not found</h2>
						</div>
					)
				);
		}
	};

	return (
		<main
			className={`
        flex-1 overflow-y-auto p-12 
        bg-slate-900
        ${className}
      `}
			role='main'
			aria-label='Main content area'>
			<div className='w-full max-w-full mx-auto'>{renderContent()}</div>
		</main>
	);
};

export default MainView;
