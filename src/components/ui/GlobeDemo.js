// components/ui/GlobeDemo.js
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

  return (
    <Globe
      ref={globeRef}
      globeImageUrl="//unpkg.com/three-globe/example/img/earth-dark.jpg"
      bumpImageUrl="//unpkg.com/three-globe/example/img/earth-topology.png"
      backgroundColor="#000000"
      animateIn
      atmosphereColor={globeConfig.atmosphereColor}
      atmosphereAltitude={globeConfig.atmosphereAltitude}
      arcsData={data}
      arcColor={() => '#FF0000'}
      arcDashLength={globeConfig.arcLength}
      arcDashGap={1}
      arcDashAnimateTime={globeConfig.arcTime}
      polygonsData={globeData.features}
      polygonCapColor={() => globeConfig.polygonColor}
      polygonSideColor={() => globeConfig.polygonColor}
      showGlobea={true}
      showGraticules={false}
      showAtmosphere={globeConfig.showAtmosphere}
      enablePointerInteraction
      pointsData={locations} // Use the locations prop
      pointColor={() => '#FF0000'}
      pointAltitude={0.01}
      pointRadius={globeConfig.pointSize}
      onPointClick={(point) => alert(`Clicked on ${point.name}`)}
      autoRotate={autoRotate}
      autoRotateSpeed={globeConfig.autoRotateSpeed}
    />
  );
};

export default GlobeDemo;
