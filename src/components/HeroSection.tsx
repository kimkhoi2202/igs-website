"use client";

import { useEffect, useState } from 'react';
import { useTheme } from 'next-themes';
import TypingAnimation from '@/components/magicui/typing-animation';
import BlurIn from '@/components/magicui/blur-in';
import { WavyBackground } from '@/components/ui/wavy-background';
import { motion } from 'framer-motion';
import { useLanguage } from '@/components/context/LanguageContext';

interface HeroSectionProps {
  onLoadComplete?: () => void;
}

interface Translations {
  [key: string]: {
    title: string;
    subtitle: string;
    description: string;
    button: string;
  };
}

export default function HeroSection({ onLoadComplete }: HeroSectionProps) {
  const [loaded, setLoaded] = useState(false);
  const [animationsCompleted, setAnimationsCompleted] = useState(false);
  const { theme } = useTheme(); // Get the current theme
  const [currentTheme, setCurrentTheme] = useState(theme);
  const { language } = useLanguage(); // Use language context to get the current language
  const [translations, setTranslations] = useState<Translations>({});

  useEffect(() => {
    const fetchTranslations = async () => {
      try {
        const response = await fetch('/Text/HeroSection-text.json');
        const data: Translations = await response.json();
        setTranslations(data);
      } catch (error) {
        console.error('Error fetching translations:', error);
      }
    };

    fetchTranslations();
  }, []);

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
    <div id="home" className="relative w-full h-screen flex items-center justify-center snap-start">
      {loaded && (
        <WavyBackground
          key={currentTheme} // Use currentTheme as a key to force re-render
          className="absolute inset-0 w-full h-full z-0"
          theme={currentTheme} // Pass the currentTheme as a prop to WavyBackground
        />
      )}
      <div className="relative z-10 flex flex-col items-center justify-center text-center space-y-8">
        {loaded && translations[language] && (
          <>
            <BlurIn
              word={translations[language].title} // Use language context for title
              className="text-red-800 text-lg sm:text-xl md:text-3xl lg:text-4xl font-bold"
              onAnimationComplete={() => setAnimationsCompleted(true)}
            />
            <BlurIn
              word={translations[language].subtitle} // Use language context for subtitle
              className="mt-4 text-black dark:text-white text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-bold tracking-tight leading-tight"
            />
            <TypingAnimation
              key={language}
              className="mt-4 text-black dark:text-white text-xl sm:text-2xl md:text-3xl lg:text-4xl leading-tight"
              text={translations[language].description} // Use language context for description
              duration={50}
            />
          </>
        )}
        <motion.div
          className="mt-8"
          initial={{ opacity: 0 }} // Button starts with opacity 0
          animate={{ opacity: animationsCompleted ? 1 : 0 }} // Button fades in when animations are complete
          transition={{ duration: 1 }} // Transition duration
        >
          <button className="relative inline-flex h-14 overflow-hidden rounded-full p-[1px] focus:outline-none focus:ring-2 focus:ring-slate-400 focus:ring-offset-2 focus:ring-offset-slate-50">
            <span className="absolute inset-[-1000%] animate-[spin_2s_linear_infinite] bg-[conic-gradient(from_90deg_at_50%_50%,#E2CBFF_0%,#393BB2_50%,#E2CBFF_100%)]" />
            <span className="inline-flex h-full w-full cursor-pointer items-center justify-center rounded-full bg-slate-950 px-6 py-2 text-lg font-medium text-white backdrop-blur-3xl">
              {translations[language]?.button} {/* Use language context for button text */}
            </span>
          </button>
        </motion.div>
      </div>
    </div>
  );
}
