"use client";

import {
  Camera,
  Clapperboard,
  Database,
  Flame,
  Frame,
  GitBranch,
  Globe,
  Heart,
  Megaphone,
  Music2,
  Palette,
  PenLine,
  PenTool,
  Scissors,
  Shapes,
  Sparkles,
  Terminal,
  Triangle,
  Users,
  type LucideIcon,
} from "lucide-react";
import { TexteDefilant, TexteBrouille } from "@/components/animations";
import { outils } from "@/lib/contenu";

const iconesOutils: Record<string, LucideIcon> = {
  "Claude Code": Sparkles,
  Terminal: Terminal,
  GitHub: GitBranch,
  Vercel: Triangle,
  Netlify: Globe,
  Supabase: Database,
  Firebase: Flame,
  Lovable: Heart,
  Framer: Frame,
  Canva: Palette,
  CapCut: Scissors,
  Figma: PenTool,
  "Création graphique": Shapes,
  "Montage vidéo": Clapperboard,
  Instagram: Camera,
  TikTok: Music2,
  "Création de contenus": PenLine,
  "Gestion de comptes": Users,
  "Promotion de projets": Megaphone,
};

function Pastille({ nom }: { nom: string }) {
  const Icone = iconesOutils[nom] ?? Sparkles;
  return (
    <span className="group/p mx-2 flex items-center gap-3 rounded-2xl border border-bordure bg-carte py-2.5 ps-2.5 pe-5 shadow-sm transition-all duration-300 hover:-translate-y-0.5 hover:border-bleu/50 hover:shadow-lg hover:shadow-bleu/10 md:mx-2.5">
      <span className="grid size-9 place-items-center rounded-xl bg-bleu/10 text-bleu transition-colors duration-300 group-hover/p:bg-bleu group-hover/p:text-white">
        <Icone className="size-[18px]" strokeWidth={1.8} />
      </span>
      <span className="text-sm font-semibold whitespace-nowrap text-texte md:text-[15px]">{nom}</span>
    </span>
  );
}

// Les outils que j'utilise, sur deux lignes qui glissent en sens inverse.
// Elles accélèrent quand on fait défiler la page et changent de sens quand on remonte.
export function BandeOutils() {
  const tous = outils.flatMap((g) => g.liste);
  const moitie = Math.ceil(tous.length / 2);
  const fondu = "[mask-image:linear-gradient(to_right,transparent,black_12%,black_88%,transparent)]";

  return (
    <section aria-label="Outils et technologies" className="relative py-16 md:py-24">
      <p className="font-titre mb-10 flex items-center justify-center gap-3 text-center text-xs font-semibold tracking-[0.35em] text-doux uppercase">
        <span className="h-px w-8 bg-bordure md:w-16" />
        <TexteBrouille texte="Mes outils au quotidien" />
        <span className="h-px w-8 bg-bordure md:w-16" />
      </p>
      <div className={`space-y-4 ${fondu}`}>
        <TexteDefilant vitesse={1.4} inclinaison={false} className="py-1">
          {tous.slice(0, moitie).map((o) => (
            <Pastille key={o} nom={o} />
          ))}
        </TexteDefilant>
        <TexteDefilant vitesse={-1.4} inclinaison={false} className="py-1">
          {tous.slice(moitie).map((o) => (
            <Pastille key={o} nom={o} />
          ))}
        </TexteDefilant>
      </div>
    </section>
  );
}
