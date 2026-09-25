import React from 'react';
import { Mail, ArrowRight, Eye, Cpu, Radio, ShieldCheck } from 'lucide-react';
import { GithubIcon, LinkedinIcon, LeetCodeIcon } from '../ui/Icons';
import { usePortfolioData } from '../../hooks/usePortfolioData';
import { DoomButton } from '../hud/DoomButton';
import { HudLabel } from '../hud/HudLabel';
import { SmokeyFrame } from '../ui/SmokeyFrame';
import { TechText } from '../ui/TechText';
import { DoomCanvas } from '../3d/DoomCanvas';

export const HeroSection: React.FC = () => {
  const { hero } = usePortfolioData();

  return (
    <section className="relative min-h-screen w-full flex items-center justify-center pt-28 sm:pt-32 pb-16 px-4 sm:px-6 lg:px-8 bg-tactical-grid overflow-hidden">
      {/* Background radial emerald vignette behind 3D core */}
      <div className="absolute top-1/2 right-1/4 -translate-y-1/2 w-[500px] h-[500px] bg-[#173D28]/20 rounded-full blur-[140px] pointer-events-none" />

      <div className="max-w-7xl w-full mx-auto grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-8 items-center z-10">
        {/* LEFT COLUMN: Classified Identification & Directives (7 cols) */}
        <div className="lg:col-span-7 flex flex-col items-start space-y-6">
          {/* System status tag */}
          <div className="flex items-center gap-3">
            <HudLabel variant="emerald" dot={true}>
              <TechText text="// SYSTEM ONLINE" speed={40} />
            </HudLabel>
            <HudLabel variant="brass" dot={false} className="hidden sm:inline-flex">
              SEC-CLEARANCE: ALPHA
            </HudLabel>
          </div>

          {/* Primary Name */}
          <div className="space-y-1">
            <h1 className="text-4xl sm:text-6xl lg:text-7xl font-bold tracking-tight text-[#E7E4D8] uppercase font-['Chakra_Petch'] leading-none">
              AFSAL AHMED
              <span className="block text-[#62D58A] mt-1 text-3xl sm:text-5xl lg:text-6xl font-extrabold drop-shadow-[0_0_20px_rgba(98,213,138,0.3)]">
                KHAN A
              </span>
            </h1>
          </div>

          {/* Dynamic Role Badges */}
          <div className="flex flex-wrap gap-2 py-1">
            {hero.roles.map((role) => (
              <span
                key={role}
                className="text-[11px] font-mono tracking-widest uppercase bg-[#111612] text-[#858C84] border border-[#1E2821] px-3 py-1 rounded-sm hover:border-[#235C3A] hover:text-[#62D58A] transition-colors"
              >
                {role}
              </span>
            ))}
          </div>

          {/* Statement */}
          <p className="text-base sm:text-lg font-mono text-[#E7E4D8]/90 max-w-xl border-l-2 border-[#235C3A] pl-4 py-1 leading-relaxed bg-[#0D120F]/60">
            "{hero.tagline}"
          </p>

          {/* Action CTAs */}
          <div className="flex flex-wrap items-center gap-4 pt-2">
            <DoomButton
              variant="emerald"
              size="lg"
              href="#profile"
              icon={<ArrowRight className="w-4 h-4" />}
            >
              ENTER ARCHIVE
            </DoomButton>

            <DoomButton
              variant="brass"
              size="lg"
              href="#inventions"
              icon={<Eye className="w-4 h-4" />}
            >
              VIEW INVENTIONS
            </DoomButton>
          </div>

          {/* Social Telemetry Links */}
          <div className="pt-4 border-t border-[#1E2821] w-full max-w-lg flex flex-wrap items-center gap-5 text-xs font-mono text-[#858C84]">
            <span className="text-[10px] uppercase text-[#778078] tracking-widest">
              TELEMETRY:
            </span>
            <a
              href={hero.github}
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center gap-1.5 hover:text-[#62D58A] transition-colors"
            >
              <GithubIcon className="w-4 h-4" />
              <span>GITHUB</span>
            </a>
            <a
              href={hero.linkedin}
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center gap-1.5 hover:text-[#62D58A] transition-colors"
            >
              <LinkedinIcon className="w-4 h-4" />
              <span>LINKEDIN</span>
            </a>
            <a
              href={hero.leetcode}
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center gap-1.5 hover:text-[#D5B968] transition-colors"
            >
              <LeetCodeIcon className="w-4 h-4" />
              <span>LEETCODE</span>
            </a>
            <a
              href={`mailto:${hero.email}`}
              className="flex items-center gap-1.5 hover:text-[#62D58A] transition-colors"
            >
              <Mail className="w-4 h-4" />
              <span>EMAIL</span>
            </a>
          </div>
        </div>

        {/* RIGHT COLUMN: 3D Latverian Character Chamber (5 cols) */}
        <div className="lg:col-span-5 relative w-full flex items-center justify-center">
          <SmokeyFrame
            glowColor="#62D58A"
            smokeIntensity={1.2}
            className="w-full max-w-[480px] aspect-square rounded-sm border border-[#235C3A]/60 bg-[#0D120F]/90 p-2 shadow-2xl relative"
          >
            {/* Corner Tactical Bracket Markings */}
            <div className="absolute top-2 left-3 z-20 flex items-center gap-1.5 text-[9px] font-mono text-[#62D58A]">
              <Cpu className="w-3 h-3 animate-pulse" />
              <span>SUBJECT: DOOM</span>
            </div>

            <div className="absolute top-2 right-3 z-20 flex items-center gap-1.5 text-[9px] font-mono text-[#D5B968]">
              <ShieldCheck className="w-3 h-3" />
              <span>CORE: STABLE</span>
            </div>

            <div className="absolute bottom-2 left-3 z-20 flex items-center gap-1.5 text-[9px] font-mono text-[#858C84]">
              <Radio className="w-3 h-3 text-[#62D58A]" />
              <span>SYS: ONLINE</span>
            </div>

            <div className="absolute bottom-2 right-3 z-20 text-[9px] font-mono text-[#778078]">
              LATVERIA // 2026
            </div>

            {/* Central 3D Canvas */}
            <div className="w-full h-full min-h-[380px] relative z-10 flex items-center justify-center">
              <DoomCanvas />
            </div>

            {/* Bottom Interaction Cue */}
            <div className="absolute bottom-6 left-1/2 -translate-x-1/2 z-20 pointer-events-none text-[9px] font-mono text-[#62D58A]/60 tracking-widest uppercase bg-[#070908]/80 px-2 py-0.5 border border-[#235C3A]/40 rounded-sm">
              DRAG TO ROTATE 3D SPECIMEN
            </div>
          </SmokeyFrame>
        </div>
      </div>
    </section>
  );
};
