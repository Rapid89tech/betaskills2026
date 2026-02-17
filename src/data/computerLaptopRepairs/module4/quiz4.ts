import { Lesson } from '@/types/course';

export const quiz4: Lesson = {
  id: 2,
  title: 'Module 4 Quiz: Power Supply & Battery Repair',
  duration: '15 min',
  type: 'quiz',
  content: {
    questions: [
      {
        id: 1,
        question: 'Which of the following is NOT a typical symptom of a laptop with no power?',
        options: [
          'No display or lights',
          'Fan spins but no charging light',
          'BIOS error message',
          'No fan or sound when pressing power'
        ],
        correct: 2
      },
      {
        id: 2,
        question: 'What is the most common voltage output for a standard laptop adapter?',
        options: [
          '5V',
          '12V',
          '19V',
          '24V'
        ],
        correct: 2
      },
      {
        id: 3,
        question: 'A laptop runs fine on AC but shows "Plugged in, not charging." What is the LEAST likely cause?',
        options: [
          'Faulty battery',
          'Defective charger',
          'Bad display cable',
          'Damaged charging IC'
        ],
        correct: 2
      },
      {
        id: 4,
        question: 'What tool should you use to test continuity between a DC jack and the motherboard?',
        options: [
          'Oscilloscope',
          'Signal tracer',
          'Digital multimeter',
          'Voltage regulator'
        ],
        correct: 2
      },
      {
        id: 5,
        question: 'During a wiggle test on an adapter, the voltage reading cuts in and out. What does this indicate?',
        options: [
          'Dead CMOS battery',
          'Bad RAM',
          'Loose or broken adapter wiring',
          'BIOS failure'
        ],
        correct: 2
      },
      {
        id: 6,
        question: 'What is the first step before replacing an internal laptop battery?',
        options: [
          'Open the laptop\'s display',
          'Remove the SSD',
          'Power off and unplug the device',
          'Format the hard drive'
        ],
        correct: 2
      },
      {
        id: 7,
        question: 'Which of the following is a sign of a failing lithium battery?',
        options: [
          'Laptop charges faster than normal',
          'Battery lasts longer than usual',
          'Battery percentage drops suddenly',
          'Battery icon turns red'
        ],
        correct: 2
      },
      {
        id: 8,
        question: 'If a laptop restarts randomly, what is the FIRST thing you should check?',
        options: [
          'Internet connection',
          'Thermal paste and cooling fan',
          'Printer settings',
          'Display brightness'
        ],
        correct: 1
      },
      {
        id: 9,
        question: 'A burnt smell and adapter LED turning off when plugged in may indicate:',
        options: [
          'Normal behavior',
          'Dead battery',
          'Short circuit on motherboard',
          'BIOS update required'
        ],
        correct: 2
      },
      {
        id: 10,
        question: 'When testing a barrel-type adapter with a multimeter, the red probe should contact:',
        options: [
          'Outer shell (negative)',
          'Power switch',
          'Inner pin (positive)',
          'Laptop battery terminal'
        ],
        correct: 2
      }
    ]
  }
};
