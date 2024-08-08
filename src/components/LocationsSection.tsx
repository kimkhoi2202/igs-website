"use client";
import React, { useState } from 'react';
import dynamic from 'next/dynamic';
import { globeConfig, sampleArcs } from '@/components/ui/globeConfig';

const GlobeDemo = dynamic(() => import('@/components/ui/GlobeDemo').then((m) => m.default), { ssr: false });

export default function LocationsSection() {
  const [focusLat, setFocusLat] = useState<number | undefined>(undefined);
  const [focusLng, setFocusLng] = useState<number | undefined>(undefined);
  const [autoRotate, setAutoRotate] = useState(true);

  const handleMouseEnter = (lat: number, lng: number) => {
    setFocusLat(lat);
    setFocusLng(lng);
    setAutoRotate(false);
  };

  const handleMouseLeave = () => {
    setFocusLat(undefined);
    setFocusLng(undefined);
    setAutoRotate(true);
  };

  const globeConfig = {
    pointSize: 6, // Adjusted point size
    globeColor: "#1E90FF",
    showAtmosphere: true,
    atmosphereColor: "#87CEEB",
    atmosphereAltitude: 0.1,
    emissive: "#1E90FF",
    emissiveIntensity: 0.2,
    shininess: 1.5,
    polygonColor: "rgba(255,255,255,0.9)",
    ambientLight: "#FFFFFF",
    directionalLeftLight: "#FFFFFF",
    directionalTopLight: "#FFFFFF",
    pointLight: "#FFFFFF",
    arcTime: 1000,
    arcLength: 0.9,
    rings: 1,
    maxRings: 3,
    initialPosition: { lat: 22.3193, lng: 114.1694 },
    autoRotate: true,
    autoRotateSpeed: 0.5,
  };

  const locations = [
    { lat: 29.7869, lng: -95.4108, name: 'Houston Kempwood Facility' }, // Corrected Houston coordinates
    { lat: 39.1032, lng: -84.5120, name: 'Cincinnati Facility' }, // Corrected Cincinnati coordinates
    { lat: 22.3193, lng: 114.1694, name: 'Taoyuan City New Facility' } // Taiwan coordinates
  ];

  const sampleArcs = [
    {
      order: 1,
      startLat: -19.885592,
      startLng: -43.951191,
      endLat: -22.9068,
      endLng: -43.1729,
      arcAlt: 0.1,
      color: "#06b6d4",
    },
    {
      order: 1,
      startLat: 28.6139,
      startLng: 77.209,
      endLat: 3.139,
      endLng: 101.6869,
      arcAlt: 0.2,
      color: "#3b82f6",
    },
    // Add more arcs as needed
  ];

  return (
    <section className="w-full py-12 md:py-24 lg:py-32">
      <div className="container px-4 md:px-6">
        <div className="grid md:grid-cols-2 gap-8">
          <div>
            <span className="text-red-500 text-sm">REPAIR SERVICE CENTER LOCATIONS</span>
            <h2 className="text-3xl font-bold tracking-tighter">Repair Service Center Locations</h2>
            <ul className="list-disc pl-5 mt-4 text-muted-foreground md:text-xl">
              <li
                onMouseEnter={() => handleMouseEnter(29.7869, -95.4108)}
                onMouseLeave={handleMouseLeave}
              >
                Houston Kempwood Facility (US)
              </li>
              <li
                onMouseEnter={() => handleMouseEnter(39.1032, -84.5120)}
                onMouseLeave={handleMouseLeave}
              >
                Cincinnati Facility (US)
              </li>
              <li
                onMouseEnter={() => handleMouseEnter(22.3193, 114.1694)}
                onMouseLeave={handleMouseLeave}
              >
                Taoyuan City New Facility 2/2021 (Taiwan)
              </li>
            </ul>
          </div>
          <div className="relative aspect-[4/3]">
            <GlobeDemo
              globeConfig={globeConfig}
              data={sampleArcs}
              focusLat={focusLat}
              focusLng={focusLng}
              autoRotate={autoRotate}
              locations={locations}
            />
          </div>
        </div>
      </div>
    </section>
  );
}
