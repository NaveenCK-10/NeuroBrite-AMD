import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import { UtensilsCrossed, Send, Sparkles, ArrowLeft, MapPin, Tag } from 'lucide-react';
import GlassCard from '../components/GlassCard';
import MoodWheel from '../components/MoodWheel';
import StreamingText from '../components/StreamingText';
import { useApp } from '../lib/store';
import { analyzeSingleEntry } from '../lib/ai';
import { CONTEXTS } from '../data/seedData';

export default function LogEntry() {
  const [step, setStep] = useState('mood'); // mood | food | context | analyzing | done
  const [selectedMood, setSelectedMood] = useState(null);
  const [food, setFood] = useState('');
  const [selectedContexts, setSelectedContexts] = useState([]);
  const [note, setNote] = useState('');
  const [aiFeedback, setAiFeedback] = useState(null);
  const navigate = useNavigate();
  const { addEntry } = useApp();

  const toggleContext = (id) => {
    setSelectedContexts(prev =>
      prev.includes(id) ? prev.filter(c => c !== id) : [...prev, id]
    );
  };

  const handleSubmit = async () => {
    setStep('analyzing');

    const entry = {
      food,
      mood: selectedMood,
      context: selectedContexts,
      timeLabel: new Date().toLocaleTimeString('en-US', {
        hour: 'numeric',
        minute: '2-digit',
        hour12: true,
      }),
      note,
      calories: Math.floor(Math.random() * 500) + 200,
    };

    addEntry(entry);

    const feedback = await analyzeSingleEntry(food, selectedMood, selectedContexts);
    setAiFeedback(feedback);
    setStep('done');
  };

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      className="page-container pt-24 pb-12 px-4"
    >
      <div className="max-w-2xl mx-auto">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          className="mb-8"
        >
          <button
            onClick={() => navigate(-1)}
            className="flex items-center gap-1 text-white/40 hover:text-white/70 transition-colors mb-4 text-sm"
          >
            <ArrowLeft className="w-4 h-4" /> Back
          </button>
          <h1 className="font-display text-3xl font-bold">
            <span className="gradient-text">Log</span> an Entry
          </h1>
          <p className="text-white/40 mt-1">Tell us what you ate and how you felt</p>
        </motion.div>

        {/* Progress Steps */}
        <div className="flex items-center gap-2 mb-8">
          {['mood', 'food', 'context'].map((s, i) => (
            <div key={s} className="flex items-center gap-2 flex-1">
              <div
                className={`w-8 h-8 rounded-full flex items-center justify-center text-sm font-bold transition-all duration-500 ${
                  ['mood', 'food', 'context', 'analyzing', 'done'].indexOf(step) >= i
                    ? 'bg-gradient-to-r from-neuro-accent to-neuro-purple text-white'
                    : 'bg-white/5 text-white/30'
                }`}
              >
                {i + 1}
              </div>
              {i < 2 && (
                <div className="flex-1 h-px bg-white/10">
                  <motion.div
                    className="h-full bg-neuro-accent"
                    initial={{ width: '0%' }}
                    animate={{
                      width: ['mood', 'food', 'context', 'analyzing', 'done'].indexOf(step) > i ? '100%' : '0%',
                    }}
                    transition={{ duration: 0.5 }}
                  />
                </div>
              )}
            </div>
          ))}
        </div>

        <AnimatePresence mode="wait">
          {/* Step 1: Mood */}
          {step === 'mood' && (
            <motion.div
              key="mood"
              initial={{ opacity: 0, x: 30 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: -30 }}
              className="flex flex-col items-center"
            >
              <GlassCard className="w-full flex flex-col items-center py-8">
                <h2 className="font-display text-xl font-semibold mb-2">
                  How are you feeling right now?
                </h2>
                <p className="text-sm text-white/40 mb-6">
                  Select the emotion that best describes your current state
                </p>
                <MoodWheel
                  selected={selectedMood}
                  onSelect={(mood) => {
                    setSelectedMood(mood);
                    setTimeout(() => setStep('food'), 400);
                  }}
                />
              </GlassCard>
            </motion.div>
          )}

          {/* Step 2: Food */}
          {step === 'food' && (
            <motion.div
              key="food"
              initial={{ opacity: 0, x: 30 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: -30 }}
            >
              <GlassCard className="w-full">
                <div className="flex items-center gap-2 mb-4">
                  <UtensilsCrossed className="w-5 h-5 text-neuro-accent" />
                  <h2 className="font-display text-xl font-semibold">
                    What did you eat?
                  </h2>
                </div>
                <p className="text-sm text-white/40 mb-4">
                  Describe your meal naturally — no need for exact portions
                </p>
                <div className="relative">
                  <textarea
                    value={food}
                    onChange={(e) => setFood(e.target.value)}
                    placeholder="e.g., A big bowl of pasta with garlic bread and a glass of wine"
                    className="w-full bg-white/[0.03] border border-white/[0.08] rounded-xl px-4 py-3 text-white placeholder-white/20 focus:outline-none focus:border-neuro-accent/40 transition-all duration-300 min-h-[100px] resize-none"
                    autoFocus
                  />
                </div>

                {/* Quick suggestions */}
                <div className="flex flex-wrap gap-2 mt-3">
                  {['🍕 Pizza', '🥗 Salad', '🍔 Burger', '🍫 Chocolate', '🍿 Chips', '☕ Just coffee'].map(
                    (item) => (
                      <button
                        key={item}
                        onClick={() => setFood(item.slice(2))}
                        className="px-3 py-1.5 rounded-full bg-white/[0.04] text-xs text-white/50 hover:bg-white/[0.08] hover:text-white/80 transition-all duration-300 border border-transparent hover:border-white/10"
                      >
                        {item}
                      </button>
                    )
                  )}
                </div>

                {/* Note */}
                <div className="mt-4">
                  <label className="text-sm text-white/40 mb-1 block">
                    Add a note (optional)
                  </label>
                  <input
                    value={note}
                    onChange={(e) => setNote(e.target.value)}
                    placeholder="What was happening? How were you feeling?"
                    className="w-full bg-white/[0.03] border border-white/[0.08] rounded-xl px-4 py-2.5 text-sm text-white placeholder-white/20 focus:outline-none focus:border-neuro-accent/40 transition-all duration-300"
                  />
                </div>

                <div className="flex gap-3 mt-6">
                  <button
                    onClick={() => setStep('mood')}
                    className="btn-ghost flex-1"
                  >
                    Back
                  </button>
                  <button
                    onClick={() => food.trim() && setStep('context')}
                    disabled={!food.trim()}
                    className="btn-primary flex-1 flex items-center justify-center gap-2 disabled:opacity-30 disabled:cursor-not-allowed"
                  >
                    Next <ArrowLeft className="w-4 h-4 rotate-180" />
                  </button>
                </div>
              </GlassCard>
            </motion.div>
          )}

          {/* Step 3: Context */}
          {step === 'context' && (
            <motion.div
              key="context"
              initial={{ opacity: 0, x: 30 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: -30 }}
            >
              <GlassCard className="w-full">
                <div className="flex items-center gap-2 mb-4">
                  <Tag className="w-5 h-5 text-neuro-accent" />
                  <h2 className="font-display text-xl font-semibold">
                    Set the context
                  </h2>
                </div>
                <p className="text-sm text-white/40 mb-4">
                  Select all that apply — this helps us understand your patterns
                </p>
                <div className="grid grid-cols-2 sm:grid-cols-3 gap-3">
                  {CONTEXTS.map((ctx) => {
                    const isSelected = selectedContexts.includes(ctx.id);
                    return (
                      <motion.button
                        key={ctx.id}
                        whileTap={{ scale: 0.95 }}
                        onClick={() => toggleContext(ctx.id)}
                        className={`p-4 rounded-xl border text-center transition-all duration-300 ${
                          isSelected
                            ? 'bg-neuro-accent/10 border-neuro-accent/40 text-white shadow-sm shadow-neuro-accent/10'
                            : 'bg-white/[0.02] border-white/[0.06] text-white/50 hover:border-white/15 hover:bg-white/[0.04]'
                        }`}
                      >
                        <span className="text-2xl block mb-1">{ctx.icon}</span>
                        <span className="text-sm font-medium">{ctx.label}</span>
                      </motion.button>
                    );
                  })}
                </div>

                <div className="flex gap-3 mt-6">
                  <button onClick={() => setStep('food')} className="btn-ghost flex-1">
                    Back
                  </button>
                  <button
                    onClick={handleSubmit}
                    className="btn-primary flex-1 flex items-center justify-center gap-2"
                  >
                    <Send className="w-4 h-4" /> Log & Analyze
                  </button>
                </div>
              </GlassCard>
            </motion.div>
          )}

          {/* Analyzing */}
          {step === 'analyzing' && (
            <motion.div
              key="analyzing"
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              className="flex flex-col items-center justify-center py-16"
            >
              <motion.div
                animate={{ rotate: 360 }}
                transition={{ duration: 2, repeat: Infinity, ease: 'linear' }}
              >
                <Sparkles className="w-12 h-12 text-neuro-accent" />
              </motion.div>
              <p className="mt-4 text-white/60 animate-pulse">
                AI is analyzing your entry...
              </p>
            </motion.div>
          )}

          {/* Done — AI Feedback */}
          {step === 'done' && aiFeedback && (
            <motion.div
              key="done"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
            >
              <GlassCard glow="cyan">
                <div className="flex items-center gap-2 mb-4">
                  <Sparkles className="w-5 h-5 text-neuro-accent" />
                  <h2 className="font-display text-xl font-semibold">
                    AI Behavioral Insight
                  </h2>
                </div>
                <StreamingText
                  text={aiFeedback}
                  speed={18}
                  showThinking
                  className="text-sm text-white/70 leading-relaxed"
                />
                <div className="flex gap-3 mt-6">
                  <button
                    onClick={() => {
                      setStep('mood');
                      setSelectedMood(null);
                      setFood('');
                      setSelectedContexts([]);
                      setNote('');
                      setAiFeedback(null);
                    }}
                    className="btn-ghost flex-1"
                  >
                    Log Another
                  </button>
                  <button
                    onClick={() => navigate('/dashboard')}
                    className="btn-primary flex-1"
                  >
                    Back to Dashboard
                  </button>
                </div>
              </GlassCard>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </motion.div>
  );
}
