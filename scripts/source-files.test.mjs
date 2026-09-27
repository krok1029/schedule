import { describe, expect, it } from "vitest";
import { countLines, isCheckedSource } from "./source-files.mjs";

describe("source file policy", () => {
  it.each([
    "app.tsx",
    "migration.sql",
    "main.rs",
    "generated.ts",
    "tailwind.config.ts",
    "styles.tsx",
    "types.d.ts",
  ])("should check production source %s", (path) => {
    expect(isCheckedSource(path)).toBe(true);
  });
  it.each([
    "app.test.ts",
    "app.spec.tsx",
    "app.e2e-spec.ts",
    "styles.css",
    "theme.scss",
    "README.md",
  ])("should exclude test or non-code file %s", (path) => {
    expect(isCheckedSource(path)).toBe(false);
  });
  it.each([
    ["", 0],
    ["one", 1],
    ["one\n", 1],
    ["one\r\ntwo\r\n", 2],
    ["one\n\n", 2],
  ])("should count physical lines including blanks", (text, expected) => {
    expect(countLines(text)).toBe(expected);
  });
  it("should accept 600 lines and reject 601 lines including comments", () => {
    const target = "// comment\n".repeat(600);
    expect(countLines(target)).toBe(600);
    expect(countLines(target + "\n")).toBe(601);
  });
});
