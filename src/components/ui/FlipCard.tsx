import React, { useState } from 'react';
import clsx from 'clsx';
import { RefreshCw } from 'lucide-react';

interface FlipCardProps {
  front: React.ReactNode;
  back: React.ReactNode;
  className?: string;
  heightClass?: string;
}

export const FlipCard: React.FC<FlipCardProps> = ({
  front,
  back,
  className,
  heightClass = 'min-h-[460px]',
}) => {
  const [isFlipped, setIsFlipped] = useState(false);

  const handleToggle = () => {
    setIsFlipped((prev) => !prev);
  };

  return (
    <div
      className={clsx('w-full select-none cursor-pointer group', className)}
      style={{ perspective: '1200px' }}
      onClick={handleToggle}
      role="button"
      tabIndex={0}
      onKeyDown={(e) => {
        if (e.key === 'Enter' || e.key === ' ') {
          e.preventDefault();
          handleToggle();
        }
      }}
      aria-label="Toggle Dossier Card View"
    >
      <div
        className={clsx(
          'relative w-full transition-transform duration-700 ease-out',
          heightClass
        )}
        style={{
          transformStyle: 'preserve-3d',
          transform: isFlipped ? 'rotateY(180deg)' : 'rotateY(0deg)',
        }}
      >
        {/* Front Side */}
        <div
          className="absolute inset-0 w-full h-full rounded-sm border border-[#235C3A] bg-[#111612] p-6 shadow-2xl flex flex-col justify-between overflow-hidden"
          style={{
            backfaceVisibility: 'hidden',
            WebkitBackfaceVisibility: 'hidden',
          }}
        >
          {/* Subtle Metallic Corner Highlights */}
          <div className="absolute top-0 right-0 w-16 h-16 bg-gradient-to-bl from-[#62D58A]/10 to-transparent pointer-events-none" />
          <div className="absolute bottom-0 left-0 w-16 h-16 bg-gradient-to-tr from-[#B8954A]/10 to-transparent pointer-events-none" />

          {/* Front Content */}
          <div className="relative z-10 flex-1">{front}</div>

          {/* Flip Hint Bar */}
          <div className="mt-4 pt-3 border-t border-[#1E2821] flex items-center justify-between text-[11px] font-mono text-[#858C84] group-hover:text-[#62D58A] transition-colors">
            <span className="flex items-center gap-1.5">
              <RefreshCw className="w-3.5 h-3.5 transition-transform duration-500 group-hover:rotate-180" />
              <span>TAP / CLICK TO FLIP DOSSIER</span>
            </span>
            <span className="text-[10px] text-[#778078]">[CLASSIFIED]</span>
          </div>
        </div>

        {/* Back Side */}
        <div
          className="absolute inset-0 w-full h-full rounded-sm border border-[#B8954A] bg-[#0D120F] p-6 shadow-2xl flex flex-col justify-between overflow-hidden"
          style={{
            backfaceVisibility: 'hidden',
            WebkitBackfaceVisibility: 'hidden',
            transform: 'rotateY(180deg)',
          }}
        >
          {/* Back Metallic Highlights */}
          <div className="absolute top-0 left-0 w-16 h-16 bg-gradient-to-br from-[#B8954A]/15 to-transparent pointer-events-none" />
          <div className="absolute bottom-0 right-0 w-16 h-16 bg-gradient-to-tl from-[#62D58A]/10 to-transparent pointer-events-none" />

          {/* Back Content */}
          <div className="relative z-10 flex-1">{back}</div>

          {/* Flip Hint Bar */}
          <div className="mt-4 pt-3 border-t border-[#1E2821] flex items-center justify-between text-[11px] font-mono text-[#D5B968] transition-colors">
            <span className="flex items-center gap-1.5">
              <RefreshCw className="w-3.5 h-3.5 rotate-180" />
              <span>TAP / CLICK TO RETURN</span>
            </span>
            <span className="text-[10px] text-[#B8954A]">[TACTICAL MATRIX]</span>
          </div>
        </div>
      </div>
    </div>
  );
};
