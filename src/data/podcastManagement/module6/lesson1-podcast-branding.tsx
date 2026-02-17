
import type { Lesson } from '@/types/course';

export const lesson1: Lesson = {
  id: 1,
  title: 'Podcast Branding Fundamentals',
  duration: '50 min',
  type: 'video',
  content: {
    videoUrl: 'https://youtu.be/5qap5aO4i9A',
    textContent: `
# Podcast Branding Fundamentals

Branding helps your podcast feel consistent, trustworthy, and recognizable.

## What branding includes

- Show name and tagline
- Cover art style (colors, fonts)
- Tone of voice (serious, casual, comedic)
- Episode format (intro, segments, outro)

## Define your audience

- Who is the show for?
- What problem does it solve or what value does it deliver?
- What’s the “promise” you make to listeners?

## Practical checklist

1. Write a one-sentence show promise
2. Create a short tagline (8–12 words)
3. Choose 2–3 brand colors and 1–2 fonts
4. Draft an episode template (intro → content → outro)
    `
  }
};
