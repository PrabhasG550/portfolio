interface StudioLogPageProps {
  viewport: 'desktop' | 'tablet' | 'mobile'
}

const loreParagraphs = [
  'My name is Prabhas Gade. I was born in Iowa and moved to Houston when I was about 6 years old.',
  'My interests always were open ended and involved imagination and creativity. I played violin in orchestra throughout middle and high school and learned how to program while in high school.',
  "I've always wanted to find avenues which connected the roads of art, music, and media to technology in ways that were exciting, innovative, and beautiful.",
  'I rediscovered my passion for creation with the start of our club ThirdSpaceDigital, and with the community we built I decided to start an archive portfolio of all of my work thus far.',
  'My goal with Rain Studios is to direct my ideas from above into reality with the intensity of thunder. I do not intend on slowing down.',
]

const lorePhotos = [
  'https://res.cloudinary.com/ddcf7lxh1/image/upload/v1775722074/me1_xeogg7.jpg',
  'https://res.cloudinary.com/ddcf7lxh1/image/upload/v1775722071/me2_oczkfa.jpg',
  'https://res.cloudinary.com/ddcf7lxh1/image/upload/v1775722069/me3_elg8gp.jpg',
  'https://res.cloudinary.com/ddcf7lxh1/image/upload/v1775721993/me4_tij0vl.jpg',
  'https://res.cloudinary.com/ddcf7lxh1/image/upload/v1775722077/me5_tsfznl.jpg',
]

export function StudioLogPage({ viewport }: StudioLogPageProps) {
  return (
    <section className={`log-page log-page--${viewport}`}>
      <div className="log-page__main">
        <section className="log-page__block" aria-label="Lore">
          <h2 className="log-page__block-title">Lore</h2>
          <div className="lore-layout">
            {loreParagraphs.map((paragraph, i) => (
              <article
                key={paragraph}
                className={`lore-row${i % 2 === 1 ? ' lore-row--reverse' : ''}`}
              >
                <figure className="lore-row__photo-wrap">
                  <img className="lore-row__photo" src={lorePhotos[i]} alt={`Prabhas portrait ${i + 1}`} loading="lazy" decoding="async" />
                </figure>
                <p className="information-block__paragraph lore-row__text">{paragraph}</p>
              </article>
            ))}
          </div>
        </section>
      </div>
    </section>
  )
}
