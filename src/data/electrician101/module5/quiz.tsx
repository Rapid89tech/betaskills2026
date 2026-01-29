import type { Lesson } from '@/types/course';

export const module5Quiz: Lesson = {
  id: 4,
  title: 'Module 5 Quiz',
  duration: '15 min',
  type: 'quiz',
  content: {
    questions: [
      {
        id: 1,
        question: 'What is Romex another name for?',
        options: ['THHN wire', 'NM-B cable', 'EMT conduit', 'PVC pipe'],
        correctAnswer: 1
      },
      {
        id: 2,
        question: 'Which conduit type can be direct buried?',
        options: ['EMT', 'PVC Schedule 40', 'FMC', 'Rigid Metal'],
        correctAnswer: 1
      },
      {
        id: 3,
        question: 'What color is 12 AWG NM-B cable sheath?',
        options: ['White', 'Yellow', 'Orange', 'Gray'],
        correctAnswer: 1
      },
      {
        id: 4,
        question: 'How often must NM cable be supported?',
        options: ['Every 2 feet', 'Every 4.5 feet', 'Every 6 feet', 'Every 10 feet'],
        correctAnswer: 1
      },
      {
        id: 5,
        question: 'What does THWN stand for?',
        options: [
          'Thermoplastic Heat Wire Nylon',
          'Thermoplastic Heat and Water-resistant Nylon',
          'Thermal High Wattage Neutral',
          'Thick Heat Wire Network'
        ],
        correctAnswer: 1
      }
    ]
  }
};

