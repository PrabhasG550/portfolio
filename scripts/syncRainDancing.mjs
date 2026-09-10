/**
 * Sync RainDancing works from Instagram → Cloudinary → src/data/raindancing-works.json
 *
 * Usage:
 *   npm run sync:raindancing
 *
 * Auth (pick one):
 *   IG_SESSIONID=<sessionid cookie>   # from browser DevTools → Application → Cookies
 *   (optional) IG_CSRFTOKEN=<csrftoken>
 *
 * Cloudinary (required to host new images permanently):
 *   CLOUDINARY_URL=cloudinary://API_KEY:API_SECRET@CLOUD_NAME
 *   or CLOUDINARY_CLOUD_NAME + CLOUDINARY_API_KEY + CLOUDINARY_API_SECRET
 *
 * Without IG_SESSIONID, only posts already listed in raindancing-works.json are
 * refreshed (captions via public page titles). New/older posts past Instagram’s
 * logged-out limit (~36) require a session.
 */
import fs from 'node:fs'
import path from 'node:path'
import { fileURLToPath } from 'node:url'
import { createHash } from 'node:crypto'

const __dirname = path.dirname(fileURLToPath(import.meta.url))
const root = path.resolve(__dirname, '..')
const outPath = path.join(root, 'src', 'data', 'raindancing-works.json')
const USERNAME = 'userjsjsjsjsjsjs333'
const IG_APP_ID = '936619743392459'

function loadEnvFile() {
  const envPath = path.join(root, '.env')
  if (!fs.existsSync(envPath)) return
  for (const line of fs.readFileSync(envPath, 'utf8').split(/\r?\n/)) {
    const m = line.match(/^\s*([A-Za-z_][A-Za-z0-9_]*)\s*=\s*(.*)$/)
    if (!m) continue
    const key = m[1]
    let val = m[2].trim()
    if ((val.startsWith('"') && val.endsWith('"')) || (val.startsWith("'") && val.endsWith("'"))) {
      val = val.slice(1, -1)
    }
    if (process.env[key] === undefined) process.env[key] = val
  }
}

loadEnvFile()

function parseCloudinaryUrl(url) {
  // cloudinary://API_KEY:API_SECRET@CLOUD_NAME
  const m = String(url || '').match(/^cloudinary:\/\/([^:]+):([^@]+)@(.+)$/)
  if (!m) return null
  return { apiKey: m[1], apiSecret: m[2], cloudName: m[3] }
}

function getCloudinaryConfig() {
  const fromUrl = parseCloudinaryUrl(process.env.CLOUDINARY_URL)
  if (fromUrl) return fromUrl
  const cloudName = process.env.CLOUDINARY_CLOUD_NAME
  const apiKey = process.env.CLOUDINARY_API_KEY
  const apiSecret = process.env.CLOUDINARY_API_SECRET
  if (cloudName && apiKey && apiSecret) return { cloudName, apiKey, apiSecret }
  return null
}

async function uploadToCloudinary(fileUrl, publicId) {
  const cfg = getCloudinaryConfig()
  if (!cfg) return null

  const timestamp = Math.floor(Date.now() / 1000)
  const folder = 'PortfolioFiles/RainDancing'
  const paramsToSign = `folder=${folder}&overwrite=true&public_id=${publicId}&timestamp=${timestamp}${cfg.apiSecret}`
  const signature = createHash('sha1').update(paramsToSign).digest('hex')

  const body = new URLSearchParams({
    file: fileUrl,
    api_key: cfg.apiKey,
    timestamp: String(timestamp),
    signature,
    public_id: publicId,
    folder,
    overwrite: 'true',
  })

  const res = await fetch(`https://api.cloudinary.com/v1_1/${cfg.cloudName}/image/upload`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/x-www-form-urlencoded' },
    body,
  })
  if (!res.ok) {
    const text = await res.text()
    throw new Error(`Cloudinary upload failed (${res.status}): ${text.slice(0, 300)}`)
  }
  const json = await res.json()
  return json.secure_url
}

function extractCaptionFromTitle(markdown) {
  // Titles may include bidi marks: Instagram‎: "…"‎
  const m = markdown.match(/on Instagram\p{Cf}*: \p{Cf}*"([\s\S]*?)"\p{Cf}*\s*$/mu)
    || markdown.match(/Title:\s*[^\n]*Instagram\p{Cf}*: \p{Cf}*"([\s\S]*?)"\p{Cf}*/mu)
    || markdown.match(/Title:\s*raindancing on Instagram:\s*"([\s\S]*?)"\s*\n/i)
  if (!m) return ''
  // Prefer first non-empty line as the painting name
  return m[1]
    .split(/\n+/)
    .map((s) => s.trim())
    .find(Boolean) || ''
}

async function fetchCaptionPublic(shortcode) {
  const res = await fetch(`https://r.jina.ai/http://www.instagram.com/p/${shortcode}/`, {
    headers: { 'User-Agent': 'Mozilla/5.0', Accept: 'text/plain' },
  })
  if (!res.ok) return ''
  const text = await res.text()
  return extractCaptionFromTitle(text)
}

function igHeaders() {
  const sessionId = process.env.IG_SESSIONID
  const csrf = process.env.IG_CSRFTOKEN || ''
  const headers = {
    'User-Agent':
      'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/124.0.0.0 Safari/537.36',
    Accept: '*/*',
    'X-IG-App-ID': IG_APP_ID,
    'X-Requested-With': 'XMLHttpRequest',
  }
  if (sessionId) {
    headers.Cookie = `sessionid=${sessionId}${csrf ? `; csrftoken=${csrf}` : ''}`
    if (csrf) headers['X-CSRFToken'] = csrf
  }
  return headers
}

async function fetchProfileMediaWithSession() {
  const sessionId = process.env.IG_SESSIONID
  if (!sessionId) return null

  const profileRes = await fetch(
    `https://www.instagram.com/api/v1/users/web_profile_info/?username=${USERNAME}`,
    { headers: igHeaders() },
  )
  const profileJson = await profileRes.json().catch(() => null)
  if (!profileRes.ok) {
    throw new Error(
      `Instagram profile fetch failed (${profileRes.status}): ${JSON.stringify(profileJson).slice(0, 200)}`,
    )
  }

  const user = profileJson?.data?.user
  if (!user) throw new Error('Instagram profile response missing user')

  const userId = user.id
  let edges = [...(user.edge_owner_to_timeline_media?.edges || [])]
  let pageInfo = user.edge_owner_to_timeline_media?.page_info
  const total = user.edge_owner_to_timeline_media?.count

  // Paginate with the documented web GraphQL-ish media endpoint when needed
  while (pageInfo?.has_next_page && pageInfo.end_cursor) {
    const vars = encodeURIComponent(
      JSON.stringify({ id: userId, first: 50, after: pageInfo.end_cursor }),
    )
    const url = `https://www.instagram.com/graphql/query/?query_hash=69cba40317214236af40e7efa697781d&variables=${vars}`
    const pageRes = await fetch(url, { headers: igHeaders() })
    const pageJson = await pageRes.json().catch(() => null)
    if (!pageRes.ok) {
      console.warn('Pagination stopped:', pageRes.status, JSON.stringify(pageJson).slice(0, 200))
      break
    }
    const media = pageJson?.data?.user?.edge_owner_to_timeline_media
    const nextEdges = media?.edges || []
    if (!nextEdges.length) break
    edges.push(...nextEdges)
    pageInfo = media.page_info
    await new Promise((r) => setTimeout(r, 400))
  }

  return {
    total,
    posts: edges.map((e) => {
      const node = e.node
      const caption = node.edge_media_to_caption?.edges?.[0]?.node?.text || ''
      const title = caption.split(/\n+/).map((s) => s.trim()).find(Boolean) || 'Untitled'
      return {
        shortcode: node.shortcode,
        caption: title,
        igSrc: node.display_url,
        instagramUrl: `https://www.instagram.com/p/${node.shortcode}/`,
      }
    }),
  }
}

function loadExisting() {
  if (!fs.existsSync(outPath)) {
    return { username: USERNAME, profileUrl: `https://www.instagram.com/${USERNAME}/`, works: [] }
  }
  return JSON.parse(fs.readFileSync(outPath, 'utf8'))
}

async function main() {
  const existing = loadExisting()
  const byCode = new Map(existing.works.map((w) => [w.shortcode, w]))

  const requireSession = process.env.SYNC_REQUIRE_SESSION === '1' || process.env.CI === 'true'
  if (requireSession && !getCloudinaryConfig()) {
    console.error(
      'SYNC_REQUIRE_SESSION: Cloudinary secrets missing. Set CLOUDINARY_URL (or CLOUDINARY_CLOUD_NAME + API key/secret).',
    )
    process.exit(1)
  }

  let fetched = null
  let fetchError = null
  try {
    fetched = await fetchProfileMediaWithSession()
  } catch (err) {
    fetchError = err
    console.warn(String(err.message || err))
  }

  let posts
  if (fetched?.posts?.length) {
    console.log(`Fetched ${fetched.posts.length} posts from Instagram (profile reports ${fetched.total ?? '?'}).`)
    posts = fetched.posts
  } else {
    if (requireSession) {
      const why = !process.env.IG_SESSIONID
        ? 'IG_SESSIONID secret is missing.'
        : fetchError
          ? `Instagram session fetch failed: ${fetchError.message || fetchError}`
          : 'Instagram returned no posts (session likely expired — refresh IG_SESSIONID).'
      console.error(`SYNC_REQUIRE_SESSION: ${why}`)
      process.exit(1)
    }
    console.warn(
      'No IG_SESSIONID (or session expired). Refreshing captions for works already in raindancing-works.json only.',
    )
    posts = existing.works.map((w) => ({
      shortcode: w.shortcode,
      caption: w.caption,
      igSrc: w.igSrc,
      instagramUrl: w.instagramUrl,
    }))
  }

  const works = []
  let i = 0
  for (const post of posts) {
    i += 1
    const prev = byCode.get(post.shortcode)
    let caption = (post.caption || prev?.caption || '').trim()
    if (!caption || caption === 'Untitled' || caption === 'RainDancing work.') {
      try {
        const publicCaption = await fetchCaptionPublic(post.shortcode)
        if (publicCaption) caption = publicCaption
      } catch {
        /* ignore */
      }
    }
    caption = caption || 'Untitled'

    let src = prev?.src
    const publicId = `raindancing_ig_${String(i).padStart(2, '0')}`
    const igSrc = post.igSrc || prev?.igSrc
    const needsUpload =
      !src ||
      src.includes('cdninstagram.com') ||
      src.includes('scontent') ||
      !src.includes('res.cloudinary.com')

    if (needsUpload && igSrc) {
      try {
        const uploaded = await uploadToCloudinary(igSrc, publicId)
        if (uploaded) {
          src = uploaded
          console.log(`Uploaded ${post.shortcode} → ${publicId}`)
        } else {
          src = src || igSrc
          console.warn(`Cloudinary creds missing; keeping remote URL for ${post.shortcode}`)
        }
      } catch (err) {
        console.warn(`Upload failed for ${post.shortcode}:`, err.message)
        src = src || igSrc
      }
    }

    works.push({
      shortcode: post.shortcode,
      caption,
      instagramUrl: post.instagramUrl || `https://www.instagram.com/p/${post.shortcode}/`,
      src: src || igSrc,
      igSrc,
    })
  }

  const payload = {
    username: USERNAME,
    profileUrl: `https://www.instagram.com/${USERNAME}/`,
    updatedAt: new Date().toISOString(),
    works,
  }
  fs.writeFileSync(outPath, JSON.stringify(payload, null, 2) + '\n')

  const tsPath = path.join(root, 'src', 'data', 'raindancingWorks.ts')
  const ts = `/** Auto-generated by scripts/syncRainDancing.mjs — do not edit by hand. */
export type RaindancingWork = {
  shortcode: string
  caption: string
  instagramUrl: string
  src: string
  igSrc?: string
}

export const raindancingWorksMeta = {
  username: ${JSON.stringify(payload.username)},
  profileUrl: ${JSON.stringify(payload.profileUrl)},
  updatedAt: ${JSON.stringify(payload.updatedAt)},
} as const

export const raindancingWorks: RaindancingWork[] = ${JSON.stringify(works, null, 2)}
`
  fs.writeFileSync(tsPath, ts)

  console.log(`Wrote ${works.length} works → ${path.relative(root, outPath)}`)
  console.log(`Wrote ${path.relative(root, tsPath)}`)
  if (!process.env.IG_SESSIONID) {
    console.log('Tip: set IG_SESSIONID in .env to pull all posts (including beyond the logged-out ~36 limit).')
  }
  if (!getCloudinaryConfig()) {
    console.log('Tip: set CLOUDINARY_URL (or CLOUDINARY_* vars) so new images are hosted on Cloudinary.')
  }
}

main().catch((err) => {
  console.error(err)
  process.exit(1)
})
