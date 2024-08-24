"use client";

import { useState, useEffect, useRef } from 'react';
import { motion, useAnimation } from 'framer-motion';
import Image from 'next/image';
import { Separator } from '@/components/ui/separator';
import { useLanguage } from '@/components/context/LanguageContext';

interface ExpertiseItem {
  title: string;
  description: string;
}

interface ExpertiseSectionProps {
  onLoadComplete?: () => void;
}

export default function ExpertiseSection({ onLoadComplete }: ExpertiseSectionProps) {
  const imageControls = useAnimation();
  const textControls = useAnimation();
  const shadowControls = useAnimation();
  const sectionRef = useRef<HTMLDivElement>(null);
  const [loaded, setLoaded] = useState(false);
  const { language } = useLanguage();
  const [translations, setTranslations] = useState({
    title: '',
    items: [] as ExpertiseItem[],
  });

  useEffect(() => {
    async function fetchTranslations() {
      const response = await fetch(`/Text/ExpertiseSection-text.json`);
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
          imageControls.start({ x: 50 });
          textControls.start({ x: -50 });
          shadowControls.start({ x: 50, y: 20});
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
        <motion.div
          animate={textControls}
          transition={{ duration: 1.0 }}
          initial={{ opacity: 0, x: -20 }}
          className="flex flex-col justify-center space-y-8 order-1"
        >
          <h2 className="sm:text-2xl md:text-3xl lg:text-4xl font-bold tracking-tighter">
            {translations.title}
          </h2>
          <Separator />
          <ul className="sm:space-y-2 md:space-y-3 lg:space-y-4">
            {translations.items.map((item) => (
              <li key={item.title} className="flex items-start gap-4">
                <span className="w-12 h-12 text-primary">&#10003;</span>
                <span className="flex-1 sm:text-lg md:text-xl lg:text-2xl">
                  <b>{item.title}</b> {item.description}
                </span>
              </li>
            ))}
          </ul>
        </motion.div>
        <div className="relative w-full order-2">
          <div className="relative w-full" style={{ aspectRatio: '550 / 400' }}>
            <motion.div
              animate={shadowControls}
              transition={{ duration: 1.0 }}
              initial={{ x: 50, opacity: 0 }}
              className="absolute bottom-[-20px] right-[-30px] w-full h-full z-0"
              style={{
                background: 'linear-gradient(135deg, #d32f2f, #b71c1c)',
                borderRadius: '12px',
              }}
            />
            <motion.div
              animate={imageControls}
              transition={{ duration: 1.0 }}
              initial={{ x: 50, opacity: 0 }}
              className="relative w-full h-full z-10"
              style={{ width: '100%', height: '100%', position: 'relative' }}
            >
              <Image
                src="/expertise.png"
                fill
                alt="Expertise"
                className="rounded-lg object-cover"
              />
            </motion.div>
          </div>
        </div>
      </div>
    </section>
  );
}
