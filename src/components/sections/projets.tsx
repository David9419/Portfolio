"use client";

import { ArrowUpRight, Clock } from "lucide-react";
import { motion, useScroll, useTransform } from "motion/react";
import Image from "next/image";
import { useRef } from "react";
import { Apparition, CarteInclinable, EnteteSection } from "@/components/animations";
import { IconeInstagram } from "@/components/icones";
import { projets, type Projet } from "@/lib/contenu";

// Aperçu de la boutique Vinted : la veste C.P. Company en vedette, présentée comme une annonce.
function BoutiqueVinted() {
  return (
    <div className="absolute inset-0 grid grid-cols-[1.05fr_1fr] bg-[#f6f7f8] text-[#111]">
      <div className="relative overflow-hidden">
        <Image
          src="/projets/veste-cp-company.jpg"
          alt="Veste C.P. Company bleu marine en vente sur Vinted"
          fill
          sizes="(min-width: 768px) 300px, 50vw"
          className="object-cover transition-transform duration-[1.5s] ease-out group-hover:scale-110"
        />
        <span className="absolute top-3 left-3 rounded-full bg-white/90 px-2.5 py-1 text-[10px] font-semibold shadow">
          Neuf avec étiquette
        </span>
      </div>
      <div className="flex flex-col justify-center gap-2 p-4 md:p-5">
        <span className="text-xs font-black tracking-tight text-[#09b1ba] md:text-sm">Vinted</span>
        <p className="text-[10px] font-semibold tracking-widest text-black/40 uppercase">C.P. Company</p>
        <p className="text-sm leading-snug font-bold md:text-base">Veste à capuche bleu marine</p>
        <div className="mt-1 flex flex-wrap gap-1.5">
          {["Lens sur la manche", "Nylon", "Capuche"].map((t) => (
            <span key={t} className="rounded-full bg-black/5 px-2 py-0.5 text-[10px] text-black/60">
              {t}
            </span>
          ))}
        </div>
        <span className="mt-2 inline-flex w-fit items-center rounded-md bg-[#09b1ba] px-3 py-1.5 text-[11px] font-semibold text-white">
          Voir l’annonce
        </span>
      </div>
    </div>
  );
}

// Aperçu du vrai site dans une fenêtre de navigateur.
// Au survol, la page défile doucement de haut en bas, comme si on la parcourait.
function Apercu({ projet, index }: { projet: Projet; index: number }) {
  return (
    <div className="relative overflow-hidden rounded-2xl border border-bordure bg-nuit">
      <div className="flex items-center gap-3 border-b border-white/10 bg-[#0d1526] px-4 py-2.5">
        <div className="flex gap-1.5">
          <span className="size-2.5 rounded-full bg-[#ff5f57]" />
          <span className="size-2.5 rounded-full bg-[#febc2e]" />
          <span className="size-2.5 rounded-full bg-[#28c840]" />
        </div>
        <div className="mx-auto flex max-w-[70%] items-center gap-2 truncate rounded-md bg-white/5 px-3 py-1 text-[11px] text-white/60">
          <span className="size-1.5 shrink-0 rounded-full bg-emerald-400" />
          {projet.domaine}
        </div>
        <span className="w-10" />
      </div>
      <div className={`relative aspect-[16/10] overflow-hidden ${index === 0 ? "md:aspect-[2/1]" : ""}`}>
        {projet.image ? (
          <>
            <Image
              src={projet.image}
              alt={`Aperçu du site ${projet.nom}`}
              fill
              sizes={index === 0 ? "(min-width: 768px) 1100px, 100vw" : "(min-width: 768px) 560px, 100vw"}
              className="apercu-defile object-cover object-top transition-[object-position] duration-[6s] ease-in-out group-hover:object-bottom"
            />
            <span className="pointer-events-none absolute right-3 bottom-3 rounded-full [@media(hover:none)]:hidden bg-black/60 px-3 py-1 text-[10px] font-medium tracking-wider text-white/80 uppercase opacity-100 backdrop-blur transition-opacity duration-500 group-hover:opacity-0">
              Survolez pour parcourir
            </span>
          </>
        ) : (
          <BoutiqueVinted />
        )}
      </div>
    </div>
  );
}

function CarteProjet({ projet, index }: { projet: Projet; index: number }) {
  const ref = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({ target: ref, offset: ["start end", "end start"] });
  const y = useTransform(scrollYProgress, [0, 1], [60, -60]);

  return (
    <motion.div ref={ref} style={{ y: index % 2 ? y : undefined }}>
      <Apparition delai={index * 0.1}>
        <CarteInclinable className="rounded-3xl border border-bordure bg-carte p-3 transition-shadow duration-500 hover:shadow-2xl hover:shadow-bleu/15">
          <Apercu projet={projet} index={index} />
          <div className="p-5">
            <div className="flex items-center justify-between text-xs text-doux">
              <span className="font-semibold tracking-wider text-bleu uppercase">{projet.categorie}</span>
              <span>{projet.annee}</span>
            </div>
            <h3 className="font-titre mt-3 text-3xl font-extrabold">{projet.nom}</h3>
            <p className="mt-3 leading-relaxed text-doux">{projet.description}</p>
            <ul className="mt-5 flex flex-wrap gap-2">
              {projet.role.map((r) => (
                <li key={r} className="rounded-full border border-bordure px-3 py-1 text-xs font-medium">
                  {r}
                </li>
              ))}
            </ul>
            <div className="relative z-20 mt-6 flex flex-wrap gap-3">
              {projet.site && (
                <a
                  href={projet.site}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="group/lien inline-flex items-center gap-2 rounded-full bg-bleu px-5 py-2.5 text-sm font-semibold text-white"
                >
                  {projet.libelleLien ?? "Voir le site"}
                  <ArrowUpRight className="size-4 transition-transform group-hover/lien:translate-x-0.5 group-hover/lien:-translate-y-0.5" />
                </a>
              )}
              {projet.instagram && (
                <a
                  href={projet.instagram}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-2 rounded-full border border-bordure px-5 py-2.5 text-sm font-semibold transition-colors hover:border-bleu hover:text-bleu"
                >
                  <IconeInstagram className="size-4" />
                  Instagram
                </a>
              )}
              {projet.lienAVenir && (
                <span className="inline-flex items-center gap-2 rounded-full border border-dashed border-bordure px-5 py-2.5 text-sm text-doux">
                  <Clock className="size-4" />
                  {projet.lienAVenir}
                </span>
              )}
            </div>
          </div>
        </CarteInclinable>
      </Apparition>
    </motion.div>
  );
}

export function SectionProjets() {
  return (
    <section id="projets" className="relative bg-fond-2 py-28 md:py-40">
      <div className="mx-auto max-w-6xl px-6">
        <EnteteSection numero="02" libelle="Mes projets" titre="Des idées devenues" accent="réalités." />
        <div className="grid gap-10 md:grid-cols-2 md:gap-8">
          {projets.map((p, i) => (
            <div key={p.nom} className={`min-w-0 ${i === 0 ? "md:col-span-2" : ""}`}>
              <CarteProjet projet={p} index={i} />
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
