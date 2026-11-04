import { describe, expect, it } from "vitest";
import { isSamePage, normalizePath } from "@/lib/paths";

describe("paths", () => {
  it("normalizes the trailing slash", () => {
    expect(normalizePath("/pt")).toBe("/pt/");
    expect(normalizePath("/pt/")).toBe("/pt/");
  });

  it("detects the current page, ignoring the hash", () => {
    expect(isSamePage("/pt/", "/pt")).toBe(true);
    expect(isSamePage("/pt/#contato", "/pt/")).toBe(true);
    expect(isSamePage("/pt/", "/pt/cases/nivela/")).toBe(false);
  });
});
