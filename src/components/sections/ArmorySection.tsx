import React from 'react';
import { Smartphone, Globe, Gamepad2, BrainCircuit, Terminal, Wrench, Shield } from 'lucide-react';
import { usePortfolioData } from '../../hooks/usePortfolioData';
import { HudLabel } from '../hud/HudLabel';
import { SystemBadge } from '../hud/SystemBadge';

export const ArmorySection: React.FC = () => {
  const { skills } = usePortfolioData();

  const getCategoryIcon = (categoryName: string) => {
    switch (categoryName.toLowerCase()) {
      case 'mobile':
        return <Smartphone className="w-5 h-5 text-[#62D58A]" />;
      case 'web & pwa':
        return <Globe className="w-5 h-5 text-[#62D58A]" />;
      case 'game dev':
        return <Gamepad2 className="w-5 h-5 text-[#D5B968]" />;
      case 'ai & cognitive architecture':
        return <BrainCircuit className="w-5 h-5 text-[#62D58A]" />;
      case 'languages':
        return <Terminal className="w-5 h-5 text-[#D5B968]" />;
      case 'tools & infrastructure':
        return <Wrench className="w-5 h-5 text-[#858C84]" />;
      default:
        return <Shield className="w-5 h-5 text-[#62D58A]" />;
    }
  };

  return (
    <section id="armory" className="py-24 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto">
      {/* Section Header */}
      <div className="flex flex-col space-y-2 mb-12">
        <div className="flex items-center gap-3">
          <HudLabel variant="brass" dot={true}>
            // THE ARMORY
          </HudLabel>
          <span className="text-xs font-mono text-[#858C84]">EQUIPMENT & CAPABILITIES SPEC</span>
        </div>
        <h2 className="text-3xl sm:text-5xl font-bold font-['Chakra_Petch'] tracking-wide text-[#E7E4D8] uppercase">
          TACTICAL MODULES // <span className="text-[#D5B968]">ARSENAL MATRIX</span>
        </h2>
        <p className="text-xs sm:text-sm font-mono text-[#858C84] max-w-2xl">
          Engineered competencies and mission-tested frameworks stored in Doom's private Latverian laboratory.
        </p>
      </div>

      {/* Grid of Equipment Modules */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {skills.map((category, index) => (
          <div
            key={category.name}
            className="relative bg-[#111612]/90 border border-[#1E2821] hover:border-[#235C3A] p-5 rounded-sm transition-all duration-300 hover:shadow-[0_0_20px_-3px_rgba(98,213,138,0.2)] group flex flex-col justify-between"
          >
            {/* Corner Rivet */}
            <div className="absolute top-2 right-2 w-1 h-1 rounded-full bg-[#B8954A]/60 group-hover:bg-[#D5B968]" />

            <div>
              {/* Module Header */}
              <div className="flex items-center justify-between pb-3 border-b border-[#1E2821] mb-4">
                <div className="flex items-center gap-2.5">
                  <div className="p-1.5 bg-[#0D120F] border border-[#1E2821] rounded-sm group-hover:border-[#235C3A]">
                    {getCategoryIcon(category.name)}
                  </div>
                  <div>
                    <h3 className="text-sm font-mono font-bold text-[#E7E4D8] uppercase tracking-wider group-hover:text-[#62D58A] transition-colors">
                      {category.name}
                    </h3>
                    <span className="text-[10px] font-mono text-[#778078]">
                      MOD-0{index + 1} // OPERATIONAL
                    </span>
                  </div>
                </div>
                <span className="text-[10px] font-mono text-[#62D58A] bg-[#173D28]/40 px-1.5 py-0.5 border border-[#235C3A]/50">
                  {category.items.length} UNITS
                </span>
              </div>

              {/* Skill Tags List */}
              <div className="flex flex-wrap gap-2">
                {category.items.map((skill) => (
                  <SystemBadge key={skill} variant="gunmetal" size="sm">
                    {skill}
                  </SystemBadge>
                ))}
              </div>
            </div>

            {/* Bottom Energy Gauge Indicator */}
            <div className="mt-6 pt-3 border-t border-[#1E2821] flex items-center justify-between text-[10px] font-mono text-[#858C84]">
              <span>SYSTEM EFFICIENCY</span>
              <span className="text-[#62D58A] font-semibold">100% NOMINAL</span>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
};
