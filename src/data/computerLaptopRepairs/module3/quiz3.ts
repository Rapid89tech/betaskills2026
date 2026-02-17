import { Lesson } from '@/types/course';

export const quiz3: Lesson = {
  id: 2,
  title: 'Module 3 Quiz: Troubleshooting & Diagnostics',
  duration: '15 min',
  type: 'quiz',
  content: {
    questions: [
      {
        id: 1,
        question: 'What does the POST process do during computer startup?',
        options: [
          'Installs drivers',
          'Loads the operating system',
          'Diagnoses essential hardware components',
          'Updates BIOS firmware'
        ],
        correct: 2
      },
      {
        id: 2,
        question: 'Which of the following beep codes typically indicates a RAM failure?',
        options: [
          '1 short beep',
          'Continuous beeps',
          '3 short beeps',
          '5 short beeps'
        ],
        correct: 2
      },
      {
        id: 3,
        question: 'What might a "No boot device found" error message indicate?',
        options: [
          'Faulty RAM',
          'Disconnected or failed storage drive',
          'GPU failure',
          'Corrupted BIOS'
        ],
        correct: 1
      },
      {
        id: 4,
        question: 'What should be your first step if a system has no power and no display?',
        options: [
          'Replace the hard drive',
          'Check speaker cables',
          'Test with minimum components',
          'Install new drivers'
        ],
        correct: 2
      },
      {
        id: 5,
        question: 'Which tool helps you diagnose motherboard boot problems using numeric codes?',
        options: [
          'CrystalDiskInfo',
          'Multimeter',
          'POST diagnostic card',
          'HWMonitor'
        ],
        correct: 2
      },
      {
        id: 6,
        question: 'If a laptop shuts down due to overheating, which of the following is the most appropriate fix?',
        options: [
          'Format the hard drive',
          'Clean fans and vents',
          'Reinstall the OS',
          'Reset the BIOS'
        ],
        correct: 1
      },
      {
        id: 7,
        question: 'What is the purpose of MemTest86?',
        options: [
          'Monitor fan speed',
          'Diagnose power supply voltage',
          'Test RAM for errors',
          'Detect GPU driver problems'
        ],
        correct: 2
      },
      {
        id: 8,
        question: 'What reading should a healthy CMOS battery (CR2032) show on a multimeter?',
        options: [
          '1.5V',
          '5V',
          '3V',
          '12V'
        ],
        correct: 2
      },
      {
        id: 9,
        question: 'If you hear 1 long and 2 short beeps during POST, what is the likely issue?',
        options: [
          'RAM failure',
          'CPU overheating',
          'Graphics card error',
          'No keyboard detected'
        ],
        correct: 2
      },
      {
        id: 10,
        question: 'Which of the following best describes the purpose of CrystalDiskInfo?',
        options: [
          'Monitor CPU temperature',
          'View BIOS version',
          'Check HDD/SSD health and S.M.A.R.T. data',
          'Benchmark gaming performance'
        ],
        correct: 2
      }
    ]
  }
};
