"use client";

import { useEffect, useState } from 'react';
import BoxReveal from '@/components/magicui/box-reveal';
import { WavyBackground } from '@/components/ui/wavy-background'; // Import WavyBackground

interface HeroSectionProps {
  onLoadComplete?: () => void;
}

export default function HeroSection({ onLoadComplete }: HeroSectionProps) {
  const [loaded, setLoaded] = useState(false);

  useEffect(() => {
    const timer = setTimeout(() => {
      setLoaded(true);
    }, 1000);

    return () => clearTimeout(timer);
  }, []);

  useEffect(() => {
    if (loaded && onLoadComplete) {
      onLoadComplete();
    }
  }, [loaded, onLoadComplete]);

  return (
    <div className="relative w-full h-screen flex items-center justify-center snap-start">
      <WavyBackground className="absolute inset-0 w-full h-full z-0" /> {/* Wavy background contained in HeroSection */}
      <div className="relative z-10 flex flex-col items-center justify-center text-center space-y-8"> {/* Increased space-y to ensure more spacing */}
        <BoxReveal width="100%" boxColor="#c53030" startAnimation={loaded}>
          <span className="text-red-800 text-lg sm:text-xl md:text-3xl lg:text-4xl font-bold">
            INTERNASH GLOBAL SERVICES
          </span>
        </BoxReveal>
        <BoxReveal width="100%" boxColor="#c53030" startAnimation={loaded} >
          <h1 className="mt-4 text-black dark:text-white text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-bold tracking-tight leading-tight">
            Engineering, Repair, and Logistics Solutions
          </h1>
        </BoxReveal>
        <BoxReveal width="100%" boxColor="#c53030" startAnimation={loaded}>
          <h1 className="mt-4 text-black dark:text-white text-xl sm:text-2xl md:text-3xl lg:text-4xl leading-tight">
            Create value and a competitive edge for our clients
          </h1>
        </BoxReveal>
        <div className="mt-8">
          <button className="relative inline-flex h-14 overflow-hidden rounded-full p-[1px] focus:outline-none focus:ring-2 focus:ring-slate-400 focus:ring-offset-2 focus:ring-offset-slate-50">
            <span className="absolute inset-[-1000%] animate-[spin_2s_linear_infinite] bg-[conic-gradient(from_90deg_at_50%_50%,#E2CBFF_0%,#393BB2_50%,#E2CBFF_100%)]" />
            <span className="inline-flex h-full w-full cursor-pointer items-center justify-center rounded-full bg-slate-950 px-6 py-2 text-lg font-medium text-white backdrop-blur-3xl">
              Contact Us
            </span>
          </button>
        </div>
      </div>
    </div>
  );
}
