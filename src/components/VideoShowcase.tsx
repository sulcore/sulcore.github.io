"use client";

import { useState } from "react";
import { asset } from "@/content/site";

// Telas reais do Nivela, gravadas com um negócio de exemplo.
export function VideoShowcase({ videos }: { videos: [string, string][] }) {
  const [active, setActive] = useState(0);
  const [file] = videos[active];
  return (
    <div>
      <div className="overflow-hidden rounded-xl bg-[#0b0b0f] ring-1 ring-white/10">
        <div className="flex items-center gap-2 border-b border-white/10 px-3 py-2">
          <span aria-hidden className="flex gap-1.5">
            <i className="block size-2 rounded-full bg-white/20" />
            <i className="block size-2 rounded-full bg-white/20" />
            <i className="block size-2 rounded-full bg-white/20" />
          </span>
          <span className="mx-auto rounded bg-white/5 px-3 py-0.5 font-mono text-[0.68rem] text-white/60">
            app.nivelaerp.com.br
          </span>
        </div>
        <video
          key={file}
          className="aspect-[1920/1200] w-full"
          src={asset(`/video/${file}.mp4`)}
          poster={asset(`/video/${file}.jpg`)}
          autoPlay
          muted
          loop
          playsInline
          preload="metadata"
        />
      </div>
      <div className="mt-3 flex flex-wrap gap-2">
        {videos.map(([f, label], i) => (
          <button
            key={f}
            onClick={() => setActive(i)}
            aria-pressed={i === active}
            className={`rounded-full px-3 py-1.5 text-xs transition-colors ${
              i === active ? "bg-mist text-ink" : "text-mist/60 ring-1 ring-white/15 hover:text-mist"
            }`}
          >
            {label}
          </button>
        ))}
      </div>
    </div>
  );
}
