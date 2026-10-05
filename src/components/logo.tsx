"use client";

import { motion } from "motion/react";
import { useId } from "react";

// Monogramme « DB » : le D (couleur du texte) et le B (dégradé bleu) s'entrelacent,
// traversés par une coupe bleue en diagonale, comme sur la charte.
export function Logo({ className = "h-8 w-auto", anime = false }: { className?: string; anime?: boolean }) {
  const id = useId().replace(/:/g, "");
  const dessin = anime
    ? { initial: { pathLength: 0, fillOpacity: 0 }, animate: { pathLength: 1, fillOpacity: 1 } }
    : {};

  return (
    <svg viewBox="0 0 96 60" className={className} aria-label="Logo David Baron" role="img">
      <defs>
        <linearGradient id={`b-${id}`} x1="0" y1="0" x2="1" y2="1">
          <stop offset="0%" stopColor="#60A5FA" />
          <stop offset="55%" stopColor="#3B82F6" />
          <stop offset="100%" stopColor="#1D4ED8" />
        </linearGradient>
        <linearGradient id={`d-${id}`} x1="0" y1="0" x2="1" y2="1">
          <stop offset="0%" stopColor="currentColor" />
          <stop offset="100%" stopColor="currentColor" stopOpacity="0.85" />
        </linearGradient>
      </defs>
      <motion.path
        d="M0 0H18A28 30 0 0 1 18 60H0ZM12 12V48H18A16 18 0 0 0 18 12Z"
        fillRule="evenodd"
        fill={`url(#d-${id})`}
        stroke="currentColor"
        strokeWidth={anime ? 0.8 : 0}
        {...dessin}
        transition={{ duration: 1.2, ease: "easeInOut" }}
      />
      <motion.path
        d="M44 0H72Q88 0 88 15Q88 24 81 28Q94 32 94 44Q94 60 76 60H44V48H75Q81 48 81 42Q81 36 75 36H56V24H72Q76 24 76 18Q76 12 72 12H44Z"
        fill={`url(#b-${id})`}
        stroke="#3B82F6"
        strokeWidth={anime ? 0.8 : 0}
        {...dessin}
        transition={{ duration: 1.2, ease: "easeInOut", delay: 0.25 }}
      />
      <motion.path
        d="M2 58L40 26L46 30L10 60Z"
        fill="#3B82F6"
        initial={anime ? { opacity: 0, x: -10 } : false}
        animate={anime ? { opacity: 1, x: 0 } : undefined}
        transition={{ duration: 0.6, delay: 0.9 }}
      />
    </svg>
  );
}
