interface WikiAboutPageProps {
  viewport: 'desktop' | 'tablet' | 'mobile'
}

const wikiSections = [
  {
    id: 'overview',
    title: 'Overview',
    paragraphs: [
      'Rain Studios is a multidisciplinary creative and technical studio founded by Prabhas Gade. The studio focuses on blending software, design, and storytelling into cohesive digital experiences.',
      'Its current body of work spans interactive products, web platforms, editorial design, motion media, and experimental art direction.',
    ],
  },
  {
    id: 'background',
    title: 'Background',
    paragraphs: [
      'Rain Studios began as a personal archive for projects across engineering and visual media, then evolved into a unified portfolio label. The name reflects a process-oriented approach: iterative, atmospheric, and detail-driven.',
      'The studio draws influence from minimal interfaces, print-inspired composition, and research-led problem solving.',
    ],
  },
  {
    id: 'areas',
    title: 'Areas of work',
    paragraphs: [
      'Primary areas include frontend development, interaction design, visual systems, media production, and experimental prototyping.',
      'Work is typically delivered as product builds, campaign websites, publication assets, and long-term design systems.',
    ],
  },
  {
    id: 'vision',
    title: 'Vision',
    paragraphs: [
      'Rain Studios aims to create projects that are both technically robust and emotionally resonant. The long-term vision is to build tools and experiences that connect culture, education, and creative technology.',
    ],
  },
]

export function WikiAboutPage({ viewport }: WikiAboutPageProps) {
  return (
    <section className={`wiki-page wiki-page--${viewport}`}>
      <div className="wiki-page__article">
        <header className="wiki-page__header">
          <p className="wiki-page__crumb">From Rain Studios Wiki</p>
          <h1 className="wiki-page__title">Prabhas Gade</h1>
        </header>

        <div className="wiki-page__toc" role="navigation" aria-label="Table of contents">
          <p className="wiki-page__toc-title">Contents</p>
          <ol>
            {wikiSections.map((section, index) => (
              <li key={section.id}>
                <a href={`#${section.id}`}>{index + 1}. {section.title}</a>
              </li>
            ))}
          </ol>
        </div>

        {wikiSections.map((section) => (
          <article className="wiki-page__section" id={section.id} key={section.id}>
            <h2>{section.title}</h2>
            {section.paragraphs.map((paragraph) => (
              <p key={paragraph}>{paragraph}</p>
            ))}
          </article>
        ))}
      </div>

      <aside className="wiki-infobox" aria-label="Rain Studios profile">
        <h3 className="wiki-infobox__title">Rain Studios</h3>
        <div className="wiki-infobox__media" aria-hidden="true">RS</div>
        <dl className="wiki-infobox__table">
          <div>
            <dt>Founded</dt>
            <dd>2024</dd>
          </div>
          <div>
            <dt>Founder</dt>
            <dd>Prabhas Gade</dd>
          </div>
          <div>
            <dt>Location</dt>
            <dd>Texas, United States</dd>
          </div>
          <div>
            <dt>Focus</dt>
            <dd>Creative technology, media, and design</dd>
          </div>
          <div>
            <dt>Category</dt>
            <dd>
              <a href="/wiki">Wiki</a>
            </dd>
          </div>
        </dl>
      </aside>
    </section>
  )
}
