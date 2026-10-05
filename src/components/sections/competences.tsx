"use client";

import { Bot, Check, Code2, Megaphone, Palette } from "lucide-react";
import { AnimatePresence, motion } from "motion/react";
import { useState } from "react";
import { Apparition, EnteteSection } from "@/components/animations";
import { competences, outils } from "@/lib/contenu";

const icones = { code: Code2, design: Palette, business: Megaphone, ia: Bot };

export function SectionCompetences() {
  const [actif, setActif] = useState(competences[0].id);
  const groupe = competences.find((c) => c.id === actif) ?? competences[0];

  return (
    <section id="competences" className="relative mx-auto max-w-6xl px-6 py-28 md:py-40">
      <EnteteSection numero="03" libelle="Ce que je sais faire" titre="Un savoir-faire" accent="complet." />

      <div className="grid gap-10 lg:grid-cols-[320px_1fr]">
        {/* Onglets */}
        <Apparition depuis="gauche">
          <div role="tablist" aria-label="Domaines de compétences" className="flex gap-2 overflow-x-auto pb-2 lg:flex-col lg:overflow-visible">
            {competences.map((c) => {
              const Icone = icones[c.icone as keyof typeof icones];
              const estActif = c.id === actif;
              return (
                <button
                  key={c.id}
                  role="tab"
                  aria-selected={estActif}
                  onClick={() => setActif(c.id)}
                  className={`relative flex shrink-0 items-center gap-4 rounded-2xl px-5 py-4 text-start font-semibold transition-colors ${
                    estActif ? "text-white" : "text-doux hover:text-texte"
                  }`}
                >
                  {estActif && (
                    <motion.span
                      layoutId="onglet-competence"
                      className="absolute inset-0 -z-10 rounded-2xl bg-bleu shadow-lg shadow-bleu/30"
                      transition={{ type: "spring", stiffness: 350, damping: 30 }}
                    />
                  )}
                  <Icone className="size-5" strokeWidth={1.8} />
                  {c.titre}
                </button>
              );
            })}
          </div>
        </Apparition>

        {/* Contenu de l'onglet */}
        <div className="relative min-h-[360px] overflow-hidden rounded-3xl border border-bordure bg-carte p-8 md:p-10">
          <div className="absolute -top-20 -right-20 size-64 rounded-full bg-bleu/15 blur-3xl" aria-hidden />
          <AnimatePresence mode="wait">
            <motion.div
              key={groupe.id}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
              transition={{ duration: 0.35 }}
              className="relative"
            >
              <h3 className="font-titre text-2xl font-extrabold md:text-3xl">{groupe.titre}</h3>
              {groupe.texte && <p className="mt-4 max-w-2xl leading-relaxed text-doux">{groupe.texte}</p>}
              <ul className="mt-8 grid gap-3 sm:grid-cols-2">
                {groupe.elements.map((e, i) => (
                  <motion.li
                    key={e}
                    initial={{ opacity: 0, x: -15 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: 0.05 * i }}
                    className="flex items-center gap-3 rounded-xl border border-bordure bg-fond/50 px-4 py-3"
                  >
                    <span className="grid size-6 shrink-0 place-items-center rounded-full bg-bleu/15 text-bleu">
                      <Check className="size-3.5" strokeWidth={3} />
                    </span>
                    {e}
                  </motion.li>
                ))}
              </ul>
            </motion.div>
          </AnimatePresence>
        </div>
      </div>

      {/* Outils & technologies */}
      <div className="mt-24">
        <Apparition>
          <h3 className="font-titre text-xs font-semibold tracking-[0.35em] text-doux uppercase">Outils & technologies</h3>
        </Apparition>
        <div className="mt-8 grid gap-6 md:grid-cols-3">
          {outils.map((g, gi) => (
            <Apparition key={g.groupe} delai={gi * 0.1}>
              <div className="h-full rounded-3xl border border-bordure p-6">
                <p className="font-titre mb-5 font-bold">{g.groupe}</p>
                <div className="flex flex-wrap gap-2">
                  {g.liste.map((o) => (
                    <motion.span
                      key={o}
                      whileHover={{ y: -3, scale: 1.05 }}
                      className="cursor-default rounded-full bg-fond-2 px-3.5 py-1.5 text-sm font-medium transition-colors hover:bg-bleu hover:text-white"
                    >
                      {o}
                    </motion.span>
                  ))}
                </div>
              </div>
            </Apparition>
          ))}
        </div>
        <Apparition delai={0.2}>
          <p className="mt-6 text-doux">
            Je sais aussi connecter différents outils et services entre eux pour construire des applications complètes et
            fonctionnelles.
          </p>
        </Apparition>
      </div>
    </section>
  );
}
