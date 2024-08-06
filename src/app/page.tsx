import Header from '@/components/Header';
import HeroSection from '@/components/HeroSection';
import WelcomeSection from '@/components/WelcomeSection';
import SupplyChainSection from '@/components/SupplyChainSection';
import ExpertiseSection from '@/components/ExpertiseSection';
import DifferentiatorSection from '@/components/DifferentiatorSection';
import ServicesSection from '@/components/ServicesSection';
import VisionSection from '@/components/VisionSection';
import LocationsSection from '@/components/LocationsSection';
import ContactSection from '@/components/ContactSection';
import Footer from '@/components/Footer';

export default function Page() {
  return (
    <div className="flex flex-col min-h-[100dvh] bg-background">
      <Header />
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
      <Footer />
    </div>
  );
}
