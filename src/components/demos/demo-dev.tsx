"use client";

import { Check, Database, MousePointer2, Rocket } from "lucide-react";
import { motion } from "motion/react";
import { Curseur, useFrappe, useSequence } from "./outils-demo";

// Couleurs de l'éditeur de code
const c = { mot: "text-violet-300", nom: "text-sky-300", texte: "text-emerald-300", ponct: "text-white/50", com: "text-white/35" };

const lignes: { t: string; c: string }[][] = [
  [{ t: "import", c: c.mot }, { t: " { creer, deployer } ", c: "text-white" }, { t: "from", c: c.mot }, { t: ' "studio"', c: c.texte }],
  [],
  [{ t: "const", c: c.mot }, { t: " projet ", c: c.nom }, { t: "= ", c: c.ponct }, { t: "creer", c: "text-amber-200" }, { t: "({", c: c.ponct }],
  [{ t: "  nom: ", c: "text-white" }, { t: '"Mon SaaS"', c: c.texte }, { t: ",", c: c.ponct }],
  [{ t: "  pages: ", c: "text-white" }, { t: '["Accueil", "Tableau de bord"]', c: c.texte }, { t: ",", c: c.ponct }],
  [{ t: "  base: ", c: "text-white" }, { t: "supabase", c: c.nom }, { t: ",", c: c.ponct }],
  [{ t: "  design: ", c: "text-white" }, { t: '"sur mesure"', c: c.texte }],
  [{ t: "});", c: c.ponct }],
  [],
  [{ t: "deployer", c: "text-amber-200" }, { t: "(projet); ", c: c.ponct }, { t: "// en ligne 🚀", c: c.com }],
];
const longueurs = lignes.map((l) => l.reduce((m, j) => m + j.t.length, 0));
const departs = longueurs.map((_, i) => longueurs.slice(0, i).reduce((a, b) => a + b + 1, 0));
const totalCaracteres = departs[departs.length - 1] + longueurs[longueurs.length - 1];

export function SceneCode() {
  const n = useFrappe(totalCaracteres, 22, 200);
  return (
    <div className="flex h-full font-mono text-[10.5px] leading-6 sm:text-[12px] md:text-[13px]">
      <div className="hidden w-36 shrink-0 border-e border-white/5 bg-white/[0.02] p-3 text-[11px] text-white/40 sm:block">
        <p className="mb-2 tracking-widest text-white/25">FICHIERS</p>
        {["app/", "  page.tsx", "  projet.ts", "base/", "  clients.sql"].map((f, i) => (
          <p key={f} className={`whitespace-pre ${i === 2 ? "rounded bg-bleu/20 text-white" : ""}`}>
            {f}
          </p>
        ))}
      </div>
      <div className="flex-1 overflow-hidden p-4">
        {lignes.map((ligne, i) => {
          const tapes = Math.min(Math.max(n - departs[i], 0), longueurs[i]);
          const active = n >= departs[i] && n <= departs[i] + longueurs[i];
          return (
            <div key={i} className="flex whitespace-pre">
              <span className="w-7 shrink-0 text-end text-white/20 select-none">{i + 1}</span>
              <span className="ps-4">
                {ligne.map((j, k) => {
                  const avant = ligne.slice(0, k).reduce((m, x) => m + x.t.length, 0);
                  return (
                    <span key={k} className={j.c}>
                      {j.t.slice(0, Math.max(0, tapes - avant))}
                    </span>
                  );
                })}
                {active && <Curseur />}
              </span>
            </div>
          );
        })}
      </div>
    </div>
  );
}

const clients = [
  ["Sarah L.", "sarah@mail.fr", "Actif"],
  ["Yonatan K.", "yonatan@mail.fr", "Nouveau"],
  ["Léa M.", "lea@mail.fr", "Actif"],
  ["Noam B.", "noam@mail.fr", "En attente"],
  ["Esther D.", "esther@mail.fr", "Actif"],
];

export function SceneBase() {
  const n = useSequence(clients.length, 380, 400);
  return (
    <div className="flex h-full flex-col gap-4 p-5">
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-2 text-sm font-semibold text-white">
          <Database className="size-4 text-emerald-400" /> Table « clients »
        </div>
        <span className="flex items-center gap-2 rounded-full bg-emerald-400/10 px-3 py-1 text-[11px] text-emerald-300">
          <span className="size-1.5 animate-pulse rounded-full bg-emerald-400" /> Base connectée
        </span>
      </div>
      <div className="overflow-hidden rounded-xl border border-white/10 text-[12px]">
        <div className="grid grid-cols-[1fr_1.4fr_0.9fr] bg-white/5 px-4 py-2 text-white/40">
          <span>nom</span>
          <span>e-mail</span>
          <span>statut</span>
        </div>
        {clients.slice(0, n).map(([nom, mail, statut]) => (
          <motion.div
            key={nom}
            initial={{ opacity: 0, x: -20, backgroundColor: "rgba(59,130,246,0.25)" }}
            animate={{ opacity: 1, x: 0, backgroundColor: "rgba(59,130,246,0)" }}
            transition={{ duration: 0.6 }}
            className="grid grid-cols-[1fr_1.4fr_0.9fr] border-t border-white/5 px-4 py-2.5 text-white/80"
          >
            <span>{nom}</span>
            <span className="truncate text-white/50">{mail}</span>
            <span>
              <span
                className={`rounded-full px-2 py-0.5 text-[10px] ${
                  statut === "Actif" ? "bg-emerald-400/15 text-emerald-300" : statut === "Nouveau" ? "bg-bleu/20 text-bleu-clair" : "bg-amber-400/15 text-amber-300"
                }`}
              >
                {statut}
              </span>
            </span>
          </motion.div>
        ))}
      </div>
      <p className="font-mono text-[11px] text-white/35">
        {n} ligne{n > 1 ? "s" : ""} · sécurisée · temps réel
      </p>
    </div>
  );
}

export function SceneInterface() {
  const pop = (delai: number) => ({
    initial: { opacity: 0, y: 14, scale: 0.96 },
    animate: { opacity: 1, y: 0, scale: 1 },
    transition: { delay: delai, duration: 0.5, ease: [0.22, 1, 0.36, 1] as const },
  });
  return (
    <div className="relative h-full p-5">
      <div className="h-full overflow-hidden rounded-xl border border-white/10 bg-gradient-to-br from-[#0f1a33] to-[#0a1124]">
        <motion.div {...pop(0.1)} className="flex items-center justify-between border-b border-white/5 px-4 py-3">
          <span className="h-3 w-16 rounded bg-bleu" />
          <span className="flex gap-2">
            {[0, 1, 2].map((i) => (
              <span key={i} className="h-2 w-10 rounded bg-white/15" />
            ))}
          </span>
        </motion.div>
        <div className="grid gap-5 p-5 md:grid-cols-[1.2fr_1fr]">
          <div className="space-y-2.5">
            <motion.div {...pop(0.4)} className="h-5 w-4/5 rounded bg-white/80" />
            <motion.div {...pop(0.55)} className="h-5 w-3/5 rounded bg-bleu" />
            <motion.div {...pop(0.7)} className="h-2 w-full rounded bg-white/15" />
            <motion.div {...pop(0.75)} className="h-2 w-5/6 rounded bg-white/15" />
            <motion.div {...pop(0.95)} className="relative mt-3 inline-flex h-8 w-28 items-center justify-center rounded-full bg-bleu">
              <motion.span
                className="absolute inset-0 rounded-full border-2 border-white"
                initial={{ opacity: 0, scale: 1 }}
                animate={{ opacity: [0, 0.8, 0], scale: [1, 1, 1.4] }}
                transition={{ delay: 2.5, duration: 0.6 }}
              />
              <span className="h-1.5 w-14 rounded bg-white/80" />
            </motion.div>
          </div>
          <motion.div {...pop(0.6)} className="hidden aspect-[4/3] rounded-xl bg-gradient-to-br from-bleu/60 to-bleu-fonce/30 md:block" />
        </div>
        <div className="grid grid-cols-3 gap-3 px-5">
          {[0, 1, 2].map((i) => (
            <motion.div key={i} {...pop(1.2 + i * 0.12)} className="h-16 rounded-lg border border-white/10 bg-white/5 p-2.5">
              <span className="block size-4 rounded bg-bleu/60" />
              <span className="mt-2 block h-1.5 w-3/4 rounded bg-white/20" />
            </motion.div>
          ))}
        </div>
      </div>
      <motion.div
        className="absolute text-white drop-shadow-lg"
        initial={{ left: "85%", top: "90%", opacity: 0 }}
        animate={{ left: "18%", top: "52%", opacity: 1 }}
        transition={{ delay: 1.6, duration: 0.9, ease: [0.22, 1, 0.36, 1] }}
      >
        <MousePointer2 className="size-5 fill-white" />
      </motion.div>
    </div>
  );
}

const terminal = [
  { t: "$ npm run build", c: "text-white" },
  { t: "✓ Compilé en 8,4 s", c: "text-emerald-300" },
  { t: "✓ 12 pages générées", c: "text-emerald-300" },
  { t: "$ vercel --prod", c: "text-white" },
];

export function SceneDeploiement() {
  const n = useSequence(terminal.length + 2, 500, 200);
  return (
    <div className="flex h-full flex-col justify-between p-5 font-mono text-[12px] md:text-[13px]">
      <div className="space-y-1.5">
        {terminal.slice(0, n).map((l) => (
          <motion.p key={l.t} initial={{ opacity: 0, x: -8 }} animate={{ opacity: 1, x: 0 }} className={l.c}>
            {l.t}
          </motion.p>
        ))}
        {n > terminal.length && (
          <div className="flex items-center gap-3 pt-1 text-white/60">
            <span>Mise en ligne</span>
            <div className="h-1.5 flex-1 overflow-hidden rounded-full bg-white/10">
              <motion.div
                className="h-full rounded-full bg-gradient-to-r from-bleu-clair to-bleu"
                initial={{ width: "0%" }}
                animate={{ width: "100%" }}
                transition={{ duration: 1, ease: "easeInOut" }}
              />
            </div>
          </div>
        )}
      </div>
      {n > terminal.length + 1 && (
        <motion.div
          initial={{ opacity: 0, y: 20, scale: 0.95 }}
          animate={{ opacity: 1, y: 0, scale: 1 }}
          transition={{ type: "spring", stiffness: 200, damping: 18, delay: 0.4 }}
          className="flex items-center gap-4 rounded-2xl border border-emerald-400/30 bg-emerald-400/10 p-4 font-sans"
        >
          <span className="relative grid size-11 place-items-center rounded-full bg-emerald-400 text-nuit">
            <span className="absolute inset-0 animate-ping rounded-full bg-emerald-400/50" />
            <Check className="relative size-5" strokeWidth={3} />
          </span>
          <div>
            <p className="text-sm font-semibold text-white">Le site est en ligne !</p>
            <p className="text-xs text-emerald-200/80">https://mon-projet.com</p>
          </div>
          <Rocket className="ms-auto size-6 text-white/70" />
        </motion.div>
      )}
    </div>
  );
}
