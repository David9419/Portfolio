"use client";

import { Sparkle } from "lucide-react";
import { motion, useScroll, useTransform } from "motion/react";
import { useRef } from "react";
import { TexteDefilant } from "@/components/animations";
import { outils } from "@/lib/contenu";

function Element({ nom, plein }: { nom: string; plein?: boolean }) {
  return (
    <span className="group/el flex items-center gap-6 px-6">
      <span
        className={`font-titre text-2xl font-extrabold tracking-tight whitespace-nowrap transition-all duration-300 md:text-4xl ${
          plein
            ? "text-white group-hover/el:text-nuit"
            : "text-transparent [-webkit-text-stroke:1px_var(--texte-doux)] group-hover/el:text-bleu group-hover/el:[-webkit-text-stroke:1px_transparent]"
        }`}
      >
        {nom}
      </span>
      <Sparkle
        className={`size-5 shrink-0 transition-transform duration-500 group-hover/el:rotate-180 ${plein ? "text-white/70" : "text-bleu"}`}
      />
    </span>
  );
}

// Deux bandes croisées qui défilent en sens inverse. Elles réagissent au défilement :
// plus on descend vite, plus elles accélèrent ; quand on remonte, elles changent de sens.
export function BandeOutils() {
  const ref = useRef<HTMLElement>(null);
  const { scrollYProgress } = useScroll({ target: ref, offset: ["start end", "end start"] });
  const rotation1 = useTransform(scrollYProgress, [0, 1], [-5, 1]);
  const rotation2 = useTransform(scrollYProgress, [0, 1], [4, -2]);
  const tous = outils.flatMap((g) => g.liste);
  const moitie = Math.ceil(tous.length / 2);

  return (
    <section ref={ref} aria-label="Outils et technologies" className="relative overflow-hidden py-16">
      <motion.div style={{ rotate: rotation1 }} className="relative z-10 -mx-10 bg-bleu py-5 shadow-2xl shadow-bleu/30">
        <TexteDefilant vitesse={2.2}>
          {tous.slice(0, moitie).map((o) => (
            <Element key={o} nom={o} plein />
          ))}
        </TexteDefilant>
      </motion.div>
      <motion.div style={{ rotate: rotation2 }} className="-mx-10 mt-8 border-y border-bordure bg-fond-2 py-5">
        <TexteDefilant vitesse={-2.2}>
          {tous.slice(moitie).map((o) => (
            <Element key={o} nom={o} />
          ))}
        </TexteDefilant>
      </motion.div>
    </section>
  );
}
