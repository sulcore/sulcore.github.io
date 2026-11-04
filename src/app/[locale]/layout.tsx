import type { Metadata, Viewport } from "next";
import { notFound } from "next/navigation";
import { GeistSans } from "geist/font/sans";
import { GeistMono } from "geist/font/mono";
import { getDict } from "@/content/dictionary";
import { LOCALES, SITE, asset, isLocale } from "@/content/site";
import { RevealObserver } from "@/components/RevealObserver";
import { THEME_SCRIPT } from "@/lib/theme-script";
import { absoluteUrl, alternates, organizationJsonLd } from "@/lib/seo";
import "../globals.css";

export function generateStaticParams() {
  return LOCALES.map((locale) => ({ locale }));
}

export async function generateMetadata({ params }: { params: Promise<{ locale: string }> }): Promise<Metadata> {
  const { locale } = await params;
  if (!isLocale(locale)) return {};
  const dict = getDict(locale);
  return {
    metadataBase: new URL(SITE.url),
    title: dict.meta.title,
    description: dict.meta.description,
    icons: { icon: asset("/favicon.svg") },
    alternates: { canonical: absoluteUrl(locale), languages: alternates() },
    openGraph: {
      title: dict.meta.title,
      description: dict.meta.description,
      url: absoluteUrl(locale),
      siteName: "SulCore",
      locale: locale === "pt" ? "pt_BR" : "en_US",
      alternateLocale: locale === "pt" ? "en_US" : "pt_BR",
      type: "website",
      images: [{ url: absoluteUrl(locale, "og.png"), width: 1200, height: 630, alt: "SulCore — software development" }],
    },
    twitter: {
      card: "summary_large_image",
      title: dict.meta.title,
      description: dict.meta.description,
      images: [absoluteUrl(locale, "og.png")],
    },
  };
}

export const viewport: Viewport = { themeColor: "#062b52" };

export default async function LocaleLayout({
  children,
  params,
}: {
  children: React.ReactNode;
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;
  if (!isLocale(locale)) notFound();
  return (
    <html
      lang={locale === "pt" ? "pt-BR" : "en"}
      data-theme="dark"
      className={`${GeistSans.variable} ${GeistMono.variable}`}
      suppressHydrationWarning
    >
      <head>
        <script dangerouslySetInnerHTML={{ __html: THEME_SCRIPT }} />
      </head>
      <body className="min-h-dvh overflow-x-clip">
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify(organizationJsonLd(locale, getDict(locale).meta.description)),
          }}
        />
        {children}
        <RevealObserver />
      </body>
    </html>
  );
}
