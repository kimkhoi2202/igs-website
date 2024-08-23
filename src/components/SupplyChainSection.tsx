"use client";
import React, { useState, useEffect } from 'react';
import Image from 'next/image';
import AnimatedBeamDemo from '@/components/ui/animated-beam';

interface SupplyChainSectionProps {
  onLoadComplete?: () => void;
}

export default function SupplyChainSection({ onLoadComplete }: SupplyChainSectionProps) {

  const [loaded, setLoaded] = useState(false);

  useEffect(() => {
    setTimeout(() => {
      setLoaded(true);
    }, 1000);

    if (loaded && onLoadComplete) {
      onLoadComplete();
    }
  }, [loaded, onLoadComplete]);

  return (
    <section id="solutions" className="relative w-full h-screen py-12 md:py-24 lg:py-32">
      <div className="container px-4 md:px-6 mx-auto text-center relative z-10">
        <h2 className="text-3xl font-bold tracking-tighter text-black dark:text-white">Supply Chain Solution</h2>
        {/* <div className="w-full h-auto rounded-lg mt-8">
          <Image
            src="/supply-chain-light-mode.png"
            width={1200}
            height={600}
            alt="Supply Chain Solution"
            className="w-full h-auto rounded-lg dark:hidden"
            style={{ aspectRatio: '1200/600', objectFit: 'contain' }}
          />
          <Image
            src="/supply-chain-dark-mode.png"
            width={1200}
            height={600}
            alt="Supply Chain Solution"
            className="w-full h-auto rounded-lg hidden dark:block"
            style={{ aspectRatio: '1200/600', objectFit: 'contain' }}
          />
        </div> */}
        <div className="relative w-full h-full rounded-lg">
          <AnimatedBeamDemo />
        </div>
        <p className="text-sm text-gray-500 mt-4">
          Icons made by Freepik from <a href="https://www.flaticon.com" target="_blank" rel="noopener noreferrer" className="underline">www.flaticon.com</a>
        </p>
      </div>
    </section>
  );
}
