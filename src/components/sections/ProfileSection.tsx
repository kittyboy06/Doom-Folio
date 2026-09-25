import React from 'react';
import { Award, Target, Zap, Rocket, GraduationCap, ShieldCheck, CheckCircle } from 'lucide-react';
import { usePortfolioData } from '../../hooks/usePortfolioData';
import { HudLabel } from '../hud/HudLabel';
import { DoomPanel } from '../hud/DoomPanel';
import { FlipCard } from '../ui/FlipCard';
import { ScrollExpand } from '../ui/ScrollExpand';
import { ProfileScanner3D } from '../3d/ProfileScanner3D';

export const ProfileSection: React.FC = () => {
  const { about, achievements } = usePortfolioData();

  const getStatIcon = (iconName: string) => {
    switch (iconName) {
      case 'rocket':
        return <Rocket className="w-5 h-5 text-[#62D58A]" />;
      case 'zap':
        return <Zap className="w-5 h-5 text-[#D5B968]" />;
      case 'target':
        return <Target className="w-5 h-5 text-[#62D58A]" />;
      case 'graduation-cap':
        return <GraduationCap className="w-5 h-5 text-[#B8954A]" />;
      default:
        return <Award className="w-5 h-5 text-[#62D58A]" />;
    }
  };

  // FlipCard Front Content: Classified Identity Dossier
  const cardFront = (
    <div className="flex flex-col h-full justify-between space-y-4">
      <div>
        <div className="flex items-center justify-between border-b border-[#1E2821] pb-3 mb-4">
          <div className="flex items-center gap-2">
            <span className="w-2 h-2 bg-[#62D58A] rounded-full animate-ping" />
            <span className="text-xs font-mono font-bold text-[#E7E4D8] tracking-widest uppercase">
              LATVERIAN CLEARANCE BADGE
            </span>
          </div>
          <span className="text-[10px] font-mono text-[#D5B968] bg-[#B8954A]/10 px-2 py-0.5 border border-[#B8954A]/40">
            CLASS: OMEGA
          </span>
        </div>

        <div className="flex items-start gap-4">
          <div className="w-16 h-16 rounded-sm bg-[#161D19] border border-[#235C3A] flex items-center justify-center text-[#62D58A] font-mono text-xl font-black">
            AK
          </div>
          <div>
            <h3 className="text-lg font-bold font-mono text-[#E7E4D8] uppercase tracking-wide">
              AFSAL AHMED KHAN A
            </h3>
            <p className="text-xs font-mono text-[#62D58A] tracking-wider">
              AIML ENGINEER // JERUSALEM COLLEGE OF ENG.
            </p>
            <p className="text-[11px] font-mono text-[#858C84] mt-1">
              CHENNAI, INDIA — BATCH 2022-2026
            </p>
          </div>
        </div>
      </div>

      {/* Mini Stats Bar in Card */}
      <div className="grid grid-cols-2 gap-2 my-2">
        <div className="bg-[#070908]/80 p-2.5 border border-[#1E2821]">
          <div className="text-[10px] font-mono text-[#778078] uppercase">ACADEMIC CGPA</div>
          <div className="text-base font-bold font-mono text-[#D5B968]">8.0 / 10.0</div>
        </div>
        <div className="bg-[#070908]/80 p-2.5 border border-[#1E2821]">
          <div className="text-[10px] font-mono text-[#778078] uppercase">SHIPPED PROJECTS</div>
          <div className="text-base font-bold font-mono text-[#62D58A]">18+ APPS & GAMES</div>
        </div>
      </div>

      <div className="text-xs font-mono text-[#858C84] italic bg-[#070908]/40 p-3 border-l-2 border-[#235C3A]">
        "Specializing in autonomous AI systems, Android Jetpack Compose architectures, and real-time graphics."
      </div>
    </div>
  );

  // FlipCard Back Content: Tactical Capabilities Matrix
  const cardBack = (
    <div className="flex flex-col h-full justify-between space-y-4">
      <div>
        <div className="flex items-center justify-between border-b border-[#1E2821] pb-3 mb-4">
          <div className="flex items-center gap-2">
            <ShieldCheck className="w-4 h-4 text-[#D5B968]" />
            <span className="text-xs font-mono font-bold text-[#D5B968] tracking-widest uppercase">
              TACTICAL CAPABILITY MATRIX
            </span>
          </div>
          <span className="text-[10px] font-mono text-[#62D58A]">VERIFIED // ACTIVE</span>
        </div>

        <div className="space-y-3 font-mono text-xs">
          <div className="flex items-center justify-between border-b border-[#1E2821]/60 pb-1.5">
            <span className="text-[#E7E4D8]">AI & Cognitive Systems</span>
            <span className="text-[#62D58A]">ADVANCED (Gemini, WASM, Vector)</span>
          </div>
          <div className="flex items-center justify-between border-b border-[#1E2821]/60 pb-1.5">
            <span className="text-[#E7E4D8]">Android Engineering</span>
            <span className="text-[#62D58A]">PRODUCTION (Kotlin, Compose)</span>
          </div>
          <div className="flex items-center justify-between border-b border-[#1E2821]/60 pb-1.5">
            <span className="text-[#E7E4D8]">Full-Stack Web & PWA</span>
            <span className="text-[#62D58A]">ELITE (React 19, TS, Tailwind)</span>
          </div>
          <div className="flex items-center justify-between border-b border-[#1E2821]/60 pb-1.5">
            <span className="text-[#E7E4D8]">Unity Game Development</span>
            <span className="text-[#D5B968]">PUBLISHED (C#, URP, WebGL)</span>
          </div>
          <div className="flex items-center justify-between border-b border-[#1E2821]/60 pb-1.5">
            <span className="text-[#E7E4D8]">Problem Solving</span>
            <span className="text-[#D5B968]">56+ LEETCODE SOLVED</span>
          </div>
        </div>
      </div>

      <div className="text-[10px] font-mono text-[#858C84] bg-[#111612]/60 p-2.5 border border-[#B8954A]/30">
        SECURITY ADVISORY: Subject has executed competitive hackathons and rapid 24h deployment cycles on Google Cloud Run.
      </div>
    </div>
  );

  return (
    <section id="profile" className="py-24 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto">
      <ScrollExpand>
        {/* Section Header */}
        <div className="flex flex-col space-y-2 mb-12">
          <div className="flex items-center gap-3">
            <HudLabel variant="emerald" dot={true}>
              // SUBJECT PROFILE
            </HudLabel>
            <span className="text-xs font-mono text-[#858C84]">CLASSIFICATION: CANDIDATE DOSSIER</span>
          </div>
          <h2 className="text-3xl sm:text-5xl font-bold font-['Chakra_Petch'] tracking-wide text-[#E7E4D8] uppercase">
            PERSONNEL FILE // <span className="text-[#62D58A]">AFSAL AHMED KHAN A</span>
          </h2>
        </div>

        {/* 4 Metric Telemetry Counters */}
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 mb-10">
          {about.stats.map((stat) => (
            <div
              key={stat.label}
              className="bg-[#111612] border border-[#1E2821] p-5 rounded-sm hover:border-[#235C3A] transition-all duration-300 relative group"
            >
              <div className="flex items-center justify-between mb-2">
                <span className="text-[11px] font-mono text-[#858C84] uppercase tracking-wider">
                  {stat.label}
                </span>
                {getStatIcon(stat.icon)}
              </div>
              <div className="text-3xl sm:text-4xl font-bold font-mono text-[#E7E4D8] group-hover:text-[#62D58A] transition-colors">
                {stat.value}
              </div>
              <div className="w-full h-0.5 bg-[#1E2821] mt-3 group-hover:bg-[#62D58A] transition-colors" />
            </div>
          ))}
        </div>

        {/* Dossier Grid: Classified Flip Card + Biography & Honors */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
          {/* LEFT: 3D FlipCard Component & 3D Biometric Scanner (5 cols) */}
          <div className="lg:col-span-5 space-y-6">
            <FlipCard front={cardFront} back={cardBack} />
            <ProfileScanner3D />
          </div>

          {/* RIGHT: Dossier Narrative & Honors (7 cols) */}
          <div className="lg:col-span-7 space-y-6">
            <DoomPanel title="DOSSIER TRANSMISSION" tag="BIO-DATA" variant="emerald">
              <p className="text-sm sm:text-base font-mono text-[#E7E4D8]/90 leading-relaxed">
                {about.bio}
              </p>
            </DoomPanel>

            {/* Honors & Accolades */}
            <DoomPanel title="HONORS & RECOGNITION" tag="ARCHIVE LOG" variant="brass">
              <div className="space-y-3 font-mono">
                {achievements.map((ach) => (
                  <div
                    key={ach.title}
                    className="flex items-center justify-between p-2.5 bg-[#0D120F] border border-[#1E2821] hover:border-[#B8954A] transition-colors"
                  >
                    <div className="flex items-center gap-2.5">
                      <CheckCircle className="w-4 h-4 text-[#D5B968] flex-shrink-0" />
                      <span className="text-xs sm:text-sm text-[#E7E4D8]">{ach.title}</span>
                    </div>
                    <span className="text-xs text-[#B8954A] font-bold bg-[#B8954A]/10 px-2 py-0.5 border border-[#B8954A]/30">
                      {ach.year}
                    </span>
                  </div>
                ))}
              </div>
            </DoomPanel>
          </div>
        </div>
      </ScrollExpand>
    </section>
  );
};
