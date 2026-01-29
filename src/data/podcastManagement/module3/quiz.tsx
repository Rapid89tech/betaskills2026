import type { QuizLesson } from '@/types/course';

export const module3Quiz: QuizLesson = {
  id: 3,
  title: 'Module 3 Quiz: Recording & Production Workflow',
  duration: '30 min',
  type: 'quiz',
  content: {
    questions: [
      {
        question: 'What is the optimal distance to maintain from a microphone during recording?',
        options: [
          '1-2 inches',
          '4-8 inches',
          '10-12 inches',
          '15-20 inches'
        ],
        correct: 1,
        explanation: 'The optimal distance from a microphone is 4-8 inches, which provides good audio quality without creating proximity effect or picking up too much room noise.'
      },
      {
        question: 'Which type of microphone is best suited for noisy environments and multiple speakers?',
        options: [
          'Condenser microphone',
          'Dynamic microphone',
          'USB microphone',
          'Lavalier microphone'
        ],
        correct: 1,
        explanation: 'Dynamic microphones are best for noisy environments and multiple speakers because they are less sensitive to background noise and can handle loud sounds well.'
      },
      {
        question: 'What is the recommended target level for recording audio?',
        options: [
          '-20dB to -15dB peak',
          '-12dB to -6dB peak',
          '-3dB to 0dB peak',
          '0dB to +3dB peak'
        ],
        correct: 1,
        explanation: 'The recommended target level for recording is -12dB to -6dB peak, which provides good audio quality while leaving headroom to avoid clipping.'
      },
      {
        question: 'Which remote recording platform is best for professional podcast recording with separate audio/video tracks?',
        options: [
          'Zoom',
          'Riverside.fm',
          'Google Meet',
          'Microsoft Teams'
        ],
        correct: 1,
        explanation: 'Riverside.fm is best for professional podcast recording because it provides separate audio/video tracks and high-quality audio recording capabilities.'
      },
      {
        question: 'What is the purpose of a pop filter?',
        options: [
          'To increase microphone sensitivity',
          'To reduce plosive sounds (p, b, t sounds)',
          'To amplify quiet voices',
          'To add reverb to the recording'
        ],
        correct: 1,
        explanation: 'A pop filter is used to reduce plosive sounds like p, b, and t sounds that can create unwanted noise in recordings.'
      },
      {
        question: 'Which file format provides the highest quality but largest file size?',
        options: [
          'MP3',
          'WAV',
          'FLAC',
          'AAC'
        ],
        correct: 1,
        explanation: 'WAV files provide the highest quality audio but have the largest file size because they are uncompressed.'
      },
      {
        question: 'What is the recommended sample rate for professional audio recording?',
        options: [
          '22.05kHz',
          '44.1kHz',
          '48kHz',
          '96kHz'
        ],
        correct: 2,
        explanation: '48kHz is the recommended sample rate for professional audio recording, providing excellent quality for podcast production.'
      },
      {
        question: 'Which type of headphones is best for recording environments?',
        options: [
          'Open-back headphones',
          'Closed-back headphones',
          'Wireless headphones',
          'In-ear monitors'
        ],
        correct: 1,
        explanation: 'Closed-back headphones are best for recording environments because they isolate sound and prevent audio bleed into the microphone.'
      },
      {
        question: 'What is the first step in the production workflow after recording?',
        options: [
          'Editing the audio',
          'File management and backup',
          'Publishing the episode',
          'Creating show notes'
        ],
        correct: 1,
        explanation: 'File management and backup is the first step after recording to ensure files are properly organized and backed up before any editing begins.'
      },
      {
        question: 'Which of the following is NOT a recommended backup strategy for podcast files?',
        options: [
          'Local backup on external drive',
          'Cloud backup service',
          'Storing only on the main computer',
          'Multiple backup locations'
        ],
        correct: 2,
        explanation: 'Storing only on the main computer is not a recommended backup strategy because it provides no protection against computer failure or data loss.'
      }
    ]
  }
};
