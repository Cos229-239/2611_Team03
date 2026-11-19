//import zustand builder function for app memory state management
import {create} from 'zustand';
import {
FamilyRole,
TaskEffort,
TimingFeel,
Task,
PetRewardSync,
//
} from '../dataPoints/moodiData'
import {
    PetStats,
    PetEvent,
    STARTING_STATS,
    applyEvent,
} from './stats';

// Maps each 1-4 effort level to the exact number of treats user will earn
const EFFORT_TO_TREATS: Record<TaskEffort, number> = {
  1: 1, // small effort = 1 treat
  2: 2, // medium effort = 2 treats
  3: 4, // large effort = 4 treats
  4: 6, // overwhelming effort = 6 treats
};

// Happiness gained per treat fed to Mochi (5 small tasks = 5 treats = +40 happiness)
const HAPPINESS_PER_TREAT = 8;

// Blueprint for everything our live app memory holds and can do
interface AppState {
  tasks: Task[];
  selectedDate: string; // 'YYYY-MM-DD' currently highlighted on the calendar
  petSync: PetRewardSync;
  petStats: PetStats;

  // Actions that screens can trigger
  setSelectedDate: (date: string) => void;
  addTask: (newTask: {
    title: string;
    description?: string;
    assignedTo: string;
    createdBy: FamilyRole;
    targetDate: string;
    targetTime?: string;
    timingFeel: TimingFeel;
    effort: TaskEffort;
    requiresReview?: boolean;
  }) => void;
  completeTask: (taskId: string) => void;
  approveTask: (taskId: string) => void;
  feedPet: (treatsToFeed?: number, feedType?: 'PET_FED_FOOD' | 'PET_FED_SNACKS') => void;
  triggerPetEvent: (event: PetEvent) => void;
}
