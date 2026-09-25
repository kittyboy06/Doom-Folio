import React from 'react';
import { Calendar, ShieldAlert, Award, CheckCircle2 } from 'lucide-react';
import { usePortfolioData } from '../../hooks/usePortfolioData';
import { HudLabel } from '../hud/HudLabel';
import { DoomPanel } from '../hud/DoomPanel';

export const ChroniclesSection: React.FC = () => {
  const { timeline, certifications } = usePortfolioData();

  return (
    <section id="chronicles" className="py-24 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto">
      {/* Section Header */}
      <div className="flex flex-col space-y-2 mb-16">
        <div className="flex items-center gap-3">
          <HudLabel variant="emerald" dot={true}>
            // CHRONICLES
          </HudLabel>
          <span className="text-xs font-mono text-[#858C84]">EXPEDITIONS & COMBAT LOGS</span>
        </div>
        <h2 className="text-3xl sm:text-5xl font-bold font-['Chakra_Petch'] tracking-wide text-[#E7E4D8] uppercase">
          TIMELINE // <span className="text-[#62D58A]">MISSION ARCHIVES</span>
        </h2>
        <p className="text-xs sm:text-sm font-mono text-[#858C84] max-w-2xl">
          Historical record of hackathons conquered, industry problem-solving awards, and technical milestones.
        </p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-start">
        {/* LEFT: Glowing Vertical Mission Timeline (8 cols) */}
        <div className="lg:col-span-8 relative">
          {/* Vertical Glowing Emerald Spine */}
          <div className="absolute top-2 bottom-2 left-4 md:left-6 w-0.5 bg-gradient-to-b from-[#62D58A] via-[#235C3A] to-[#173D28] shadow-[0_0_12px_#62D58A]" />

          <div className="space-y-8 pl-12 md:pl-16">
            {timeline.map((item) => (
              <div
                key={item.title}
                className="relative bg-[#111612] border border-[#1E2821] hover:border-[#235C3A] p-5 rounded-sm transition-all duration-300 group"
              >
                {/* Node Beacon on Timeline Spine */}
                <div className="absolute -left-[45px] md:-left-[53px] top-6 w-4 h-4 rounded-full bg-[#070908] border-2 border-[#62D58A] group-hover:scale-125 transition-transform duration-300 flex items-center justify-center shadow-[0_0_10px_#62D58A]">
                  <div className="w-1.5 h-1.5 bg-[#62D58A] rounded-full" />
                </div>

                {/* Header Date & Org */}
                <div className="flex flex-wrap items-center justify-between pb-2 border-b border-[#1E2821] mb-2 font-mono text-xs">
                  <span className="text-[#D5B968] font-bold tracking-wider flex items-center gap-1.5">
                    <Calendar className="w-3.5 h-3.5" />
                    <span>{item.date}</span>
                  </span>
                  <span className="text-[#858C84] text-[11px] uppercase tracking-wide">
                    {item.org}
                  </span>
                </div>

                {/* Title */}
                <h4 className="text-base sm:text-lg font-bold font-['Chakra_Petch'] text-[#E7E4D8] uppercase tracking-wide group-hover:text-[#62D58A] transition-colors">
                  {item.title}
                </h4>

                {/* Description */}
                <p className="text-xs sm:text-sm font-mono text-[#858C84] mt-2 leading-relaxed">
                  {item.description}
                </p>
              </div>
            ))}
          </div>
        </div>

        {/* RIGHT: Classified Certifications & Credentials (4 cols) */}
        <div className="lg:col-span-4 space-y-6">
          <DoomPanel title="VERIFIED CREDENTIALS" tag="ACCURACY: 100%" variant="brass">
            <div className="space-y-3 font-mono">
              {certifications.map((cert) => (
                <div
                  key={cert.name}
                  className="p-3 bg-[#0D120F] border border-[#1E2821] hover:border-[#B8954A] transition-colors rounded-sm"
                >
                  <div className="flex items-start gap-2">
                    <Award className="w-4 h-4 text-[#D5B968] flex-shrink-0 mt-0.5" />
                    <div>
                      <div className="text-xs text-[#E7E4D8] font-semibold leading-snug">
                        {cert.name}
                      </div>
                      <div className="text-[10px] text-[#858C84] mt-1 flex items-center gap-1">
                        <CheckCircle2 className="w-3 h-3 text-[#62D58A]" />
                        <span>ISSUER: {cert.issuer}</span>
                      </div>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </DoomPanel>

          {/* Tactical Advisory Note */}
          <div className="border border-[#173D28] bg-[#070908] p-4 font-mono text-xs text-[#858C84] rounded-sm">
            <div className="flex items-center gap-2 text-[#62D58A] font-bold mb-1 uppercase">
              <ShieldAlert className="w-4 h-4" />
              <span>CLEARANCE AUDIT</span>
            </div>
            All credentials and competition standings verified by academic and industry juries.
          </div>
        </div>
      </div>
    </section>
  );
};
