import type { QuizLesson } from '@/types/course';

export const module4Quiz: QuizLesson = {
  id: 4,
  title: 'Module 4 Quiz: Audio Editing Essentials',
  duration: '30 min',
  type: 'quiz',
  content: {
    questions: [
      {
        question: 'What does DAW stand for in audio editing?',
        options: [
          'Digital Audio Workstation',
          'Desktop Audio Workflow',
          'Digital Audio Workshop',
          'Desktop Audio Workspace'
        ],
        correct: 0,
        explanation: 'DAW stands for Digital Audio Workstation, which is software designed for recording, editing, and producing audio files.'
      },
      {
        question: 'Which of the following is a free audio editing software?',
        options: [
          'Adobe Audition',
          'Logic Pro',
          'Audacity',
          'Pro Tools'
        ],
        correct: 2,
        explanation: 'Audacity is a free, cross-platform audio editing software that is popular among beginners and podcasters.'
      },
      {
        question: 'What is the purpose of a high-pass filter in audio editing?',
        options: [
          'To boost high frequencies',
          'To remove frequencies below a set point',
          'To add reverb to audio',
          'To compress dynamic range'
        ],
        correct: 1,
        explanation: 'A high-pass filter removes frequencies below a set point, commonly used to remove rumble and wind noise from voice recordings.'
      },
      {
        question: 'What is the recommended compression ratio for voice recording?',
        options: [
          '1:1 to 2:1',
          '2:1 to 4:1',
          '5:1 to 8:1',
          '10:1 to 20:1'
        ],
        correct: 1,
        explanation: 'For voice recording, a compression ratio of 2:1 to 4:1 is recommended to control dynamic range without making the audio sound unnatural.'
      },
      {
        question: 'What is the target LUFS level for podcast audio?',
        options: [
          '-12 LUFS',
          '-16 LUFS',
          '-20 LUFS',
          '-24 LUFS'
        ],
        correct: 1,
        explanation: 'The target LUFS level for podcast audio is -16 LUFS, which ensures consistent loudness across episodes and platforms.'
      },
      {
        question: 'Which audio format is best for podcast distribution?',
        options: [
          'WAV',
          'MP3',
          'FLAC',
          'AIFF'
        ],
        correct: 1,
        explanation: 'MP3 is the best format for podcast distribution because it offers a good balance of quality and file size, with universal compatibility.'
      },
      {
        question: 'What is the purpose of de-essing in audio processing?',
        options: [
          'To add echo effects',
          'To reduce harsh "s" sounds',
          'To boost bass frequencies',
          'To add stereo width'
        ],
        correct: 1,
        explanation: 'De-essing reduces harsh "s" sounds (sibilance) that can be unpleasant to listen to in voice recordings.'
      },
      {
        question: 'What is the recommended bit rate for podcast MP3 files?',
        options: [
          '64kbps',
          '128kbps',
          '192kbps',
          '320kbps'
        ],
        correct: 2,
        explanation: '192kbps is the recommended bit rate for podcast MP3 files as it provides good quality while keeping file sizes manageable.'
      },
      {
        question: 'What is the purpose of a noise gate in audio editing?',
        options: [
          'To increase overall volume',
          'To remove sounds below a threshold',
          'To add reverb effects',
          'To change pitch'
        ],
        correct: 1,
        explanation: 'A noise gate removes sounds below a threshold, helping to eliminate background noise during quiet passages.'
      },
      {
        question: 'Which of the following is NOT a common audio editing tool?',
        options: [
          'Razor tool',
          'Marquee tool',
          'Brush tool',
          'Move tool'
        ],
        correct: 2,
        explanation: 'The brush tool is not a common audio editing tool. Razor, marquee, and move tools are standard in audio editing software.'
      }
    ]
  }
};
