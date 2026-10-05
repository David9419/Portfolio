"use client";

import { ArrowUpRight, Check, Copy, Mail, Phone } from "lucide-react";
import { AnimatePresence, motion } from "motion/react";
import { useState } from "react";
import { Apparition, Magnetique, MotsAnimes } from "@/components/animations";
import { IconeInstagram, IconeLinkedin } from "@/components/icones";
import { identite, objectif } from "@/lib/contenu";

const canaux = [
  { Icone: Phone, libelle: "Téléphone", valeur: identite.telephone, lien: identite.telephoneLien },
  { Icone: Mail, libelle: "E-mail", valeur: identite.email, lien: `mailto:${identite.email}` },
  { Icone: IconeInstagram, libelle: "Instagram", valeur: "@davidbaron196", lien: identite.instagram },
  { Icone: IconeLinkedin, libelle: "LinkedIn", valeur: "David Baron", lien: identite.linkedin },
];

export function SectionContact() {
  const [copie, setCopie] = useState(false);

  const copierEmail = async () => {
    try {
      await navigator.clipboard.writeText(identite.email);
      setCopie(true);
      setTimeout(() => setCopie(false), 2000);
    } catch {
      window.location.href = `mailto:${identite.email}`;
    }
  };

  return (
    <section id="contact" className="relative px-4 pb-10 md:px-6">
      <div className="relative mx-auto max-w-6xl overflow-hidden rounded-[2.5rem] bg-nuit px-6 py-20 text-white md:px-16 md:py-28">
        {/* Fond animé */}
        <div className="flotter absolute -top-32 -right-32 size-[500px] rounded-full bg-bleu/40 blur-[120px]" aria-hidden />
        <div className="flotter absolute -bottom-40 -left-20 size-[400px] rounded-full bg-bleu-fonce/50 blur-[120px] [animation-delay:-8s]" aria-hidden />
        <svg viewBox="0 0 1200 600" className="absolute inset-0 h-full w-full opacity-25" preserveAspectRatio="none" fill="none" aria-hidden>
          {Array.from({ length: 14 }).map((_, i) => (
            <motion.path
              key={i}
              d={`M-50 ${520 - i * 22} C 300 ${300 - i * 10}, 700 ${650 - i * 25}, 1250 ${120 + i * 14}`}
              stroke="#60A5FA"
              strokeWidth="0.8"
              initial={{ pathLength: 0 }}
              whileInView={{ pathLength: 1 }}
              viewport={{ once: true }}
              transition={{ duration: 2, delay: i * 0.05 }}
            />
          ))}
        </svg>

        <div className="relative">
          <Apparition>
            <p className="font-titre mb-6 flex items-center gap-3 text-xs font-semibold tracking-[0.35em] text-bleu-clair uppercase">
              <span className="text-white/50">06</span>
              <span className="h-px w-10 bg-bleu-clair" />
              Mon objectif
            </p>
          </Apparition>
          <Apparition delai={0.1}>
            <p className="max-w-3xl text-lg leading-relaxed text-white/70 md:text-xl">{objectif.texte}</p>
          </Apparition>

          <h2 className="font-titre mt-14 text-5xl leading-[1] font-black tracking-tight md:text-8xl">
            <MotsAnimes texte="Un projet ?" />
            <br />
            <MotsAnimes texte="Parlons-en." classeMot={() => "texte-degrade"} delai={0.2} />
          </h2>

          <div className="mt-12 flex flex-wrap items-center gap-4">
            <Magnetique>
              <a
                href={`mailto:${identite.email}`}
                className="group inline-flex items-center gap-3 rounded-full bg-bleu px-8 py-5 text-lg font-semibold shadow-2xl shadow-bleu/40 transition-colors hover:bg-white hover:text-nuit"
              >
                M’écrire un e-mail
                <ArrowUpRight className="size-5 transition-transform group-hover:rotate-45" />
              </a>
            </Magnetique>
            <button
              type="button"
              onClick={copierEmail}
              className="inline-flex items-center gap-2 rounded-full border border-white/15 px-6 py-5 text-sm font-medium text-white/80 transition-colors hover:border-white/40"
            >
              <AnimatePresence mode="wait" initial={false}>
                <motion.span
                  key={copie ? "ok" : "copier"}
                  initial={{ opacity: 0, y: 8 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -8 }}
                  className="inline-flex items-center gap-2"
                >
                  {copie ? <Check className="size-4 text-emerald-400" /> : <Copy className="size-4" />}
                  {copie ? "Adresse copiée !" : "Copier l’adresse e-mail"}
                </motion.span>
              </AnimatePresence>
            </button>
          </div>

          <div className="mt-16 grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
            {canaux.map(({ Icone, libelle, valeur, lien }, i) => (
              <Apparition key={libelle} delai={i * 0.08}>
                <a
                  href={lien}
                  target={lien.startsWith("http") ? "_blank" : undefined}
                  rel={lien.startsWith("http") ? "noopener noreferrer" : undefined}
                  className="group flex h-full flex-col gap-6 rounded-2xl border border-white/10 bg-white/[0.04] p-5 backdrop-blur transition-all duration-500 hover:-translate-y-1 hover:border-bleu/60 hover:bg-bleu/10"
                >
                  <div className="flex items-center justify-between">
                    <span className="grid size-11 place-items-center rounded-xl bg-white/10 transition-colors group-hover:bg-bleu">
                      <Icone className="size-5" />
                    </span>
                    <ArrowUpRight className="size-4 text-white/40 transition-all group-hover:rotate-45 group-hover:text-white" />
                  </div>
                  <div>
                    <p className="text-xs tracking-wider text-white/50 uppercase">{libelle}</p>
                    <p className="mt-1 text-sm font-semibold break-words sm:text-base [overflow-wrap:anywhere]">{valeur}</p>
                  </div>
                </a>
              </Apparition>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
