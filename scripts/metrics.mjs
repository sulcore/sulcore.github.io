// Coleta números reais do repositório e do pipeline para a página "Como este site é feito".
// Grava .build-metrics.json, lido no build. Tudo que não puder ser medido fica null — a página
// mostra "—" em vez de inventar.
// Uso: node scripts/metrics.mjs   (Lighthouse entra se .lighthouseci/fs/manifest.json existir)
import { execSync } from "node:child_process";
import { existsSync, readFileSync, readdirSync, statSync, writeFileSync } from "node:fs";
import { tmpdir } from "node:os";
import { extname, join } from "node:path";

const run = (cmd) =>
  execSync(cmd, { encoding: "utf8", stdio: ["ignore", "pipe", "ignore"], maxBuffer: 64 * 1024 * 1024 });
const json = (path) => JSON.parse(readFileSync(path, "utf8"));
const attempt = (fn) => {
  try {
    return fn();
  } catch {
    return null;
  }
};

function files(dir, keep = () => true) {
  if (!existsSync(dir)) return [];
  return readdirSync(dir).flatMap((name) => {
    const path = join(dir, name);
    return statSync(path).isDirectory() ? files(path, keep) : keep(path) ? [path] : [];
  });
}

const pkg = json("package.json");
const lock = attempt(() => json("package-lock.json"));
const installed = (name) => lock?.packages?.[`node_modules/${name}`]?.version ?? null;

const commit = attempt(() => {
  const [sha, date] = run("git log -1 --format=%H%n%cI").trim().split("\n");
  return { sha, date, url: `https://github.com/sulcore/sulcore.github.io/commit/${sha}` };
});

const unit = attempt(() => {
  // Arquivo explícito: o Vitest 5 grava o JSON em disco em vez de imprimir.
  const report = join(tmpdir(), `vitest-${process.pid}.json`);
  run(`npx vitest run --reporter=json --outputFile=${report}`);
  const r = json(report);
  return { total: r.numTotalTests, passed: r.numPassedTests };
});

const e2e = attempt(() => {
  const r = JSON.parse(run("npx playwright test --list --reporter=json"));
  const count = (s) =>
    (s.specs ?? []).reduce((n, sp) => n + sp.tests.length, 0) + (s.suites ?? []).reduce((n, c) => n + count(c), 0);
  const all = r.suites.reduce((n, s) => n + count(s), 0);
  const a11y = r.suites.filter((s) => s.file.includes("a11y")).reduce((n, s) => n + count(s), 0);
  return { total: all, accessibility: a11y, projects: r.config.projects.map((p) => p.name) };
});

const lighthouse = attempt(() => {
  const manifest = json(".lighthouseci/fs/manifest.json");
  return manifest
    .filter((run) => run.isRepresentativeRun)
    .map((run) => {
      const audits = json(run.jsonPath).audits;
      return {
        path: new URL(run.url).pathname,
        performance: run.summary.performance,
        accessibility: run.summary.accessibility,
        bestPractices: run.summary["best-practices"],
        seo: run.summary.seo,
        transferKB: Math.round(audits["total-byte-weight"].numericValue / 1024),
        lcpMs: Math.round(audits["largest-contentful-paint"].numericValue),
      };
    })
    .sort((a, b) => a.path.localeCompare(b.path));
});

const code = (() => {
  const src = files("src", (f) => [".ts", ".tsx"].includes(extname(f)));
  const tests = files("tests", (f) => extname(f) === ".ts");
  const lines = (list) => list.reduce((n, f) => n + readFileSync(f, "utf8").split("\n").length, 0);
  return { srcFiles: src.length, srcLines: lines(src), testFiles: tests.length, testLines: lines(tests) };
})();

const adrs = files("docs/adr", (f) => /\/\d{4}-.*\.md$/.test(f))
  .sort()
  .map((f) => {
    const title = readFileSync(f, "utf8").split("\n")[0].replace(/^#\s*/, "");
    const [n, ...rest] = title.split(" — ");
    return { n, title: rest.join(" — "), file: f };
  });

const workflows = files(".github/workflows", (f) => extname(f) === ".yml")
  .sort()
  .map((f) => ({ file: f, name: readFileSync(f, "utf8").match(/^name:\s*(.+)$/m)?.[1] ?? f }));

const metrics = {
  generatedAt: new Date().toISOString(),
  commit,
  versions: {
    next: installed("next"),
    react: installed("react"),
    typescript: installed("typescript"),
    tailwindcss: installed("tailwindcss"),
    node: process.versions.node,
  },
  dependencies: {
    runtime: Object.keys(pkg.dependencies ?? {}).length,
    development: Object.keys(pkg.devDependencies ?? {}).length,
  },
  tests: { unit, e2e },
  lighthouse,
  code,
  adrs,
  workflows,
};

writeFileSync(".build-metrics.json", JSON.stringify(metrics, null, 2) + "\n");
console.log(
  `✓ metrics: ${unit?.total ?? "?"} unit, ${e2e?.total ?? "?"} e2e, ${adrs.length} ADRs, lighthouse ${lighthouse ? "sim" : "não"}`,
);
