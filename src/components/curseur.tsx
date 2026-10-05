"use client";

import { motion, useMotionValue, useSpring } from "motion/react";
import { useEffect, useState } from "react";

// Petit rond bleu (contour seulement) qui remplace la flèche de la souris.
// Il grossit au-dessus des liens et boutons, et se resserre quand on clique.
export function Curseur() {
  const x = useMotionValue(-100);
  const y = useMotionValue(-100);
  const sx = useSpring(x, { stiffness: 600, damping: 40, mass: 0.35 });
  const sy = useSpring(y, { stiffness: 600, damping: 40, mass: 0.35 });
  const [actif, setActif] = useState(false);
  const [visible, setVisible] = useState(false);
  const [survol, setSurvol] = useState(false);
  const [appui, setAppui] = useState(false);

  useEffect(() => {
    if (!window.matchMedia("(pointer: fine)").matches) return;
    const html = document.documentElement;
    html.classList.add("curseur-perso");

    const bouger = (e: PointerEvent) => {
      x.set(e.clientX);
      y.set(e.clientY);
      setActif(true);
      setVisible(true);
      setSurvol(!!(e.target as Element | null)?.closest?.("a, button, [role=tab], input, label"));
    };
    const sortir = () => setVisible(false);
    const appuyer = () => setAppui(true);
    const relacher = () => setAppui(false);

    window.addEventListener("pointermove", bouger);
    document.addEventListener("pointerleave", sortir);
    window.addEventListener("pointerdown", appuyer);
    window.addEventListener("pointerup", relacher);
    return () => {
      html.classList.remove("curseur-perso");
      window.removeEventListener("pointermove", bouger);
      document.removeEventListener("pointerleave", sortir);
      window.removeEventListener("pointerdown", appuyer);
      window.removeEventListener("pointerup", relacher);
    };
  }, [x, y]);

  if (!actif) return null;

  return (
    <motion.div
      aria-hidden
      style={{ x: sx, y: sy, translateX: "-50%", translateY: "-50%" }}
      animate={{
        width: survol ? 54 : 26,
        height: survol ? 54 : 26,
        opacity: visible ? 1 : 0,
        scale: appui ? 0.75 : 1,
        borderWidth: survol ? 1.5 : 2,
      }}
      transition={{ type: "spring", stiffness: 400, damping: 28 }}
      className="pointer-events-none fixed top-0 left-0 z-[300] rounded-full border-bleu shadow-[0_0_12px_rgba(59,130,246,0.35)]"
    />
  );
}
