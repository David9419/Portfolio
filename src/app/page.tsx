import { Curseur } from "@/components/curseur";
import { Chargement, HaloSouris } from "@/components/effets";
import { Navigation } from "@/components/navigation";
import { SectionAPropos } from "@/components/sections/a-propos";
import { SectionAccueil } from "@/components/sections/accueil";
import { BandeDevise } from "@/components/sections/bande-devise";
import { BandeOutils } from "@/components/sections/bande-outils";
import { SectionCompetences } from "@/components/sections/competences";
import { SectionContact } from "@/components/sections/contact";
import { SectionMethode } from "@/components/sections/methode";
import { SectionParcours } from "@/components/sections/parcours";
import { PiedDePage } from "@/components/sections/pied";
import { SectionProjets } from "@/components/sections/projets";
import { donneesStructurees } from "@/lib/seo";

export default function Page() {
  return (
    <>
      {/* Fiche d'identité pour Google (qui je suis, mes services, mes projets) */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(donneesStructurees()).replace(/</g, "\\u003c") }}
      />
      <Chargement />
      <Curseur />
      <HaloSouris />
      <Navigation />
      <main className="relative z-10 overflow-x-clip">
        <SectionAccueil />
        <SectionAPropos />
        <BandeOutils />
        <SectionProjets />
        <SectionCompetences />
        <SectionParcours />
        <SectionMethode />
        <BandeDevise />
        <div className="h-24 md:h-32" />
        <SectionContact />
      </main>
      <PiedDePage />
    </>
  );
}
