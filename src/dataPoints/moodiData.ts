// Identifies whether the person creating an account or viewing the app is a parent or a child.
export type FamilyRole = 'parent' | 'child';

// Tracks task progress
export type TaskProgress = 'planning' | 'planned' | 'crunch-time' | 'completed' | 'pending-review';

// Measures Effort 1 = small, 2 = medium, 3 = large, 4 = overwhelming
export type TaskEffort = 1 | 2 | 3 | 4;

// Measures Due dates in a flexible/stress reduced way
export type TimingFeel = 'flexible' | 'on-time' | 'getting-tight!' | 'oops!';

// Main Task Interface defining the structure of a task object
export interface Task {
  id: string;                    // Each task gets it's own ID string
  title: string;                // Title of task
  description?: string;        // Optional description of task. Title may also serve as description.
  assignedTo: string;          // Who the task is assigned to (user ID)
  createdBy: FamilyRole;       // Who created the task defined by FamilyRole type
  targetDate: string;            // Target date for task completion
  targetTime?: string;         // Optional target time for task completion
  timingFeel: TimingFeel;      // How the target date feels defined by TimingFeel type
  effort: TaskEffort;         // Effort required for task completion defined by TaskEffort type
  treatReward: number;        //Exact number of treats earned when completed
  requiresReview: boolean;        // Does task require review by parent before treat is given
  progress: TaskProgress;      // Current progress of task defined by TaskProgress type
}

// Data passed to the pet screen so Mochi reacts when treats are earned or fed and count is kept
export interface PetRewardSync {
  treatsBalance: number;       // Total treats currently available to feed Mochi
  happinessLevel: number;      // 0 - 100 score controlling Mochi's mood & animations
  streakDays: number;          // Consecutive days with completed tasks
  isStreakActive: boolean;     // Controls whether Mochi stays vibrant or looks sleepy or has muted colors, whatever we end up going with
}
