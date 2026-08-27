import { useEffect, useRef, useState } from 'react';

const COLORS = [
  { r: 26, g: 115, b: 232 },
  { r: 79, g: 70, b: 229 },
  { r: 2, g: 132, b: 199 },
  { r: 16, g: 185, b: 129 },
  { r: 217, g: 119, b: 6 },
  { r: 234, g: 67, b: 53 },
];

export default function CursorReactiveCanvas() {
  const canvasRef = useRef(null);
  const containerRef = useRef(null);
  const [isVisible, setIsVisible] = useState(true);

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
    const canvas = canvasRef.current;
    if (!canvas) return undefined;

    const ctx = canvas.getContext('2d');
    if (!ctx) return undefined;

    const reduceMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;

    let animId;
    let width = window.innerWidth;
    let height = window.innerHeight;
    let dpr = window.devicePixelRatio || 1;
    let isTabVisible = true;
    let particles = [];
    let ripples = [];
    let lastTime = performance.now();

    const pointer = {
      x: -1000,
      y: -1000,
      isActive: false,
    };
    const glow = { x: -1000, y: -1000 };

    const handleVisibilityChange = () => {
      isTabVisible = document.visibilityState === 'visible';
    };
    document.addEventListener('visibilitychange', handleVisibilityChange);

    const isMobile = () => width < 768;

    function getParticleCount() {
      const area = width * height;
      if (width < 768) return Math.min(40, Math.max(22, Math.floor(area / 20000)));
      return Math.min(95, Math.max(50, Math.floor(area / 16000)));
    }

    function initParticles() {
      const count = getParticleCount();
      particles = [];
      for (let i = 0; i < count; i++) {
        const color = COLORS[Math.floor(Math.random() * COLORS.length)];
        const isCore = Math.random() < 0.16;
        particles.push({
          x: Math.random() * width,
          y: Math.random() * height,
          vx: (Math.random() - 0.5) * 0.25,
          vy: (Math.random() - 0.5) * 0.25,
          baseRadius: isCore ? 1.8 + Math.random() * 0.8 : 1.0 + Math.random() * 0.7,
          color,
          isCore,
          alpha: 0.25 + Math.random() * 0.35,
          pulse: Math.random() * Math.PI * 2,
          pulseSpeed: 0.02 + Math.random() * 0.03,
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

      ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
      initParticles();
    }

    const handlePointerMove = (e) => {
      pointer.x = e.clientX;
      pointer.y = e.clientY;
      pointer.isActive = true;
    };

    const handlePointerDown = (e) => {
      const x = e.clientX;
      const y = e.clientY;
      ripples.push({ x, y, radius: 8, maxRadius: isMobile() ? 90 : 150, speed: isMobile() ? 1.6 : 2.4, alpha: 0.5 });
    };

    const handlePointerLeave = () => {
      pointer.isActive = false;
      pointer.x = -1000;
      pointer.y = -1000;
    };

    const handleTouchMove = (e) => {
      if (e.touches && e.touches[0]) {
        pointer.x = e.touches[0].clientX;
        pointer.y = e.touches[0].clientY;
        pointer.isActive = true;
      }
    };

    const handleTouchEnd = () => {
      pointer.isActive = false;
      pointer.x = -1000;
      pointer.y = -1000;
    };

    window.addEventListener('resize', resize);
    window.addEventListener('mousemove', handlePointerMove, { passive: true });
    window.addEventListener('mousedown', handlePointerDown);
    window.addEventListener('mouseleave', handlePointerLeave);
    window.addEventListener('touchmove', handleTouchMove, { passive: true });
    window.addEventListener('touchend', handleTouchEnd);
    window.addEventListener('touchstart', handlePointerDown, { passive: true });

    resize();

    const maxDistance = 130;
    const repulsionRadius = isMobile() ? 120 : 170;
    const repulsionForce = isMobile() ? 0.35 : 0.5;

    function draw() {
      if (!reduceMotion) {
        if (!isVisible || !isTabVisible) {
          animId = requestAnimationFrame(draw);
          return;
        }
      }

      const now = performance.now();
      const dt = Math.min((now - lastTime) / 16.6667, 2.5);
      lastTime = now;

      ctx.clearRect(0, 0, width, height);
      ctx.fillStyle = '#f8fafc';
      ctx.fillRect(0, 0, width, height);

      const dotSpacing = isMobile() ? 32 : 48;
      ctx.fillStyle = 'rgba(100, 116, 139, 0.04)';
      for (let x = dotSpacing / 2; x < width; x += dotSpacing) {
        for (let y = dotSpacing / 2; y < height; y += dotSpacing) {
          ctx.beginPath();
          ctx.arc(x, y, 1, 0, Math.PI * 2);
          ctx.fill();
        }
      }

      glow.x += (pointer.x - glow.x) * 0.12;
      glow.y += (pointer.y - glow.y) * 0.12;

      if (pointer.isActive) {
        const glowRadius = 240;
        const grad = ctx.createRadialGradient(glow.x, glow.y, 0, glow.x, glow.y, glowRadius);
        grad.addColorStop(0, 'rgba(26, 115, 232, 0.09)');
        grad.addColorStop(0.45, 'rgba(26, 115, 232, 0.035)');
        grad.addColorStop(1, 'rgba(26, 115, 232, 0)');
        ctx.fillStyle = grad;
        ctx.beginPath();
        ctx.arc(glow.x, glow.y, glowRadius, 0, Math.PI * 2);
        ctx.fill();
      }

      for (let i = ripples.length - 1; i >= 0; i--) {
        const r = ripples[i];
        r.radius += r.speed * dt;
        r.alpha *= 0.96;
        if (r.alpha < 0.01 || r.radius > r.maxRadius) {
          ripples.splice(i, 1);
          continue;
        }
        ctx.beginPath();
        ctx.arc(r.x, r.y, r.radius, 0, Math.PI * 2);
        ctx.strokeStyle = `rgba(26, 115, 232, ${r.alpha})`;
        ctx.lineWidth = 1.5;
        ctx.stroke();
      }

      for (let i = 0; i < particles.length; i++) {
        const p = particles[i];

        if (pointer.isActive) {
          const dx = p.x - pointer.x;
          const dy = p.y - pointer.y;
          const dist = Math.hypot(dx, dy);
          if (dist > 0.001 && dist < repulsionRadius) {
            const force = (1 - dist / repulsionRadius) * repulsionForce * dt;
            p.vx += (dx / dist) * force;
            p.vy += (dy / dist) * force;
          }
        }

        p.vx *= 0.96;
        p.vy *= 0.96;

        p.x += p.vx * dt;
        p.y += p.vy * dt;

        if (p.x < -20) p.x = width + 20;
        else if (p.x > width + 20) p.x = -20;
        if (p.y < -20) p.y = height + 20;
        else if (p.y > height + 20) p.y = -20;
      }

      for (let i = 0; i < particles.length; i++) {
        const p1 = particles[i];
        for (let j = i + 1; j < particles.length; j++) {
          const p2 = particles[j];
          const dx = p1.x - p2.x;
          const dy = p1.y - p2.y;
          const dist = Math.hypot(dx, dy);
          if (dist < maxDistance) {
            const alpha = (1 - dist / maxDistance) * 0.09;
            ctx.beginPath();
            ctx.moveTo(p1.x, p1.y);
            ctx.lineTo(p2.x, p2.y);
            ctx.strokeStyle = `rgba(${p1.color.r}, ${p1.color.g}, ${p1.color.b}, ${alpha})`;
            ctx.lineWidth = 0.75;
            ctx.stroke();
          }
        }
      }

      for (let i = 0; i < particles.length; i++) {
        const p = particles[i];
        p.pulse += p.pulseSpeed;
        const radius = p.baseRadius + Math.sin(p.pulse) * 0.35;

        if (p.isCore) {
          ctx.beginPath();
          ctx.arc(p.x, p.y, radius * 2.2, 0, Math.PI * 2);
          ctx.fillStyle = `rgba(${p.color.r}, ${p.color.g}, ${p.color.b}, 0.1)`;
          ctx.fill();
        }

        ctx.beginPath();
        ctx.arc(p.x, p.y, radius, 0, Math.PI * 2);
        ctx.fillStyle = `rgba(${p.color.r}, ${p.color.g}, ${p.color.b}, ${p.alpha})`;
        ctx.fill();
      }

      if (!reduceMotion) {
        animId = requestAnimationFrame(draw);
      }
    }

    draw();

    return () => {
      cancelAnimationFrame(animId);
      window.removeEventListener('resize', resize);
      window.removeEventListener('mousemove', handlePointerMove);
      window.removeEventListener('mousedown', handlePointerDown);
      window.removeEventListener('mouseleave', handlePointerLeave);
      window.removeEventListener('touchmove', handleTouchMove);
      window.removeEventListener('touchend', handleTouchEnd);
      window.removeEventListener('touchstart', handlePointerDown);
      document.removeEventListener('visibilitychange', handleVisibilityChange);
    };
  }, [isVisible]);

  return (
    <div ref={containerRef} className="fixed inset-0 -z-50 h-full w-full select-none overflow-hidden">
      <canvas ref={canvasRef} className="block h-full w-full" aria-hidden="true" />
    </div>
  );
}