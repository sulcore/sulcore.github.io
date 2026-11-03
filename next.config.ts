import type { NextConfig } from "next";

// No GitHub Pages o site pode morar num subcaminho (ex.: /sulcore-site).
// O workflow de deploy passa o caminho certo; localmente fica vazio.
const basePath = process.env.PAGES_BASE_PATH ?? "";

const nextConfig: NextConfig = {
  output: "export",
  trailingSlash: true,
  basePath,
  images: { unoptimized: true },
  env: { NEXT_PUBLIC_BASE_PATH: basePath },
};

export default nextConfig;
