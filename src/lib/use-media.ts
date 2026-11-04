"use client";

import { useSyncExternalStore } from "react";

// Lê uma media query como estado externo (sem setState em efeito). No servidor, devolve `fallback`.
export function useMediaQuery(query: string, fallback = false): boolean {
  return useSyncExternalStore(
    (onChange) => {
      const mq = window.matchMedia(query);
      mq.addEventListener("change", onChange);
      return () => mq.removeEventListener("change", onChange);
    },
    () => window.matchMedia(query).matches,
    () => fallback,
  );
}
