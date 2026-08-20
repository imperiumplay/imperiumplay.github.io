// Re-encodes the images the site actually renders to webp at ~2x their display
// size. The originals were up to 5x oversized (one 1242x2688 PNG at 1.5 MB was
// being shown 480px tall), which put the homepage at 2.1 MB.
// Run with: npm run images
import sharp from 'sharp';
import { statSync } from 'node:fs';

// [source, max dimension at 2x display size]
const JOBS = [
  ['public/images/Icon_sumrush.png', 240],
  ['public/images/Icon_crazycrosswords.jpg', 240],
  ['public/images/sum-rush/01-unlimited.png', 960],
  ['public/images/sum-rush/02-adventure.png', 960],
  ['public/images/sum-rush/03-levelcomplete.png', 960],
  ['public/images/sum-rush/04-leaderboard.png', 960],
  ['public/images/sum-rush/05-home.png', 960],
  ['public/images/crazy-crosswords/screens/01.png', 960],
  ['public/images/crazy-crosswords/screens/02.png', 960],
  ['public/images/crazy-crosswords/screens/03.png', 960],
  ['public/images/crazy-crosswords/screens/04.png', 960],
  ['public/images/crazy-crosswords/gameplay-thumbnail.png', 960],
];

let before = 0, after = 0;
for (const [src, max] of JOBS) {
  const out = src.replace(/\.(png|jpg)$/, '.webp');
  await sharp(src)
    // withoutEnlargement: some sources are already smaller than the target
    .resize({ width: max, height: max, fit: 'inside', withoutEnlargement: true })
    .webp({ quality: 82, effort: 6 })
    .toFile(out);
  const b = statSync(src).size, a = statSync(out).size;
  before += b; after += a;
  console.log(`${String(Math.round(b/1024)).padStart(5)}KB -> ${String(Math.round(a/1024)).padStart(4)}KB  ${out}`);
}
console.log(`\ntotal ${Math.round(before/1024)}KB -> ${Math.round(after/1024)}KB  (${Math.round(100-after/before*100)}% smaller)`);
