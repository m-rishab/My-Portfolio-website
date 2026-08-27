import { useEffect, useRef, useState } from 'react';
import * as THREE from 'three';

export default function VantaBackground() {
  const containerRef = useRef(null);
  const [isVisible, setIsVisible] = useState(true);

  // Pause when scrolled far off-screen (cheap, it's a fixed bg but keep consistent)
  useEffect(() => {
    const container = containerRef.current;
    if (!container) return undefined;
    const observer = new IntersectionObserver(
      ([entry]) => setIsVisible(entry.isIntersecting),
      { threshold: 0.01 }
    );
    observer.observe(container);
    return () => observer.disconnect();
  }, []);

  useEffect(() => {
    const container = containerRef.current;
    if (!container) return undefined;

    let effect = null;
    let cancelled = false;

    // Vanta FOG build expects a global THREE — set it before the dynamic import runs.
    window.THREE = THREE;

    (async () => {
      try {
        const { default: FOG } = await import('vanta/dist/vanta.fog.min.js');

        if (cancelled || !containerRef.current) return;

        // Light / white fog that fits the clean portfolio aesthetic.
        effect = FOG({
          el: containerRef.current,
          mouseControls: true,
          touchControls: true,
          gyroControls: false,
          minHeight: 200.0,
          minWidth: 200.0,
          baseColor: 0xf8fafc,
          midtoneColor: 0xb9cdf5,
          lowlightColor: 0xffffff,
          highlightColor: 0x9dbdf7,
          scaleMobile: 1.0,
        });

        // FOG builds sidebar controls automatically unless suppressed.
        const controls = containerRef.current.querySelector('.vanta-canvas');
        const sidebar = containerRef.current.parentElement?.querySelector('div');
        // Defence-in-depth: any floating vanta UI gets hidden.
        const veil = document.createElement('style');
        veil.textContent = '.vnt-controls, #vanta-window { display: none !important; }';
        document.head.appendChild(veil);
      } catch (err) {
        if (!cancelled) console.error('Vanta FOG failed to init', err);
      }
    })();

    const onVisibility = () => {
      if (effect?.setOptions) {
        effect.setOptions({ mouseControls: document.visibilityState === 'visible' });
      }
    };
    document.addEventListener('visibilitychange', onVisibility);

    return () => {
      cancelled = true;
      document.removeEventListener('visibilitychange', onVisibility);
      if (effect?.destroy) effect.destroy();
      effect = null;
    };
  }, [isVisible]);

  return (
    <div ref={containerRef} className="fixed inset-0 -z-50 h-full w-full overflow-hidden" aria-hidden="true" />
  );
}
