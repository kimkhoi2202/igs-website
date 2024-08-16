import { useEffect } from 'react';
import { useTheme } from 'next-themes';

export default function ThemeDetector() {
  const { setTheme } = useTheme();

  useEffect(() => {
    const mediaQuery = window.matchMedia('(prefers-color-scheme: dark)');

    // Function to set the theme based on system preference
    const handleChange = (e: MediaQueryListEvent | MediaQueryList) => {
      if (e.matches) {
        setTheme('dark');  // Set theme to dark if system is in dark mode
      } else {
        setTheme('light'); // Set theme to light if system is in light mode
      }
    };

    // Initial check using the MediaQueryList object
    handleChange(mediaQuery);

    // Listen for changes in the system's color scheme
    mediaQuery.addEventListener('change', handleChange);

    // Cleanup event listener on unmount
    return () => {
      mediaQuery.removeEventListener('change', handleChange);
    };
  }, [setTheme]);

  return null; // No UI needed for this component
}
