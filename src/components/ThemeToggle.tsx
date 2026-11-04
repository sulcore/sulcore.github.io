"use client";

import { useSyncExternalStore } from "react";

type Theme = "dark" | "light";

// O tema vive em <html data-theme>, aplicado antes da pintura pelo script em layout.tsx.
// O botão só lê esse atributo (como estado externo) e o troca.
function subscribe(onChange: () => void) {
  const mo = new MutationObserver(onChange);
  mo.observe(document.documentElement, { attributes: true, attributeFilter: ["data-theme"] });
  return () => mo.disconnect();
}

function current(): Theme {
  return document.documentElement.dataset.theme === "light" ? "light" : "dark";
}

export function ThemeToggle({ labels }: { labels: { toDark: string; toLight: string } }) {
  const theme = useSyncExternalStore<Theme>(subscribe, current, () => "dark");

  function toggle() {
    const next: Theme = theme === "dark" ? "light" : "dark";
    document.documentElement.dataset.theme = next;
    try {
      localStorage.setItem("theme", next);
    } catch {
      /* armazenamento bloqueado: vale só nesta visita */
    }
  }

  const label = theme === "dark" ? labels.toLight : labels.toDark;
  return (
    <button
      type="button"
      onClick={toggle}
      aria-label={label}
      title={label}
      className="grid size-9 place-items-center rounded-lg text-fg/75 ring-1 ring-fg/15 transition hover:text-fg hover:ring-fg/30"
    >
      {theme === "dark" ? (
        <svg
          viewBox="0 0 24 24"
          className="size-[18px]"
          aria-hidden
          fill="none"
          stroke="currentColor"
          strokeWidth="1.8"
          strokeLinecap="round"
        >
          <circle cx="12" cy="12" r="4" />
          <path d="M12 2.5v2M12 19.5v2M2.5 12h2M19.5 12h2M5.3 5.3l1.4 1.4M17.3 17.3l1.4 1.4M5.3 18.7l1.4-1.4M17.3 6.7l1.4-1.4" />
        </svg>
      ) : (
        <svg
          viewBox="0 0 24 24"
          className="size-[18px]"
          aria-hidden
          fill="none"
          stroke="currentColor"
          strokeWidth="1.8"
          strokeLinejoin="round"
        >
          <path d="M20 14.5A8 8 0 0 1 9.5 4a8 8 0 1 0 10.5 10.5Z" />
        </svg>
      )}
    </button>
  );
}
