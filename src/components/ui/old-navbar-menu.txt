"use client";
import React, { useState, useEffect, useRef } from "react";
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

interface DropdownProps {
  isOpen: boolean;
  onClose: () => void;
  buttonRef: React.RefObject<HTMLButtonElement>;
}

const Dropdown: React.FC<DropdownProps> = ({ isOpen, onClose, buttonRef }) => {
  return (
    <AnimatePresence>
      {isOpen && (
        <motion.div
          initial={{ opacity: 0, scale: 0.9, y: 10 }}
          animate={{ opacity: 1, scale: 1, y: 0 }}
          exit={{ opacity: 0, scale: 0.9, y: 10 }}
          transition={{ duration: 0.2 }}
          className="absolute top-full right-0 mt-2 w-48 bg-white dark:bg-gray-800 rounded-lg shadow-lg ring-1 ring-black ring-opacity-5 z-20"
          onClick={onClose}
          style={{ originX: 0.5, originY: 0 }}
        >
          <div className="p-2">
            <Link href="#" className="block px-4 py-2 text-gray-800 dark:text-gray-200 hover:bg-gray-100 dark:hover:bg-gray-700 rounded-lg">English</Link>
            <Link href="#" className="block px-4 py-2 text-gray-800 dark:text-gray-200 hover:bg-gray-100 dark:hover:bg-gray-700 rounded-lg">中文</Link>
            <Link href="#" className="block px-4 py-2 text-gray-800 dark:text-gray-200 hover:bg-gray-100 dark:hover:bg-gray-700 rounded-lg">Español</Link>
            <Link href="#" className="block px-4 py-2 text-gray-800 dark:text-gray-200 hover:bg-gray-100 dark:hover:bg-gray-700 rounded-lg">Tiếng Việt</Link>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
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
        className="cursor-pointer font-bold text-white hover:text-gray-700 dark:text-white dark:hover:text-gray-300"
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
                className="bg-red-800 dark:bg-red-800 rounded-2xl overflow-hidden border border-red-800 dark:border-red-800 shadow-xl"
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
      className="relative rounded-full border border-transparent dark:border-red-800 bg-red-800 dark:bg-red-800 shadow-input flex justify-center items-center space-x-6 px-8 py-4"
    >
      {children}
    </nav>
  );
};

export const HoveredLink = ({ children, ...rest }: any) => {
  return (
    <Link
      {...rest}
      className="text-red-800 dark:text-red-800 hover:text-red-800 dark:hover:text-red-500 font-bold"
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
          "flex max-w-fit fixed top-10 inset-x-0 mx-auto border border-transparent dark:border-red-800 rounded-full dark:bg-red-800 bg-red-800 shadow-[0px_2px_3px_-1px_rgba(0,0,0,0.1),0px_1px_0px_0px_rgba(25,28,33,0.02),0px_0px_0px_1px_rgba(25,28,33,0.08)] z-[5000] pr-6 pl-6 py-3 items-center justify-center space-x-8",
          className
        )}
      >
        {navItems.map((navItem) => (
          <Link
            key={navItem.name}
            href={navItem.link}
            className={cn(
              "relative dark:text-neutral-50 items-center flex space-x-2 text-lg text-white dark:text-white dark:hover:text-gray-300 hover:text-gray-700 font-bold"
            )}
          >
            <span className="block sm:hidden">{navItem.icon}</span>
            <span className="hidden sm:block text-lg">{navItem.name}</span>
          </Link>
        ))}
      </motion.div>
    </AnimatePresence>
  );
};

export default function NavbarMenu() {
  const [active, setActive] = useState<string | null>(null);
  const [languageMenuOpen, setLanguageMenuOpen] = useState(false); // State for dropdown visibility
  const languageButtonRef = useRef<HTMLButtonElement>(null); // Ref for positioning the dropdown
  const dropdownRef = useRef<HTMLDivElement>(null); // Ref for the dropdown menu

  const navItems = [
    { name: "Home", link: "#", icon: <Home className="h-10 w-10 text-black dark:text-white bg-white dark:bg-gray-500 p-2 rounded" /> }, // Adjusted size
    { name: "Solutions", link: "#", icon: <Package className="h-6 w-6 text-white dark:text-white" /> },
    { name: "Expertise", link: "#", icon: <Hammer className="h-6 w-6 text-white dark:text-white" /> },
    { name: "Services", link: "#", icon: <Layers className="h-6 w-6 text-white dark:text-white" /> },
  ];

  // Effect to handle clicks outside of the dropdown and button
  useEffect(() => {
    function handleClickOutside(event: MouseEvent) {
      if (
        languageButtonRef.current &&
        !languageButtonRef.current.contains(event.target as Node) &&
        dropdownRef.current &&
        !dropdownRef.current.contains(event.target as Node)
      ) {
        setLanguageMenuOpen(false);
      }
    }

    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

  return (
    <>
      <header className="bg-red-800 h-18 flex items-center justify-between px-4 lg:px-6 mt-1 mb-1">
        <Link href="#" className="flex items-center" prefetch={false}>
          <Home className="h-10 w-10 text-black dark:text-white bg-white dark:bg-black p-2 rounded" /> {/* Adjusted size */}
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
        <div className="flex gap-2 items-center relative">
          <Button
            variant="outline"
            size="md"
            className="text-black dark:bg-black dark:hover:bg-red-700 dark:text-white"
            onClick={() => setLanguageMenuOpen(!languageMenuOpen)}
            ref={languageButtonRef} // Attach ref to the button
          >
            Language
          </Button>
          <ModeToggle />
          <Dropdown isOpen={languageMenuOpen} onClose={() => setLanguageMenuOpen(false)} buttonRef={languageButtonRef} />
        </div>
      </header>
      <FloatingNav navItems={navItems} />
    </>
  );
}
