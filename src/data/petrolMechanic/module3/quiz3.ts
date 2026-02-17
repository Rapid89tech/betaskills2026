import type { Lesson } from '@/types/course';

export const quiz3: Lesson = {
  id: 4,
  title: '📝 Module 3 Quiz: Safety and Workshop Best Practices',
  duration: '30 min',
  type: 'quiz',
  content: {
    questions: [
      {
        question: 'What is the main purpose of Personal Protective Equipment (PPE) in the workshop?',
        options: [
          'To increase productivity',
          'To reduce noise in the workshop',
          'To protect workers from hazards and injuries',
          'To comply with fashion trends'
        ],
        correct: 2,
        explanation: 'PPE is designed to protect workers from various hazards including physical injuries, chemical exposure, and noise, ensuring safety in the workshop environment.'
      },
      {
        question: 'Which type of gloves is best for handling fuels and chemicals?',
        options: [
          'Cotton gloves',
          'Nitrile gloves',
          'Leather gloves',
          'Wool gloves'
        ],
        correct: 1,
        explanation: 'Nitrile gloves provide excellent chemical resistance and protect against skin irritation when handling fuels, solvents, and other chemicals commonly used in automotive workshops.'
      },
      {
        question: 'When should PPE be inspected?',
        options: [
          'Once a year',
          'Before each use',
          'Only when there is visible damage',
          'After a chemical spill'
        ],
        correct: 1,
        explanation: 'PPE should be inspected before each use to ensure it is in good condition and will provide adequate protection. Regular inspection prevents compromised protection from worn or damaged equipment.'
      },
      {
        question: 'What should you always consult before handling any chemical in the workshop?',
        options: [
          'A colleague',
          'Safety Data Sheet (SDS)',
          'Google',
          'Toolbox'
        ],
        correct: 1,
        explanation: 'Safety Data Sheets (SDS) provide critical information about chemical hazards, proper handling procedures, storage requirements, and emergency response measures.'
      },
      {
        question: 'Why should fuels be stored in a cool, ventilated area away from ignition sources?',
        options: [
          'To make access easier',
          'To reduce evaporation',
          'To prevent fire and explosions',
          'To avoid unpleasant odors'
        ],
        correct: 2,
        explanation: 'Fuels are highly flammable and can ignite easily from sparks, flames, or heat. Proper storage in cool, ventilated areas away from ignition sources prevents catastrophic fires and explosions.'
      },
      {
        question: 'What is the proper way to dilute acid?',
        options: [
          'Pour water into acid',
          'Pour acid into water',
          'Mix with oil',
          'Never mix acid'
        ],
        correct: 1,
        explanation: 'Always pour acid into water, never water into acid. This prevents violent reactions and splashing that can occur when water is added to concentrated acid.'
      },
      {
        question: 'What is the primary reason for keeping tools clean and well-maintained?',
        options: [
          'To look professional',
          'To prevent theft',
          'To reduce malfunction and accidents',
          'To pass inspections'
        ],
        correct: 2,
        explanation: 'Clean and well-maintained tools function properly and safely, reducing the risk of malfunctions, accidents, and injuries during workshop tasks.'
      },
      {
        question: 'Which of the following should always be done before using a power tool?',
        options: [
          'Sharpen the blade',
          'Replace the battery',
          'Inspect the cord and safety guards',
          'Oil the motor'
        ],
        correct: 2,
        explanation: 'Power tools must be inspected for frayed cords, damaged plugs, and malfunctioning safety guards before use to prevent electrical shocks, cuts, and other injuries.'
      },
      {
        question: 'Why is it important to use the correct tool for the job?',
        options: [
          'Tools are expensive',
          'It improves job quality and safety',
          'It saves storage space',
          'It looks more professional'
        ],
        correct: 1,
        explanation: 'Using the correct tool ensures both safety and quality work. Mismatched tools can cause injuries, damage components, strip bolts, or result in inefficient repairs.'
      },
      {
        question: 'What should you do if a spill occurs in the workshop?',
        options: [
          'Wait for someone else to clean it',
          'Ignore it if it\'s small',
          'Clean it up immediately using a spill kit',
          'Cover it with a cloth and warn others'
        ],
        correct: 2,
        explanation: 'Spills should be cleaned up immediately using appropriate spill kits to prevent slips, fires, or environmental contamination. Prompt action ensures workshop safety and compliance.'
      }
    ]
  }
};
