
import { QuizLesson } from '@/types/course';

export const lesson5Quiz: QuizLesson = {
  id: 5,
  title: 'Module 1 Quiz: Fundamentals and Applications of Sound',
  duration: '30 min',
  type: 'quiz',
  content: {
    questions: [
      {
        question: 'What type of wave is sound in air?',
        options: [
          'Transverse',
          'Longitudinal',
          'Electromagnetic',
          'Static'
        ],
        correct: 1,
        explanation: 'Sound in air is a longitudinal wave where particles vibrate parallel to the direction of wave propagation.'
      },
      {
        question: 'Which property of a sound wave determines its loudness?',
        options: [
          'Wavelength',
          'Frequency',
          'Amplitude',
          'Timbre'
        ],
        correct: 2,
        explanation: 'Amplitude determines the loudness of a sound - higher amplitude results in louder sound.'
      },
      {
        question: 'Sound can travel through a vacuum.',
        options: [
          'True',
          'False'
        ],
        correct: 1,
        explanation: 'False. Sound requires a medium such as air, water, or solids to travel. It cannot travel through a vacuum.'
      },
      {
        question: 'Which of the following is a use of ultrasound?',
        options: [
          'Detecting earthquakes',
          'Navigation in bats',
          'Sonar in submarines',
          'Medical imaging'
        ],
        correct: 3,
        explanation: 'Ultrasound is commonly used in medical imaging for non-invasive visualization of internal structures.'
      },
      {
        question: 'What unit is used to measure the intensity of sound?',
        options: [
          'Hertz',
          'Newton',
          'Decibel',
          'Watt'
        ],
        correct: 2,
        explanation: 'Decibel (dB) is the unit used to measure sound intensity or loudness.'
      },
      {
        question: 'Which job involves recreating everyday sounds for films and TV?',
        options: [
          'Audio Engineer',
          'Foley Artist',
          'Mastering Engineer',
          'Sound Designer'
        ],
        correct: 1,
        explanation: 'A Foley Artist specializes in creating and recording everyday sound effects for films and television.'
      },
      {
        question: 'In which medium does sound travel fastest?',
        options: [
          'Air',
          'Water',
          'Steel',
          'Vacuum'
        ],
        correct: 2,
        explanation: 'Sound travels fastest in steel (solid) because particles are closely packed, allowing for efficient energy transfer.'
      },
      {
        question: 'What does the human perception of pitch correspond to in a sound wave?',
        options: [
          'Amplitude',
          'Frequency',
          'Phase',
          'Wavelength'
        ],
        correct: 1,
        explanation: 'Pitch corresponds to frequency - higher frequencies are perceived as higher pitches.'
      },
      {
        question: 'A violin and a flute playing the same note sound different because of timbre.',
        options: [
          'True',
          'False'
        ],
        correct: 0,
        explanation: 'True. Timbre is the quality that distinguishes sounds of the same pitch and loudness, making a violin and flute sound different even when playing the same note.'
      },
      {
        question: 'Which field is least likely to involve professional audio careers?',
        options: [
          'Game development',
          'Architecture',
          'Medical imaging',
          'Construction painting'
        ],
        correct: 3,
        explanation: 'Construction painting is least likely to involve professional audio careers, while the other fields all have significant audio applications.'
      }
    ]
  }
};
