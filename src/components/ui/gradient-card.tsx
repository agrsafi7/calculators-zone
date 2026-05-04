'use client';

import React from 'react';
import { cn } from '@/lib/utils';

interface GradientCardProps {
  children: React.ReactNode;
  className?: string;
  /** Visual style. Defaults to 'dark'. */
  variant?: 'dark' | 'light';
  /** Render as a non-interactive container if true (no hover lift). */
  static?: boolean;
}

/**
 * Lightweight gradient card. CSS-only effects (no framer-motion, no blur filters,
 * no mousemove tilt) for smooth scrolling. Comes in dark and light variants.
 */
export const GradientCard: React.FC<GradientCardProps> = ({
  children,
  className,
  variant = 'dark',
  static: isStatic,
}) => {
  const isLight = variant === 'light';

  return (
    <div
      className={cn(
        'group/gc relative rounded-2xl overflow-hidden border transition-transform duration-200 will-change-transform',
        isLight
          ? 'bg-card border-border shadow-[0_1px_3px_rgba(0,0,0,0.04),0_8px_24px_-12px_rgba(79,70,229,0.18)] hover:shadow-[0_2px_6px_rgba(0,0,0,0.05),0_14px_32px_-12px_rgba(172,92,255,0.28)]'
          : 'border-white/5 shadow-[0_-6px_30px_2px_rgba(78,99,255,0.18),0_4px_12px_rgba(0,0,0,0.35)]',
        !isStatic && 'hover:-translate-y-0.5',
        className,
      )}
      style={
        isLight
          ? undefined
          : {
              backgroundColor: '#0e131f',
              backgroundImage:
                'linear-gradient(180deg, #000 0%, #0a0a14 70%), radial-gradient(ellipse at bottom right, rgba(172,92,255,0.45), transparent 60%), radial-gradient(ellipse at bottom left, rgba(56,189,248,0.4), transparent 60%)',
              backgroundBlendMode: 'normal, screen, screen',
            }
      }
    >
      {/* Light variant: subtle accent glow in corners (pure CSS, no blur filter) */}
      {isLight && (
        <>
          <div
            aria-hidden
            className="pointer-events-none absolute -top-16 -right-16 w-48 h-48 rounded-full opacity-60 group-hover/gc:opacity-90 transition-opacity duration-300"
            style={{
              background:
                'radial-gradient(circle, rgba(172,92,255,0.18), transparent 70%)',
            }}
          />
          <div
            aria-hidden
            className="pointer-events-none absolute -bottom-20 -left-16 w-56 h-56 rounded-full opacity-50 group-hover/gc:opacity-80 transition-opacity duration-300"
            style={{
              background:
                'radial-gradient(circle, rgba(56,189,248,0.18), transparent 70%)',
            }}
          />
          <div
            aria-hidden
            className="pointer-events-none absolute inset-x-0 bottom-0 h-px"
            style={{
              background:
                'linear-gradient(90deg, transparent, rgba(172,92,255,0.5), rgba(56,189,248,0.5), transparent)',
            }}
          />
        </>
      )}

      {/* Dark variant: bottom accent line */}
      {!isLight && (
        <div
          aria-hidden
          className="pointer-events-none absolute inset-x-0 bottom-0 h-[2px]"
          style={{
            background:
              'linear-gradient(90deg, rgba(255,255,255,0.05), rgba(255,255,255,0.7) 50%, rgba(255,255,255,0.05))',
            boxShadow:
              '0 0 12px 2px rgba(172,92,255,0.55), 0 0 22px 4px rgba(56,189,248,0.3)',
          }}
        />
      )}

      <div className="relative h-full">{children}</div>
    </div>
  );
};

export default GradientCard;
