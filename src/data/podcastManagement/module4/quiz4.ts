import type { Lesson } from '@/types/course';

export const quiz4: Lesson = {
  id: 5,
  title: '📝 Module 4 Quiz: Audio Editing Essentials',
  duration: '15 min',
  type: 'quiz',
  content: {
    questions: [
      {
        question: 'Which of the following is a FREE, open-source editing tool ideal for beginners?',
        options: [
          'Adobe Audition',
          'Descript',
          'Audacity',
          'Pro Tools'
        ],
        correct: 2,
        explanation: 'Audacity is a free, open-source audio editor perfect for beginners learning podcast editing basics.'
      },
      {
        question: 'What is the biggest advantage of using Descript for editing?',
        options: [
          'Advanced spectral editing',
          'Drag-and-drop music tools',
          'Text-based audio editing',
          'Dolby Atmos support'
        ],
        correct: 2,
        explanation: 'Descript\'s text-based editing allows you to edit audio by simply editing the transcript, making it fast and intuitive.'
      },
      {
        question: 'True or False: Adobe Audition is a free tool best suited for beginners.',
        options: [
          'True',
          'False'
        ],
        correct: 1,
        explanation: 'False. Adobe Audition is a paid professional tool ($20.99/month) with a steep learning curve, best suited for experienced users.'
      },
      {
        question: 'Which tool would best suit a podcaster who wants fast, text-driven editing with automatic transcription?',
        options: [
          'Audacity',
          'Adobe Audition',
          'Descript',
          'GarageBand'
        ],
        correct: 2,
        explanation: 'Descript offers automatic transcription and text-based editing, making it ideal for fast, efficient podcast editing.'
      },
      {
        question: 'In Audacity, which feature helps remove constant background noise?',
        options: [
          'Razor Tool',
          'Studio Sound',
          'Noise Profile + Noise Reduction',
          'Ducking'
        ],
        correct: 2,
        explanation: 'Audacity uses Noise Profile to capture the noise characteristics, then Noise Reduction to remove it from the audio.'
      },
      {
        question: 'Which feature is exclusive to Descript among the three tools?',
        options: [
          'Multitrack editing',
          'Export to MP3',
          'Spectral frequency editing',
          'Overdub (AI voice cloning)'
        ],
        correct: 3,
        explanation: 'Overdub is Descript\'s unique AI voice cloning feature that allows you to correct mistakes by typing new words.'
      },
      {
        question: 'What is a major limitation of using Audacity for podcast editing?',
        options: [
          'No support for WAV files',
          'No music support',
          'Outdated interface and limited non-destructive editing',
          'Cannot export MP3 files'
        ],
        correct: 2,
        explanation: 'Audacity has an outdated interface and limited non-destructive editing capabilities compared to modern tools.'
      },
      {
        question: 'Which of these is NOT a feature of Adobe Audition?',
        options: [
          'Auto-ducking',
          'Essential Sound panel',
          'Automatic transcription',
          'Spectral frequency editing'
        ],
        correct: 2,
        explanation: 'Adobe Audition does not have built-in automatic transcription. This feature is exclusive to Descript.'
      },
      {
        question: 'What\'s the recommended LUFS level for podcast audio loudness?',
        options: [
          '-6 LUFS',
          '-16 LUFS',
          '-30 LUFS',
          '+3 LUFS'
        ],
        correct: 1,
        explanation: '-16 LUFS is the industry standard for podcast loudness, ensuring consistent volume across platforms.'
      },
      {
        question: 'Which of the following statements is TRUE about exporting audio for podcast distribution?',
        options: [
          'Use 320 kbps stereo MP3 for all podcasts',
          'Always export in WAV format for streaming',
          'Add ID3 metadata to help with search and discoverability',
          'You must export at 96 kHz for Spotify'
        ],
        correct: 2,
        explanation: 'Adding ID3 metadata (title, artist, album, etc.) helps with search and discoverability on podcast platforms.'
      }
    ]
  }
};