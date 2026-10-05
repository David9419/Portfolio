"use client";

import { animate, AnimatePresence, motion } from "motion/react";
import { useEffect, useRef, useState } from "react";
import { Logo } from "@/components/logo";

const rideau = [0.76, 0, 0.24, 1] as const;

// Écran d'arrivée : le logo se dessine, un compteur monte jusqu'à 100,
// puis deux rideaux (bleu nuit et bleu) se lèvent pour révéler le site.
export function Chargement() {
  const [visible, setVisible] = useState(true);
  const compteur = useRef<HTMLSpanElement>(null);

  useEffect(() => {
    const controle = animate(0, 100, {
      duration: 2,
      ease: [0.65, 0, 0.35, 1],
      onUpdate: (v) => {
        if (compteur.current) compteur.current.textContent = String(Math.round(v)).padStart(3, "0");
      },
      onComplete: () => setVisible(false),
    });
    return () => controle.stop();
  }, []);

  return (
    <AnimatePresence>
      {visible && (
        <motion.div
          className="fixed inset-0 z-[150]"
          exit="sortie"
          variants={{ sortie: { transition: { when: "afterChildren" } } }}
        >
          <motion.div
            className="absolute inset-0 bg-bleu"
            variants={{ sortie: { clipPath: "inset(0 0 100% 0)", transition: { duration: 1, ease: rideau, delay: 0.12 } } }}
            style={{ clipPath: "inset(0 0 0% 0)" }}
          />
          <motion.div
            className="absolute inset-0 grid place-items-center overflow-hidden bg-nuit text-white"
            variants={{ sortie: { clipPath: "inset(0 0 100% 0)", transition: { duration: 0.9, ease: rideau } } }}
            style={{ clipPath: "inset(0 0 0% 0)" }}
          >
            <div className="absolute size-[480px] rounded-full bg-bleu/25 blur-[120px]" aria-hidden />
            <motion.div
              className="relative flex flex-col items-center gap-7"
              variants={{ sortie: { y: -60, opacity: 0, transition: { duration: 0.5, ease: rideau } } }}
            >
              <Logo className="h-20 w-auto text-white" anime />
              <div className="overflow-hidden">
                <motion.p
                  initial={{ y: "100%" }}
                  animate={{ y: "0%" }}
                  transition={{ delay: 0.6, duration: 0.8, ease: [0.22, 1, 0.36, 1] }}
                  className="font-titre text-sm font-semibold tracking-[0.5em]"
                >
                  DAVID <span className="text-bleu">BARON</span>
                </motion.p>
              </div>
              <div className="h-px w-48 overflow-hidden bg-white/10">
                <motion.div
                  className="h-full bg-gradient-to-r from-bleu-clair to-bleu"
                  initial={{ scaleX: 0 }}
                  animate={{ scaleX: 1 }}
                  style={{ originX: 0 }}
                  transition={{ duration: 2, ease: [0.65, 0, 0.35, 1] }}
                />
              </div>
            </motion.div>
            <p className="font-titre absolute right-6 bottom-6 text-6xl font-black text-white/10 tabular-nums md:right-10 md:bottom-8 md:text-8xl">
              <span ref={compteur}>000</span>
            </p>
            <p className="font-titre absolute bottom-8 left-6 text-[10px] tracking-[0.4em] text-white/40 md:left-10 md:bottom-10">
              IDÉES / CRÉATIONS / PROJETS
            </p>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}

// Halo bleu très doux qui suit la souris (ordinateur uniquement).
export function HaloSouris() {
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const el = ref.current;
    if (!el || !window.matchMedia("(pointer: fine)").matches) return;
    let image = 0;
    const bouger = (e: PointerEvent) => {
      cancelAnimationFrame(image);
      image = requestAnimationFrame(() => {
        el.style.opacity = "1";
        el.style.transform = `translate(${e.clientX - 300}px, ${e.clientY - 300}px)`;
      });
    };
    window.addEventListener("pointermove", bouger);
    return () => window.removeEventListener("pointermove", bouger);
  }, []);

  return (
    <div
      ref={ref}
      aria-hidden
      className="pointer-events-none fixed top-0 left-0 z-0 size-[600px] rounded-full opacity-0 transition-opacity duration-700"
      style={{ background: "radial-gradient(circle, var(--halo) 0%, transparent 60%)" }}
    />
  );
}
