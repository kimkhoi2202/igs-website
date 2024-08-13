"use client";

import { useEffect, useState } from 'react';
import Image from 'next/image';
import { HeroHighlight, Highlight } from '@/components/ui/hero-highlight';
import { CardContainer, CardBody, CardItem } from '@/components/ui/3d-card';
import BoxReveal from '@/components/magicui/box-reveal';

interface HeroSectionProps {
  onLoadComplete?: () => void;
}

export default function HeroSection({ onLoadComplete }: HeroSectionProps) {
  const [loaded, setLoaded] = useState(false);

  useEffect(() => {
    // Simulate loading (replace with real loading logic)
    const timer = setTimeout(() => {
      setLoaded(true);
    }, 1000); // Adjust timing as needed

    return () => clearTimeout(timer); // Cleanup timeout on component unmount
  }, []);

  useEffect(() => {
    if (loaded && onLoadComplete) {
      onLoadComplete(); // Notify when loading is complete
    }
  }, [loaded, onLoadComplete]);

  return (
    <HeroHighlight
      containerClassName="w-full h-screen bg-[url('/hero-bg.jpg')] bg-cover bg-center flex items-center justify-center snap-start"
    >
      <div className="relative flex flex-col md:flex-row items-center justify-center text-center h-full">
        <div className="flex flex-col items-center w-full md:w-3/4 lg:w-2/3 mb-24 md:mb-0">
          <BoxReveal width="100%" boxColor="#c53030" startAnimation={loaded}>
            <span className="text-red-800 text-base font-bold">INTERNASH GLOBAL SERVICES</span>
          </BoxReveal>
          <BoxReveal width="100%" boxColor="#c53030" startAnimation={loaded}>
            <h1 className="mt-2 text-black dark:text-white text-3xl sm:text-4xl md:text-5xl lg:text-6xl tracking-tight">
              <Highlight className="font-bold">Engineering, Repair,</Highlight>
            </h1>
          </BoxReveal>
          <BoxReveal width="100%" boxColor="#c53030" startAnimation={loaded}>
            <h1 className="mt-2 text-black dark:text-white text-3xl sm:text-4xl md:text-5xl lg:text-6xl tracking-tight">
              <Highlight className="font-bold">and Logistics Solutions</Highlight>
            </h1>
          </BoxReveal>
          <div className="mt-2 flex flex-col items-center text-lg md:text-xl text-black dark:text-white">
            <BoxReveal width="100%" boxColor="#c53030" startAnimation={loaded}>
              <span className="mt-2">
                <h1>Engineering, Repair, & Logistics solutions</h1>
                <h1>Create value and a competitive edge for our clients</h1>
              </span>
            </BoxReveal>
          </div>
          <div className="mt-5 flex flex-col md:flex-row md:items-center md:justify-center">
            <button className="relative inline-flex h-12 overflow-hidden rounded-full p-[1px] focus:outline-none focus:ring-2 focus:ring-slate-400 focus:ring-offset-2 focus:ring-offset-slate-50">
              <span className="absolute inset-[-1000%] animate-[spin_2s_linear_infinite] bg-[conic-gradient(from_90deg_at_50%_50%,#E2CBFF_0%,#393BB2_50%,#E2CBFF_100%)]" />
              <span className="inline-flex h-full w-full cursor-pointer items-center justify-center rounded-full bg-slate-950 px-3 py-1 text-sm font-medium text-white backdrop-blur-3xl">
                Contact Us
              </span>
            </button>
          </div>
        </div>
        <div className="relative w-full md:w-1/3 mt-24 md:mt-0 md:ml-24 flex items-center justify-center">
          <CardContainer className="inter-var">
            <CardBody className="relative group/card w-[550px] h-[500px] rounded-lg">
              <CardItem translateZ={50} className="w-full h-full">
                <Image
                  src="/hero.png"
                  width={550}
                  height={500}
                  alt="Hero"
                  className="rounded-lg object-cover w-full h-full group-hover/card:shadow-xl"
                  style={{ aspectRatio: '550/500', objectFit: 'cover' }}
                />
              </CardItem>
            </CardBody>
          </CardContainer>
        </div>
      </div>
    </HeroHighlight>
  );
}
