import { useEffect, useRef } from 'react';

// Palette tailored for modern light-mode portfolio with Google / AI tech accents
const NODE_COLORS = [
  { r: 37, g: 99, b: 235 },   // Blue (#2563eb)
  { r: 79, g: 70, b: 229 },   // Indigo (#4f46e5)
  { r: 2, g: 132, b: 199 },   // Sky/Cyan (#0284c7)
  { r: 16, g: 185, b: 129 },  // Emerald (#10b981)
  { r: 217, g: 119, b: 6 },   // Amber (#d97706)
];

export default function NeuralMeshCanvas() {
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

    // Track mouse coordinates
    const mouse = {
      x: -1000,
      y: -1000,
      radius: 180, // Connection radius to cursor
      isActive: false,
    };

    // Calculate particle density based on screen area
    function getParticleCount() {
      const area = width * height;
      const isMobile = width < 768;
      // Dense enough to look connected, lightweight enough for smooth 60fps
      if (isMobile) return Math.min(36, Math.max(20, Math.floor(area / 18000)));
      return Math.min(85, Math.max(45, Math.floor(area / 15000)));
    }

    function initParticles() {
      const count = getParticleCount();
      particles = [];

      for (let i = 0; i < count; i++) {
        const color = NODE_COLORS[Math.floor(Math.random() * NODE_COLORS.length)];
        const isCore = Math.random() < 0.18; // Larger "hub" neurons

        particles.push({
          x: Math.random() * width,
          y: Math.random() * height,
          vx: (Math.random() - 0.5) * (isCore ? 0.3 : 0.5),
          vy: (Math.random() - 0.5) * (isCore ? 0.3 : 0.5),
          baseRadius: isCore ? Math.random() * 2.0 + 2.8 : Math.random() * 1.4 + 1.2,
          radius: isCore ? 3.5 : 1.8,
          color,
          pulse: Math.random() * Math.PI * 2,
          pulseSpeed: 0.02 + Math.random() * 0.03,
          isCore,
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

    // Connect to mouse events
    const handleMouseMove = (e) => {
      mouse.x = e.clientX;
      mouse.y = e.clientY;
      mouse.isActive = true;
    };

    const handleMouseLeave = () => {
      mouse.isActive = false;
      mouse.x = -1000;
      mouse.y = -1000;
    };

    const handleTouchMove = (e) => {
      if (e.touches && e.touches[0]) {
        mouse.x = e.touches[0].clientX;
        mouse.y = e.touches[0].clientY;
        mouse.isActive = true;
      }
    };

    const handleTouchEnd = () => {
      mouse.isActive = false;
      mouse.x = -1000;
      mouse.y = -1000;
    };

    window.addEventListener('mousemove', handleMouseMove, { passive: true });
    window.addEventListener('mouseleave', handleMouseLeave);
    window.addEventListener('touchmove', handleTouchMove, { passive: true });
    window.addEventListener('touchend', handleTouchEnd);

    // Max distance for particle-to-particle synapses
    const maxDistance = 150;

    function render() {
      ctx.clearRect(0, 0, width, height);

      // 1. Draw subtle ambient cursor glow if active
      if (mouse.isActive) {
        const radialGlow = ctx.createRadialGradient(
          mouse.x,
          mouse.y,
          0,
          mouse.x,
          mouse.y,
          mouse.radius * 1.4
        );
        radialGlow.addColorStop(0, 'rgba(37, 99, 235, 0.08)');
        radialGlow.addColorStop(0.5, 'rgba(79, 70, 229, 0.03)');
        radialGlow.addColorStop(1, 'rgba(37, 99, 235, 0)');
        ctx.fillStyle = radialGlow;
        ctx.beginPath();
        ctx.arc(mouse.x, mouse.y, mouse.radius * 1.4, 0, Math.PI * 2);
        ctx.fill();
      }

      // 2. Update and draw connections
      const numParticles = particles.length;

      // Particle-to-Particle Synaptic Connections
      for (let i = 0; i < numParticles; i++) {
        const p1 = particles[i];

        for (let j = i + 1; j < numParticles; j++) {
          const p2 = particles[j];
          const dx = p1.x - p2.x;
          const dy = p1.y - p2.y;
          const dist = Math.sqrt(dx * dx + dy * dy);

          if (dist < maxDistance) {
            const alpha = (1 - dist / maxDistance) * 0.20;
            ctx.beginPath();
            ctx.moveTo(p1.x, p1.y);
            ctx.lineTo(p2.x, p2.y);
            // Gradient connection line between particle hues
            const grad = ctx.createLinearGradient(p1.x, p1.y, p2.x, p2.y);
            grad.addColorStop(0, `rgba(${p1.color.r}, ${p1.color.g}, ${p1.color.b}, ${alpha})`);
            grad.addColorStop(1, `rgba(${p2.color.r}, ${p2.color.g}, ${p2.color.b}, ${alpha})`);
            ctx.strokeStyle = grad;
            ctx.lineWidth = p1.isCore || p2.isCore ? 1.0 : 0.75;
            ctx.stroke();
          }
        }

        // Particle-to-Mouse Connections (Interactive Neural Synapses)
        if (mouse.isActive) {
          const mdx = p1.x - mouse.x;
          const mdy = p1.y - mouse.y;
          const mdist = Math.sqrt(mdx * mdx + mdy * mdy);

          if (mdist < mouse.radius) {
            const mouseAlpha = (1 - mdist / mouse.radius) * 0.5;
            ctx.beginPath();
            ctx.moveTo(p1.x, p1.y);
            ctx.lineTo(mouse.x, mouse.y);
            ctx.strokeStyle = `rgba(${p1.color.r}, ${p1.color.g}, ${p1.color.b}, ${mouseAlpha})`;
            ctx.lineWidth = 1.3;
            ctx.stroke();

            // Subtle gentle attraction pull towards mouse
            p1.x -= (mdx / mdist) * 0.35;
            p1.y -= (mdy / mdist) * 0.35;
          }
        }
      }

      // 3. Draw Nodes (Neurons)
      for (let i = 0; i < numParticles; i++) {
        const p = particles[i];

        // Move particle
        p.x += p.vx;
        p.y += p.vy;

        // Wrap around boundaries
        if (p.x < -20) p.x = width + 20;
        else if (p.x > width + 20) p.x = -20;
        if (p.y < -20) p.y = height + 20;
        else if (p.y > height + 20) p.y = -20;

        // Breathing pulse
        p.pulse += p.pulseSpeed;
        const currentRadius = p.baseRadius + Math.sin(p.pulse) * 0.4;

        // Outer glow for hub neurons
        if (p.isCore) {
          ctx.beginPath();
          ctx.arc(p.x, p.y, currentRadius * 2.3, 0, Math.PI * 2);
          ctx.fillStyle = `rgba(${p.color.r}, ${p.color.g}, ${p.color.b}, 0.12)`;
          ctx.fill();
        }

        // Inner solid node
        ctx.beginPath();
        ctx.arc(p.x, p.y, currentRadius, 0, Math.PI * 2);
        ctx.fillStyle = `rgba(${p.color.r}, ${p.color.g}, ${p.color.b}, ${p.isCore ? 0.8 : 0.5})`;
        ctx.fill();
      }

      // 4. Cursor epicenter node
      if (mouse.isActive) {
        ctx.beginPath();
        ctx.arc(mouse.x, mouse.y, 3, 0, Math.PI * 2);
        ctx.fillStyle = 'rgba(37, 99, 235, 0.7)';
        ctx.fill();
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
      style={{ opacity: 1 }}
      aria-hidden="true"
    />
  );
}
