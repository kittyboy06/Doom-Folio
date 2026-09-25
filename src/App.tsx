import React from 'react';
import { TacticalOverlay } from './components/hud/TacticalOverlay';
import { GlobalParticleField3D } from './components/3d/GlobalParticleField3D';
import { Navbar } from './components/sections/Navbar';
import { HeroSection } from './components/sections/HeroSection';
import { SystemBootSection } from './components/sections/SystemBootSection';
import { ProfileSection } from './components/sections/ProfileSection';
import { ArmorySection } from './components/sections/ArmorySection';
import { InventionsSection } from './components/sections/InventionsSection';
import { ChroniclesSection } from './components/sections/ChroniclesSection';
import { ContactSection } from './components/sections/ContactSection';
import { Footer } from './components/sections/Footer';

export const App: React.FC = () => {
  return (
    <div className="relative min-h-screen bg-[#070908] text-[#E7E4D8] selection:bg-[#173D28] selection:text-[#62D58A] overflow-x-hidden">
      {/* Ambient 3D Cursor-Gravity Particle Field */}
      <GlobalParticleField3D />

      {/* Ambient Tactical HUD Scanlines & Vignette */}
      <TacticalOverlay />

      {/* Floating Tactical Navigation */}
      <Navbar />

      {/* Main Archive Stream */}
      <main className="relative z-10 flex flex-col">
        {/* Hero: The Sovereign */}
        <HeroSection />

        {/* System Boot Transition Stream */}
        <SystemBootSection />

        {/* Personnel Profile & Classified 3D FlipCard */}
        <ProfileSection />

        {/* Tactical Armory & Equipment Modules */}
        <ArmorySection />

        {/* Classified Inventions & Aether Cognitive Core */}
        <InventionsSection />

        {/* Mission Chronicles & Credentials Timeline */}
        <ChroniclesSection />

        {/* Secure Communication Channels */}
        <ContactSection />
      </main>

      {/* Military Footer */}
      <Footer />
    </div>
  );
};

export default App;
