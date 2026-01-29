import type { QuizLesson } from '@/types/course';

export const module5Quiz: QuizLesson = {
  id: 5,
  title: 'Module 5 Quiz: Hosting & Distribution',
  duration: '30 min',
  type: 'quiz',
  content: {
    questions: [
      {
        question: 'What is the primary purpose of podcast hosting services?',
        options: [
          'To record audio files',
          'To store audio files and provide RSS feeds for distribution',
          'To edit podcast episodes',
          'To promote podcasts on social media'
        ],
        correct: 1,
        explanation: 'Podcast hosting services store audio files and provide RSS feeds that enable distribution to podcast directories and apps.'
      },
      {
        question: 'Which of the following is a free podcast hosting service?',
        options: [
          'Libsyn',
          'Blubrry',
          'Anchor (Spotify)',
          'Transistor'
        ],
        correct: 2,
        explanation: 'Anchor (Spotify) is a free podcast hosting service that provides unlimited storage and integrated distribution features.'
      },
      {
        question: 'What does RSS stand for in podcast distribution?',
        options: [
          'Really Simple Syndication',
          'Radio Streaming Service',
          'Remote Sound System',
          'Real-time Streaming Service'
        ],
        correct: 0,
        explanation: 'RSS stands for Really Simple Syndication, which is the standard format for distributing web content including podcasts.'
      },
      {
        question: 'Which podcast directory has the largest market share?',
        options: [
          'Spotify',
          'Apple Podcasts (iTunes)',
          'Google Podcasts',
          'Amazon Music'
        ],
        correct: 1,
        explanation: 'Apple Podcasts (iTunes) has the largest market share with over 1 billion active devices and is the primary discovery platform.'
      },
      {
        question: 'What is the recommended cover art size for podcast directories?',
        options: [
          '500x500 pixels',
          '1000x1000 pixels',
          '1400x1400 to 3000x3000 pixels',
          '2000x2000 pixels'
        ],
        correct: 2,
        explanation: 'Most podcast directories recommend cover art sizes between 1400x1400 to 3000x3000 pixels for optimal display across platforms.'
      },
      {
        question: 'How long does it typically take for a podcast to be approved on Apple Podcasts?',
        options: [
          '1-2 hours',
          '1-7 days',
          '2-4 weeks',
          '1-2 months'
        ],
        correct: 1,
        explanation: 'Apple Podcasts typically takes 1-7 days to review and approve new podcast submissions.'
      },
      {
        question: 'What is the purpose of an RSS feed in podcast distribution?',
        options: [
          'To store audio files',
          'To automatically deliver new episodes to subscribers and directories',
          'To edit podcast episodes',
          'To promote podcasts on social media'
        ],
        correct: 1,
        explanation: 'RSS feeds automatically deliver new episodes to subscribers and podcast directories, enabling automatic distribution.'
      },
      {
        question: 'Which of the following is NOT a required element in an RSS feed?',
        options: [
          'Podcast title',
          'Episode description',
          'Audio file URL',
          'Social media links'
        ],
        correct: 3,
        explanation: 'Social media links are not required elements in an RSS feed. Required elements include podcast title, episode description, and audio file URL.'
      },
      {
        question: 'What is the benefit of website integration for podcasts?',
        options: [
          'It reduces hosting costs',
          'It provides brand control and centralized content hub',
          'It automatically edits episodes',
          'It increases audio quality'
        ],
        correct: 1,
        explanation: 'Website integration provides brand control and creates a centralized hub for podcast content, show notes, and community building.'
      },
      {
        question: 'Which HTML element is used to embed a basic podcast player?',
        options: [
          '<video>',
          '<audio>',
          '<iframe>',
          '<embed>'
        ],
        correct: 1,
        explanation: 'The <audio> HTML element is used to embed a basic podcast player with controls for playback.'
      }
    ]
  }
};
