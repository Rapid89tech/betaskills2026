import type { Quiz } from '@/types/course';

const quiz: Quiz = {
  id: 4,
  title: 'Module 4 Quiz: Installation Techniques',
  questions: [
    {
      id: 1,
      question: 'Which of the following is required for fall protection on rooftop solar installations?',
      options: [
        'Insulated gloves',
        'Hard hat',
        'Self-retracting lifeline (SRL)',
        'Thermal imaging drone'
      ],
      correctAnswer: 2
    },
    {
      id: 2,
      question: 'What is the minimum weight rating for roof anchors used in fall protection systems?',
      options: [
        '2,000 lbs',
        '3,500 lbs',
        '5,000 lbs',
        '10,000 lbs'
      ],
      correctAnswer: 2
    },
    {
      id: 3,
      question: 'Which class of insulated gloves is typically used for voltages up to 17kV in solar PV installations?',
      options: [
        'Class 00',
        'Class 0',
        'Class 2',
        'Class 4'
      ],
      correctAnswer: 2
    },
    {
      id: 4,
      question: 'What is the primary function of drone-assisted site preparation in 2025 solar projects?',
      options: [
        'Install racking systems',
        'Deliver PPE to workers',
        'Map utilities, terrain, and access routes',
        'Test solar panel voltage'
      ],
      correctAnswer: 2
    },
    {
      id: 5,
      question: 'What is a key reason emergency response kits must include AEDs and fire extinguishers in PV sites?',
      options: [
        'To clean panels',
        'To repel wildlife',
        'To respond to electrical and medical emergencies',
        'To cool overheated tools'
      ],
      correctAnswer: 2
    },
    {
      id: 6,
      question: 'Which of the following tools is best suited for vegetation removal during ground prep for a solar installation?',
      options: [
        'Multimeter',
        'Toro trimmer',
        'Arc flash suit',
        'MC4 connector'
      ],
      correctAnswer: 1
    },
    {
      id: 7,
      question: 'According to best practices, what should be done before any trenching begins on-site?',
      options: [
        'Start grounding rod installation',
        'Begin cable layout',
        'Call 811 to verify underground utilities',
        'Set up panel racking'
      ],
      correctAnswer: 2
    },
    {
      id: 8,
      question: 'What is the purpose of arc-rated clothing (ATPV 8-40 cal/cm²) in PV safety gear?',
      options: [
        'Protect against UV rays',
        'Reduce heat exposure',
        'Prevent arc flash injuries',
        'Reflect sunlight during install'
      ],
      correctAnswer: 2
    },
    {
      id: 9,
      question: 'Which app is recommended in 2025 for real-time voltage scanning and OSHA checklist integration?',
      options: [
        'HelioScope',
        'Fluke Connect',
        'PVsyst',
        'RatedPower'
      ],
      correctAnswer: 1
    },
    {
      id: 10,
      question: 'What common mistake can result in fines up to R750,000 during site preparation?',
      options: [
        'Using a drone without a license',
        'Skipping the utility locate step',
        'Wearing the wrong colored vest',
        'Starting the install in rainy weather'
      ],
      correctAnswer: 1
    }
  ]
};

export default quiz;

