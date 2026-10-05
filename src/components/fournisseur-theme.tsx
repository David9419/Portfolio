"use client";

import { MotionConfig } from "motion/react";
import { ThemeProvider } from "next-themes";

// Mode sombre par défaut (comme la charte), mémorisé dans le navigateur.
export function FournisseurTheme({ children }: { children: React.ReactNode }) {
  return (
    <ThemeProvider attribute="class" defaultTheme="dark" enableSystem={false} disableTransitionOnChange={false}>
      <MotionConfig reducedMotion="user">{children}</MotionConfig>
    </ThemeProvider>
  );
}
