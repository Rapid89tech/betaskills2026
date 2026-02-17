import { Lesson } from '@/types/course';

export const quiz2: Lesson = {
  id: 2,
  title: 'Module 2 Quiz: Laptop Disassembly and Identification',
  duration: '15 min',
  type: 'quiz',
  content: {
    questions: [
      {
        id: 1,
        question: 'What is the primary function of a laptop battery?',
        options: [
          'Cool internal components',
          'Provide portable power',
          'Display visual output',
          'Enable user input'
        ],
        correct: 1
      },
      {
        id: 2,
        question: 'Which battery issue is a safety hazard requiring immediate replacement?',
        options: [
          'Reduced battery life',
          'Swelling or bulging',
          'Slow charging',
          'Incorrect voltage'
        ],
        correct: 1
      },
      {
        id: 3,
        question: 'What is the purpose of a cooling fan in a laptop?',
        options: [
          'Power the system',
          'Prevent overheating',
          'Store data',
          'Connect peripherals'
        ],
        correct: 1
      },
      {
        id: 4,
        question: 'Which maintenance tip helps extend cooling fan performance?',
        options: [
          'Use approved chargers',
          'Clean regularly with compressed air',
          'Avoid full discharges',
          'Handle gently to avoid cracks'
        ],
        correct: 1
      },
      {
        id: 5,
        question: 'What is a common issue with laptop keyboards?',
        options: [
          'Dead pixels',
          'Liquid spills causing short circuits',
          'Overheating',
          'Firmware bugs'
        ],
        correct: 1
      },
      {
        id: 6,
        question: 'Which display type offers better viewing angles and color accuracy?',
        options: [
          'TN',
          'LCD',
          'IPS',
          'LED'
        ],
        correct: 2
      },
      {
        id: 7,
        question: 'Which tool is used to safely open plastic laptop casings?',
        options: [
          'Precision screwdriver',
          'Plastic pry tool/spudger',
          'Multimeter',
          'Compressed air'
        ],
        correct: 1
      },
      {
        id: 8,
        question: 'What is the purpose of an anti-static wrist strap?',
        options: [
          'Organize screws',
          'Prevent electrostatic discharge',
          'Clean thermal paste',
          'Illuminate components'
        ],
        correct: 1
      },
      {
        id: 9,
        question: 'Which environment condition reduces static buildup?',
        options: [
          'Low humidity',
          '40%-60% humidity',
          'High temperature',
          'Carpeted surfaces'
        ],
        correct: 1
      },
      {
        id: 10,
        question: 'Which is NOT an ESD-safe practice?',
        options: [
          'Using an anti-static mat',
          'Wearing synthetic clothes',
          'Handling components by edges',
          'Using ESD-safe tweezers'
        ],
        correct: 1
      }
    ]
  }
};
