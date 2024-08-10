import React, { useEffect, useRef } from 'react';
import Globe from 'react-globe.gl';

const GlobeDemo = ({ globeConfig, data, focusLat, focusLng, autoRotate, locations, theme }) => {
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
      globe.controls().enableZoom = false; // Disabling zooming
    }
  }, []);


  const globeBackgroundColor = theme === 'light' ? '#FFFFFF' : '#000000'; // Set background color based on theme
  const globeTexture = theme === 'light' ? "/EarthImage/8k_earth_daymap.jpg"  : "/EarthImage/8k_earth_nightmap.jpg" ;
  const globeGlow = theme === 'light' ? "0.3"  : "0.5" ;

  return (
      <div style={{ position: 'relative', width: '100%', height: '100%', overflow: 'hidden', transform: 'translateX(-50%) translateY(-13%)'}}>
      <Globe
        ref={globeRef}
        globeImageUrl={globeTexture}
        bumpImageUrl="/EarthImage/8k_earthbump.png"
        bumpScale={2.0}
        backgroundColor={globeBackgroundColor}
        animateIn
        atmosphereColor={globeConfig.atmosphereColor}
        atmosphereAltitude={globeGlow}
        arcsData={data}
        arcColor={() => ['#0000FF', '#00FFFF']} // Gradient from blue to cyan
        arcStroke={1} // Make the arc wider
        arcDashLength={globeConfig.arcLength}
        arcDashGap={1}
        arcDashAnimateTime={globeConfig.arcTime}
        arcAltitude={arc => arc.arcAlt} 
        showGlobe={true}
        showGraticules={false}
        showAtmosphere={globeConfig.showAtmosphere}
        enablePointerInteraction
        autoRotate={autoRotate}
        autoRotateSpeed={globeConfig.autoRotateSpeed}
        htmlElementsData={locations}
        htmlElement={(location) => {
          const el = document.createElement('div');
          el.innerHTML = `<img src="/section/map_marker.png" alt="${location.name}" style="width: 80px; height: 80px;" />`;
          el.style.position = 'absolute';
          el.style.left = `${0}px`;
          el.style.top = `-${85 / 2}px`;
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
