// Marca do Repara: o nome e três pontos, as etapas da OS (orçamento, em serviço, pronto).
// O último acende em âmbar. Os pontos são decoração; o nome é o texto.
export function ReparaMark({ className = "" }: { className?: string }) {
  return (
    <span className={`inline-flex items-baseline ${className}`}>
      Repara
      <span aria-hidden className="ml-[0.1em] inline-flex gap-[0.085em]">
        <i className="block size-[0.15em] rounded-full bg-white/25" />
        <i className="block size-[0.15em] rounded-full bg-white/55" />
        <i className="block size-[0.15em] rounded-full bg-repara shadow-[0_0_0.18em_rgb(242_165_65/0.55)]" />
      </span>
    </span>
  );
}
