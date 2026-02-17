import type { Lesson } from '@/types/course';

export const quiz7: Lesson = {
  id: 4,
  title: 'Module 7 Quiz: Diesel Engine Maintenance and Preventative Care',
  duration: '30 min',
  type: 'quiz',
  content: {
    questions: [
      {
        question: 'Why is it important to establish regular oil change intervals?',
        options: [
          'To maintain proper ignition timing',
          'To remove contaminants and keep the engine lubricated',
          'To prevent coolant loss',
          'To increase fuel injection pressure'
        ],
        correct: 1,
        explanation: 'Regular oil changes are essential to remove contaminants (dirt, metal particles, combustion byproducts) and maintain proper engine lubrication. This reduces friction between moving parts, prevents sludge buildup, and extends the lifespan of critical engine components.'
      },
      {
        question: 'Which component should typically be replaced along with an oil change?',
        options: [
          'Air filter',
          'Oil filter',
          'Coolant thermostat',
          'Fuel pump'
        ],
        correct: 1,
        explanation: 'The oil filter should be replaced with every oil change (every 5,000-15,000 miles) to prevent recirculation of debris, sludge, or contaminants. This ensures clean oil circulates through the engine, protecting critical components.'
      },
      {
        question: 'How often should air filters be replaced in diesel engines?',
        options: [
          'Once every two years regardless of operating conditions',
          'Only when the check engine light comes on',
          'At intervals recommended by the manufacturer or more frequently in dusty conditions',
          'Every time the engine coolant is changed'
        ],
        correct: 2,
        explanation: 'Air filters should be replaced every 12,000-30,000 miles following manufacturer recommendations, or more frequently in dusty or off-road environments. Clean air improves combustion efficiency, reduces wear on turbochargers, and supports emissions control.'
      },
      {
        question: 'What is a common indicator that a coolant system needs attention?',
        options: [
          'Low oil pressure warning',
          'Increased fuel efficiency',
          'Engine overheating or loss of coolant',
          'Decreased air intake temperature'
        ],
        correct: 2,
        explanation: 'Engine overheating or loss of coolant are common indicators that the cooling system needs attention. These symptoms may indicate leaks, low coolant levels, thermostat failure, or other cooling system issues that require immediate inspection and repair.'
      },
      {
        question: 'Why is fleet recordkeeping important in diesel engine maintenance?',
        options: [
          'It allows technicians to skip certain maintenance steps',
          'It ensures all vehicles are maintained uniformly and compliance is documented',
          'It decreases the need for regular filter replacements',
          'It replaces the need for physical inspections'
        ],
        correct: 1,
        explanation: 'Fleet recordkeeping ensures all vehicles are maintained uniformly following standardized schedules, and compliance with emissions regulations is properly documented. It supports audits, warranty claims, cost tracking, and helps identify patterns or recurring issues across the fleet.'
      },
      {
        question: 'How can maintenance data help prevent engine failures?',
        options: [
          'By reducing the need for coolant changes',
          'By identifying patterns and predicting component failures before they occur',
          'By allowing the operator to skip scheduled maintenance',
          'By automatically increasing fuel efficiency'
        ],
        correct: 1,
        explanation: 'Maintenance data helps prevent engine failures by identifying patterns and predicting component failures before they occur. By analyzing trends in service logs, component lifespan, and performance metrics, fleet managers can schedule proactive maintenance and avoid costly breakdowns.'
      },
      {
        question: 'What is a good strategy to extend the life of diesel engine components?',
        options: [
          'Use lower-quality fluids to reduce operating costs',
          'Proactively replace parts only after they fail',
          'Perform regular inspections and address minor issues early',
          'Ignore minor performance changes until they become significant'
        ],
        correct: 2,
        explanation: 'Performing regular inspections and addressing minor issues early is an excellent strategy to extend component life. Small problems like leaks or unusual noises, when caught early, can be fixed inexpensively before they escalate into major failures costing thousands of dollars.'
      },
      {
        question: 'Which of the following is an example of predictive maintenance?',
        options: [
          'Replacing a fuel filter at the recommended interval',
          'Using oil analysis to detect wear metals and contaminants',
          'Cleaning an air filter when it looks dirty',
          'Checking coolant levels once a month'
        ],
        correct: 1,
        explanation: 'Using oil analysis to detect wear metals and contaminants is a classic example of predictive maintenance. By analyzing oil samples, technicians can identify issues like bearing wear, injector leaks, or turbocharger degradation before they cause failures, enabling proactive repairs.'
      },
      {
        question: 'What risk does water contamination pose to diesel fuel systems?',
        options: [
          'It increases tire wear',
          'It improves injector lubrication',
          'It can cause injector damage and microbial growth',
          'It cools the engine more efficiently'
        ],
        correct: 2,
        explanation: 'Water contamination in diesel fuel systems can cause injector damage and promote microbial growth (algae, bacteria, fungi) that clogs filters and fuel lines. Water should be drained regularly from fuel filters and water separators to prevent these issues.'
      },
      {
        question: 'What is the benefit of using OEM or high-quality aftermarket filters in a diesel engine?',
        options: [
          'They increase exhaust backpressure',
          'They allow extended service intervals regardless of fuel quality',
          'They ensure proper fit and filtration efficiency',
          'They reduce the need for coolant monitoring'
        ],
        correct: 2,
        explanation: 'OEM or high-quality aftermarket filters ensure proper fit and filtration efficiency, protecting the engine from contaminants. Quality filters meeting manufacturer specifications prevent premature wear, maintain optimal performance, and avoid issues like injector clogging or turbocharger damage.'
      }
    ]
  }
};
