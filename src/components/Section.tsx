type HeadProps = {
  eyebrow: string;
  title: string;
  lead?: string;
  tone?: "light" | "dark";
  index?: string;
};

// Cabeçalho de seção: índice técnico + rótulo, título forte, texto de apoio.
export function SectionHead({ eyebrow, title, lead, tone = "light", index }: HeadProps) {
  const dark = tone === "dark";
  return (
    <div className="reveal max-w-3xl">
      <p className={`label flex items-center gap-3 ${dark ? "text-blue-soft" : "text-blue"}`}>
        {index && <span className={dark ? "text-mist/35" : "text-fg/30"}>{index}</span>}
        <span aria-hidden className={`h-px w-6 ${dark ? "bg-blue-soft/50" : "bg-blue/50"}`} />
        {eyebrow}
      </p>
      <h2
        className={`mt-5 text-balance text-[2rem] font-semibold leading-[1.08] tracking-[-0.03em] sm:text-[2.6rem] ${
          dark ? "text-mist" : "text-fg"
        }`}
      >
        {title}
      </h2>
      {lead && (
        <p className={`mt-5 max-w-2xl text-pretty text-[1.05rem] leading-relaxed ${dark ? "text-mist/70" : "text-fg/70"}`}>
          {lead}
        </p>
      )}
    </div>
  );
}
