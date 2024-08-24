"use client"; 

import { useEffect, useState } from 'react';
import Image from 'next/image';
import { useLanguage } from '@/components/context/LanguageContext'; // Make sure this is the correct import path

interface DifferentiatorSectionProps {
  onLoadComplete?: () => void;
}

export default function DifferentiatorSection({ onLoadComplete }: DifferentiatorSectionProps) {
  const [loaded, setLoaded] = useState(false);
  const { language } = useLanguage();
  const [translations, setTranslations] = useState({
    title: '',
    content: [] as string[],
  });

  useEffect(() => {
    async function fetchTranslations() {
      const response = await fetch(`/Text/DifferentiatorSection-text.json`);
      const data = await response.json();
      setTranslations(data[language]);
    }

    fetchTranslations();
  }, [language]);

  useEffect(() => {
    // Simulate loading (replace with real loading logic)
    setTimeout(() => {
      setLoaded(true);
    }, 1000); // Adjust timing as needed

    if (loaded && onLoadComplete) {
      onLoadComplete(); // Notify when loading is complete
    }
  }, [loaded, onLoadComplete]);

  return (
    <section className="flex flex-col w-full py-12 md:py-12 lg:py-24 bg-[url('/hero-bg.jpg')] bg-cover bg-center gap-0">
      <div className="container px-4 md:px-6 mx-auto flex flex-col md:flex-row items-center justify-center gap-8">
        {/* Text Container */}
        <div className="w-full md:w-3/4 mb-12 md:mb-0">
          <h2 className="text-4xl font-bold tracking-tighter mb-8 w-full">{translations.title}</h2>
          <div className="space-y-8">
            {translations.content.map((text, index) => (
              <p key={index} className={`text-lg ${index === 2 ? 'text-xl font-bold' : 'text-muted-foreground'}`}>
                {text}
              </p>
            ))}
          </div>
        </div>
        {/* Images Container */}
        <div className="flex flex-col item-end gap-4 md:w-1/3">
          <Image
            src="/iso.png"
            width={300}
            height={200}
            alt=""
            className="object-cover rounded-lg"
            style={{ aspectRatio: '300/200', objectFit: 'contain' }}
          />
          <Image
            src="/anab.png"
            width={300}
            height={200}
            alt=""
            className="object-cover rounded-lg"
            style={{ aspectRatio: '300/200', objectFit: 'contain' }}
          />
        </div>
      </div>
      {/* Differentiator Image */}
      <div className="w-full flex justify-start mt-12">
        <Image
          src="/differentiator.png"
          width={1200}
          height={200}
          alt=""
          className="w-full h-auto rounded-lg object-contain"
          style={{ aspectRatio: '1200/200', objectFit: 'contain' }}
        />
      </div>
    </section>
  );
}
