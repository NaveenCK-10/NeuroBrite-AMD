import { useEffect, useRef, useState } from 'react';
import { motion } from 'framer-motion';
import { MOODS, NEURAL_CONNECTIONS } from '../data/seedData';

const FOOD_NODES = [
  { id: 'Sugar & Chocolate', emoji: '🍫', x: 0.82, y: 0.2 },
  { id: 'Salty Snacks', emoji: '🍿', x: 0.88, y: 0.45 },
  { id: 'Fast Food', emoji: '🍔', x: 0.8, y: 0.7 },
  { id: 'Fresh & Healthy', emoji: '🥗', x: 0.75, y: 0.9 },
  { id: 'Delivery Food', emoji: '📦', x: 0.9, y: 0.65 },
  { id: 'Social Meals', emoji: '🍽️', x: 0.85, y: 0.85 },
  { id: 'Skipped Meals', emoji: '⏭️', x: 0.78, y: 0.1 },
  { id: 'Mindful Choices', emoji: '🍵', x: 0.92, y: 0.3 },
];

const MOOD_POSITIONS = {
  stressed: { x: 0.12, y: 0.15 },
  happy: { x: 0.08, y: 0.35 },
  sad: { x: 0.15, y: 0.55 },
  bored: { x: 0.1, y: 0.75 },
  anxious: { x: 0.18, y: 0.25 },
  tired: { x: 0.05, y: 0.6 },
  excited: { x: 0.14, y: 0.9 },
  calm: { x: 0.08, y: 0.48 },
};

export default function NeuralMap({ className = '' }) {
  const svgRef = useRef(null);
  const [dims, setDims] = useState({ w: 800, h: 400 });
  const [hoveredNode, setHoveredNode] = useState(null);

  useEffect(() => {
    const updateDims = () => {
      if (svgRef.current) {
        const rect = svgRef.current.getBoundingClientRect();
        setDims({ w: rect.width, h: rect.height });
      }
    };
    updateDims();
    window.addEventListener('resize', updateDims);
    return () => window.removeEventListener('resize', updateDims);
  }, []);

  const { w, h } = dims;

  return (
    <div className={`relative ${className}`}>
      <svg
        ref={svgRef}
        viewBox={`0 0 ${w} ${h}`}
        className="w-full h-full"
        style={{ minHeight: 350 }}
      >
        <defs>
          <linearGradient id="conn-gradient" x1="0%" y1="0%" x2="100%" y2="0%">
            <stop offset="0%" stopColor="#06b6d4" />
            <stop offset="100%" stopColor="#8b5cf6" />
          </linearGradient>
          <filter id="glow">
            <feGaussianBlur stdDeviation="3" result="blur" />
            <feComposite in="SourceGraphic" in2="blur" operator="over" />
          </filter>
        </defs>

        {/* Connections */}
        {NEURAL_CONNECTIONS.map((conn, i) => {
          const moodPos = MOOD_POSITIONS[conn.from];
          const foodNode = FOOD_NODES.find(f => f.id === conn.to);
          if (!moodPos || !foodNode) return null;

          const x1 = moodPos.x * w;
          const y1 = moodPos.y * h;
          const x2 = foodNode.x * w;
          const y2 = foodNode.y * h;
          const midX = (x1 + x2) / 2;
          const midY = (y1 + y2) / 2 - 20;

          const isHighlighted = hoveredNode === conn.from || hoveredNode === conn.to;

          return (
            <motion.path
              key={`${conn.from}-${conn.to}`}
              d={`M ${x1} ${y1} Q ${midX} ${midY} ${x2} ${y2}`}
              fill="none"
              stroke={MOODS.find(m => m.id === conn.from)?.color || '#06b6d4'}
              strokeWidth={isHighlighted ? conn.strength * 3 : conn.strength * 1.5}
              strokeOpacity={isHighlighted ? 0.8 : 0.15}
              className={isHighlighted ? '' : 'neural-pulse'}
              initial={{ pathLength: 0, opacity: 0 }}
              animate={{ pathLength: 1, opacity: 1 }}
              transition={{ duration: 1.5, delay: i * 0.1 }}
              style={{ filter: isHighlighted ? 'url(#glow)' : 'none' }}
            />
          );
        })}

        {/* Mood Nodes (Left Side) */}
        {MOODS.map((mood) => {
          const pos = MOOD_POSITIONS[mood.id];
          if (!pos) return null;
          const cx = pos.x * w;
          const cy = pos.y * h;
          const isHovered = hoveredNode === mood.id;

          return (
            <g
              key={mood.id}
              onMouseEnter={() => setHoveredNode(mood.id)}
              onMouseLeave={() => setHoveredNode(null)}
              className="cursor-pointer"
            >
              <motion.circle
                cx={cx}
                cy={cy}
                r={isHovered ? 22 : 18}
                fill={`${mood.color}20`}
                stroke={mood.color}
                strokeWidth={isHovered ? 2 : 1}
                initial={{ scale: 0 }}
                animate={{ scale: 1 }}
                transition={{ type: 'spring', delay: 0.3 }}
              />
              {isHovered && (
                <circle
                  cx={cx}
                  cy={cy}
                  r={30}
                  fill="none"
                  stroke={mood.color}
                  strokeWidth={0.5}
                  strokeOpacity={0.3}
                />
              )}
              <text
                x={cx}
                y={cy + 1}
                textAnchor="middle"
                dominantBaseline="central"
                fontSize="14"
                className="pointer-events-none"
              >
                {mood.emoji}
              </text>
              <text
                x={cx}
                y={cy + 32}
                textAnchor="middle"
                fontSize="9"
                fill={isHovered ? mood.color : 'rgba(255,255,255,0.4)'}
                className="pointer-events-none font-medium transition-all"
              >
                {mood.label}
              </text>
            </g>
          );
        })}

        {/* Food Nodes (Right Side) */}
        {FOOD_NODES.map((food) => {
          const cx = food.x * w;
          const cy = food.y * h;
          const isHovered = hoveredNode === food.id;

          return (
            <g
              key={food.id}
              onMouseEnter={() => setHoveredNode(food.id)}
              onMouseLeave={() => setHoveredNode(null)}
              className="cursor-pointer"
            >
              <motion.circle
                cx={cx}
                cy={cy}
                r={isHovered ? 22 : 18}
                fill="rgba(255,255,255,0.03)"
                stroke={isHovered ? '#06b6d4' : 'rgba(255,255,255,0.1)'}
                strokeWidth={isHovered ? 2 : 1}
                initial={{ scale: 0 }}
                animate={{ scale: 1 }}
                transition={{ type: 'spring', delay: 0.5 }}
              />
              <text
                x={cx}
                y={cy + 1}
                textAnchor="middle"
                dominantBaseline="central"
                fontSize="14"
                className="pointer-events-none"
              >
                {food.emoji}
              </text>
              <text
                x={cx}
                y={cy + 32}
                textAnchor="middle"
                fontSize="9"
                fill={isHovered ? '#06b6d4' : 'rgba(255,255,255,0.4)'}
                className="pointer-events-none font-medium"
              >
                {food.id}
              </text>
            </g>
          );
        })}

        {/* Labels */}
        <text x={w * 0.1} y={20} textAnchor="middle" fontSize="11" fill="rgba(255,255,255,0.3)" className="font-display">
          EMOTIONS
        </text>
        <text x={w * 0.85} y={20} textAnchor="middle" fontSize="11" fill="rgba(255,255,255,0.3)" className="font-display">
          FOOD PATTERNS
        </text>
      </svg>
    </div>
  );
}
