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
    pointSize: 6, 
    globeColor: "#00BFFF",
    showAtmosphere: true,
    atmosphereColor: "#00BFFF",
    atmosphereAltitude: 0.7,
    emissive: "#1E90FF",
    emissiveIntensity: 0.7,
    shininess: 1.5,
    polygonColor: "rgba(0,128,0,0.9)", // Darker green
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
    { lat: 29.7869, lng: -95.4108, name: 'Houston Kempwood Facility' },
    { lat: 39.1032, lng: -84.5120, name: 'Cincinnati Facility' },
    { lat: 22.3193, lng: 114.1694, name: 'Taoyuan City New Facility' }
  ];

  const sampleArcs = [
    {
      order: 1,
      startLat: 29.7869, // Houston Kempwood Facility
      startLng: -95.4108,
      endLat: 39.1032,   // Cincinnati Facility
      endLng: -84.5120,
      arcAlt: 0.1,
      color: "#FF6347", // Tomato color
    },
    {
      order: 1,
      startLat: 39.1032, // Cincinnati Facility
      startLng: -84.5120,
      endLat: 22.3193,   // Taoyuan City New Facility
      endLng: 114.1694,
      arcAlt: 0.2,
      color: "#4682B4", // SteelBlue color
    },
    {
      order: 1,
      startLat: 22.3193, // Taoyuan City New Facility
      startLng: 114.1694,
      endLat: 29.7869,   // Houston Kempwood Facility
      endLng: -95.4108,
      arcAlt: 0.3,
      color: "#32CD32", // LimeGreen color
    },
  ];

  return (
    <section className="w-full py-12 md:py-24 lg:py-32">
      <div className="container px-4 md:px-6 max-w-4xl">
        <div className="grid md:grid-cols-2 gap-8">
          <div style={{ transform: 'translateX(-30%) translateY(-30%)'}}> {/* Move text section to the left */}
            <span className="text-red-500 text-sm" style={{ display: 'block', marginBottom: '1rem' }}> {/* Move text down */}
              REPAIR SERVICE CENTER LOCATIONS
            </span>
            <h2 className="text-3xl font-bold tracking-tighter" style={{ marginBottom: '1rem' }}> {/* Move text down */}
              Repair Service Center Locations
            </h2>
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
          <div className="relative" style={{ height: '250%', width: '280%', margin: 'auto', transform: 'translateX(-10%) translateY(-30%)'}}>
            <div className="absolute top-0 left-0 w-full h-full overflow-hidden">
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
      </div>
    </section>
  );
}
