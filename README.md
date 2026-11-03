# SulCore — site institucional

Site da SulCore Dev (PT + EN). Direção, decisões e pendências: [`docs/DIRECAO.md`](docs/DIRECAO.md).

## Rodar

```bash
npm install
npm run dev        # http://localhost:3000/pt/
npm run build      # gera o site estático em out/
```

## Onde mexer

| O quê | Arquivo |
|---|---|
| Textos (PT e EN) | `src/content/dictionary.ts` |
| Cases | `src/content/cases.ts` |
| WhatsApp, e-mail, domínio | `src/content/site.ts` |
| Cores e fonte | `src/app/globals.css` (`@theme`) |
| Home | `src/app/[locale]/page.tsx` |
| Página de case | `src/app/[locale]/cases/[slug]/page.tsx` |
| Vídeos do Nivela | `public/video/` |

## Antes de publicar

- Preencher `whatsapp` em `src/content/site.ts` (só dígitos, com DDI e DDD).
- Trocar `url` em `src/content/site.ts` quando o domínio existir.
