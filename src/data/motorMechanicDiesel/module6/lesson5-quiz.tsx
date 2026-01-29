import type { Lesson } from '../../../types/course';

const lesson5Quiz: Lesson = {
  id: 5,
  title: 'Module 6 Quiz: Emissions Control & Environmental Considerations',
  duration: '25 minutes',
  type: 'quiz',
  content: {
    questions: [
      {
        question: 'What is the primary function of a Diesel Particulate Filter (DPF)?',
        options: [
          'To increase engine power',
          'To capture and burn off soot particles from exhaust gases',
          'To improve fuel efficiency only',
          'To reduce engine noise'
        ],
        correct: 1,
        explanation: 'A DPF captures soot particles from diesel exhaust and periodically burns them off through a regeneration process, significantly reducing particulate matter emissions.'
      },
      {
        question: 'What does SCR stand for in diesel emissions control?',
        options: [
          'Selective Catalytic Reduction',
          'Standard Compression Ratio',
          'Secondary Cooling Radiator',
          'Simple Control Relay'
        ],
        correct: 0,
        explanation: 'SCR stands for Selective Catalytic Reduction, a technology that uses Diesel Exhaust Fluid (DEF/AdBlue) to convert harmful nitrogen oxides (NOx) into harmless nitrogen and water.'
      },
      {
        question: 'What is Diesel Exhaust Fluid (DEF) and how does it work?',
        options: [
          'A fuel additive that increases power',
          'A urea-based solution that reduces NOx emissions in SCR systems',
          'A type of engine oil',
          'A coolant additive'
        ],
        correct: 1,
        explanation: 'DEF is a urea-based solution that, when injected into the exhaust stream in SCR systems, chemically converts harmful nitrogen oxides into harmless nitrogen gas and water vapor.'
      },
      {
        question: 'What is the purpose of an EGR (Exhaust Gas Recirculation) system?',
        options: [
          'To increase exhaust gas temperature',
          'To recirculate exhaust gases back into the intake to reduce NOx formation',
          'To improve fuel economy only',
          'To increase engine power output'
        ],
        correct: 1,
        explanation: 'EGR systems recirculate a portion of exhaust gases back into the intake, reducing combustion temperatures and thereby reducing the formation of nitrogen oxides (NOx).'
      },
      {
        question: 'What happens during a DPF regeneration cycle?',
        options: [
          'The engine shuts down automatically',
          'High exhaust temperatures burn off accumulated soot in the filter',
          'The fuel tank is automatically refilled',
          'The engine oil is changed'
        ],
        correct: 1,
        explanation: 'During DPF regeneration, the exhaust system raises temperatures to approximately 600°C (1100°F) to burn off accumulated soot particles, converting them to ash.'
      },
      {
        question: 'What are the main pollutants that modern diesel emissions systems target?',
        options: [
          'Only carbon monoxide',
          'Nitrogen oxides (NOx) and particulate matter (PM)',
          'Only water vapor',
          'Only carbon dioxide'
        ],
        correct: 1,
        explanation: 'Modern diesel emissions systems primarily target nitrogen oxides (NOx) and particulate matter (PM), which are the most harmful pollutants produced by diesel engines.'
      },
      {
        question: 'What can cause premature DPF clogging?',
        options: [
          'Regular highway driving',
          'Frequent short trips and city driving that prevent proper regeneration',
          'Using high-quality diesel fuel',
          'Proper maintenance schedules'
        ],
        correct: 1,
        explanation: 'Frequent short trips and city driving prevent the DPF from reaching the high temperatures needed for regeneration, causing premature clogging with soot particles.'
      },
      {
        question: 'Why is proper DEF quality important for SCR systems?',
        options: [
          'DEF quality doesn\'t matter',
          'Poor quality DEF can damage SCR components and reduce NOx reduction efficiency',
          'It only affects fuel economy',
          'It changes engine oil viscosity'
        ],
        correct: 1,
        explanation: 'Poor quality DEF can crystallize, clog injectors, damage SCR catalysts, and significantly reduce NOx reduction efficiency, potentially causing system failures and emissions violations.'
      },
      {
        question: 'What maintenance is typically required for emissions control systems?',
        options: [
          'No maintenance is ever required',
          'Regular DEF refills, filter replacements, and system cleaning',
          'Only annual inspections',
          'Just checking tire pressure'
        ],
        correct: 1,
        explanation: 'Emissions systems require regular DEF refills, periodic filter replacements, system cleaning, software updates, and adherence to forced regeneration procedures when necessary.'
      },
      {
        question: 'How do modern diesel emissions standards benefit the environment?',
        options: [
          'They have no environmental impact',
          'They significantly reduce air pollution and improve public health',
          'They only reduce fuel costs',
          'They make engines louder'
        ],
        correct: 1,
        explanation: 'Modern diesel emissions standards drastically reduce harmful pollutants like NOx and particulate matter, leading to cleaner air, reduced smog formation, and improved public health outcomes.'
      }
    ]
  }
};

export default lesson5Quiz;
