"use client";

import { Check, Search, Send, Sparkles, TrendingUp, UserPlus } from "lucide-react";
import { motion } from "motion/react";
import { useEffect, useState } from "react";
import { Compteur } from "@/components/animations";
import { Curseur, useFrappe, useSequence } from "./outils-demo";

const recherche = "opportunités de business en ligne";
const idees = [
  { nom: "Boutique de seconde main", score: 92 },
  { nom: "Site pour un artisan local", score: 78 },
  { nom: "Application de réservation", score: 64 },
];

export function SceneOpportunite() {
  const n = useFrappe(recherche.length, 35, 200);
  const fini = n >= recherche.length;
  return (
    <div className="flex h-full flex-col gap-4 p-5">
      <div className="flex items-center gap-3 rounded-xl border border-white/10 bg-white/5 px-4 py-3 text-sm text-white">
        <Search className="size-4 text-white/40" />
        {recherche.slice(0, n)}
        {!fini && <Curseur />}
      </div>
      {fini &&
        idees.map((idee, i) => (
          <motion.div
            key={idee.nom}
            initial={{ opacity: 0, y: 12 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2 + i * 0.2 }}
            className={`rounded-xl border p-3.5 ${i === 0 ? "border-bleu/50 bg-bleu/10" : "border-white/10 bg-white/[0.03]"}`}
          >
            <div className="flex items-center justify-between text-sm text-white">
              <span className="flex items-center gap-2">
                {i === 0 && <Sparkles className="size-4 text-bleu-clair" />}
                {idee.nom}
              </span>
              <span className="font-mono text-xs text-white/60">{idee.score}/100</span>
            </div>
            <div className="mt-2 h-1 overflow-hidden rounded-full bg-white/10">
              <motion.div
                className={`h-full rounded-full ${i === 0 ? "bg-bleu" : "bg-white/40"}`}
                initial={{ width: 0 }}
                animate={{ width: `${idee.score}%` }}
                transition={{ delay: 0.4 + i * 0.2, duration: 0.9 }}
              />
            </div>
          </motion.div>
        ))}
    </div>
  );
}

const contacts = ["Restaurant Le Delice", "Cabinet Cohen", "Boutique Mila", "Garage Atlas"];

export function SceneProspection() {
  const n = useSequence(contacts.length, 600, 500);
  return (
    <div className="flex h-full flex-col gap-2.5 p-4 md:p-5">
      <p className="text-xs tracking-widest text-white/40">PROSPECTION · CETTE SEMAINE</p>
      {contacts.map((nom, i) => (
        <motion.div
          key={nom}
          initial={{ opacity: 0, x: -16 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ delay: i * 0.1 }}
          className="flex items-center gap-3 rounded-xl border border-white/10 bg-white/[0.03] p-2.5"
        >
          <span className="grid size-9 place-items-center rounded-full bg-gradient-to-br from-bleu to-bleu-fonce text-xs font-bold text-white">
            {nom.split(" ").pop()?.[0]}
          </span>
          <span className="flex-1 text-sm text-white">{nom}</span>
          {i < n ? (
            <motion.span
              initial={{ scale: 0.6, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              className="flex items-center gap-1.5 rounded-full bg-emerald-400/15 px-2.5 py-1 text-[11px] text-emerald-300"
            >
              <Check className="size-3" strokeWidth={3} /> Envoyé
            </motion.span>
          ) : (
            <span className="flex items-center gap-1.5 text-[11px] text-white/30">
              <Send className="size-3" /> En attente
            </span>
          )}
        </motion.div>
      ))}
      {n >= contacts.length && (
        <motion.p initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="mt-auto flex items-center gap-2 text-sm text-white">
          <UserPlus className="size-4 text-bleu-clair" /> 2 rendez-vous obtenus
        </motion.p>
      )}
    </div>
  );
}

const depart = ["concurrent-a.fr", "annuaire.fr", "blog-conseils.fr", "concurrent-b.fr", "votre-site.fr"];

export function SceneSEO() {
  const [ordre, setOrdre] = useState(depart);
  useEffect(() => {
    const minuteur = setInterval(() => {
      setOrdre((liste) => {
        const i = liste.indexOf("votre-site.fr");
        if (i === 0) {
          clearInterval(minuteur);
          return liste;
        }
        const copie = [...liste];
        [copie[i - 1], copie[i]] = [copie[i], copie[i - 1]];
        return copie;
      });
    }, 650);
    return () => clearInterval(minuteur);
  }, []);
  return (
    <div className="flex h-full flex-col gap-2.5 p-5">
      <div className="mb-1 flex items-center gap-3 rounded-full border border-white/10 bg-white/5 px-4 py-2 text-sm text-white/80">
        <Search className="size-4 text-white/40" /> création site internet paris
      </div>
      {ordre.map((site, i) => {
        const moi = site === "votre-site.fr";
        return (
          <motion.div
            key={site}
            layout
            transition={{ type: "spring", stiffness: 300, damping: 28 }}
            className={`flex items-center gap-3 rounded-xl border p-2.5 ${moi ? "border-bleu bg-bleu/15 shadow-lg shadow-bleu/20" : "border-white/5 bg-white/[0.02]"}`}
          >
            <span className={`font-titre w-6 text-center text-sm font-bold ${moi ? "text-bleu-clair" : "text-white/30"}`}>{i + 1}</span>
            <div className="flex-1">
              <p className={`text-[13px] ${moi ? "font-semibold text-white" : "text-white/60"}`}>{site}</p>
              <span className="mt-1 block h-1 w-2/3 rounded bg-white/10" />
            </div>
            {moi && i === 0 && (
              <motion.span initial={{ scale: 0 }} animate={{ scale: 1 }} className="rounded-full bg-bleu px-2 py-0.5 text-[10px] font-bold text-white">
                N°1
              </motion.span>
            )}
          </motion.div>
        );
      })}
    </div>
  );
}

const barres = [22, 30, 28, 45, 52, 61, 78, 96];

export function SceneCroissance() {
  return (
    <div className="flex h-full flex-col gap-4 p-5">
      <div className="flex items-end justify-between">
        <div>
          <p className="text-xs tracking-widest text-white/40">CHIFFRE D’AFFAIRES</p>
          <p className="font-titre mt-1 text-4xl font-black text-white">
            +<Compteur valeur={240} suffixe="%" />
          </p>
        </div>
        <span className="flex items-center gap-1.5 rounded-full bg-emerald-400/15 px-3 py-1 text-xs text-emerald-300">
          <TrendingUp className="size-3.5" /> en hausse
        </span>
      </div>
      <div className="flex flex-1 items-end gap-2">
        {barres.map((h, i) => (
          <motion.div
            key={i}
            className={`flex-1 rounded-t-md ${i === barres.length - 1 ? "bg-gradient-to-t from-bleu-fonce to-bleu-clair" : "bg-white/15"}`}
            initial={{ height: 0 }}
            animate={{ height: `${h}%` }}
            transition={{ delay: 0.1 + i * 0.09, duration: 0.7, ease: [0.22, 1, 0.36, 1] }}
          />
        ))}
      </div>
      <motion.div
        initial={{ opacity: 0, y: 10 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 1.6 }}
        className="flex items-center gap-2 self-start rounded-full bg-white px-3 py-1.5 text-xs font-semibold text-nuit"
      >
        <UserPlus className="size-3.5 text-bleu" /> Nouveau client !
      </motion.div>
    </div>
  );
}
