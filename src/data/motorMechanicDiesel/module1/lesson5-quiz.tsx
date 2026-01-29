import type { Lesson } from '../../../types/course';

const lesson5Quiz: Lesson = {
  id: 5,
  title: 'Module 1 Quiz: Diesel Engine Fundamentals',
  duration: '20 minutes',
  type: 'quiz',
  content: {
    questions: [
      {
        question: 'Which of the following correctly lists the four strokes of a 4-stroke diesel engine in order?',
        options: [
          'Power, Exhaust, Intake, Compression',
          'Intake, Compression, Power, Exhaust',
          'Compression, Intake, Power, Exhaust',
          'Intake, Power, Compression, Exhaust'
        ],
        correct: 1,
        explanation: 'The correct order is Intake, Compression, Power, Exhaust. This is the standard four-stroke cycle for diesel engines.'
      },
      {
        question: 'What happens during the compression stroke in a 4-stroke diesel engine?',
        options: [
          'Fuel is injected',
          'The exhaust valve opens',
          'Air is drawn into the cylinder',
          'Air is compressed, raising its temperature'
        ],
        correct: 3,
        explanation: 'During the compression stroke, air is compressed to high pressure and temperature, which is necessary for diesel combustion.'
      },
      {
        question: 'What is a key characteristic of the power stroke in both 2-stroke and 4-stroke diesel engines?',
        options: [
          'It compresses the air-fuel mixture',
          'It expels exhaust gases',
          'It drives the piston downward',
          'It opens the intake valve'
        ],
        correct: 2,
        explanation: 'The power stroke drives the piston downward, converting combustion energy into mechanical work.'
      },
      {
        question: 'Which of the following is a unique feature of 2-stroke diesel engines?',
        options: [
          'They use spark plugs for ignition',
          'They complete a cycle in two piston movements',
          'They have four valves per cylinder',
          'They operate at lower compression ratios'
        ],
        correct: 1,
        explanation: '2-stroke engines complete a full combustion cycle in just two piston movements (one up, one down).'
      },
      {
        question: 'What is the primary difference in combustion between diesel and gasoline engines?',
        options: [
          'Diesel engines use spark plugs',
          'Gasoline engines use compression ignition',
          'Diesel engines use compression ignition',
          'Both use the same ignition method'
        ],
        correct: 2,
        explanation: 'Diesel engines use compression ignition where fuel auto-ignites from heat created by compression, while gasoline engines use spark ignition.'
      },
      {
        question: 'What component houses the cylinders in a diesel engine?',
        options: [
          'Cylinder head',
          'Cylinder block',
          'Crankshaft',
          'Camshaft'
        ],
        correct: 1,
        explanation: 'The cylinder block is the main structural component that houses the cylinders where combustion occurs.'
      },
      {
        question: 'What is the function of the cylinder head in a diesel engine?',
        options: [
          'Houses the crankshaft',
          'Contains intake and exhaust ports and valves',
          'Stores engine oil',
          'Connects to the transmission'
        ],
        correct: 1,
        explanation: 'The cylinder head covers the cylinders and contains the intake and exhaust ports, valves, and often the fuel injectors.'
      },
      {
        question: 'What does TDC stand for in diesel engine terminology?',
        options: [
          'Total Diesel Capacity',
          'Top Dead Center',
          'Turbo Diesel Compression',
          'Timing Drive Control'
        ],
        correct: 1,
        explanation: 'TDC stands for Top Dead Center, which is the highest point the piston reaches in the cylinder.'
      },
      {
        question: 'What is the typical compression ratio range for diesel engines?',
        options: [
          '8:1 to 12:1',
          '15:1 to 20:1',
          '6:1 to 8:1',
          '25:1 to 30:1'
        ],
        correct: 1,
        explanation: 'Diesel engines typically operate with compression ratios between 15:1 to 20:1, much higher than gasoline engines.'
      },
      {
        question: 'What is the primary advantage of diesel engines over gasoline engines?',
        options: [
          'Lower initial cost',
          'Higher fuel efficiency and torque',
          'Quieter operation',
          'Faster acceleration'
        ],
        correct: 1,
        explanation: 'Diesel engines are known for higher fuel efficiency and greater torque output, making them ideal for heavy-duty applications.'
      }
    ]
  }
};

export default lesson5Quiz;
