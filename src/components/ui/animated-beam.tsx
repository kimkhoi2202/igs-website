"use client";

import React, { forwardRef, useRef } from "react";
import { cn } from "@/lib/utils";
import { AnimatedBeam } from "@/components/magicui/animated-beam";
import { useTheme } from "next-themes";
import Image from "next/image";

// Corrected import paths
const WarehouseIcon = "/supplychain/Warehouse icon.png";
const PlaneIcon = "/supplychain/Plane icon.png";
const TruckIcon = "/supplychain/Truck delivery.png";
const ChartIcon = "/supplychain/Chart growth.png";
const VisibilityIcon = "/supplychain/Visibility shared.png";

interface CircleProps {
  className?: string;
  children?: React.ReactNode;
  hidden?: boolean;
}

const gradientColors = {
  light: {
    start: "#BF4343", // Deep red
    stop: "#D14D4D",  // Slightly lighter red
  },
  dark: {
    start: "#FF6F6F", // Soft light red
    stop: "#FF3B3B",  // Vibrant red
  },
};


const Circle = forwardRef<HTMLDivElement, CircleProps>(
  ({ className, children, hidden = false }, ref) => {
    return (
      <div
        ref={ref}
        className={cn(
          "z-10 flex items-center justify-center rounded-full border-2 bg-white p-4 shadow-[0_0_20px_-12px_rgba(0,0,0,0.8)]",
          className,
          {
            "opacity-0": hidden,
            "invisible": hidden,
          }
        )}
        style={{
          width: "auto", // Width will adjust based on viewport
          height: "auto", // Height will adjust to maintain aspect ratio
          aspectRatio: "1/1", // Ensures the element remains a circle regardless of width
        }}
      >
        {children}
      </div>
    );
  }
);

Circle.displayName = "Circle";

export function AnimatedBeamHorizontal() {
  const { theme } = useTheme();
  const pathColor = theme === "dark" ? "white" : "darkgrey";
  const containerRef = useRef<HTMLDivElement>(null);
  const div1Ref = useRef<HTMLDivElement>(null);
  const div2Ref = useRef<HTMLDivElement>(null);
  const div3Ref = useRef<HTMLDivElement>(null);
  const div4Ref = useRef<HTMLDivElement>(null);
  const div5Ref = useRef<HTMLDivElement>(null);
  const currentGradientColors = gradientColors[theme as keyof typeof gradientColors] || gradientColors.light;

  return (
    <div
      className="relative flex w-full h-full items-center justify-center overflow-hidden rounded-lg bg-background p-10"
      ref={containerRef}
    >
      <div className="flex size-full flex-col items-stretch justify-between gap-16">
        <div className="flex flex-row justify-center">      
          <Circle ref={div1Ref}>
            <Icons.Warehouse />
          </Circle>
        </div>
        <div className="flex flex-row justify-between gap-16">
          <Circle ref={div2Ref}>
            <Icons.Plane />
          </Circle>
          <Circle ref={div3Ref}>
            <Icons.Truck />
          </Circle>
          <Circle ref={div4Ref}>
            <Icons.Chart />
          </Circle>
          <Circle ref={div5Ref}>
            <Icons.Visibility />
          </Circle>
        </div>
      </div>

      <AnimatedBeam
        endXOffset={3.5}
        containerRef={containerRef}
        fromRef={div1Ref}
        toRef={div2Ref}
        reverse={true}
        pathColor={pathColor}
        pathOpacity={0.5}
        pathWidth={4}
        gradientStartColor={currentGradientColors.start}
        gradientStopColor={currentGradientColors.stop}
        mode={'x-first'}
      />
      <AnimatedBeam
        containerRef={containerRef}
        fromRef={div1Ref}
        toRef={div5Ref}
        pathColor={pathColor}
        pathOpacity={0.5}
        pathWidth={4}
        gradientStartColor={currentGradientColors.start}
        gradientStopColor={currentGradientColors.stop}
        mode={'x-first'}
      />
      <AnimatedBeam
        containerRef={containerRef}
        fromRef={div1Ref}
        toRef={div3Ref}
        reverse={true}
        pathColor={pathColor}
        pathOpacity={0.5}
        pathWidth={4}
        gradientStartColor={currentGradientColors.start}
        gradientStopColor={currentGradientColors.stop}
        mode={'x-first'}
      />
      <AnimatedBeam
        containerRef={containerRef}
        fromRef={div1Ref}
        toRef={div4Ref}
        pathColor={pathColor}
        pathOpacity={0.5}
        pathWidth={4}
        gradientStartColor={currentGradientColors.start}
        gradientStopColor={currentGradientColors.stop}
        mode={'x-first'}
      />
      <AnimatedBeam
        containerRef={containerRef}
        fromRef={div2Ref}
        toRef={div3Ref}
        startYOffset={20}
        endYOffset={20}
        pathColor={pathColor}
        pathOpacity={0.5} 
        pathWidth={4}
        gradientStartColor={currentGradientColors.start}
        gradientStopColor={currentGradientColors.stop}
      />
      <AnimatedBeam
        containerRef={containerRef}
        fromRef={div2Ref}
        toRef={div3Ref}
        startYOffset={-20}
        endYOffset={-20}
        reverse
        pathColor={pathColor}
        pathOpacity={0.5}
        pathWidth={4}
        gradientStartColor={currentGradientColors.start}
        gradientStopColor={currentGradientColors.stop}
      />
      <AnimatedBeam
        containerRef={containerRef}
        fromRef={div3Ref}
        toRef={div4Ref}
        startYOffset={20}
        endYOffset={20}
        pathColor={pathColor}
        pathOpacity={0.5}
        pathWidth={4}
        gradientStartColor={currentGradientColors.start}
        gradientStopColor={currentGradientColors.stop}
      />
      <AnimatedBeam
        containerRef={containerRef}
        fromRef={div3Ref}
        toRef={div4Ref}
        startYOffset={-20}
        endYOffset={-20}
        reverse
        pathColor={pathColor}
        pathOpacity={0.5}
        pathWidth={4}
        gradientStartColor={currentGradientColors.start}
        gradientStopColor={currentGradientColors.stop}
      />
      <AnimatedBeam
        containerRef={containerRef}
        fromRef={div4Ref}
        toRef={div5Ref}
        startYOffset={20}
        endYOffset={20}
        pathColor={pathColor}
        pathOpacity={0.5}
        pathWidth={4}
        gradientStartColor={currentGradientColors.start}
        gradientStopColor={currentGradientColors.stop}
      />
      <AnimatedBeam
        containerRef={containerRef}
        fromRef={div4Ref}
        toRef={div5Ref}
        startYOffset={-20}
        endYOffset={-20}
        reverse
        pathColor={pathColor}
        pathOpacity={0.5}
        pathWidth={4}
        gradientStartColor={currentGradientColors.start}
        gradientStopColor={currentGradientColors.stop}
      />
    </div>
  );
}

export function AnimatedBeamVertical() {
  const { theme } = useTheme();
  const pathColor = theme === "dark" ? "white" : "darkgrey";
  const containerRef = useRef<HTMLDivElement>(null);
  const div1Ref = useRef<HTMLDivElement>(null);
  const div2Ref = useRef<HTMLDivElement>(null);
  const div3Ref = useRef<HTMLDivElement>(null);
  const div4Ref = useRef<HTMLDivElement>(null);
  const div5Ref = useRef<HTMLDivElement>(null);
  const currentGradientColors = gradientColors[theme as keyof typeof gradientColors] || gradientColors.light;

  return (
    <div
      className="relative flex w-full h-full items-center justify-center overflow-hidden rounded-lg bg-background p-10"
      ref={containerRef}
    >
      <div className="flex size-full h-full flex-row items-center justify-between gap-16">
        <div className="flex flex-col justtify-center h-full">
          <Circle ref={div1Ref}>
            <Icons.Warehouse />
          </Circle>  
        </div>
        <div className="flex flex-col justtify-center gap-16">
         <Circle ref={div2Ref}>
            <Icons.Plane />
          </Circle>
          <Circle ref={div3Ref}>
            <Icons.Truck />
          </Circle>
          <Circle ref={div4Ref}>
            <Icons.Chart />
          </Circle>
          <Circle ref={div5Ref}>
            <Icons.Visibility />
          </Circle>
        </div>
      </div>

      <AnimatedBeam
        endXOffset={3.5}
        containerRef={containerRef}
        fromRef={div1Ref}
        toRef={div2Ref}
        reverse={true}
        pathColor={pathColor}
        pathOpacity={0.5}
        pathWidth={4}
        gradientStartColor={currentGradientColors.start}
        gradientStopColor={currentGradientColors.stop}
        mode={'y-first'}
      />
      <AnimatedBeam
        containerRef={containerRef}
        fromRef={div1Ref}
        toRef={div5Ref}
        pathColor={pathColor}
        pathOpacity={0.5}
        pathWidth={4}
        gradientStartColor={currentGradientColors.start}
        gradientStopColor={currentGradientColors.stop}
        mode={'y-first'}
      />
      <AnimatedBeam
        containerRef={containerRef}
        fromRef={div1Ref}
        toRef={div3Ref}
        reverse={true}
        pathColor={pathColor}
        pathOpacity={0.5}
        pathWidth={4}
        gradientStartColor={currentGradientColors.start}
        gradientStopColor={currentGradientColors.stop}
        mode={'y-first'}
      />
      <AnimatedBeam
        containerRef={containerRef}
        fromRef={div1Ref}
        toRef={div4Ref}
        pathColor={pathColor}
        pathOpacity={0.5}
        pathWidth={4}
        gradientStartColor={currentGradientColors.start}
        gradientStopColor={currentGradientColors.stop}
        mode={'y-first'}
      />
      <AnimatedBeam
        containerRef={containerRef}
        fromRef={div2Ref}
        toRef={div3Ref}
        startXOffset={20}
        endXOffset={20}
        pathColor={pathColor}
        pathOpacity={0.5} 
        pathWidth={4}
        gradientStartColor={currentGradientColors.start}
        gradientStopColor={currentGradientColors.stop}
      />
      <AnimatedBeam
        containerRef={containerRef}
        fromRef={div2Ref}
        toRef={div3Ref}
        startXOffset={-20}
        endXOffset={-20}
        reverse
        pathColor={pathColor}
        pathOpacity={0.5}
        pathWidth={4}
        gradientStartColor={currentGradientColors.start}
        gradientStopColor={currentGradientColors.stop}
      />
      <AnimatedBeam
        containerRef={containerRef}
        fromRef={div3Ref}
        toRef={div4Ref}
        startXOffset={20}
        endXOffset={20}
        pathColor={pathColor}
        pathOpacity={0.5}
        pathWidth={4}
        gradientStartColor={currentGradientColors.start}
        gradientStopColor={currentGradientColors.stop}
      />
      <AnimatedBeam
        containerRef={containerRef}
        fromRef={div3Ref}
        toRef={div4Ref}
        startXOffset={-20}
        endXOffset={-20}
        reverse
        pathColor={pathColor}
        pathOpacity={0.5}
        pathWidth={4}
        gradientStartColor={currentGradientColors.start}
        gradientStopColor={currentGradientColors.stop}
      />
      <AnimatedBeam
        containerRef={containerRef}
        fromRef={div4Ref}
        toRef={div5Ref}
        startXOffset={20}
        endXOffset={20}
        pathColor={pathColor}
        pathOpacity={0.5}
        pathWidth={4}
        gradientStartColor={currentGradientColors.start}
        gradientStopColor={currentGradientColors.stop}
      />
      <AnimatedBeam
        containerRef={containerRef}
        fromRef={div4Ref}
        toRef={div5Ref}
        startXOffset={-20}
        endXOffset={-20}
        reverse
        pathColor={pathColor}
        pathOpacity={0.5}
        pathWidth={4}
        gradientStartColor={currentGradientColors.start}
        gradientStopColor={currentGradientColors.stop}
      />
    </div>
  );
}

const Icons = {
  Warehouse: () => (
    <Image src={WarehouseIcon} alt="Warehouse Icon" width={100} height={100} />
  ),
  Plane: () => <Image src={PlaneIcon} alt="Plane Icon" width={100} height={100} />,
  Truck: () => <Image src={TruckIcon} alt="Truck Icon" width={100} height={100} />,
  Chart: () => <Image src={ChartIcon} alt="Chart Icon" width={100} height={100} />,
  Visibility: () => <Image src={VisibilityIcon} alt="Visibility Icon" width={100} height={100} />,
};

export default AnimatedBeamHorizontal;
