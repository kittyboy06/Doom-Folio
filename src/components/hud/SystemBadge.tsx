import React from 'react';
import clsx from 'clsx';

interface SystemBadgeProps {
  children: React.ReactNode;
  variant?: 'emerald' | 'brass' | 'gunmetal';
  size?: 'sm' | 'md';
  className?: string;
}

export const SystemBadge: React.FC<SystemBadgeProps> = ({
  children,
  variant = 'gunmetal',
  size = 'sm',
  className,
}) => {
  const styles = {
    emerald: 'bg-[#173D28]/50 text-[#62D58A] border-[#235C3A]',
    brass: 'bg-[#B8954A]/10 text-[#D5B968] border-[#B8954A]/40',
    gunmetal: 'bg-[#161D19] text-[#778078] border-[#252A27] hover:border-[#235C3A] hover:text-[#E7E4D8]',
  };

  const sizes = {
    sm: 'text-[10px] px-2 py-0.5 tracking-wider',
    md: 'text-xs px-2.5 py-1 tracking-wide',
  };

  return (
    <span
      className={clsx(
        'font-mono border transition-all duration-200 inline-flex items-center gap-1 uppercase select-none',
        styles[variant],
        sizes[size],
        className
      )}
    >
      <span className="text-[8px] opacity-40">#</span>
      {children}
    </span>
  );
};
