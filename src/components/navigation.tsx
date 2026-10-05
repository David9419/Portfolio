"use client";

import { ArrowUpRight } from "lucide-react";
import { useLenis } from "lenis/react";
import { AnimatePresence, motion, useMotionValueEvent, useScroll, useSpring } from "motion/react";
import { useEffect, useState } from "react";
import { BoutonTheme } from "@/components/bouton-theme";
import { courbeTrajet } from "@/components/fournisseur-theme";
import { IconeInstagram, IconeLinkedin } from "@/components/icones";
import { Logo } from "@/components/logo";
import { identite, navigation } from "@/lib/contenu";

const douceur = [0.22, 1, 0.36, 1] as const;

export function Navigation() {
  const { scrollY, scrollYProgress } = useScroll();
  const progression = useSpring(scrollYProgress, { stiffness: 120, damping: 25 });
  const lenis = useLenis();
  const [compact, setCompact] = useState(false);
  const [ouvert, setOuvert] = useState(false);
  const [active, setActive] = useState("");
  const [survole, setSurvole] = useState<string | null>(null);

  // La barre devient plus petite dès qu'on commence à descendre.
  useMotionValueEvent(scrollY, "change", (y) => setCompact(y > 60));

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

  // Bloque le défilement de la page quand le menu est ouvert.
  useEffect(() => {
    if (ouvert) lenis?.stop();
    else lenis?.start();
  }, [ouvert, lenis]);

  const allerA = (id: string) => (e: React.MouseEvent) => {
    e.preventDefault();
    setOuvert(false);
    lenis?.start();
    lenis?.scrollTo(`#${id}`, { offset: -90, duration: 1.6, easing: courbeTrajet });
  };

  return (
    <>
      <header className="fixed inset-x-0 top-0 z-[90] flex justify-center px-3">
        <motion.nav
          initial={{ y: -100, opacity: 0 }}
          animate={{
            y: 0,
            opacity: 1,
            maxWidth: compact ? 920 : 1200,
            marginTop: compact ? 10 : 18,
            paddingTop: compact ? 7 : 11,
            paddingBottom: compact ? 7 : 11,
          }}
          transition={{
            y: { delay: 2.5, duration: 0.9, ease: douceur },
            opacity: { delay: 2.5, duration: 0.9 },
            default: { type: "spring", stiffness: 260, damping: 32 },
          }}
          className={`relative flex w-full items-center justify-between overflow-hidden rounded-[1.4rem] border px-3 shadow-[inset_0_1px_0_rgba(255,255,255,0.06)] backdrop-blur-xl transition-colors duration-500 md:px-4 ${
            ouvert
              ? "border-white/10 bg-white/5 text-white"
              : "border-bordure bg-carte/85 shadow-black/10 " + (compact ? "shadow-2xl" : "shadow-lg")
          }`}
        >
          <a href="#accueil" className="flex items-center gap-3 ps-1" aria-label="Retour en haut" onClick={allerA("accueil")}>
            <motion.span animate={{ scale: compact ? 0.86 : 1 }} className="origin-left">
              <Logo className={`h-7 w-auto ${ouvert ? "text-white" : "text-texte"}`} />
            </motion.span>
            <motion.span
              animate={{ opacity: compact ? 0 : 1, width: compact ? 0 : "auto", x: compact ? -10 : 0 }}
              transition={{ duration: 0.4, ease: douceur }}
              className="font-titre hidden overflow-hidden text-sm font-bold tracking-[0.3em] whitespace-nowrap sm:inline"
            >
              {identite.prenom.toUpperCase()} <span className="text-bleu">{identite.nom.toUpperCase()}</span>
            </motion.span>
          </a>

          <ul className="hidden items-center gap-0.5 md:flex" onMouseLeave={() => setSurvole(null)}>
            {navigation.map((lien) => (
              <li key={lien.id}>
                <a
                  href={`#${lien.id}`}
                  onClick={allerA(lien.id)}
                  onMouseEnter={() => setSurvole(lien.id)}
                  className={`relative block rounded-full px-3.5 py-2 text-sm font-medium transition-colors lg:px-4 ${
                    active === lien.id ? "text-texte" : "text-doux hover:text-texte"
                  }`}
                >
                  {survole === lien.id && (
                    <motion.span
                      layoutId="lien-survol"
                      className="absolute inset-0 -z-10 rounded-full bg-texte/[0.06]"
                      transition={{ type: "spring", stiffness: 400, damping: 32 }}
                    />
                  )}
                  {lien.libelle}
                  {active === lien.id && (
                    <motion.span
                      layoutId="lien-actif"
                      className="absolute inset-x-3 -bottom-px h-0.5 rounded-full bg-bleu shadow-[0_0_10px_#3b82f6]"
                      transition={{ type: "spring", stiffness: 380, damping: 30 }}
                    />
                  )}
                </a>
              </li>
            ))}
          </ul>

          <div className="flex items-center gap-2">
            <BoutonTheme />
            <a
              href="#contact"
              onClick={allerA("contact")}
              className="group hidden items-center gap-1.5 overflow-hidden rounded-full bg-bleu px-5 py-2.5 text-sm font-semibold text-white shadow-lg shadow-bleu/30 transition-transform hover:scale-[1.04] lg:inline-flex"
            >
              Me contacter
              <ArrowUpRight className="size-4 transition-transform group-hover:rotate-45" />
            </a>
            <BoutonBurger ouvert={ouvert} onClick={() => setOuvert((o) => !o)} />
          </div>

          {/* Fine barre d'avancement de la lecture, collée en bas de la barre */}
          <motion.span
            style={{ scaleX: progression }}
            className="absolute inset-x-0 bottom-0 h-[2px] origin-left bg-gradient-to-r from-bleu-clair via-bleu to-bleu-fonce"
          />
        </motion.nav>
      </header>

      <MenuMobile ouvert={ouvert} allerA={allerA} active={active} />
    </>
  );
}

// Particules : positions fixes (pas de hasard, pour que le rendu soit stable).
const particules = Array.from({ length: 14 }, (_, i) => ({
  gauche: (i * 37 + 11) % 100,
  taille: 2 + (i % 3),
  duree: 7 + (i % 5) * 1.6,
  delai: (i * 0.7) % 5,
}));

// Fond animé du menu : halos qui dérivent, grille, courbes lumineuses qui se dessinent,
// particules qui montent et grand logo en filigrane qui flotte.
function FondMenu() {
  return (
    <div className="pointer-events-none absolute inset-0 overflow-hidden" aria-hidden>
      <motion.div
        className="absolute -top-24 -right-24 size-96 rounded-full bg-bleu/35 blur-3xl"
        animate={{ x: [0, -60, 20, 0], y: [0, 50, 90, 0], scale: [1, 1.15, 0.9, 1] }}
        transition={{ duration: 14, repeat: Infinity, ease: "easeInOut" }}
      />
      <motion.div
        className="absolute -bottom-32 -left-24 size-96 rounded-full bg-bleu-fonce/40 blur-3xl"
        animate={{ x: [0, 70, -10, 0], y: [0, -60, -20, 0], scale: [1, 0.9, 1.2, 1] }}
        transition={{ duration: 16, repeat: Infinity, ease: "easeInOut" }}
      />
      <motion.div
        className="grille absolute inset-0"
        initial={{ opacity: 0 }}
        animate={{ opacity: 0.35 }}
        transition={{ delay: 0.4, duration: 1.2 }}
      />
      <svg className="absolute inset-0 h-full w-full" viewBox="0 0 400 800" preserveAspectRatio="none" fill="none">
        {[0, 1, 2, 3].map((i) => (
          <motion.path
            key={i}
            d={`M-20 ${620 - i * 70} C 120 ${520 - i * 60}, 260 ${760 - i * 50}, 420 ${380 - i * 80}`}
            stroke="#60A5FA"
            strokeOpacity={0.35 - i * 0.06}
            strokeWidth={1}
            initial={{ pathLength: 0 }}
            animate={{ pathLength: 1 }}
            transition={{ delay: 0.45 + i * 0.12, duration: 1.6, ease: "easeInOut" }}
          />
        ))}
        <motion.path
          d="M-20 560 C 120 460, 260 700, 420 320"
          stroke="#93C5FD"
          strokeWidth={2}
          strokeLinecap="round"
          strokeDasharray="40 760"
          animate={{ strokeDashoffset: [800, 0] }}
          transition={{ duration: 3.5, repeat: Infinity, ease: "linear", delay: 1.5 }}
        />
      </svg>
      {particules.map((p, i) => (
        <motion.span
          key={i}
          className="absolute bottom-0 rounded-full bg-bleu-clair"
          style={{ left: `${p.gauche}%`, width: p.taille, height: p.taille }}
          initial={{ y: 0, opacity: 0 }}
          animate={{ y: [0, -900], opacity: [0, 0.8, 0] }}
          transition={{ duration: p.duree, delay: p.delai, repeat: Infinity, ease: "linear" }}
        />
      ))}
      <motion.div
        className="absolute -right-10 bottom-24 text-white"
        initial={{ opacity: 0, scale: 0.8, rotate: -8 }}
        animate={{ opacity: 1, scale: 1, rotate: 0, y: [0, -14, 0] }}
        transition={{ opacity: { delay: 0.5, duration: 1 }, scale: { delay: 0.5, duration: 1 }, rotate: { delay: 0.5, duration: 1 }, y: { duration: 6, repeat: Infinity, ease: "easeInOut" } }}
      >
        <div className="opacity-[0.07]">
          <Logo className="h-56 w-auto" />
        </div>
      </motion.div>
    </div>
  );
}

// Bouton à deux traits qui se transforment en croix.
function BoutonBurger({ ouvert, onClick }: { ouvert: boolean; onClick: () => void }) {
  return (
    <button
      type="button"
      onClick={onClick}
      aria-label={ouvert ? "Fermer le menu" : "Ouvrir le menu"}
      aria-expanded={ouvert}
      className={`relative grid size-10 place-items-center rounded-full border transition-colors md:hidden ${
        ouvert ? "border-white/20 bg-bleu text-white" : "border-bordure"
      }`}
    >
      <motion.span
        animate={ouvert ? { rotate: 45, y: 0, width: 18 } : { rotate: 0, y: -4, width: 18 }}
        transition={{ type: "spring", stiffness: 300, damping: 20 }}
        className="absolute h-[1.5px] rounded-full bg-current"
      />
      <motion.span
        animate={ouvert ? { rotate: -45, y: 0, width: 18 } : { rotate: 0, y: 4, width: 12, x: 3 }}
        transition={{ type: "spring", stiffness: 300, damping: 20 }}
        className="absolute h-[1.5px] rounded-full bg-current"
      />
    </button>
  );
}

// Menu plein écran du téléphone : deux voiles (bleu puis bleu nuit) s'ouvrent en cercle
// depuis le bouton, puis les liens montent un par un derrière un masque.
function MenuMobile({
  ouvert,
  allerA,
  active,
}: {
  ouvert: boolean;
  allerA: (id: string) => (e: React.MouseEvent) => void;
  active: string;
}) {
  const cercle = (taille: string) => `circle(${taille} at calc(100% - 38px) 42px)`;
  return (
    <AnimatePresence>
      {ouvert && (
        <motion.div className="fixed inset-0 z-[80] md:hidden" initial="ferme" animate="ouvert" exit="ferme">
          <motion.div
            className="absolute inset-0 bg-bleu"
            variants={{ ferme: { clipPath: cercle("0px") }, ouvert: { clipPath: cercle("150%") } }}
            transition={{ duration: 0.8, ease: [0.76, 0, 0.24, 1] }}
          />
          <motion.div
            className="absolute inset-0 overflow-hidden bg-nuit text-white"
            variants={{ ferme: { clipPath: cercle("0px") }, ouvert: { clipPath: cercle("150%") } }}
            transition={{ duration: 0.8, ease: [0.76, 0, 0.24, 1], delay: 0.08 }}
          >
            <FondMenu />

            <nav className="relative flex h-full flex-col px-7 pt-32 pb-10">
              <motion.p
                variants={{ ferme: { opacity: 0 }, ouvert: { opacity: 1, transition: { delay: 0.5 } } }}
                className="font-titre mb-6 text-[10px] font-semibold tracking-[0.4em] text-white/40"
              >
                MENU
              </motion.p>
              <ul className="space-y-1">
                {navigation.map((lien, i) => (
                  <li key={lien.id} className="overflow-hidden">
                    <motion.a
                      href={`#${lien.id}`}
                      onClick={allerA(lien.id)}
                      variants={{
                        ferme: { y: "110%", rotate: 4, transition: { duration: 0.3 } },
                        ouvert: { y: "0%", rotate: 0, transition: { delay: 0.35 + i * 0.07, duration: 0.7, ease: douceur } },
                      }}
                      className="group flex items-center justify-between py-1.5"
                    >
                      <span className="flex items-baseline gap-4">
                        <span className="font-titre w-6 text-xs font-medium text-bleu-clair">0{i + 1}</span>
                        <span
                          className={`font-titre text-[2.6rem] leading-none font-extrabold tracking-tight transition-colors ${
                            active === lien.id ? "texte-degrade" : "text-white"
                          }`}
                        >
                          {lien.libelle}
                        </span>
                      </span>
                      <ArrowUpRight className="size-6 text-white/30 transition-all group-active:rotate-45 group-active:text-bleu-clair" />
                    </motion.a>
                  </li>
                ))}
              </ul>

              <motion.div
                variants={{ ferme: { opacity: 0, y: 20 }, ouvert: { opacity: 1, y: 0, transition: { delay: 0.8, duration: 0.6 } } }}
                className="mt-auto space-y-6"
              >
                <div className="h-px w-full bg-white/10" />
                <div className="flex items-end justify-between gap-4">
                  <div>
                    <p className="text-[10px] tracking-[0.3em] text-white/40">ME CONTACTER</p>
                    <a href={`mailto:${identite.email}`} className="mt-2 block text-sm font-medium">
                      {identite.email}
                    </a>
                    <a href={identite.telephoneLien} className="mt-1 block text-sm text-white/70">
                      {identite.telephone}
                    </a>
                  </div>
                  <div className="flex gap-2">
                    {[
                      { lien: identite.instagram, Icone: IconeInstagram, nom: "Instagram" },
                      { lien: identite.linkedin, Icone: IconeLinkedin, nom: "LinkedIn" },
                    ].map(({ lien, Icone, nom }) => (
                      <a
                        key={nom}
                        href={lien}
                        target="_blank"
                        rel="noopener noreferrer"
                        aria-label={nom}
                        className="grid size-11 place-items-center rounded-full border border-white/15"
                      >
                        <Icone className="size-5" />
                      </a>
                    ))}
                  </div>
                </div>
                <p className="font-signature text-5xl text-bleu-clair">David Baron</p>
              </motion.div>
            </nav>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
