
import type { Lesson } from '@/types/course';

export const lesson1: Lesson = {
  id: 1,
  title: 'Editing Tools and Workflow Setup',
  duration: '55 min',
  type: 'video',
  content: {
    videoUrl: 'https://youtu.be/5qap5aO4i9A',
    textContent: `
# Editing Tools and Workflow Setup

In this lesson, you’ll learn what makes a podcast editing tool effective and how to set up a simple, repeatable workflow for every episode.

## Common editing tools

- Audacity (free)
- Reaper (low-cost)
- Adobe Audition (paid)
- Descript (text-based editing)

## What to look for in an editor

- Easy trimming and arrangement
- Noise reduction and EQ
- Compression/limiting
- Export presets (MP3/WAV)

## A basic editing workflow

1. Import raw audio and organize tracks
2. Clean noise and remove mistakes
3. Balance levels (voice/music)
4. Add intro/outro and transitions
5. Export, tag, and archive your project
    `
  }
};
