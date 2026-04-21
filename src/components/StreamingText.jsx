import { useState, useEffect } from 'react';

const DEFAULT_STEPS = [
  { icon: '📡', text: 'Scanning 16 entries across 7 days...' },
  { icon: '🔍', text: 'Detecting mood-food correlations...' },
  { icon: '🧠', text: 'Identifying behavioral triggers...' },
  { icon: '💡', text: 'Generating personalized insight...' },
];

export default function StreamingText({
  text,
  speed = 18,
  showThinking = true,
  thinkingSteps = null,
  onComplete,
  className = '',
}) {
  const [displayed, setDisplayed] = useState('');
  const [phase, setPhase] = useState(showThinking ? 'thinking' : 'streaming');
  const [currentStep, setCurrentStep] = useState(0);
  const [isDone, setIsDone] = useState(false);

  const steps = thinkingSteps || DEFAULT_STEPS;

  // Reset on new text
  useEffect(() => {
    setDisplayed('');
    setIsDone(false);
    setCurrentStep(0);
    setPhase(showThinking ? 'thinking' : 'streaming');
  }, [text, showThinking]);

  // Multi-step thinking progression
  useEffect(() => {
    if (phase !== 'thinking') return;

    const stepDuration = 800;
    const timer = setInterval(() => {
      setCurrentStep((prev) => {
        if (prev >= steps.length - 1) {
          clearInterval(timer);
          setTimeout(() => setPhase('streaming'), 500);
          return prev;
        }
        return prev + 1;
      });
    }, stepDuration);

    return () => clearInterval(timer);
  }, [phase, steps.length]);

  // Stream text character by character
  useEffect(() => {
    if (phase !== 'streaming' || !text) return;

    let index = 0;
    const interval = setInterval(() => {
      if (index < text.length) {
        setDisplayed(text.slice(0, index + 1));
        index++;
      } else {
        clearInterval(interval);
        setIsDone(true);
        onComplete?.();
      }
    }, speed);

    return () => clearInterval(interval);
  }, [text, phase, speed, onComplete]);

  // ---- Thinking Phase ----
  if (phase === 'thinking') {
    return (
      <div className={`space-y-2 ${className}`}>
        {steps.map((step, i) => (
          <div
            key={i}
            className={`flex items-center gap-3 transition-all duration-700 ease-out ${
              i < currentStep
                ? 'opacity-40 translate-x-0'
                : i === currentStep
                ? 'opacity-100 translate-x-0'
                : 'opacity-0 translate-x-3'
            }`}
          >
            <span className="text-base">{step.icon}</span>
            <span
              className={`text-sm transition-colors duration-500 ${
                i === currentStep
                  ? 'text-neuro-accent font-medium'
                  : 'text-white/30'
              }`}
            >
              {step.text}
            </span>
            {i < currentStep && (
              <span className="text-emerald-400/80 text-xs ml-auto font-medium">✓</span>
            )}
            {i === currentStep && (
              <div className="ml-auto flex gap-1">
                {[0, 1, 2].map((d) => (
                  <div
                    key={d}
                    className="w-1 h-1 rounded-full bg-neuro-accent"
                    style={{
                      animation: `pulse-glow 1s ease-in-out ${d * 0.15}s infinite`,
                    }}
                  />
                ))}
              </div>
            )}
          </div>
        ))}
      </div>
    );
  }

  // ---- Streaming Phase ----
  return (
    <div className={className}>
      <div className="whitespace-pre-wrap leading-relaxed">
        {renderMarkdown(displayed)}
        {!isDone && <span className="typing-cursor" />}
      </div>
    </div>
  );
}

function ThinkingDots() {
  return (
    <div className="flex gap-1">
      {[0, 1, 2].map((i) => (
        <div
          key={i}
          className="w-2 h-2 rounded-full bg-neuro-accent"
          style={{
            animation: `pulse-glow 1.4s ease-in-out ${i * 0.2}s infinite`,
          }}
        />
      ))}
    </div>
  );
}

// Markdown rendering for bold, lists, blockquotes, and headers
function renderMarkdown(text) {
  if (!text) return null;

  const lines = text.split('\n');
  return lines.map((line, i) => {
    if (line.startsWith('## ')) {
      return (
        <h3 key={i} className="text-lg font-bold gradient-text mt-4 mb-2">
          {line.replace('## ', '')}
        </h3>
      );
    }
    if (line.startsWith('### ')) {
      return (
        <h4 key={i} className="text-base font-semibold text-white/90 mt-3 mb-1">
          {line.replace('### ', '')}
        </h4>
      );
    }
    if (line.startsWith('> ')) {
      return (
        <blockquote
          key={i}
          className="border-l-2 border-neuro-accent/50 pl-3 my-2 text-white/60 italic"
        >
          {parseBold(line.replace('> ', ''))}
        </blockquote>
      );
    }
    if (line.startsWith('- ') || line.match(/^\d+\.\s/)) {
      return (
        <div key={i} className="flex gap-2 my-0.5 ml-2">
          <span className="text-neuro-accent mt-0.5">•</span>
          <span>{parseBold(line.replace(/^-\s|^\d+\.\s/, ''))}</span>
        </div>
      );
    }
    if (line.trim() === '') return <div key={i} className="h-2" />;
    return <p key={i} className="my-0.5">{parseBold(line)}</p>;
  });
}

function parseBold(text) {
  if (!text) return text;
  const parts = text.split(/\*\*(.*?)\*\*/g);
  return parts.map((part, i) =>
    i % 2 === 1 ? (
      <span key={i} className="font-semibold text-white">
        {part}
      </span>
    ) : (
      <span key={i}>{part}</span>
    )
  );
}

export { ThinkingDots };
