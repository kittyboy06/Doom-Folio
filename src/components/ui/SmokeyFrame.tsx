import React, { useEffect, useRef } from 'react';
import clsx from 'clsx';
import { useReducedMotion } from '../../hooks/useReducedMotion';

interface SmokeyFrameProps {
  children: React.ReactNode;
  className?: string;
  glowColor?: string;
  smokeIntensity?: number;
}

export const SmokeyFrame: React.FC<SmokeyFrameProps> = ({
  children,
  className,
  glowColor = '#62D58A',
  smokeIntensity = 1,
}) => {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const containerRef = useRef<HTMLDivElement>(null);
  const mousePos = useRef({ x: 0.5, y: 0.5 });
  const prefersReducedMotion = useReducedMotion();

  useEffect(() => {
    if (prefersReducedMotion) return;

    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    let animationFrameId: number;
    let isVisible = true;
    let time = 0;

    // Resize canvas with pixel ratio
    const updateSize = () => {
      const rect = canvas.getBoundingClientRect();
      const dpr = Math.min(window.devicePixelRatio || 1, 1.5);
      canvas.width = rect.width * dpr;
      canvas.height = rect.height * dpr;
      ctx.scale(dpr, dpr);
    };

    updateSize();
    window.addEventListener('resize', updateSize);

    // Pause when off-screen
    const observer = new IntersectionObserver(([entry]) => {
      isVisible = entry.isIntersecting;
    });
    if (containerRef.current) observer.observe(containerRef.current);

    // Mouse movement inside container
    const handleMouseMove = (e: MouseEvent) => {
      const rect = canvas.getBoundingClientRect();
      mousePos.current = {
        x: (e.clientX - rect.left) / rect.width,
        y: (e.clientY - rect.top) / rect.height,
      };
    };

    const container = containerRef.current;
    if (container) container.addEventListener('mousemove', handleMouseMove);

    // Render loop
    const render = () => {
      if (isVisible) {
        time += 0.015 * smokeIntensity;
        const width = canvas.width / (Math.min(window.devicePixelRatio || 1, 1.5));
        const height = canvas.height / (Math.min(window.devicePixelRatio || 1, 1.5));

        ctx.clearRect(0, 0, width, height);

        // Draw multiple smoky perimeter waves
        const waves = 4;
        for (let i = 0; i < waves; i++) {
          ctx.save();
          const alpha = (0.12 - i * 0.02) * smokeIntensity;
          ctx.strokeStyle = i % 2 === 0 ? glowColor : '#173D28';
          ctx.lineWidth = 3 + i * 2.5;
          ctx.filter = `blur(${8 + i * 4}px)`;
          ctx.globalAlpha = alpha;

          ctx.beginPath();
          const borderOffset = 10 + i * 4;
          const segments = 24;

          // Top edge
          for (let s = 0; s <= segments; s++) {
            const x = borderOffset + (s / segments) * (width - borderOffset * 2);
            const distFromMouse = Math.hypot(x / width - mousePos.current.x, borderOffset / height - mousePos.current.y);
            const mousePush = Math.max(0, 1 - distFromMouse * 3) * 12;
            const waveY = borderOffset + Math.sin(time * 2 + s * 0.4 + i) * 6 + mousePush;
            if (s === 0) ctx.moveTo(x, waveY);
            else ctx.lineTo(x, waveY);
          }

          // Right edge
          for (let s = 0; s <= segments; s++) {
            const y = borderOffset + (s / segments) * (height - borderOffset * 2);
            const waveX = width - borderOffset + Math.cos(time * 1.8 + s * 0.4 + i) * 6;
            ctx.lineTo(waveX, y);
          }

          // Bottom edge
          for (let s = segments; s >= 0; s--) {
            const x = borderOffset + (s / segments) * (width - borderOffset * 2);
            const waveY = height - borderOffset + Math.sin(time * 2.2 + s * 0.4 + i) * 6;
            ctx.lineTo(x, waveY);
          }

          // Left edge
          for (let s = segments; s >= 0; s--) {
            const y = borderOffset + (s / segments) * (height - borderOffset * 2);
            const waveX = borderOffset + Math.cos(time * 1.6 + s * 0.4 + i) * 6;
            ctx.lineTo(waveX, y);
          }

          ctx.closePath();
          ctx.stroke();
          ctx.restore();
        }
      }

      animationFrameId = requestAnimationFrame(render);
    };

    render();

    return () => {
      cancelAnimationFrame(animationFrameId);
      window.removeEventListener('resize', updateSize);
      observer.disconnect();
      if (container) container.removeEventListener('mousemove', handleMouseMove);
    };
  }, [glowColor, smokeIntensity, prefersReducedMotion]);

  return (
    <div ref={containerRef} className={clsx('relative p-1 overflow-hidden group', className)}>
      {/* Smokey Canvas Background */}
      <canvas
        ref={canvasRef}
        className="absolute inset-0 w-full h-full pointer-events-none z-0"
      />

      {/* Atmospheric Ambient Glow */}
      <div
        className="absolute inset-0 rounded-sm pointer-events-none transition-opacity duration-500 opacity-60 group-hover:opacity-100"
        style={{
          boxShadow: `inset 0 0 30px -10px ${glowColor}40, 0 0 25px -12px ${glowColor}30`,
        }}
      />

      {/* Children content wrapper */}
      <div className="relative z-10 w-full h-full">{children}</div>
    </div>
  );
};
