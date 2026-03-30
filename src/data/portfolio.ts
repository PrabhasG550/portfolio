export type SectionSlug = 'technology' | 'media' | 'arts'

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
  email: 'PrabhasGade333@gmail.com',
}

export const portfolioSections: PortfolioSection[] = [
  {
    slug: 'technology',
    label: 'Technology',
    projects: [
      {
        slug: 'tactile',
        title: 'Tactile',
        details: 'Product & Interface',
        summary: 'An interactive software experience focused on touch-forward interactions and responsive visual feedback.',
        year: '2026',
        tags: ['Interface', 'UX'],
        artwork:
          'linear-gradient(135deg, #d5d5d5 0%, #c7ced6 32%, #ececec 100%), radial-gradient(circle at 18% 22%, rgba(255,255,255,0.76), transparent 40%), radial-gradient(circle at 78% 80%, rgba(40,56,80,0.18), transparent 28%)',
      },
      {
        slug: '3rdspacedigital-site',
        title: '3rdSpaceDigital Site',
        details: 'Web Development',
        summary: 'A branded site experience built to communicate services clearly while maintaining a modern, responsive interface.',
        year: '2026',
        tags: ['Web', 'Frontend'],
        artwork:
          'linear-gradient(145deg, #d6d6d6 0%, #cbccd0 38%, #f2f2f2 100%), radial-gradient(circle at 72% 18%, rgba(255,255,255,0.72), transparent 32%), radial-gradient(circle at 26% 78%, rgba(0,0,0,0.09), transparent 34%)',
      },
      {
        slug: 'tmoodbile',
        title: 'T-Moodbile',
        details: 'Mobile App',
        summary: 'A mobile-focused build emphasizing fast interactions, clean state transitions, and practical user workflows.',
        year: '2025',
        tags: ['Mobile', 'App'],
        artwork:
          'linear-gradient(150deg, #d9d9d9 0%, #d2d5db 40%, #f3f4f6 100%), radial-gradient(circle at 78% 28%, rgba(255,255,255,0.65), transparent 28%), radial-gradient(circle at 20% 88%, rgba(60,76,92,0.16), transparent 35%)',
      },
      {
        slug: 'codon-dnds-analyzer',
        title: 'Codon DNDS Analyzer',
        details: 'Bioinformatics Tool',
        summary: 'A computational analysis tool for comparing codon-level substitutions and extracting evolutionary signal from sequence data.',
        year: '2025',
        tags: ['Bioinformatics', 'Data'],
        artwork:
          'linear-gradient(155deg, #d9d9d9 0%, #d2d4d8 38%, #f4f4f4 100%), radial-gradient(circle at 76% 24%, rgba(255,255,255,0.74), transparent 28%), radial-gradient(circle at 20% 82%, rgba(44,54,70,0.13), transparent 35%)',
      },
      {
        slug: 'project-pawrkour',
        title: 'Project Pawrkour',
        details: 'Full-Stack Platform',
        summary: 'A project platform designed to coordinate workflows, collaboration, and progress tracking across distributed teams.',
        year: '2024',
        tags: ['Full Stack', 'Collaboration'],
        artwork:
          'linear-gradient(145deg, #d8d8d8 0%, #d3d5d7 34%, #efefef 100%), radial-gradient(circle at 72% 22%, rgba(255,255,255,0.76), transparent 32%), radial-gradient(circle at 26% 74%, rgba(52,60,68,0.13), transparent 34%)',
      },
      {
        slug: 'peer-2-peer-server',
        title: 'Peer 2 Peer Server',
        details: 'Distributed Systems',
        summary: 'A backend server implementation enabling peer-to-peer communication with reliable message routing and connection handling.',
        year: '2024',
        tags: ['Backend', 'Networking'],
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
        slug: 'acm-media-dev-sage',
        title: 'ACM media/dev: SAGE',
        details: 'Student Media & Development',
        summary: 'Media and development work produced for ACM media/dev under the SAGE initiative.',
        year: '2026',
        tags: ['Media', 'Development'],
        artwork:
          'linear-gradient(135deg, #d7d7d7 0%, #cecfd3 46%, #f5f5f5 100%), radial-gradient(circle at 70% 30%, rgba(255,255,255,0.74), transparent 35%), radial-gradient(circle at 22% 76%, rgba(23,30,45,0.14), transparent 30%)',
      },
      {
        slug: 'indigo-cntrl-c-cntrl-v-cntrl-p',
        title: 'Indigo Magazine: Cntrl + C, Cntrl + V, Cntrl + P',
        details: 'Magazine Feature',
        summary: 'Editorial media feature created for Indigo Magazine.',
        year: '2025',
        tags: ['Editorial', 'Magazine'],
        artwork:
          'linear-gradient(150deg, #dbdbdb 0%, #d4d4d4 42%, #f1f1f1 100%), radial-gradient(circle at 18% 25%, rgba(255,255,255,0.7), transparent 32%), radial-gradient(circle at 84% 70%, rgba(66,76,96,0.16), transparent 34%)',
      },
      {
        slug: 'indigo-how-to-ruin-a-first-date',
        title: 'Indigo Magazine: How to Ruin a First Date',
        details: 'Magazine Feature',
        summary: 'Narrative editorial piece produced for Indigo Magazine.',
        year: '2024',
        tags: ['Editorial', 'Magazine'],
        artwork:
          'linear-gradient(145deg, #d8d8d8 0%, #cfd2d8 44%, #f4f4f4 100%), radial-gradient(circle at 78% 22%, rgba(255,255,255,0.72), transparent 30%), radial-gradient(circle at 24% 82%, rgba(34,42,56,0.13), transparent 36%)',
      },
      {
        slug: 'thirdspacedigital-wings4gold',
        title: 'ThirdSpaceDigital: Wings4Gold',
        details: 'Campaign Media',
        summary: 'Creative media developed for the ThirdSpaceDigital Wings4Gold campaign.',
        year: '2024',
        tags: ['Campaign', 'Digital'],
        artwork:
          'linear-gradient(155deg, #d9d9d9 0%, #d2d4d8 38%, #f4f4f4 100%), radial-gradient(circle at 78% 18%, rgba(255,255,255,0.75), transparent 30%), radial-gradient(circle at 20% 80%, rgba(54,64,78,0.15), transparent 34%)',
      },
      {
        slug: 'seven00hills-torn-mv',
        title: 'Seven00Hills: Torn MV',
        details: 'Music Video',
        summary: 'Music video production and creative direction for Seven00Hills - Torn.',
        year: '2023',
        tags: ['Music Video', 'Production'],
        artwork:
          'linear-gradient(145deg, #d8d8d8 0%, #d3d5d7 34%, #efefef 100%), radial-gradient(circle at 72% 22%, rgba(255,255,255,0.76), transparent 32%), radial-gradient(circle at 26% 74%, rgba(52,60,68,0.13), transparent 34%)',
      },
      {
        slug: 'seven00hills-friends-mv',
        title: 'Seven00Hills: Friends MV',
        details: 'Music Video',
        summary: 'Music video production and creative direction for Seven00Hills - Friends.',
        year: '2023',
        tags: ['Music Video', 'Production'],
        artwork:
          'linear-gradient(150deg, #d9d9d9 0%, #d2d5db 40%, #f3f4f6 100%), radial-gradient(circle at 78% 28%, rgba(255,255,255,0.65), transparent 28%), radial-gradient(circle at 20% 88%, rgba(60,76,92,0.16), transparent 35%)',
      },
    ],
  },
  {
    slug: 'arts',
    label: 'Arts',
    projects: [
      {
        slug: 'album-cover-paintings',
        title: 'Album Cover Paintings',
        details: 'Painting Series',
        summary: 'A set of paintings developed as visual concepts for album cover artwork.',
        year: '2024',
        tags: ['Painting', 'Album Art'],
        artwork:
          'linear-gradient(145deg, #d7d7d7 0%, #d1d3d7 40%, #f3f3f3 100%), radial-gradient(circle at 70% 20%, rgba(255,255,255,0.72), transparent 32%), radial-gradient(circle at 30% 82%, rgba(42,54,69,0.13), transparent 34%)',
      },
      {
        slug: 'rain-dancing',
        title: 'RainDancing',
        details: 'Artwork Collection',
        summary: 'An art series centered on movement, rhythm, and atmospheric visual storytelling.',
        year: '2024',
        tags: ['Series', 'Mixed Media'],
        artwork:
          'linear-gradient(135deg, #d6d6d6 0%, #d0d2d8 40%, #f4f4f4 100%), radial-gradient(circle at 18% 24%, rgba(255,255,255,0.76), transparent 32%), radial-gradient(circle at 82% 76%, rgba(36,46,60,0.14), transparent 32%)',
      },
      {
        slug: 'artist-portraits',
        title: 'Artist Portraits',
        details: 'Portrait Series',
        summary: 'A portrait series documenting artists across process, personality, and studio context.',
        year: '2023',
        tags: ['Portraits', 'Artists'],
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
      'Prabhas Gade is a Computer Science student at the University of Texas at Dallas whose passions lie in finding ways to better the world through technology and applying interdisciplinary skills across Human Computer Interaction, finance, medicine, art, and marketing.',
      'Get in contact:',
    ],
    links: [
      { label: portfolioOwner.email, href: `mailto:${portfolioOwner.email}` },
      { label: 'GitHub', href: 'https://github.com/PrabhasG550' },
      { label: 'Devpost', href: 'https://devpost.com/prabhasgade777' },
      { label: 'Instagram', href: 'https://www.instagram.com/prabhasgade/' },
      { label: 'X', href: 'https://x.com/prabhasgade333' },
      { label: 'LinkedIn', href: 'https://www.linkedin.com/in/prabhasgade/' },
      { label: 'View Resume', href: '/Prabhas_Gade_Resume_2025.pdf' },

    ],
  },
  {
    label: 'Experience',
    headingSize: 'caption',
    paragraphs: [
      'Software Engineering Intern\nVinson Process Controls, Richardson, TX\nMay 2025 → Aug 2025',
      'Software Intern\nAdventurefy, Richardson, TX\nJan 2025 → Mar 2025',
      'Frontend Developer\nNextCreator, Dallas, TX\nJun 2024 → Sep 2024',
      'Software Engineering Intern\nCodeaify, Dallas, TX\nJun 2024 → Aug 2024',
      'Developer\nUTD EPICS Comet Cupboard, Richardson, TX\nJan 2024 → May 2024',
      'Software Engineering Intern\nJP Morgan Chase, Houston, TX\nJun 2023 → Aug 2023',
      'Co-Founder + Vice President\nCoding For Medicine, Sugar Land, TX\nAug 2020 → Mar 2023',
      'Co-Founder + Lead Teacher\nCSHaven Non-Profit Organization, Sugar Land, TX\nOct 2021 → Oct 2022',
    ],
  },
  {
    label: 'Education',
    headingSize: 'caption',
    paragraphs: [
      'University of Texas at Dallas — Bachelor of Science in Computer Science, graduating May 2027.\nAcademic Excellence Scholarship Recipient.\nGPA: 3.5.',
      'Coursework: Data Structures & Algorithms, Advanced Algorithms & Analysis, Digital Logic, Computer Architecture, Linux/Unix, Discrete Math, Linear Algebra, Databases, Computer Graphics, Computer Networks, Computer Vision.',
    ],
  },
]

export function getSectionBySlug(slug: string) {
  return portfolioSections.find((section) => section.slug === slug)
}
