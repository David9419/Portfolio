"use client";

import { TexteDefilant } from "@/components/animations";
import { Logo } from "@/components/logo";

const mots = ["Créer", "Innover", "Progresser", "Des idées aux projets concrets"];

// Bande fine et élégante : mots pleins / contours, séparés par le logo.
// Elle suit le défilement : plus vite quand on descend vite, sens inverse quand on remonte.
export function BandeDevise() {
  return (
    <section aria-label="Créer, innover, progresser" className="relative border-y border-bordure bg-fond-2/60 py-6 md:py-8">
      <div className="pointer-events-none absolute inset-y-0 left-0 z-10 w-24 bg-gradient-to-r from-fond to-transparent md:w-48" />
      <div className="pointer-events-none absolute inset-y-0 right-0 z-10 w-24 bg-gradient-to-l from-fond to-transparent md:w-48" />
      <TexteDefilant vitesse={1.6}>
        {mots.map((m, i) => (
          <span key={m} className="flex items-center">
            <span
              className={`font-titre px-6 text-2xl font-extrabold tracking-tight md:px-10 md:text-4xl ${
                i % 2 === 0 ? "text-texte" : "texte-brillant"
              }`}
            >
              {m}
            </span>
            <Logo className="h-5 w-auto text-texte/30 md:h-6" />
          </span>
        ))}
      </TexteDefilant>
    </section>
  );
}
