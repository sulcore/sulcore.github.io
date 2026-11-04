import Link from "next/link";
import type { Dict } from "@/content/dictionary";
import { SITE, type Locale } from "@/content/site";
import { Logo } from "./Logo";
import { HomeLink } from "./HomeLink";

export function Footer({ dict, locale, altPath }: { dict: Dict; locale: Locale; altPath: string }) {
  return (
    <footer className="bg-ink text-mist/70">
      <div className="mx-auto flex max-w-6xl flex-col gap-8 border-t border-white/10 px-4 py-12 sm:px-6 md:flex-row md:items-end md:justify-between">
        <div>
          <HomeLink href={`/${locale}/`} className="inline-block">
            <Logo tone="dark" tagline />
          </HomeLink>
          <p className="mt-5 font-mono text-xs text-mist/65">{SITE.base}</p>
        </div>
        <div className="flex flex-col gap-2 text-sm md:items-end">
          {SITE.email && (
            <a href={`mailto:${SITE.email}`} className="hover:text-mist">
              {SITE.email}
            </a>
          )}
          <a href={SITE.repo} target="_blank" rel="noopener" className="font-mono text-xs hover:text-mist">
            {dict.footer.source} ↗
          </a>
          <Link href={altPath} hrefLang={locale === "pt" ? "en" : "pt"} className="hover:text-mist">
            {dict.footer.language}
          </Link>
          <p className="font-mono text-xs text-mist/60">
            © {new Date().getFullYear()} SulCore · {dict.footer.rights}
          </p>
        </div>
      </div>
    </footer>
  );
}
