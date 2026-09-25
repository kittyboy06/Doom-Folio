import React from 'react';
import clsx from 'clsx';

interface DoomButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: 'emerald' | 'brass' | 'outline' | 'ghost';
  size?: 'sm' | 'md' | 'lg';
  href?: string;
  target?: string;
  rel?: string;
  icon?: React.ReactNode;
  iconPosition?: 'left' | 'right';
}

export const DoomButton: React.FC<DoomButtonProps> = ({
  children,
  variant = 'emerald',
  size = 'md',
  href,
  target,
  rel,
  icon,
  iconPosition = 'right',
  className,
  ...props
}) => {
  const baseStyles =
    'relative inline-flex items-center justify-center font-mono uppercase tracking-wider font-semibold transition-all duration-200 select-none group cursor-pointer overflow-hidden';

  const sizeStyles = {
    sm: 'text-xs px-3 py-1.5 gap-2',
    md: 'text-sm px-5 py-2.5 gap-2.5',
    lg: 'text-base px-7 py-3.5 gap-3 tracking-widest',
  };

  const variantStyles = {
    emerald:
      'bg-[#173D28] text-[#E7E4D8] border border-[#62D58A]/80 shadow-[0_0_15px_-2px_rgba(98,213,138,0.3)] hover:bg-[#235C3A] hover:shadow-[0_0_25px_0_rgba(98,213,138,0.5)] hover:border-[#62D58A]',
    brass:
      'bg-[#B8954A]/20 text-[#D5B968] border border-[#B8954A] shadow-[0_0_15px_-2px_rgba(184,149,74,0.25)] hover:bg-[#B8954A]/30 hover:border-[#D5B968] hover:shadow-[0_0_20px_0_rgba(213,185,104,0.4)]',
    outline:
      'bg-transparent text-[#E7E4D8] border border-[#252A27] hover:border-[#235C3A] hover:bg-[#111612] hover:text-[#62D58A]',
    ghost:
      'bg-transparent text-[#858C84] hover:text-[#E7E4D8] hover:bg-[#111612]/60 border border-transparent',
  };

  const content = (
    <>
      {/* Corner Brackets */}
      <span className="absolute top-0 left-0 w-1.5 h-1.5 border-t-2 border-l-2 border-current opacity-60 group-hover:opacity-100 transition-opacity" />
      <span className="absolute top-0 right-0 w-1.5 h-1.5 border-t-2 border-r-2 border-current opacity-60 group-hover:opacity-100 transition-opacity" />
      <span className="absolute bottom-0 left-0 w-1.5 h-1.5 border-b-2 border-l-2 border-current opacity-60 group-hover:opacity-100 transition-opacity" />
      <span className="absolute bottom-0 right-0 w-1.5 h-1.5 border-b-2 border-r-2 border-current opacity-60 group-hover:opacity-100 transition-opacity" />

      {/* Button Content */}
      {icon && iconPosition === 'left' && <span className="transition-transform group-hover:-translate-x-0.5">{icon}</span>}
      <span className="relative z-10 flex items-center gap-1.5">{children}</span>
      {icon && iconPosition === 'right' && <span className="transition-transform group-hover:translate-x-0.5">{icon}</span>}

      {/* Subtle scanline hover line */}
      <div className="absolute inset-0 -translate-x-full group-hover:translate-x-full bg-gradient-to-r from-transparent via-white/10 to-transparent transition-transform duration-700 pointer-events-none" />
    </>
  );

  if (href) {
    return (
      <a
        href={href}
        target={target}
        rel={target === '_blank' ? 'noopener noreferrer' : rel}
        className={clsx(baseStyles, sizeStyles[size], variantStyles[variant], className)}
      >
        {content}
      </a>
    );
  }

  return (
    <button
      className={clsx(baseStyles, sizeStyles[size], variantStyles[variant], className)}
      {...props}
    >
      {content}
    </button>
  );
};
