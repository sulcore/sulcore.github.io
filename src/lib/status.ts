import type { Locale } from "@/content/site";

// Sinais publicados pelo pipeline do Nivela (um JSON por sinal e idioma, formato endpoint do shields.io).
export const SIGNALS = ["ci", "seguranca", "cobertura"] as const;
export type Signal = (typeof SIGNALS)[number];

/** URL do badge do shields.io para um sinal, ou null se a fonte ainda não foi configurada. */
export function signalBadgeUrl(base: string, signal: string, locale: Locale): string | null {
  const root = base.trim().replace(/\/+$/, "");
  if (!root || !root.startsWith("https://")) return null;
  const json = `${root}/nivela-${signal}.${locale}.json`;
  return `https://img.shields.io/endpoint?url=${encodeURIComponent(json)}&style=flat-square`;
}
