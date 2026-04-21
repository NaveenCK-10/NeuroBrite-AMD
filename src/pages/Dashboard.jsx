import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';
import {
  Brain, TrendingUp, Clock, Zap, AlertTriangle,
  ArrowRight, Flame, Target, BarChart3, Utensils, ShieldAlert
} from 'lucide-react';
import GlassCard from '../components/GlassCard';
import StreamingText from '../components/StreamingText';
import NeuralMap from '../components/NeuralMap';
import ProactiveNudge from '../components/ProactiveNudge';
import { useApp } from '../lib/store';
import { analyzePatterns, predictCraving } from '../lib/ai';
import { MOODS } from '../data/seedData';

function AnimatedNumber({ value, suffix = '', duration = 2000 }) {
  const [current, setCurrent] = useState(0);

  useEffect(() => {
    let start = 0;
    const increment = value / (duration / 16);
    const timer = setInterval(() => {
      start += increment;
      if (start >= value) {
        setCurrent(value);
        clearInterval(timer);
      } else {
        setCurrent(Math.floor(start));
      }
    }, 16);
    return () => clearInterval(timer);
  }, [value, duration]);

  return <span>{current}{suffix}</span>;
}

// Behavioral Risk Score Ring
function RiskScore({ score = 6.2, delay = 0.5 }) {
  const radius = 39;
  const circumference = 2 * Math.PI * radius;
  const offset = circumference - (score / 10) * circumference;
  const color =
    score > 7 ? '#ef4444' : score > 4 ? '#f59e0b' : '#10b981';
  const label =
    score > 7 ? 'High Risk' : score > 4 ? 'Moderate' : 'Low Risk';

  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.8 }}
      animate={{ opacity: 1, scale: 1 }}
      transition={{ delay, duration: 0.5 }}
      className="flex flex-col items-center"
    >
      <div className="relative w-[100px] h-[100px]">
        <svg className="w-full h-full -rotate-90" viewBox="0 0 88 88">
          <circle
            cx="44"
            cy="44"
            r={radius}
            fill="none"
            stroke="rgba(255,255,255,0.05)"
            strokeWidth="6"
          />
          <motion.circle
            cx="44"
            cy="44"
            r={radius}
            fill="none"
            stroke={color}
            strokeWidth="6"
            strokeLinecap="round"
            strokeDasharray={circumference}
            initial={{ strokeDashoffset: circumference }}
            animate={{ strokeDashoffset: offset }}
            transition={{ duration: 1.5, delay: delay + 0.3, ease: 'easeOut' }}
            style={{ filter: `drop-shadow(0 0 8px ${color}40)` }}
          />
        </svg>
        <div className="absolute inset-0 flex flex-col items-center justify-center">
          <span
            className="text-2xl font-bold font-display stat-glow"
            style={{ color }}
          >
            {score}
          </span>
          <span className="text-[10px] text-white/40">/10</span>
        </div>
      </div>
      <span className="text-xs font-medium mt-2" style={{ color }}>
        {label}
      </span>
      <span className="text-[10px] text-white/30 mt-0.5">
        Emotional Eating Risk
      </span>
    </motion.div>
  );
}

export default function Dashboard() {
  const { entries, patterns } = useApp();
  const [aiAnalysis, setAiAnalysis] = useState(null);
  const [prediction, setPrediction] = useState(null);
  const [showNudge, setShowNudge] = useState(true);

  useEffect(() => {
    const loadAI = async () => {
      const analysis = await analyzePatterns(entries);
      setAiAnalysis(analysis);

      const pred = await predictCraving(entries);
      setPrediction(pred);
    };
    loadAI();
  }, []);

  const recentEntries = entries.slice(0, 5);
  const topMoods = Object.entries(patterns.weeklyMoodBreakdown)
    .sort(([, a], [, b]) => b - a)
    .slice(0, 4);

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      className="page-container pt-24 pb-12 px-4"
    >
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          className="mb-8"
        >
          <h1 className="font-display text-3xl sm:text-4xl font-bold mb-2">
            Welcome back, <span className="gradient-text">Alex</span>
          </h1>
          <p className="text-white/40">
            Here&apos;s your behavioral intelligence overview
          </p>
        </motion.div>

        {/* Stats Row */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-6">
          {[
            {
              icon: Utensils,
              label: 'Total Entries',
              value: patterns.totalEntries,
              color: '#06b6d4',
            },
            {
              icon: Zap,
              label: 'Impulsive',
              value: patterns.impulsivePercentage,
              suffix: '%',
              color: '#f43f5e',
            },
            {
              icon: Target,
              label: 'Planned',
              value: patterns.plannedPercentage,
              suffix: '%',
              color: '#10b981',
            },
            {
              icon: Flame,
              label: 'Mindful Streak',
              value: patterns.streakDays,
              suffix: ' days',
              color: '#f59e0b',
            },
          ].map((stat, i) => (
            <GlassCard key={stat.label} delay={i * 0.1} className="text-center">
              <stat.icon
                className="w-6 h-6 mx-auto mb-2"
                style={{ color: stat.color }}
              />
              <div className="text-2xl font-bold font-display" style={{ color: stat.color }}>
                <AnimatedNumber value={stat.value} suffix={stat.suffix} />
              </div>
              <div className="text-xs text-white/40 mt-1">{stat.label}</div>
            </GlassCard>
          ))}
        </div>

        {/* Main Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          {/* AI Analysis — takes 2 columns */}
          <div className="lg:col-span-2">
            <GlassCard delay={0.3} glow="cyan" className="live-card min-h-[280px] rounded-2xl">
              <div className="flex items-center gap-2 mb-4">
                <Brain className="w-5 h-5 text-neuro-accent" />
                <h2 className="font-display font-semibold text-lg">
                  AI Behavioral Analysis
                </h2>
                <div className="ml-auto flex items-center gap-1.5 px-2.5 py-1 rounded-full bg-neuro-accent/10">
                  <div className="w-2 h-2 rounded-full bg-neuro-accent animate-pulse" />
                  <span className="text-neuro-accent text-xs font-medium">Live</span>
                </div>
              </div>
              {!aiAnalysis ? (
                <StreamingText
                  text=""
                  showThinking={true}
                  className="text-sm text-white/70"
                />
              ) : (
                <StreamingText
                  text={aiAnalysis}
                  speed={12}
                  showThinking={true}
                  className="text-sm text-white/70 leading-relaxed"
                />
              )}
            </GlassCard>
          </div>

          {/* Craving Predictor + Risk Score */}
          <div className="space-y-4">
            <GlassCard delay={0.4} glow="purple">
              <div className="flex items-center gap-2 mb-4">
                <AlertTriangle className="w-5 h-5 text-neuro-purple" />
                <h2 className="font-display font-semibold">Craving Forecast</h2>
              </div>
              {!prediction ? (
                <div className="space-y-3">
                  <div className="h-4 shimmer rounded w-3/4" />
                  <div className="h-4 shimmer rounded w-1/2" />
                  <div className="h-4 shimmer rounded w-2/3" />
                </div>
              ) : (
                <div className="space-y-3">
                  <div>
                    <p className="text-xs text-white/40 mb-1">PREDICTED CRAVING</p>
                    <p className="font-semibold text-neuro-purple">
                      {prediction.craving}
                    </p>
                  </div>
                  <div>
                    <p className="text-xs text-white/40 mb-1">EXPECTED TIME</p>
                    <p className="text-sm text-white/70">{prediction.time}</p>
                  </div>
                  <div>
                    <p className="text-xs text-white/40 mb-1">CONFIDENCE</p>
                    <div className="flex items-center gap-2">
                      <div className="flex-1 h-2 rounded-full bg-white/5 overflow-hidden">
                        <motion.div
                          initial={{ width: 0 }}
                          animate={{ width: `${prediction.confidence}%` }}
                          transition={{ duration: 1.8, delay: 0.5, ease: [0.4, 0, 0.2, 1] }}
                          className="h-full rounded-full"
                          style={{
                            background: 'linear-gradient(90deg, #8b5cf6, #06b6d4)',
                          }}
                        />
                      </div>
                      <span className="text-sm font-bold text-neuro-purple">
                        {prediction.confidence}%
                      </span>
                    </div>
                  </div>
                  {prediction.nudge && (
                    <div className="mt-3 p-3 rounded-lg bg-neuro-emerald/[0.04] border border-neuro-emerald/15">
                      <p className="text-xs text-neuro-emerald font-medium mb-1">
                        💡 SMART NUDGE
                      </p>
                      <p className="text-xs text-white/60">{prediction.nudge}</p>
                    </div>
                  )}
                </div>
              )}
            </GlassCard>

            {/* Behavioral Risk Score */}
            <GlassCard delay={0.5}>
              <div className="flex items-center gap-2 mb-3">
                <ShieldAlert className="w-4 h-4 text-amber-400" />
                <h3 className="font-display font-semibold text-sm">Risk Score</h3>
              </div>
              <RiskScore score={6.2} delay={0.8} />
            </GlassCard>
          </div>
        </div>

        {/* Second Row */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 mt-6">
          {/* Neural Map */}
          <div className="lg:col-span-2">
            <GlassCard delay={0.6}>
              <div className="flex items-center justify-between mb-2">
                <div className="flex items-center gap-2">
                  <BarChart3 className="w-5 h-5 text-neuro-accent" />
                  <h2 className="font-display font-semibold text-lg">
                    Food-Mood Neural Map
                  </h2>
                </div>
                <Link
                  to="/insights"
                  className="text-xs text-neuro-accent flex items-center gap-1 hover:underline"
                >
                  Full Insights <ArrowRight className="w-3 h-3" />
                </Link>
              </div>
              <p className="text-xs text-white/30 mb-3">
                Hover to explore connections between emotions and eating patterns
              </p>
              <NeuralMap className="h-[350px]" />
            </GlassCard>
          </div>

          {/* Recent Timeline + Mood Distribution */}
          <div className="space-y-6">
            {/* Mood Distribution */}
            <GlassCard delay={0.65}>
              <h3 className="font-display font-semibold mb-3 flex items-center gap-2">
                <TrendingUp className="w-4 h-4 text-neuro-accent" />
                This Week&apos;s Moods
              </h3>
              <div className="space-y-2">
                {topMoods.map(([moodId, count]) => {
                  const mood = MOODS.find(m => m.id === moodId);
                  if (!mood) return null;
                  const max = Math.max(...Object.values(patterns.weeklyMoodBreakdown));
                  const pct = (count / max) * 100;

                  return (
                    <div key={moodId} className="flex items-center gap-2">
                      <span className="text-sm w-6">{mood.emoji}</span>
                      <span className="text-xs text-white/50 w-16">{mood.label}</span>
                      <div className="flex-1 h-2 rounded-full bg-white/5 overflow-hidden">
                        <motion.div
                          initial={{ width: 0 }}
                          animate={{ width: `${pct}%` }}
                          transition={{ duration: 1.2, delay: 0.8, ease: [0.4, 0, 0.2, 1] }}
                          className="h-full rounded-full"
                          style={{ backgroundColor: mood.color }}
                        />
                      </div>
                      <span className="text-xs text-white/40 w-4 text-right">{count}</span>
                    </div>
                  );
                })}
              </div>
            </GlassCard>

            {/* Recent Entries */}
            <GlassCard delay={0.7}>
              <h3 className="font-display font-semibold mb-3 flex items-center gap-2">
                <Clock className="w-4 h-4 text-neuro-accent" />
                Recent Entries
              </h3>
              <div className="space-y-2">
                {recentEntries.map((entry) => {
                  const mood = MOODS.find(m => m.id === entry.mood);
                  return (
                    <div
                      key={entry.id}
                      className="flex items-start gap-3 p-2 rounded-lg hover:bg-white/[0.03] transition-all duration-300"
                    >
                      <span className="text-lg mt-0.5">{mood?.emoji}</span>
                      <div className="flex-1 min-w-0">
                        <p className="text-sm text-white/80 truncate">
                          {entry.food}
                        </p>
                        <p className="text-xs text-white/30">
                          {entry.timeLabel} · {entry.calories} cal
                        </p>
                      </div>
                    </div>
                  );
                })}
              </div>
              <Link
                to="/log"
                className="mt-3 w-full btn-primary flex items-center justify-center gap-2 text-sm py-2"
              >
                Log New Entry <ArrowRight className="w-4 h-4" />
              </Link>
            </GlassCard>
          </div>
        </div>

        {/* Quick Action Banner */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 1 }}
          className="mt-6"
        >
          <GlassCard className="gradient-border flex flex-col sm:flex-row items-center justify-between gap-4">
            <div className="flex items-center gap-3">
              <div className="p-2 rounded-lg bg-neuro-accent/10">
                <Brain className="w-6 h-6 text-neuro-accent" />
              </div>
              <div>
                <p className="font-semibold">
                  Talk to your AI Food Psychologist
                </p>
                <p className="text-sm text-white/40">
                  Ask why you eat what you eat. Get real answers.
                </p>
              </div>
            </div>
            <Link
              to="/chat"
              className="btn-primary flex items-center gap-2 whitespace-nowrap"
            >
              Start Conversation <ArrowRight className="w-4 h-4" />
            </Link>
          </GlassCard>
        </motion.div>
      </div>

      {/* Proactive Nudge — the WOW moment */}
      {showNudge && (
        <ProactiveNudge
          onDismiss={() => setShowNudge(false)}
          onAction={() => {}}
        />
      )}
    </motion.div>
  );
}
