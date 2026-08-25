import { useEffect, useRef, useState } from 'react';
import { motion, useScroll, useTransform } from 'framer-motion';

const SYMBOLS = [
  { text: '</>',    color: '#1d4ed8' },
  { text: 'def',    color: '#15803d' },
  { text: '{ }',    color: '#b45309' },
  { text: 'AI',     color: '#b91c1c' },
  { text: '→',      color: '#1d4ed8' },
  { text: 'SELECT', color: '#15803d' },
  { text: 'import', color: '#b45309' },
  { text: '∑',      color: '#7c3aed' },
  { text: 'const',  color: '#1d4ed8' },
  { text: 'RAG',    color: '#15803d' },
  { text: 'λ',      color: '#b45309' },
  { text: 'async',  color: '#b91c1c' },
  { text: 'LLM',    color: '#1d4ed8' },
  { text: '[]',     color: '#15803d' },
  { text: 'NaN',    color: '#b45309' },
  { text: '=>',     color: '#7c3aed' },
];

const POSITIONS = [
  { top: '8%',  left: '4%',  size: 13, delay: 0 },
  { top: '14%', left: '88%', size: 11, delay: 0.4 },
  { top: '28%', left: '6%',  size: 15, delay: 0.8 },
  { top: '22%', left: '78%', size: 12, delay: 0.2 },
  { top: '42%', left: '92%', size: 10, delay: 1.1 },
  { top: '55%', left: '3%',  size: 14, delay: 0.6 },
  { top: '65%', left: '85%', size: 11, delay: 0.3 },
  { top: '72%', left: '10%', size: 13, delay: 0.9 },
  { top: '38%', left: '50%', size: 10, delay: 1.3 },
  { top: '80%', left: '70%', size: 12, delay: 0.7 },
  { top: '88%', left: '20%', size: 11, delay: 0.5 },
  { top: '50%', left: '60%', size: 14, delay: 1.0 },
  { top: '18%', left: '40%', size: 10, delay: 1.4 },
  { top: '60%', left: '45%', size: 13, delay: 0.2 },
  { top: '33%', left: '22%', size: 11, delay: 0.8 },
  { top: '75%', left: '55%', size: 12, delay: 0.4 },
];

function FloatingSymbol({ symbol, pos, scrollY }) {
  const factor = (parseInt(pos.top) % 4 === 0 ? 1 : -1) * (0.04 + pos.delay * 0.02);
  const y = useTransform(scrollY, [0, 3000], [0, 3000 * factor]);

  return (
    <motion.span
      className="pointer-events-none absolute select-none font-mono font-bold"
      style={{
        top: pos.top,
        left: pos.left,
        fontSize: pos.size,
        color: symbol.color,
        opacity: 0.18,
        y,
        textShadow: `0 0 8px ${symbol.color}33`,
        letterSpacing: '0.05em',
      }}
      animate={{
        opacity: [0.12, 0.28, 0.12],
        scale: [1, 1.08, 1],
      }}
      transition={{
        duration: 3 + pos.delay * 2,
        delay: pos.delay,
        repeat: Infinity,
        ease: 'easeInOut',
      }}
    >
      {symbol.text}
    </motion.span>
  );
}

export default function FloatingCodeSymbols() {
  const { scrollY } = useScroll();

  return (
    <div className="pointer-events-none fixed inset-0 z-0 overflow-hidden" aria-hidden="true">
      {POSITIONS.map((pos, i) => (
        <FloatingSymbol
          key={i}
          symbol={SYMBOLS[i % SYMBOLS.length]}
          pos={pos}
          scrollY={scrollY}
        />
      ))}
    </div>
  );
}
