"use client";

import { Briefcase, GraduationCap } from "lucide-react";
import { motion, useScroll } from "motion/react";
import { useRef } from "react";
import { Apparition, EnteteSection } from "@/components/animations";
import { parcours } from "@/lib/contenu";

export function SectionParcours() {
  const ref = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({ target: ref, offset: ["start 70%", "end 60%"] });

  return (
    <section id="parcours" className="relative bg-fond-2 py-28 md:py-40">
      <div className="mx-auto max-w-6xl px-6">
        <EnteteSection numero="04" libelle="Mon parcours" titre="Apprendre en" accent="pratiquant." />

        <div ref={ref} className="relative ps-10 md:ps-16">
          {/* Ligne qui se remplit au fil du défilement */}
          <div className="absolute start-3 top-0 h-full w-px bg-bordure md:start-5" aria-hidden />
          <motion.div
            style={{ scaleY: scrollYProgress }}
            className="absolute start-3 top-0 h-full w-px origin-top bg-gradient-to-b from-bleu-clair to-bleu-fonce md:start-5"
            aria-hidden
          />

          <div className="space-y-16">
            {parcours.map((etape, i) => {
              const Icone = i === 0 ? Briefcase : GraduationCap;
              return (
                <div key={etape.lieu} className="relative">
                  <motion.div
                    initial={{ scale: 0 }}
                    whileInView={{ scale: 1 }}
                    viewport={{ once: true, margin: "-100px" }}
                    transition={{ type: "spring", stiffness: 260, damping: 18 }}
                    className="absolute -start-10 top-1 grid size-7 place-items-center rounded-full bg-bleu text-white ring-8 ring-fond-2 md:-start-16 md:size-10"
                  >
                    <Icone className="size-3.5 md:size-4" />
                  </motion.div>
                  <Apparition>
                    <div className="rounded-3xl border border-bordure bg-carte p-7 md:p-10">
                      <div className="flex flex-wrap items-center gap-3 text-xs font-semibold tracking-wider uppercase">
                        <span className="rounded-full bg-bleu/10 px-3 py-1 text-bleu">{etape.type}</span>
                        <span className="text-doux">{etape.periode}</span>
                      </div>
                      <h3 className="font-titre mt-4 text-2xl font-extrabold md:text-3xl">{etape.lieu}</h3>
                      <p className="mt-4 max-w-3xl leading-relaxed text-doux">{etape.texte}</p>
                      <ul className="mt-6 flex flex-wrap gap-2">
                        {etape.points.map((p, j) => (
                          <motion.li
                            key={p}
                            initial={{ opacity: 0, scale: 0.8 }}
                            whileInView={{ opacity: 1, scale: 1 }}
                            viewport={{ once: true }}
                            transition={{ delay: 0.2 + j * 0.04 }}
                            className="rounded-full border border-bordure bg-fond/60 px-3.5 py-1.5 text-sm"
                          >
                            {p}
                          </motion.li>
                        ))}
                      </ul>
                    </div>
                  </Apparition>
                </div>
              );
            })}
          </div>
        </div>
      </div>
    </section>
  );
}
