import express from 'express';
import cors from 'cors';
import dotenv from 'dotenv';
import { GoogleGenerativeAI } from '@google/generative-ai';

dotenv.config();

const app = express();
app.use(cors());
app.use(express.json());

const PORT = process.env.PORT || 3001;
const API_KEY = process.env.GEMINI_API_KEY;

let model = null;
if (API_KEY && API_KEY !== 'your_gemini_api_key_here') {
  const genAI = new GoogleGenerativeAI(API_KEY);
  model = genAI.getGenerativeModel({ model: 'gemini-2.0-flash' });
  console.log('✅ Gemini AI initialized');
} else {
  console.log('⚠️  No Gemini API key found. Using mock responses.');
}

const SYSTEM_PROMPT = `You are NeuroBite AI — a warm, insightful food psychologist.
Focus on WHY people eat, not just WHAT. Use food psychology concepts.
Be warm, never judgmental. Keep responses concise (2-4 paragraphs).`;

async function generateAI(prompt) {
  if (!model) return null;
  try {
    const result = await model.generateContent(`${SYSTEM_PROMPT}\n\n${prompt}`);
    return result.response.text();
  } catch (e) {
    console.error('Gemini error:', e.message);
    return null;
  }
}

// ---- Routes ----

app.post('/api/analyze', async (req, res) => {
  const { entries } = req.body;
  const prompt = `Analyze these food-mood entries and identify behavioral patterns:\n${JSON.stringify(entries?.slice(0, 10))}`;
  const result = await generateAI(prompt);
  res.json({ analysis: result || 'Mock analysis: Strong stress-sugar correlation detected in your recent entries.' });
});

app.post('/api/predict', async (req, res) => {
  const { entries } = req.body;
  const prompt = `Predict the next craving based on these patterns:\n${JSON.stringify(entries?.slice(0, 10))}`;
  const result = await generateAI(prompt);
  res.json({
    prediction: result || 'Based on patterns, you may crave something sweet around 3 PM today.',
    confidence: 78,
    time: '3:00 PM today',
  });
});

app.post('/api/nudge', async (req, res) => {
  const { mood, time } = req.body;
  const prompt = `User feels "${mood}" at ${time}. Give a brief behavioral nudge.`;
  const result = await generateAI(prompt);
  res.json({ nudge: result || 'Take 3 deep breaths before reaching for food. Ask: am I hungry, or am I seeking comfort?' });
});

app.post('/api/chat', async (req, res) => {
  const { message, history, entries } = req.body;
  const prompt = `Chat history:\n${history?.map(m => `${m.role}: ${m.content}`).join('\n')}\n\nUser entries:\n${JSON.stringify(entries?.slice(0, 8))}\n\nUser: ${message}`;
  const result = await generateAI(prompt);
  res.json({ response: result || 'That\'s a great question about your eating patterns. Your data shows...' });
});

app.get('/api/insights', async (req, res) => {
  const result = await generateAI('Generate a weekly behavioral intelligence report.');
  res.json({ report: result || 'Weekly summary: Strong stress-eating pattern detected this week.' });
});

app.get('/api/health', (req, res) => {
  res.json({ status: 'ok', ai: !!model });
});

app.listen(PORT, () => {
  console.log(`\n🧠 NeuroBite API Server running on port ${PORT}`);
  console.log(`   AI Status: ${model ? '🟢 Gemini Connected' : '🟡 Mock Mode'}\n`);
});
