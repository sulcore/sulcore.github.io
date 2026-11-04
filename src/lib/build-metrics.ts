import { readFileSync } from "node:fs";
import { join } from "node:path";

// Números gerados por scripts/metrics.mjs no pipeline. Lido só no build (server component).
export type BuildMetrics = {
  generatedAt: string;
  commit: { sha: string; date: string; url: string } | null;
  versions: Record<"next" | "react" | "typescript" | "tailwindcss" | "node", string | null>;
  dependencies: { runtime: number; development: number };
  tests: {
    unit: { total: number; passed: number } | null;
    e2e: { total: number; accessibility: number; projects: string[] } | null;
  };
  lighthouse:
    | {
        path: string;
        performance: number;
        accessibility: number;
        bestPractices: number;
        seo: number;
        transferKB: number;
        lcpMs: number;
      }[]
    | null;
  code: { srcFiles: number; srcLines: number; testFiles: number; testLines: number };
  adrs: { n: string; title: string; file: string }[];
  workflows: { file: string; name: string }[];
};

export function readBuildMetrics(): BuildMetrics | null {
  try {
    return JSON.parse(readFileSync(join(process.cwd(), ".build-metrics.json"), "utf8")) as BuildMetrics;
  } catch {
    return null;
  }
}
