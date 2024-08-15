"use client";

import React, { forwardRef, useRef } from "react";

import { cn } from "@/lib/utils";
import { AnimatedBeam } from "@/components/magicui/animated-beam";
import { useTheme } from 'next-themes';

interface CircleProps {
    className?: string;
    children?: React.ReactNode;
    hidden?: boolean; // Add the hidden prop
  }
  

  const Circle = forwardRef<HTMLDivElement, CircleProps>(
    ({ className, children, hidden = false }, ref) => {
      return (
        <div
          ref={ref}
          className={cn(
            "z-10 flex h-48 w-48 items-center justify-center rounded-full border-2 bg-white p-4 shadow-[0_0_20px_-12px_rgba(0,0,0,0.8)]",
            className,
            {
              "opacity-0": hidden,
              "invisible": hidden, // Keep the space but make it invisible
            }
          )}
        >
          {children}
        </div>
      );
    }
  );

export function AnimatedBeamDemo() {
  const { theme } = useTheme();
  const pathColor = theme === 'dark' ? 'white' : 'darkgrey';
  const containerRef = useRef<HTMLDivElement>(null);
  const div1Ref = useRef<HTMLDivElement>(null);
  const div2Ref = useRef<HTMLDivElement>(null);
  const div3Ref = useRef<HTMLDivElement>(null);
  const div4Ref = useRef<HTMLDivElement>(null);
  const div5Ref = useRef<HTMLDivElement>(null);
  const div6Ref = useRef<HTMLDivElement>(null);



  return (
    <div
      className="relative flex w-full h-full items-center justify-center overflow-hidden rounded-lg bg-background p-10 "
      ref={containerRef}
    >
      <div className="flex size-full flex-col items-stretch justify-between gap-16">
        <div className="flex flex-row justify-between gap-x-16">
          <Circle hidden={true} />
          <Circle hidden={true} />
          <Circle ref={div1Ref}>
            <Icons.openai />
          </Circle>
          <Circle hidden={true} />
          <Circle hidden={true} />
        </div>
        <div className="flex flex-row justify-between gap-16">
          <Circle ref={div2Ref}>
            <Icons.user />
          </Circle>
          <Circle ref={div3Ref}>
            <Icons.openai />
          </Circle>
          <Circle ref={div4Ref}>
            <Icons.openai />
          </Circle>
          <Circle ref={div5Ref}>
            <Icons.openai />
          </Circle>
    
        </div>
        
      </div>

      <AnimatedBeam
        containerRef={containerRef}
        fromRef={div1Ref}
        toRef={div2Ref}
        curvature={0}
        reverse={true}
        pathColor={pathColor}
        pathOpacity={0.5}
        pathWidth={4}
        gradientStartColor = {"#ff6f61"}
        gradientStopColor = {"#ff8c00"}
      />
      <AnimatedBeam
        containerRef={containerRef}
        fromRef={div1Ref}
        toRef={div3Ref}
        reverse={true}
        pathColor={pathColor}
        pathOpacity={0.5}
        pathWidth={4}
        gradientStartColor = {"#ff6f61"}
        gradientStopColor = {"#ff8c00"}
      />
      <AnimatedBeam
        containerRef={containerRef}
        fromRef={div1Ref}
        toRef={div4Ref}
        pathColor={pathColor}
        pathOpacity={0.5}
        pathWidth={4}
        gradientStartColor = {"#ff6f61"}
        gradientStopColor = {"#ff8c00"}
      />
      <AnimatedBeam
        containerRef={containerRef}
        fromRef={div1Ref}
        toRef={div5Ref}
        pathColor={pathColor}
        pathOpacity={0.5}
        pathWidth={4}
        gradientStartColor = {"#ff6f61"}
        gradientStopColor = {"#ff8c00"}
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
        gradientStartColor = {"#ff6f61"}
        gradientStopColor = {"#ff8c00"}
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
        gradientStartColor = {"#ff6f61"}
        gradientStopColor = {"#ff8c00"}
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
        gradientStartColor = {"#ff6f61"}
        gradientStopColor = {"#ff8c00"}
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
        gradientStartColor = {"#ff6f61"}
        gradientStopColor = {"#ff8c00"}
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
        gradientStartColor = {"#ff6f61"}
        gradientStopColor = {"#ff8c00"}
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
        gradientStartColor = {"#ff6f61"}
        gradientStopColor = {"#ff8c00"}
      />
    </div>
  );
}

const Icons = {
  openai: () => (
    <svg
      width="24"
      height="24"
      viewBox="0 0 24 24"
      xmlns="http://www.w3.org/2000/svg"
    >
      <path d="M22.2819 9.8211a5.9847 5.9847 0 0 0-.5157-4.9108 6.0462 6.0462 0" />
    </svg>
  ),
  user: () => (
    <svg
      width="24"
      height="24"
      viewBox="0 0 24 24"
      fill="none"
      stroke="#000000"
      strokeWidth="2"
      xmlns="http://www.w3.org/2000/svg"
    >
      <path d="M19 21v-2a4 4 0 0 0-4-4H9a4 4 0 0 0-4 4v2" />
      <circle cx="13" cy="7" r="4" />
    </svg>
  ),
};

export default AnimatedBeamDemo;