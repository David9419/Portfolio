"use client";

import { Moon, Sun } from "lucide-react";
import { AnimatePresence, motion } from "motion/react";
import { useTheme } from "next-themes";
import { useSyncExternalStore } from "react";

const rien = () => () => {};

// Bascule mode clair / mode sombre, avec une icône qui tourne.
export function BoutonTheme() {
  const { resolvedTheme, setTheme } = useTheme();
  const monte = useSyncExternalStore(rien, () => true, () => false);
  const sombre = monte && resolvedTheme === "dark";

  return (
    <button
      type="button"
      onClick={() => setTheme(sombre ? "light" : "dark")}
      aria-label={sombre ? "Passer en mode clair" : "Passer en mode sombre"}
      className="relative grid size-10 place-items-center overflow-hidden rounded-full border border-bordure bg-carte/60 text-texte backdrop-blur transition-colors hover:border-bleu hover:text-bleu"
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
