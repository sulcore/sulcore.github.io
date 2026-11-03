<p>
  <strong>SulCore</strong> · software development<br>
  Software sob medida, com engenharia de verdade.
</p>

**[sulcore.github.io](https://sulcore.github.io)** · [Read in English](README.md)

Este é o código do site da SulCore. Construímos sistemas de gestão, integrações e IA aplicada
aos processos das empresas — e deixamos este repositório aberto para você ver como
trabalhamos, não só ler a respeito.

## Stack

| | |
|---|---|
| Framework | Next.js 16 (App Router), exportado como site estático |
| Linguagem | TypeScript em modo `strict` |
| Estilo | Tailwind CSS 4, tokens de design em `@theme` |
| Idiomas | Por rota (`/pt/`, `/en/`), dicionários tipados |
| Hospedagem | GitHub Pages, publicado por GitHub Actions |
| JavaScript no navegador | Só onde há interação: console de demonstração, troca de vídeo, contato |

Sem servidor, sem banco, sem rastreamento. O formulário de contato monta a mensagem de
WhatsApp no navegador; nada é enviado até o visitante tocar no botão.

## Rodar

```bash
nvm use            # Node 22 (ver .nvmrc)
npm ci
npm run dev        # http://localhost:3000/pt/
```

```bash
npm run check      # typecheck + build estático + verificação do resultado
npm run preview    # serve o site exportado em out/
```

## Como uma mudança chega ao ar

1. Branch, mudança, pull request.
2. A **CI** roda typecheck, build e `verify-build` (páginas obrigatórias, link interno
   quebrado, `hreflang` em toda página).
3. Merge na `main` → o **Deploy** builda de novo com o caminho do Pages, verifica e publica.

Toda escolha técnica que não é óbvia fica registrada em [`docs/adr/`](docs/adr/).

## Documentação

- [Arquitetura](docs/ARCHITECTURE.md)
- [Editar conteúdo](docs/CONTENT.md)
- [Deploy e domínio](docs/DEPLOY.md)
- [Decisões de arquitetura](docs/adr/README.md)
- [Como contribuir](CONTRIBUTING.md) · [Segurança](SECURITY.md) · [Changelog](CHANGELOG.md)

## Licença

O código é [MIT](LICENSE). O nome e o logo da SulCore, os textos do site e os vídeos do
produto Nivela em `public/video/` **não** entram na licença — ver [NOTICE](NOTICE.md).
