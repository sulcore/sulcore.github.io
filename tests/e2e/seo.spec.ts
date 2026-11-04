import AxeBuilder from "@axe-core/playwright";
import { expect, test } from "@playwright/test";
import { PAGES } from "./fixtures";

test("endereço inexistente mostra a 404 própria, nos dois idiomas", async ({ page }) => {
  const res = await page.goto("/rota-que-nao-existe/");
  expect(res?.status()).toBe(404);
  await expect(page.getByRole("heading", { level: 1 })).toHaveText("Página não encontrada.");
  await expect(page.getByText("Page not found.")).toBeVisible();
  await expect(page.getByRole("link", { name: "Ir para o início" })).toHaveAttribute("href", /\/pt\/$/);
  await expect(page.getByRole("link", { name: "Go to the home page" })).toHaveAttribute("href", /\/en\/$/);
  const { violations } = await new AxeBuilder({ page }).withTags(["wcag2a", "wcag2aa", "wcag21aa"]).analyze();
  expect(violations.map((v) => v.id)).toEqual([]);
});

test("todas as URLs do sitemap respondem 200", async ({ request, baseURL }) => {
  const xml = await (await request.get("/sitemap.xml")).text();
  const urls = [...xml.matchAll(/<loc>([^<]+)<\/loc>/g)].map(([, u]) => new URL(u).pathname);
  expect(urls.sort()).toEqual([...PAGES].sort());
  for (const path of urls) expect((await request.get(new URL(path, baseURL).toString())).status(), path).toBe(200);
});

test("robots.txt aponta para o sitemap", async ({ request }) => {
  const robots = await (await request.get("/robots.txt")).text();
  expect(robots).toMatch(/Sitemap: https:\/\/.+\/sitemap\.xml/);
});

for (const path of PAGES) {
  test(`metadados de compartilhamento e busca em ${path}`, async ({ page, request }) => {
    await page.goto(path);
    const canonical = await page.locator('link[rel="canonical"]').getAttribute("href");
    expect(new URL(canonical!).pathname).toBe(path);
    const ogImage = await page.locator('meta[property="og:image"]').getAttribute("content");
    const image = await request.get(new URL(ogImage!).pathname);
    expect(image.status()).toBe(200);
    expect(image.headers()["content-type"]).toBe("image/png");
    await expect(page.locator('meta[name="twitter:card"]')).toHaveAttribute("content", "summary_large_image");
    const ld = JSON.parse((await page.locator('script[type="application/ld+json"]').textContent()) ?? "{}");
    expect(ld["@type"]).toBe("Organization");
    expect(ld.name).toBe("SulCore");
  });
}
