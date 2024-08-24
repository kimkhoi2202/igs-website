"use client";

import React, { useEffect, useState } from "react";
import { motion, useAnimation } from "framer-motion";
import { Spotlight } from "@/components/ui/spotlight";
import { useInView } from "react-intersection-observer";
import { useLanguage } from "@/components/context/LanguageContext"; // Import your custom language context

interface VisionSectionProps {
  onLoadComplete?: () => void;
}

export default function VisionSection({ onLoadComplete }: VisionSectionProps) {
  const controls = useAnimation();
  const [ref, inView] = useInView({
    threshold: 0.5,
    triggerOnce: true,
  });

  const { language } = useLanguage(); // Use the custom language context

  const [translations, setTranslations] = useState({
    title: "",
    description: "",
    additional: "",
  });

  useEffect(() => {
    async function fetchTranslations() {
      const response = await fetch(`/Text/VisionSection-text.json`);
      const data = await response.json();
      setTranslations(data[language]);
    }

    fetchTranslations();
  }, [language]);

  useEffect(() => {
    if (inView) {
      controls.start("visible");
    }
  }, [controls, inView]);

  const [loaded, setLoaded] = useState(false);

  useEffect(() => {
    setTimeout(() => {
      setLoaded(true);
    }, 1000); 

    if (loaded && onLoadComplete) {
      onLoadComplete(); 
    }
  }, [loaded, onLoadComplete]);

  return (
    <section ref={ref} className="w-full h-screen py-12 md:py-24 lg:py-32 bg-background relative overflow-hidden">
      <motion.div
        initial="hidden"
        animate={controls}
        variants={{
          hidden: { opacity: 0, scale: 0.5 },
          visible: { opacity: 1, scale: 1 },
        }}
        transition={{ duration: 1, ease: "easeOut" }}
        className="absolute inset-0"
      >
        <Spotlight className="w-screen h-full -top-44 left-4 md:left-64 md:-top-24" fill="white" />
      </motion.div>
      <div className="container px-4 md:px-6 text-primary-foreground max-w-6xl mx-auto relative z-10">
        <div className="max-w-4xl mx-auto text-center space-y-8">
          <h2 className="text-6xl font-bold text-black dark:text-white tracking-tighter">{translations.title}</h2>
          <p className="text-2xl text-black dark:text-white">
            {translations.description}
          </p>
          <h3 className="text-2xl text-black dark:text-white font-semibold">
            {translations.additional}
          </h3>
        </div>
      </div>
    </section>
  );
}
