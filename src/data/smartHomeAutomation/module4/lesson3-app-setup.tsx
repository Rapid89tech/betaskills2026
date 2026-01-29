import type { Lesson } from '@/types/course';

export const lesson3AppSetup: Lesson = {
  id: 3,
  title: 'App Setup (e.g., Google Home, Alexa, SmartThings)',
  duration: '60 minutes',
  type: 'video',
  content: {
    videoUrl: 'https://www.youtube.com/watch?v=fmdtvcgE8AI',
    textContent: `<div class="lesson-content">
<h1>App Setup (e.g., Google Home, Alexa, SmartThings)</h1>
<p>This lesson covers app setup for smart home ecosystems including Google Home, Alexa, and SmartThings.</p>
</div>`
  }
};
