// src/game/__tests__/stats.test.ts
import { applyEvent, HEALTH_FLOOR, STAT_MAX, STARTING_STATS, PetStats } from '../stats';
import { describe, test, expect } from '@jest/globals';

describe('applyEvent', () => {
  test('completing a task increases happiness', () => {
    const next = applyEvent(STARTING_STATS, { type: 'TASK_COMPLETED' });
    expect(next.happiness).toBeGreaterThan(STARTING_STATS.happiness);
  });

  test('health never drops below the floor, no matter how many tasks are missed', () => {
    let stats: PetStats = STARTING_STATS;
    for (let i = 0; i < 50; i++) {
      stats = applyEvent(stats, { type: 'TASK_OVERDUE' });
    }
    expect(stats.health).toBe(HEALTH_FLOOR);
  });

  test('stats never go above the max', () => {
    let stats: PetStats = STARTING_STATS;
    for (let i = 0; i < 50; i++) {
      stats = applyEvent(stats, { type: 'TASK_COMPLETED' });
    }
    expect(stats.happiness).toBe(STAT_MAX);
  });

  test('does not mutate the original stats object', () => {
    const before = { ...STARTING_STATS };
    applyEvent(STARTING_STATS, { type: 'TASK_COMPLETED' });
    expect(STARTING_STATS).toEqual(before);
  });
});
