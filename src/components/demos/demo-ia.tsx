"use client";

import { Bot, Check, Clock, FileText, Mail, Sparkles, Users } from "lucide-react";
import { motion } from "motion/react";
import { Compteur } from "@/components/animations";
import { Curseur, useFrappe, useSequence } from "./outils-demo";

const demande = "Crée la page d’accueil d’une boulangerie, chaleureuse et moderne.";

export function ScenePrompt() {
  const n = useFrappe(demande.length, 30, 300);
  const fini = n >= demande.length;
  return (
    <div className="flex h-full flex-col justify-end gap-3 p-5">
      <div className="flex items-center gap-2 text-xs text-white/40">
        <Sparkles className="size-3.5 text-bleu-clair" /> Assistant IA
      </div>
      <motion.div
        initial={{ opacity: 0, y: 10 }}
        animate={{ opacity: 1, y: 0 }}
        className="max-w-[85%] self-end rounded-2xl rounded-ee-sm bg-bleu px-4 py-3 text-sm text-white"
      >
        {demande.slice(0, n)}
        {!fini && <Curseur />}
      </motion.div>
      {fini && (
        <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="flex items-center gap-2 self-start rounded-2xl bg-white/5 px-4 py-3">
          {[0, 1, 2].map((i) => (
            <motion.span
              key={i}
              className="size-1.5 rounded-full bg-white/60"
              animate={{ y: [0, -4, 0] }}
              transition={{ duration: 0.6, repeat: Infinity, delay: i * 0.15 }}
            />
          ))}
        </motion.div>
      )}
      <div className="flex items-center gap-2 rounded-xl border border-white/10 bg-white/5 px-4 py-2.5 text-xs text-white/30">
        Écrire un message…
      </div>
    </div>
  );
}

const reponse = "Voici une proposition : un en-tête chaleureux, vos spécialités en vitrine et un bouton pour commander.";

export function SceneReponse() {
  const n = useFrappe(reponse.length, 18, 200);
  const fini = n >= reponse.length;
  return (
    <div className="flex h-full flex-col gap-3 p-5">
      <div className="flex items-start gap-3">
        <span className="grid size-8 shrink-0 place-items-center rounded-full bg-gradient-to-br from-bleu-clair to-bleu-fonce text-white">
          <Bot className="size-4" />
        </span>
        <p className="rounded-2xl rounded-ss-sm bg-white/5 px-4 py-3 text-sm text-white/90">
          {reponse.slice(0, n)}
          {!fini && <Curseur />}
        </p>
      </div>
      {fini && (
        <motion.div
          initial={{ opacity: 0, y: 16, scale: 0.97 }}
          animate={{ opacity: 1, y: 0, scale: 1 }}
          className="ms-11 flex-1 overflow-hidden rounded-xl border border-white/10 bg-[#fdf6ec] p-3"
        >
          <div className="flex items-center justify-between">
            <span className="font-signature text-2xl text-amber-800">Le Fournil</span>
            <span className="h-2 w-16 rounded bg-amber-900/20" />
          </div>
          <div className="mt-2 grid grid-cols-3 gap-2">
            {["from-amber-200 to-amber-500", "from-orange-200 to-orange-400", "from-yellow-100 to-amber-300"].map((t, i) => (
              <motion.div
                key={t}
                initial={{ opacity: 0, y: 8 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.2 + i * 0.12 }}
                className={`aspect-square rounded-lg bg-gradient-to-br ${t}`}
              />
            ))}
          </div>
          <motion.span
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.7 }}
            className="mt-2 inline-block rounded-full bg-amber-800 px-3 py-1 text-[10px] font-semibold text-white"
          >
            Commander
          </motion.span>
        </motion.div>
      )}
    </div>
  );
}

const noeuds = [
  { Icone: FileText, nom: "Formulaire" },
  { Icone: Bot, nom: "IA" },
  { Icone: Users, nom: "CRM" },
  { Icone: Mail, nom: "E-mail" },
];

export function SceneAutomatisation() {
  const n = useSequence(noeuds.length, 700, 200);
  return (
    <div className="flex h-full flex-col items-center justify-center gap-8 p-5">
      <div className="flex w-full items-center justify-between">
        {noeuds.map(({ Icone, nom }, i) => (
          <div key={nom} className="contents">
            <div className="flex flex-col items-center gap-2">
              <motion.span
                animate={i < n ? { backgroundColor: "#3b82f6", scale: [1, 1.15, 1], boxShadow: "0 0 30px rgba(59,130,246,0.6)" } : {}}
                transition={{ duration: 0.4 }}
                className="grid size-12 place-items-center rounded-2xl border border-white/10 bg-white/5 text-white md:size-14"
              >
                <Icone className="size-5" />
              </motion.span>
              <span className="text-[11px] text-white/60">{nom}</span>
            </div>
            {i < noeuds.length - 1 && (
              <div className="relative mx-1 -mt-6 h-px flex-1 bg-white/15">
                {i < n - 1 && (
                  <motion.span
                    className="absolute -top-[3px] size-[7px] rounded-full bg-bleu-clair shadow-[0_0_10px_#60a5fa]"
                    initial={{ left: "0%" }}
                    animate={{ left: "100%" }}
                    transition={{ duration: 0.6, repeat: Infinity, repeatDelay: 0.3 }}
                  />
                )}
              </div>
            )}
          </div>
        ))}
      </div>
      <motion.p
        initial={{ opacity: 0 }}
        animate={{ opacity: n >= noeuds.length ? 1 : 0 }}
        className="rounded-full bg-white/5 px-4 py-2 font-mono text-[11px] text-emerald-300"
      >
        ✓ Automatisation active · 24 h/24
      </motion.p>
    </div>
  );
}

const taches = ["Répondre aux demandes", "Ajouter les clients au CRM", "Envoyer les devis", "Relancer les prospects"];

export function SceneResultat() {
  const n = useSequence(taches.length, 450, 300);
  return (
    <div className="grid h-full gap-4 p-5 md:grid-cols-[1.2fr_1fr]">
      <div className="space-y-2.5">
        {taches.map((t, i) => (
          <div key={t} className="flex items-center gap-3 rounded-xl border border-white/10 bg-white/[0.03] p-3 text-sm">
            <motion.span
              animate={i < n ? { backgroundColor: "#34d399", borderColor: "#34d399" } : {}}
              className="grid size-5 place-items-center rounded-md border border-white/30"
            >
              {i < n && <Check className="size-3 text-nuit" strokeWidth={3} />}
            </motion.span>
            <span className={i < n ? "text-white/50 line-through" : "text-white"}>{t}</span>
          </div>
        ))}
      </div>
      <div className="flex flex-col items-center justify-center rounded-2xl bg-gradient-to-br from-bleu/30 to-transparent p-4 text-center">
        <Clock className="size-6 text-bleu-clair" />
        <p className="font-titre mt-2 text-5xl font-black text-white">
          <Compteur valeur={10} suffixe=" h" />
        </p>
        <p className="mt-1 text-xs text-white/60">gagnées chaque semaine</p>
      </div>
    </div>
  );
}
