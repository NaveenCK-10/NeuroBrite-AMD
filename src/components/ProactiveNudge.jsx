import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { AlertTriangle, X, ArrowRight, Shield, Clock } from 'lucide-react';

export default function ProactiveNudge({ onDismiss, onAction }) {
  const [isVisible, setIsVisible] = useState(false);
  const [progress, setProgress] = useState(100);
  const [stage, setStage] = useState(0); // 0=detecting, 1=analyzing, 2=revealed

  // Appear after 4 seconds
  useEffect(() => {
    const showTimer = setTimeout(() => setIsVisible(true), 4000);
    return () => clearTimeout(showTimer);
  }, []);

  // Stage progression
  useEffect(() => {
    if (!isVisible) return;
    const t1 = setTimeout(() => setStage(1), 1500);
    const t2 = setTimeout(() => setStage(2), 3000);
    return () => { clearTimeout(t1); clearTimeout(t2); };
  }, [isVisible]);

  // Auto-dismiss countdown
  useEffect(() => {
    if (stage < 2) return;
    const interval = setInterval(() => {
      setProgress((p) => {
        if (p <= 0) {
          clearInterval(interval);
          setIsVisible(false);
          onDismiss?.();
          return 0;
        }
        return p - 0.5;
      });
    }, 100);
    return () => clearInterval(interval);
  }, [stage, onDismiss]);

  const handleDismiss = () => {
    setIsVisible(false);
    onDismiss?.();
  };

  return (
    <AnimatePresence>
      {isVisible && (
        <motion.div
          initial={{ opacity: 0, x: 100, scale: 0.9 }}
          animate={{ opacity: 1, x: 0, scale: 1 }}
          exit={{ opacity: 0, x: 100, scale: 0.9 }}
          transition={{ type: 'spring', stiffness: 260, damping: 24 }}
          className="fixed bottom-6 right-6 z-50 w-[380px]"
        >
          <div className="nudge-card relative overflow-hidden rounded-2xl border border-neuro-accent/20 bg-neuro-surface/95 backdrop-blur-xl">
            {/* Animated border glow */}
            <div className="absolute inset-0 rounded-2xl animate-border-glow pointer-events-none" />

            {/* Progress bar */}
            {stage === 2 && (
              <div className="absolute top-0 left-0 right-0 h-0.5 bg-white/5">
                <motion.div
                  className="h-full bg-gradient-to-r from-neuro-accent to-neuro-purple"
                  style={{ width: `${progress}%` }}
                  transition={{ duration: 0.1 }}
                />
              </div>
            )}

            <div className="p-4">
              {/* Header */}
              <div className="flex items-center justify-between mb-3">
                <div className="flex items-center gap-2">
                  <div className="relative">
                    <Shield className="w-5 h-5 text-neuro-accent" />
                    <div className="absolute inset-0 bg-neuro-accent/30 rounded-full blur-md animate-pulse" />
                  </div>
                  <span className="text-sm font-bold text-neuro-accent tracking-wide">
                    BEHAVIORAL ALERT
                  </span>
                  <div className="w-2 h-2 rounded-full bg-neuro-accent animate-pulse" />
                </div>
                <button
                  onClick={handleDismiss}
                  className="text-white/30 hover:text-white/60 transition-colors"
                >
                  <X className="w-4 h-4" />
                </button>
              </div>

              {/* Content stages */}
              <AnimatePresence mode="wait">
                {stage === 0 && (
                  <motion.div
                    key="detecting"
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    exit={{ opacity: 0 }}
                    className="flex items-center gap-3 py-3"
                  >
                    <div className="flex gap-1">
                      {[0, 1, 2].map(i => (
                        <div
                          key={i}
                          className="w-1.5 h-1.5 rounded-full bg-neuro-accent"
                          style={{ animation: `pulse-glow 1s ease-in-out ${i * 0.2}s infinite` }}
                        />
                      ))}
                    </div>
                    <span className="text-sm text-white/50 animate-pulse">
                      🔍 Scanning behavioral patterns...
                    </span>
                  </motion.div>
                )}

                {stage === 1 && (
                  <motion.div
                    key="analyzing"
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    exit={{ opacity: 0 }}
                    className="flex items-center gap-3 py-3"
                  >
                    <div className="flex gap-1">
                      {[0, 1, 2].map(i => (
                        <div
                          key={i}
                          className="w-1.5 h-1.5 rounded-full bg-neuro-purple"
                          style={{ animation: `pulse-glow 1s ease-in-out ${i * 0.2}s infinite` }}
                        />
                      ))}
                    </div>
                    <span className="text-sm text-white/50 animate-pulse">
                      🧠 Cross-referencing with mood history...
                    </span>
                  </motion.div>
                )}

                {stage === 2 && (
                  <motion.div
                    key="revealed"
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.4 }}
                  >
                    <div className="flex items-start gap-2 mb-3">
                      <Clock className="w-4 h-4 text-neuro-amber mt-0.5 flex-shrink-0" />
                      <p className="text-sm text-white/80 leading-relaxed">
                        <span className="font-semibold text-white">Pattern detected:</span> You&apos;re
                        entering your <span className="text-neuro-amber font-semibold">3 PM vulnerability window</span>.
                        Based on 7 days of data, there&apos;s a{' '}
                        <span className="text-neuro-accent font-bold">78% chance</span> you&apos;ll
                        reach for sugar in the next hour.
                      </p>
                    </div>

                    <div className="flex gap-2 mt-3">
                      <button
                        onClick={() => { onAction?.(); handleDismiss(); }}
                        className="flex-1 flex items-center justify-center gap-1.5 px-3 py-2.5 rounded-lg bg-gradient-to-r from-neuro-accent/20 to-neuro-purple/20 border border-neuro-accent/20 text-neuro-accent text-xs font-semibold hover:from-neuro-accent/30 hover:to-neuro-purple/30 transition-all duration-300"
                      >
                        Show alternatives <ArrowRight className="w-3 h-3" />
                      </button>
                      <button
                        onClick={handleDismiss}
                        className="px-3 py-2.5 rounded-lg bg-white/[0.04] border border-white/[0.06] text-white/40 text-xs hover:text-white/60 hover:bg-white/[0.06] transition-all duration-300"
                      >
                        Dismiss
                      </button>
                    </div>
                  </motion.div>
                )}
              </AnimatePresence>
            </div>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
