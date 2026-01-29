import type { Module } from '@/types/course';

export const module8Assessment: Module = {
  id: 8,
  title: 'Final Assessment',
  description: 'Comprehensive assessment of diesel mechanic skills',
  lessons: [
        {
          id: 25,
      title: 'Diesel Mechanic Certification Exam',
      duration: '90 min',
      type: 'quiz',
      content: {
        questions: [
          {
            question: 'What is the primary difference between diesel and gasoline engines?',
            options: [
              'Diesel engines use spark plugs',
              'Diesel engines use compression ignition',
              'Diesel engines run at higher RPMs',
              'Diesel engines use carburetors'
            ],
            correct: 1,
            explanation: 'Diesel engines use compression ignition instead of spark plugs to ignite the fuel.'
          },
          {
            question: 'What pressure range do modern common rail systems operate at?',
            options: [
              '50-100 bar',
              '100-300 bar',
              '300-3000+ bar',
              '3000-5000 bar'
            ],
            correct: 2,
            explanation: 'Modern common rail systems typically operate between 300-3000+ bar pressure.'
          },
          {
            question: 'Which diagnostic code typically indicates low fuel rail pressure?',
            options: [
              'P0087',
              'P0088',
              'P0201',
              'P0300'
            ],
            correct: 0,
            explanation: 'P0087 indicates fuel rail pressure too low, often caused by fuel pump, filter, or leak issues.'
          },
          {
            question: 'How often should diesel engine oil typically be changed in heavy-duty applications?',
            options: [
              '3,000-5,000 miles',
              '5,000-15,000 miles',
              '15,000-25,000 miles',
              '25,000-50,000 miles'
            ],
            correct: 1,
            explanation: 'Diesel engine oil change intervals typically range from 5,000-15,000 miles depending on operating conditions.'
          },
          {
            question: 'What is the main safety concern when working on common rail fuel systems?',
            options: [
              'Electrical shock',
              'Extreme high pressure',
              'Hot surfaces',
              'Toxic fumes'
            ],
            correct: 1,
            explanation: 'Common rail systems operate at extremely high pressures (up to 3000 bar) which can cause serious injury.'
          }
        ]
      }
    },
        {
          id: 26,
      title: 'Course Completion Certificate',
      duration: '5 min',
      type: 'certificate',
      content: {
        title: 'Diesel Mechanic Professional Certification',
        description: 'Congratulations on completing the comprehensive Diesel Mechanic course!',
        certificateText: 'This certifies that the holder has successfully completed the Diesel Mechanic Professional Certification course and has demonstrated proficiency in diesel engine diagnostics, repair, and maintenance.'
      }
    }
  ]
};