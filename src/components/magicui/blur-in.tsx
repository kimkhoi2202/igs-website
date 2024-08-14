"use client";

import { motion } from "framer-motion";
import { cn } from "@/lib/utils";

interface BlurInProps {
  word: string;
  className?: string;
  variant?: {
    hidden: { filter: string; opacity: number };
    visible: { filter: string; opacity: number };
  };
  duration?: number;
  onAnimationComplete?: () => void; // Add this line
}

const BlurIn = ({
  word = "", // Provide a default value
  className,
  variant,
  duration = 3,
  onAnimationComplete, // Add this line
}: BlurInProps) => {
  const defaultVariants = {
    hidden: { filter: "blur(10px)", opacity: 0 },
    visible: { filter: "blur(0px)", opacity: 1 },
  };
  const combinedVariants = variant || defaultVariants;

  return (
    <motion.h1
      initial="hidden"
      animate="visible"
      transition={{ duration }}
      variants={combinedVariants}
      onAnimationComplete={onAnimationComplete} // Handle the onAnimationComplete prop
      className={cn(
        className,
        "font-display text-center text-4xl font-bold tracking-[-0.02em] drop-shadow-sm md:text-7xl md:leading-[5rem]",
      )}
    >
      {word}
    </motion.h1>
  );
};

export default BlurIn;
