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
        <div className="relative w-full order-2">
          {/* Image container with responsive height */}
          <div className="relative w-full" style={{ aspectRatio: '550 / 400' }}>
            {/* Shadow element */}
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
            {/* Image */}
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
          <h2 className="sm:text-2xl md:text-3xl lg:text-4xl font-bold tracking-tighter">
            Welcome to Internash Global Services, LLC
          </h2>
          <Separator />
          <p className="font-bold sm:text-lg md:text-xl lg:text-2xl text-muted-foreground">
            Internash Global Services, As a group covers service operations across Asia, North America and EMEA
          </p>
          <p className="sm:text-base md:text-lg lg:text-xl text-muted-foreground">
            Internash Global Services, LLC is a supply chain management service provider to large electronic
            manufacturers who seek a complete global solution that allows customers to focus on what they do
            best—manufacturing, growing their business, and staying competitive in the marketplace. We have a
            near-site facility to facilitate rapid turnaround time, so our customers can have the best service in
            the shortest time.
          </p>
        </motion.div>
      </div>
    </section>
  );
}
