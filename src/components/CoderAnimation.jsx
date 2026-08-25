import { motion } from 'framer-motion';

/* Scrolling code lines on the monitor screen */
const CODE_LINES = [
  { text: 'import pandas as pd', color: '#8ab4f8', indent: 0 },
  { text: 'from sklearn import *', color: '#81c995', indent: 0 },
  { text: '', color: 'transparent', indent: 0 },
  { text: 'def train_model(X, y):', color: '#fdd663', indent: 0 },
  { text: '  model = RandomForest()', color: '#8ab4f8', indent: 1 },
  { text: '  model.fit(X, y)', color: '#81c995', indent: 1 },
  { text: '  return model', color: '#f28b82', indent: 1 },
  { text: '', color: 'transparent', indent: 0 },
  { text: '# AI Rating Engine', color: '#6b7280', indent: 0 },
  { text: 'results = evaluate()', color: '#fdd663', indent: 0 },
  { text: 'print(results)', color: '#81c995', indent: 0 },
];

function MonitorScreen() {
  return (
    <g>
      {/* Screen bg */}
      <rect x="102" y="38" width="116" height="82" rx="3" fill="#0a0f1a" />

      {/* Scrolling code lines */}
      <g style={{ animation: 'codeScroll 6s linear infinite' }}>
        {CODE_LINES.map((line, i) => (
          <text
            key={i}
            x={108 + line.indent * 6}
            y={50 + i * 8.5}
            fontSize="5.2"
            fontFamily="'JetBrains Mono', monospace"
            fill={line.color}
            opacity="0.92"
          >
            {line.text}
          </text>
        ))}
        {/* Repeat for seamless loop */}
        {CODE_LINES.map((line, i) => (
          <text
            key={`r-${i}`}
            x={108 + line.indent * 6}
            y={50 + (CODE_LINES.length + i) * 8.5}
            fontSize="5.2"
            fontFamily="'JetBrains Mono', monospace"
            fill={line.color}
            opacity="0.92"
          >
            {line.text}
          </text>
        ))}
      </g>

      {/* Screen glow overlay */}
      <rect x="102" y="38" width="116" height="82" rx="3"
        fill="url(#screenGlow)" opacity="0.25" />

      {/* Blinking cursor */}
      <rect x="108" y="107" width="4" height="6" fill="#81c995"
        style={{ animation: 'cursorBlink 0.9s steps(1) infinite' }} />

      {/* Screen reflection */}
      <rect x="102" y="38" width="116" height="82" rx="3"
        fill="url(#screenReflect)" opacity="0.06" />
    </g>
  );
}

export default function CoderAnimation() {
  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.95 }}
      animate={{ opacity: 1, scale: 1 }}
      transition={{ duration: 0.8, delay: 0.5 }}
      className="w-full max-w-xs mx-auto select-none"
      aria-hidden="true"
    >
      <style>{`
        @keyframes codeScroll {
          0%   { transform: translateY(0); }
          100% { transform: translateY(-${CODE_LINES.length * 8.5}px); }
        }
        @keyframes cursorBlink {
          50% { opacity: 0; }
        }
        @keyframes bodyBob {
          0%, 100% { transform: translateY(0px); }
          50%       { transform: translateY(-1.5px); }
        }
        @keyframes handType {
          0%, 100% { transform: translateY(0px) rotate(0deg); }
          25%       { transform: translateY(1.5px) rotate(-1deg); }
          75%       { transform: translateY(0.5px) rotate(1deg); }
        }
        @keyframes eyeBlink {
          0%, 90%, 100% { transform: scaleY(1); }
          95%           { transform: scaleY(0.1); }
        }
        @keyframes floatBracket {
          0%, 100% { transform: translateY(0px) rotate(0deg); opacity: 0.18; }
          50%       { transform: translateY(-8px) rotate(8deg); opacity: 0.32; }
        }
        @keyframes monitorGlow {
          0%, 100% { opacity: 0.15; }
          50%       { opacity: 0.3; }
        }
        @keyframes screenFlicker {
          0%, 98%, 100% { opacity: 1; }
          99%            { opacity: 0.85; }
        }
      `}</style>

      <svg
        viewBox="0 0 320 240"
        xmlns="http://www.w3.org/2000/svg"
        className="w-full drop-shadow-2xl"
        style={{ animation: 'screenFlicker 8s ease-in-out infinite' }}
      >
        <defs>
          <radialGradient id="screenGlow" cx="50%" cy="50%" r="50%">
            <stop offset="0%" stopColor="#8ab4f8" stopOpacity="0.4" />
            <stop offset="100%" stopColor="#8ab4f8" stopOpacity="0" />
          </radialGradient>
          <linearGradient id="screenReflect" x1="0%" y1="0%" x2="100%" y2="100%">
            <stop offset="0%" stopColor="white" stopOpacity="0.3" />
            <stop offset="100%" stopColor="white" stopOpacity="0" />
          </linearGradient>
          <radialGradient id="deskGlow" cx="50%" cy="0%" r="80%">
            <stop offset="0%" stopColor="#8ab4f8" stopOpacity="0.12" />
            <stop offset="100%" stopColor="#8ab4f8" stopOpacity="0" />
          </radialGradient>
          <filter id="glow">
            <feGaussianBlur stdDeviation="2.5" result="coloredBlur"/>
            <feMerge><feMergeNode in="coloredBlur"/><feMergeNode in="SourceGraphic"/></feMerge>
          </filter>
          <clipPath id="screenClip">
            <rect x="102" y="38" width="116" height="82" rx="3" />
          </clipPath>
        </defs>

        {/* ── Desk glow ── */}
        <ellipse cx="160" cy="175" rx="130" ry="18" fill="url(#deskGlow)"
          style={{ animation: 'monitorGlow 3s ease-in-out infinite' }} />

        {/* ── Desk surface ── */}
        <rect x="40" y="168" width="240" height="10" rx="3" fill="#1e2535" stroke="#2d3748" strokeWidth="0.5" />
        <rect x="40" y="175" width="240" height="4" rx="0" fill="#161d2e" />

        {/* ── Monitor stand ── */}
        <rect x="152" y="122" width="16" height="46" rx="2" fill="#1a2133" stroke="#2d3748" strokeWidth="0.5" />
        <rect x="138" y="164" width="44" height="5" rx="2" fill="#1a2133" stroke="#2d3748" strokeWidth="0.5" />

        {/* ── Monitor body ── */}
        <rect x="96" y="30" width="128" height="96" rx="6" fill="#1a2133" stroke="#2d3748" strokeWidth="1" />
        <rect x="98" y="32" width="124" height="92" rx="5" fill="#111827" />

        {/* ── Monitor screen ── */}
        <clipPath id="screenClip">
          <rect x="102" y="38" width="116" height="82" rx="3" />
        </clipPath>
        <g clipPath="url(#screenClip)">
          <MonitorScreen />
        </g>

        {/* Monitor screen border glow */}
        <rect x="102" y="38" width="116" height="82" rx="3"
          fill="none" stroke="#8ab4f8" strokeWidth="0.6" opacity="0.4"
          filter="url(#glow)"
          style={{ animation: 'monitorGlow 2.5s ease-in-out infinite' }} />

        {/* ── Keyboard ── */}
        <rect x="116" y="173" width="88" height="12" rx="3" fill="#1e2535" stroke="#2d3748" strokeWidth="0.5" />
        {/* Key rows */}
        {[0,1,2].map(row =>
          Array.from({ length: 9 - row }, (_, k) => (
            <rect
              key={`${row}-${k}`}
              x={120 + k * 9 + row * 3}
              y={175 + row * 3.5}
              width="7" height="2.5"
              rx="0.8"
              fill="#252f45"
              stroke="#2d3748"
              strokeWidth="0.3"
            />
          ))
        )}

        {/* ── Chair ── */}
        {/* Chair back */}
        <rect x="116" y="148" width="42" height="52" rx="6" fill="#1a2133" stroke="#2d3748" strokeWidth="0.8" />
        <rect x="120" y="152" width="34" height="44" rx="4" fill="#111827" />
        {/* Chair seat */}
        <rect x="108" y="192" width="58" height="14" rx="5" fill="#1a2133" stroke="#2d3748" strokeWidth="0.8" />
        {/* Chair legs */}
        <line x1="118" y1="206" x2="105" y2="222" stroke="#1a2133" strokeWidth="4" strokeLinecap="round" />
        <line x1="158" y1="206" x2="171" y2="222" stroke="#1a2133" strokeWidth="4" strokeLinecap="round" />

        {/* ── Person body — bobs slightly ── */}
        <g style={{ transformOrigin: '137px 195px', animation: 'bodyBob 2.2s ease-in-out infinite' }}>
          {/* Torso */}
          <rect x="120" y="158" width="34" height="36" rx="8" fill="#2563eb" />
          {/* Collar / shirt detail */}
          <path d="M130 158 L137 168 L144 158" fill="#1d4ed8" />

          {/* Head */}
          <circle cx="137" cy="145" r="16" fill="#d4956a" />
          {/* Hair */}
          <path d="M121 140 Q124 125 137 124 Q150 125 153 140 Q148 131 137 132 Q126 131 121 140Z"
            fill="#1a1a2e" />
          {/* Glasses */}
          <g fill="none" stroke="#6b7280" strokeWidth="1.2">
            <rect x="128" y="143" width="8" height="5" rx="2" />
            <rect x="139" y="143" width="8" height="5" rx="2" />
            <line x1="136" y1="145.5" x2="139" y2="145.5" />
            <line x1="124" y1="145" x2="128" y2="145" />
            <line x1="147" y1="145" x2="151" y2="145" />
          </g>
          {/* Eyes */}
          <g style={{ transformOrigin: '137px 146px', animation: 'eyeBlink 4s ease-in-out infinite' }}>
            <circle cx="132" cy="146" r="1.5" fill="#1a1a2e" />
            <circle cx="143" cy="146" r="1.5" fill="#1a1a2e" />
          </g>
          {/* Subtle smile */}
          <path d="M133 152 Q137 155 141 152" fill="none" stroke="#b8734a" strokeWidth="1.2" strokeLinecap="round" />

          {/* Left arm — typing */}
          <g style={{ transformOrigin: '122px 170px', animation: 'handType 0.35s ease-in-out infinite' }}>
            <path d="M122 165 Q112 178 118 188" stroke="#d4956a" strokeWidth="7" strokeLinecap="round" fill="none" />
            {/* Hand */}
            <ellipse cx="117" cy="189" rx="5" ry="4" fill="#d4956a" />
          </g>

          {/* Right arm — typing (offset phase) */}
          <g style={{
            transformOrigin: '152px 170px',
            animation: 'handType 0.35s ease-in-out infinite',
            animationDelay: '0.175s',
          }}>
            <path d="M152 165 Q162 178 156 188" stroke="#d4956a" strokeWidth="7" strokeLinecap="round" fill="none" />
            <ellipse cx="157" cy="189" rx="5" ry="4" fill="#d4956a" />
          </g>
        </g>

        {/* ── Floating code symbols ── */}
        {[
          { x: 64,  y: 60,  text: '</>',  color: '#8ab4f8', delay: '0s',    dur: '3.2s' },
          { x: 248, y: 55,  text: '{ }',  color: '#81c995', delay: '0.7s',  dur: '4s'   },
          { x: 58,  y: 130, text: '===',  color: '#fdd663', delay: '1.4s',  dur: '3.6s' },
          { x: 255, y: 125, text: '=>',   color: '#f28b82', delay: '0.3s',  dur: '4.4s' },
          { x: 75,  y: 95,  text: 'AI',   color: '#8ab4f8', delay: '1.8s',  dur: '2.8s' },
          { x: 240, y: 90,  text: 'ML',   color: '#81c995', delay: '1.1s',  dur: '3.8s' },
        ].map((sym, i) => (
          <text
            key={i}
            x={sym.x}
            y={sym.y}
            fontSize="9"
            fontFamily="monospace"
            fontWeight="bold"
            fill={sym.color}
            style={{
              animation: `floatBracket ${sym.dur} ease-in-out infinite`,
              animationDelay: sym.delay,
            }}
          >
            {sym.text}
          </text>
        ))}

        {/* ── Coffee mug ── */}
        <rect x="74" y="159" width="18" height="14" rx="3" fill="#1e2535" stroke="#2d3748" strokeWidth="0.6" />
        <path d="M92 163 Q98 163 98 166 Q98 169 92 169" fill="none" stroke="#2d3748" strokeWidth="1.5" strokeLinecap="round" />
        {/* Steam */}
        <path d="M79 157 Q81 153 79 149" fill="none" stroke="#4b5563" strokeWidth="1"
          strokeLinecap="round" style={{ animation: 'floatBracket 2s ease-in-out infinite', animationDelay: '0.2s' }} />
        <path d="M84 156 Q86 151 84 147" fill="none" stroke="#4b5563" strokeWidth="1"
          strokeLinecap="round" style={{ animation: 'floatBracket 2.4s ease-in-out infinite', animationDelay: '0.6s' }} />

        {/* ── Mouse ── */}
        <rect x="212" y="171" width="14" height="10" rx="4" fill="#1e2535" stroke="#2d3748" strokeWidth="0.6" />
        <line x1="219" y1="171" x2="219" y2="181" stroke="#2d3748" strokeWidth="0.6" />

        {/* ── Floor shadow ── */}
        <ellipse cx="160" cy="228" rx="100" ry="6" fill="#000" opacity="0.25" />
      </svg>
    </motion.div>
  );
}
