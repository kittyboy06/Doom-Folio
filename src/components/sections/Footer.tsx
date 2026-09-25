import React from 'react';
import { Shield, ArrowUp } from 'lucide-react';
import { usePortfolioData } from '../../hooks/usePortfolioData';

export const Footer: React.FC = () => {
  const { footer, contact } = usePortfolioData();

  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <footer className="border-t border-[#1E2821] bg-[#070908] py-12 px-4 sm:px-6 lg:px-8 font-mono text-xs text-[#858C84]">
      <div className="max-w-7xl mx-auto flex flex-col md:flex-row items-center justify-between gap-6">
        {/* Left: Latveria Archive Emblem */}
        <div className="flex items-center gap-3">
          <div className="w-7 h-7 rounded-sm bg-[#111612] border border-[#235C3A] flex items-center justify-center text-[#62D58A]">
            <Shield className="w-3.5 h-3.5" />
          </div>
          <div>
            <div className="text-sm font-bold text-[#E7E4D8] tracking-widest uppercase">
              DOOM // ARCHIVE
            </div>
            <div className="text-[10px] text-[#778078]">
              LATVERIA // {footer.year} — {footer.name}
            </div>
          </div>
        </div>

        {/* Center: System Status Beacon */}
        <div className="flex items-center gap-2 bg-[#111612] border border-[#1E2821] px-3.5 py-1.5 rounded-sm">
          <span className="w-2 h-2 rounded-full bg-[#62D58A] shadow-[0_0_8px_#62D58A]" />
          <span className="text-[#62D58A] font-bold tracking-wider">SYSTEM STATUS: ONLINE</span>
          <span className="text-[#252A27]">|</span>
          <span className="text-[#778078]">ENCRYPTED PROTOCOL</span>
        </div>

        {/* Right: Social Links & Return to Apex */}
        <div className="flex items-center gap-6">
          <a
            href={contact.github}
            target="_blank"
            rel="noopener noreferrer"
            className="hover:text-[#62D58A] transition-colors uppercase tracking-wider"
          >
            GITHUB
          </a>
          <a
            href={contact.linkedin}
            target="_blank"
            rel="noopener noreferrer"
            className="hover:text-[#62D58A] transition-colors uppercase tracking-wider"
          >
            LINKEDIN
          </a>
          <a
            href={contact.leetcode}
            target="_blank"
            rel="noopener noreferrer"
            className="hover:text-[#D5B968] transition-colors uppercase tracking-wider"
          >
            LEETCODE
          </a>

          <button
            onClick={scrollToTop}
            className="w-8 h-8 rounded-sm bg-[#111612] border border-[#235C3A] hover:border-[#62D58A] flex items-center justify-center text-[#62D58A] transition-colors ml-2"
            aria-label="Return to Top of Archive"
          >
            <ArrowUp className="w-4 h-4" />
          </button>
        </div>
      </div>
    </footer>
  );
};
