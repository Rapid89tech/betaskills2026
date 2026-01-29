import type { QuizLesson } from '@/types/course';

export const module1Quiz: QuizLesson = {
  id: 1,
  title: 'Module 1 Quiz: Understanding Sound for Podcasting',
  duration: '30 min',
  type: 'quiz',
  content: {
    questions: [
      {
        question: 'What does the term "podcast" derive from?',
        options: [
          'Portable and Cast',
          'iPod and Broadcast',
          'Program and Cast',
          'Personal and Cast'
        ],
        correct: 1,
        explanation: 'The term "podcast" combines "iPod" (Apple\'s portable media player) and "broadcast."'
      },
      {
        question: 'Which technology allows podcasts to be automatically distributed to platforms like Spotify and Apple Podcasts?',
        options: [
          'MP3 Converter',
          'RSS Feed',
          'Cloud Storage',
          'WiFi Connection'
        ],
        correct: 1,
        explanation: 'RSS (Really Simple Syndication) feeds allow automatic distribution of podcast episodes to platforms.'
      },
      {
        question: 'Which of the following is a key characteristic of podcasts?',
        options: [
          'They require live streaming to be accessed.',
          'They are only available on desktop computers.',
          'They can be accessed on-demand by listeners.',
          'They must be downloaded to be heard.'
        ],
        correct: 2,
        explanation: 'Podcasts are on-demand content that listeners can access at their convenience.'
      },
      {
        question: 'In which year did the podcast *Serial* spark mainstream interest in podcasting?',
        options: [
          '2005',
          '2014',
          '2020',
          '2010'
        ],
        correct: 1,
        explanation: 'The podcast *Serial* became a cultural phenomenon in 2014, sparking mainstream interest in podcasting.'
      },
      {
        question: 'Which of the following is NOT a common podcast format?',
        options: [
          'Interview',
          'Narrative/Storytelling',
          'Live Concert',
          'Solo Monologue'
        ],
        correct: 2,
        explanation: 'Live concerts are not a typical podcast format. Podcasts are pre-recorded, on-demand content.'
      },
      {
        question: 'What is a recommended tool for recording and editing a podcast?',
        options: [
          'Microsoft Word',
          'Audacity',
          'Adobe Photoshop',
          'Excel Spreadsheet'
        ],
        correct: 1,
        explanation: 'Audacity is a free, powerful audio recording and editing software commonly used for podcasting.'
      },
      {
        question: 'Which podcast genre focuses on scripted audio dramas?',
        options: [
          'Educational',
          'Fiction',
          'Conversational',
          'News'
        ],
        correct: 1,
        explanation: 'Fiction podcasts feature scripted audio dramas with storytelling and acting.'
      },
      {
        question: 'What is one challenge faced by podcasters mentioned in the module?',
        options: [
          'Limited access to microphones',
          'Oversaturation of the podcast market',
          'Lack of internet access globally',
          'High cost of hosting platforms'
        ],
        correct: 1,
        explanation: 'With millions of podcasts available, standing out in an oversaturated market is a significant challenge.'
      },
      {
        question: 'Which company added podcast support to iTunes in 2005, boosting podcast accessibility?',
        options: [
          'Google',
          'Apple',
          'Microsoft',
          'Spotify'
        ],
        correct: 1,
        explanation: 'Apple added podcast support to iTunes in 2005, making podcasts widely accessible to users.'
      },
      {
        question: 'In the podcast creation process, what is the purpose of a hosting platform?',
        options: [
          'To edit audio files',
          'To store and distribute podcast files',
          'To design podcast artwork',
          'To record interviews'
        ],
        correct: 1,
        explanation: 'Hosting platforms like Libsyn, Anchor, or Buzzsprout store and distribute podcast files to various platforms.'
      }
    ]
  }
};
