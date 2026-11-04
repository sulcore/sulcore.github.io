import { CASE_SLUGS } from "@/content/cases";
import { LOCALES, SITE, type Locale } from "@/content/site";

// Caminhos públicos do site (sem o prefixo do Pages), na ordem em que aparecem no sitemap.
export function sitePaths(): string[] {
  return ["", ...CASE_SLUGS.map((slug) => `cases/${slug}/`)];
}

export function absoluteUrl(locale: Locale, path = ""): string {
  const base = (process.env.NEXT_PUBLIC_BASE_PATH ?? "").replace(/\/$/, "");
  return `${SITE.url}${base}/${locale}/${path}`;
}

export function alternates(path = ""): Record<string, string> {
  return {
    "pt-BR": absoluteUrl("pt", path),
    en: absoluteUrl("en", path),
    "x-default": absoluteUrl("pt", path),
  };
}

// Dados estruturados (schema.org) da empresa, para buscadores.
export function organizationJsonLd(locale: Locale, description: string) {
  return {
    "@context": "https://schema.org",
    "@type": "Organization",
    name: "SulCore",
    url: absoluteUrl(locale),
    logo: `${SITE.url}${process.env.NEXT_PUBLIC_BASE_PATH ?? ""}/favicon.svg`,
    description,
    sameAs: [SITE.repo],
    address: { "@type": "PostalAddress", addressLocality: "Novo Hamburgo", addressRegion: "RS", addressCountry: "BR" },
    areaServed: "Worldwide",
    knowsLanguage: LOCALES.map((l) => (l === "pt" ? "pt-BR" : "en")),
    contactPoint: {
      "@type": "ContactPoint",
      contactType: "sales",
      url: `https://wa.me/${SITE.whatsapp}`,
      availableLanguage: ["Portuguese", "English"],
    },
  };
}
