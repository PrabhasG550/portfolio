# Editorial manifest format

These manifests are used by `scripts/generateEditorialEntry.mjs` to generate a **new** `ProjectEntry` snippet.

This is intentionally non-destructive:
- If the slug already exists in `src/data/portfolio.ts`, the script refuses to run.
- The output is a snippet you paste manually.

## Example

Create `scripts/manifests/indigo-some-piece.json`:

```json
{
  "title": "Indigo Magazine: Some Piece",
  "year": "2026",
  "summary": "Short summary…",
  "thumbnailSrc": "https://res.cloudinary.com/<cloud>/image/upload/<...>.webp",
  "shellBackgroundColor": "#e7e3df",
  "externalLinks": [{ "label": "Indigo Magazine TX", "href": "https://indigomagazinetx.com/" }],
  "issueGallery": ["https://res.cloudinary.com/<cloud>/image/upload/<...>.png"],
  "shootGallery": ["https://res.cloudinary.com/<cloud>/image/upload/<...>.jpg"],
  "writingParagraphs": ["Your writing…"],
  "creditsLines": ["Written by …", "Shot by …"]
}
```

Then run:

```bash
node scripts/generateEditorialEntry.mjs --slug indigo-some-piece --manifest scripts/manifests/indigo-some-piece.json
```

