// Identifies whether the person creating an account or viewing the app is a parent or a child.
export type FamilyRole = 'parent' | 'child';

// Tracks task progress
export type TaskProgress = 'planning' | 'planned' | 'crunch-time' | 'completed' | 'pending-review';

// Measures Effort 1 = small, 2 = medium, 3 = large, 4 = overwhelming
export type TaskEffort = 1 | 2 | 3 | 4;

// Measures Due dates in a flexible/stress reduced way
export type TimingFeel = 'flexible' | 'on-time' | 'getting-tight!' | 'oops!';