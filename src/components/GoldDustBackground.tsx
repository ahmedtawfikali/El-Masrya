import React, { useEffect, useRef } from 'react';

export const GoldDustBackground: React.FC = () => {
  const canvasRef = useRef<HTMLCanvasElement | null>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    // Respect user's motion preferences
    if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) {
      return;
    }

    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    let animationFrameId: number;
    let width = (canvas.width = window.innerWidth);
    let height = (canvas.height = window.innerHeight);

    const handleResize = () => {
      if (!canvas) return;
      width = canvas.width = window.innerWidth;
      height = canvas.height = window.innerHeight;
    };
    window.addEventListener('resize', handleResize);

    // Particle pool
    const particleCount = Math.min(65, Math.floor(width / 22));
    const particles: Array<{
      x: number;
      y: number;
      radius: number;
      alpha: number;
      speedY: number;
      speedX: number;
      pulseSpeed: number;
      hue: number;
    }> = [];

    for (let i = 0; i < particleCount; i++) {
      particles.push({
        x: Math.random() * width,
        y: Math.random() * height,
        radius: Math.random() * 2.2 + 0.6,
        alpha: Math.random() * 0.7 + 0.2,
        speedY: -(Math.random() * 0.45 + 0.15),
        speedX: (Math.random() - 0.5) * 0.35,
        pulseSpeed: Math.random() * 0.02 + 0.008,
        hue: Math.random() > 0.85 ? 200 : 42, // predominantly gold (42), occasional electric blue (200)
      });
    }

    let tick = 0;

    const render = () => {
      tick++;
      ctx.clearRect(0, 0, width, height);

      // Draw each floating particle
      for (let i = 0; i < particles.length; i++) {
        const p = particles[i];

        // Animate
        p.y += p.speedY;
        p.x += p.speedX;
        p.alpha += Math.sin(tick * p.pulseSpeed) * 0.008;

        // Wrap around bounds
        if (p.y < -10) {
          p.y = height + 10;
          p.x = Math.random() * width;
        }
        if (p.x < -10) p.x = width + 10;
        if (p.x > width + 10) p.x = -10;

        const currentAlpha = Math.max(0.1, Math.min(0.9, p.alpha));

        ctx.beginPath();
        ctx.arc(p.x, p.y, p.radius, 0, Math.PI * 2);

        if (p.hue === 42) {
          // Gold particle
          ctx.fillStyle = `rgba(247, 215, 116, ${currentAlpha})`;
          ctx.shadowColor = 'rgba(212, 160, 23, 0.8)';
          ctx.shadowBlur = p.radius * 4;
        } else {
          // Electric blue spark
          ctx.fillStyle = `rgba(43, 168, 255, ${currentAlpha})`;
          ctx.shadowColor = 'rgba(43, 168, 255, 0.8)';
          ctx.shadowBlur = p.radius * 5;
        }

        ctx.fill();
      }

      animationFrameId = requestAnimationFrame(render);
    };

    render();

    return () => {
      window.removeEventListener('resize', handleResize);
      cancelAnimationFrame(animationFrameId);
    };
  }, []);

  return (
    <canvas
      ref={canvasRef}
      className="pointer-events-none fixed inset-0 z-0 opacity-70"
      style={{ mixBlendMode: 'screen' }}
      aria-hidden="true"
    />
  );
};
