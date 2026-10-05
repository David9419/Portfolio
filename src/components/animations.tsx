"use client";

import {
  AnimatePresence,
  animate,
  motion,
  useAnimationFrame,
  useInView,
  useMotionTemplate,
  useMotionValue,
  useScroll,
  useSpring,
  useTransform,
  useVelocity,
  type HTMLMotionProps,
} from "motion/react";
import { useEffect, useRef, useState } from "react";

const douceur = [0.22, 1, 0.36, 1] as const;

// Un bloc qui apparaît en glissant quand on arrive dessus.
export function Apparition({
  children,
  delai = 0,
  depuis = "bas",
  className,
  ...reste
}: { children: React.ReactNode; delai?: number; depuis?: "bas" | "gauche" | "droite" } & HTMLMotionProps<"div">) {
  const decalage = { bas: { y: 40 }, gauche: { x: -40 }, droite: { x: 40 } }[depuis];
  return (
    <motion.div
      initial={{ opacity: 0, filter: "blur(8px)", ...decalage }}
      whileInView={{ opacity: 1, filter: "blur(0px)", x: 0, y: 0 }}
      viewport={{ once: true, margin: "-80px" }}
      transition={{ duration: 0.9, ease: douceur, delay: delai }}
      className={className}
      {...reste}
    >
      {children}
    </motion.div>
  );
}

// Titre dont les mots montent un par un, comme derrière un rideau.
export function MotsAnimes({
  texte,
  className,
  classeMot,
  delai = 0,
  immediat = false,
}: {
  texte: string;
  className?: string;
  classeMot?: (mot: string, index: number) => string;
  delai?: number;
  immediat?: boolean;
}) {
  const mots = texte.split(" ");
  const cible = { y: "0%", rotate: 0 };
  return (
    <span className={className} aria-label={texte}>
      {mots.map((mot, i) => (
        <span key={i} className="inline-block overflow-hidden pb-[0.12em] align-bottom" aria-hidden>
          <motion.span
            className={`inline-block ${classeMot?.(mot, i) ?? ""}`}
            initial={{ y: "110%", rotate: 6 }}
            {...(immediat ? { animate: cible } : { whileInView: cible, viewport: { once: true } })}
            transition={{ duration: 0.9, ease: douceur, delay: delai + i * 0.07 }}
          >
            {mot}
            {i < mots.length - 1 ? " " : ""}
          </motion.span>
        </span>
      ))}
    </span>
  );
}

// Élément attiré par la souris (effet « aimant »).
export function Magnetique({ children, force = 0.35, className }: { children: React.ReactNode; force?: number; className?: string }) {
  const ref = useRef<HTMLDivElement>(null);
  const x = useSpring(0, { stiffness: 200, damping: 15 });
  const y = useSpring(0, { stiffness: 200, damping: 15 });
  return (
    <motion.div
      ref={ref}
      style={{ x, y }}
      className={className}
      onPointerMove={(e) => {
        if (e.pointerType !== "mouse" || !ref.current) return;
        const r = ref.current.getBoundingClientRect();
        x.set((e.clientX - r.left - r.width / 2) * force);
        y.set((e.clientY - r.top - r.height / 2) * force);
      }}
      onPointerLeave={() => {
        x.set(0);
        y.set(0);
      }}
    >
      {children}
    </motion.div>
  );
}

// Carte qui s'incline en 3D et suit la lumière de la souris.
export function CarteInclinable({ children, className }: { children: React.ReactNode; className?: string }) {
  const ref = useRef<HTMLDivElement>(null);
  const px = useMotionValue(0.5);
  const py = useMotionValue(0.5);
  const rotX = useSpring(useTransform(py, [0, 1], [7, -7]), { stiffness: 150, damping: 18 });
  const rotY = useSpring(useTransform(px, [0, 1], [-9, 9]), { stiffness: 150, damping: 18 });
  const lumX = useTransform(px, (v) => `${v * 100}%`);
  const lumY = useTransform(py, (v) => `${v * 100}%`);
  const lumiere = useMotionTemplate`radial-gradient(500px circle at ${lumX} ${lumY}, var(--halo), transparent 45%)`;

  return (
    <motion.div
      ref={ref}
      style={{ rotateX: rotX, rotateY: rotY, transformPerspective: 1200 }}
      onPointerMove={(e) => {
        if (e.pointerType !== "mouse" || !ref.current) return;
        const r = ref.current.getBoundingClientRect();
        px.set((e.clientX - r.left) / r.width);
        py.set((e.clientY - r.top) / r.height);
      }}
      onPointerLeave={() => {
        px.set(0.5);
        py.set(0.5);
      }}
      className={`group relative ${className ?? ""}`}
    >
      <motion.div
        className="pointer-events-none absolute inset-0 z-10 rounded-[inherit] opacity-0 transition-opacity duration-500 group-hover:opacity-100"
        style={{ background: lumiere }}
      />
      {children}
    </motion.div>
  );
}

// Nombre qui compte de 0 jusqu'à sa valeur quand il devient visible.
export function Compteur({ valeur, prefixe = "", suffixe = "" }: { valeur: number; prefixe?: string; suffixe?: string }) {
  const ref = useRef<HTMLSpanElement>(null);
  const visible = useInView(ref, { once: true, margin: "-50px" });
  const [affiche, setAffiche] = useState(0);

  useEffect(() => {
    if (!visible) return;
    const controle = animate(0, valeur, {
      duration: 1.8,
      ease: douceur,
      onUpdate: (v) => setAffiche(Math.round(v)),
    });
    return () => controle.stop();
  }, [visible, valeur]);

  return (
    <span ref={ref}>
      {prefixe}
      {affiche}
      {suffixe}
    </span>
  );
}

// En-tête de section : petit libellé + grand titre.
export function EnteteSection({ numero, libelle, titre, accent }: { numero: string; libelle: string; titre: string; accent?: string }) {
  return (
    <div className="mb-14 md:mb-20">
      <Apparition>
        <p className="font-titre mb-5 flex items-center gap-3 text-xs font-semibold uppercase tracking-[0.35em] text-bleu">
          <span className="text-doux">{numero}</span>
          <motion.span
            className="h-px w-10 origin-left bg-bleu"
            initial={{ scaleX: 0 }}
            whileInView={{ scaleX: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8, ease: douceur }}
          />
          <TexteBrouille texte={libelle} />
        </p>
      </Apparition>
      <h2 className="font-titre text-4xl font-extrabold leading-[1.05] tracking-tight md:text-6xl">
        <MotsAnimes texte={titre} />
        {accent ? (
          <>
            {" "}
            <MotsAnimes texte={accent} classeMot={() => "texte-degrade"} delai={0.15} />
          </>
        ) : null}
      </h2>
    </div>
  );
}

const signes = "ABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789#$%&*+=/<>";

// Texte qui se « décode » lettre par lettre quand il apparaît à l'écran.
export function TexteBrouille({ texte, className, delai = 0 }: { texte: string; className?: string; delai?: number }) {
  const ref = useRef<HTMLSpanElement>(null);
  const visible = useInView(ref, { once: true, margin: "-40px" });
  const [affiche, setAffiche] = useState(texte);

  useEffect(() => {
    if (!visible) return;
    let image = 0;
    let minuteur = 0;
    const debut = performance.now() + delai * 1000;
    const duree = 600 + texte.length * 35;
    const tour = (maintenant: number) => {
      const avance = Math.max(0, (maintenant - debut) / duree);
      const fixes = Math.floor(avance * texte.length);
      setAffiche(
        texte
          .split("")
          .map((c, i) => (i < fixes || c === " " ? c : signes[Math.floor(Math.random() * signes.length)]))
          .join(""),
      );
      if (avance < 1) minuteur = window.setTimeout(() => (image = requestAnimationFrame(tour)), 40);
      else setAffiche(texte);
    };
    image = requestAnimationFrame(tour);
    return () => {
      cancelAnimationFrame(image);
      clearTimeout(minuteur);
    };
  }, [visible, texte, delai]);

  return (
    <span ref={ref} className={className} aria-label={texte}>
      <span aria-hidden>{affiche}</span>
    </span>
  );
}

// Mot qui change toutes les 2 secondes (glisse vers le haut avec un flou).
export function MotRotatif({ mots, className }: { mots: string[]; className?: string }) {
  const [index, setIndex] = useState(0);
  useEffect(() => {
    const minuteur = setInterval(() => setIndex((i) => (i + 1) % mots.length), 2200);
    return () => clearInterval(minuteur);
  }, [mots.length]);

  return (
    <span className="relative inline-grid overflow-hidden align-bottom">
      <AnimatePresence mode="popLayout" initial={false}>
        <motion.span
          key={mots[index]}
          initial={{ y: "100%", opacity: 0, filter: "blur(6px)" }}
          animate={{ y: "0%", opacity: 1, filter: "blur(0px)" }}
          exit={{ y: "-100%", opacity: 0, filter: "blur(6px)" }}
          transition={{ duration: 0.6, ease: douceur }}
          className={`inline-block whitespace-nowrap ${className ?? ""}`}
        >
          {mots[index]}
        </motion.span>
      </AnimatePresence>
    </span>
  );
}

const boucler = (min: number, max: number, v: number) => {
  const plage = max - min;
  return ((((v - min) % plage) + plage) % plage) + min;
};

// Bande qui défile en continu : elle accélère quand on fait défiler la page,
// et change de sens quand on remonte. Elle s'incline légèrement avec la vitesse.
export function TexteDefilant({
  children,
  vitesse = 3,
  inclinaison = true,
  className,
}: {
  children: React.ReactNode;
  vitesse?: number;
  inclinaison?: boolean;
  className?: string;
}) {
  const base = useMotionValue(0);
  const { scrollY } = useScroll();
  const vitesseDefilement = useVelocity(scrollY);
  const lisse = useSpring(vitesseDefilement, { damping: 50, stiffness: 400 });
  const facteur = useTransform(lisse, [0, 1000], [0, 4], { clamp: false });
  const penche = useTransform(lisse, [-2000, 0, 2000], [8, 0, -8]);
  const x = useTransform(base, (v) => `${boucler(-25, 0, v)}%`);
  const sens = useRef(1);

  useAnimationFrame((_, delta) => {
    const f = facteur.get();
    if (f < 0) sens.current = -1;
    else if (f > 0) sens.current = 1;
    let pas = sens.current * vitesse * (delta / 1000);
    pas += pas * Math.abs(f);
    base.set(base.get() - pas);
  });

  return (
    <div className={`flex overflow-hidden whitespace-nowrap ${className ?? ""}`}>
      <motion.div className="flex shrink-0 flex-nowrap" style={{ x, skewX: inclinaison ? penche : 0 }}>
        {[0, 1, 2, 3].map((i) => (
          <div key={i} className="flex shrink-0 items-center" aria-hidden={i > 0}>
            {children}
          </div>
        ))}
      </motion.div>
    </div>
  );
}
