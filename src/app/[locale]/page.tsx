import Link from "next/link";
import { notFound } from "next/navigation";
import { getDict } from "@/content/dictionary";
import { isLocale } from "@/content/site";
import { Header } from "@/components/Header";
import { Footer } from "@/components/Footer";
import { SectionHead } from "@/components/Section";
import { Console } from "@/components/Console";
import { VideoShowcase } from "@/components/VideoShowcase";
import { Architecture } from "@/components/Architecture";
import { ContactComposer } from "@/components/ContactComposer";

export default async function Home({ params }: { params: Promise<{ locale: string }> }) {
  const { locale } = await params;
  if (!isLocale(locale)) notFound();
  const d = getDict(locale);
  const alt = locale === "pt" ? "/en/" : "/pt/";

  return (
    <>
      <Header dict={d} locale={locale} altPath={alt} />
      <main>
        {/* HERO */}
        <section className="relative overflow-hidden">
          <div aria-hidden className="grid-paper absolute inset-0 [mask-image:radial-gradient(ellipse_at_70%_40%,black,transparent_70%)]" />
          <div className="relative mx-auto grid max-w-6xl gap-12 px-4 pb-20 pt-14 sm:px-6 lg:grid-cols-[1.1fr_1fr] lg:items-center lg:gap-12 lg:pb-28 lg:pt-20">
            <div>
              <p className="label flex items-center gap-3 text-stone-2">
                <span aria-hidden className="h-4 w-1 rounded-full bg-blue" />
                {d.hero.eyebrow}
              </p>
              <h1 className="mt-6 text-balance text-[2.6rem] font-semibold leading-[1.02] tracking-[-0.045em] sm:text-6xl lg:text-[3.6rem]">
                <span className="block text-fg">{d.hero.title[0]}</span>
                <span className="block text-blue">{d.hero.title[1]}</span>
              </h1>
              <p className="mt-7 max-w-xl text-pretty text-lg leading-relaxed text-fg/70">{d.hero.lead}</p>
              <div className="mt-9 flex flex-wrap gap-3">
                <a
                  href="#contato"
                  className="inline-flex h-12 items-center gap-2 rounded-lg bg-cta px-5 font-medium text-white transition-colors hover:bg-cta-2"
                >
                  {d.hero.primary} <span aria-hidden>→</span>
                </a>
                <a
                  href="#cases"
                  className="inline-flex h-12 items-center rounded-lg px-5 font-medium text-fg ring-1 ring-fg/20 transition hover:bg-fg/5 hover:ring-fg/40"
                >
                  {d.hero.secondary}
                </a>
              </div>
              <dl className="mt-12 flex flex-wrap gap-x-10 gap-y-4 border-t border-fg/10 pt-6">
                {d.hero.proof.map(([k, v]) => (
                  <div key={k}>
                    <dt className="font-mono text-sm font-medium text-fg">{k}</dt>
                    <dd className="mt-1 text-sm text-stone">{v}</dd>
                  </div>
                ))}
              </dl>
            </div>
            <Console copy={d.console} />
          </div>
        </section>

        {/* ORIGEM / PROBLEMA */}
        <section className="border-y border-fg/10 bg-paper-2">
          <div className="mx-auto grid max-w-6xl gap-12 px-4 py-20 sm:px-6 lg:grid-cols-[0.9fr_1.1fr] lg:py-28">
            <div>
              <SectionHead eyebrow={d.problem.eyebrow} title={d.problem.title} index="00" />
              <p className="reveal mt-6 max-w-xl text-pretty leading-relaxed text-fg/70">{d.problem.body}</p>
            </div>
            <div className="reveal self-end overflow-hidden rounded-2xl bg-paper ring-1 ring-fg/10">
              <div className="grid grid-cols-2 border-b border-fg/10">
                <p className="label px-4 py-3 !text-[0.6rem] text-stone-2 sm:px-5">{d.problem.columns.left}</p>
                <p className="label border-l border-fg/10 px-4 py-3 !text-[0.6rem] text-blue sm:px-5">{d.problem.columns.right}</p>
              </div>
              {d.problem.rows.map(([bad, good]) => (
                <div key={bad} className="grid grid-cols-2 border-b border-fg/10 last:border-b-0">
                  <p className="px-4 py-4 text-sm leading-snug text-stone sm:px-5">{bad}</p>
                  <p className="flex gap-2 border-l border-fg/10 px-4 py-4 text-sm font-medium leading-snug text-fg sm:px-5">
                    <span aria-hidden className="mt-1.5 h-2 w-1 shrink-0 rounded-full bg-blue" />
                    {good}
                  </p>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* SERVIÇOS */}
        <section id="servicos" className="scroll-mt-16">
          <div className="mx-auto max-w-6xl px-4 py-20 sm:px-6 lg:py-28">
            <SectionHead eyebrow={d.services.eyebrow} title={d.services.title} lead={d.services.lead} index="01" />
            <div className="mt-14 border-t border-fg/15">
              {d.services.groups.map((g) => (
                <article
                  key={g.id}
                  className="reveal group grid gap-5 border-b border-fg/15 py-9 md:grid-cols-[5rem_1fr_1.3fr] md:gap-8"
                >
                  <span className="font-mono text-sm text-fg/35 transition-colors group-hover:text-blue">{g.id}</span>
                  <div>
                    <h3 className="text-2xl font-semibold tracking-[-0.02em]">{g.name}</h3>
                    <p className="mt-2 text-fg/60">{g.summary}</p>
                  </div>
                  <ul className="space-y-2.5">
                    {g.items.map((it) => (
                      <li key={it} className="flex gap-3 text-[0.95rem] leading-snug text-fg/80">
                        <span aria-hidden className="mt-2 size-1.5 shrink-0 rounded-full bg-blue" />
                        {it}
                      </li>
                    ))}
                  </ul>
                </article>
              ))}
            </div>
          </div>
        </section>

        {/* CASE NIVELA */}
        <section id="nivela" className="relative scroll-mt-16 bg-ink text-mist">
          <div aria-hidden className="grid-ink absolute inset-0 [mask-image:linear-gradient(to_bottom,black,transparent_60%)]" />
          <div className="relative mx-auto max-w-6xl px-4 py-20 sm:px-6 lg:py-28">
            <SectionHead eyebrow={d.nivela.eyebrow} title={d.nivela.title} lead={d.nivela.lead} tone="dark" index="02" />
            <dl className="reveal mt-12 grid grid-cols-2 gap-px overflow-hidden rounded-xl bg-white/10 ring-1 ring-white/10 sm:grid-cols-3 lg:grid-cols-5">
              {d.nivela.stats.map(([n, l]) => (
                <div key={l} className="bg-ink px-4 py-5 sm:px-5">
                  <dt className="font-mono text-2xl font-medium tracking-tight text-mist sm:text-3xl">{n}</dt>
                  <dd className="mt-1.5 text-xs leading-snug text-mist/55">{l}</dd>
                </div>
              ))}
            </dl>
            <div className="mt-14 grid gap-10 lg:grid-cols-[1.45fr_1fr] lg:gap-12">
              <div className="reveal">
                <VideoShowcase videos={d.nivela.videos} />
              </div>
              <ul className="reveal space-y-5 self-center">
                {d.nivela.highlights.map(([t, body]) => (
                  <li key={t} className="border-l-2 border-blue/60 pl-4">
                    <p className="font-medium text-mist">{t}</p>
                    <p className="mt-1 text-sm leading-relaxed text-mist/60">{body}</p>
                  </li>
                ))}
              </ul>
            </div>
            <div className="reveal mt-16">
              <p className="label mb-5 text-blue-soft">{d.nivela.archTitle}</p>
              <Architecture arch={d.nivela.arch} />
            </div>
            <div className="reveal mt-12 flex flex-wrap gap-3">
              <Link
                href={`/${locale}/cases/nivela/`}
                className="inline-flex h-11 items-center gap-2 rounded-lg bg-mist px-5 text-sm font-medium text-ink transition-colors hover:bg-white"
              >
                {d.nivela.link} <span aria-hidden>→</span>
              </Link>
              <a
                href="https://www.nivelaerp.com.br/"
                target="_blank"
                rel="noopener"
                className="inline-flex h-11 items-center rounded-lg px-5 text-sm text-mist/80 ring-1 ring-white/20 transition hover:text-mist hover:ring-white/40"
              >
                {d.nivela.visit} ↗
              </a>
            </div>
          </div>
        </section>

        {/* IA APLICADA */}
        <section id="ia" className="scroll-mt-16">
          <div className="mx-auto max-w-6xl px-4 py-20 sm:px-6 lg:py-28">
            <SectionHead eyebrow={d.ai.eyebrow} title={d.ai.title} lead={d.ai.lead} index="03" />
            <ol className="mt-14 grid gap-px overflow-hidden rounded-2xl bg-fg/10 ring-1 ring-fg/10 md:grid-cols-5">
              {d.ai.steps.map(([t, body], i) => (
                <li key={t} className="reveal relative bg-paper p-5 lg:p-6" style={{ transitionDelay: `${i * 70}ms` }}>
                  <span className="font-mono text-xs text-blue">{String(i + 1).padStart(2, "0")}</span>
                  <h3 className="mt-3 text-lg font-semibold tracking-[-0.01em]">{t}</h3>
                  <p className="mt-2 text-sm leading-relaxed text-fg/65">{body}</p>
                  {i === 3 && <span className="label absolute right-4 top-5 !text-[0.55rem] text-blue">{d.ai.human}</span>}
                </li>
              ))}
            </ol>
            <div className="reveal mt-8 grid gap-6 rounded-2xl bg-ink p-6 text-mist sm:p-8 md:grid-cols-[1fr_1.6fr] md:items-start">
              <p className="text-lg font-medium leading-snug">{d.ai.guardsTitle}</p>
              <ul className="grid gap-x-6 gap-y-3 sm:grid-cols-2">
                {d.ai.guards.map((g) => (
                  <li key={g} className="flex gap-2.5 text-sm text-mist/80">
                    <span aria-hidden className="mt-1.5 size-1.5 shrink-0 rounded-full bg-blue-soft" />
                    {g}
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </section>

        {/* PROCESSO */}
        <section id="processo" className="scroll-mt-16 border-y border-fg/10 bg-paper-2">
          <div className="mx-auto max-w-6xl px-4 py-20 sm:px-6 lg:py-28">
            <SectionHead eyebrow={d.process.eyebrow} title={d.process.title} lead={d.process.lead} index="04" />
            <ol className="relative mt-14 grid gap-0 lg:grid-cols-7">
              <span aria-hidden className="absolute left-[7px] top-2 bottom-2 w-px bg-fg/15 lg:left-2 lg:right-2 lg:top-[7px] lg:bottom-auto lg:h-px lg:w-auto" />
              {d.process.stages.map(([t, body], i) => (
                <li key={t} className="reveal relative pb-8 pl-9 lg:pb-0 lg:pl-0 lg:pr-4" style={{ transitionDelay: `${i * 60}ms` }}>
                  <span
                    aria-hidden
                    className={`absolute left-0 top-0.5 size-[15px] rounded-full ring-4 ring-paper-2 lg:static lg:block ${
                      i === d.process.stages.length - 1 ? "bg-ok" : "bg-blue"
                    }`}
                  />
                  <p className="font-mono text-xs text-fg/40 lg:mt-5">{String(i + 1).padStart(2, "0")}</p>
                  <h3 className="mt-1.5 font-semibold">{t}</h3>
                  <p className="mt-1.5 text-sm leading-relaxed text-fg/65">{body}</p>
                </li>
              ))}
            </ol>
            <div className="reveal mt-16 grid gap-6 border-t border-fg/15 pt-10 md:grid-cols-[1fr_2fr]">
              <p className="text-xl font-semibold tracking-[-0.02em]">{d.process.docsTitle}</p>
              <ul className="grid gap-px overflow-hidden rounded-xl bg-fg/10 ring-1 ring-fg/10 sm:grid-cols-2 lg:grid-cols-3">
                {d.process.docs.map((doc, i) => (
                  <li key={doc} className="flex items-center gap-3 bg-paper px-4 py-3.5 text-sm">
                    <span className="font-mono text-[0.7rem] text-blue">{`/${String(i + 1).padStart(2, "0")}`}</span>
                    {doc}
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </section>

        {/* CASES */}
        <section id="cases" className="scroll-mt-16">
          <div className="mx-auto max-w-6xl px-4 py-20 sm:px-6 lg:py-28">
            <SectionHead eyebrow={d.cases.eyebrow} title={d.cases.title} index="05" />
            <div className="mt-12 grid gap-5 md:grid-cols-2">
              {d.cases.items.map((c, i) => (
                <Link
                  key={c.slug}
                  href={`/${locale}/cases/${c.slug}/`}
                  className={`reveal group flex flex-col rounded-2xl p-7 transition sm:p-8 ${
                    i === 0 ? "bg-ink text-mist hover:bg-ink-2" : "bg-paper-2 ring-1 ring-fg/10 hover:ring-fg/25"
                  }`}
                >
                  <div className="flex items-center justify-between gap-4">
                    <span className={`label !text-[0.6rem] ${i === 0 ? "text-blue-soft" : "text-stone-2"}`}>{c.kind}</span>
                    <span
                      className={`flex items-center gap-1.5 text-xs ${i === 0 ? "text-[#7fd1ab]" : "text-stone"}`}
                    >
                      <span aria-hidden className={`size-1.5 rounded-full ${i === 0 ? "bg-[#7fd1ab]" : "bg-stone-2"}`} />
                      {c.status}
                    </span>
                  </div>
                  <h3 className="mt-10 text-3xl font-semibold tracking-[-0.03em]">{c.client}</h3>
                  <p className={`mt-3 leading-relaxed ${i === 0 ? "text-mist/70" : "text-fg/65"}`}>{c.summary}</p>
                  <div className="mt-8 flex flex-wrap items-end justify-between gap-4">
                    <ul className="flex flex-wrap gap-1.5">
                      {c.tags.map((t) => (
                        <li
                          key={t}
                          className={`rounded px-2 py-1 font-mono text-[0.68rem] ${
                            i === 0 ? "bg-white/[0.07] text-mist/70" : "bg-paper text-fg/60"
                          }`}
                        >
                          {t}
                        </li>
                      ))}
                    </ul>
                    <span className={`text-sm font-medium ${i === 0 ? "text-mist" : "text-fg"}`}>
                      {d.cases.open} <span aria-hidden className="inline-block transition-transform group-hover:translate-x-1">→</span>
                    </span>
                  </div>
                </Link>
              ))}
            </div>
          </div>
        </section>

        {/* EQUIPE */}
        <section id="equipe" className="scroll-mt-16 border-t border-fg/10">
          <div className="mx-auto grid max-w-6xl gap-12 px-4 py-20 sm:px-6 lg:grid-cols-[0.8fr_1.2fr] lg:py-28">
            <SectionHead eyebrow={d.team.eyebrow} title={d.team.title} lead={d.team.lead} index="06" />
            <div className="grid gap-5 sm:grid-cols-2">
              {d.team.people.map((p) => (
                <article key={p.name} className="reveal rounded-2xl bg-paper-2 p-6 ring-1 ring-fg/10">
                  <div className="flex items-center gap-4">
                    <span className="grid size-12 place-items-center rounded-xl bg-ink font-mono text-sm font-medium text-mist">
                      {p.initials}
                    </span>
                    <div>
                      <h3 className="font-semibold">{p.name}</h3>
                      <p className="text-sm text-stone">{p.role}</p>
                    </div>
                  </div>
                  <p className="mt-5 text-sm leading-relaxed text-fg/70">{p.bio}</p>
                </article>
              ))}
            </div>
          </div>
        </section>

        {/* CONTATO */}
        <section id="contato" className="scroll-mt-16 bg-ink text-mist">
          <div className="mx-auto grid max-w-6xl gap-12 px-4 py-20 sm:px-6 lg:grid-cols-[0.9fr_1.1fr] lg:py-28">
            <div>
              <SectionHead eyebrow={d.contact.eyebrow} title={d.contact.title} lead={d.contact.lead} tone="dark" index="07" />
              <p className="reveal mt-8 max-w-md text-sm leading-relaxed text-mist/50">{d.contact.base}</p>
            </div>
            <div className="reveal rounded-2xl bg-ink-2 p-6 ring-1 ring-white/10 sm:p-8">
              <ContactComposer copy={d.contact} />
            </div>
          </div>
        </section>
      </main>
      <Footer dict={d} locale={locale} altPath={alt} />
    </>
  );
}
