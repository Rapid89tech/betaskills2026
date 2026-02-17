import type { Lesson } from '@/types/course';

export const quiz1: Lesson = {
  id: 2,
  title: '📝 Module 1 Quiz: Introduction to Podcasting',
  duration: '15 min',
  type: 'quiz',
  content: {
    questions: [
      {
        question: 'What does the term "podcast" derive from?',
        options: [
          'Portable and Cast',
          'iPod and Broadcast',
          'Program and Cast',
          'Pod and Broadcast'
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
          'HTTP Protocol'
        ],
        correct: 1,
        explanation: 'RSS (Really Simple Syndication) feeds enable automatic distribution of podcast episodes to various platforms.'
      },
      {
        question: 'Which of the following is a key characteristic of podcasts?',
        options: [
          'They require live streaming to be accessed',
          'They are only available on desktop computers',
          'They can be accessed on-demand by listeners',
          'They must be video format'
        ],
        correct: 2,
        explanation: 'Podcasts are on-demand content, meaning listeners can access episodes at their convenience.'
      },
      {
        question: 'In which year did the podcast *Serial* spark mainstream interest in podcasting?',
        options: [
          '2005',
          '2010',
          '2014',
          '2020'
        ],
        correct: 2,
        explanation: 'The podcast *Serial* was released in 2014 and became a cultural phenomenon.'
      },
      {
        question: 'Which of the following is NOT a common podcast format?',
        options: [
          'Interview',
          'Narrative/Storytelling',
          'Live Concert',
          'Solo'
        ],
        correct: 2,
        explanation: 'Live concerts are not a typical podcast format. Common formats include interviews, solo shows, and narrative storytelling.'
      },
      {
        question: 'What is a recommended tool for recording and editing a podcast?',
        options: [
          'Microsoft Word',
          'Audacity',
          'Adobe Photoshop',
          'Excel'
        ],
        correct: 1,
        explanation: 'Audacity is a free, open-source audio recording and editing software widely used by podcasters.'
      },
      {
        question: 'Which podcast genre focuses on scripted audio dramas?',
        options: [
          'Educational',
          'Fiction',
          'Conversational',
          'Interview'
        ],
        correct: 1,
        explanation: 'Fiction podcasts feature scripted audio dramas with actors, sound effects, and music.'
      },
      {
        question: 'What is one challenge faced by podcasters mentioned in the module?',
        options: [
          'Limited access to microphones',
          'Oversaturation of the podcast market',
          'Lack of internet access globally',
          'Too few podcast platforms'
        ],
        correct: 1,
        explanation: 'With millions of podcasts available, oversaturation makes it challenging for new podcasters to stand out.'
      },
      {
        question: 'Which company added podcast support to iTunes in 2005, boosting podcast accessibility?',
        options: [
          'Google',
          'Apple',
          'Microsoft',
          'Amazon'
        ],
        correct: 1,
        explanation: 'Apple added podcast support to iTunes in 2005, making podcasts widely accessible.'
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
        explanation: 'Hosting platforms store podcast files and distribute them via RSS feeds to various podcast directories.'
      }
    ]
  }
};
