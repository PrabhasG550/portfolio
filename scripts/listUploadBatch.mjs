import fs from 'node:fs'

const posts = JSON.parse(
  fs.readFileSync(new URL('../.tmp-raindancing-ig/posts-with-captions.json', import.meta.url), 'utf8'),
)

const need = posts.slice(24).map((p, i) => ({
  index: 25 + i,
  shortcode: p.shortcode,
  caption: p.caption,
  src: p.src,
  publicId: `raindancing_ig_${String(25 + i).padStart(2, '0')}`,
}))

fs.writeFileSync(new URL('../.tmp-raindancing-ig/upload-batch.json', import.meta.url), JSON.stringify(need, null, 2))
console.log(JSON.stringify(need, null, 2))
