import { useEffect } from 'react';
import { useTheme } from '../context/ThemeContext';
import { initSmoothScroll, destroySmoothScroll } from '../lib/scroll';

export default function SmoothScroll() {
  const { reduceMotion } = useTheme();

  useEffect(() => {
    initSmoothScroll({ reduced: reduceMotion });
    return () => destroySmoothScroll();
  }, [reduceMotion]);

  return null;
}