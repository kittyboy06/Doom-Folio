import React, { useRef } from 'react';
import { motion, useScroll, useTransform } from 'framer-motion';
import { useReducedMotion } from '../../hooks/useReducedMotion';

interface ScrollExpandProps {
  children: React.ReactNode;
  className?: string;
}

export const ScrollExpand: React.FC<ScrollExpandProps> = ({ children, className = '' }) => {
  const containerRef = useRef<HTMLDivElement>(null);
  const prefersReducedMotion = useReducedMotion();

  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ['start end', 'center center'],
  });

  const scale = useTransform(scrollYProgress, [0, 1], [0.94, 1]);
  const opacity = useTransform(scrollYProgress, [0, 0.4, 1], [0.6, 0.9, 1]);
  const y = useTransform(scrollYProgress, [0, 1], [40, 0]);

  if (prefersReducedMotion) {
    return <div className={className}>{children}</div>;
  }

  return (
    <div ref={containerRef} className="w-full relative">
      <motion.div
        style={{
          scale,
          opacity,
          y,
        }}
        className={className}
      >
        {children}
      </motion.div>
    </div>
  );
};
