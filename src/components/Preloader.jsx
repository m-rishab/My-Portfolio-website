import { useEffect, useRef, useState, useCallback } from 'react';
import { profile } from '../data/portfolio';
import { useTheme } from '../context/ThemeContext';

export default function Preloader({ onComplete }) {
  const [visible, setVisible] = useState(true);
  const [progress, setProgress] = useState(0);
  const startRef = useRef(null);
  const { reduceMotion } = useTheme();

  useEffect(() => {
    if (reduceMotion) {
      setProgress(100);
      const t = setTimeout(() => {
        setVisible(false);
        onComplete();
      }, 50);
      return () => clearTimeout(t);
    }

    startRef.current = performance.now();
    const DURATION = 1150;
    let raf;
    const tick = (now) => {
      const elapsed = now - startRef.current;
      const t = Math.min(elapsed / DURATION, 1);
      const eased = 1 - Math.pow(1 - t, 3);
      setProgress(Math.round(eased * 100));
      if (t < 1) {
        raf = requestAnimationFrame(tick);
      } else {
        setTimeout(() => {
          setVisible(false);
        }, 350);
        setTimeout(() => onComplete(), 350);
      }
    };
    raf = requestAnimationFrame(tick);
    return () => cancelAnimationFrame(raf);
  }, [reduceMotion, onComplete]);

  return (
    <div
      className={`fixed inset-0 z-[200] flex flex-col justify-between bg-charcoal transition-transform duration-[850ms] ease-[cubic-bezier(.76,0,.24,1)] ${
        visible ? 'translate-y-0' : '-translate-y-full'
      }`}
      aria-hidden={!visible}
    >
      <p className="p-6 sm:p-8 font-mono text-xs uppercase tracking-[0.3em] text-muted-dark">
        {profile.name} — Portfolio
      </p>
      <p
        className="px-6 sm:px-8 pb-6 sm:pb-8 text-right font-display font-extrabold preloader-counter text-[clamp(3.5rem,12vw,9rem)] leading-none"
      >
        {progress}
        <span className="text-[0.35em] align-baseline">%</span>
      </p>
    </div>
  );
}