import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

const previewImagePath = '/rainpreviewphoto.png'

// https://vite.dev/config/
export default defineConfig({
  plugins: [
    react(),
    {
      name: 'og-image-url',
      transformIndexHtml(html) {
        const base = process.env.VITE_SITE_URL?.replace(/\/$/, '') ?? ''
        const imageUrl = base ? `${base}${previewImagePath}` : previewImagePath
        return html.replaceAll('__OG_IMAGE_URL__', imageUrl)
      },
    },
  ],
})
