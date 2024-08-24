"use client";
import { useEffect, useState } from 'react';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Button } from '@/components/ui/button';
import Footer from '@/components/Footer';
import { useLanguage } from '@/components/context/LanguageContext'; // Assuming you're using a LanguageContext

interface ContactSectionProps {
  onLoadComplete?: () => void;
}

export default function ContactSection({ onLoadComplete }: ContactSectionProps) {
  const [loaded, setLoaded] = useState(false);
  const [translations, setTranslations] = useState<any>(null);
  const { language } = useLanguage(); // Get the current language

  const fetchTranslations = async (lang: string) => {
    try {
      const response = await fetch(`/Text/ContactSection-text.json`);
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
    <section>
      <div className="flex flex-col py-12 md:py-24 lg:py-32 bg-[url('/hero-bg.jpg')] bg-cover bg-center">
        <div className="container px-4 md:px-6 grid md:grid-cols-2 gap-8">
          <div className="flex-1">
            <h2 className="text-3xl font-bold tracking-tighter">
              {translations?.title || 'Please get in touch with us'}
            </h2>
            <p className="text-muted-foreground md:text-xl mt-2">
              {translations?.description || 
                "We're always excited to collaborate on new ideas and projects. If you're interested in a teaming opportunity or just want to touch base, we'd love to hear from you!"
              }
            </p>
          </div>
          <div className="max-w-2xl mx-auto">
            <h2 className="text-3xl font-bold tracking-tighter text-center">
              {translations?.contactUs || 'Contact Us'}
            </h2>
            <p className="text-muted-foreground md:text-xl text-center mt-2">
              {translations?.formDescription || 'Fill out the form below to learn more about our supply chain solutions.'}
            </p>
            <form className="mt-6 grid grid-cols-1 gap-6">
              <Input type="text" placeholder={translations?.namePlaceholder || "Name*"} required />
              <Input type="email" placeholder={translations?.emailPlaceholder || "Email*"} required pattern="[a-z0-9._%+-]+@[a-z0-9.-]+.[a-z]{2,}$" />
              <Input type="tel" placeholder={translations?.phonePlaceholder || "Phone*"} required pattern="[0-9]{3}-[0-9]{3}-[0-9]{4}" />
              <Textarea placeholder={translations?.messagePlaceholder || "Message"} />
              <Button type="submit">{translations?.submitButton || 'Submit'}</Button>
            </form>
          </div>  
        </div> 
        <Footer />       
      </div>
    </section>
  );
}
