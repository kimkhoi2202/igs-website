import { cn } from "@/lib/utils";
import { BackgroundGradient } from "@/components/ui/background-gradient";
import Image from "next/image";
import React from "react";

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

export default function ServicesSection() {
  return (
    <section className="w-full py-12">
      <div className="container mx-auto px-6 md:px-12">
        <h2 className="text-center text-3xl md:text-4xl font-bold mb-12 text-gray-900 dark:text-gray-50">
          Our Services
        </h2>
        <div className="flex flex-wrap justify-center gap-6">
          {services.map((service, index) => (
            <BackgroundGradient
              key={index}
              containerClassName="max-w-xs w-full flex justify-center"
            >
              <div className="group w-full overflow-hidden relative card h-96 rounded-3xl shadow-xl mx-auto flex items-center justify-center p-4 border border-transparent bg-white dark:bg-neutral-900 hover:shadow-2xl transition-shadow duration-300">
                <div className="flex flex-col items-start group-hover:scale-105 transition-transform duration-300">
                  <Image
                    src={service.icon}
                    width={50}
                    height={50}
                    alt={service.heading}
                    className="mb-4"
                  />
                  <div className="text relative z-50">
                    <h1 className="font-bold text-xl md:text-3xl text-gray-900 dark:text-gray-50 relative">
                      {service.heading}
                    </h1>
                    <p className="font-normal text-base text-gray-900 dark:text-gray-50 relative my-4">
                      {service.text}
                    </p>
                  </div>
                </div>
              </div>
            </BackgroundGradient>
          ))}
        </div>
      </div>
    </section>
  );
}
