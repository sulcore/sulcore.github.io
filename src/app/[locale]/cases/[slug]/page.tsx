import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { getDict } from "@/content/dictionary";
import { CASE_SLUGS, getCase } from "@/content/cases";
import { LOCALES, asset, isLocale } from "@/content/site";
import { Header } from "@/components/Header";
import { Footer } from "@/components/Footer";
import { VideoShowcase } from "@/components/VideoShowcase";
import { Architecture } from "@/components/Architecture";

type Params = Promise<{ locale: string; slug: string }>;

export function generateStaticParams() {
  return LOCALES.flatMap((locale) => CASE_SLUGS.map((slug) => ({ locale, slug })));
}

export async function generateMetadata({ params }: { params: Params }): Promise<Metadata> {
  const { locale, slug } = await params;
  if (!isLocale(locale)) return {};
  const c = getCase(locale, slug);
  if (!c) return {};
  return {
    title: `${c.client} — SulCore`,
    description: c.headline,
    alternates: { languages: { "pt-BR": asset(`/pt/cases/${slug}/`), en: asset(`/en/cases/${slug}/`) } },
  };
}

export default async function CasePage({ params }: { params: Params }) {
  const { locale, slug } = await params;
  if (!isLocale(locale)) notFound();
  const c = getCase(locale, slug);
  if (!c) notFound();
  const d = getDict(locale);
  const alt = `/${locale === "pt" ? "en" : "pt"}/cases/${slug}/`;
  const blocks: [string, string[]][] = [
    [d.casePage.challenge, c.challenge],
    [d.casePage.solution, c.solution],
    [d.casePage.result, c.result],
  ];

  return (
    <>
      <Header dict={d} locale={locale} altPath={alt} />
      <main>
        <section className="bg-ink text-mist">
          <div className="mx-auto max-w-6xl px-4 pb-16 pt-10 sm:px-6 lg:pb-24">
            <Link href={`/${locale}/#cases`} className="text-sm text-mist/60 hover:text-mist">
              ← {d.casePage.back}
            </Link>
            <p className="label mt-12 text-blue-soft">{c.kind}</p>
            <h1 className="mt-4 text-5xl font-semibold tracking-[-0.04em] sm:text-6xl">{c.client}</h1>
            <p className="mt-6 max-w-3xl text-balance text-xl leading-snug text-mist/75 sm:text-2xl">{c.headline}</p>
            {c.link && (
              <a
                href={c.link.href}
                target="_blank"
                rel="noopener"
                className="mt-8 inline-block font-mono text-sm text-blue-soft hover:text-mist"
              >
                {c.link.label} ↗
              </a>
            )}
            {slug === "nivela" && (
              <div className="mt-14 space-y-14">
                <VideoShowcase videos={d.nivela.videos} />
                <div>
                  <p className="label mb-5 text-blue-soft">{d.nivela.archTitle}</p>
                  <Architecture arch={d.nivela.arch} />
                </div>
              </div>
            )}
          </div>
        </section>

        <section className="mx-auto max-w-6xl px-4 py-16 sm:px-6 lg:py-24">
          {c.ready ? (
            <div className="space-y-14">
              {blocks.map(([title, items]) => (
                <div key={title} className="reveal grid gap-6 border-t border-fg/15 pt-8 md:grid-cols-[14rem_1fr]">
                  <h2 className="label text-blue">{title}</h2>
                  <ul className="space-y-4">
                    {items.map((it) => (
                      <li key={it} className="flex gap-3 leading-relaxed text-fg/80">
                        <span aria-hidden className="mt-2.5 size-1.5 shrink-0 rounded-full bg-blue" />
                        {it}
                      </li>
                    ))}
                  </ul>
                </div>
              ))}
              <div className="reveal grid gap-6 border-t border-fg/15 pt-8 md:grid-cols-[14rem_1fr]">
                <h2 className="label text-blue">{d.casePage.stack}</h2>
                <ul className="flex flex-wrap gap-2">
                  {c.stack.map((s) => (
                    <li key={s} className="rounded-md bg-paper-2 px-3 py-1.5 font-mono text-sm ring-1 ring-fg/10">
                      {s}
                    </li>
                  ))}
                </ul>
              </div>
            </div>
          ) : (
            <div className="space-y-4">
              {[d.casePage.challenge, d.casePage.solution, d.casePage.stack, d.casePage.result].map((t) => (
                <div key={t} className="grid gap-4 border-t border-fg/15 pt-6 md:grid-cols-[14rem_1fr]">
                  <h2 className="label text-blue">{t}</h2>
                  <div aria-hidden className="space-y-2">
                    <span className="block h-3 w-4/5 rounded bg-paper-3" />
                    <span className="block h-3 w-3/5 rounded bg-paper-3" />
                  </div>
                </div>
              ))}
              <p className="pt-6 text-stone">{d.casePage.soon}</p>
            </div>
          )}

          <div className="mt-20 flex flex-col items-start gap-5 rounded-2xl bg-paper-2 p-8 ring-1 ring-fg/10 sm:flex-row sm:items-center sm:justify-between">
            <p className="text-xl font-semibold tracking-[-0.02em]">{d.casePage.cta}</p>
            <Link
              href={`/${locale}/#contato`}
              className="inline-flex h-11 items-center gap-2 rounded-lg bg-cta px-5 text-sm font-medium text-white hover:bg-cta-2"
            >
              {d.nav.cta} <span aria-hidden>→</span>
            </Link>
          </div>
        </section>
      </main>
      <Footer dict={d} locale={locale} altPath={alt} />
    </>
  );
}
