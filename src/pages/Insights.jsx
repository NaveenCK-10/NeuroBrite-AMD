import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import {
  Brain, TrendingUp, AlertCircle, CheckCircle2,
  Zap, ArrowRight, Calendar, BarChart3
} from 'lucide-react';
import GlassCard from '../components/GlassCard';
import NeuralMap from '../components/NeuralMap';
import StreamingText from '../components/StreamingText';
import { useApp } from '../lib/store';
import { getWeeklyInsight } from '../lib/ai';
import { MOODS } from '../data/seedData';

export default function Insights() {
  const { entries, patterns } = useApp();
  const [weeklyReport, setWeeklyReport] = useState(null);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const load = async () => {
      setIsLoading(true);
      const report = await getWeeklyInsight();
      setWeeklyReport(report);
      setIsLoading(false);
    };
    load();
  }, []);

  // Compute some insights from data
  const stressEntries = entries.filter(e => e.mood === 'stressed' || e.mood === 'anxious');
  const calmEntries = entries.filter(e => e.mood === 'calm' || e.mood === 'happy');
  const impulsiveEntries = entries.filter(e => e.context?.includes('impulsive'));
  const plannedEntries = entries.filter(e => e.context?.includes('planned'));

  const avgStressCal = stressEntries.length
    ? Math.round(stressEntries.reduce((s, e) => s + (e.calories || 0), 0) / stressEntries.length)
    : 0;
  const avgCalmCal = calmEntries.length
    ? Math.round(calmEntries.reduce((s, e) => s + (e.calories || 0), 0) / calmEntries.length)
    : 0;

  const patternCards = [
    {
      icon: AlertCircle,
      color: '#ef4444',
      title: 'Stress → Sugar Pipeline',
      desc: `${stressEntries.length} stress-driven entries this week. Average ${avgStressCal} cal vs ${avgCalmCal} cal when calm.`,
      severity: 'high',
    },
    {
      icon: Zap,
      color: '#f97316',
      title: 'Impulsive vs Planned',
      desc: `${patterns.impulsivePercentage}% of your meals were impulsive. Planned meals average 40% fewer calories.`,
      severity: 'medium',
    },
    {
      icon: CheckCircle2,
      color: '#10b981',
      title: 'Mindful Moments',
      desc: `You had ${patterns.streakDays} mindful eating choices. When calm, you naturally choose nutritious foods.`,
      severity: 'positive',
    },
    {
      icon: Calendar,
      color: '#8b5cf6',
      title: '3 PM Vulnerability Window',
      desc: 'Your worst food decisions happen between 2-4 PM. This correlates with cortisol dip + decision fatigue.',
      severity: 'medium',
    },
  ];

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
            Behavioral <span className="gradient-text">Insights</span>
          </h1>
          <p className="text-white/40">
            AI-powered analysis of your food-mood patterns
          </p>
        </motion.div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          {/* Weekly Report — 2 columns */}
          <div className="lg:col-span-2">
            <GlassCard delay={0.1} glow="cyan" className="min-h-[300px]">
              <div className="flex items-center gap-2 mb-4">
                <Brain className="w-5 h-5 text-neuro-accent" />
                <h2 className="font-display font-semibold text-lg">
                  Weekly Intelligence Report
                </h2>
                <div className="ml-auto px-2 py-0.5 rounded-full bg-neuro-accent/10 text-neuro-accent text-xs font-medium">
                  AI Generated
                </div>
              </div>
              {isLoading ? (
                <div className="space-y-3">
                  {[...Array(6)].map((_, i) => (
                    <div
                      key={i}
                      className="h-4 shimmer rounded"
                      style={{ width: `${70 + Math.random() * 30}%` }}
                    />
                  ))}
                </div>
              ) : (
                <StreamingText
                  text={weeklyReport}
                  speed={12}
                  showThinking
                  className="text-sm text-white/70 leading-relaxed"
                />
              )}
            </GlassCard>
          </div>

          {/* Pattern Cards */}
          <div className="space-y-4">
            {patternCards.map((card, i) => (
              <GlassCard key={card.title} delay={0.2 + i * 0.1}>
                <div className="flex items-start gap-3">
                  <div
                    className="p-2 rounded-lg flex-shrink-0"
                    style={{ backgroundColor: `${card.color}15` }}
                  >
                    <card.icon className="w-4 h-4" style={{ color: card.color }} />
                  </div>
                  <div>
                    <h3 className="font-semibold text-sm mb-1">{card.title}</h3>
                    <p className="text-xs text-white/50 leading-relaxed">{card.desc}</p>
                  </div>
                </div>
                {card.severity === 'high' && (
                  <div className="mt-2 h-1 rounded-full bg-white/5 overflow-hidden">
                    <motion.div
                      initial={{ width: 0 }}
                      animate={{ width: '90%' }}
                      transition={{ duration: 1.8, delay: 0.5 + i * 0.2, ease: [0.4, 0, 0.2, 1] }}
                      className="h-full rounded-full bg-red-500/50"
                    />
                  </div>
                )}
                {card.severity === 'medium' && (
                  <div className="mt-2 h-1 rounded-full bg-white/5 overflow-hidden">
                    <motion.div
                      initial={{ width: 0 }}
                      animate={{ width: '60%' }}
                      transition={{ duration: 1.8, delay: 0.5 + i * 0.2, ease: [0.4, 0, 0.2, 1] }}
                      className="h-full rounded-full bg-orange-500/50"
                    />
                  </div>
                )}
                {card.severity === 'positive' && (
                  <div className="mt-2 h-1 rounded-full bg-white/5 overflow-hidden">
                    <motion.div
                      initial={{ width: 0 }}
                      animate={{ width: '40%' }}
                      transition={{ duration: 1.8, delay: 0.5 + i * 0.2, ease: [0.4, 0, 0.2, 1] }}
                      className="h-full rounded-full bg-emerald-500/50"
                    />
                  </div>
                )}
              </GlassCard>
            ))}
          </div>
        </div>

        {/* Neural Map Full Width */}
        <div className="mt-6">
          <GlassCard delay={0.5}>
            <div className="flex items-center gap-2 mb-2">
              <BarChart3 className="w-5 h-5 text-neuro-accent" />
              <h2 className="font-display font-semibold text-lg">
                Full Neural Map — Emotion ↔ Food Correlations
              </h2>
            </div>
            <p className="text-xs text-white/30 mb-4">
              Each line represents a behavioral correlation. Thicker = stronger pattern. Hover to explore.
            </p>
            <NeuralMap className="h-[400px]" />
          </GlassCard>
        </div>

        {/* Comparison Cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mt-6">
          <GlassCard delay={0.6}>
            <h3 className="font-display font-semibold mb-4 flex items-center gap-2">
              <TrendingUp className="w-4 h-4 text-red-400" />
              When Stressed
            </h3>
            <div className="space-y-2">
              {patterns.stressedFoods.map((food) => (
                <div key={food} className="flex items-center gap-2">
                  <div className="w-2 h-2 rounded-full bg-red-400" />
                  <span className="text-sm text-white/60 capitalize">{food}</span>
                </div>
              ))}
              <div className="mt-3 p-3 rounded-lg bg-red-500/[0.04] border border-red-500/[0.08]">
                <p className="text-xs text-red-300">
                  Avg <span className="font-bold">{avgStressCal}</span> calories per meal
                </p>
              </div>
            </div>
          </GlassCard>

          <GlassCard delay={0.7}>
            <h3 className="font-display font-semibold mb-4 flex items-center gap-2">
              <TrendingUp className="w-4 h-4 text-emerald-400" />
              When Happy/Calm
            </h3>
            <div className="space-y-2">
              {patterns.happyFoods.map((food) => (
                <div key={food} className="flex items-center gap-2">
                  <div className="w-2 h-2 rounded-full bg-emerald-400" />
                  <span className="text-sm text-white/60 capitalize">{food}</span>
                </div>
              ))}
              <div className="mt-3 p-3 rounded-lg bg-emerald-500/[0.04] border border-emerald-500/[0.08]">
                <p className="text-xs text-emerald-300">
                  Avg <span className="font-bold">{avgCalmCal}</span> calories per meal
                </p>
              </div>
            </div>
          </GlassCard>
        </div>
      </div>
    </motion.div>
  );
}
