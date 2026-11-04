import { expect, test } from "./fixtures";

test.describe("tema", () => {
  test("começa no escuro, troca e lembra a escolha", async ({ page, failures }) => {
    void failures;
    await page.goto("/pt/");
    const html = page.locator("html");
    await expect(html).toHaveAttribute("data-theme", "dark");
    await page.getByRole("button", { name: "Usar tema claro" }).click();
    await expect(html).toHaveAttribute("data-theme", "light");
    await page.reload();
    await expect(html).toHaveAttribute("data-theme", "light");
    await page.getByRole("button", { name: "Usar tema escuro" }).click();
    await expect(html).toHaveAttribute("data-theme", "dark");
  });
});

test.describe("logo", () => {
  test("na home, volta ao topo e limpa a âncora", async ({ page, failures }) => {
    void failures;
    await page.goto("/pt/#contato");
    await page.evaluate(() => window.scrollTo(0, document.body.scrollHeight));
    await page.locator('header a[aria-label^="SulCore"]').click();
    await expect.poll(() => page.evaluate(() => window.scrollY)).toBe(0);
    expect(new URL(page.url()).hash).toBe("");
  });

  test("num case, leva para a home", async ({ page, failures }) => {
    void failures;
    await page.goto("/pt/cases/nivela/");
    await page.locator('header a[aria-label^="SulCore"]').click();
    await page.waitForURL("**/pt/");
  });
});

test.describe("demo do console", () => {
  test("chega à execução auditada do primeiro cenário", async ({ page, failures }) => {
    void failures;
    await page.emulateMedia({ reducedMotion: "reduce" });
    await page.goto("/pt/");
    await expect(page.getByText("Gravado uma vez · auditoria #A-2381")).toBeVisible();
  });

  test("troca de cenário pelas abas", async ({ page, failures }) => {
    void failures;
    await page.emulateMedia({ reducedMotion: "reduce" });
    await page.goto("/pt/");
    await page.getByRole("tab", { name: "Financeiro" }).click();
    await expect(page.getByRole("tab", { name: "Financeiro" })).toHaveAttribute("aria-selected", "true");
    await expect(page.getByText("3 cobranças emitidas · auditoria #F-0917")).toBeVisible();
  });
});

test.describe("contato", () => {
  test("monta a mensagem e abre o WhatsApp certo", async ({ page, failures }) => {
    void failures;
    await page.goto("/pt/#contato");
    await page.evaluate(() => {
      (window as unknown as { __opened: string[] }).__opened = [];
      window.open = ((url: string) => {
        (window as unknown as { __opened: string[] }).__opened.push(url);
        return null;
      }) as typeof window.open;
    });
    const form = page.locator("#contato form");
    await form.getByRole("button", { name: "IA nos processos" }).click();
    await form.getByPlaceholder("Ana · Construtora Vale").fill("Ana · Teste");
    await form.locator("textarea").fill("Quero automatizar o atendimento.");
    await form.getByRole("button", { name: /Enviar pelo WhatsApp/ }).click();
    const opened = await page.evaluate(() => (window as unknown as { __opened: string[] }).__opened);
    expect(opened).toHaveLength(1);
    const url = new URL(opened[0]);
    expect(url.origin + url.pathname).toBe("https://wa.me/5551981821970");
    expect(url.searchParams.get("text")).toBe(
      "Olá, SulCore!\n\nTipo de projeto: IA nos processos\nSeu nome e empresa: Ana · Teste\n\nQuero automatizar o atendimento.",
    );
  });

  test("não envia sem descrever o problema", async ({ page, failures }) => {
    void failures;
    await page.goto("/pt/#contato");
    const textarea = page.locator("#contato textarea");
    await page
      .locator("#contato form")
      .getByRole("button", { name: /Enviar pelo WhatsApp/ })
      .click();
    expect(await textarea.evaluate((el: HTMLTextAreaElement) => el.validity.valueMissing)).toBe(true);
  });
});
