import { PAGES, expect, test } from "./fixtures";

// Layout em celulares estreitos: nada vaza da tela, nenhum texto vaza do seu botão,
// alvos de toque têm pelo menos 24×24px (WCAG 2.2, 2.5.8) e botões de altura fixa
// mantêm o rótulo numa linha só.
const WIDTHS = [320, 360, 390];
const TARGETS = [...PAGES, "/rota-inexistente/"];

type Problem = { kind: string; what: string; detail: string };

test.describe("layout no celular", () => {
  test.skip(({ isMobile }) => !isMobile, "só no projeto mobile");
  test.use({ reducedMotion: "reduce" });

  for (const path of TARGETS) {
    for (const width of WIDTHS) {
      test(`${path} em ${width}px`, async ({ page }) => {
        await page.setViewportSize({ width, height: 740 });
        await page.goto(path);
        await page.evaluate(() => document.fonts.ready);
        await page.evaluate(() => document.querySelectorAll(".reveal").forEach((el) => el.classList.add("is-in")));

        const problems = await page.evaluate((): Problem[] => {
          const out: Problem[] = [];
          const vw = document.documentElement.clientWidth;
          const describe = (el: Element) => {
            const text = (el.textContent ?? "").replace(/\s+/g, " ").trim().slice(0, 40);
            const cls = typeof el.className === "string" ? el.className.split(" ").slice(0, 4).join(".") : "";
            return `<${el.tagName.toLowerCase()}${cls ? "." + cls : ""}> "${text}"`;
          };
          const visible = (el: Element) => {
            const s = getComputedStyle(el);
            if (s.display === "none" || s.visibility === "hidden") return false;
            const r = el.getBoundingClientRect();
            return r.width > 0 && r.height > 0;
          };
          const inFixed = (el: Element) => {
            for (let n: Element | null = el; n; n = n.parentElement) {
              if (getComputedStyle(n).position === "fixed") return true;
            }
            return false;
          };
          const inScroller = (el: Element) => {
            for (let n = el.parentElement; n && n !== document.body; n = n.parentElement) {
              const o = getComputedStyle(n).overflowX;
              if (o === "auto" || o === "scroll") return true;
            }
            return false;
          };

          // 1. Rolagem lateral na página.
          const root = document.documentElement;
          if (root.scrollWidth > root.clientWidth) {
            out.push({
              kind: "rolagem lateral",
              what: "documento",
              detail: `${root.scrollWidth} > ${root.clientWidth}`,
            });
          }

          // 2. Elemento que passa da borda direita.
          for (const el of document.body.querySelectorAll("*")) {
            if (!visible(el) || inFixed(el) || inScroller(el)) continue;
            const r = el.getBoundingClientRect();
            if (r.right > vw + 0.5) {
              out.push({ kind: "passa da borda", what: describe(el), detail: `right=${r.right.toFixed(1)} > ${vw}` });
            }
          }

          // 3. Texto vazando de controle.
          for (const el of document.querySelectorAll<HTMLElement>("a, button, input, [role=tab]")) {
            if (!visible(el)) continue;
            if (el.scrollWidth > el.clientWidth + 1 || el.scrollHeight > el.clientHeight + 1) {
              out.push({
                kind: "texto vaza",
                what: describe(el),
                detail: `scroll ${el.scrollWidth}×${el.scrollHeight} > client ${el.clientWidth}×${el.clientHeight}`,
              });
            }
          }

          // 4. Alvo de toque menor que 24×24 (links dentro de texto corrido são exceção na WCAG).
          const interactive = "a[href], button, input, select, textarea, summary, [role=tab], [role=button]";
          for (const el of document.querySelectorAll<HTMLElement>(interactive)) {
            if (!visible(el) || el.closest("p, li, dd")) continue;
            const r = el.getBoundingClientRect();
            if (r.width < 24 || r.height < 24) {
              out.push({
                kind: "alvo pequeno",
                what: describe(el),
                detail: `${r.width.toFixed(1)}×${r.height.toFixed(1)}`,
              });
            }
          }

          // 5. Botão de altura fixa com rótulo em mais de uma linha.
          for (const el of document.querySelectorAll<HTMLElement>("a, button")) {
            if (!visible(el) || !/(^|\s)h-\d/.test(el.className)) continue;
            const range = document.createRange();
            range.selectNodeContents(el);
            const rects = [...range.getClientRects()].filter((r) => r.width > 0 && r.height > 0);
            const s = getComputedStyle(el);
            const lh = parseFloat(s.lineHeight) || parseFloat(s.fontSize) * 1.2;
            const tops: number[] = [];
            for (const r of rects) {
              if (!tops.some((t) => Math.abs(t - r.top) < lh * 0.6)) tops.push(r.top);
            }
            if (tops.length > 1) {
              out.push({ kind: "rótulo quebra", what: describe(el), detail: `${tops.length} linhas` });
            }
          }
          return out;
        });

        expect(problems, problems.map((p) => `${p.kind}: ${p.what} (${p.detail})`).join("\n")).toEqual([]);
      });
    }
  }
});
