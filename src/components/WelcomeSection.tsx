"use client";

import { useEffect, useState, useRef } from 'react';
import { motion, useAnimation } from 'framer-motion';
import Image from 'next/image';
import { Separator } from '@/components/ui/separator';
import { useLanguage } from '@/components/context/LanguageContext';


interface WelcomeSectionProps {
  onLoadComplete?: () => void;
}

export default function WelcomeSection({ onLoadComplete }: WelcomeSectionProps) {
  const imageControls = useAnimation();
  const textControls = useAnimation();
  const shadowControls = useAnimation();
  const sectionRef = useRef<HTMLDivElement>(null);
  const [loaded, setLoaded] = useState(false);
  const { language } = useLanguage();
  const [translations, setTranslations] = useState({
    title: '',
    subtitle: '',
    description: ''
  });

  useEffect(() => {
    async function fetchTranslations() {
      const response = await fetch(`/Text/WelcomeSection-text.json`);
      const data = await response.json();
      setTranslations(data[language]);
    }

    fetchTranslations();
  }, [language]);

  useEffect(() => {
    setTimeout(() => {
      setLoaded(true);
    }, 1000);

    if (loaded && onLoadComplete) {
      onLoadComplete();
    }
  }, [loaded, onLoadComplete]);

  useEffect(() => {
    const observerOptions = {
      root: null,
      rootMargin: '0px',
      threshold: 0.5,
    };

    const observer = new IntersectionObserver((entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          imageControls.start({ x: 0, opacity: 1 });
          textControls.start({ opacity: 1, x: 0 });
          shadowControls.start({ x: 0, y: 0, opacity: 1 });
        } else {
          imageControls.start({ x: -40 });
          textControls.start({ x: 40 });
          shadowControls.start({ x: -60, y: 20 });
        }
      });
    }, observerOptions);

    if (sectionRef.current) {
      observer.observe(sectionRef.current);
    }

    return () => {
      if (sectionRef.current) {
        observer.unobserve(sectionRef.current);
      }
    };
  }, [imageControls, textControls, shadowControls]);

  return (
    <section ref={sectionRef} className="w-full h-screen py-12 md:py-24 lg:py-32 snap-start">
      <div className="container grid grid-cols-1 md:grid-cols-2 gap-8 px-4 md:px-2">
        <div className="relative w-full sm:h-full md:h-auto order-2">
          <div className="relative w-full" style={{ aspectRatio: '550 / 400' }}>
            <motion.div
              animate={shadowControls}
              transition={{ duration: 1.0 }}
              initial={{ x: 50, opacity: 0 }}
              className="absolute bottom-[-40px] left-[-30px] w-full h-full z-0"
              style={{
                background: 'linear-gradient(135deg, #d32f2f, #b71c1c)',
                borderRadius: '12px',
              }}
            />
            <motion.div
              animate={imageControls}
              transition={{ duration: 1.0 }}
              initial={{ x: 50, opacity: 0 }}
              className="relative z-10"
              style={{ width: '100%', height: '100%', position: 'relative' }}
            >
              <Image
                src="/welcome.png"
                fill
                alt="Welcome"
                className="rounded-lg object-cover"
              />
            </motion.div>
          </div>
        </div>
        <motion.div
          animate={textControls}
          transition={{ duration: 1.0 }}
          initial={{ opacity: 0, x: -20 }}
          className="flex flex-col justify-center space-y-8 order-1 md:order-2"
        >
          <h2 className="text-lg sm:text-2xl md:text-3xl lg:text-4xl font-bold tracking-tighter">
            {translations.title}
          </h2>
          <Separator />
          <p className="font-bold text-base sm:text-lg md:text-xl lg:text-2xl text-muted-foreground">
            {translations.subtitle}
          </p>
          <p className="text-sm sm:text-base md:text-lg lg:text-xl text-muted-foreground">
            {translations.description}
          </p>
        </motion.div>
      </div>
    </section>
  );
}
