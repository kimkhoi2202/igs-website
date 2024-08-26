"use client";

import { BackgroundGradient } from "@/components/ui/background-gradient";
import Image from "next/image";
import React, { useState, useEffect } from "react";
import { useLanguage } from "@/components/context/LanguageContext";

interface Service {
  icon: string;
  heading: string;
  text: string;
}

interface ServicesData {
  title: string;
  services: Service[];
}

interface ServicesSectionProps {
  onLoadComplete?: () => void;
}

export default function ServicesSection({ onLoadComplete }: ServicesSectionProps) {
  const [loaded, setLoaded] = useState(false);
  const [services, setServices] = useState<ServicesData>({
    title: "",
    services: [],
  });
  const { language } = useLanguage();

  useEffect(() => {
    async function fetchServicesData() {
      const response = await fetch(`/Text/ServicesSection-text.json`);
      const data = await response.json();
      setServices(data[language] || data.en);
    }

    fetchServicesData();
  }, [language]);

  useEffect(() => {
    setTimeout(() => {
      setLoaded(true);
    }, 1000);

    if (loaded && onLoadComplete) {
      onLoadComplete();
    }
  }, [loaded, onLoadComplete]);

  return (
    <section id="services" className="w-full py-12 flex flex-col items-center justify-center relative overflow-hidden">
      <h2 className="text-center sm:text-3xl md:text-4xl lg:text-5xl font-bold mb-12 text-gray-900 dark:text-gray-50">
        {services.title}
      </h2>
      <div className="flex flex-wrap gap-6 justify-center">
        {services.services.map((service, index) => (
          <BackgroundGradient key={index} containerClassName="w-full max-w-xs flex">
            <div
              className="
                group w-full overflow-hidden relative card rounded-3xl shadow-xl flex flex-col p-4 border border-transparent bg-white dark:bg-neutral-900 hover:shadow-2xl transition-shadow duration-300
                h-96 sm:h-80 md:h-72 lg:h-64
                min-w-full sm:min-w-[calc(50%-12px)] lg:min-w-[calc(33%-12px)] xl:min-w-[calc(20%-12px)]"
            >
              {/* Icon and Title */}
              <div className="flex items-center gap-4 mb-4">
                <Image
                  src={service.icon}
                  width={50}
                  height={50}
                  alt={service.heading}
                  className=""
                />
                <h1 className="font-bold sm:text-2xl md:text-3xl lg:text-4xl text-gray-900 dark:text-gray-50">
                  {service.heading}
                </h1>
              </div>

              {/* Centered Text Container */}
              <div className="flex-grow flex items-center">
                <div className="text-container text-left">
                  <p className="font-normal sm:text-base md:text-lg lg:text-xl text-gray-900 dark:text-gray-50">
                    {service.text}
                  </p>
                </div>
              </div>
            </div>
          </BackgroundGradient>
        ))}
      </div>
    </section>
  );
}
