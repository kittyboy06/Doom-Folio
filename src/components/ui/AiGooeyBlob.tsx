import React from 'react';
import { motion } from 'framer-motion';
import clsx from 'clsx';
import { useReducedMotion } from '../../hooks/useReducedMotion';

interface AiGooeyBlobProps {
  className?: string;
  size?: number;
  coreTitle?: string;
  statusText?: string;
}

export const AiGooeyBlob: React.FC<AiGooeyBlobProps> = ({
  className,
  size = 280,
  coreTitle = 'COGNITIVE CORE',
  statusText = 'ENERGY STABLE // 98.6%',
}) => {
  const prefersReducedMotion = useReducedMotion();

  return (
    <div
      className={clsx(
        'relative flex flex-col items-center justify-center p-4 select-none',
        className
      )}
      style={{ width: size, height: size }}
    >
      {/* Hidden SVG Filter for Liquid Metaball Fusion */}
      <svg className="absolute w-0 h-0 pointer-events-none" aria-hidden="true">
        <defs>
          <filter id="latverian-goo-filter">
            <feGaussianBlur in="SourceGraphic" stdDeviation="12" result="blur" />
            <feColorMatrix
              in="blur"
              mode="matrix"
              values="1 0 0 0 0  
                      0 1 0 0 0  
                      0 0 1 0 0  
                      0 0 0 20 -9"
              result="goo"
            />
            <feBlend in="SourceGraphic" in2="goo" />
          </filter>
        </defs>
      </svg>

      {/* Outer Tactical Reticle Rings */}
      <div className="absolute inset-0 rounded-full border border-[#235C3A]/40 animate-[spin_25s_linear_infinite]" />
      <div className="absolute inset-4 rounded-full border border-dashed border-[#B8954A]/30 animate-[spin_35s_linear_infinite_reverse]" />
      <div className="absolute inset-8 rounded-full border border-[#173D28]/60" />

      {/* Gooey Liquid Fusion Container */}
      <div
        className="relative w-36 h-36 flex items-center justify-center"
        style={{ filter: 'url(#latverian-goo-filter)' }}
      >
        {/* Central Nucleus */}
        <motion.div
          animate={
            prefersReducedMotion
              ? {}
              : {
                  scale: [1, 1.15, 0.95, 1],
                  borderRadius: ['40%', '50%', '42%', '40%'],
                }
          }
          transition={{ duration: 4, repeat: Infinity, ease: 'easeInOut' }}
          className="w-20 h-20 bg-gradient-to-tr from-[#173D28] via-[#235C3A] to-[#62D58A] rounded-full shadow-[0_0_35px_#62D58A]"
        />

        {/* Orbiting Satellite Blob 1 */}
        <motion.div
          animate={
            prefersReducedMotion
              ? {}
              : {
                  x: [-28, 28, 14, -28],
                  y: [18, -22, 28, 18],
                  scale: [0.8, 1.2, 0.9, 0.8],
                }
          }
          transition={{ duration: 3.2, repeat: Infinity, ease: 'easeInOut' }}
          className="absolute w-12 h-12 bg-[#62D58A] rounded-full opacity-90"
        />

        {/* Orbiting Satellite Blob 2 */}
        <motion.div
          animate={
            prefersReducedMotion
              ? {}
              : {
                  x: [24, -24, -10, 24],
                  y: [-20, 20, -26, -20],
                  scale: [1.1, 0.7, 1.2, 1.1],
                }
          }
          transition={{ duration: 4.5, repeat: Infinity, ease: 'easeInOut' }}
          className="absolute w-10 h-10 bg-[#235C3A] rounded-full opacity-80"
        />

        {/* Orbiting Satellite Blob 3 */}
        <motion.div
          animate={
            prefersReducedMotion
              ? {}
              : {
                  x: [0, 20, -20, 0],
                  y: [30, -15, -15, 30],
                  scale: [0.9, 1.1, 0.8, 0.9],
                }
          }
          transition={{ duration: 3.8, repeat: Infinity, ease: 'easeInOut' }}
          className="absolute w-8 h-8 bg-[#D5B968] rounded-full opacity-70"
        />
      </div>

      {/* Internal Core Telemetry Text */}
      <div className="absolute z-20 flex flex-col items-center text-center pointer-events-none">
        <span className="text-[10px] font-mono tracking-widest text-[#E7E4D8] font-bold uppercase drop-shadow-[0_2px_4px_rgba(0,0,0,0.9)]">
          {coreTitle}
        </span>
        <span className="text-[9px] font-mono tracking-wider text-[#62D58A] font-semibold bg-[#070908]/70 px-1.5 py-0.5 rounded border border-[#235C3A]/50 mt-1">
          {statusText}
        </span>
      </div>
    </div>
  );
};
