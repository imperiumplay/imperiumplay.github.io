import { defineConfig } from 'astro/config';

export default defineConfig({
  site: 'https://imperiumplay.github.io',
  build: {
    assets: 'assets'
  },
  redirects: {
    '/terms.html': '/terms',
    '/privacy-policy.html': '/privacy-policy',
    '/how-to-play.html': '/how-to-play',
    '/crazy-crosswords.html': '/crazy-crosswords'
  }
});