import { defineConfig } from 'astro/config';

export default defineConfig({
  site: 'https://imperiumplay.com',
  // GitHub Pages 301s /foo -> /foo/, so every URL we emit must already have the slash
  trailingSlash: 'always',
  build: {
    assets: 'assets'
  },
  image: {
    service: {
      entrypoint: 'astro/assets/services/sharp'
    }
  }
});
