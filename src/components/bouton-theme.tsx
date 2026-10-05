"use client";

import { Moon, Sun } from "lucide-react";
import { AnimatePresence, motion } from "motion/react";
import { useTheme } from "next-themes";
import { useRef, useSyncExternalStore } from "react";
import { flushSync } from "react-dom";

const rien = () => () => {};

type DocumentAvecTransition = Document & {
  startViewTransition?: (rappel: () => void) => { ready: Promise<void>; finished: Promise<void> };
};

// Bascule mode clair / mode sombre : l'ancien thème se referme en cercle
// jusqu'à disparaître dans le bouton, et laisse apparaître le nouveau dessous.
export function BoutonTheme({ className = "" }: { className?: string }) {
  const { resolvedTheme, setTheme } = useTheme();
  const monte = useSyncExternalStore(rien, () => true, () => false);
  const sombre = monte && resolvedTheme === "dark";
  const ref = useRef<HTMLButtonElement>(null);

  const basculer = () => {
    const nouveau = sombre ? "light" : "dark";
    const doc = document as DocumentAvecTransition;
    const html = document.documentElement;
    const reduit = window.matchMedia("(prefers-reduced-motion: reduce)").matches;

    if (!doc.startViewTransition || reduit || !ref.current) {
      setTheme(nouveau);
      return;
    }

    const r = ref.current.getBoundingClientRect();
    const cx = r.left + r.width / 2;
    const cy = r.top + r.height / 2;
    const rayon = Math.hypot(Math.max(cx, innerWidth - cx), Math.max(cy, innerHeight - cy));
    html.classList.add("vt");

    const transition = doc.startViewTransition(() => {
      html.classList.toggle("dark", nouveau === "dark");
      html.classList.toggle("light", nouveau === "light");
      html.style.colorScheme = nouveau;
      flushSync(() => setTheme(nouveau));
    });

    transition.ready.then(() => {
      html.animate(
        { clipPath: [`circle(${rayon}px at ${cx}px ${cy}px)`, `circle(0px at ${cx}px ${cy}px)`] },
        { duration: 900, easing: "cubic-bezier(0.65, 0, 0.35, 1)", pseudoElement: "::view-transition-old(root)", fill: "forwards" },
      );
    });
    transition.finished.finally(() => html.classList.remove("vt"));
  };

  return (
    <button
      ref={ref}
      type="button"
      onClick={basculer}
      aria-label={sombre ? "Passer en mode clair" : "Passer en mode sombre"}
      className={`relative grid size-10 place-items-center overflow-hidden rounded-full border border-bordure bg-fond/60 text-texte transition-colors hover:border-bleu hover:text-bleu ${className}`}
    >
      <AnimatePresence mode="wait" initial={false}>
        <motion.span
          key={sombre ? "lune" : "soleil"}
          initial={{ y: 20, rotate: -90, opacity: 0 }}
          animate={{ y: 0, rotate: 0, opacity: 1 }}
          exit={{ y: -20, rotate: 90, opacity: 0 }}
          transition={{ duration: 0.3 }}
        >
          {sombre ? <Moon className="size-4" /> : <Sun className="size-4" />}
        </motion.span>
      </AnimatePresence>
    </button>
  );
}
