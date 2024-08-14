"use client";

import { useEffect, useRef } from "react";
import { motion, useAnimation, useInView } from "framer-motion";

interface BoxRevealProps {
  children: JSX.Element;
  width?: "fit-content" | "100%";
  boxColor?: string;
  duration?: number;
  startAnimation?: boolean;
}

export const BoxReveal = ({
  children,
  width = "fit-content",
  boxColor,
  duration,
  startAnimation = false,
}: BoxRevealProps) => {
  const mainControls = useAnimation();
  const slideControls = useAnimation();

  const ref = useRef<HTMLDivElement>(null);
  const isInView = useInView(ref, { once: true });

  useEffect(() => {
    if (isInView && startAnimation) {
      // slideControls.start("visible").then(() => {
      //   setTimeout(() => {
      //     slideControls.start("hidden").then(() => {
            mainControls.start("visible");
      //     });
      //   }, 100);
      // });
      
    } else {
      slideControls.start("hidden");
      mainControls.start("hidden");
    }
  }, [isInView, mainControls, slideControls, startAnimation]);

  return (
    <div ref={ref} style={{ position: "relative", width, overflow: "hidden" }}>
      <motion.div
        variants={{
          hidden: { opacity: 0, y: 75 },
          visible: { opacity: 1, y: 0 },
        }}
        initial="hidden"
        animate={mainControls}
        transition={{ duration: duration ?? 1.0, delay: 0.1 }}
      >
        {children}
      </motion.div>

      <motion.div
        variants={{
          hidden: { left: "100%" },
          visible: {left: 0},
        }}
        initial="hidden"
        animate={slideControls}
        transition={{ duration: duration ?? 0.5, ease: "easeIn" }}
        style={{
          position: "absolute",
          top: 4,
          bottom: 4,
          left: 0,
          right: 0,
          zIndex: 20,
          background: boxColor ?? "#5046e6",
        }}
      />
    </div>
  );
};

export default BoxReveal;
