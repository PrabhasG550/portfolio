export type SectionSlug = 'technology' | 'media' | 'photography' | 'arts'

export interface ProjectEntry {
  slug: string
  title: string
  details: string
  summary: string
  year: string
  tags: string[]
  artwork: string
}

export interface PortfolioSection {
  slug: SectionSlug
  label: string
  projects: ProjectEntry[]
}

export interface InformationLink {
  label: string
  href: string
}

export interface InformationSection {
  label: string
  headingSize?: 'caption' | 'body'
  paragraphs: string[]
  links?: InformationLink[]
}

export const portfolioOwner = {
  name: 'Prabhas Gade',
  email: 'prabhasgade333@gmail.com',
}

export const portfolioSections: PortfolioSection[] = [
  {
    slug: 'technology',
    label: 'Technology',
    projects: [
      {
        slug: 'systems-of-calm',
        title: 'Systems Of Calm',
        details: 'PRODUCT & PACKAGING',
        summary: 'A focus-first operating environment where ambient controls, system states, and quiet motion are treated as packaging for the digital product.',
        year: '2026',
        tags: ['Spatial UI', 'Motion'],
        artwork:
          'linear-gradient(135deg, #d5d5d5 0%, #c7ced6 32%, #ececec 100%), radial-gradient(circle at 18% 22%, rgba(255,255,255,0.76), transparent 40%), radial-gradient(circle at 78% 80%, rgba(40,56,80,0.18), transparent 28%)',
      },
      {
        slug: 'signal-room',
        title: 'Signal Room',
        details: 'EDITORIAL & INTERFACE',
        summary: 'An editorial dashboard language that organizes complex live data into a cinematic sequence of panels, labels, and moments of pause.',
        year: '2025',
        tags: ['Dashboard', 'Brand'],
        artwork:
          'linear-gradient(145deg, #d6d6d6 0%, #cbccd0 38%, #f2f2f2 100%), radial-gradient(circle at 72% 18%, rgba(255,255,255,0.72), transparent 32%), radial-gradient(circle at 26% 78%, rgba(0,0,0,0.09), transparent 34%)',
      },
      {
        slug: 'latency-atlas',
        title: 'Latency Atlas',
        details: 'RESEARCH & PROTOTYPE',
        summary: 'A narrative prototype studying how transitions, pacing, and staging can clarify wayfinding in dense product journeys.',
        year: '2024',
        tags: ['Research', 'Prototype'],
        artwork:
          'linear-gradient(150deg, #d9d9d9 0%, #d2d5db 40%, #f3f4f6 100%), radial-gradient(circle at 78% 28%, rgba(255,255,255,0.65), transparent 28%), radial-gradient(circle at 20% 88%, rgba(60,76,92,0.16), transparent 35%)',
      },
    ],
  },
  {
    slug: 'media',
    label: 'Media',
    projects: [
      {
        slug: 'quiet-broadcast',
        title: 'Quiet Broadcast',
        details: 'IDENTITY & CAMPAIGN',
        summary: 'A modular campaign system where the identity behaves like a broadcast package across stills, motion, and rollout assets.',
        year: '2026',
        tags: ['Art Direction', 'Identity'],
        artwork:
          'linear-gradient(135deg, #d7d7d7 0%, #cecfd3 46%, #f5f5f5 100%), radial-gradient(circle at 70% 30%, rgba(255,255,255,0.74), transparent 35%), radial-gradient(circle at 22% 76%, rgba(23,30,45,0.14), transparent 30%)',
      },
      {
        slug: 'material-stories',
        title: 'Material Stories',
        details: 'EDITORIAL & PACKAGING',
        summary: 'An editorial media series built around surface, texture, and close detail so the packaging itself becomes narrative subject matter.',
        year: '2025',
        tags: ['Editorial', 'Campaign'],
        artwork:
          'linear-gradient(150deg, #dbdbdb 0%, #d4d4d4 42%, #f1f1f1 100%), radial-gradient(circle at 18% 25%, rgba(255,255,255,0.7), transparent 32%), radial-gradient(circle at 84% 70%, rgba(66,76,96,0.16), transparent 34%)',
      },
      {
        slug: 'frame-shift',
        title: 'Frame Shift',
        details: 'MOTION & LAUNCH',
        summary: 'A motion-led launch toolkit designed to make transitions feel tactile, paced, and sharply art directed.',
        year: '2024',
        tags: ['Motion', 'Launch'],
        artwork:
          'linear-gradient(145deg, #d8d8d8 0%, #cfd2d8 44%, #f4f4f4 100%), radial-gradient(circle at 78% 22%, rgba(255,255,255,0.72), transparent 30%), radial-gradient(circle at 24% 82%, rgba(34,42,56,0.13), transparent 36%)',
      },
    ],
  },
  {
    slug: 'photography',
    label: 'Photography',
    projects: [
      {
        slug: 'surface-studies',
        title: 'Surface Studies',
        details: 'STILL LIFE',
        summary: 'A still-life study focused on texture, edge light, and the emotional charge that appears in quiet material compositions.',
        year: '2026',
        tags: ['Still Life', 'Light'],
        artwork:
          'linear-gradient(145deg, #d8d8d8 0%, #d3d5d7 34%, #efefef 100%), radial-gradient(circle at 72% 22%, rgba(255,255,255,0.76), transparent 32%), radial-gradient(circle at 26% 74%, rgba(52,60,68,0.13), transparent 34%)',
      },
      {
        slug: 'north-window',
        title: 'North Window',
        details: 'EDITORIAL & PORTRAIT',
        summary: 'A photographic essay exploring stillness, shadow, and the soft tonal atmosphere of interior scenes and portrait fragments.',
        year: '2025',
        tags: ['Editorial', 'Portrait'],
        artwork:
          'linear-gradient(135deg, #d6d6d6 0%, #ced3d9 36%, #f4f4f4 100%), radial-gradient(circle at 18% 18%, rgba(255,255,255,0.78), transparent 38%), radial-gradient(circle at 82% 78%, rgba(38,48,63,0.14), transparent 30%)',
      },
      {
        slug: 'soft-geometry',
        title: 'Soft Geometry',
        details: 'OBJECTS & INTERIORS',
        summary: 'A visual archive of objects and interiors composed with measured rhythm, negative space, and a quiet editorial eye.',
        year: '2024',
        tags: ['Objects', 'Interiors'],
        artwork:
          'linear-gradient(155deg, #d9d9d9 0%, #d0d2d4 40%, #f5f5f5 100%), radial-gradient(circle at 76% 24%, rgba(255,255,255,0.74), transparent 28%), radial-gradient(circle at 20% 82%, rgba(44,54,70,0.13), transparent 35%)',
      },
    ],
  },
  {
    slug: 'arts',
    label: 'Arts',
    projects: [
      {
        slug: 'material-gesture',
        title: 'Material Gesture',
        details: 'INSTALLATION & FORM',
        summary: 'A studio body of work documenting how rhythm, material tension, and silhouette can build sculptural presence.',
        year: '2026',
        tags: ['Installation', 'Form'],
        artwork:
          'linear-gradient(145deg, #d7d7d7 0%, #d1d3d7 40%, #f3f3f3 100%), radial-gradient(circle at 70% 20%, rgba(255,255,255,0.72), transparent 32%), radial-gradient(circle at 30% 82%, rgba(42,54,69,0.13), transparent 34%)',
      },
      {
        slug: 'counterweight',
        title: 'Counterweight',
        details: 'SCULPTURE & MIXED MEDIA',
        summary: 'A sculptural series balancing hard and soft matter, using silhouette and counterbalance as the primary design language.',
        year: '2025',
        tags: ['Sculpture', 'Mixed Media'],
        artwork:
          'linear-gradient(135deg, #d6d6d6 0%, #d0d2d8 40%, #f4f4f4 100%), radial-gradient(circle at 18% 24%, rgba(255,255,255,0.76), transparent 32%), radial-gradient(circle at 82% 76%, rgba(36,46,60,0.14), transparent 32%)',
      },
      {
        slug: 'trace-space',
        title: 'Trace / Space',
        details: 'STUDY & COMPOSITION',
        summary: 'A set of visual studies where repetition, interruption, and spatial pause define the overall composition.',
        year: '2024',
        tags: ['Study', 'Composition'],
        artwork:
          'linear-gradient(155deg, #d9d9d9 0%, #d2d4d8 38%, #f4f4f4 100%), radial-gradient(circle at 78% 18%, rgba(255,255,255,0.75), transparent 30%), radial-gradient(circle at 20% 80%, rgba(54,64,78,0.15), transparent 34%)',
      },
    ],
  },
]

export const portfolioInfoSections: InformationSection[] = [
  {
    label: 'Information',
    headingSize: 'caption',
    paragraphs: [
      'Prabhas Gade is a multi-disciplinary designer based in Dallas whose work focuses on the interaction between form and material.',
      'Get in contact:',
    ],
    links: [
      { label: portfolioOwner.email, href: `mailto:${portfolioOwner.email}` },
      { label: 'Instagram', href: 'https://www.instagram.com/' },
      { label: 'LinkedIn', href: 'https://www.linkedin.com/' },
      { label: 'View Resume', href: '#' },
    ],
  },
  {
    label: 'Experience',
    headingSize: 'caption',
    paragraphs: [
      '2024 - Present: Independent designer shaping experiences across interfaces, campaigns, and visual systems.',
      '2022 - 2024: Collaborated with product and brand teams to bring interactive stories to market with a focus on motion and craft.',
    ],
  },
  {
    label: 'Education',
    headingSize: 'caption',
    paragraphs: [
      'Studied design through a multidisciplinary lens, combining visual communication, material exploration, and digital prototyping.',
      'Continuing to expand a practice centered on narrative composition, art direction, and tactile interaction design.',
    ],
  },
]

export function getSectionBySlug(slug: string) {
  return portfolioSections.find((section) => section.slug === slug)
}
