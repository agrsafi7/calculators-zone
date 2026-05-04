'use client';

import React, { useRef, useState } from 'react';
import { motion } from 'framer-motion';
import { cn } from '@/lib/utils';

interface GradientCardProps {
  children: React.ReactNode;
  className?: string;
  /** Render as a non-interactive container if true (no hover lift). */
  static?: boolean;
}

/**
 * Dark gradient card with purple/blue glow and subtle 3D tilt on hover.
 * Used on homepage Category and Trending sections (light page bg).
 */
export const GradientCard: React.FC<GradientCardProps> = ({ children, className, static: isStatic }) => {
  const cardRef = useRef<HTMLDivElement>(null);
  const [isHovered, setIsHovered] = useState(false);
  const [rotation, setRotation] = useState({ x: 0, y: 0 });

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    if (isStatic || !cardRef.current) return;
    const rect = cardRef.current.getBoundingClientRect();
    const x = e.clientX - rect.left - rect.width / 2;
    const y = e.clientY - rect.top - rect.height / 2;
    setRotation({ x: -(y / rect.height) * 4, y: (x / rect.width) * 4 });
  };

  const handleMouseLeave = () => {
    setIsHovered(false);
    setRotation({ x: 0, y: 0 });
  };

  return (
    <motion.div
      ref={cardRef}
      className={cn('relative rounded-2xl overflow-hidden', className)}
      style={{
        transformStyle: 'preserve-3d',
        backgroundColor: '#0e131f',
        boxShadow: '0 -10px 60px 4px rgba(78, 99, 255, 0.18), 0 4px 12px 0 rgba(0, 0, 0, 0.35)',
      }}
      animate={{
        y: isHovered && !isStatic ? -4 : 0,
        rotateX: rotation.x,
        rotateY: rotation.y,
      }}
      transition={{ type: 'spring', stiffness: 300, damping: 20 }}
      onMouseEnter={() => !isStatic && setIsHovered(true)}
      onMouseLeave={handleMouseLeave}
      onMouseMove={handleMouseMove}
    >
      {/* Black gradient base */}
      <div
        className="absolute inset-0 z-0"
        style={{ background: 'linear-gradient(180deg, #000000 0%, #0a0a14 70%)' }}
      />

      {/* Noise texture */}
      <div
        className="absolute inset-0 opacity-25 mix-blend-overlay z-10 pointer-events-none"
        style={{
          backgroundImage: `url("data:image/svg+xml,%3Csvg viewBox='0 0 200 200' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='n'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.65' numOctaves='5' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23n)'/%3E%3C/svg%3E")`,
        }}
      />

      {/* Purple/blue glow */}
      <motion.div
        className="absolute bottom-0 left-0 right-0 h-2/3 z-20 pointer-events-none"
        style={{
          background: `
            radial-gradient(ellipse at bottom right, rgba(172, 92, 255, 0.55) -10%, rgba(79, 70, 229, 0) 70%),
            radial-gradient(ellipse at bottom left, rgba(56, 189, 248, 0.55) -10%, rgba(79, 70, 229, 0) 70%)
          `,
          filter: 'blur(40px)',
        }}
        animate={{ opacity: isHovered ? 0.95 : 0.75 }}
        transition={{ duration: 0.4 }}
      />

      {/* Center purple bloom */}
      <motion.div
        className="absolute bottom-0 left-0 right-0 h-2/3 z-20 pointer-events-none"
        style={{
          background:
            'radial-gradient(circle at bottom center, rgba(161, 58, 229, 0.55) -20%, rgba(79, 70, 229, 0) 60%)',
          filter: 'blur(45px)',
        }}
        animate={{ opacity: isHovered ? 0.85 : 0.65 }}
        transition={{ duration: 0.4 }}
      />

      {/* Bottom edge glow */}
      <motion.div
        className="absolute bottom-0 left-0 right-0 h-[2px] z-30 pointer-events-none"
        style={{
          background:
            'linear-gradient(90deg, rgba(255,255,255,0.05) 0%, rgba(255,255,255,0.7) 50%, rgba(255,255,255,0.05) 100%)',
        }}
        animate={{
          boxShadow: isHovered
            ? '0 0 18px 3px rgba(172, 92, 255, 0.85), 0 0 28px 5px rgba(56, 189, 248, 0.45)'
            : '0 0 12px 2px rgba(172, 92, 255, 0.7), 0 0 22px 4px rgba(56, 189, 248, 0.35)',
        }}
        transition={{ duration: 0.4 }}
      />

      {/* Glass reflection */}
      <div
        className="absolute inset-0 z-30 pointer-events-none"
        style={{
          background:
            'linear-gradient(135deg, rgba(255,255,255,0.07) 0%, rgba(255,255,255,0) 40%, rgba(255,255,255,0) 80%, rgba(255,255,255,0.04) 100%)',
        }}
      />

      {/* Content */}
      <div className="relative z-40 h-full">{children}</div>
    </motion.div>
  );
};

export default GradientCard;
