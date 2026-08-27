import { useEffect, useRef } from 'react';

/*
 * Minimal scattered-dots background.
 *
 * A field of tiny gray/slate dots spread evenly across the whole viewport
 * (no ring / no center cluster). They drift very slowly in an organic,
 * noise-driven way, and softly part away from the cursor (spring return),
 * keeping the page airy and the content readable.
 *
 * Implemented as a single full-viewport Canvas 2D layer — no DOM particles.
 */

// Smooth pseudo-noise for organic, non-repeating drift
function noise2D(x, y, z) {
  return (
    Math.sin(x * 1.3 + Math.sin(y * 0.9 + z)) * 0.5 +
    Math.sin(y * 1.1 + Math.sin(x - z)) * 0.4 +
    Math.sin((x + y) * 0.7 + z) * 0.3
  );
}

/* Centralised, easy-to-tune settings */
const CONFIG = {
  // Density (base count scaled by viewport size)
  targetCount: 90,          // desktop base; fewer on small screens

  // Appearance
  minSize: 0.6,             // px
  maxSize: 1.6,             // px
  minAlpha: 0.06,
  maxAlpha: 0.38,
  color: [100, 116, 139],   // slate-500

  // Motion
  driftSpeed: 0.45,         // wander speed (rad-ish scale)
  driftRadius: 18,          // px — how far a dot wanders from its anchor

  // Cursor interaction
  pushRadius: 120,          // px
  pushStrength: 2.2,        // soft repulsion
  springStrength: 0.06,
  friction: 0.94,
};

const TAU = Math.PI * 2;

export default function AntigravityCanvas() {
  const canvasRef = useRef(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    const reduceMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    const finePointer = window.matchMedia('(pointer: fine)').matches;

    let width = 0;
    let height = 0;
    let dpr = 1;
    let run = true;
    let animId;
    let time = 0;
    let last = performance.now();

    // Cursor state
    const cursor = { x: -9999, y: -9999, active: false, sx: -9999, sy: -9999 };

    let particles = [];

    function countFor() {
      const area = width * height;
      const isMobile = width < 768;
      const base = isMobile ? 32 : CONFIG.targetCount;
      // scale gently with screen area so it stays clean
      return Math.max(18, Math.round(base * Math.min(1.6, area / (1280 * 800))));
    }

    function build() {
      const count = countFor();
      const c = CONFIG.color;
      particles = [];
      for (let i = 0; i < count; i++) {
        const x = Math.random() * width;
        const y = Math.random() * height;
        const size = CONFIG.minSize + Math.random() * (CONFIG.maxSize - CONFIG.minSize);
        const alpha = CONFIG.minAlpha + Math.random() * (CONFIG.maxAlpha - CONFIG.minAlpha);
        // stable per-particle noise parameters
        const seed = Math.random() * 10;
        const px = Math.random() * 100 + 20; // phase offsets
        const py = Math.random() * 100 + 20;
        particles.push({
          ax: x, ay: y,    // anchor
          x, y,
          vx: 0, vy: 0,    // cursor-return velocity
          size, alpha,
          seed, px, py,
        });
      }
    }

    function resize() {
      dpr = Math.min(window.devicePixelRatio || 1, 2);
      width = window.innerWidth;
      height = window.innerHeight;
      canvas.width = Math.floor(width * dpr);
      canvas.height = Math.floor(height * dpr);
      canvas.style.width = width + 'px';
      canvas.style.height = height + 'px';
      ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
      build();
    }

    // ── Pointer ────────────────────────────────────────────
    const onMove = (e) => {
      cursor.active = true;
      cursor.x = e.clientX;
      cursor.y = e.clientY;
    };
    const onLeave = () => { cursor.active = false; };
    const onTouch = (e) => {
      if (e.touches && e.touches[0]) {
        cursor.active = true;
        cursor.x = e.touches[0].clientX;
        cursor.y = e.touches[0].clientY;
      }
    };
    const onTouchEnd = () => { cursor.active = false; };

    if (finePointer) {
      window.addEventListener('pointermove', onMove, { passive: true });
      document.documentElement.addEventListener('mouseleave', onLeave, { passive: true });
    } else {
      window.addEventListener('touchmove', onTouch, { passive: true });
      window.addEventListener('touchend', onTouchEnd, { passive: true });
    }
    window.addEventListener('resize', resize);
    const ro = new ResizeObserver(resize);
    ro.observe(canvas);

    // Frame-rate normalised spring/friction
    const STEP = 60;
    const springF = CONFIG.springStrength * STEP;
    const fricF = (dt) => Math.pow(CONFIG.friction, STEP * dt);

    // Soft cursor glow trail
    const glowHistory = [];
    const GLOW = { life: 0.5, radius: 110, strength: 0.10 };

    function render(now) {
      if (!run) return;
      const dt = Math.min(0.033, (now - last) / 1000);
      last = now;
      if (!reduceMotion) time += dt * CONFIG.driftSpeed;

      ctx.clearRect(0, 0, width, height);

      // ── Cursor glow trail (subtle) ────────────────────────
      if (cursor.active) {
        // smooth the cursor a touch for a fluid trail
        cursor.sx += (cursor.x - cursor.sx) * 0.12;
        cursor.sy += (cursor.y - cursor.sy) * 0.12;
        glowHistory.push({ x: cursor.sx, y: cursor.sy, t: time });
      }
      for (let k = glowHistory.length - 1; k >= 0; k--) {
        const g = glowHistory[k];
        if (time - g.t > GLOW.life) { glowHistory.splice(k, 1); continue; }
        const fade = 1 - (time - g.t) / GLOW.life;
        const r = GLOW.radius * (0.7 + 0.3 * (1 - fade));
        const grad = ctx.createRadialGradient(g.x, g.y, 0, g.x, g.y, r);
        grad.addColorStop(0, `rgba(${CONFIG.color[0]},${CONFIG.color[1]},${CONFIG.color[2]},${GLOW.strength * fade})`);
        grad.addColorStop(1, 'rgba(0,0,0,0)');
        ctx.fillStyle = grad;
        ctx.fillRect(g.x - r, g.y - r, r * 2, r * 2);
      }

      if (!reduceMotion) {
        const PR2 = CONFIG.pushRadius * CONFIG.pushRadius;

        for (let i = 0; i < particles.length; i++) {
          const p = particles[i];

          // Organic wander around the anchor (drift)
          const wobbleX = noise2D(p.ax * 0.004 + p.px, p.ay * 0.004, time) * CONFIG.driftRadius;
          const wobbleY = noise2D(p.ax * 0.004, p.ay * 0.004 + p.py, time) * CONFIG.driftRadius;
          const wanderX = p.ax + wobbleX;
          const wanderY = p.ay + wobbleY;

          // Cursor gently parts the dots
          if (cursor.active) {
            const dx = p.x - cursor.x;
            const dy = p.y - cursor.y;
            const d2 = dx * dx + dy * dy;
            if (d2 < PR2 && d2 > 0.0001) {
              const d = Math.sqrt(d2);
              const falloff = Math.pow(1 - d / CONFIG.pushRadius, 1.4);
              const s = CONFIG.pushStrength * falloff * dt * STEP;
              p.vx += (dx / d) * s;
              p.vy += (dy / d) * s;
            }
          }

          // Spring toward the wandering anchor + friction
          p.vx += (wanderX - p.x) * springF * dt;
          p.vy += (wanderY - p.y) * springF * dt;
          p.vx *= fricF(dt);
          p.vy *= fricF(dt);
          p.x += p.vx;
          p.y += p.vy;

          ctx.globalAlpha = p.alpha;
          ctx.fillStyle = `rgb(${CONFIG.color[0]},${CONFIG.color[1]},${CONFIG.color[2]})`;
          ctx.beginPath();
          ctx.arc(p.x, p.y, p.size, 0, TAU);
          ctx.fill();
        }
      } else {
        // Reduced motion: static dots at anchor
        for (let i = 0; i < particles.length; i++) {
          const p = particles[i];
          ctx.globalAlpha = p.alpha;
          ctx.fillStyle = `rgb(${CONFIG.color[0]},${CONFIG.color[1]},${CONFIG.color[2]})`;
          ctx.beginPath();
          ctx.arc(p.ax, p.ay, p.size, 0, TAU);
          ctx.fill();
        }
      }

      ctx.globalAlpha = 1;
      animId = requestAnimationFrame(render);
    }

    resize();
    last = performance.now();
    animId = requestAnimationFrame(render);

    return () => {
      run = false;
      cancelAnimationFrame(animId);
      window.removeEventListener('pointermove', onMove);
      document.documentElement.removeEventListener('mouseleave', onLeave);
      window.removeEventListener('touchmove', onTouch);
      window.removeEventListener('touchend', onTouchEnd);
      window.removeEventListener('resize', resize);
      ro.disconnect();
    };
  }, []);

  return (
    <canvas
      ref={canvasRef}
      className="pointer-events-none fixed inset-0 z-0 h-full w-full"
      style={{ opacity: 1 }}
      aria-hidden="true"
    />
  );
}
