import { describe, expect, it } from "vitest";
import { buildMessage, whatsappLink } from "@/lib/whatsapp";

const copy = { greeting: "Olá, SulCore!", typeLabel: "Tipo de projeto", nameLabel: "Seu nome e empresa" };

describe("buildMessage", () => {
  it("includes type, name and message", () => {
    expect(buildMessage(copy, { type: "IA nos processos", who: " Ana · Vale ", msg: " Preciso de ajuda. " })).toBe(
      "Olá, SulCore!\n\nTipo de projeto: IA nos processos\nSeu nome e empresa: Ana · Vale\n\nPreciso de ajuda.",
    );
  });

  it("skips the name line when empty", () => {
    expect(buildMessage(copy, { type: "Site", who: "  ", msg: "Oi" })).not.toContain("Seu nome");
  });
});

describe("whatsappLink", () => {
  it("encodes the text", () => {
    expect(whatsappLink("5551981821970", "a b\nç&")).toBe("https://wa.me/5551981821970?text=a%20b%0A%C3%A7%26");
  });

  it("rejects empty or malformed numbers", () => {
    expect(whatsappLink("", "x")).toBeNull();
    expect(whatsappLink("+55 51 9999", "x")).toBeNull();
  });
});
