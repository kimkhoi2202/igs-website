"use client";

import { useEffect, useState } from 'react';
import { useTheme } from 'next-themes';
import TypingAnimation from '@/components/magicui/typing-animation';
import BlurIn from '@/components/magicui/blur-in';
import { WavyBackground } from '@/components/ui/wavy-background';
import { motion } from 'framer-motion';

interface HeroSectionProps {
  onLoadComplete?: () => void;
}

export default function HeroSection({ onLoadComplete }: HeroSectionProps) {
  const [loaded, setLoaded] = useState(false);
  const [animationsCompleted, setAnimationsCompleted] = useState(false);
  const { theme } = useTheme();

  useEffect(() => {
    const timer = setTimeout(() => {
      setLoaded(true);
    }, 1000);

    return () => clearTimeout(timer);
  }, []);

  useEffect(() => {
    setCurrentTheme(theme);
  }, [theme]);

  useEffect(() => {
    if (loaded && onLoadComplete) {
      onLoadComplete();
    }
  }, [loaded, onLoadComplete]);

  return (
    <div className="relative w-full h-screen flex items-center justify-center snap-start">
      {loaded && (
        <WavyBackground 
          key={currentTheme} // Use currentTheme as a key to force re-render
          className="absolute inset-0 w-full h-full z-0" 
          theme={theme}  // Directly use the theme from useTheme
        />
      )}
      <div className="relative z-10 flex flex-col items-center justify-center text-center space-y-8">
        {loaded && (
          <>
            <BlurIn
              word="INTERNASH GLOBAL SERVICES"
              className="text-red-800 text-lg sm:text-xl md:text-3xl lg:text-4xl font-bold"
              onAnimationComplete={() => setAnimationsCompleted(true)}
            />
            <BlurIn
              word="Engineering, Repair, and Logistics Solutions"
              className="mt-4 text-black dark:text-white text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-bold tracking-tight leading-tight"
            />
            <TypingAnimation
              className="mt-4 text-black dark:text-white text-xl sm:text-2xl md:text-3xl lg:text-4xl leading-tight"
              text="Create value and a competitive edge for our clients"
              duration={3}
            />
          </>
        )}
        <motion.div
          className="mt-8"
          initial={{ opacity: 0 }}
          animate={{ opacity: animationsCompleted ? 1 : 0 }}
          transition={{ duration: 1 }}
        >
          <button className="relative inline-flex h-14 overflow-hidden rounded-full p-[1px] focus:outline-none focus:ring-2 focus:ring-slate-400 focus:ring-offset-2 focus:ring-offset-slate-50">
            <span className="absolute inset-[-1000%] animate-[spin_2s_linear_infinite] bg-[conic-gradient(from_90deg_at_50%_50%,#E2CBFF_0%,#393BB2_50%,#E2CBFF_100%)]" />
            <span className="inline-flex h-full w-full cursor-pointer items-center justify-center rounded-full bg-slate-950 px-6 py-2 text-lg font-medium text-white backdrop-blur-3xl">
              Contact Us
            </span>
          </button>
        </motion.div>
      </div>
    </div>
  );
}
