// ============================================
// NeuroBite AI Engine
// Uses Gemini API when key available, falls back to
// psychologically-crafted mock responses for demo
// ============================================

import { GoogleGenerativeAI } from '@google/generative-ai';

const API_KEY = import.meta.env.VITE_GEMINI_API_KEY;

let genAI = null;
let model = null;

if (API_KEY && API_KEY !== 'your_gemini_api_key_here') {
  try {
    genAI = new GoogleGenerativeAI(API_KEY);
    model = genAI.getGenerativeModel({ model: 'gemini-2.0-flash' });
  } catch (e) {
    console.warn('Gemini init failed, using mock AI:', e.message);
  }
}

const SYSTEM_PROMPT = `You are NeuroBite AI — a warm, insightful food psychologist and behavioral scientist.
Your role is to help users understand the EMOTIONAL and BEHAVIORAL patterns behind their eating habits.

Core principles:
- Never judge or shame food choices
- Focus on WHY people eat, not just WHAT
- Use food psychology concepts (cortisol-driven eating, dopamine seeking, comfort food cycles)
- Be warm but scientifically grounded
- Ask reflective questions that create self-awareness
- Identify patterns the user hasn't noticed
- Suggest behavioral nudges, not restrictive diets
- Keep responses concise (2-4 paragraphs max)
- Use occasional emojis naturally, not excessively

You understand concepts like:
- Stress-cortisol-sugar connection
- Boredom-dopamine-snacking cycle
- Emotional vs physical hunger signals
- Context-dependent eating (social, alone, work)
- Impulsive vs planned eating differences
- Time-of-day eating patterns`;

// ---- Real Gemini Calls ----

async function callGemini(userPrompt) {
  if (!model) return null;
  try {
    const result = await model.generateContent(`${SYSTEM_PROMPT}\n\nUser data and request:\n${userPrompt}`);
    return result.response.text();
  } catch (e) {
    console.warn('Gemini call failed:', e.message);
    return null;
  }
}

// ---- Mock AI Responses (psychologically crafted) ----

const MOCK_DELAYS = { min: 1500, max: 3000 };

function randomDelay() {
  return Math.floor(Math.random() * (MOCK_DELAYS.max - MOCK_DELAYS.min) + MOCK_DELAYS.min);
}

const ANALYSIS_RESPONSES = [
  `**📡 Observation:** On 4 of the last 7 days, when you reported feeling stressed or anxious, you gravitated toward high-sugar foods — chocolate muffins, cookies, candy bars, and ice cream.

**🔍 Pattern:** I'm detecting a strong **stress-to-sugar pipeline**. This is classic **cortisol-driven comfort eating**. When your stress hormone spikes, your brain demands quick energy and dopamine — and sugar delivers both instantly. The pattern is neurological, not a lack of willpower.

**🧠 Insight:** On the 2 days you reported feeling calm, your food choices were dramatically different — greek yogurt, herbal tea, mindful portions. **Your calm self already knows what to eat.** The challenge isn't knowledge — it's creating more moments of calm before meals.

**💡 Suggestion:** Before eating anything, take 3 deep breaths. Just 3. This activates your parasympathetic nervous system and gives your \"calm self\" a chance to make the choice.`,

  `**📡 Observation:** When you eat with others, your choices are notably healthier — sushi, salads, grilled chicken. But when you're alone, impulsive eating takes over by a factor of **3x**.

**🔍 Pattern:** Your data reveals a **context-dependent eating pattern**. This suggests eating isn't driven by hunger — it's driven by **emotional regulation**. When you're social, your emotional needs are being met through connection. When alone, food becomes the regulator.

**🧠 Insight:** The numbers confirm this:
- **Planned meals** average ~380 calories with higher nutritional quality
- **Impulsive meals** average ~630 calories, mostly processed foods

**💡 Suggestion:** This isn't about discipline — it's about having **other sources of comfort** when you're alone. Identify one non-food activity that makes you feel good by yourself. Make it your first response before reaching for food.`,

  `**📡 Observation:** I see a clear **temporal vulnerability window** between 2:00 PM and 4:00 PM. Three of your least healthy choices happened in this window — all associated with work stress and fatigue.

**🔍 Pattern:** This is the **afternoon cortisol dip**. Your body's stress hormone naturally drops in mid-afternoon, creating a perfect storm of low energy + accumulated stress + easy access to office snacks.

**🧠 Insight:** Your data shows that **planned meals are 40% healthier** than impulsive ones. The decision, not the craving, is the problem.

**💡 Suggestion:** Try a \"3 PM Reset\" routine:
1. Step away from your desk for 2 minutes
2. Drink a full glass of water
3. Eat a **pre-decided** small snack (nuts, fruit, dark chocolate)

When you pre-decide your 3 PM snack, you remove the decision point where impulsiveness wins.`,
];

const PREDICTION_RESPONSES = [
  {
    craving: 'Something sweet — likely chocolate or pastries',
    time: '3:00 PM today',
    confidence: 78,
    reason: 'Based on your 7-day pattern, you have a strong cortisol-driven sugar craving in the mid-afternoon, especially following meeting-heavy mornings. This has occurred on 4 of the last 5 workdays.',
    nudge: 'Keep dark chocolate (70%+ cacao) at your desk. It satisfies the same neurological craving with ⅓ the sugar and added antioxidants.',
  },
  {
    craving: 'Delivery food or takeout',
    time: 'Around 7:30 PM tonight',
    confidence: 65,
    reason: 'Your pattern shows a tendency to order delivery when you arrive home tired and alone. The combination of fatigue + decision fatigue makes "just ordering something" the path of least resistance.',
    nudge: 'Prep a 5-minute backup meal on Sunday — even just pasta + sauce + frozen veggies. Having ONE easy option at home breaks the delivery cycle.',
  },
  {
    craving: 'Salty snacks — chips or crackers',
    time: 'Afternoon, around 2-4 PM',
    confidence: 71,
    reason: 'I notice your boredom-snacking pattern peaks on low-activity days. Salty, crunchy foods provide the sensory stimulation your brain is seeking.',
    nudge: 'The craving is really for stimulation, not calories. Try chewing gum, a crunchy apple, or stepping outside for 2 minutes. If you still want chips after that, eat them mindfully — from a bowl, not the bag.',
  },
];

const NUDGE_RESPONSES = [
  `Hey — it's mid-afternoon and you've had a busy day. Before you reach for that snack, take a breath and ask yourself: **Am I actually hungry, or am I just seeking a break?** 🤔

If it's a break you need, step away for 2 minutes first. You can always eat after.`,

  `I noticed you're feeling stressed right now. Your pattern shows that stress eating gives about 15 minutes of relief followed by regret. Instead, try the **5-4-3-2-1 grounding technique**: name 5 things you see, 4 you hear, 3 you feel, 2 you smell, 1 you taste. Then decide about food. 🧘`,

  `Quick check-in: your body might be asking for **water, not food** right now. Dehydration mimics hunger signals in about 37% of cases. Try drinking a full glass of water and waiting 10 minutes. ✨`,

  `You're in a great mood right now! 😊 This is actually the best time to make food decisions — research shows positive emotions lead to 40% healthier choices. What sounds genuinely good to eat right now?`,
];

const CHAT_RESPONSES = {
  'why do i eat when bored': `Great question — and the fact that you're asking it means you're already building **self-awareness**, which is the first step to change.

When you're bored, your brain is in a state of **low dopamine**. It's craving stimulation, novelty, anything to break the monotony. Food — especially crunchy, salty, or sweet food — provides an instant dopamine hit. It's not hunger; it's your brain's search engine looking for entertainment.

Think about it: you never boredom-eat broccoli, right? You reach for chips, snacks, scrolling Uber Eats. These all trigger the same **novelty-reward pathway**.

🔑 The fix isn't willpower — it's **replacement stimulation**. What's one activity that genuinely engages your brain? Gaming, calling a friend, a quick walk, even a puzzle. The goal is to give your brain the dopamine it wants from a different source.`,

  'why do i crave sugar when stressed': `This one has a really elegant neuroscience explanation. 🧪

When you're stressed, your body releases **cortisol** — the stress hormone. Cortisol literally signals your brain to seek high-calorie, high-sugar foods. This isn't a metaphor — it's a measurable biochemical process.

Here's why: your body evolved for physical stress (running from predators), where sugar = instant survival energy. But modern stress is psychological (emails, deadlines), so the sugar you consume doesn't get burned — it just spikes insulin and creates a crash, which makes you crave MORE sugar.

It's a **cycle**: Stress → Cortisol → Sugar craving → Sugar crash → More stress → More cortisol

💡 The interruption point is **between the craving and the action**. That 30-second window is where change happens. Deep breathing for just 60 seconds measurably reduces cortisol. It won't eliminate the craving, but it reduces its intensity by about 40%.`,

  'how can i eat healthier': `I'd actually reframe that question — instead of "how can I eat healthier," ask: **"How can I create conditions where healthy choices feel easy?"**

Your data tells an interesting story: when you're calm, rested, and have planned ahead, you naturally gravitate toward nutritious food. Avocado toast, smoothie bowls, grilled chicken salads. You don't need to learn WHAT to eat — you already know. 

The gap isn't knowledge — it's **environment design**. Here are three high-impact changes based on YOUR patterns:

1. **Pre-decide your 3 PM snack** the night before. Your afternoon vulnerability window is your biggest leak.
2. **Have one "emergency meal"** always available at home. This breaks the tired→delivery cycle.
3. **Eat before you're starving.** Your impulsive entries all happen when you've skipped meals or waited too long.

These aren't diet rules — they're **behavioral architecture**. You're designing the conditions where your wise self gets to make the choices. 🏗️`,

  'what are my worst patterns': `Let's look at this with compassion — these aren't "bad" patterns, they're **survival strategies** your brain developed. But understanding them is power. 🔍

Your top 3 patterns ranked by frequency:

1. **Stress → Sugar** (occurred 5x this week) — When cortisol spikes, you reach for quick-energy sweets. This is the most consistent pattern in your data.
2. **Alone + Tired → Delivery** (3x this week) — Decision fatigue + isolation creates a perfect storm for ordering takeout.
3. **Boredom → Snacking** (2x this week) — Low-stimulation periods trigger grazing behavior, usually salty/crunchy foods.

Here's the good news: **all three have the same root cause** — you're using food to manage emotional states. The food isn't the problem; it's the solution your brain found. Once you build alternative solutions for stress, loneliness, and boredom, the eating patterns will shift naturally.

Which pattern do you want to work on first?`,

  'why do i eat differently alone': `This is one of the most revealing patterns in food psychology, and your data shows it clearly. 🪞

When you're **with others**: sushi, salads, mindful portions. When you're **alone**: delivery pizza, late-night snacking, larger portions.

This isn't hypocrisy — it's your brain using different **emotional regulation strategies** depending on context. When you're social, connection itself provides the dopamine and comfort you need. Food is just food. But when you're alone, food becomes your **companion, entertainment, and emotional regulator** all at once.

Think of it this way: alone-eating often isn't about food at all. It's about filling a gap — of stimulation, connection, or comfort.

💡 Try this experiment: next time you're alone and about to eat impulsively, call someone or put on a podcast first. Not to avoid eating, but to test whether the craving changes when you add stimulation.`,

  'how to break stress eating': `The stress-eating cycle has a predictable structure, and that predictability is actually your advantage. Here's how it works:

**The Cycle:** Stress → Cortisol rises → Brain demands sugar → You eat → Brief relief (15 min) → Blood sugar crashes → More stress → Repeat

**The Break Point** is the 30-second window between *wanting* food and *eating* food. That's where change happens.

Here are 3 evidence-based interruption techniques:

1. **The 5-Breath Pause** — Before eating, take 5 slow breaths. This reduces cortisol by ~15% and gives your prefrontal cortex (the "wise brain") time to come online.
2. **Name the feeling** — Say out loud: "I'm not hungry, I'm stressed." Naming emotions activates the prefrontal cortex and reduces amygdala reactivity by up to 30%.
3. **Substitute the first 5 minutes** — Do something physical for just 5 minutes: walk, stretch, cold water on wrists. If you still want the food after, eat it mindfully.

The goal isn't to never stress-eat again. It's to **increase the pause** between trigger and response. Even a 20% reduction changes your trajectory. 📉`,

  default: `That's a really thoughtful question, and I appreciate you being curious about your patterns. 

Looking at your recent entries, I can see that your eating is heavily **context-dependent** — it changes dramatically based on your emotional state, who you're with, and whether you've planned ahead.

The most powerful insight from your data is this: **you already eat well naturally** in the right conditions. When you're calm, social, or have planned ahead, your choices are excellent. The challenge is creating those conditions more often.

What I'd encourage you to explore is: what makes the difference between a "good food day" and a "hard food day" for you? Usually it starts hours before the meal — with sleep, stress, or whether you've eaten enough earlier in the day.

What would you like to dig into more? 🤔`,
};

const WEEKLY_INSIGHT = `## Your Weekly Behavioral Intelligence Report 📊

### The Big Picture
This week revealed a clear **stress-sugar-regret cycle** that accounts for 62% of your impulsive eating. Monday and Thursday were your hardest days — both correlated with heavy meeting schedules.

### Key Pattern: The 3 PM Vulnerability
Your most impulsive food decisions happen between **2-4 PM**. This isn't coincidence — it's the intersection of:
- Afternoon cortisol dip
- Accumulated decision fatigue
- Easy access to office snacks

### What's Going Well ✅
- Your **planned meals** are nutritionally excellent (avg 370 cal, high protein)
- When calm or happy, you naturally choose whole foods
- You showed **2 instances of mindful choosing** this week (dark chocolate + tea instead of binge eating)

### Growth Opportunity 🌱
- **62% of entries were impulsive** — aim for 50% next week
- Your **alone + tired** combination is your biggest trigger
- Consider a **3 PM Reset ritual** to interrupt the afternoon pattern

### Behavioral Shift Score: 6.2 / 10
You're building awareness, which is the foundation of change. The fact that your last entry of the week was a mindful choice (dark chocolate + herbal tea instead of your usual stress pattern) suggests **the beginning of a behavioral shift**.

> "Progress isn't eating perfectly. It's noticing WHY you eat — and sometimes choosing differently."`;

// ---- Public API ----

export async function analyzePatterns(entries) {
  const prompt = `Analyze these recent food-mood entries and identify behavioral patterns, emotional triggers, and provide insightful observations about WHY the user eats what they eat:\n\n${JSON.stringify(entries.slice(0, 10), null, 2)}`;
  
  const real = await callGemini(prompt);
  if (real) return real;

  await new Promise(r => setTimeout(r, randomDelay()));
  return ANALYSIS_RESPONSES[Math.floor(Math.random() * ANALYSIS_RESPONSES.length)];
}

export async function predictCraving(entries) {
  const prompt = `Based on these food-mood entries, predict what this user is most likely to crave next and when. Include confidence level and reasoning:\n\n${JSON.stringify(entries.slice(0, 10), null, 2)}`;
  
  const real = await callGemini(prompt);
  if (real) {
    try {
      return { craving: real, confidence: 75, time: 'Soon', reason: real, nudge: '' };
    } catch {
      return PREDICTION_RESPONSES[0];
    }
  }

  await new Promise(r => setTimeout(r, randomDelay()));
  return PREDICTION_RESPONSES[Math.floor(Math.random() * PREDICTION_RESPONSES.length)];
}

export async function getNudge(mood, time) {
  const prompt = `The user is currently feeling "${mood}" at ${time}. Based on food psychology principles, give a brief, warm behavioral nudge (2-3 sentences) to help them make a mindful food choice.`;
  
  const real = await callGemini(prompt);
  if (real) return real;

  await new Promise(r => setTimeout(r, randomDelay()));
  return NUDGE_RESPONSES[Math.floor(Math.random() * NUDGE_RESPONSES.length)];
}

export async function chatWithAI(message, history, entries) {
  const historyStr = history.map(m => `${m.role}: ${m.content}`).join('\n');
  const prompt = `Chat history:\n${historyStr}\n\nUser's food entries for context:\n${JSON.stringify(entries.slice(0, 8))}\n\nUser: ${message}\n\nRespond as a food psychologist. Be warm, insightful, and reference their data patterns when relevant.`;
  
  const real = await callGemini(prompt);
  if (real) return real;

  await new Promise(r => setTimeout(r, randomDelay()));
  
  const lower = message.toLowerCase();
  if (lower.includes('bored') || lower.includes('boredom')) return CHAT_RESPONSES['why do i eat when bored'];
  if (lower.includes('sugar') || lower.includes('sweet') || lower.includes('crav')) return CHAT_RESPONSES['why do i crave sugar when stressed'];
  if (lower.includes('health') || lower.includes('better') || lower.includes('improve')) return CHAT_RESPONSES['how can i eat healthier'];
  if (lower.includes('worst') || lower.includes('bad') || lower.includes('pattern')) return CHAT_RESPONSES['what are my worst patterns'];
  if (lower.includes('alone') || lower.includes('lonely') || lower.includes('different')) return CHAT_RESPONSES['why do i eat differently alone'];
  if (lower.includes('stress') || lower.includes('break') || lower.includes('cycle')) return CHAT_RESPONSES['how to break stress eating'];
  return CHAT_RESPONSES.default;
}

export async function getWeeklyInsight() {
  const real = await callGemini('Generate a weekly behavioral intelligence report summarizing the user\'s food-mood patterns, key insights, and behavioral recommendations.');
  if (real) return real;

  await new Promise(r => setTimeout(r, randomDelay()));
  return WEEKLY_INSIGHT;
}

export async function analyzeSingleEntry(food, mood, context) {
  const prompt = `The user just logged: eating "${food}" while feeling "${mood}" in context: ${context.join(', ')}. Give a brief (2-3 sentence) real-time psychological insight about this choice.`;
  
  const real = await callGemini(prompt);
  if (real) return real;

  await new Promise(r => setTimeout(r, randomDelay()));
  
  const insights = {
    stressed: `This choice aligns with your stress-eating pattern — your brain is seeking a quick dopamine boost through food. Notice how stress changes what you reach for? The awareness itself is the first step to choosing differently next time.`,
    happy: `Beautiful! When you're in a positive state, your food choices naturally align with what your body actually needs. This is your authentic eating self — no willpower required, just genuine satisfaction.`,
    bored: `Classic boredom-driven eating — your brain is searching for stimulation, and food is the easiest source. The craving isn't for calories; it's for novelty. What else might satisfy that need right now?`,
    anxious: `When anxiety takes over, your appetite system gets disrupted. Some people eat more, some eat less — both are your nervous system trying to regain control. Take a breath. Whatever you choose to eat right now is okay.`,
    tired: `Fatigue lowers your prefrontal cortex activity — the part of your brain responsible for planning and restraint. That's why tired eating tends to be more impulsive. It's biology, not weakness.`,
    calm: `Notice this — when you're calm, you make choices you feel good about. This is your body's wisdom working. The goal isn't to always eat perfectly; it's to create more moments of calm around food.`,
    excited: `Excited energy often leads to generous, celebratory food choices. Enjoy it! Social and joyful eating is an important part of a healthy relationship with food.`,
    sad: `Comfort food exists for a reason — food is one of our earliest sources of emotional soothing. Be gentle with yourself. The question isn't "was this healthy?" but "did this help?" and "what else might help too?"`,
  };
  
  return insights[mood] || insights.stressed;
}

export { SYSTEM_PROMPT };
