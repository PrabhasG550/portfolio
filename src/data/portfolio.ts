export type Discipline = 'art' | 'technology' | 'media'

export const DISCIPLINE_LABELS: Record<Discipline, string> = {
  art: 'Art',
  technology: 'Technology',
  media: 'Media',
}

export const ALL_DISCIPLINES: Discipline[] = ['art', 'technology', 'media']

export function formatDisciplines(disciplines: Discipline[]): string {
  return disciplines.map((d) => DISCIPLINE_LABELS[d]).join(' · ')
}

export interface ProjectExternalLink {
  label: string
  href: string
}

export interface ProjectDetailFigure {
  src: string
  caption: string
}

export interface ProjectDetailGallery {
  heading?: string
  buttonLabel?: string
  expandable?: boolean
  layout?: 'mosaic' | 'stack'
  images: ProjectDetailFigure[]
}

export interface ProjectDetailSection {
  heading?: string
  paragraphs: string[]
  /** When true, newlanes in each paragraph are preserved (e.g. poetry, stanzas). */
  preserveParagraphLineBreaks?: boolean
  /** Inline images with captions, rendered after this section’s paragraphs. */
  figures?: ProjectDetailFigure[]
  /** Optional grouped galleries for section-specific image sets. */
  galleries?: ProjectDetailGallery[]
}

export interface ProjectEntry {
  slug: string
  title: string
  navCategory?: 'work' | 'in-progress'
  /** Primary lens(es) for filtering: Art, Technology, Media. */
  disciplines: Discipline[]
  summary: string
  year: string
  /** Tools, stacks, formats — secondary to disciplines in the UI. */
  tags: string[]
  artwork: string
  /** Rich thumbnail / video hero layout (former “technology” section presentation). */
  useTechnologyPresentation?: boolean
  youtubeVideoId?: string
  externalLinks?: ProjectExternalLink[]
  detailSections?: ProjectDetailSection[]
  /** Public URL (from site root) for cover / card image — used heavily in Technology. */
  thumbnailSrc?: string
  /** Optional shell background override for the detail page. */
  shellBackgroundColor?: string
  /** When true, skip dominant-color shell theming (keep default white/black UI) while still using `thumbnailSrc` for the hero/card. */
  disableThumbnailShellTheme?: boolean
}

/** Resolve a YouTube video id from common URL shapes (youtu.be, watch?v=). */
export function youtubeVideoIdFromUrl(url: string): string | null {
  try {
    const u = new URL(url.trim())
    const host = u.hostname.replace(/^www\./, '')
    if (host === 'youtu.be') {
      const id = u.pathname.replace(/^\//, '').split('/')[0]
      return id || null
    }
    if (host === 'youtube.com' || host === 'm.youtube.com') {
      const v = u.searchParams.get('v')
      if (v) return v
    }
  } catch {
    return null
  }
  return null
}

export function youtubeEmbedSrc(videoId: string): string {
  const q = new URLSearchParams({ rel: '0', modestbranding: '1' })
  return `https://www.youtube.com/embed/${encodeURIComponent(videoId)}?${q}`
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

export const portfolioProjects: ProjectEntry[] = [
      {
        slug: 'tactile',
        title: 'Tactile',
        disciplines: ['technology'],
        useTechnologyPresentation: true,
        summary:
          'Tactile closes the gap between “accessible” tools that feel dumbed down and pro tools that freeze people out: hand movement becomes direct design control, synced with Figma in real time so instinct can turn into a real layout without years of training.',
        year: '2026',
        tags: ['Figma', 'FastAPI', 'MongoDB', 'WebSockets'],
        youtubeVideoId: 'ZS_jWvac8cY',
        externalLinks: [
          {
            label: 'See our pitchdeck',
            href: '/PortfolioFiles/technology/Tactile/tactile-slides.pdf',
          },
          {
            label: 'See our dev post',
            href: 'https://devpost.com/software/tactile-tyoilq',
          },
        ],
        thumbnailSrc: '/PortfolioFiles/technology/Tactile/thumbnail.webp',
        artwork:
          'linear-gradient(135deg, #d5d5d5 0%, #c7ced6 32%, #ececec 100%), radial-gradient(circle at 18% 22%, rgba(255,255,255,0.76), transparent 40%), radial-gradient(circle at 78% 80%, rgba(40,56,80,0.18), transparent 28%)',
        detailSections: [
          {
            heading: 'Inspiration',
            paragraphs: [
              'The tools that shape how a product feels have usually required years of design training to use well. We wanted anyone with a clear vision to translate instinct into a real design system—not a toy mock, but something a serious designer would still respect.',
            ],
          },
          {
            heading: 'Research',
            paragraphs: [
              'We dug into Figma Makeathon submissions to see what had already been built and where the ceiling was, then listened on X for how designers actually talk: what frustrates them, what they repost, what makes them stop scrolling.',
              'The bar was usefulness, not novelty. The same tension kept appearing: approachable tools feel dumbed down; powerful tools shut non-designers out. That gap became the target—pick-up in about a minute, still credible to a pro.',
            ],
          },
          {
            heading: 'Ideation',
            paragraphs: [
              'We did not start from a feature list. In FigJam we mapped Makeathon work we genuinely admired and asked what made it stick across audiences. The strongest ideas had a point of view, not only clever tech.',
              'That became the filter: soul before features. Brand, gestures, and feeling-first language all followed from chasing the same quality we saw in the work we looked up to.',
              'The board below is from that ideation pass—clusters of references, gesture concepts, and “what if” flows before anything was committed in code.',
            ],
            figures: [
              {
                src: '/PortfolioFiles/technology/Tactile/ideationprocess.webp',
                caption:
                  'FigJam ideation map: grouping Makeathon references and early gesture language before locking a feature list.',
              },
            ],
          },
          {
            heading: 'Rapid prototyping & iteration',
            paragraphs: [
              'Lo-fi Figma frames were just enough to test an idea, then fed straight into Claude and Cursor as build context so decisions in Figma showed up in code within hours. The loop was sketch → build → break → return to Figma, so we could kill wrong directions before they hardened.',
              'The gesture map alone went through four full rewrites (open palm, finger counting, then clearer distinct shapes). Every version asked: does this feel like Tactile, or like a generic tool?',
            ],
          },
          {
            heading: 'What it does',
            paragraphs: [
              'Pull: read the current Figma page snapshot and generate an editable frame aligned with existing typography, color, and structure.',
              'Manipulate: camera tracks hands at ~60fps—move, resize, and style live. Push: treat the in-browser state as source of truth, reconcile to context, and send a new derived frame back to Figma.',
              'The stills here show live sync in the product UI: the same frame you manipulate in the browser stays tied to Figma context, and “using” captures the in-session layout while hands are driving the frame.',
            ],
            figures: [
              {
                src: '/PortfolioFiles/technology/Tactile/livesync.webp',
                caption:
                  'Realtime sync view: web surface and Figma-derived state staying aligned while the session is active.',
              },
              {
                src: '/PortfolioFiles/technology/Tactile/using.webp',
                caption:
                  'Hands-on control of the generated frame—resize, move, and style without leaving the tactile surface.',
              },
            ],
          },
          {
            heading: 'Gestures & breakpoints',
            paragraphs: [
              'Point: cursor / hover-select. Pinch: click-select. Peace: scroll in the style editor. Thumbs up (short hold): toggle style editor. Open palm: drag the frame when the hand is over it. Rock / horns (hold): delete frame. Two palms: create or pull a frame. Two peace signs: resize by hand spread across breakpoints—375 / 768 / 1024 / 1440px.',
              'Keyboard and mouse stay first-class: F create frame, 1–4 breakpoints, E editor, Esc close, Delete/Backspace remove, plus click, wheel, and drag for anyone without a camera.',
            ],
          },
          {
            heading: 'Challenges',
            paragraphs: [
              'At this fidelity, gesture recognition has to separate intentional input from ambient motion with very low latency. Tuning thresholds to feel responsive without constant false triggers was one of the hardest parts of the build.',
            ],
          },
          {
            heading: 'What we learned',
            paragraphs: [
              'A good interface is measured by how fast it disappears—when the tool stops demanding attention, the work gets the focus. That took more passes on feel than on raw functionality.',
            ],
          },
          {
            heading: 'What’s next',
            paragraphs: [
              'Natural language: describe an aesthetic in plain language and have Tactile propose a full design language. Gestures handle space; language handles the rest.',
            ],
          },
          {
            heading: 'Tech stack',
            paragraphs: [
              'FastAPI + MongoDB for frame state, gesture events, plugin sessions, snapshots, and patch history. WebSockets for realtime Figma sync. Deterministic style extraction from snapshots for reliable defaults; LangChain / Groq to generate and reconcile content and structure where AI helps.',
            ],
          },
        ],
      },
      {
        slug: '3rdspacedigital-site',
        title: '3rdSpaceDigital Site',
        disciplines: ['art', 'technology', 'media'],
        useTechnologyPresentation: true,
        summary:
          'ThirdSpaceDigital is a Dallas “third place” on the web: part archive, part living collective—built to connect people through media and real-world events, with editorial typography and a mood drawn from magazine culture and analog Y2K.',
        year: '2026',
        tags: ['React', 'Supabase', 'Figma'],
        externalLinks: [{ label: '3rdspacedigital.org', href: 'https://3rdspacedigital.org/' }],
        thumbnailSrc: '/PortfolioFiles/technology/ThirdSpaceDigital/thumbnail.webp',
        disableThumbnailShellTheme: true,
        artwork:
          'linear-gradient(145deg, #d6d6d6 0%, #cbccd0 38%, #f2f2f2 100%), radial-gradient(circle at 72% 18%, rgba(255,255,255,0.72), transparent 32%), radial-gradient(circle at 26% 78%, rgba(0,0,0,0.09), transparent 34%)',
        detailSections: [
          {
            heading: 'Why this exists',
            paragraphs: [
              'The site was built to connect people through media and in-person gatherings. Dallas felt like it needed another third space—somewhere that is not just home or work—so the collective could operate as both an archive and a living group of people choosing community on purpose.',
            ],
          },
          {
            heading: 'Visual & editorial choices',
            paragraphs: [
              'I studied a lot of magazine-driven editorial sites—032c.com was a major reference for pacing, type, and how photography and text share the stage. Ubisoft’s bold UI language and analog Y2K textures fed the personality: confident, slightly playful, not a sterile corporate brochure.',
              'Layouts and components were designed in Figma before touching code so the system stayed coherent from mockup to production.',
              'The Figma mock shows the component language and grid before React; the landing capture is how that system reads at full width in the browser.',
            ],
            figures: [
              {
                src: '/PortfolioFiles/technology/ThirdSpaceDigital/figmamockup.webp',
                caption: 'Figma page structure: typography, spacing, and editorial blocks before implementation.',
              },
              {
                src: '/PortfolioFiles/technology/ThirdSpaceDigital/landingpage.webp',
                caption: 'Live landing: magazine-style hierarchy and photography-forward layout in production.',
              },
            ],
          },
          {
            heading: 'Build',
            paragraphs: [
              'The front end is React. Supabase backs the product: auth-ish patterns aside, it is where the photo archive lives so the site can stay a browsable record as well as a calendar for what is happening next.',
              'These screens tie that story together: the archive grid is the long-lived media record; events and long-form article layouts are how the collective announces and reflects on work in public.',
            ],
            figures: [
              {
                src: '/PortfolioFiles/technology/ThirdSpaceDigital/photoarchives.webp',
                caption: 'Photo archive surface backed by Supabase—browsable history of the collective’s media.',
              },
              {
                src: '/PortfolioFiles/technology/ThirdSpaceDigital/event.webp',
                caption: 'Events presentation: bridging IRL gatherings with the site’s editorial voice.',
              },
              {
                src: '/PortfolioFiles/technology/ThirdSpaceDigital/article.webp',
                caption: 'Article template: long-form typography and imagery in the same system as the rest of the site.',
              },
            ],
          },
        ],
      },
      {
        slug: 'tmoodbile',
        title: 'T-Moodbile',
        disciplines: ['technology'],
        useTechnologyPresentation: true,
        summary:
          'A hackathon build for T-Mobile-shaped sentiment: an AI agent that actually calls customers (Twilio + ElevenLabs), scrapes Reddit and Google Trends, runs everything through Gemini for sentiment and concrete “fix this” insights, and emails staff when the mood score slips—plus a dashboard queue to close the loop.',
        year: '2025',
        tags: ['Next.js', 'Twilio', 'Gemini', 'Neon', 'ElevenLabs'],
        youtubeVideoId: 'NIEeKt1iJII',
        thumbnailSrc: '/PortfolioFiles/technology/TMoodBile/dashboard.webp',
        externalLinks: [
          { label: 'Devpost', href: 'https://devpost.com/software/t-mood-bile' },
        ],
        artwork:
          'linear-gradient(150deg, #d9d9d9 0%, #d2d5db 40%, #f3f4f6 100%), radial-gradient(circle at 78% 28%, rgba(255,255,255,0.65), transparent 28%), radial-gradient(circle at 20% 88%, rgba(60,76,92,0.16), transparent 35%)',
        detailSections: [
          {
            heading: 'Inspiration',
            paragraphs: [
              'Customer sentiment is easy to collect and hard to use. We wanted a system that does not only listen—it asks—and helps T-Mobile both understand how people feel and see what to change next.',
            ],
          },
          {
            heading: 'What it does (end to end)',
            paragraphs: [
              'AI-powered voice surveys: Twilio places the call; ElevenLabs supplies a believable voice; the flow is driven from our API (including TwiML served through an ngrok tunnel during development).',
              'Multi-channel analysis: hourly Reddit pulls (e.g. r/tmobile) and daily Google Trends pulls via SerpApi, comparing negative-intent queries (“how to cancel T-Mobile”) against positive ones (“T-Mobile deals”) for indirect signal.',
              'Gemini + Google Cloud: recordings become transcripts (Speech-to-Text), then sentiment (“good” / “neutral” / “bad”). For non-good outcomes, a second Gemini pass turns the transcript into an actionable insight.',
              'Alerting: every five minutes a cron job recomputes aggregate sentiment; if “good” falls below 70%, Resend emails a staff list, with an isAlertActive flag so we do not spam the same alert.',
              'Operations: a to-do queue of unresolved insights; “Mark as Resolved” hits our API and updates Neon Postgres so the dashboard reflects reality.',
              'The dashboard captures aggregate mood, channel mix, and queue health—the screenshots below mirror how an operator would scan the system during a live incident.',
            ],
            figures: [
              {
                src: '/PortfolioFiles/technology/TMoodBile/dashboard2.webp',
                caption: 'High-level sentiment overview and trend readout for the dashboard home.',
              },
              {
                src: '/PortfolioFiles/technology/TMoodBile/dashboard3.webp',
                caption: 'Drill-down into sources and time windows so “good” vs “bad” is not a single opaque number.',
              },
            ],
          },
          {
            heading: 'How we built it',
            paragraphs: [
              'Frontend: Next.js on Vercel behind a custom GoDaddy domain (tmoodbile.biz). Backend: Node/Express as the hub for routes, Twilio webhooks, and scraping jobs. Database: Neon serverless Postgres for customers, survey payloads, Reddit rows, and trends time series.',
              'This view shows how we surfaced stack-specific status (jobs, webhooks, DB) next to product metrics so hackathon judges—and future us—could see the whole system at once.',
            ],
            figures: [
              {
                src: '/PortfolioFiles/technology/TMoodBile/dashboard4.webp',
                caption: 'Implementation-facing dashboard slice: tying Vercel/Neon/Twilio concerns to user-visible outcomes.',
              },
            ],
          },
          {
            heading: 'Pipelines in plain language',
            paragraphs: [
              'Call flow: Swagger-triggered callCustomer → Twilio → TwiML with audio from ElevenLabs → user response recorded → hang-up webhook with recording URL → download WAV → transcribe → Gemini sentiment → optional insight → persist.',
              'Scraping flow: cron + axios on Reddit; separate daily SerpApi job for Trends; same analysis path into the DB.',
              'Alert flow: cron reads aggregate sentiment, threshold check, Resend batch, stateful guard against duplicate emails.',
              'The UI here emphasizes pipeline stages—what ran, what failed, and what is waiting on a webhook—so async failures are visible instead of silent.',
            ],
            figures: [
              {
                src: '/PortfolioFiles/technology/TMoodBile/dashboard5.webp',
                caption: 'Pipeline-oriented view: call → transcribe → sentiment → insight, aligned with the backend flow.',
              },
            ],
          },
          {
            heading: 'Challenges & what we’re proud of',
            paragraphs: [
              'Timeboxing plus free-tier limits across many vendors made integration work the real game—especially wiring a serious backend to a polished dashboard.',
              'The pieces we care about most are not the charts alone: the autonomous caller, the proactive email path, and the insight queue that makes the data operational.',
              'The last capture highlights the insight queue and alert context—the part that turns raw sentiment into “someone should do X today.”',
            ],
            figures: [
              {
                src: '/PortfolioFiles/technology/TMoodBile/dashboard6.webp',
                caption: 'Insights queue and alerting context: actionable items and threshold-driven notifications.',
              },
            ],
          },
          {
            heading: 'What we learned',
            paragraphs: [
              'AI has to earn its place in the architecture. We spent real time deciding where models add judgment versus where deterministic code should own the contract, so the product feels intentional instead of “AI slapped on top.”',
            ],
          },
          {
            heading: 'What’s next',
            paragraphs: [
              'With real carrier data, random-sample calling at a button press, PDF export for exec-ready reports, and more in-dashboard controls for triage and ownership.',
            ],
          },
        ],
      },
      {
        slug: 'codon-dnds-analyzer',
        title: 'Codon DNDS Analyzer',
        disciplines: ['technology'],
        useTechnologyPresentation: true,
        summary:
          'A codon-focused dN/dS-style workflow for sequence data—built to summarize substitution patterns and evolutionary signal, with figures for comparative runs (including photosynthesis-related coding regions) and a Zenodo deposit so methods and outputs stay citable.',
        year: '2025',
        tags: ['Python', 'Zenodo'],
        externalLinks: [{ label: 'Zenodo record', href: 'https://zenodo.org/records/7577822' }],
        thumbnailSrc: '/PortfolioFiles/technology/dndscalculator/thumbnail.webp',
        artwork:
          'linear-gradient(155deg, #d9d9d9 0%, #d2d4d8 38%, #f4f4f4 100%), radial-gradient(circle at 76% 24%, rgba(255,255,255,0.74), transparent 28%), radial-gradient(circle at 20% 82%, rgba(44,54,70,0.13), transparent 35%)',
        detailSections: [
          {
            heading: 'Publication & reproducibility',
            paragraphs: [
              'The full methods, datasets, and reference outputs live on Zenodo (see link). That keeps the analysis auditable: someone else can re-run or extend the same codon-level comparisons without hunting through scattered files.',
            ],
          },
          {
            heading: 'What the tool is doing',
            paragraphs: [
              'The analyzer works at the codon level to compare substitution patterns and extract evolutionary signal—similar in spirit to dN/dS thinking, but oriented toward codon-resolution summaries that are easier to relate back to functional regions.',
              'One motivating use case in the project notes is photosynthesis-related sequence context: comparing selective pressure signals across coding regions where biological interpretation matters as much as the raw statistics.',
              'The first pair of plots shows baseline comparative output: how codon-level summaries change when you hold the alignment fixed and vary the comparison window or subset.',
            ],
            figures: [
              {
                src: '/PortfolioFiles/technology/dndscalculator/graph.webp',
                caption: 'Primary comparison graph: codon-level signal across the chosen alignment slice.',
              },
              {
                src: '/PortfolioFiles/technology/dndscalculator/graph3.webp',
                caption: 'Alternate parameterization of the same workflow—sanity-checking stability under a different cut of the data.',
              },
            ],
          },
          {
            heading: 'Figures',
            paragraphs: [
              'Additional exports stress-test the readout: different layouts emphasize rate heterogeneity, tail behavior, or region-specific spikes. Together they are meant for a reviewer who wants to see the same conclusion from more than one visual angle.',
            ],
            figures: [
              {
                src: '/PortfolioFiles/technology/dndscalculator/graph4.webp',
                caption: 'Extended run: highlighting contrast between conditions or regions within the same analysis pipeline.',
              },
              {
                src: '/PortfolioFiles/technology/dndscalculator/graphh2.webp',
                caption: 'Supplementary layout (H2 / alternate view): useful when presenting alongside text or slides from the Zenodo bundle.',
              },
            ],
          },
        ],
      },
      {
        slug: 'project-pawrkour',
        title: 'Project Pawrkour',
        disciplines: ['technology', 'media'],
        useTechnologyPresentation: true,
        summary:
          'A Unity third-person parkour game: you play a cat breaking out of a lab, with wall-running, a full first level through an end scene, a rigged and animated hero, UI treated as a first-class art pass, and music that ramps with how fast the cat moves.',
        year: '2024',
        tags: ['Unity', 'C#', 'ShaderLab'],
        externalLinks: [{ label: 'GitHub', href: 'https://github.com/PrabhasG550/Project-Pawkour' }],
        thumbnailSrc: '/PortfolioFiles/technology/projectpawrkour/thumbnail.webp',
        artwork:
          'linear-gradient(145deg, #d8d8d8 0%, #d3d5d7 34%, #efefef 100%), radial-gradient(circle at 72% 22%, rgba(255,255,255,0.76), transparent 32%), radial-gradient(circle at 26% 74%, rgba(52,60,68,0.13), transparent 34%)',
        detailSections: [
          {
            heading: 'Premise & feel',
            paragraphs: [
              'Project Pawrkour is built around readable, expressive traversal: the fantasy is simple (escape the lab as a cat) but the bar for feel is high—movement, camera, and audio all had to agree so speedrunning the level feels rewarding instead of sloppy.',
              'The control presentation below is the same language players see in-game: we treated prompts and HUD reads as part of the art pass, not an afterthought.',
            ],
            figures: [
              {
                src: '/PortfolioFiles/technology/projectpawrkour/controls.webp',
                caption: 'On-screen control and feedback layout: tying inputs to readable UI during parkour.',
              },
            ],
          },
          {
            heading: 'What shipped in the slice',
            paragraphs: [
              'Core locomotion: run, jump, and wall-run with tuned acceleration and air control. One complete level with a dedicated end-of-level beat. A fully animated cat rig so personality reads in idle and motion. High-fidelity UI (menus, feedback, diegetic touches) rather than placeholder panels.',
              'Audio reactivity: the score responds to gameplay—tempo and intensity follow the cat’s speed so the mix reinforces risk without fighting the player’s inputs.',
              'The in-engine still shows the cat mid-level with final lighting and materials—the slice we used to validate camera distance, neon reads, and readability at speed.',
            ],
            figures: [
              {
                src: '/PortfolioFiles/technology/projectpawrkour/game+picture.webp',
                caption: 'Gameplay capture: cat traversal, environment art, and camera framing from the first shippable level.',
              },
            ],
          },
          {
            heading: 'Problems we had to solve',
            paragraphs: [
              'Animation consistency and blending so transitions between floor, air, and wall contact do not pop. Wall-run state needed careful verification so edge cases (corners, shallow angles, late jumps) did not desync the controller.',
              'A neon-forward material pass leaned on a custom fragment shader; tuning emissive balance against lighting was finicky. Camera clipping through tight geometry needed iteration. Unity version control limitations slowed parallel work compared to a pure Git art pipeline.',
            ],
          },
        ],
      },
      {
        slug: 'peer-2-peer-server',
        title: 'Peer 2 Peer Server',
        navCategory: 'in-progress',
        disciplines: ['technology'],
        useTechnologyPresentation: true,
        summary:
          'A peer-to-peer server experiment focused on message routing and connection lifecycle—notes and implementation are still in progress; this entry will gain diagrams, protocol notes, and benchmarks once the build is documented.',
        year: '2024',
        tags: ['Node.js', 'Networking'],
        artwork:
          'linear-gradient(150deg, #d9d9d9 0%, #d2d5db 40%, #f3f4f6 100%), radial-gradient(circle at 78% 28%, rgba(255,255,255,0.65), transparent 28%), radial-gradient(circle at 20% 88%, rgba(60,76,92,0.16), transparent 35%)',
        detailSections: [
          {
            heading: 'Status',
            paragraphs: [
              'Per the project notes this section is coming soon—no public WebP set yet. The goal is to document a small P2P server that handles discovery, reliable routing, and failure modes worth teaching, not just a toy echo service.',
            ],
          },
          {
            heading: 'Planned write-up',
            paragraphs: [
              'When it lands, expect architecture diagrams, the handshake and retry story, and honest notes on what broke under packet loss or asymmetric NAT. Until then the gradient card stands in as a placeholder.',
            ],
          },
        ],
      },
      {
        slug: 'acm-media-dev-sage',
        title: 'ACM media/dev: SAGE',
        navCategory: 'in-progress',
        disciplines: ['media', 'technology'],
        summary: 'Media and development work produced for ACM media/dev under the SAGE initiative.',
        year: '2026',
        tags: ['Web'],
        artwork:
          'linear-gradient(135deg, #d7d7d7 0%, #cecfd3 46%, #f5f5f5 100%), radial-gradient(circle at 70% 30%, rgba(255,255,255,0.74), transparent 35%), radial-gradient(circle at 22% 76%, rgba(23,30,45,0.14), transparent 30%)',
      },
      {
        slug: 'indigo-cntrl-c-cntrl-v-cntrl-p',
        title: 'Indigo Magazine: Cntrl + C, Cntrl + V, Cntrl + P',
        disciplines: ['art', 'technology', 'media'],
        useTechnologyPresentation: true,
        summary:
          'Poetry by Zenah I., shot and styled on set, with site and article design for Indigo’s serial issue—print sensibility translated into a React article on indigomagazinetx.com.',
        year: '2025',
        tags: ['Creative Direction', 'Styling', 'Photography', 'Graphics', 'Web design'],
        externalLinks: [
          {
            label: 'Read the piece (Indigo OS serial)',
            href: 'https://indigomagazinetx.com/issues/serial/indigoos',
          },
          {
            label: 'Indigo Magazine TX',
            href: 'https://indigomagazinetx.com/',
          },
        ],
        thumbnailSrc: 'https://res.cloudinary.com/ddcf7lxh1/image/upload/v1775669782/starflyer67_wba9o3.webp',
        shellBackgroundColor: '#d7e3e4',
        artwork:
          'linear-gradient(150deg, #dbdbdb 0%, #d4d4d4 42%, #f1f1f1 100%), radial-gradient(circle at 18% 25%, rgba(255,255,255,0.7), transparent 32%), radial-gradient(circle at 84% 70%, rgba(66,76,96,0.16), transparent 34%)',
        detailSections: [
          {
            heading: 'Editorial & build',
            paragraphs: [
              'This feature lives in Indigo’s online serial “Indigo OS.” I directed, styled, and photographed the models on set, and directed the article experience on the site—layout and design tuned to the piece, not a one-size layout.',
              'The article is built with React and other front-end tooling so typography, pacing, and imagery read as a single editorial object on the web.',
            ],
            galleries: [
              {
                heading: 'Issue gallery',
                layout: 'stack',
                images: [
                  {
                    src: 'https://res.cloudinary.com/ddcf7lxh1/image/upload/v1775669781/indigoos2_bxsb6a.webp',
                    caption: 'Additional Indigo OS spread.',
                  },
                  {
                    src: 'https://res.cloudinary.com/ddcf7lxh1/image/upload/v1775669781/indigoos_y8cb6s.webp',
                    caption: 'Indigo OS editorial spread.',
                  },
                ],
              },
              {
                heading: 'ShootFolder',
                buttonLabel: 'Open Shoot Gallery',
                expandable: true,
                layout: 'mosaic',
                images: [
                  {
                    src: 'https://res.cloudinary.com/ddcf7lxh1/image/upload/v1775708783/WIP_qp8lih.webp',
                    caption: 'WIP frame from shoot sequence.',
                  },
                  {
                    src: 'https://res.cloudinary.com/ddcf7lxh1/image/upload/v1775708780/IMG_3565-Edit_1_zu6zez.webp',
                    caption: 'Edited portrait still from the set.',
                  },
                  {
                    src: 'https://res.cloudinary.com/ddcf7lxh1/image/upload/v1775708786/barcodetie_b7aell.webp',
                    caption: 'Barcode tie concept frame.',
                  },
                  {
                    src: 'https://res.cloudinary.com/ddcf7lxh1/image/upload/v1775708781/blurexposure-2_i7srmv.webp',
                    caption: 'Blur exposure experiment.',
                  },
                  {
                    src: 'https://res.cloudinary.com/ddcf7lxh1/image/upload/v1775708781/blurredo_vzmzfr.webp',
                    caption: 'Blurred motion red variation.',
                  },
                  {
                    src: 'https://res.cloudinary.com/ddcf7lxh1/image/upload/v1775708785/facestretch_f4nvgh.webp',
                    caption: 'Face stretch treatment.',
                  },
                  {
                    src: 'https://res.cloudinary.com/ddcf7lxh1/image/upload/v1775708779/facetrack2.2_xixe88.webp',
                    caption: 'Face track pass 2.2.',
                  },
                  {
                    src: 'https://res.cloudinary.com/ddcf7lxh1/image/upload/v1775708782/glitch_qzurbc.webp',
                    caption: 'Glitch composition frame.',
                  },
                  {
                    src: 'https://res.cloudinary.com/ddcf7lxh1/image/upload/v1775708787/keyboardgirl_hiy5sw.webp',
                    caption: 'Keyboard portrait setup.',
                  },
                  {
                    src: 'https://res.cloudinary.com/ddcf7lxh1/image/upload/v1775708784/serialword_ekglon.webp',
                    caption: 'Serial word graphic frame.',
                  },
                  {
                    src: 'https://res.cloudinary.com/ddcf7lxh1/image/upload/v1775708778/text2_bld5wl.webp',
                    caption: 'Text treatment variant two.',
                  },
                  {
                    src: 'https://res.cloudinary.com/ddcf7lxh1/image/upload/v1775708779/typewrite_wrvt4u.webp',
                    caption: 'Typewriter motif frame.',
                  },
                ],
              },
            ],
          },
          {
            heading: 'Ctrl + C, Ctrl + V, Ctrl + P',
            preserveParagraphLineBreaks: true,
            paragraphs: [
              [
                'There is a ladder that I climb, but it gets narrower with each step',
                "I'm ruled by minutes of the hour",
                'Reserved to nothing but the arms on the wall',
                'And my seat at the oval table',
                'Attuned to the drumbeat of the ticking clock',
                'Careful to not twist my spine or crane my neck',
                'And spiral out of orbit',
                '',
                'Pinstripes stapled to my skin',
                'But if you ripped at the metal seams and tore the two apart',
                'Would you be harrowed by my decrepit entity',
                'Vacant of warm showers and thick stew,',
                'But embalmed with the sweetest vanilla paste?',
                'Would you, too, look away?',
                '',
                'Just as a passing stranger could only catch a glimpse',
                'Of these tailored pants and a gouging gaze',
                'But not my frosted fingertips of malaise',
                "On the ladder you say that I'm hard to reach,",
                'With yourself and the clouds below me',
                'But am I hard to reach, or are you too far away?',
              ].join('\n'),
            ],
          },
          {
            heading: 'Credits',
            paragraphs: [
              'Written by Zenah I.',
              'Shot and styled by Zenah I. and Prabhas Gade.',
              'Web design by Prabhas Gade and Aaron C.',
              'Graphics by Prabhas Gade and Tanishka Y.',
              'Modeled by Ethan, Zenah, Prabhas, Sachhyam, Daniel, Noor, and Alexandria.',
            ],
          },
        ],
      },
      {
        slug: 'indigo-how-to-ruin-a-first-date',
        title: 'Indigo Magazine: How to Ruin a First Date',
        disciplines: ['art', 'technology', 'media'],
        useTechnologyPresentation: true,
        summary:
          'A narrative editorial produced for Indigo: creative direction and a photo-driven article experience on the web, built to read with magazine pacing rather than a generic template.',
        year: '2024',
        tags: ['Creative direction', 'Styling', 'Photography', 'Graphics', 'Web design'],
        externalLinks: [
          {
            label: 'Read the piece',
            href: 'https://indigomagazinetx.com/articles/how-to-ruin-a-first-date',
          },
          {
            label: 'Indigo Magazine TX',
            href: 'https://indigomagazinetx.com/',
          },
        ],
        thumbnailSrc: 'https://res.cloudinary.com/ddcf7lxh1/image/upload/v1775717374/thumbnail_cy16pq.png',
        shellBackgroundColor: '#e7e3df',
        artwork:
          'linear-gradient(145deg, #d8d8d8 0%, #cfd2d8 44%, #f4f4f4 100%), radial-gradient(circle at 78% 22%, rgba(255,255,255,0.72), transparent 30%), radial-gradient(circle at 24% 82%, rgba(34,42,56,0.13), transparent 36%)',
        detailSections: [
          {
            heading: 'Editorial & build',
            paragraphs: [
              'I coded the article site and contributed photography. With Luis Alarcon, I built an architecture that makes later Indigo articles faster to ship: custom reusable components designed for editorial pacing, not one-off pages.',
              'For this first article, I built a `PhotoGallery` component that could be reused on later articles whenever the story called for a photo set—keeping layout and behavior consistent across pieces.',
            ],
            galleries: [
              {
                heading: 'Issue gallery',
                layout: 'stack',
                images: [
                  {
                    src: 'https://res.cloudinary.com/ddcf7lxh1/image/upload/v1775717403/IssueGallery1_egmg8n.png',
                    caption: 'Article / website screen capture.',
                  },
                  {
                    src: 'https://res.cloudinary.com/ddcf7lxh1/image/upload/v1775717489/issuegallery2_xwcpg3.png',
                    caption: 'Article / website screen capture.',
                  },
                ],
              },
              {
                heading: 'My photos',
                layout: 'mosaic',
                images: [
                  {
                    src: 'https://res.cloudinary.com/ddcf7lxh1/image/upload/v1775717237/1-IMG_0131_tjynls.jpg',
                    caption: 'Shoot still.',
                  },
                  {
                    src: 'https://res.cloudinary.com/ddcf7lxh1/image/upload/v1775717238/2-IMG_0144_vsmc1g.jpg',
                    caption: 'Shoot still.',
                  },
                  {
                    src: 'https://res.cloudinary.com/ddcf7lxh1/image/upload/v1775717216/3-IMG_0127_yo66z2.jpg',
                    caption: 'Shoot still.',
                  },
                  {
                    src: 'https://res.cloudinary.com/ddcf7lxh1/image/upload/v1775717231/4-IMG_0142_ftroi0.jpg',
                    caption: 'Shoot still.',
                  },
                  {
                    src: 'https://res.cloudinary.com/ddcf7lxh1/image/upload/v1775717219/5-IMG_0126_pctsxq.jpg',
                    caption: 'Shoot still.',
                  },
                  {
                    src: 'https://res.cloudinary.com/ddcf7lxh1/image/upload/v1775717221/6-IMG_0109_k7lsiy.jpg',
                    caption: 'Shoot still.',
                  },
                  {
                    src: 'https://res.cloudinary.com/ddcf7lxh1/image/upload/v1775717217/7-IMG_0140_m2hfgk.jpg',
                    caption: 'Shoot still.',
                  },
                  {
                    src: 'https://res.cloudinary.com/ddcf7lxh1/image/upload/v1775717226/8-IMG_0139_rxdvpa.jpg',
                    caption: 'Shoot still.',
                  },
                  {
                    src: 'https://res.cloudinary.com/ddcf7lxh1/image/upload/v1775717223/9-IMG_0166_muzzno.jpg',
                    caption: 'Shoot still.',
                  },
                  {
                    src: 'https://res.cloudinary.com/ddcf7lxh1/image/upload/v1775717228/10-IMG_0163_efzlxn.jpg',
                    caption: 'Shoot still.',
                  },
                  {
                    src: 'https://res.cloudinary.com/ddcf7lxh1/image/upload/v1775717230/11-IMG_0150_qusc4h.jpg',
                    caption: 'Shoot still.',
                  },
                  {
                    src: 'https://res.cloudinary.com/ddcf7lxh1/image/upload/v1775717224/12-IMG_0112_wvmrtc.jpg',
                    caption: 'Shoot still.',
                  },
                  {
                    src: 'https://res.cloudinary.com/ddcf7lxh1/image/upload/v1775717233/13-IMG_0159_hnal5u.jpg',
                    caption: 'Shoot still.',
                  },
                  {
                    src: 'https://res.cloudinary.com/ddcf7lxh1/image/upload/v1775717235/14-IMG_0111_sclbhk.jpg',
                    caption: 'Shoot still.',
                  },
                ],
              },
            ],
          },
          {
            heading: 'Writing',
            paragraphs: [
              'Full article writing lives on Indigo (see link above). This entry focuses on the editorial build and the visual system that made later articles reusable.',
            ],
          },
          {
            heading: 'Credits',
            paragraphs: [
              'Designed by Luis Alarcon and Prabhas Gade.',
              'Photographed by Sruja Peruka, Luis Alarcon, and Prabhas Gade.',
              'Graphics and creative direction by Sreya Iyer.',
              'Styling by Troy Tran and Faatma Javed.',
              'Quiz by Zenah Itani.',
              'Socials and events by Alaynna Nsengiyumva, Anna Smith, and Troy Tran.',
              'Models: Lily, Kat, Alyssa, and Aarya.',
            ],
          },
        ],
      },
      {
        slug: 'thirdspacedigital-wings4gold',
        title: 'Wings Shortfilm',
        navCategory: 'in-progress',
        disciplines: ['art', 'media'],
        summary: 'Creative media developed for the ThirdSpaceDigital Wings4Gold campaign.',
        year: '2024',
        tags: ['Campaign', 'Social'],
        artwork:
          'linear-gradient(155deg, #d9d9d9 0%, #d2d4d8 38%, #f4f4f4 100%), radial-gradient(circle at 78% 18%, rgba(255,255,255,0.75), transparent 30%), radial-gradient(circle at 20% 80%, rgba(54,64,78,0.15), transparent 34%)',
      },
      {
        slug: 'canard-shortfilm',
        title: 'Canard Shortfilm',
        navCategory: 'in-progress',
        disciplines: ['art', 'media'],
        summary: 'Short film currently in progress.',
        year: '2026',
        tags: ['Film'],
        artwork:
          'linear-gradient(145deg, #d8d8d8 0%, #d3d5d7 34%, #efefef 100%), radial-gradient(circle at 72% 22%, rgba(255,255,255,0.76), transparent 32%), radial-gradient(circle at 26% 74%, rgba(52,60,68,0.13), transparent 34%)',
      },
      {
        slug: 'pingutography',
        title: 'Pingutography',
        navCategory: 'in-progress',
        disciplines: ['art', 'media'],
        summary: 'Photography playground.',
        year: '2026',
        tags: ['Photography'],
        externalLinks: [
          {
            label: '@pingutography',
            href: 'https://www.instagram.com/pingutography/',
          },
        ],
        artwork:
          'linear-gradient(150deg, #d9d9d9 0%, #d2d5db 40%, #f3f4f6 100%), radial-gradient(circle at 78% 28%, rgba(255,255,255,0.65), transparent 28%), radial-gradient(circle at 20% 88%, rgba(60,76,92,0.16), transparent 35%)',
      },
      {
        slug: 'seven00hills',
        title: 'Seven00hills',
        navCategory: 'in-progress',
        disciplines: ['art', 'media'],
        summary: 'Music project.',
        year: '2026',
        tags: ['Music'],
        externalLinks: [
          {
            label: '@seven00hills',
            href: 'https://www.instagram.com/seven00hills/',
          },
        ],
        artwork:
          'linear-gradient(145deg, #d8d8d8 0%, #d3d5d7 34%, #efefef 100%), radial-gradient(circle at 72% 22%, rgba(255,255,255,0.76), transparent 32%), radial-gradient(circle at 26% 74%, rgba(52,60,68,0.13), transparent 34%)',
      },
      {
        slug: 'seven00hills-torn-mv',
        title: 'Seven00Hills: Torn MV',
        navCategory: 'in-progress',
        disciplines: ['art', 'media'],
        summary: 'Music video production and creative direction for Seven00Hills - Torn.',
        year: '2023',
        tags: ['Premiere', 'Color'],
        artwork:
          'linear-gradient(145deg, #d8d8d8 0%, #d3d5d7 34%, #efefef 100%), radial-gradient(circle at 72% 22%, rgba(255,255,255,0.76), transparent 32%), radial-gradient(circle at 26% 74%, rgba(52,60,68,0.13), transparent 34%)',
      },
      {
        slug: 'seven00hills-friends-mv',
        title: 'Seven00Hills: Friends MV',
        navCategory: 'in-progress',
        disciplines: ['art', 'media'],
        summary: 'Music video production and creative direction for Seven00Hills - Friends.',
        year: '2023',
        tags: ['Premiere', 'Color'],
        artwork:
          'linear-gradient(150deg, #d9d9d9 0%, #d2d5db 40%, #f3f4f6 100%), radial-gradient(circle at 78% 28%, rgba(255,255,255,0.65), transparent 28%), radial-gradient(circle at 20% 88%, rgba(60,76,92,0.16), transparent 35%)',
      },
      {
        slug: 'album-cover-paintings',
        title: 'Album Cover Paintings',
        navCategory: 'in-progress',
        disciplines: ['art'],
        summary: 'A set of paintings developed as visual concepts for album cover artwork.',
        year: '2024',
        tags: ['Acrylic'],
        artwork:
          'linear-gradient(145deg, #d7d7d7 0%, #d1d3d7 40%, #f3f3f3 100%), radial-gradient(circle at 70% 20%, rgba(255,255,255,0.72), transparent 32%), radial-gradient(circle at 30% 82%, rgba(42,54,69,0.13), transparent 34%)',
      },
      {
        slug: 'rain-dancing',
        title: 'RainDancing',
        disciplines: ['art', 'media'],
        useTechnologyPresentation: true,
        summary:
          'RainDancing turns strong emotions into mini experiences on canvas, with each piece paired to music and process experiments like gravity painting.',
        year: '2024',
        tags: ['Painting', 'Music', 'Mixed media'],
        externalLinks: [
          {
            label: 'RainDancing Instagram',
            href: 'https://www.instagram.com/userjsjsjsjsjsjs333/?hl=en',
          },
        ],
        thumbnailSrc: 'https://res.cloudinary.com/ddcf7lxh1/image/upload/v1775719783/thumbnail_f6ajoq.jpg',
        shellBackgroundColor: '#d3dbde',
        artwork:
          'linear-gradient(135deg, #d6d6d6 0%, #d0d2d8 40%, #f4f4f4 100%), radial-gradient(circle at 18% 24%, rgba(255,255,255,0.76), transparent 32%), radial-gradient(circle at 82% 76%, rgba(36,46,60,0.14), transparent 32%)',
        detailSections: [
          {
            heading: 'Concept',
            paragraphs: [
              'RainDancing revolves around translating strong emotions into compact, immersive painting experiences. The posted works are artifacts of that process rather than isolated images.',
              'Each painting is paired with music as part of the piece itself, not as background. In some works, I use gravity painting by mixing water with paint to shape flow and texture.',
            ],
            galleries: [
              {
                heading: 'Works',
                layout: 'stack',
                images: [
                  {
                    src: 'https://res.cloudinary.com/ddcf7lxh1/image/upload/v1775719788/raindancing1_ycsv3h.png',
                    caption: 'RainDancing work 1.',
                  },
                  {
                    src: 'https://res.cloudinary.com/ddcf7lxh1/image/upload/v1775719786/raindancing2_mdkq3q.png',
                    caption: 'RainDancing work 2.',
                  },
                  {
                    src: 'https://res.cloudinary.com/ddcf7lxh1/image/upload/v1775719866/raindancing3_umeeth.png',
                    caption: 'RainDancing work 3.',
                  },
                ],
              },
            ],
          },
        ],
      },
]

export const portfolioInfoSections: InformationSection[] = [
  {
    label: 'Information',
    headingSize: 'caption',
    paragraphs: [
      'Prabhas Gade is a Computer Science student at the University of Texas at Dallas whose passions lie in finding ways to better the world through technology and applying interdisciplinary skills across Human Computer Interaction, media, medicine, art, and marketing.',
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

export function getProjectBySlug(slug: string): ProjectEntry | undefined {
  return portfolioProjects.find((p) => p.slug === slug)
}
