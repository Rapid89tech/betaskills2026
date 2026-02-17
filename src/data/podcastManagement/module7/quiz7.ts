import type { Lesson } from '@/types/course';

export const quiz7: Lesson = {
  id: 4,
  title: '📝 Module 7 Quiz: Monetization Strategies',
  duration: '15 min',
  type: 'quiz',
  content: {
    questions: [
      {
        question: 'What does a podcast "download" measure?',
        options: [
          'When someone listens to the full episode',
          'When an episode is requested from the hosting server',
          'When someone subscribes to your show',
          'When a podcast is shared on social media'
        ],
        correct: 1,
        explanation: 'A download occurs when the media file is requested, regardless of whether it is fully played.'
      },
      {
        question: 'Which metric is most accurate for measuring how much of your episode was consumed?',
        options: [
          'Downloads',
          'Subscriber count',
          'Listener retention',
          'Ratings and reviews'
        ],
        correct: 2,
        explanation: 'Listener retention shows how long people actually listen, providing deeper insight than just downloads.'
      },
      {
        question: 'Which is the most common podcast metric used by sponsors?',
        options: [
          'Retention rate',
          'Downloads',
          'Social shares',
          'Comments'
        ],
        correct: 1,
        explanation: 'Sponsors typically evaluate reach using total downloads as a key performance indicator.'
      },
      {
        question: 'What\'s a recommended best practice for tracking downloads?',
        options: [
          'Only look at the first 24 hours',
          'Track downloads across all devices separately',
          'Measure downloads at 7, 30, and 90 days',
          'Count only international downloads'
        ],
        correct: 2,
        explanation: 'Checking at multiple intervals gives a better sense of long-term performance and listener growth.'
      },
      {
        question: 'What does a high listener retention rate indicate?',
        options: [
          'That your show has many episodes',
          'That people are listening all the way through',
          'That you have a large social media following',
          'That your ad placement is optimized'
        ],
        correct: 1,
        explanation: 'High retention = engaging content that keeps listeners tuned in till the end.'
      },
      {
        question: 'What tool would you use to track podcast ad performance and smart links?',
        options: [
          'Google Forms',
          'Chartable',
          'PodInbox',
          'Anchor'
        ],
        correct: 1,
        explanation: 'Chartable tracks listener behavior and links performance across platforms.'
      },
      {
        question: 'Which of the following is a form of audience engagement?',
        options: [
          'Bitly link clicks',
          'Retention rates',
          'Listener voice messages',
          'Episode length'
        ],
        correct: 2,
        explanation: 'Voice messages from listeners are a direct form of audience participation and engagement.'
      },
      {
        question: 'What\'s a good retention rate benchmark to aim for?',
        options: [
          '25–35%',
          '40–50%',
          '60–70%',
          '70–80%'
        ],
        correct: 3,
        explanation: '70–80% listener retention is considered excellent for podcasts.'
      },
      {
        question: 'Which of the following is NOT an effective tool for collecting listener feedback?',
        options: [
          'SpeakPipe',
          'Apple Podcasts Connect',
          'Typeform',
          'Google Forms'
        ],
        correct: 1,
        explanation: 'Apple Podcasts Connect is primarily used for managing show listings, not gathering feedback.'
      },
      {
        question: 'What\'s a common mistake in using podcast analytics?',
        options: [
          'Tracking retention weekly',
          'Monitoring drop-off points',
          'Ignoring platform-specific insights',
          'Using more than one analytics platform'
        ],
        correct: 2,
        explanation: 'Each platform (e.g., Spotify, Apple) provides unique insights—ignoring them can lead to blind spots.'
      }
    ]
  }
};
