"use client";

import { Code2, Lightbulb, Megaphone, Palette, Rocket, ScanEye } from "lucide-react";
import { motion, useMotionValue, useScroll, useSpring, useTransform } from "motion/react";
import { useEffect, useRef } from "react";
import { Apparition, EnteteSection, MotsAnimes } from "@/components/animations";
import { methode } from "@/lib/contenu";

const icones = [Lightbulb, Palette, ScanEye, Code2, Rocket, Megaphone];

function CarteEtape({ etape, index }: { etape: (typeof methode.etapes)[number]; index: number }) {
  const Icone = icones[index];
  return (
    <div className="group relative flex h-full w-full flex-col overflow-hidden rounded-[1.75rem] border border-bordure bg-carte p-7 transition-colors duration-500 hover:border-bleu/50 md:p-9">
      <div className="absolute -right-16 -bottom-16 size-56 rounded-full bg-bleu/10 blur-3xl transition-all duration-700 group-hover:bg-bleu/25" />
      <div className="relative flex items-center justify-between">
        <span className="grid size-14 place-items-center rounded-2xl bg-bleu/10 text-bleu transition-all duration-500 group-hover:-rotate-6 group-hover:bg-bleu group-hover:text-white">
          <Icone className="size-6" strokeWidth={1.6} />
        </span>
        <span className="font-titre text-xs font-semibold tracking-[0.3em] text-doux">ÉTAPE 0{index + 1}</span>
      </div>
      <span className="font-titre relative mt-auto text-[6.5rem] leading-none font-black text-transparent [-webkit-text-stroke:1.5px_var(--bordure)] transition-all duration-500 group-hover:[-webkit-text-stroke:1.5px_var(--bleu)]">
        0{index + 1}
      </span>
      <h3 className="font-titre relative mt-4 text-2xl font-extrabold md:text-3xl">{etape.titre}</h3>
      <p className="relative mt-2 text-doux">{etape.texte}</p>
    </div>
  );
}

// Sur ordinateur : la section reste fixe à l'écran et les étapes défilent
// à l'horizontale pendant qu'on descend. Sur téléphone : simple liste.
export function SectionMethode() {
  const zone = useRef<HTMLDivElement>(null);
  const rail = useRef<HTMLDivElement>(null);
  const distance = useMotionValue(0);
  const { scrollYProgress } = useScroll({ target: zone, offset: ["start start", "end end"] });
  const lisse = useSpring(scrollYProgress, { stiffness: 120, damping: 30, mass: 0.4 });
  const x = useTransform(() => -lisse.get() * distance.get());
  const etapeCourante = useTransform(lisse, (v) => `0${Math.min(methode.etapes.length, Math.floor(v * methode.etapes.length) + 1)}`);

  useEffect(() => {
    const mesurer = () => {
      if (rail.current) distance.set(Math.max(0, rail.current.scrollWidth - window.innerWidth + 48));
    };
    mesurer();
    const observateur = new ResizeObserver(mesurer);
    if (rail.current) observateur.observe(rail.current);
    window.addEventListener("resize", mesurer);
    return () => {
      observateur.disconnect();
      window.removeEventListener("resize", mesurer);
    };
  }, [distance]);

  return (
    <section id="methode" className="relative">
      {/* Téléphone et tablette */}
      <div className="mx-auto max-w-6xl px-6 py-28 lg:hidden">
        <EnteteSection numero="05" libelle="Ma façon de travailler" titre="J’aime apprendre en" accent="créant." />
        <p className="-mt-8 mb-12 text-lg leading-relaxed text-doux">{methode.texte}</p>
        <div className="grid gap-4 sm:grid-cols-2">
          {methode.etapes.map((e, i) => (
            <Apparition key={e.titre} delai={(i % 2) * 0.1} className="h-80">
              <CarteEtape etape={e} index={i} />
            </Apparition>
          ))}
        </div>
      </div>

      {/* Ordinateur : défilement horizontal épinglé */}
      <div ref={zone} className="relative hidden h-[320vh] lg:block">
        <div className="sticky top-0 flex h-svh flex-col justify-center overflow-hidden">
          <div className="grille absolute inset-0 opacity-40" aria-hidden />
          <motion.div ref={rail} style={{ x }} className="relative flex items-stretch gap-6 ps-[max(1.5rem,calc((100vw-72rem)/2+1.5rem))] pe-24">
            <div className="flex w-[34rem] shrink-0 flex-col justify-center pe-10">
              <p className="font-titre mb-5 flex items-center gap-3 text-xs font-semibold tracking-[0.35em] text-bleu uppercase">
                <span className="text-doux">05</span>
                <span className="h-px w-10 bg-bleu" />
                Ma façon de travailler
              </p>
              <h2 className="font-titre text-6xl leading-[1.02] font-extrabold tracking-tight">
                <MotsAnimes texte="J’aime apprendre en" /> <MotsAnimes texte="créant." classeMot={() => "texte-degrade"} delai={0.2} />
              </h2>
              <p className="mt-6 text-lg leading-relaxed text-doux">{methode.texte}</p>
              <p className="font-titre mt-10 flex items-center gap-3 text-xs tracking-[0.3em] text-doux">
                CONTINUEZ À DESCENDRE
                <motion.span animate={{ x: [0, 8, 0] }} transition={{ duration: 1.4, repeat: Infinity }} className="text-bleu">
                  →
                </motion.span>
              </p>
            </div>
            {methode.etapes.map((e, i) => (
              <div key={e.titre} className="h-[30rem] w-[24rem] shrink-0">
                <CarteEtape etape={e} index={i} />
              </div>
            ))}
          </motion.div>

          {/* Avancement des étapes */}
          <div className="relative mx-auto mt-12 flex w-full max-w-6xl items-center gap-6 px-6">
            <motion.span className="font-titre w-10 text-sm font-bold text-bleu tabular-nums">{etapeCourante}</motion.span>
            <div className="h-px flex-1 bg-bordure">
              <motion.div style={{ scaleX: lisse }} className="h-full origin-left bg-gradient-to-r from-bleu-clair to-bleu-fonce" />
            </div>
            <span className="font-titre text-sm text-doux">0{methode.etapes.length}</span>
          </div>
        </div>
      </div>
    </section>
  );
}
