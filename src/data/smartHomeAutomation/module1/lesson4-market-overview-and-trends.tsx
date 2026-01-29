import type { Lesson } from '@/types/course';

export const lesson4MarketOverviewAndTrends: Lesson = {
  id: 4,
  title: 'Market Overview & Trends',
  duration: '40 minutes',
  type: 'video',
  content: {
    videoUrl: 'https://www.youtube.com/watch?v=LmpM8yHaTxw',
    textContent: `<div class="lesson-content">
<h1>Market Overview & Trends</h1>
<p>The smart home market is growing rapidly, driven by technological advancements and consumer demand.</p>
<h2>Market Size</h2>
<p>Global market valued at ~$80 billion in 2023, projected to reach $135 billion by 2028.</p>
<h2>Key Players</h2>
<p>Amazon, Google, Apple, Samsung, and open-source platforms like Home Assistant.</p>
<h2>Connectivity Standards</h2>
<p>Wi-Fi, Zigbee, Z-Wave, and the new Matter standard for interoperability.</p>
<h2>Growth Trends</h2>
<p>AI integration, open-source platforms, and sustainability focus.</p>
</div>`
  }
};
