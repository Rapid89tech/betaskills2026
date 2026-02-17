import { Quiz } from '../../../types/course';

export const quiz4: Quiz = {
  id: 4,
  title: 'Module 4 Quiz: Animation Production',
  questions: [
    {
      question: 'Which AI tool specializes in ultra-realistic voice synthesis with support for over 70 languages?',
      options: [
        'Adobe Character Animator',
        'ElevenLabs',
        'Soundraw',
        'EbSynth'
      ],
      correct: 1,
      explanation: 'ElevenLabs generates ultra-realistic, human-like voices with support for over 70 languages and emotional nuances via audio tags.'
    },
    {
      question: 'What is the primary purpose of lip-sync automation with AI?',
      options: [
        'To create background music',
        'To synchronize animated characters\' lip movements with spoken audio',
        'To generate character designs',
        'To edit video footage'
      ],
      correct: 1,
      explanation: 'Lip-sync automation with AI synchronizes animated or virtual characters\' lip movements with spoken audio, creating seamless and realistic visual experiences.'
    },
    {
      question: 'What is frame interpolation in animation?',
      options: [
        'Deleting frames to speed up animation',
        'Creating intermediate frames between keyframes to produce smooth motion',
        'Adding color to black and white frames',
        'Removing background from frames'
      ],
      correct: 1,
      explanation: 'Frame interpolation generates intermediate frames between existing keyframes to create smoother motion, enhance visual quality, or stylize content.'
    },
    {
      question: 'Which tool is best known for style-transfer and propagating artistic styles across animation frames?',
      options: [
        'DeepMotion',
        'Aiva',
        'EbSynth',
        'LANDR'
      ],
      correct: 2,
      explanation: 'EbSynth is a style-transfer tool that uses AI to propagate artistic styles from a single keyframe across a sequence of frames, ideal for stylized animations.'
    },
    {
      question: 'What does DeepMotion specialize in?',
      options: [
        'Music composition',
        'AI-powered motion capture and animation',
        'Voice cloning',
        'Sound effects generation'
      ],
      correct: 1,
      explanation: 'DeepMotion is an AI-powered motion capture and animation platform that uses machine learning to generate realistic motion data and interpolate frames for fluid animations.'
    },
    {
      question: 'Which AI music composition tool specializes in orchestral and cinematic music?',
      options: [
        'Soundraw',
        'Amper',
        'Aiva',
        'ElevenLabs'
      ],
      correct: 2,
      explanation: 'Aiva (Artificial Intelligence Virtual Artist) specializes in composing intricate, orchestral, and cinematic music with emotional depth, ideal for film scoring.'
    },
    {
      question: 'What is Foley in animation and film production?',
      options: [
        'A type of camera movement',
        'The art of creating and adding sound effects to videos',
        'A method of character design',
        'A lighting technique'
      ],
      correct: 1,
      explanation: 'Foley is the art of creating and adding sound effects to silent videos to enhance auditory realism, such as footsteps, rustling clothes, or breaking glass.'
    },
    {
      question: 'What is the main benefit of AI-assisted rigging in animation?',
      options: [
        'It eliminates the need for any animation',
        'It automates the creation of digital skeletons, making rigging faster and more accessible',
        'It only works for 2D animation',
        'It replaces all human animators'
      ],
      correct: 1,
      explanation: 'AI-assisted rigging automates the creation of digital skeletons (rigs) that control character movement, making the process faster, more accessible, and more precise.'
    },
    {
      question: 'Which tool is best for automated mastering with genre-specific presets?',
      options: [
        'EbSynth',
        'DeepMotion',
        'LANDR',
        'Replica Studios'
      ],
      correct: 2,
      explanation: 'LANDR is a cloud-based platform offering automated mastering with customizable styles and genre-specific presets like pop, hip-hop, and electronic.'
    },
    {
      question: 'What is inbetweening (or tweening) in animation?',
      options: [
        'Creating the first and last frames of an animation',
        'Creating intermediate frames between keyframes to produce smooth motion',
        'Adding color to animation frames',
        'Recording voice dialogue'
      ],
      correct: 1,
      explanation: 'Inbetweening or tweening is the process of creating intermediate frames between keyframes to produce smooth, fluid motion in animation.'
    }
  ]
};
