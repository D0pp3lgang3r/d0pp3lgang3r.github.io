'use client';

import { useEffect, useRef } from 'react';

interface RainDrop {
  x: number;
  y: number;
  length: number;
  speed: number;
  opacity: number;
  width: number;
}

export default function RainCanvas() {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    const resize = () => {
      canvas.width = window.innerWidth;
      canvas.height = window.innerHeight;
    };
    resize();
    window.addEventListener('resize', resize);

    const drops: RainDrop[] = Array.from({ length: 120 }, () => ({
      x:       Math.random() * window.innerWidth,
      y:       Math.random() * window.innerHeight - window.innerHeight,
      length:  Math.random() * 60 + 20,
      speed:   Math.random() * 8 + 4,
      opacity: Math.random() * 0.35 + 0.05,
      width:   Math.random() < 0.15 ? 1.5 : 0.8,
    }));

    let animId: number;

    const draw = () => {
      ctx.clearRect(0, 0, canvas.width, canvas.height);

      drops.forEach(drop => {
        const gradient = ctx.createLinearGradient(drop.x, drop.y, drop.x, drop.y + drop.length);
        gradient.addColorStop(0, `rgba(124,58,237,0)`);
        gradient.addColorStop(0.5, `rgba(167,139,250,${drop.opacity})`);
        gradient.addColorStop(1, `rgba(196,181,253,${drop.opacity * 0.5})`);

        ctx.beginPath();
        ctx.moveTo(drop.x, drop.y);
        ctx.lineTo(drop.x - 1, drop.y + drop.length);
        ctx.strokeStyle = gradient;
        ctx.lineWidth = drop.width;
        ctx.stroke();

        drop.y += drop.speed;
        if (drop.y > canvas.height + drop.length) {
          drop.y = -drop.length - Math.random() * 200;
          drop.x = Math.random() * canvas.width;
          drop.speed = Math.random() * 8 + 4;
          drop.opacity = Math.random() * 0.35 + 0.05;
        }
      });

      animId = requestAnimationFrame(draw);
    };

    draw();

    return () => {
      cancelAnimationFrame(animId);
      window.removeEventListener('resize', resize);
    };
  }, []);

  return (
    <canvas
      ref={canvasRef}
      style={{
        position: 'fixed',
        top: 0, left: 0, right: 0, bottom: 0,
        zIndex: 0,
        pointerEvents: 'none',
        opacity: 0.7,
      }}
    />
  );
}
