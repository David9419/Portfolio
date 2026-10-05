"use client";

import { ArrowDown, ArrowRight, Code2, Database, Globe, Smartphone } from "lucide-react";
import { motion, useScroll, useTransform } from "motion/react";
import { useRef } from "react";
import { CarteInclinable, Magnetique, MotRotatif, MotsAnimes, TexteBrouille } from "@/components/animations";
import { Logo } from "@/components/logo";
import { identite } from "@/lib/contenu";

const D = 2.3; // les animations démarrent après l'écran d'ouverture

const bulles = [
  { Icone: Code2, classe: "-top-6 left-4", delai: 0 },
  { Icone: Database, classe: "top-1/3 -right-6", delai: 0.8 },
  { Icone: Globe, classe: "-bottom-5 right-12", delai: 1.6 },
  { Icone: Smartphone, classe: "bottom-1/4 -left-7", delai: 2.4 },
];

export function SectionAccueil() {
  const ref = useRef<HTMLElement>(null);
  const { scrollYProgress } = useScroll({ target: ref, offset: ["start start", "end start"] });
  const yTexte = useTransform(scrollYProgress, [0, 1], [0, 160]);
  const yCarte = useTransform(scrollYProgress, [0, 1], [0, -80]);
  const opacite = useTransform(scrollYProgress, [0, 0.8], [1, 0]);

  return (
    <section ref={ref} id="accueil" className="relative flex min-h-svh items-center overflow-hidden pt-28 pb-20">
      {/* Fond : grille, halos et courbes lumineuses */}
      <div className="grille absolute inset-0 opacity-60" aria-hidden />
      <div className="flotter absolute -top-40 -left-40 size-[520px] rounded-full bg-bleu/25 blur-[120px]" aria-hidden />
      <div className="flotter absolute -right-40 bottom-0 size-[600px] rounded-full bg-bleu-fonce/30 blur-[140px] [animation-delay:-6s]" aria-hidden />
      <svg className="absolute inset-0 h-full w-full" viewBox="0 0 1440 900" preserveAspectRatio="none" fill="none" aria-hidden>
        {[0, 1, 2].map((i) => (
          <motion.path
            key={i}
            d={`M-100 ${760 - i * 40} C 400 ${640 - i * 60}, 800 ${900 - i * 30}, 1540 ${180 + i * 70}`}
            stroke="url(#courbe)"
            strokeWidth={i === 0 ? 2 : 1}
            initial={{ pathLength: 0, opacity: 0 }}
            animate={{ pathLength: 1, opacity: 1 - i * 0.3 }}
            transition={{ duration: 2.4, delay: D + i * 0.2, ease: "easeInOut" }}
          />
        ))}
        <defs>
          <linearGradient id="courbe" x1="0" x2="1">
            <stop offset="0" stopColor="#3B82F6" stopOpacity="0" />
            <stop offset="0.6" stopColor="#3B82F6" />
            <stop offset="1" stopColor="#93C5FD" />
          </linearGradient>
        </defs>
      </svg>

      <div className="relative z-10 mx-auto grid w-full max-w-6xl items-center gap-16 px-6 lg:grid-cols-[1.5fr_1fr]">
        <motion.div style={{ y: yTexte, opacity: opacite }}>
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: D, duration: 0.7 }}
            className="mb-8 inline-flex items-center gap-3 rounded-full border border-bordure bg-carte/60 px-4 py-2 text-xs font-medium text-doux backdrop-blur"
          >
            <span className="relative flex size-2">
              <span className="absolute inline-flex size-full animate-ping rounded-full bg-emerald-400 opacity-75" />
              <span className="relative inline-flex size-2 rounded-full bg-emerald-400" />
            </span>
            Disponible pour de nouveaux projets
          </motion.div>

          <motion.p
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: D + 0.1 }}
            className="font-titre mb-5 text-xs font-semibold tracking-[0.3em] text-doux uppercase sm:text-sm"
          >
            <TexteBrouille texte={`${identite.prenom} ${identite.nom} · ${identite.titre}`} delai={D} />
          </motion.p>

          <h1 className="font-titre text-5xl leading-[0.98] font-black tracking-tight sm:text-7xl xl:text-[5.25rem]">
            <MotsAnimes texte="Des idées aux" delai={D + 0.25} immediat />
            <br />
            <MotsAnimes texte="projets concrets." delai={D + 0.45} immediat classeMot={() => "texte-degrade"} />
          </h1>

          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: D + 0.8, duration: 0.8 }}
            className="mt-8 max-w-xl text-lg leading-relaxed text-doux"
          >
            Je conçois des{" "}
            <MotRotatif
              mots={["sites internet", "logiciels", "SaaS", "CRM", "identités visuelles", "contenus vidéo"]}
              className="font-semibold text-texte"
            />
            <br className="hidden sm:block" /> pour donner vie à vos idées — du concept jusqu’à la mise en ligne.
          </motion.p>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: D + 1, duration: 0.8 }}
            className="mt-10 flex flex-wrap items-center gap-4"
          >
            <Magnetique>
              <a
                href="#projets"
                className="group relative inline-flex items-center gap-3 overflow-hidden rounded-full bg-bleu px-7 py-4 font-semibold text-white shadow-xl shadow-bleu/30"
              >
                <span className="absolute inset-0 -translate-x-full bg-gradient-to-r from-transparent via-white/30 to-transparent transition-transform duration-700 group-hover:translate-x-full" />
                Découvrir mon univers
                <ArrowRight className="size-4 transition-transform group-hover:translate-x-1" />
              </a>
            </Magnetique>
            <Magnetique>
              <a
                href="#contact"
                className="inline-flex items-center gap-2 rounded-full border border-bordure px-7 py-4 font-semibold transition-colors hover:border-bleu hover:text-bleu"
              >
                Me contacter
              </a>
            </Magnetique>
          </motion.div>

          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: D + 1.3, duration: 1 }}
            className="font-titre mt-14 flex items-center gap-4 text-xs font-medium tracking-[0.4em] text-doux"
          >
            {identite.piliers.map((p, i) => (
              <span key={p} className="flex items-center gap-4">
                {i > 0 && <span className="text-bleu">/</span>}
                {p.toUpperCase()}
              </span>
            ))}
          </motion.div>
        </motion.div>

        {/* Carte logo avec bordure lumineuse et icônes qui flottent */}
        <motion.div style={{ y: yCarte }} className="relative mx-auto hidden w-full max-w-sm lg:block">
          <CarteInclinable className="rounded-[2rem]">
          <motion.div
            initial={{ opacity: 0, scale: 0.85, rotate: -6 }}
            animate={{ opacity: 1, scale: 1, rotate: 0 }}
            transition={{ delay: D + 0.3, duration: 1.2, ease: [0.22, 1, 0.36, 1] }}
            className="bordure-tournante relative aspect-[4/5] rounded-[2rem] border border-bordure bg-gradient-to-br from-nuit via-[#0d1a33] to-[#0a2a6b] p-8 text-white shadow-2xl shadow-bleu/20"
          >
            <div className="absolute inset-0 overflow-hidden rounded-[2rem]">
              <div className="absolute -right-20 -bottom-20 size-72 rounded-full bg-bleu/40 blur-3xl" />
              <svg viewBox="0 0 400 500" className="absolute inset-0 h-full w-full opacity-30" fill="none">
                {Array.from({ length: 9 }).map((_, i) => (
                  <path key={i} d={`M-20 ${120 + i * 40} Q 200 ${40 + i * 45} 420 ${200 + i * 30}`} stroke="#60A5FA" strokeWidth="0.7" />
                ))}
              </svg>
            </div>
            <div className="relative flex h-full flex-col justify-between">
              <div className="flex items-center justify-between text-[10px] tracking-[0.3em] text-white/60">
                <span>PORTFOLIO</span>
                <span>N°01</span>
              </div>
              <div className="flex flex-col items-center gap-6">
                <Logo className="h-28 w-auto text-white drop-shadow-[0_0_30px_rgba(59,130,246,0.6)]" />
                <div className="text-center">
                  <p className="font-titre text-lg font-bold tracking-[0.4em]">
                    DAVID <span className="text-bleu-clair">BARON</span>
                  </p>
                  <div className="mx-auto mt-3 h-0.5 w-12 bg-bleu" />
                </div>
              </div>
              <p className="font-signature text-center text-4xl text-bleu-clair">David Baron</p>
            </div>
          </motion.div>
          </CarteInclinable>
          {bulles.map(({ Icone, classe, delai }, i) => (
            <motion.div
              key={i}
              initial={{ opacity: 0, scale: 0 }}
              animate={{ opacity: 1, scale: 1, y: [0, -12, 0] }}
              transition={{
                opacity: { delay: D + 0.9 + i * 0.12 },
                scale: { delay: D + 0.9 + i * 0.12, type: "spring" },
                y: { duration: 4, repeat: Infinity, ease: "easeInOut", delay: delai },
              }}
              className={`absolute ${classe} grid size-14 place-items-center rounded-2xl border border-bordure bg-carte/80 text-bleu shadow-xl backdrop-blur-md`}
            >
              <Icone className="size-6" strokeWidth={1.6} />
            </motion.div>
          ))}
        </motion.div>
      </div>

      <motion.a
        href="#a-propos"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: D + 1.8 }}
        className="absolute bottom-8 left-1/2 z-10 hidden -translate-x-1/2 md:flex flex-col items-center gap-2 text-[10px] tracking-[0.3em] text-doux"
        aria-label="Descendre"
      >
        DÉFILER
        <motion.span animate={{ y: [0, 8, 0] }} transition={{ duration: 1.6, repeat: Infinity }}>
          <ArrowDown className="size-4" />
        </motion.span>
      </motion.a>
    </section>
  );
}
