"use client";
import dynamic from 'next/dynamic';
import { useState } from 'react';

const GlobeDemo = dynamic(() => import('@/components/ui/globe').then((m) => m.GlobeDemo), { ssr: false });

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
    pointSize: 4,
    globeColor: "#062056",
    showAtmosphere: true,
    atmosphereColor: "#FFFFFF",
    atmosphereAltitude: 0.1,
    emissive: "#062056",
    emissiveIntensity: 0.1,
    shininess: 0.9,
    polygonColor: "rgba(255,255,255,0.7)",
    ambientLight: "#38bdf8",
    directionalLeftLight: "#ffffff",
    directionalTopLight: "#ffffff",
    pointLight: "#ffffff",
    arcTime: 1000,
    arcLength: 0.9,
    rings: 1,
    maxRings: 3,
    initialPosition: { lat: 22.3193, lng: 114.1694 },
    autoRotate: true,
    autoRotateSpeed: 0.5,
  };

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
                onMouseEnter={() => handleMouseEnter(29.817161646275192, -95.49694133682567)}
                onMouseLeave={handleMouseLeave}
              >
                Houston Kempwood Facility (US)
              </li>
              <li
                onMouseEnter={() => handleMouseEnter(39.307914468891745, -84.47317962384071)}
                onMouseLeave={handleMouseLeave}
              >
                Cincinnati Facility (US)
              </li>
              <li
                onMouseEnter={() => handleMouseEnter(24.000000, 121.000000)}
                onMouseLeave={handleMouseLeave}
              >
                Taoyuan City New Facility 2/2021 (Taiwan)
              </li>
            </ul>
          </div>
          <div className="relative aspect-[4/3]">
            <GlobeDemo globeConfig={globeConfig} data={sampleArcs} focusLat={focusLat} focusLng={focusLng} autoRotate={autoRotate} />
          </div>
        </div>
      </div>
    </section>
  );
}
