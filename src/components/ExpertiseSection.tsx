"use client";

import { useEffect, useRef } from 'react';
import { motion, useAnimation } from 'framer-motion';
import Image from 'next/image';
import { Separator } from '@/components/ui/separator';

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

export default function ExpertiseSection() {
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

        // Check image position
        if ((imageRect.top + (imageRect.height / 3) * 2) >= 0 && imageRect.bottom <= windowHeight) {
          imageControls.start({ x: 0, opacity: 1 });
        } else {
          imageControls.start({ x: 100, opacity: 0 }); // Adjust to move from right to left
        }

        // Check text position
        if ((textRect.top + (textRect.height / 3) * 2) >= 0 && textRect.bottom <= windowHeight) {
          textControls.start({ opacity: 1, x: 0 });
        } else {
          textControls.start({ opacity: 0, x: -20 });
        }
      }
    };

    // Initial animation setup
    imageControls.set({ x: 100, opacity: 0 });
    textControls.set({ opacity: 0, x: -20 });

    // Add scroll event listener
    window.addEventListener('scroll', handleScroll);

    return () => {
      window.removeEventListener('scroll', handleScroll);
    };
  }, [imageControls, textControls]);

  return (
    <section className="w-full py-12 md:py-24 lg:py-32 bg-[url('/hero-bg.jpg')] bg-cover bg-center">
      <div className="container grid md:grid-cols-2 gap-8 px-4 md:px-6">
        <motion.div
          ref={textRef}
          animate={textControls}
          initial={{ opacity: 0, x: -20 }} // Start off-screen to the left
          className="flex flex-col justify-center space-y-4"
        >
          <h2 className="text-3xl font-bold tracking-tighter">IGS Expertise</h2>
          <ul className="space-y-2">
            {expertiseItems.map((item) => (
              <li key={item.title} className="flex items-start gap-2">
                <CheckIcon className="w-6 h-6 text-primary" />
                <span className="flex-1">
                  <b>{item.title}</b> {item.description}
                </span>
              </li>
            ))}
          </ul>
        </motion.div>
        <motion.div
          ref={imageRef}
          animate={imageControls}
          initial={{ x: 100, opacity: 0 }} // Start off-screen to the right
          className="flex items-center justify-center"
        >
          <Image
            src="/placeholder.svg"
            width={550}
            height={400}
            alt="Expertise"
            className="w-full h-auto rounded-lg object-cover"
            style={{ aspectRatio: '550/400', objectFit: 'cover' }}
          />
        </motion.div>
      </div>
    </section>
  );
}
