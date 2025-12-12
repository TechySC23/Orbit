
import { useState, useEffect, type ReactNode } from 'react';
import { type Task, type Settings, type UIState } from './uiTypes';
import { getInitialSettings, getInitialTasks } from './uiUtils';
import { UIContext } from './useUI'; // Import UIContext from the new file
