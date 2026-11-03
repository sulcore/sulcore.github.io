import Link from "next/link";
import type { Dict } from "@/content/dictionary";
import type { Locale } from "@/content/site";
import { Logo } from "./Logo";
import { HomeLink } from "./HomeLink";
import { ThemeToggle } from "./ThemeToggle";

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
    <header className="sticky top-0 z-40 border-b border-fg/10 bg-paper/85 backdrop-blur-md">
      <div className="mx-auto flex h-16 max-w-6xl items-center gap-6 px-4 sm:px-6">
        <HomeLink href={base} label={dict.nav.home} className="shrink-0">
          <Logo />
        </HomeLink>
        <nav className="ml-auto hidden items-center gap-6 text-sm text-fg/70 lg:flex" aria-label="Principal">
          {links.map(([href, label]) => (
            <Link key={href} href={href} className="transition-colors hover:text-fg">
              {label}
            </Link>
          ))}
        </nav>
        <div className="ml-auto flex items-center gap-2 sm:gap-3 lg:ml-0">
          <ThemeToggle labels={dict.nav.theme} />
          <Link
            href={altPath}
            hrefLang={other}
            className="label rounded-md px-2 py-1.5 !text-[0.68rem] text-fg/60 transition-colors hover:text-fg"
          >
            {other.toUpperCase()}
          </Link>
          <Link
            href={`${base}#contato`}
            className="inline-flex h-9 items-center rounded-lg bg-cta px-3.5 text-sm font-medium text-white transition-colors hover:bg-cta-2"
          >
            {dict.nav.cta}
          </Link>
        </div>
      </div>
    </header>
  );
}
