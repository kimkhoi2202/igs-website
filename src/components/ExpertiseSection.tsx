"use client";

import { useState, useEffect, useRef } from 'react';
import { motion, useAnimation } from 'framer-motion';
import Image from 'next/image';

interface CheckIconProps {
  readonly className?: string;
}

function CheckIcon({ className }: CheckIconProps) {
  return (
    <svg
      className={className}
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
      <path d="M20 6 9 17l-5-5" />
    </svg>
  );
}

interface ExpertiseItem {
  title: string;
  description: string;
}

const expertiseItems: readonly ExpertiseItem[] = [
  { title: '3rd Party Logistics (3PL)', description: 'including warehousing, order fulfillment, transportation, kitting and customization options.' },
  { title: 'Contract Assembly Service', description: 'for smart devices and equipment with first class manufacture setting.' },
  { title: 'Electronics', description: 'repairs and refurbishments across smart-devices, LTE mobility, network and portable devices.' },
  { title: 'Call Center Services', description: 'for Technical Support and Customer Service applications.' },
];

interface ExpertiseSectionProps {
  onLoadComplete?: () => void;
}

export default function ExpertiseSection({ onLoadComplete }: ExpertiseSectionProps) {
  const [loaded, setLoaded] = useState(false);
  const [imageHeight, setImageHeight] = useState<number | null>(null);
  const [imageWidth, setImageWidth] = useState<number | null>(null);

  const imageControls = useAnimation();
  const textControls = useAnimation();
  const shadowControls = useAnimation();
  const imageRef = useRef<HTMLDivElement>(null);
  const textRef = useRef<HTMLDivElement>(null);
  const shadowRef = useRef<HTMLDivElement>(null);

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
      threshold: 0.5 
    };

    const observer = new IntersectionObserver((entries) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          imageControls.start({ x: 0, opacity: 1 });
          textControls.start({ opacity: 1, x: 0 });
          shadowControls.start({ x: -20, y: -30, opacity: 1 });
        } else {
          imageControls.start({ x: 40 });
          textControls.start({ x: -40 });
          shadowControls.start({ x: 50 });
        }
      });
    }, observerOptions);

    if (textRef.current) {
      observer.observe(textRef.current);
    }

    return () => {
      if (textRef.current) {
        observer.unobserve(textRef.current);
      }
    };
  }, [imageControls, textControls, shadowControls]);

  const handleImageLoad = (event: React.SyntheticEvent<HTMLImageElement, Event>) => {
    const { naturalWidth, naturalHeight } = event.currentTarget;
    setImageWidth(naturalWidth);
    setImageHeight(naturalHeight);
  };

  return (
    <section id="expertise" className="w-full h-screen py-12 md:py-24 lg:py-32">
      <div className="container grid md:grid-cols-2 gap-8 px-4 md:px-6">
        <motion.div
          ref={textRef}
          animate={textControls}
          transition={{ duration: 1.0 }}
          initial={{ opacity: 0, x: 20 }} 
          className="flex flex-col justify-center space-y-8"
        >
          <h2 className="sm:text-2xl md:text-3xl lg:text-4xl font-bold tracking-tighter">IGS Expertise</h2>
          <ul className="sm:space-y-2 md:space-y-3 lg:space-y-4">
            {expertiseItems.map((item) => (
              <li key={item.title} className="flex items-start gap-4">
                <CheckIcon className="w-12 h-12 text-primary" />
                <span className="flex-1 sm:text-lg md:text-xl lg:text-2xl">
                  <b>{item.title}</b> {item.description}
                </span>
              </li>
            ))}
          </ul>
        </motion.div>
        <div className="relative">
          {/* Container to ensure consistent shadow behavior */}
          <div className="relative" style={{ aspectRatio: '550 / 400' }}>
            {/* Shadow element */}
            <motion.div
              ref={shadowRef}
              animate={shadowControls}
              transition={{ duration: 1.0 }}
              initial={{ x: -60, opacity: 0 }}
              className="absolute bottom-[-40px] left-[-50px] z-0"
              style={{
                width: imageWidth ? `${imageWidth}px` : '100%',
                height: imageHeight ? `${imageHeight}px` : '100%',
                background: 'linear-gradient(135deg, #d32f2f, #b71c1c)',
                borderRadius: '12px',
                position: 'absolute', // Ensures it stays in place
              }}
            />
            <motion.div
              ref={imageRef}
              animate={imageControls}
              transition={{ duration: 1.0 }}
              initial={{ x: 100, opacity: 0 }}
              className="relative z-10"
            >
              <Image
                src="/expertise.png"
                width={550}
                height={400}
                alt="Expertise"
                className="w-full h-auto rounded-lg object-cover"
                style={{ aspectRatio: '550/400', objectFit: 'cover' }}
                onLoad={handleImageLoad}
              />
            </motion.div>
          </div>
        </div>
      </div>
    </section>
  );
}
