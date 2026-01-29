import { QuizLesson } from '@/types/course';

const quiz3: QuizLesson = {
  id: 4,
  title: 'Quiz: Safety and Workshop Best Practices',
  type: 'quiz',
  duration: '15 minutes',
  content: {
    questions: [
      {
        id: 1,
        question: 'What is the main purpose of Personal Protective Equipment (PPE) in the workshop?',
        options: [
          'To increase productivity',
          'To reduce noise in the workshop',
          'To protect workers from hazards and injuries',
          'To comply with fashion trends'
        ],
        correctAnswer: 2,
        explanation: 'PPE is designed to minimize exposure to hazards such as cuts, burns, chemical splashes, and noise, protecting workers from injuries and long-term health risks.'
      },
      {
        id: 2,
        question: 'Which type of gloves is best for handling fuels and chemicals?',
        options: [
          'Cotton gloves',
          'Nitrile gloves',
          'Leather gloves',
          'Wool gloves'
        ],
        correctAnswer: 1,
        explanation: 'Nitrile gloves provide excellent chemical resistance and are ideal for handling fuels and chemicals, preventing skin irritation and burns.'
      },
      {
        id: 3,
        question: 'When should PPE be inspected?',
        options: [
          'Once a year',
          'Before each use',
          'Only when there is visible damage',
          'After a chemical spill'
        ],
        correctAnswer: 1,
        explanation: 'PPE should be inspected before each use to ensure it is in good condition and will provide adequate protection.'
      },
      {
        id: 4,
        question: 'What should you always consult before handling any chemical in the workshop?',
        options: [
          'A colleague',
          'Safety Data Sheet (SDS)',
          'Google',
          'Toolbox'
        ],
        correctAnswer: 1,
        explanation: 'Safety Data Sheets (SDS) provide critical handling, storage, and emergency information for each chemical, ensuring safe use.'
      },
      {
        id: 5,
        question: 'Why should fuels be stored in a cool, ventilated area away from ignition sources?',
        options: [
          'To make access easier',
          'To reduce evaporation',
          'To prevent fire and explosions',
          'To avoid unpleasant odors'
        ],
        correctAnswer: 2,
        explanation: 'Fuels are highly flammable and can ignite easily from sparks, flames, or heat, making proper storage essential for preventing fires and explosions.'
      },
      {
        id: 6,
        question: 'What is the proper way to dilute acid?',
        options: [
          'Pour water into acid',
          'Pour acid into water',
          'Mix with oil',
          'Never mix acid'
        ],
        correctAnswer: 1,
        explanation: 'Always pour acid into water, never water into acid, to prevent violent reactions and splashing.'
      },
      {
        id: 7,
        question: 'What is the primary reason for keeping tools clean and well-maintained?',
        options: [
          'To look professional',
          'To prevent theft',
          'To reduce malfunction and accidents',
          'To pass inspections'
        ],
        correctAnswer: 2,
        explanation: 'Clean and well-maintained tools prevent malfunctions and accidents, ensuring safe and efficient work.'
      },
      {
        id: 8,
        question: 'Which of the following should always be done before using a power tool?',
        options: [
          'Sharpen the blade',
          'Replace the battery',
          'Inspect the cord and safety guards',
          'Oil the motor'
        ],
        correctAnswer: 2,
        explanation: 'Power tools should be inspected for frayed cords, damaged plugs, or malfunctioning safety guards before use to prevent accidents.'
      },
      {
        id: 9,
        question: 'Why is it important to use the correct tool for the job?',
        options: [
          'Tools are expensive',
          'It improves job quality and safety',
          'It saves storage space',
          'It looks more professional'
        ],
        correctAnswer: 1,
        explanation: 'Using the correct tool for the job improves both quality and safety, preventing injuries and damage to components.'
      },
      {
        id: 10,
        question: 'What should you do if a spill occurs in the workshop?',
        options: [
          'Wait for someone else to clean it',
          'Ignore it if it\'s small',
          'Clean it up immediately using a spill kit',
          'Cover it with a cloth and warn others'
        ],
        correctAnswer: 2,
        explanation: 'Spills should be cleaned up immediately using appropriate spill kits to prevent slips, fires, or environmental contamination.'
      }
    ]
  }
};

export default quiz3;
