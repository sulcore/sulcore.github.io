import type { MetadataRoute } from "next";
import { LOCALES } from "@/content/site";
import { absoluteUrl, alternates, sitePaths } from "@/lib/seo";

export const dynamic = "force-static";

// Uma entrada por página e idioma, cada uma apontando para a versão no outro idioma.
export default function sitemap(): MetadataRoute.Sitemap {
  return sitePaths().flatMap((path) =>
    LOCALES.map((locale) => ({
      url: absoluteUrl(locale, path),
      changeFrequency: "monthly" as const,
      priority: path === "" ? 1 : 0.7,
      alternates: { languages: alternates(path) },
    })),
  );
}
