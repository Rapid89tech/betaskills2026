
import type { QuizLesson } from '@/types/course';

export const lesson11Quiz: QuizLesson = {
  id: 11,
  title: 'Quiz: Introduction to Computer Hardware (Module 1)', 
  duration: '15 min',
  type: 'quiz',
  content: {
    questions: [
      {
        question: 'What is the primary function of the CPU in a computer?',
        options: [
          'Store user files',
          'Render graphics', 
          'Execute program instructions',
          'Supply power to the components'
        ],
        correct: 2,
        explanation: 'The CPU (Central Processing Unit) is the "brain" of the computer that executes program instructions and performs calculations.'
      },
      {
        question: 'What does RAM do in a computer system?',
        options: [
          'Stores data permanently',
          'Provides power to other components',
          'Temporarily holds data for quick access',
          'Connects all hardware parts together'
        ],
        correct: 2,
        explanation: 'RAM (Random Access Memory) provides temporary, fast-access storage for data and programs currently being used by the CPU.'
      },
      {
        question: 'Which of the following is NOT a component found on a motherboard?',
        options: [
          'CPU socket',
          'RAM slot',
          'Power switch',
          'PCIe slot'
        ],
        correct: 2,
        explanation: 'The power switch is typically part of the computer case, not the motherboard itself.'
      },
      {
        question: 'What does the power supply unit (PSU) do?',
        options: [
          'Boosts graphics processing',
          'Provides temporary data storage',
          'Converts AC power to DC power',
          'Connects to the internet'
        ],
        correct: 2,
        explanation: 'The PSU converts alternating current (AC) from the wall outlet into direct current (DC) that computer components can use.'
      },
      {
        question: 'Which specification indicates how fast a CPU can process instructions?',
        options: [
          'RAM speed',
          'Clock speed (GHz)',
          'Wattage',
          'Cache size'
        ],
        correct: 1,
        explanation: 'Clock speed, measured in GHz (gigahertz), indicates how many processing cycles the CPU can perform per second.'
      },
      {
        question: 'What is the function of the GPU?',
        options: [
          'Manage audio input',
          'Perform graphical processing',
          'Control boot-up sequences',
          'Supply power to RAM'
        ],
        correct: 1,
        explanation: 'The GPU (Graphics Processing Unit) specializes in rendering images, video, and animations, handling graphics calculations.'
      },
      {
        question: 'Which type of GPU is integrated into the CPU or motherboard?',
        options: [
          'Dedicated GPU',
          'External GPU',
          'Integrated GPU',
          'Modular GPU'
        ],
        correct: 2,
        explanation: 'An integrated GPU is built into the CPU or motherboard and shares system memory, suitable for basic graphics needs.'
      },
      {
        question: 'Which of the following could be a symptom of a faulty RAM module?',
        options: [
          'No internet connection',
          'Slow file downloads',
          'Blue screen of death (BSOD)',
          'No image on monitor'
        ],
        correct: 2,
        explanation: 'Faulty RAM often causes system crashes including the Blue Screen of Death (BSOD), random restarts, and boot failures.'
      },
      {
        question: 'What determines how many applications a system can handle at once?',
        options: [
          'GPU clock speed',
          'Motherboard model',
          'PSU wattage',
          'Amount of RAM'
        ],
        correct: 3,
        explanation: 'The amount of RAM determines how much data can be stored temporarily for active programs, affecting multitasking capability.'
      },
      {
        question: 'A failing PSU might cause which of the following issues?',
        options: [
          'High-resolution video lag',
          'Loud audio output',
          'Random system shutdowns',
          'File corruption'
        ],
        correct: 2,
        explanation: 'A failing power supply can cause unstable power delivery, leading to random shutdowns, system instability, or failure to power on.'
      }
    ]
  }
};
