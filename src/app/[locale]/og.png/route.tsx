import { readFile } from "node:fs/promises";
import { join } from "node:path";
import { ImageResponse } from "next/og";
import { getDict } from "@/content/dictionary";
import { LOCALES, isLocale } from "@/content/site";

// Imagem de compartilhamento (WhatsApp, LinkedIn, X), gerada no build em /<idioma>/og.png.
// É um route handler (e não opengraph-image) para sair com extensão .png no export estático.
export const dynamic = "force-static";
const size = { width: 1200, height: 630 };

export function generateStaticParams() {
  return LOCALES.map((locale) => ({ locale }));
}

const font = (file: string) => readFile(join(process.cwd(), "node_modules/geist/dist/fonts", file));

export async function GET(_req: Request, { params }: { params: Promise<{ locale: string }> }) {
  const { locale } = await params;
  const d = getDict(isLocale(locale) ? locale : "pt");
  const [semibold, mono] = await Promise.all([
    font("geist-sans/Geist-SemiBold.ttf"),
    font("geist-mono/GeistMono-Regular.ttf"),
  ]);
  const grid = "rgba(141,187,234,0.08)";

  return new ImageResponse(
    <div
      style={{
        width: "100%",
        height: "100%",
        display: "flex",
        flexDirection: "column",
        justifyContent: "space-between",
        padding: "72px 80px",
        background: "#062b52",
        backgroundImage: `linear-gradient(${grid} 1px, transparent 1px), linear-gradient(90deg, ${grid} 1px, transparent 1px)`,
        backgroundSize: "48px 48px",
        color: "#eaf2fb",
        fontFamily: "Geist",
      }}
    >
      <div style={{ display: "flex", alignItems: "center", gap: 20 }}>
        <div style={{ width: 8, height: 56, borderRadius: 8, background: "#3b8be0" }} />
        <div style={{ display: "flex", fontSize: 52, letterSpacing: -1.5 }}>
          <span>Sul</span>
          <span style={{ color: "#4f9be8" }}>Core</span>
        </div>
        <div style={{ display: "flex", gap: 6, marginTop: -28 }}>
          <div style={{ width: 9, height: 9, borderRadius: 9, background: "#4f9be8" }} />
          <div style={{ width: 9, height: 9, borderRadius: 9, background: "rgba(141,187,234,0.7)" }} />
          <div style={{ width: 9, height: 9, borderRadius: 9, background: "rgba(141,187,234,0.3)" }} />
        </div>
      </div>
      <div style={{ display: "flex", flexDirection: "column", fontSize: 76, lineHeight: 1.04, letterSpacing: -3 }}>
        <span>{d.hero.title[0]}</span>
        <span style={{ color: "#4f9be8" }}>{d.hero.title[1]}</span>
      </div>
      <div style={{ display: "flex", fontFamily: "GeistMono", fontSize: 22, letterSpacing: 5, color: "#8dbbea" }}>
        SOFTWARE DEVELOPMENT · SULCORE.GITHUB.IO
      </div>
    </div>,
    {
      ...size,
      fonts: [
        { name: "Geist", data: semibold, weight: 600, style: "normal" },
        { name: "GeistMono", data: mono, weight: 400, style: "normal" },
      ],
    },
  );
}
