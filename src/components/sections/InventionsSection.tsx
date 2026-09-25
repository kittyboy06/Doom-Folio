import React, { useState } from 'react';
import { ExternalLink, Layers, ArrowUpRight, Cpu, Sparkles } from 'lucide-react';
import { GithubIcon } from '../ui/Icons';
import { usePortfolioData } from '../../hooks/usePortfolioData';
import { ProjectItem } from '../../types/portfolio';
import { HudLabel } from '../hud/HudLabel';
import { SystemBadge } from '../hud/SystemBadge';
import { DoomButton } from '../hud/DoomButton';
import { AiGooeyBlob } from '../ui/AiGooeyBlob';
import { ProjectDossierModal } from '../hud/ProjectDossierModal';

export const InventionsSection: React.FC = () => {
  const { projects } = usePortfolioData();
  const [selectedCategory, setSelectedCategory] = useState<string>('ALL');
  const [activeDossierProject, setActiveDossierProject] = useState<ProjectItem | null>(null);

  const categories = ['ALL', 'AI Systems', 'Web & PWA', 'Mobile App', 'Unity Games'];

  // Identify Aether as the featured centerpiece
  const aetherProject = projects.find((p) => p.id === 'aether');

  const filteredProjects = projects.filter((p) => {
    if (selectedCategory === 'ALL') return true;
    return p.category.toLowerCase() === selectedCategory.toLowerCase();
  });

  return (
    <section id="inventions" className="py-24 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto">
      {/* Section Header */}
      <div className="flex flex-col space-y-2 mb-12">
        <div className="flex items-center gap-3">
          <HudLabel variant="emerald" dot={true}>
            // DOOM'S INVENTIONS
          </HudLabel>
          <span className="text-xs font-mono text-[#858C84]">ENGINEERED ARTIFACTS & EXPERIMENTS</span>
        </div>
        <h2 className="text-3xl sm:text-5xl font-bold font-['Chakra_Petch'] tracking-wide text-[#E7E4D8] uppercase">
          CLASSIFIED ARCHIVE // <span className="text-[#62D58A]">DEPLOYED SYSTEMS</span>
        </h2>
        <p className="text-xs sm:text-sm font-mono text-[#858C84] max-w-2xl">
          High-dimensional cognitive agents, mobile platforms, and interactive physics engines forged in Latveria.
        </p>
      </div>

      {/* FEATURED INVENTIONS HERO: AETHER COGNITIVE CORE */}
      {aetherProject && (
        <div className="relative mb-16 rounded-sm border-2 border-[#235C3A] bg-gradient-to-r from-[#070908] via-[#0D120F] to-[#111612] p-6 sm:p-10 shadow-[0_0_40px_-5px_rgba(98,213,138,0.25)] overflow-hidden">
          {/* Top Label */}
          <div className="flex items-center justify-between border-b border-[#1E2821] pb-3 mb-6">
            <div className="flex items-center gap-2">
              <Sparkles className="w-4 h-4 text-[#62D58A]" />
              <span className="text-xs font-mono font-bold tracking-widest text-[#62D58A] uppercase">
                FLAGSHIP INVENTION 001 // FORBIDDEN AI ARCHITECTURE
              </span>
            </div>
            <span className="text-[11px] font-mono text-[#D5B968] bg-[#B8954A]/10 px-2.5 py-0.5 border border-[#B8954A]/40 uppercase">
              STATUS: {aetherProject.status}
            </span>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
            {/* Left Content (7 cols) */}
            <div className="lg:col-span-7 space-y-4">
              <h3 className="text-3xl sm:text-4xl font-bold font-['Chakra_Petch'] text-[#E7E4D8] uppercase tracking-wide">
                {aetherProject.title}
              </h3>
              <p className="text-sm font-mono text-[#E7E4D8]/90 leading-relaxed border-l-2 border-[#62D58A] pl-4 py-1">
                {aetherProject.description}
              </p>

              {/* Stack tags */}
              <div className="flex flex-wrap gap-2 pt-2">
                {aetherProject.tags.map((tag) => (
                  <SystemBadge key={tag} variant="emerald" size="md">
                    {tag}
                  </SystemBadge>
                ))}
              </div>

              {/* Action buttons */}
              <div className="flex flex-wrap items-center gap-4 pt-4">
                <DoomButton
                  variant="emerald"
                  size="md"
                  onClick={() => setActiveDossierProject(aetherProject)}
                  icon={<Cpu className="w-4 h-4" />}
                >
                  OPEN BLUEPRINT
                </DoomButton>

                {aetherProject.github && (
                  <DoomButton
                    variant="outline"
                    size="md"
                    href={aetherProject.github}
                    target="_blank"
                    icon={<GithubIcon className="w-4 h-4" />}
                  >
                    REPOSITORY
                  </DoomButton>
                )}
              </div>
            </div>

            {/* Right: AI Gooey Blob Cognitive Reactor (5 cols) */}
            <div className="lg:col-span-5 flex items-center justify-center">
              <AiGooeyBlob
                size={300}
                coreTitle="AETHER COGNITIVE CORE"
                statusText="GEMINI 2.5 + PGVECTOR // ONLINE"
              />
            </div>
          </div>
        </div>
      )}

      {/* Category Filter Pills */}
      <div className="flex flex-wrap items-center gap-2 mb-8 border-b border-[#1E2821] pb-4">
        <span className="text-xs font-mono text-[#778078] mr-2 uppercase tracking-wider flex items-center gap-1.5">
          <Layers className="w-3.5 h-3.5 text-[#62D58A]" />
          <span>FILTER:</span>
        </span>
        {categories.map((cat) => (
          <button
            key={cat}
            onClick={() => setSelectedCategory(cat)}
            className={`px-3 py-1.5 text-xs font-mono tracking-wider uppercase transition-all duration-200 border ${
              selectedCategory.toLowerCase() === cat.toLowerCase()
                ? 'bg-[#173D28] text-[#62D58A] border-[#62D58A] shadow-[0_0_10px_rgba(98,213,138,0.3)]'
                : 'bg-[#111612] text-[#858C84] border-[#1E2821] hover:border-[#235C3A] hover:text-[#E7E4D8]'
            }`}
          >
            {cat}
          </button>
        ))}
      </div>

      {/* Projects Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {filteredProjects.map((project, idx) => (
          <div
            key={project.id}
            className="relative bg-[#111612] border border-[#1E2821] hover:border-[#235C3A] p-5 rounded-sm transition-all duration-300 hover:shadow-[0_0_20px_-3px_rgba(98,213,138,0.2)] flex flex-col justify-between group cursor-pointer"
            onClick={() => setActiveDossierProject(project)}
          >
            {/* Top Bar */}
            <div>
              <div className="flex items-center justify-between pb-3 border-b border-[#1E2821] mb-3">
                <span className="text-[10px] font-mono text-[#778078] uppercase">
                  INV-0{idx + 1} // {project.category}
                </span>
                <span className="text-[10px] font-mono text-[#62D58A] bg-[#173D28]/40 px-2 py-0.5 border border-[#235C3A]/50">
                  {project.status}
                </span>
              </div>

              {/* Title */}
              <h4 className="text-lg font-bold font-['Chakra_Petch'] text-[#E7E4D8] uppercase tracking-wide group-hover:text-[#62D58A] transition-colors mb-2">
                {project.title}
              </h4>

              {/* Description preview */}
              <p className="text-xs font-mono text-[#858C84] line-clamp-3 leading-relaxed mb-4">
                {project.description}
              </p>

              {/* Tech Tags */}
              <div className="flex flex-wrap gap-1.5 mb-4">
                {project.tags.slice(0, 4).map((tag) => (
                  <SystemBadge key={tag} variant="gunmetal" size="sm">
                    {tag}
                  </SystemBadge>
                ))}
                {project.tags.length > 4 && (
                  <span className="text-[10px] font-mono text-[#778078] self-center">
                    +{project.tags.length - 4}
                  </span>
                )}
              </div>
            </div>

            {/* Bottom Actions */}
            <div className="pt-3 border-t border-[#1E2821] flex items-center justify-between text-xs font-mono">
              <span className="text-[#62D58A] flex items-center gap-1 group-hover:underline">
                <span>INSPECT DOSSIER</span>
                <ArrowUpRight className="w-3.5 h-3.5" />
              </span>

              <div className="flex items-center gap-3 text-[#858C84]" onClick={(e) => e.stopPropagation()}>
                {project.github && (
                  <a
                    href={project.github}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="hover:text-[#E7E4D8] transition-colors"
                    aria-label={`GitHub for ${project.title}`}
                  >
                    <GithubIcon className="w-4 h-4" />
                  </a>
                )}
                {project.demo && (
                  <a
                    href={project.demo}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="hover:text-[#D5B968] transition-colors"
                    aria-label={`Live demo for ${project.title}`}
                  >
                    <ExternalLink className="w-4 h-4" />
                  </a>
                )}
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* Blueprint Inspect Modal */}
      <ProjectDossierModal
        project={activeDossierProject}
        onClose={() => setActiveDossierProject(null)}
      />
    </section>
  );
};
