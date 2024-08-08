import { Inter } from 'next/font/google';
import { cn } from '@/lib/utils';
import './globals.css';
import { ReactNode } from 'react';
import { ThemeProvider } from "@/components/ui/theme-provider";
import { SpeedInsights } from "@vercel/speed-insights/next";
import NavbarMenu from '@/components/ui/navbar-menu';
import Footer from '@/components/Footer';

const fontInter = Inter({
  subsets: ['latin'],
  display: 'swap',
  variable: '--font-inter',
});

interface LayoutProps {
  readonly children: ReactNode;
}

export default function Layout({ children }: LayoutProps) {
  return (
    <html lang="en" suppressHydrationWarning>
      <head />
      <body className={cn('antialiased bg-background dark:bg-black bg-dot-black/[0.2] dark:bg-dot-white/[0.2]', fontInter.variable)}>
        <ThemeProvider
          attribute="class"
          defaultTheme="system"
          enableSystem
          disableTransitionOnChange
        >
          <SpeedInsights />
          <NavbarMenu />
          {children}
          <Footer />
        </ThemeProvider>
      </body>
    </html>
  );
}
