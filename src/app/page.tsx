"use client"; 

import { useEffect } from 'react';
import HeroSection from '@/components/HeroSection';
import WelcomeSection from '@/components/WelcomeSection';
import SupplyChainSection from '@/components/SupplyChainSection';
import ExpertiseSection from '@/components/ExpertiseSection';
import DifferentiatorSection from '@/components/DifferentiatorSection';
import ServicesSection from '@/components/ServicesSection';
import VisionSection from '@/components/VisionSection';
import LocationsSection from '@/components/LocationsSection';
import ContactSection from '@/components/ContactSection';

export default function Page() {

  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  return (
    <div className="flex flex-col min-h-[100dvh] bg-background">
      <main className="flex-1">
        <HeroSection />
        <WelcomeSection />
        <SupplyChainSection />
        <ExpertiseSection />
        <DifferentiatorSection />
        <ServicesSection />
        <VisionSection />
        <LocationsSection />
        <ContactSection />
      </main>
    </div>
  );
}
