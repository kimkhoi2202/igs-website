"use client";

import { useEffect, useState, useRef } from 'react';
import { motion, useAnimation } from 'framer-motion';
import Image from 'next/image';
import { Separator } from '@/components/ui/separator';

interface WelcomeSectionProps {
  onLoadComplete?: () => void;
}

export default function WelcomeSection({ onLoadComplete }: WelcomeSectionProps) {
  const imageControls = useAnimation();
  const textControls = useAnimation();
  const shadowControls = useAnimation();
  const sectionRef = useRef<HTMLDivElement>(null);
  const [loaded, setLoaded] = useState(false);

  useEffect(() => {
    // Simulate loading (replace with real loading logic)
    setTimeout(() => {
      setLoaded(true);
    }, 1000); // Adjust timing as needed

    if (loaded && onLoadComplete) {
      onLoadComplete(); // Notify when loading is complete
    }
  }, [loaded, onLoadComplete]);

  useEffect(() => {
    const observerOptions = {
      root: null, // Use the viewport as the root
      rootMargin: '0px',
      threshold: 0.5 // Trigger when at least 50% of the section is visible
    };

    const observer = new IntersectionObserver((entries) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          // Section is partially or fully in view
          imageControls.start({ x: 0, opacity: 1 });
          textControls.start({ opacity: 1, x: 0 });
          shadowControls.start({ x: -10, y: 0, opacity: 1 });
        } else {
          // Section is not in view
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
      <div className="container grid md:grid-cols-2 gap-8 px-4 md:px-6">
        <div className="relative">
          <motion.div
            animate={shadowControls}
            initial={{ x: 50, opacity: 0 }} // Start off-screen to the right
            className="absolute bottom-[-40px] left-[-30px] w-full h-full bg-red-800 rounded-lg z-0"
          />
          <motion.div
            animate={imageControls}
            initial={{ x: 50, opacity: 0 }} // Start off-screen to the right
            className="relative z-10"
          >
            <Image
              src="/welcome.png"
              width={550}
              height={400}
              alt="Welcome"
              className="w-full h-auto rounded-lg object-cover"
              style={{ aspectRatio: '550/400', objectFit: 'cover' }}
            />
          </motion.div>
        </div>
        <motion.div
          animate={textControls}
          initial={{ opacity: 0, x: -20 }} // Start off-screen to the left
          className="flex flex-col justify-center space-y-4"
        >
          <h2 className="text-3xl font-bold tracking-tighter">Welcome to Internash Global Services, LLC</h2>
          <Separator />
          <p className="font-bold text-muted-foreground md:text-xl">
            Internash Global Services, As a group covers service operations across Asia, North America and EMEA
          </p>
          <p className="text-muted-foreground md:text-xl">
            Internash Global Services, LLC is a supply chain management service provider to large electronic
            manufactures who seek a complete global solutions that allows customers to focus on what they do the
            best- manufacturing, growing their business and staying competitive in the market place. We have a near
            site facility to facilitate rapid turn-around-time, so our customers can have the best service in the
            shortest time.
          </p>
        </motion.div>
      </div>
    </section>
  );
}
