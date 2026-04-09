import { readFile } from 'node:fs/promises'
import process from 'node:process'

function parseArgs(argv) {
  const out = {}
  for (let i = 2; i < argv.length; i++) {
    const a = argv[i]
    if (!a.startsWith('--')) continue
    const key = a.slice(2)
    const val = argv[i + 1]
    if (!val || val.startsWith('--')) {
      out[key] = true
    } else {
      out[key] = val
      i++
    }
  }
  return out
}

function assert(condition, message) {
  if (!condition) {
    throw new Error(message)
  }
}

const args = parseArgs(process.argv)

assert(args.slug, 'Missing --slug (e.g. --slug indigo-how-to-ruin-a-first-date)')
assert(args.manifest, 'Missing --manifest (e.g. --manifest scripts/manifests/indigo-how-to-ruin-a-first-date.json)')

const portfolioPath = new URL('../src/data/portfolio.ts', import.meta.url)
const portfolio = await readFile(portfolioPath, 'utf8')

// Hard guard: never auto-touch existing slugs.
if (portfolio.includes(`slug: '${args.slug}'`)) {
  throw new Error(
    `Refusing to generate: slug already exists in src/data/portfolio.ts: ${args.slug}\n` +
      'This script is intentionally non-destructive. Create a new slug or edit manually.',
  )
}

const manifestPath = new URL(`../${args.manifest}`, import.meta.url)
const manifest = JSON.parse(await readFile(manifestPath, 'utf8'))

const {
  title,
  year,
  summary,
  externalLinks = [],
  thumbnailSrc,
  shellBackgroundColor,
  disciplines = ['art', 'technology', 'media'],
  tags = ['Creative direction', 'Styling', 'Photography', 'Graphics', 'Web design'],
  issueGallery = [],
  shootGallery = [],
  writingParagraphs = [],
  creditsLines = [],
} = manifest

assert(title, 'Manifest missing: title')
assert(year, 'Manifest missing: year')
assert(summary, 'Manifest missing: summary')
assert(thumbnailSrc, 'Manifest missing: thumbnailSrc')

function fig(src, caption = '') {
  return { src, caption }
}

const entry = {
  slug: args.slug,
  title,
  disciplines,
  useTechnologyPresentation: true,
  summary,
  year,
  tags,
  ...(externalLinks.length ? { externalLinks } : {}),
  thumbnailSrc,
  ...(shellBackgroundColor ? { shellBackgroundColor } : {}),
  artwork:
    'linear-gradient(145deg, #d8d8d8 0%, #cfd2d8 44%, #f4f4f4 100%), radial-gradient(circle at 78% 22%, rgba(255,255,255,0.72), transparent 30%), radial-gradient(circle at 24% 82%, rgba(34,42,56,0.13), transparent 36%)',
  detailSections: [
    {
      heading: 'Editorial & build',
      paragraphs: [
        'Editorial page generated from Cloudinary assets. Replace this copy with your final project write-up.',
      ],
      galleries: [
        {
          heading: 'Issue gallery',
          layout: 'stack',
          images: issueGallery.map((u) => fig(u)),
        },
        {
          heading: 'ShootFolder',
          layout: 'mosaic',
          images: shootGallery.map((u) => fig(u)),
        },
      ],
    },
    {
      heading: 'Writing',
      paragraphs: writingParagraphs.length ? writingParagraphs : ['(Add writing here)'],
    },
    {
      heading: 'Credits',
      paragraphs: creditsLines.length ? creditsLines : ['(Add credits here)'],
    },
  ],
}

process.stdout.write(
  '\n' +
    JSON.stringify(entry, null, 2)
      .replaceAll('"', "'")
      .replaceAll('\\n', '\\\\n') +
    ',\n',
)

