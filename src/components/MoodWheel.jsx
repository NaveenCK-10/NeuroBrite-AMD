import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { MOODS } from '../data/seedData';

export default function MoodWheel({ selected, onSelect, size = 'large' }) {
  const [hovered, setHovered] = useState(null);
  const isLarge = size === 'large';
  const radius = isLarge ? 130 : 90;
  const center = radius + 60;
  const containerSize = (radius + 60) * 2;

  return (
    <div
      className="relative flex items-center justify-center"
      style={{ width: containerSize, height: containerSize }}
    >
      {/* Center glow */}
      <div
        className="absolute rounded-full transition-all duration-500"
        style={{
          width: radius * 0.8,
          height: radius * 0.8,
          left: center - radius * 0.4,
          top: center - radius * 0.4,
          background: selected
            ? `radial-gradient(circle, ${MOODS.find(m => m.id === selected)?.color}22 0%, transparent 70%)`
            : 'radial-gradient(circle, rgba(6,182,212,0.05) 0%, transparent 70%)',
        }}
      />

      {/* Center text */}
      <AnimatePresence mode="wait">
        <motion.div
          key={selected || hovered || 'default'}
          initial={{ opacity: 0, scale: 0.8 }}
          animate={{ opacity: 1, scale: 1 }}
          exit={{ opacity: 0, scale: 0.8 }}
          className="absolute flex flex-col items-center justify-center"
          style={{ left: center - 40, top: center - 25, width: 80 }}
        >
          <span className="text-2xl">
            {MOODS.find(m => m.id === (hovered || selected))?.emoji || '🧠'}
          </span>
          <span className="text-xs text-white/60 mt-1 text-center">
            {MOODS.find(m => m.id === (hovered || selected))?.label || 'How do you feel?'}
          </span>
        </motion.div>
      </AnimatePresence>

      {/* Mood nodes */}
      {MOODS.map((mood, i) => {
        const angle = (i / MOODS.length) * Math.PI * 2 - Math.PI / 2;
        const x = center + radius * Math.cos(angle);
        const y = center + radius * Math.sin(angle);
        const isSelected = selected === mood.id;
        const isHovered = hovered === mood.id;

        return (
          <motion.button
            key={mood.id}
            initial={{ opacity: 0, scale: 0 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ delay: i * 0.08, type: 'spring', stiffness: 200 }}
            onClick={() => onSelect(mood.id)}
            onMouseEnter={() => setHovered(mood.id)}
            onMouseLeave={() => setHovered(null)}
            aria-label={`Select mood: ${mood.label}`}
            aria-pressed={isSelected}
            className="absolute flex flex-col items-center gap-1 transition-all duration-300"
            style={{
              left: x - (isLarge ? 28 : 22),
              top: y - (isLarge ? 28 : 22),
            }}
          >
            {/* Connection line to center */}
            <svg
              className="absolute pointer-events-none"
              style={{
                width: containerSize,
                height: containerSize,
                left: center - x + (isLarge ? 28 : 22) - center,
                top: center - y + (isLarge ? 28 : 22) - center,
              }}
            >
              <line
                x1={center}
                y1={center}
                x2={x}
                y2={y}
                stroke={mood.color}
                strokeWidth={isSelected ? 2 : 0.5}
                strokeOpacity={isSelected ? 0.6 : isHovered ? 0.3 : 0.08}
                className="transition-all duration-300"
              />
            </svg>

            {/* Node */}
            <div
              className={`
                relative rounded-full flex items-center justify-center
                transition-all duration-300 cursor-pointer
                ${isLarge ? 'w-14 h-14' : 'w-11 h-11'}
              `}
              style={{
                background: isSelected
                  ? `${mood.color}30`
                  : isHovered
                    ? `${mood.color}15`
                    : 'rgba(255,255,255,0.03)',
                border: `2px solid ${isSelected ? mood.color : isHovered ? mood.color + '60' : 'rgba(255,255,255,0.08)'}`,
                boxShadow: isSelected
                  ? `0 0 20px ${mood.color}40, 0 0 40px ${mood.color}15`
                  : 'none',
                transform: isSelected ? 'scale(1.15)' : isHovered ? 'scale(1.08)' : 'scale(1)',
              }}
            >
              <span className={isLarge ? 'text-xl' : 'text-lg'}>{mood.emoji}</span>
            </div>

            {isLarge && (
              <span
                className={`text-xs font-medium transition-all duration-300 ${
                  isSelected ? 'opacity-100' : isHovered ? 'opacity-70' : 'opacity-40'
                }`}
                style={{ color: isSelected ? mood.color : 'white' }}
              >
                {mood.label}
              </span>
            )}
          </motion.button>
        );
      })}
    </div>
  );
}
