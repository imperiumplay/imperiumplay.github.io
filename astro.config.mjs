import { defineConfig } from 'astro/config';

export default defineConfig({
  site: 'https://imperiumplay.github.io',
  build: {
    assets: 'assets'
  },
  image: {
    service: {
      entrypoint: 'astro/assets/services/sharp'
    }
  }
});