"use client";
import React, { useState, useEffect } from 'react';
import Image from 'next/image';
import { AnimatedBeamHorizontal, AnimatedBeamVertical } from '@/components/ui/animated-beam'; // Assuming this exists
import { useLanguage } from '@/components/context/LanguageContext';

interface SupplyChainSectionProps {
  onLoadComplete?: () => void;
}

export default function SupplyChainSection({ onLoadComplete }: SupplyChainSectionProps) {
  const [loaded, setLoaded] = useState(false);
  const [isMobile, setIsMobile] = useState(false);
  const { language } = useLanguage();
  const [translations, setTranslations] = useState({
    title: '',
    credits: ''
  });

  // Fetch translations based on selected language
  useEffect(() => {
    async function fetchTranslations() {
      const response = await fetch(`/Text/SupplyChainSection-text.json`);
      const data = await response.json();
      setTranslations(data[language]);
    }

    fetchTranslations();
  }, [language]);

  // Detect screen width to toggle between horizontal and vertical beam
  useEffect(() => {
    const handleResize = () => {
      setIsMobile(window.innerWidth < 650);
    };

    handleResize(); // Initial check on component mount
    window.addEventListener('resize', handleResize); // Add event listener

    return () => {
      window.removeEventListener('resize', handleResize); // Cleanup listener on unmount
    };
  }, []);

  // Simulate loading (replace with real loading logic)
  useEffect(() => {
    setTimeout(() => {
      setLoaded(true);
    }, 1000);

    if (loaded && onLoadComplete) {
      onLoadComplete(); // Notify when loading is complete
    }
  }, [loaded, onLoadComplete]);

  return (
    <section id="solutions" className="relative w-full h-screen py-12 md:py-24 lg:py-32">
      <div className="container px-4 md:px-6 mx-auto text-center relative z-10">
        <h2 className="text-3xl font-bold tracking-tighter text-black dark:text-white">
          {translations.title}
        </h2>
        <div className="relative w-full h-full rounded-lg">
          {/* Conditionally render the beam based on screen width */}
          {isMobile ? <AnimatedBeamVertical /> : <AnimatedBeamHorizontal />}
        </div>
        <p className="text-sm text-gray-500 mt-4">
          {translations.credits}
        </p>
      </div>
    </section>
  );
}
