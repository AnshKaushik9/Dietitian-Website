"use client";

import { ThemeProvider } from "next-themes";
import { MotionConfig } from "framer-motion";
import { Toaster } from "@/components/ui/sonner";
import { ReactNode } from "react";

export function Providers({ children }: { children: ReactNode }) {
  return (
    <ThemeProvider
      attribute="class"
      defaultTheme="light" // Default to light based on brand identity (warm/calm)
      enableSystem={false} // Disable system preference to enforce light mode by default as per design system
      disableTransitionOnChange
    >
      <MotionConfig reducedMotion="user">
        {/* Placeholder for Sanity Live Query Provider if needed in the future */}
        {/* Placeholder for Analytics Provider (e.g. GoogleAnalytics from @next/third-parties/google) */}
        {children}
        <Toaster position="bottom-right" />
      </MotionConfig>
    </ThemeProvider>
  );
}
