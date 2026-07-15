'use client';

import { useEffect, useRef } from 'react';

export function CursorGlow() {
  const glowRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const glow = glowRef.current;
    if (!glow) return;

    let animFrame: number;
    let mouseX = 0;
    let mouseY = 0;
    let currentX = 0;
    let currentY = 0;

    const handleMouseMove = (e: MouseEvent) => {
      mouseX = e.clientX;
      mouseY = e.clientY;
    };

    const animate = () => {
      currentX += (mouseX - currentX) * 0.15;
      currentY += (mouseY - currentY) * 0.15;
      glow.style.transform = `translate(${currentX - 200}px, ${currentY - 200}px)`;
      animFrame = requestAnimationFrame(animate);
    };

    window.addEventListener('mousemove', handleMouseMove, { passive: true });
    animFrame = requestAnimationFrame(animate);

    return () => {
      window.removeEventListener('mousemove', handleMouseMove);
      cancelAnimationFrame(animFrame);
    };
  }, []);

  return (
    <div
      ref={glowRef}
      className="pointer-events-none fixed top-0 left-0 z-[1] w-[400px] h-[400px] rounded-full opacity-0 transition-opacity duration-500 hidden lg:block"
      style={{
        background: 'radial-gradient(circle, color-mix(in oklab, var(--primary) 8%, transparent) 0%, transparent 70%)',
      }}
      onMouseEnter={(e) => {
        (e.currentTarget as HTMLElement).style.opacity = '1';
      }}
    />
  );
}

export function CursorGlowProvider({ children }: { children: React.ReactNode }) {
  return (
    <>
      <CursorGlow />
      <div
        onMouseEnter={(e) => {
          const glow = e.currentTarget.parentElement?.querySelector('[class*="pointer-events-none fixed"]') as HTMLElement;
          if (glow) glow.style.opacity = '1';
        }}
        onMouseLeave={(e) => {
          const glow = e.currentTarget.parentElement?.querySelector('[class*="pointer-events-none fixed"]') as HTMLElement;
          if (glow) glow.style.opacity = '0';
        }}
      >
        {children}
      </div>
    </>
  );
}
