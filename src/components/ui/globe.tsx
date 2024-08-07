import { useEffect, useRef, useState } from "react";
import { Color, Scene, Fog, PerspectiveCamera, Vector3 } from "three";
import ThreeGlobe from "three-globe";
import { useThree, Object3DNode, Canvas, extend } from "@react-three/fiber";
import { OrbitControls } from "@react-three/drei";
import countries from "@/data/globe.json";
declare module "@react-three/fiber" {
  interface ThreeElements {
    threeGlobe: Object3DNode<ThreeGlobe, typeof ThreeGlobe>;
  }
}

extend({ ThreeGlobe });

const RING_PROPAGATION_SPEED = 3;
const aspect = 1.2;
const cameraZ = 300;

type Position = {
  order: number;
  startLat: number;
  startLng: number;
  endLat: number;
  endLng: number;
  arcAlt: number;
  color: string;
};

export type GlobeConfig = {
  pointSize?: number;
  globeColor?: string;
  showAtmosphere?: boolean;
  atmosphereColor?: string;
  atmosphereAltitude?: number;
  emissive?: string;
  emissiveIntensity?: number;
  shininess?: number;
  polygonColor?: string;
  ambientLight?: string;
  directionalLeftLight?: string;
  directionalTopLight?: string;
  pointLight?: string;
  arcTime?: number;
  arcLength?: number;
  rings?: number;
  maxRings?: number;
  initialPosition?: {
    lat: number;
    lng: number;
  };
  autoRotate?: boolean;
  autoRotateSpeed?: number;
};

interface WorldProps {
  globeConfig: Readonly<GlobeConfig>;
  data: ReadonlyArray<Position>;
  focusLat?: number;
  focusLng?: number;
  autoRotate?: boolean;
}

let numbersOfRings = [0];

export function Globe({ globeConfig, data, focusLat, focusLng, autoRotate = true }: WorldProps) {
  const [globeData, setGlobeData] = useState<
    | {
        size: number;
        order: number;
        color: (t: number) => string;
        lat: number;
        lng: number;
      }[]
    | null
  >(null);

  const globeRef = useRef<ThreeGlobe | null>(null);
  const { camera } = useThree();

  const defaultProps = {
    pointSize: 1,
    atmosphereColor: "#ffffff",
    showAtmosphere: true,
    atmosphereAltitude: 0.1,
    polygonColor: "rgba(255,255,255,0.7)",
    globeColor: "#1d072e",
    emissive: "#000000",
    emissiveIntensity: 0.1,
    shininess: 0.9,
    arcTime: 2000,
    arcLength: 0.9,
    rings: 1,
    maxRings: 3,
    ...globeConfig,
  };

  useEffect(() => {
    const _buildMaterial = () => {
      if (!globeRef.current) return;

      const globeMaterial = globeRef.current.globeMaterial() as unknown as {
        color: Color;
        emissive: Color;
        emissiveIntensity: number;
        shininess: number;
      };
      globeMaterial.color = new Color(globeConfig.globeColor ?? defaultProps.globeColor);
      globeMaterial.emissive = new Color(globeConfig.emissive ?? defaultProps.emissive);
      globeMaterial.emissiveIntensity = globeConfig.emissiveIntensity ?? defaultProps.emissiveIntensity;
      globeMaterial.shininess = globeConfig.shininess ?? defaultProps.shininess;
    };

    const _buildData = () => {
      const arcs = data;
      let points = [];
      for (const arc of arcs) {
        const rgb = hexToRgb(arc.color) as { r: number; g: number; b: number };
        points.push({
          size: defaultProps.pointSize,
          order: arc.order,
          color: (t: number) => `rgba(${rgb.r}, ${rgb.g}, ${rgb.b}, ${1 - t})`,
          lat: arc.startLat,
          lng: arc.startLng,
        });
        points.push({
          size: defaultProps.pointSize,
          order: arc.order,
          color: (t: number) => `rgba(${rgb.r}, ${rgb.g}, ${rgb.b}, ${1 - t})`,
          lat: arc.endLat,
          lng: arc.endLng,
        });
      }

      // remove duplicates for same lat and lng
      const filteredPoints = points.filter(
        (v, i, a) =>
          a.findIndex((v2) =>
            ["lat", "lng"].every(
              (k) => v2[k as "lat" | "lng"] === v[k as "lat" | "lng"]
            )
          ) === i
      );

      setGlobeData(filteredPoints);
    };

    if (globeRef.current) {
      _buildData();
      _buildMaterial();
    }
  }, [globeConfig, data]);

  useEffect(() => {
    if (focusLat !== undefined && focusLng !== undefined) {
      const { lat, lng } = { lat: focusLat, lng: focusLng };
      const phi = (90 - lat) * (Math.PI / 180);
      const theta = (180 - lng) * (Math.PI / 180);

      camera.position.x = 300 * Math.sin(phi) * Math.cos(theta);
      camera.position.y = 300 * Math.cos(phi);
      camera.position.z = 300 * Math.sin(phi) * Math.sin(theta);
      camera.lookAt(0, 0, 0);
    }
  }, [focusLat, focusLng, camera]);

  useEffect(() => {
    const startAnimation = () => {
      if (!globeRef.current || !globeData) return;

      globeRef.current
        .arcsData(data as unknown as object[])
        .arcStartLat((d) => (d as { startLat: number }).startLat * 1)
        .arcStartLng((d) => (d as { startLng: number }).startLng * 1)
        .arcEndLat((d) => (d as { endLat: number }).endLat * 1)
        .arcEndLng((d) => (d as { endLng: number }).endLng * 1)
        .arcColor((e: any) => (e as { color: string }).color)
        .arcAltitude((e) => (e as { arcAlt: number }).arcAlt * 1)
        .arcStroke(() => [0.32, 0.28, 0.3][Math.round(Math.random() * 2)])
        .arcDashLength(defaultProps.arcLength)
        .arcDashInitialGap((e) => (e as { order: number }).order * 1)
        .arcDashGap(15)
        .arcDashAnimateTime(() => defaultProps.arcTime);

      globeRef.current
        .pointsData(data as unknown as object[])
        .pointColor((e) => (e as { color: string }).color)
        .pointsMerge(true)
        .pointAltitude(0.0)
        .pointRadius(2);

      globeRef.current
        .ringsData([] as unknown as object[])
        .ringColor((e: any) => (t: any) => e.color(t))
        .ringMaxRadius(defaultProps.maxRings)
        .ringPropagationSpeed(RING_PROPAGATION_SPEED)
        .ringRepeatPeriod(
          (defaultProps.arcTime * defaultProps.arcLength) / defaultProps.rings
        );
    };

    if (globeRef.current && globeData) {
      globeRef.current
        .hexPolygonsData(countries.features)
        .hexPolygonResolution(3)
        .hexPolygonMargin(0.7)
        .showAtmosphere(defaultProps.showAtmosphere)
        .atmosphereColor(defaultProps.atmosphereColor)
        .atmosphereAltitude(defaultProps.atmosphereAltitude)
        .hexPolygonColor(() => defaultProps.polygonColor);
      startAnimation();
    }
  }, [globeData, defaultProps, data]);

  useEffect(() => {
    if (!globeRef.current || !globeData) return;

    const interval = setInterval(() => {
      if (!globeRef.current || !globeData) return;
      numbersOfRings = genRandomNumbers(
        0,
        data.length,
        Math.floor((data.length * 4) / 5)
      );

      globeRef.current.ringsData(
        globeData.filter((d, i) => numbersOfRings.includes(i)) as unknown as object[]
      );
    }, 2000);

    return () => {
      clearInterval(interval);
    };
  }, [globeData, data]);

  return <threeGlobe ref={globeRef} />;
}

export function WebGLRendererConfig() {
  const { gl, size } = useThree();

  useEffect(() => {
    gl.setPixelRatio(window.devicePixelRatio);
    gl.setSize(size.width, size.height);
    gl.setClearColor(0xffaaff, 0);
  }, [gl, size.height, size.width]);

  return null;
}

export function World(props: WorldProps) {
  const { globeConfig, autoRotate = true } = props;
  const scene = new Scene();
  scene.fog = new Fog(0xffffff, 400, 2000);
  return (
    <Canvas scene={scene} camera={new PerspectiveCamera(50, aspect, 180, 1800)}>
      <WebGLRendererConfig />
      <ambientLight color={globeConfig.ambientLight} intensity={0.6} />
      <directionalLight
        color={globeConfig.directionalLeftLight}
        position={new Vector3(-400, 100, 400)}
      />
      <directionalLight
        color={globeConfig.directionalTopLight}
        position={new Vector3(-200, 500, 200)}
      />
      <pointLight
        color={globeConfig.pointLight}
        position={new Vector3(-200, 500, 200)}
        intensity={0.8}
      />
      <Globe {...props} />
      <OrbitControls
        enablePan={false}
        enableZoom={false}
        minDistance={cameraZ}
        maxDistance={cameraZ}
        autoRotate={autoRotate}
        autoRotateSpeed={1}
        minPolarAngle={Math.PI / 3.5}
        maxPolarAngle={Math.PI - Math.PI / 3}
      />
    </Canvas>
  );
}

export function hexToRgb(hex: string) {
  const shorthandRegex = /^#?([a-f\d])([a-f\d])([a-f\d])$/i;
  hex = hex.replace(shorthandRegex, function (m: string, r: string, g: string, b: string) {
    return r + r + g + g + b + b;
  });

  const result = /^#?([a-f\d]{2})([a-f\d]{2})([a-f\d]{2})$/i.exec(hex);
  return result
    ? {
        r: parseInt(result[1], 16),
        g: parseInt(result[2], 16),
        b: parseInt(result[3], 16),
      }
    : null;
}

export function genRandomNumbers(min: number, max: number, count: number) {
  const arr = [];
  while (arr.length < count) {
    const r = Math.floor(Math.random() * (max - min)) + min;
    if (arr.indexOf(r) === -1) arr.push(r);
  }

  return arr;
}

export { World as GlobeDemo };
