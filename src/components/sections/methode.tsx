"use client";

import { motion, useScroll, useTransform } from "motion/react";
import { useRef } from "react";
import { Apparition, EnteteSection } from "@/components/animations";
import { methode, objectif } from "@/lib/contenu";

export function SectionMethode() {
  const ref = useRef<HTMLElement>(null);
  const { scrollYProgress } = useScroll({ target: ref, offset: ["start end", "end start"] });
  const x = useTransform(scrollYProgress, [0, 1], ["10%", "-35%"]);

  return (
    <section ref={ref} className="relative overflow-hidden py-28 md:py-40">
      <div className="mx-auto max-w-6xl px-6">
        <EnteteSection numero="05" libelle="Ma façon de travailler" titre="J’aime apprendre en" accent="créant." />
        <Apparition>
          <p className="-mt-8 mb-16 max-w-2xl text-lg leading-relaxed text-doux">{methode.texte}</p>
        </Apparition>

        <div className="grid gap-px overflow-hidden rounded-3xl border border-bordure bg-bordure sm:grid-cols-2 lg:grid-cols-3">
          {methode.etapes.map((e, i) => (
            <Apparition key={e.titre} delai={(i % 3) * 0.1} className="group relative bg-fond p-8 transition-colors duration-500 hover:bg-carte">
              <div>
                <span className="font-titre text-6xl font-black text-bleu/15 transition-colors duration-500 group-hover:text-bleu/50">
                  0{i + 1}
                </span>
                <h3 className="font-titre mt-4 text-xl font-bold">{e.titre}</h3>
                <p className="mt-2 text-doux">{e.texte}</p>
                <span className="absolute bottom-0 left-0 h-0.5 w-0 bg-bleu transition-all duration-500 group-hover:w-full" />
              </div>
            </Apparition>
          ))}
        </div>
      </div>

      {/* Grand texte qui glisse avec le défilement */}
      <motion.div style={{ x }} className="font-titre mt-28 flex gap-10 text-[13vw] leading-none font-black whitespace-nowrap select-none" aria-hidden>
        {objectif.mots.map((m, i) => (
          <span key={m} className={i === 1 ? "texte-brillant" : "text-transparent [-webkit-text-stroke:1.5px_var(--texte-doux)] opacity-40"}>
            {m}
          </span>
        ))}
      </motion.div>
    </section>
  );
}
