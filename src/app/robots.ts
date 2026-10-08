import type { MetadataRoute } from "next";
import { urlSite } from "@/lib/seo";

// Autorise tous les moteurs de recherche et leur indique le plan du site.
export default function robots(): MetadataRoute.Robots {
  return {
    rules: { userAgent: "*", allow: "/" },
    sitemap: `${urlSite}/sitemap.xml`,
    host: urlSite,
  };
}
