// Réglages de référencement (SEO) : adresse du site, titres et descriptions pour Google.
import { identite, projets, realisationsClients } from "@/lib/contenu";

export const urlSite = "https://www.david-baron.com";

export const seo = {
  titre: "David Baron — Création de sites internet, logiciels & SaaS",
  titreCourt: "David Baron — Créateur digital",
  description:
    "David Baron, créateur digital et entrepreneur : création de sites internet, logiciels, SaaS et CRM sur mesure, identité visuelle, SEO et marketing digital. Des idées aux projets concrets.",
  motsCles: [
    "David Baron",
    "création de site internet",
    "création site web sur mesure",
    "développeur no code",
    "création de SaaS",
    "création de CRM",
    "création de logiciel",
    "site vitrine",
    "créateur digital",
    "freelance site internet",
    "identité visuelle",
    "création de logo",
    "SEO",
    "marketing digital",
    "intelligence artificielle",
    "Next.js",
    "Supabase",
    "portfolio",
  ],
};

// Fiche d'identité lisible par Google (données structurées schema.org).
export function donneesStructurees() {
  const personne = {
    "@type": "Person",
    "@id": `${urlSite}/#david-baron`,
    name: `${identite.prenom} ${identite.nom}`,
    givenName: identite.prenom,
    familyName: identite.nom,
    jobTitle: identite.titre,
    description: seo.description,
    url: urlSite,
    image: `${urlSite}/opengraph-image`,
    email: `mailto:${identite.email}`,
    telephone: "+33749942081",
    nationality: { "@type": "Country", name: "France" },
    sameAs: [identite.instagram, identite.linkedin],
    knowsAbout: [
      "Création de sites internet",
      "Création de logiciels",
      "SaaS",
      "CRM",
      "No Code",
      "Bases de données",
      "Intelligence artificielle",
      "Design graphique",
      "Identité visuelle",
      "Montage vidéo",
      "Marketing digital",
      "SEO",
      "Réseaux sociaux",
    ],
  };

  const travaux = [...projets, ...realisationsClients].map((p) => ({
    "@type": "CreativeWork",
    name: p.nom,
    description: p.description,
    genre: p.categorie,
    ...(p.site ? { url: p.site } : {}),
    ...(p.image ? { image: `${urlSite}${p.image}` } : {}),
    creator: { "@id": `${urlSite}/#david-baron` },
  }));

  return {
    "@context": "https://schema.org",
    "@graph": [
      personne,
      {
        "@type": "WebSite",
        "@id": `${urlSite}/#site`,
        url: urlSite,
        name: seo.titreCourt,
        description: seo.description,
        inLanguage: "fr-FR",
        publisher: { "@id": `${urlSite}/#david-baron` },
      },
      {
        "@type": "ProfilePage",
        "@id": `${urlSite}/#page`,
        url: urlSite,
        name: seo.titre,
        inLanguage: "fr-FR",
        isPartOf: { "@id": `${urlSite}/#site` },
        mainEntity: { "@id": `${urlSite}/#david-baron` },
      },
      {
        "@type": "ProfessionalService",
        "@id": `${urlSite}/#services`,
        name: "David Baron — Création digitale",
        url: urlSite,
        email: identite.email,
        telephone: "+33749942081",
        areaServed: { "@type": "Country", name: "France" },
        founder: { "@id": `${urlSite}/#david-baron` },
        serviceType: [
          "Création de site internet",
          "Création de logiciel et SaaS",
          "Création de CRM",
          "Identité visuelle et logo",
          "Marketing digital et SEO",
          "Création de contenus et montage vidéo",
        ],
      },
      { "@type": "ItemList", name: "Projets et réalisations", itemListElement: travaux.map((t, i) => ({ "@type": "ListItem", position: i + 1, item: t })) },
    ],
  };
}
