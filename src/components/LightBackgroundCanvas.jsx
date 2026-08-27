import { useEffect, useRef, useState } from 'react';

export default function LightBackgroundCanvas() {
  const canvasRef = useRef(null);
  const containerRef = useRef(null);
  const [isVisible, setIsVisible] = useState(true);

  useEffect(() => {
    const container = containerRef.current;
    if (!container) return undefined;

    const observer = new IntersectionObserver(
      ([entry]) => {
        setIsVisible(entry.isIntersecting);
      },
      { threshold: 0.01 }
    );
    observer.observe(container);

    return () => {
      observer.disconnect();
    };
  }, []);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return undefined;

    const ctx = canvas.getContext('2d');
    if (!ctx) return undefined;

    let animId;
    let width = window.innerWidth;
    let height = window.innerHeight;
    let dpr = window.devicePixelRatio || 1;
    let isTabVisible = true;

    const handleVisibilityChange = () => {
      isTabVisible = document.visibilityState === 'visible';
    };
    document.addEventListener('visibilitychange', handleVisibilityChange);

    const isMobile = width < 768;
    const blobCount = isMobile ? 3 : 5;
    const dotSpacing = isMobile ? 32 : 48;
    const dotRadius = 1;

    const blobs = [];
    const colors = [
      'rgba(26, 115, 232, 0.08)',
      'rgba(234, 67, 53, 0.05)',
      'rgba(251, 188, 5, 0.045)',
      'rgba(52, 168, 83, 0.06)',
      'rgba(161, 66, 244, 0.055)',
    ];

    for (let i = 0; i < blobCount; i++) {
      const radius = isMobile ? 120 + Math.random() * 100 : 220 + Math.random() * 180;
      blobs.push({
        x: Math.random() * width,
        y: Math.random() * height,
        vx: (Math.random() - 0.5) * (isMobile ? 0.15 : 0.3),
        vy: (Math.random() - 0.5) * (isMobile ? 0.15 : 0.3),
        radius,
        color: colors[i % colors.length],
        pulseSpeed: 0.0005 + Math.random() * 0.0005,
        pulse: Math.random() * Math.PI * 2,
      });
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
    }

    window.addEventListener('resize', resize);
    resize();

    function draw() {
      if (!isVisible || !isTabVisible) {
        animId = requestAnimationFrame(draw);
        return;
      }

      ctx.clearRect(0, 0, width, height);

      ctx.fillStyle = '#f8fafc';
      ctx.fillRect(0, 0, width, height);

      ctx.fillStyle = 'rgba(100, 116, 139, 0.04)';
      for (let x = dotSpacing / 2; x < width; x += dotSpacing) {
        for (let y = dotSpacing / 2; y < height; y += dotSpacing) {
          ctx.beginPath();
          ctx.arc(x, y, dotRadius, 0, Math.PI * 2);
          ctx.fill();
        }
      }

      ctx.globalCompositeOperation = 'multiply';
      blobs.forEach((blob) => {
        blob.x += blob.vx;
        blob.y += blob.vy;

        if (blob.x < -blob.radius) blob.x = width + blob.radius;
        else if (blob.x > width + blob.radius) blob.x = -blob.radius;
        if (blob.y < -blob.radius) blob.y = height + blob.radius;
        else if (blob.y > height + blob.radius) blob.y = -blob.radius;

        blob.pulse += blob.pulseSpeed;
        const currentRadius = blob.radius + Math.sin(blob.pulse) * 20;

        const gradient = ctx.createRadialGradient(blob.x, blob.y, 0, blob.x, blob.y, currentRadius);
        gradient.addColorStop(0, blob.color);
        gradient.addColorStop(0.5, blob.color.replace(/[\d.]+\)$/, '0.015)'));
        gradient.addColorStop(1, 'rgba(255, 255, 255, 0)');

        ctx.fillStyle = gradient;
        ctx.beginPath();
        ctx.arc(blob.x, blob.y, currentRadius, 0, Math.PI * 2);
        ctx.fill();
      });

      ctx.globalCompositeOperation = 'source-over';

      ctx.fillStyle = 'rgba(71, 85, 105, 0.025)';
      ctx.font = `italic 14px 'JetBrains Mono', monospace`;

      if (!isMobile) {
        ctx.fillText('{}', 120, height * 0.15);
        ctx.fillText('</>', width - 200, height * 0.25);
        ctx.fillText('f(x)', 150, height * 0.75);
        ctx.fillText('∑', width - 240, height * 0.8);
        ctx.fillText('λ', width * 0.45, height * 0.08);
      }

      animId = requestAnimationFrame(draw);
    }

    draw();

    return () => {
      cancelAnimationFrame(animId);
      window.removeEventListener('resize', resize);
      document.removeEventListener('visibilitychange', handleVisibilityChange);
    };
  }, [isVisible]);

  return (
    <div ref={containerRef} className="fixed inset-0 -z-50 h-full w-full select-none overflow-hidden">
      <canvas ref={canvasRef} className="block h-full w-full" aria-hidden="true" />
    </div>
  );
}
