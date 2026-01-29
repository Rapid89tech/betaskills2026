import type { Quiz } from '@/types/course';

export const module2Quiz: Quiz = {
  id: 4,
  title: 'Quiz: Module 2 – Tools and Equipment',
  duration: '15-20 minutes',
  type: 'quiz',
  content: {
    questions: [
      {
        id: 1,
        question: 'Which tool is most commonly used to remove or tighten small screws in smartphones?',
        type: 'multiple-choice',
        options: [
          'Heat gun',
          'Soldering iron',
          'Precision screwdriver',
          'Multimeter'
        ],
        correctAnswer: 2,
        explanation: 'Precision screwdrivers are the most commonly used tools for removing and tightening small screws in smartphones.'
      },
      {
        id: 2,
        question: 'What is the purpose of a spudger in phone repair?',
        type: 'multiple-choice',
        options: [
          'Test circuits',
          'Remove adhesive',
          'Measure voltage',
          'Pry open phone components safely'
        ],
        correctAnswer: 3,
        explanation: 'Spudgers are designed to pry open phone components safely without causing damage to delicate parts.'
      },
      {
        id: 3,
        question: 'Which tool is used to apply heat to loosen glue or adhesive in smartphones?',
        type: 'multiple-choice',
        options: [
          'Tweezers',
          'Heat gun',
          'Screwdriver',
          'Magnifying glass'
        ],
        correctAnswer: 1,
        explanation: 'Heat guns are used to apply heat to loosen glue or adhesive in smartphones.'
      },
      {
        id: 4,
        question: 'What is the primary use of tweezers in phone repair?',
        type: 'multiple-choice',
        options: [
          'Unscrew panels',
          'Cut wires',
          'Handle small, delicate components',
          'Apply thermal paste'
        ],
        correctAnswer: 2,
        explanation: 'Tweezers are primarily used to handle small, delicate components in phone repair.'
      },
      {
        id: 5,
        question: 'A multimeter is used to:',
        type: 'multiple-choice',
        options: [
          'Charge the battery',
          'View microscopic components',
          'Measure electrical values like voltage and continuity',
          'Store screws'
        ],
        correctAnswer: 2,
        explanation: 'Multimeters are used to measure electrical values like voltage and continuity in phone repair.'
      },
      {
        id: 6,
        question: 'What diagnostic tool helps identify physical damage to small circuits and solder joints?',
        type: 'multiple-choice',
        options: [
          'Soldering iron',
          'Heat gun',
          'Microscope',
          'Power adapter'
        ],
        correctAnswer: 2,
        explanation: 'Microscopes help identify physical damage to small circuits and solder joints that are too small for the naked eye.'
      },
      {
        id: 7,
        question: 'Why is an organized workspace important in cell phone repair?',
        type: 'multiple-choice',
        options: [
          'Helps impress customers',
          'Makes tools easier to sell',
          'Reduces mistakes and improves efficiency',
          'Increases heat in the room'
        ],
        correctAnswer: 2,
        explanation: 'An organized workspace reduces mistakes and improves efficiency in cell phone repair.'
      },
      {
        id: 8,
        question: 'A power supply tester helps check if a phone battery or charging circuit is working.',
        type: 'true-false',
        correctAnswer: true,
        explanation: 'True. Power supply testers simulate battery input to test motherboard functionality and check if charging circuits are working.'
      },
      {
        id: 9,
        question: 'You should always use your fingers instead of tweezers when handling internal parts.',
        type: 'true-false',
        correctAnswer: false,
        explanation: 'False. You should use ESD-safe tweezers to handle internal parts to prevent electrostatic discharge damage.'
      },
      {
        id: 10,
        question: 'All screwdrivers are safe for use on any phone model.',
        type: 'true-false',
        correctAnswer: false,
        explanation: 'False. Different phone models require specific screwdriver types (Phillips, Pentalobe, Torx, etc.) and using the wrong type can damage screws.'
      },
      {
        id: 11,
        question: 'Microscopes are only used for reading serial numbers.',
        type: 'true-false',
        correctAnswer: false,
        explanation: 'False. Microscopes are used for board-level repairs to inspect small components, solder joints, and identify microscopic damage.'
      },
      {
        id: 12,
        question: 'A clean, static-free work area protects delicate electronic parts.',
        type: 'true-false',
        correctAnswer: true,
        explanation: 'True. A clean, static-free work area with ESD-safe mats protects delicate electronic parts from electrostatic discharge.'
      },
      {
        id: 13,
        question: 'You should unplug and power off a device before using diagnostic tools.',
        type: 'true-false',
        correctAnswer: true,
        explanation: 'True. You should always unplug and power off a device before using diagnostic tools for safety.'
      },
      {
        id: 14,
        question: 'A heat gun can damage internal components if not used carefully.',
        type: 'true-false',
        correctAnswer: true,
        explanation: 'True. Heat guns can damage internal components if not used carefully, especially if overheated or used for too long.'
      },
      {
        id: 15,
        question: 'Tools like magnetic mats and labeled trays can help keep small parts organized.',
        type: 'true-false',
        correctAnswer: true,
        explanation: 'True. Magnetic mats and labeled trays are essential tools for keeping small parts organized during repairs.'
      }
    ]
  }
};
