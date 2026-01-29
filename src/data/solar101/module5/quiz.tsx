import type { Quiz } from '@/types/course';

const quiz: Quiz = {
  id: 5,
  title: 'Module 5 Quiz: Electrical Concepts and Wiring',
  questions: [
    {
      id: 1,
      question: 'What does Ohm\'s Law state?',
      options: [
        'V = I × R',
        'P = V × I',
        'R = V × I',
        'I = V + R'
      ],
      correctAnswer: 0
    },
    {
      id: 2,
      question: 'In a solar PV system, what typical voltage range does a single panel\'s open-circuit voltage (Voc) fall into?',
      options: [
        '5-10V',
        '30-50V',
        '100-150V',
        '200-300V'
      ],
      correctAnswer: 1
    },
    {
      id: 3,
      question: 'What is the primary reason for sizing cables with a thicker gauge in solar PV systems?',
      options: [
        'To reduce voltage drop below 3%',
        'To increase voltage output',
        'To reduce open-circuit voltage',
        'To increase power output'
      ],
      correctAnswer: 0
    },
    {
      id: 4,
      question: 'Which device provides one-time overcurrent protection by melting a link?',
      options: [
        'Circuit Breaker',
        'Fuse',
        'Disconnect Switch',
        'Inverter'
      ],
      correctAnswer: 1
    },
    {
      id: 5,
      question: 'What type of current do solar panels generate?',
      options: [
        'Alternating Current (AC)',
        'Direct Current (DC)',
        'Both AC and DC simultaneously',
        'Pulsed Current'
      ],
      correctAnswer: 1
    },
    {
      id: 6,
      question: 'Which tool is recommended for quick voltage drop and ampacity calculations in the field?',
      options: [
        'ETAP eMT',
        'Southwire SIMpull Calculator',
        'Keysight N6705C Analyzer',
        'AutoCAD Electrical'
      ],
      correctAnswer: 1
    },
    {
      id: 7,
      question: 'What is the recommended safety factor applied to continuous load current when sizing cables?',
      options: [
        '1.0x',
        '1.25x',
        '1.5x',
        '2.0x'
      ],
      correctAnswer: 1
    },
    {
      id: 8,
      question: 'What is the typical AC voltage output from an inverter in the U.S. grid standard?',
      options: [
        '12V DC',
        '24V DC',
        '120/240V AC at 60Hz',
        '400V AC at 50Hz'
      ],
      correctAnswer: 2
    },
    {
      id: 9,
      question: 'In electrical diagrams, which symbol usually represents a fuse?',
      options: [
        'Circle with cross inside',
        'Wavy line',
        'Rectangle',
        'Triangle'
      ],
      correctAnswer: 0
    },
    {
      id: 10,
      question: 'Why is it important to derate Voc in cold temperatures for solar panels?',
      options: [
        'Cold temps decrease voltage output',
        'Cold temps increase Voc by up to 20%, risking inverter damage',
        'Cold temps reduce current flow',
        'Cold temps have no effect on Voc'
      ],
      correctAnswer: 1
    }
  ]
};

export default quiz;

