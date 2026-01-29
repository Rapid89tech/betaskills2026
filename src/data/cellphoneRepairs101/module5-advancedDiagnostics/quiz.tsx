import type { Quiz } from '@/types/course';

export const module5Quiz: Quiz = {
  id: 5,
  title: 'Quiz: Module 5 – Advanced Diagnostics and Repairs',
  duration: '20-25 minutes',
  type: 'quiz',
  content: {
    questions: [
      {
        id: 1,
        question: 'What is the primary purpose of diagnostic software in cell phone repair?',
        type: 'multiple-choice',
        options: [
          'To reprogram the operating system',
          'To test internal hardware and identify faults',
          'To download third-party apps',
          'To replace damaged components'
        ],
        correctAnswer: 1,
        explanation: 'The primary purpose of diagnostic software in cell phone repair is to test internal hardware and identify faults.'
      },
      {
        id: 2,
        question: 'Which of the following tools is most effective for checking a short circuit on a logic board?',
        type: 'multiple-choice',
        options: [
          'Screwdriver',
          'Multimeter',
          'Heat gun',
          'Soldering iron'
        ],
        correctAnswer: 1,
        explanation: 'A multimeter is most effective for checking a short circuit on a logic board.'
      },
      {
        id: 3,
        question: 'When cleaning corrosion from a water-damaged phone, which solution is recommended?',
        type: 'multiple-choice',
        options: [
          'Distilled water',
          'Vinegar',
          'Isopropyl alcohol (90% or higher)',
          'WD-40'
        ],
        correctAnswer: 2,
        explanation: 'Isopropyl alcohol (90% or higher) is recommended when cleaning corrosion from a water-damaged phone.'
      },
      {
        id: 4,
        question: 'Which technique is most appropriate for removing a damaged micro-component from a logic board?',
        type: 'multiple-choice',
        options: [
          'Using a regular soldering iron only',
          'Applying cold air and forcefully lifting the component',
          'Using a hot air rework station with tweezers',
          'Scraping it off with a screwdriver'
        ],
        correctAnswer: 2,
        explanation: 'Using a hot air rework station with tweezers is most appropriate for removing a damaged micro-component from a logic board.'
      },
      {
        id: 5,
        question: 'What is the function of flux during soldering?',
        type: 'multiple-choice',
        options: [
          'It cools the solder quickly',
          'It removes solder bridges',
          'It prevents oxidation and improves solder flow',
          'It reduces component temperature'
        ],
        correctAnswer: 2,
        explanation: 'Flux prevents oxidation and improves solder flow during soldering.'
      },
      {
        id: 6,
        question: 'What happens if you replace a Touch ID sensor with a non-original part?',
        type: 'multiple-choice',
        options: [
          'The phone operates normally',
          'The fingerprint feature may be disabled permanently',
          'The phone reboots continuously',
          'The screen turns off'
        ],
        correctAnswer: 1,
        explanation: 'If you replace a Touch ID sensor with a non-original part, the fingerprint feature may be disabled permanently.'
      },
      {
        id: 7,
        question: 'Why is ESD protection critical when working on logic boards?',
        type: 'multiple-choice',
        options: [
          'It keeps the board warm',
          'It protects against accidental drops',
          'It prevents static discharge that can damage components',
          'It holds the board in place'
        ],
        correctAnswer: 2,
        explanation: 'ESD protection is critical because it prevents static discharge that can damage components when working on logic boards.'
      },
      {
        id: 8,
        question: 'Which diagnostic test would you use to identify issues with a phone\'s proximity sensor?',
        type: 'multiple-choice',
        options: [
          'Battery Health Test',
          'Sensor Test',
          'Display Test',
          'Connectivity Test'
        ],
        correctAnswer: 1,
        explanation: 'A Sensor Test would be used to identify issues with a phone\'s proximity sensor.'
      },
      {
        id: 9,
        question: 'What is a common cause of a short circuit in a water-damaged phone?',
        type: 'multiple-choice',
        options: [
          'Overheating battery',
          'Unintended electrical paths caused by moisture',
          'Faulty touchscreen digitizer',
          'Software update failure'
        ],
        correctAnswer: 1,
        explanation: 'Unintended electrical paths caused by moisture is a common cause of a short circuit in a water-damaged phone.'
      },
      {
        id: 10,
        question: 'Which tool is optional but highly effective for deep cleaning corrosion on a water-damaged motherboard?',
        type: 'multiple-choice',
        options: [
          'Soft-bristle brush',
          'Ultrasonic cleaner',
          'Plastic pry tool',
          'Precision screwdriver'
        ],
        correctAnswer: 1,
        explanation: 'An ultrasonic cleaner is optional but highly effective for deep cleaning corrosion on a water-damaged motherboard.'
      },
      {
        id: 11,
        question: 'What should you do before running invasive diagnostic tests on a smartphone?',
        type: 'multiple-choice',
        options: [
          'Update the operating system',
          'Back up user data',
          'Replace the battery',
          'Clean the screen'
        ],
        correctAnswer: 1,
        explanation: 'You should back up user data before running invasive diagnostic tests on a smartphone.'
      },
      {
        id: 12,
        question: 'What is the purpose of a desoldering braid (wick) in logic board repairs?',
        type: 'multiple-choice',
        options: [
          'To apply solder to new components',
          'To remove excess solder from joints',
          'To hold the PCB in place',
          'To clean corrosion from connectors'
        ],
        correctAnswer: 1,
        explanation: 'A desoldering braid (wick) is used to remove excess solder from joints in logic board repairs.'
      },
      {
        id: 13,
        question: 'What is a key challenge when replacing Face ID components on an iPhone?',
        type: 'multiple-choice',
        options: [
          'Lack of replacement parts',
          'Requirement for proprietary pairing tools',
          'Inability to access the battery',
          'Excessive adhesive on the screen'
        ],
        correctAnswer: 1,
        explanation: 'A key challenge when replacing Face ID components on an iPhone is the requirement for proprietary pairing tools.'
      },
      {
        id: 14,
        question: 'What should be done immediately after a phone is exposed to water to improve repair success?',
        type: 'multiple-choice',
        options: [
          'Power on the device to check functionality',
          'Place the phone in rice',
          'Power off and disconnect the battery',
          'Apply heat to dry the device'
        ],
        correctAnswer: 2,
        explanation: 'Immediately after a phone is exposed to water, you should power off and disconnect the battery to improve repair success.'
      },
      {
        id: 15,
        question: 'Why is it important to inspect solder joints under magnification after soldering micro components?',
        type: 'multiple-choice',
        options: [
          'To check for aesthetic appearance',
          'To ensure shiny, smooth joints without bridges or cold joints',
          'To verify component size',
          'To clean residual flux'
        ],
        correctAnswer: 1,
        explanation: 'It is important to inspect solder joints under magnification after soldering micro components to ensure shiny, smooth joints without bridges or cold joints.'
      }
    ]
  }
};
