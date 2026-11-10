import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { getDict } from "@/content/dictionary";
import { SITE, isLocale } from "@/content/site";
import { Header } from "@/components/Header";
import { Footer } from "@/components/Footer";
import { SectionHead } from "@/components/Section";
import { absoluteUrl, alternates } from "@/lib/seo";
import { signalBadgeUrl } from "@/lib/status";

type Params = Promise<{ locale: string }>;

export async function generateMetadata({ params }: { params: Params }): Promise<Metadata> {
  const { locale } = await params;
  if (!isLocale(locale)) return {};
  const d = getDict(locale);
  return {
    title: d.status.meta,
    description: d.status.lead,
    alternates: { canonical: absoluteUrl(locale, "status/"), languages: alternates("status/") },
  };
}

// Status técnico: só o sinal (passando/falhando, cobertura %, disponibilidade). Ver docs/adr/0010.
export default async function StatusPage({ params }: { params: Params }) {
  const { locale } = await params;
  if (!isLocale(locale)) notFound();
  const d = getDict(locale);
  const s = d.status;
  const alt = `/${locale === "pt" ? "en" : "pt"}/status/`;

  return (
    <>
      <Header dict={d} locale={locale} altPath={alt} />
      <main>
        <section className="relative overflow-hidden">
          <div
            aria-hidden
            className="grid-paper absolute inset-0 [mask-image:linear-gradient(to_bottom,black,transparent)]"
          />
          <div className="relative mx-auto max-w-6xl px-4 pb-14 pt-14 sm:px-6 lg:pt-20">
            <p className="label flex items-center gap-3 text-stone-2">
              <span aria-hidden className="h-4 w-1 rounded-full bg-blue" />
              {s.eyebrow}
            </p>
            <h1 className="mt-6 text-balance text-[clamp(2.1rem,10.5vw,2.6rem)] font-semibold leading-[1.04] tracking-[-0.04em] sm:text-6xl">
              {s.title}
            </h1>
            <p className="mt-6 max-w-2xl text-pretty text-lg leading-relaxed text-fg/75">{s.lead}</p>
          </div>
        </section>

        <section className="mx-auto max-w-6xl px-4 pb-20 sm:px-6">
          <SectionHead eyebrow={s.ciTitle} title={s.ciHeading} lead={s.ciLead} index="01" />
          <ul aria-label={s.ciTitle} className="mt-10 grid gap-4 md:grid-cols-3">
            {s.signals.map(([key, name, body]) => {
              const src = signalBadgeUrl(SITE.status.signal, key, locale);
              return (
                <li key={key} className="rounded-xl bg-paper p-5 ring-1 ring-fg/10">
                  <p className="font-semibold">{name}</p>
                  <div className="mt-3 flex min-h-6 items-center">
                    {src ? (
                      // eslint-disable-next-line @next/next/no-img-element -- badge externo (shields.io), sem otimizador no export estático
                      <img src={src} alt={name} height={20} className="h-5 w-auto" loading="lazy" />
                    ) : (
                      <span className="rounded-md bg-paper-2 px-2.5 py-1 font-mono text-xs text-stone ring-1 ring-fg/10">
                        {s.pending}
                      </span>
                    )}
                  </div>
                  <p className="mt-3 text-sm leading-relaxed text-fg/75">{body}</p>
                </li>
              );
            })}
          </ul>
        </section>

        <section className="border-y border-fg/10 bg-paper-2">
          <div className="mx-auto grid max-w-6xl gap-12 px-4 py-20 sm:px-6 lg:grid-cols-2">
            <div>
              <SectionHead eyebrow={s.uptimeTitle} title={s.uptimeHeading} lead={s.uptimeLead} index="02" />
              {SITE.status.uptime ? (
                <a
                  href={SITE.status.uptime}
                  target="_blank"
                  rel="noopener"
                  className="mt-8 inline-flex h-11 items-center gap-2 whitespace-nowrap rounded-lg bg-cta px-5 text-sm font-medium text-white hover:bg-cta-2"
                >
                  {s.uptimeLink} <span aria-hidden>↗</span>
                </a>
              ) : (
                <p className="mt-8 font-mono text-sm text-stone">{s.pending}</p>
              )}
            </div>
            <div>
              <SectionHead eyebrow={s.hiddenEyebrow} title={s.hiddenTitle} lead={s.hiddenLead} index="03" />
              <ul className="mt-8 grid gap-px overflow-hidden rounded-xl bg-fg/10 ring-1 ring-fg/10 sm:grid-cols-2">
                {s.hidden.map((item) => (
                  <li key={item} className="bg-paper px-4 py-3.5 text-sm">
                    {item}
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </section>
      </main>
      <Footer dict={d} locale={locale} altPath={alt} />
    </>
  );
}
