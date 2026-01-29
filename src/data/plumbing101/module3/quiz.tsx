import type { Quiz } from '@/types/course';

export const module3Quiz: Quiz = {
  id: 3,
  title: 'Module 3 Quiz: Health and Safety in Plumbing Work',
  duration: '30 min',
  type: 'quiz',
  content: {
    questions: [
      {
        question: 'What is the primary purpose of wearing PPE in plumbing?',
        options: [
          'To reduce service time',
          'To enhance productivity',
          'To protect against injuries and exposure to hazardous substances',
          'To improve customer satisfaction'
        ],
        correct: 2,
        explanation: 'PPE is primarily worn to protect against injuries and exposure to hazardous substances, which is essential for plumber safety.'
      },
      {
        question: 'Which PPE item is essential for protecting eyes from flying debris and chemical splashes?',
        options: [
          'Gloves',
          'Safety goggles',
          'Ear plugs',
          'Steel-toe boots'
        ],
        correct: 1,
        explanation: 'Safety goggles are specifically designed to protect eyes from flying debris, sparks, and chemical splashes during plumbing work.'
      },
      {
        question: 'What is the recommended way to lift heavy pipes and materials?',
        options: [
          'Use your back muscles to pull the load upward.',
          'Get a good grip and pull quickly.',
          'Bend your knees, keep your back straight, and lift with your legs.',
          'Hold the load away from your body for better balance.'
        ],
        correct: 2,
        explanation: 'The proper lifting technique is to bend your knees, keep your back straight, and lift with your legs to prevent back injuries.'
      },
      {
        question: 'What is a common hazard associated with working in confined spaces?',
        options: [
          'Poor lighting',
          'Lack of proper tools',
          'Oxygen deficiency and toxic gas buildup',
          'Uncomfortable temperatures'
        ],
        correct: 2,
        explanation: 'Oxygen deficiency and toxic gas buildup are major hazards in confined spaces, making proper ventilation and air quality testing essential.'
      },
      {
        question: 'How can you prevent trench cave-ins when working in deeper trenches?',
        options: [
          'Work quickly to reduce time in the trench.',
          'Use shoring, trench boxes, or other protective systems.',
          'Avoid using heavy machinery near the trench edges.',
          'Only enter trenches during dry weather conditions.'
        ],
        correct: 1,
        explanation: 'Using shoring, trench boxes, or other protective systems is the proper way to prevent trench cave-ins in deeper excavations.'
      },
      {
        question: 'Why is it important to check tools and equipment before use?',
        options: [
          'To reduce the need for PPE.',
          'To ensure they are clean and look professional.',
          'To confirm they are in safe working condition and won\'t cause accidents.',
          'To guarantee faster completion of tasks.'
        ],
        correct: 2,
        explanation: 'Checking tools and equipment before use ensures they are in safe working condition and won\'t cause accidents or injuries.'
      },
      {
        question: 'Which of the following is considered a best practice when handling chemicals in plumbing?',
        options: [
          'Use chemicals without reading their labels to save time.',
          'Store all chemicals in a single unmarked container.',
          'Follow the safety data sheets (SDS) and wear appropriate PPE.',
          'Mix chemicals to increase their effectiveness.'
        ],
        correct: 2,
        explanation: 'Following safety data sheets (SDS) and wearing appropriate PPE are essential best practices when handling chemicals in plumbing work.'
      },
      {
        question: 'When working near electrical components in plumbing tasks, what safety measure should be taken?',
        options: [
          'Always work without gloves to improve dexterity.',
          'Use non-conductive tools and ensure power is turned off.',
          'Keep water flowing to prevent overheating.',
          'Use heavy-duty metal tools to enhance strength.'
        ],
        correct: 1,
        explanation: 'Using non-conductive tools and ensuring power is turned off are critical safety measures when working near electrical components.'
      },
      {
        question: 'What should be done immediately after a chemical spill in a plumbing workspace?',
        options: [
          'Ignore the spill and continue working.',
          'Wipe it up with a cloth and dispose of it in a trash bin.',
          'Follow spill response protocols, including proper cleanup and disposal.',
          'Cover the spill with a tarp and address it at the end of the day.'
        ],
        correct: 2,
        explanation: 'Following spill response protocols, including proper cleanup and disposal, is the correct immediate action after a chemical spill.'
      },
      {
        question: 'Why is regular training on health and safety practices important for plumbers?',
        options: [
          'It reduces costs for the company.',
          'It ensures compliance with local and national regulations.',
          'It eliminates the need for PPE.',
          'It allows plumbers to skip inspections.'
        ],
        correct: 1,
        explanation: 'Regular training on health and safety practices ensures compliance with local and national regulations, which is crucial for legal and safety reasons.'
      }
    ]
  }
}; 
