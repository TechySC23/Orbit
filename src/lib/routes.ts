/**
 * Route definitions for the Orbit application navigation
 * TODO: Replace with real route objects when backend integration is added
 */

export interface Route {
  id: string;
  label: string;
}

export const routes: Route[] = [
  { id: 'dashboard', label: 'Dashboard' },
  { id: 'board', label: 'Board' },
  { id: 'tasks', label: 'Tasks' },
  { id: 'habits', label: 'Habits' },
];

export default routes;