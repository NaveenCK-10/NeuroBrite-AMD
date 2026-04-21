import { createContext, useContext, useReducer, useCallback, useEffect } from 'react';
import { SEED_ENTRIES, COMPUTED_PATTERNS } from '../data/seedData';

const AppContext = createContext(null);

// ---- LocalStorage helpers ----
const STORAGE_KEY = 'neurobite_state';

function loadSavedState() {
  try {
    const saved = localStorage.getItem(STORAGE_KEY);
    if (saved) {
      const parsed = JSON.parse(saved);
      return {
        entries: parsed.entries || SEED_ENTRIES,
        user: parsed.user || { name: 'Alex', onboarded: false, personality: null },
        chatMessages: parsed.chatMessages || [],
      };
    }
  } catch (e) {
    console.warn('Failed to load saved state:', e);
  }
  return null;
}

function saveState(state) {
  try {
    localStorage.setItem(STORAGE_KEY, JSON.stringify({
      entries: state.entries,
      user: state.user,
      chatMessages: state.chatMessages,
    }));
  } catch (e) {
    console.warn('Failed to save state:', e);
  }
}

// ---- Initial State ----
const saved = loadSavedState();

const initialState = {
  entries: saved?.entries || SEED_ENTRIES,
  patterns: COMPUTED_PATTERNS,
  user: saved?.user || {
    name: 'Alex',
    onboarded: false,
    personality: null,
  },
  aiInsights: [],
  chatMessages: saved?.chatMessages || [],
  isLoading: false,
};

function appReducer(state, action) {
  switch (action.type) {
    case 'ADD_ENTRY':
      return {
        ...state,
        entries: [action.payload, ...state.entries],
        patterns: {
          ...state.patterns,
          totalEntries: state.patterns.totalEntries + 1,
        },
      };

    case 'SET_ONBOARDED':
      return {
        ...state,
        user: { ...state.user, onboarded: true, personality: action.payload },
      };

    case 'ADD_INSIGHT':
      return {
        ...state,
        aiInsights: [action.payload, ...state.aiInsights],
      };

    case 'ADD_CHAT_MESSAGE':
      return {
        ...state,
        chatMessages: [...state.chatMessages, action.payload],
      };

    case 'UPDATE_LAST_CHAT':
      return {
        ...state,
        chatMessages: state.chatMessages.map((msg, i) =>
          i === state.chatMessages.length - 1
            ? { ...msg, ...action.payload }
            : msg
        ),
      };

    case 'SET_LOADING':
      return { ...state, isLoading: action.payload };

    default:
      return state;
  }
}

export function AppProvider({ children }) {
  const [state, dispatch] = useReducer(appReducer, initialState);

  // Persist critical state to localStorage on changes
  useEffect(() => {
    saveState(state);
  }, [state.entries, state.user, state.chatMessages]);

  const addEntry = useCallback((entry) => {
    dispatch({ type: 'ADD_ENTRY', payload: { id: Date.now().toString(), time: new Date().toISOString(), ...entry } });
  }, []);

  const setOnboarded = useCallback((personality) => {
    dispatch({ type: 'SET_ONBOARDED', payload: personality });
  }, []);

  const addInsight = useCallback((insight) => {
    dispatch({ type: 'ADD_INSIGHT', payload: insight });
  }, []);

  const addChatMessage = useCallback((message) => {
    dispatch({ type: 'ADD_CHAT_MESSAGE', payload: message });
  }, []);

  const updateLastChat = useCallback((update) => {
    dispatch({ type: 'UPDATE_LAST_CHAT', payload: update });
  }, []);

  const setLoading = useCallback((loading) => {
    dispatch({ type: 'SET_LOADING', payload: loading });
  }, []);

  return (
    <AppContext.Provider value={{
      ...state,
      addEntry,
      setOnboarded,
      addInsight,
      addChatMessage,
      updateLastChat,
      setLoading,
    }}>
      {children}
    </AppContext.Provider>
  );
}

export function useApp() {
  const context = useContext(AppContext);
  if (!context) throw new Error('useApp must be used within AppProvider');
  return context;
}
