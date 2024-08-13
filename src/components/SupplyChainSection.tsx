"use client";
import React, { useState, useEffect } from 'react';
import Image from 'next/image';

interface SupplyChainSectionProps {
  onLoadComplete?: () => void;
}

export default function SupplyChainSection({ onLoadComplete }: SupplyChainSectionProps) {

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

  return (
    <section className="relative w-full py-12 md:py-24 lg:py-32 bg-black">
      <div className="container px-4 md:px-6 mx-auto text-center relative z-10">
        <h2 className="text-3xl font-bold tracking-tighter text-white">Supply Chain Solution</h2>
        <div className="w-full h-auto rounded-lg mt-8">
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
        </div>
      </div>
    </section>
  );
}
