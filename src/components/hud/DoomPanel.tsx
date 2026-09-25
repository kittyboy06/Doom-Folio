import React from 'react';
import clsx from 'clsx';

interface DoomPanelProps {
  title?: string;
  subtitle?: string;
  tag?: string;
  status?: string;
  children: React.ReactNode;
  variant?: 'gunmetal' | 'emerald' | 'brass';
  glow?: boolean;
  className?: string;
}

export const DoomPanel: React.FC<DoomPanelProps> = ({
  title,
  subtitle,
  tag,
  status = 'ONLINE',
  children,
  variant = 'gunmetal',
  glow = false,
  className,
}) => {
  const borderVariants = {
    gunmetal: 'border-[#1E2821] hover:border-[#235C3A]/60',
    emerald: 'border-[#235C3A] hover:border-[#62D58A]',
    brass: 'border-[#B8954A]/50 hover:border-[#D5B968]',
  };

  const glowStyles = glow ? 'shadow-[0_0_30px_-5px_rgba(98,213,138,0.15)]' : '';

  return (
    <div
      className={clsx(
        'relative bg-[#111612]/90 backdrop-blur-md border transition-all duration-300 group',
        borderVariants[variant],
        glowStyles,
        className
      )}
    >
      {/* Brass Corner Rivets */}
      <div className="absolute top-1.5 left-1.5 w-1 h-1 rounded-full bg-[#B8954A]/60 group-hover:bg-[#D5B968] transition-colors" />
      <div className="absolute top-1.5 right-1.5 w-1 h-1 rounded-full bg-[#B8954A]/60 group-hover:bg-[#D5B968] transition-colors" />
      <div className="absolute bottom-1.5 left-1.5 w-1 h-1 rounded-full bg-[#B8954A]/60 group-hover:bg-[#D5B968] transition-colors" />
      <div className="absolute bottom-1.5 right-1.5 w-1 h-1 rounded-full bg-[#B8954A]/60 group-hover:bg-[#D5B968] transition-colors" />

      {/* Top Header Bar if title or tag exists */}
      {(title || tag) && (
        <div className="flex items-center justify-between border-b border-[#1E2821] px-4 py-2.5 bg-[#0D120F]/90 text-[11px] font-mono tracking-wider">
          <div className="flex items-center gap-2">
            <span className="w-1.5 h-1.5 rounded-full bg-[#62D58A] shadow-[0_0_6px_#62D58A] animate-pulse" />
            <span className="text-[#E7E4D8] font-bold uppercase">{title}</span>
            {subtitle && <span className="text-[#858C84] lowercase font-normal">// {subtitle}</span>}
          </div>

          <div className="flex items-center gap-3">
            {tag && <span className="text-[#778078] text-[10px] uppercase">{tag}</span>}
            {status && (
              <span className="text-[#62D58A] text-[10px] tracking-widest font-semibold">
                [{status}]
              </span>
            )}
          </div>
        </div>
      )}

      {/* Main Content Body */}
      <div className="p-4 sm:p-6">{children}</div>
    </div>
  );
};
