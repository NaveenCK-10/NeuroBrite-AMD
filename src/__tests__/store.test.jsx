import { describe, it, expect, beforeEach } from 'vitest';
import { render, screen, act } from '@testing-library/react';
import { AppProvider, useApp } from '../lib/store';

// ============================================
// NeuroBite State Management — Unit Tests
// Tests Context provider and state operations
// ============================================

// Helper component to access context values
function TestConsumer({ onRender }) {
  const ctx = useApp();
  onRender(ctx);
  return <div data-testid="entries-count">{ctx.entries.length}</div>;
}

describe('Store — AppProvider', () => {
  beforeEach(() => {
    localStorage.clear();
  });

  it('should provide initial state with seed entries', () => {
    let ctx;
    render(
      <AppProvider>
        <TestConsumer onRender={(c) => { ctx = c; }} />
      </AppProvider>
    );
    expect(ctx.entries).toBeDefined();
    expect(ctx.entries.length).toBeGreaterThan(0);
    expect(ctx.patterns).toBeDefined();
    expect(ctx.user).toBeDefined();
    expect(ctx.chatMessages).toBeDefined();
  });

  it('should have all required action dispatchers', () => {
    let ctx;
    render(
      <AppProvider>
        <TestConsumer onRender={(c) => { ctx = c; }} />
      </AppProvider>
    );
    expect(typeof ctx.addEntry).toBe('function');
    expect(typeof ctx.setOnboarded).toBe('function');
    expect(typeof ctx.addInsight).toBe('function');
    expect(typeof ctx.addChatMessage).toBe('function');
    expect(typeof ctx.updateLastChat).toBe('function');
    expect(typeof ctx.setLoading).toBe('function');
  });

  it('should add a new entry', () => {
    let ctx;
    render(
      <AppProvider>
        <TestConsumer onRender={(c) => { ctx = c; }} />
      </AppProvider>
    );
    const initialCount = ctx.entries.length;

    act(() => {
      ctx.addEntry({
        food: 'Test pizza',
        mood: 'happy',
        context: ['alone'],
        calories: 500,
      });
    });

    expect(ctx.entries.length).toBe(initialCount + 1);
    expect(ctx.entries[0].food).toBe('Test pizza');
  });

  it('should add a chat message', () => {
    let ctx;
    render(
      <AppProvider>
        <TestConsumer onRender={(c) => { ctx = c; }} />
      </AppProvider>
    );

    act(() => {
      ctx.addChatMessage({ role: 'user', content: 'Hello' });
    });

    expect(ctx.chatMessages.length).toBe(1);
    expect(ctx.chatMessages[0].content).toBe('Hello');
  });

  it('should throw error when useApp is used outside AppProvider', () => {
    function BadComponent() {
      useApp();
      return null;
    }

    expect(() => render(<BadComponent />)).toThrow(
      'useApp must be used within AppProvider'
    );
  });
});
