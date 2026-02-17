import type { Quiz } from '@/types/course';

export const quiz1: Quiz = {
  id: 1,
  title: 'Module 1 Quiz: Fundamentals and Applications of Sound',
  description: 'Test your understanding of sound fundamentals, audio careers, sound properties, and industry applications.',
  questions: [
    {
      id: 1,
      question: 'What type of wave is sound in air?',
      options: [
        'Transverse',
        'Longitudinal',
        'Electromagnetic',
        'Static'
      ],
      correctAnswer: 1,
      explanation: 'Sound in air is a longitudinal wave, where particles vibrate parallel to the direction of wave propagation.'
    },
    {
      id: 2,
      question: 'Which property of a sound wave determines its loudness?',
      options: [
        'Wavelength',
        'Frequency',
        'Amplitude',
        'Timbre'
      ],
      correctAnswer: 2,
      explanation: 'Amplitude determines the loudness of a sound. Higher amplitude means louder sound.'
    },
    {
      id: 3,
      question: 'True or False: Sound can travel through a vacuum.',
      options: [
        'True',
        'False'
      ],
      correctAnswer: 1,
      explanation: 'False. Sound requires a medium such as air, water, or solids to travel. It cannot travel through a vacuum.'
    },
    {
      id: 4,
      question: 'Which of the following is a use of ultrasound?',
      options: [
        'Detecting earthquakes',
        'Navigation in bats',
        'Sonar in submarines',
        'Medical imaging'
      ],
      correctAnswer: 3,
      explanation: 'Ultrasound is commonly used in medical imaging to visualize internal body structures.'
    },
    {
      id: 5,
      question: 'What unit is used to measure the intensity of sound?',
      options: [
        'Hertz',
        'Newton',
        'Decibel',
        'Watt'
      ],
      correctAnswer: 2,
      explanation: 'Decibel (dB) is the unit used to measure sound intensity or loudness.'
    },
    {
      id: 6,
      question: 'Which job involves recreating everyday sounds for films and TV?',
      options: [
        'Audio Engineer',
        'Foley Artist',
        'Mastering Engineer',
        'Sound Designer'
      ],
      correctAnswer: 1,
      explanation: 'A Foley Artist recreates everyday sound effects for films and TV to enhance the audio experience.'
    },
    {
      id: 7,
      question: 'In which medium does sound travel fastest?',
      options: [
        'Air',
        'Water',
        'Steel',
        'Vacuum'
      ],
      correctAnswer: 2,
      explanation: 'Sound travels fastest in steel (approximately 5,960 m/s) due to tightly packed particles in solids.'
    },
    {
      id: 8,
      question: 'What does the human perception of pitch correspond to in a sound wave?',
      options: [
        'Amplitude',
        'Frequency',
        'Phase',
        'Wavelength'
      ],
      correctAnswer: 1,
      explanation: 'Pitch corresponds to frequency. Higher frequency means higher pitch, and lower frequency means lower pitch.'
    },
    {
      id: 9,
      question: 'True or False: A violin and a flute playing the same note sound different because of timbre.',
      options: [
        'True',
        'False'
      ],
      correctAnswer: 0,
      explanation: 'True. Timbre (tone color) is what makes instruments sound different even when playing the same pitch.'
    },
    {
      id: 10,
      question: 'Which field is least likely to involve professional audio careers?',
      options: [
        'Game development',
        'Architecture',
        'Medical imaging',
        'Construction painting'
      ],
      correctAnswer: 3,
      explanation: 'Construction painting is least likely to involve professional audio careers, while the other fields all utilize sound engineering in various ways.'
    }
  ]
};
