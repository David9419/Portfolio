import type { MetadataRoute } from "next";
import { urlSite } from "@/lib/seo";

// Plan du site envoyé à Google : la page d'accueil et ses images principales.
export default function sitemap(): MetadataRoute.Sitemap {
  return [
    {
      url: urlSite,
      lastModified: new Date(),
      changeFrequency: "monthly",
      priority: 1,
      images: [
        `${urlSite}/opengraph-image`,
        `${urlSite}/projets/mivtsanow.jpg`,
        `${urlSite}/projets/goldenchance.jpg`,
        `${urlSite}/projets/myprivatetrip.jpg`,
      ],
    },
  ];
}
