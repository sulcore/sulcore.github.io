// Servidor estático mínimo para out/, com o mesmo comportamento do GitHub Pages que importa
// para os testes: /pasta/ → /pasta/index.html, tipo pelo nome do arquivo e 404.html para o resto.
// Uso: node scripts/serve.mjs [porta]
import { createReadStream, existsSync, statSync } from "node:fs";
import { createServer } from "node:http";
import { extname, join, normalize, resolve } from "node:path";

const ROOT = resolve("out");
const PORT = Number(process.argv[2] ?? process.env.PORT ?? 4173);
const TYPES = {
  ".html": "text/html; charset=utf-8",
  ".js": "text/javascript; charset=utf-8",
  ".css": "text/css; charset=utf-8",
  ".json": "application/json",
  ".txt": "text/plain; charset=utf-8",
  ".xml": "application/xml",
  ".svg": "image/svg+xml",
  ".png": "image/png",
  ".jpg": "image/jpeg",
  ".mp4": "video/mp4",
  ".woff2": "font/woff2",
};

function fileFor(urlPath) {
  const clean = normalize(decodeURIComponent(urlPath.split("?")[0])).replace(/^(\.\.[/\\])+/, "");
  const target = join(ROOT, clean);
  if (!target.startsWith(ROOT)) return null; // nada fora de out/
  if (existsSync(target) && statSync(target).isFile()) return target;
  const index = join(target, "index.html");
  return existsSync(index) ? index : null;
}

createServer((req, res) => {
  const file = fileFor(req.url ?? "/");
  const status = file ? 200 : 404;
  const path = file ?? join(ROOT, "404.html");
  res.writeHead(status, { "content-type": TYPES[extname(path)] ?? "application/octet-stream" });
  createReadStream(path).pipe(res);
}).listen(PORT, () => console.log(`out/ em http://localhost:${PORT}`));
