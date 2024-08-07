import React, { useEffect } from "react";
import { motion, useAnimation } from "framer-motion";
import { Spotlight } from "@/components/ui/spotlight";
import { useInView } from "react-intersection-observer";

export default function VisionSection() {
  const controls = useAnimation();
  const [ref, inView] = useInView({
    threshold: 0.5,
    triggerOnce: true,
  });

  useEffect(() => {
    if (inView) {
      controls.start("visible");
    }
  }, [controls, inView]);

  return (
    <section ref={ref} className="w-full py-12 md:py-24 lg:py-32 bg-background relative overflow-hidden">
      <motion.div
        initial="hidden"
        animate={controls}
        variants={{
          hidden: { opacity: 0, scale: 0.5 },
          visible: { opacity: 1, scale: 1 },
        }}
        transition={{ duration: 1, ease: "easeOut" }}
        className="absolute inset-0"
      >
        <Spotlight className="w-full h-full -top-44 left-4 md:left-64 md:-top-24" fill="white" />
      </motion.div>
      <div className="container px-4 md:px-6 text-primary-foreground max-w-6xl mx-auto relative z-10">
        <div className="max-w-4xl mx-auto text-center space-y-4">
          <h2 className="text-3xl font-bold tracking-tighter">Our Vision</h2>
          <p className="text-lg md:text-xl">
            Internash Global offers a wide array of service portfolios that includes fulfillment, component level
            repair, refurbishment of legacy and wireless equipment, warehousing, and distribution on behalf of OEM
            customers.
          </p>
          <h3 className="text-xl font-semibold">
            Additionally, we offer LTE Base Station testing, engineering, installation, and maintenance.
          </h3>
        </div>
      </div>
    </section>
  );
}
