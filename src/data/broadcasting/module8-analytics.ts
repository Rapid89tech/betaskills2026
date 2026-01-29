import { Module } from '@/types/course';

const broadcastingModule8: Module = {
  id: 'broadcasting-module8',
  title: 'Analytics and Performance Tracking',
  description: 'Learn how to analyze podcast performance metrics using analytics tools to refine your content strategy and increase audience engagement.',
  lessons: [
    {
      id: 'broadcasting-module8-lesson1',
      title: 'Understanding Podcast Analytics',
      type: 'video',
      duration: '35 minutes',
      content: `
        <div class="lesson-content">
          <h2>Measuring Podcast Success</h2>
          <p>Learn how to track and analyze your podcast's performance to make data-driven decisions and grow your audience.</p>
          
          <h3>Key Metrics to Track:</h3>
          <ul>
            <li><strong>Downloads:</strong> Total number of episode downloads</li>
            <li><strong>Unique Listeners:</strong> Number of individual listeners</li>
            <li><strong>Retention Rate:</strong> How long listeners stay engaged</li>
            <li><strong>Completion Rate:</strong> Percentage who finish episodes</li>
            <li><strong>Geographic Data:</strong> Where your listeners are located</li>
            <li><strong>Device Analytics:</strong> How listeners consume your content</li>
          </ul>

          <h3>Analytics Platforms:</h3>
          <ul>
            <li><strong>Chartable:</strong> Comprehensive podcast analytics</li>
            <li><strong>Podtrac:</strong> Industry-standard measurement</li>
            <li><strong>Spotify Analytics:</strong> Platform-specific insights</li>
            <li><strong>Apple Podcasts Connect:</strong> Apple platform analytics</li>
            <li><strong>Hosting Platform Analytics:</strong> Built-in analytics from your host</li>
          </ul>

          <div class="video-container">
            <h3>📺 Watch: Podcast Analytics and Performance</h3>
            <p>Learn how to use analytics to improve your podcast performance.</p>
          </div>
        </div>
      `,
      videoUrl: 'https://youtu.be/example',
      quiz: {
        questions: [
          {
            question: 'What is the most important metric for measuring podcast success?',
            options: [
              'Only downloads',
              'Multiple metrics including downloads, retention, and engagement',
              'Only social media followers',
              'Only website visits'
            ],
            correctAnswer: 1
          }
        ]
      }
    },
    {
      id: 'broadcasting-module8-certificate',
      title: 'Course Completion Certificate',
      type: 'certificate',
      duration: '5 minutes',
      content: `
        <div class="certificate-content">
          <h2>🎉 Congratulations!</h2>
          <p>You have successfully completed the Broadcasting: Podcast Management Mastery course!</p>
          <p>You are now equipped with comprehensive knowledge and skills to create, manage, and grow a successful podcast from concept to chart-topping production.</p>
        </div>
      `
    }
  ]
};

export default broadcastingModule8; 