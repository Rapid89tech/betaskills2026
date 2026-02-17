import type { Lesson } from '@/types/course';

export const quiz3: Lesson = {
  id: 2,
  title: '📝 Module 3 Quiz: Recording & Production Workflow',
  duration: '15 min',
  type: 'quiz',
  content: {
    questions: [
      {
        question: 'Which type of microphone is best for beginners and solo podcasters due to its plug-and-play simplicity?',
        options: [
          'Dynamic Mic',
          'Condenser Mic',
          'USB Mic',
          'XLR Mic'
        ],
        correct: 2,
        explanation: 'USB microphones are plug-and-play, requiring no additional equipment like audio interfaces, making them ideal for beginners and solo podcasters.'
      },
      {
        question: 'What is the primary purpose of an audio interface for XLR microphones?',
        options: [
          'To edit audio files',
          'To convert analog signals to digital',
          'To add sound effects',
          'To compress audio files'
        ],
        correct: 1,
        explanation: 'An audio interface converts analog signals from XLR microphones to digital format for computer recording, while also providing preamps and phantom power.'
      },
      {
        question: 'Which free, open-source audio editing software is ideal for beginner podcasters?',
        options: [
          'Adobe Audition',
          'Audacity',
          'Reaper',
          'Hindenburg Journalist'
        ],
        correct: 1,
        explanation: 'Audacity is a free, open-source audio editor available on Windows, Mac, and Linux, offering multi-track editing and basic effects perfect for beginners.'
      },
      {
        question: 'What is the recommended audio format for recording podcasts to maintain the highest quality?',
        options: [
          'MP3',
          'AAC',
          'WAV',
          'OGG'
        ],
        correct: 2,
        explanation: 'WAV format captures uncompressed audio, preserving every detail for editing. You should record in WAV and export to MP3 for distribution.'
      },
      {
        question: 'Which remote recording platform offers local HD recording with uncompressed 48kHz WAV audio?',
        options: [
          'Zoom',
          'Skype',
          'Riverside.fm',
          'Google Meet'
        ],
        correct: 2,
        explanation: 'Riverside.fm offers local recording of uncompressed 48kHz WAV audio and up to 4K video, ensuring studio-quality remote recordings.'
      },
      {
        question: 'What is the industry standard sample rate and bit depth for podcast audio?',
        options: [
          '48 kHz / 24-bit',
          '44.1 kHz / 16-bit',
          '96 kHz / 32-bit',
          '22 kHz / 8-bit'
        ],
        correct: 1,
        explanation: '44.1 kHz / 16-bit is the industry standard for podcast audio, providing high-quality sound that\'s compatible with most platforms and devices.'
      },
      {
        question: 'What accessory helps reduce plosive sounds (popping "p" and "b" sounds) during recording?',
        options: [
          'Boom arm',
          'Pop filter',
          'Audio interface',
          'Headphones'
        ],
        correct: 1,
        explanation: 'A pop filter is a mesh screen placed between the mic and speaker that disperses air bursts from plosives, ensuring cleaner audio.'
      },
      {
        question: 'Which type of headphones is essential for podcasters to prevent audio bleed into the microphone?',
        options: [
          'Open-back headphones',
          'Earbuds',
          'Closed-back headphones',
          'Wireless headphones'
        ],
        correct: 2,
        explanation: 'Closed-back headphones isolate sound, preventing audio leakage (bleed) from the headphones into the microphone during recording.'
      },
      {
        question: 'What is the main advantage of recording separate tracks for each participant in a podcast?',
        options: [
          'It reduces file size',
          'It simplifies post-production editing',
          'It eliminates the need for microphones',
          'It automatically adds music'
        ],
        correct: 1,
        explanation: 'Recording separate tracks for each participant allows independent editing of each person\'s audio, making it easier to balance levels and remove noise.'
      },
      {
        question: 'Which podcasting tip emphasizes not over-investing in expensive gear when starting out?',
        options: [
          'Plan for Scalability',
          'Prioritize Audio Quality',
          'Start Simple',
          'Match Tools to Your Workflow'
        ],
        correct: 2,
        explanation: 'The "Start Simple" tip advises beginners to avoid over-investing in expensive gear early, focusing instead on affordable tools and learning the basics first.'
      }
    ]
  }
};
