import React, { useState, useEffect } from 'react';
import { Menu, X, Shield, Terminal, Award } from 'lucide-react';
import { DoomButton } from '../hud/DoomButton';

interface NavbarProps {
  onBootClick?: () => void;
}

export const Navbar: React.FC<NavbarProps> = () => {
  const [scrolled, setScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 40);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const navLinks = [
    { name: 'PROFILE', href: '#profile' },
    { name: 'ARMORY', href: '#armory' },
    { name: 'INVENTIONS', href: '#inventions' },
    { name: 'CHRONICLES', href: '#chronicles' },
    { name: 'CONTACT', href: '#contact' },
  ];

  return (
    <header
      className={`fixed top-0 left-0 right-0 z-40 transition-all duration-300 ${
        scrolled
          ? 'py-2.5 bg-[#070908]/90 backdrop-blur-md border-b border-[#1E2821] shadow-2xl'
          : 'py-5 bg-transparent'
      }`}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 flex items-center justify-between">
        {/* Left: Latverian Emblem / Logo */}
        <a
          href="#"
          className="flex items-center gap-2.5 group cursor-pointer"
          aria-label="Doctor Doom Latverian Archive Home"
        >
          <div className="w-8 h-8 rounded-sm bg-[#111612] border border-[#235C3A] flex items-center justify-center text-[#62D58A] shadow-[0_0_10px_rgba(98,213,138,0.2)] group-hover:border-[#62D58A] transition-colors">
            <Shield className="w-4 h-4" />
          </div>
          <div className="flex flex-col">
            <span className="font-mono text-xs font-bold tracking-widest text-[#E7E4D8] group-hover:text-[#62D58A] transition-colors">
              DOOM // ARCHIVE
            </span>
            <span className="text-[9px] font-mono text-[#858C84] tracking-wider">
              AFSAL AHMED KHAN A
            </span>
          </div>
        </a>

        {/* Center: Desktop Navigation Links */}
        <nav className="hidden md:flex items-center gap-6 lg:gap-8 bg-[#111612]/70 border border-[#1E2821] px-6 py-2 rounded-sm backdrop-blur-sm">
          {navLinks.map((link) => (
            <a
              key={link.name}
              href={link.href}
              className="text-xs font-mono tracking-widest text-[#858C84] hover:text-[#62D58A] transition-colors relative py-1 group"
            >
              <span>{link.name}</span>
              <span className="absolute bottom-0 left-0 w-0 h-[1.5px] bg-[#62D58A] transition-all duration-300 group-hover:w-full" />
            </a>
          ))}
        </nav>

        {/* Right: Latveria Online Status Beacon & Resume */}
        <div className="hidden md:flex items-center gap-4">
          <div className="flex items-center gap-2 text-[11px] font-mono text-[#62D58A] bg-[#173D28]/40 border border-[#235C3A]/60 px-3 py-1 rounded-sm">
            <span className="w-2 h-2 rounded-full bg-[#62D58A] animate-ping" />
            <span className="tracking-widest font-semibold">LATVERIA ONLINE</span>
          </div>
          <DoomButton
            variant="brass"
            size="sm"
            href="https://github.com/kittyboy06"
            target="_blank"
            icon={<Award className="w-3.5 h-3.5" />}
          >
            SOURCE
          </DoomButton>
        </div>

        {/* Mobile Hamburger Toggle */}
        <button
          onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
          className="md:hidden w-9 h-9 border border-[#235C3A] bg-[#111612] flex items-center justify-center text-[#62D58A]"
          aria-label="Toggle Navigation Menu"
        >
          {mobileMenuOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
        </button>
      </div>

      {/* Mobile Drawer Menu */}
      {mobileMenuOpen && (
        <div className="md:hidden border-b border-[#235C3A] bg-[#070908]/98 backdrop-blur-xl px-6 py-6 transition-all duration-300">
          <div className="flex items-center justify-between pb-4 border-b border-[#1E2821] mb-4">
            <div className="flex items-center gap-2 text-xs font-mono text-[#62D58A]">
              <span className="w-2 h-2 rounded-full bg-[#62D58A] animate-pulse" />
              <span>LATVERIA // ONLINE</span>
            </div>
            <span className="text-[10px] font-mono text-[#858C84]">SEC-LVL: 0</span>
          </div>

          <div className="flex flex-col gap-3">
            {navLinks.map((link) => (
              <a
                key={link.name}
                href={link.href}
                onClick={() => setMobileMenuOpen(false)}
                className="text-sm font-mono tracking-widest text-[#E7E4D8] hover:text-[#62D58A] py-2 border-b border-[#1E2821]/50 flex items-center justify-between"
              >
                <span>{link.name}</span>
                <span className="text-xs text-[#62D58A]">→</span>
              </a>
            ))}
          </div>

          <div className="mt-6 pt-2">
            <DoomButton
              variant="emerald"
              size="md"
              className="w-full"
              href="#contact"
              onClick={() => setMobileMenuOpen(false)}
              icon={<Terminal className="w-4 h-4" />}
            >
              ESTABLISH CHANNEL
            </DoomButton>
          </div>
        </div>
      )}
    </header>
  );
};
