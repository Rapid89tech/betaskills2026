import { Module } from '@/types/course';

const broadcastingModule7: Module = {
  id: 'broadcasting-module7',
  title: 'Monetization Strategies',
  description: 'Learn how to monetize your podcast through advertising, sponsorships, paid subscriptions, and other revenue streams to build a sustainable podcast business.',
  lessons: [
    {
      id: 'broadcasting-module7-lesson1',
      title: 'Podcast Monetization Methods',
      type: 'video',
      duration: '40 minutes',
      content: `
        <div class="lesson-content">
          <h2>Building a Profitable Podcast</h2>
          <p>Discover various monetization strategies to turn your podcast passion into a sustainable income stream.</p>
          
          <h3>Revenue Streams:</h3>
          <ul>
            <li><strong>Advertising:</strong> Pre-roll, mid-roll, and post-roll ad spots</li>
            <li><strong>Sponsorships:</strong> Direct brand partnerships and sponsored content</li>
            <li><strong>Paid Subscriptions:</strong> Premium content and exclusive episodes</li>
            <li><strong>Crowdfunding:</strong> Patreon, Kickstarter, and listener support</li>
            <li><strong>Merchandise:</strong> Selling branded products and merchandise</li>
            <li><strong>Affiliate Marketing:</strong> Promoting products and earning commissions</li>
          </ul>

          <h3>Monetization Platforms:</h3>
          <ul>
            <li><strong>Patreon:</strong> Monthly subscription platform for creators</li>
            <li><strong>Anchor Sponsorships:</strong> Automated ad insertion</li>
            <li><strong>Podbean Monetization:</strong> Built-in advertising network</li>
            <li><strong>Direct Sponsorships:</strong> Working directly with brands</li>
          </ul>

          <div class="video-container">
            <h3>📺 Watch: Podcast Monetization Strategies</h3>
            <p>Learn how to monetize your podcast and build a sustainable business.</p>
          </div>
        </div>
      `,
      videoUrl: 'https://youtu.be/example',
      quiz: {
        questions: [
          {
            question: 'Which monetization method involves monthly subscriptions from listeners?',
            options: [
              'Advertising',
              'Patreon',
              'Merchandise sales',
              'Affiliate marketing'
            ],
            correctAnswer: 1
          }
        ]
      }
    }
  ]
};

export default broadcastingModule7; 