import type { APIRoute } from 'astro';

const SITE = 'https://imperiumplay.com';

// ponytail: glob the page files instead of hand-maintaining a URL list, so new
// pages show up in the sitemap the moment they exist. Emits trailing slashes to
// match what GitHub Pages actually serves — the old list 301'd on every entry.
//
// No <lastmod>: CI checks out shallow, so real per-file dates aren't available,
// and a build-date lastmod would claim all 13 pages changed on every deploy.
// Google ignores <priority> entirely, so that's gone too.
// Upgrade path: fetch-depth: 0 in the workflow + `git log -1 --format=%cs <file>`.
// account-deletion is a Play Store compliance page, not a search result: it ships
// noindex, so listing it here would just ask Google to crawl a page it can't index.
const urls = Object.keys(import.meta.glob('./**/*.astro'))
  .filter((p) => !p.includes('account-deletion'))
  .map((p) =>
    p
      .replace(/^\.\//, '')
      .replace(/\.astro$/, '')
      .replace(/(^|\/)index$/, '$1')
      .replace(/\/$/, '')
  )
  .map((p) => (p ? `${SITE}/${p}/` : `${SITE}/`))
  .sort();

export const GET: APIRoute = () =>
  new Response(
    `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
${urls.map((u) => `  <url><loc>${u}</loc></url>`).join('\n')}
</urlset>
`,
    { headers: { 'Content-Type': 'application/xml' } }
  );
