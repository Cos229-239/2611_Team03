// src/game/stats.ts
// Mochi's stat economy. PURE TypeScript: no React, no Supabase imports, ever.
//
// Convention: every stat is 0-100 and HIGHER IS BETTER.
// That means `bond` is really a friendship meter (100 = moodi trusts you, 0 = moodi feels neglected).
// Your team should confirm or change this on Day 1, because the UI meters depend on it.

export type PetStats = {
  health: number;
  happiness: number;
  energy: number;
  bond: number; // 100 = full
};

export type PetEvent =
  | { type: 'TASK_COMPLETED'}
  | { type: 'TASK_OVERDUE'  }
  | { type: 'PET_FED_FOOD'  }
  | { type: 'PET_FED_SNACKS'}
  | { type: 'PET_RESTED'    };

export const STAT_MIN = 0;
export const STAT_MAX = 100;

// Mochi can get sick but never dies. This is how the app follows the
// "encourage, don't punish" rule from the product doc.
export const HEALTH_FLOOR = 20;

export const STARTING_STATS: PetStats = {
  health: 80,
  happiness: 70,
  energy: 70,
  bond: 10,
};

// DRAFT NUMBERS. Tune these as a team; they are the whole feel of the game.
export const EVENT_EFFECTS: Record<PetEvent['type'], Partial<PetStats>> = {
  TASK_COMPLETED: { happiness: +10, health: +2, bond: +1, energy: -3 },
  TASK_OVERDUE: { happiness: -5, health: -5 },
  PET_FED_FOOD: { health: +30, happiness: +3 },
  PET_FED_SNACKS: { energy: +10, happiness: +8 },
  PET_RESTED: { energy: +40, health: +5, happiness: +2 },
};

function clamp(value: number, min: number, max: number): number {
  return Math.min(max, Math.max(min, value));
}

export function applyEvent(stats: PetStats, event: PetEvent): PetStats {
  const effect = EVENT_EFFECTS[event.type];

  const next: PetStats = {
    health: clamp(stats.health + (effect.health ?? 0), HEALTH_FLOOR, STAT_MAX),
    happiness: clamp(stats.happiness + (effect.happiness ?? 0), STAT_MIN, STAT_MAX),
    energy: clamp(stats.energy + (effect.energy ?? 0), STAT_MIN, STAT_MAX),
    bond: clamp(stats.bond + (effect.bond ?? 0), STAT_MIN, STAT_MAX),
  };

  return next; // a new object; the old state is never mutated
}
