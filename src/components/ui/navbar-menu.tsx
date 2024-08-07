"use client";
import React, { useState } from "react";
import {
  motion,
  AnimatePresence,
  useScroll,
  useMotionValueEvent,
} from "framer-motion";
import Link from "next/link";
import { Button } from '@/components/ui/button';
import { ModeToggle } from '@/components/ui/mode-toggle';
import { Home, Package, Hammer, Layers } from "lucide-react";
import { cn } from "@/lib/utils";

const transition = {
  type: "spring",
  mass: 0.5,
  damping: 11.5,
  stiffness: 100,
  restDelta: 0.001,
  restSpeed: 0.001,
};

export const MenuItem = ({
  setActive,
  active,
  item,
  children,
}: {
  setActive: (item: string) => void;
  active: string | null;
  item: string;
  children?: React.ReactNode;
}) => {
  return (
    <div
      onMouseEnter={() => setActive(item)}
      className="relative flex items-center justify-center"
      role="button"
      tabIndex={0}
      onKeyDown={(e) => e.key === 'Enter' && setActive(item)}
    >
      <motion.p
        transition={{ duration: 0.3 }}
        className="cursor-pointer text-black hover:opacity-[0.9] dark:text-white"
      >
        {item}
      </motion.p>
      {active !== null && (
        <motion.div
          initial={{ opacity: 0, scale: 0.85, y: 10 }}
          animate={{ opacity: 1, scale: 1, y: 0 }}
          transition={transition}
        >
          {active === item && (
            <div className="absolute top-[calc(100%_+_1.2rem)] left-1/2 transform -translate-x-1/2 pt-4">
              <motion.div
                transition={transition}
                layoutId="active" // layoutId ensures smooth animation
                className="bg-white dark:bg-black backdrop-blur-sm rounded-2xl overflow-hidden border border-black/[0.2] dark:border-white/[0.2] shadow-xl"
              >
                <motion.div
                  layout // layout ensures smooth animation
                  className="w-max h-full p-4"
                >
                  {children}
                </motion.div>
              </motion.div>
            </div>
          )}
        </motion.div>
      )}
    </div>
  );
};

export const Menu = ({
  setActive,
  children,
}: {
  setActive: (item: string | null) => void;
  children: React.ReactNode;
}) => {
  return (
    <nav
      onMouseLeave={() => setActive(null)} // resets the state
      className="relative rounded-full border border-transparent dark:bg-black dark:border-white/[0.2] bg-white shadow-input flex justify-center items-center space-x-6 px-8 py-4" // Adjusted padding and spacing
    >
      {children}
    </nav>
  );
};

export const HoveredLink = ({ children, ...rest }: any) => {
  return (
    <Link
      {...rest}
      className="text-neutral-700 dark:text-neutral-200 hover:text-black"
    >
      {children}
    </Link>
  );
};

export const FloatingNav = ({
  navItems,
  className,
}: {
  navItems: {
    name: string;
    link: string;
    icon?: JSX.Element;
  }[];
  className?: string;
}) => {
  const { scrollYProgress } = useScroll();

  const [visible, setVisible] = useState(false);

  useMotionValueEvent(scrollYProgress, "change", (current) => {
    // Check if current is not undefined and is a number
    if (typeof current === "number") {
      const previous = scrollYProgress.getPrevious();
      let direction = previous !== undefined ? current - previous : 0;

      if (scrollYProgress.get() < 0.05) {
        setVisible(false);
      } else {
        setVisible(direction < 0);
      }
    }
  });

  return (
    <AnimatePresence mode="wait">
      <motion.div
        initial={{
          opacity: 1,
          y: -100,
        }}
        animate={{
          y: visible ? 0 : -100,
          opacity: visible ? 1 : 0,
        }}
        transition={{
          duration: 0.2,
        }}
        className={cn(
          "flex max-w-fit fixed top-10 inset-x-0 mx-auto border border-transparent dark:border-white/[0.2] rounded-full dark:bg-black bg-white shadow-[0px_2px_3px_-1px_rgba(0,0,0,0.1),0px_1px_0px_0px_rgba(25,28,33,0.02),0px_0px_0px_1px_rgba(25,28,33,0.08)] z-[5000] pr-6 pl-6 py-3 items-center justify-center space-x-8", // Adjusted padding and spacing
          className
        )}
      >
        {navItems.map((navItem) => (
          <Link
            key={navItem.name} // Use a unique identifier for keys
            href={navItem.link}
            className={cn(
              "relative dark:text-neutral-50 items-center flex space-x-2 text-lg text-neutral-600 dark:hover:text-neutral-300 hover:text-neutral-500" // Adjusted font size and spacing
            )}
          >
            <span className="block sm:hidden">{navItem.icon}</span>
            <span className="hidden sm:block text-lg">{navItem.name}</span> {/* Adjusted font size */}
          </Link>
        ))}
      </motion.div>
    </AnimatePresence>
  );
};

export default function NavbarMenu() {
  const [active, setActive] = useState<string | null>(null);

  const navItems = [
    { name: "Home", link: "#", icon: <Home className="h-5 w-5" /> }, // Increased icon size
    { name: "Solutions", link: "#", icon: <Package className="h-5 w-5" /> }, // Increased icon size
    { name: "Expertise", link: "#", icon: <Hammer className="h-5 w-5" /> }, // Increased icon size
    { name: "Services", link: "#", icon: <Layers className="h-5 w-5" /> }, // Increased icon size
  ];

  return (
    <>
      <header className="bg-background h-18 flex items-center justify-between px-4 lg:px-6 mt-1 mb-1">
        <Link href="#" className="flex items-center" prefetch={false}>
          <Home className="h-6 w-6" />
          <span className="sr-only">Acme Supply Chain</span>
        </Link>
        <div className="flex-1 flex items-center justify-center">
          <Menu setActive={setActive}>
            <MenuItem setActive={setActive} active={active} item="Home">
              <HoveredLink href="#">Home</HoveredLink>
            </MenuItem>
            <MenuItem setActive={setActive} active={active} item="Solutions">
              <HoveredLink href="#">Solutions</HoveredLink>
            </MenuItem>
            <MenuItem setActive={setActive} active={active} item="Expertise">
              <HoveredLink href="#">Expertise</HoveredLink>
            </MenuItem>
            <MenuItem setActive={setActive} active={active} item="Services">
              <HoveredLink href="#">Services</HoveredLink>
            </MenuItem>
          </Menu>
        </div>
        <div className="flex gap-2">
          <Button variant="outline" size="icon">
            Login
          </Button>
          <ModeToggle />
        </div>
      </header>
      <FloatingNav navItems={navItems} />
    </>
  );
}
