import { useEffect, useRef } from 'react';

const CODE_TOKENS = [
  'const', 'async', 'await', 'import', 'export', 'return',
  'function', 'class', '=>', '{}', '[]', '()', '&&', '||',
  'useState', 'useEffect', 'null', 'true', 'false', '.map()',
  'def ', 'print()', 'SELECT', 'FROM', 'WHERE', 'JOIN',
  'pandas', 'numpy', 'sklearn', 'torch', 'if __name__',
  '0x1A3F', 'NaN', 'AI', 'ML', 'RAG', 'LLM', '∑', 'λ',
  '<div>', '</div>', 'npm run', 'git push', 'pip install',
];

export default function CodeRainCanvas() {
  const canvasRef = useRef(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');

    let animId;
    let cols = [];

    function resize() {
      canvas.width = window.innerWidth;
      canvas.height = window.innerHeight;
      init();
    }

    function init() {
      const colWidth = 22;
      const numCols = Math.ceil(canvas.width / colWidth);
      cols = Array.from({ length: numCols }, () => ({
        x: 0,
        y: Math.random() * -canvas.height,
        speed: 0.4 + Math.random() * 0.7,
        token: CODE_TOKENS[Math.floor(Math.random() * CODE_TOKENS.length)],
        opacity: 0.10 + Math.random() * 0.18,
        size: 10 + Math.random() * 4,
        color: pickColor(),
      }));
      cols.forEach((col, i) => {
        col.x = i * colWidth + Math.random() * 8 - 4;
      });
    }

    function pickColor() {
      // Darker, higher-contrast colors for light background
      const colors = [
        'rgba(29,78,216,',   // blue-700
        'rgba(21,128,61,',   // green-700
        'rgba(180,83,9,',    // amber-700
        'rgba(185,28,28,',   // red-700
        'rgba(109,40,217,',  // violet-700
      ];
      return colors[Math.floor(Math.random() * colors.length)];
    }

    function draw() {
      ctx.clearRect(0, 0, canvas.width, canvas.height);

      cols.forEach((col) => {
        col.y += col.speed;
        if (col.y > canvas.height + 40) {
          col.y = Math.random() * -200;
          col.token = CODE_TOKENS[Math.floor(Math.random() * CODE_TOKENS.length)];
          col.opacity = 0.10 + Math.random() * 0.18;
          col.color = pickColor();
        }

        ctx.globalAlpha = col.opacity;
        ctx.fillStyle = `${col.color}1)`;
        ctx.font = `${col.size}px 'JetBrains Mono', 'Fira Code', monospace`;
        ctx.fillText(col.token, col.x, col.y);
      });

      ctx.globalAlpha = 1;
      animId = requestAnimationFrame(draw);
    }

    resize();
    draw();

    const ro = new ResizeObserver(resize);
    ro.observe(canvas);

    return () => {
      cancelAnimationFrame(animId);
      ro.disconnect();
    };
  }, []);

  return (
    <canvas
      ref={canvasRef}
      className="pointer-events-none fixed inset-0 z-0"
      style={{ opacity: 1 }}
      aria-hidden="true"
    />
  );
}
