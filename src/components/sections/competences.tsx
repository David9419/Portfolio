"use client";

import { Bot, Check, Code2, Megaphone, Palette, Pause, Play } from "lucide-react";
import { AnimatePresence, motion, useInView } from "motion/react";
import { useRef, useState } from "react";
import { Apparition, EnteteSection } from "@/components/animations";
import { SceneCroissance, SceneOpportunite, SceneProspection, SceneSEO } from "@/components/demos/demo-business";
import { SceneBase, SceneCode, SceneDeploiement, SceneInterface } from "@/components/demos/demo-dev";
import { SceneAffiche, SceneCouleurs, SceneLogo, SceneVideo } from "@/components/demos/demo-design";
import { SceneAutomatisation, ScenePrompt, SceneReponse, SceneResultat } from "@/components/demos/demo-ia";
import { competences } from "@/lib/contenu";

const icones = { code: Code2, design: Palette, business: Megaphone, ia: Bot };

// Chaque domaine = 4 étapes animées, jouées l'une après l'autre.
const demos: Record<string, { fenetre: string; etapes: { titre: string; duree: number; Scene: () => React.ReactNode }[] }> = {
  sites: {
    fenetre: "studio — mon-saas",
    etapes: [
      { titre: "Le code", duree: 5.5, Scene: SceneCode },
      { titre: "La base de données", duree: 3.6, Scene: SceneBase },
      { titre: "L’interface", duree: 3.8, Scene: SceneInterface },
      { titre: "La mise en ligne", duree: 4.2, Scene: SceneDeploiement },
    ],
  },
  design: {
    fenetre: "design — identité visuelle",
    etapes: [
      { titre: "Le logo", duree: 3.6, Scene: SceneLogo },
      { titre: "Les couleurs", duree: 3.4, Scene: SceneCouleurs },
      { titre: "L’affiche", duree: 3.8, Scene: SceneAffiche },
      { titre: "La vidéo", duree: 3.8, Scene: SceneVideo },
    ],
  },
  business: {
    fenetre: "business — croissance",
    etapes: [
      { titre: "L’opportunité", duree: 4, Scene: SceneOpportunite },
      { titre: "La prospection", duree: 3.8, Scene: SceneProspection },
      { titre: "Le référencement", duree: 3.8, Scene: SceneSEO },
      { titre: "La croissance", duree: 3.6, Scene: SceneCroissance },
    ],
  },
  ia: {
    fenetre: "ia — assistant",
    etapes: [
      { titre: "La demande", duree: 3.6, Scene: ScenePrompt },
      { titre: "La réponse", duree: 4, Scene: SceneReponse },
      { titre: "L’automatisation", duree: 3.8, Scene: SceneAutomatisation },
      { titre: "Le résultat", duree: 3.4, Scene: SceneResultat },
    ],
  },
};

export function SectionCompetences() {
  const [actif, setActif] = useState(competences[0].id);
  const [etape, setEtape] = useState(0);
  const [pause, setPause] = useState(false);
  const ref = useRef<HTMLDivElement>(null);
  const visible = useInView(ref, { margin: "-20% 0px" });

  const groupe = competences.find((c) => c.id === actif) ?? competences[0];
  const demo = demos[actif];
  const { Scene } = demo.etapes[etape];
  const enLecture = visible && !pause;

  const choisirDomaine = (id: string) => {
    setActif(id);
    setEtape(0);
  };
  const suivante = () => setEtape((e) => (e + 1) % demo.etapes.length);

  return (
    <section id="expertise" className="relative mx-auto max-w-6xl px-6 py-28 md:py-40">
      <EnteteSection numero="03" libelle="Ce que je sais faire" titre="De l’idée au produit," accent="en direct." />
      <Apparition>
        <p className="-mt-8 mb-14 max-w-2xl text-lg leading-relaxed text-doux">
          Choisissez un domaine et regardez chaque étape de création prendre vie, du premier croquis jusqu’au résultat.
        </p>
      </Apparition>

      <div ref={ref} className="grid gap-8 lg:grid-cols-[300px_1fr]">
        {/* Domaines */}
        <Apparition depuis="gauche" className="min-w-0">
          <div role="tablist" aria-label="Domaines de compétences" className="flex gap-2 overflow-x-auto pb-2 lg:flex-col lg:overflow-visible">
            {competences.map((c) => {
              const Icone = icones[c.icone as keyof typeof icones];
              const estActif = c.id === actif;
              return (
                <button
                  key={c.id}
                  role="tab"
                  aria-selected={estActif}
                  onClick={() => choisirDomaine(c.id)}
                  className={`relative flex shrink-0 items-center gap-4 rounded-2xl px-5 py-4 text-start font-semibold transition-colors ${
                    estActif ? "text-white" : "text-doux hover:bg-texte/[0.04] hover:text-texte"
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

          <AnimatePresence mode="wait">
            <motion.ul
              key={groupe.id}
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="mt-6 hidden flex-wrap gap-2 lg:flex"
            >
              {groupe.elements.map((e, i) => (
                <motion.li
                  key={e}
                  initial={{ opacity: 0, y: 8 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: i * 0.04 }}
                  className="flex items-center gap-1.5 rounded-full border border-bordure px-3 py-1.5 text-xs text-doux"
                >
                  <Check className="size-3 text-bleu" strokeWidth={3} />
                  {e}
                </motion.li>
              ))}
            </motion.ul>
          </AnimatePresence>
        </Apparition>

        {/* Fenêtre de démonstration */}
        <Apparition depuis="droite" className="min-w-0">
          <div className="overflow-hidden rounded-3xl border border-bordure bg-nuit shadow-2xl shadow-bleu/10 ring-1 ring-white/5">
            <div className="flex items-center gap-3 border-b border-white/10 bg-[#0d1526] px-4 py-3">
              <div className="flex gap-1.5">
                <span className="size-2.5 rounded-full bg-[#ff5f57]" />
                <span className="size-2.5 rounded-full bg-[#febc2e]" />
                <span className="size-2.5 rounded-full bg-[#28c840]" />
              </div>
              <AnimatePresence mode="wait">
                <motion.span
                  key={demo.fenetre}
                  initial={{ opacity: 0, y: 6 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -6 }}
                  className="mx-auto font-mono text-[11px] text-white/50"
                >
                  {demo.fenetre}
                </motion.span>
              </AnimatePresence>
              <button
                type="button"
                onClick={() => setPause((p) => !p)}
                aria-label={pause ? "Reprendre" : "Mettre en pause"}
                className="grid size-7 place-items-center rounded-full text-white/50 transition-colors hover:bg-white/10 hover:text-white"
              >
                {pause ? <Play className="size-3.5" /> : <Pause className="size-3.5" />}
              </button>
            </div>

            <div className="relative h-[340px] md:h-[380px]">
              <div className="absolute -top-24 left-1/3 size-72 rounded-full bg-bleu/15 blur-3xl" aria-hidden />
              <AnimatePresence mode="wait">
                <motion.div
                  key={`${actif}-${etape}`}
                  initial={{ opacity: 0, y: 16, filter: "blur(6px)" }}
                  animate={{ opacity: 1, y: 0, filter: "blur(0px)" }}
                  exit={{ opacity: 0, y: -16, filter: "blur(6px)" }}
                  transition={{ duration: 0.35 }}
                  className="absolute inset-0"
                >
                  {visible && <Scene />}
                </motion.div>
              </AnimatePresence>
            </div>

            {/* Étapes avec barre de progression */}
            <div className="grid grid-cols-4 border-t border-white/10">
              {demo.etapes.map((e, i) => (
                <button
                  key={`${actif}-${e.titre}`}
                  type="button"
                  onClick={() => setEtape(i)}
                  className={`group relative px-2 py-3.5 text-start transition-colors md:px-4 ${i === etape ? "bg-white/[0.04]" : "hover:bg-white/[0.02]"}`}
                >
                  <span className={`font-titre block text-[10px] font-semibold tracking-widest ${i === etape ? "text-bleu-clair" : "text-white/30"}`}>
                    ÉTAPE {i + 1}
                  </span>
                  <span className={`mt-0.5 block truncate text-xs md:text-sm ${i === etape ? "text-white" : "text-white/50 group-hover:text-white/80"}`}>
                    {e.titre}
                  </span>
                  <span className="absolute inset-x-0 top-0 h-0.5 bg-white/5">
                    {i < etape && <span className="block h-full w-full bg-bleu/60" />}
                    {i === etape && (
                      <motion.span
                        key={`${actif}-${etape}-${enLecture}`}
                        className="block h-full origin-left bg-bleu shadow-[0_0_8px_#3b82f6]"
                        initial={{ scaleX: 0 }}
                        animate={enLecture ? { scaleX: 1 } : { scaleX: 0 }}
                        transition={enLecture ? { duration: e.duree, ease: "linear" } : { duration: 0 }}
                        onAnimationComplete={() => enLecture && suivante()}
                      />
                    )}
                  </span>
                </button>
              ))}
            </div>
          </div>
        </Apparition>
      </div>
    </section>
  );
}
