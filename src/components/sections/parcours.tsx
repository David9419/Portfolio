"use client";

import { Briefcase, Check, GraduationCap, Rocket } from "lucide-react";
import { motion, useScroll, useTransform, type MotionValue } from "motion/react";
import { useRef } from "react";
import { EnteteSection } from "@/components/animations";
import { parcours } from "@/lib/contenu";

const icones = [Rocket, Briefcase, GraduationCap];

// Une carte « collante » : elle reste en place pendant que la suivante vient se poser
// dessus, puis recule légèrement (plus petite et plus sombre), comme une pile.
function CarteParcours({
  etape,
  index,
  total,
  progression,
}: {
  etape: (typeof parcours)[number];
  index: number;
  total: number;
  progression: MotionValue<number>;
}) {
  const debut = index / total;
  const echelle = useTransform(progression, [debut, 1], [1, 1 - (total - 1 - index) * 0.06]);
  const voile = useTransform(progression, [debut, 1], [0, (total - 1 - index) * 0.25]);
  const Icone = icones[index % icones.length];

  return (
    <div className="sticky top-28 flex h-[68vh] items-start justify-center md:top-32">
      <motion.article
        style={{ scale: echelle, top: index * 22 }}
        className="relative w-full origin-top overflow-hidden rounded-[2rem] border border-bordure bg-carte shadow-2xl shadow-black/10"
      >
        <motion.div style={{ opacity: voile }} className="pointer-events-none absolute inset-0 z-20 bg-black" />
        <div className="absolute -top-24 -right-24 size-80 rounded-full bg-bleu/15 blur-3xl" aria-hidden />
        <span className="font-titre pointer-events-none absolute -right-4 -bottom-10 text-[11rem] leading-none font-black text-bleu/[0.06] select-none md:text-[15rem]">
          0{index + 1}
        </span>

        <div className="relative grid gap-8 p-7 md:grid-cols-[1fr_1.1fr] md:gap-12 md:p-12">
          <div>
            <div className="flex items-center gap-3">
              <span className="grid size-12 place-items-center rounded-2xl bg-bleu text-white shadow-lg shadow-bleu/30">
                <Icone className="size-5" />
              </span>
              <div className="text-xs font-semibold tracking-widest uppercase">
                <p className="text-bleu">{etape.type}</p>
                <p className="text-doux">{etape.periode}</p>
              </div>
            </div>
            <h3 className="font-titre mt-6 text-3xl leading-tight font-extrabold md:text-4xl">{etape.lieu}</h3>
            <p className="mt-4 text-sm leading-relaxed text-doux md:text-base">{etape.texte}</p>
          </div>

          <ul className="flex flex-wrap content-start gap-2 sm:grid sm:grid-cols-2 sm:gap-2.5">
            {etape.points.map((p, j) => (
              <motion.li
                key={p}
                initial={{ opacity: 0, y: 14 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: "-60px" }}
                transition={{ delay: 0.15 + j * 0.05, duration: 0.5 }}
                className="flex items-center gap-2 rounded-xl border border-bordure bg-fond/60 px-3 py-2 text-xs sm:gap-3 sm:px-3.5 sm:py-3 sm:text-sm"
              >
                <span className="grid size-5 shrink-0 place-items-center rounded-full bg-bleu/15 text-bleu">
                  <Check className="size-3" strokeWidth={3} />
                </span>
                {p}
              </motion.li>
            ))}
          </ul>
        </div>
      </motion.article>
    </div>
  );
}

export function SectionParcours() {
  const ref = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({ target: ref, offset: ["start start", "end end"] });

  return (
    <section id="parcours" className="relative bg-fond-2 pt-28 pb-10 md:pt-40">
      <div className="mx-auto max-w-6xl px-6">
        <EnteteSection numero="04" libelle="Mon parcours" titre="Apprendre en" accent="pratiquant." />
        <div ref={ref} className="relative">
          {parcours.map((etape, i) => (
            <CarteParcours key={etape.lieu} etape={etape} index={i} total={parcours.length} progression={scrollYProgress} />
          ))}
        </div>
      </div>
    </section>
  );
}
