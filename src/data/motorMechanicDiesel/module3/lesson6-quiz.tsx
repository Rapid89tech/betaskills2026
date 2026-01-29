import type { Lesson } from '../../../types/course';

const lesson6Quiz: Lesson = {
  id: 6,
  title: 'Module 3 Quiz: Engine Lubrication and Cooling Systems',
  duration: '25 minutes',
  type: 'quiz',
  content: {
    questions: [
      {
        question: 'What is the primary role of lubrication in a diesel engine?',
        options: [
          'To increase engine power output',
          'To reduce friction between moving parts and dissipate heat',
          'To improve fuel efficiency only',
          'To reduce engine noise exclusively'
        ],
        correct: 1,
        explanation: 'The primary role of lubrication is to reduce friction between moving parts, dissipate heat, and prevent wear, ensuring smooth engine operation and longevity.'
      },
      {
        question: 'Which component circulates engine oil throughout the lubrication system?',
        options: [
          'Oil filter',
          'Oil pan',
          'Oil pump',
          'Oil cooler'
        ],
        correct: 2,
        explanation: 'The oil pump is responsible for circulating engine oil throughout the lubrication system, creating the necessary pressure to deliver oil to all engine components.'
      },
      {
        question: 'What does low oil pressure typically indicate in a diesel engine?',
        options: [
          'Excessive oil in the system',
          'Perfect engine condition',
          'Worn engine components or oil pump issues',
          'High-quality oil being used'
        ],
        correct: 2,
        explanation: 'Low oil pressure typically indicates worn engine bearings, a failing oil pump, oil leaks, or insufficient oil levels, all of which require immediate attention.'
      },
      {
        question: 'What is the primary function of the engine cooling system?',
        options: [
          'To increase engine temperature',
          'To regulate engine temperature and prevent overheating',
          'To reduce fuel consumption only',
          'To improve exhaust emissions only'
        ],
        correct: 1,
        explanation: 'The cooling system\'s primary function is to regulate engine temperature by removing excess heat and maintaining optimal operating temperature to prevent overheating and damage.'
      },
      {
        question: 'Which component is responsible for circulating coolant through the engine?',
        options: [
          'Thermostat',
          'Radiator',
          'Water pump',
          'Cooling fan'
        ],
        correct: 2,
        explanation: 'The water pump circulates coolant through the engine block, cylinder head, and radiator, ensuring continuous heat transfer and temperature regulation.'
      },
      {
        question: 'What does the thermostat do in a diesel engine cooling system?',
        options: [
          'Controls coolant flow based on engine temperature',
          'Filters impurities from the coolant',
          'Increases coolant pressure',
          'Reduces engine noise'
        ],
        correct: 0,
        explanation: 'The thermostat controls coolant flow based on engine temperature, opening when the engine reaches operating temperature and closing when it\'s cold to help the engine warm up quickly.'
      },
      {
        question: 'What are common symptoms of engine overheating?',
        options: [
          'Increased fuel efficiency and smooth operation',
          'High coolant temperature gauge reading and possible white smoke',
          'Improved engine performance and lower emissions',
          'Reduced engine noise and vibration'
        ],
        correct: 1,
        explanation: 'Common overheating symptoms include high coolant temperature readings, possible white smoke from the exhaust, loss of power, and potential engine damage if not addressed quickly.'
      },
      {
        question: 'How often should engine oil typically be changed in a diesel engine?',
        options: [
          'Every 1,000 miles',
          'Every 25,000 miles',
          'Every 5,000-15,000 miles depending on operating conditions',
          'Only when the engine fails'
        ],
        correct: 2,
        explanation: 'Diesel engine oil should typically be changed every 5,000-15,000 miles depending on operating conditions, oil type, and manufacturer recommendations. Severe conditions require more frequent changes.'
      },
      {
        question: 'What can cause coolant leaks in a diesel engine?',
        options: [
          'Perfect maintenance practices',
          'Damaged hoses, worn gaskets, or faulty radiator',
          'Using the correct coolant mixture',
          'Regular cooling system inspections'
        ],
        correct: 1,
        explanation: 'Coolant leaks can be caused by damaged hoses, worn gaskets, faulty radiator, water pump failure, or cracked engine components, all requiring prompt repair to prevent overheating.'
      },
      {
        question: 'Why is regular maintenance of lubrication and cooling systems critical for diesel engines?',
        options: [
          'To increase initial purchase cost',
          'To prevent costly repairs and ensure optimal performance',
          'To make the engine run louder',
          'To reduce the engine\'s lifespan'
        ],
        correct: 1,
        explanation: 'Regular maintenance prevents costly repairs, ensures optimal performance, extends engine life, and maintains reliability. Neglecting these systems can lead to catastrophic engine failure.'
      }
    ]
  }
};

export default lesson6Quiz;
