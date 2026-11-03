# Deploy and domain

## How it works

`main` is always what's live. Every push to `main` runs
[`deploy.yml`](../.github/workflows/deploy.yml):

1. `actions/configure-pages` reports the base path for this repository;
2. typecheck, build with `PAGES_BASE_PATH`, `verify-build`;
3. `out/` is uploaded and published with `actions/deploy-pages`.

The workflow can also be started by hand: **Actions → Deploy → Run workflow**.

## One-time setup (repository admin)

1. **Settings → General → Danger Zone → Change visibility → Public.**
   GitHub Pages on the free plan needs a public repository.
2. **Settings → Pages → Build and deployment → Source: GitHub Actions.**
3. Run the Deploy workflow once (or push to `main`).

## Addresses

| Repository name | Site address |
|---|---|
| `sulcore/sulcore-site` | `https://sulcore.github.io/sulcore-site/` |
| `sulcore/sulcore.github.io` | `https://sulcore.github.io/` |

Renaming the repository to `sulcore.github.io` (**Settings → General → Repository name**)
moves the site to the root of the organization address. No code change is needed: the base
path comes from the workflow. GitHub redirects the old repository URL.

## Custom domain (later)

1. Buy the domain (`sulcore.dev` was available on 2026-11-03).
2. **Settings → Pages → Custom domain**: type the domain and save. Tick **Enforce HTTPS**
   once the certificate is issued.
3. At the DNS provider, for the apex domain, create `A` records to GitHub Pages:
   `185.199.108.153`, `185.199.109.153`, `185.199.110.153`, `185.199.111.153`
   (and optionally `AAAA` `2606:50c0:8000::153` … `8003::153`), plus a `CNAME` for `www`
   pointing to `sulcore.github.io`.
4. Update `url` in `src/content/site.ts` to the new domain and push.

Check GitHub's current documentation before step 3; the addresses rarely change, but it is
the source of truth.
