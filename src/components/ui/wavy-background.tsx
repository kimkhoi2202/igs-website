"use client";

import { useEffect, useRef } from "react";
import { createNoise3D } from "simplex-noise";

export const WavyBackground = ({
  className,
  colors,
  waveWidth,
  backgroundFill,
  blur = 10,
  speed = "fast",
  waveOpacity = 0.5,
  theme, // Accept theme as a prop
  ...props
}: {
  className?: string;
  colors?: string[];
  waveWidth?: number;
  backgroundFill?: string;
  blur?: number;
  speed?: "slow" | "fast";
  waveOpacity?: number;
  theme?: string; // Add theme prop
  [key: string]: any;
}) => {
  const noise = createNoise3D();
  const canvasRef = useRef<HTMLCanvasElement>(null);

  let w: number, h: number, nt: number, i: number, x: number;
  let ctx: CanvasRenderingContext2D | null = null;

  const getSpeed = () => {
    return speed === "fast" ? 0.002 : 0.001;
  };

  // Function to update the background based on the theme
  const updateBackground = () => {
    if (ctx) {
      ctx.fillStyle = theme === "light" ? "white" : backgroundFill || "black";
      ctx.fillRect(0, 0, w, h);
    }
  };

  const init = () => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    ctx = canvas.getContext("2d");
    if (!ctx) {
      console.error("Failed to get canvas context");
      return;
    }

    w = ctx.canvas.width = window.innerWidth;
    h = ctx.canvas.height = window.innerHeight;
    ctx.filter = `blur(${blur}px)`;
    nt = 0;

    window.onresize = function () {
      w = ctx!.canvas.width = window.innerWidth;
      h = ctx!.canvas.height = window.innerHeight;
      ctx!.filter = `blur(${blur}px)`;
      updateBackground(); // Ensure background is updated on resize
    };

    updateBackground(); // Update the background initially
    render();
  };

  const waveColors = colors ?? [
    "#ff4500", // Orange Red
    "#1e3a8a", // Navy Blue
    "#f97316", // Orange
    "#e11d48", // Red
    "#3b82f6", // Blue
  ];

  const drawWave = (n: number) => {
    if (!ctx) return;

    nt += getSpeed();
    for (i = 0; i < n; i++) {
      ctx.beginPath();
      ctx.lineWidth = waveWidth || 50;
      ctx.strokeStyle = waveColors[i % waveColors.length];
      for (x = 0; x < w; x += 5) {
        const y = noise(x / 800, 0.3 * i, nt) * 100;
        ctx.lineTo(x, y + h * 0.5);
      }
      ctx.stroke();
      ctx.closePath();
    }
  };

  let animationId: number;
  const render = () => {
    if (!ctx) return;

    updateBackground(); // Update the background on each render
    ctx.globalAlpha = waveOpacity || 0.5;
    drawWave(5);
    animationId = requestAnimationFrame(render);
  };

  useEffect(() => {
    init();
    return () => {
      cancelAnimationFrame(animationId);
    };
  }, []);

  useEffect(() => {
    if (ctx) {
      updateBackground(); // Update the background when the theme changes
    }
  }, [theme]);

  return (
    <div className={className} {...props}>
      <canvas ref={canvasRef} id="canvas" className="absolute inset-0 z-0" />
    </div>
  );
};
