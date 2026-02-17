import { Lesson } from '@/types/course';

export const quiz6: Lesson = {
  id: 2,
  title: 'Module 6 Quiz: Display, Keyboard, and Touchpad Repairs',
  duration: '15 min',
  type: 'quiz',
  content: {
    questions: [
      {
        id: 1,
        question: 'What is a key difference between LCD and LED laptop screens?',
        options: ['LCDs use LED backlighting', 'LEDs require inverter boards', 'LCDs use CCFL backlighting and need an inverter', 'LED screens are thicker and heavier'],
        correct: 2
      },
      {
        id: 2,
        question: 'Which display type offers the widest viewing angles and best color accuracy?',
        options: ['LED', 'IPS', 'LCD', 'CCFL'],
        correct: 1
      },
      {
        id: 3,
        question: 'What is the purpose of an inverter board in a laptop?',
        options: ['To improve resolution', 'To power USB ports', 'To convert DC to AC for CCFL backlights', 'To regulate GPU temperature'],
        correct: 2
      },
      {
        id: 4,
        question: 'If a laptop touchpad is unresponsive, what is a likely software-related cause?',
        options: ['Loose ribbon cable', 'Disabled in BIOS or OS settings', 'Damaged touchpad surface', 'Faulty motherboard'],
        correct: 1
      },
      {
        id: 5,
        question: 'Which resolution is considered Full HD (FHD)?',
        options: ['1280×720', '1366×768', '1920×1080', '3840×2160'],
        correct: 2
      },
      {
        id: 6,
        question: 'What should you always do before replacing a laptop touchpad?',
        options: ['Install new driver software', 'Run BIOS update', 'Disconnect battery and drain residual power', 'Format the hard drive'],
        correct: 2
      },
      {
        id: 7,
        question: 'A laptop shows erratic cursor movement. What is a possible cause?',
        options: ['Faulty GPU', 'Dirt or driver conflict', 'Dead pixels', 'Overheating CPU'],
        correct: 1
      },
      {
        id: 8,
        question: 'What type of touchpad supports advanced gestures and is Microsoft-certified?',
        options: ['Resistive', 'Capacitive', 'Precision', 'Mechanical'],
        correct: 2
      },
      {
        id: 9,
        question: 'What is a recommended cleaning solution for laptop screens and touchpads?',
        options: ['Bleach', 'Diluted isopropyl alcohol', 'Window cleaner', 'Undiluted ammonia'],
        correct: 1
      },
      {
        id: 10,
        question: 'Why is scheduling maintenance tasks important?',
        options: ['To void warranty', 'To monitor recurring issues and plan future checks', 'To uninstall necessary drivers', 'To avoid software updates'],
        correct: 1
      }
    ]
  }
};
