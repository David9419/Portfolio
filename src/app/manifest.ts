import type { MetadataRoute } from "next";
import { seo } from "@/lib/seo";

// Permet d'ajouter le site sur l'écran d'accueil du téléphone, avec le bon nom et les bonnes couleurs.
export default function manifest(): MetadataRoute.Manifest {
  return {
    name: seo.titreCourt,
    short_name: "David Baron",
    description: seo.description,
    start_url: "/",
    display: "standalone",
    background_color: "#050a14",
    theme_color: "#050a14",
    lang: "fr",
    icons: [
      { src: "/icon.svg", sizes: "any", type: "image/svg+xml" },
      { src: "/apple-icon", sizes: "180x180", type: "image/png" },
    ],
  };
}
