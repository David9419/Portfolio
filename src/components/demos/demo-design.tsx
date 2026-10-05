"use client";

import { Check, Film, Music, Type } from "lucide-react";
import { motion } from "motion/react";
import { Logo } from "@/components/logo";
import { useSequence } from "./outils-demo";

export function SceneLogo() {
  return (
    <div className="relative grid h-full place-items-center overflow-hidden">
      <div className="grille absolute inset-0 opacity-40" aria-hidden />
      {/* Repères de construction */}
      <motion.div
        className="absolute inset-x-10 top-1/2 h-px bg-bleu/40"
        initial={{ scaleX: 0 }}
        animate={{ scaleX: 1 }}
        transition={{ duration: 0.8 }}
      />
      <motion.div
        className="absolute inset-y-10 left-1/2 w-px bg-bleu/40"
        initial={{ scaleY: 0 }}
        animate={{ scaleY: 1 }}
        transition={{ duration: 0.8, delay: 0.15 }}
      />
      <motion.div
        className="absolute size-56 rounded-full border border-dashed border-white/15"
        initial={{ scale: 0, rotate: -90 }}
        animate={{ scale: 1, rotate: 0 }}
        transition={{ duration: 1, delay: 0.2 }}
      />
      <div className="relative">
        <Logo className="h-28 w-auto text-white" anime />
        {[
          [-10, -10],
          [150, -10],
          [-10, 95],
          [150, 95],
        ].map(([x, y], i) => (
          <motion.span
            key={i}
            className="absolute size-2.5 border border-bleu-clair bg-nuit"
            style={{ left: x, top: y }}
            initial={{ scale: 0 }}
            animate={{ scale: 1 }}
            transition={{ delay: 1.2 + i * 0.08 }}
          />
        ))}
      </div>
      <motion.p
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 1.8 }}
        className="absolute bottom-4 left-4 font-mono text-[11px] text-white/40"
      >
        logo.svg · vectoriel
      </motion.p>
    </div>
  );
}

const palette = [
  { hex: "#3B82F6", nom: "Bleu principal" },
  { hex: "#0B1220", nom: "Bleu nuit" },
  { hex: "#E5E7EB", nom: "Gris clair" },
  { hex: "#FFFFFF", nom: "Blanc" },
];

export function SceneCouleurs() {
  return (
    <div className="flex h-full flex-col justify-center gap-6 p-6">
      <div className="grid grid-cols-4 gap-3">
        {palette.map((p, i) => (
          <motion.div
            key={p.hex}
            initial={{ y: -60, opacity: 0, rotate: -8 }}
            animate={{ y: 0, opacity: 1, rotate: 0 }}
            transition={{ type: "spring", stiffness: 220, damping: 14, delay: 0.2 + i * 0.15 }}
          >
            <div className="aspect-square rounded-2xl border border-white/10 shadow-xl" style={{ background: p.hex }} />
            <p className="mt-2 font-mono text-[11px] text-white/80">{p.hex}</p>
            <p className="text-[10px] text-white/40">{p.nom}</p>
          </motion.div>
        ))}
      </div>
      <motion.div
        className="h-10 rounded-xl bg-gradient-to-r from-[#0B1220] via-[#3B82F6] to-[#93C5FD]"
        initial={{ clipPath: "inset(0 100% 0 0 round 12px)" }}
        animate={{ clipPath: "inset(0 0% 0 0 round 12px)" }}
        transition={{ delay: 1.1, duration: 1, ease: [0.65, 0, 0.35, 1] }}
      />
      <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 1.8 }} className="flex items-baseline gap-4 text-white">
        <span className="font-titre text-4xl font-black">Aa</span>
        <span className="text-xs text-white/50">Montserrat · Inter</span>
      </motion.div>
    </div>
  );
}

export function SceneAffiche() {
  const n = useSequence(1, 2600, 0);
  return (
    <div className="relative grid h-full place-items-center p-5">
      <motion.div
        initial={{ scale: 0.9, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        className="relative aspect-[3/4] h-[85%] overflow-hidden rounded-lg bg-gradient-to-b from-[#0a1a3d] to-[#020617] shadow-2xl ring-1 ring-white/10"
      >
        <motion.div
          className="absolute -top-10 -right-10 size-40 rounded-full bg-bleu blur-2xl"
          initial={{ scale: 0 }}
          animate={{ scale: 1 }}
          transition={{ delay: 0.3, duration: 0.8 }}
        />
        <div className="absolute inset-x-4 top-1/3 space-y-1">
          {["SOIRÉE", "DE GALA"].map((m, i) => (
            <div key={m} className="overflow-hidden">
              <motion.p
                initial={{ y: "100%" }}
                animate={{ y: "0%" }}
                transition={{ delay: 0.6 + i * 0.15, duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
                className="font-titre text-2xl leading-none font-black text-white"
              >
                {m}
              </motion.p>
            </div>
          ))}
          <motion.div
            initial={{ scaleX: 0 }}
            animate={{ scaleX: 1 }}
            transition={{ delay: 1.1 }}
            className="h-0.5 w-12 origin-left bg-bleu"
          />
        </div>
        <motion.div
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 1.4 }}
          className="absolute inset-x-4 bottom-4 flex items-end justify-between text-white"
        >
          <span className="font-titre text-3xl font-black">12.11</span>
          <span className="text-[9px] tracking-widest text-white/60">PARIS · 20H</span>
        </motion.div>
      </motion.div>
      {n >= 1 && (
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="absolute right-5 bottom-5 flex items-center gap-2 rounded-full bg-white px-3 py-1.5 text-xs font-semibold text-nuit shadow-xl"
        >
          <Check className="size-3.5 text-emerald-500" strokeWidth={3} /> Affiche exportée
        </motion.div>
      )}
    </div>
  );
}

export function SceneVideo() {
  const pistes = [
    { Icone: Film, couleur: "bg-bleu", clips: [[0, 38], [40, 72], [74, 100]] },
    { Icone: Type, couleur: "bg-violet-400", clips: [[10, 30], [55, 80]] },
    { Icone: Music, couleur: "bg-emerald-400", clips: [[0, 100]] },
  ];
  return (
    <div className="flex h-full flex-col gap-4 p-5">
      <div className="relative flex-1 overflow-hidden rounded-xl">
        <motion.div
          className="absolute inset-0"
          animate={{ background: ["linear-gradient(120deg,#1d4ed8,#0b1220)", "linear-gradient(200deg,#7c3aed,#0b1220)", "linear-gradient(300deg,#059669,#0b1220)"] }}
          transition={{ duration: 3.6, ease: "linear" }}
        />
        <motion.p
          className="font-titre absolute bottom-4 left-4 text-xl font-black text-white"
          animate={{ opacity: [0, 1, 1, 0] }}
          transition={{ duration: 3.6, times: [0, 0.15, 0.8, 1] }}
        >
          Nouveau clip ✦
        </motion.p>
        <span className="absolute top-3 left-3 flex items-center gap-1.5 rounded bg-red-500 px-2 py-0.5 text-[10px] font-bold text-white">
          ● REC
        </span>
      </div>
      <div className="relative space-y-1.5 rounded-xl bg-white/5 p-3">
        {pistes.map(({ Icone, couleur, clips }, i) => (
          <div key={i} className="flex items-center gap-2">
            <Icone className="size-3.5 shrink-0 text-white/40" />
            <div className="relative h-5 flex-1">
              {clips.map(([a, b], k) => (
                <motion.span
                  key={k}
                  className={`absolute inset-y-0 rounded ${couleur} opacity-80`}
                  style={{ left: `${a}%`, width: `${b - a}%` }}
                  initial={{ scaleX: 0 }}
                  animate={{ scaleX: 1 }}
                  transition={{ delay: 0.1 * (i + k) }}
                />
              ))}
            </div>
          </div>
        ))}
        <motion.span
          className="absolute top-1 bottom-1 w-0.5 bg-white shadow-[0_0_8px_white]"
          initial={{ left: "9%" }}
          animate={{ left: "97%" }}
          transition={{ duration: 3.6, ease: "linear" }}
        />
      </div>
    </div>
  );
}
