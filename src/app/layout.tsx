import { Inter } from 'next/font/google';
import { cn } from '@/lib/utils';
import './globals.css';
import { ReactNode } from 'react';
import { ThemeProvider } from "@/components/ui/theme-provider";
import { SpeedInsights } from "@vercel/speed-insights/next"

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
      <body className={cn('antialiased bg-background', fontInter.variable)}>
        <ThemeProvider
          attribute="class"
          defaultTheme="system"
          enableSystem
          disableTransitionOnChange
        >
          {children}
        </ThemeProvider>
      </body>
    </html>
  );
}
