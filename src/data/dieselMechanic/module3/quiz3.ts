import type { Lesson } from '@/types/course';

export const quiz3: Lesson = {
  id: 4,
  title: '📝 Module 3 Quiz: Lubrication and Cooling Systems',
  duration: '30 min',
  type: 'quiz',
  content: {
    questions: [
      {
        question: 'What is the typical oil pressure range for a diesel engine at operating RPMs?',
        options: [
          '10-20 psi',
          '20-30 psi',
          '40-60 psi',
          '80-100 psi'
        ],
        correct: 2,
        explanation: 'Diesel engines typically maintain oil pressure of 40-60 psi at operating RPMs, with 10-20 psi acceptable at idle. Lower pressure indicates potential pump or bearing issues.'
      },
      {
        question: 'What is the primary function of oil galleries in a diesel engine?',
        options: [
          'Store excess oil for emergencies',
          'Cool the oil before it returns to the sump',
          'Distribute oil evenly to bearings, camshafts, and valve trains',
          'Filter contaminants from the oil'
        ],
        correct: 2,
        explanation: 'Oil galleries are internal passages in the engine block and head that distribute oil evenly to critical components like bearings, camshafts, and valve trains.'
      },
      {
        question: 'What causes excessive crankcase pressure that can lead to oil leaks?',
        options: [
          'Overfilled oil level',
          'Clogged PCV (Positive Crankcase Ventilation) valve',
          'Too thin oil viscosity',
          'Worn oil pump'
        ],
        correct: 1,
        explanation: 'A clogged PCV valve prevents proper ventilation of crankcase gases, increasing pressure that forces oil past seals and gaskets, causing leaks.'
      },
      {
        question: 'What temperature should oil coolers maintain oil below to prevent thermal degradation?',
        options: [
          '100°C (212°F)',
          '120°C (248°F)',
          '150°C (300°F)',
          '180°C (356°F)'
        ],
        correct: 2,
        explanation: 'Oil coolers should maintain oil temperature below 150°C (300°F) to prevent thermal degradation, which causes oil to lose viscosity and lubrication effectiveness.'
      },
      {
        question: 'Which type of oil contamination is indicated by milky-colored oil?',
        options: [
          'Dirt and debris',
          'Metal particles',
          'Fuel dilution',
          'Coolant intrusion'
        ],
        correct: 3,
        explanation: 'Milky or frothy oil indicates coolant intrusion, typically from a failing head gasket or cracked cylinder head, which requires immediate attention.'
      },
      {
        question: 'What is the normal operating temperature range for a diesel engine cooling system?',
        options: [
          '140-160°F',
          '180-220°F',
          '240-260°F',
          '280-300°F'
        ],
        correct: 1,
        explanation: 'Diesel engines operate optimally at 180-220°F (82-104°C). Temperatures above 240°F indicate overheating and potential damage.'
      },
      {
        question: 'At what temperature does a typical diesel engine thermostat open?',
        options: [
          '140-160°F',
          '180-195°F',
          '220-240°F',
          '260-280°F'
        ],
        correct: 1,
        explanation: 'Thermostats typically open at 180-195°F to allow coolant circulation, maintaining optimal engine temperature and preventing overcooling or overheating.'
      },
      {
        question: 'What is the recommended coolant-to-water mixture ratio for diesel engines?',
        options: [
          '30/70 (coolant/water)',
          '40/60 (coolant/water)',
          '50/50 (coolant/water)',
          '70/30 (coolant/water)'
        ],
        correct: 2,
        explanation: 'A 50/50 mixture of coolant and distilled water provides optimal freeze protection to -34°F, raises boiling point to 265°F, and prevents corrosion.'
      },
      {
        question: 'What is a common symptom of a failing water pump?',
        options: [
          'Black smoke from exhaust',
          'Coolant leaking from the weep hole',
          'Increased fuel consumption',
          'Rough idle'
        ],
        correct: 1,
        explanation: 'A failing water pump often leaks coolant from its weep hole, and may produce grinding noises from worn bearings. This leads to overheating if not addressed.'
      },
      {
        question: 'How often should traditional green coolant be flushed and replaced?',
        options: [
          'Every year or 12,000 miles',
          'Every 2 years or 30,000 miles',
          'Every 5 years or 150,000 miles',
          'Every 10 years or 300,000 miles'
        ],
        correct: 1,
        explanation: 'Traditional ethylene glycol (green) coolant should be flushed and replaced every 2 years or 30,000 miles. Extended life coolants last 5 years or 150,000 miles.'
      }
    ]
  }
};
