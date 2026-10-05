"use client";

import { Lightbulb, Monitor, TrendingUp } from "lucide-react";
import { Apparition, Compteur, EnteteSection } from "@/components/animations";
import { aPropos } from "@/lib/contenu";

const icones = { progression: TrendingUp, creativite: Lightbulb, digital: Monitor };

export function SectionAPropos() {
  return (
    <section id="a-propos" className="relative mx-auto max-w-6xl px-6 py-28 md:py-40">
      <EnteteSection numero="01" libelle="À propos" titre="Créer, innover," accent="progresser." />

      <div className="grid gap-16 lg:grid-cols-[1.3fr_1fr]">
        <div className="space-y-6">
          <Apparition>
            <p className="font-titre text-2xl leading-snug font-semibold md:text-3xl">{aPropos.intro}</p>
          </Apparition>
          {aPropos.paragraphes.map((p, i) => (
            <Apparition key={i} delai={0.1 * (i + 1)}>
              <p className="text-lg leading-relaxed text-doux">{p}</p>
            </Apparition>
          ))}
          <Apparition delai={0.3}>
            <p className="border-s-2 border-bleu ps-5 text-lg font-medium">{aPropos.objectif}</p>
          </Apparition>
        </div>

        <div className="grid content-center gap-4">
          {aPropos.valeurs.map((v, i) => {
            const Icone = icones[v.icone as keyof typeof icones];
            return (
              <Apparition key={v.titre} depuis="droite" delai={i * 0.12}>
                <div className="group flex items-center gap-5 rounded-2xl border border-bordure bg-carte p-5 transition-all duration-500 hover:-translate-y-1 hover:border-bleu/50 hover:shadow-xl hover:shadow-bleu/10">
                  <div className="grid size-14 shrink-0 place-items-center rounded-xl bg-bleu/10 text-bleu transition-all duration-500 group-hover:rotate-[-8deg] group-hover:bg-bleu group-hover:text-white">
                    <Icone className="size-6" strokeWidth={1.6} />
                  </div>
                  <div>
                    <p className="font-titre font-bold">{v.titre}</p>
                    <p className="text-sm text-doux">{v.sous}</p>
                  </div>
                </div>
              </Apparition>
            );
          })}
        </div>
      </div>

      <div className="mt-20 grid grid-cols-2 gap-px overflow-hidden rounded-3xl border border-bordure bg-bordure md:grid-cols-4">
        {aPropos.chiffres.map((c, i) => (
          <Apparition key={c.libelle} delai={i * 0.08} className="bg-fond p-8">
            <p className="font-titre text-4xl font-black text-bleu md:text-5xl">
              <Compteur valeur={c.valeur} prefixe={c.prefixe} suffixe={c.suffixe} />
            </p>
            <p className="mt-2 text-sm text-doux">{c.libelle}</p>
          </Apparition>
        ))}
      </div>
    </section>
  );
}
