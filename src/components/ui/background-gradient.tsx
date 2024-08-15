import { cn } from "@/lib/utils";
import React from "react";
import { motion } from "framer-motion";

export const BackgroundGradient = ({
  children,
  className,
  containerClassName,
  animate = true,
}: {
  children?: React.ReactNode;
  className?: string;
  containerClassName?: string;
  animate?: boolean;
}) => {
  const variants = {
    initial: {
      backgroundPosition: "0 50%",
    },
    animate: {
      backgroundPosition: ["0 50%", "100% 50%", "0 50%"],
    },
  };

  return (
    <div className={cn("relative p-[4px] group", containerClassName)}>
      {/* Background gradient with hover effect */}
      <motion.div
        variants={animate ? variants : undefined}
        initial={animate ? "initial" : undefined}
        animate={animate ? "animate" : undefined}
        transition={
          animate
            ? {
                duration: 5,
                repeat: Infinity,
                repeatType: "reverse",
              }
            : undefined
        }
        style={{
          backgroundSize: animate ? "400% 400%" : undefined,
          backgroundPosition: "0 0", // Ensure full coverage
        }}
        className={cn(
          "absolute inset-0 rounded-3xl z-[1] transition duration-500 will-change-transform",
          "bg-[radial-gradient(circle_farthest-side_at_0_100%,#ff4b5c,transparent),radial-gradient(circle_farthest-side_at_100%_0,#ff6f61,transparent),radial-gradient(circle_farthest-side_at_100%_100%,#ff4b5c,transparent),radial-gradient(circle_farthest-side_at_0_0,#ff6f61,#ff4b5c)]",
          "opacity-0 group-hover:opacity-100 blur-xl"
        )}
      />
      
      {/* Underlying gradient for animation without hover effect */}
      <motion.div
        variants={animate ? variants : undefined}
        initial={animate ? "initial" : undefined}
        animate={animate ? "animate" : undefined}
        transition={
          animate
            ? {
                duration: 5,
                repeat: Infinity,
                repeatType: "reverse",
              }
            : undefined
        }
        style={{
          backgroundSize: animate ? "400% 400%" : undefined,
          backgroundPosition: "0 0", // Ensure full coverage
        }}
        className={cn(
          "absolute inset-0 rounded-3xl z-[1] will-change-transform",
          "bg-[radial-gradient(circle_farthest-side_at_0_100%,#ff4b5c,transparent),radial-gradient(circle_farthest-side_at_100%_0,#ff6f61,transparent),radial-gradient(circle_farthest-side_at_100%_100%,#ff4b5c,transparent),radial-gradient(circle_farthest-side_at_0_0,#ff6f61,#ff4b5c)]"
        )}
      />

      {/* Content of the card */}
      <div className={cn("relative z-10", className)}>{children}</div>
    </div>
  );
};
