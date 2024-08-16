"use client";

import { RefObject, useEffect, useId, useState } from "react";
import { motion } from "framer-motion";

import { cn } from "@/lib/utils";

export interface AnimatedBeamProps {
  className?: string;
  containerRef: RefObject<HTMLElement>;
  fromRef: RefObject<HTMLElement>;
  toRef: RefObject<HTMLElement>;
  reverse?: boolean;
  pathColor?: string;
  pathWidth?: number;
  pathOpacity?: number;
  gradientStartColor?: string;
  gradientStopColor?: string;
  delay?: number;
  duration?: number;
  startXOffset?: number;
  startYOffset?: number;
  endXOffset?: number;
  endYOffset?: number;
  borderRadius?: number;
  mode?: "original" | "x-first"; // Mode selection
}

export const AnimatedBeam: React.FC<AnimatedBeamProps> = ({
  className,
  containerRef,
  fromRef,
  toRef,
  reverse = false,
  duration = Math.random() * 3 + 4,
  delay = 0,
  pathColor = "gray",
  pathWidth = 2,
  pathOpacity = 0.2,
  gradientStartColor = "#ffaa40",
  gradientStopColor = "#9c40ff",
  startXOffset = 0,
  startYOffset = 0,
  endXOffset = 0,
  endYOffset = 0,
  borderRadius = 10, // This is used for rounding corners
  mode = "original", // Default mode is "original"
}) => {
  const id = useId();
  const [pathD, setPathD] = useState("");
  const [svgDimensions, setSvgDimensions] = useState({ width: 0, height: 0 });

  const gradientCoordinates = reverse
    ? {
        x1: ["90%", "-10%"],
        x2: ["100%", "0%"],
        y1: ["0%", "0%"],
        y2: ["0%", "0%"],
      }
    : {
        x1: ["10%", "110%"],
        x2: ["0%", "100%"],
        y1: ["0%", "0%"],
        y2: ["0%", "0%"],
      };

  useEffect(() => {
    const updatePath = () => {
      if (!containerRef.current || !fromRef.current || !toRef.current) {
        return;
      }

      const containerRect = containerRef.current.getBoundingClientRect();
      const rectA = fromRef.current.getBoundingClientRect();
      const rectB = toRef.current.getBoundingClientRect();

      const startX =
        rectA.left - containerRect.left + rectA.width / 2 + startXOffset;
      const startY =
        rectA.top - containerRect.top + rectA.height / 2 + startYOffset;
      const endX =
        rectB.left - containerRect.left + rectB.width / 2 + endXOffset;
      const endY =
        rectB.top - containerRect.top + rectB.height / 2 + endYOffset;

      let d = "";

      const isHorizontal = Math.abs(endX - startX) > Math.abs(endY - startY);
      const isStraightLine = startX === endX || startY === endY;

      if (mode === "x-first") {
        // Mode 2: Go fully along the X-axis first, then 90-degree turn to Y-axis with rounded corner
        if (isStraightLine) {
          d = `M ${startX},${startY} H ${endX} V ${endY}`;
        } else if (startY === endY) {
          // No curve needed for 180-degree horizontal line
          d = `M ${startX},${startY} H ${endX}`;
        } else if (startX === endX) {
          // No curve needed for 180-degree vertical line
          d = `M ${startX},${startY} V ${endY}`;
        } else if (startX < endX) {
          d = `M ${startX},${startY} H ${
            endX - borderRadius
          } Q ${endX},${startY} ${endX},${startY + borderRadius} V ${endY}`;
        } else {
          d = `M ${startX},${startY} H ${
            endX + borderRadius
          } Q ${endX},${startY} ${endX},${startY + borderRadius} V ${endY}`;
        }
      } else {
        // Mode 1 (Original): Midway horizontal or vertical turn based on distance with rounded corners
        if (isStraightLine) {
          d = `M ${startX},${startY} H ${endX} V ${endY}`;
        } else if (isHorizontal) {
          const midX = startX + (endX - startX) / 2;
          if (startY < endY) {
            d = `M ${startX},${startY} H ${midX - borderRadius} Q ${midX},${startY} ${midX},${
              startY + borderRadius
            } V ${endY - borderRadius} Q ${midX},${endY} ${
              midX + borderRadius
            },${endY} H ${endX}`;
          } else {
            d = `M ${startX},${startY} H ${midX - borderRadius} Q ${midX},${startY} ${midX},${
              startY - borderRadius
            } V ${endY + borderRadius} Q ${midX},${endY} ${
              midX + borderRadius
            },${endY} H ${endX}`;
          }
        } else {
          const midY = startY + (endY - startY) / 2;
          if (startX < endX) {
            d = `M ${startX},${startY} V ${midY - borderRadius} Q ${startX},${midY} ${
              startX + borderRadius
            },${midY} H ${endX - borderRadius} Q ${endX},${midY} ${endX},${
              midY + borderRadius
            } V ${endY}`;
          } else {
            d = `M ${startX},${startY} V ${midY - borderRadius} Q ${startX},${midY} ${
              startX - borderRadius
            },${midY} H ${endX + borderRadius} Q ${endX},${midY} ${endX},${
              midY + borderRadius
            } V ${endY}`;
          }
        }
      }

      setPathD(d);
      setSvgDimensions({ width: containerRect.width, height: containerRect.height });
    };

    const resizeObserver = new ResizeObserver(() => {
      updatePath();
    });

    if (containerRef.current) {
      resizeObserver.observe(containerRef.current);
    }

    updatePath();

    return () => {
      resizeObserver.disconnect();
    };
  }, [
    containerRef,
    fromRef,
    toRef,
    startXOffset,
    startYOffset,
    endXOffset,
    endYOffset,
    borderRadius,
    mode, // Depend on mode for dynamic updates
  ]);

  return (
    <svg
      fill="none"
      width={svgDimensions.width}
      height={svgDimensions.height}
      xmlns="http://www.w3.org/2000/svg"
      className={cn(
        "pointer-events-none absolute left-0 top-0 transform-gpu stroke-2",
        className,
      )}
      viewBox={`0 0 ${svgDimensions.width} ${svgDimensions.height}`}
    >
      <path
        d={pathD}
        stroke={pathColor}
        strokeWidth={pathWidth}
        strokeOpacity={pathOpacity}
        strokeLinecap="round"
        fill="none"
      />
      <path
        d={pathD}
        strokeWidth={pathWidth}
        stroke={`url(#${id})`}
        strokeOpacity="1"
        strokeLinecap="round"
        fill="none"
      />
      <defs>
        <motion.linearGradient
          className="transform-gpu"
          id={id}
          gradientUnits={"userSpaceOnUse"}
          initial={{
            x1: "0%",
            x2: "0%",
            y1: "0%",
            y2: "0%",
          }}
          animate={{
            x1: gradientCoordinates.x1,
            x2: gradientCoordinates.x2,
            y1: gradientCoordinates.y1,
            y2: gradientCoordinates.y2,
          }}
          transition={{
            delay,
            duration,
            ease: [0.16, 1, 0.3, 1], // https://easings.net/#easeOutExpo
            repeat: Infinity,
            repeatDelay: 0,
          }}
        >
          <stop stopColor={gradientStartColor} stopOpacity="0"></stop>
          <stop stopColor={gradientStartColor}></stop>
          <stop offset="32.5%" stopColor={gradientStopColor}></stop>
          <stop
            offset="100%"
            stopColor={gradientStopColor}
            stopOpacity="0"
          ></stop>
        </motion.linearGradient>
      </defs>
    </svg>
  );
};
