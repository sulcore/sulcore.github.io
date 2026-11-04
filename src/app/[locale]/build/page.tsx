import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { getDict } from "@/content/dictionary";
import { SITE, isLocale, type Locale } from "@/content/site";
import { Header } from "@/components/Header";
import { Footer } from "@/components/Footer";
import { SectionHead } from "@/components/Section";
import { readBuildMetrics, type BuildMetrics } from "@/lib/build-metrics";
import { absoluteUrl, alternates } from "@/lib/seo";

type Params = Promise<{ locale: string }>;

export async function generateMetadata({ params }: { params: Params }): Promise<Metadata> {
  const { locale } = await params;
  if (!isLocale(locale)) return {};
  const d = getDict(locale);
  return {
    title: d.build.meta,
    description: d.build.lead,
    alternates: { canonical: absoluteUrl(locale, "build/"), languages: alternates("build/") },
  };
}

const pct = (n: number) => Math.round(n * 100);

function formatDate(iso: string, locale: Locale) {
  return new Intl.DateTimeFormat(locale === "pt" ? "pt-BR" : "en", {
    dateStyle: "medium",
    timeStyle: "short",
    timeZone: "America/Sao_Paulo",
  }).format(new Date(iso));
}

export default async function BuildPage({ params }: { params: Params }) {
  const { locale } = await params;
  if (!isLocale(locale)) notFound();
  const d = getDict(locale);
  const b = d.build;
  const m = readBuildMetrics();
  const alt = `/${locale === "pt" ? "en" : "pt"}/build/`;
  const home = m?.lighthouse?.find((r) => r.path.endsWith(`/${locale}/`)) ?? m?.lighthouse?.[0];
  const dash = "—";

  const stats: [string, string][] = [
    [m?.tests.unit ? `${m.tests.unit.passed}/${m.tests.unit.total}` : dash, b.stats.unit],
    [m?.tests.e2e ? String(m.tests.e2e.total) : dash, b.stats.e2e],
    [m?.tests.e2e ? String(m.tests.e2e.accessibility) : dash, b.stats.a11y],
    [m ? String(m.dependencies.runtime) : dash, b.stats.deps],
    [home ? `${home.transferKB} KB` : dash, b.stats.weight],
    [home ? `${(home.lcpMs / 1000).toFixed(1).replace(".", locale === "pt" ? "," : ".")} s` : dash, b.stats.lcp],
  ];

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
              {b.eyebrow}
            </p>
            <h1 className="mt-6 text-balance text-[2.6rem] font-semibold leading-[1.04] tracking-[-0.04em] sm:text-6xl">
              {b.title}
            </h1>
            <p className="mt-6 max-w-2xl text-pretty text-lg leading-relaxed text-fg/75">{b.lead}</p>
            <Provenance m={m} locale={locale} labels={b} />
          </div>
        </section>

        <section className="mx-auto max-w-6xl px-4 sm:px-6">
          <dl
            aria-label={b.statsLabel}
            className="grid grid-cols-2 gap-px overflow-hidden rounded-xl bg-fg/10 ring-1 ring-fg/10 sm:grid-cols-3"
          >
            {stats.map(([value, label]) => (
              <div key={label} className="bg-paper px-5 py-6">
                <dt className="font-mono text-3xl font-medium tracking-tight">{value}</dt>
                <dd className="mt-2 text-sm leading-snug text-fg/75">{label}</dd>
              </div>
            ))}
          </dl>
        </section>

        <section className="mx-auto max-w-6xl px-4 py-20 sm:px-6">
          <SectionHead eyebrow={b.lighthouseTitle} title={b.lighthouseHeading} lead={b.lighthouseLead} index="01" />
          {m?.lighthouse ? (
            <div
              className="mt-10 overflow-x-auto rounded-xl ring-1 ring-fg/10"
              role="region"
              aria-label={b.lighthouseTitle}
              tabIndex={0}
            >
              <table className="w-full min-w-[34rem] text-left text-sm">
                <thead className="bg-paper-2">
                  <tr>
                    <th scope="col" className="label px-4 py-3 !text-[0.62rem] font-normal text-stone-2">
                      URL
                    </th>
                    {(["performance", "accessibility", "bestPractices", "seo"] as const).map((k) => (
                      <th key={k} scope="col" className="label px-4 py-3 !text-[0.62rem] font-normal text-stone-2">
                        {b.categories[k]}
                      </th>
                    ))}
                  </tr>
                </thead>
                <tbody>
                  {m.lighthouse.map((r) => (
                    <tr key={r.path} className="border-t border-fg/10">
                      <th scope="row" className="px-4 py-4 font-mono text-[0.8rem] font-normal">
                        {r.path}
                      </th>
                      {[r.performance, r.accessibility, r.bestPractices, r.seo].map((score, i) => (
                        <td key={i} className="px-4 py-4">
                          <Score value={pct(score)} />
                        </td>
                      ))}
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          ) : (
            <p className="mt-10 font-mono text-sm text-stone">{b.pending}</p>
          )}
        </section>

        <section className="border-y border-fg/10 bg-paper-2">
          <div className="mx-auto grid max-w-6xl gap-12 px-4 py-20 sm:px-6 lg:grid-cols-2">
            <div>
              <SectionHead eyebrow={b.pipelineTitle} title={b.pipelineHeading} lead={b.pipelineLead} index="02" />
              <ul className="mt-10 space-y-3">
                {(m?.workflows ?? []).map((w) => {
                  const file = w.file.split("/").pop() ?? w.file;
                  return (
                    <li key={file} className="rounded-xl bg-paper p-5 ring-1 ring-fg/10">
                      <a
                        href={`${SITE.repo}/actions/workflows/${file}`}
                        target="_blank"
                        rel="noopener"
                        className="flex items-baseline justify-between gap-4 hover:text-blue"
                      >
                        <span className="font-semibold">{w.name}</span>
                        <span className="font-mono text-xs text-stone">{file} ↗</span>
                      </a>
                      <p className="mt-2 text-sm leading-relaxed text-fg/75">{b.workflows[file] ?? ""}</p>
                    </li>
                  );
                })}
              </ul>
            </div>
            <div>
              <SectionHead eyebrow={b.adrTitle} title={b.adrHeading} lead={b.adrLead} index="03" />
              <ol className="mt-10 divide-y divide-fg/10 rounded-xl bg-paper ring-1 ring-fg/10">
                {(m?.adrs ?? []).map((a) => (
                  <li key={a.n}>
                    <a
                      href={`${SITE.repo}/blob/main/${a.file}`}
                      target="_blank"
                      rel="noopener"
                      className="flex gap-4 px-5 py-3.5 text-sm hover:text-blue"
                    >
                      <span className="font-mono text-stone">{a.n}</span>
                      <span>{a.title}</span>
                    </a>
                  </li>
                ))}
              </ol>
            </div>
          </div>
        </section>

        <section className="mx-auto grid max-w-6xl gap-10 px-4 py-20 sm:px-6 md:grid-cols-2">
          <div>
            <h2 className="label text-blue">{b.stackTitle}</h2>
            <ul className="mt-5 flex flex-wrap gap-2">
              {m &&
                Object.entries(m.versions).map(([name, v]) => (
                  <li key={name} className="rounded-md bg-paper-2 px-3 py-1.5 font-mono text-sm ring-1 ring-fg/10">
                    {name} {v ?? dash}
                  </li>
                ))}
            </ul>
          </div>
          <div>
            <h2 className="label text-blue">{b.codeTitle}</h2>
            <p className="mt-5 text-fg/75">{m ? b.codeLines(m.code.srcLines, m.code.testLines) : dash}</p>
            <a
              href={SITE.repo}
              target="_blank"
              rel="noopener"
              className="mt-6 inline-flex h-11 items-center gap-2 rounded-lg bg-cta px-5 text-sm font-medium text-white hover:bg-cta-2"
            >
              {b.source} <span aria-hidden>↗</span>
            </a>
          </div>
        </section>
      </main>
      <Footer dict={d} locale={locale} altPath={alt} />
    </>
  );
}

function Provenance({
  m,
  locale,
  labels,
}: {
  m: BuildMetrics | null;
  locale: Locale;
  labels: { commit: string; generated: string; pending: string };
}) {
  if (!m) return <p className="mt-8 font-mono text-sm text-stone">{labels.pending}</p>;
  return (
    <dl className="mt-8 flex flex-wrap gap-x-8 gap-y-2 font-mono text-sm">
      {m.commit && (
        <div className="flex gap-2">
          <dt className="text-stone">{labels.commit}</dt>
          <dd>
            <a href={m.commit.url} target="_blank" rel="noopener" className="text-blue hover:underline">
              {m.commit.sha.slice(0, 7)}
            </a>
          </dd>
        </div>
      )}
      <div className="flex gap-2">
        <dt className="text-stone">{labels.generated}</dt>
        <dd>{formatDate(m.generatedAt, locale)}</dd>
      </div>
    </dl>
  );
}

function Score({ value }: { value: number }) {
  const tone = value >= 90 ? "bg-ok" : value >= 50 ? "bg-[#c9932b]" : "bg-[#c2453d]";
  return (
    <span className="flex items-center gap-3">
      <span className="w-8 font-mono text-[0.95rem] tabular-nums">{value}</span>
      <span aria-hidden className="h-1.5 w-16 overflow-hidden rounded-full bg-fg/10">
        <span className={`block h-full ${tone}`} style={{ width: `${value}%` }} />
      </span>
    </span>
  );
}
