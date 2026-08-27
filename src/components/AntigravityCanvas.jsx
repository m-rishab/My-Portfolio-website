import { useEffect, useRef } from 'react';

// Lightweight pseudo-3D noise function for smooth fluid motion
function noise3D(x, y, z) {
  return (
    Math.sin(x + Math.sin(y + z)) * 0.4 +
    Math.sin(y + Math.sin(x - z)) * 0.3 +
    Math.sin(z + Math.sin(x + y)) * 0.3
  );
}

const COLORS = [
  '#2c64ed', // Google Blue
  '#f84242', // Google Red
  '#fbbc05', // Google Yellow
  '#34a853', // Google Green
];

export default function AntigravityCanvas() {
  const canvasRef = useRef(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    let animId;
    let particles = [];
    let width = (canvas.width = window.innerWidth);
    let height = (canvas.height = window.innerHeight);
    let dpr = window.devicePixelRatio || 1;

    // Ring target positions (for smoothing/easing)
    const ring = {
      x: width / 2,
      y: height / 2,
      targetX: width / 2,
      targetY: height / 2,
      radius: 120,
      width: 45,
      isActive: false,
    };

    // Calculate count based on screen area
    function getParticleCount() {
      const area = width * height;
      const isMobile = width < 768;
      if (isMobile) return Math.min(250, Math.max(150, Math.floor(area / 3000)));
      return Math.min(600, Math.max(350, Math.floor(area / 2500)));
    }

    function initParticles() {
      const count = getParticleCount();
      particles = [];

      for (let i = 0; i < count; i++) {
        particles.push({
          refX: Math.random() * width,
          refY: Math.random() * height,
          vx: (Math.random() - 0.5) * 0.25, // slow drift
          vy: (Math.random() - 0.5) * 0.25,
          scale: 0,
          maxScale: Math.random() * 0.6 + 0.5,
          color: COLORS[Math.floor(Math.random() * COLORS.length)],
          angleOffset: Math.random() * Math.PI * 2,
          length: Math.random() * 10 + 10, // capsule width
          thickness: Math.random() * 2 + 2.5, // capsule height
          seed: Math.random() * 100,
        });
      }
    }

    function resize() {
      width = window.innerWidth;
      height = window.innerHeight;
      dpr = window.devicePixelRatio || 1;

      canvas.width = width * dpr;
      canvas.height = height * dpr;
      canvas.style.width = `${width}px`;
      canvas.style.height = `${height}px`;

      ctx.scale(dpr, dpr);
      initParticles();
    }

    const handleMouseMove = (e) => {
      ring.targetX = e.clientX;
      ring.targetY = e.clientY;
      ring.isActive = true;
    };

    const handleMouseLeave = () => {
      ring.isActive = false;
    };

    const handleTouchMove = (e) => {
      if (e.touches && e.touches[0]) {
        ring.targetX = e.touches[0].clientX;
        ring.targetY = e.touches[0].clientY;
        ring.isActive = true;
      }
    };

    const handleTouchEnd = () => {
      ring.isActive = false;
    };

    window.addEventListener('mousemove', handleMouseMove, { passive: true });
    window.addEventListener('mouseleave', handleMouseLeave);
    window.addEventListener('touchmove', handleTouchMove, { passive: true });
    window.addEventListener('touchend', handleTouchEnd);

    let startTime = Date.now();

    // Soft cursor glow trail (history of smoothed pointer positions)
    const glowHistory = [];
    const GLOW = { life: 0.45, radius: 90, strength: 0.16 }; // seconds, px, max alpha

    function render() {
      ctx.clearRect(0, 0, width, height);

      const time = (Date.now() - startTime) * 0.001;

      // Easing ring center towards target
      // When mouse is inactive, let it drift gently in a circular path in the center of the screen
      if (!ring.isActive) {
        ring.targetX = width / 2 + Math.sin(time * 0.5) * 100;
        ring.targetY = height / 2 + Math.cos(time * 0.4) * 80;
      }

      ring.x += (ring.targetX - ring.x) * 0.06;
      ring.y += (ring.targetY - ring.y) * 0.06;

      // ── Cursor glow trail ─────────────────────────────────────
      if (ring.isActive) {
        glowHistory.push({ x: ring.x, y: ring.y, born: time });
      }
      for (let k = glowHistory.length - 1; k >= 0; k--) {
        const g = glowHistory[k];
        if (time - g.born > GLOW.life) {
          glowHistory.splice(k, 1);
          continue;
        }
        const fade = 1 - (time - g.born) / GLOW.life;
        const r = GLOW.radius * (0.7 + 0.3 * (1 - fade));
        const grad = ctx.createRadialGradient(g.x, g.y, 0, g.x, g.y, r);
        grad.addColorStop(0, `rgba(37,99,235,${GLOW.strength * fade})`);
        grad.addColorStop(1, 'rgba(37,99,235,0)');
        ctx.fillStyle = grad;
        ctx.fillRect(g.x - r, g.y - r, r * 2, r * 2);
      }

      // Ring radius breathing effect
      const currentRadius = ring.radius + Math.sin(time * 1.5) * 6 + Math.cos(time * 3.0) * 3;

      for (let i = 0; i < particles.length; i++) {
        const p = particles[i];

        // 1. Slow drift
        p.refX += p.vx;
        p.refY += p.vy;

        // Wrap around screen boundaries
        if (p.refX < -50) p.refX = width + 50;
        else if (p.refX > width + 50) p.refX = -50;
        if (p.refY < -50) p.refY = height + 50;
        else if (p.refY > height + 50) p.refY = -50;

        // 2. Physics & displacements
        // Distance to the eased ring center
        const dx = p.refX - ring.x;
        const dy = p.refY - ring.y;
        const dist = Math.sqrt(dx * dx + dy * dy);

        // Target scale based on proximity to the ring boundary (Gaussian filter)
        const targetScale = Math.exp(-Math.pow(dist - currentRadius, 2) / (2 * Math.pow(ring.width, 2)));

        // Smoothly interpolate current scale
        p.scale += (targetScale - p.scale) * 0.08;

        // If scale is practically zero, skip rendering
        if (p.scale < 0.015) continue;

        // 3. Fluid noise displacement
        const nX = noise3D(p.refX * 0.003 + p.seed, p.refY * 0.003, time * 0.5) * 22;
        const nY = noise3D(p.refX * 0.003, p.refY * 0.003 + p.seed, time * 0.5) * 22;

        // Push away/pull force near the ring
        const angle = Math.atan2(dy, dx);
        const ringPush = p.scale * 18;
        const pushX = Math.cos(angle) * ringPush;
        const pushY = Math.sin(angle) * ringPush;

        // Final positions
        const renderX = p.refX + nX + pushX;
        const renderY = p.refY + nY + pushY;

        // 4. Render rotated capsule
        ctx.save();
        ctx.translate(renderX, renderY);
        // Rotate along the ring radius direction plus some noise rotation
        const noiseRot = noise3D(p.refX * 0.01, p.refY * 0.01, time * 0.3) * 0.6;
        ctx.rotate(angle + Math.PI / 2 + noiseRot);

        const currentScale = p.scale * p.maxScale;
        ctx.scale(currentScale, currentScale);

        // Subtle alpha fade based on scale
        ctx.globalAlpha = Math.min(1.0, currentScale * 1.5);

        ctx.beginPath();
        // Draw capsule (rounded rectangle)
        ctx.roundRect(-p.length / 2, -p.thickness / 2, p.length, p.thickness, p.thickness / 2);
        ctx.fillStyle = p.color;
        ctx.fill();

        ctx.restore();
      }

      animId = requestAnimationFrame(render);
    }

    resize();
    render();

    window.addEventListener('resize', resize);

    return () => {
      cancelAnimationFrame(animId);
      window.removeEventListener('resize', resize);
      window.removeEventListener('mousemove', handleMouseMove);
      window.removeEventListener('mouseleave', handleMouseLeave);
      window.removeEventListener('touchmove', handleTouchMove);
      window.removeEventListener('touchend', handleTouchEnd);
    };
  }, []);

  return (
    <canvas
      ref={canvasRef}
      className="pointer-events-none fixed inset-0 z-0 h-full w-full"
      style={{ opacity: 0.85 }}
      aria-hidden="true"
    />
  );
}
