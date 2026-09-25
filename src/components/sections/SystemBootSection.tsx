import React from 'react';
import { Terminal, CheckCircle2, ShieldAlert } from 'lucide-react';
import { TechText } from '../ui/TechText';
import { HudLabel } from '../hud/HudLabel';

export const SystemBootSection: React.FC = () => {
  return (
    <div className="w-full py-8 border-y border-[#1E2821] bg-[#0D120F]/90 backdrop-blur-sm relative z-20">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-12 gap-4 items-center font-mono">
          {/* Boot Status Icon */}
          <div className="md:col-span-1 flex items-center justify-start md:justify-center">
            <div className="w-10 h-10 rounded-sm bg-[#173D28]/40 border border-[#235C3A] flex items-center justify-center text-[#62D58A] shadow-[0_0_12px_#62D58A33]">
              <Terminal className="w-5 h-5 animate-pulse" />
            </div>
          </div>

          {/* Telemetry Stream */}
          <div className="md:col-span-7 flex flex-col space-y-1">
            <div className="flex items-center gap-2 text-xs text-[#62D58A]">
              <CheckCircle2 className="w-3.5 h-3.5 text-[#62D58A]" />
              <TechText text="INITIALIZING LATVERIAN ARCHIVE // IDENTITY VERIFIED // ACCESS GRANTED" speed={25} />
            </div>
            <div className="text-[11px] text-[#858C84] tracking-wide">
              SUBJECT: <span className="text-[#E7E4D8] font-bold">AFSAL AHMED KHAN A</span> — CLASSIFICATION: <span className="text-[#D5B968]">AI / SOFTWARE / GAME SYSTEMS</span>
            </div>
          </div>

          {/* Verification Badge */}
          <div className="md:col-span-4 flex items-center justify-start md:justify-end gap-3">
            <HudLabel variant="emerald" dot={true}>
              SECURITY: LEVEL 0
            </HudLabel>
            <div className="hidden sm:flex items-center gap-1.5 text-[10px] text-[#778078] border border-[#252A27] px-2 py-1 bg-[#111612]">
              <ShieldAlert className="w-3 h-3 text-[#B8954A]" />
              <span>DOOM ARCHIVE 2026</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
