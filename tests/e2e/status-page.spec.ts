import { expect, test } from "./fixtures";

// Página de status: só o sinal. Sem fonte configurada, mostra "em configuração" e não chama nada de fora.
test("status técnico: sinais da CI, disponibilidade e o que não mostramos", async ({ page, failures }) => {
  void failures;
  await page.goto("/pt/status/");
  await expect(page.getByRole("heading", { level: 1 })).toHaveText("Status técnico dos nossos produtos.");
  await expect(page.getByRole("list", { name: "Nivela · integração contínua" }).getByRole("listitem")).toHaveCount(3);
  await expect(page.getByText("Logs e mensagens de erro")).toBeVisible();
});

test("o rodapé leva à página de status", async ({ page, failures }) => {
  void failures;
  await page.goto("/en/");
  await page.locator("footer").getByRole("link", { name: "Engineering status" }).click();
  await page.waitForURL("**/en/status/");
});
