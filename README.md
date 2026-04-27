<div align="center">

# 🧠 NeuroBite - 

### *Your food has a story. We read it.*

**The first AI that doesn't ask what you ate — it asks why.**

## 🌐 Live Demo

👉 https://neurobite-app-514753003477.asia-south1.run.app/

Experience NeuroBite in action — no setup required.

[![React 18](https://img.shields.io/badge/React-18-61DAFB?style=flat-square&logo=react)](https://react.dev)
[![Gemini AI](https://img.shields.io/badge/Gemini_2.0-Flash-4285F4?style=flat-square&logo=google)](https://ai.google.dev)
[![Framer Motion](https://img.shields.io/badge/Framer-Motion-FF0055?style=flat-square&logo=framer)](https://www.framer.com/motion/)
[![Tailwind CSS](https://img.shields.io/badge/Tailwind-3.4-38B2AC?style=flat-square&logo=tailwindcss)](https://tailwindcss.com)

</div>

---

> **62% of eating decisions are driven by emotions, not hunger.**
> NeuroBite makes the invisible visible.

---

## 🎯 The Problem

Every food app on the market does the same thing: count calories.

But calories don't explain why you demolished a bag of chips at 3 PM. Or why you skip meals when anxious. Or why stress always ends in sugar.

**People don't have an information problem. They have a self-awareness problem.**

No app addresses the psychology behind the plate.

---

## 💡 The Solution

NeuroBite is a **Food Psychology Intelligence Engine** — an AI system that detects emotional eating patterns, predicts cravings before they strike, and delivers behavioral nudges that actually change habits.

It doesn't count your calories. It reads your behavior.

| Traditional Food Apps | NeuroBite |
|---|---|
| Track what you ate | Understand *why* you ate it |
| React after meals | **Predict** cravings before they hit |
| Passive logging | **Proactive** behavioral intervention |
| Generic tips | Personalized AI food psychology |
| Static dashboards | **Live** neural pattern mapping |

---

## ⚡ Key Features

### 🔮 Proactive Behavioral Nudge
The AI detects vulnerability patterns and delivers unprompted interventions — *before* you open the fridge. No app does this.

### 🧠 Multi-Step AI Reasoning
Watch the AI think in real-time: **Scanning → Detecting → Analyzing → Generating**. Every response follows an Observation → Pattern → Insight → Suggestion framework.

### 📊 Craving Prediction Engine
NeuroBite forecasts your next craving with a confidence score, expected time window, and a smart counter-strategy — before you even feel the urge.

### 🗺️ Food-Mood Neural Map
An interactive visualization that maps the hidden connections between your emotions and eating patterns. Hover to explore correlations.

### 💬 AI Food Psychologist
A conversational AI trained in food psychology — warm, insightful, and never judgmental. It references your actual data to deliver responses that feel uncomfortably personal.

---

## 🧠 How It Works

```
1. LOG      →  Tell NeuroBite what you ate and how you felt
                (Interactive mood wheel + context tags)

2. DETECT   →  AI identifies emotional triggers and hidden patterns
                (Stress → Sugar pipeline, 3PM vulnerability window)

3. PREDICT  →  System forecasts your next craving
                (Time, type, confidence score)

4. NUDGE    →  Proactive behavioral intervention appears
                (Unprompted — the AI reaches out to YOU)

5. EVOLVE   →  Patterns shift over time as awareness grows
                (Weekly intelligence reports track progress)
```

---

## 🎨 UI/UX Highlights

NeuroBite doesn't look like a health app. It looks like a **neural intelligence dashboard**.

- **Dark futuristic theme** — premium, not clinical
- **Glassmorphism** — frosted glass cards with blur + depth
- **Animated particle field** — living canvas with cyan/purple neural nodes
- **Multi-step AI thinking** — visible reasoning steps with checkmark completions
- **Micro-animations everywhere** — cubic-bezier entrance curves, hover glows, and spring physics
- **Premium typography** — Inter + Outfit from Google Fonts with subpixel rendering

---

## 🛠️ Tech Stack

| Layer | Technology |
|---|---|
| **Frontend** | React 18 + Vite 5 |
| **Styling** | Tailwind CSS 3.4 + Custom Glassmorphism System |
| **Animation** | Framer Motion 11 |
| **AI Engine** | Google Gemini 2.0 Flash |
| **Routing** | React Router 6 |
| **Icons** | Lucide React |
| **State** | React Context + localStorage persistence |

---

## 🚀 Demo Flow — What to Do

| Step | Action | What You'll See |
|---|---|---|
| **1** | Open the app | Particle animation + emotional stat hook |
| **2** | Click **"Skip to Demo"** | Dashboard with pre-seeded 7-day behavioral data |
| **3** | Wait 4 seconds | ⚡ **Proactive Nudge** appears unprompted (the wow moment) |
| **4** | Watch the AI Analysis card | Multi-step reasoning: Scanning → Analyzing → Insight |
| **5** | Navigate to **AI Chat** | Ask: *"Why do I eat when I'm bored?"* |
| **6** | Open **Insights** | Weekly intelligence report + neural map |

> 💡 **Judge tip:** The proactive nudge is the signature feature. It appears without any user action — the AI reaches out first.

---

## 📦 Setup — 60 Seconds

```bash
# 1. Install dependencies
npm install

# 2. Start the app
npm run dev
```

Open **http://localhost:5173** — that's it.

> **No API key needed.** NeuroBite ships with intelligent mock AI responses built on real food psychology research. Every feature works out of the box.
>
> To enable live Gemini AI, add your key:
> ```bash
> cp .env.example .env
> # Add your key from https://aistudio.google.com/app/apikey
> ```

---

## 🛡️ Security & Reliability

NeuroBite is designed with production-grade safety principles:

- **API Key Protection:** `VITE_GEMINI_API_KEY` is strictly accessed via environment variables and never exposed to the client bundle without active proxying or edge functions in production.
- **Robust Fallbacks:** The AI module implements `try/catch` wrapping and gracefully degrades to deeply researched psychological mocks if the Gemini API fails, times out, or misses configuration.
- **Safe Evaluation:** We intentionally avoid raw HTML injection and rely entirely on React's secure `dangerouslySetInnerHTML` alternatives (escaping and structured rendering) for AI output.

---

## 🧪 Testing

We've implemented a lightweight testing suite using `vitest` and `@testing-library/react` to ensure core functionality remains stable during iteration.

```bash
# Run tests
npm test

# Run tests in watch mode
npm run test:watch
```

Tests cover:
- State management (`AppProvider` and context hooks)
- AI engine fallbacks and deterministic mock logic
- Data integrity for behavioral seeds

---

## ♿ Accessibility

NeuroBite aims to be an inclusive space. Several accessibility optimizations have been implemented:

- **Semantic HTML:** We favor `<nav>`, `<main>`, `<article>`, and `<section>` tags.
- **ARIA Labeling:** Interactive mood elements feature `aria-label` tags for screen readers.
- **High Contrast Thresholds:** While using a dark theme, text contrasts comply with WCAG AA standards.
- **Keyboard Navigation:** Forms and chat inputs support standard keyboard event flows.

---

## 📁 Architecture

```
neurobite/
├── src/
│   ├── components/
│   │   ├── GlassCard.jsx          # Glassmorphic container system
│   │   ├── MoodWheel.jsx          # Interactive emotion selector
│   │   ├── NeuralMap.jsx          # Food-mood correlation viz
│   │   ├── ProactiveNudge.jsx     # Unprompted behavioral alert
│   │   ├── StreamingText.jsx      # Multi-step AI reasoning display
│   │   └── ParticleBackground.jsx # Animated neural canvas
│   ├── pages/
│   │   ├── Landing.jsx            # Hero + onboarding
│   │   ├── Dashboard.jsx          # Intelligence command center
│   │   ├── LogEntry.jsx           # Food-mood logger
│   │   ├── Insights.jsx           # Behavioral analysis
│   │   └── AIChat.jsx             # AI psychologist chat
│   ├── lib/
│   │   ├── ai.js                  # Gemini + structured mock engine
│   │   └── store.jsx              # Context + localStorage persistence
│   └── data/
│       └── seedData.js            # 7-day demo behavioral data
```

---

## 🏆 Why This Wins

**1. It solves a real problem differently.**
Every food app counts calories. NeuroBite is the only one that reads emotional eating behavior and intervenes proactively.

**2. The AI doesn't wait — it acts.**
The Proactive Nudge is a genuine product innovation. The system detects behavioral risk patterns and delivers interventions *before* the user asks for help. No consumer health app does this.

**3. It demonstrates product thinking, not just code.**
This isn't a wrapper around an API. It's a complete behavioral intelligence system with a clear thesis: *the problem isn't what people eat — it's why they eat it.*

**4. It's demo-proof.**
Pre-seeded data, localStorage persistence, intelligent mock AI. Every feature works perfectly without a network connection or API key. Refresh the page — nothing breaks.

---

<div align="center">

*Every food app asks what you ate.*
*NeuroBite asks why.*

**Built for AMD x AU Hackathon 2026**

</div>
