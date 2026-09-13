import { useEffect, useRef } from 'react';
import { useTheme } from '../context/ThemeContext';

export default function CustomCursor() {
  const dotRef = useRef(null);
  const ringRef = useRef(null);
  const badgeRef = useRef(null);
  const mouseRef = useRef({ x: 0, y: 0 });
  const ringPosRef = useRef({ x: 0, y: 0 });
  const rafRef = useRef(null);
  const lastTargetRef = useRef(null);
  const { reduceMotion } = useTheme();

  useEffect(() => {
    const finePointer = window.matchMedia('(hover: hover) and (pointer: fine)').matches;
    if (!finePointer || reduceMotion) return undefined;

    document.documentElement.classList.add('custom-cursor-active');

    const onMove = (e) => {
      mouseRef.current.x = e.clientX;
      mouseRef.current.y = e.clientY;
      const dot = dotRef.current;
      if (dot) {
        dot.style.transform = `translate(${e.clientX}px, ${e.clientY}px) translate(-50%, -50%)`;
      }

      const target = e.target;
      const cursorBadge = target.closest('[data-cursor]');
      const badge = badgeRef.current;
      const ring = ringRef.current;
      if (badge) {
        const label = cursorBadge ? cursorBadge.getAttribute('data-cursor') : null;
        if (label) {
          ring.dataset.badge = label;
          badge.textContent = label;
          lastTargetRef.current = null;
        } else if (ring.dataset.badge) {
          delete ring.dataset.badge;
          badge.textContent = '';
        }
      }
      if (!cursorBadge && ring) {
        const interactive = target.closest(
          'a, button, [role="button"], input, select, textarea, .stack-card, .rail-dot'
        );
        if (interactive && interactive !== lastTargetRef.current) {
          ring.dataset.hover = 'true';
          lastTargetRef.current = interactive;
        } else if (!interactive && lastTargetRef.current) {
          ring.dataset.hover = 'false';
          lastTargetRef.current = null;
        }
      }
    };

    const loop = () => {
      const ring = ringRef.current;
      if (ring) {
        const lerp = 0.16;
        const nx = mouseRef.current.x;
        const ny = mouseRef.current.y;
        ringPosRef.current.x += (nx - ringPosRef.current.x) * lerp;
        ringPosRef.current.y += (ny - ringPosRef.current.y) * lerp;
        ring.style.transform = `translate(${ringPosRef.current.x}px, ${ringPosRef.current.y}px) translate(-50%, -50%)`;
      }
      rafRef.current = requestAnimationFrame(loop);
    };

    window.addEventListener('pointermove', onMove, { passive: true });
    rafRef.current = requestAnimationFrame(loop);

    return () => {
      document.documentElement.classList.remove('custom-cursor-active');
      window.removeEventListener('pointermove', onMove);
      if (rafRef.current) cancelAnimationFrame(rafRef.current);
    };
  }, [reduceMotion]);

  return (
    <>
      <div
        ref={dotRef}
        className="fixed left-0 top-0 z-[300] pointer-events-none mix-blend-difference"
        style={{ width: 8, height: 8, borderRadius: '50%', background: '#fff' }}
        aria-hidden="true"
      />
      <div
        ref={ringRef}
        className="cursor-ring fixed left-0 top-0 z-[299] pointer-events-none mix-blend-difference border border-white/70 rounded-full transition-[width,height,background-color] duration-200"
        style={{ width: 36, height: 36, borderRadius: '50%' }}
        data-hover="false"
        aria-hidden="true"
      >
        <span ref={badgeRef} className="cursor-badge-label" />
      </div>
      <style>{`
        .custom-cursor-active * { cursor: none !important; }
        .custom-cursor-active input,
        .custom-cursor-active textarea { cursor: text !important; }
        .custom-cursor-active [data-hover="true"] {
          width: 64px !important;
          height: 64px !important;
          background: rgba(47, 92, 232, 0.08);
        }
        .custom-cursor-active [data-badge] {
          width: 74px !important;
          height: 74px !important;
          border: none;
          background: linear-gradient(110deg, #2f5ce8, #7c5af0);
          mix-blend-mode: normal;
          transition: width .25s cubic-bezier(.22,.7,.25,1), height .25s cubic-bezier(.22,.7,.25,1);
        }
        .custom-cursor-active [data-badge] .cursor-badge-label {
          opacity: 1;
          transform: translate(-50%, -50%) scale(1);
        }
        .custom-cursor-active .cursor-badge-label {
          position: absolute;
          left: 50%;
          top: 50%;
          transform: translate(-50%, -50%) scale(.6);
          opacity: 0;
          color: #fff;
          font-family: "JetBrains Mono", monospace;
          font-size: 10px;
          font-weight: 600;
          letter-spacing: .18em;
          white-space: nowrap;
          transition: opacity .2s ease, transform .2s cubic-bezier(.22,.7,.25,1);
        }
      `}</style>
    </>
  );
}