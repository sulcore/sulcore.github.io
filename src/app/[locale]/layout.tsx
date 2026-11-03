import type { Metadata, Viewport } from "next";
import { notFound } from "next/navigation";
import { GeistSans } from "geist/font/sans";
import { GeistMono } from "geist/font/mono";
import { getDict } from "@/content/dictionary";
import { LOCALES, SITE, asset, isLocale } from "@/content/site";
import { RevealObserver } from "@/components/RevealObserver";
import "../globals.css";

// Roda antes da pintura: aplica o tema salvo (escuro por padrão) e marca que há JS.
const THEME_SCRIPT = `(function(){var d=document.documentElement,t;try{t=localStorage.getItem("theme")}catch(e){}d.dataset.theme=t==="light"?"light":"dark";d.classList.add("js")})()`;

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
    alternates: { languages: { "pt-BR": asset("/pt/"), en: asset("/en/") } },
    openGraph: {
      title: dict.meta.title,
      description: dict.meta.description,
      siteName: "SulCore",
      locale: locale === "pt" ? "pt_BR" : "en_US",
      type: "website",
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
        {children}
        <RevealObserver />
      </body>
    </html>
  );
}
