import type { Dict } from "@/content/dictionary";

// Diagrama em camadas do Nivela, em HTML para ficar nítido e responsivo.
export function Architecture({ arch }: { arch: Dict["nivela"]["arch"] }) {
  return (
    <div className="grid gap-3 lg:grid-cols-[1fr_auto]">
      <div className="space-y-2">
        <Row>
          {arch.surfaces.map((s) => (
            <Chip key={s}>{s}</Chip>
          ))}
        </Row>
        <Connector />
        <Band>{arch.http}</Band>
        <Connector />
        <div className="rounded-xl bg-blue/10 p-3 ring-1 ring-blue/40">
          <p className="label mb-3 !text-[0.58rem] text-blue-soft">{arch.domainLabel}</p>
          <div className="grid grid-cols-2 gap-2 sm:grid-cols-3 lg:grid-cols-6">
            {arch.domain.map((d) => (
              <span
                key={d}
                className="rounded-md bg-ink px-3 py-2 text-center font-mono text-[0.75rem] text-mist ring-1 ring-white/10"
              >
                {d}
              </span>
            ))}
          </div>
        </div>
        <Connector />
        <Band strong>{arch.data}</Band>
      </div>
      <div className="flex flex-col gap-2 lg:w-72">
        {arch.side.map((s) => (
          <span
            key={s}
            className="rounded-lg px-3 py-2.5 font-mono text-[0.72rem] text-mist/70 border border-dashed border-white/15"
          >
            {s}
          </span>
        ))}
        <div className="mt-1 rounded-lg p-3 ring-1 ring-white/10">
          <p className="label mb-2.5 !text-[0.58rem] text-blue-soft">{arch.integrationsLabel}</p>
          <div className="flex flex-wrap gap-1.5">
            {arch.integrations.map((i) => (
              <span key={i} className="rounded bg-white/5 px-2 py-1 font-mono text-[0.68rem] text-mist/75">
                {i}
              </span>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}

function Row({ children }: { children: React.ReactNode }) {
  return <div className="grid grid-cols-2 gap-2 sm:grid-cols-4">{children}</div>;
}

function Chip({ children }: { children: React.ReactNode }) {
  return (
    <span className="rounded-md px-3 py-2 text-center text-[0.78rem] text-mist/85 ring-1 ring-white/15">
      {children}
    </span>
  );
}

function Band({ children, strong }: { children: React.ReactNode; strong?: boolean }) {
  return (
    <div
      className={`rounded-lg px-4 py-2.5 text-center font-mono text-[0.75rem] ${
        strong ? "bg-mist text-ink" : "bg-white/[0.06] text-mist/80 ring-1 ring-white/10"
      }`}
    >
      {children}
    </div>
  );
}

function Connector() {
  return (
    <div aria-hidden className="flex justify-center">
      <span className="h-3 w-px bg-blue-soft/40" />
    </div>
  );
}
