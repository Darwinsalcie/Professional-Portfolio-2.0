import { writeFileSync, mkdirSync, existsSync } from 'node:fs'
import { resolve } from 'node:path'

const SITE_URL = 'https://example.com'
const LOCALES = ['es', 'en']
const PROJECT_SLUGS = ['alpha-platform', 'enterprise-portal']

const urls: string[] = []

for (const locale of LOCALES) {
  urls.push(`${SITE_URL}/${locale}`)
  for (const slug of PROJECT_SLUGS) {
    urls.push(`${SITE_URL}/${locale}/work/${slug}`)
  }
}

const sitemapXml = `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
${urls
  .map(
    (url) => `  <url>
    <loc>${url}</loc>
    <changefreq>monthly</changefreq>
    <priority>${url.includes('/work/') ? '0.8' : '1.0'}</priority>
  </url>`,
  )
  .join('\n')}
</urlset>
`

const distDir = resolve(process.cwd(), 'dist')
const publicDir = resolve(process.cwd(), 'public')

// Write to public for dev / source
if (!existsSync(publicDir)) {
  mkdirSync(publicDir, { recursive: true })
}
writeFileSync(resolve(publicDir, 'sitemap.xml'), sitemapXml, 'utf-8')

// If dist exists, write there as well
if (existsSync(distDir)) {
  writeFileSync(resolve(distDir, 'sitemap.xml'), sitemapXml, 'utf-8')
}

console.log(`Generated sitemap.xml with ${String(urls.length)} routes.`)
