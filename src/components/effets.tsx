"use client";

import { AnimatePresence, motion, useScroll, useSpring } from "motion/react";
import { useEffect, useRef, useState } from "react";
import { Logo } from "@/components/logo";

// Écran d'ouverture : le logo se dessine, puis le rideau se lève.
export function Chargement() {
  const [visible, setVisible] = useState(true);

  useEffect(() => {
    const minuteur = setTimeout(() => setVisible(false), 2100);
    return () => clearTimeout(minuteur);
  }, []);

  return (
    <AnimatePresence>
      {visible && (
        <motion.div
          className="fixed inset-0 z-[100] grid place-items-center bg-nuit text-white"
          exit={{ y: "-100%" }}
          transition={{ duration: 0.9, ease: [0.76, 0, 0.24, 1] }}
        >
          <div className="flex flex-col items-center gap-6">
            <Logo className="h-20 w-auto text-white" anime />
            <motion.p
              initial={{ opacity: 0, letterSpacing: "0.1em" }}
              animate={{ opacity: 1, letterSpacing: "0.5em" }}
              transition={{ delay: 0.8, duration: 1 }}
              className="font-titre text-sm font-semibold"
            >
              DAVID <span className="text-bleu">BARON</span>
            </motion.p>
            <div className="h-px w-40 overflow-hidden bg-white/10">
              <motion.div
                className="h-full bg-bleu"
                initial={{ x: "-100%" }}
                animate={{ x: "0%" }}
                transition={{ duration: 1.8, ease: "easeInOut" }}
              />
            </div>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}

// Fine barre bleue en haut de l'écran qui montre l'avancement de la lecture.
export function BarreProgression() {
  const { scrollYProgress } = useScroll();
  const echelle = useSpring(scrollYProgress, { stiffness: 120, damping: 25 });
  return (
    <motion.div
      style={{ scaleX: echelle }}
      className="fixed inset-x-0 top-0 z-[80] h-[3px] origin-left bg-gradient-to-r from-bleu-clair via-bleu to-bleu-fonce"
    />
  );
}

// Halo bleu qui suit la souris (ordinateur uniquement).
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
