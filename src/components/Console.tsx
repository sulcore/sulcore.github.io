"use client";

import { useEffect, useRef, useState } from "react";
import type { Dict } from "@/content/dictionary";
import { finalState, initialState, select, step, view, type ConsoleState } from "@/lib/console-machine";

type Copy = Dict["console"];

export function Console({ copy }: { copy: Copy }) {
  const [state, setState] = useState<ConsoleState>(initialState);
  const [reduced, setReduced] = useState(false);
  const [visible, setVisible] = useState(true);
  const root = useRef<HTMLDivElement>(null);

  const scenario = copy.scenarios[state.index];

  useEffect(() => {
    const mq = window.matchMedia("(prefers-reduced-motion: reduce)");
    setReduced(mq.matches);
    const el = root.current;
    if (!el || !("IntersectionObserver" in window)) return;
    const io = new IntersectionObserver(([e]) => setVisible(e.isIntersecting), { threshold: 0.2 });
    io.observe(el);
    return () => io.disconnect();
  }, []);

  useEffect(() => {
    if (reduced) {
      const end = finalState(state.index, scenario);
      if (end.phase !== state.phase || end.chars !== state.chars) setState(end);
      return;
    }
    if (!visible) return;
    const { next, delay } = step(state, scenario, copy.scenarios.length);
    const t = setTimeout(() => setState(next), delay);
    return () => clearTimeout(t);
  }, [state, scenario, visible, reduced, copy.scenarios.length]);

  const { typed, typing, thinking, showProposal, checksShown, confirming, done } = view(state, scenario);
  const index = state.index;
  const choose = (i: number) => setState(select(i));

  return (
    <div ref={root} className="relative">
      <div className="overflow-hidden rounded-2xl bg-ink text-mist shadow-[0_40px_80px_-30px_rgb(6_43_82/0.55)] ring-1 ring-ink">
        {/* janela */}
        <div className="flex items-center gap-3 border-b border-white/10 px-4 py-3">
          <span aria-hidden className="flex gap-1.5">
            <i className="block size-2.5 rounded-full bg-blue" />
            <i className="block size-2.5 rounded-full bg-blue-soft/60" />
            <i className="block size-2.5 rounded-full bg-blue-soft/25" />
          </span>
          <span className="font-mono text-xs text-blue-soft/80">{copy.title}</span>
        </div>

        <div role="tablist" aria-label="Cenários" className="flex gap-1 border-b border-white/10 px-3 pt-2">
          {copy.scenarios.map((s, i) => (
            <button
              key={s.tab}
              role="tab"
              aria-selected={i === index}
              onClick={() => choose(i)}
              className={`relative rounded-t-md px-3 pb-2.5 pt-1.5 text-[0.8rem] transition-colors ${
                i === index ? "text-mist" : "text-mist/45 hover:text-mist/80"
              }`}
            >
              {s.tab}
              {i === index && <span className="absolute inset-x-3 -bottom-px h-0.5 rounded-full bg-blue" />}
            </button>
          ))}
        </div>

        <div className="space-y-4 p-4 sm:p-5">
          {/* pedido */}
          <div>
            <p className="label !text-[0.62rem] text-blue-soft/70">{copy.input}</p>
            <p className="mt-2 min-h-[3.2rem] font-mono text-[0.84rem] leading-relaxed text-mist sm:min-h-[2.6rem]">
              <span className="text-blue">›</span> {typed}
              {typing && <span className="ml-0.5 inline-block h-4 w-[3px] translate-y-0.5 animate-blink rounded-full bg-blue" />}
              {thinking && (
                <span className="ml-2 inline-flex gap-1 align-middle">
                  <i className="block size-1.5 animate-pulse-dot rounded-full bg-blue-soft" />
                  <i className="block size-1.5 animate-pulse-dot rounded-full bg-blue-soft [animation-delay:.2s]" />
                  <i className="block size-1.5 animate-pulse-dot rounded-full bg-blue-soft [animation-delay:.4s]" />
                </span>
              )}
            </p>
          </div>

          {/* proposta */}
          <div
            className={`rounded-xl ring-1 transition-colors duration-500 ${
              showProposal ? "bg-ink-2 ring-white/10" : "bg-transparent ring-white/[0.07]"
            }`}
          >
            <div className="flex items-center justify-between gap-3 border-b border-white/10 px-4 py-2.5">
              <span className={`text-sm font-medium transition-opacity duration-500 ${showProposal ? "opacity-100" : "opacity-40"}`}>
                {scenario.kind}
              </span>
              <span className="label hidden !text-[0.58rem] text-blue-soft/70 sm:inline">{copy.proposal}</span>
            </div>
            <dl className="grid grid-cols-[auto_1fr] gap-x-4 gap-y-1.5 px-4 py-3 text-[0.82rem]">
              {scenario.fields.map(([k, v]) => (
                <div key={k} className="contents">
                  <dt className={`font-mono transition-colors ${showProposal ? "text-mist/50" : "text-mist/25"}`}>{k}</dt>
                  <dd className="relative text-mist">
                    <span className={`transition-opacity duration-500 ${showProposal ? "opacity-100" : "opacity-0"}`}>{v}</span>
                    {!showProposal && (
                      <span aria-hidden className="absolute left-0 top-1/2 h-2 w-2/3 -translate-y-1/2 rounded bg-white/[0.07]" />
                    )}
                  </dd>
                </div>
              ))}
            </dl>
            <ul className="space-y-1 border-t border-white/10 px-4 py-3">
              {scenario.checks.map((c, i) => (
                <li
                  key={c}
                  className={`flex items-center gap-2 font-mono text-[0.74rem] transition-opacity duration-300 ${
                    i < checksShown ? "text-mist/80 opacity-100" : "opacity-0"
                  }`}
                >
                  <Check /> {c}
                </li>
              ))}
            </ul>
            <div className="flex items-center justify-between gap-3 border-t border-white/10 px-4 py-3">
              <span className={`text-xs ${done ? "text-[#7fd1ab]" : "text-mist/50"}`}>
                {done ? scenario.done : copy.pending}
              </span>
              <span className="flex shrink-0 gap-2">
                <span className="rounded-md px-2.5 py-1.5 text-xs text-mist/60 ring-1 ring-white/15">{copy.adjust}</span>
                <span
                  className={`rounded-md px-2.5 py-1.5 text-xs font-medium transition-all duration-200 ${
                    done
                      ? "bg-ok text-white"
                      : confirming
                        ? "scale-95 bg-blue-soft text-ink"
                        : "bg-blue text-white"
                  }`}
                >
                  {done ? "✓" : copy.confirm}
                </span>
              </span>
            </div>
          </div>
        </div>
      </div>
      <p className="mt-3 text-xs text-stone">{copy.note}</p>
    </div>
  );
}

function Check() {
  return (
    <svg viewBox="0 0 16 16" className="size-3.5 shrink-0 text-[#7fd1ab]" aria-hidden>
      <path d="M3.5 8.5l3 3 6-7" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  );
}
