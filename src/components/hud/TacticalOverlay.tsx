import React from 'react';

export const TacticalOverlay: React.FC = () => {
  return (
    <div className="fixed inset-0 pointer-events-none z-50 select-none overflow-hidden">
      {/* Subtle CRT Scanline effect */}
      <div className="absolute inset-0 bg-scanlines opacity-40 mix-blend-overlay" />

      {/* Deep Vignette */}
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,transparent_40%,rgba(0,0,0,0.75)_100%)]" />

      {/* Top Left Latverian Telemetry Coordinates */}
      <div className="absolute top-3 left-4 hidden lg:flex items-center gap-3 text-[10px] font-mono text-[#858C84]/60 tracking-widest uppercase">
        <span className="w-1.5 h-1.5 bg-[#62D58A] rounded-full inline-block animate-ping" />
        <span>SYS.LOC // LATVERIA [45.18° N, 19.82° E]</span>
        <span className="text-[#252A27]">|</span>
        <span>SECURITY: CLASSIFIED</span>
      </div>

      {/* Top Right Latverian Telemetry Beacon */}
      <div className="absolute top-3 right-4 hidden lg:flex items-center gap-3 text-[10px] font-mono text-[#858C84]/60 tracking-widest uppercase">
        <span>ARCHIVE ID: DOOM-2026-X</span>
        <span className="text-[#252A27]">|</span>
        <span className="text-[#62D58A]">LINK: ENCRYPTED</span>
      </div>

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
