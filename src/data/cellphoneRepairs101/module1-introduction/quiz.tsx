import type { Quiz } from '@/types/course';

export const module1Quiz: Quiz = {
  id: 5,
  title: 'Quiz: Module 1 – Introduction to Cell Phone Repair',
  duration: '15-20 minutes',
  type: 'quiz',
  content: {
    questions: [
      {
        id: 1,
        question: 'What is the main objective of cell phone repair?',
        type: 'multiple-choice',
        options: [
          'Sell new phones',
          'Modify hardware permanently',
          'Restore devices to proper working condition',
          'Install new software features'
        ],
        correctAnswer: 2,
        explanation: 'The main objective of cell phone repair is to restore devices to proper working condition, not to sell new phones or modify hardware permanently.'
      },
      {
        id: 2,
        question: 'Which of the following is not considered a common repair issue?',
        type: 'multiple-choice',
        options: [
          'Cracked screen',
          'Water damage',
          'Lost SIM card',
          'Battery failure'
        ],
        correctAnswer: 2,
        explanation: 'A lost SIM card is not considered a common repair issue as it\'s a user error rather than a device malfunction.'
      },
      {
        id: 3,
        question: 'What is the first step before starting any phone repair job?',
        type: 'multiple-choice',
        options: [
          'Remove the screen',
          'Discharge the battery',
          'Power off the device and disconnect the battery',
          'Plug in a new charger'
        ],
        correctAnswer: 2,
        explanation: 'The first step before starting any phone repair job is to power off the device and disconnect the battery for safety.'
      },
      {
        id: 4,
        question: 'Which of the following best describes the smartphone repair industry today?',
        type: 'multiple-choice',
        options: [
          'Declining and outdated',
          'Growing and full of opportunity',
          'Illegal in most countries',
          'Only applicable to engineers'
        ],
        correctAnswer: 1,
        explanation: 'The smartphone repair industry is growing and full of opportunity due to the increasing reliance on mobile devices.'
      },
      {
        id: 5,
        question: 'Which skill is most important for becoming a successful repair technician?',
        type: 'multiple-choice',
        options: [
          'Cooking',
          'Micro-soldering',
          'Hardware and software troubleshooting',
          'Public speaking'
        ],
        correctAnswer: 2,
        explanation: 'Hardware and software troubleshooting is the most important skill for becoming a successful repair technician.'
      },
      {
        id: 6,
        question: 'What type of damage is usually not visible from the outside of the phone?',
        type: 'multiple-choice',
        options: [
          'Cracked glass',
          'Water damage to motherboard',
          'Broken button',
          'Missing back cover'
        ],
        correctAnswer: 1,
        explanation: 'Water damage to the motherboard is usually not visible from the outside of the phone and requires internal inspection.'
      },
      {
        id: 7,
        question: 'Why is it important to stay updated with new phone models and technologies?',
        type: 'multiple-choice',
        options: [
          'To impress customers',
          'To compete effectively and adapt repair skills',
          'To use more expensive tools',
          'To watch more unboxing videos'
        ],
        correctAnswer: 1,
        explanation: 'It\'s important to stay updated to compete effectively and adapt repair skills to new technologies.'
      },
      {
        id: 8,
        question: 'What is the benefit of repairing a phone instead of replacing it?',
        type: 'multiple-choice',
        options: [
          'Creates e-waste',
          'Saves money and the environment',
          'Helps phone manufacturers',
          'Takes more time'
        ],
        correctAnswer: 1,
        explanation: 'Repairing a phone instead of replacing it saves money and the environment by reducing e-waste.'
      },
      {
        id: 9,
        question: 'Static electricity can damage internal smartphone components.',
        type: 'true-false',
        correctAnswer: true,
        explanation: 'True. Static electricity can damage sensitive internal smartphone components like logic boards and integrated circuits.'
      },
      {
        id: 10,
        question: 'Water damage is always easy to detect by just looking.',
        type: 'true-false',
        correctAnswer: false,
        explanation: 'False. Water damage is not always easy to detect by just looking, especially internal damage to the motherboard.'
      },
      {
        id: 11,
        question: 'A technician must be careful when handling internal parts like the processor or RAM.',
        type: 'true-false',
        correctAnswer: true,
        explanation: 'True. Technicians must be extremely careful when handling sensitive internal parts like processors and RAM.'
      },
      {
        id: 12,
        question: 'It is unnecessary to remove the battery before starting a repair.',
        type: 'true-false',
        correctAnswer: false,
        explanation: 'False. It is essential to remove the battery before starting any repair for safety reasons.'
      },
      {
        id: 13,
        question: 'Good communication and honesty improve customer trust.',
        type: 'true-false',
        correctAnswer: true,
        explanation: 'True. Good communication and honesty are essential for building and maintaining customer trust.'
      },
      {
        id: 14,
        question: 'All phones have identical internal layouts.',
        type: 'true-false',
        correctAnswer: false,
        explanation: 'False. Different phone models and brands have different internal layouts and component arrangements.'
      },
      {
        id: 15,
        question: 'Diagnosing problems is a key part of successful repair.',
        type: 'true-false',
        correctAnswer: true,
        explanation: 'True. Accurate diagnosis is crucial for successful repair as it determines the correct approach and parts needed.'
      }
    ]
  }
};
