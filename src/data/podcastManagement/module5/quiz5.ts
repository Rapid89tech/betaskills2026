import type { Lesson } from '@/types/course';

export const quiz5: Lesson = {
  id: 3,
  title: '📝 Module 5 Quiz: Hosting & Distribution',
  duration: '15 min',
  type: 'quiz',
  content: {
    questions: [
      {
        question: 'What is the primary function of a podcast hosting platform?',
        options: [
          'To edit audio files',
          'To store audio files and deliver them to directories via RSS feed',
          'To record podcast episodes',
          'To design podcast artwork'
        ],
        correct: 1,
        explanation: 'A podcast hosting platform stores your audio files and delivers them to directories like Spotify and Apple Podcasts via an RSS feed.'
      },
      {
        question: 'Which hosting platform is 100% free with unlimited storage?',
        options: [
          'Buzzsprout',
          'Anchor by Spotify',
          'Podbean',
          'Transistor'
        ],
        correct: 1,
        explanation: 'Anchor (now Spotify for Podcasters) is 100% free with unlimited storage and bandwidth, making it ideal for beginners.'
      },
      {
        question: 'What does RSS stand for in podcast distribution?',
        options: [
          'Real Simple Streaming',
          'Really Simple Syndication',
          'Remote Server System',
          'Rapid Streaming Service'
        ],
        correct: 1,
        explanation: 'RSS stands for Really Simple Syndication, a standardized web feed format that automatically distributes podcast episodes.'
      },
      {
        question: 'What is the recommended minimum size for podcast artwork?',
        options: [
          '800x800px',
          '1000x1000px',
          '1400x1400px',
          '2000x2000px'
        ],
        correct: 2,
        explanation: 'Podcast artwork should be a minimum of 1400x1400px (maximum 3000x3000px) and no larger than 512KB.'
      },
      {
        question: 'Which hosting platform is best for managing multiple podcast shows under one plan?',
        options: [
          'Anchor',
          'Buzzsprout',
          'Transistor',
          'Podbean'
        ],
        correct: 2,
        explanation: 'Transistor is designed for agencies or creators managing multiple shows, offering multi-show support under one plan starting at $19/month.'
      },
      {
        question: 'What should you do before changing your RSS feed URL?',
        options: [
          'Delete all episodes',
          'Set up a 301 redirect',
          'Create a new podcast',
          'Nothing, just change it'
        ],
        correct: 1,
        explanation: 'You should set up a 301 redirect when changing your RSS feed URL to preserve continuity and avoid breaking distribution to apps.'
      },
      {
        question: 'Which tool can you use to validate your RSS feed?',
        options: [
          'Audacity',
          'Podba.se Validator',
          'Adobe Audition',
          'Descript'
        ],
        correct: 1,
        explanation: 'Podba.se Validator and CastFeedValidator are tools used to check RSS feeds for missing metadata or formatting errors.'
      },
      {
        question: 'What is a key advantage of Buzzsprout for beginners?',
        options: [
          'Unlimited free storage',
          'Intuitive interface and 24/7 support',
          'Live streaming capabilities',
          'Multi-show management'
        ],
        correct: 1,
        explanation: 'Buzzsprout offers an intuitive interface, detailed analytics, auto-optimization, and 24/7 support, making it ideal for beginners.'
      },
      {
        question: 'Why is it important to retain ownership of your RSS feed?',
        options: [
          'To avoid reliance on proprietary platforms and ensure long-term accessibility',
          'To make editing easier',
          'To reduce file sizes',
          'To improve audio quality'
        ],
        correct: 0,
        explanation: 'Retaining RSS feed ownership prevents reliance on proprietary platforms that may limit access or control, ensuring long-term accessibility for listeners.'
      },
      {
        question: 'What happens when you upload a new episode to your hosting platform?',
        options: [
          'You must manually upload to each directory',
          'The RSS feed automatically updates and notifies directories',
          'Listeners must refresh their apps manually',
          'The episode is only available on your website'
        ],
        correct: 1,
        explanation: 'When you upload a new episode, the RSS feed automatically updates and notifies directories like Spotify and Apple Podcasts, making it instantly available to listeners.'
      }
    ]
  }
};