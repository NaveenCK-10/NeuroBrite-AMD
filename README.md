# 🧠 NeuroBite

### *"Your food has a story. We read it."*

> **Food Psychology Intelligence Engine** — powered by Gemini AI

[![Built with React](https://img.shields.io/badge/React-18-61DAFB?logo=react)](https://react.dev)
[![Styled with Tailwind](https://img.shields.io/badge/Tailwind-3.4-38B2AC?logo=tailwindcss)](https://tailwindcss.com)
[![AI by Gemini](https://img.shields.io/badge/Gemini-AI-4285F4?logo=google)](https://ai.google.dev)

---

## 🚀 What Makes NeuroBite Different

Every food app asks **WHAT** you ate. NeuroBite asks **WHY**.

NeuroBite is NOT a calorie counter. It's a **behavioral intelligence system** that:

- 🧠 **Detects emotional eating patterns** you've never noticed
- 🔮 **Predicts cravings before they happen** with confidence scores
- ⚡ **Delivers behavioral nudges** at the right moment
- 🗣️ **Chats like a food psychologist** — warm, insightful, never judgmental
- 📊 **Visualizes mood-food neural connections** in real-time

---

## 🎯 The Problem

Most people know WHAT to eat. The problem is they eat differently when stressed, bored, tired, or anxious — and they don't know WHY.

**62% of eating decisions are driven by emotions, not hunger.**

NeuroBite makes the invisible visible.

---

## ⚙️ Tech Stack

| Layer | Technology |
|-------|-----------|
| Frontend | React 18 + Vite |
| Styling | Tailwind CSS 3 + Custom Glassmorphism |
| Animation | Framer Motion |
| AI Engine | Google Gemini 2.0 Flash |
| Backend | Express.js (optional) |
| Icons | Lucide React |

---

## 🏗️ Quick Start

```bash
# Clone & install
cd neurobite
npm install

# (Optional) Add your Gemini API key
cp .env.example .env
# Edit .env with your key from https://aistudio.google.com/app/apikey

# Start development server
npm run dev

# (Optional) Start backend API
npm run server

# Start both frontend + backend
npm run dev:all
```

> **Note:** NeuroBite works WITHOUT an API key using intelligent mock AI responses crafted with real food psychology research. Add a Gemini key for live AI.

---

## 📱 Features

### 1. Behavioral Intelligence Dashboard
- Live AI analysis of your eating patterns
- Craving prediction with confidence percentage
- Interactive Food-Mood Neural Map
- Animated stat counters and mood distribution

### 2. Smart Food-Mood Logger
- Interactive mood wheel with 8 emotional states
- Natural language food description
- Context tagging (alone/social, home/work, planned/impulsive)
- Instant AI behavioral feedback on every entry

### 3. Pattern Discovery (Insights)
- AI-generated weekly behavioral report
- Pattern severity cards
- Stressed vs. Happy food comparison
- Full neural correlation map

### 4. AI Food Psychologist (Chat)
- Conversational food psychology AI
- Streaming typewriter responses
- "Thinking" state animations
- Suggested questions for quick engagement

---

## 🎨 Design Philosophy

- **Dark futuristic theme** — professional, not clinical
- **Glassmorphism** — frosted glass cards with blur effects
- **Neural particle background** — animated canvas with cyan/purple nodes
- **Micro-animations** — every element animates smoothly on entry
- **Gradient accents** — cyan → purple signature gradient
- **Premium typography** — Inter + Outfit from Google Fonts

---

## 🧠 AI Architecture

NeuroBite uses a layered AI approach:

1. **System Prompt** — Trained as a food psychologist, never judgmental
2. **Pattern Analysis** — Detects stress-sugar, boredom-snacking, time-based patterns
3. **Craving Prediction** — Uses temporal + emotional patterns to forecast
4. **Behavioral Nudges** — Context-aware interventions
5. **Conversational AI** — Full chat with history and data awareness

### AI Principles
- Ask reflective questions instead of giving direct answers
- Identify emotional triggers behind food choices
- Never shame or restrict — redirect and reframe
- Reference the user's actual data patterns

---

## 📊 Demo Flow (5 Minutes)

| Time | Action | Impact |
|------|--------|--------|
| 0:00 | Landing page loads | Particle animation + tagline wow |
| 0:30 | Quick onboarding quiz | Personalization + engagement |
| 1:00 | Dashboard reveals pre-seeded data | AI analysis types live |
| 2:00 | Craving prediction appears | "It knew!" moment |
| 2:30 | Log a new entry with mood | Interactive mood wheel |
| 3:00 | AI gives instant behavioral insight | "This is smart" moment |
| 3:30 | Open Neural Map | Visual wow factor |
| 4:00 | Chat with AI psychologist | "Why do I eat when bored?" |
| 4:30 | Show Insights page | Weekly behavioral report |
| 5:00 | Close with pitch | Lasting impression |

---

## 🏆 Pitch

> "Every food app asks WHAT you ate. NeuroBite asks WHY.
>
> We built a Food Psychology Intelligence Engine that uses Gemini AI to detect emotional eating patterns, predict cravings before they happen, and deliver behavioral nudges that actually change habits.
>
> This isn't a calorie counter with a pretty UI. This is a food psychologist in your pocket — and it gets smarter every meal."

---

## 📁 Project Structure

```
neurobite/
├── public/
├── server/
│   └── index.js            # Express API (optional)
├── src/
│   ├── components/
│   │   ├── GlassCard.jsx        # Glassmorphic container
│   │   ├── MoodWheel.jsx        # Interactive emotion selector
│   │   ├── Navbar.jsx           # Navigation bar
│   │   ├── NeuralMap.jsx        # Food-mood correlation viz
│   │   ├── ParticleBackground.jsx   # Canvas particle animation
│   │   └── StreamingText.jsx    # Typewriter AI effect
│   ├── data/
│   │   └── seedData.js          # 7-day demo data
│   ├── lib/
│   │   ├── ai.js                # Gemini + mock AI engine
│   │   └── store.jsx            # Global state (Context)
│   ├── pages/
│   │   ├── AIChat.jsx           # AI psychologist chat
│   │   ├── Dashboard.jsx        # Main intelligence hub
│   │   ├── Insights.jsx         # Pattern analysis
│   │   ├── Landing.jsx          # Hero + onboarding
│   │   └── LogEntry.jsx         # Food-mood logger
│   ├── App.jsx
│   ├── index.css                # Design system
│   └── main.jsx
├── package.json
├── tailwind.config.js
└── vite.config.js
```

---

## 📄 License

MIT — Built for AMD x AU Hackathon 2026
"# NeuroBrite-AMD" 
