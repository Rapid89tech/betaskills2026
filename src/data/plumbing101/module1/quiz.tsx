import type { Quiz } from '@/types/course';

export const module1Quiz: Quiz = {
  id: 1,
  title: 'Module 1 Quiz: Introduction to Plumbing',
  duration: '30 min',
  type: 'quiz',
  content: {
    questions: [
      {
        question: 'What is the primary purpose of plumbing systems in buildings?',
        options: [
          'To control electrical wiring',
          'To provide clean water supply and efficient waste removal',
          'To prevent building leaks',
          'To support heating and cooling systems'
        ],
        correct: 1,
        explanation: 'Plumbing systems are designed to provide clean water supply and efficient waste removal, which is essential for public health and safety.'
      },
      {
        question: 'Which ancient civilization is known for developing advanced aqueduct systems that set the foundation for modern water distribution?',
        options: [
          'Ancient Egypt',
          'Roman Empire',
          'Indus Valley',
          'Ancient Greece'
        ],
        correct: 1,
        explanation: 'The Roman Empire developed sophisticated aqueduct systems and lead pipes that revolutionized water distribution and set the foundation for modern plumbing.'
      },
      {
        question: 'What is a key reason for maintaining proper plumbing in construction projects?',
        options: [
          'It helps with faster construction.',
          'It ensures public health by preventing waterborne diseases.',
          'It reduces the need for structural supports.',
          'It minimizes the use of insulation materials.'
        ],
        correct: 1,
        explanation: 'Proper plumbing is crucial for public health as it prevents waterborne diseases by ensuring clean water delivery and safe waste removal.'
      },
      {
        question: 'What drives water through plumbing systems?',
        options: [
          'Solar panels',
          'Electrical currents',
          'Water pressure',
          'Thermal energy'
        ],
        correct: 2,
        explanation: 'Water pressure (measured in psi) is what drives water through pipes and fixtures in plumbing systems.'
      },
      {
        question: 'What type of piping material is known for being lightweight and affordable?',
        options: [
          'Copper',
          'PVC',
          'Stainless steel',
          'Cast iron'
        ],
        correct: 1,
        explanation: 'PVC (Polyvinyl Chloride) is known for being lightweight, affordable, and easy to install, making it popular for many plumbing applications.'
      },
      {
        question: 'Which of the following is considered a career opportunity in the plumbing industry?',
        options: [
          'Commercial plumber',
          'Structural engineer',
          'Construction supervisor',
          'Civil inspector'
        ],
        correct: 0,
        explanation: 'Commercial plumber is a recognized career path in the plumbing industry, specializing in plumbing systems for offices, schools, factories, and high-rise buildings.'
      },
      {
        question: 'What component is responsible for ensuring waste flows out of a building without blockage?',
        options: [
          'Water heater',
          'Venting system',
          'Backflow preventer',
          'Check valve'
        ],
        correct: 1,
        explanation: 'Venting systems are essential for ensuring waste flows out of buildings efficiently by preventing blockages and maintaining proper drainage.'
      },
      {
        question: 'Why is it important to have proper pipe sizing in plumbing systems?',
        options: [
          'To avoid excessive water pressure and maintain consistent flow.',
          'To increase the velocity of water flow.',
          'To ensure the pipes can be easily painted.',
          'To reduce the need for insulation.'
        ],
        correct: 0,
        explanation: 'Proper pipe sizing is crucial to avoid excessive water pressure and maintain consistent flow throughout the plumbing system.'
      },
      {
        question: 'What does the term "cross-connection control" refer to in plumbing?',
        options: [
          'Using multiple water heaters in one system',
          'Separating supply lines from wastewater sources to prevent contamination',
          'Installing pipes in parallel instead of in series',
          'Adjusting pipe angles to reduce water velocity'
        ],
        correct: 1,
        explanation: 'Cross-connection control refers to preventing contamination of potable water by separating supply lines from wastewater or non-potable sources.'
      },
      {
        question: 'Which material is commonly used in residential plumbing due to its flexibility and freeze resistance?',
        options: [
          'Copper',
          'PVC',
          'PEX',
          'Stainless steel'
        ],
        correct: 2,
        explanation: 'PEX (Cross-linked Polyethylene) is commonly used in residential plumbing due to its flexibility, freeze resistance, and ease of installation.'
      }
    ]
  }
}; 
