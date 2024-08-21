"use client";

import { BackgroundGradient } from "@/components/ui/background-gradient";
import Image from "next/image";
import React, { useState, useEffect } from 'react';

interface ServicesSectionProps {
  onLoadComplete?: () => void;
}

const services = [
  {
    icon: "/section/truck.png",
    heading: "Depot Repair Services",
    text: "IGS supports RMA processing, triage, component level repairs, refurbishment, and QC testing, to return electronic devices to their original specifications.",
  },
  {
    icon: "/section/warehouse.png",
    heading: "Warehouse Distribution",
    text: "IGS can unburden customers from the hassles of recalling for a product returns, RMA management and any other process that returns goods from the point of consumption to the point of origin.",
  },
  {
    icon: "/section/fulfill.png",
    heading: "Fulfillment",
    text: "IGS can handle wide channel fulfillment by directly integrating our 3PL technology with a client’s ERP system for PO ordering process.",
  },
  {
    icon: "/section/repair.png",
    heading: "Level 2 Repair",
    text: "INTERNASH REPAIR CENTER provides innovative solution by customizing to Customer's operation needs.",
  },
  {
    icon: "/section/truck.png",
    heading: "Spare Parts Sourcing",
    text: "IGS can source even the very hard to find parts for your electronic devices to their original specifications.",
  },
];

export default function ServicesSection({ onLoadComplete }: ServicesSectionProps) {
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
    <section id="services" className="w-full h-screen py-12 flex flex-col items-center justify-center relative overflow-hidden">
      <h2 className="text-center sm:text-3xl md:text-4xl lg:text-5xl font-bold mb-12 text-gray-900 dark:text-gray-50">
        Our Services
      </h2>
      <div className="flex flex-nowrap gap-6 overflow-x-auto">
        {services.map((service, index) => (
          <BackgroundGradient
            key={index}
            containerClassName="w-full max-w-xs flex"
          >
            <div className="group w-full overflow-hidden relative card h-96 rounded-3xl shadow-xl flex flex-col p-4 border border-transparent bg-white dark:bg-neutral-900 hover:shadow-2xl transition-shadow duration-300">
              {/* Icon and Title */}
              <div className="flex items-center gap-4 mb-4">
                <Image
                  src={service.icon}
                  width={50}
                  height={50}
                  alt={service.heading}
                  className=""
                />
                <h1 className="font-bold sm:text-2xl md:text-3xl lg:4xl text-gray-900 dark:text-gray-50">
                  {service.heading}
                </h1>
              </div>
              
              {/* Centered Text Container */}
              <div className="flex-grow flex items-center">
                <div className="text-container text-left">
                  <p className="font-normal sm:text-lg md:text-xl lg:2xl text-gray-900 dark:text-gray-50">
                    {service.text}
                  </p>
                </div>
              </div>
            </div>
          </BackgroundGradient>
        ))}
      </div>
    </section>
  );
}
