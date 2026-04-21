import { describe, it, expect } from 'vitest';
import {
  analyzePatterns,
  predictCraving,
  getNudge,
  chatWithAI,
  getWeeklyInsight,
  analyzeSingleEntry,
  SYSTEM_PROMPT,
} from '../lib/ai';

// ============================================
// NeuroBite AI Engine — Unit Tests
// Tests mock fallback behavior (no API key)
// ============================================

describe('AI Engine — Mock Fallback', () => {
  it('should export SYSTEM_PROMPT as a non-empty string', () => {
    expect(SYSTEM_PROMPT).toBeDefined();
    expect(typeof SYSTEM_PROMPT).toBe('string');
    expect(SYSTEM_PROMPT.length).toBeGreaterThan(100);
  });

  it('should return a pattern analysis string', async () => {
    const result = await analyzePatterns([]);
    expect(result).toBeDefined();
    expect(typeof result).toBe('string');
    expect(result.length).toBeGreaterThan(50);
  });

  it('should return a craving prediction object', async () => {
    const result = await predictCraving([]);
    expect(result).toBeDefined();
    expect(result).toHaveProperty('craving');
    expect(result).toHaveProperty('confidence');
    expect(result).toHaveProperty('time');
    expect(typeof result.confidence).toBe('number');
  });

  it('should return a nudge string', async () => {
    const result = await getNudge('stressed', '3:00 PM');
    expect(result).toBeDefined();
    expect(typeof result).toBe('string');
    expect(result.length).toBeGreaterThan(20);
  });

  it('should return a chat response for boredom question', async () => {
    const result = await chatWithAI(
      'Why do I eat when bored?',
      [],
      []
    );
    expect(result).toBeDefined();
    expect(typeof result).toBe('string');
    expect(result.toLowerCase()).toContain('dopamine');
  });

  it('should return a chat response for stress question', async () => {
    const result = await chatWithAI(
      'Why do I crave sugar when stressed?',
      [],
      []
    );
    expect(result).toBeDefined();
    expect(result.toLowerCase()).toContain('cortisol');
  });

  it('should return a fallback response for unknown questions', async () => {
    const result = await chatWithAI(
      'Tell me something random about food',
      [],
      []
    );
    expect(result).toBeDefined();
    expect(typeof result).toBe('string');
    expect(result.length).toBeGreaterThan(50);
  });

  it('should return a weekly insight report', async () => {
    const result = await getWeeklyInsight();
    expect(result).toBeDefined();
    expect(typeof result).toBe('string');
    expect(result).toContain('Weekly');
  });

  it('should return mood-specific entry analysis', async () => {
    const moods = ['stressed', 'happy', 'bored', 'anxious', 'tired', 'calm'];
    for (const mood of moods) {
      const result = await analyzeSingleEntry('pizza', mood, ['alone']);
      expect(result).toBeDefined();
      expect(typeof result).toBe('string');
      expect(result.length).toBeGreaterThan(30);
    }
  }, 15000);
});
