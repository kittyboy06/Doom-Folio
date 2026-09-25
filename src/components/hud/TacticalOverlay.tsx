import React from 'react';

export const TacticalOverlay: React.FC = () => {
  return (
    <div className="fixed inset-0 pointer-events-none z-50 select-none overflow-hidden">
      {/* Subtle CRT Scanline effect */}
      <div className="absolute inset-0 bg-scanlines opacity-40 mix-blend-overlay" />

      {/* Deep Vignette */}
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,transparent_40%,rgba(0,0,0,0.75)_100%)]" />

      {/* Bottom Corner Brackets */}
      <div className="absolute bottom-3 left-4 hidden md:block text-[9px] font-mono text-[#778078]/40">
        ╔═ TAC-GRID: ACTIVE ═════╗
      </div>
      <div className="absolute bottom-3 right-4 hidden md:block text-[9px] font-mono text-[#778078]/40">
        ╚═════ BUFFER: STABLE ═╝
      </div>
    </div>
  );
};
