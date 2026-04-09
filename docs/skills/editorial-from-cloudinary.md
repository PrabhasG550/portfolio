# Editorial project from Cloudinary (safe, non-destructive)

This workflow creates a new editorial project entry in `src/data/portfolio.ts` from a Cloudinary folder, **without modifying any existing projects** (especially ones using local `/public/PortfolioFiles/...` assets).

## Folder convention (Cloudinary)

Use this structure:

- `PortfolioFiles/<FolderName>/`
  - `thumbnail_*` (recommended)
  - `IssueGallery*` images (website/screenshots)
- `PortfolioFiles/<FolderName>/ShootFolder/`
  - shoot photos (mosaic)

Example:

- `PortfolioFiles/HowToRuinAFirstDate/`
- `PortfolioFiles/HowToRuinAFirstDate/ShootFolder/`

## What the site expects

In `src/data/portfolio.ts`:

- `thumbnailSrc`: a Cloudinary `secure_url`
- `detailSections[].galleries[]`:
  - Issue gallery: `layout: 'stack'`
  - ShootFolder: `layout: 'mosaic'`

## Safety rules (do not break existing projects)

- **Never rewrite an existing project’s images**.
  - Do not replace `/PortfolioFiles/...` paths with Cloudinary URLs unless the user explicitly approves per project.
- **Never run “migration” automatically**.
  - Migration is manual and reviewed, because cropping, naming mismatches, and CDN transforms can change the look.
- **Only add/modify the target slug**.
  - If the slug already exists and is not intended to be updated, stop.

## Step-by-step (new project)

1. **List Cloudinary images** (type `upload`) and filter by `asset_folder`:
   - root: `PortfolioFiles/<FolderName>`
   - shoot: `PortfolioFiles/<FolderName>/ShootFolder`

2. **Pick a thumbnail**
   - Prefer an asset whose `display_name` or `public_id` contains `thumbnail`.
   - Otherwise pick the best “hero” image from the root folder.

3. **Build galleries**
   - `Issue gallery`:
     - `layout: 'stack'`
     - use root images like `IssueGallery*` (website/screenshots)
   - `ShootFolder`:
     - `layout: 'mosaic'`
     - use ShootFolder photos, ordered by your preferred narrative

4. **Insert/update the `ProjectEntry`**
   - Set:
     - `useTechnologyPresentation: true`
     - `thumbnailSrc: <cloudinary secure_url>`
     - `tags`: for editorials typically
       - `Creative direction`, `Styling`, `Photography`, `Graphics`, `Web design`
   - Add `detailSections` mirroring the Cntrl structure:
     - `Editorial & build` (with `galleries`)
     - `Writing` (poem/story; set `preserveParagraphLineBreaks: true` if needed)
     - `Credits` (multiple short lines, not a run-on)

5. **(Optional) shell background color**
   - If desired, set `shellBackgroundColor` to a curated hex pulled from the photo palette.
   - This does not depend on thumbnail color extraction.

## Migration guidance (do NOT execute automatically)

If you later want to link locally referenced assets to Cloudinary:

- First, audit `src/data/portfolio.ts` for paths beginning with `/PortfolioFiles/`.
- Match each local filename to a Cloudinary asset in the corresponding `asset_folder`.
- Review:
  - aspect ratio / crop differences (site uses `object-fit: cover`)
  - file formats and compression
  - whether Cloudinary assets are public and stable

Only then, migrate one project at a time with explicit approval.

