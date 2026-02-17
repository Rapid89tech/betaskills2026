
import type { Lesson } from '@/types/course';

export const lesson1RecordingTools: Lesson = {
  id: 1,
  title: 'Recording Tools and Setup Essentials',
  duration: '60 min',
  type: 'video',
  content: {
    videoUrl: 'https://youtu.be/5qap5aO4i9A',
    textContent: `
# Recording Tools and Setup Essentials

This lesson introduces the core equipment and software used to capture clean podcast audio.

## Recommended gear

- USB mic (entry level) or XLR mic + audio interface
- Closed-back headphones
- Pop filter / windscreen
- Mic stand or boom arm

## Recording software

- Audacity (free)
- Adobe Audition (paid)
- Reaper (low-cost)

## Best practices

- Record in a quiet space with soft furnishings
- Set input gain to avoid clipping
- Do a short test recording before interviews
    `
  }
};
