// Tous les textes du portfolio sont ici : pour changer un texte, on modifie ce fichier.

export const identite = {
  prenom: "David",
  nom: "Baron",
  titre: "Créateur digital & entrepreneur",
  devise: "Des idées aux projets concrets.",
  piliers: ["Idées", "Créations", "Projets"],
  telephone: "07 49 94 20 81",
  telephoneLien: "tel:+33749942081",
  email: "david.aviel770@gmail.com",
  instagram: "https://www.instagram.com/davidbaron196",
  linkedin: "https://www.linkedin.com/in/david-b-856396441",
};

export const navigation = [
  { id: "a-propos", libelle: "À propos" },
  { id: "projets", libelle: "Projets" },
  { id: "expertise", libelle: "Expertise" },
  { id: "parcours", libelle: "Parcours" },
  { id: "methode", libelle: "Méthode" },
  { id: "contact", libelle: "Contact" },
];

export const aPropos = {
  intro:
    "Je suis David Baron, jeune créateur digital et entrepreneur passionné par le numérique, le business, l’intelligence artificielle et la création de projets concrets.",
  paragraphes: [
    "Je développe des sites internet, des logiciels, des SaaS, des CRM et des solutions digitales personnalisées.",
    "Je m’intéresse également au design, au marketing digital, au SEO, aux réseaux sociaux et à l’utilisation de l’IA pour créer et automatiser des projets.",
  ],
  objectif:
    "Mon objectif : transformer une idée en un projet concret, professionnel et fonctionnel.",
  valeurs: [
    { icone: "progression", titre: "Progression", sous: "Ambition" },
    { icone: "creativite", titre: "Créativité", sous: "Idées" },
    { icone: "digital", titre: "Digital", sous: "Technologie" },
  ],
  chiffres: [
    { valeur: 3, suffixe: "", libelle: "projets entrepreneuriaux" },
    { valeur: 2, prefixe: "Bac+", libelle: "formation No Code" },
    { valeur: 20, suffixe: "+", libelle: "outils maîtrisés" },
    { valeur: 1, suffixe: "", libelle: "alternance en cours" },
  ],
};

export type Projet = {
  nom: string;
  categorie: string;
  annee: string;
  description: string;
  role: string[];
  site?: string;
  libelleLien?: string;
  domaine?: string;
  image?: string;
  instagram?: string;
  lienAVenir?: string;
  couleurs: [string, string];
};

export const projets: Projet[] = [
  {
    nom: "MivtsaNow",
    categorie: "Logiciel · Projet entrepreneurial",
    annee: "2026",
    description:
      "Un logiciel que j’ai créé et que je développe comme un véritable projet entrepreneurial : il met en relation une personne qui a besoin d’une mitsva avec l’intervenant disponible le plus proche, grâce à la géolocalisation.",
    role: ["Conception", "Identité visuelle", "Site & application", "Communication", "Développement"],
    site: "https://www.mivtsa-now.com/",
    domaine: "mivtsa-now.com",
    image: "/projets/mivtsanow.jpg",
    instagram: "https://www.instagram.com/mivtsanow",
    couleurs: ["#3B82F6", "#1E3A8A"],
  },
  {
    nom: "GoldenChance",
    categorie: "Concours & tirages au sort",
    annee: "2026",
    description:
      "Mon projet entrepreneurial autour des concours et tirages au sort. J’ai travaillé sur son identité, son site internet, sa communication, ses supports visuels, son modèle économique et son développement.",
    role: ["Identité", "Site internet", "Supports visuels", "Modèle économique"],
    site: "https://golden-chance.website/",
    domaine: "golden-chance.website",
    image: "/projets/goldenchance.jpg",
    instagram: "https://www.instagram.com/goldenchanceconcours",
    couleurs: ["#F5B83D", "#B45309"],
  },
  {
    nom: "Achat-revente",
    categorie: "Commerce en ligne · Vinted",
    annee: "En cours",
    description:
      "Une activité d’achat-revente sur Vinted, qui démarre avec des vestes C.P. Company. Elle me permet de développer mes compétences commerciales : repérer les opportunités, gérer des produits, créer des annonces et comprendre la vente en ligne.",
    role: ["Repérage d’opportunités", "Photos & annonces", "Gestion des produits", "Vente"],
    site: "https://www.vinted.fr/member/3195123481",
    libelleLien: "Voir ma boutique",
    domaine: "vinted.fr",
    couleurs: ["#14B8A6", "#0F766E"],
  },
];

export const competences = [
  {
    id: "sites",
    titre: "Sites & logiciels",
    icone: "code",
    elements: [
      "Création de sites internet",
      "Création de logiciels",
      "Création de SaaS",
      "Création de CRM",
      "Bases de données",
      "Solutions No Code",
      "Intégration de services",
      "Déploiement de projets",
    ],
  },
  {
    id: "design",
    titre: "Design & contenu",
    icone: "design",
    elements: [
      "Création de logos",
      "Identités visuelles",
      "Affiches",
      "Publicités",
      "Publications réseaux sociaux",
      "Montage vidéo",
      "Création de contenus",
    ],
  },
  {
    id: "business",
    titre: "Business & marketing",
    icone: "business",
    elements: [
      "Création de projets",
      "Recherche d’opportunités",
      "Prospection",
      "Acquisition de clients",
      "Marketing digital",
      "SEO",
      "Réseaux sociaux",
      "Modèles économiques",
    ],
  },
  {
    id: "ia",
    titre: "Intelligence artificielle",
    icone: "ia",
    texte:
      "J’utilise l’intelligence artificielle comme un véritable outil de création et de développement : pour accélérer mes projets, automatiser certaines tâches et concevoir de nouvelles solutions.",
    elements: ["Création assistée par IA", "Automatisation", "Développement accéléré", "Nouvelles solutions"],
  },
];

export const outils = [
  { groupe: "Développement & création", liste: ["Claude Code", "Terminal", "GitHub", "Vercel", "Netlify", "Supabase", "Firebase", "Lovable", "Framer"] },
  { groupe: "Design & contenu", liste: ["Canva", "CapCut", "Figma", "Création graphique", "Montage vidéo"] },
  { groupe: "Réseaux & communication", liste: ["Instagram", "TikTok", "Création de contenus", "Gestion de comptes", "Promotion de projets"] },
];

export const parcours = [
  {
    type: "Entrepreneuriat",
    lieu: "Mes propres projets",
    periode: "En continu",
    texte:
      "Je complète ma formation en créant mes propres projets, de A à Z : c’est là que j’apprends le plus vite, en conditions réelles, face à de vrais utilisateurs.",
    points: ["MivtsaNow", "GoldenChance", "Achat-revente sur Vinted", "Identités visuelles", "Sites & logiciels", "Communication"],
  },
  {
    type: "Alternance",
    lieu: "Le Silence des Justes",
    periode: "Actuellement",
    texte:
      "Je participe à différents projets de communication et de création digitale. Cette expérience me permet de travailler sur de vrais projets professionnels et de développer ma créativité, mon autonomie et ma capacité à répondre à des besoins concrets.",
    points: [
      "Vidéos et clips",
      "Affiches et supports de communication",
      "Contenu pour les réseaux sociaux",
      "Supports publicitaires",
      "Projets graphiques",
      "Contenus pour des événements",
    ],
  },
  {
    type: "Formation · Bac+2",
    lieu: "Formation No Code — Tifferet Bahourim",
    periode: "En cours",
    texte:
      "Une formation qui couvre tout le cycle d’un projet digital, que je complète par de l’apprentissage personnel et la création de mes propres projets.",
    points: [
      "Sites internet",
      "Logiciels et SaaS",
      "Développement No Code",
      "Bases de données",
      "Intelligence artificielle",
      "Marketing digital & SEO",
      "Business et entrepreneuriat",
      "Recherche et acquisition de clients",
      "Design & communication digitale",
      "Gestion de projets",
    ],
  },
];

export const methode = {
  titre: "J’aime apprendre en créant.",
  texte:
    "Je préfère partir d’une idée et construire progressivement un véritable projet. Mes propres projets me permettent de mettre directement en pratique ce que j’apprends.",
  etapes: [
    { titre: "Le concept", texte: "Réfléchir à l’idée, au besoin et au modèle." },
    { titre: "L’identité", texte: "Nom, logo, couleurs, univers visuel." },
    { titre: "L’interface", texte: "Concevoir des écrans simples et beaux." },
    { titre: "Le produit", texte: "Développer, connecter les outils, tester." },
    { titre: "La mise en ligne", texte: "Déployer le projet pour de vrai." },
    { titre: "La croissance", texte: "Communication, réseaux, acquisition." },
  ],
};

export const objectif = {
  texte:
    "Continuer à développer mes compétences dans le digital, créer mes propres entreprises et projets, accompagner des professionnels dans leurs besoins numériques et construire progressivement un véritable univers entrepreneurial.",
  mots: ["Créer", "Innover", "Progresser"],
};
