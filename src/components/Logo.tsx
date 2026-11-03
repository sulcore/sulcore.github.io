type Props = {
  tone?: "light" | "dark";
  size?: "sm" | "lg";
  tagline?: boolean;
};

// Wordmark: barra (o cursor de quem escreve código) + "Sul" + "Core" + três pontos (processando).
export function Logo({ tone = "light", size = "sm", tagline = false }: Props) {
  const dark = tone === "dark";
  const big = size === "lg";
  return (
    <span className="group inline-flex items-center gap-3" aria-label="SulCore">
      <span
        aria-hidden
        className={`${big ? "h-12 w-[5px]" : "h-7 w-1"} rounded-full ${dark ? "bg-blue-soft" : "bg-blue"}`}
      />
      <span className="flex flex-col leading-none">
        <span className={`${big ? "text-4xl" : "text-[1.35rem]"} relative w-fit font-semibold tracking-[-0.03em]`}>
          <span className={dark ? "text-mist" : "text-ink"}>Sul</span>
          <span className="text-blue">Core</span>
          <span aria-hidden className={`absolute top-0 flex gap-[3px] ${big ? "-right-7" : "-right-[22px]"}`}>
            <i className={`block size-[5px] rounded-full ${dark ? "bg-blue-soft" : "bg-blue"} group-hover:animate-pulse-dot`} />
            <i className="block size-[5px] rounded-full bg-blue-soft/70 group-hover:animate-pulse-dot [animation-delay:.2s]" />
            <i className={`block size-[5px] rounded-full ${dark ? "bg-blue-soft/30" : "bg-blue-pale"} group-hover:animate-pulse-dot [animation-delay:.4s]`} />
          </span>
        </span>
        {tagline && (
          <span className={`label mt-2 !text-[0.6rem] ${dark ? "text-blue-soft" : "text-stone-2"}`}>
            Software development
          </span>
        )}
      </span>
    </span>
  );
}
