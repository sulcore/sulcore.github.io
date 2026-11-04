import { test as base, expect } from "@playwright/test";

// Toda página tem de abrir sem erro de JavaScript nem recurso 4xx/5xx.
export const test = base.extend<{ failures: string[] }>({
  failures: async ({ page }, use) => {
    const failures: string[] = [];
    page.on("pageerror", (e) => failures.push(`pageerror: ${e.message}`));
    page.on("console", (m) => m.type() === "error" && failures.push(`console: ${m.text()}`));
    page.on("response", (r) => r.status() >= 400 && failures.push(`${r.status()} ${r.url()}`));
    await use(failures);
    expect(failures, "erros no navegador").toEqual([]);
  },
});

export { expect };

export const PAGES = [
  "/pt/",
  "/en/",
  "/pt/cases/nivela/",
  "/en/cases/nivela/",
  "/pt/cases/eletrica-moro/",
  "/en/cases/eletrica-moro/",
];
