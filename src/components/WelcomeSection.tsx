"use client";

import { useEffect, useRef, useState } from 'react';
import { motion, useAnimation } from 'framer-motion';
import Image from 'next/image';
import { Separator } from '@/components/ui/separator';

export default function WelcomeSection() {
  const [hasScrolled, setHasScrolled] = useState(false);
  const imageControls = useAnimation();
  const textControls = useAnimation();
  const imageRef = useRef<HTMLDivElement>(null);
  const textRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const handleScroll = () => {
      if (imageRef.current && textRef.current) {
        const imageRect = imageRef.current.getBoundingClientRect();
        const textRect = textRef.current.getBoundingClientRect();
        const windowHeight = window.innerHeight;

        // Check if the section is in view
        if ((imageRect.top + imageRect.height / 2) < windowHeight && imageRect.bottom > 0) {
          if (!hasScrolled) {
            // First-time view animation
            imageControls.start({ x: 0, opacity: 1, transition: { type: "spring", stiffness: 30 } });
            textControls.start({ opacity: 1, x: 0, transition: { type: "spring", stiffness: 30 } });
            setHasScrolled(true);
          } else {
            // Subsequent views animation
            imageControls.start({ x: 0, transition: { type: "spring", stiffness: 30 } });
            textControls.start({ opacity: 1, x: 0, transition: { type: "spring", stiffness: 30 } });
          }
        } else {
          if (!hasScrolled) {
            // Initial positions for first-time view
            imageControls.start({ x: 50, opacity: 0 });
            textControls.start({ opacity: 0, x: -20 });
          } else {
            // Reset positions for subsequent views
            imageControls.start({ x: 50 });
            textControls.start({ opacity: 0, x: -20 });
          }
        }
      }
    };

    // Initial state setup
    imageControls.set({ x: 50, opacity: 0 });
    textControls.set({ opacity: 0, x: -20 });

    // Add scroll event listener
    window.addEventListener('scroll', handleScroll);
    
    // Initial call to handleScroll for page load
    handleScroll();
    
    return () => {
      window.removeEventListener('scroll', handleScroll);
    };
  }, [hasScrolled, imageControls, textControls]);

  return (
    <section className="w-full py-12 md:py-24 lg:py-32">
      <div className="container grid md:grid-cols-2 gap-8 px-4 md:px-6">
        <motion.div
          ref={imageRef}
          animate={imageControls}
          initial={{ x: 50, opacity: 0 }} // Start off-screen to the right
          className="image-container"
        >
          <Image
            src="/placeholder.svg"
            width={550}
            height={400}
            alt="Welcome"
            className="w-full h-auto rounded-lg object-cover"
            style={{ aspectRatio: '550/400', objectFit: 'cover' }}
          />
        </motion.div>
        <motion.div
          ref={textRef}
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
