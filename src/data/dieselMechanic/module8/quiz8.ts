import type { Lesson } from '@/types/course';

export const quiz8: Lesson = {
  id: 4,
  title: 'Module 8 Quiz: Hands-On Practicals and Final Assessment',
  duration: '30 min',
  type: 'quiz',
  content: {
    questions: [
      {
        question: 'What is the first step in a systematic diagnostic approach when a customer reports engine problems?',
        options: [
          'Replace the most commonly failed component',
          'Gather customer complaint and symptoms, then perform visual inspection',
          'Immediately connect scan tool and retrieve codes',
          'Start replacing filters and fluids'
        ],
        correct: 1,
        explanation: 'The first step in systematic diagnostics is to gather the customer complaint and symptoms, then perform a thorough visual inspection. This provides context before using diagnostic tools and helps identify obvious issues that may not trigger codes.'
      },
      {
        question: 'A diesel engine has black smoke, loss of power, and DTC P0101 (MAF sensor). What is the most likely cause?',
        options: [
          'Failed turbocharger',
          'Contaminated or faulty MAF sensor',
          'Clogged DPF',
          'Low fuel pressure'
        ],
        correct: 1,
        explanation: 'DTC P0101 indicates a MAF sensor circuit range/performance issue. Combined with black smoke and power loss, this points to a contaminated or faulty MAF sensor providing incorrect airflow data, causing the ECU to inject excess fuel.'
      },
      {
        question: 'When performing a forced DPF regeneration, what parameter should be monitored to ensure success?',
        options: [
          'Oil pressure',
          'Exhaust temperature and DPF soot load percentage',
          'Fuel economy',
          'Turbo boost pressure'
        ],
        correct: 1,
        explanation: 'During forced DPF regeneration, monitor exhaust temperature (should reach ~600°C/1,100°F) and DPF soot load percentage (should decrease significantly). These parameters confirm the regeneration process is working and soot is being burned off.'
      },
      {
        question: 'What tool should be used to verify DEF quality in an SCR system?',
        options: [
          'Multimeter',
          'Refractometer',
          'Compression tester',
          'Oscilloscope'
        ],
        correct: 1,
        explanation: 'A refractometer is used to measure DEF concentration, which should be 32.5% urea. This ensures the DEF meets ISO 22241 standards and will function properly in the SCR system without causing contamination or efficiency issues.'
      },
      {
        question: 'A customer reports intermittent loss of power and occasional black smoke. What diagnostic data should you prioritize?',
        options: [
          'Only check oil level',
          'Monitor live data for MAF, boost pressure, fuel pressure, and EGR operation',
          'Replace all filters immediately',
          'Only check coolant temperature'
        ],
        correct: 1,
        explanation: 'For intermittent power loss and black smoke, monitor live data including MAF sensor readings, turbo boost pressure, fuel rail pressure, and EGR valve operation. This helps identify which system is causing the intermittent issue during operation.'
      },
      {
        question: 'When creating a maintenance schedule for a fleet operating in severe conditions (heavy loads, dusty environment), how should intervals be adjusted?',
        options: [
          'Keep standard manufacturer intervals',
          'Extend intervals to save costs',
          'Shorten intervals for oil changes, filter replacements, and inspections',
          'Only adjust oil change intervals'
        ],
        correct: 2,
        explanation: 'Severe operating conditions (heavy loads, dusty environments, extreme temperatures) require shortened maintenance intervals for oil changes, filter replacements, and inspections. This prevents premature wear and component failures in demanding conditions.'
      },
      {
        question: 'What is the primary benefit of using predictive maintenance strategies like oil analysis?',
        options: [
          'It eliminates the need for regular maintenance',
          'It identifies wear and contamination early, preventing failures before they occur',
          'It reduces fuel consumption',
          'It increases engine horsepower'
        ],
        correct: 1,
        explanation: 'Predictive maintenance strategies like oil analysis detect wear metals and contaminants early, allowing proactive repairs before failures occur. This prevents catastrophic damage, reduces downtime, and optimizes maintenance schedules based on actual condition.'
      },
      {
        question: 'After completing a repair, what is the most important verification step?',
        options: [
          'Immediately return vehicle to customer',
          'Test drive and monitor systems to confirm repair success and no DTCs return',
          'Only clear the diagnostic codes',
          'Just check that the warning light is off'
        ],
        correct: 1,
        explanation: 'After repairs, always test drive the vehicle and monitor relevant systems to confirm the repair was successful, symptoms are resolved, and no DTCs return. This ensures the root cause was addressed and the customer receives a properly repaired vehicle.'
      },
      {
        question: 'What should be included in a comprehensive fleet maintenance recordkeeping system?',
        options: [
          'Only the dates of oil changes',
          'Service dates, mileage, parts used, costs, technician notes, and DTCs',
          'Just the total costs',
          'Only warranty information'
        ],
        correct: 1,
        explanation: 'Comprehensive recordkeeping includes service dates, vehicle mileage/hours, parts used, costs, technician observations, DTCs retrieved, and repairs performed. This supports audits, warranty claims, trend analysis, and compliance documentation.'
      },
      {
        question: 'What is the typical passing score requirement for diesel mechanic certification exams?',
        options: [
          '50%',
          '60%',
          '70%',
          '90%'
        ],
        correct: 2,
        explanation: 'Most diesel mechanic certification exams require a passing score of 70% or higher. This demonstrates adequate competency in diesel engine theory, diagnostics, maintenance procedures, and safety practices required for professional work.'
      }
    ]
  }
};
