"use client";

import { ArrowUpRight, Clock } from "lucide-react";
import { motion, useScroll, useTransform } from "motion/react";
import { useRef } from "react";
import { Apparition, CarteInclinable, EnteteSection } from "@/components/animations";
import { IconeInstagram } from "@/components/icones";
import { projets, type Projet } from "@/lib/contenu";

// Visuel abstrait propre à chaque projet (à remplacer plus tard par de vraies captures).
function Visuel({ projet, index }: { projet: Projet; index: number }) {
  const [c1, c2] = projet.couleurs;
  return (
    <div
      className={`relative aspect-[16/10] overflow-hidden rounded-2xl ${index === 0 ? "md:aspect-[21/8]" : ""}`}
      style={{ background: `radial-gradient(120% 120% at 100% 100%, ${c1} 0%, ${c2} 35%, #050a14 75%)` }}
    >
      <svg viewBox="0 0 400 250" preserveAspectRatio="none" className="absolute inset-0 h-full w-full" fill="none" aria-hidden>
        {Array.from({ length: 12 }).map((_, i) => (
          <path
            key={i}
            d={`M-20 ${60 + i * 18} C 120 ${index % 2 ? 20 + i * 14 : 200 - i * 8}, 260 ${index % 2 ? 260 - i * 6 : 30 + i * 16}, 420 ${100 + i * 12}`}
            stroke="white"
            strokeOpacity={0.06 + i * 0.012}
          />
        ))}
      </svg>
      <div className="absolute inset-0 flex items-center justify-center transition-transform duration-700 group-hover:scale-110">
        <span className={`font-titre font-black tracking-tight text-white drop-shadow-2xl ${index === 0 ? "text-5xl md:text-7xl" : "text-4xl md:text-5xl"}`}>
          {projet.nom}
        </span>
      </div>
      <div className="absolute top-4 left-4 flex gap-1.5">
        {[0, 1, 2].map((i) => (
          <span key={i} className="size-2.5 rounded-full bg-white/30" />
        ))}
      </div>
    </div>
  );
}

function CarteProjet({ projet, index }: { projet: Projet; index: number }) {
  const ref = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({ target: ref, offset: ["start end", "end start"] });
  const y = useTransform(scrollYProgress, [0, 1], [60, -60]);

  return (
    <motion.div ref={ref} style={{ y: index % 2 ? y : undefined }}>
      <Apparition delai={index * 0.1}>
        <CarteInclinable className="rounded-3xl border border-bordure bg-carte p-3 transition-shadow duration-500 hover:shadow-2xl hover:shadow-bleu/15">
          <Visuel projet={projet} index={index} />
          <div className="p-5">
            <div className="flex items-center justify-between text-xs text-doux">
              <span className="font-semibold tracking-wider text-bleu uppercase">{projet.categorie}</span>
              <span>{projet.annee}</span>
            </div>
            <h3 className="font-titre mt-3 text-3xl font-extrabold">{projet.nom}</h3>
            <p className="mt-3 leading-relaxed text-doux">{projet.description}</p>
            <ul className="mt-5 flex flex-wrap gap-2">
              {projet.role.map((r) => (
                <li key={r} className="rounded-full border border-bordure px-3 py-1 text-xs font-medium">
                  {r}
                </li>
              ))}
            </ul>
            <div className="relative z-20 mt-6 flex flex-wrap gap-3">
              {projet.site && (
                <a
                  href={projet.site}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="group/lien inline-flex items-center gap-2 rounded-full bg-bleu px-5 py-2.5 text-sm font-semibold text-white"
                >
                  Voir le site
                  <ArrowUpRight className="size-4 transition-transform group-hover/lien:translate-x-0.5 group-hover/lien:-translate-y-0.5" />
                </a>
              )}
              {projet.instagram && (
                <a
                  href={projet.instagram}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-2 rounded-full border border-bordure px-5 py-2.5 text-sm font-semibold transition-colors hover:border-bleu hover:text-bleu"
                >
                  <IconeInstagram className="size-4" />
                  Instagram
                </a>
              )}
              {projet.lienAVenir && (
                <span className="inline-flex items-center gap-2 rounded-full border border-dashed border-bordure px-5 py-2.5 text-sm text-doux">
                  <Clock className="size-4" />
                  {projet.lienAVenir}
                </span>
              )}
            </div>
          </div>
        </CarteInclinable>
      </Apparition>
    </motion.div>
  );
}

export function SectionProjets() {
  return (
    <section id="projets" className="relative bg-fond-2 py-28 md:py-40">
      <div className="mx-auto max-w-6xl px-6">
        <EnteteSection numero="02" libelle="Mes projets" titre="Des idées devenues" accent="réalités." />
        <div className="grid gap-10 md:grid-cols-2 md:gap-8">
          {projets.map((p, i) => (
            <div key={p.nom} className={i === 0 ? "md:col-span-2" : ""}>
              <CarteProjet projet={p} index={i} />
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
