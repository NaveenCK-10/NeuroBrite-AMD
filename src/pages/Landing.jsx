import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import { Brain, Sparkles, ArrowRight, ChevronRight, Zap, Eye, TrendingUp } from 'lucide-react';
import { useApp } from '../lib/store';

const QUIZ_QUESTIONS = [
  {
    question: 'When you\'re stressed, you most often reach for...',
    options: [
      { id: 'sugar', label: 'Something sweet 🍫', icon: '🍫' },
      { id: 'salty', label: 'Something salty/crunchy 🍿', icon: '🍿' },
      { id: 'skip', label: 'I skip meals entirely ⏭️', icon: '⏭️' },
      { id: 'comfort', label: 'A big comfort meal 🍕', icon: '🍕' },
    ],
  },
  {
    question: 'Your eating habits change most when you\'re...',
    options: [
      { id: 'alone', label: 'Alone at home 🏠', icon: '🏠' },
      { id: 'work', label: 'Under work pressure 💼', icon: '💼' },
      { id: 'bored', label: 'Bored with nothing to do 📱', icon: '📱' },
      { id: 'social', label: 'In social situations 👥', icon: '👥' },
    ],
  },
  {
    question: 'How would you describe your relationship with food?',
    options: [
      { id: 'emotional', label: 'It\'s my emotional regulator 💛', icon: '💛' },
      { id: 'fuel', label: 'Just fuel, I don\'t think much 🔋', icon: '🔋' },
      { id: 'complicated', label: 'It\'s complicated... 🌀', icon: '🌀' },
      { id: 'joyful', label: 'Source of joy & connection 🎉', icon: '🎉' },
    ],
  },
];

const FEATURES = [
  {
    icon: Brain,
    title: 'Behavioral Intelligence',
    desc: 'AI detects emotional eating patterns you\'ve never noticed',
    color: '#06b6d4',
  },
  {
    icon: Eye,
    title: 'Craving Prediction',
    desc: 'Predicts what you\'ll crave before it happens',
    color: '#8b5cf6',
  },
  {
    icon: Zap,
    title: 'Smart Nudges',
    desc: 'Intervenes at the right moment with the right suggestion',
    color: '#10b981',
  },
  {
    icon: TrendingUp,
    title: 'Pattern Discovery',
    desc: 'Maps the hidden connections between mood and food',
    color: '#f59e0b',
  },
];

export default function Landing() {
  const [step, setStep] = useState('hero'); // hero | quiz | transitioning
  const [quizStep, setQuizStep] = useState(0);
  const [answers, setAnswers] = useState([]);
  const navigate = useNavigate();
  const { setOnboarded } = useApp();

  const handleStartQuiz = () => setStep('quiz');

  const handleAnswer = (answer) => {
    const newAnswers = [...answers, answer];
    setAnswers(newAnswers);

    if (quizStep < QUIZ_QUESTIONS.length - 1) {
      setQuizStep(quizStep + 1);
    } else {
      setStep('transitioning');
      setOnboarded({ answers: newAnswers });
      setTimeout(() => navigate('/dashboard'), 2000);
    }
  };

  return (
    <div className="page-container min-h-screen flex flex-col">
      <AnimatePresence mode="wait">
        {step === 'hero' && (
          <motion.div
            key="hero"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0, y: -30 }}
            className="flex-1 flex flex-col"
          >
            {/* Hero Section */}
            <div className="flex-1 flex items-center justify-center px-4">
              <div className="max-w-4xl mx-auto text-center">
                {/* Logo */}
                <motion.div
                  initial={{ scale: 0, rotate: -180 }}
                  animate={{ scale: 1, rotate: 0 }}
                  transition={{ type: 'spring', stiffness: 200, delay: 0.2 }}
                  className="inline-flex items-center gap-3 mb-8"
                >
                  <div className="relative">
                    <Brain className="w-12 h-12 text-neuro-accent" />
                    <div className="absolute inset-0 bg-neuro-accent/20 rounded-full blur-xl animate-pulse-glow" />
                  </div>
                  <span className="font-display font-bold text-3xl gradient-text">
                    NeuroBite
                  </span>
                </motion.div>

                {/* Tagline */}
                <motion.h1
                  initial={{ opacity: 0, y: 30 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.5, duration: 0.8 }}
                  className="font-display text-5xl sm:text-7xl font-bold mb-5 leading-[1.1]"
                >
                  Your food has a{' '}
                  <span className="gradient-text">story</span>
                  <br />
                  <span className="text-white/50 text-4xl sm:text-5xl font-semibold">
                    We read it.
                  </span>
                </motion.h1>

                {/* Subtitle */}
                <motion.p
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.8 }}
                  className="text-lg sm:text-xl text-white/50 max-w-2xl mx-auto mb-6 leading-relaxed"
                >
                  NeuroBite is a Food Psychology Intelligence Engine that understands{' '}
                  <span className="text-neuro-accent font-medium">WHY</span> you eat,
                  not just what. It detects emotional patterns, predicts cravings, and
                  delivers behavioral nudges — powered by AI.
                </motion.p>

                {/* Dramatic Stat */}
                <motion.div
                  initial={{ opacity: 0, scale: 0.8 }}
                  animate={{ opacity: 1, scale: 1 }}
                  transition={{ delay: 1.0, type: 'spring', stiffness: 200 }}
                  className="mb-8 inline-flex items-center gap-3 px-6 py-3 rounded-full glass border border-neuro-accent/20"
                >
                  <div className="w-2 h-2 rounded-full bg-rose-500 animate-pulse" />
                  <span className="text-sm text-white/60">
                    <span className="text-2xl font-bold text-rose-400 font-display stat-glow">62%</span>
                    {' '}of eating decisions are emotional, not physical
                  </span>
                </motion.div>

                {/* CTA Buttons */}
                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 1.2 }}
                  className="flex gap-4 justify-center"
                >
                  <button
                    onClick={handleStartQuiz}
                    className="btn-primary flex items-center gap-2 text-lg px-8 py-4"
                  >
                    Begin Your Journey
                    <ArrowRight className="w-5 h-5" />
                  </button>
                  <button
                    onClick={() => navigate('/dashboard')}
                    className="btn-ghost flex items-center gap-2 text-lg px-8 py-4"
                  >
                    Skip to Demo
                  </button>
                </motion.div>

                {/* Powered by badge */}
                <motion.div
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  transition={{ delay: 1.5 }}
                  className="mt-8 flex items-center justify-center gap-2 text-white/30 text-sm"
                >
                  <Sparkles className="w-4 h-4" />
                  Powered by Gemini AI + Food Science Research
                </motion.div>
              </div>
            </div>

            {/* Features Strip */}
            <motion.div
              initial={{ opacity: 0, y: 40 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 1.3, duration: 0.6 }}
              className="glass-strong border-t border-white/5"
            >
              <div className="max-w-6xl mx-auto px-4 py-8 grid grid-cols-2 md:grid-cols-4 gap-6">
                {FEATURES.map((f, i) => (
                  <motion.div
                    key={f.title}
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 1.5 + i * 0.1 }}
                    className="text-center group cursor-default"
                  >
                    <f.icon
                      className="w-8 h-8 mx-auto mb-2.5 transition-transform duration-300 group-hover:scale-110"
                      style={{ color: f.color }}
                    />
                    <h3 className="font-semibold text-sm mb-1">{f.title}</h3>
                    <p className="text-xs text-white/40 leading-relaxed">{f.desc}</p>
                  </motion.div>
                ))}
              </div>
            </motion.div>
          </motion.div>
        )}

        {step === 'quiz' && (
          <motion.div
            key="quiz"
            initial={{ opacity: 0, x: 50 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: -50 }}
            className="flex-1 flex items-center justify-center px-4"
          >
            <div className="max-w-xl w-full">
              {/* Progress */}
              <div className="flex items-center gap-3 mb-8">
                {QUIZ_QUESTIONS.map((_, i) => (
                  <div
                    key={i}
                    className="h-1 flex-1 rounded-full overflow-hidden bg-white/10"
                  >
                    <motion.div
                      className="h-full rounded-full"
                      style={{
                        background: 'linear-gradient(90deg, #06b6d4, #8b5cf6)',
                      }}
                      initial={{ width: '0%' }}
                      animate={{ width: i <= quizStep ? '100%' : '0%' }}
                      transition={{ duration: 0.5 }}
                    />
                  </div>
                ))}
              </div>

              {/* Question */}
              <AnimatePresence mode="wait">
                <motion.div
                  key={quizStep}
                  initial={{ opacity: 0, x: 30 }}
                  animate={{ opacity: 1, x: 0 }}
                  exit={{ opacity: 0, x: -30 }}
                >
                  <p className="text-white/40 text-sm mb-2 font-medium">
                    Question {quizStep + 1} of {QUIZ_QUESTIONS.length}
                  </p>
                  <h2 className="font-display text-2xl sm:text-3xl font-bold mb-8">
                    {QUIZ_QUESTIONS[quizStep].question}
                  </h2>

                  <div className="space-y-3">
                    {QUIZ_QUESTIONS[quizStep].options.map((opt, i) => (
                      <motion.button
                        key={opt.id}
                        initial={{ opacity: 0, x: 20 }}
                        animate={{ opacity: 1, x: 0 }}
                        transition={{ delay: i * 0.1 }}
                        onClick={() => handleAnswer(opt.id)}
                        className="w-full glass glass-hover text-left px-6 py-4 flex items-center justify-between group"
                      >
                        <span className="text-lg">{opt.label}</span>
                        <ChevronRight className="w-5 h-5 text-white/20 group-hover:text-neuro-accent transition-colors" />
                      </motion.button>
                    ))}
                  </div>
                </motion.div>
              </AnimatePresence>
            </div>
          </motion.div>
        )}

        {step === 'transitioning' && (
          <motion.div
            key="transition"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            className="flex-1 flex items-center justify-center"
          >
            <div className="text-center">
              <motion.div
                animate={{ rotate: 360 }}
                transition={{ duration: 2, repeat: Infinity, ease: 'linear' }}
                className="inline-block mb-6"
              >
                <Brain className="w-16 h-16 text-neuro-accent" />
              </motion.div>
              <motion.h2
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.3 }}
                className="font-display text-2xl font-bold gradient-text mb-3"
              >
                Building your behavioral profile...
              </motion.h2>
              <motion.p
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 0.6 }}
                className="text-white/40"
              >
                Analyzing patterns • Calibrating AI • Preparing insights
              </motion.p>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
