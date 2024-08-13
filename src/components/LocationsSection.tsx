"use client";
import React, { useState, useEffect, useRef } from 'react';
import dynamic from 'next/dynamic';
import { useTheme } from "next-themes";

const GlobeDemo = dynamic(() => import('@/components/ui/GlobeDemo').then((m) => m.default), { ssr: false });

interface LocationsSectionProps {
  onLoadComplete?: () => void;
}

export default function LocationsSection({ onLoadComplete }: LocationsSectionProps) {
  const [focusLat, setFocusLat] = useState<number | undefined>(undefined);
  const [focusLng, setFocusLng] = useState<number | undefined>(undefined);
  const [autoRotate, setAutoRotate] = useState(true);
  const { theme } = useTheme(); // Get the current theme
  const textRef = useRef<HTMLDivElement>(null);
  
  const getAntipodalLocation = (lat: number, lng: number) => ({
    lat: -lat, // Flip latitude
    lng: -lng
  });

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

  useEffect(() => {
    const observerOptions = {
      root: null, // Use the viewport as the root
      rootMargin: '0px',
      threshold: 0.5 // Trigger when at least 50% of the section is visible
    };

    const observer = new IntersectionObserver((entries) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          // Section is partially or fully in view
          setFocusLat(29.7869); // Return to initial position
          setFocusLng(-95.4108); // Return to initial position
        } else {
          // Section is not in view
          const antipodalPos = getAntipodalLocation(29.7869, -95.4108);
          setFocusLat(antipodalPos.lat);
          setFocusLng(antipodalPos.lng);
        }
      });
    }, observerOptions);

    if (textRef.current) {
      observer.observe(textRef.current);
    }

    return () => {
      if (textRef.current) {
        observer.unobserve(textRef.current);
      }
    };
  }, []);

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
    globeColor: "#1E90FF",
    showAtmosphere: true,
    atmosphereColor: "#00BFFF",
    atmosphereAltitude: 0.3,
    emissive: "#1E90FF",
    emissiveIntensity: 0.7,
    shininess: 1.5,
    polygonColor: "rgba(0,128,0,0.9)", // Darker green
    ambientLight: "#FFFFFF",
    directionalLeftLight: "#FFFFFF",
    directionalTopLight: "#FFFFFF",
    pointLight: "#FFFFFF",
    arcTime: 2000,
    arcLength: 0.9,
    rings: 1,
    maxRings: 3,
    initialPosition: { lat: 29.7869, lng: -95.4108},
    autoRotate: true,
    autoRotateSpeed: 0.5,
  };

  const locations = [
    { lat: 29.7869, lng: -95.4108, name: 'Houston Kempwood Facility' },
    { lat: 39.1032, lng: -84.5120, name: 'Cincinnati Facility' },
    { lat: 22.3193, lng: 114.1694, name: 'Taoyuan City New Facility' }
  ];

  const sampleArcs = [
    // Houston Kempwood Facility to Cincinnati Facility
    {
      order: 1,
      startLat: 29.7869, 
      startLng: -95.4108,
      endLat: 39.1032,
      endLng: -84.5120,
      arcAlt: 0.15, // Curve for Houston to Cincinnati
    },
    // Cincinnati Facility to Houston Kempwood Facility
    {
      order: 2,
      startLat: 39.1032, 
      startLng: -84.5120,
      endLat: 29.7869,   
      endLng: -95.4108,
      arcAlt: 0.35, // Different curve for Cincinnati to Houston
    },
    // Cincinnati Facility to Taoyuan City New Facility
    {
      order: 3,
      startLat: 39.1032,
      startLng: -84.5120,
      endLat: 22.3193,   
      endLng: 114.1694,
      arcAlt: 0.30, // Curve for Cincinnati to Taoyuan
    },
    // Taoyuan City New Facility to Cincinnati Facility
    {
      order: 4,
      startLat: 22.3193,
      startLng: 114.1694,
      endLat: 39.1032,   
      endLng: -84.5120,
      arcAlt: 0.50, // Different curve for Taoyuan to Cincinnati
    },
    // Taoyuan City New Facility to Houston Kempwood Facility
    {
      order: 5,
      startLat: 22.3193, 
      startLng: 114.1694,
      endLat: 29.7869,
      endLng: -95.4108,
      arcAlt: 0.50, // Curve for Taoyuan to Houston
    },
    // Houston Kempwood Facility to Taoyuan City New Facility
    {
      order: 6,
      startLat: 29.7869,
      startLng: -95.4108,
      endLat: 22.3193,   
      endLng: 114.1694,
      arcAlt: 0.30, // Different curve for Houston to Taoyuan
    },
  ];

  // Define the red glow color based on the theme
  const glowColor = theme === 'light' ? '#B71C1C' : '#FF0000'; // Darker red for light theme, bright red for dark theme

  return (
    <section className="w-full h-screen py-12 md:py-24 lg:py-32">
      <div className="container px-4 md:px-6 max-w-4xl">
        <div className="grid md:grid-cols-2 gap-8">
          <div ref={textRef} style={{ transform: 'translateX(-25%) translateY(0%)'}}> {/* Move text section to the left */}
            <span className="text-red-500 text-sm" style={{ display: 'block', marginBottom: '1rem' }}> {/* Move text down */}
              REPAIR SERVICE CENTER LOCATIONS
            </span>
            <h2 className="text-3xl font-bold tracking-tighter" style={{ marginBottom: '1rem' }}> {/* Move text down */}
              Repair Service Center Locations
            </h2>
            <ul className="list-disc pl-5 mt-4 text-muted-foreground md:text-xl">
              <li
                className="location-item"
                onMouseEnter={() => handleMouseEnter(29.7869, -95.4108)}
                onMouseLeave={handleMouseLeave}
              >
                Houston Kempwood Facility (US)
              </li>
              <li
                className="location-item"
                onMouseEnter={() => handleMouseEnter(39.1032, -84.5120)}
                onMouseLeave={handleMouseLeave}
              >
                Cincinnati Facility (US)
              </li>
              <li
                className="location-item"
                onMouseEnter={() => handleMouseEnter(22.3193, 114.1694)}
                onMouseLeave={handleMouseLeave}
              >
                Taoyuan City New Facility 2/2021 (Taiwan)
              </li>
            </ul>
          </div>
          <div className="relative" style={{ height: '260%', width: '280%', margin: 'auto', transform: 'translateX(0%) translateY(-30%)'}}>
            <div className="absolute top-0 left-0 w-full h-full overflow-hidden">
              <GlobeDemo
                globeConfig={globeConfig}
                data={sampleArcs}
                focusLat={focusLat}
                focusLng={focusLng}
                autoRotate={autoRotate}
                locations={locations}
                theme={theme}
              />
            </div>
          </div>
        </div>
      </div>
      <style jsx>{`
        .location-item {
          transition: all 0.3s ease; /* Smooth transition for hover effects */
        }
        .location-item:hover {
          font-size: 1.3rem; /* Increase font size on hover */
          color: ${glowColor}; /* Red color on hover */
          text-shadow: 0 0 0px red; /* Red glow effect */
        }
      `}</style>
    </section>
  );
}
