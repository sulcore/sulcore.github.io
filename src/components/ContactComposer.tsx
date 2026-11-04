"use client";

import { useState } from "react";
import type { Dict } from "@/content/dictionary";
import { SITE } from "@/content/site";
import { buildMessage, whatsappLink } from "@/lib/whatsapp";

// Monta a mensagem e abre o WhatsApp já preenchido. Sem número configurado, copia o texto.
export function ContactComposer({ copy }: { copy: Dict["contact"] }) {
  const [type, setType] = useState(copy.types[0]);
  const [who, setWho] = useState("");
  const [msg, setMsg] = useState("");
  const [copied, setCopied] = useState(false);

  const text = buildMessage(copy, { type, who, msg });
  const href = whatsappLink(SITE.whatsapp, text);
  const hasNumber = href !== null;

  async function copyText() {
    try {
      await navigator.clipboard.writeText(text);
      setCopied(true);
      setTimeout(() => setCopied(false), 2400);
    } catch {
      /* clipboard bloqueado: nada a fazer */
    }
  }

  const field =
    "w-full rounded-lg bg-white/[0.06] px-3.5 py-3 text-[0.95rem] text-mist placeholder:text-mist/35 ring-1 ring-white/12 transition focus:bg-white/[0.09] focus:outline-none focus:ring-2 focus:ring-blue";

  return (
    <form
      className="space-y-5"
      onSubmit={(e) => {
        e.preventDefault();
        if (href) window.open(href, "_blank", "noopener");
        else copyText();
      }}
    >
      <fieldset>
        <legend className="label !text-[0.62rem] text-blue-soft">{copy.typeLabel}</legend>
        <div className="mt-3 flex flex-wrap gap-2">
          {copy.types.map((t) => (
            <button
              type="button"
              key={t}
              onClick={() => setType(t)}
              aria-pressed={t === type}
              className={`rounded-full px-3.5 py-2 text-sm transition-colors ${
                t === type
                  ? "bg-cta text-white"
                  : "text-mist/70 ring-1 ring-white/15 hover:text-mist hover:ring-white/30"
              }`}
            >
              {t}
            </button>
          ))}
        </div>
      </fieldset>
      <label className="block">
        <span className="label !text-[0.62rem] text-blue-soft">{copy.nameLabel}</span>
        <input
          className={`${field} mt-2`}
          value={who}
          onChange={(e) => setWho(e.target.value)}
          placeholder={copy.namePlaceholder}
        />
      </label>
      <label className="block">
        <span className="label !text-[0.62rem] text-blue-soft">{copy.msgLabel}</span>
        <textarea
          className={`${field} mt-2 min-h-32 resize-y`}
          value={msg}
          onChange={(e) => setMsg(e.target.value)}
          placeholder={copy.msgPlaceholder}
          required
        />
      </label>
      <div className="flex flex-wrap items-center gap-3">
        <button
          type="submit"
          className="inline-flex h-12 items-center gap-2 whitespace-nowrap rounded-lg bg-cta px-5 font-medium text-white transition-colors hover:bg-cta-2"
        >
          {hasNumber ? copy.send : copied ? copy.copied : copy.copy}
          <span aria-hidden>→</span>
        </button>
        {hasNumber && (
          <button
            type="button"
            onClick={copyText}
            className="inline-flex min-h-11 items-center px-1 text-sm text-mist/60 underline-offset-4 hover:text-mist hover:underline"
          >
            {copied ? copy.copied : copy.copy}
          </button>
        )}
      </div>
    </form>
  );
}
