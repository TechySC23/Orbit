import { useUIStore } from "../state/uiStore";
import { type Settings } from "../state/uiTypes";

const SettingsView = () => {
	const { settings, setSettings, sidebarMode, setSidebarMode } = useUIStore();

	const handleSettingChange = <T extends keyof Settings>(key: T, value: Settings[T]) => {
		setSettings({ [key]: value });
	};

	return (
		<div className='max-w-3xl mx-auto py-12 px-6 animate-in fade-in slide-in-from-bottom-4 duration-500'>
			<div className='flex items-center gap-4 mb-12'>
				<h1 className='text-4xl font-black text-slate-100 uppercase tracking-tight'>Settings</h1>
			</div>

			<div className='space-y-12'>
				{/* Appearance Section */}
				<section>
					<h2 className='text-sm font-semibold text-slate-500 uppercase tracking-widest mb-6'>Appearance</h2>
					<div className='space-y-6'>
						<div className='flex items-center justify-between p-4 bg-slate-800/40 rounded-xl border border-slate-700/50 hover:bg-slate-800/60 transition-colors'>
							<div>
								<h3 className='text-lg font-medium text-slate-100'>Font Family</h3>
								<p className='text-sm text-slate-400'>Choose your preferred typography for the app.</p>
							</div>
							<select
								value={settings.font}
								onChange={(e) => handleSettingChange("font", e.target.value as Settings["font"])}
								className='bg-slate-900 border border-slate-700 rounded-lg px-4 py-2 text-slate-100 focus:ring-2 focus:ring-sky-500/60 outline-none'>
								<option value='Inter'>Inter</option>
								<option value='Roboto'>Roboto</option>
								<option value='Sora'>Sora</option>
							</select>
						</div>

						<div className='flex items-center justify-between p-4 bg-slate-800/40 rounded-xl border border-slate-700/50 hover:bg-slate-800/60 transition-colors'>
							<div>
								<h3 className='text-lg font-medium text-slate-500'>Reduce Motion</h3>
								<p className='text-xs text-slate-600 uppercase font-bold tracking-widest'>Coming Soon</p>
							</div>
							<div className="bg-slate-900/50 h-7 w-12 rounded-full cursor-not-allowed opacity-50 border border-slate-800" />
						</div>

						<div className='flex items-center justify-between p-4 bg-slate-800/40 rounded-xl border border-slate-700/50 hover:bg-slate-800/60 transition-colors'>
							<div>
								<h3 className='text-lg font-medium text-slate-100'>Sidebar</h3>
								<p className='text-sm text-slate-400'>Select your preferred sidebar view.</p>
							</div>
							<div className="flex bg-slate-900 border border-slate-700 rounded-lg p-1">
								{(["collapsed", "expanded"] as const).map((mode) => (
									<button
										key={mode}
										onClick={() => setSidebarMode(mode)}
										className={`px-4 py-1.5 rounded-md text-xs font-bold uppercase tracking-tighter transition-all ${
											sidebarMode === mode 
												? "bg-slate-800 text-sky-400 shadow-sm" 
												: "text-slate-500 hover:text-slate-300"
										}`}
									>
										{mode}
									</button>
								))}
							</div>
						</div>
					</div>
				</section>

				{/* Workflow Section */}
				<section>
					<h2 className='text-sm font-semibold text-slate-500 uppercase tracking-widest mb-6'>Workflow</h2>
					<div className='space-y-6'>
						<div className='flex items-center justify-between p-4 bg-slate-800/40 rounded-xl border border-slate-700/50 hover:bg-slate-800/60 transition-colors'>
							<div>
								<h3 className='text-lg font-medium text-slate-100'>Save New Tasks as Draft</h3>
								<p className='text-sm text-slate-400'>Newly created tasks will start in a draft state.</p>
							</div>
							<button
								role='switch'
								aria-checked={settings.saveDraft}
								onClick={() => handleSettingChange("saveDraft", !settings.saveDraft)}
								className={`${settings.saveDraft ? "bg-sky-500" : "bg-slate-700"} relative inline-flex h-7 w-12 items-center rounded-full transition-colors focus:outline-none focus:ring-2 focus:ring-sky-500/60 focus:ring-offset-2 focus:ring-offset-slate-900`}>
								<span className={`${settings.saveDraft ? "translate-x-6" : "translate-x-1"} inline-block h-5 w-5 transform rounded-full bg-white transition-transform duration-300 ease-out`} />
							</button>
						</div>
					</div>
				</section>

				<footer className='pt-12 text-center text-slate-600 border-t border-slate-800'>
					<p className='text-xs font-mono uppercase tracking-widest'>Orbit v0.1.3</p>
				</footer>
			</div>
		</div>
	);
};

export default SettingsView;
