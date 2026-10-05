"use client";

import { Menu, X } from "lucide-react";
import { AnimatePresence, motion, useMotionValueEvent, useScroll } from "motion/react";
import { useEffect, useState } from "react";
import { BoutonTheme } from "@/components/bouton-theme";
import { Logo } from "@/components/logo";
import { identite, navigation } from "@/lib/contenu";

export function Navigation() {
  const { scrollY } = useScroll();
  const [defile, setDefile] = useState(false);
  const [cache, setCache] = useState(false);
  const [ouvert, setOuvert] = useState(false);
  const [active, setActive] = useState("");

  // Barre plus compacte quand on descend, et qui se cache quand on défile vers le bas.
  useMotionValueEvent(scrollY, "change", (y) => {
    const avant = scrollY.getPrevious() ?? 0;
    setDefile(y > 30);
    setCache(y > avant && y > 400 && !ouvert);
  });

  // Souligne la section en cours de lecture.
  useEffect(() => {
    const observateur = new IntersectionObserver(
      (entrees) => {
        for (const e of entrees) if (e.isIntersecting) setActive(e.target.id);
      },
      { rootMargin: "-45% 0px -50% 0px" },
    );
    for (const lien of navigation) {
      const el = document.getElementById(lien.id);
      if (el) observateur.observe(el);
    }
    return () => observateur.disconnect();
  }, []);

  return (
    <>
      <motion.header
        animate={{ y: cache ? -100 : 0 }}
        transition={{ duration: 0.35, ease: "easeOut" }}
        className="fixed inset-x-0 top-0 z-50 px-4 pt-4"
      >
        <nav
          className={`mx-auto flex max-w-6xl items-center justify-between rounded-full px-4 py-2.5 transition-all duration-500 md:px-6 ${
            defile ? "border border-bordure bg-fond/70 shadow-lg shadow-black/5 backdrop-blur-xl" : "border border-transparent"
          }`}
        >
          <a href="#accueil" className="flex items-center gap-3" aria-label="Retour en haut">
            <Logo className="h-7 w-auto text-texte" />
            <span className="font-titre hidden text-sm font-bold tracking-[0.3em] sm:inline">
              {identite.prenom.toUpperCase()} <span className="text-bleu">{identite.nom.toUpperCase()}</span>
            </span>
          </a>

          <ul className="hidden items-center gap-1 md:flex">
            {navigation.map((lien) => (
              <li key={lien.id}>
                <a
                  href={`#${lien.id}`}
                  className={`relative rounded-full px-4 py-2 text-sm font-medium transition-colors ${
                    active === lien.id ? "text-texte" : "text-doux hover:text-texte"
                  }`}
                >
                  {active === lien.id && (
                    <motion.span
                      layoutId="lien-actif"
                      className="absolute inset-0 -z-10 rounded-full bg-bleu/12 ring-1 ring-bleu/30"
                      transition={{ type: "spring", stiffness: 380, damping: 30 }}
                    />
                  )}
                  {lien.libelle}
                </a>
              </li>
            ))}
          </ul>

          <div className="flex items-center gap-2">
            <BoutonTheme />
            <a
              href="#contact"
              className="hidden rounded-full bg-bleu px-5 py-2.5 text-sm font-semibold text-white shadow-lg shadow-bleu/30 transition-transform hover:scale-105 lg:inline-block"
            >
              Travaillons ensemble
            </a>
            <button
              type="button"
              onClick={() => setOuvert(true)}
              className="grid size-10 place-items-center rounded-full border border-bordure md:hidden"
              aria-label="Ouvrir le menu"
            >
              <Menu className="size-4" />
            </button>
          </div>
        </nav>
      </motion.header>

      {/* Menu plein écran sur téléphone */}
      <AnimatePresence>
        {ouvert && (
          <motion.div
            initial={{ clipPath: "circle(0% at 95% 5%)" }}
            animate={{ clipPath: "circle(150% at 95% 5%)" }}
            exit={{ clipPath: "circle(0% at 95% 5%)" }}
            transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
            className="fixed inset-0 z-[70] flex flex-col bg-nuit px-6 pt-6 text-white"
          >
            <div className="flex items-center justify-between">
              <Logo className="h-7 w-auto text-white" />
              <button
                type="button"
                onClick={() => setOuvert(false)}
                className="grid size-10 place-items-center rounded-full border border-white/15"
                aria-label="Fermer le menu"
              >
                <X className="size-4" />
              </button>
            </div>
            <ul className="mt-16 space-y-2">
              {navigation.map((lien, i) => (
                <motion.li
                  key={lien.id}
                  initial={{ opacity: 0, x: 40 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: 0.2 + i * 0.07 }}
                >
                  <a
                    href={`#${lien.id}`}
                    onClick={() => setOuvert(false)}
                    className="font-titre flex items-baseline gap-4 py-2 text-4xl font-extrabold"
                  >
                    <span className="text-sm font-medium text-bleu">0{i + 1}</span>
                    {lien.libelle}
                  </a>
                </motion.li>
              ))}
            </ul>
            <p className="font-signature mt-auto mb-10 text-5xl text-bleu-clair">David Baron</p>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
