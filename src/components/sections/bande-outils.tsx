import { Sparkle } from "lucide-react";
import { outils } from "@/lib/contenu";

function Ligne({ liste, inverse }: { liste: string[]; inverse?: boolean }) {
  return (
    <div className="flex overflow-hidden">
      <div className={`flex shrink-0 items-center ${inverse ? "defilement-inverse" : "defilement"}`}>
        {[...liste, ...liste, ...liste, ...liste].map((o, i) => (
          <span key={i} className="font-titre flex items-center gap-6 px-6 text-2xl font-bold whitespace-nowrap md:text-4xl">
            {o}
            <Sparkle className="size-5 text-bleu" />
          </span>
        ))}
      </div>
    </div>
  );
}

// Deux bandes inclinées qui défilent en sens inverse avec tous les outils.
export function BandeOutils() {
  const tous = outils.flatMap((g) => g.liste);
  const ligne1 = tous.slice(0, Math.ceil(tous.length / 2));
  const ligne2 = tous.slice(Math.ceil(tous.length / 2));

  return (
    <section aria-label="Outils et technologies" className="relative overflow-hidden py-10">
      <div className="-rotate-2 border-y border-bleu/40 bg-bleu py-5 text-white">
        <Ligne liste={ligne1} />
      </div>
      <div className="mt-3 rotate-1 border-y border-bordure bg-fond-2 py-5 text-texte/80">
        <Ligne liste={ligne2} inverse />
      </div>
    </section>
  );
}
