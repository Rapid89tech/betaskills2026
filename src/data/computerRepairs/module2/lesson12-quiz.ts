
import type { QuizLesson } from '@/types/course';

export const lesson12Quiz: QuizLesson = {
  id: 12,
  title: 'Quiz: Laptop Disassembly, Tools, and ESD Safety (Module 2)',
  duration: '15 min',
  type: 'quiz',
  content: {
    questions: [
      {
        question: 'What is the primary purpose of an anti-static wrist strap?',
        options: [
          'To keep your wrist comfortable during long repairs',
          'To prevent electrostatic discharge (ESD) damage to components',
          'To hold tools while working',
          'To identify you as a repair technician'
        ],
        correct: 1,
        explanation: 'Anti-static wrist straps prevent electrostatic discharge by grounding the technician, protecting sensitive electronic components from damage.'
      },
      {
        question: 'Which of the following is NOT a recommended ESD prevention method?',
        options: [
          'Using anti-static mats and work surfaces',
          'Wearing anti-static wrist straps',
          'Working on carpeted floors',
          'Maintaining 40-60% relative humidity'
        ],
        correct: 2,
        explanation: 'Working on carpeted floors creates static electricity and should be avoided. Anti-static mats, wrist straps, and proper humidity control are all recommended ESD prevention methods.'
      },
      {
        question: 'What should you do before starting laptop disassembly?',
        options: [
          'Start immediately to save time',
          'Remove the battery and disconnect power',
          'Turn on the laptop to test it first',
          'Call the customer for permission'
        ],
        correct: 1,
        explanation: 'Always remove the battery and disconnect power before disassembly to prevent electrical shock and component damage.'
      },
      {
        question: 'Which tool is best for removing adhesive-backed components?',
        options: [
          'A hammer and chisel',
          'A heat gun or hot plate',
          'A screwdriver',
          'A pair of pliers'
        ],
        correct: 1,
        explanation: 'Heat guns or hot plates are used to soften adhesives, making it easier and safer to remove components without damage.'
      },
      {
        question: 'How should you handle laptop components to prevent damage?',
        options: [
          'Hold them by any convenient part',
          'Hold them by the edges only',
          'Use your bare hands for better grip',
          'Throw them in a toolbox for storage'
        ],
        correct: 1,
        explanation: 'Components should always be held by the edges to avoid touching sensitive contacts, pins, or circuits that could be damaged by oils or static electricity.'
      },
      {
        question: 'What is the purpose of documenting screw locations during disassembly?',
        options: [
          'To show off your organizational skills',
          'To ensure proper reassembly and prevent damage',
          'To waste time during the repair',
          'To create unnecessary paperwork'
        ],
        correct: 1,
        explanation: 'Documenting screw locations ensures that the correct screws are used in the right places during reassembly, preventing damage and ensuring proper function.'
      },
      {
        question: 'Which of the following is a common ESD hazard?',
        options: [
          'Working in a well-lit area',
          'Wearing synthetic clothing',
          'Using proper tools',
          'Following safety procedures'
        ],
        correct: 1,
        explanation: 'Synthetic clothing can generate static electricity, making it a common ESD hazard. Natural fibers are preferred when working with electronics.'
      },
      {
        question: 'What should you do if you encounter a stripped screw during disassembly?',
        options: [
          'Force it out with pliers',
          'Use a screw extractor or drill it out carefully',
          'Leave it in place and work around it',
          'Use a hammer to break it'
        ],
        correct: 1,
        explanation: 'Stripped screws should be carefully removed using screw extractors or by drilling them out, rather than forcing them which could damage the component.'
      },
      {
        question: 'Why is it important to take photos during disassembly?',
        options: [
          'To share on social media',
          'To document cable routing and component placement for reassembly',
          'To prove you did the work',
          'To waste storage space'
        ],
        correct: 1,
        explanation: 'Photos help document cable routing, component placement, and screw locations, making reassembly easier and more accurate.'
      },
      {
        question: 'What is the recommended humidity level for ESD-safe work environments?',
        options: [
          '20-30% relative humidity',
          '40-60% relative humidity',
          '70-80% relative humidity',
          '90-100% relative humidity'
        ],
        correct: 1,
        explanation: '40-60% relative humidity is ideal for preventing static electricity buildup while avoiding condensation that could damage components.'
      }
    ]
  }
};
