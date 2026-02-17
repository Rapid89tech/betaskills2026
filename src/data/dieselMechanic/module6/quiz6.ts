import type { Lesson } from '@/types/course';

export const quiz6: Lesson = {
  id: 4,
  title: 'Module 6 Quiz: Emissions Control and Environmental Considerations',
  duration: '30 min',
  type: 'quiz',
  content: {
    questions: [
      {
        question: 'What is the primary function of a Diesel Particulate Filter (DPF)?',
        options: [
          'To increase engine horsepower',
          'To trap soot and particulate matter from diesel exhaust',
          'To cool the exhaust gases',
          'To reduce fuel consumption'
        ],
        correct: 1,
        explanation: 'DPFs trap soot and particulate matter (PM) from diesel exhaust gases, preventing their release into the atmosphere. This reduces visible black smoke and fine particulate emissions, improving air quality and enabling compliance with emissions standards.'
      },
      {
        question: 'What are the two main types of DPF regeneration?',
        options: [
          'Manual and automatic',
          'Passive and active',
          'Hot and cold',
          'Primary and secondary'
        ],
        correct: 1,
        explanation: 'The two main types of DPF regeneration are passive (occurs naturally during high-speed driving when exhaust temperatures are sufficient) and active (initiates when soot levels are high, injecting additional fuel to raise exhaust temperatures). A third type, forced regeneration, is performed by technicians using scan tools.'
      },
      {
        question: 'What fluid does the Selective Catalytic Reduction (SCR) system use to reduce NOx emissions?',
        options: [
          'Engine oil',
          'Diesel Exhaust Fluid (DEF)',
          'Coolant',
          'Hydraulic fluid'
        ],
        correct: 1,
        explanation: 'SCR systems use Diesel Exhaust Fluid (DEF), a urea-based solution (32.5% urea and water), which is injected into the exhaust stream. DEF vaporizes and decomposes into ammonia, which reacts with NOx in the SCR catalyst to convert it into harmless nitrogen and water vapor.'
      },
      {
        question: 'By what percentage can an SCR system reduce NOx emissions?',
        options: [
          'Up to 30%',
          'Up to 50%',
          'Up to 70%',
          'Up to 90%'
        ],
        correct: 3,
        explanation: 'SCR systems can reduce NOx emissions by up to 90%, making them highly effective for emissions control. This significant reduction helps diesel engines meet stringent standards like EPA 2010 or Euro 6, while also improving fuel efficiency.'
      },
      {
        question: 'What is the primary purpose of the Exhaust Gas Recirculation (EGR) system?',
        options: [
          'To increase turbocharger boost pressure',
          'To reduce combustion temperatures and lower NOx formation',
          'To improve fuel atomization',
          'To increase exhaust gas velocity'
        ],
        correct: 1,
        explanation: 'The EGR system recirculates a portion of exhaust gases back into the intake manifold to reduce combustion temperatures. By lowering peak combustion temperatures (typically above 1,500°C/2,700°F), it reduces the formation of nitrogen oxides (NOx) by 20-50%.'
      },
      {
        question: 'What is a common symptom of a clogged DPF?',
        options: [
          'Increased oil pressure',
          'Reduced engine power or limp mode',
          'Excessive coolant consumption',
          'Improved fuel economy'
        ],
        correct: 1,
        explanation: 'A clogged DPF causes reduced engine power or limp mode activation, along with increased fuel consumption, DPF warning lights, and poor acceleration. The restriction in exhaust flow prevents the engine from operating at full capacity.'
      },
      {
        question: 'What diagnostic trouble code (DTC) typically indicates insufficient EGR flow?',
        options: [
          'P0300',
          'P0401',
          'P0171',
          'P0420'
        ],
        correct: 1,
        explanation: 'DTC P0401 indicates insufficient EGR flow, which can be caused by clogged EGR passages, stuck valves, or faulty sensors. This code requires inspection of the EGR valve, passages, and related components to identify and resolve the issue.'
      },
      {
        question: 'What tool should be used to verify DEF quality in an SCR system?',
        options: [
          'Multimeter',
          'Refractometer',
          'Oscilloscope',
          'Compression tester'
        ],
        correct: 1,
        explanation: 'A refractometer is used to measure DEF quality by checking the urea concentration, which should be 32.5%. This ensures the DEF meets ISO 22241 standards and will function properly in the SCR system without causing contamination or injector issues.'
      },
      {
        question: 'How often should EGR valves typically be cleaned in diesel engines?',
        options: [
          'Every 10,000-15,000 miles',
          'Every 30,000-50,000 miles',
          'Every 100,000 miles',
          'Only when they fail'
        ],
        correct: 1,
        explanation: 'EGR valves should be cleaned every 30,000-50,000 miles using EGR-specific cleaners to remove carbon and soot buildup. Regular cleaning prevents sticking, improper operation, and performance issues like rough idling or increased emissions.'
      },
      {
        question: 'What is the recommended storage temperature for Diesel Exhaust Fluid (DEF)?',
        options: [
          'Below 32°F (0°C)',
          'Below 86°F (30°C)',
          'Below 120°F (49°C)',
          'Temperature does not matter'
        ],
        correct: 1,
        explanation: 'DEF should be stored in a cool, dry environment below 86°F (30°C) to avoid crystallization or degradation. Proper storage maintains DEF quality and prevents contamination that could damage the SCR system or reduce its effectiveness.'
      }
    ]
  }
};
