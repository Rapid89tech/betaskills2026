import type { Lesson } from '@/types/course';

export const lesson1_1: Lesson = {
  id: 1,
  title: 'Understanding the Four-Stroke Diesel Cycle',
  duration: '90 min',
  type: 'video',
  content: {
    videoUrl: 'https://youtu.be/Pu7g3uIG6Zo?si=uhwqwaTajW2B4bLX',
    textContent: `
# Understanding the Four-Stroke Diesel Cycle ⚙️

Diesel engines commonly operate using the four-stroke cycle:

1. **Intake:** Air enters the cylinder.
2. **Compression:** Air is compressed to high pressure and temperature.
3. **Power:** Fuel is injected and ignites due to compression (compression ignition).
4. **Exhaust:** Burnt gases are expelled.

This cycle is foundational for diagnostics and maintenance planning in diesel systems.
    `
  }
};
