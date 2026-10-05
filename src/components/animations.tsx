"use client";

import {
  animate,
  motion,
  useInView,
  useMotionTemplate,
  useMotionValue,
  useSpring,
  useTransform,
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
          <span className="h-px w-10 bg-bleu" />
          {libelle}
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
