import Link from "next/link";
import type { Dict } from "@/content/dictionary";
import type { Locale } from "@/content/site";
import { Logo } from "./Logo";

export function Header({ dict, locale, altPath }: { dict: Dict; locale: Locale; altPath: string }) {
  const base = `/${locale}/`;
  const links: [string, string][] = [
    [`${base}#servicos`, dict.nav.services],
    [`${base}#cases`, dict.nav.cases],
    [`${base}#ia`, dict.nav.ai],
    [`${base}#processo`, dict.nav.process],
    [`${base}#equipe`, dict.nav.team],
  ];
  const other = locale === "pt" ? "en" : "pt";
  return (
    <header className="sticky top-0 z-40 border-b border-ink/10 bg-paper/85 backdrop-blur-md">
      <div className="mx-auto flex h-16 max-w-6xl items-center gap-6 px-4 sm:px-6">
        <Link href={base} className="shrink-0" aria-label="SulCore — início">
          <Logo />
        </Link>
        <nav className="ml-auto hidden items-center gap-6 text-sm text-ink/70 lg:flex" aria-label="Principal">
          {links.map(([href, label]) => (
            <a key={href} href={href} className="transition-colors hover:text-ink">
              {label}
            </a>
          ))}
        </nav>
        <div className="ml-auto flex items-center gap-3 lg:ml-0">
          <Link
            href={altPath}
            hrefLang={other}
            className="label rounded-md px-2 py-1.5 !text-[0.68rem] text-ink/60 transition-colors hover:text-ink"
          >
            {other.toUpperCase()}
          </Link>
          <a
            href={`${base}#contato`}
            className="inline-flex h-9 items-center rounded-lg bg-ink px-3.5 text-sm font-medium text-mist transition-colors hover:bg-ink-2"
          >
            {dict.nav.cta}
          </a>
        </div>
      </div>
    </header>
  );
}
