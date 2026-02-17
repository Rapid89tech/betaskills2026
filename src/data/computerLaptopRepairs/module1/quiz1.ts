import { Lesson } from '@/types/course';

export const quiz1: Lesson = {
  id: 2,
  title: 'Module 1 Quiz: Introduction to Computer Hardware',
  duration: '15 min',
  type: 'quiz',
  content: {
    questions: [
      {
        id: 1,
        question: 'What is the primary function of the CPU in a computer?',
        options: [
          'Store user files',
          'Render graphics',
          'Execute program instructions',
          'Supply power to the components'
        ],
        correct: 2
      },
      {
        id: 2,
        question: 'What does RAM do in a computer system?',
        options: [
          'Stores data permanently',
          'Provides power to other components',
          'Temporarily holds data for quick access',
          'Connects all hardware parts together'
        ],
        correct: 2
      },
      {
        id: 3,
        question: 'Which of the following is NOT a component found on a motherboard?',
        options: [
          'CPU socket',
          'RAM slot',
          'Power switch',
          'PCIe slot'
        ],
        correct: 2
      },
      {
        id: 4,
        question: 'What does the power supply unit (PSU) do?',
        options: [
          'Boosts graphics processing',
          'Provides temporary data storage',
          'Converts AC power to DC power',
          'Connects to the internet'
        ],
        correct: 2
      },
      {
        id: 5,
        question: 'Which specification indicates how fast a CPU can process instructions?',
        options: [
          'RAM speed',
          'Clock speed (GHz)',
          'Wattage',
          'Cache size'
        ],
        correct: 1
      },
      {
        id: 6,
        question: 'What is the function of the GPU?',
        options: [
          'Manage audio input',
          'Perform graphical processing',
          'Control boot-up sequences',
          'Supply power to RAM'
        ],
        correct: 1
      },
      {
        id: 7,
        question: 'Which type of GPU is integrated into the CPU or motherboard?',
        options: [
          'Dedicated GPU',
          'External GPU',
          'Integrated GPU',
          'Modular GPU'
        ],
        correct: 2
      },
      {
        id: 8,
        question: 'Which of the following could be a symptom of a faulty RAM module?',
        options: [
          'No internet connection',
          'Slow file downloads',
          'Blue screen of death (BSOD)',
          'No image on monitor'
        ],
        correct: 2
      },
      {
        id: 9,
        question: 'What determines how many applications a system can handle at once?',
        options: [
          'GPU clock speed',
          'Motherboard model',
          'PSU wattage',
          'Amount of RAM'
        ],
        correct: 3
      },
      {
        id: 10,
        question: 'A failing PSU might cause which of the following issues?',
        options: [
          'High-resolution video lag',
          'Loud audio output',
          'Random system shutdowns',
          'File corruption'
        ],
        correct: 2
      }
    ]
  }
};
