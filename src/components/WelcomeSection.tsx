"use client";

import { useEffect, useRef } from 'react';
import Image from 'next/image';
import { Separator } from '@/components/ui/separator';

export default function WelcomeSection() {
  const imageRef = useRef<HTMLImageElement>(null);

  useEffect(() => {
    const handleScroll = () => {
      if (imageRef.current) {
        const rect = imageRef.current.getBoundingClientRect();
        const windowHeight = window.innerHeight;

        if (rect.top >= 0 && rect.bottom <= windowHeight) {
          imageRef.current.classList.add('active');
        } else {
          imageRef.current.classList.remove('active');
        }
      }
    };

    window.addEventListener('scroll', handleScroll);

    return () => {
      window.removeEventListener('scroll', handleScroll);
    };
  }, []);

  return (
    <section className="w-full py-12 md:py-24 lg:py-32">
      <div className="container grid md:grid-cols-2 gap-8 px-4 md:px-6">
        <div className="image-container">
          <Image
            src="/placeholder.svg"
            width={550}
            height={400}
            alt="Welcome"
            className="w-full h-auto rounded-lg object-cover image-transition"
            style={{ aspectRatio: '550/400', objectFit: 'cover' }}
            ref={imageRef}
          />
        </div>
        <div className="flex flex-col justify-center space-y-4">
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
        </div>
      </div>
    </section>
  );
}
