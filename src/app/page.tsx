"use client";

import { useEffect, useState } from 'react';
import HeroSection from '@/components/HeroSection';
import WelcomeSection from '@/components/WelcomeSection';
import SupplyChainSection from '@/components/SupplyChainSection';
import ExpertiseSection from '@/components/ExpertiseSection';
import DifferentiatorSection from '@/components/DifferentiatorSection';
import ServicesSection from '@/components/ServicesSection';
import VisionSection from '@/components/VisionSection';
import LocationsSection from '@/components/LocationsSection';
import ContactSection from '@/components/ContactSection';
import ThemeDetector from '@/components/ui/detect-dark-mode';

export default function Page() {
  const [loadingStates, setLoadingStates] = useState({
    heroLoaded: false,
    welcomeLoaded: false,
    supplyChainLoaded: false,
    expertiseLoaded: false,
    differentiatorLoaded: false,
    servicesLoaded: false,
    visionLoaded: false,
    locationsLoaded: false,
    contactLoaded: false,
  });

  const allComponentsLoaded = Object.values(loadingStates).every(Boolean);

  const handleLoadComplete = (section: keyof typeof loadingStates) => {
    setLoadingStates(prevStates => ({
      ...prevStates,
      [section]: true
    }));
  };

  return (
    <div className="flex flex-col min-h-[100dvh] bg-background">
      {/* Insert ThemeDetector at the top level */}
      <ThemeDetector />

      <main className="flex-1">
        <div className={`snap-container ${allComponentsLoaded ? 'scroll-enabled' : ''}`}>
          <HeroSection onLoadComplete={() => handleLoadComplete('heroLoaded')} />
          <WelcomeSection onLoadComplete={() => handleLoadComplete('welcomeLoaded')} />
          <SupplyChainSection onLoadComplete={() => handleLoadComplete('supplyChainLoaded')} />
          <ExpertiseSection onLoadComplete={() => handleLoadComplete('expertiseLoaded')} />
          <DifferentiatorSection onLoadComplete={() => handleLoadComplete('differentiatorLoaded')} />
          <ServicesSection onLoadComplete={() => handleLoadComplete('servicesLoaded')} />
          <VisionSection onLoadComplete={() => handleLoadComplete('visionLoaded')} />
          <LocationsSection onLoadComplete={() => handleLoadComplete('locationsLoaded')} />
          <ContactSection onLoadComplete={() => handleLoadComplete('contactLoaded')} />
        </div>
      </main>
      {allComponentsLoaded && (
        <div>
          {/* All components are loaded */}
          <p>All components are fully loaded!</p>
          {/* Implement any transition or action here */}
        </div>
      )}
    </div>
  );
}
