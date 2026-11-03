# Editing content

Every word on the site is in `src/content/`. You don't need to touch components to change copy.

## Texts

`src/content/dictionary.ts` has two objects, `pt` and `en`, with the same structure.

1. Find the section (`hero`, `services`, `nivela`, `ai`, `process`, `cases`, `team`, `contact`…).
2. Change the Portuguese text.
3. Change the English text in the same place.
4. `npm run typecheck` — if a key exists in one language and not the other, it fails here.

## Cases

`src/content/cases.ts` holds one entry per language for each case.

- New case: add the slug to `CASE_SLUGS`, add the entry in `pt` and `en`, and add a card in
  `dictionary.ts` → `cases.items`.
- `ready: false` shows a structured "coming soon" page; switch to `true` once `challenge`,
  `solution`, `stack` and `result` are filled.

## Contact

`src/content/site.ts` → `whatsapp`: digits only, with country and area code
(`5551…`). Leave it empty and the contact button copies the message instead.

## Videos

Files in `public/video/`, referenced by name in `dictionary.ts` → `nivela.videos`.
Keep each file small (H.264 MP4, ≤ 3 MB) and add a `.jpg` poster with the same name:

```bash
ffmpeg -ss 2 -i public/video/name.mp4 -frames:v 1 -vf scale=1280:-1 -q:v 4 public/video/name.jpg
```

## House rules for copy

- Real numbers only, and check them before publishing.
- Short sentences. Concrete over vague: "NFS-e issued directly" beats "fiscal solutions".
- No prices on the site.
