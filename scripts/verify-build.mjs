// Confere o site exportado em out/ antes do deploy:
// páginas obrigatórias, links e arquivos internos que existem, hreflang e WhatsApp.
// Uso: node scripts/verify-build.mjs   (respeita PAGES_BASE_PATH, como o build)
import { existsSync, readFileSync, readdirSync, statSync } from "node:fs";
import { join, relative } from "node:path";

const OUT = "out";
const BASE = process.env.PAGES_BASE_PATH ?? "";
const REQUIRED = [
  "index.html",
  "404.html",
  "pt/index.html",
  "en/index.html",
  "pt/cases/nivela/index.html",
  "en/cases/nivela/index.html",
  "pt/cases/eletrica-moro/index.html",
  "en/cases/eletrica-moro/index.html",
  "pt/build/index.html",
  "en/build/index.html",
  "robots.txt",
  "sitemap.xml",
  "pt/og.png",
  "en/og.png",
];

const errors = [];

for (const file of REQUIRED) {
  if (!existsSync(join(OUT, file))) errors.push(`página ausente: ${file}`);
}

function htmlFiles(dir) {
  return readdirSync(dir).flatMap((name) => {
    const path = join(dir, name);
    if (statSync(path).isDirectory()) return htmlFiles(path);
    return name.endsWith(".html") ? [path] : [];
  });
}

// Caminho público -> arquivo em out/ (aceita /pasta/ -> /pasta/index.html).
function resolves(url) {
  let path = url.split("#")[0].split("?")[0];
  if (!path) return true; // só âncora na mesma página
  if (BASE && path.startsWith(BASE)) path = path.slice(BASE.length);
  path = decodeURIComponent(path).replace(/^\//, "");
  const target = join(OUT, path);
  if (existsSync(target) && statSync(target).isFile()) return true;
  return existsSync(join(target, "index.html"));
}

const ATTR = /\s(?:href|src|poster)="([^"]+)"/g;

for (const file of htmlFiles(OUT)) {
  const html = readFileSync(file, "utf8");
  const page = relative(OUT, file);
  for (const [, url] of html.matchAll(ATTR)) {
    if (/^(https?:|mailto:|tel:|data:|#)/.test(url)) continue;
    if (!url.startsWith("/")) continue; // relativos ficam no index.html de redirecionamento
    if (!resolves(url)) errors.push(`${page}: link quebrado ${url}`);
  }
  if (page.startsWith("pt/") || page.startsWith("en/")) {
    if (!/hreflang="pt-BR"/i.test(html) || !/hreflang="en"/i.test(html)) {
      errors.push(`${page}: falta hreflang pt-BR/en`);
    }
  }
}

// Toda URL do sitemap tem de existir no export (o domínio é trocado pelo caminho local).
if (existsSync(join(OUT, "sitemap.xml"))) {
  const xml = readFileSync(join(OUT, "sitemap.xml"), "utf8");
  const locs = [...xml.matchAll(/<loc>([^<]+)<\/loc>/g)].map(([, u]) => new URL(u).pathname);
  if (locs.length === 0) errors.push("sitemap.xml: nenhuma URL");
  for (const path of locs) if (!resolves(path)) errors.push(`sitemap.xml: ${path} não existe no export`);
}

// O 404 do Pages tem de ser a nossa página, não a padrão do Next.
if (existsSync(join(OUT, "404.html")) && !readFileSync(join(OUT, "404.html"), "utf8").includes("SulCore")) {
  errors.push("404.html: não é a página própria");
}

const home = existsSync(join(OUT, "pt/index.html")) ? readFileSync(join(OUT, "pt/index.html"), "utf8") : "";
if (!home.includes('id="contato"')) errors.push("pt/index.html: seção de contato ausente");

if (errors.length) {
  console.error(`✗ verify-build: ${errors.length} problema(s)`);
  for (const e of errors) console.error(`  - ${e}`);
  process.exit(1);
}
console.log(`✓ verify-build: ${htmlFiles(OUT).length} páginas conferidas${BASE ? ` (base ${BASE})` : ""}`);
