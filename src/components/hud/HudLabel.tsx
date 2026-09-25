import React from 'react';
import clsx from 'clsx';

interface HudLabelProps {
  children: React.ReactNode;
  variant?: 'emerald' | 'brass' | 'muted';
  dot?: boolean;
  className?: string;
}

export const HudLabel: React.FC<HudLabelProps> = ({
  children,
  variant = 'emerald',
  dot = true,
  className,
}) => {
  const colorMap = {
    emerald: 'text-[#62D58A] border-[#235C3A]/60 bg-[#173D28]/30',
    brass: 'text-[#D5B968] border-[#B8954A]/60 bg-[#B8954A]/10',
    muted: 'text-[#858C84] border-[#252A27] bg-[#111612]/50',
  };

  const dotColorMap = {
    emerald: 'bg-[#62D58A] shadow-[0_0_8px_#62D58A]',
    brass: 'bg-[#D5B968] shadow-[0_0_8px_#D5B968]',
    muted: 'bg-[#778078]',
  };

  return (
    <div
      className={clsx(
        'inline-flex items-center gap-2 px-2.5 py-1 text-[11px] font-mono tracking-wider uppercase border',
        colorMap[variant],
        className
      )}
    >
      {dot && (
        <span
          className={clsx('w-1.5 h-1.5 rounded-full inline-block animate-pulse', dotColorMap[variant])}
        />
      )}
      <span>{children}</span>
    </div>
  );
};
