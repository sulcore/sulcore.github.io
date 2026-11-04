import { expect, test } from "./fixtures";

// A página mostra números do pipeline. Testes e decisões sempre existem; Lighthouse só no deploy.
test("como este site é feito: números reais, esteira e decisões", async ({ page, failures }) => {
  void failures;
  await page.goto("/pt/build/");
  await expect(page.getByRole("heading", { level: 1 })).toHaveText("Como este site é feito.");
  const stats = page.locator('dl[aria-label="Números do pipeline"] dt');
  const unit = stats.first();
  await expect(unit).toHaveText(/^\d+\/\d+$/);
  const [passed, total] = (await unit.innerText()).split("/").map(Number);
  expect(passed).toBe(total);
  await expect(stats.nth(1)).toHaveText(/^\d+$/);
  await expect(page.locator('a[href*="/actions/workflows/"]')).toHaveCount(4);
  expect(await page.locator('a[href*="/blob/main/docs/adr/"]').count()).toBeGreaterThanOrEqual(8);
  await expect(page.locator('a[href*="/commit/"]')).toHaveText(/^[0-9a-f]{7}$/);
});

test("o rodapé e a seção de processo levam à página", async ({ page, failures }) => {
  void failures;
  await page.goto("/en/");
  await page.locator("#processo").getByRole("link", { name: "How this site is built" }).click();
  await page.waitForURL("**/en/build/");
  await page.locator("footer").getByRole("link", { name: "How this site is built" }).click();
  await page.waitForURL("**/en/build/");
});
