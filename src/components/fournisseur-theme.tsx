"use client";

import { ReactLenis } from "lenis/react";
import { MotionConfig } from "motion/react";
import { ThemeProvider } from "next-themes";

// Courbe « lente – rapide – lente » pour les trajets vers une section.
export const courbeTrajet = (t: number) =>
  t < 0.5 ? 16 * t ** 5 : 1 - Math.pow(-2 * t + 2, 5) / 2;

// Mode sombre par défaut (comme la charte) + défilement fluide (Lenis) sur tout le site.
// Tous les liens « #section » glissent tout seuls jusqu'à la section.
export function FournisseurTheme({ children }: { children: React.ReactNode }) {
  return (
    <ThemeProvider attribute="class" defaultTheme="dark" enableSystem={false}>
      <ReactLenis
        root
        options={{
          lerp: 0.09,
          anchors: { offset: -90, duration: 1.6, easing: courbeTrajet },
        }}
      >
        <MotionConfig reducedMotion="user">{children}</MotionConfig>
      </ReactLenis>
    </ThemeProvider>
  );
}
