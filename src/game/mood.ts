// src/game/mood.ts
// Decides which Mochi image/animation to show. PURE function: stats in, mood out.
// Lives in src/game/ so it can be unit tested without rendering anything.

import type { PetStats } from './stats.ts';

export type MochiMood = 'sleeping' | 'sad' | 'happy' | 'idle' | 'sick'; // TODO: sick is not implemented yet, but we want to reserve the name for when we do.

// Draft thresholds. Tune with the team alongside EVENT_EFFECTS.
export function getMochiMood(stats: PetStats): MochiMood {
  if(stats.health < 20) return 'sick';
  if (stats.energy < 25) return 'sleeping';
  if (stats.happiness < 35 || stats.health < 40 ) return 'sad';
  if (stats.happiness >= 75) return 'happy';
  return 'idle';
}
