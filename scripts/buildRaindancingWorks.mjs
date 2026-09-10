import fs from 'node:fs'
import path from 'node:path'
import { fileURLToPath } from 'node:url'

const __dirname = path.dirname(fileURLToPath(import.meta.url))
const root = path.resolve(__dirname, '..')
const tmpPosts = path.join(root, '.tmp-raindancing-ig', 'posts-with-captions.json')
const outJson = path.join(root, 'src', 'data', 'raindancing-works.json')

/** Known Cloudinary deliveries from the first sync batch (posts 1–24). */
const knownCloudinary = {
  Dc_3_0_ndS1: null, // keyed by index below
}

// Map shortcode -> existing secure_url for posts already uploaded as raindancing_ig_NN
const existingByIndex = [
  'https://res.cloudinary.com/ddcf7lxh1/image/upload/v1789060470/raindancing_ig_01.jpg',
  'https://res.cloudinary.com/ddcf7lxh1/image/upload/v1789060500/raindancing_ig_02.jpg',
  'https://res.cloudinary.com/ddcf7lxh1/image/upload/v1789060503/raindancing_ig_03.jpg',
  'https://res.cloudinary.com/ddcf7lxh1/image/upload/v1789060507/raindancing_ig_04.jpg',
  'https://res.cloudinary.com/ddcf7lxh1/image/upload/v1789060511/raindancing_ig_05.jpg',
  'https://res.cloudinary.com/ddcf7lxh1/image/upload/v1789060514/raindancing_ig_06.jpg',
  'https://res.cloudinary.com/ddcf7lxh1/image/upload/v1789060518/raindancing_ig_07.jpg',
  'https://res.cloudinary.com/ddcf7lxh1/image/upload/v1789060522/raindancing_ig_08.jpg',
  'https://res.cloudinary.com/ddcf7lxh1/image/upload/v1789060526/raindancing_ig_09.jpg',
  'https://res.cloudinary.com/ddcf7lxh1/image/upload/v1789060530/raindancing_ig_10.jpg',
  'https://res.cloudinary.com/ddcf7lxh1/image/upload/v1789060533/raindancing_ig_11.jpg',
  'https://res.cloudinary.com/ddcf7lxh1/image/upload/v1789060533/raindancing_ig_12.jpg',
  'https://res.cloudinary.com/ddcf7lxh1/image/upload/v1789060544/raindancing_ig_13.jpg',
  'https://res.cloudinary.com/ddcf7lxh1/image/upload/v1789060548/raindancing_ig_14.jpg',
  'https://res.cloudinary.com/ddcf7lxh1/image/upload/v1789060551/raindancing_ig_15.jpg',
  'https://res.cloudinary.com/ddcf7lxh1/image/upload/v1789060555/raindancing_ig_16.jpg',
  'https://res.cloudinary.com/ddcf7lxh1/image/upload/v1789060559/raindancing_ig_17.jpg',
  'https://res.cloudinary.com/ddcf7lxh1/image/upload/v1789060562/raindancing_ig_18.jpg',
  'https://res.cloudinary.com/ddcf7lxh1/image/upload/v1789060567/raindancing_ig_19.jpg',
  'https://res.cloudinary.com/ddcf7lxh1/image/upload/v1789060570/raindancing_ig_20.jpg',
  'https://res.cloudinary.com/ddcf7lxh1/image/upload/v1789060574/raindancing_ig_21.jpg',
  'https://res.cloudinary.com/ddcf7lxh1/image/upload/v1789060578/raindancing_ig_22.jpg',
  'https://res.cloudinary.com/ddcf7lxh1/image/upload/v1789060582/raindancing_ig_23.jpg',
  'https://res.cloudinary.com/ddcf7lxh1/image/upload/v1789060583/raindancing_ig_24.jpg',
]

const posts = JSON.parse(fs.readFileSync(tmpPosts, 'utf8'))

const works = posts.map((p, i) => ({
  shortcode: p.shortcode,
  caption: (p.caption || '').trim() || 'Untitled',
  instagramUrl: `https://www.instagram.com/p/${p.shortcode}/`,
  // Prefer existing Cloudinary; otherwise keep Instagram CDN until sync uploads
  src: existingByIndex[i] || p.src,
  igSrc: p.src,
}))

const payload = {
  username: 'userjsjsjsjsjsjs333',
  profileUrl: 'https://www.instagram.com/userjsjsjsjsjsjs333/',
  updatedAt: new Date().toISOString(),
  works,
}

fs.writeFileSync(outJson, JSON.stringify(payload, null, 2) + '\n')
console.log(`Wrote ${works.length} works -> ${path.relative(root, outJson)}`)
console.log(`Need Cloudinary upload for indexes ${existingByIndex.length + 1}+ (${works.length - existingByIndex.length} remaining)`)
