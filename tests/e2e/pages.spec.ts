import { PAGES, expect, test } from "./fixtures";

for (const path of PAGES) {
  test(`${path} abre inteira, no idioma certo e sem rolagem lateral`, async ({ page, failures }) => {
    void failures;
    await page.goto(path);
    const lang = path.startsWith("/pt/") ? "pt-BR" : "en";
    await expect(page.locator("html")).toHaveAttribute("lang", lang);
    await expect(page.locator("h1")).toHaveCount(1);
    await expect(page.locator('link[rel="alternate"][hreflang="pt-BR"]')).toHaveCount(1);
    await expect(page.locator('link[rel="alternate"][hreflang="en"]')).toHaveCount(1);
    const overflow = await page.evaluate(() => document.documentElement.scrollWidth - window.innerWidth);
    expect(overflow).toBeLessThanOrEqual(0);
  });
}

test("a raiz manda para o idioma do navegador", async ({ browser }) => {
  for (const [locale, target] of [
    ["pt-BR", "/pt/"],
    ["en-US", "/en/"],
  ] as const) {
    const context = await browser.newContext({ locale });
    const page = await context.newPage();
    await page.goto("/");
    await page.waitForURL(`**${target}`);
    await context.close();
  }
});

test("a troca de idioma leva à mesma página no outro idioma", async ({ page, failures }) => {
  void failures;
  await page.goto("/pt/cases/nivela/");
  await page.locator('header a[hreflang="en"]').click();
  await page.waitForURL("**/en/cases/nivela/");
});

test("os blocos de um case aparecem depois de navegar pela home", async ({ page, failures }) => {
  void failures;
  await page.goto("/pt/");
  await page.locator('#cases a[href*="cases/nivela"]').click();
  await page.waitForURL("**/pt/cases/nivela/");
  for (const block of await page.locator(".reveal").all()) {
    await block.scrollIntoViewIfNeeded();
    await expect(block).toHaveClass(/is-in/);
  }
});
