import { describe, it, expect } from 'vitest';
import { SEED_ENTRIES, MOODS, COMPUTED_PATTERNS } from '../data/seedData';

// ============================================
// NeuroBite Seed Data — Integrity Tests
// Ensures demo data is well-formed and complete
// ============================================

describe('Seed Data — MOODS', () => {
  it('should have at least 6 mood types', () => {
    expect(MOODS.length).toBeGreaterThanOrEqual(6);
  });

  it('should have required fields on every mood', () => {
    MOODS.forEach((mood) => {
      expect(mood).toHaveProperty('id');
      expect(mood).toHaveProperty('label');
      expect(mood).toHaveProperty('emoji');
      expect(mood).toHaveProperty('color');
      expect(typeof mood.id).toBe('string');
      expect(typeof mood.label).toBe('string');
    });
  });

  it('should have unique mood IDs', () => {
    const ids = MOODS.map((m) => m.id);
    const unique = new Set(ids);
    expect(unique.size).toBe(ids.length);
  });
});

describe('Seed Data — SEED_ENTRIES', () => {
  it('should have demo entries', () => {
    expect(SEED_ENTRIES.length).toBeGreaterThan(0);
  });

  it('should have required fields on every entry', () => {
    SEED_ENTRIES.forEach((entry) => {
      expect(entry).toHaveProperty('id');
      expect(entry).toHaveProperty('food');
      expect(entry).toHaveProperty('mood');
      expect(entry).toHaveProperty('calories');
      expect(typeof entry.food).toBe('string');
      expect(typeof entry.calories).toBe('number');
    });
  });

  it('should reference valid mood IDs', () => {
    const validMoodIds = MOODS.map((m) => m.id);
    SEED_ENTRIES.forEach((entry) => {
      expect(validMoodIds).toContain(entry.mood);
    });
  });
});

describe('Seed Data — COMPUTED_PATTERNS', () => {
  it('should have all required pattern fields', () => {
    expect(COMPUTED_PATTERNS).toHaveProperty('totalEntries');
    expect(COMPUTED_PATTERNS).toHaveProperty('impulsivePercentage');
    expect(COMPUTED_PATTERNS).toHaveProperty('plannedPercentage');
    expect(COMPUTED_PATTERNS).toHaveProperty('streakDays');
    expect(COMPUTED_PATTERNS).toHaveProperty('weeklyMoodBreakdown');
    expect(COMPUTED_PATTERNS).toHaveProperty('stressedFoods');
    expect(COMPUTED_PATTERNS).toHaveProperty('happyFoods');
  });

  it('should have percentage values between 0 and 100', () => {
    expect(COMPUTED_PATTERNS.impulsivePercentage).toBeGreaterThanOrEqual(0);
    expect(COMPUTED_PATTERNS.impulsivePercentage).toBeLessThanOrEqual(100);
    expect(COMPUTED_PATTERNS.plannedPercentage).toBeGreaterThanOrEqual(0);
    expect(COMPUTED_PATTERNS.plannedPercentage).toBeLessThanOrEqual(100);
  });

  it('should have impulsive + planned ≤ 100', () => {
    const sum = COMPUTED_PATTERNS.impulsivePercentage + COMPUTED_PATTERNS.plannedPercentage;
    expect(sum).toBeLessThanOrEqual(100);
  });
});
