import { ArrowUp } from "lucide-react";
import { Logo } from "@/components/logo";
import { identite, objectif } from "@/lib/contenu";

export function PiedDePage() {
  return (
    <footer className="mx-auto max-w-6xl px-6 pt-16 pb-10">
      <div className="flex flex-col items-start justify-between gap-10 md:flex-row md:items-end">
        <div>
          <Logo className="h-10 w-auto text-texte" />
          <p className="font-signature mt-4 text-5xl text-bleu">{identite.prenom} {identite.nom}</p>
        </div>
        <ul className="font-titre space-y-1 text-xs font-medium tracking-[0.4em] text-doux">
          {objectif.mots.map((m) => (
            <li key={m}>{m.toUpperCase()}</li>
          ))}
        </ul>
      </div>
      <div className="mt-12 flex flex-col-reverse items-start justify-between gap-6 border-t border-bordure pt-8 text-sm text-doux sm:flex-row sm:items-center">
        <p className="font-titre tracking-[0.3em]">
          DAVID BARON <span className="text-bleu">/</span> PORTFOLIO
        </p>
        <a href="#accueil" className="group inline-flex items-center gap-2 transition-colors hover:text-bleu">
          Retour en haut
          <span className="grid size-9 place-items-center rounded-full border border-bordure transition-all group-hover:-translate-y-1 group-hover:border-bleu">
            <ArrowUp className="size-4" />
          </span>
        </a>
      </div>
    </footer>
  );
}
