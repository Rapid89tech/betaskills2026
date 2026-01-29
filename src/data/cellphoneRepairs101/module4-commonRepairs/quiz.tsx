import type { Quiz } from '@/types/course';

export const module4Quiz: Quiz = {
  id: 4,
  title: 'Quiz: Module 4 – Common Repairs',
  duration: '15-20 minutes',
  type: 'quiz',
  content: {
    questions: [
      {
        id: 1,
        question: 'Which component is most commonly replaced when a smartphone screen is cracked but still partially functional?',
        type: 'multiple-choice',
        options: [
          'Battery',
          'LCD/Digitizer Assembly',
          'Motherboard',
          'Charging Port'
        ],
        correctAnswer: 1,
        explanation: 'LCD/Digitizer Assembly is most commonly replaced when a smartphone screen is cracked but still partially functional.'
      },
      {
        id: 2,
        question: 'What is the first step you should take before beginning any repair on a smartphone?',
        type: 'multiple-choice',
        options: [
          'Remove the screen',
          'Power off the device and disconnect the battery',
          'Heat the device to loosen adhesives',
          'Test the charging port'
        ],
        correctAnswer: 1,
        explanation: 'The first step before beginning any repair on a smartphone is to power off the device and disconnect the battery.'
      },
      {
        id: 3,
        question: 'If a phone does not turn on, which of the following is the most common hardware component to check first?',
        type: 'multiple-choice',
        options: [
          'Speaker',
          'Battery',
          'Camera Module',
          'Screen Digitizer'
        ],
        correctAnswer: 1,
        explanation: 'If a phone does not turn on, the battery is the most common hardware component to check first.'
      },
      {
        id: 4,
        question: 'What tool is best suited to remove small screws from a smartphone?',
        type: 'multiple-choice',
        options: [
          'Hammer',
          'Precision screwdriver',
          'Pliers',
          'Tweezers'
        ],
        correctAnswer: 1,
        explanation: 'Precision screwdriver is best suited to remove small screws from a smartphone.'
      },
      {
        id: 5,
        question: 'What is the likely cause of a smartphone battery swelling?',
        type: 'multiple-choice',
        options: [
          'Software update',
          'Overcharging or faulty battery',
          'Broken screen',
          'Dust in the charging port'
        ],
        correctAnswer: 1,
        explanation: 'Overcharging or faulty battery is the likely cause of a smartphone battery swelling.'
      },
      {
        id: 6,
        question: 'When replacing a charging port, what precaution is critical to avoid damage?',
        type: 'multiple-choice',
        options: [
          'Removing the battery connector first',
          'Using excessive heat',
          'Shaking the device vigorously',
          'Using metal pry tools on the motherboard'
        ],
        correctAnswer: 0,
        explanation: 'When replacing a charging port, removing the battery connector first is critical to avoid damage.'
      },
      {
        id: 7,
        question: 'Which common repair involves replacing a part that is glued or adhered to the phone\'s frame?',
        type: 'multiple-choice',
        options: [
          'Battery replacement',
          'Screen replacement',
          'SIM card tray replacement',
          'Speaker replacement'
        ],
        correctAnswer: 1,
        explanation: 'Screen replacement involves replacing a part that is glued or adhered to the phone\'s frame.'
      },
      {
        id: 8,
        question: 'If a touchscreen has dead zones (areas that don\'t respond), what is the best initial diagnostic step?',
        type: 'multiple-choice',
        options: [
          'Replace the battery',
          'Clean the screen with alcohol',
          'Test the digitizer connection and try a screen replacement',
          'Reset the phone to factory settings'
        ],
        correctAnswer: 2,
        explanation: 'If a touchscreen has dead zones, the best initial diagnostic step is to test the digitizer connection and try a screen replacement.'
      },
      {
        id: 9,
        question: 'What is the safest way to open a smartphone without damaging the screen?',
        type: 'multiple-choice',
        options: [
          'Use a heat gun to soften adhesive, then pry gently with plastic tools',
          'Use a hammer to break the screen and open it quickly',
          'Use metal screwdrivers to force the screen off',
          'Apply water around the edges to loosen glue'
        ],
        correctAnswer: 0,
        explanation: 'The safest way to open a smartphone without damaging the screen is to use a heat gun to soften adhesive, then pry gently with plastic tools.'
      },
      {
        id: 10,
        question: 'Why is it important to test all device functions before final reassembly?',
        type: 'multiple-choice',
        options: [
          'To ensure all repairs were successful and avoid reopening the device',
          'To save battery power',
          'To check the color of the screen',
          'It is not necessary to test before reassembly'
        ],
        correctAnswer: 0,
        explanation: 'It is important to test all device functions before final reassembly to ensure all repairs were successful and avoid reopening the device.'
      },
      {
        id: 11,
        question: 'The battery should always be disconnected before starting any internal repair.',
        type: 'true-false',
        correctAnswer: true,
        explanation: 'True. The battery should always be disconnected before starting any internal repair for safety.'
      },
      {
        id: 12,
        question: 'You should never use plastic tools when opening a phone as they can break easily.',
        type: 'true-false',
        correctAnswer: false,
        explanation: 'False. Plastic tools are actually preferred when opening a phone as they prevent damage to internal components.'
      },
      {
        id: 13,
        question: 'Swollen batteries can be safely punctured to release pressure.',
        type: 'true-false',
        correctAnswer: false,
        explanation: 'False. Swollen batteries should never be punctured as this can cause fires or explosions.'
      },
      {
        id: 14,
        question: 'Cleaning connectors before reassembly can improve device performance.',
        type: 'true-false',
        correctAnswer: true,
        explanation: 'True. Cleaning connectors before reassembly can improve device performance and prevent connection issues.'
      },
      {
        id: 15,
        question: 'A cracked screen always means the LCD underneath is also damaged.',
        type: 'true-false',
        correctAnswer: false,
        explanation: 'False. A cracked screen does not always mean the LCD underneath is damaged; sometimes only the glass is affected.'
      },
      {
        id: 16,
        question: 'It\'s acceptable to use excessive heat when removing screens to speed up the process.',
        type: 'true-false',
        correctAnswer: false,
        explanation: 'False. Excessive heat can damage internal components and should be avoided when removing screens.'
      },
      {
        id: 17,
        question: 'Repairing a charging port requires careful handling of delicate motherboard components.',
        type: 'true-false',
        correctAnswer: true,
        explanation: 'True. Repairing a charging port requires careful handling of delicate motherboard components.'
      },
      {
        id: 18,
        question: 'Testing the touchscreen functionality should be done before gluing the replacement screen.',
        type: 'true-false',
        correctAnswer: true,
        explanation: 'True. Testing the touchscreen functionality should be done before gluing the replacement screen to ensure it works properly.'
      },
      {
        id: 19,
        question: 'Using OEM or high-quality replacement parts improves repair longevity.',
        type: 'true-false',
        correctAnswer: true,
        explanation: 'True. Using OEM or high-quality replacement parts improves repair longevity and reliability.'
      },
      {
        id: 20,
        question: 'Improper reassembly can cause new problems in the device.',
        type: 'true-false',
        correctAnswer: true,
        explanation: 'True. Improper reassembly can cause new problems in the device, such as loose connections or damaged components.'
      }
    ]
  }
};
