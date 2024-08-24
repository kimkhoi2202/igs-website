"use client";

import { useState, useEffect } from 'react';
import { Button } from '@/components/ui/button';
import { Separator } from '@/components/ui/separator';
import { useLanguage } from '@/components/context/LanguageContext'; // Assuming you're using LanguageContext

function FacebookIcon(props: Readonly<React.SVGProps<SVGSVGElement>>) {
  return (
    <svg
      {...props}
      xmlns="http://www.w3.org/2000/svg"
      width="24"
      height="24"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <path d="M18 2h-3a5 5 0 0 0-5 5v3H7v4h3v8h4v-8h3l1-4h-4V7a1 1 0 0 1 1-1h3z" />
    </svg>
  );
}

function LinkedinIcon(props: Readonly<React.SVGProps<SVGSVGElement>>) {
  return (
    <svg
      {...props}
      xmlns="http://www.w3.org/2000/svg"
      width="24"
      height="24"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <path d="M16 8a6 6 0 0 1 6 6v7h-4v-7a2 2 0 0 0-2-2 2 2 0 0 0-2 2v7h-4v-7a6 6 0 0 1 6-6z" />
      <rect width="4" height="12" x="2" y="9" />
      <circle cx="4" cy="4" r="2" />
    </svg>
  );
}

interface FooterProps {
  onLoadComplete?: () => void;
}

export default function Footer({ onLoadComplete }: FooterProps) {
  const [loaded, setLoaded] = useState(false);
  const [translations, setTranslations] = useState<any>(null);
  const { language } = useLanguage(); // Get the current language

  const fetchTranslations = async (lang: string) => {
    try {
      const response = await fetch(`/Text/Footer-text.json`);
      const data = await response.json();
      setTranslations(data[lang] || data['en']); // Default to English if the language is not found
    } catch (error) {
      console.error("Error fetching translations:", error);
      setTranslations({}); // Fallback to an empty object
    }
  };

  useEffect(() => {
    fetchTranslations(language); // Fetch translations when the language changes
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
    <footer className="bg-background pb-4 w-full"> {/* Bottom padding only */}
      <div className="container flex flex-col items-center justify-between max-w-7xl mx-auto">
        <Separator className="my-4" />
        <div className="flex gap-4">
          <Button variant="outline" className="rounded-full">
            <FacebookIcon className="w-5 h-5" />
          </Button>
          <Button variant="outline" className="rounded-full">
            <LinkedinIcon className="w-5 h-5" />
          </Button>
        </div>
        <p className="mt-4 text-sm text-primary-foreground">
          {translations?.footerText || 'Copyrights © 2021. All Rights Reserved.'}
        </p>
      </div>
    </footer>
  );
}
