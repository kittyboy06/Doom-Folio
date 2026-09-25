import React, { useState } from 'react';
import { Mail, Send, Terminal, CheckCircle2, Shield } from 'lucide-react';
import { GithubIcon, LinkedinIcon, LeetCodeIcon } from '../ui/Icons';
import { usePortfolioData } from '../../hooks/usePortfolioData';
import { HudLabel } from '../hud/HudLabel';
import { DoomButton } from '../hud/DoomButton';
import { SmokeyFrame } from '../ui/SmokeyFrame';

export const ContactSection: React.FC = () => {
  const { contact } = usePortfolioData();
  const [formState, setFormState] = useState({ name: '', email: '', message: '' });
  const [sent, setSent] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!formState.email || !formState.message) return;
    // Assemble mailto link
    const subject = encodeURIComponent(`Transmission from ${formState.name || 'Anonymous Operative'}`);
    const body = encodeURIComponent(
      `Operative Name: ${formState.name}\nOperative Email: ${formState.email}\n\nTransmission Log:\n${formState.message}`
    );
    window.open(`mailto:${contact.email}?subject=${subject}&body=${body}`, '_blank');
    setSent(true);
    setTimeout(() => setSent(false), 6000);
  };

  const communicationNodes = [
    {
      label: 'EMAIL TERMINAL',
      value: contact.email,
      href: `mailto:${contact.email}`,
      icon: <Mail className="w-5 h-5 text-[#62D58A]" />,
      detail: 'ENCRYPTED DIRECT DISPATCH',
    },
    {
      label: 'GITHUB REPOSITORY',
      value: 'kittyboy06',
      href: contact.github,
      icon: <GithubIcon className="w-5 h-5 text-[#62D58A]" />,
      detail: 'CODE ARCHIVES & SOURCE',
    },
    {
      label: 'LINKEDIN NETWORK',
      value: 'afsal-ahmed-khan-a',
      href: contact.linkedin,
      icon: <LinkedinIcon className="w-5 h-5 text-[#62D58A]" />,
      detail: 'PROFESSIONAL PROTOCOL',
    },
    {
      label: 'LEETCODE MATRIX',
      value: 'kittyboy06',
      href: contact.leetcode,
      icon: <LeetCodeIcon className="w-5 h-5 text-[#D5B968]" />,
      detail: 'ALGORITHMIC VALIDATION',
    },
  ];

  return (
    <section id="contact" className="py-24 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto relative">
      {/* Background Emerald Nebula */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] bg-[#173D28]/15 rounded-full blur-[160px] pointer-events-none" />

      {/* Section Header */}
      <div className="flex flex-col space-y-2 mb-12">
        <div className="flex items-center gap-3">
          <HudLabel variant="emerald" dot={true}>
            // COMMUNICATION CHANNEL
          </HudLabel>
          <span className="text-xs font-mono text-[#858C84]">FREQUENCY: SECURE</span>
        </div>
        <h2 className="text-3xl sm:text-5xl font-bold font-['Chakra_Petch'] tracking-wide text-[#E7E4D8] uppercase">
          ESTABLISH CHANNEL // <span className="text-[#62D58A]">THE ARCHIVE IS OPEN</span>
        </h2>
        <p className="text-xs sm:text-sm font-mono text-[#858C84] max-w-2xl">
          Direct communication links to Afsal Ahmed Khan A. Latverian frequencies monitor incoming proposals, engineering roles, and AI hackathon collaborations.
        </p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
        {/* LEFT: 4 Tactical Communication Terminals (6 cols) */}
        <div className="lg:col-span-6 grid grid-cols-1 sm:grid-cols-2 gap-4">
          {communicationNodes.map((node) => (
            <a
              key={node.label}
              href={node.href}
              target={node.href.startsWith('mailto') ? '_self' : '_blank'}
              rel="noopener noreferrer"
              className="bg-[#111612] border border-[#1E2821] hover:border-[#62D58A] p-5 rounded-sm transition-all duration-300 hover:shadow-[0_0_20px_-3px_rgba(98,213,138,0.25)] group flex flex-col justify-between"
            >
              <div>
                <div className="flex items-center justify-between pb-3 border-b border-[#1E2821] mb-3">
                  <span className="text-[10px] font-mono text-[#778078] uppercase">
                    {node.detail}
                  </span>
                  <div className="p-1.5 bg-[#0D120F] border border-[#1E2821] rounded-sm group-hover:border-[#62D58A]">
                    {node.icon}
                  </div>
                </div>

                <div className="text-xs font-mono text-[#858C84] uppercase">
                  {node.label}
                </div>
                <div className="text-sm font-mono font-bold text-[#E7E4D8] group-hover:text-[#62D58A] transition-colors mt-1 break-all">
                  {node.value}
                </div>
              </div>

              <div className="mt-4 pt-2 border-t border-[#1E2821] flex items-center justify-between text-[10px] font-mono text-[#62D58A]">
                <span>ENGAGE LINK</span>
                <span>→</span>
              </div>
            </a>
          ))}

          {/* Direct Security Advisory Card */}
          <div className="sm:col-span-2 bg-[#0D120F] border border-[#B8954A]/40 p-4 rounded-sm font-mono text-xs text-[#858C84]">
            <div className="flex items-center gap-2 text-[#D5B968] font-bold mb-1">
              <Shield className="w-4 h-4" />
              <span>DIRECT DISPATCH GUARANTEE</span>
            </div>
            All transmissions route directly to Afsal's personal mobile client. Typical response turnaround is within 12 hours.
          </div>
        </div>

        {/* RIGHT: Transmission Console inside SmokeyFrame (6 cols) */}
        <div className="lg:col-span-6">
          <SmokeyFrame
            glowColor="#62D58A"
            smokeIntensity={0.9}
            className="rounded-sm border border-[#235C3A] bg-[#111612]/95 p-6 shadow-2xl"
          >
            <div className="flex items-center justify-between pb-3 border-b border-[#1E2821] mb-6 font-mono text-xs">
              <div className="flex items-center gap-2 text-[#62D58A] font-bold">
                <Terminal className="w-4 h-4" />
                <span>TERMINAL DISPATCH CONSOLE</span>
              </div>
              <span className="text-[10px] text-[#778078]">[INPUT BUFFER]</span>
            </div>

            <form onSubmit={handleSubmit} className="space-y-4 font-mono text-xs">
              <div>
                <label className="block text-[#858C84] uppercase tracking-wider mb-1">
                  OPERATIVE / SENDER IDENTITY
                </label>
                <input
                  type="text"
                  placeholder="e.g. Victor Von Doom, Recruiter, Collaborator"
                  value={formState.name}
                  onChange={(e) => setFormState({ ...formState, name: e.target.value })}
                  className="w-full bg-[#070908] border border-[#1E2821] focus:border-[#62D58A] text-[#E7E4D8] px-3.5 py-2.5 outline-none rounded-sm transition-colors"
                />
              </div>

              <div>
                <label className="block text-[#858C84] uppercase tracking-wider mb-1">
                  COMMUNICATION RETURN ADDRESS (EMAIL)*
                </label>
                <input
                  type="email"
                  required
                  placeholder="operative@organization.com"
                  value={formState.email}
                  onChange={(e) => setFormState({ ...formState, email: e.target.value })}
                  className="w-full bg-[#070908] border border-[#1E2821] focus:border-[#62D58A] text-[#E7E4D8] px-3.5 py-2.5 outline-none rounded-sm transition-colors"
                />
              </div>

              <div>
                <label className="block text-[#858C84] uppercase tracking-wider mb-1">
                  TRANSMISSION PAYLOAD (MESSAGE)*
                </label>
                <textarea
                  required
                  rows={4}
                  placeholder="Detail your inquiry, project scope, or opportunity..."
                  value={formState.message}
                  onChange={(e) => setFormState({ ...formState, message: e.target.value })}
                  className="w-full bg-[#070908] border border-[#1E2821] focus:border-[#62D58A] text-[#E7E4D8] px-3.5 py-2.5 outline-none rounded-sm transition-colors resize-none"
                />
              </div>

              <div className="pt-2 flex items-center justify-between">
                <DoomButton
                  variant="emerald"
                  size="md"
                  type="submit"
                  icon={<Send className="w-4 h-4" />}
                >
                  DISPATCH TRANSMISSION
                </DoomButton>

                {sent && (
                  <span className="flex items-center gap-1.5 text-xs text-[#62D58A]">
                    <CheckCircle2 className="w-4 h-4" />
                    <span>TRANSMISSION PREPARED</span>
                  </span>
                )}
              </div>
            </form>
          </SmokeyFrame>
        </div>
      </div>
    </section>
  );
};
