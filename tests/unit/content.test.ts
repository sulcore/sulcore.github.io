import { describe, expect, it } from "vitest";
import { getDict } from "@/content/dictionary";
import { CASE_SLUGS, getCase } from "@/content/cases";
import { LOCALES, SITE } from "@/content/site";

// Mesma forma nos dois idiomas, inclusive o tamanho das listas (o tipo não pega isso).
function shape(value: unknown): unknown {
  if (Array.isArray(value)) return value.map(shape);
  if (value && typeof value === "object") {
    return Object.fromEntries(Object.entries(value).map(([k, v]) => [k, shape(v)]));
  }
  return typeof value;
}

function strings(value: unknown, path = ""): [string, string][] {
  if (typeof value === "string") return [[path, value]];
  if (Array.isArray(value)) return value.flatMap((v, i) => strings(v, `${path}[${i}]`));
  if (value && typeof value === "object")
    return Object.entries(value).flatMap(([k, v]) => strings(v, path ? `${path}.${k}` : k));
  return [];
}

describe("dictionary", () => {
  it("has the same structure in every language", () => {
    const [first, ...rest] = LOCALES.map((l) => shape(getDict(l)));
    for (const other of rest) expect(other).toEqual(first);
  });

  it.each(LOCALES)("has no empty strings (%s)", (locale) => {
    const empty = strings(getDict(locale)).filter(([, v]) => v.trim() === "");
    expect(empty).toEqual([]);
  });

  it("references videos that exist in both languages", () => {
    for (const key of ["nivela", "repara"] as const)
      expect(getDict("pt")[key].videos.map(([f]) => f)).toEqual(getDict("en")[key].videos.map(([f]) => f));
    expect(getDict("pt").repara.screens.map(([f]) => f)).toEqual(getDict("en").repara.screens.map(([f]) => f));
  });
});

describe("cases", () => {
  it.each(LOCALES.flatMap((l) => CASE_SLUGS.map((s) => [l, s] as const)))(
    "%s/%s is complete when ready",
    (locale, slug) => {
      const c = getCase(locale, slug);
      expect(c).toBeDefined();
      if (!c?.ready) return;
      for (const field of ["challenge", "solution", "stack", "result"] as const)
        expect(c[field].length).toBeGreaterThan(0);
    },
  );

  it("lists every case on the home page", () => {
    for (const locale of LOCALES) {
      expect(
        getDict(locale)
          .cases.items.map((i) => i.slug)
          .sort(),
      ).toEqual([...CASE_SLUGS].sort());
    }
  });
});

describe("site config", () => {
  it("has a valid WhatsApp number", () => {
    expect(SITE.whatsapp).toMatch(/^\d{10,15}$/);
  });
});
