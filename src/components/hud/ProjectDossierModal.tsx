import React, { useEffect } from 'react';
import { X, ExternalLink, Cpu } from 'lucide-react';
import { GithubIcon } from '../ui/Icons';
import { ProjectItem } from '../../types/portfolio';
import { ProjectArtifact3D } from '../3d/ProjectArtifact3D';
import { DoomButton } from './DoomButton';
import { SystemBadge } from './SystemBadge';
import { HudLabel } from './HudLabel';

interface ProjectDossierModalProps {
  project: ProjectItem | null;
  onClose: () => void;
}

export const ProjectDossierModal: React.FC<ProjectDossierModalProps> = ({ project, onClose }) => {
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') onClose();
    };
    if (project) {
      document.body.style.overflow = 'hidden';
      window.addEventListener('keydown', handleKeyDown);
    }
    return () => {
      document.body.style.overflow = 'unset';
      window.removeEventListener('keydown', handleKeyDown);
    };
  }, [project, onClose]);

  if (!project) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 sm:p-6 bg-[#070908]/90 backdrop-blur-md">
      {/* Blueprint Container */}
      <div
        className="relative w-full max-w-3xl bg-[#111612] border-2 border-[#235C3A] shadow-[0_0_50px_rgba(98,213,138,0.25)] rounded-sm p-6 sm:p-8 overflow-y-auto max-h-[90vh] font-mono text-[#E7E4D8]"
        role="dialog"
        aria-modal="true"
      >
        {/* Brass Header Rivets */}
        <div className="absolute top-2 left-2 w-1.5 h-1.5 rounded-full bg-[#B8954A]" />
        <div className="absolute top-2 right-2 w-1.5 h-1.5 rounded-full bg-[#B8954A]" />
        <div className="absolute bottom-2 left-2 w-1.5 h-1.5 rounded-full bg-[#B8954A]" />
        <div className="absolute bottom-2 right-2 w-1.5 h-1.5 rounded-full bg-[#B8954A]" />

        {/* Top Blueprint Title Bar */}
        <div className="flex items-center justify-between border-b border-[#1E2821] pb-4 mb-6">
          <div className="flex items-center gap-2.5">
            <HudLabel variant="emerald" dot={true}>
              CLASSIFIED BLUEPRINT
            </HudLabel>
            <span className="text-xs text-[#858C84] uppercase">ID: {project.id}</span>
          </div>

          <button
            onClick={onClose}
            className="w-8 h-8 rounded-sm bg-[#161D19] border border-[#235C3A] flex items-center justify-center text-[#858C84] hover:text-[#62D58A] hover:border-[#62D58A] transition-colors"
            aria-label="Close Blueprint"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Project Title & Category */}
        <div className="space-y-2 mb-6">
          <div className="flex flex-wrap items-center gap-3">
            <span className="text-xs font-mono text-[#D5B968] bg-[#B8954A]/10 px-2.5 py-1 border border-[#B8954A]/40 uppercase">
              {project.category}
            </span>
            <span className="text-xs font-mono text-[#62D58A] bg-[#173D28]/40 px-2.5 py-1 border border-[#235C3A] uppercase">
              STATUS: {project.status}
            </span>
          </div>

          <h2 className="text-2xl sm:text-3xl font-bold font-['Chakra_Petch'] uppercase tracking-wide text-[#E7E4D8]">
            {project.title}
          </h2>
        </div>

        {/* 3D Holographic Artifact Projection Stage */}
        <div className="w-full h-44 mb-6 bg-[#070908] border border-[#235C3A]/80 rounded-sm relative overflow-hidden flex items-center justify-center shadow-[inset_0_0_20px_rgba(98,213,138,0.15)]">
          <div className="absolute top-2 left-3 text-[9px] font-mono text-[#62D58A] flex items-center gap-1.5 z-10">
            <span className="w-1.5 h-1.5 rounded-full bg-[#62D58A] animate-ping" />
            <span>3D SPECIMEN MATRIX // KINETIC PROJECTION</span>
          </div>
          <div className="absolute top-2 right-3 text-[9px] font-mono text-[#778078] z-10">
            DISCIPLINE: {project.category.toUpperCase()}
          </div>
          <ProjectArtifact3D
            category={project.category}
            isHovered={true}
            className="w-full h-full"
          />
        </div>

        {/* Description Section */}
        <div className="border border-[#1E2821] bg-[#0D120F] p-4 sm:p-5 rounded-sm mb-6">
          <div className="flex items-center gap-2 text-xs text-[#62D58A] mb-2 font-bold uppercase tracking-wider">
            <Cpu className="w-4 h-4" />
            <span>TECHNICAL SPECIFICATIONS & ARCHITECTURE</span>
          </div>
          <p className="text-xs sm:text-sm text-[#E7E4D8]/90 leading-relaxed">
            {project.description}
          </p>
        </div>

        {/* System Components / Technology Tags */}
        <div className="mb-8">
          <div className="text-xs text-[#858C84] mb-3 uppercase tracking-wider font-bold">
            INTEGRATED SUBSYSTEMS & STACK:
          </div>
          <div className="flex flex-wrap gap-2">
            {project.tags.map((tag) => (
              <SystemBadge key={tag} variant="emerald" size="md">
                {tag}
              </SystemBadge>
            ))}
          </div>
        </div>

        {/* Action Link Terminals */}
        <div className="flex flex-wrap items-center gap-4 pt-4 border-t border-[#1E2821]">
          {project.github && (
            <DoomButton
              variant="emerald"
              size="md"
              href={project.github}
              target="_blank"
              icon={<GithubIcon className="w-4 h-4" />}
            >
              SOURCE REPOSITORY
            </DoomButton>
          )}

          {project.demo && (
            <DoomButton
              variant="brass"
              size="md"
              href={project.demo}
              target="_blank"
              icon={<ExternalLink className="w-4 h-4" />}
            >
              LAUNCH LIVE DEPLOYMENT
            </DoomButton>
          )}

          <DoomButton
            variant="outline"
            size="md"
            onClick={onClose}
            className="ml-auto"
          >
            DISMISS DOSSIER
          </DoomButton>
        </div>
      </div>
    </div>
  );
};
