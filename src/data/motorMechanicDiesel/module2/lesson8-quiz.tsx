import type { Lesson } from '../../../types/course';

const lesson8Quiz: Lesson = {
  id: 8,
  title: 'Module 2 Quiz: Diesel Fuel Systems',
  duration: '25 minutes',
  type: 'quiz',
  content: {
    questions: [
      {
        question: 'What is the primary function of the diesel fuel injection system?',
        options: [
          'To cool the engine\'s exhaust system',
          'To deliver the correct amount of fuel at high pressure and precise timing',
          'To mix fuel and air outside the cylinder for better combustion',
          'To decrease engine temperature during operation'
        ],
        correct: 1,
        explanation: 'The diesel fuel injection system\'s primary function is to deliver the correct amount of fuel at high pressure and precise timing for optimal combustion efficiency.'
      },
      {
        question: 'How do mechanical injectors differ from common rail injectors?',
        options: [
          'Mechanical injectors rely solely on fuel pressure to open, while common rail injectors use electronic control for precise timing',
          'Mechanical injectors are used only in gasoline engines',
          'Common rail injectors are simpler and less precise than mechanical injectors',
          'Common rail injectors only operate at low pressures'
        ],
        correct: 0,
        explanation: 'Mechanical injectors rely solely on fuel pressure to operate, while common rail injectors use electronic control for precise timing and multiple injection events per cycle.'
      },
      {
        question: 'What is the purpose of a water separator in a diesel fuel system?',
        options: [
          'To improve the atomization of diesel fuel',
          'To remove water from the fuel, preventing corrosion and injector damage',
          'To increase the power output of the fuel system',
          'To decrease fuel pressure in the fuel rails'
        ],
        correct: 1,
        explanation: 'Water separators remove water from diesel fuel to prevent corrosion, reduce lubrication problems, and prevent damage to high-pressure injectors and pumps.'
      },
      {
        question: 'Which of the following could cause low fuel pressure in a diesel fuel system?',
        options: [
          'A faulty turbocharger',
          'A clogged fuel filter',
          'Excessive valve clearance',
          'A malfunctioning coolant thermostat'
        ],
        correct: 1,
        explanation: 'A clogged fuel filter restricts fuel flow, causing low fuel pressure and reduced engine performance.'
      },
      {
        question: 'What is injection timing and why is it critical for diesel engines?',
        options: [
          'The speed at which fuel is injected; it affects only fuel efficiency',
          'The precise moment fuel is injected into the combustion chamber; it affects power, efficiency, and emissions',
          'The duration of the injection process; it only impacts engine noise',
          'The pressure at which fuel is delivered; it affects only durability'
        ],
        correct: 1,
        explanation: 'Injection timing is the precise moment fuel is injected into the combustion chamber. Proper timing is critical for optimal power output, fuel efficiency, and emission control.'
      },
      {
        question: 'What are the typical fuel pressure ranges in modern common rail diesel systems?',
        options: [
          '500-1000 psi',
          '5000-10000 psi',
          '15000-30000 psi',
          '35000-50000 psi'
        ],
        correct: 2,
        explanation: 'Modern common rail diesel systems operate at very high pressures, typically between 15,000-30,000 psi, to achieve optimal fuel atomization and combustion efficiency.'
      },
      {
        question: 'Which maintenance practice is most important for diesel fuel injectors?',
        options: [
          'Regular cleaning with compressed air only',
          'Using only the cheapest diesel fuel available',
          'Regular replacement of fuel filters and using quality diesel fuel',
          'Never removing injectors for inspection'
        ],
        correct: 2,
        explanation: 'Regular replacement of fuel filters and using quality diesel fuel are crucial for preventing contamination and extending injector life.'
      },
      {
        question: 'What diagnostic symptom typically indicates fuel delivery issues in a diesel engine?',
        options: [
          'Engine runs too cool',
          'Excessive white smoke and power loss',
          'Engine oil level increases',
          'Coolant temperature drops rapidly'
        ],
        correct: 1,
        explanation: 'Excessive white smoke (unburned fuel) and power loss are typical symptoms of fuel delivery issues, indicating insufficient fuel reaching the combustion chambers.'
      },
      {
        question: 'What is the role of the fuel rail in a common rail injection system?',
        options: [
          'To filter fuel before injection',
          'To store high-pressure fuel and distribute it to all injectors',
          'To cool the fuel before combustion',
          'To mix fuel with air for better combustion'
        ],
        correct: 1,
        explanation: 'The fuel rail stores high-pressure fuel and distributes it evenly to all injectors, ensuring consistent fuel delivery across all cylinders.'
      },
      {
        question: 'Why is fuel filtration particularly important in diesel systems compared to gasoline systems?',
        options: [
          'Diesel fuel contains more contaminants and operates at higher pressures',
          'Diesel engines run at lower temperatures',
          'Gasoline systems are more robust than diesel systems',
          'Diesel fuel is more expensive than gasoline'
        ],
        correct: 0,
        explanation: 'Diesel fuel typically contains more contaminants than gasoline, and diesel injection systems operate at much higher pressures, making effective filtration critical to prevent component damage.'
      }
    ]
  }
};

export default lesson8Quiz;
