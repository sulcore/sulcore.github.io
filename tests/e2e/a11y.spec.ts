import AxeBuilder from "@axe-core/playwright";
import { PAGES, expect, test } from "./fixtures";

// WCAG 2.1 AA em todas as páginas, nos dois temas. Com movimento reduzido, a demo mostra o
// estado final e todo bloco já está visível — é o pior caso para contraste.
for (const theme of ["dark", "light"] as const) {
  for (const path of PAGES) {
    test(`acessibilidade ${theme} ${path}`, async ({ page, failures }) => {
      void failures;
      await page.emulateMedia({ reducedMotion: "reduce" });
      await page.addInitScript((t) => localStorage.setItem("theme", t), theme);
      await page.goto(path);
      await expect(page.locator("html")).toHaveAttribute("data-theme", theme);
      await page.evaluate(() => document.querySelectorAll(".reveal").forEach((e) => e.classList.add("is-in")));
      const { violations } = await new AxeBuilder({ page })
        .withTags(["wcag2a", "wcag2aa", "wcag21a", "wcag21aa"])
        .analyze();
      const summary = violations.map((v) => `${v.id}: ${v.nodes.map((n) => n.target.join(" ")).join(" | ")}`);
      expect(summary).toEqual([]);
    });
  }
}
