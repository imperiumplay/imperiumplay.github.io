# Assets Directory

This directory contains optimizable assets for the ImperiumPlay website.

## Structure

- `images/` - Images that will be optimized by Astro's image processing
  - `badges/` - App store badges
  - `crazy-crosswords/` - Game-specific images

## Usage

Import images from this directory to use with the `Image` component:

```astro
---
import { Image } from 'astro:assets';
import myImage from '../assets/images/path-to-image.png';
---

<Image src={myImage} alt="Description" />
```

This enables automatic image optimization including:
- Format conversion (WebP)
- Responsive sizes
- Lazy loading
- Layout shift prevention