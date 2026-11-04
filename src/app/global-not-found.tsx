import type { Metadata } from "next";
import { GeistSans } from "geist/font/sans";
import { GeistMono } from "geist/font/mono";
import { Logo } from "@/components/Logo";
import { asset } from "@/content/site";
import { THEME_SCRIPT } from "@/lib/theme-script";
import "./globals.css";

// Página 404 do GitHub Pages: vale para qualquer endereço, então fala os dois idiomas.
export const metadata: Metadata = {
  title: "404 — SulCore",
  robots: { index: false },
  icons: { icon: asset("/favicon.svg") },
};

export default function GlobalNotFound() {
  return (
    <html
      lang="pt-BR"
      data-theme="dark"
      className={`${GeistSans.variable} ${GeistMono.variable}`}
      suppressHydrationWarning
    >
      <head>
        <script dangerouslySetInnerHTML={{ __html: THEME_SCRIPT }} />
      </head>
      <body className="grid min-h-dvh place-items-center px-4">
        <main className="w-full max-w-xl py-16">
          <a href={asset("/pt/")} aria-label="SulCore">
            <Logo />
          </a>
          <p className="mt-14 font-mono text-sm text-stone-2">
            <span className="text-blue">›</span> GET {"<"}rota{">"} <span className="text-stone">→</span> 404 Not Found
          </p>
          <h1 className="mt-6 text-4xl font-semibold tracking-[-0.03em] text-fg sm:text-5xl">Página não encontrada.</h1>
          <p className="mt-3 text-lg text-fg/75" lang="en">
            Page not found.
          </p>
          <p className="mt-8 max-w-md leading-relaxed text-fg/75">
            O endereço pode ter mudado ou nunca ter existido.{" "}
            <span lang="en">The address may have moved or never existed.</span>
          </p>
          <div className="mt-10 flex flex-wrap gap-3">
            <a
              href={asset("/pt/")}
              className="inline-flex h-11 items-center rounded-lg bg-cta px-5 text-sm font-medium text-white hover:bg-cta-2"
            >
              Ir para o início
            </a>
            <a
              href={asset("/en/")}
              lang="en"
              className="inline-flex h-11 items-center rounded-lg px-5 text-sm font-medium text-fg ring-1 ring-fg/20 hover:ring-fg/40"
            >
              Go to the home page
            </a>
          </div>
        </main>
      </body>
    </html>
  );
}
