import React, { useEffect, useRef } from 'react';
import Globe from 'react-globe.gl';
import globeData from '@/data/globe.json';

const GlobeDemo = ({ globeConfig, data, focusLat, focusLng, autoRotate, locations }) => {
  const globeRef = useRef();

  useEffect(() => {
    const globe = globeRef.current;
    if (globe) {
      globe.pointOfView({ lat: focusLat || globeConfig.initialPosition.lat, lng: focusLng || globeConfig.initialPosition.lng }, 3000);
    }
  }, [focusLat, focusLng]);

  useEffect(() => {
    const globe = globeRef.current;
    if (globe) {
      // Disabling zooming
      globe.controls().enableZoom = false;
    }
  }, []);

  return (
    <div style={{ position: 'relative', width: '100%', height: '100%', overflow: 'hidden', transform: 'translateX(-50%) translateY(-25%)'}}>
      <Globe
        ref={globeRef}
        globeImageUrl="//unpkg.com/three-globe/example/img/earth-night.jpg" 
        backgroundColor="#000000"
        animateIn
        atmosphereColor={globeConfig.atmosphereColor}
        atmosphereAltitude={globeConfig.atmosphereAltitude}
        arcsData={data}
        arcColor={() => ['#0000FF', '#00FFFF']} // Gradient from blue to cyan
        arcStroke={1} // Make the arc wider
        arcDashLength={globeConfig.arcLength}
        arcDashGap={1}
        arcDashAnimateTime={globeConfig.arcTime}
        arcAltitude={arc => arc.arcAlt} 
        polygonsData={globeData.features}
        polygonCapColor={() => globeConfig.polygonColor}
        polygonSideColor={() => globeConfig.polygonColor}
        showGlobe={true}
        showGraticules={false}
        showAtmosphere={globeConfig.showAtmosphere}
        enablePointerInteraction
        pointsData={[]} // Empty array to remove default red dots
        autoRotate={autoRotate}
        autoRotateSpeed={globeConfig.autoRotateSpeed}
        // Using the map_marker.png image as the marker
        htmlElementsData={locations}
        htmlElement={(location) => {
          const el = document.createElement('div');
          el.innerHTML = `<img src="/section/map_marker.png" alt="${location.name}" style="width: 80px; height: 80px;" />`;
          el.style.position = 'absolute'; // Ensure absolute positioning
          el.style.left = `${0}px`; // Center horizontally
          el.style.top = `-${85 / 2}px`; // Center vertically
          el.style.cursor = 'pointer';
          el.onclick = () => alert(`Clicked on ${location.name}`);
          return el;
        }}
        htmlElementOffset={[0, 0]} // Center the marker
      />
    </div>
  );
};

export default GlobeDemo;
