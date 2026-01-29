import type { Quiz } from '@/types/course';

export const module7Quiz: Quiz = {
  id: 7,
  title: 'Module 7 Quiz: Health, Safety, and Environmental Regulations',
  duration: '30 min',
  type: 'quiz',
  content: {
    questions: [
      {
        question: 'Why is safe handling of tools and machinery important?',
        options: [
          'To reduce work hours',
          'To prevent injuries and equipment damage',
          'To make tools last shorter',
          'To avoid using PPE'
        ],
        correct: 1,
        explanation: 'Safe handling prevents injuries and equipment damage, ensuring worker safety, productivity, and compliance with regulations.'
      },
      {
        question: 'What is the FIRST thing you should do before using any tool or machine?',
        options: [
          'Test it on scrap material',
          'Check for damage or loose parts',
          'Turn it on to warm up',
          'Ask someone else to use it first'
        ],
        correct: 1,
        explanation: 'Before using any tool or machine, conduct a pre-use inspection to check for damage, wear, or loose parts to ensure safe operation.'
      },
      {
        question: 'Which of the following is NOT considered proper PPE for tool and machinery operation?',
        options: [
          'Safety glasses',
          'Steel-toed boots',
          'Ear protection',
          'Sandals'
        ],
        correct: 3,
        explanation: 'Sandals do not provide adequate foot protection. Proper PPE for tool and machinery operation includes safety glasses, steel-toed boots, and ear protection.'
      },
      {
        question: 'What should you do with power tools when not in use or during maintenance?',
        options: [
          'Leave them plugged in for convenience',
          'Unplug or power them down',
          'Store them on the floor',
          'Cover them with a cloth'
        ],
        correct: 1,
        explanation: 'Power tools should be unplugged or powered down when not in use or during maintenance to prevent accidental startup and electrical hazards.'
      },
      {
        question: 'What is the correct safety practice when using a saw?',
        options: [
          'Keep hands close to the blade for control',
          'Remove guards for better visibility',
          'Use push sticks to guide material',
          'Cut as fast as possible'
        ],
        correct: 2,
        explanation: 'Using push sticks to guide material keeps hands away from the blade, reducing the risk of cuts and ensuring safe operation.'
      },
      {
        question: 'What should only certified operators be allowed to handle?',
        options: [
          'Hand tools',
          'Power tools',
          'Heavy machinery',
          'Gardening equipment'
        ],
        correct: 2,
        explanation: 'Heavy machinery like forklifts, excavators, and skid-steers should only be operated by certified operators due to complexity and safety risks.'
      },
      {
        question: 'What is the main purpose of lockout/tagout procedures?',
        options: [
          'To keep machines running smoothly',
          'To prevent accidental startup during maintenance',
          'To identify ownership of tools',
          'To speed up work'
        ],
        correct: 1,
        explanation: 'Lockout/tagout procedures prevent accidental startup of machinery during maintenance or repair, protecting workers from injury.'
      },
      {
        question: 'How should sharp tools be stored?',
        options: [
          'Uncovered in a shared drawer',
          'In a sheathed or covered position',
          'On the edge of a table',
          'With their blades facing outward'
        ],
        correct: 1,
        explanation: 'Sharp tools should be stored in a sheathed or covered position to prevent accidental cuts and maintain blade sharpness.'
      },
      {
        question: 'What is a common hazard when using damaged cords or tools in wet areas?',
        options: [
          'Overheating',
          'Electrical shock',
          'Rust',
          'Dust accumulation'
        ],
        correct: 1,
        explanation: 'Using damaged cords or tools in wet areas creates a serious risk of electrical shock, which can be fatal.'
      },
      {
        question: 'According to OSHA, what should employers ensure before allowing workers to use tools or machinery?',
        options: [
          'They know how to clean them',
          'They have completed proper training',
          'They have their own PPE',
          'They sign a waiver'
        ],
        correct: 1,
        explanation: 'OSHA requires employers to ensure workers have completed proper training before using tools or machinery to prevent accidents and ensure safe operation.'
      }
    ]
  }
};

