// ============================================
// NeuroBite Seed Data — 7 Days of Food-Mood Logs
// Patterns embedded: stress→sugar, bored→salty, happy→healthy
// ============================================

const today = new Date();
const day = (daysAgo) => {
  const d = new Date(today);
  d.setDate(d.getDate() - daysAgo);
  return d.toISOString();
};

export const MOODS = [
  { id: 'stressed', emoji: '😰', label: 'Stressed', color: '#ef4444' },
  { id: 'happy', emoji: '😊', label: 'Happy', color: '#22c55e' },
  { id: 'sad', emoji: '😢', label: 'Sad', color: '#3b82f6' },
  { id: 'bored', emoji: '😐', label: 'Bored', color: '#a855f7' },
  { id: 'anxious', emoji: '😟', label: 'Anxious', color: '#f97316' },
  { id: 'tired', emoji: '😴', label: 'Tired', color: '#6366f1' },
  { id: 'excited', emoji: '🤩', label: 'Excited', color: '#eab308' },
  { id: 'calm', emoji: '😌', label: 'Calm', color: '#06b6d4' },
];

export const CONTEXTS = [
  { id: 'alone', label: 'Alone', icon: '🧍' },
  { id: 'social', label: 'Social', icon: '👥' },
  { id: 'home', label: 'At Home', icon: '🏠' },
  { id: 'work', label: 'At Work', icon: '💼' },
  { id: 'planned', label: 'Planned', icon: '📋' },
  { id: 'impulsive', label: 'Impulsive', icon: '⚡' },
];

export const SEED_ENTRIES = [
  // Day 7 — Monday (Stressed day at work)
  {
    id: '1',
    food: 'Double chocolate muffin + large latte',
    mood: 'stressed',
    context: ['work', 'impulsive'],
    time: day(7),
    timeLabel: '9:30 AM',
    note: 'Had a terrible morning meeting',
    calories: 520,
  },
  {
    id: '2',
    food: 'Skipped lunch, grabbed vending machine chips',
    mood: 'anxious',
    context: ['work', 'alone', 'impulsive'],
    time: day(7),
    timeLabel: '2:15 PM',
    note: 'Deadline pressure, couldn\'t leave desk',
    calories: 340,
  },
  {
    id: '3',
    food: 'Large pepperoni pizza + ice cream',
    mood: 'tired',
    context: ['home', 'alone', 'impulsive'],
    time: day(7),
    timeLabel: '9:00 PM',
    note: 'Too exhausted to cook',
    calories: 1100,
  },

  // Day 6 — Happy social day
  {
    id: '4',
    food: 'Avocado toast with poached eggs',
    mood: 'happy',
    context: ['home', 'planned'],
    time: day(6),
    timeLabel: '8:00 AM',
    note: 'Feeling great after good sleep',
    calories: 380,
  },
  {
    id: '5',
    food: 'Grilled chicken salad with quinoa',
    mood: 'happy',
    context: ['social', 'work', 'planned'],
    time: day(6),
    timeLabel: '12:30 PM',
    note: 'Lunch with friends',
    calories: 450,
  },

  // Day 5 — Bored weekend
  {
    id: '6',
    food: 'Bowl of chips while watching Netflix',
    mood: 'bored',
    context: ['home', 'alone', 'impulsive'],
    time: day(5),
    timeLabel: '3:00 PM',
    note: 'Nothing to do',
    calories: 480,
  },
  {
    id: '7',
    food: 'Ordered pad thai and spring rolls',
    mood: 'bored',
    context: ['home', 'alone', 'impulsive'],
    time: day(5),
    timeLabel: '7:30 PM',
    note: 'Scrolling food delivery apps out of boredom',
    calories: 780,
  },

  // Day 4 — Mixed day
  {
    id: '8',
    food: 'Greek yogurt with granola and berries',
    mood: 'calm',
    context: ['home', 'planned'],
    time: day(4),
    timeLabel: '7:45 AM',
    note: 'Morning meditation helped',
    calories: 320,
  },
  {
    id: '9',
    food: 'Candy bar from the office kitchen',
    mood: 'stressed',
    context: ['work', 'impulsive'],
    time: day(4),
    timeLabel: '3:30 PM',
    note: 'Stressful client call',
    calories: 250,
  },

  // Day 3 — Anxious day
  {
    id: '10',
    food: 'Just coffee, couldn\'t eat breakfast',
    mood: 'anxious',
    context: ['home', 'alone'],
    time: day(3),
    timeLabel: '7:00 AM',
    note: 'Interview later today',
    calories: 5,
  },
  {
    id: '11',
    food: 'Comfort mac and cheese',
    mood: 'stressed',
    context: ['home', 'alone', 'impulsive'],
    time: day(3),
    timeLabel: '6:00 PM',
    note: 'Interview went badly, needed comfort food',
    calories: 680,
  },

  // Day 2 — Good day
  {
    id: '12',
    food: 'Smoothie bowl with banana and chia',
    mood: 'excited',
    context: ['home', 'planned'],
    time: day(2),
    timeLabel: '8:30 AM',
    note: 'Got good news!',
    calories: 350,
  },
  {
    id: '13',
    food: 'Sushi platter with miso soup',
    mood: 'happy',
    context: ['social', 'planned'],
    time: day(2),
    timeLabel: '7:00 PM',
    note: 'Celebrating with friends',
    calories: 520,
  },

  // Day 1 — Yesterday (stressed again)
  {
    id: '14',
    food: 'Three cookies from the break room',
    mood: 'stressed',
    context: ['work', 'impulsive'],
    time: day(1),
    timeLabel: '10:30 AM',
    note: 'Back-to-back meetings all morning',
    calories: 360,
  },
  {
    id: '15',
    food: 'Burger and fries',
    mood: 'tired',
    context: ['alone', 'impulsive'],
    time: day(1),
    timeLabel: '1:00 PM',
    note: 'Quick drive-through, no energy to think',
    calories: 850,
  },
  {
    id: '16',
    food: 'Dark chocolate bar + herbal tea',
    mood: 'calm',
    context: ['home', 'alone', 'planned'],
    time: day(1),
    timeLabel: '9:00 PM',
    note: 'Winding down, chose mindfully',
    calories: 180,
  },
];

// Pre-computed pattern analysis for the dashboard
export const COMPUTED_PATTERNS = {
  dominantPattern: 'Stress-triggered sugar seeking',
  stressedFoods: ['chocolate', 'cookies', 'candy', 'ice cream', 'muffin'],
  boredFoods: ['chips', 'takeout', 'delivery'],
  happyFoods: ['salad', 'sushi', 'avocado toast', 'grilled chicken'],
  impulsivePercentage: 62,
  plannedPercentage: 38,
  topTrigger: 'Work stress (meetings & deadlines)',
  avgCalmCalories: 350,
  avgStressedCalories: 630,
  weeklyMoodBreakdown: {
    stressed: 4,
    happy: 3,
    bored: 2,
    tired: 2,
    anxious: 2,
    calm: 2,
    excited: 1,
    sad: 0,
  },
  streakDays: 2,
  totalEntries: 16,
};

// Neural map connections (mood-food correlations)
export const NEURAL_CONNECTIONS = [
  { from: 'stressed', to: 'Sugar & Chocolate', strength: 0.9 },
  { from: 'stressed', to: 'Fast Food', strength: 0.6 },
  { from: 'bored', to: 'Salty Snacks', strength: 0.85 },
  { from: 'bored', to: 'Delivery Food', strength: 0.7 },
  { from: 'happy', to: 'Fresh & Healthy', strength: 0.8 },
  { from: 'happy', to: 'Social Meals', strength: 0.75 },
  { from: 'tired', to: 'Fast Food', strength: 0.7 },
  { from: 'tired', to: 'Sugar & Chocolate', strength: 0.5 },
  { from: 'anxious', to: 'Skipped Meals', strength: 0.6 },
  { from: 'anxious', to: 'Fast Food', strength: 0.4 },
  { from: 'calm', to: 'Fresh & Healthy', strength: 0.85 },
  { from: 'calm', to: 'Mindful Choices', strength: 0.9 },
  { from: 'excited', to: 'Fresh & Healthy', strength: 0.7 },
  { from: 'excited', to: 'Social Meals', strength: 0.6 },
];
